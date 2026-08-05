import type { MetadataRoute } from "next";
import { academyArticleHref, academyCategories, publishedAcademyArticles } from "./data/academy";
import { productionSiteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: productionSiteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${productionSiteUrl}/kids`, lastModified: now, changeFrequency: "monthly", priority: .8 },
    { url: `${productionSiteUrl}/academy`, lastModified: now, changeFrequency: "weekly", priority: .9 },
    ...academyCategories.map((category) => ({ url: `${productionSiteUrl}/academy/${category.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: .75 })),
    ...publishedAcademyArticles.map((article) => ({ url: `${productionSiteUrl}${academyArticleHref(article)}`, lastModified: new Date(article.updatedAt ?? article.publishedAt ?? now), changeFrequency: "monthly" as const, priority: .7 })),
  ];
}
