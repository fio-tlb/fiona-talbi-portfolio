// Types partagés par les contenus du portfolio et les composants.
export interface PortfolioProfile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  /** Localisation affichée en tête du CV PDF (scripts/share-assets/cv.mjs). */
  location: string;
  email: string;
  linkedin: string;
  /** Villes du parcours, affichées sous le nom (« Paris · Londres · Dublin »). */
  places: string;
  /**
   * CV en PDF dans public/ (ex. « documents/cv-fiona-talbi.pdf »), proposé au téléchargement
   * dans Contact. Remplacer le CV = écraser le fichier. `null` : aucun lien.
   */
  cvPath: string | null;
  /** Portrait du hero ; une image seule ou des variantes renseignées. `null` : aucun visuel. */
  portrait: PortraitImage | null;
}
export interface ImageVariant {
  src: string;
  width: number;
}
export interface ImageSource {
  type: "image/avif" | "image/webp";
  variants: readonly ImageVariant[];
}
/** Image originale et variantes facultatives : aucun nom de fichier n’est déduit par l’UI. */
export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  srcSet?: readonly ImageVariant[];
  sources?: readonly ImageSource[];
}
export interface PortraitImage extends ImageAsset {
  alt: string;
}
export interface NavigationItem {
  /** Id de la section de la page (ancre #id). */
  id: string;
  label: string;
}
export interface Metric {
  id: string;
  value: string;
  label: string;
}
export interface ImpactStat extends Metric {
  /** Entreprise et métier d'où vient le chiffre. */
  source: string;
  /** Ancre de destination sur la page : l'id d'un projet, ou « parcours ». */
  targetId: string;
}
/**
 * Logo SVG monochrome dans public/logos (couleur encre intégrée au fichier).
 * `width`/`height` reprennent la viewBox du fichier : le rendu fixe la hauteur, la largeur suit.
 */
export interface LogoImage {
  src: string;
  width: number;
  height: number;
  /**
   * Correction optique de la hauteur affichée (1 par défaut) : un mot-symbole sur deux lignes ou
   * un logo avec jambage paraît plus petit qu'un mot d'une ligne à hauteur de boîte égale.
   */
  scale?: number;
}
export type BrandId = "logitech" | "cosmeticar" | "massilia";
export interface Brand {
  id: BrandId;
  name: string;
  logo: LogoImage;
  /** Variante lisible dans les tuiles étroites, sans changer le logo horizontal du hero. */
  compactLogo?: LogoImage;
}
/** La première photo sert de couverture. Une seule image suffit ; les variantes sont facultatives. */
export interface ProjectImage extends ImageAsset {
  /** Ce que montre la photo, pour les lecteurs d'écran. */
  alt: string;
  /** Légende affichée sous la photo et dans l'agrandissement. */
  caption: string;
}
/** Partie du récit détaillé d'un projet : un intertitre et ses paragraphes. */
export interface ProjectStorySection {
  heading: string;
  paragraphs: readonly string[];
}
export interface Project {
  /**
   * Sert d'ancre (#id) sur l'accueil et d'adresse de la page projet (/projets/<id>) :
   * ne pas le modifier, les chiffres clés du hero et les liens partagés y mènent.
   */
  id: string;
  brandId: BrandId;
  /** Nom de l'entreprise, tel qu'affiché (repris dans le CV PDF). */
  brand: string;
  category: string;
  title: string;
  /** Enjeu : le contexte en une phrase. */
  context: string;
  /** Ma mission (page projet) : l'objectif, en une phrase. */
  mission: string;
  /** Ce que j'ai fait (page projet), à la 1re personne : une puce par action ou résultat concret. */
  details: readonly string[];
  metrics: readonly Metric[];
  /**
   * Récit détaillé de la page projet, affiché après « Ce que j'ai fait » : une carte par partie.
   * Vide par défaut (rien ne s'affiche) ; à compléter pour détailler le projet en profondeur.
   */
  story: readonly ProjectStorySection[];
  /** Photos du projet (3 à 5). Vide : la carte de l'accueil affiche un visuel de repli sobre. */
  gallery: readonly ProjectImage[];
}
export interface Experience {
  id: string;
  brandId: BrandId;
  company: string;
  location: string | null;
  /** Intitulé du poste (à confirmer par Fiona, tel qu'il figure sur LinkedIn). */
  role: string;
  /** Période (« 2022 – 2023 »). Affichée seulement si elle est renseignée : ne pas l'inventer. */
  period: string | null;
  description: string;
}
export interface Education {
  id: string;
  /** Période (« 2024 – 2026 »), ou `null` si elle n'est pas connue. */
  period: string | null;
  title: string;
  school: string;
  /** Nom exact de l’établissement, repris tel quel dans les données structurées (JSON-LD). */
  institution: string;
}
export interface SkillGroup {
  id: string;
  title: string;
  items: readonly string[];
}
export interface Tool {
  id: string;
  name: string;
  /** Logo de l'outil s'il existe (Simple Icons, CC0) ; sinon `null` et une icône générique. */
  logo: LogoImage | null;
}
export interface Certification {
  id: string;
  name: string;
  /** Organisme qui délivre la certification ; `null` tant qu'il n'est pas confirmé (seule l'année s'affiche). */
  organization: string | null;
  year: string | null;
  /** Logo de l'organisme s'il existe ; sinon `null` et une tuile d'icône. */
  logo: LogoImage | null;
}
export interface Language {
  id: string;
  name: string;
  level: string;
}
export interface Interest {
  id: string;
  label: string;
}
export interface Recommendation {
  id: string;
  /** Titre affiché. Nom et fonction du recommandant seulement avec son accord : ne rien inventer. */
  title: string;
  description?: string;
  /** PDF dans public/ (ex. « documents/recommandation-01.pdf ») ; `null` : demande par e-mail. */
  documentPath: string | null;
}
/**
 * Vidéo de présentation : proposée dans une modale à la première visite de l’accueil, puis
 * toujours disponible par le bouton flottant « Voir la vidéo » (toutes les pages). Chemins
 * relatifs à public/ (préfixés au rendu). Remplacer la vidéo : écraser les fichiers, mesurer la
 * durée (ffprobe), changer `id` pour reproposer la modale à tous les visiteurs. `null` : rien.
 */
export interface IntroVideo {
  /** Clé de la mémoire du visiteur (`ft-intro-video:<id>`) : la changer à chaque nouvelle vidéo. */
  id: string;
  /** MP4 H.264 avec `+faststart`. */
  src: string;
  /** Affiche JPEG au format de la vidéo ; une version WebP du même nom sert de vignette (modale). */
  poster: string;
  /** Sous-titres WebVTT en français, ou `null` (vidéo sans parole). */
  captions: string | null;
  width: number;
  height: number;
  /** Durée réelle, mesurée sur le fichier : elle est affichée (« 20 s »). */
  durationSeconds: number;
  /** Titre du lecteur. */
  title: string;
  /** Clip de test en attendant la vraie vidéo : titré « Vidéo de test ». */
  isPlaceholder: boolean;
}
export interface SectionHeadingContent {
  /** Sur-titre court, en casse normale. */
  label?: string;
  title: string;
  /** Seconde ligne du titre, en bordeaux (« Des résultats mesurables. »). */
  titleAccent?: string;
  description?: string;
}

export interface PortfolioSeo {
  /** Adresse publique canonique, avec la barre finale : base des URL absolues (og:url, og:image…). */
  siteUrl: string;
  locale: string;
  title: string;
  /** 160 caractères au plus : au-delà, Google tronque la description. */
  description: string;
  socialTitle: string;
  socialDescription: string;
  /** Fichier de public/ ; changer de nom (v2, v3…) à chaque nouvelle image, LinkedIn la garde en cache. */
  ogImage: string;
  ogImageAlt: string;
  ogImageWidth: number;
  ogImageHeight: number;
  /** Couleur de la barre du navigateur mobile : hex de --paper. */
  themeColor: string;
  addressLocality: string;
  addressCountry: string;
}
export interface ErrorScreenContent {
  eyebrow: string;
  title: string;
  description: string;
  homeLabel: string;
  contactLabel: string;
}
