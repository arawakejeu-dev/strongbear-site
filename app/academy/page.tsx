import type { Metadata } from "next";
import { Container, FloatingCTA, Footer, Header } from "../components";
import { academyArticles, academyCategories, publishedAcademyArticles } from "../data/academy";
import { getRequestOrigin } from "../lib/site";
import { AcademyArticleCard, AcademyCategoryCard, AcademyCategoryNav, AcademyFightyCTA, AcademyMasthead, AcademyNewsletterCTA } from "./components";

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getRequestOrigin();
  const url = `${origin}/academy`;
  return {
    title: "Strongbear Academy — Guides JJB, Grappling, MMA et Parents",
    description: "Guides experts sur le Jiu-Jitsu Brésilien, le Grappling, le MMA et les arts martiaux pour enfants à Marines et dans le Vexin.",
    alternates: { canonical: url },
    openGraph: { title: "Strongbear Academy — Comprendre. Puis pratiquer.", description: "L’Academy premium dédiée au JJB, au Grappling, au MMA et aux parents dans le Vexin.", url, type: "website", locale: "fr_FR", images: [{ url: `${origin}/og.jpg`, width: 1729, height: 910, alt: "Strongbear Academy" }] },
    twitter: { card: "summary_large_image", title: "Strongbear Academy", description: "Comprendre. Puis pratiquer.", images: [`${origin}/og.jpg`] },
  };
}

export default async function AcademyPage() {
  const origin = await getRequestOrigin();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Strongbear Academy",
    description: "Guides experts sur le Jiu-Jitsu Brésilien, le Grappling, le MMA et les arts martiaux pour enfants.",
    url: `${origin}/academy`,
    isPartOf: { "@type": "WebSite", name: "Strongbear BJJ & Grappling", url: origin },
    about: academyCategories.map((category) => category.name),
  };

  return <>
    <Header />
    <main className="academy-page" id="contenu">
      <AcademyMasthead />
      <AcademyCategoryNav />

      <section className="academy-featured-section"><Container>
        <div className="academy-editorial-heading"><div><p className="eyebrow">Guide à la une</p><h2>Commencer avec<br />des repères clairs.</h2></div><p>Un guide complet pour comprendre le déroulé d’un premier cours, préparer votre venue et avancer sans pression.</p></div>
        <div className="academy-featured-grid">{publishedAcademyArticles.map((article, index) => <AcademyArticleCard article={article} index={index} featured key={article.slug} />)}</div>
      </Container></section>

      <section className="academy-categories-section" id="categories"><Container>
        <div className="academy-editorial-heading"><div><p className="eyebrow">Six collections</p><h2>Une question.<br />Le bon univers.</h2></div><p>Débutants, parents et pratiquants retrouvent leurs repères dans une collection dédiée, avec des réponses claires et vérifiées.</p></div>
        <div className="academy-categories-grid">{academyCategories.map((category) => <AcademyCategoryCard category={category} articleCount={academyArticles.filter((article) => article.category === category.slug).length} key={category.slug} />)}</div>
      </Container></section>

      <section className="academy-method-section"><Container className="academy-method-grid"><div><p className="eyebrow eyebrow-inverse">Notre méthode éditoriale</p><h2>Utile avant d’être visible.</h2></div><ol><li><span>01</span><div><h3>Répondre complètement</h3><p>Une intention de recherche, une réponse structurée, aucune répétition artificielle.</p></div></li><li><span>02</span><div><h3>Expliquer honnêtement</h3><p>Les limites, les variantes et les exigences de sécurité restent visibles.</p></div></li><li><span>03</span><div><h3>Relier les sujets</h3><p>Chaque guide ouvre vers une discipline, une FAQ et la prochaine lecture logique.</p></div></li><li><span>04</span><div><h3>Inviter sans pousser</h3><p>Le CTA intervient après la réponse, lorsque le lecteur sait pourquoi essayer.</p></div></li></ol></Container></section>

      <section className="academy-conversion-section"><Container><AcademyFightyCTA /><AcademyNewsletterCTA /></Container></section>
    </main>
    <FloatingCTA label="Essai septembre" />
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
