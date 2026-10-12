/** Chemin d'un fichier de public/, préfixé pour GitHub Pages (« documents/cv.pdf » → « /fiona-talbi-portfolio/documents/cv.pdf »). */
export function publicPath(path: string): string {
  return import.meta.env.BASE_URL + path.trim().replace(/^\/+/, "");
}

/** « a, b et c » : énumération française pour les listes courtes affichées en texte. */
export function listInFrench(items: readonly string[]): string {
  if (items.length < 2) return items.join("");
  return items.slice(0, -1).join(", ") + " et " + items.at(-1);
}
