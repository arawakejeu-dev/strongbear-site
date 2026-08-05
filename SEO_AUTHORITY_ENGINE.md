# Strongbear SEO Authority Engine

Le moteur SEO est une couche de données et de validation, pas une collection de pages artificielles.

## Sources de vérité

- `app/seo/topical-map.ts` : hiérarchie, clusters, intentions, priorité, difficulté et statut.
- `app/seo/internal-links.ts` : graphe de liens et score de maillage.
- `app/seo/schema.ts` : générateurs JSON-LD avec garde-fous de preuve.
- `app/seo/images.ts` : registre d’images, variantes et authenticité.
- `app/seo/local-seo.ts` : territoires et règles anti-doorway.
- `app/seo/content-authority.ts` : contrat éditorial et modèle EEAT.
- `app/seo/performance.ts` : budgets Core Web Vitals.
- `app/seo/authority-dashboard.ts` : matrice d’autorité calculée.
- `app/seo/validate.ts` : validation globale appelée par le sitemap.

## Règle de publication

Un sujet passe de `planned` à `published` seulement lorsque son URL existe, que le contenu répond au contrat d’autorité, que les liens obligatoires sont présents et que les preuves sensibles ont été vérifiées. Les entrées `evidence-blocked` ne doivent jamais être publiées à partir d’hypothèses.

## Export

```bash
tsx scripts/export-seo-authority.mts ../seo-authority-system
```

L’export génère les formats CSV et JSON destinés au pilotage éditorial.
