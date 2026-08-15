# Strongbear BJJ & Grappling

Site public de Strongbear BJJ & Grappling à Marines, Val-d’Oise.

## Production Hostinger via GitHub

Le déploiement GitHub/Hostinger utilise l’application Node.js Next.js standard. Il produit le dossier `.next/`, détecté automatiquement par Hostinger, et permet de conserver les redirections HTTP 301 côté serveur.

Dans Hostinger, gardez le répertoire racine `./`, Node.js 22 et les paramètres de compilation/démarrage par défaut. Les scripts utilisés sont :

- build : `pnpm run build` → `next build --webpack`
- start : `pnpm run start` → `next start`

Ne configurez pas `dist/standalone/` ni un dossier de sortie manuel : Hostinger reconnaît alors le format Next.js `.next/`.

## Export statique facultatif

Pour un téléversement FTP manuel uniquement, la commande ci-dessous génère `out/` et son fichier `.htaccess` :

```bash
pnpm run build:hostinger
```

Ce mode n’est pas utilisé par le déploiement GitHub/Node.js Hostinger.

## Commandes utiles

- `pnpm run lint` : contrôle ESLint.
- `pnpm run build:hostinger` : build statique de production dans `out/`.
- `pnpm test` : contrôle du rendu Vinext historique.
- `pnpm run test:hostinger` : vérifie le build Next.js et les redirections 301 côté serveur.
