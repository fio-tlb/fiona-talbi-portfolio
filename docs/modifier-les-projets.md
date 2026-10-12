# Modifier un projet

Chaque projet possède son fichier français dans `src/data/projects/` et sa traduction dans `src/data/projects/en/`. Mettre à jour les deux langues après un changement de texte ; les photos et chiffres restent partagés (voir [Langues et documents](langues-et-documents.md)).

Fichiers français :

| Projet                            | Fichier                            |
| --------------------------------- | ---------------------------------- |
| Logitech — Category Management    | `logitech-category-management.ts`  |
| Logitech — Trade Marketing        | `logitech-trade-marketing.ts`      |
| CosmétiCar — Réseaux sociaux      | `cosmeticar-social-media.ts`       |
| Massilia — Relations influenceurs | `massilia-influencer-relations.ts` |

## Textes et chiffres

Modifier directement `title`, `context`, `mission`, `details` et `metrics` dans le fichier du projet. `story` accepte des parties `{ heading, paragraphs }` pour un récit plus détaillé. Garder `id` stable : il sert d’adresse, d’ancre et de destination aux chiffres clés.

L’ordre dans `src/data/projects/index.ts` détermine les cartes de l’accueil et les projets précédent/suivant. Ajouter un projet à cette liste crée automatiquement sa page lors du build Pages.

## Remplacer ou ajouter une photo

1. Placer le fichier dans `public/images/projets/<id>/`. Utiliser un nouveau nom pour une nouvelle version évite les anciens aperçus en cache.
2. Modifier `gallery` dans le fichier du projet. Une seule image JPEG, PNG, WebP ou AVIF suffit : aucune variante supplémentaire n’est imposée.
3. Renseigner les dimensions réelles, un texte alternatif descriptif et une légende. La première image devient automatiquement la couverture de l’accueil, de la page projet et de son aperçu de partage.

Exemple d’une image seule, à adapter au fichier réellement ajouté :

```ts
gallery: [
  {
    src: "images/projets/logitech-category-management/rayon-v2.jpg",
    width: 1600,
    height: 1000,
    alt: "Le rayon informatique après son réagencement",
    caption: "Le nouvel agencement du rayon.",
  },
],
```

Les couvertures et miniatures recadrent la photo ; l’agrandissement affiche l’image entière. Les dimensions réservent la place avant le téléchargement. Les images sous le premier écran sont chargées à l’approche du viewport ; la couverture d’une page projet est prioritaire.

### Variantes pour alléger les téléchargements

Pour une grande photo, générer des versions de 800 et 1600 px en JPEG et AVIF, puis utiliser `jpegWithAvif` de `src/data/media.ts` :

```ts
import { jpegWithAvif } from "../media";

// Les quatre fichiers doivent exister dans public/.
const photo = {
  ...jpegWithAvif(
    "images/projets/logitech-category-management/rayon-v2.jpg",
    1600,
    1000,
    [800, 1600],
  ),
  alt: "Le rayon informatique après son réagencement",
  caption: "Le nouvel agencement du rayon.",
};
```

Le helper décrit `rayon-v2.jpg`, `rayon-v2-800.jpg`, `rayon-v2.avif` et `rayon-v2-800.avif` ; il ne crée pas ces fichiers. `projectPhoto` décrit les illustrations existantes en 1600 × 1000. Pour d’autres noms ou formats, `sources` et `srcSet` sont facultatifs et configurables directement (types dans `src/data/types.ts`).

Le portrait se configure de la même façon dans `profile.portrait` de `src/data/portfolio.ts`. Les noms des entreprises et leurs logos restent dans `brands`.

## Vérification

`bun run test` vérifie notamment les fichiers et variantes déclarés. Ensuite : lint, TypeScript, build normal et build Pages, puis contrôler l’accueil et la page projet sur mobile. Un push sur `main` publie automatiquement sur GitHub Pages.
