export type ComparisonRow = {
  subject: string;
  optionA: string;
  strongbear: string;
};

export type Comparison = {
  eyebrow: string;
  title: string;
  intro: string;
  optionALabel: string;
  optionBLabel: string;
  rows: ComparisonRow[];
  note: string;
};

export const traditionalVsStrongbear: Comparison = {
  eyebrow: "Choisir son environnement",
  title: "Arts martiaux traditionnels ou Strongbear ?",
  intro: "Deux approches structurées, avec des cultures et des parcours différents.",
  optionALabel: "Approche traditionnelle",
  optionBLabel: "Strongbear",
  rows: [
    { subject: "Parcours", optionA: "Souvent centré sur une discipline et ses codes propres.", strongbear: "Trois disciplines complémentaires dans l’offre adulte." },
    { subject: "Pédagogie", optionA: "Progression généralement guidée par un programme formel.", strongbear: "Progression technique expliquée par situations et objectifs." },
    { subject: "Culture", optionA: "Rituels et traditions peuvent occuper une place importante.", strongbear: "Respect, simplicité et culture d’équipe contemporaine." },
  ],
  note: "Le bon choix dépend de la discipline, du professeur et du cadre dans lequel vous avez envie de progresser.",
};

export const gymVsStrongbear: Comparison = {
  eyebrow: "Bouger avec un cadre",
  title: "Salle de sport ou Strongbear ?",
  intro: "Les deux peuvent améliorer la condition physique, mais l’expérience quotidienne n’est pas la même.",
  optionALabel: "Salle de sport",
  optionBLabel: "Strongbear",
  rows: [
    { subject: "Séance", optionA: "Souvent autonome, selon son propre programme.", strongbear: "Cours encadré avec un objectif technique partagé." },
    { subject: "Progression", optionA: "Mesurée par les charges, la durée ou les répétitions.", strongbear: "Visible dans les mouvements, décisions et situations maîtrisées." },
    { subject: "Collectif", optionA: "Possible, mais variable selon la pratique choisie.", strongbear: "Partenaires d’entraînement et apprentissage en équipe." },
  ],
  note: "Ces pratiques peuvent aussi être complémentaires : préparation physique d’un côté, apprentissage martial de l’autre.",
};

export const judoVsBjj: Comparison = {
  eyebrow: "Comprendre les disciplines",
  title: "Judo ou Jiu-Jitsu Brésilien ?",
  intro: "Deux arts proches par leur histoire, avec des règles et des priorités différentes.",
  optionALabel: "Judo",
  optionBLabel: "Jiu-Jitsu Brésilien",
  rows: [
    { subject: "Point fort", optionA: "Projections, déséquilibres et travail debout très développé.", strongbear: "Contrôle, transitions et soumissions prolongées au sol." },
    { subject: "Rythme", optionA: "Actions debout souvent explosives et décisions rapides.", strongbear: "Séquences au sol plus longues et résolution progressive des positions." },
    { subject: "Choix", optionA: "Idéal si les projections et la tradition du judo vous attirent.", strongbear: "Idéal si la stratégie au sol et les contrôles vous attirent." },
  ],
  note: "Aucune discipline n’est universellement supérieure. Le meilleur repère reste un cours d’essai dans un cadre qui vous convient.",
};

export const comparisonLibrary = {
  traditionalVsStrongbear,
  gymVsStrongbear,
  judoVsBjj,
};
