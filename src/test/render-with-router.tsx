import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { render } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { LocalizedTestOutlet } from "./localized-outlet";

/**
 * Routeur de test : les mêmes adresses que l'application (/, /projets/<id>), sans le document
 * <html> de __root.tsx. Le composant testé s'affiche à l'adresse `path`.
 */
export async function createTestRouter(ui: ReactNode, path = "/") {
  const rootRoute = createRootRoute({
    component: LocalizedTestOutlet,
    validateSearch: (search: Record<string, unknown>) => search,
  });
  const page = () => <>{ui}</>;
  const routeTree = rootRoute.addChildren([
    createRoute({ getParentRoute: () => rootRoute, path: "/", component: page }),
    createRoute({ getParentRoute: () => rootRoute, path: "/projets/$projectId", component: page }),
    createRoute({ getParentRoute: () => rootRoute, path: "/en", component: page }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: "/en/projets/$projectId",
      component: page,
    }),
  ]);
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  await router.load();
  return router;
}

/** Rend `ui` dans un routeur (liens <Link> et HomeLink fonctionnels). */
export async function renderWithRouter(ui: ReactNode, path = "/") {
  const router = await createTestRouter(ui, path);
  return { router, ...render(<RouterProvider router={router} />) };
}

/** HTML rendu côté serveur (pré-rendu), dans un routeur. */
export async function renderToStringWithRouter(ui: ReactNode, path = "/") {
  const router = await createTestRouter(ui, path);
  return renderToString(<RouterProvider router={router} />);
}
