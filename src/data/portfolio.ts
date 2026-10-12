// Contenu public du portfolio : données vérifiables, sans dépendance à l’interface.
export interface PortfolioProfile {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  /** Villes du parcours, affichées sous le nom (« Paris · Londres · Dublin »). */
  places: string;
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
  id: string;
  label: string;
  tier: "primary" | "secondary";
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
export interface Project {
  /** Sert aussi d'ancre (#id) : ne pas le modifier, les chiffres clés du hero y mènent. */
  id: string;
  brand: string;
  category: string;
  title: string;
  /** Enjeu : le contexte en une phrase. */
  context: string;
  /** Action : ce que j'ai fait, à la 1re personne. */
  action: string;
  metrics: readonly Metric[];
}
export interface Experience {
  id: string;
  company: string;
  location: string | null;
  role: string;
  description: string;
}
export interface Education {
  id: string;
  date: string;
  title: string;
  school: string;
  description: string;
}
export interface SkillGroup {
  id: string;
  title: string;
  items: readonly string[];
}
export interface Tool {
  id: string;
  name: string;
}
export interface Certification {
  id: string;
  name: string;
  organization: string;
  year: string | null;
  mark: string;
  style: string;
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
  title: string;
  description?: string;
  documentPath: string | null;
}
export interface SectionHeadingContent {
  /** Sur-titre court, en casse normale. */
  label?: string;
  title: string;
  description?: string;
}

export interface PortfolioSeo {
  title: string;
  description: string;
  socialTitle: string;
  socialDescription: string;
}

export const profile: PortfolioProfile = {
  name: "Fiona Talbi",
  firstName: "Fiona",
  lastName: "Talbi",
  initials: "FT",
  role: "Marketing 360 & communication",
  location: "Paris, France",
  email: "fiona.2001@live.fr",
  linkedin: "https://www.linkedin.com/in/fiona-talbi-246407193",
  places: "Paris · Londres · Dublin",
  portrait: {
    src: "images/portrait-fiona.jpg",
    alt: "Portrait de Fiona Talbi",
    width: 1200,
    height: 1500,
    widths: [600, 900, 1200],
  },
};

export const seo: PortfolioSeo = {
  title: "Fiona Talbi — Portfolio Marketing 360 & Communication",
  description:
    "Fiona Talbi, professionnelle du marketing 360 et de la communication à Paris. Découvrez mes projets chez Logitech, CosmétiCar et Massilia, mes résultats et mon parcours international.",
  socialTitle: "Fiona Talbi — Marketing, créativité & impact",
  socialDescription:
    "Plus de 3 ans d’expérience, +30 % de ventes et 140 top stores activés : découvrez le portfolio de Fiona Talbi.",
};

export const navigation: readonly NavigationItem[] = [
  { id: "projets", label: "Projets", tier: "primary" },
  { id: "parcours", label: "Parcours", tier: "primary" },
  { id: "competences", label: "Compétences", tier: "primary" },
  { id: "formation", label: "Formation", tier: "secondary" },
  { id: "certifications", label: "Certifications", tier: "secondary" },
  { id: "recommandations", label: "Recommandations", tier: "secondary" },
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
  },
  {
    id: "logitech-trade-marketing",
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
  },
  {
    id: "cosmeticar-social-media",
    brand: "CosmétiCar",
    category: "Communication & réseaux sociaux",
    title: "Faire connaître un réseau de lavage auto sur Instagram",
    context:
      "CosmétiCar, réseau de franchises de lavage automobile : une marque de niche, et plus de 30 agences ouvertes dans l’année.",
    action:
      "J’ai géré Facebook, Instagram et TikTok, avec un focus sur Instagram, qui a dépassé 500 abonnés en moins d’un an. J’ai aussi assuré 30 formations communication pour les nouveaux franchisés.",
    metrics: [
      { id: "social-followers", value: "500+", label: "abonnés Instagram en moins d’un an" },
      { id: "social-training", value: "30", label: "formations communication pour les franchisés" },
    ],
  },
  {
    id: "massilia-influencer-relations",
    brand: "Massilia E-consulting",
    category: "Relations influenceurs",
    title: "Signer 5 influenceuses en un mois, en France et en Espagne",
    context:
      "Chez Massilia E-consulting, au début de la crise sanitaire : des stocks limités, donc peu de marge de manœuvre avec les influenceuses.",
    action:
      "En un mois, j’ai signé 3 influenceuses françaises et 2 espagnoles. Je gérais aussi les fournisseurs chinois.",
    metrics: [
      {
        id: "influence-partners",
        value: "5",
        label: "influenceuses signées en France et en Espagne",
      },
      { id: "influence-time", value: "1 mois", label: "pour signer les cinq partenariats" },
    ],
  },
];

export const experiences: readonly Experience[] = [
  {
    id: "experience-logitech",
    company: "Logitech",
    location: "France",
    role: "Marketing Manager Assistant",
    description:
      "Category management, trade marketing et coordination terrain. Déploiement des campagnes et accompagnement d’une équipe de merchandisers.",
  },
  {
    id: "experience-cosmeticar",
    company: "CosmétiCar",
    location: "France",
    role: "Chargée de communication",
    description: "Animation des réseaux sociaux et formation communication des franchisés.",
  },
  {
    id: "experience-massilia",
    company: "Massilia E-consulting",
    location: null,
    role: "Chargée de relations influenceurs",
    description:
      "Partenariats en France et en Espagne, coordination avec les fournisseurs internationaux.",
  },
];

export const education: readonly Education[] = [
  {
    id: "education-ieseg",
    date: "2024 — 2026",
    title: "Master Marketing Digital & Innovation",
    school: "IÉSEG School of Management · Paris",
    description: "Marketing digital, innovation et stratégie de marque.",
  },
  {
    id: "education-gcu",
    date: "2023 — 2024",
    title: "MSc Luxury Marketing",
    school: "GCU · Londres",
    description: "Marketing du luxe et expérience de marque dans un environnement international.",
  },
  {
    id: "education-essca",
    date: "2019 — 2022",
    title: "Bachelor International Management",
    school: "ESSCA · Spécialisation marketing",
    description: "Une formation en management international, avec une spécialisation marketing.",
  },
  {
    id: "education-dorset",
    date: "Semestre d’échange",
    title: "Dorset College",
    school: "Dublin · Irlande",
    description: "Une immersion académique et culturelle anglophone.",
  },
];

export const skills: readonly SkillGroup[] = [
  {
    id: "marketing-strategy",
    title: "Marketing & stratégie",
    items: [
      "Marketing 360 & trade marketing",
      "Category management",
      "Déploiement de campagnes",
      "Analyse des performances",
    ],
  },
  {
    id: "communication-creation",
    title: "Communication & création",
    items: [
      "Social media & contenus",
      "Relations influenceurs",
      "Création graphique & vidéo",
      "Communication de marque",
    ],
  },
  {
    id: "coordination-field",
    title: "Coordination & terrain",
    items: [
      "Gestion de projet",
      "Coordination d’équipes",
      "Formation des franchisés",
      "Relations fournisseurs",
    ],
  },
];

export const tools: readonly Tool[] = [
  { id: "google-workspace", name: "Google Workspace" },
  { id: "canva", name: "Canva" },
  { id: "mailchimp", name: "Mailchimp" },
  { id: "capcut", name: "CapCut" },
  { id: "trello", name: "Trello" },
  { id: "notion", name: "Notion" },
  { id: "photoshop", name: "Photoshop" },
  { id: "premiere-pro", name: "Premiere Pro" },
  { id: "imovie", name: "iMovie" },
];

export const certifications: readonly Certification[] = [
  {
    id: "web-development",
    name: "Web Development",
    organization: "Le Wagon",
    year: "2026",
    mark: "LW",
    style: "wagon",
  },
  {
    id: "ai-product-building",
    name: "AI Product Building",
    organization: "Intelligence artificielle",
    year: "2026",
    mark: "AI",
    style: "",
  },
  {
    id: "ai-proficiency",
    name: "AI Proficiency",
    organization: "Section",
    year: "2026",
    mark: "S",
    style: "section-logo",
  },
  {
    id: "google-ads-search",
    name: "Google Ads Search",
    organization: "Google",
    year: "2025",
    mark: "G",
    style: "",
  },
  {
    id: "google-ads-analytics",
    name: "Google Ads Analytics",
    organization: "Google",
    year: "2025",
    mark: "G",
    style: "",
  },
  {
    id: "toeic",
    name: "TOEIC · 910 / 990",
    organization: "ETS",
    year: null,
    mark: "ETS",
    style: "",
  },
];

export const languages: readonly Language[] = [
  { id: "french", name: "Français", level: "Langue maternelle" },
  { id: "english", name: "Anglais", level: "TOEIC · 910 / 990" },
  { id: "spanish", name: "Espagnol", level: "Niveau B2" },
];

export const interests: readonly Interest[] = [
  { id: "travel", label: "Voyage" },
  { id: "reading", label: "Lecture" },
  { id: "drawing", label: "Dessin" },
];

export const recommendations: readonly Recommendation[] = [
  {
    id: "recommendation-01",
    title: "Lettre de recommandation 01",
    documentPath: null,
  },
  {
    id: "recommendation-02",
    title: "Lettre de recommandation 02",
    documentPath: null,
  },
];

export const sectionContent = {
  navigation: {
    contactLabel: "Contact",
    menuLabel: "Menu de navigation",
    secondaryLabel: "Pour aller plus loin",
  },
  hero: {
    lead: "Plus de trois ans en marketing et communication, entre la marque et le terrain : category management et trade marketing chez Logitech, réseaux sociaux chez CosmétiCar, relations influenceurs chez Massilia E-consulting.",
    credentials:
      "Diplômée d’un Master Marketing Digital & Innovation (IÉSEG) et d’un MSc Luxury Marketing (GCU Londres)",
    linkedinLabel: "LinkedIn",
    primaryAction: "Voir les projets",
    statsLabel: "Chiffres clés",
  },
  about: {
    label: "Mon parcours",
    title: "La curiosité comme moteur. L’impact comme cap.",
    paragraphs: [
      "Basée à Paris, je combine stratégie de marque, créativité et coordination opérationnelle. De la tech au luxe, en passant par les réseaux de franchises, mon parcours s’est construit entre Paris, Londres et Dublin.",
    ],
    experiencesTitle: "Expériences professionnelles",
  },
  projects: {
    label: "Projets",
    title: "Quatre missions chez Logitech, CosmétiCar et Massilia",
    description: "Pour chacune : l’enjeu, ce que j’ai fait et les résultats obtenus.",
    contextLabel: "Enjeu",
    actionLabel: "Action",
    resultsLabel: "Résultats",
  },
  skills: {
    label: "Compétences & outils",
    title: "De la stratégie au terrain. Une approche à 360°.",
    toolsLabel: "Ma boîte à outils",
  },
  education: {
    label: "Formation",
    title: "Apprendre ici. Voir plus loin.",
    description:
      "Un double parcours en marketing digital et en marketing du luxe, nourri d’expériences internationales.",
  },
  certifications: {
    label: "Certifications",
    title: "Toujours en mouvement. Toujours en apprentissage.",
  },
  languages: { title: "Sans frontières.", label: "Langues" },
  recommendations: {
    label: "Recommandations",
    title: "La confiance se construit.",
    description: "Les regards de celles et ceux avec qui j’ai eu le plaisir de travailler.",
    openLabel: "Ouvrir le document",
    requestLabel: "Demander la lettre",
    requestSubject: "Demande de recommandation",
  },
  contact: {
    label: "Et si on échangeait ?",
    title: "Les belles idées commencent",
    accent: "par un échange.",
    description:
      "Un projet, une opportunité ou simplement l’envie de faire connaissance ? Je serai ravie de vous lire.",
    emailLabel: "Écrivez-moi",
    linkedinLabel: "LinkedIn",
    copyLabel: "Copier l’adresse email",
    copiedLabel: "Adresse email copiée",
    copyErrorLabel:
      "Copie indisponible. Vous pouvez sélectionner l’adresse ou m’écrire directement.",
  },
  footer: { signature: "Imaginé avec curiosité, à Paris.", topLabel: "Retour en haut" },
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
  sectionContent,
} as const;
