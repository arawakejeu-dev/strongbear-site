export type ImageAuthenticity = "verified-academy" | "unverified-source" | "provisional-generated";

export type ImageSeoRecord = {
  source: string;
  variants: Array<{ src: string; width: number }>;
  width: number;
  height: number;
  alt: string;
  title: string;
  caption: string;
  description: string;
  authenticity: ImageAuthenticity;
  structuredDataEligible: boolean;
};

export const imageSeoRegistry: Record<string, ImageSeoRecord> = {
  "/bjj-hero.jpg": {
    source: "/media/bjj-hero-2400.webp",
    variants: [640, 1024, 1600, 2400].map((width) => ({ src: `/media/bjj-hero-${width}.webp`, width })),
    width: 2400,
    height: 1600,
    alt: "Entraînement technique au sol en Jiu-Jitsu Brésilien",
    title: "Entraînement de Jiu-Jitsu Brésilien",
    caption: "Travail technique au sol pendant une séance de Jiu-Jitsu Brésilien.",
    description: "Photographie d’entraînement utilisée pour présenter la pratique adulte.",
    authenticity: "unverified-source",
    structuredDataEligible: false,
  },
  "/bjj-class.jpg": {
    source: "/media/bjj-class-1600.webp",
    variants: [640, 1024, 1600].map((width) => ({ src: `/media/bjj-class-${width}.webp`, width })),
    width: 1800,
    height: 806,
    alt: "Démonstration technique pendant un cours de Jiu-Jitsu Brésilien",
    title: "Démonstration technique de Jiu-Jitsu Brésilien",
    caption: "Une technique est décomposée avant la répétition en binôme.",
    description: "Image éditoriale illustrant la transmission technique sur le tatami.",
    authenticity: "unverified-source",
    structuredDataEligible: false,
  },
  "/mma-training.jpg": {
    source: "/media/mma-training-1600.webp",
    variants: [640, 1024, 1600].map((width) => ({ src: `/media/mma-training-${width}.webp`, width })),
    width: 1800,
    height: 1200,
    alt: "Exercice technique encadré pendant un entraînement de MMA",
    title: "Entraînement technique de MMA",
    caption: "Travail technique encadré reliant les différentes distances du MMA.",
    description: "Photographie éditoriale utilisée pour présenter le cours de MMA adulte.",
    authenticity: "unverified-source",
    structuredDataEligible: false,
  },
  "/kids-martial-arts.jpg": {
    source: "/media/kids-martial-arts-1600.webp",
    variants: [640, 1024, 1600].map((width) => ({ src: `/media/kids-martial-arts-${width}.webp`, width })),
    width: 1800,
    height: 1229,
    alt: "Enfants participant à un exercice d’arts martiaux encadré",
    title: "Cours d’arts martiaux pour enfants",
    caption: "Exercice collectif adapté à l’apprentissage des enfants.",
    description: "Image éditoriale représentant une activité martiale pour enfants.",
    authenticity: "unverified-source",
    structuredDataEligible: false,
  },
  "/kids-hero.webp": {
    source: "/media/kids-hero-1536.webp",
    variants: [640, 1024, 1536].map((width) => ({ src: `/media/kids-hero-${width}.webp`, width })),
    width: 1536,
    height: 1024,
    alt: "Illustration provisoire d’un coach accompagnant un groupe d’enfants",
    title: "Visuel provisoire du programme Kids",
    caption: "Visuel provisoire à remplacer par une photographie authentique et autorisée de l’académie.",
    description: "Image générée utilisée temporairement pour matérialiser la direction du programme Kids.",
    authenticity: "provisional-generated",
    structuredDataEligible: false,
  },
};

export function getImageSeoRecord(source: string) {
  return imageSeoRegistry[source];
}

export function validateImageSeoRegistry() {
  return Object.values(imageSeoRegistry).flatMap((image) => {
    const issues: string[] = [];
    if (!image.alt.trim()) issues.push(`${image.source}: alt manquant`);
    if (!image.title.trim()) issues.push(`${image.source}: title manquant`);
    if (!image.caption.trim()) issues.push(`${image.source}: caption manquant`);
    if (!image.description.trim()) issues.push(`${image.source}: description manquante`);
    if (!image.variants.length || image.variants.some((variant) => !variant.src.endsWith(".webp"))) issues.push(`${image.source}: variantes WebP invalides`);
    if (image.structuredDataEligible && image.authenticity !== "verified-academy") issues.push(`${image.source}: ImageObject interdit sans authenticité vérifiée`);
    return issues;
  });
}
