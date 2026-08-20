import type { Metadata } from "next";
import type { FAQItem } from "./data/faqs";
import { ButtonLink, Container, FAQ, FeatureCell, FightyCTA, FloatingCTA, Footer, Header, Hero, PricingCard, ScheduleCard, SectionTitle } from "./components";
import { getDisciplineSchedule, practicalInfo, type DisciplineKey } from "./data/practical-info";
import { getRequestOrigin } from "./lib/site";
import { buildBreadcrumbSchema, buildFaqSchema } from "./seo/schema";

export type LocalDisciplineData = {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  image: string;
  alt: string;
  overviewTitle: string;
  overview: string[];
  audience: Array<{ title: string; copy: string }>;
  benefits: Array<{ title: string; copy: string }>;
  classSteps: Array<{ title: string; copy: string }>;
  academyLinks: Array<{ label: string; href: string }>;
  localLinks?: Array<{ label: string; href: string }>;
  faq: FAQItem[];
  scheduleKey: DisciplineKey;
};

export async function buildLocalDisciplineMetadata(data: LocalDisciplineData): Promise<Metadata> {
  const origin = await getRequestOrigin();
  const url = `${origin}/${data.slug}`;
  const image = `${origin}/og.jpg`;
  return {
    title: { absolute: data.title },
    description: data.description,
    alternates: { canonical: url },
    openGraph: { title: data.title, description: data.description, url, type: "website", locale: "fr_FR", images: [{ url: image, width: 1729, height: 910, alt: `${data.name} à Marines — Strongbear` }] },
    twitter: { card: "summary_large_image", title: data.title, description: data.description, images: [image] },
  };
}

export async function LocalDisciplinePage({ data }: { data: LocalDisciplineData }) {
  const origin = await getRequestOrigin();
  const url = `${origin}/${data.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Cours de ${data.name} à Marines`,
      description: data.description,
      url,
      provider: { "@id": `${origin}/#academy` },
      areaServed: ["Marines", "Vexin français", "Val-d’Oise"],
      serviceType: `Cours de ${data.name}`,
      audience: { "@type": "PeopleAudience", audienceType: "Adultes, débutants et pratiquants confirmés" },
    },
    buildBreadcrumbSchema([{ name: "Accueil", url: origin }, { name: `${data.shortName} à Marines`, url }]),
    buildFaqSchema(data.faq),
  ].filter(Boolean);
  const schedule = getDisciplineSchedule(data.scheduleKey);

  return <>
    <Header />
    <main className="local-discipline-page" id="contenu">
      <Hero eyebrow={data.eyebrow} title={data.h1} intro={data.intro} image={data.image} alt={data.alt} primaryLabel="Réserver mon cours d’essai" secondaryLabel="Découvrir le cours" secondaryHref="#cours" />

      <section className="section local-discipline-intro" id="cours"><Container className="local-discipline-two-columns">
        <SectionTitle inverse={false} eyebrow={`${data.shortName} · Strongbear Marines`} title={data.overviewTitle} />
        <div className="local-discipline-prose">{data.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className="local-location-note">Les cours ont lieu à Marines, au cœur du Vexin, dans le Val-d’Oise.</p>{data.localLinks?.length ? <nav className="local-page-links" aria-label="Liens utiles">{data.localLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</nav> : null}</div>
      </Container></section>

      <section className="feature-section local-discipline-benefits"><Container><div className="section-heading-row"><SectionTitle eyebrow="Pourquoi pratiquer" title="Progresser avec méthode." intro={`Les bénéfices du ${data.name} se construisent séance après séance, dans un cadre technique et respectueux.`} /><span className="section-index">01 — 04</span></div><div className="feature-grid">{data.benefits.map((benefit, index) => <FeatureCell key={benefit.title} index={`0${index + 1}`} title={benefit.title} description={benefit.copy} />)}</div></Container></section>

      <section className="section local-discipline-audience"><Container><SectionTitle inverse={false} eyebrow="À qui s’adresse le cours" title="Votre point de départ est le bon." intro="L’équipe adapte les repères, les partenaires et l’intensité à votre expérience." /><div className="local-audience-grid">{data.audience.map((item, index) => <article className="local-audience-card reveal" key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></Container></section>

      <section className="local-training-section"><Container className="local-discipline-two-columns"><SectionTitle eyebrow="Un entraînement Strongbear" title="Comprendre. Essayer. Progresser." intro="Chaque séance suit une structure lisible pour apprendre en sécurité et repartir avec des repères concrets." /><ol className="local-training-steps">{data.classSteps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol></Container></section>

      <section className="section local-discovery-section" id="horaires"><Container><div className="local-discovery-grid"><div><p className="eyebrow">Horaires & réservation</p><h2>Commencer à Marines.</h2><p>Un seul abonnement adulte donne accès au Jiu-Jitsu Brésilien, au Grappling et au MMA.</p><FightyCTA label={`Réserver un essai ${data.shortName}`} /></div><aside><strong>Approfondir dans l’Academy</strong>{data.academyLinks.map((link) => <ButtonLink key={link.href} href={link.href} variant="text">{link.label}</ButtonLink>)}</aside></div><div className="schedule-list">{schedule.map((session) => <ScheduleCard key={`${session.day}-${session.time}`} day={session.day} time={session.time} discipline={session.discipline} level={`${session.venue.name} — ${session.venue.city}`} />)}</div><div className="kids-pricing-grid"><PricingCard name={practicalInfo.pricing.adults.label} price={practicalInfo.pricing.adults.price} period={practicalInfo.pricing.adults.period} description="Un abonnement = 3 disciplines." features={[...practicalInfo.pricing.adults.disciplines]} featured ctaLabel="Réserver mon cours d’essai" /></div></Container></section>

      <section className="section local-faq-section"><Container className="local-discipline-two-columns"><SectionTitle inverse={false} eyebrow="Questions fréquentes" title={`Avant votre premier cours de ${data.shortName}.`} intro="Les réponses essentielles pour arriver sereinement." /><FAQ items={data.faq} /></Container></section>

      <section className="final-cta"><Container><p className="eyebrow eyebrow-inverse">Strongbear · Marines</p><h2>Venez essayer.<br />Simplement.</h2><p>Réservez votre cours sur Fighty. L’équipe vous accueille, vous présente le cadre et vous accompagne dès la première séance.</p><FightyCTA label="Réserver mon cours d’essai" /></Container></section>
    </main>
    <FloatingCTA label="Cours d’essai" />
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
