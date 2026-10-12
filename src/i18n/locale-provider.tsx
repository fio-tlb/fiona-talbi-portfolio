import type { ReactNode } from "react";
import { LocaleContext } from "./context";
import type { Locale } from "./locale";

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
