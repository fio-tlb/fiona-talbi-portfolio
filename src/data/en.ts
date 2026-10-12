import { portfolio as original } from "./portfolio";
import { documentPaths } from "./documents";
import { projects } from "./projects/en";
import type { PortfolioData } from "./localized";

/** Une nouvelle entrée doit être traduite explicitement : aucun repli français silencieux. */
function requiredTranslation<T>(translations: Readonly<Record<string, T>>, id: string): T {
  const translation = translations[id];
  if (translation === undefined) throw new Error("Missing English translation: " + id);
  return translation;
}

const english: PortfolioData = {
  ...original,
  documents: documentPaths.en,
  profile: {
    ...original.profile,
    role: "360° marketing & communications",
    places: "Paris · London · Dublin",
    cvPath: documentPaths.en.cv,
    portrait: original.profile.portrait && {
      ...original.profile.portrait,
      alt: "Portrait of Fiona Talbi",
    },
  },
  seo: {
    ...original.seo,
    locale: "en_GB",
    title: "Fiona Talbi — 360° marketing & communications portfolio",
    description:
      "Fiona Talbi’s marketing and communications portfolio: Logitech, CosmétiCar and Massilia projects, measurable results and an international background.",
    socialTitle: "Fiona Talbi — 360° marketing & communications, Paris",
    socialDescription:
      "Projects for Logitech, CosmétiCar and Massilia: +30% sales, 140 top stores equipped on launch day and 500+ Instagram followers in under a year.",
    ogImage: "og-image-en-v1.jpg",
    ogImageAlt:
      "Fiona Talbi, marketing and communications in Paris: +30% sales and 140 top stores equipped at Logitech, 500+ Instagram followers for CosmétiCar.",
  },
  errorContent: {
    notFound: {
      eyebrow: "Error 404",
      title: "Page not found",
      description: "This page does not exist or has moved. You can still explore my portfolio.",
      homeLabel: "Back to my portfolio",
      contactLabel: "Or email me:",
    },
    error: {
      eyebrow: "Loading error",
      title: "The page could not be loaded",
      description:
        "Something went wrong while displaying this page. You can try again or return to my portfolio.",
      homeLabel: "Back to my portfolio",
      contactLabel: "Or email me:",
    },
    retryLabel: "Try again",
    documentTitleSuffix: " — Fiona Talbi",
  },
  navigation: [
    { id: "parcours", label: "Experience" },
    { id: "projets", label: "Projects" },
    { id: "competences", label: "Skills" },
    { id: "formation", label: "Education" },
    { id: "certifications", label: "Certifications" },
    { id: "recommandations", label: "References" },
  ],
  impactStats: original.impactStats.map((stat) => {
    const translations: Record<string, { value?: string; label: string; source?: string }> = {
      "sales-growth": { value: "+30%", label: "sales growth in the computing aisle" },
      "stores-activated": { label: "top stores equipped with POS displays on launch day" },
      "instagram-community": {
        label: "Instagram followers in less than a year",
        source: "CosmétiCar · Social media",
      },
      "marketing-experience": { value: "3+ years", label: "in marketing and communications" },
    };
    return { ...stat, ...requiredTranslation(translations, stat.id) };
  }),
  experiences: original.experiences.map((item) => {
    const translations: Record<string, { role: string; description: string }> = {
      "experience-logitech": {
        role: "Marketing Manager Assistant",
        description:
          "I worked on category management and trade marketing in our top stores: redesigning the computing aisle and rolling out POS displays for product launches and Logi Work Days, with a team of seven merchandisers.",
      },
      "experience-cosmeticar": {
        role: "Communications Officer",
        description:
          "I managed Facebook, Instagram and TikTok for this car wash franchise network and trained new franchisees in communications.",
      },
      "experience-massilia": {
        role: "Influencer Relations Officer",
        description:
          "I signed French and Spanish influencers and managed relationships with Chinese suppliers at the start of the pandemic.",
      },
    };
    return { ...item, ...requiredTranslation(translations, item.id) };
  }),
  education: original.education.map((item) => {
    const titles: Record<string, string> = {
      "education-ieseg": "Master’s in Digital Marketing & Innovation",
      "education-gcu": "MSc Luxury Marketing",
      "education-essca": "Bachelor’s in International Management, Marketing specialisation",
      "education-dorset": "Exchange semester",
    };
    return { ...item, title: requiredTranslation(titles, item.id) };
  }),
  skills: [
    {
      id: "marketing-trade",
      title: "Marketing & trade",
      items: [
        "Category management",
        "Trade marketing",
        "In-store POS displays",
        "Campaign rollout",
      ],
    },
    {
      id: "communication-content",
      title: "Communications & content",
      items: [
        "Social media: Facebook, Instagram, TikTok",
        "Influencer relations",
        "Graphic design and video creation",
      ],
    },
    {
      id: "coordination-field",
      title: "Coordination & field operations",
      items: ["Managing a team of merchandisers", "Franchisee training", "Supplier relations"],
    },
  ],
  languages: [
    { id: "french", name: "French", level: "Native language" },
    { id: "english", name: "English", level: "TOEIC 910/990" },
    { id: "spanish", name: "Spanish", level: "B2 level" },
  ],
  interests: [
    { id: "travel", label: "travel" },
    { id: "reading", label: "reading" },
    { id: "drawing", label: "drawing" },
  ],
  recommendations: original.recommendations.map((item, index) => ({
    ...item,
    title: "Reference letter " + String(index + 1).padStart(2, "0"),
    documentPath: documentPaths.en.recommendations[item.id] ?? null,
  })),
  introVideo: original.introVideo && { ...original.introVideo, title: "Test video" },
  projects,
  sectionContent: {
    navigation: {
      homeLabel: "home",
      languageLabel: "Language",
      languageTitle: "Site language",
      contactLabel: "Contact",
      menuLabel: "Navigation menu",
      mainLabel: "Main navigation",
    },
    hero: {
      lead: "Over three years in marketing and communications, connecting brands with the field: category management and trade marketing at Logitech, social media at CosmétiCar, and influencer relations at Massilia E-consulting.",
      credentials:
        "Graduated with a Master’s in Digital Marketing & Innovation (IÉSEG) and an MSc in Luxury Marketing (GCU London)",
      primaryAction: "Explore my projects",
      cvActionPrefix: "Download ",
      cvActionLabel: "CV",
      brandsLabel: "Experience at",
      statsLabel: "Key figures",
    },
    about: {
      label: "Experience",
      title: "Professional experience",
      intro:
        "I’m Fiona, based in Paris, with over three years of experience in 360° marketing and communications. I’ve worked in tech at Logitech, in a franchise network at CosmétiCar, and in influencer relations at Massilia E-consulting.",
      interestsLabel: "Outside work",
      experiencesTitle: "Experience",
      educationTitle: "Education",
    },
    education: {
      label: "Education",
      title: "My academic background",
      description:
        "My studies took me to Paris, London and Dublin: digital marketing at IÉSEG and luxury marketing at GCU London.",
    },
    certifications: { label: "Certifications", title: "Professional certifications" },
    projects: {
      label: "Projects",
      title: "Real projects.",
      titleAccent: "Measurable results.",
      description:
        "Four projects at Logitech, CosmétiCar and Massilia E-consulting. Open a card to explore the project in detail.",
      resultsLabel: "Results",
      openLabel: "Explore the project",
      backLabel: "All projects",
    },
    projectPage: {
      resultsTitle: "The results",
      contextTitle: "The context",
      missionTitle: "My role",
      detailsTitle: "What I did",
      companyLabel: "Company",
      roleLabel: "Position",
      locationLabel: "Location",
      galleryTitle: "In pictures",
      enlargeLabel: "Enlarge photo",
      lightboxLabel: "Project photos",
      closeLabel: "Close",
      previousPhotoLabel: "Previous photo",
      nextPhotoLabel: "Next photo",
      photoCounter: { prefix: "Photo ", separator: " of " },
      pagerLabel: "Other projects",
      previousLabel: "Previous project",
      nextLabel: "Next project",
      contactTitle: "Want to know more?",
      contactText: "I’d be happy to tell you more about this project by email or on LinkedIn.",
      contactEmailLabel: "Email me",
      contactLinkedinLabel: "LinkedIn",
    },
    skills: {
      label: "Skills",
      title: "Expertise, tools and languages",
      skillsTitle: "Expertise",
      toolsTitle: "Tools",
      toolboxTitle: "My toolkit",
      certificationsTitle: "Certifications",
      languagesTitle: "Languages",
    },
    recommendations: {
      label: "References",
      title: "Two reference letters",
      documentsDescription: "Read them as PDFs in a new tab.",
      requestDescription: "I can send them to you by email on request.",
      mixedDescription: "Read a PDF or request a letter by email.",
      documentLabel: "PDF",
      openLabel: "Read the letter",
      requestLabel: "Request the letter by email",
      requestSubject: "Reference request: ",
      requestBody:
        "Hello Fiona,\n\nCould you please send me this reference letter?\n\nThank you,\n",
    },
    contact: {
      label: "Contact",
      title: "Get in touch",
      description:
        "Email is the easiest way to reach me. You can also download my CV and visit my LinkedIn profile.",
      descriptionWithoutCv:
        "Email is the easiest way to reach me. You can also visit my LinkedIn profile.",
      linkedinLabel: "LinkedIn",
      cvLabel: "Download CV (PDF)",
      coverLetterLabel: "Cover letter (PDF)",
      copyLabel: "Copy email address",
      copyVisibleLabel: "Copy",
      copiedVisibleLabel: "Copied",
      copiedLabel: "Email address copied",
      copyErrorLabel:
        "Your browser could not copy the address. It has been selected so you can copy it manually.",
      printLinkedinLabel: "LinkedIn: ",
    },
    introVideo: {
      welcomeLabel: "Introduction video",
      welcomeTitle: "They say a picture is worth a thousand words…",
      welcomeText: "…so I chose a video: my story in {durée}, in my own words.",
      watchLabel: "Watch the video",
      ignoreLabel: "Skip",
      fabLabel: "Watch the video",
      fabNameSuffix: "introduction",
      closeLabel: "Close the video",
      errorText: "The video could not be played here.",
      errorOpenLabel: "Open the video file",
    },
    footer: {
      copyright: "© 2026 Fiona Talbi · Paris",
      linkedinLabel: "LinkedIn",
      topLabel: "Back to top",
    },
    newTabLabel: " (opens in a new tab)",
    skipLabel: "Skip to content",
  },
};

export default english;
