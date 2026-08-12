import type { Metadata } from "next";
import { preload } from "react-dom";
import "./globals.css";
import { AnalyticsReady } from "./analytics-ready";
import { getRequestOrigin, productionSiteUrl } from "./lib/site";
import { buildOrganizationSchema } from "./seo/schema";

export const metadata: Metadata = {
  metadataBase: new URL(productionSiteUrl),
  title: { default: "Strongbear BJJ & Grappling", template: "%s | Strongbear" },
  description: "Académie premium de Jiu-Jitsu Brésilien, Grappling et MMA à Marines, dans le Vexin.",
  icons: { icon: [{ url: "/favicon.svg?v=strongbear-round", type: "image/svg+xml", sizes: "any" }] },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  preload("/fonts/geist-latin.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  const origin = await getRequestOrigin();
  const organization = buildOrganizationSchema(origin);
  return <html lang="fr"><body>{children}<AnalyticsReady /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body></html>;
}
