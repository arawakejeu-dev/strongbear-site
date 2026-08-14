import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // Keep the current server-rendered build for Sites. Hostinger's classic web
  // hosting uses the same source with STATIC_EXPORT=1 to generate static HTML.
  output: isStaticExport ? "export" : undefined,
  // Folder-based pages work directly on conventional Apache hosting, while
  // the Sites deployment retains its existing URL behaviour.
  trailingSlash: isStaticExport,
};

export default nextConfig;
