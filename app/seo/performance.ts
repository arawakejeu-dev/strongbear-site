export const coreWebVitalsTargets = {
  lcp: { good: 2500, unit: "ms", strategy: ["L’image LCP utilise WebP, srcset, tailles explicites et fetchPriority high.", "La police Geist est auto-hébergée et préchargée par le framework.", "Aucun script tiers ne bloque le premier rendu."] },
  inp: { good: 200, unit: "ms", strategy: ["Navigation et accordéons reposent sur HTML natif.", "Les pages Academy sont rendues côté serveur.", "Les intégrations Reviews, Video et Newsletter restent chargées à la demande."] },
  cls: { good: .1, unit: "score", strategy: ["Toutes les images possèdent largeur et hauteur intrinsèques.", "Les composants réservent leur espace avant chargement.", "Aucune bannière dynamique n’est injectée au-dessus du contenu."] },
};

export const performanceSeoRules = [
  "Conserver les composants serveur par défaut ; ajouter un composant client uniquement pour une interaction impossible en HTML.",
  "Découper les futures intégrations Video, Podcast, Reviews et Newsletter par route et import dynamique.",
  "Préconnecter uniquement un domaine réellement utilisé dans le premier viewport.",
  "Ne jamais précharger une image masquée ou située sous la ligne de flottaison.",
  "Mesurer les Core Web Vitals sur données terrain avant d’ajouter une optimisation spéculative.",
];
