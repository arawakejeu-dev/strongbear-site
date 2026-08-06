/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const redirects: Record<string, string> = {
  "/jiu-jitsu-bresilien": "/academy/jiu-jitsu-bresilien",
  "/grappling": "/academy/grappling",
  "/mma": "/academy/mma",
  "/a-propos": "/#strongbear",
  "/contact": "/#contact",
};

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "form-action 'self' https://fighty.com",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: https://www.google-analytics.com https://www.facebook.com",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://www.facebook.com",
  "upgrade-insecure-requests",
].join("; ");

function secureResponse(response: Response, pathname: string) {
  const secured = new Response(response.body, response);
  secured.headers.set("Content-Security-Policy", contentSecurityPolicy);
  secured.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  secured.headers.set("X-Content-Type-Options", "nosniff");
  secured.headers.set("X-Frame-Options", "DENY");
  secured.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  secured.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), browsing-topics=()");
  secured.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  if (pathname.endsWith(".mp4")) secured.headers.set("Content-Type", "video/mp4");
  else if (pathname.endsWith(".webm")) secured.headers.set("Content-Type", "video/webm");
  else if (pathname.endsWith(".webp")) secured.headers.set("Content-Type", "image/webp");
  if (pathname.startsWith("/assets/")) secured.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  else if (pathname.startsWith("/media/") || pathname.startsWith("/fonts/") || pathname === "/og.jpg" || pathname === "/favicon.png") secured.headers.set("Cache-Control", "public, max-age=604800, stale-while-revalidate=2592000");
  // Revalidate the HTML shell on every navigation. Keeping stale HTML at the
  // edge can make it reference CSS/JS hashes from the previous deployment,
  // which leaves a newly deployed page unstyled until the visitor refreshes.
  // Fingerprinted assets remain cached immutably by the branch above.
  else if (response.ok && secured.headers.get("Content-Type")?.includes("text/html")) secured.headers.set("Cache-Control", "public, max-age=0, s-maxage=0, must-revalidate");
  else if (response.ok && (pathname === "/robots.txt" || pathname === "/sitemap.xml")) secured.headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
  return secured;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.protocol === "http:" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
      url.protocol = "https:";
      return secureResponse(Response.redirect(url, 308), url.pathname);
    }

    const redirect = redirects[url.pathname];
    if (redirect) return secureResponse(Response.redirect(new URL(redirect, url), 308), url.pathname);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const imageResponse = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      return secureResponse(imageResponse, url.pathname);
    }

    return secureResponse(await handler.fetch(request, env, ctx), url.pathname);
  },
};

export default worker;
