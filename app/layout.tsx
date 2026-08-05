import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { getRequestOrigin } from "./lib/site";
import { buildOrganizationSchema } from "./seo/schema";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Strongbear BJJ & Grappling", template: "%s | Strongbear" },
  description: "Académie premium de Jiu-Jitsu Brésilien, Grappling et MMA à Marines, dans le Vexin.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const origin = await getRequestOrigin();
  const organization = buildOrganizationSchema(origin);
  return <html lang="fr"><body className={geist.variable}>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body></html>;
}
