# Strongbear BJJ & Grappling

Site public de Strongbear BJJ & Grappling à Marines, Val-d’Oise.

## Production Hostinger

Le site est un projet Next.js exporté en fichiers statiques : aucun serveur Node.js n’est nécessaire en production.

```bash
pnpm install --frozen-lockfile
pnpm run lint
pnpm run build:hostinger
```

Le dossier généré est `out/`. Téléversez **uniquement son contenu** dans le dossier `public_html/` du domaine `strongbearbjj.com`.

Conservez le fichier `out/.htaccess` : il permet les URLs propres, la page 404 et les redirections 301 des anciennes URLs indexées.

Ne déployez pas le dossier source complet, `node_modules`, `.next` ou `dist` sur un hébergement mutualisé Hostinger.

## Déploiement Hostinger via GitHub

Le workflow `.github/workflows/deploy-hostinger.yml` construit le site statique et téléverse le contenu de `out/` par FTPS. Avant son premier lancement, ajoutez ces secrets dans **GitHub → Settings → Secrets and variables → Actions** :

- `HOSTINGER_FTP_SERVER`
- `HOSTINGER_FTP_USERNAME`
- `HOSTINGER_FTP_PASSWORD`
- `HOSTINGER_FTP_DIRECTORY` — par exemple `/domains/strongbearbjj.com/public_html/`

Ensuite, dans **GitHub → Actions → Deploy Strongbear to Hostinger**, cliquez sur **Run workflow**. Le projet ne nécessite ni commande de démarrage ni application Node.js chez Hostinger.

## Commandes utiles

- `pnpm run lint` : contrôle ESLint.
- `pnpm run build:hostinger` : build statique de production dans `out/`.
- `pnpm test` : contrôle du rendu du build serveur de développement.
