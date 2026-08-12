import { mmaFAQ } from "../data/faqs";
import { buildLocalDisciplineMetadata, LocalDisciplinePage, type LocalDisciplineData } from "../local-discipline-template";

const data: LocalDisciplineData = {
  slug: "mma-marines",
  name: "MMA",
  shortName: "MMA",
  title: "MMA à Marines | Strongbear",
  description: "Cours de MMA à Marines dans le Vexin. Striking, lutte et Grappling dans un cadre progressif, technique et accessible aux débutants.",
  eyebrow: "MMA · Marines · Val-d’Oise",
  h1: "MMA à Marines.",
  intro: "Apprenez à relier le travail debout, la lutte et le sol avec méthode, dans un cadre encadré où l’intensité s’adapte à votre niveau.",
  image: "/mma-training.jpg",
  alt: "Entraînement de MMA encadré chez Strongbear à Marines",
  overviewTitle: "Relier toutes les distances.",
  overview: [
    "Le MMA associe le striking, la lutte, le Grappling et le combat au sol. Sa richesse vient moins de l’accumulation de techniques que de la capacité à passer intelligemment d’une distance à l’autre.",
    "À Strongbear, les cours sont construits pour rendre cette pratique lisible et progressive. Les débutants apprennent les postures, déplacements et défenses indispensables avant d’augmenter la complexité. La compétition reste une possibilité, jamais une obligation.",
  ],
  benefits: [
    { title: "Pratique complète", copy: "Travailler debout, les amenées au sol, les contrôles et les transitions dans un même parcours." },
    { title: "Coordination", copy: "Relier déplacements, frappes et changements de niveau avec davantage de fluidité." },
    { title: "Condition physique", copy: "Construire endurance, explosivité maîtrisée et capacité à récupérer entre les efforts." },
    { title: "Maîtrise", copy: "Rester lucide, respecter les consignes et contrôler son intensité face à un partenaire." },
  ],
  audience: [
    { title: "Débutants", copy: "Vous pouvez commencer sans connaître la boxe ou le Jiu-Jitsu. Les fondamentaux sont introduits progressivement." },
    { title: "Pratiquants polyvalents", copy: "Le cours aide à connecter des compétences déjà acquises en percussion, lutte ou sol." },
    { title: "Objectif compétition", copy: "Les pratiquants concernés peuvent approfondir stratégie, rythme et préparation dans un cadre structuré." },
  ],
  classSteps: [
    { title: "Échauffement ciblé", copy: "Préparer les appuis, la mobilité et les réactions nécessaires au thème du jour." },
    { title: "Travail technique", copy: "Décomposer une séquence de striking, de lutte ou de sol avant de relier les phases." },
    { title: "Mise en situation", copy: "Résoudre un problème précis avec des règles et une intensité clairement définies." },
    { title: "Application contrôlée", copy: "Tester ses choix avec protections et partenaires adaptés, sans contact dur imposé." },
  ],
  academyLinks: [
    { label: "Comprendre le MMA", href: "/academie/comprendre-le-mma" },
    { label: "Préparer son premier entraînement", href: "/academy/mma" },
    { label: "Choisir son équipement", href: "/academie/equipement-jjb-grappling-mma" },
  ],
  faq: mmaFAQ,
};

export const generateMetadata = () => buildLocalDisciplineMetadata(data);
export default function Page() { return <LocalDisciplinePage data={data} />; }
