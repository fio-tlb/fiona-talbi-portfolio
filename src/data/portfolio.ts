// Contenu public du portfolio : données vérifiables, sans dépendance à l’interface.
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
  /**
   * Portrait du hero. Fichiers dans public/images : `src` est le JPEG de 1200 px de large ;
   * les variantes `-600`/`-900` (JPEG et AVIF) et `.avif` portent le même nom.
   * Remplacer la photo = écraser ces fichiers (format 4:5). `null` : aucun visuel affiché.
   */
  portrait: PortraitImage | null;
}
export interface PortraitImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Largeurs disponibles en `-<largeur>.jpg` / `-<largeur>.avif` (la plus grande = `src`). */
  widths: readonly number[];
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
}
/** Image de la galerie d'un projet (public/images/projets/<id>/) ; la 1re sert de couverture. */
export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
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
  /** Action : ce que j'ai fait, à la 1re personne. */
  action: string;
  metrics: readonly Metric[];
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
 * Vidéo de présentation proposée depuis le hero. Chemins relatifs à public/ (préfixés au rendu).
 * Remplacer la vidéo : écraser les fichiers, mesurer la durée (ffprobe), changer `id` pour la
 * reproposer aux visiteurs qui avaient choisi « Plus tard » ou fermé la pastille. `null` : rien.
 */
export interface IntroVideo {
  /** Clé de la mémoire du visiteur (`ft-intro-video:<id>`) : la changer à chaque nouvelle vidéo. */
  id: string;
  /** MP4 H.264 avec `+faststart`. */
  src: string;
  /** Affiche JPEG au format de la vidéo ; une version WebP du même nom sert de vignette. */
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

export const profile: PortfolioProfile = {
  name: "Fiona Talbi",
  firstName: "Fiona",
  lastName: "Talbi",
  role: "Marketing 360 & communication",
  location: "Paris, France",
  email: "fiona.2001@live.fr",
  linkedin: "https://www.linkedin.com/in/fiona-talbi-246407193",
  places: "Paris · Londres · Dublin",
  cvPath: "documents/cv-fiona-talbi.pdf",
  portrait: {
    src: "images/portrait-fiona.jpg",
    alt: "Portrait de Fiona Talbi",
    width: 1200,
    height: 1500,
    widths: [600, 900, 1200],
  },
};

export const seo: PortfolioSeo = {
  siteUrl: "https://fio-tlb.github.io/fiona-talbi-portfolio/",
  locale: "fr_FR",
  title: "Fiona Talbi — Portfolio marketing 360 & communication",
  description:
    "Portfolio de Fiona Talbi, marketing 360 et communication à Paris : projets Logitech, CosmétiCar et Massilia, résultats chiffrés et parcours international.",
  socialTitle: "Fiona Talbi — Marketing 360 & communication, Paris",
  socialDescription:
    "Projets Logitech, CosmétiCar et Massilia : +30 % de ventes, 140 top stores équipés dès le lancement et 500+ abonnés Instagram en moins d’un an.",
  ogImage: "og-image-v1.jpg",
  ogImageAlt:
    "Fiona Talbi, marketing 360 et communication à Paris : +30 % de ventes et 140 top stores équipés chez Logitech, 500+ abonnés Instagram pour CosmétiCar.",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  themeColor: "#f7efe4",
  addressLocality: "Paris",
  addressCountry: "FR",
};

// Écrans d’erreur de l’application (404 et erreur de chargement). public/404.html reprend
// le texte « Page introuvable » en HTML statique pour GitHub Pages : le modifier aux deux endroits.
export const errorContent = {
  notFound: {
    eyebrow: "Erreur 404",
    title: "Page introuvable",
    description: "Cette page n’existe pas ou a été déplacée. Le portfolio, lui, est toujours là.",
    homeLabel: "Retour au portfolio",
    contactLabel: "Ou écrivez-moi :",
  },
  error: {
    eyebrow: "Erreur de chargement",
    title: "La page n’a pas pu se charger",
    description:
      "Un problème est survenu pendant l’affichage. Vous pouvez réessayer ou revenir au portfolio.",
    homeLabel: "Retour au portfolio",
    contactLabel: "Ou écrivez-moi :",
  },
  retryLabel: "Réessayer",
  documentTitleSuffix: " — Fiona Talbi",
} as const satisfies {
  notFound: ErrorScreenContent;
  error: ErrorScreenContent;
  retryLabel: string;
  documentTitleSuffix: string;
};

// Logos : SVG monochromes dans public/logos. Logitech et les outils viennent de Simple Icons (CC0 ;
// les marques appartiennent à leurs propriétaires). CosmétiCar et Massilia E-consulting : mots-symboles
// PROVISOIRES (nom en Instrument Sans converti en tracés), à remplacer par les logos officiels en
// écrasant le fichier puis en reportant ici sa viewBox (width/height).
const toolLogo = (file: string): LogoImage => ({ src: "logos/" + file, width: 24, height: 24 });
const googleLogo = toolLogo("google.svg");

export const brands: Readonly<Record<BrandId, Brand>> = {
  logitech: {
    id: "logitech",
    name: "Logitech",
    logo: { src: "logos/logitech.svg", width: 240, height: 165, scale: 1.3 },
  },
  cosmeticar: {
    id: "cosmeticar",
    name: "CosmétiCar",
    logo: { src: "logos/cosmeticar.svg", width: 552, height: 75, scale: 0.78 },
  },
  massilia: {
    id: "massilia",
    name: "Massilia E-consulting",
    logo: { src: "logos/massilia-e-consulting.svg", width: 360, height: 151, scale: 1.3 },
  },
};

// Formation, certifications et langues sont des sous-parties (#formation, #certifications, #langues)
// de Parcours et Compétences : leurs ancres restent valables, sans entrée de menu dédiée.
export const navigation: readonly NavigationItem[] = [
  { id: "projets", label: "Projets" },
  { id: "parcours", label: "Parcours" },
  { id: "competences", label: "Compétences" },
  { id: "recommandations", label: "Recommandations" },
];

export const impactStats: readonly ImpactStat[] = [
  {
    id: "sales-growth",
    value: "+30 %",
    label: "de ventes sur le rayon informatique",
    source: "Logitech · Category management",
    targetId: "logitech-category-management",
  },
  {
    id: "stores-activated",
    value: "140",
    label: "top stores équipés en PLV dès le lancement",
    source: "Logitech · Trade marketing",
    targetId: "logitech-trade-marketing",
  },
  {
    id: "instagram-community",
    value: "500+",
    label: "abonnés Instagram en moins d’un an",
    source: "CosmétiCar · Réseaux sociaux",
    targetId: "cosmeticar-social-media",
  },
  {
    id: "marketing-experience",
    value: "3+ ans",
    label: "en marketing et communication",
    source: "Logitech · CosmétiCar · Massilia",
    targetId: "parcours",
  },
];

export const projects: readonly Project[] = [
  {
    id: "logitech-category-management",
    brandId: "logitech",
    brand: "Logitech",
    category: "Category management",
    title: "Réagencer le rayon informatique des top stores",
    context:
      "Chez Logitech, rendre l’offre plus lisible dans le rayon informatique de nos top stores.",
    action:
      "J’ai déployé plus de 100 solutions de category management (catman) dans nos top stores. Le nouvel agencement du rayon informatique a augmenté les ventes de 30 %.",
    metrics: [
      {
        id: "catman-solutions",
        value: "100+",
        label: "solutions de category management déployées",
      },
      { id: "catman-sales", value: "+30 %", label: "de ventes sur le rayon informatique" },
    ],
    gallery: [],
  },
  {
    id: "logitech-trade-marketing",
    brandId: "logitech",
    brand: "Logitech",
    category: "Trade marketing",
    title: "La PLV en place dès le jour du lancement, dans 140 top stores",
    context:
      "Chez Logitech, rendre visibles en magasin les lancements produits et les campagnes comme les Logi Work Days.",
    action:
      "Aux côtés du responsable des ventes terrain, j’ai managé une équipe de 7 merchandisers. La PLV était disponible dès le jour du lancement dans nos 140 top stores, pour les lancements produits comme pour les Logi Work Days.",
    metrics: [
      { id: "trade-stores", value: "140", label: "top stores équipés dès le lancement" },
      { id: "trade-merchandisers", value: "7", label: "merchandisers managés sur le terrain" },
    ],
    gallery: [],
  },
  {
    id: "cosmeticar-social-media",
    brandId: "cosmeticar",
    brand: "CosmétiCar",
    category: "Communication & réseaux sociaux",
    title: "Faire connaître un réseau de lavage auto sur Instagram",
    context:
      "CosmétiCar, réseau de franchises de lavage automobile, un secteur de niche : plus de 30 agences ouvertes dans l’année.",
    action:
      "J’ai géré Facebook, Instagram et TikTok, avec un focus sur Instagram, qui a dépassé 500 abonnés en moins d’un an. J’ai aussi assuré 30 formations communication pour les nouveaux franchisés.",
    metrics: [
      { id: "social-followers", value: "500+", label: "abonnés Instagram en moins d’un an" },
      { id: "social-training", value: "30", label: "formations communication pour les franchisés" },
    ],
    gallery: [],
  },
  {
    id: "massilia-influencer-relations",
    brandId: "massilia",
    brand: "Massilia E-consulting",
    category: "Relations influenceurs",
    title: "Signer 5 influenceuses françaises et espagnoles en un mois",
    context:
      "Chez Massilia E-consulting, au début de la crise sanitaire : des stocks limités, donc peu de marge de manœuvre avec les influenceuses.",
    action:
      "En un mois, j’ai signé 3 influenceuses françaises et 2 espagnoles. Je gérais aussi les fournisseurs chinois.",
    metrics: [
      {
        id: "influence-partners",
        value: "5",
        label: "influenceuses signées, françaises et espagnoles",
      },
      { id: "influence-time", value: "1 mois", label: "pour signer les cinq partenariats" },
    ],
    gallery: [],
  },
];

export const experiences: readonly Experience[] = [
  {
    id: "experience-logitech",
    brandId: "logitech",
    company: "Logitech",
    location: "France",
    role: "Marketing Manager Assistant",
    period: null,
    description:
      "J’ai travaillé en category management et en trade marketing dans nos top stores : nouvel agencement du rayon informatique, PLV des lancements produits et des Logi Work Days, avec une équipe de 7 merchandisers.",
  },
  {
    id: "experience-cosmeticar",
    brandId: "cosmeticar",
    company: "CosmétiCar",
    location: "France",
    role: "Chargée de communication",
    period: null,
    description:
      "J’ai géré Facebook, Instagram et TikTok pour ce réseau de franchises de lavage auto, et formé à la communication les franchisés des nouvelles agences.",
  },
  {
    id: "experience-massilia",
    brandId: "massilia",
    company: "Massilia E-consulting",
    location: null,
    role: "Chargée de relations influenceurs",
    period: null,
    description:
      "J’ai signé des influenceuses françaises et espagnoles, et géré les fournisseurs chinois au début de la crise sanitaire.",
  },
];

export const education: readonly Education[] = [
  {
    id: "education-ieseg",
    period: "2024 – 2026",
    title: "Master Marketing Digital & Innovation",
    school: "IÉSEG School of Management, Paris",
    institution: "IÉSEG School of Management",
  },
  {
    id: "education-gcu",
    period: "2023 – 2024",
    title: "MSc Luxury Marketing",
    school: "GCU London",
    institution: "GCU London",
  },
  {
    id: "education-essca",
    period: "2019 – 2022",
    title: "Bachelor International Management, spécialisation marketing",
    school: "ESSCA",
    institution: "ESSCA",
  },
  {
    id: "education-dorset",
    period: null,
    title: "Semestre d’échange",
    school: "Dorset College, Dublin",
    institution: "Dorset College",
  },
];

export const skills: readonly SkillGroup[] = [
  {
    id: "marketing-trade",
    title: "Marketing & trade",
    items: ["Category management", "Trade marketing", "PLV en magasin", "Déploiement de campagnes"],
  },
  {
    id: "communication-content",
    title: "Communication & contenus",
    items: [
      "Réseaux sociaux : Facebook, Instagram, TikTok",
      "Relations influenceurs",
      "Création graphique et vidéo",
    ],
  },
  {
    id: "coordination-field",
    title: "Coordination & terrain",
    items: [
      "Management d’une équipe de merchandisers",
      "Formation des franchisés",
      "Relations fournisseurs",
    ],
  },
];

export const tools: readonly Tool[] = [
  { id: "google-workspace", name: "Google Workspace", logo: googleLogo },
  { id: "canva", name: "Canva", logo: toolLogo("canva.svg") },
  { id: "mailchimp", name: "Mailchimp", logo: toolLogo("mailchimp.svg") },
  { id: "capcut", name: "CapCut", logo: null },
  { id: "trello", name: "Trello", logo: toolLogo("trello.svg") },
  { id: "notion", name: "Notion", logo: toolLogo("notion.svg") },
  { id: "photoshop", name: "Photoshop", logo: toolLogo("adobe-photoshop.svg") },
  { id: "premiere-pro", name: "Premiere Pro", logo: toolLogo("adobe-premiere-pro.svg") },
  { id: "imovie", name: "iMovie", logo: null },
];

// Du plus récent au plus ancien. Le TOEIC est présenté une seule fois, dans les langues.
export const certifications: readonly Certification[] = [
  {
    id: "web-development",
    name: "Web Development",
    organization: "Le Wagon",
    year: "2026",
    logo: null,
  },
  {
    id: "ai-product-building",
    name: "AI Product Building",
    organization: null,
    year: "2026",
    logo: null,
  },
  {
    id: "ai-proficiency",
    name: "AI Proficiency",
    organization: "Section",
    year: "2026",
    logo: null,
  },
  {
    id: "google-ads-search",
    name: "Google Ads Search",
    organization: "Google",
    year: "2025",
    logo: googleLogo,
  },
  {
    id: "google-ads-analytics",
    name: "Google Ads Analytics",
    organization: "Google",
    year: "2025",
    logo: googleLogo,
  },
];

export const languages: readonly Language[] = [
  { id: "french", name: "Français", level: "Langue maternelle" },
  { id: "english", name: "Anglais", level: "TOEIC 910 / 990" },
  { id: "spanish", name: "Espagnol", level: "Niveau B2" },
];

export const interests: readonly Interest[] = [
  { id: "travel", label: "voyage" },
  { id: "reading", label: "lecture" },
  { id: "drawing", label: "dessin" },
];

export const recommendations: readonly Recommendation[] = [
  {
    id: "recommendation-01",
    title: "Lettre de recommandation 01",
    documentPath: "documents/recommandation-01.pdf",
  },
  {
    id: "recommendation-02",
    title: "Lettre de recommandation 02",
    documentPath: "documents/recommandation-02.pdf",
  },
];

export const introVideo: IntroVideo | null = {
  id: "presentation-test-1",
  src: "video/presentation.mp4",
  poster: "video/presentation-poster.jpg",
  captions: null,
  width: 720,
  height: 1280,
  durationSeconds: 20,
  title: "Vidéo de test",
  isPlaceholder: true,
};

export const sectionContent = {
  navigation: {
    contactLabel: "Contact",
    menuLabel: "Menu de navigation",
    mainLabel: "Navigation principale",
  },
  hero: {
    lead: "Plus de trois ans en marketing et communication, entre la marque et le terrain : category management et trade marketing chez Logitech, réseaux sociaux chez CosmétiCar, relations influenceurs chez Massilia E-consulting.",
    credentials:
      "Diplômée d’un Master Marketing Digital & Innovation (IÉSEG) et d’un MSc Luxury Marketing (GCU London)",
    linkedinLabel: "LinkedIn",
    primaryAction: "Voir les projets",
    /** Bouton du CV : « Télécharger le » est masqué sur téléphone (« CV »), le nom lu reste complet. */
    cvActionPrefix: "Télécharger le ",
    cvActionLabel: "CV",
    /** Rangée de logos sous les boutons. */
    brandsLabel: "Expériences chez",
    statsLabel: "Chiffres clés",
  },
  about: {
    label: "Parcours",
    title: "Expériences et formation",
    intro:
      "Je suis Fiona, basée à Paris, avec plus de trois ans d’expérience en marketing 360 et en communication. J’ai travaillé dans la tech chez Logitech, dans un réseau de franchises chez CosmétiCar et en relations influenceurs chez Massilia E-consulting. Je me suis formée entre Paris, Londres et Dublin : marketing digital à l’IÉSEG, marketing du luxe à GCU London.",
    interestsLabel: "En dehors du travail",
    experiencesTitle: "Expériences",
    educationTitle: "Formation",
  },
  projects: {
    label: "Projets",
    title: "Des projets concrets.",
    titleAccent: "Des résultats mesurables.",
    description:
      "Quatre missions chez Logitech, CosmétiCar et Massilia E-consulting. Chaque carte mène au détail du projet.",
    contextLabel: "Enjeu",
    actionLabel: "Action",
    resultsLabel: "Résultats",
    /** Appel en bas de chaque carte (lien interne : flèche droite, pas ↗). */
    openLabel: "Voir le projet",
    backLabel: "Tous les projets",
  },
  skills: {
    label: "Compétences",
    title: "Savoir-faire, outils et certifications",
    skillsTitle: "Savoir-faire",
    toolsTitle: "Outils",
    certificationsTitle: "Certifications",
    languagesTitle: "Langues",
  },
  recommendations: {
    label: "Recommandations",
    title: "Deux lettres de recommandation",
    /** Description choisie selon les fichiers renseignés (tous en PDF, aucun, ou une partie). */
    documentsDescription: "Elles s’ouvrent en PDF, dans un nouvel onglet.",
    requestDescription: "Je vous les envoie par e-mail, sur simple demande.",
    mixedDescription: "À lire en PDF ou à demander par e-mail.",
    documentLabel: "PDF",
    openLabel: "Lire la lettre (PDF)",
    requestLabel: "Demander la lettre par e-mail",
    requestSubject: "Demande de recommandation : ",
    requestBody:
      "Bonjour Fiona,\n\nPourriez-vous m’envoyer cette lettre de recommandation ?\n\nMerci,\n",
  },
  contact: {
    label: "Contact",
    title: "Écrivez-moi",
    /** Texte affiché quand `profile.cvPath` est renseigné ; sinon `descriptionWithoutCv`. */
    description:
      "Le plus simple : un e-mail. Vous trouverez aussi mon CV en PDF et mon profil LinkedIn.",
    descriptionWithoutCv: "Le plus simple : un e-mail. Vous trouverez aussi mon profil LinkedIn.",
    linkedinLabel: "LinkedIn",
    cvLabel: "Télécharger le CV (PDF)",
    copyLabel: "Copier l’adresse e-mail",
    copyVisibleLabel: "Copier",
    copiedVisibleLabel: "Copiée",
    copiedLabel: "Adresse e-mail copiée",
    copyErrorLabel:
      "Copie impossible depuis ce navigateur : l’adresse est sélectionnée, vous pouvez la copier vous-même.",
    printLinkedinLabel: "LinkedIn : ",
  },
  introVideo: {
    /** Bouton du hero (rond seul sous 1000 px, libellé gardé pour les lecteurs d’écran). */
    heroLabel: "Ma présentation",
    /** Précision lue après le libellé : « Ma présentation (vidéo, 20 s) ». */
    videoLabel: "vidéo",
    inviteLabel: "Vidéo de présentation",
    watchLabel: "Regarder ma présentation",
    laterLabel: "Plus tard",
    widgetPlayLabel: "Regarder ma présentation",
    widgetDismissLabel: "Masquer la vidéo",
    closeLabel: "Fermer la vidéo",
    errorText: "La vidéo ne se lance pas ici.",
    errorOpenLabel: "Ouvrir le fichier vidéo",
  },
  footer: {
    copyright: "© 2026 Fiona Talbi · Paris",
    linkedinLabel: "LinkedIn",
    topLabel: "Haut de page",
  },
  newTabLabel: " (nouvel onglet)",
} as const;

export const portfolio = {
  profile,
  seo,
  navigation,
  impactStats,
  projects,
  experiences,
  education,
  skills,
  tools,
  certifications,
  languages,
  interests,
  recommendations,
  introVideo,
  sectionContent,
} as const;
