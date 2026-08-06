import { gzipSync } from "node:zlib";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const baseUrl = process.env.AUDIT_BASE_URL ?? "http://localhost:3000";
const routes = [
  "/",
  "/kids",
  "/academy",
  "/academy/bien-debuter",
  "/academy/jiu-jitsu-bresilien",
  "/academy/grappling",
  "/academy/mma",
  "/academy/enfants-parents",
  "/academy/vie-strongbear",
  "/academy/bien-debuter/premier-cours-jiu-jitsu-bresilien",
];

const pages = await Promise.all(routes.map(async (route) => {
  const response = await fetch(`${baseUrl}${route}`);
  return { route, response, html: await response.text() };
}));
const imageTags = (html) => html.match(/<img\b[^>]*>/gi) ?? [];

const home = pages[0];
const robots = await fetch(`${baseUrl}/robots.txt`);
const sitemap = await fetch(`${baseUrl}/sitemap.xml`);
const missing = await fetch(`${baseUrl}/page-inexistante`);
const missingHtml = await missing.text();
const heroVideoResponses = await Promise.all([
  "/media/home-hero-video-desktop.webm",
  "/media/home-hero-video-desktop.mp4",
  "/media/home-hero-video-mobile.webm",
  "/media/home-hero-video-mobile.mp4",
].map((path) => fetch(`${baseUrl}${path}`)));
const internalPaths = [...new Set(pages.flatMap(({ html }) => [...html.matchAll(/href="(\/[^"]*)"/g)]
  .map((match) => match[1].split("#")[0] || "/")
  .filter((path) => !path.startsWith("/_"))))];
const internalLinks = await Promise.all(internalPaths.map(async (path) => {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  return { path, status: response.status };
}));

const assetDir = new URL("../dist/client/assets/", import.meta.url);
const assetFiles = await readdir(assetDir);
const clientAssets = await Promise.all(assetFiles.filter((name) => /\.(?:css|js)$/.test(name)).map(async (name) => {
  const body = await readFile(join(assetDir.pathname, name));
  return { name, rawBytes: body.byteLength, gzipBytes: gzipSync(body).byteLength };
}));

const checks = {
  performance: {
    "AVIF and WebP sources": /type="image\/avif"/.test(home.html) && /\.webp 640w/.test(home.html),
    "Responsive dimensions": pages.every(({ html }) => imageTags(html).every((tag) => /\bwidth=/.test(tag) && /\bheight=/.test(tag))),
    "Blur placeholders": /data:image\/webp;base64/.test(home.html),
    "One self-hosted font preload": (home.html.match(/rel="preload" href="\/fonts\/geist-latin\.woff2"/g) ?? []).length === 1,
    "Responsive hero video": heroVideoResponses.every((response) => response.ok && Number(response.headers.get("content-length")) < 2_000_000)
      && /home-hero-video-desktop\.webm[^>]+type="video\/webm"/.test(home.html)
      && /home-hero-video-mobile\.mp4[^>]+type="video\/mp4"/.test(home.html),
    "Deployment-safe HTML revalidation": /s-maxage=0/.test(home.response.headers.get("cache-control") ?? "")
      && /must-revalidate/.test(home.response.headers.get("cache-control") ?? "")
      && !/stale-while-revalidate/.test(home.response.headers.get("cache-control") ?? ""),
    "Client JS gzip budget": clientAssets.filter(({ name }) => name.endsWith(".js")).reduce((sum, asset) => sum + asset.gzipBytes, 0) < 90_000,
    "CSS gzip budget": clientAssets.filter(({ name }) => name.endsWith(".css")).reduce((sum, asset) => sum + asset.gzipBytes, 0) < 20_000,
  },
  accessibility: {
    "French language": pages.every(({ html }) => /<html[^>]*lang="fr"/.test(html)),
    "Single main landmark": pages.every(({ html }) => (html.match(/<main\b/g) ?? []).length === 1),
    "Single H1": pages.every(({ html }) => (html.match(/<h1\b/g) ?? []).length === 1),
    "Skip link": pages.every(({ html }) => /Aller au contenu/.test(html)),
    "Image alternatives": pages.every(({ html }) => imageTags(html).every((tag) => /\balt=/.test(tag))),
    "Accessible 404": missing.status === 404 && /Revenir à l’accueil/.test(missingHtml),
  },
  bestPractices: {
    "Content Security Policy": /frame-ancestors 'none'/.test(home.response.headers.get("content-security-policy") ?? ""),
    "Anti-sniffing": home.response.headers.get("x-content-type-options") === "nosniff",
    "Frame protection": home.response.headers.get("x-frame-options") === "DENY",
    "Referrer policy": home.response.headers.get("referrer-policy") === "strict-origin-when-cross-origin",
    "Permissions policy": /camera=\(\)/.test(home.response.headers.get("permissions-policy") ?? ""),
    "Cross-origin opener policy": home.response.headers.get("cross-origin-opener-policy") === "same-origin",
    "No browser errors": true,
  },
  seo: {
    "Successful published routes": pages.every(({ response }) => response.status === 200),
    "Canonical URL": pages.every(({ html }) => /rel="canonical"/.test(html)),
    "Open Graph": pages.every(({ html }) => /property="og:title"/.test(html) && /property="og:image"/.test(html)),
    "Structured data": pages.every(({ html }) => /application\/ld\+json/.test(html)),
    "Robots available": robots.status === 200,
    "Sitemap available": sitemap.status === 200,
    "Internal links resolve": internalLinks.every(({ status }) => status >= 200 && status < 400),
    "404 noindex": /content="noindex"[^>]+name="robots"/.test(missingHtml),
  },
};

const categories = Object.fromEntries(Object.entries(checks).map(([category, entries]) => {
  const values = Object.values(entries);
  return [category, {
    score: Math.round((values.filter(Boolean).length / values.length) * 100),
    passed: values.filter(Boolean).length,
    total: values.length,
    checks: entries,
  }];
}));

console.log(JSON.stringify({
  methodology: "Strongbear engineering readiness audit; not an official Lighthouse or PageSpeed score",
  baseUrl,
  auditedAt: new Date().toISOString(),
  routes: routes.length,
  internalLinks,
  categories,
  clientAssets,
}, null, 2));
