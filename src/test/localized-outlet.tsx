import { Outlet, useRouterState } from "@tanstack/react-router";
import { localeFromPath } from "@/i18n/locale";
import { LocaleProvider } from "@/i18n/locale-provider";

export function LocalizedTestOutlet() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <LocaleProvider locale={localeFromPath(pathname)}>
      <Outlet />
    </LocaleProvider>
  );
}
