import type { ReactNode } from "react";
import type { ErrorScreenContent } from "@/data/portfolio";
import { profile } from "@/data/portfolio";

interface ErrorScreenProps {
  content: ErrorScreenContent;
  /** Action principale placée avant le retour au portfolio, qui devient alors secondaire. */
  primaryAction?: ReactNode;
}

// Écran sobre aux couleurs du site pour la 404 et les erreurs de rendu. Le retour passe par
// un vrai lien vers la base du site : il fonctionne sans JavaScript et sous /fiona-talbi-portfolio/.
export function ErrorScreen({ content, primaryAction }: ErrorScreenProps) {
  const home = import.meta.env.BASE_URL;

  return (
    <div className="error-screen">
      <header className="error-screen-header">
        <div className="site-wrap">
          <a className="header-brand" href={home}>
            {profile.name}
          </a>
        </div>
      </header>
      <main className="error-screen-main site-wrap">
        <p className="error-screen-eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p className="error-screen-text">{content.description}</p>
        <div className="error-screen-actions">
          {primaryAction}
          <a
            className={primaryAction ? "action action-secondary" : "action action-primary"}
            href={home}
          >
            {content.homeLabel}
          </a>
        </div>
        <p className="error-screen-contact">
          {content.contactLabel} <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      </main>
    </div>
  );
}
