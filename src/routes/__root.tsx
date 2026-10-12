import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import frauncesLatin from "@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2?url";
import instrumentSansLatin from "@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2?url";
import { ErrorScreen } from "../components/error-screen";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { errorContent, seo } from "@/data/portfolio";

function NotFoundComponent() {
  const content = errorContent.notFound;

  return (
    <>
      {/* React 19 place ces balises dans <head> ; la page d'accueil a les siennes (index.tsx). */}
      <title>{content.title + errorContent.documentTitleSuffix}</title>
      <meta name="robots" content="noindex" />
      <ErrorScreen content={content} />
    </>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <ErrorScreen
      content={errorContent.error}
      primaryAction={
        <button
          type="button"
          className="action action-primary"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          {errorContent.retryLabel}
        </button>
      }
    />
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // Réglages communs à toutes les pages. Titre, description, partage et JSON-LD : routes/index.tsx.
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: seo.themeColor },
      { name: "color-scheme", content: "light" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // Same hashed files as the @font-face rules: the name and body text render without a late swap.
      {
        rel: "preload",
        href: frauncesLatin,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: instrumentSansLatin,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "icon",
        href: `${import.meta.env.BASE_URL}favicon.svg`,
        type: "image/svg+xml",
      },
      {
        rel: "apple-touch-icon",
        href: `${import.meta.env.BASE_URL}apple-touch-icon.png`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
