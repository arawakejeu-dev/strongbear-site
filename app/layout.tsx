import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Strongbear BJJ & Grappling", template: "%s | Strongbear" },
  description: "Académie premium de Jiu-Jitsu Brésilien, Grappling et MMA à Marines, dans le Vexin.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body className={geist.variable}>{children}</body></html>;
}
