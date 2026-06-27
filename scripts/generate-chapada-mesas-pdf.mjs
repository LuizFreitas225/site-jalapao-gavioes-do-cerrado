/**
 * Gera PDF consolidado dos roteiros da Chapada das Mesas.
 * Uso: npm run generate:chapada-mesas-pdf
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import sharp from "sharp";
import { packageInfo, routes } from "./chapada-mesas-routes-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "downloads");
const OUT_FILE = path.join(OUT_DIR, "roteiro-chapada-mesas-completo.pdf");
const COVER_IMAGE = path.join(
  ROOT,
  "Site",
  "Site_",
  "Chapada das mesas",
  "6114538A-42E8-4E98-A90B-E2B7894600CC.jpg",
);

async function getCoverImageDataUri() {
  if (!fs.existsSync(COVER_IMAGE)) return null;

  const buf = await sharp(COVER_IMAGE)
    .resize(1600, 2000, { fit: "cover", position: "centre" })
    .jpeg({ quality: 88 })
    .toBuffer();

  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHighlights(items) {
  return items
    .map(
      (h) =>
        `<span class="highlight-tag"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>${esc(h)}</span>`,
    )
    .join("");
}

function renderDay(day) {
  const items = day.items.map((item) => `<li>${esc(item)}</li>`).join("");
  return `
    <div class="day-block">
      <h4>${esc(day.title)}</h4>
      <ul>${items}</ul>
    </div>`;
}

function renderRoute(route) {
  const days = route.days_detail.map(renderDay).join("");
  return `
    <section class="route-section" id="${route.id}">
      <div class="route-header">
        <div class="route-badge">${route.days} dias</div>
        <h2>${esc(route.name)}</h2>
        <p class="route-subtitle">${esc(route.subtitle)}</p>
      </div>
      <div class="route-meta">
        <div class="meta-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          <span><strong>Base:</strong> ${esc(route.base)}</span>
        </div>
      </div>
      <div class="highlights-row">
        <span class="highlights-label">Principais atrativos</span>
        ${renderHighlights(route.highlights)}
      </div>
      <h3 class="itinerary-title">Itinerário detalhado</h3>
      <div class="days-grid">${days}</div>
    </section>`;
}

function renderToc() {
  return routes
    .map(
      (r) =>
        `<li><a href="#${r.id}"><span class="toc-days">${r.days} dias</span><span class="toc-name">${esc(r.name)}</span></a></li>`,
    )
    .join("");
}

function renderPackageList(items, type) {
  const icon =
    type === "included"
      ? `<svg class="icon-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
      : `<svg class="icon-x" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
  return items.map((item) => `<li>${icon}${esc(item)}</li>`).join("");
}

function buildHtml(coverBg) {
  const routeSections = routes.map(renderRoute).join("");
  const bgStyle = coverBg ? `background-image: url('${coverBg}');` : "";
  const routeCount = routes.length;
  const minDays = Math.min(...routes.map((r) => r.days));
  const maxDays = Math.max(...routes.map((r) => r.days));

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Roteiros da Chapada das Mesas — Gaviões do Cerrado</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm 22mm 16mm;
    }
    @page :first {
      margin: 0;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
      color: #2d2319;
      background: #faf6ef;
      font-size: 10.5pt;
      line-height: 1.55;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .cover {
      page-break-after: always;
      min-height: 297mm;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 48px 56px 64px;
      ${bgStyle}
      background-size: cover;
      background-position: center;
    }
    .cover::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(21,34,56,0.55) 0%, rgba(21,34,56,0.82) 55%, rgba(21,34,56,0.95) 100%);
    }
    .cover-content { position: relative; z-index: 1; color: #efe6d8; }
    .cover-kicker {
      font-size: 11pt;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #e3b057;
      font-weight: 600;
      margin-bottom: 16px;
    }
    .cover h1 {
      font-size: 38pt;
      font-weight: 800;
      line-height: 1.05;
      margin-bottom: 8px;
    }
    .cover h1 span { color: #c9a03a; }
    .cover-tagline {
      font-size: 14pt;
      max-width: 420px;
      opacity: 0.92;
      margin-bottom: 32px;
    }
    .cover-stats {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }
    .cover-stat {
      background: rgba(201,160,58,0.18);
      border: 1px solid rgba(201,160,58,0.45);
      border-radius: 12px;
      padding: 12px 20px;
      text-align: center;
    }
    .cover-stat strong {
      display: block;
      font-size: 22pt;
      color: #e3b057;
      line-height: 1.1;
    }
    .cover-stat span { font-size: 9pt; text-transform: uppercase; letter-spacing: 0.1em; }
    .cover-brand {
      position: absolute;
      top: 40px;
      right: 56px;
      z-index: 1;
      text-align: right;
      color: #efe6d8;
      font-size: 9pt;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .cover-brand strong { display: block; font-size: 11pt; color: #c9a03a; margin-top: 4px; }

    .toc-page { page-break-after: always; padding-top: 8px; }
    .section-label {
      font-size: 9pt;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #c9a03a;
      font-weight: 700;
      margin-bottom: 8px;
    }
    h2.page-title {
      font-size: 24pt;
      color: #152238;
      font-weight: 800;
      margin-bottom: 28px;
    }
    .toc-list { list-style: none; border-top: 2px solid #152238; }
    .toc-list li { border-bottom: 1px solid rgba(21,34,56,0.12); }
    .toc-list a {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 4px;
      text-decoration: none;
      color: #2d2319;
    }
    .toc-days {
      background: #152238;
      color: #efe6d8;
      font-size: 8.5pt;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 999px;
      min-width: 72px;
      text-align: center;
    }
    .toc-name { font-weight: 600; font-size: 11pt; color: #152238; }

    .package-page { page-break-after: always; }
    .package-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 8px;
    }
    .package-box {
      background: #fff;
      border-radius: 16px;
      padding: 20px;
      border: 1px solid rgba(21,34,56,0.1);
    }
    .package-box h3 {
      font-size: 11pt;
      color: #152238;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .package-box ul { list-style: none; }
    .package-box li {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      margin-bottom: 8px;
      font-size: 9.5pt;
    }
    .icon-check { width: 16px; height: 16px; fill: #2e7d32; flex-shrink: 0; margin-top: 2px; }
    .icon-x { width: 16px; height: 16px; fill: #c62828; flex-shrink: 0; margin-top: 2px; }
    .package-note {
      margin-top: 20px;
      padding: 16px 20px;
      background: rgba(201,160,58,0.12);
      border-left: 4px solid #c9a03a;
      border-radius: 0 12px 12px 0;
      font-size: 9.5pt;
    }

    .route-section { page-break-before: always; padding-top: 4px; }
    .route-header { margin-bottom: 20px; }
    .route-badge {
      display: inline-block;
      background: #c9a03a;
      color: #152238;
      font-size: 8.5pt;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 999px;
      margin-bottom: 10px;
    }
    .route-header h2 {
      font-size: 22pt;
      color: #152238;
      font-weight: 800;
      line-height: 1.15;
    }
    .route-subtitle {
      font-size: 10.5pt;
      color: #2d2319;
      opacity: 0.85;
      margin-top: 6px;
      max-width: 520px;
    }
    .route-meta { margin-bottom: 16px; }
    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 9.5pt;
    }
    .meta-item svg { width: 18px; height: 18px; fill: #c9a03a; }
    .highlights-row { margin-bottom: 20px; }
    .highlights-label {
      display: block;
      font-size: 8.5pt;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #152238;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .highlight-tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #152238;
      color: #efe6d8;
      font-size: 8pt;
      padding: 4px 10px;
      border-radius: 999px;
      margin: 0 6px 6px 0;
    }
    .highlight-tag svg { width: 10px; height: 10px; fill: #e3b057; }
    .itinerary-title {
      font-size: 12pt;
      color: #152238;
      font-weight: 700;
      margin-bottom: 14px;
      padding-bottom: 6px;
      border-bottom: 2px solid #c9a03a;
    }
    .days-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    .day-block {
      background: #fff;
      border-radius: 12px;
      padding: 14px 16px;
      border: 1px solid rgba(21,34,56,0.08);
      break-inside: avoid;
    }
    .day-block h4 {
      font-size: 9.5pt;
      color: #fff;
      background: #152238;
      display: inline-block;
      padding: 3px 10px;
      border-radius: 6px;
      margin-bottom: 10px;
      font-weight: 700;
    }
    .day-block ul { list-style: none; font-size: 8.8pt; }
    .day-block li {
      padding: 3px 0 3px 14px;
      position: relative;
      border-bottom: 1px solid rgba(21,34,56,0.06);
    }
    .day-block li:last-child { border-bottom: none; }
    .day-block li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 10px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #c9a03a;
    }

    .footer-page {
      page-break-before: always;
      text-align: center;
      padding-top: 80px;
    }
    .footer-page h2 { font-size: 20pt; color: #152238; margin-bottom: 12px; }
    .footer-page p { font-size: 11pt; margin-bottom: 8px; }
    .footer-url {
      font-size: 13pt;
      color: #c9a03a;
      font-weight: 700;
      letter-spacing: 0.04em;
    }
    .footer-note { font-size: 9pt; opacity: 0.7; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="cover">
    <div class="cover-brand">
      Chapada das Mesas
      <strong>Gaviões do Cerrado</strong>
    </div>
    <div class="cover-content">
      <p class="cover-kicker">Ecoturismo &amp; aventura no Maranhão</p>
      <h1><span>Roteiros</span> da Chapada das Mesas</h1>
      <p class="cover-tagline">Guia completo com opções de expedição — cachoeiras, poços naturais e mirantes da chapada amazônica.</p>
      <div class="cover-stats">
        <div class="cover-stat"><strong>${routeCount}</strong><span>Roteiros</span></div>
        <div class="cover-stat"><strong>${minDays}–${maxDays}</strong><span>Dias</span></div>
        <div class="cover-stat"><strong>15+</strong><span>Atrativos</span></div>
      </div>
    </div>
  </div>

  <div class="toc-page">
    <p class="section-label">Navegação</p>
    <h2 class="page-title">Sumário</h2>
    <ul class="toc-list">
      <li><a href="#pacote"><span class="toc-days">Info</span><span class="toc-name">Informações do pacote</span></a></li>
      ${renderToc()}
    </ul>
  </div>

  <div class="package-page" id="pacote">
    <p class="section-label">Antes de viajar</p>
    <h2 class="page-title">Informações do pacote</h2>
    <div class="package-grid">
      <div class="package-box">
        <h3><svg class="icon-check" viewBox="0 0 24 24" style="width:20px;height:20px"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Incluso ao pacote</h3>
        <ul>${renderPackageList(packageInfo.included, "included")}</ul>
      </div>
      <div class="package-box">
        <h3><svg class="icon-x" viewBox="0 0 24 24" style="width:20px;height:20px"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg> Não incluso ao pacote</h3>
        <ul>${renderPackageList(packageInfo.notIncluded, "notIncluded")}</ul>
      </div>
    </div>
    <p class="package-note">
      <strong>Observação:</strong> Os quartos podem ser duplos ou triplos; quarto individual sob taxa extra. Horários e ordem dos passeios podem ser ajustados conforme condições climáticas, disponibilidade e perfil do grupo.
    </p>
  </div>

  ${routeSections}

  <div class="footer-page">
    <h2>Pronto para viver a Chapada das Mesas?</h2>
    <p>Fale conosco pelo WhatsApp e monte sua expedição ideal.</p>
    <p class="footer-url">www.jalapaogavioesdocerrado.com.br</p>
    <p class="footer-note">Jalapão Gaviões do Cerrado · Guia credenciado MTur · Tocantins &amp; Maranhão, Brasil</p>
  </div>
</body>
</html>`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const coverBg = await getCoverImageDataUri();
  const html = buildHtml(coverBg);
  const tmpHtml = path.join(OUT_DIR, "_chapada-preview.html");
  fs.writeFileSync(tmpHtml, html, "utf8");

  const browser = await puppeteer.launch({
    headless: true,
    timeout: 120000,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  await page.pdf({
    path: OUT_FILE,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
    margin: { top: "18mm", right: "16mm", bottom: "22mm", left: "16mm" },
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: `
      <div style="width:100%;font-size:8px;color:#152238;padding:0 16mm;display:flex;justify-content:space-between;font-family:Segoe UI,sans-serif;">
        <span>Jalapão Gaviões do Cerrado · Chapada das Mesas</span>
        <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
      </div>`,
  });

  await browser.close();
  fs.unlinkSync(tmpHtml);

  const oldPdf = path.join(OUT_DIR, "roteiro-chapada-mesas-5-dias.pdf");
  if (fs.existsSync(oldPdf)) {
    fs.unlinkSync(oldPdf);
  }

  const stats = fs.statSync(OUT_FILE);
  console.log(`PDF gerado: ${OUT_FILE} (${(stats.size / 1024).toFixed(0)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
