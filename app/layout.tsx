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
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  preload("/fonts/geist-latin.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  const origin = await getRequestOrigin();
  const organization = buildOrganizationSchema(origin);
  return <html lang="fr"><body>{children}<AnalyticsReady /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body></html>;
}
