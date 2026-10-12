import { useContext } from "react";
import { LocaleContext } from "@/i18n/context";
import { getPortfolio } from "@/data/localized";

export function useLocale() {
  return useContext(LocaleContext);
}

export function usePortfolio() {
  return getPortfolio(useLocale());
}
