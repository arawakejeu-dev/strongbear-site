import { headers } from "next/headers";

export const productionSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://strongbearbjj.com").replace(/\/$/, "");

export async function getRequestOrigin() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  if (!host) return productionSiteUrl;
  const isLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  if (!isLocal) return productionSiteUrl;
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}`;
}
