import { grapplingFAQ } from "../data/faqs";
import { buildLocalDisciplineMetadata, LocalDisciplinePage, type LocalDisciplineData } from "../local-discipline-template";

const data: LocalDisciplineData = {
  scheduleKey: "grappling",
  slug: "grappling-marines",
  name: "Grappling",
  shortName: "Grappling",
  title: "Grappling à Marines | Strongbear",
  description: "Cours de Grappling à Marines dans le Vexin. Une pratique sans kimono, progressive et accessible aux débutants chez Strongbear.",
  eyebrow: "Grappling · Marines · Val-d’Oise",
  h1: "Grappling à Marines.",
  intro: "Développez vos contrôles, vos transitions et votre mobilité sans kimono, avec une progression claire et une intensité maîtrisée.",
  image: "/bjj-hero.jpg",
  alt: "Cours de Grappling chez Strongbear à Marines dans le Vexin",
  overviewTitle: "Bouger sans prise sur le tissu.",
  overview: [
    "Le Grappling est une discipline de préhension sans kimono. Le rythme est fluide : les contrôles, les déplacements et les transitions s’appuient directement sur le corps du partenaire.",
    "L’enseignement Strongbear donne une place centrale à la posture, au contrôle et à la sécurité. Vous apprenez à relier lutte, passages, immobilisations et soumissions dans une pratique cohérente, utile en loisir, en compétition et comme complément du MMA.",
  ],
  benefits: [
    { title: "Mobilité", copy: "Apprendre à créer de l’espace, changer d’angle et accompagner un rythme plus dynamique." },
    { title: "Contrôle", copy: "Stabiliser une position sans dépendre des saisies du kimono." },
    { title: "Transitions", copy: "Relier les phases debout et au sol avec continuité et lucidité." },
    { title: "Adaptabilité", copy: "Développer des réponses simples face à des morphologies et des styles variés." },
  ],
  audience: [
    { title: "Première pratique", copy: "Les fondamentaux sont accessibles sans expérience préalable ni condition physique particulière." },
    { title: "Jiu-Jitsukas", copy: "Le sans-kimono enrichit la mobilité, les contrôles directs et la lecture des transitions." },
    { title: "Pratiquants MMA", copy: "Le Grappling consolide le travail de lutte, de contrôle et de soumission nécessaire au MMA." },
  ],
  classSteps: [
    { title: "Mobilité spécifique", copy: "Préparer appuis, hanches et déplacements avec des mouvements utiles au Grappling." },
    { title: "Technique", copy: "Étudier un contrôle ou une transition en comprenant les points de contact essentiels." },
    { title: "Travail situationnel", copy: "Démarrer depuis une position précise afin de consolider une compétence ciblée." },
    { title: "Rounds progressifs", copy: "Mettre les acquis en pratique avec une intensité adaptée et des partenaires responsables." },
  ],
  academyLinks: [
    { label: "Comprendre le Grappling", href: "/academie/comprendre-le-grappling" },
    { label: "Découvrir les bénéfices du Grappling", href: "/academie/benefices-grappling" },
    { label: "Choisir son équipement", href: "/academie/equipement-jjb-grappling-mma" },
  ],
  faq: grapplingFAQ,
};

export const generateMetadata = () => buildLocalDisciplineMetadata(data);
export default function Page() { return <LocalDisciplinePage data={data} />; }
