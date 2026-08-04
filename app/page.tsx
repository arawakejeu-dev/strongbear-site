import type { Metadata } from "next";
import { headers } from "next/headers";
import { ButtonLink, Container, DisciplineCard, FightyCTA, Footer, Header, SectionTitle } from "./components";

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
    openGraph: { title: "Strongbear BJJ & Grappling", description: "Trois disciplines. Un abonnement. Une équipe.", url: origin, images: [{ url: image, width: 1536, height: 864, alt: "Strongbear — Trois disciplines. Un abonnement. Une équipe." }], type: "website", locale: "fr_FR" },
    twitter: { card: "summary_large_image", title: "Strongbear BJJ & Grappling", description: "Trois disciplines. Un abonnement. Une équipe.", images: [image] },
  };
}

const values = [
  ["01", "Technique", "Une pédagogie précise pour comprendre, progresser et construire des bases solides."],
  ["02", "Communauté", "Un collectif exigeant et bienveillant, où chacun trouve sa place sur le tatami."],
  ["03", "Progression", "Des repères clairs, du premier cours aux objectifs les plus ambitieux."],
  ["04", "Respect", "Une culture calme, responsable et tournée vers le travail bien fait."],
];

const academy = [
  ["Débutants", "Bien préparer son premier cours de JJB", "Les repères essentiels pour arriver serein et profiter pleinement de sa séance."],
  ["Comparaisons", "JJB, Grappling ou MMA : que choisir ?", "Comprendre les différences pour trouver la pratique qui vous correspond."],
  ["Parents", "Pourquoi les arts martiaux aident les enfants à grandir", "Confiance, coordination, respect : ce que l’entraînement développe réellement."],
];

export default function Home() {
  const organization = {"@context":"https://schema.org","@type":"SportsActivityLocation","name":"Strongbear BJJ & Grappling","address":{"@type":"PostalAddress","addressLocality":"Marines","addressRegion":"Val-d’Oise","addressCountry":"FR"},"sport":["Brazilian Jiu-Jitsu","Grappling","Mixed Martial Arts"]};
  return <>
    <Header />
    <main id="contenu">
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src="/bjj-hero.jpg" alt="Deux pratiquants de jiu-jitsu brésilien travaillent une technique au sol" width="2400" height="1600" fetchPriority="high" />
        <div className="hero-overlay"></div>
        <Container className="hero-inner">
          <p className="eyebrow eyebrow-light">Académie d’arts martiaux · Marines</p>
          <h1 id="hero-title"><span>Trois disciplines.</span><span>Un abonnement.</span><span className="hero-accent">Une équipe.</span></h1>
          <p className="hero-copy">Entraînez-vous en Jiu-Jitsu Brésilien, Grappling et MMA dans une académie conviviale, exigeante et profondément technique.</p>
          <div className="hero-actions"><FightyCTA label="Réserver un essai gratuit" /><ButtonLink href="#strongbear">Découvrir Strongbear</ButtonLink></div>
        </Container>
        <div className="hero-meta" aria-hidden="true"><span>49.1539° N</span><span>Marines · Vexin</span><span>Faire défiler ↓</span></div>
      </section>

      <section className="section section-values" id="strongbear">
        <Container><div className="values-heading"><SectionTitle eyebrow="Pourquoi Strongbear" title="L’exigence technique. Sans l’ego." intro="Nous croyons à une pratique qui fait progresser durablement — dans un cadre sérieux, humain et accueillant."/><p className="values-number">01—04</p></div><div className="values-grid">{values.map(([n,title,copy])=><article className="value-item" key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></Container>
      </section>

      <section className="section section-disciplines" id="disciplines">
        <Container><SectionTitle eyebrow="Un abonnement adulte" title="Trois façons de progresser." intro="Alternez les disciplines librement. Développez une pratique complète, à votre rythme."/><div className="disciplines-grid">
          <DisciplineCard index="01" title="Jiu-Jitsu Brésilien" description="Le contrôle, la stratégie et la précision avec kimono." href="/jiu-jitsu-bresilien" image="/bjj-class.jpg" alt="Pratiquants de jiu-jitsu brésilien pendant un cours technique"/>
          <DisciplineCard index="02" title="Grappling" description="La fluidité du combat au sol, sans kimono." href="/grappling" image="/bjj-hero.jpg" alt="Échange technique de grappling au sol"/>
          <DisciplineCard index="03" title="MMA" description="Relier les distances avec méthode et maîtrise." href="/mma" image="/mma-training.jpg" alt="Athlète travaillant ses frappes sur un sac"/>
        </div></Container>
      </section>

      <section className="kids-section">
        <div className="kids-image-wrap"><img src="/kids-martial-arts.jpg" alt="Enfants participant à une séance d’arts martiaux encadrée" width="1800" height="1200" loading="lazy" /></div>
        <div className="kids-content"><p className="eyebrow">Strongbear Kids</p><h2>Grandir avec confiance.</h2><p className="kids-lead">Une pratique pensée pour aider les enfants à développer respect, coordination, discipline et plaisir de progresser.</p><ul><li>Confiance</li><li>Respect</li><li>Coordination</li><li>Sécurité</li></ul><ButtonLink href="/kids">Découvrir Strongbear Kids</ButtonLink></div>
      </section>

      <section className="section process-section">
        <Container><SectionTitle eyebrow="Votre premier cours" title="Simple dès le départ."/><ol className="process-grid"><li><span>01</span><div><h3>Choisissez</h3><p>JJB, Grappling, MMA ou Kids : trouvez le cours adapté à votre objectif.</p></div></li><li><span>02</span><div><h3>Réservez</h3><p>Votre essai se réserve en quelques instants sur la plateforme Fighty.</p></div></li><li><span>03</span><div><h3>Montez sur le tatami</h3><p>Venez comme vous êtes. L’équipe vous accompagne dès votre arrivée.</p></div></li></ol><div className="process-action"><FightyCTA label="Choisir mon cours sur Fighty"/></div></Container>
      </section>

      <section className="schedule-section">
        <Container className="schedule-grid"><div><p className="eyebrow eyebrow-light">Le planning</p><h2>Entraînez-vous.<br/>Souvent.</h2></div><div className="schedule-copy"><p>Un seul abonnement adulte vous donne accès au Jiu-Jitsu Brésilien, au Grappling et au MMA.</p><p className="schedule-note">Les créneaux et disponibilités à jour sont consultables directement sur Fighty.</p><FightyCTA label="Voir le planning sur Fighty"/></div></Container>
      </section>

      <section className="section proof-section">
        <Container><div className="proof-layout"><div className="proof-stat"><span>+1</span><p>Une équipe qui avance ensemble, du premier cours à la compétition.</p></div><div><SectionTitle eyebrow="Une culture du progrès" title="La confiance se construit sur le tatami." intro="Une académie n’est pas une promesse. C’est la qualité de chaque accueil, de chaque explication et de chaque entraînement."/><div className="proof-points"><span>Débutants accompagnés</span><span>Pratique technique</span><span>Ambiance responsable</span></div></div></div></Container>
      </section>

      <section className="section academy-section">
        <Container><div className="academy-heading"><SectionTitle eyebrow="Strongbear Academy" title="Comprendre avant de commencer." intro="Des guides clairs pour les débutants, les parents et tous ceux qui veulent mieux connaître les disciplines."/><ButtonLink href="/academy" variant="text">Explorer l’Academy</ButtonLink></div><div className="academy-grid">{academy.map(([category,title,summary],index)=><article className="academy-card" key={title}><span>0{index+1} · {category}</span><h3><a href="/academy">{title}</a></h3><p>{summary}</p><span className="academy-arrow" aria-hidden="true">↗</span></article>)}</div></Container>
      </section>

      <section className="final-cta"><Container><p className="eyebrow eyebrow-light">Votre premier pas</p><h2>Le prochain entraînement<br/>peut être le vôtre.</h2><p>Réservez votre essai gratuit et découvrez Strongbear sur le tatami.</p><FightyCTA label="Réserver sur Fighty"/></Container></section>
    </main>
    <aside className="floating-cta" aria-label="Réservation rapide"><FightyCTA label="Essai gratuit"/></aside>
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(organization)}} />
  </>;
}
