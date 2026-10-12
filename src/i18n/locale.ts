export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const LANGUAGE_STORAGE_KEY = "ft-language";

export function isLocale(value: unknown): value is Locale {
  return value === "fr" || value === "en";
}

/** Chemin interne, avec ou sans le préfixe public de GitHub Pages. */
export function sitePath(pathname: string, base = import.meta.env.BASE_URL): string {
  const prefix = base.replace(/\/$/, "");
  const path =
    prefix && (pathname === prefix || pathname.startsWith(prefix + "/"))
      ? pathname.slice(prefix.length)
      : pathname;
  return path || "/";
}

export function localeFromPath(pathname: string, base = import.meta.env.BASE_URL): Locale {
  return /^\/en(?:\/|$)/.test(sitePath(pathname, base)) ? "en" : "fr";
}

export function browserLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const locale = language.toLowerCase().split(/[-_]/)[0];
    if (isLocale(locale)) return locale;
  }
  return "fr";
}

export function homeRoute(locale: Locale): "/" | "/en" {
  return locale === "en" ? "/en" : "/";
}

export function projectRoute(locale: Locale) {
  return locale === "en" ? ("/en/projets/$projectId" as const) : ("/projets/$projectId" as const);
}

export function localizedPath(pathname: string, locale: Locale, base = import.meta.env.BASE_URL) {
  const path = sitePath(pathname, base).replace(/^\/en(?=\/|$)/, "") || "/";
  const localized = locale === "en" ? "/en" + path : path;
  return (base.replace(/\/$/, "") + localized).replace(/\/?$/, "/");
}

export function rememberLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  } catch {
    // Le paramètre lang du lien conserve aussi le choix lorsque le stockage est bloqué.
  }
}

/** Exécuté avant la peinture : une page anglaise statique remplace la page française. */
export function localeBootstrap(base: string): string {
  return `(function(){try{
    var base=${JSON.stringify(base)}, key=${JSON.stringify(LANGUAGE_STORAGE_KEY)};
    var u=new URL(location.href), p=u.pathname, prefix=base.charAt(base.length-1)==="/"?base.slice(0,-1):base;
    if(prefix&&(p===prefix||p.indexOf(prefix+"/")===0))p=p.slice(prefix.length)||"/";
    var current=p==="/en"||p.indexOf("/en/")===0?"en":"fr";
    var valid=function(v){return v==="fr"||v==="en";};
    var requested=u.searchParams.get("lang"), stored=null, chosen;
    try{stored=localStorage.getItem(key);}catch(e){}
    if(valid(requested))chosen=requested;
    else if(current==="en")chosen="en";
    else if(valid(stored))chosen=stored;
    else{chosen="fr";var languages=navigator.languages||[navigator.language];
      for(var i=0;i<languages.length;i++){var l=String(languages[i]).toLowerCase().split(/[-_]/)[0];if(valid(l)){chosen=l;break;}}}
    if(chosen!==current){var neutral=current==="en"?(p.slice(3)||"/"):p;
      u.pathname=prefix+(chosen==="en"?"/en":"")+neutral;
      location.replace(u.href);}
  }catch(e){}})();`;
}
