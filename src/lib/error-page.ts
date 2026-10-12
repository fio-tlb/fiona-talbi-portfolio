import { getPortfolio } from "@/data/localized";
import { localizedPath, type Locale } from "@/i18n/locale";

// Page de secours renvoyée par src/server.ts quand le rendu serveur échoue (aperçu Lovable,
// serveur Node) : HTML autonome, sans JavaScript ni police à charger, aux couleurs du site.
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!,
  );

export function renderErrorPage(locale: Locale = "fr"): string {
  const { errorContent, profile } = getPortfolio(locale);
  const content = errorContent.error;
  const home = escapeHtml(localizedPath("/", locale));
  const email = escapeHtml(profile.email);

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(content.title + errorContent.documentTitleSuffix)}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <meta name="theme-color" content="#f7efe4" />
    <style>
      body { margin: 0; min-height: 100vh; background: #f7efe4; color: #311b1a; font: 17px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; }
      main { width: min(36rem, 100% - 40px); margin: 0 auto; padding: 18vh 0 64px; }
      .eyebrow { margin: 0 0 12px; font-size: 15px; font-weight: 600; color: #6f5752; }
      h1 { margin: 0; font: 400 clamp(34px, 6vw, 52px)/1.1 Georgia, "Times New Roman", serif; letter-spacing: -0.02em; }
      p { margin: 16px 0 0; color: #6f5752; }
      .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
      .actions a, .actions button { display: inline-flex; align-items: center; min-height: 48px; padding: 0 20px; border-radius: 8px; border: 1px solid #7a1e2c; font-family: inherit; font-size: 15px; font-weight: 600; line-height: 1; text-decoration: none; cursor: pointer; }
      .primary { background: #7a1e2c; color: #fcf9f3; }
      .secondary { background: transparent; color: #311b1a; border-color: #c0b4ab; }
      .contact a { color: #7a1e2c; text-underline-offset: 3px; }
      :focus-visible { outline: 2px solid #7a1e2c; outline-offset: 3px; }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">${escapeHtml(content.eyebrow)}</p>
      <h1>${escapeHtml(content.title)}</h1>
      <p>${escapeHtml(content.description)}</p>
      <div class="actions">
        <button type="button" class="primary" onclick="location.reload()">${escapeHtml(errorContent.retryLabel)}</button>
        <a class="secondary" href="${home}">${escapeHtml(content.homeLabel)}</a>
      </div>
      <p class="contact">${escapeHtml(content.contactLabel)} <a href="mailto:${email}">${email}</a></p>
    </main>
  </body>
</html>`;
}
