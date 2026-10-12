# Guide rapide pour les agents IA

- **Projet** : portfolio de Fiona Talbi en français, React 19, TanStack Start, Vite et TypeScript. Le dépôt est lié à Lovable : ne réécrivez pas l'historique publié de `main`.
- **Structure** : `src/lib/portfolio-data.ts` contient les faits et projets ; `src/components/portfolio.tsx` affiche la page ; `src/styles.css` gère l'apparence. Les routes sont dans `src/routes/` ; ne modifiez pas `src/routeTree.gen.ts` à la main.
- **Contenu** : conservez des données vérifiables. Les lettres de recommandation restent en attente tant que les vrais PDF ne sont pas fournis.
- **Développement** : Node.js 24 et Bun 1.4.3. `bun install --frozen-lockfile`, puis `bun run dev`. Avant livraison : `bun run test`, `./node_modules/.bin/tsc --noEmit`, `bun run build` et `GITHUB_PAGES=true bun run build`. Le lint signale actuellement des erreurs de formatage préexistantes.
- **Publication** : `.github/workflows/pages.yml` publie automatiquement chaque push sur `main` sur GitHub Pages : <https://fio-tlb.github.io/fiona-talbi-portfolio/>. Le build Pages précompile la page `/` dans `dist/client` avec le préfixe `/fiona-talbi-portfolio/`.
- **Contraintes Pages** : utilisez `import.meta.env.BASE_URL` pour les fichiers de `public/`. Pages ne fournit pas de serveur applicatif : les fonctionnalités doivent fonctionner dans le navigateur ou être précompilées.
