# Checklist de lancement

## Produit et contenu

- [x] Typographie, espacements, couleurs, rayons, bordures et ombres utilisent les tokens partagés.
- [x] Hiérarchie CTA primaire, secondaire et flottante cohérente.
- [x] Le parcours Kids reste séparé et ne communique pas sur le MMA.
- [x] Le vocabulaire interne de production a été retiré des contenus publics principaux.
- [x] La newsletter ne s’affiche que lorsqu’une destination réelle est configurée.
- [ ] Planning, tarifs, lieux et coordonnées validés par Strongbear.
- [ ] Relecture juridique et bon à publier.

## Médias

- [ ] 15 médias P0 remplacés par des médias Strongbear authentiques.
- [ ] 47 emplacements média classés `verified-academy` ou retirés du lancement.
- [ ] Hero vidéo 20–30 secondes livré avec MP4, WebM, poster et version mobile.
- [ ] Droits adultes et autorisations parentales archivés.
- [ ] Focal points validés sur 375, 768, 1024, 1440 et 1920 px.
- [ ] Open Graph final remplacé par une image Strongbear authentique.

## Conversion

- [x] Tous les CTA Fighty utilisent un composant commun.
- [x] Les CTA décrivent l’action suivante.
- [x] Le clic `fighty_click` est prêt pour GTM/GA4/Meta après consentement.
- [x] Le parcours Fighty explique Réserver, Venir, S’entraîner et Rejoindre.
- [ ] URL Fighty exacte configurée et testée sur mobile et desktop.
- [ ] Planning et tarifs comparés à la destination Fighty.

## Navigation

- [x] Header, menu mobile, footer, fils d’Ariane et 404 audités.
- [x] Les disciplines mènent à des destinations distinctes.
- [x] Aucun lien interne cassé dans les dix routes auditées.
- [x] Aucun cul-de-sac : accueil, Academy, Kids, contact et Fighty restent accessibles.
- [x] Recherche différée jusqu’à un volume éditorial qui la justifie.

## SEO

- [x] Titres, descriptions, canonicals, Open Graph et Twitter Cards présents.
- [x] Sitemap XML, robots.txt, 404 noindex et redirections existantes validés.
- [x] Données structurées Organization, SportsActivityLocation, Breadcrumb, FAQ et Article prêtes.
- [x] Images avec alt, dimensions, AVIF/WebP et sources responsive.
- [ ] Search Console vérifiée et sitemap soumis.
- [ ] Adresses, horaires et liens Google Business confirmés.
- [ ] Données structurées finales testées sur l’URL publique.

## Accessibilité

- [x] Un seul `main` et un seul `h1` par page auditée.
- [x] Lien d’évitement, navigation clavier et focus visible.
- [x] Contrôles nommés, formulaires/accordéons natifs et ARIA limité au nécessaire.
- [x] Alternatives textuelles et dimensions des images présentes.
- [x] Animations réduites lorsque `prefers-reduced-motion` est actif.
- [ ] Test manuel VoiceOver sur l’URL publique finale.

## Performance et sécurité

- [x] Build, lint et tests réussis.
- [x] JavaScript client gzip sous le budget de 90 Ko : 85,36 Ko.
- [x] CSS gzip sous le budget de 20 Ko : 11,79 Ko.
- [x] Images responsive, AVIF/WebP, placeholders flous et dimensions fixes.
- [x] CSP, anti-sniffing, frame protection, referrer et permissions policies présents.
- [ ] Lighthouse mobile/desktop ≥95 sur l’URL publique finale.
- [ ] Core Web Vitals terrain validés après 28 jours de données.

## Analytics, conformité et exploitation

- [x] GTM préféré, GA4 direct en repli, Meta Pixel optionnel.
- [x] Aucun chargement analytics avant consentement.
- [ ] IDs de production configurés et événement `fighty_click` vérifié en DebugView.
- [ ] Politique de confidentialité et mentions légales publiées.
- [ ] Google Business Profile relié.
- [ ] Masters, exports, autorisations et dépôt Git sauvegardés.
- [ ] Rollback de la dernière version déployée testé.
