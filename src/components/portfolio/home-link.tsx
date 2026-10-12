import type { ComponentProps, MouseEvent } from "react";
import { useRouter } from "@tanstack/react-router";

type HomeLinkProps = Omit<ComponentProps<"a">, "href"> & {
  /** Id d'une section de l'accueil (« projets », « contact »…). */
  section: string;
};

/**
 * Lien vers une section de l'accueil, utilisable sur toutes les pages.
 * - Son href est absolu (« /fiona-talbi-portfolio/#projets ») : il fonctionne sans JavaScript,
 *   depuis le HTML pré-rendu de n'importe quelle page.
 * - Sur l'accueil, c'est un simple saut d'ancre (`:target`, défilement doux, retour arrière
 *   natifs), comme un lien « #projets », même si l'adresse porte des paramètres (?utm=…).
 * - Ailleurs (page projet), le routeur ramène à l'accueil sans recharger, puis fait défiler jusqu'à
 *   la section. On n'utilise pas <Link> ici : il marquerait `aria-current="page"` selon l'ancre de
 *   l'adresse, alors que la section active est suivie au défilement (`aria-current="location"`).
 */
export function HomeLink({ section, onClick, ...props }: HomeLinkProps) {
  const router = useRouter({ warn: false });
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.defaultPrevented || modified || event.button !== 0 || !router) return;
    event.preventDefault();
    if (router.state.location.pathname !== "/") {
      void router.navigate({ to: "/", hash: section });
    } else if (window.location.hash === "#" + section) {
      document.getElementById(section)?.scrollIntoView();
    } else {
      // Vrai saut d'ancre, sans toucher au reste de l'adresse (paramètres de suivi compris).
      window.location.hash = section;
    }
  };
  return <a {...props} href={import.meta.env.BASE_URL + "#" + section} onClick={handleClick} />;
}
