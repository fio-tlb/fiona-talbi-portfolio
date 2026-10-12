# Langues et documents

## Fonctionnement

- Français : `/`. Anglais : `/en/`. Les quatre projets existent dans les deux langues ; leurs identifiants et leurs ancres restent stables.
- À la première visite, la langue du navigateur choisit français ou anglais. Si aucune langue prise en charge n’est trouvée, le français est utilisé.
- Le bouton FR/EN, près du logo, permet de choisir explicitement. Ce choix est conservé dans `localStorage["ft-language"]`. Le paramètre `?lang=fr` ou `?lang=en` protège aussi le choix quand le stockage est bloqué.
- Une adresse `/en/…` partagée s’ouvre en anglais. Le changement de langue conserve le projet, les paramètres et la rubrique de l’accueil.
- Les pages sont précompilées dans chaque langue : elles fonctionnent aussi sans JavaScript. La détection automatique nécessite JavaScript.

## Modifier les textes

| Contenu                                | Français                       | Anglais                        |
| -------------------------------------- | ------------------------------ | ------------------------------ |
| Profil, rubriques, navigation, boutons | `src/data/portfolio.ts`        | `src/data/en.ts`               |
| Un projet                              | `src/data/projects/<id>.ts`    | `src/data/projects/en/<id>.ts` |
| PDF proposés                           | `src/data/documents.ts` → `fr` | `src/data/documents.ts` → `en` |

Les textes anglais des projets réutilisent les fichiers image, dimensions et identifiants français. Leurs légendes sont associées au nom du fichier sans extension. Si vous renommez ou ajoutez une photo, adaptez cette clé dans la traduction anglaise. Ajouter un projet nécessite sa traduction anglaise ; le build signale une traduction manquante.

Pour ajouter une langue plus tard, compléter les données typées et les routes, puis adapter `src/i18n/locale.ts`, les alternatives SEO et la liste de précompilation dans `vite.config.ts`. Ne traduisez pas les noms d’entreprises, dates ou identifiants.

## Ajouter vos CV et lettres de motivation

1. Placer les PDF dans `public/documents/`, par exemple `cv-fiona-talbi-fr.pdf`, `cv-fiona-talbi-en.pdf`, `lettre-motivation-fr.pdf`, `cover-letter-en.pdf`.
2. Renseigner leurs chemins **sans `public/`** dans `src/data/documents.ts` :

```ts
fr: {
  cv: "documents/cv-fiona-talbi-fr.pdf",
  coverLetter: "documents/lettre-motivation-fr.pdf",
  recommendations: { /* chemins des lettres françaises */ },
},
en: {
  cv: "documents/cv-fiona-talbi-en.pdf",
  coverLetter: "documents/cover-letter-en.pdf",
  recommendations: { /* chemins des lettres anglaises */ },
},
```

Le CV apparaît dans l’accueil et dans Contact. La lettre de motivation apparaît dans Contact dès que son chemin est renseigné. Chaque langue ouvre son propre fichier. `null` retire le lien de téléchargement, sans message d’indisponibilité. Les recommandations sans PDF configuré proposent une demande par e-mail dans la langue choisie.

Les CV français actuel et anglais généré sont en place. Les lettres de motivation restent à ajouter : aucun texte de candidature n’est inventé. Pour les recommandations, utiliser des documents réels, avec l’accord de leurs auteurs ; ajouter les traductions anglaises aux clés correspondantes.

Après remplacement par vos propres CV, ne relancez plus le générateur sur ces fichiers. Pour régénérer le CV anglais issu des données : `bun scripts/share-assets/cv.mjs --locale en` (Playwright requis ; `PLAYWRIGHT_MODULE` et `CHROMIUM_EXECUTABLE_PATH` permettent d’utiliser une installation existante).

## Vérifier et publier

Tester le sélecteur sur mobile et ordinateur, un projet anglais, puis les PDF. Lancer les tests, lint, TypeScript et les builds normal et Pages. Chaque push sur `main` publie automatiquement les deux langues sur GitHub Pages.
