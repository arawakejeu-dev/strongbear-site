# Checklist de lancement Strongbear

Ne cocher un élément que sur la version réellement destinée au public.

## Médias P0

- [ ] Hero vidéo authentique validé, 20 à 30 secondes.
- [ ] Image de secours du hero authentique et cohérente avec la première image vidéo.
- [ ] Photo « Pourquoi Strongbear » remplacée.
- [ ] Photo réelle de l’équipe enseignante reçue et autorisée.
- [ ] Aperçu Kids de l’accueil remplacé.
- [ ] Hero JJB reçu.
- [ ] Hero Grappling reçu.
- [ ] Hero MMA reçu.
- [ ] Hero Kids reçu, sans illustration provisoire.
- [ ] Photos techniques P0 des quatre offres reçues.
- [ ] `pnpm run media:audit` renvoie `launchReady: true`.

## Droits et authenticité

- [ ] Autorisation écrite pour chaque adulte identifiable.
- [ ] Autorisation du représentant légal pour chaque mineur identifiable.
- [ ] Registre des consentements relié aux noms de fichiers.
- [ ] Aucun stock générique, aucun média sans provenance, aucun résultat de compétition non vérifié.
- [ ] Aucun nom complet de mineur dans les métadonnées publiques.

## Qualité visuelle

- [ ] Points focaux corrects sur mobile, tablette et desktop.
- [ ] Aucun visage caché par un titre ou un CTA.
- [ ] Aucun kimono blanc brûlé ni noir sans détail.
- [ ] Colorimétrie cohérente entre les disciplines.
- [ ] Kids reste lumineux, rassurant et non agressif.
- [ ] Les illustrations d’ours restent limitées à Kids, Academy, conseils et campagnes.

## Vidéo

- [ ] Lecture automatique silencieuse et inline sur mobile.
- [ ] Poster affiché immédiatement avant la vidéo.
- [ ] MP4 et WebM présents pour desktop, tablette et mobile.
- [ ] Aucun saut de mise en page au démarrage.
- [ ] Durée, poids et rythme vérifiés sur connexion mobile.
- [ ] La page reste complète si la vidéo est désactivée.

## Contenu et conversion

- [ ] Tous les textes correspondent à l’offre réelle et aux créneaux actuels.
- [ ] Tous les CTA Fighty pointent vers la bonne académie et la bonne offre.
- [ ] Le parcours Kids ne mentionne pas de MMA.
- [ ] Planning, tarifs, essai gratuit et conditions sont cohérents avec Fighty.
- [ ] Coordonnées, adresse et horaires sont exacts.
- [ ] Aucun témoignage, coach, résultat ou événement n’est inventé.

## SEO et accessibilité

- [ ] Alt text décrit l’image dans son contexte sans bourrage de mots-clés.
- [ ] Légendes et titres d’image sont exacts.
- [ ] Images authentiques autorisées pour ImageObject lorsque pertinent.
- [ ] Open Graph remplacé par une carte de lancement à jour.
- [ ] Canonicals, sitemap, robots et données structurées validés.
- [ ] Navigation clavier, focus, titres et contrastes revérifiés.
- [ ] Aucun média informatif sans alternative textuelle.
- [ ] Vidéo non indispensable à la compréhension de la proposition de valeur.

## Performance et sécurité

- [ ] Variantes AVIF et WebP générées pour chaque image active.
- [ ] Une seule image prioritaire au-dessus de la ligne de flottaison.
- [ ] Toutes les images hors écran sont en lazy loading.
- [ ] Lighthouse mobile et desktop exécuté sur l’URL publique.
- [ ] Core Web Vitals vérifiés après collecte de données terrain.
- [ ] CSP et headers de sécurité toujours présents.
- [ ] GA4, GTM ou Meta ne se chargent qu’après consentement.

## Conformité et publication

- [ ] Mentions légales publiées à partir des informations réelles.
- [ ] Politique de confidentialité publiée et reliée au consentement analytics.
- [ ] Responsable interne nommé pour retirer rapidement un média.
- [ ] Sauvegarde des masters, exports et autorisations effectuée.
- [ ] Dernier build, tests, lint et audit qualité réussis.
- [ ] Validation finale par Strongbear avant ouverture publique.
