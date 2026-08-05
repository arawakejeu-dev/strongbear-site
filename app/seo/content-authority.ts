export const contentAuthorityQuestions = [
  { id: "what", label: "Qu’est-ce que c’est ?", required: true },
  { id: "why", label: "Pourquoi est-ce utile ou important ?", required: true },
  { id: "how", label: "Comment cela fonctionne-t-il ?", required: true },
  { id: "when", label: "Quand pratiquer, décider ou agir ?", required: true },
  { id: "who", label: "À qui cela s’adresse-t-il ?", required: true },
  { id: "cost", label: "Quel coût ou quel engagement prévoir ?", required: true },
  { id: "equipment", label: "Quel équipement faut-il ?", required: true },
  { id: "mistakes", label: "Quelles erreurs fréquentes éviter ?", required: true },
  { id: "faq", label: "Quelles objections restent après lecture ?", required: true },
  { id: "sources", label: "Quelles sources primaires soutiennent les faits ?", required: true },
  { id: "related", label: "Quelle est la prochaine lecture logique ?", required: true },
] as const;

export const eeatEvidenceModel = {
  experience: ["photos authentiques datées", "récits de cours", "retours de pratiquants sourcés", "reportages sur les événements"],
  expertise: ["coach identifié", "rôle pédagogique", "qualification vérifiable", "relecture nominative des contenus techniques"],
  authority: ["séminaires documentés", "résultats contextualisés", "citations de sources primaires", "maillage cohérent des clusters"],
  trust: ["adresse et offre cohérentes", "avis reliés à leur source", "dates de mise à jour", "corrections visibles", "aucune promesse absolue"],
};

export const futureAuthoritySurfaces = [
  { id: "video", label: "Video Academy", path: "/academy/video", status: "prepared", schema: "VideoObject", requirements: ["miniature", "date", "transcription", "chapitres", "vidéo hébergée"] },
  { id: "podcast", label: "Podcast", path: "/academy/podcast", status: "prepared", schema: "PodcastEpisode", requirements: ["flux", "transcription", "invité", "date", "audio"] },
  { id: "news", label: "Actualités", path: "/academy/actualites", status: "prepared", schema: "NewsArticle", requirements: ["événement daté", "auteur", "preuve locale"] },
  { id: "events", label: "Événements", path: "/academy/evenements", status: "prepared", schema: "Event", requirements: ["date", "lieu", "statut", "organisateur"] },
  { id: "competitions", label: "Compétitions", path: "/academy/competitions", status: "prepared", schema: "SportsEvent", requirements: ["règlement", "résultat", "participants", "source"] },
  { id: "downloads", label: "Téléchargements", path: "/academy/guides", status: "prepared", schema: "DigitalDocument", requirements: ["version", "auteur", "date", "page HTML canonique"] },
];
