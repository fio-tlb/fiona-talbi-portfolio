# Fiona Talbi: Portfolio

Crée un portfolio personnel moderne, dynamique et stylé pour Fiona Talbi, avec plus de 3 ans d’experience dans le marketing 360 et la communication, diplomé d’un Master Marketing Digital & Innovation à l'IÉSEG Paris et d’un master luxury Marketing à GCU London. Reprends exactement la même organisation, la même structure de sections et le même esprit que ce portfolio https://lina-laroze-portfolio.lovable.app, mais adapte tout le contenu à mon parcours.

La palette de couleurs doit mélanger beige, bordeaux, bleu bébé et rouge cerise, avec un rendu élégant, vivant et un peu premium. Ajoute des animations fluides au scroll, des effets de survol soignés et une navigation claire. Le site doit être responsive et agréable sur mobile.

Mets en avant des chiffres clés (KPIs) dans des blocs visuels, comme sur le portfolio de référence. Pour le contenu de mon parcours, appuie-toi sur mon profil LinkedIn https://www.linkedin.com/in/fiona-talbi-246407193 et sur les informations suivantes au cas où il ne serait pas accessible. Je suis basée à Paris, je parle français (langue maternelle), anglais (TOEIC 910/990) et espagnol (B2). Mon parcours comprend un Master Marketing Digital & Innovation à l'IÉSEG (2024-2026), un MSc Luxury Marketing à GCU Londres (2023-2024), un Bachelor International Management spécialisation marketing à l'ESSCA (2019-2022) et un semestre d'échange à Dorset College Dublin. Mes outils sont Google Workspace, Canva, Mailchimp, CapCut, Trello, Notion, Photoshop, Premiere Pro et iMovie. Mes centres d'intérêt sont le voyage, la lecture et le dessin.

La section projets doit présenter quatre expériences, chacune avec un titre, un contexte court, mes missions et des KPIs visuels.

Premier projet chez Logitech, Category Management. J'ai déployé plus de 100 solutions catman dans nos top stores. Ce nouvel agencement du rayon informatique a permis d'augmenter les ventes de 30 %.

Deuxième projet chez Logitech, Trade Marketing. J'ai managé aux côtés du responsable ventes terrain une équipe de 7 merchandisers. La PLV était disponible day one dans nos 140 top stores pour les lancements produits et nos campagnes, comme les Logi Work Days.

Troisième projet chez CosmétiCar, communication et réseaux sociaux. J'ai géré les réseaux sociaux Facebook, Instagram et TikTok avec un focus sur Instagram, qui a dépassé 500 abonnés en moins d'un an dans un secteur de niche, la franchise de lavage auto. Plus de 30 ouvertures d'agence dans l'année, donc 30 formations communication dispensées aux franchisés.

Quatrième projet chez Massilia E-consulting, relations influenceurs. En un mois, j'ai signé 3 influenceuses françaises et 2 influenceuses espagnoles. J'ai aussi géré les fournisseurs chinois au début de la crise sanitaire, ce qui a limité nos stocks et notre marge de manœuvre avec les influenceurs.

Ajoute aussi une section Mes recommandations, avec un design élégant (cartes ou carrousel), où je pourrai insérer mes deux lettres de recommandation, par exemple en aperçu avec possibilité de les ouvrir ou de les télécharger en PDF.

Ajoute enfin une section expériences et formation en timeline, une section compétences et outils, une section langues, et une section contact avec mon email fiona.2001@live.fr, mon LinkedIn et un formulaire ou un bouton de contact. Garde un ton professionnel mais chaleureux, rédigé en français. Ajoute une section Certifications mise en valeur visuellement, sous forme de badges ou de cartes avec le logo de l'organisme, le nom de la certification et l'année. Mes certifications sont les suivantes [Web Development, Le Wagon, 2026 - AI Product Building, 2026 - AI Proficiency, Section, 2026 - Google Ads search , 2025, Google Ads analytics, 2025 - TOEIC 910/990. ]. N’oublie pas d’afficher les KPIs impactant sur la page d’accueil

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a6316e27-d447-4ef3-a299-de45b6bd7855).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? Install Node.js and Bun 1.4.3, then use the committed lockfile:

```sh
git clone <this-repository-url>
cd <repository-name>
bun install --frozen-lockfile
bun run dev
```

## GitHub Pages

The site is built as a static page for <https://fio-tlb.github.io/fiona-talbi-portfolio/>. In **Settings → Pages**, select **GitHub Actions** as the build source once. The workflow in `.github/workflows/pages.yml` then tests, builds and deploys the site after every push to `main` (or when run manually). Check the **Actions** tab for deployment status.

For a local Pages build, run `GITHUB_PAGES=true bun run build`; the files to publish are in `dist/client`. See [AI_README.md](AI_README.md) for concise agent instructions.

## Remplacer les fichiers provisoires

En attendant les vrais documents, le site utilise des fichiers provisoires branchés exactement comme les vrais : rien dans l'interface ne les signale, sauf la vidéo, volontairement titrée « Vidéo de test » jusqu'à son remplacement (voir plus bas). Pour publier le vrai document, **écrasez le fichier en gardant le même nom et le même format**, puis vérifiez les points indiqués. Les chemins sont relatifs à `public/`, publié sous <https://fio-tlb.github.io/fiona-talbi-portfolio/>.

- **Portrait du hero** : le portrait généré retenu est `images/portrait-fiona-v3.jpg` (1122 × 1402 px), avec ses versions JPEG/AVIF de 600 et 900 px. Modifier `profile.portrait` dans `src/data/portfolio.ts` (voir [le guide des images](docs/modifier-les-projets.md)). Une image originale avec ses dimensions et son texte alternatif suffit ; garder un cadrage vertical 4:5. Pour le remplacer, utiliser un nouveau nom afin d’éviter l’ancien portrait en cache ; si vous conservez `jpegWithAvif`, régénérer aussi toutes les variantes.
- **Lettres de recommandation** : `documents/recommandation-01.pdf` et `documents/recommandation-02.pdf`. Uniquement avec l'accord du signataire, coordonnées personnelles masquées, moins de 1 Mo (`gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -o sortie.pdf entree.pdf`) et métadonnée « Titre » renseignée. Mettre à jour le titre de la carte dans `recommendations` si l'auteur peut être nommé. Sans accord : `documentPath: null`, la carte propose alors une demande par e-mail.
- **CV** : `documents/cv-fiona-talbi.pdf` (`profile.cvPath`), moins de 1 Mo. Le CV provisoire est généré uniquement depuis `src/data/portfolio.ts` par `bun scripts/share-assets/cv.mjs` ; il n'est **pas** régénéré au build : relancer le script après chaque changement de texte, tant que le vrai CV n'a pas remplacé le fichier.
- **Vidéo de présentation** : `video/presentation.mp4`, `video/presentation-poster.jpg` et `.webp`. Passer `introVideo.isPlaceholder` à `false`, changer `introVideo.id` (la modale d'accueil sera reproposée à tous les visiteurs, y compris ceux qui avaient ignoré la vidéo de test), renseigner la durée réelle, `width`/`height` et les sous-titres `.vtt` (`captions`). Détails dans [AI_README.md](AI_README.md).
- **Pages projet** : chaque projet se modifie dans son fichier `src/data/projects/<id>.ts` (textes, chiffres, récit et galerie). Une image originale dans `public/images/projets/<id>/` suffit ; les variantes JPEG/AVIF restent facultatives. La première image sert de couverture et d’aperçu de partage. Voir [Modifier les projets](docs/modifier-les-projets.md) pour les exemples, les dimensions et les variantes. Les pages sont automatiquement précompilées à partir de la liste `projects`.
- **Logos des entreprises** : `public/logos/cosmeticar.svg` et `public/logos/massilia-e-consulting.svg` sont des mots-symboles provisoires (le nom de l'entreprise en Instrument Sans, converti en tracés) en attendant les logos officiels ; Logitech et les outils viennent de Simple Icons (CC0, les marques appartiennent à leurs propriétaires). Pour mettre le logo officiel : écraser le fichier SVG sous le même nom (monochrome encre `#311b1a` de préférence, ou couleur de marque si tous les logos passent en couleur), puis reporter sa `viewBox` dans `width`/`height` de `brands` (`src/data/portfolio.ts`) et ajuster `scale` si le logo paraît trop grand ou trop petit à côté des autres (hero, cartes projet, cartes d'expérience). Un logo d'outil ou d'organisme de certification s'ajoute de la même façon (`tools[].logo`, `certifications[].logo`) ; sans logo, une icône générique s'affiche.
- **Image de partage** (LinkedIn, e-mail, messageries) : `og-image-v1.jpg`, 1200 × 630 px, moins de 150 Ko. **Ne pas l'écraser** : LinkedIn garde l'aperçu en cache par adresse. Créer `og-image-v2.jpg` (gabarit `scripts/share-assets/og-image.html`, puis `npm install --no-save playwright && npx playwright install chromium` et `node scripts/share-assets/render.mjs og-image-v2.jpg`), mettre à jour `seo.ogImage` (et `seo.ogImageAlt` si le texte change), supprimer l'ancienne image, puis actualiser l'aperçu avec le [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/).
- **Favicon et icône iOS** : `favicon.svg` et `apple-touch-icon.png` sont définitifs (monogramme « FT » en Fraunces, vectorisé). Pour les refaire : `scripts/share-assets/favicon.py`, puis `render.mjs`.

Si l'adresse du site change (nom de domaine personnel), mettre à jour `seo.siteUrl` dans `src/data/portfolio.ts`, la base Pages dans `vite.config.ts` et les liens absolus de `public/404.html`.
