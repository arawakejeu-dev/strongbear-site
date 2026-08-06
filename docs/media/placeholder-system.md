# Système de remplacement des médias

## Principe

Chaque emplacement possède un identifiant stable, par exemple `home.hero-backup` ou `kids.coach-interaction`. Le design référence cet identifiant, jamais une photo « au hasard ». Le manifeste décrit l’objectif, le cadrage, la résolution, le point focal, les formats, la priorité et l’autorisation attendue.

Les cinq images actuellement visibles sont marquées `temporary-active`. Elles restent exclues des données structurées ImageObject et portent dans le DOM leur identifiant, leur priorité et leur statut. Cela permet de les retrouver sans inspection visuelle.

## Remplacer une image active

1. Exporter le fichier maître avec le nom indiqué dans `expectedSourceFile`.
2. Le déposer dans `assets/source` en remplaçant le fichier temporaire correspondant.
3. Vérifier que le point focal respecte le cadrage prévu.
4. Passer le statut du slot à `verified-academy` et son authenticité à `verified-academy` dans le manifeste.
5. Lancer `pnpm run media:all`.
6. Contrôler le site puis lancer `pnpm test` et `pnpm run lint`.

Aucun composant React ni fichier CSS ne doit être modifié pour ces cinq remplacements.

## Ajouter un futur emplacement

1. Utiliser l’identifiant et le nom de fichier déjà prévus dans l’inventaire.
2. Déposer le maître dans `assets/source`.
3. Lors de l’intégration de la section ou de la page, ajouter `activeSource`, `outputBase` et les largeurs de sortie au slot.
4. Utiliser `OptimizedImage` avec cet `activeSource`.
5. Relancer le pipeline média.

## Variantes générées

Pour chaque image active, le pipeline crée :

- 320 px : miniature et petits mobiles.
- 640 px : mobile.
- 1024 px : tablette.
- 1536, 1600 ou 2400 px selon le rôle : desktop et écrans haute densité.
- Une version WebP et une version AVIF pour chaque largeur.
- Un placeholder flouté intégré dans le HTML.
- Les dimensions intrinsèques, `srcset`, `sizes`, lazy loading et décodage asynchrone.

Les images LCP sont explicitement marquées `eager` ; toutes les autres restent en lazy loading.

## Vidéo

Déposer `home-hero-video-master.mp4` dans `assets/source`, puis lancer `pnpm run media:all`. Le pipeline utilise FFmpeg via la commande `ffmpeg` ou la variable `MEDIA_FFMPEG` et génère :

- Desktop : 1920 px, MP4 et WebM.
- Tablette : 1280 px, MP4 et WebM.
- Mobile : 960 px, MP4 et WebM.
- Poster WebP.

Sans master vidéo, le pipeline réussit et conserve automatiquement l’image de secours. Si un master est présent mais que FFmpeg manque, il s’arrête avec un message explicite afin d’éviter de publier un fichier non optimisé.

## Nommage des médias Academy

Les variables `{slug}` et `{category}` sont remplacées par le slug éditorial réel :

- `academy-premier-cours-jiu-jitsu-bresilien-hero.jpg`
- `academy-premier-cours-jiu-jitsu-bresilien-inline-01.jpg`
- `academy-jiu-jitsu-bresilien-cover.jpg`

Chaque image éditoriale doit avoir une légende factuelle, un texte alternatif propre au contexte et une source vérifiable.

## Statuts

- `awaiting-authentic` : emplacement défini, média réel absent.
- `temporary-active` : placeholder visible dans le site, lancement interdit.
- `verified-academy` : contenu Strongbear authentique, autorisé, validé et optimisé.

Le contrôle média renvoie `launchReady: true` uniquement lorsque tous les P0 sont vérifiés et qu’aucun média temporaire ne reste actif.
