import type { FAQItem } from "../data/faqs";
import type { ImageSeoRecord } from "./images";

export type JsonLd = Record<string, unknown>;
export type BreadcrumbInput = { name: string; url: string };

export function buildOrganizationSchema(origin: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: "Strongbear BJJ & Grappling",
        url: origin,
        logo: { "@type": "ImageObject", url: `${origin}/og.png` },
      },
      {
        "@type": ["SportsActivityLocation", "LocalBusiness"],
        "@id": `${origin}/#academy`,
        name: "Strongbear BJJ & Grappling",
        url: origin,
        parentOrganization: { "@id": `${origin}/#organization` },
        address: { "@type": "PostalAddress", addressLocality: "Marines", postalCode: "95640", addressRegion: "Val-d’Oise", addressCountry: "FR" },
        areaServed: ["Marines", "Vexin français", "Val-d’Oise"],
        sport: ["Brazilian Jiu-Jitsu", "Grappling", "Mixed Martial Arts"],
      },
    ],
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbInput[]): JsonLd {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: item.url })) };
}

export function buildFaqSchema(items: FAQItem[]): JsonLd | null {
  if (!items.length) return null;
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
}

export function buildImageObject(origin: string, image: ImageSeoRecord): JsonLd | null {
  if (!image.structuredDataEligible || image.authenticity !== "verified-academy") return null;
  return { "@type": "ImageObject", contentUrl: `${origin}${image.source}`, width: image.width, height: image.height, caption: image.caption, description: image.description, representativeOfPage: true };
}

export function buildArticleSchema(input: { origin: string; url: string; title: string; description: string; publishedAt: string; updatedAt: string; section: string; keywords: string[]; image?: JsonLd | null }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt,
    articleSection: input.section,
    keywords: input.keywords.join(", "),
    inLanguage: "fr-FR",
    image: input.image || undefined,
    author: { "@id": `${input.origin}/#organization` },
    publisher: { "@id": `${input.origin}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
  };
}

export function buildVerifiedReviewSchema(input: { origin: string; verified: boolean; sourceUrl?: string; author: string; body: string; rating: number; publishedAt: string }): JsonLd | null {
  if (!input.verified || !input.sourceUrl || input.rating < 1 || input.rating > 5) return null;
  return { "@context": "https://schema.org", "@type": "Review", url: input.sourceUrl, author: { "@type": "Person", name: input.author }, reviewBody: input.body, datePublished: input.publishedAt, reviewRating: { "@type": "Rating", ratingValue: input.rating, bestRating: 5, worstRating: 1 }, itemReviewed: { "@id": `${input.origin}/#academy` } };
}

export function buildVerifiedVideoSchema(input: { verified: boolean; name: string; description: string; thumbnailUrl?: string; uploadDate?: string; contentUrl?: string; embedUrl?: string; duration?: string }): JsonLd | null {
  if (!input.verified || !input.thumbnailUrl || !input.uploadDate || (!input.contentUrl && !input.embedUrl)) return null;
  return { "@context": "https://schema.org", "@type": "VideoObject", name: input.name, description: input.description, thumbnailUrl: [input.thumbnailUrl], uploadDate: input.uploadDate, contentUrl: input.contentUrl, embedUrl: input.embedUrl, duration: input.duration };
}

export function buildVerifiedEventSchema(input: { origin: string; verified: boolean; name: string; description: string; startDate?: string; endDate?: string; eventStatus?: string; url?: string; locationName?: string; addressLocality?: string; image?: string }): JsonLd | null {
  if (!input.verified || !input.startDate || !input.locationName || !input.addressLocality) return null;
  return { "@context": "https://schema.org", "@type": "Event", name: input.name, description: input.description, startDate: input.startDate, endDate: input.endDate, eventStatus: input.eventStatus ?? "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", url: input.url, image: input.image ? [input.image] : undefined, location: { "@type": "Place", name: input.locationName, address: { "@type": "PostalAddress", addressLocality: input.addressLocality, addressCountry: "FR" } }, organizer: { "@id": `${input.origin}/#organization` } };
}
