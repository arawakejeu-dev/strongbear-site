/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import {
  Activity,
  BookOpenCheck,
  Brain,
  CalendarCheck,
  CheckCircle2,
  DoorOpen,
  Eye,
  Gamepad2,
  HandHeart,
  HeartHandshake,
  Repeat2,
  ShieldCheck,
  Smile,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";
import { ButtonLink, Container, FAQ, FightyCTA, FightyJourney, FloatingCTA, Footer, Header, Icon, PricingCard, ScheduleCard, SectionTitle } from "../components";
import { kidsFAQ } from "../data/faqs";
import { practicalInfo } from "../data/practical-info";
import { getRequestOrigin } from "../lib/site";
import { OptimizedImage } from "../seo/optimized-image";
import { buildBreadcrumbSchema, buildFaqSchema } from "../seo/schema";
import "./kids.css";

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getRequestOrigin();
  const url = `${origin}/kids`;
  const image = `${origin}/og.jpg`;
  return {
    title: "Arts martiaux enfants à Marines | Strongbear Kids",
    description: "Jiu-Jitsu Brésilien et Grappling à partir de 6 ans à Marines. Le cours d’essai est gratuit en septembre, puis à 10 €.",
    keywords: ["Kids martial arts Marines", "Brazilian Jiu-Jitsu kids Marines", "arts martiaux enfants Marines", "arts martiaux pour enfants Vexin", "JJB enfants Val-d'Oise"],
    alternates: { canonical: url },
    openGraph: { title: "Strongbear Kids — Grandir avec confiance", description: "Jiu-Jitsu et Grappling à partir de 6 ans à Marines. Un cadre sûr, positif et progressif.", url, type: "website", locale: "fr_FR", images: [{ url: image, width: 1729, height: 910, alt: "Strongbear BJJ & Grappling à Marines" }] },
    twitter: { card: "summary_large_image", title: "Strongbear Kids — Grandir avec confiance", description: "Jiu-Jitsu et Grappling à partir de 6 ans à Marines.", images: [image] },
  };
}

const childBenefits = [
  { icon: Sparkles, title: "Confiance", copy: "Oser essayer, progresser et être fier de ses efforts." },
  { icon: HandHeart, title: "Respect", copy: "Écouter, coopérer et prendre soin de ses partenaires." },
  { icon: Target, title: "Discipline", copy: "Apprendre à se concentrer et à suivre des repères simples." },
  { icon: Activity, title: "Coordination", copy: "Développer équilibre, mobilité et conscience du corps." },
  { icon: UsersRound, title: "Amitié", copy: "Trouver sa place dans un groupe encourageant et inclusif." },
  { icon: Brain, title: "Maîtrise de soi", copy: "Canaliser son énergie et réagir avec davantage de calme." },
];

const parentBenefits = [
  { icon: ShieldCheck, title: "Des professeurs diplômés", copy: "Tous nos professeurs sont diplômés et proposent des exercices adaptés, dans un cadre clair et attentif au bien-être de chaque enfant." },
  { icon: BookOpenCheck, title: "Une progression lisible", copy: "Votre enfant construit des bases techniques étape par étape, sans pression ni comparaison inutile." },
  { icon: HeartHandshake, title: "Un dialogue avec les parents", copy: "L’équipe reste disponible pour comprendre les besoins de votre enfant et accompagner son intégration." },
];

const classSteps = [
  { icon: HandHeart, title: "Accueil", copy: "Le coach accueille chaque enfant et rappelle le cadre de la séance." },
  { icon: Smile, title: "Jeux", copy: "Des jeux simples créent du lien et donnent envie de bouger." },
  { icon: Activity, title: "Échauffement", copy: "Mobilité, équilibre et coordination préparent le corps en douceur." },
  { icon: BookOpenCheck, title: "Technique", copy: "Une notion de Jiu-Jitsu est expliquée avec des mots adaptés." },
  { icon: Repeat2, title: "Exercices", copy: "Les enfants répètent à deux, toujours sous la supervision du coach." },
  { icon: Gamepad2, title: "Défis ludiques", copy: "De petits challenges permettent d’appliquer sans intimidation." },
  { icon: CheckCircle2, title: "Retour au calme", copy: "La séance se termine par un bilan positif et un rituel collectif." },
];

const ageGroups = [
  { age: "6–10 ans", label: "Fondamentaux", copy: "Bouger, écouter et découvrir les bases du Jiu-Jitsu à travers des jeux, des exercices techniques et un cadre très rassurant.", focus: ["Motricité", "Technique", "Confiance"] },
  { age: "11–14 ans", label: "Progression", copy: "Approfondir les fondamentaux, gagner en autonomie et mieux comprendre les situations avec responsabilité.", focus: ["Maîtrise", "Stratégie", "Collectif"] },
];

const kidsFightySteps = [
  { icon: CalendarCheck, title: "Réservez", copy: "Choisissez le créneau d’essai adapté sur Fighty." },
  { icon: DoorOpen, title: "Venez", copy: "Arrivez quelques minutes avant le cours avec une tenue confortable." },
  { icon: Eye, title: "Découvrez", copy: "Votre enfant participe à une séance encadrée, sans pression." },
  { icon: HeartHandshake, title: "Rejoignez l’équipe", copy: "Échangez avec l’équipe avant de choisir la suite sur Fighty." },
];

export default async function KidsPage() {
  const origin = await getRequestOrigin();
  const structuredData = [
    { "@context": "https://schema.org", "@type": "Service", name: "Strongbear Kids — Jiu-Jitsu et Grappling enfants", serviceType: "Cours d’arts martiaux pour enfants à partir de 6 ans", areaServed: { "@type": "AdministrativeArea", name: "Vexin, Val-d’Oise" }, provider: { "@id": `${origin}/#academy` }, audience: { "@type": "PeopleAudience", suggestedMinAge: 6, suggestedMaxAge: 14 } },
    buildFaqSchema(kidsFAQ),
    buildBreadcrumbSchema([{ name: "Accueil", url: origin }, { name: "Kids", url: `${origin}/kids` }]),
  ].filter(Boolean);

  return <>
    <Header variant="kids" />
    <main className="kids-page" id="contenu">
      <section className="kids-hero-page" aria-labelledby="kids-title">
        <Container className="kids-hero-grid">
          <div className="kids-hero-copy">
            <nav className="kids-breadcrumb" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span aria-hidden="true">/</span><span>Kids</span></nav>
            <p className="eyebrow">Strongbear Kids · Marines</p>
            <h1 id="kids-title">Aider les enfants à grandir avec confiance.</h1>
            <p>À partir de 6 ans, le Jiu-Jitsu Brésilien transmet respect, confiance, discipline et coordination dans un environnement sûr et positif.</p>
            <div className="kids-hero-actions"><FightyCTA label="Réserver le cours d’essai" /><ButtonLink href="#pedagogie" variant="text">Découvrir notre pédagogie</ButtonLink></div>
            <div className="kids-trust-line"><span><Icon icon={ShieldCheck} size="sm" />Cadre sécurisé</span><span><Icon icon={HeartHandshake} size="sm" />Encouragement positif</span></div>
          </div>
          <div className="kids-hero-media"><OptimizedImage source="/kids-hero.webp" alt="Enfants apprenant le Jiu-Jitsu avec l’ourson Strongbear" loading="eager" fetchPriority="high" sizes="(min-width: 64rem) 50vw, 100vw" /><div className="kids-photo-note"><strong>Apprendre.</strong><span>À son rythme.</span></div></div>
        </Container>
      </section>

      <section className="kids-page-section kids-benefits" id="benefices"><Container><SectionTitle inverse={false} eyebrow="Pour votre enfant" title="Des qualités qui grandissent avec lui." intro="Sur le tatami, chaque exercice devient une occasion d’apprendre à bouger, écouter, coopérer et persévérer." /><div className="kids-benefit-grid">{childBenefits.map((benefit, index) => <article className="kids-benefit-card reveal" key={benefit.title}><div><span>0{index + 1}</span><Icon icon={benefit.icon} /></div><h3>{benefit.title}</h3><p>{benefit.copy}</p></article>)}</div></Container></section>

      <section className="kids-parent-section" id="parents"><Container className="kids-parent-grid"><div><p className="eyebrow eyebrow-inverse">Pour les parents</p><h2>Vous nous confiez plus que leur temps.</h2><p>Vous devez savoir où votre enfant va, comment il est accompagné et ce que l’on attend de lui. Notre rôle est de rendre ce cadre clair dès le premier échange.</p><ButtonLink href="/academy/enfants-parents" variant="ghost">Consulter les guides parents</ButtonLink></div><div className="kids-parent-points">{parentBenefits.map((benefit) => <article key={benefit.title}><Icon icon={benefit.icon} /><div><h3>{benefit.title}</h3><p>{benefit.copy}</p></div></article>)}</div></Container></section>

      <section className="kids-page-section kids-philosophy" id="pedagogie"><Container className="kids-philosophy-grid"><div className="kids-philosophy-heading"><SectionTitle inverse={false} eyebrow="Notre pédagogie" title="Apprendre sérieusement. Sans se prendre trop au sérieux." intro="Le jeu ouvre la porte. La technique donne des repères. L’encouragement donne envie de continuer." /></div><div className="kids-philosophy-principles"><article><span>01</span><h3>Apprendre par le jeu</h3><p>Des situations ludiques rendent les mouvements compréhensibles et mémorables.</p></article><article><span>02</span><h3>Encourager les efforts</h3><p>Nous valorisons l’écoute, la persévérance et les petites victoires du quotidien.</p></article><article><span>03</span><h3>Progresser techniquement</h3><p>Chaque groupe suit un parcours adapté, avec des objectifs simples et progressifs.</p></article><article><span>04</span><h3>Protéger le cadre</h3><p>Pas d’intimidation. Les règles de sécurité et de respect ne sont jamais négociables.</p></article></div></Container></section>

      <section className="kids-page-section kids-class-flow"><Container><SectionTitle inverse={false} eyebrow="Une séance Kids" title="Des repères du début à la fin." intro="Un cours suit un rythme prévisible. Cette structure aide les enfants à se sentir en confiance et disponibles pour apprendre." /><ol className="kids-timeline">{classSteps.map((step, index) => <li className="reveal" key={step.title}><span>0{index + 1}</span><Icon icon={step.icon} /><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol></Container></section>

      <section className="kids-page-section kids-ages" id="ages"><Container><SectionTitle inverse={false} eyebrow="À partir de 6 ans" title="Grandir avec les bons objectifs." intro="Les contenus évoluent avec la motricité, la concentration et l’autonomie. L’équipe vous aide à choisir le groupe le plus adapté." /><div className="kids-age-grid">{ageGroups.map((group, index) => <article className="kids-age-card reveal" key={group.age}><div className="kids-age-number"><span>0{index + 1}</span><small>{group.label}</small></div><h3>{group.age}</h3><p>{group.copy}</p><ul>{group.focus.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}</ul></article>)}</div></Container></section>

      <section className="kids-page-section kids-schedule" id="planning"><Container className="kids-schedule-layout"><SectionTitle inverse={false} eyebrow="Planning" title="Un rythme adapté à chaque âge." intro="Les créneaux exacts et les places disponibles sont mis à jour directement sur Fighty." /><div className="kids-schedule-list"><ScheduleCard day="Groupe Kids" time="Voir les créneaux" discipline="6–10 ans · Fondamentaux" level="Jeux, motricité, confiance et premières techniques" /><ScheduleCard day="Groupe Ados" time="Voir les créneaux" discipline="11–14 ans · Progression" level="Technique, autonomie et collectif" /></div></Container></section>

      <section className="kids-page-section kids-pricing" id="tarifs"><Container><SectionTitle inverse={false} eyebrow="Tarif du cours d’essai" title="Commencer sans pression." intro="Le cours d’essai Kids est gratuit pendant le mois de septembre. Après septembre, son tarif est de 10 €." /><div className="kids-pricing-grid"><PricingCard name="Cours d’essai" price="0 €" period="en septembre" description="Après septembre, le cours d’essai est proposé au tarif de 10 €." features={["10 € après septembre", "Accessible à partir de 6 ans", "Accueil par l’équipe", "Échange avec le parent"]} featured ctaLabel="Réserver le cours d’essai" /><PricingCard name="Adhésion Kids" price={practicalInfo.pricing.kids.price} period={practicalInfo.pricing.kids.period} description="Une formule séparée, pensée uniquement pour le programme enfants et sa progression." features={["Parcours adapté par âge", "Encadrement technique", "Progression régulière", "Modalités à jour sur Fighty"]} ctaLabel="Voir l’offre Kids sur Fighty" /></div></Container></section>

      <section className="kids-page-section kids-faq" id="faq"><Container className="kids-faq-layout"><SectionTitle inverse={false} eyebrow="Questions fréquentes" title="Tout ce qu’un parent veut savoir." intro="Si une question concerne spécifiquement votre enfant, indiquez-la lors de la réservation : l’équipe vous répondra avant la séance." /><FAQ items={kidsFAQ} /></Container></section>

      <section className="kids-fighty"><Container><FightyJourney title="Son premier cours. Simplement." ctaLabel="Réserver le cours d’essai" steps={kidsFightySteps} /></Container></section>
    </main>
    <FloatingCTA label="Cours d’essai Kids" />
    <Footer variant="kids" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
