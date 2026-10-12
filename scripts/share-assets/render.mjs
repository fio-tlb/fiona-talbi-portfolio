// Génère les images de partage à partir des gabarits de ce dossier (à lancer à la main, pas au build) :
//   node scripts/share-assets/render.mjs og-image-v1.jpg
// → public/og-image-v1.jpg (1200 × 630, JPEG < 150 Ko) et public/apple-touch-icon.png (180 × 180).
// Nécessite le module Playwright et Chromium (absents des dépendances du projet) :
//   npm install --no-save playwright && npx playwright install chromium
// ou PLAYWRIGHT_MODULE=/chemin/vers/playwright/index.mjs pour une installation existante.
import { readFileSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const publicDir = fileURLToPath(new URL("../../public/", import.meta.url));
const ogName = process.argv[2] ?? "og-image-v1.jpg";

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");
const browser = await chromium.launch();

try {
  const og = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await og.goto(pathToFileURL(here + "og-image.html").href);
  await og.evaluate(() => document.fonts.ready);
  await og.screenshot({ path: publicDir + ogName, type: "jpeg", quality: 88 });

  // Icône iOS : fond plein (iOS arrondit lui-même les angles), monogramme du favicon centré.
  const favicon = readFileSync(publicDir + "favicon.svg", "utf8");
  const icon = await browser.newPage({
    viewport: { width: 180, height: 180 },
    deviceScaleFactor: 1,
  });
  await icon.setContent(
    `<body style="margin:0;width:180px;height:180px;display:grid;place-items:center;background:#f7efe4">
      <img alt="" width="152" height="152" src="data:image/svg+xml;base64,${Buffer.from(favicon).toString("base64")}">
    </body>`,
  );
  await icon.screenshot({ path: publicDir + "apple-touch-icon.png", type: "png" });
} finally {
  await browser.close();
}

for (const name of [ogName, "apple-touch-icon.png"]) {
  console.log(`${name}: ${(statSync(publicDir + name).size / 1024).toFixed(1)} Ko`);
}
