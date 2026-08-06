# Rapport performance

## Résultat

Le harnais d’ingénierie Strongbear obtient **100/100 sur 7 contrôles performance**. Le score officiel Lighthouse reste à produire sur l’URL publique finale ; aucune équivalence artificielle n’est revendiquée.

| Contrôle | Résultat |
| --- | --- |
| Sources AVIF et WebP | Conforme |
| Images responsive avec dimensions | Conforme |
| Placeholder flou | Conforme |
| Police locale préchargée | Conforme |
| Revalidation HTML après déploiement | Conforme |
| Budget JS gzip < 90 Ko | 85,36 Ko |
| Budget CSS gzip < 20 Ko | 11,79 Ko |

## Core Web Vitals

- **LCP :** image hero prioritaire, dimensions réservées, poster immédiat et police locale. Remplacer le média temporaire sans augmenter son poids ni modifier son ratio.
- **CLS :** dimensions explicites sur toutes les images, espace du hero réservé, `font-display: swap` et une seule police préchargée.
- **INP :** interface principalement serveur, navigation et accordéons natifs, JavaScript limité. Les scripts de mesure sont différés après consentement.
- **TTFB :** HTML revalidé à chaque navigation pour éviter tout décalage après publication ; médias et assets hachés conservés en cache longue durée.

## Derniers tests requis

1. Lighthouse mobile et desktop sur la version publique, en navigation privée et sans extension.
2. Test 4G du hero vidéo réel, poster compris.
3. WebPageTest depuis Paris avec cache froid puis chaud.
4. Surveillance Search Console/Core Web Vitals pendant 28 jours.
5. Budget à préserver : LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1 au 75e percentile.
