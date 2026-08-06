# Rapport accessibilité

## Résultat

Le harnais Strongbear obtient **100/100 sur 6 contrôles HTML** : langue française, landmark principal unique, H1 unique, lien d’évitement, alternatives d’image et 404 accessible.

## WCAG AA vérifié

- Structure sémantique avec header, nav, main, sections, footer et fils d’Ariane.
- Navigation clavier et focus visible cohérent sur liens, boutons, menus et accordéons.
- Menu mobile fondé sur `details/summary`, sans dépendance JavaScript.
- FAQ fondée sur des contrôles natifs.
- Libellés accessibles sur les CTA, liens externes, évaluations, navigation et vidéo.
- Alternatives textuelles, largeur et hauteur sur les images.
- Aucun média indispensable à la compréhension du contenu.
- Contraste sombre/clair conforme à la hiérarchie visuelle ; l’or reste décoratif ou associé à un texte lisible.
- `prefers-reduced-motion` neutralise les révélations, zooms et défilements animés.

## Validation manuelle finale

- Parcours complet VoiceOver/Safari : accueil, menu, Kids, Academy, FAQ et Fighty.
- Zoom navigateur 200 % et texte seul à 200 %.
- Contrôle à 320 px sans défilement horizontal.
- Test Windows High Contrast si l’audience le justifie.
- Vérification des nouveaux alt text après remplacement des médias.

Le score officiel Accessibility 100 doit être confirmé par Lighthouse sur l’URL publique ; il ne remplace pas le test lecteur d’écran.
