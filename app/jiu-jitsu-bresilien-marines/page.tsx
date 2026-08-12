import { bjjFAQ } from "../data/faqs";
import { buildLocalDisciplineMetadata, LocalDisciplinePage, type LocalDisciplineData } from "../local-discipline-template";

const data: LocalDisciplineData = {
  slug: "jiu-jitsu-bresilien-marines",
  name: "Jiu-Jitsu Brésilien",
  shortName: "JJB",
  title: "Jiu-Jitsu Brésilien à Marines | Strongbear",
  description: "Cours de Jiu-Jitsu Brésilien à Marines, dans le Vexin. Débutants et pratiquants confirmés, professeurs diplômés et essai sur Fighty.",
  eyebrow: "Jiu-Jitsu Brésilien · Marines · Val-d’Oise",
  h1: "Jiu-Jitsu Brésilien à Marines.",
  intro: "Apprenez à contrôler, vous déplacer et décider avec précision dans une académie technique, accessible et conviviale au cœur du Vexin.",
  image: "/bjj-card-bear.png",
  alt: "Pratique du Jiu-Jitsu Brésilien chez Strongbear à Marines",
  overviewTitle: "La technique avant la force.",
  overview: [
    "Le Jiu-Jitsu Brésilien est une discipline de contrôle au sol fondée sur le placement, les leviers et la compréhension des positions. Il permet d’apprendre à agir avec méthode, même lorsque la situation devient exigeante.",
    "Chez Strongbear, les débutants découvrent les fondamentaux progressivement. Les pratiquants plus expérimentés approfondissent leur stratégie, leurs transitions et leur capacité à construire un jeu cohérent, en loisir comme en compétition.",
  ],
  benefits: [
    { title: "Précision technique", copy: "Comprendre les positions, les leviers et les enchaînements plutôt que compter uniquement sur la force." },
    { title: "Confiance", copy: "Progresser dans des situations contrôlées et apprendre à rester calme sous pression." },
    { title: "Condition complète", copy: "Développer mobilité, coordination, endurance et force fonctionnelle au fil de la pratique." },
    { title: "Stratégie", copy: "Observer, anticiper et choisir la bonne réponse au bon moment." },
  ],
  audience: [
    { title: "Débutants", copy: "Aucune expérience n’est nécessaire. Les règles de sécurité et les positions essentielles sont expliquées dès le départ." },
    { title: "Pratiquants loisir", copy: "Un cadre régulier pour apprendre, bouger et progresser sans obligation de compétition." },
    { title: "Compétiteurs", copy: "Un environnement exigeant pour affiner les détails, tester les stratégies et préparer les échéances." },
  ],
  classSteps: [
    { title: "Mise en mouvement", copy: "Préparer le corps avec des déplacements et exercices liés aux besoins de la séance." },
    { title: "Apprentissage technique", copy: "Découvrir une position, comprendre son objectif puis répéter avec un partenaire adapté." },
    { title: "Situations guidées", copy: "Mettre la technique en contexte avec une résistance progressive et des consignes précises." },
    { title: "Opposition adaptée", copy: "Expérimenter librement selon votre niveau, sous le regard de professeurs diplômés." },
  ],
  academyLinks: [
    { label: "Comprendre le Jiu-Jitsu Brésilien", href: "/academie/comprendre-le-jjb" },
    { label: "Préparer son premier cours", href: "/academy/bien-debuter/premier-cours-jiu-jitsu-bresilien" },
    { label: "Choisir son équipement", href: "/academie/equipement-jjb-grappling-mma" },
  ],
  faq: bjjFAQ,
};

export const generateMetadata = () => buildLocalDisciplineMetadata(data);
export default function Page() { return <LocalDisciplinePage data={data} />; }
