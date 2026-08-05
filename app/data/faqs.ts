export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQCategory =
  | "general"
  | "bjj"
  | "grappling"
  | "mma"
  | "kids"
  | "pricing"
  | "fighty";

export const generalFAQ: FAQItem[] = [
  { question: "Puis-je commencer sans expérience ?", answer: "Oui. Les débutants sont accueillis avec des consignes simples, un partenaire adapté et une progression guidée. Signalez simplement qu’il s’agit de votre premier cours lors de la réservation." },
  { question: "Dois-je être en bonne condition physique ?", answer: "Non. La condition se construit avec une pratique régulière. Vous pouvez adapter l’intensité, faire une pause et prévenir le coach de toute contrainte avant le cours." },
  { question: "Que faut-il apporter pour un cours d’essai ?", answer: "Une tenue de sport propre, près du corps et sans fermeture métallique, une gourde et des sandales pour circuler hors du tatami. L’équipement précis est confirmé sur Fighty." },
  { question: "Comment se déroule mon arrivée ?", answer: "Réservez sur Fighty, arrivez quelques minutes en avance et présentez-vous au coach. L’équipe vous explique les règles, vous montre l’espace et vous accompagne pendant la séance." },
  { question: "Puis-je pratiquer uniquement pour le loisir ?", answer: "Bien sûr. La compétition est une possibilité, jamais une obligation. Le cadre permet de progresser pour le plaisir, la forme ou un objectif sportif." },
  { question: "Les femmes peuvent-elles rejoindre les cours ?", answer: "Oui. Les cours accueillent les pratiquantes et pratiquants dans le même cadre de respect, d’adaptation et de sécurité." },
  { question: "Où se trouve l’académie ?", answer: "Strongbear est située à Marines, dans le Val-d’Oise, au cœur du Vexin. Les informations d’accès à jour sont indiquées sur Fighty." },
  { question: "Comment réserver un essai ?", answer: "Toutes les réservations passent par Fighty. Le site Strongbear informe et vous prépare ; Fighty affiche les disponibilités et enregistre votre demande." },
];

export const bjjFAQ: FAQItem[] = [
  { question: "Qu’est-ce que le Jiu-Jitsu Brésilien ?", answer: "Le Jiu-Jitsu Brésilien est un art martial centré sur le contrôle, les positions et les soumissions, principalement au sol. Il privilégie la technique, le placement et la prise de décision." },
  { question: "Faut-il déjà savoir combattre ?", answer: "Non. Les bases sont expliquées progressivement : sécurité, déplacements, positions, contrôles puis techniques adaptées au niveau du groupe." },
  { question: "Le kimono est-il obligatoire ?", answer: "Il dépend du créneau. Pour un premier essai, consultez les indications du cours sur Fighty ou demandez confirmation à l’équipe." },
  { question: "Le JJB est-il adapté aux personnes plus légères ?", answer: "Oui. Le placement et les leviers permettent de travailler sans dépendre uniquement de la force. Les partenaires et l’intensité doivent néanmoins toujours être adaptés." },
  { question: "Y a-t-il du combat dès le premier cours ?", answer: "Le coach décide selon le cours et votre aisance. Une première séance peut se limiter aux explications et exercices techniques ; rien ne doit être imposé." },
  { question: "Comment éviter les blessures ?", answer: "Respectez les consignes, contrôlez vos mouvements, choisissez une intensité adaptée et signalez immédiatement une gêne. En JJB, apprendre à abandonner tôt fait partie de la sécurité." },
  { question: "À quelle fréquence pratiquer ?", answer: "Une séance régulière est déjà utile. Deux ou trois séances hebdomadaires accélèrent généralement l’apprentissage, selon votre récupération et vos objectifs." },
  { question: "Puis-je compléter avec le Grappling ou le MMA ?", answer: "Oui. L’abonnement adulte Strongbear donne accès au JJB, au Grappling et au MMA, ce qui permet de construire un parcours complémentaire." },
];

export const grapplingFAQ: FAQItem[] = [
  { question: "Quelle différence entre Grappling et JJB ?", answer: "Le Grappling se pratique sans kimono et met davantage l’accent sur les contrôles et saisies sans tissu. Le JJB avec kimono ajoute d’autres prises et rythmes tactiques." },
  { question: "Le Grappling est-il accessible aux débutants ?", answer: "Oui. Les fondamentaux de posture, déplacement, contrôle et sécurité sont enseignés avant d’augmenter l’intensité." },
  { question: "Quelle tenue porter ?", answer: "Une tenue technique propre, près du corps, sans poche ni fermeture métallique est généralement adaptée. Vérifiez les consignes du créneau sur Fighty." },
  { question: "Faut-il être très souple ?", answer: "Non. La mobilité se développe progressivement et les techniques peuvent être adaptées à votre morphologie." },
  { question: "Le cours comprend-il des combats ?", answer: "Les exercices d’opposition font partie de la progression, mais leur forme et leur intensité dépendent du niveau et des consignes du coach." },
  { question: "Est-ce utile pour la compétition ?", answer: "Oui, pour celles et ceux qui le souhaitent. Le Grappling développe le contrôle, les transitions et la prise de décision sous contrainte." },
  { question: "Puis-je pratiquer sans objectif compétitif ?", answer: "Oui. Vous pouvez pratiquer pour apprendre, entretenir votre condition physique et partager un entraînement collectif." },
  { question: "Le Grappling est-il inclus dans l’abonnement adulte ?", answer: "Oui. L’offre adulte Strongbear réunit JJB, Grappling et MMA dans un seul abonnement." },
];

export const mmaFAQ: FAQItem[] = [
  { question: "Le MMA Strongbear est-il adapté aux débutants ?", answer: "Oui. L’apprentissage commence par les postures, déplacements et enchaînements fondamentaux, avec une intensité contrôlée." },
  { question: "Vais-je recevoir des coups pendant l’essai ?", answer: "Les exercices sont encadrés et l’intensité est adaptée. Un premier cours n’implique pas de contact dur ni de combat libre imposé." },
  { question: "Quel équipement faut-il ?", answer: "La tenue et les protections dépendent du contenu du cours. Consultez la fiche Fighty avant de venir ; l’équipe peut vous guider pour un premier essai." },
  { question: "Dois-je connaître le JJB ou la boxe ?", answer: "Non. Une expérience préalable peut aider, mais elle n’est pas nécessaire pour rejoindre un cours débutant." },
  { question: "Comment la sécurité est-elle gérée ?", answer: "Par des consignes claires, des exercices progressifs, des partenaires adaptés, des protections lorsque nécessaires et une intensité décidée par le coach." },
  { question: "Le MMA est-il réservé aux compétiteurs ?", answer: "Non. Il peut être pratiqué pour apprendre une discipline complète, développer sa condition et progresser sans objectif de compétition." },
  { question: "Puis-je ne suivre que le MMA ?", answer: "Oui, tout en conservant avec l’abonnement adulte la possibilité de découvrir le JJB et le Grappling." },
  { question: "Les enfants suivent-ils des cours de MMA ?", answer: "Non. L’offre Kids est indépendante et se concentre sur des fondamentaux de Jiu-Jitsu Brésilien et de Grappling adaptés aux enfants." },
];

export const kidsFAQ: FAQItem[] = [
  { question: "Mon enfant peut-il commencer sans aucune expérience ?", answer: "Oui. Le programme est conçu pour accueillir les débutants. Le coach explique les règles, les positions et les exercices progressivement." },
  { question: "Quel équipement faut-il pour le premier cours ?", answer: "Une tenue de sport confortable et une gourde suffisent pour l’essai. L’équipe vous indiquera ensuite l’équipement adapté au groupe de votre enfant." },
  { question: "Les enfants timides peuvent-ils participer ?", answer: "Oui. Ils peuvent d’abord observer, avancer à leur rythme et être associés à un partenaire rassurant. La participation n’est jamais forcée." },
  { question: "Les filles peuvent-elles pratiquer ?", answer: "Bien sûr. Le programme accueille les filles et les garçons dans le même cadre de respect, de progression et de sécurité." },
  { question: "Combien de fois par semaine faut-il venir ?", answer: "La régularité compte davantage que la fréquence. Un cours hebdomadaire permet déjà de construire de bons repères ; Fighty présente les créneaux disponibles." },
  { question: "Comment la sécurité est-elle assurée ?", answer: "Les exercices sont adaptés à l’âge, les contacts sont contrôlés et le coach supervise les binômes. Aucune intimidation ni recherche de puissance n’est encouragée." },
  { question: "Comment choisissez-vous les groupes d’âge ?", answer: "L’âge sert de premier repère. Le coach tient aussi compte de la maturité, de l’aisance et des besoins de chaque enfant." },
  { question: "Puis-je assister au premier cours ?", answer: "Les modalités d’observation dépendent de l’organisation du créneau. Indiquez votre besoin lors de la réservation afin que l’équipe prépare le meilleur accueil." },
  { question: "La compétition est-elle obligatoire ?", answer: "Non. La priorité est l’apprentissage, la confiance et le plaisir de progresser. La compétition reste une possibilité, jamais une obligation." },
  { question: "Comment réserver et inscrire mon enfant ?", answer: "Le site informe uniquement. L’essai, les disponibilités et toute inscription sont gérés sur Fighty. Strongbear accueille ensuite votre enfant au club." },
];

export const pricingFAQ: FAQItem[] = [
  { question: "L’essai est-il gratuit ?", answer: "Oui, le premier essai annoncé par Strongbear est gratuit. Réservez-le sur Fighty pour connaître le créneau disponible et les conditions à jour." },
  { question: "L’abonnement adulte couvre-t-il les trois disciplines ?", answer: "Oui. L’offre adulte donne un accès au Jiu-Jitsu Brésilien, au Grappling et au MMA avec un seul abonnement." },
  { question: "L’offre Kids est-elle incluse dans l’abonnement adulte ?", answer: "Non. Le programme Kids dispose d’une offre séparée et d’une communication dédiée aux parents." },
  { question: "Les tarifs affichés sur le site font-ils foi ?", answer: "Les conditions finales, disponibilités et éventuelles mises à jour sont celles affichées sur Fighty au moment de la réservation." },
  { question: "Le site accepte-t-il les paiements ?", answer: "Non. Le site Strongbear ne gère ni paiement, ni adhésion, ni inscription. Ces étapes passent exclusivement par Fighty." },
  { question: "Puis-je choisir une seule discipline ?", answer: "Vous pouvez concentrer votre pratique sur une discipline, mais l’offre adulte Strongbear reste conçue comme un abonnement unique donnant accès aux trois." },
  { question: "Puis-je annuler ou modifier une réservation ?", answer: "Consultez votre réservation et les conditions applicables directement dans Fighty. Strongbear ne modifie pas les réservations depuis ce site." },
];

export const fightyFAQ: FAQItem[] = [
  { question: "Pourquoi la réservation se fait-elle sur Fighty ?", answer: "Fighty centralise les créneaux, disponibilités, réservations et adhésions. Le site Strongbear reste volontairement concentré sur l’information et la préparation de votre venue." },
  { question: "Dois-je créer un compte ?", answer: "Fighty vous indique les informations nécessaires pendant le parcours de réservation. Strongbear ne collecte pas vos identifiants Fighty." },
  { question: "Comment choisir le bon cours ?", answer: "Sélectionnez la discipline ou le groupe d’âge qui correspond à votre situation. En cas de doute, choisissez un créneau débutant ou contactez l’équipe avant de réserver." },
  { question: "Ma réservation est-elle confirmée par Strongbear ?", answer: "La confirmation et le statut de la réservation sont gérés par Fighty. Conservez le message de confirmation reçu après votre demande." },
  { question: "Puis-je venir sans réservation ?", answer: "La réservation est recommandée pour vérifier la disponibilité et permettre à l’équipe de préparer votre accueil." },
  { question: "Que se passe-t-il après la réservation ?", answer: "Venez quelques minutes en avance avec la tenue indiquée. Présentez-vous au coach, qui vous guidera pendant toute la première séance." },
  { question: "L’adhésion est-elle automatique après l’essai ?", answer: "Non. L’essai vous permet de découvrir l’académie. Vous choisissez ensuite librement de poursuivre et effectuez toute adhésion sur Fighty." },
  { question: "Strongbear conserve-t-elle mes données de paiement ?", answer: "Non. Le site Strongbear ne traite pas de paiement. Consultez la politique de Fighty pour comprendre le traitement des données dans son service." },
];

export const faqLibrary: Record<FAQCategory, FAQItem[]> = {
  general: generalFAQ,
  bjj: bjjFAQ,
  grappling: grapplingFAQ,
  mma: mmaFAQ,
  kids: kidsFAQ,
  pricing: pricingFAQ,
  fighty: fightyFAQ,
};
