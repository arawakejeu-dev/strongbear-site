export type LocalTerritory = {
  name: string;
  type: "primary" | "territory" | "access-corridor" | "extended-catchment";
  evidenceUrl: string;
  pagePolicy: "entity-only" | "dedicated-if-evidence";
  note: string;
};

export const localTerritories: LocalTerritory[] = [
  { name: "Marines", type: "primary", evidenceUrl: "https://www.insee.fr/fr/metadonnees/geographie/commune/95370-marines", pagePolicy: "entity-only", note: "Entité locale principale : adresse, cours et coordonnées doivent rester cohérents partout." },
  { name: "Vexin français", type: "territory", evidenceUrl: "https://www.marines.fr/", pagePolicy: "entity-only", note: "Territoire éditorial principal, à utiliser naturellement dans les pages piliers." },
  { name: "Val-d’Oise", type: "territory", evidenceUrl: "https://www.insee.fr/fr/metadonnees/geographie/commune/95370-marines", pagePolicy: "entity-only", note: "Département, utile pour la désambiguïsation et les données structurées." },
  { name: "Chars", type: "access-corridor", evidenceUrl: "https://www.marines.fr/acces-et-transports/", pagePolicy: "dedicated-if-evidence", note: "Corridor de transport documenté ; ne créer une page que si l’accès réel apporte une information unique." },
  { name: "Us", type: "access-corridor", evidenceUrl: "https://www.marines.fr/acces-et-transports/", pagePolicy: "dedicated-if-evidence", note: "Mention utile dans un guide d’accès, pas dans une page satellite générique." },
  { name: "Cergy-Pontoise", type: "extended-catchment", evidenceUrl: "https://www.marines.fr/wp-content/uploads/2025/05/MARINES-PLAN-2025-web.pdf", pagePolicy: "dedicated-if-evidence", note: "Zone élargie à confirmer avec les données réelles de provenance des membres." },
  { name: "Osny", type: "extended-catchment", evidenceUrl: "https://www.marines.fr/wp-content/uploads/2025/05/MARINES-PLAN-2025-web.pdf", pagePolicy: "dedicated-if-evidence", note: "Ne cibler que si les trajets et la demande réelle justifient une réponse distincte." },
  { name: "Gisors", type: "extended-catchment", evidenceUrl: "https://www.marines.fr/wp-content/uploads/2025/05/MARINES-PLAN-2025-web.pdf", pagePolicy: "dedicated-if-evidence", note: "Bassin étendu, à valider par Search Console et données d’inscription Fighty." },
];

export const localSeoRules = [
  "Une page locale doit répondre à un besoin local distinct : accès, horaires, offre ou événement réel.",
  "Aucune page ‘discipline + village’ ne doit être générée automatiquement.",
  "Marines, Vexin et Val-d’Oise sont les entités stables ; les autres zones sont des hypothèses de bassin à valider.",
  "Les noms, adresses, coordonnées et horaires doivent être identiques sur le site, Fighty et les profils locaux.",
  "Search Console, Fighty et les questions reçues déterminent l’expansion géographique, jamais une liste exhaustive de communes.",
];

export const localContentFrameworks = [
  { id: "access", label: "Venir à Strongbear", requiredEvidence: ["adresse exacte", "stationnement", "transports à jour", "temps de trajet vérifié"] },
  { id: "local-beginner", label: "Débuter les arts martiaux dans le Vexin", requiredEvidence: ["offre réelle", "planning Fighty", "photos de l’académie", "questions locales"] },
  { id: "local-kids", label: "Arts martiaux pour enfants à Marines", requiredEvidence: ["groupes d’âge", "pédagogie", "tarifs", "consentements photos"] },
  { id: "events", label: "Événements martiaux dans le Vexin", requiredEvidence: ["date", "lieu", "organisateur", "inscription", "annulation"] },
];
