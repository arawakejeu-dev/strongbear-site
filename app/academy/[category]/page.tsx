import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, FloatingCTA, Footer, Header } from "../../components";
import { academyCategories, getAcademyArticlesByCategory, getAcademyCategory } from "../../data/academy";
import { getRequestOrigin } from "../../lib/site";
import { buildBreadcrumbSchema } from "../../seo/schema";
import { AcademyArticleCard, AcademyCategoryHero, AcademyCategoryNav, AcademyFightyCTA, AcademyNewsletterCTA } from "../components";

type CategoryPageProps = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return academyCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getAcademyCategory(slug);
  if (!category) return {};
  const origin = await getRequestOrigin();
  const url = `${origin}/academy/${category.slug}`;
  const isParents = category.slug === "enfants-parents";
  const title = isParents ? "Guides parents — Strongbear Kids" : `${category.name} — Strongbear Academy`;
  return {
    title,
    description: category.description,
    alternates: { canonical: url },
    openGraph: { title, description: category.promise, url, type: "website", locale: "fr_FR", images: [{ url: `${origin}/og.jpg`, width: 1729, height: 910, alt: category.name }] },
    twitter: { card: "summary_large_image", title, description: category.promise, images: [`${origin}/og.jpg`] },
  };
}

export default async function AcademyCategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getAcademyCategory(slug);
  if (!category) notFound();
  const articles = getAcademyArticlesByCategory(slug);
  const origin = await getRequestOrigin();
  const isParents = category.slug === "enfants-parents";
  const structuredData = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: category.name, description: category.description, url: `${origin}/academy/${category.slug}`, isPartOf: { "@type": "WebPage", name: isParents ? "Strongbear Kids" : "Strongbear Academy", url: isParents ? `${origin}/kids` : `${origin}/academy` } },
    buildBreadcrumbSchema(isParents ? [{ name: "Accueil", url: origin }, { name: "Kids", url: `${origin}/kids` }, { name: "Parents", url: `${origin}/academy/${category.slug}` }] : [{ name: "Accueil", url: origin }, { name: "Academy", url: `${origin}/academy` }, { name: category.name, url: `${origin}/academy/${category.slug}` }]),
  ];

  return <>
    <Header />
    <main className="academy-page" id="contenu">
      <AcademyCategoryHero category={category} articleCount={articles.length} />
      <AcademyCategoryNav active={category.slug} />
      <section className="academy-category-list"><Container>
        <div className="academy-category-list-heading"><p className="eyebrow">Collection {category.number}</p><h2>{category.promise}</h2><p>Les prochains sujets sont annoncés avec transparence. Chaque guide devient accessible après validation pédagogique et éditoriale.</p></div>
        <div className="academy-articles-grid">{articles.map((article, index) => <AcademyArticleCard article={article} index={index} featured={article.status === "published"} key={article.slug} />)}</div>
      </Container></section>
      <section className="academy-conversion-section"><Container><AcademyFightyCTA /><AcademyNewsletterCTA /></Container></section>
    </main>
    <FloatingCTA label="Cours d’essai" />
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
