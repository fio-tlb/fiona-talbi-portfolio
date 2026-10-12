import { portfolio } from "./portfolio";
import english from "./en";
import type { Locale } from "../i18n/locale";

/** Les clés sont partagées ; seules les chaînes littérales françaises sont élargies. */
type Texts<T> = T extends string ? string : T extends object ? { [K in keyof T]: Texts<T[K]> } : T;
export type PortfolioData = Omit<typeof portfolio, "sectionContent" | "errorContent"> & {
  sectionContent: Texts<typeof portfolio.sectionContent>;
  errorContent: Texts<typeof portfolio.errorContent>;
};

export function getPortfolio(locale: Locale): PortfolioData {
  return locale === "en" ? english : portfolio;
}
