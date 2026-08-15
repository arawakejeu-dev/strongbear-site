import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "1";

const legacyRedirects = [
  { source: "/jiu-jitsu-bresilien", destination: "/jiu-jitsu-bresilien-marines" },
  { source: "/jiu-jitsu", destination: "/jiu-jitsu-bresilien-marines" },
  { source: "/cours-de-jiu-jitsu-bresilien", destination: "/jiu-jitsu-bresilien-marines" },
  { source: "/cours-darts-martiaux-a-marines", destination: "/" },
  { source: "/cours-de-mma", destination: "/mma-marines" },
  { source: "/grappling", destination: "/grappling-marines" },
  { source: "/mma", destination: "/mma-marines" },
  { source: "/a-propos", destination: "/#strongbear" },
  { source: "/contact", destination: "/#contact" },
] as const;

const nextConfig: NextConfig = {
  // Hostinger's Git integration deploys the standard Next.js server output.
  // STATIC_EXPORT remains available only for the separate manual FTP fallback.
  output: isStaticExport ? "export" : undefined,
  // Folder-based pages work directly on conventional Apache hosting, while
  // the Sites deployment retains its existing URL behaviour.
  trailingSlash: isStaticExport,
  async redirects() {
    if (isStaticExport) {
      return [];
    }

    // Use statusCode explicitly: Next's `permanent` shortcut returns 308,
    // whereas the existing SEO migration requires HTTP 301 responses.
    return legacyRedirects.map(({ source, destination }) => ({
      source,
      destination,
      statusCode: 301,
    }));
  },
};

export default nextConfig;
