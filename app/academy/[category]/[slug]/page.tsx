import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpenCheck, CircleHelp, Swords } from "lucide-react";
import { Container, FloatingCTA, Footer, Header, Icon } from "../../../components";
import { academyArticleHref, getAcademyArticle, getAcademyArticleBySlug, getAcademyCategory, publishedAcademyArticles } from "../../../data/academy";
import { getRequestOrigin } from "../../../lib/site";
import { getImageSeoRecord } from "../../../seo/images";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema, buildImageObject } from "../../../seo/schema";
import { AcademyCategoryNav, AcademyFightyCTA, AcademyNewsletterCTA, ArticleAuthorityLinks, ArticleBody, ArticleFAQ, ArticleHero, ArticleTableOfContents, RelatedArticles } from "../../components";

type ArticlePageProps = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return publishedAcademyArticles.map((article) => ({ category: article.category, slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getAcademyArticle(category, slug);
  if (!article) return {};
  const origin = await getRequestOrigin();
  const url = `${origin}${academyArticleHref(article)}`;
  const imageRecord = article.image ? getImageSeoRecord(article.image) : undefined;
  const image = imageRecord?.structuredDataEligible ? `${origin}${imageRecord.source}` : `${origin}/og.jpg`;
  return {
    title: article.title,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: { title: article.title, description: article.metaDescription, url, type: "article", locale: "fr_FR", publishedTime: article.publishedAt, modifiedTime: article.updatedAt, authors: ["Strongbear BJJ & Grappling"], images: [{ url: image, alt: article.imageAlt ?? article.title }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.metaDescription, images: [image] },
  };
}

export default async function AcademyArticlePage({ params }: ArticlePageProps) {
  const { category: categorySlug, slug } = await params;
  const article = getAcademyArticle(categorySlug, slug);
  const category = getAcademyCategory(categorySlug);
  if (!article || !category || !article.sections || !article.faq || !article.publishedAt || !article.updatedAt) notFound();
  const origin = await getRequestOrigin();
  const url = `${origin}${academyArticleHref(article)}`;
  const related = (article.related ?? []).map(getAcademyArticleBySlug).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const imageRecord = article.image ? getImageSeoRecord(article.image) : undefined;
  const imageObject = imageRecord ? buildImageObject(origin, imageRecord) : null;
  const schemas = [
    buildArticleSchema({ origin, url, title: article.title, description: article.metaDescription, publishedAt: article.publishedAt, updatedAt: article.updatedAt, section: category.name, keywords: article.keywords, image: imageObject }),
    buildFaqSchema(article.faq),
    buildBreadcrumbSchema([{ name: "Accueil", url: origin }, { name: "Academy", url: `${origin}/academy` }, { name: category.name, url: `${origin}/academy/${category.slug}` }, { name: article.cardTitle, url }]),
  ].filter(Boolean);

  return <>
    <Header />
    <main className="academy-page academy-article-page" id="contenu">
      <ArticleHero article={article} category={category} />
      <AcademyCategoryNav active={category.slug} />
      <Container className="article-layout">
        <aside className="article-sidebar"><ArticleTableOfContents sections={article.sections} /><div className="article-sidebar-links"><a href={`/academy/${category.slug}`}><Icon icon={BookOpenCheck} size="sm" />Tous les guides {category.shortName}<Icon icon={ArrowRight} size="sm" /></a>{category.disciplineHref && <a href={category.disciplineHref}><Icon icon={Swords} size="sm" />Découvrir la discipline<Icon icon={ArrowRight} size="sm" /></a>}<a href="#questions-frequentes"><Icon icon={CircleHelp} size="sm" />Questions fréquentes<Icon icon={ArrowRight} size="sm" /></a></div></aside>
        <div className="article-main"><div className="article-introduction"><p className="eyebrow">Introduction</p><p>Vous n’avez pas besoin de connaître les codes du tatami avant d’entrer. Ce guide vous donne les repères utiles, dans l’ordre où vous en aurez besoin, sans transformer une première séance en examen.</p></div><ArticleBody sections={article.sections} /><ArticleFAQ items={article.faq} />{article.authorityLinks && <ArticleAuthorityLinks links={article.authorityLinks} />}</div>
      </Container>
      <Container><RelatedArticles articles={related} /></Container>
      <section className="academy-conversion-section"><Container><AcademyFightyCTA /><AcademyNewsletterCTA /></Container></section>
    </main>
    <FloatingCTA label="Essai septembre" />
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
  </>;
}
