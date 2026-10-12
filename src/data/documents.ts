import type { Locale } from "../i18n/locale";

export type DocumentPaths = {
  cv: string | null;
  coverLetter: string | null;
  recommendations: Readonly<Record<string, string | null>>;
};

/** Fichiers relatifs à public/. Renseigner chaque langue après avoir ajouté son PDF. */
export const documentPaths: Readonly<Record<Locale, DocumentPaths>> = {
  fr: {
    cv: "documents/cv-fiona-talbi.pdf",
    coverLetter: null,
    recommendations: {
      "recommendation-01": "documents/recommandation-01.pdf",
      "recommendation-02": "documents/recommandation-02.pdf",
    },
  },
  en: {
    cv: "documents/cv-fiona-talbi-en.pdf",
    coverLetter: null,
    recommendations: {
      "recommendation-01": null,
      "recommendation-02": null,
    },
  },
};
