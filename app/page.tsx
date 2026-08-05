import type { Metadata } from "next";
import { headers } from "next/headers";
import { AcademyCard, ButtonLink, Container, DisciplineCard, FightyCTA, FloatingCTA, Footer, Header, SectionTitle } from "./components";
import { FightyTrustJourney, TrustIndicators, WhyStrongbear } from "./trust-components";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const image = `${origin}/og.png`;
  return {
    title: "Arts martiaux à Marines | Strongbear BJJ & Grappling",
    description: "Jiu-Jitsu Brésilien, Grappling et MMA avec un seul abonnement à Marines, au cœur du Vexin. Réservez votre essai gratuit sur Fighty.",
    alternates: { canonical: origin },
    openGraph: { title: "Strongbear BJJ & Grappling", description: "Trois disciplines. Un abonnement. Une équipe.", url: origin, images: [{ url: image, width: 1536, height: 864, alt: "Strongbear BJJ & Grappling à Marines" }], type: "website", locale: "fr_FR" },
    twitter: { card: "summary_large_image", title: "Strongbear BJJ & Grappling", description: "Trois disciplines. Un abonnement. Une équipe.", images: [image] },
  };
}

const academy = [
  { category: "Débutants", title: "Bien préparer son premier cours de JJB", summary: "Tenue, état d’esprit et déroulé : tous les repères pour commencer sereinement." },
  { category: "Comparaisons", title: "JJB, Grappling ou MMA : que choisir ?", summary: "Trois pratiques complémentaires, expliquées simplement selon vos objectifs." },
  { category: "Parents", title: "Ce que les arts martiaux apportent aux enfants", summary: "Confiance, coordination, respect et plaisir d’apprendre dans un cadre sûr." },
];

export default function Home() {
  const organization = {"@context":"https://schema.org","@type":"SportsActivityLocation","name":"Strongbear BJJ & Grappling","address":{"@type":"PostalAddress","addressLocality":"Marines","addressRegion":"Val-d’Oise","addressCountry":"FR"},"sport":["Brazilian Jiu-Jitsu","Grappling","Mixed Martial Arts"]};
  return <>
    <Header />
    <main id="contenu">
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src="/bjj-hero.jpg" alt="Entraînement de jiu-jitsu brésilien chez Strongbear" width="2400" height="1600" fetchPriority="high" />
        <div className="hero-shade"></div>
        <Container className="hero-inner">
          <p className="eyebrow eyebrow-inverse">Marines · Val-d’Oise · Académie d’arts martiaux</p>
          <h1 id="hero-title"><span>Trois disciplines.</span><span>Un abonnement.</span><span>Une équipe.</span></h1>
          <p className="hero-copy">Jiu-Jitsu Brésilien, Grappling et MMA réunis dans une académie conviviale, ambitieuse et profondément technique.</p>
          <div className="hero-actions"><FightyCTA label="Réserver mon essai gratuit" /><ButtonLink href="#disciplines">Découvrir les cours</ButtonLink></div>
        </Container>
      </section>

      <TrustIndicators items={[
        { value: "3", label: "disciplines adultes", detail: "JJB · Grappling · MMA" },
        { value: "1", label: "abonnement adulte", detail: "Un parcours sans cloison" },
        { value: "Marines", label: "au cœur du Vexin", detail: "Val-d’Oise" },
        { value: "0 €", label: "premier essai", detail: "Réservation sur Fighty" },
      ]} />

      <section className="section about-section" id="strongbear">
        <Container className="about-grid">
          <div className="about-visual"><img src="/bjj-class.jpg" alt="Cours technique de jiu-jitsu brésilien chez Strongbear" width="1800" height="1200" loading="lazy" /><span>Marines · Vexin</span><div className="image-caption"><strong>Technique</strong><small>Avant l’intensité</small></div></div>
          <div className="about-copy"><SectionTitle eyebrow="Notre académie" title="L’exigence technique. Sans l’ego." intro="Un enseignement précis, un collectif bienveillant et des repères clairs pour progresser durablement — quel que soit votre point de départ." /><blockquote>“La progression naît d’un cadre exigeant où chacun se sent à sa place.”</blockquote><ul><li>Débutants réellement accompagnés</li><li>Enseignement structuré par niveaux</li><li>Ambiance responsable et soudée</li><li>Objectifs loisir ou compétition</li></ul><FightyCTA label="Rencontrer l’équipe" /></div>
        </Container>
      </section>

      <WhyStrongbear compact />

      <section className="section disciplines-section" id="disciplines">
        <Container><div className="section-heading-row"><SectionTitle eyebrow="Les disciplines" title="Un parcours complet." intro="Trois manières de comprendre le combat. Une seule équipe pour vous accompagner." /><span className="section-index">01 — 03</span></div><div className="disciplines-grid">
          <DisciplineCard index="01" title="Jiu-Jitsu Brésilien" detail="Avec kimono · Tous niveaux" description="Contrôle, stratégie et précision au sol." href="/jiu-jitsu-bresilien" image="/bjj-class.jpg" alt="Cours de Jiu-Jitsu Brésilien à Marines" />
          <DisciplineCard index="02" title="Grappling" detail="Sans kimono · Tous niveaux" description="Fluidité, mobilité et maîtrise des positions." href="/grappling" image="/bjj-hero.jpg" alt="Entraînement de Grappling à Marines" />
          <DisciplineCard index="03" title="MMA" detail="Pratique complète · Encadrée" description="Relier les distances avec calme et méthode." href="/mma" image="/mma-training.jpg" alt="Entraînement de MMA à Marines" />
        </div></Container>
      </section>

      <section className="kids-section" id="kids"><div className="kids-image"><img src="/kids-martial-arts.jpg" alt="Cours d’arts martiaux pour enfants à Marines" width="1800" height="1200" loading="lazy" /><span>Strongbear Kids</span></div><div className="kids-copy"><p className="eyebrow">Programme enfants</p><h2>Grandir.<br/>Avec confiance.</h2><p>Une pédagogie adaptée aux enfants, pensée pour développer la coordination, le respect, l’autonomie et le plaisir de progresser.</p><div className="kids-values"><span>Confiance</span><span>Respect</span><span>Discipline</span><span>Sécurité</span></div><ButtonLink href="/kids" variant="text">Découvrir Strongbear Kids</ButtonLink></div></section>

      <section className="schedule-section" id="planning"><Container className="schedule-grid"><div><p className="eyebrow eyebrow-inverse">Planning & accès</p><h2>Entraînez-vous.<br/><span>Sans limites.</span></h2></div><div className="schedule-copy"><p>Un seul abonnement adulte. Un accès illimité au Jiu-Jitsu Brésilien, au Grappling et au MMA.</p><small>Les créneaux à jour et les réservations sont disponibles sur Fighty.</small><FightyCTA label="Voir le planning sur Fighty" /></div></Container></section>

      <section className="section academy-section" id="academy"><Container><div className="academy-heading"><SectionTitle eyebrow="Strongbear Academy" title="Comprendre. Puis pratiquer." intro="Des contenus éditoriaux utiles pour les débutants, les parents et les pratiquants curieux." /><ButtonLink href="/academy" variant="text">Explorer l’Academy</ButtonLink></div><div className="academy-grid">{academy.map((article,index)=><AcademyCard key={article.title} index={`0${index+1}`} {...article}/>)}</div></Container></section>

      <FightyTrustJourney />

      <section className="final-cta"><Container><p className="eyebrow eyebrow-inverse">Votre premier pas</p><h2>Entrez dans<br/>l’équipe.</h2><p>Votre essai se réserve en quelques instants sur Fighty. Nous nous occupons de votre accueil sur le tatami.</p><FightyCTA label="Réserver mon essai gratuit" /></Container></section>
    </main>
    <FloatingCTA label="Essai gratuit" />
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(organization)}} />
  </>;
}
