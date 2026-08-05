import { headers } from "next/headers";

export const productionSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://strongbear-vexin.strongb.chatgpt.site";

export async function getRequestOrigin() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  if (!host) return productionSiteUrl;
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}
