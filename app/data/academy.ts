import type { FAQItem } from "./faqs";

export type AcademyCategorySlug =
  | "bien-debuter"
  | "jiu-jitsu-bresilien"
  | "grappling"
  | "mma"
  | "enfants-parents"
  | "vie-strongbear";

export type AcademyCategory = {
  slug: AcademyCategorySlug;
  number: string;
  name: string;
  shortName: string;
  description: string;
  promise: string;
  disciplineHref?: string;
};

export type ArticleSection = {
  id: string;
  title: string;
  introduction?: string;
  paragraphs: string[];
  checklist?: string[];
  callout?: { label: string; text: string };
  subsections?: Array<{ title: string; paragraphs: string[] }>;
};

export type AcademyArticle = {
  slug: string;
  category: AcademyCategorySlug;
  title: string;
  cardTitle: string;
  description: string;
  metaDescription: string;
  readingTime: string;
  status: "published" | "planned";
  image?: string;
  imageAlt?: string;
  publishedAt?: string;
  updatedAt?: string;
  keywords: string[];
  sections?: ArticleSection[];
  faq?: FAQItem[];
  related?: string[];
  authorityLinks?: Array<{ label: string; href: string; description: string }>;
};

export const academyCategories: AcademyCategory[] = [
  { slug: "bien-debuter", number: "01", name: "Bien débuter", shortName: "Débuter", description: "Des réponses concrètes pour préparer sa première séance, choisir son équipement et progresser sans se précipiter.", promise: "Arriver avec les bons repères, même sans aucune expérience." },
  { slug: "jiu-jitsu-bresilien", number: "02", name: "Jiu-Jitsu Brésilien", shortName: "Jiu-Jitsu", description: "Comprendre les principes, la progression, les ceintures et les grandes différences avec les disciplines voisines.", promise: "Lire le JJB comme un système technique, pas comme une collection de mouvements.", disciplineHref: "/#disciplines" },
  { slug: "grappling", number: "03", name: "Grappling", shortName: "Grappling", description: "Explorer la pratique sans kimono, ses bénéfices, ses règles et les choix tactiques qui la rendent unique.", promise: "Comprendre ce qui change lorsque les saisies et le rythme évoluent.", disciplineHref: "/#disciplines" },
  { slug: "mma", number: "04", name: "MMA", shortName: "MMA", description: "Découvrir une pratique complète, son entraînement et ses règles de sécurité, avec un langage accessible aux débutants.", promise: "Distinguer l’apprentissage quotidien de l’image spectaculaire de la compétition.", disciplineHref: "/#disciplines" },
  { slug: "enfants-parents", number: "05", name: "Enfants & Parents", shortName: "Parents", description: "Des guides pour comprendre la pédagogie, la sécurité, la confiance et la place des parents dans la progression.", promise: "Aider les parents à décider avec des informations claires et rassurantes.", disciplineHref: "/kids" },
  { slug: "vie-strongbear", number: "06", name: "Vie Strongbear", shortName: "Strongbear", description: "La vie réelle de l’académie : enseignement, événements, séminaires, compétitions et projets de la communauté.", promise: "Documenter la culture du club avec des faits, des visages et des résultats vérifiables." },
];

const firstClassSections: ArticleSection[] = [
  {
    id: "avant-de-venir",
    title: "Avant de venir : préparer l’essentiel",
    introduction: "Une première séance demande peu de matériel. Les détails qui comptent sont surtout l’hygiène, le confort et quelques minutes d’avance.",
    paragraphs: [
      "Réservez d’abord un créneau d’essai sur Fighty. La fiche du cours reste la source à jour pour l’horaire, le niveau et les éventuelles consignes de tenue. Si vous hésitez entre un cours avec ou sans kimono, choisissez le créneau débutant le plus simple pour votre agenda : l’équipe vous aidera ensuite à affiner votre pratique.",
      "Pour un essai sans kimono, une tenue de sport propre et près du corps est généralement adaptée. Évitez les fermetures métalliques, les poches ouvertes et les bijoux. Coupez vos ongles, attachez les cheveux longs et prévoyez des sandales pour circuler hors du tatami. Une gourde complète la préparation.",
      "Vous n’avez pas besoin de vous mettre en condition avant de commencer. La condition physique se construit avec la pratique. Si vous avez une douleur, une blessure récente ou une contrainte médicale, informez le coach avant la séance et demandez conseil à un professionnel de santé lorsque votre situation l’exige.",
    ],
    checklist: ["Réservation confirmée sur Fighty", "Tenue propre, sans zip ni poche ouverte", "Ongles courts et bijoux retirés", "Gourde et sandales", "Arrivée dix minutes en avance"],
  },
  {
    id: "arrivee",
    title: "L’arrivée : ne pas rester seul avec ses questions",
    paragraphs: [
      "Présentez-vous au coach dès votre arrivée et précisez que vous découvrez le Jiu-Jitsu Brésilien. Ce signal permet à l’équipe de vous expliquer l’espace, les règles d’hygiène, le déroulé et la manière de travailler avec un partenaire.",
      "Un bon accueil ne consiste pas à vous laisser imiter les pratiquants expérimentés. Vous devez savoir où poser vos affaires, quand entrer sur le tatami, comment demander une pause et à qui parler en cas d’inconfort. Ces repères réduisent la charge mentale et vous permettent de vous concentrer sur l’apprentissage.",
    ],
    callout: { label: "Le bon réflexe", text: "Dites ce que vous ne savez pas. Une question posée avant l’exercice évite souvent une mauvaise position ou une intensité mal comprise." },
  },
  {
    id: "deroule-du-cours",
    title: "Le déroulé d’un cours de JJB",
    introduction: "Le contenu varie selon le coach et le thème, mais la séance suit généralement une progression lisible.",
    paragraphs: [
      "L’échauffement prépare les mouvements utiles au cours : mobilité, déplacements au sol, chutes ou exercices en binôme. Vient ensuite la partie technique. Le coach présente une situation, explique les points de contrôle et montre les erreurs fréquentes. Vous répétez avec un partenaire à une intensité basse afin de construire des repères fiables.",
      "Des exercices situationnels peuvent ensuite ajouter une résistance limitée. Le départ et l’objectif sont définis : conserver une position, s’échapper ou atteindre une transition. Cette contrainte rend l’apprentissage plus précis qu’un affrontement sans consigne.",
      "La séance peut se terminer par des rounds d’opposition. Pour un débutant, ils peuvent être adaptés, remplacés par un exercice ou simplement observés. L’objectif du premier cours n’est pas de gagner ; il est de comprendre comment rester en sécurité, respirer et prendre des décisions simples.",
    ],
    subsections: [
      { title: "Travailler avec un partenaire", paragraphs: ["Votre partenaire n’est pas un adversaire à battre. Il vous prête son corps et son attention pour apprendre. Annoncez votre niveau, contrôlez vos mouvements et acceptez de ralentir dès que la situation devient confuse."] },
      { title: "L’intensité", paragraphs: ["Une intensité utile permet encore d’écouter, de respirer et de respecter les signaux de l’autre. Aller plus vite ne compense pas un placement incertain. Au début, la qualité de répétition vaut davantage que le volume."] },
    ],
  },
  {
    id: "securite",
    title: "La sécurité : abandonner est une compétence",
    paragraphs: [
      "En JJB, taper avec la main, le pied ou verbalement signifie que l’action doit s’arrêter immédiatement. Il ne faut pas attendre la douleur. Reconnaître une position que l’on ne contrôle plus est une décision technique, pas un échec.",
      "Le partenaire qui applique une soumission porte la même responsabilité : avancer progressivement, rester attentif et relâcher au premier signal. Le coach définit les techniques autorisées selon le niveau. Signalez sans attendre une gêne, un vertige ou un comportement trop intense.",
      "Aucune pratique physique n’est sans risque. Un cadre sérieux réduit ce risque par la pédagogie, le contrôle, l’hygiène, l’adaptation des binômes et le respect des règles. Votre propre communication fait partie de ce système.",
    ],
  },
  {
    id: "apres-la-seance",
    title: "Après la séance : décider avec de bons critères",
    paragraphs: [
      "Une première séance peut être déroutante : vocabulaire nouveau, mouvements inhabituels et forte concentration. N’évaluez pas votre potentiel à la quantité de techniques retenues. Demandez-vous plutôt si les consignes étaient compréhensibles, si vous pouviez poser des questions et si vos partenaires contrôlaient leur intensité.",
      "Échangez avec le coach sur le créneau conseillé et l’équipement. Une séance hebdomadaire régulière suffit pour commencer à construire des repères. Deux séances peuvent accélérer l’apprentissage si votre récupération et votre emploi du temps le permettent. La meilleure fréquence est celle que vous pouvez tenir sans transformer la pratique en contrainte.",
      "Chez Strongbear, l’offre adulte donne accès au Jiu-Jitsu Brésilien, au Grappling et au MMA. Vous pouvez vous concentrer sur le JJB puis découvrir les autres disciplines lorsque vos repères deviennent plus solides.",
    ],
  },
];

export const academyArticles: AcademyArticle[] = [
  {
    slug: "premier-cours-jiu-jitsu-bresilien",
    category: "bien-debuter",
    title: "Votre premier cours de Jiu-Jitsu Brésilien : le guide complet",
    cardTitle: "Votre premier cours de JJB",
    description: "Tenue, arrivée, déroulé, sécurité et bons critères après la séance : tous les repères pour commencer sereinement.",
    metaDescription: "Préparez votre premier cours de Jiu-Jitsu Brésilien à Marines : tenue, déroulé, sécurité, intensité et conseils pour débuter sereinement.",
    readingTime: "9 min",
    status: "published",
    image: "/bjj-class.jpg",
    imageAlt: "Démonstration technique pendant un cours de Jiu-Jitsu Brésilien",
    publishedAt: "2026-08-06",
    updatedAt: "2026-08-06",
    keywords: ["premier cours Jiu-Jitsu Brésilien", "débuter JJB Marines", "Jiu-Jitsu Brésilien débutant Vexin"],
    sections: firstClassSections,
    faq: [
      { question: "Puis-je venir si je ne suis pas sportif ?", answer: "Oui. La condition se construit progressivement. Prévenez le coach de vos contraintes et adaptez l’intensité dès le début." },
      { question: "Dois-je acheter un kimono avant l’essai ?", answer: "Pas nécessairement. Vérifiez la consigne du créneau sur Fighty. Pour un essai sans kimono, une tenue de sport adaptée peut suffire." },
      { question: "Suis-je obligé de faire des combats ?", answer: "Non. Le coach peut adapter ou remplacer l’opposition. Vous pouvez demander à observer ou rester sur des exercices techniques." },
      { question: "Que signifie taper ?", answer: "Taper avec la main, le pied ou verbalement demande l’arrêt immédiat de l’action. Faites-le tôt, avant la douleur." },
      { question: "Combien de séances faut-il pour savoir si le JJB me plaît ?", answer: "Une séance donne une première impression. Quelques cours permettent de mieux comprendre la pédagogie, le rythme et les sensations avant de décider." },
    ],
    related: ["qu-est-ce-que-le-jiu-jitsu-bresilien", "equipement-premier-cours", "frequence-entrainement"],
  },
  { slug: "equipement-premier-cours", category: "bien-debuter", title: "Quel équipement pour commencer les sports de combat ?", cardTitle: "Quel équipement faut-il ?", description: "La liste utile pour le JJB, le Grappling et le MMA, sans achats prématurés.", metaDescription: "Tenue et équipement pour débuter le JJB, le Grappling ou le MMA : l’essentiel pour un premier cours à Marines.", readingTime: "6 min", status: "planned", keywords: ["équipement JJB débutant", "tenue grappling", "équipement MMA débutant"] },
  { slug: "frequence-entrainement", category: "bien-debuter", title: "Combien de fois par semaine faut-il s’entraîner ?", cardTitle: "À quelle fréquence s’entraîner ?", description: "Trouver un rythme durable selon son niveau, ses objectifs et sa récupération.", metaDescription: "Une méthode simple pour choisir sa fréquence d’entraînement en JJB, Grappling ou MMA sans négliger la récupération.", readingTime: "7 min", status: "planned", keywords: ["fréquence entraînement JJB", "combien de cours grappling"] },
  { slug: "commencer-arts-martiaux-apres-40-ans", category: "bien-debuter", title: "Peut-on commencer les arts martiaux après 40 ans ?", cardTitle: "Commencer après 40 ans", description: "Adapter le rythme, la récupération et les objectifs sans renoncer à progresser.", metaDescription: "Commencer le JJB, le Grappling ou le MMA après 40 ans : rythme, récupération et conseils pour progresser durablement.", readingTime: "8 min", status: "planned", keywords: ["commencer JJB après 40 ans", "arts martiaux adultes Vexin"] },
  { slug: "debutants-securite", category: "bien-debuter", title: "Les débutants peuvent-ils s’entraîner en sécurité ?", cardTitle: "Débuter en sécurité", description: "Comprendre le rôle du coach, du partenaire, des règles et de sa propre communication.", metaDescription: "Comment les débutants pratiquent en sécurité en JJB, Grappling et MMA : intensité, partenaires et règles essentielles.", readingTime: "8 min", status: "planned", keywords: ["sécurité JJB débutant", "sports de combat débutants"] },

  { slug: "qu-est-ce-que-le-jiu-jitsu-bresilien", category: "jiu-jitsu-bresilien", title: "Qu’est-ce que le Jiu-Jitsu Brésilien ?", cardTitle: "Comprendre le Jiu-Jitsu Brésilien", description: "Positions, contrôles, soumissions et logique de progression expliqués clairement.", metaDescription: "Découvrez le Jiu-Jitsu Brésilien : principes, positions, entraînement et progression dans une académie à Marines.", readingTime: "10 min", status: "planned", keywords: ["Jiu-Jitsu Brésilien Marines", "qu'est-ce que le JJB"] },
  { slug: "pourquoi-jjb-efficace", category: "jiu-jitsu-bresilien", title: "Pourquoi le Jiu-Jitsu Brésilien est-il efficace ?", cardTitle: "Pourquoi le JJB est efficace", description: "Leviers, contrôle, résistance progressive et prise de décision sous contrainte.", metaDescription: "Pourquoi le Jiu-Jitsu Brésilien est efficace : leviers, contrôle, opposition et apprentissage technique.", readingTime: "9 min", status: "planned", keywords: ["efficacité Jiu-Jitsu Brésilien", "bénéfices JJB"] },
  { slug: "bjj-vs-judo", category: "jiu-jitsu-bresilien", title: "Jiu-Jitsu Brésilien ou Judo : quelles différences ?", cardTitle: "JJB ou Judo ?", description: "Deux disciplines proches, comparées honnêtement par leurs objectifs et leurs règles.", metaDescription: "JJB vs Judo : différences de règles, travail debout, contrôle au sol et critères pour choisir.", readingTime: "9 min", status: "planned", keywords: ["JJB vs Judo", "Judo ou Jiu-Jitsu Brésilien"] },
  { slug: "bjj-vs-lutte", category: "jiu-jitsu-bresilien", title: "Jiu-Jitsu Brésilien ou lutte : que travaille-t-on ?", cardTitle: "JJB ou lutte ?", description: "Contrôle, amenées au sol, rythme et finalités comparés sans raccourci.", metaDescription: "JJB vs lutte : comprendre les différences d’amenées au sol, de contrôle et de soumissions.", readingTime: "8 min", status: "planned", keywords: ["JJB vs lutte", "wrestling vs BJJ"] },
  { slug: "ceintures-jjb", category: "jiu-jitsu-bresilien", title: "Les ceintures en Jiu-Jitsu Brésilien", cardTitle: "Comprendre les ceintures", description: "Ce que les grades représentent — et ce qu’ils ne disent pas à eux seuls.", metaDescription: "Guide des ceintures en Jiu-Jitsu Brésilien : progression, compétences et temps d’apprentissage.", readingTime: "8 min", status: "planned", keywords: ["ceintures JJB", "grades Jiu-Jitsu Brésilien"] },
  { slug: "competition-jjb", category: "jiu-jitsu-bresilien", title: "Découvrir la compétition de Jiu-Jitsu Brésilien", cardTitle: "Première compétition de JJB", description: "Règles, préparation et décision de participer sans faire de la compétition une obligation.", metaDescription: "Préparer une première compétition de JJB : règles, entraînement, équipement et état d’esprit.", readingTime: "11 min", status: "planned", keywords: ["compétition JJB débutant", "règles Jiu-Jitsu Brésilien"] },

  { slug: "qu-est-ce-que-le-grappling", category: "grappling", title: "Qu’est-ce que le Grappling ?", cardTitle: "Comprendre le Grappling", description: "Une pratique de préhension sans kimono fondée sur le contrôle et les soumissions.", metaDescription: "Découvrez le Grappling à Marines : principes, tenue, entraînement et différences avec le JJB.", readingTime: "9 min", status: "planned", keywords: ["Grappling Marines", "qu'est-ce que le grappling"] },
  { slug: "grappling-vs-no-gi", category: "grappling", title: "Grappling et No-Gi JJB : est-ce la même chose ?", cardTitle: "Grappling ou No-Gi ?", description: "Vocabulaire, règles et culture : comprendre les recouvrements sans simplifier à l’excès.", metaDescription: "Grappling vs No-Gi JJB : points communs, différences de règles et styles d’entraînement.", readingTime: "8 min", status: "planned", keywords: ["grappling vs no-gi", "No-Gi JJB"] },
  { slug: "amenees-au-sol-grappling", category: "grappling", title: "Les grandes familles d’amenées au sol en Grappling", cardTitle: "Comprendre les amenées au sol", description: "Entrées de jambes, projections et contrôles expliqués par objectifs plutôt que par classement artificiel.", metaDescription: "Les familles d’amenées au sol en Grappling : objectifs, contrôle et sécurité pour progresser.", readingTime: "11 min", status: "planned", keywords: ["amenées au sol grappling", "takedowns grappling"] },
  { slug: "regles-competition-grappling", category: "grappling", title: "Comprendre les règles d’une compétition de Grappling", cardTitle: "Règles du Grappling", description: "Points, soumissions et variations selon les organisations : les bons réflexes avant de s’inscrire.", metaDescription: "Guide des règles de compétition en Grappling : points, soumissions et différences entre règlements.", readingTime: "12 min", status: "planned", keywords: ["règles grappling", "compétition grappling"] },
  { slug: "benefices-grappling", category: "grappling", title: "Les bénéfices du Grappling pour le corps et l’esprit", cardTitle: "Les bénéfices du Grappling", description: "Coordination, résolution de problèmes, condition et qualité du collectif.", metaDescription: "Les bénéfices du Grappling : coordination, condition physique, confiance et prise de décision.", readingTime: "8 min", status: "planned", keywords: ["bienfaits grappling", "bénéfices grappling"] },

  { slug: "qu-est-ce-que-le-mma", category: "mma", title: "Qu’est-ce que le MMA ?", cardTitle: "Comprendre le MMA", description: "Relier les distances debout, au corps à corps et au sol dans un cadre réglementé.", metaDescription: "Découvrez le MMA à Marines : disciplines, entraînement, règles et progression pour débutants.", readingTime: "10 min", status: "planned", keywords: ["MMA Marines", "qu'est-ce que le MMA"] },
  { slug: "mma-pour-debutants", category: "mma", title: "Un débutant peut-il pratiquer le MMA ?", cardTitle: "Le MMA pour débutants", description: "Comment apprendre progressivement sans être exposé à une intensité inadaptée.", metaDescription: "MMA pour débutants à Marines : progression, intensité, équipement et sécurité du premier cours.", readingTime: "9 min", status: "planned", keywords: ["MMA débutant Marines", "commencer MMA"] },
  { slug: "entrainement-mma-explique", category: "mma", title: "Comment se déroule un entraînement de MMA ?", cardTitle: "Un entraînement de MMA expliqué", description: "Échauffement, technique, transitions, travail situationnel et opposition encadrée.", metaDescription: "Déroulé d’un entraînement de MMA : technique, transitions, exercices et opposition encadrée.", readingTime: "9 min", status: "planned", keywords: ["entraînement MMA", "cours MMA Marines"] },
  { slug: "securite-mma", category: "mma", title: "Comment la sécurité est-elle travaillée en MMA ?", cardTitle: "La sécurité en MMA", description: "Progressivité, protections, intensité et rôle du partenaire dans l’apprentissage.", metaDescription: "Sécurité en MMA : protections, intensité, progression technique et encadrement des débutants.", readingTime: "10 min", status: "planned", keywords: ["sécurité MMA", "MMA débutant sécurité"] },
  { slug: "preparer-competition-mma", category: "mma", title: "Préparer une compétition de MMA", cardTitle: "Préparer une compétition", description: "Un projet encadré qui dépasse largement les dernières semaines avant le combat.", metaDescription: "Préparation d’une compétition de MMA : technique, condition, stratégie, récupération et encadrement.", readingTime: "13 min", status: "planned", keywords: ["préparation compétition MMA", "camp MMA"] },

  { slug: "arts-martiaux-aident-enfants", category: "enfants-parents", title: "Comment les arts martiaux aident-ils les enfants ?", cardTitle: "Grandir grâce aux arts martiaux", description: "Confiance, coordination, respect et persévérance dans un cadre éducatif.", metaDescription: "Les bénéfices des arts martiaux pour les enfants : confiance, respect, coordination et progression à Marines.", readingTime: "9 min", status: "planned", keywords: ["arts martiaux enfants Marines", "bienfaits JJB enfants"] },
  { slug: "jjb-enfants-securite", category: "enfants-parents", title: "Le Jiu-Jitsu Brésilien est-il sûr pour les enfants ?", cardTitle: "Le JJB est-il sûr pour les enfants ?", description: "Ce que les parents doivent observer dans les règles, la pédagogie et l’intensité.", metaDescription: "Sécurité du JJB pour enfants : pédagogie, règles, intensité et critères pour choisir un cours à Marines.", readingTime: "10 min", status: "planned", keywords: ["JJB enfants sécurité", "Jiu-Jitsu enfants Marines"] },
  { slug: "confiance-enfant-jiu-jitsu", category: "enfants-parents", title: "Construire la confiance d’un enfant par le Jiu-Jitsu", cardTitle: "Jiu-Jitsu et confiance", description: "Pourquoi les petits défis répétés comptent davantage que les grands discours.", metaDescription: "Comment le Jiu-Jitsu aide un enfant à développer sa confiance grâce à une progression adaptée.", readingTime: "8 min", status: "planned", keywords: ["Jiu-Jitsu confiance enfant", "arts martiaux confiance"] },
  { slug: "respect-discipline-enfants", category: "enfants-parents", title: "Respect et discipline : ce que le tatami peut transmettre", cardTitle: "Respect et discipline", description: "Des règles vécues dans l’action, sans intimidation ni obéissance aveugle.", metaDescription: "Comment les arts martiaux enseignent respect, discipline et maîtrise de soi aux enfants.", readingTime: "8 min", status: "planned", keywords: ["arts martiaux respect enfants", "discipline enfant JJB"] },
  { slug: "jiu-jitsu-harcelement", category: "enfants-parents", title: "Jiu-Jitsu et harcèlement : ce qu’un cours peut vraiment apporter", cardTitle: "Jiu-Jitsu et harcèlement", description: "Confiance, limites et demande d’aide — sans promettre une solution magique.", metaDescription: "Jiu-Jitsu et harcèlement : bénéfices possibles, limites et rôle indispensable des adultes.", readingTime: "11 min", status: "planned", keywords: ["Jiu-Jitsu harcèlement", "arts martiaux anti-harcèlement"] },
  { slug: "guide-parents-premier-cours", category: "enfants-parents", title: "Guide des parents pour un premier cours Kids", cardTitle: "Le guide du premier cours Kids", description: "Préparer son enfant, observer les bons signaux et échanger avec le coach.", metaDescription: "Guide parents pour le premier cours de JJB enfant à Marines : préparation, tenue et critères de confiance.", readingTime: "9 min", status: "planned", keywords: ["premier cours JJB enfant", "guide parents arts martiaux"] },

  { slug: "une-semaine-strongbear", category: "vie-strongbear", title: "Une semaine d’entraînement chez Strongbear", cardTitle: "Une semaine chez Strongbear", description: "Un futur reportage sur les cours, les coachs et les liens entre disciplines.", metaDescription: "Découvrez la vie de Strongbear BJJ & Grappling à Marines à travers une semaine d’entraînement.", readingTime: "7 min", status: "planned", keywords: ["Strongbear Marines", "club JJB Vexin"] },
  { slug: "evenements-strongbear", category: "vie-strongbear", title: "Les événements Strongbear", cardTitle: "Événements", description: "Calendrier éditorial des rencontres et temps forts, publié uniquement à partir d’informations confirmées.", metaDescription: "Événements Strongbear à Marines : rencontres, entraînements et temps forts de l’académie.", readingTime: "5 min", status: "planned", keywords: ["événements Strongbear", "arts martiaux Marines"] },
  { slug: "seminaires-strongbear", category: "vie-strongbear", title: "Séminaires et intervenants", cardTitle: "Séminaires", description: "Présentation des intervenants, thèmes et enseignements avec sources vérifiables.", metaDescription: "Séminaires de JJB, Grappling et MMA chez Strongbear à Marines.", readingTime: "6 min", status: "planned", keywords: ["séminaire JJB Marines", "stage grappling Vexin"] },
  { slug: "competitions-resultats", category: "vie-strongbear", title: "Compétitions et résultats Strongbear", cardTitle: "Compétitions & résultats", description: "Résultats datés, contexte sportif et récits des pratiquants — sans palmarès inventé.", metaDescription: "Résultats et récits de compétition des pratiquants Strongbear BJJ & Grappling.", readingTime: "8 min", status: "planned", keywords: ["résultats Strongbear", "compétition JJB Marines"] },
  { slug: "communaute-strongbear", category: "vie-strongbear", title: "Ce qui construit une communauté d’entraînement", cardTitle: "Construire une communauté", description: "Les gestes quotidiens qui rendent une académie exigeante, accueillante et durable.", metaDescription: "La communauté Strongbear à Marines : respect, transmission et progression collective.", readingTime: "8 min", status: "planned", keywords: ["communauté Strongbear", "club arts martiaux Vexin"] },
];

export const publishedAcademyArticles = academyArticles.filter((article) => article.status === "published");

export function getAcademyCategory(slug: string) {
  return academyCategories.find((category) => category.slug === slug);
}

export function getAcademyArticlesByCategory(slug: string) {
  return academyArticles.filter((article) => article.category === slug);
}

export function getAcademyArticle(category: string, slug: string) {
  return academyArticles.find((article) => article.category === category && article.slug === slug && article.status === "published");
}

export function getAcademyArticleBySlug(slug: string) {
  return academyArticles.find((article) => article.slug === slug);
}

export function academyArticleHref(article: AcademyArticle) {
  return `/academy/${article.category}/${article.slug}`;
}
