export type SearchIntent = "informational" | "local" | "commercial" | "navigational";
export type TopicCoverage = "published" | "planned" | "missing" | "evidence-blocked";
export type TopicPriority = "P0" | "P1" | "P2" | "P3";
export type TopicDifficulty = "low" | "medium" | "high";

export type SemanticTopic = {
  id: string;
  label: string;
  cluster: string;
  parentId: string;
  intent: SearchIntent;
  coverage: TopicCoverage;
  priority: TopicPriority;
  difficulty: TopicDifficulty;
  targetPath?: string;
  entities: string[];
  localModifiers: string[];
  evidence?: string;
};

export type TopicalCluster = {
  id: string;
  label: string;
  parentId: "martial-arts";
  pillarPath?: string;
  pillarStatus: "live" | "missing";
  topics: SemanticTopic[];
};

const localModifiers = ["Marines", "Vexin", "Val-d’Oise"];

function topic(input: Omit<SemanticTopic, "localModifiers"> & { localModifiers?: string[] }): SemanticTopic {
  return { ...input, localModifiers: input.localModifiers ?? localModifiers };
}

export const topicalHierarchy = [
  { id: "martial-arts", label: "Arts martiaux", parentId: null },
  { id: "bjj", label: "Jiu-Jitsu Brésilien", parentId: "martial-arts" },
  { id: "grappling", label: "Grappling", parentId: "martial-arts" },
  { id: "mma", label: "MMA", parentId: "martial-arts" },
  { id: "kids", label: "Kids", parentId: "martial-arts" },
  { id: "parents", label: "Parents", parentId: "kids" },
  { id: "beginners", label: "Guides débutants", parentId: "martial-arts" },
  { id: "equipment", label: "Équipement", parentId: "beginners" },
  { id: "competition", label: "Compétitions", parentId: "martial-arts" },
  { id: "health", label: "Santé et sécurité", parentId: "martial-arts" },
  { id: "lifestyle", label: "Mode de vie et communauté", parentId: "martial-arts" },
] as const;

export const topicalClusters: TopicalCluster[] = [
  {
    id: "bjj", label: "Jiu-Jitsu Brésilien", parentId: "martial-arts", pillarPath: "/jiu-jitsu-bresilien", pillarStatus: "missing",
    topics: [
      topic({ id: "bjj-definition", label: "Qu’est-ce que le JJB ?", cluster: "bjj", parentId: "bjj", intent: "informational", coverage: "planned", priority: "P0", difficulty: "medium", targetPath: "/academy/jiu-jitsu-bresilien/qu-est-ce-que-le-jiu-jitsu-bresilien", entities: ["Brazilian Jiu-Jitsu", "grappling au sol"] }),
      topic({ id: "bjj-history", label: "Histoire et évolution du JJB", cluster: "bjj", parentId: "bjj", intent: "informational", coverage: "missing", priority: "P2", difficulty: "high", entities: ["Judo", "Jiu-Jitsu", "Brésil"], evidence: "Sources historiques primaires ou ouvrages reconnus requis." }),
      topic({ id: "bjj-belts", label: "Ceintures et progression", cluster: "bjj", parentId: "bjj", intent: "informational", coverage: "planned", priority: "P1", difficulty: "medium", targetPath: "/academy/jiu-jitsu-bresilien/ceintures-jjb", entities: ["ceintures JJB", "progression"] }),
      topic({ id: "bjj-techniques", label: "Positions et familles techniques", cluster: "bjj", parentId: "bjj", intent: "informational", coverage: "missing", priority: "P2", difficulty: "high", entities: ["contrôle", "garde", "passage", "soumission"] }),
      topic({ id: "bjj-competition", label: "Compétition et préparation", cluster: "bjj", parentId: "bjj", intent: "informational", coverage: "planned", priority: "P1", difficulty: "high", targetPath: "/academy/jiu-jitsu-bresilien/competition-jjb", entities: ["règles JJB", "compétition"] }),
      topic({ id: "bjj-benefits", label: "Bénéfices du JJB", cluster: "bjj", parentId: "bjj", intent: "informational", coverage: "planned", priority: "P1", difficulty: "medium", targetPath: "/academy/jiu-jitsu-bresilien/pourquoi-jjb-efficace", entities: ["coordination", "prise de décision", "condition physique"] }),
      topic({ id: "bjj-self-defense", label: "JJB et self-défense", cluster: "bjj", parentId: "bjj", intent: "informational", coverage: "missing", priority: "P2", difficulty: "high", entities: ["self-défense", "désescalade"], evidence: "Éviter toute promesse de sécurité absolue." }),
      topic({ id: "bjj-equipment", label: "Kimono et équipement", cluster: "bjj", parentId: "bjj", intent: "commercial", coverage: "planned", priority: "P1", difficulty: "medium", targetPath: "/academy/bien-debuter/equipement-premier-cours", entities: ["kimono", "ceinture", "rashguard"] }),
      topic({ id: "bjj-rules", label: "Règles et sécurité", cluster: "bjj", parentId: "bjj", intent: "informational", coverage: "planned", priority: "P1", difficulty: "high", targetPath: "/academy/bien-debuter/debutants-securite", entities: ["abandon", "soumissions autorisées", "hygiène"] }),
    ],
  },
  {
    id: "grappling", label: "Grappling", parentId: "martial-arts", pillarPath: "/grappling", pillarStatus: "missing",
    topics: [
      topic({ id: "grappling-definition", label: "Qu’est-ce que le Grappling ?", cluster: "grappling", parentId: "grappling", intent: "informational", coverage: "planned", priority: "P0", difficulty: "medium", targetPath: "/academy/grappling/qu-est-ce-que-le-grappling", entities: ["Grappling", "submission grappling"] }),
      topic({ id: "grappling-history", label: "Origines et familles du Grappling", cluster: "grappling", parentId: "grappling", intent: "informational", coverage: "missing", priority: "P3", difficulty: "high", entities: ["catch wrestling", "lutte", "JJB"] }),
      topic({ id: "grappling-no-gi", label: "Grappling vs No-Gi JJB", cluster: "grappling", parentId: "grappling", intent: "informational", coverage: "planned", priority: "P1", difficulty: "medium", targetPath: "/academy/grappling/grappling-vs-no-gi", entities: ["No-Gi", "Grappling"] }),
      topic({ id: "grappling-techniques", label: "Contrôles et transitions", cluster: "grappling", parentId: "grappling", intent: "informational", coverage: "missing", priority: "P2", difficulty: "high", entities: ["contrôle", "scramble", "transition"] }),
      topic({ id: "grappling-takedowns", label: "Amenées au sol", cluster: "grappling", parentId: "grappling", intent: "informational", coverage: "planned", priority: "P1", difficulty: "high", targetPath: "/academy/grappling/amenees-au-sol-grappling", entities: ["takedown", "projection", "contrôle"] }),
      topic({ id: "grappling-competition", label: "Compétition et formats", cluster: "grappling", parentId: "grappling", intent: "informational", coverage: "planned", priority: "P2", difficulty: "high", targetPath: "/academy/grappling/regles-competition-grappling", entities: ["points", "soumissions", "règlement"] }),
      topic({ id: "grappling-benefits", label: "Bénéfices du Grappling", cluster: "grappling", parentId: "grappling", intent: "informational", coverage: "planned", priority: "P1", difficulty: "medium", targetPath: "/academy/grappling/benefices-grappling", entities: ["mobilité", "coordination", "résolution de problèmes"] }),
      topic({ id: "grappling-equipment", label: "Tenue et équipement", cluster: "grappling", parentId: "grappling", intent: "commercial", coverage: "planned", priority: "P2", difficulty: "low", targetPath: "/academy/bien-debuter/equipement-premier-cours", entities: ["rashguard", "short", "protège-dents"] }),
      topic({ id: "grappling-rules", label: "Règles et sécurité", cluster: "grappling", parentId: "grappling", intent: "informational", coverage: "planned", priority: "P1", difficulty: "high", targetPath: "/academy/grappling/regles-competition-grappling", entities: ["règles", "sécurité", "soumissions"] }),
    ],
  },
  {
    id: "mma", label: "MMA", parentId: "martial-arts", pillarPath: "/mma", pillarStatus: "missing",
    topics: [
      topic({ id: "mma-definition", label: "Qu’est-ce que le MMA ?", cluster: "mma", parentId: "mma", intent: "informational", coverage: "planned", priority: "P0", difficulty: "high", targetPath: "/academy/mma/qu-est-ce-que-le-mma", entities: ["Mixed Martial Arts", "striking", "wrestling", "grappling"] }),
      topic({ id: "mma-history", label: "Histoire et évolution du MMA", cluster: "mma", parentId: "mma", intent: "informational", coverage: "missing", priority: "P3", difficulty: "high", entities: ["MMA", "réglementation"] }),
      topic({ id: "mma-beginners", label: "MMA pour débutants", cluster: "mma", parentId: "mma", intent: "local", coverage: "planned", priority: "P0", difficulty: "medium", targetPath: "/academy/mma/mma-pour-debutants", entities: ["MMA débutant", "cours encadré"] }),
      topic({ id: "mma-training", label: "Déroulé d’un entraînement", cluster: "mma", parentId: "mma", intent: "informational", coverage: "planned", priority: "P1", difficulty: "medium", targetPath: "/academy/mma/entrainement-mma-explique", entities: ["échauffement", "technique", "travail situationnel"] }),
      topic({ id: "mma-techniques", label: "Distances et transitions", cluster: "mma", parentId: "mma", intent: "informational", coverage: "missing", priority: "P2", difficulty: "high", entities: ["striking", "clinch", "takedown", "sol"] }),
      topic({ id: "mma-safety", label: "Sécurité et intensité", cluster: "mma", parentId: "mma", intent: "informational", coverage: "planned", priority: "P0", difficulty: "high", targetPath: "/academy/mma/securite-mma", entities: ["protections", "intensité", "partenaire"] }),
      topic({ id: "mma-competition", label: "Préparer une compétition", cluster: "mma", parentId: "mma", intent: "informational", coverage: "planned", priority: "P2", difficulty: "high", targetPath: "/academy/mma/preparer-competition-mma", entities: ["camp", "récupération", "stratégie"] }),
      topic({ id: "mma-equipment", label: "Équipement MMA", cluster: "mma", parentId: "mma", intent: "commercial", coverage: "planned", priority: "P2", difficulty: "medium", targetPath: "/academy/bien-debuter/equipement-premier-cours", entities: ["gants", "protège-dents", "protège-tibias"] }),
      topic({ id: "mma-rules", label: "Règles du MMA", cluster: "mma", parentId: "mma", intent: "informational", coverage: "missing", priority: "P1", difficulty: "high", entities: ["règles MMA", "techniques interdites"], evidence: "Règlement de la fédération ou de l’organisation concernée requis." }),
    ],
  },
  {
    id: "kids", label: "Kids", parentId: "martial-arts", pillarPath: "/kids", pillarStatus: "live",
    topics: [
      topic({ id: "kids-benefits", label: "Bénéfices des arts martiaux", cluster: "kids", parentId: "kids", intent: "informational", coverage: "planned", priority: "P1", difficulty: "medium", targetPath: "/academy/enfants-parents/arts-martiaux-aident-enfants", entities: ["confiance", "coordination", "respect"] }),
      topic({ id: "kids-safety", label: "Sécurité du JJB enfant", cluster: "kids", parentId: "kids", intent: "local", coverage: "planned", priority: "P0", difficulty: "high", targetPath: "/academy/enfants-parents/jjb-enfants-securite", entities: ["sécurité", "pédagogie", "intensité"] }),
      topic({ id: "kids-confidence", label: "Confiance", cluster: "kids", parentId: "kids", intent: "informational", coverage: "planned", priority: "P1", difficulty: "medium", targetPath: "/academy/enfants-parents/confiance-enfant-jiu-jitsu", entities: ["confiance", "progression"] }),
      topic({ id: "kids-respect", label: "Respect et discipline", cluster: "kids", parentId: "kids", intent: "informational", coverage: "planned", priority: "P1", difficulty: "medium", targetPath: "/academy/enfants-parents/respect-discipline-enfants", entities: ["respect", "discipline", "maîtrise de soi"] }),
      topic({ id: "kids-antibullying", label: "Harcèlement : apports et limites", cluster: "kids", parentId: "kids", intent: "informational", coverage: "planned", priority: "P1", difficulty: "high", targetPath: "/academy/enfants-parents/jiu-jitsu-harcelement", entities: ["harcèlement", "confiance", "adulte référent"], evidence: "Ne jamais présenter le JJB comme une solution unique." }),
      topic({ id: "kids-age-groups", label: "Groupes d’âge", cluster: "kids", parentId: "kids", intent: "local", coverage: "published", priority: "P0", difficulty: "low", targetPath: "/kids#ages", entities: ["à partir de 6 ans", "6–7 ans", "8–10 ans", "11–14 ans"] }),
      topic({ id: "kids-equipment", label: "Équipement enfant", cluster: "kids", parentId: "kids", intent: "commercial", coverage: "planned", priority: "P2", difficulty: "low", targetPath: "/academy/enfants-parents/guide-parents-premier-cours", entities: ["tenue", "gourde", "kimono"] }),
      topic({ id: "kids-competition", label: "Compétition enfant", cluster: "kids", parentId: "kids", intent: "informational", coverage: "missing", priority: "P3", difficulty: "high", entities: ["compétition enfant", "choix parental"] }),
    ],
  },
  {
    id: "parents", label: "Parents", parentId: "martial-arts", pillarPath: "/kids", pillarStatus: "live",
    topics: [
      topic({ id: "parents-first-class", label: "Guide du premier cours Kids", cluster: "parents", parentId: "parents", intent: "local", coverage: "planned", priority: "P0", difficulty: "medium", targetPath: "/academy/enfants-parents/guide-parents-premier-cours", entities: ["premier cours", "parent", "accueil"] }),
      topic({ id: "parents-choose-academy", label: "Choisir une académie", cluster: "parents", parentId: "parents", intent: "commercial", coverage: "missing", priority: "P1", difficulty: "high", entities: ["coach", "pédagogie", "sécurité", "essai"] }),
      topic({ id: "parents-observe", label: "Ce qu’un parent doit observer", cluster: "parents", parentId: "parents", intent: "informational", coverage: "missing", priority: "P1", difficulty: "medium", entities: ["consignes", "binômes", "encouragement"] }),
      topic({ id: "parents-cost", label: "Tarifs et engagement Kids", cluster: "parents", parentId: "parents", intent: "commercial", coverage: "published", priority: "P0", difficulty: "low", targetPath: "/kids#tarifs", entities: ["essai gratuit en septembre", "offre Kids"] }),
      topic({ id: "parents-frequency", label: "Fréquence d’entraînement", cluster: "parents", parentId: "parents", intent: "informational", coverage: "published", priority: "P1", difficulty: "low", targetPath: "/kids#faq", entities: ["régularité", "récupération"] }),
      topic({ id: "parents-girls", label: "Les filles peuvent-elles pratiquer ?", cluster: "parents", parentId: "parents", intent: "informational", coverage: "published", priority: "P1", difficulty: "low", targetPath: "/kids#faq", entities: ["filles", "inclusion"] }),
      topic({ id: "parents-shy", label: "Enfants timides", cluster: "parents", parentId: "parents", intent: "informational", coverage: "published", priority: "P1", difficulty: "low", targetPath: "/kids#faq", entities: ["timidité", "progression adaptée"] }),
      topic({ id: "parents-safety", label: "Questions de sécurité", cluster: "parents", parentId: "parents", intent: "local", coverage: "published", priority: "P0", difficulty: "medium", targetPath: "/kids#faq", entities: ["sécurité", "supervision", "contact contrôlé"] }),
    ],
  },
];

export const transverseTopics: SemanticTopic[] = [
  topic({ id: "beginners-first-class", label: "Premier cours adulte", cluster: "beginners", parentId: "beginners", intent: "local", coverage: "published", priority: "P0", difficulty: "medium", targetPath: "/academy/bien-debuter/premier-cours-jiu-jitsu-bresilien", entities: ["premier cours", "JJB débutant"] }),
  topic({ id: "beginners-after-40", label: "Commencer après 40 ans", cluster: "beginners", parentId: "beginners", intent: "informational", coverage: "planned", priority: "P1", difficulty: "medium", targetPath: "/academy/bien-debuter/commencer-arts-martiaux-apres-40-ans", entities: ["débutant adulte", "récupération"] }),
  topic({ id: "equipment-overview", label: "Guide équipement multi-disciplines", cluster: "equipment", parentId: "equipment", intent: "commercial", coverage: "planned", priority: "P0", difficulty: "medium", targetPath: "/academy/bien-debuter/equipement-premier-cours", entities: ["kimono", "rashguard", "gants", "protections"] }),
  topic({ id: "competition-overview", label: "Choisir et préparer une compétition", cluster: "competition", parentId: "competition", intent: "informational", coverage: "missing", priority: "P2", difficulty: "high", entities: ["JJB", "Grappling", "MMA", "compétition"] }),
  topic({ id: "health-recovery", label: "Récupération et fréquence", cluster: "health", parentId: "health", intent: "informational", coverage: "planned", priority: "P1", difficulty: "high", targetPath: "/academy/bien-debuter/frequence-entrainement", entities: ["récupération", "fréquence", "charge"] , evidence: "Relecture professionnelle requise pour toute recommandation de santé."}),
  topic({ id: "health-injury", label: "Prévention et reprise après blessure", cluster: "health", parentId: "health", intent: "informational", coverage: "missing", priority: "P2", difficulty: "high", entities: ["prévention", "blessure", "reprise"], evidence: "Validation médicale et absence de conseil personnalisé requises." }),
  topic({ id: "lifestyle-community", label: "Communauté Strongbear", cluster: "lifestyle", parentId: "lifestyle", intent: "navigational", coverage: "planned", priority: "P1", difficulty: "medium", targetPath: "/academy/vie-strongbear/communaute-strongbear", entities: ["communauté", "respect", "progression"] }),
  topic({ id: "lifestyle-events", label: "Événements et séminaires", cluster: "lifestyle", parentId: "lifestyle", intent: "local", coverage: "evidence-blocked", priority: "P1", difficulty: "medium", targetPath: "/academy/vie-strongbear/evenements-strongbear", entities: ["événement", "séminaire", "Marines"], evidence: "Dates, intervenants et images réelles requis." }),
];

export const allSemanticTopics = [...topicalClusters.flatMap((cluster) => cluster.topics), ...transverseTopics];
