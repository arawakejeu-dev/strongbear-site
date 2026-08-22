const isStaticExport = process.env.STATIC_EXPORT === "1";
const canonicalOrigin = "https://strongbearbjj.com";

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
];

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: isStaticExport ? "export" : undefined,
  trailingSlash: isStaticExport,
  async redirects() {
    if (isStaticExport) return [];

    const canonicalLegacyRedirects = legacyRedirects.map(({ source, destination }) => ({
      source,
      has: [{ type: "host", value: "www.strongbearbjj.com" }],
      destination: `${canonicalOrigin}${destination}`,
      statusCode: 301,
    }));

    return [
      ...canonicalLegacyRedirects,
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.strongbearbjj.com" }],
        destination: `${canonicalOrigin}/:path*`,
        statusCode: 301,
      },
      ...legacyRedirects.map(({ source, destination }) => ({
        source,
        destination,
        statusCode: 301,
      })),
    ];
  },
};

export default nextConfig;
