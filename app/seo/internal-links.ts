import { academyArticleHref, academyCategories, publishedAcademyArticles } from "../data/academy";

export type LinkNode = {
  id: string;
  path: string;
  kind: "home" | "discipline" | "kids" | "about" | "hub" | "category" | "article";
  status: "live" | "missing";
  parent?: string;
  children: string[];
  siblings: string[];
  contextual: string[];
  cta: string[];
  navigation: string[];
  breadcrumbs: string[];
};

const categoryIds = academyCategories.map((category) => `category:${category.slug}`);

export const internalLinkGraph: LinkNode[] = [
  { id: "home", path: "/", kind: "home", status: "live", children: ["kids", "academy", "about", "discipline:bjj", "discipline:grappling", "discipline:mma"], siblings: [], contextual: ["academy:article:first-class"], cta: ["fighty"], navigation: ["kids", "academy"], breadcrumbs: [] },
  { id: "discipline:bjj", path: "/jiu-jitsu-bresilien", kind: "discipline", status: "missing", parent: "home", children: ["category:jiu-jitsu-bresilien"], siblings: ["discipline:grappling", "discipline:mma"], contextual: ["academy:article:first-class"], cta: ["fighty"], navigation: ["home", "academy"], breadcrumbs: ["home"] },
  { id: "discipline:grappling", path: "/grappling", kind: "discipline", status: "missing", parent: "home", children: ["category:grappling"], siblings: ["discipline:bjj", "discipline:mma"], contextual: ["category:bien-debuter"], cta: ["fighty"], navigation: ["home", "academy"], breadcrumbs: ["home"] },
  { id: "discipline:mma", path: "/mma", kind: "discipline", status: "missing", parent: "home", children: ["category:mma"], siblings: ["discipline:bjj", "discipline:grappling"], contextual: ["category:bien-debuter"], cta: ["fighty"], navigation: ["home", "academy"], breadcrumbs: ["home"] },
  { id: "kids", path: "/kids", kind: "kids", status: "live", parent: "home", children: ["category:enfants-parents"], siblings: ["academy"], contextual: ["category:enfants-parents", "home"], cta: ["fighty"], navigation: ["home", "academy"], breadcrumbs: ["home"] },
  { id: "about", path: "/a-propos", kind: "about", status: "missing", parent: "home", children: [], siblings: ["academy", "kids"], contextual: ["home"], cta: ["fighty"], navigation: ["home", "academy"], breadcrumbs: ["home"] },
  { id: "academy", path: "/academy", kind: "hub", status: "live", parent: "home", children: categoryIds, siblings: ["kids"], contextual: ["academy:article:first-class", "home"], cta: ["fighty"], navigation: ["home", "kids"], breadcrumbs: ["home"] },
  ...academyCategories.map<LinkNode>((category) => ({
    id: `category:${category.slug}`,
    path: `/academy/${category.slug}`,
    kind: "category",
    status: "live",
    parent: "academy",
    children: publishedAcademyArticles.filter((article) => article.category === category.slug).map(() => "academy:article:first-class"),
    siblings: categoryIds.filter((id) => id !== `category:${category.slug}`),
    contextual: [category.disciplineHref === "/kids" ? "kids" : "home"],
    cta: ["fighty"],
    navigation: ["academy", "home"],
    breadcrumbs: ["home", "academy"],
  })),
  ...publishedAcademyArticles.map<LinkNode>((article) => ({
    id: "academy:article:first-class",
    path: academyArticleHref(article),
    kind: "article",
    status: "live",
    parent: `category:${article.category}`,
    children: [],
    siblings: publishedAcademyArticles.filter((candidate) => candidate.category === article.category && candidate.slug !== article.slug).map(() => "academy:article:first-class"),
    contextual: ["home", `category:${article.category}`, "discipline:bjj", "kids", "about"],
    cta: ["fighty"],
    navigation: ["academy", "home"],
    breadcrumbs: ["home", "academy", `category:${article.category}`],
  })),
];

export function internalLinkScore(node: LinkNode) {
  if (node.status === "missing") return 0;
  const hasAvailableSibling = node.siblings.some((id) => internalLinkGraph.find((candidate) => candidate.id === id)?.status === "live");
  return Math.min(100,
    (node.parent || node.kind === "home" ? 20 : 0) +
    (node.children.length || node.kind === "article" ? 15 : 0) +
    (hasAvailableSibling || !node.siblings.length ? 15 : 0) +
    (node.contextual.length >= 2 ? 20 : node.contextual.length * 10) +
    (node.cta.length ? 10 : 0) +
    (node.navigation.length ? 10 : 0) +
    (node.breadcrumbs.length || node.kind === "home" ? 10 : 0),
  );
}

export function validateInternalLinkGraph() {
  const ids = new Set(internalLinkGraph.map((node) => node.id));
  return internalLinkGraph.flatMap((node) => {
    const issues: string[] = [];
    if (node.status === "live" && node.kind !== "home" && !node.parent) issues.push(`${node.id}: parent manquant`);
    if (node.status === "live" && !node.navigation.length) issues.push(`${node.id}: navigation manquante`);
    if (node.status === "live" && !node.cta.length) issues.push(`${node.id}: CTA manquant`);
    if (node.status === "live" && !node.contextual.length) issues.push(`${node.id}: lien contextuel manquant`);
    if (node.status === "live" && node.kind !== "home" && !node.breadcrumbs.length) issues.push(`${node.id}: breadcrumb manquant`);
    for (const target of [node.parent, ...node.children, ...node.siblings, ...node.contextual, ...node.navigation].filter(Boolean) as string[]) {
      if (!ids.has(target) && target !== "fighty") issues.push(`${node.id}: cible inconnue ${target}`);
    }
    return issues;
  });
}
