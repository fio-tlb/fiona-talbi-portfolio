// Contenu public du portfolio : profil, parcours et textes communs.
import type {
  PortfolioProfile,
  PortfolioSeo,
  ErrorScreenContent,
  LogoImage,
  BrandId,
  Brand,
  NavigationItem,
  ImpactStat,
  Experience,
  Education,
  SkillGroup,
  Tool,
  Certification,
  Language,
  Interest,
  Recommendation,
  IntroVideo,
} from "./types";
import { projects } from "./projects";
import { jpegWithAvif } from "./media";
export { projects } from "./projects";
export type * from "./types";

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
    ...jpegWithAvif("images/portrait-fiona-v2.jpg", 1122, 1402, [600, 900, 1122]),
    alt: "Portrait de Fiona Talbi",
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
    logo: { src: "logos/massilia-e-consulting.svg", width: 970, height: 96, scale: 0.92 },
  },
};

// Sections autonomes, dans l’ordre de lecture. #parcours reste l’ancre des expériences
// pour préserver les liens existants et le chiffre « 3+ ans » du hero.
export const navigation: readonly NavigationItem[] = [
  { id: "parcours", label: "Expériences" },
  { id: "projets", label: "Projets" },
  { id: "competences", label: "Compétences" },
  { id: "formation", label: "Formation" },
  { id: "certifications", label: "Certifications" },
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
    primaryAction: "Voir les projets",
    /** Bouton du CV : « Télécharger le » est masqué sur téléphone (« CV »), le nom lu reste complet. */
    cvActionPrefix: "Télécharger le ",
    cvActionLabel: "CV",
    /** Rangée de logos sous les boutons. */
    brandsLabel: "Expériences chez",
    statsLabel: "Chiffres clés",
  },
  about: {
    label: "Expériences",
    title: "Expériences professionnelles",
    intro:
      "Je suis Fiona, basée à Paris, avec plus de trois ans d’expérience en marketing 360 et en communication. J’ai travaillé dans la tech chez Logitech, dans un réseau de franchises chez CosmétiCar et en relations influenceurs chez Massilia E-consulting.",
    interestsLabel: "En dehors du travail",
    experiencesTitle: "Expériences",
    educationTitle: "Formation",
  },
  education: {
    label: "Formation",
    title: "Mon parcours académique",
    description:
      "Je me suis formée entre Paris, Londres et Dublin : marketing digital à l’IÉSEG, marketing du luxe à GCU London.",
  },
  certifications: {
    label: "Certifications",
    title: "Certifications professionnelles",
  },
  projects: {
    label: "Projets",
    title: "Des projets concrets.",
    titleAccent: "Des résultats mesurables.",
    description:
      "Quatre missions chez Logitech, CosmétiCar et Massilia E-consulting. Chaque carte mène au détail du projet.",
    resultsLabel: "Résultats",
    /** Appel en bas de chaque carte (lien interne : flèche droite, pas ↗). */
    openLabel: "Voir le projet",
    backLabel: "Tous les projets",
  },
  /** Page d'un projet (/projets/<id>). */
  projectPage: {
    resultsTitle: "Les résultats",
    contextTitle: "Le contexte",
    missionTitle: "Ma mission",
    detailsTitle: "Ce que j’ai fait",
    companyLabel: "Entreprise",
    roleLabel: "Poste",
    locationLabel: "Lieu",
    galleryTitle: "En images",
    /** Nom des photos-liens : « Agrandir la photo : <texte alternatif> ». */
    enlargeLabel: "Agrandir la photo",
    lightboxLabel: "Photos du projet",
    closeLabel: "Fermer",
    previousPhotoLabel: "Photo précédente",
    nextPhotoLabel: "Photo suivante",
    /** « Photo 2 sur 4 ». */
    photoCounter: { prefix: "Photo ", separator: " sur " },
    pagerLabel: "Autres projets",
    previousLabel: "Projet précédent",
    nextLabel: "Projet suivant",
    contactTitle: "Envie d’en savoir plus ?",
    contactText: "Je vous raconte volontiers ce projet plus en détail, par e-mail ou sur LinkedIn.",
    contactEmailLabel: "M’écrire",
    contactLinkedinLabel: "LinkedIn",
  },
  skills: {
    label: "Compétences",
    title: "Savoir-faire, outils et langues",
    skillsTitle: "Savoir-faire",
    /** Intitulé des outils dans le CV PDF (scripts/share-assets/cv.mjs). */
    toolsTitle: "Outils",
    /** Titre de la carte des outils sur le site. */
    toolboxTitle: "Boîte à outils",
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
    /** Bouton de la carte, à côté de la pilule « PDF » (le titre de la lettre le décrit). */
    openLabel: "Lire la lettre",
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
    /** Modale d’accueil (première visite de l’accueil) : sur-titre, jeu de mots et phrase. */
    welcomeLabel: "Vidéo de présentation",
    welcomeTitle: "On dit qu’une image vaut mille mots…",
    /** `{durée}` est remplacé par la durée de la vidéo (« 20 s », « 1 min 30 s »). */
    welcomeText: "…alors j’ai préféré une vidéo : mon parcours en {durée}, de vive voix.",
    watchLabel: "Voir la vidéo",
    ignoreLabel: "Ignorer",
    /** Bouton flottant en bas à droite, sur toutes les pages, texte visible même sur mobile. */
    fabLabel: "Voir la vidéo",
    /** Suite lue par les lecteurs d’écran : « Voir la vidéo de présentation (20 s) ». */
    fabNameSuffix: "de présentation",
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
