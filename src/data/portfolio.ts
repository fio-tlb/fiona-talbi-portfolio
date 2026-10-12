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
  experience: string;
  internationalLabel: string;
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
  company: string;
}
export interface Project {
  id: string;
  brandId: string;
  brand: string;
  theme: string;
  category: string;
  title: string;
  context: string;
  mission: string;
  metrics: readonly Metric[];
  details: readonly string[];
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
  /** Nom exact de l’établissement, repris tel quel dans les données structurées (JSON-LD). */
  institution: string;
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
export interface Brand {
  id: string;
  name: string;
  displayName: string;
}
export interface SectionHeadingContent {
  number: string;
  label: string;
  title: string;
  accent?: string;
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

export const profile: PortfolioProfile = {
  name: "Fiona Talbi",
  firstName: "Fiona",
  lastName: "Talbi",
  initials: "FT",
  role: "Marketing 360 & Communication",
  location: "Paris, France",
  email: "fiona.2001@live.fr",
  linkedin: "https://www.linkedin.com/in/fiona-talbi-246407193",
  experience: "Plus de 3 ans d’expérience",
  internationalLabel: "Un parcours international",
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
    value: "+30 %",
    label: "de ventes grâce au réagencement",
    company: "Logitech · Category management",
  },
  {
    id: "stores-activated",
    value: "140",
    label: "top stores activés day one",
    company: "Logitech · Trade marketing",
  },
  {
    id: "instagram-community",
    value: "500+",
    label: "abonnés Instagram en moins d’un an",
    company: "CosmétiCar · Social media",
  },
  {
    id: "marketing-experience",
    value: "3+ ans",
    label: "en marketing & communication",
    company: "Un parcours international",
  },
];

export const projects: readonly Project[] = [
  {
    id: "logitech-category-management",
    brandId: "logitech",
    brand: "Logitech",
    theme: "catman",
    category: "Category Management",
    title: "Repenser le rayon. Booster les ventes.",
    context:
      "Chez Logitech, faire du rayon informatique un véritable levier de performance dans nos top stores.",
    mission:
      "Déploiement de solutions de category management et nouvel agencement des rayons, pour une offre plus lisible et une expérience d’achat optimisée.",
    metrics: [
      { id: "catman-solutions", value: "100+", label: "solutions catman déployées" },
      { id: "catman-sales", value: "+30 %", label: "de ventes grâce au réagencement" },
    ],
    details: [
      "Déployer les nouveaux agencements dans les points de vente prioritaires.",
      "Valoriser les produits et améliorer la lisibilité de l’offre.",
      "Coordonner la mise en œuvre sur le terrain.",
    ],
  },
  {
    id: "logitech-trade-marketing",
    brandId: "logitech",
    brand: "Logitech",
    theme: "trade",
    category: "Trade Marketing",
    title: "Le bon impact, dès le premier jour.",
    context:
      "Des lancements produits aux Logi Work Days : transformer les campagnes Logitech en visibilité concrète en magasin.",
    mission:
      "Management d’une équipe de merchandisers aux côtés du responsable ventes terrain et coordination de la disponibilité des supports de PLV.",
    metrics: [
      { id: "trade-stores", value: "140", label: "top stores équipés day one" },
      { id: "trade-merchandisers", value: "7", label: "merchandisers accompagnés" },
    ],
    details: [
      "Coordonner une équipe de 7 merchandisers avec le responsable ventes terrain.",
      "Garantir la présence de la PLV dès le lancement des campagnes.",
      "Accompagner les lancements produits et les Logi Work Days.",
    ],
  },
  {
    id: "cosmeticar-social-media",
    brandId: "cosmeticar",
    brand: "CosmétiCar",
    theme: "social",
    category: "Communication & Social Media",
    title: "Faire grandir une marque de niche.",
    context:
      "Développer la présence digitale d’un réseau de franchises spécialisé dans le lavage automobile.",
    mission:
      "Gestion de Facebook, Instagram et TikTok, avec un focus Instagram, et formation des nouveaux franchisés à la communication.",
    metrics: [
      { id: "social-followers", value: "500+", label: "abonnés Instagram en moins d’un an" },
      { id: "social-training", value: "30", label: "formations communication dispensées" },
    ],
    details: [
      "Animer Facebook, Instagram et TikTok avec des contenus adaptés.",
      "Accompagner plus de 30 ouvertures d’agence dans l’année.",
      "Former les franchisés à la communication et à la présence sur les réseaux sociaux.",
    ],
  },
  {
    id: "massilia-influencer-relations",
    brandId: "massilia",
    brand: "Massilia E-consulting",
    theme: "influence",
    category: "Relations influenceurs",
    title: "Créer des liens, au-delà des frontières.",
    context:
      "Pour Massilia E-consulting, développer des collaborations en France et en Espagne au début de la crise sanitaire.",
    mission:
      "Identification et signature d’influenceuses, suivi des partenariats et gestion des fournisseurs chinois dans un contexte de stocks limités.",
    metrics: [
      { id: "influence-partners", value: "5", label: "influenceuses signées" },
      { id: "influence-time", value: "1 mois", label: "pour activer les partenariats" },
    ],
    details: [
      "Signer 3 influenceuses françaises et 2 influenceuses espagnoles.",
      "Gérer les échanges avec les fournisseurs chinois au début de la crise sanitaire.",
      "Adapter les collaborations aux contraintes de stocks et à une marge de manœuvre réduite.",
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
    institution: "IÉSEG School of Management",
    description: "Marketing digital, innovation et stratégie de marque.",
  },
  {
    id: "education-gcu",
    date: "2023 — 2024",
    title: "MSc Luxury Marketing",
    school: "GCU · Londres",
    institution: "GCU",
    description: "Marketing du luxe et expérience de marque dans un environnement international.",
  },
  {
    id: "education-essca",
    date: "2019 — 2022",
    title: "Bachelor International Management",
    school: "ESSCA · Spécialisation marketing",
    institution: "ESSCA",
    description: "Une formation en management international, avec une spécialisation marketing.",
  },
  {
    id: "education-dorset",
    date: "Semestre d’échange",
    title: "Dorset College",
    school: "Dublin · Irlande",
    institution: "Dorset College",
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

export const brands: readonly Brand[] = [
  { id: "logitech", name: "Logitech", displayName: "logitech." },
  { id: "cosmeticar", name: "CosmétiCar", displayName: "CosmétiCar" },
  { id: "massilia", name: "Massilia E-consulting", displayName: "Massilia" },
];

export const sectionContent = {
  navigation: {
    contactLabel: "Contact",
    menuLabel: "Menu de navigation",
    secondaryLabel: "Pour aller plus loin",
  },
  hero: {
    eyebrow: "Marketing 360 · Communication · Créativité",
    title: "De l’idée",
    accent: "à l’impact.",
    description:
      "J’allie stratégie, création et coordination terrain pour faire rayonner les marques.",
    primaryAction: "Voir les projets",
    secondaryAction: "Contact",
    statsLabel: "Mes résultats en chiffres",
    visualCaption: "Stratégie. Créativité. Impact.",
  },
  career: {
    label: "Parcours professionnel",
    title: "Des marques. Du terrain. De l’impact.",
  },
  about: {
    number: "02",
    label: "Mon parcours",
    title: "La curiosité comme moteur.",
    accent: "L’impact comme cap.",
    paragraphs: [
      "Basée à Paris, je combine stratégie de marque, créativité et coordination opérationnelle. De la tech au luxe, en passant par les réseaux de franchises, mon parcours s’est construit entre Paris, Londres et Dublin.",
    ],
    experiencesTitle: "Expériences professionnelles",
  },
  projects: {
    number: "01",
    label: "Projets sélectionnés",
    title: "Des projets concrets.",
    accent: "Des résultats mesurables.",
    description:
      "Quatre expériences où la stratégie rencontre le terrain, la création et la performance.",
    missionLabel: "Mes missions",
    detailsLabel: "Voir les missions",
    resultsLabel: "Résultats",
  },
  skills: {
    number: "03",
    label: "Compétences & outils",
    title: "De la stratégie au terrain.",
    accent: "Une approche à 360°.",
    toolsLabel: "Ma boîte à outils",
  },
  education: {
    number: "04",
    label: "Formation",
    title: "Apprendre ici.",
    accent: "Voir plus loin.",
    description:
      "Un double parcours en marketing digital et en marketing du luxe, nourri d’expériences internationales.",
  },
  certifications: {
    number: "05",
    label: "Certifications",
    title: "Toujours en mouvement.",
    accent: "Toujours en apprentissage.",
  },
  languages: { title: "Sans frontières.", label: "Langues" },
  recommendations: {
    number: "06",
    label: "Recommandations",
    title: "La confiance se construit.",
    description: "Les regards de celles et ceux avec qui j’ai eu le plaisir de travailler.",
    openLabel: "Ouvrir le document",
    requestLabel: "Demander la lettre",
    requestSubject: "Demande de recommandation",
  },
  contact: {
    number: "07",
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
  brands,
} as const;
