// Génère le CV PDF provisoire public/documents/cv-fiona-talbi.pdf (A4, aux couleurs du site)
// UNIQUEMENT à partir des données de src/data/portfolio.ts. À relancer à la main après chaque
// changement de texte dans portfolio.ts (pas au build) :
//   bun scripts/share-assets/cv.mjs
// Bun lit directement portfolio.ts. Nécessite le module Playwright et Chromium :
//   npm install --no-save playwright && npx playwright install chromium
// ou PLAYWRIGHT_MODULE=/chemin/vers/playwright/index.mjs pour une installation existante.
// Le jour où Fiona fournit son vrai CV, écraser simplement le PDF et ne plus lancer ce script.
import { readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import * as d from "../../src/data/portfolio.ts";

const root = fileURLToPath(new URL("../../", import.meta.url));
const output = root + "public/documents/cv-fiona-talbi.pdf";
const b64 = (f) =>
  "data:font/woff2;base64," +
  readFileSync(root + "node_modules/@fontsource-variable/" + f).toString("base64");
const fonts = `
@font-face{font-family:"Fraunces";font-weight:100 900;src:url("${b64("fraunces/files/fraunces-latin-opsz-normal.woff2")}") format("woff2");}
@font-face{font-family:"Instrument Sans";font-weight:400 700;src:url("${b64("instrument-sans/files/instrument-sans-latin-wght-normal.woff2")}") format("woff2");}
@font-face{font-family:"Instrument Sans";font-weight:400 700;unicode-range:U+0100-024F,U+1E00-1EFF;src:url("${b64("instrument-sans/files/instrument-sans-latin-ext-wght-normal.woff2")}") format("woff2");}
:root{--paper:#f7efe4;--paper-deep:#f1e5d6;--paper-light:#fcf9f3;--ink:#311b1a;--ink-soft:#6f5752;--bordeaux:#7a1e2c;--sky:#b6dcf2;--sky-soft:#e1f2fb;--line:#dacfc3;}
*{box-sizing:border-box;margin:0;padding:0}
html{background:var(--paper-light);color:var(--ink);font-family:"Instrument Sans",sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const p = d.profile;
const c = d.sectionContent;
const siteUrl = d.seo.siteUrl;

const cv = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>CV — ${esc(p.name)}</title><style>${fonts}
@page{size:A4;margin:0}
body{width:210mm;height:297mm;padding:11mm 15mm 8mm;display:flex;flex-direction:column;font-size:9pt;line-height:1.42}
header{display:grid;grid-template-columns:1fr auto;align-items:end;gap:6mm;padding-bottom:5mm;border-bottom:1.5pt solid var(--ink)}
h1{font-family:"Fraunces",serif;font-weight:400;font-size:30pt;line-height:1;letter-spacing:-.02em;font-variation-settings:"opsz" 72}
.role{margin-top:2.5mm;font-family:"Fraunces",serif;font-size:14pt;color:var(--bordeaux);font-variation-settings:"opsz" 24}
.contact{text-align:right;font-size:8.8pt;line-height:1.6;color:var(--ink-soft)}
.contact strong{color:var(--ink);font-weight:600}
.lead{margin-top:4mm;font-size:10pt;line-height:1.5}
.kpis{display:grid;grid-template-columns:repeat(4,1fr);margin-top:5mm;background:var(--sky-soft);border-top:1.5pt solid var(--ink)}
.kpi{padding:3mm 4mm 3.2mm}.kpi+.kpi{border-left:.6pt solid rgba(49,27,26,.15)}
.kpi b{display:block;font-family:"Fraunces",serif;font-weight:400;font-size:18pt;line-height:1;color:var(--bordeaux);white-space:nowrap}
.kpi span{display:block;margin-top:1.5mm;font-size:8pt;line-height:1.35}
.cols{display:grid;grid-template-columns:1fr 62mm;gap:9mm;margin-top:5mm}
h2{font-family:"Fraunces",serif;font-weight:400;font-size:13pt;color:var(--ink);padding-bottom:1.4mm;margin-bottom:2.6mm;border-bottom:.6pt solid var(--line);font-variation-settings:"opsz" 24}
section+section{margin-top:4mm}
.item+.item{margin-top:2.3mm}
.item h3{font-size:10pt;font-weight:600;line-height:1.35}
.meta{font-size:8.8pt;color:var(--ink-soft)}
.item p{margin-top:.8mm}
.proj h3{font-size:9.8pt}
.proj .metrics{display:flex;flex-wrap:wrap;column-gap:4mm;margin-top:.8mm;font-size:8.8pt}.proj .metrics b{font-weight:600;color:var(--bordeaux)}
aside .item h3{font-size:9.4pt}
.period{font-variant-numeric:tabular-nums;font-size:8.6pt;color:var(--ink-soft)}
ul{list-style:none}
aside li{font-size:9pt}
.group+.group{margin-top:2.4mm}.group b{display:block;font-size:9pt;font-weight:600}
.tags{font-size:9pt;line-height:1.55}
.rows li+li{margin-top:.8mm}.rows b,.line b{font-weight:600}
.skills{margin-top:4mm}.groups{display:grid;grid-template-columns:repeat(3,1fr);gap:6mm}.groups .group{margin:0}.group b{margin-bottom:.6mm}
.line{margin-top:2mm}.line b{display:inline-block;min-width:34mm}
footer{margin-top:auto;padding-top:2.5mm;border-top:.6pt solid var(--line);font-size:8pt;color:var(--ink-soft);display:flex;justify-content:space-between}
</style></head><body>
<header><div><h1>${esc(p.name)}</h1><p class="role">${esc(p.role)}</p></div>
<div class="contact"><strong>${esc(p.email)}</strong><br>${esc(p.linkedin.replace("https://www.", ""))}<br>${esc(p.location)}</div></header>
<p class="lead">${esc(c.hero.lead)}</p>
<div class="cols"><main>
<section><h2>${esc(c.about.experiencesTitle)}</h2>${d.experiences.map((e) => `<div class="item"><h3>${esc(e.role)}</h3><p class="meta">${esc(e.company)}${e.location ? " · " + esc(e.location) : ""}${e.period ? " · " + esc(e.period) : ""}</p><p>${esc(e.description)}</p></div>`).join("")}</section>
<section><h2>${esc(c.projects.label)}</h2>${d.projects.map((pr) => `<div class="item proj"><p class="meta">${esc(pr.brand)} · ${esc(pr.category)}</p><h3>${esc(pr.title)}</h3><ul class="metrics">${pr.metrics.map((m) => "<li><b>" + esc(m.value) + "</b> " + esc(m.label) + "</li>").join("")}</ul></div>`).join("")}</section>
</main><aside>
<section><h2>${esc(c.about.educationTitle)}</h2>${d.education.map((e) => `<div class="item">${e.period ? `<p class="period">${esc(e.period)}</p>` : ""}<h3>${esc(e.title)}</h3><p class="meta">${esc(e.school)}</p></div>`).join("")}</section>
<section><h2>${esc(c.skills.certificationsTitle)}</h2><ul class="rows">${d.certifications.map((x) => `<li><b>${esc(x.name)}</b> <span class="meta">${[x.organization, x.year].filter(Boolean).map(esc).join(" · ")}</span></li>`).join("")}</ul></section>
<section><h2>${esc(c.skills.languagesTitle)}</h2><ul class="rows">${d.languages.map((l) => `<li><b>${esc(l.name)}</b> <span class="meta">${esc(l.level)}</span></li>`).join("")}</ul></section>
</aside></div>
<section class="skills"><h2>${esc(c.skills.label)}</h2><div class="groups">${d.skills.map((g) => `<div class="group"><b>${esc(g.title)}</b><span class="tags">${g.items.map(esc).join(" · ")}</span></div>`).join("")}</div>
<p class="line"><b>${esc(c.skills.toolsTitle)}</b> ${d.tools.map((t) => esc(t.name)).join(" · ")}</p>
<p class="line"><b>${esc(c.about.interestsLabel)}</b> ${d.interests.map((i) => esc(i.label[0].toUpperCase() + i.label.slice(1))).join(" · ")}</p></section>
<footer><span>${esc(p.name)} · ${esc(p.role)}</span><span>${esc(siteUrl.replace("https://", ""))}</span></footer>
</body></html>`;

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await page.setContent(cv, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(
    () => document.body.scrollHeight - document.body.clientHeight,
  );
  if (overflow > 0) console.warn(`Attention : le CV dépasse la page A4 de ${overflow} px.`);
  await page.pdf({ path: output, format: "A4", printBackground: true, preferCSSPageSize: true });
} finally {
  await browser.close();
}
console.log(`cv-fiona-talbi.pdf : ${(statSync(output).size / 1024).toFixed(1)} Ko`);
