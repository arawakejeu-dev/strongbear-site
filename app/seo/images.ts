import { activeImageSlots } from "../../content/media-inventory";
import generatedMedia from "./generated-media.json";

export type ImageAuthenticity = "verified-academy" | "unverified-source" | "provisional-generated";

export type ImageSeoRecord = {
  slotId: string;
  purpose: string;
  priority: "P0" | "P1" | "P2";
  status: "temporary-active" | "awaiting-authentic" | "verified-academy";
  source: string;
  variants: Array<{ src: string; width: number }>;
  avifVariants: Array<{ src: string; width: number }>;
  placeholder: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  caption: string;
  description: string;
  authenticity: ImageAuthenticity;
  structuredDataEligible: boolean;
};

type GeneratedMediaRecord = {
  source: string;
  variants: Array<{ src: string; width: number }>;
  avifVariants: Array<{ src: string; width: number }>;
  placeholder: string;
  width: number;
  height: number;
};

const generated = generatedMedia as Record<string, GeneratedMediaRecord>;

export const imageSeoRegistry: Record<string, ImageSeoRecord> = Object.fromEntries(activeImageSlots.map((slot) => {
  const source = slot.activeSource!;
  const asset = generated[source];
  if (!asset) throw new Error(`${slot.id}: données médias générées manquantes`);
  return [source, {
    slotId: slot.id,
    purpose: slot.purpose,
    priority: slot.priority,
    status: slot.status,
    ...asset,
    alt: slot.altGuidance,
    title: slot.title ?? slot.purpose,
    caption: slot.caption ?? slot.purpose,
    description: slot.description ?? slot.purpose,
    authenticity: slot.authenticity ?? "unverified-source",
    structuredDataEligible: slot.status === "verified-academy",
  }];
}));

export function getImageSeoRecord(source: string) {
  return imageSeoRegistry[source];
}

export function validateImageSeoRegistry() {
  return Object.values(imageSeoRegistry).flatMap((image) => {
    const issues: string[] = [];
    if (!image.slotId.trim()) issues.push(`${image.source}: identifiant média manquant`);
    if (!image.purpose.trim()) issues.push(`${image.source}: usage éditorial manquant`);
    if (!image.alt.trim()) issues.push(`${image.source}: alt manquant`);
    if (!image.title.trim()) issues.push(`${image.source}: title manquant`);
    if (!image.caption.trim()) issues.push(`${image.source}: caption manquant`);
    if (!image.description.trim()) issues.push(`${image.source}: description manquante`);
    if (!image.placeholder.startsWith("data:image/")) issues.push(`${image.source}: placeholder invalide`);
    if (!image.variants.length || image.variants.some((variant) => !variant.src.endsWith(".webp"))) issues.push(`${image.source}: variantes WebP invalides`);
    if (!image.avifVariants.length || image.avifVariants.some((variant) => !variant.src.endsWith(".avif"))) issues.push(`${image.source}: variantes AVIF invalides`);
    if (image.structuredDataEligible && image.authenticity !== "verified-academy") issues.push(`${image.source}: ImageObject interdit sans authenticité vérifiée`);
    return issues;
  });
}
