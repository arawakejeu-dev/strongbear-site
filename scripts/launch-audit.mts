import { mediaInventory } from "../content/media-inventory.ts";

const configured = (name: string) => Boolean(process.env[name]?.trim());
const fightyUrl = process.env.NEXT_PUBLIC_FIGHTY_URL?.trim() ?? "";
let fightyBookingReady = false;

try {
  const url = new URL(fightyUrl);
  fightyBookingReady = /(^|\.)fighty\./i.test(url.hostname) && url.pathname !== "/";
} catch {
  fightyBookingReady = false;
}

const p0Media = mediaInventory.filter((slot) => slot.priority === "P0");
const mediaReady = p0Media.every((slot) => slot.status === "verified-academy")
  && mediaInventory.every((slot) => slot.status !== "temporary-active");

const automatedGates = {
  "URL Fighty de réservation exacte": fightyBookingReady,
  "Médias P0 authentiques et vérifiés": mediaReady,
  "Politique de confidentialité": configured("NEXT_PUBLIC_PRIVACY_URL"),
  "Mentions légales": configured("NEXT_PUBLIC_LEGAL_URL"),
  "Mesure GA4 ou GTM": configured("NEXT_PUBLIC_GTM_ID") || configured("NEXT_PUBLIC_GA4_ID"),
  "Lien Google Business Profile": configured("NEXT_PUBLIC_GOOGLE_BUSINESS_URL"),
  "Validation Google Search Console": configured("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"),
};

const blockers = Object.entries(automatedGates).filter(([, ready]) => !ready).map(([label]) => label);
const report = {
  auditedAt: new Date().toISOString(),
  launchReady: blockers.length === 0,
  automatedGates,
  media: {
    totalSlots: mediaInventory.length,
    p0Slots: p0Media.length,
    verified: mediaInventory.filter((slot) => slot.status === "verified-academy").length,
    temporary: mediaInventory.filter((slot) => slot.status === "temporary-active").length,
    awaitingAuthentic: mediaInventory.filter((slot) => slot.status === "awaiting-authentic").length,
  },
  blockers,
  manualApprovalRequired: [
    "Vérifier planning, tarifs, coordonnées et offre contre Fighty",
    "Archiver les autorisations d’image, notamment pour les mineurs",
    "Exécuter Lighthouse et les Core Web Vitals sur l’URL publique",
    "Valider le plan de marquage et le consentement en production",
    "Obtenir le bon à publier final de Strongbear",
  ],
};

console.log(JSON.stringify(report, null, 2));
