// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { projects } from "./src/data/portfolio";

const isGitHubPages = process.env["GITHUB_PAGES"] === "true";

export default defineConfig({
  ...(isGitHubPages && {
    vite: { base: "/fiona-talbi-portfolio/" },
    nitro: false,
  }),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isGitHubPages && {
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: false,
        crawlLinks: false,
      },
      // Chaque langue existe en HTML statique, avec les mêmes identifiants de projet.
      pages: [
        { path: "/" },
        { path: "/en/" },
        ...projects.flatMap((project) => [
          { path: "/projets/" + project.id },
          { path: "/en/projets/" + project.id },
        ]),
      ],
    }),
  },
});
