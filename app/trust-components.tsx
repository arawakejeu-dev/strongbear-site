import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BookOpenCheck,
  CalendarCheck,
  CheckCircle2,
  DoorOpen,
  Focus,
  HeartHandshake,
  Layers3,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import { Container, FightyCTA, Icon, SectionTitle } from "./components";
import type { Comparison } from "./data/comparisons";
import { OptimizedImage } from "./seo/optimized-image";

export type TestimonialAudience = "adult" | "parent" | "competitor";

export type Testimonial = {
  quote: string;
  name: string;
  profile: string;
  audience: TestimonialAudience;
  rating?: number;
  source?: string;
  sourceUrl?: string;
  verified?: boolean;
  publishedAt?: string;
};

const audienceLabels: Record<TestimonialAudience, string> = {
  adult: "Adulte",
  parent: "Parent",
  competitor: "Compétiteur",
};

function TestimonialSource({ item }: { item: Testimonial }) {
  const canVerify = Boolean(item.verified && item.sourceUrl);
  if (!item.source && !canVerify) return null;

  const content = <>
    {canVerify && <CheckCircle2 aria-hidden="true" />}
    <span>{canVerify ? "Avis vérifié" : item.source}</span>
    {canVerify && <ArrowUpRight aria-hidden="true" />}
  </>;

  return canVerify ? <a className="testimonial-source testimonial-source-verified" href={item.sourceUrl} rel="external">{content}<span className="sr-only"> — consulter la source</span></a> : <span className="testimonial-source">{content}</span>;
}

export function TestimonialsSection({ items, eyebrow = "Témoignages", title = "Ce que l’on ressent compte.", intro = "Des expériences réelles, publiées avec leur source lorsqu’elle peut être vérifiée." }: { items: Testimonial[]; eyebrow?: string; title?: string; intro?: string }) {
  if (items.length === 0) return null;

  return <section className="section trust-testimonials" aria-labelledby="testimonials-title">
    <Container>
      <SectionTitle eyebrow={eyebrow} title={title} intro={intro} titleId="testimonials-title" />
      <div className="trust-testimonials-grid">
        {items.map((item, index) => {
          const rating = Math.max(0, Math.min(5, item.rating ?? 5));
          return <figure className="trust-testimonial reveal" key={`${item.name}-${index}`}>
            <div className="trust-testimonial-top">
              <span>{audienceLabels[item.audience]}</span>
              <Icon icon={Quote} size="lg" />
            </div>
            <blockquote>“{item.quote}”</blockquote>
            <figcaption>
              <div><strong>{item.name}</strong><span>{item.profile}</span></div>
              <div className="trust-testimonial-proof">
                {rating > 0 && <span className="trust-stars" aria-label={`${rating} étoiles`}>{Array.from({ length: rating }, (_, star) => <Icon icon={Star} size="sm" key={star} />)}</span>}
                <TestimonialSource item={item} />
                {item.publishedAt && <time dateTime={item.publishedAt}>{item.publishedAt}</time>}
              </div>
            </figcaption>
          </figure>;
        })}
      </div>
    </Container>
  </section>;
}

export type CoachCredential = {
  label: string;
  value: string;
};

export function CoachStory({ name, role, image, alt, story, teachingPhilosophy, whyStrongbear, credentials = [] }: { name: string; role: string; image: string; alt: string; story: string; teachingPhilosophy: string; whyStrongbear: string; credentials?: CoachCredential[] }) {
  return <article className="coach-story reveal">
    <div className="coach-story-media"><OptimizedImage source={image} alt={alt} sizes="(min-width: 64rem) 45vw, 100vw" width={1400} height={1750} /></div>
    <div className="coach-story-copy">
      <p className="eyebrow">Transmission</p>
      <h2>{name}</h2>
      <p className="coach-story-role">{role}</p>
      <p className="coach-story-opening">{story}</p>
      <dl>
        <div><dt>Sa pédagogie</dt><dd>{teachingPhilosophy}</dd></div>
        <div><dt>Pourquoi Strongbear</dt><dd>{whyStrongbear}</dd></div>
      </dl>
      {credentials.length > 0 && <ul className="coach-credentials" aria-label="Expérience vérifiable">{credentials.map((credential) => <li key={credential.label}><Icon icon={Award} size="sm" /><span><strong>{credential.value}</strong>{credential.label}</span></li>)}</ul>}
    </div>
  </article>;
}

const strongbearPillars = [
  { icon: Focus, title: "Technique", copy: "Comprendre les positions et les décisions, pas seulement reproduire des gestes." },
  { icon: UsersRound, title: "Communauté", copy: "Des partenaires qui s’entraident et font de chaque cours un progrès collectif." },
  { icon: Layers3, title: "Progression", copy: "Des repères clairs pour avancer depuis le premier cours jusqu’à vos objectifs." },
  { icon: ShieldCheck, title: "Respect", copy: "Un cadre où le contrôle, l’écoute et la sécurité passent avant l’ego." },
  { icon: HeartHandshake, title: "Atmosphère", copy: "Une exigence réelle dans une ambiance accueillante et responsable." },
  { icon: CalendarCheck, title: "Un abonnement", copy: "Une offre adulte unique pour simplifier le choix et rester libre de votre rythme." },
  { icon: Sparkles, title: "Trois disciplines", copy: "Jiu-Jitsu Brésilien, Grappling et MMA pour construire une pratique complète." },
];

export function WhyStrongbear({ compact = false }: { compact?: boolean }) {
  return <section className={`section why-strongbear ${compact ? "why-strongbear-compact" : ""}`} aria-labelledby="why-strongbear-title">
    <Container>
      <div className="why-strongbear-heading"><p className="eyebrow">Pourquoi Strongbear</p><h2 id="why-strongbear-title">Progresser avec exigence.<br />Rester soi-même.</h2><p>Un environnement technique, humain et lisible, pensé pour durer au-delà du premier cours.</p></div>
      <div className="why-strongbear-grid">{strongbearPillars.map((pillar, index) => <article className="why-strongbear-item reveal" key={pillar.title}><span>0{index + 1}</span><Icon icon={pillar.icon} /><h3>{pillar.title}</h3><p>{pillar.copy}</p></article>)}</div>
    </Container>
  </section>;
}

export type AcademyMilestone = {
  date: string;
  title: string;
  description: string;
  evidence?: string;
};

export function AcademyStoryTimeline({ items, title = "Une académie construite dans le temps." }: { items: AcademyMilestone[]; title?: string }) {
  if (items.length === 0) return null;
  return <section className="section academy-story" aria-labelledby="academy-story-title"><Container>
    <SectionTitle eyebrow="Notre histoire" title={title} intro="Des étapes concrètes, racontées simplement et reliées à des preuves lorsqu’elles sont publiques." titleId="academy-story-title" />
    <ol className="academy-story-list">{items.map((item, index) => <li className="reveal" key={`${item.date}-${item.title}`}><div className="academy-story-marker"><span>0{index + 1}</span></div><div><time>{item.date}</time><h3>{item.title}</h3><p>{item.description}</p>{item.evidence && <small>{item.evidence}</small>}</div></li>)}</ol>
  </Container></section>;
}

export type TrustIndicator = {
  label: string;
  value: string;
  detail?: string;
  icon?: LucideIcon;
  sourceUrl?: string;
};

export function TrustIndicators({ items, label = "Repères Strongbear" }: { items: TrustIndicator[]; label?: string }) {
  if (items.length === 0) return null;
  return <section className="trust-indicators" aria-label={label}><Container className="trust-indicators-grid">{items.map((item) => {
    const Glyph = item.icon ?? CheckCircle2;
    return <article key={`${item.value}-${item.label}`}><Icon icon={Glyph} /><div><strong>{item.value}</strong><span>{item.label}</span>{item.detail && <small>{item.detail}</small>}</div>{item.sourceUrl && <a href={item.sourceUrl} rel="external" aria-label={`Vérifier : ${item.label}`}><Icon icon={ArrowUpRight} size="sm" /></a>}</article>;
  })}</Container></section>;
}

export function ComparisonBlock({ comparison }: { comparison: Comparison }) {
  const titleId = `comparison-${comparison.title.replaceAll(" ", "-").toLowerCase()}`;
  return <section className="section comparison-section" aria-labelledby={titleId}><Container>
    <SectionTitle eyebrow={comparison.eyebrow} title={comparison.title} intro={comparison.intro} titleId={titleId} />
    <div className="comparison-table" role="table" aria-label={comparison.title}>
      <div className="comparison-head" role="row"><span role="columnheader">Repère</span><span role="columnheader">{comparison.optionALabel}</span><span role="columnheader">{comparison.optionBLabel}</span></div>
      {comparison.rows.map((row) => <div className="comparison-row reveal" role="row" key={row.subject}><strong role="rowheader">{row.subject}</strong><p role="cell" data-label={comparison.optionALabel}>{row.optionA}</p><p role="cell" data-label={comparison.optionBLabel}>{row.strongbear}</p></div>)}
    </div>
    <p className="comparison-note"><Icon icon={BookOpenCheck} size="sm" />{comparison.note}</p>
  </Container></section>;
}

const journeySteps = [
  { icon: CalendarCheck, title: "Réservez", copy: "Choisissez sur Fighty le cours qui correspond à votre profil." },
  { icon: DoorOpen, title: "Venez", copy: "Arrivez quelques minutes en avance. L’équipe vous accueille et vous guide." },
  { icon: Focus, title: "Entraînez-vous", copy: "Découvrez une vraie séance, à une intensité adaptée et sans pression." },
  { icon: UsersRound, title: "Rejoignez l’équipe", copy: "Décidez après l’essai. L’adhésion reste un choix et se fait sur Fighty." },
];

export function FightyTrustJourney({ audience = "adult" }: { audience?: "adult" | "parent" }) {
  return <section className="section fighty-trust" aria-labelledby="fighty-trust-title"><Container>
    <div className="fighty-trust-heading"><p className="eyebrow">Votre première séance</p><h2 id="fighty-trust-title">Quatre étapes.<br />Aucune zone floue.</h2><p>{audience === "parent" ? "Vous gardez la maîtrise de chaque étape, de la découverte au choix de poursuivre." : "Vous savez quoi faire avant de venir, ce qui se passe sur place et quand décider de continuer."}</p></div>
    <ol className="fighty-trust-steps">{journeySteps.map((step, index) => <li className="reveal" key={step.title}><div className="fighty-trust-number"><span>0{index + 1}</span><Icon icon={step.icon} /></div><div><h3>{step.title}</h3><p>{step.copy}</p></div>{index < journeySteps.length - 1 && <Icon icon={ArrowDown} className="fighty-trust-arrow" />}</li>)}</ol>
    <div className="fighty-trust-action"><FightyCTA label={audience === "parent" ? "Réserver l’essai de mon enfant" : "Essai gratuit en septembre"} /><span><Icon icon={ShieldCheck} size="sm" />Réservation externe sécurisée sur Fighty</span></div>
  </Container></section>;
}

export function TrustLoadingState({ label = "Chargement des avis vérifiés" }: { label?: string }) {
  return <div className="trust-loading" role="status" aria-live="polite" aria-busy="true"><span className="sr-only">{label}</span><span /><span /><span /></div>;
}
