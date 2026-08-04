import type { ReactNode } from "react";

const FIGHTY_URL = process.env.NEXT_PUBLIC_FIGHTY_URL ?? "https://fighty.com/";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>;
}

export function FightyCTA({ label = "Réserver sur Fighty", className = "" }: { label?: string; className?: string }) {
  return <a className={`button button-primary ${className}`} href={FIGHTY_URL} rel="external">{label}<span aria-hidden="true">↗</span><span className="sr-only"> — site externe</span></a>;
}

export function ButtonLink({ href, children, variant = "secondary" }: { href: string; children: ReactNode; variant?: "secondary" | "text" }) {
  return <a className={variant === "text" ? "text-link" : "button button-secondary"} href={href}>{children}<span aria-hidden="true">→</span></a>;
}

export function SectionTitle({ eyebrow, title, intro, inverse = false }: { eyebrow: string; title: string; intro?: string; inverse?: boolean }) {
  return <header className={`section-title ${inverse ? "section-title-inverse" : ""}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{intro && <p className="section-intro">{intro}</p>}</header>;
}

const disciplineItems = [
  { label: "Jiu-Jitsu Brésilien", href: "/jiu-jitsu-bresilien" },
  { label: "Grappling", href: "/grappling" },
  { label: "MMA", href: "/mma" },
];

export function Navigation() {
  return <nav className="nav-desktop" aria-label="Navigation principale">
    <details className="nav-dropdown"><summary>Disciplines <span aria-hidden="true">⌄</span></summary><div className="mega-menu">{disciplineItems.map((item, index) => <a key={item.href} href={item.href}><span>0{index + 1}</span>{item.label}</a>)}</div></details>
    <a href="/kids">Kids</a><a href="/academy">Academy</a><a href="/a-propos">À propos</a><a href="/contact">Contact</a>
  </nav>;
}

export function Header() {
  return <header className="site-header"><a className="skip-link" href="#contenu">Aller au contenu</a><Container className="header-inner">
    <a className="brand" href="/" aria-label="Strongbear — Accueil"><span className="brand-mark">SB</span><span className="brand-copy"><strong>Strongbear</strong><small>BJJ & Grappling</small></span></a>
    <Navigation />
    <div className="header-actions"><FightyCTA label="Essai gratuit" /><details className="mobile-menu"><summary aria-label="Ouvrir la navigation"><span></span><span></span></summary><div className="mobile-panel"><nav aria-label="Navigation mobile">{disciplineItems.map(x=><a key={x.href} href={x.href}>{x.label}</a>)}<a href="/kids">Kids</a><a href="/academy">Academy</a><a href="/a-propos">À propos</a><a href="/contact">Contact</a></nav><FightyCTA /></div></details></div>
  </Container></header>;
}

export function DisciplineCard({ index, title, description, href, image, alt }: { index: string; title: string; description: string; href: string; image: string; alt: string }) {
  return <article className="discipline-card"><img src={image} alt={alt} width="1800" height="1200" loading="lazy" /><div className="card-overlay"></div><div className="discipline-card-content"><span>{index}</span><h3><a href={href}>{title}</a></h3><p>{description}</p><span className="card-arrow" aria-hidden="true">↗</span></div></article>;
}

export function Footer() {
  return <footer className="footer"><Container><div className="footer-top"><div><a className="brand brand-inverse" href="/"><span className="brand-mark">SB</span><span className="brand-copy"><strong>Strongbear</strong><small>BJJ & Grappling</small></span></a><p>L’académie d’arts martiaux du Vexin.<br/>Marines, Val-d’Oise.</p></div><FightyCTA /></div><div className="footer-grid"><nav aria-label="Disciplines"><strong>Disciplines</strong>{disciplineItems.map(x=><a key={x.href} href={x.href}>{x.label}</a>)}</nav><nav aria-label="Découvrir"><strong>Découvrir</strong><a href="/kids">Kids</a><a href="/academy">Academy</a><a href="/a-propos">À propos</a><a href="/contact">Contact</a></nav><nav aria-label="Informations"><strong>Informations</strong><a href="/confidentialite">Confidentialité</a><a href="/mentions-legales">Mentions légales</a></nav></div><div className="footer-bottom"><span>© 2026 Strongbear BJJ & Grappling</span><span>Technique. Respect. Progression.</span></div></Container></footer>;
}
