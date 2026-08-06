/* eslint-disable @next/next/no-html-link-for-pages */
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { ButtonLink, Container, FAQ, FightyCTA, Icon } from "../components";
import { OptimizedImage } from "../seo/optimized-image";
import {
  academyArticleHref,
  academyCategories,
  type AcademyArticle,
  type AcademyCategory,
  type ArticleSection,
} from "../data/academy";

export function AcademyBreadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return <nav className="academy-breadcrumb" aria-label="Fil d’Ariane"><ol>{items.map((item, index) => <li key={`${item.label}-${index}`}>{item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;
}

export function AcademyCategoryNav({ active }: { active?: string }) {
  return <nav className="academy-category-nav" aria-label="Catégories de l’Academy"><Container><a className={!active ? "is-active" : ""} href="/academy">Tous les sujets</a>{academyCategories.map((category) => <a className={active === category.slug ? "is-active" : ""} href={`/academy/${category.slug}`} key={category.slug}>{category.shortName}</a>)}</Container></nav>;
}

export function AcademyMasthead() {
  return <section className="academy-masthead" aria-labelledby="academy-title"><Container>
    <AcademyBreadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Academy" }]} />
    <div className="academy-masthead-grid">
      <div><p className="eyebrow">Strongbear Academy · Marines</p><h1 id="academy-title"><span>Comprendre.</span><span>Puis pratiquer.</span></h1></div>
      <div className="academy-masthead-intro"><p>Des guides précis pour les débutants, les parents et les pratiquants qui veulent mieux lire leur discipline.</p><span><Icon icon={BookOpen} size="sm" />Éducation d’abord. Conversion ensuite.</span></div>
    </div>
    <a className="academy-scroll-cue" href="#categories">Explorer les six univers<Icon icon={ArrowDown} size="sm" /></a>
  </Container></section>;
}

export function AcademyCategoryCard({ category, articleCount }: { category: AcademyCategory; articleCount: number }) {
  return <article className="academy-category-card reveal">
    <a href={`/academy/${category.slug}`} aria-label={`Explorer ${category.name}`}>
      <div className="academy-category-card-top"><span>{category.number}</span><Icon icon={ArrowUpRight} /></div>
      <h2>{category.name}</h2>
      <p>{category.description}</p>
      <div className="academy-category-card-bottom"><span>{articleCount} sujets structurés</span><small>{category.promise}</small></div>
    </a>
  </article>;
}

export function AcademyArticleCard({ article, index, featured = false }: { article: AcademyArticle; index: number; featured?: boolean }) {
  const content = <>
    {article.image && featured && <div className="academy-article-card-media"><OptimizedImage source={article.image} alt={article.imageAlt} sizes="(min-width: 64rem) 66vw, 100vw" width={1600} height={1067} /></div>}
    <div className="academy-article-card-meta"><span>{String(index + 1).padStart(2, "0")}</span><span><Icon icon={Clock3} size="sm" />{article.readingTime}</span></div>
    <h3>{article.cardTitle}</h3>
    <p>{article.description}</p>
    <div className="academy-article-card-status">{article.status === "published" ? <><span>Lire le guide</span><Icon icon={ArrowRight} size="sm" /></> : <><span>En préparation</span><Clock3 aria-hidden="true" /></>}</div>
  </>;

  return <article className={`academy-article-card reveal ${featured ? "academy-article-card-featured" : ""} ${article.status === "planned" ? "is-planned" : ""}`}>{article.status === "published" ? <a href={academyArticleHref(article)}>{content}</a> : <div>{content}</div>}</article>;
}

export function AcademyCategoryHero({ category, articleCount }: { category: AcademyCategory; articleCount: number }) {
  return <section className="academy-category-hero" aria-labelledby="category-title"><Container>
    <AcademyBreadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Academy", href: "/academy" }, { label: category.name }]} />
    <div className="academy-category-hero-grid"><div><p className="eyebrow">Academy · {category.number}</p><h1 id="category-title">{category.name}</h1></div><div><p>{category.description}</p><span>{articleCount} sujets · Collection évolutive</span>{category.disciplineHref && <ButtonLink href={category.disciplineHref} variant="text">Découvrir les cours</ButtonLink>}</div></div>
  </Container></section>;
}

export function ArticleHero({ article, category }: { article: AcademyArticle; category: AcademyCategory }) {
  return <header className="academy-article-hero"><Container>
    <AcademyBreadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Academy", href: "/academy" }, { label: category.name, href: `/academy/${category.slug}` }, { label: article.cardTitle }]} />
    <div className="academy-article-hero-copy"><p className="eyebrow">{category.name} · Guide</p><h1>{article.title}</h1><p>{article.description}</p><div className="academy-article-byline"><span><Icon icon={Clock3} size="sm" />{article.readingTime} de lecture</span>{article.updatedAt && <span>Mis à jour le <time dateTime={article.updatedAt}>{new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${article.updatedAt}T12:00:00Z`))}</time></span>}<span>Par l’équipe pédagogique Strongbear</span></div></div>
    {article.image && <div className="academy-article-hero-media"><OptimizedImage source={article.image} alt={article.imageAlt} loading="eager" fetchPriority="high" sizes="100vw" width={2000} height={1333} /><span>Technique · Progression · Respect</span></div>}
  </Container></header>;
}

export function ArticleTableOfContents({ sections }: { sections: ArticleSection[] }) {
  return <nav className="article-toc" aria-labelledby="toc-title"><p id="toc-title">Dans ce guide</p><ol>{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.title}</a></li>)}</ol></nav>;
}

export function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return <div className="article-body">{sections.map((section, index) => <section id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
    <div className="article-section-number">{String(index + 1).padStart(2, "0")}</div>
    <div className="article-section-content"><h2 id={`${section.id}-title`}>{section.title}</h2>{section.introduction && <p className="article-lead">{section.introduction}</p>}{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.checklist && <div className="article-checklist"><h3>La checklist</h3><ul>{section.checklist.map((item) => <li key={item}><Icon icon={CheckCircle2} size="sm" />{item}</li>)}</ul></div>}
      {section.callout && <aside className="article-callout"><span>{section.callout.label}</span><p>{section.callout.text}</p></aside>}
      {section.subsections?.map((subsection) => <div className="article-subsection" key={subsection.title}><h3>{subsection.title}</h3>{subsection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>)}
    </div>
  </section>)}</div>;
}

export function ArticleFAQ({ items }: { items: NonNullable<AcademyArticle["faq"]> }) {
  return <section className="article-faq" id="questions-frequentes" aria-labelledby="article-faq-title"><p className="eyebrow">Questions fréquentes</p><h2 id="article-faq-title">Les réponses avant de commencer.</h2><FAQ items={items} /></section>;
}

export function ArticleAuthorityLinks({ links }: { links: NonNullable<AcademyArticle["authorityLinks"]> }) {
  if (links.length === 0) return null;
  return <aside className="article-authority" aria-labelledby="authority-title"><p className="eyebrow">Sources externes</p><h2 id="authority-title">Pour aller à la source.</h2><ul>{links.map((link) => <li key={link.href}><a href={link.href} rel="external"><div><strong>{link.label}</strong><span>{link.description}</span></div><Icon icon={ArrowUpRight} size="sm" /><span className="sr-only"> — site externe</span></a></li>)}</ul></aside>;
}

export function RelatedArticles({ articles }: { articles: AcademyArticle[] }) {
  if (articles.length === 0) return null;
  return <section className="article-related" aria-labelledby="related-title"><div className="article-related-heading"><p className="eyebrow">Continuer à comprendre</p><h2 id="related-title">Guides liés</h2></div><div className="academy-articles-grid">{articles.map((article, index) => <AcademyArticleCard article={article} index={index} key={article.slug} />)}</div></section>;
}

export function AcademyFightyCTA() {
  return <aside className="academy-fighty-cta"><div><span><Icon icon={ShieldCheck} size="sm" />Premier cours accompagné</span><h2>La théorie vous prépare.<br />Le tatami vous apprend.</h2><p>Choisissez un créneau sur Fighty. L’équipe vous guide dès votre arrivée et adapte la première séance à votre niveau.</p></div><FightyCTA label="Réserver un essai gratuit" /></aside>;
}

export function AcademyNewsletterCTA() {
  const newsletterUrl = process.env.NEXT_PUBLIC_NEWSLETTER_URL;
  if (!newsletterUrl) return null;
  return <aside className="academy-newsletter"><div><Icon icon={Mail} /><p className="eyebrow">La lettre Strongbear</p><h2>Un guide utile.<br />Au bon moment.</h2><p>Recevez les nouveaux guides pratiques de l’Academy. Une lecture utile, sans bruit inutile.</p></div><ButtonLink href={newsletterUrl} variant="secondary" external>Recevoir les guides</ButtonLink></aside>;
}
