/* eslint-disable @next/next/no-html-link-for-pages */
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock3,
  DoorOpen,
  Focus,
  MapPin,
  Menu,
  Quote,
  Star,
  UsersRound,
} from "lucide-react";
import { OptimizedImage } from "./seo/optimized-image";

const FIGHTY_URL = process.env.NEXT_PUBLIC_FIGHTY_URL ?? "https://fighty.com/";
const PRIVACY_URL = process.env.NEXT_PUBLIC_PRIVACY_URL;
const LEGAL_URL = process.env.NEXT_PUBLIC_LEGAL_URL;
const GOOGLE_BUSINESS_URL = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL;

export type IconSize = "sm" | "md" | "lg";

export function Icon({ icon: Glyph, size = "md", label, className = "" }: { icon: LucideIcon; size?: IconSize; label?: string; className?: string }) {
  return <Glyph className={`icon icon-${size} ${className}`} strokeWidth={1.75} aria-hidden={label ? undefined : true} aria-label={label} />;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>;
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "text";

export function ButtonLink({ href, children, variant = "secondary", external = false }: { href: string; children: ReactNode; variant?: ButtonVariant; external?: boolean }) {
  const className = variant === "text" ? "text-link" : `button button-${variant}`;
  return <a className={className} href={href} rel={external ? "external" : undefined}>{children}<Icon icon={external ? ArrowUpRight : ArrowRight} size="sm" /><>{external && <span className="sr-only"> — site externe</span>}</></a>;
}

export function FightyCTA({ label = "Réserver mon essai", className = "", variant = "primary" }: { label?: string; className?: string; variant?: "primary" | "secondary" | "ghost" }) {
  return <a className={`button button-${variant} ${className}`} href={FIGHTY_URL} rel="external" data-conversion="fighty" data-cta-label={label}>{label}<Icon icon={ArrowUpRight} size="sm" /><span className="sr-only"> — réservation sur Fighty</span></a>;
}

export function SectionTitle({ eyebrow, title, intro, inverse = true, titleId }: { eyebrow: string; title: string; intro?: string; inverse?: boolean; titleId?: string }) {
  return <header className={`section-title reveal ${inverse ? "section-title-inverse" : ""}`}><p className="eyebrow">{eyebrow}</p><h2 id={titleId}>{title}</h2>{intro && <p className="section-intro">{intro}</p>}</header>;
}

const navigationItems = [
  { label: "Jiu-Jitsu", href: "/academy/jiu-jitsu-bresilien" },
  { label: "Grappling", href: "/academy/grappling" },
  { label: "MMA", href: "/academy/mma" },
  { label: "Kids", href: "/kids" },
  { label: "Academy", href: "/academy" },
  { label: "Contact", href: "/#contact" },
];

const kidsNavigationItems = [
  { label: "Bénéfices", href: "#benefices" },
  { label: "Pédagogie", href: "#pedagogie" },
  { label: "Âges", href: "#ages" },
  { label: "Planning", href: "#planning" },
  { label: "FAQ", href: "#faq" },
];

export function Navigation({ className = "", items = navigationItems }: { className?: string; items?: Array<{ label: string; href: string }> }) {
  return <nav className={`navigation ${className}`} aria-label="Navigation principale">{items.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}</nav>;
}

export function Header({ variant = "default" }: { variant?: "default" | "kids" }) {
  const isKids = variant === "kids";
  const items = isKids ? kidsNavigationItems : navigationItems;
  return <header className={`site-header ${isKids ? "site-header-kids" : ""}`}><a className="skip-link" href="#contenu">Aller au contenu</a><Container className="header-inner">
    <a className="brand" href="/" aria-label="Strongbear — Accueil"><strong>STRONGBEAR</strong><span>{isKids ? "KIDS · JIU-JITSU · GRAPPLING" : "BJJ · GRAPPLING · MMA"}</span></a>
    <Navigation className="nav-desktop" items={items} />
    <div className="header-actions"><FightyCTA label="Essai septembre" /><details className="mobile-menu"><summary aria-label="Ouvrir la navigation"><Icon icon={Menu} /><span className="sr-only">Menu</span></summary><div className="mobile-panel"><Navigation items={items} /><FightyCTA label="Essai gratuit en septembre" /></div></details></div>
  </Container></header>;
}

export function Hero({ eyebrow, title, intro, image, alt, primaryLabel = "Réserver mon essai", secondaryLabel, secondaryHref }: { eyebrow: string; title: ReactNode; intro: string; image: string; alt: string; primaryLabel?: string; secondaryLabel?: string; secondaryHref?: string }) {
  return <section className="hero hero-component"><OptimizedImage className="hero-image" source={image} alt={alt} loading="eager" fetchPriority="high" sizes="100vw" width={2400} height={1600} /><div className="hero-shade"></div><Container className="hero-inner"><p className="eyebrow eyebrow-inverse">{eyebrow}</p><h1>{title}</h1><p className="hero-copy">{intro}</p><div className="hero-actions"><FightyCTA label={primaryLabel} />{secondaryLabel && secondaryHref && <ButtonLink href={secondaryHref} variant="ghost">{secondaryLabel}</ButtonLink>}</div></Container></section>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={`card reveal ${className}`}>{children}</article>;
}

export function MetricStrip({ items }: { items: Array<{ value: string; label: string }> }) {
  return <div className="metric-strip">{items.map((item) => <div className="metric" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>;
}

export function FeatureCell({ index, title, description }: { index: string; title: string; description: string }) {
  return <article className="feature-cell reveal"><span className="feature-icon" aria-hidden="true">{index}</span><div><h3>{title}</h3><p>{description}</p></div></article>;
}

export function DisciplineCard({ index, title, description, href, image, alt, detail }: { index: string; title: string; description: string; href: string; image: string; alt: string; detail: string }) {
  return <article className="discipline-card reveal"><div className="discipline-image"><OptimizedImage source={image} alt={alt} sizes="(min-width: 48rem) 33vw, 100vw" width={1800} height={1200} /><span>{index} / 03</span></div><div className="discipline-content"><p>{detail}</p><h3><a href={href}>{title}</a></h3><div className="discipline-bottom"><p>{description}</p><Icon icon={ArrowUpRight} /></div></div></article>;
}

export function ScheduleCard({ day, time, discipline, level = "Tous niveaux", href = FIGHTY_URL }: { day: string; time: string; discipline: string; level?: string; href?: string }) {
  return <article className="schedule-card reveal"><div className="schedule-card-day"><Icon icon={CalendarCheck} size="sm" /><span>{day}</span></div><div><strong>{discipline}</strong><p>{level}</p></div><a href={href} rel="external" data-conversion={href === FIGHTY_URL ? "fighty" : undefined} data-cta-label={href === FIGHTY_URL ? `Planning · ${discipline}` : undefined} aria-label={`Réserver le cours de ${discipline}, ${day} à ${time}`}><span>{time}</span><Icon icon={ArrowUpRight} size="sm" /></a></article>;
}

export function TestimonialCard({ quote, name, profile, rating = 5, source, sourceUrl, verified = false }: { quote: string; name: string; profile: string; rating?: number; source?: string; sourceUrl?: string; verified?: boolean }) {
  const canVerify = Boolean(verified && sourceUrl);
  return <figure className="review-card reveal"><Icon icon={Quote} size="lg" className="review-mark" /><div className="review-rating" aria-label={`${rating} étoiles`}>{Array.from({ length: rating }, (_, index) => <Icon icon={Star} size="sm" key={index} />)}{source && <span>{source}</span>}{canVerify && <span className="review-verified"><Check aria-hidden="true" />Vérifié</span>}</div><blockquote>“{quote}”</blockquote><figcaption><div><strong>{name}</strong><small>{profile}</small></div>{sourceUrl && <a href={sourceUrl} rel="external" aria-label={`Voir la source de l’avis de ${name}`}><Icon icon={ArrowUpRight} size="sm" /></a>}</figcaption></figure>;
}

export function FAQ({ items }: { items: Array<{ question: string; answer: ReactNode }> }) {
  return <div className="faq-list">{items.map((item) => <details className="faq-item" key={item.question}><summary><span>{item.question}</span><Icon icon={ChevronDown} /></summary><div className="faq-answer">{item.answer}</div></details>)}</div>;
}

export function AcademyCard({ index, category, title, summary, image, alt = "", readingTime = "4 min", href = "/academy" }: { index: string; category: string; title: string; summary: string; image?: string; alt?: string; readingTime?: string; href?: string }) {
  return <article className={`academy-card reveal ${image ? "academy-card-featured" : ""}`}>{image && <div className="academy-card-media"><OptimizedImage source={image} alt={alt} sizes="(min-width: 48rem) 33vw, 100vw" width={1600} height={1067} /></div>}<div className="academy-meta"><span>{index} · {category}</span><span><Icon icon={Clock3} size="sm" />{readingTime}</span></div><h3><a href={href}>{title}</a></h3><p>{summary}</p><Icon icon={ArrowUpRight} className="academy-arrow" /></article>;
}

export function PricingCard({ name, price, period, description, features, featured = false, ctaLabel = "Choisir cette formule" }: { name: string; price: string; period?: string; description: string; features: string[]; featured?: boolean; ctaLabel?: string }) {
  return <article className={`pricing-card reveal ${featured ? "pricing-card-featured" : ""}`}><div className="pricing-heading"><span>{name}</span>{featured && <small>Recommandé</small>}</div><div className="pricing-price"><strong>{price}</strong>{period && <span>{period}</span>}</div><p>{description}</p><ul>{features.map((feature) => <li key={feature}><Icon icon={Check} size="sm" />{feature}</li>)}</ul><FightyCTA label={ctaLabel} variant={featured ? "primary" : "secondary"} /></article>;
}

export function CoachCard({ name, role, biography, image, alt, href = "/a-propos" }: { name: string; role: string; biography: string; image: string; alt: string; href?: string }) {
  return <article className="coach-card reveal"><div className="coach-card-media"><OptimizedImage source={image} alt={alt} sizes="(min-width: 48rem) 33vw, 100vw" width={1200} height={1500} /></div><div className="coach-card-copy"><p>{role}</p><h3><a href={href}>{name}</a></h3><span>{biography}</span><Icon icon={ArrowUpRight} /></div></article>;
}

const fightySteps = [
  { icon: CalendarCheck, title: "Réservez", copy: "Choisissez votre cours d’essai sur Fighty." },
  { icon: DoorOpen, title: "Venez", copy: "Présentez-vous quelques minutes avant la séance." },
  { icon: Focus, title: "Entraînez-vous", copy: "L’équipe vous accompagne dès votre arrivée." },
  { icon: UsersRound, title: "Rejoignez l’équipe", copy: "Continuez avec l’offre adaptée à votre pratique." },
];

export function FightyJourney({ title = "Votre premier cours. Simplement.", ctaLabel = "Réserver mon essai de septembre", steps = fightySteps }: { title?: string; ctaLabel?: string; steps?: Array<{ icon: LucideIcon; title: string; copy: string }> }) {
  return <section className="fighty-journey"><div className="fighty-journey-heading"><span>Fighty</span><h2>{title}</h2></div><ol>{steps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><Icon icon={step.icon} /><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol><FightyCTA label={ctaLabel} /></section>;
}

export function FloatingCTA({ label = "Réserver mon essai" }: { label?: string }) {
  return <aside className="floating-cta" aria-label="Réservation rapide"><FightyCTA label={label} /></aside>;
}

export function Footer({ variant = "default" }: { variant?: "default" | "kids" }) {
  const isKids = variant === "kids";
  return <footer className={`footer ${isKids ? "footer-kids" : ""}`} id="contact"><Container><div className="footer-top"><div><a className="brand" href="/"><strong>STRONGBEAR</strong><span>{isKids ? "KIDS · JIU-JITSU · GRAPPLING" : "BJJ · GRAPPLING · MMA"}</span></a><p>{isKids ? "Un espace sûr pour apprendre, grandir et prendre confiance." : "L’académie d’arts martiaux du Vexin."}</p><span className="footer-location"><Icon icon={MapPin} size="sm" />Marines · Val-d’Oise</span></div><div className="footer-cta"><span>{isKids ? "Prêt pour une première découverte ?" : "Prêt à progresser ?"}</span><FightyCTA label={isKids ? "Réserver l’essai de mon enfant" : "Réserver mon essai"} /></div></div><div className="footer-grid">{isKids ? <><nav aria-label="Programme Kids"><strong>Programme Kids</strong><a href="#benefices">Bénéfices</a><a href="#pedagogie">Pédagogie</a><a href="#ages">Groupes d’âge</a></nav><nav aria-label="Informations parents"><strong>Parents</strong><a href="#planning">Planning</a><a href="#tarifs">Tarifs</a><a href="#faq">Questions fréquentes</a></nav></> : <><nav aria-label="Disciplines"><strong>Disciplines</strong><a href="/academy/jiu-jitsu-bresilien">Jiu-Jitsu Brésilien</a><a href="/academy/grappling">Grappling</a><a href="/academy/mma">MMA</a></nav><nav aria-label="Découvrir"><strong>Découvrir</strong><a href="/kids">Kids</a><a href="/academy">Academy</a><a href="/#strongbear">À propos</a><a href="/#contact">Contact</a></nav></>}<nav aria-label="Informations"><strong>Informations</strong><a href="/academy/bien-debuter">Bien débuter</a><a href={FIGHTY_URL} rel="external" data-conversion="fighty" data-cta-label="Footer · Fighty">Fighty</a>{GOOGLE_BUSINESS_URL && <a href={GOOGLE_BUSINESS_URL} rel="external">Google Business</a>}{PRIVACY_URL && <a href={PRIVACY_URL}>Confidentialité</a>}{LEGAL_URL && <a href={LEGAL_URL}>Mentions légales</a>}</nav></div><div className="footer-bottom"><span>© 2026 Strongbear BJJ & Grappling</span><span>{isKids ? "Confiance · Respect · Plaisir" : "Technique · Respect · Progression"}</span></div></Container></footer>;
}
