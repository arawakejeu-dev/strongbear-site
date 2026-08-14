export const productionSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://strongbearbjj.com").replace(/\/$/, "");

export async function getRequestOrigin() {
  // Canonical URLs must remain stable in every environment. Keeping this value
  // request-independent also allows the marketing site to be exported as static
  // HTML for conventional hosting.
  return productionSiteUrl;
}
