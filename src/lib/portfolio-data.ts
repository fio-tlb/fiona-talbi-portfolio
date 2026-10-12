export const linkedin = 'https://www.linkedin.com/in/fiona-talbi-246407193';
export const navigation = [
  ['Parcours', 'parcours'], ['Projets', 'projets'], ['Compétences', 'competences'],
  ['Formation', 'formation'], ['Certifications', 'certifications'],
] as const;

export const projects = [
  {
    brand: 'logitech', theme: 'catman', category: 'Category Management', title: 'Repenser le rayon. Booster les ventes.',
    context: 'Chez Logitech, faire du rayon informatique un véritable levier de performance dans nos top stores.',
    mission: 'Déploiement de solutions de category management et nouvel agencement des rayons, pour une offre plus lisible et une expérience d’achat optimisée.',
    metrics: [['100+', 'solutions catman déployées'], ['+30 %', 'de ventes grâce au réagencement']],
    details: ['Déployer les nouveaux agencements dans les points de vente prioritaires.', 'Valoriser les produits et améliorer la lisibilité de l’offre.', 'Coordonner la mise en œuvre sur le terrain.'],
  },
  {
    brand: 'logitech', theme: 'trade', category: 'Trade Marketing', title: 'Le bon impact, dès le premier jour.',
    context: 'Des lancements produits aux Logi Work Days : transformer les campagnes Logitech en visibilité concrète en magasin.',
    mission: 'Management d’une équipe de merchandisers aux côtés du responsable ventes terrain et coordination de la disponibilité des supports de PLV.',
    metrics: [['140', 'top stores équipés day one'], ['7', 'merchandisers accompagnés']],
    details: ['Coordonner une équipe de 7 merchandisers avec le responsable ventes terrain.', 'Garantir la présence de la PLV dès le lancement des campagnes.', 'Accompagner les lancements produits et les Logi Work Days.'],
  },
  {
    brand: 'CosmétiCar', theme: 'social', category: 'Communication & Social Media', title: 'Faire grandir une marque de niche.',
    context: 'Développer la présence digitale d’un réseau de franchises spécialisé dans le lavage automobile.',
    mission: 'Gestion de Facebook, Instagram et TikTok, avec un focus Instagram, et formation des nouveaux franchisés à la communication.',
    metrics: [['500+', 'abonnés Instagram en moins d’un an'], ['30', 'formations communication dispensées']],
    details: ['Animer Facebook, Instagram et TikTok avec des contenus adaptés.', 'Accompagner plus de 30 ouvertures d’agence dans l’année.', 'Former les franchisés à la communication et à la présence sur les réseaux sociaux.'],
  },
  {
    brand: 'Massilia', theme: 'influence', category: 'Relations influenceurs', title: 'Créer des liens, au-delà des frontières.',
    context: 'Pour Massilia E-consulting, développer des collaborations en France et en Espagne au début de la crise sanitaire.',
    mission: 'Identification et signature d’influenceuses, suivi des partenariats et gestion des fournisseurs chinois dans un contexte de stocks limités.',
    metrics: [['5', 'influenceuses signées'], ['1 mois', 'pour activer les partenariats']],
    details: ['Signer 3 influenceuses françaises et 2 influenceuses espagnoles.', 'Gérer les échanges avec les fournisseurs chinois au début de la crise sanitaire.', 'Adapter les collaborations aux contraintes de stocks et à une marge de manœuvre réduite.'],
  },
];

export const education = [
  { date: '2024 — 2026', title: 'Master Marketing Digital & Innovation', school: 'IÉSEG School of Management · Paris', description: 'Marketing digital, innovation et stratégie de marque.' },
  { date: '2023 — 2024', title: 'MSc Luxury Marketing', school: 'GCU · Londres', description: 'Marketing du luxe et expérience de marque dans un environnement international.' },
  { date: '2019 — 2022', title: 'Bachelor International Management', school: 'ESSCA · Spécialisation marketing', description: 'Une formation en management international, avec une spécialisation marketing.' },
  { date: 'Semestre d’échange', title: 'Dorset College', school: 'Dublin · Irlande', description: 'Une immersion académique et culturelle anglophone.' },
];

export const skills = [
  { title: 'Marketing & stratégie', items: ['Marketing 360 & trade marketing', 'Category management', 'Déploiement de campagnes', 'Analyse des performances'] },
  { title: 'Communication & création', items: ['Social media & contenus', 'Relations influenceurs', 'Création graphique & vidéo', 'Communication de marque'] },
  { title: 'Coordination & terrain', items: ['Gestion de projet', 'Coordination d’équipes', 'Formation des franchisés', 'Relations fournisseurs'] },
];
export const tools = ['Google Workspace', 'Canva', 'Mailchimp', 'CapCut', 'Trello', 'Notion', 'Photoshop', 'Premiere Pro', 'iMovie'];

export const certifications = [
  { name: 'Web Development', organization: 'Le Wagon', year: '2026', mark: 'LW', style: 'wagon' },
  { name: 'AI Product Building', organization: 'Intelligence artificielle', year: '2026', mark: 'AI', style: '' },
  { name: 'AI Proficiency', organization: 'Section', year: '2026', mark: 'S', style: 'section-logo' },
  { name: 'Google Ads Search', organization: 'Google', year: '2025', mark: 'G', style: '' },
  { name: 'Google Ads Analytics', organization: 'Google', year: '2025', mark: 'G', style: '' },
  { name: 'TOEIC · 910 / 990', organization: 'ETS', year: 'Anglais', mark: 'ETS', style: '' },
];