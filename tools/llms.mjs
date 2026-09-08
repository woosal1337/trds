#!/usr/bin/env node
// llms.txt ve llms-full.txt üretir. Kaynak: kayıt defteri, tanımlar, çekirdek
// betiği, doğrulayıcılar ve belirteçler. Elle yazılmış hiçbir bileşen listesi
// yoktur, bu yüzden dosyalar eskimez.
//
//   node tools/llms.mjs
//
// Çıktı: llms.txt ve llms-full.txt, depo kökünde ve belge sitesinde.
// Biçim: https://llmstxt.org — H1, özet alıntısı, bölümler ve bağlantılar.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BILESENLER, GRUPLAR, ENTEGRASYONLAR, OZGUN_BILESENLER } from './registry/00-index.mjs';
import { TANIMLAR, SARMALAYICISIZ } from '../packages/tanim/src/index.js';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const oku = (yol) => readFile(join(KOK, yol), 'utf8');

const DEPO = 'https://github.com/woosal1337/trds';
const SITE = 'https://trds.chele.bi';

const tanimHaritasi = new Map(TANIMLAR.map((t) => [t.id, t]));
const grupAdi = Object.fromEntries(GRUPLAR.map((g) => [g.id, g.ad]));

// ----------------------------------------------------------------- yardımcı
const jsxDeger = (v) => {
  if (typeof v === 'string') return `"${v.replace(/"/g, '&quot;')}"`;
  return `{${JSON.stringify(v)}}`;
};
const jsxOrnek = (ad, ornek) => {
  const { children, ...kalan } = ornek ?? {};
  const ozellikler = Object.entries(kalan).map(([k, v]) => ` ${k}=${jsxDeger(v)}`).join('');
  return children !== undefined && typeof children === 'string'
    ? `<${ad}${ozellikler}>${children}</${ad}>`
    : `<${ad}${ozellikler} />`;
};
const vueOrnek = (ad, ornek) => {
  const { children, ...kalan } = ornek ?? {};
  const ozellikler = Object.entries(kalan).map(([k, v]) => (typeof v === 'string' ? ` ${k}="${v.replace(/"/g, '&quot;')}"` : ` :${k}='${JSON.stringify(v)}'`)).join('');
  return children !== undefined && typeof children === 'string'
    ? `<Kiris${ad}${ozellikler}>${children}</Kiris${ad}>`
    : `<Kiris${ad}${ozellikler} />`;
};
const varlikYolu = (html) => html.replace(/\{\{VARLIK\}\}/g, '/kiris/');

const davranisOznitelikleri = (html) => {
  const bulunan = new Set();
  for (const m of html.matchAll(/\s(data-[a-z-]+)(?:="[^"]*")?/g)) bulunan.add(m[1]);
  return [...bulunan].filter((d) => d !== 'data-kiris');
};

// ------------------------------------------------------------------ kaynak
const cekirdekJs = await oku('packages/core/src/scripts/kiris.js');
const baslaticilar = [...cekirdekJs.matchAll(/^export function ([a-zA-Z]+)Baslat\(/gm)].map((m) => `${m[1]}Baslat`);
const dogrulayiciKaynak = await oku('packages/validators/src/index.js');
const dogrulayicilar = [...dogrulayiciKaynak.matchAll(/\/\*\*\n((?: \*.*\n)+?) \*\/\nexport function ([a-zA-Z]+)\(([^)]*)\)/g)].map((m) => ({
  ad: m[2],
  imza: m[3].trim(),
  aciklama: m[1].split('\n').map((s) => s.replace(/^\s*\*\s?/, '').trim()).filter(Boolean).join(' ')
}));
const belirtecCss = await oku('packages/tokens/dist/kiris-belirtecler.css').catch(() => '');
const kokBlok = belirtecCss.slice(belirtecCss.indexOf(':root {'), belirtecCss.indexOf('}', belirtecCss.indexOf(':root {')));
const belirtecler = [...kokBlok.matchAll(/\s(--kiris-[a-z0-9-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]);
const belirtecGruplari = {};
for (const [ad, deger] of belirtecler) {
  const grup = ad.split('-')[2];
  (belirtecGruplari[grup] ??= []).push([ad, deger]);
}
const kimlikLisans = await oku('LICENSE-IDENTITY.md');
const paketSurumu = JSON.parse(await oku('packages/core/package.json')).version;

// --------------------------------------------------------------- llms.txt
const ozet = `Kiriş (Türkiye Kamu Tasarım Sistemi) is an open design system for Turkish public services. It has ${BILESENLER.length} HTML and CSS components with JavaScript, React and Vue wrappers, Turkish validators, DTCG tokens, and Tabler icons. Build tools use the Node.js standard library. Tests need React and Vue. Code and icons use MIT licences. State identity assets have separate terms. Kiriş has no government endorsement.`;

const bilesenSatiri = (b) => {
  const t = tanimHaritasi.get(b.id);
  const kok = t?.kok ?? ((b.ornekler[0]?.html.match(/class="([^"\s]+)/) ?? [])[1] ?? '');
  const davranis = (b.ornekler[0]?.html.match(/data-kiris="([a-z-]+)"/) ?? [])[1];
  return `- [${b.ad} (${b.name})](${SITE}/bilesenler/${b.id}.html): ${b.ozet} Root class \`${kok}\`${davranis ? `, behaviour \`data-kiris="${davranis}"\`` : ''}${t ? `, React/Vue \`${t.ad}\`` : ''}.`;
};

const kisa = `# Kiriş — Türkiye Kamu Tasarım Sistemi

> ${ozet}

Version ${paketSurumu}. Source: ${DEPO}. Docs: ${SITE}. For a local site, run \`npm ci && npm run yapi && npm run sun\` and open http://localhost:4173. The docs use \`tools/registry/*.mjs\` as their source. Read \`llms-full.txt\` for the markup of each component.

## How to integrate in 60 seconds

**Plain HTML.** Include the two files from \`packages/core/dist/\` and call \`baslat()\` once. Every behaviour is keyed by a \`data-kiris="<name>"\` attribute and enhances working HTML.

\`\`\`html
<link rel="stylesheet" href="/kiris/kiris.min.css">
<script type="module">
  import { baslat } from '/kiris/kiris.min.js';
  baslat(); // or baslat(document.getElementById('form'))
</script>
\`\`\`

**React.** \`npm install @kiris-ds/react @kiris-ds/core\`. Plain JavaScript, no JSX build needed for the library. Components take Turkish prop names and render the exact HTML of the docs.

\`\`\`jsx
import '@kiris-ds/core/css';
import { KimlikNoGirisi, Dugme } from '@kiris-ds/react';
<form><KimlikNoGirisi etiket="T.C. kimlik numaranız" name="tckn" /><Dugme>Devam et</Dugme></form>
\`\`\`

**Vue 3.5 or later.** \`npm install @kiris-ds/vue @kiris-ds/core\`. Render functions, no template compiler. \`app.use(Kiris)\` registers every component with the \`Kiris\` prefix.

\`\`\`js
import { createApp } from 'vue';
import { Kiris } from '@kiris-ds/vue';
import '@kiris-ds/core/css';
createApp(App).use(Kiris); // <KirisKimlikNoGirisi etiket="T.C. kimlik numaranız" name="tckn" />
\`\`\`

## Rules an AI must follow

- Class names are Turkish BEM: \`kiris-<block>__<element>--<modifier>\`. Never invent a class; every class in this file exists in \`kiris.css\`.
- Colour, spacing, type and radius come only from tokens \`--kiris-*\`. Themes: \`<html data-kiris-tema="acik|koyu|yuksek">\`, font size \`data-kiris-yazi="normal|buyuk|cok-buyuk"\`. Do not write raw hex values.
- Every interactive part works without JavaScript. Script adds behaviour after \`baslat()\`; it never replaces markup.
- Form fields: label + optional \`.kiris-yardim\` + optional \`.kiris-hata\` + input inside \`.kiris-alan\`. Errors also go to the page-top \`.kiris-hata-ozeti\`. Touch targets are 44 px.
- Icons: inline the sprite \`packages/identity/dist/kiris-simgeler.svg\` once, then \`<svg class="kiris-simge" aria-hidden="true"><use href="#kiris-health"/></svg>\`. 74 icons from Tabler Icons (MIT), one 24-unit grid, 2-unit stroke; do not add other icon sets.
- State identity assets have separate terms in LICENSE-IDENTITY.md. Kiriş cannot grant permission for third-party logos. Code and Tabler icons use MIT licences.
- Turkish text rules: \`İ/ı\` case with \`trBuyuk()/trKucuk()\`, sorting with \`trSirala()\`, money with \`tlBicimle()\`, dates as \`gg.aa.yyyy\`.

## Components (${BILESENLER.length})

${GRUPLAR.map((g) => `### ${g.ad}\n\n${BILESENLER.filter((b) => b.grup === g.id).map(bilesenSatiri).join('\n')}`).join('\n\n')}

## Packages

- [@kiris-ds/core](${DEPO}/tree/main/packages/core): \`dist/kiris.css\`, \`dist/kiris.js\` (ESM, exports \`baslat\` and ${baslaticilar.length} \`*Baslat\` initialisers). Exports map: \`@kiris-ds/core\`, \`@kiris-ds/core/css\`, \`@kiris-ds/core/css/min\`, \`@kiris-ds/core/js/min\`.
- [@kiris-ds/react](${DEPO}/tree/main/packages/react): ${TANIMLAR.length} components, \`useKirisForm\`, \`DugmeGrubu\`, \`Sutun\`, \`BILESENLER\` map by registry id.
- [@kiris-ds/vue](${DEPO}/tree/main/packages/vue): ${TANIMLAR.length} components, \`Kiris\` plugin, \`DugmeGrubu\`, \`Sutun\`, \`BILESENLER\` map by registry id.
- [@kiris-ds/tanim](${DEPO}/tree/main/packages/tanim): framework-free draw functions; React and Vue are generated from it.
- [@kiris-ds/validators](${DEPO}/tree/main/packages/validators): ${dogrulayicilar.length} Turkish validators and formatters, zero dependencies, 36 tests.
- [@kiris-ds/tokens](${DEPO}/tree/main/packages/tokens): ${belirtecler.length} tokens (DTCG JSON → CSS, JSON, JS), light and dark themes, 36 contrast guarantees checked at build.
- [@kiris-ds/identity](${DEPO}/tree/main/packages/identity): e-Devlet mark, flag SVG, institution logos, icon sprite. Restricted licence.
- [@kiris-ds/theme-vatandas, theme-kurumsal, theme-saglik](${DEPO}/tree/main/packages/themes): institution themes from one brand colour.

## Integrations

${ENTEGRASYONLAR.map((e) => `- ${e.ad} (${e.durum}): ${e.ozet}`).join('\n')}

## Reference

- [README](${DEPO}/blob/main/README.md): quick start, architecture, component tables.
- [Architecture decisions](${DEPO}/blob/main/docs/mimari.md): eight decisions, from zero dependencies to the split licence.
- [Component lifecycle](${DEPO}/blob/main/docs/bilesen-yasam-dongusu.md): how a part enters and leaves the system.
- [Identity licence](${DEPO}/blob/main/LICENSE-IDENTITY.md): who may use the state identity parts.
- [Example pages](${SITE}/ornekler/): six government home pages built only from Kiriş parts, three of them 1:1 copies of real sites.
`;

// ---------------------------------------------------------- llms-full.txt
const bilesenBolumu = (b) => {
  const t = tanimHaritasi.get(b.id);
  const ornekler = b.ornekler.map((o) => `**${o.baslik}**\n\n\`\`\`html\n${varlikYolu(o.html)}\n\`\`\``).join('\n\n');
  const veri = davranisOznitelikleri(b.ornekler.map((o) => o.html).join('\n'));
  return `### ${b.ad} (${b.name}) — \`${b.id}\`

Group: ${grupAdi[b.grup]}${b.ozgun ? ' · unique to Türkiye' : ''}. Status: CSS ${b.durum.css}, JS ${b.durum.js}, React ${b.durum.react}, Vue ${b.durum.vue}. WCAG: ${b.wcag.join(', ')}.${b.kaynak.length ? ` Also in: ${b.kaynak.join(', ')}.` : ''}

${b.ozet}

When to use:
${b.neZaman.map((s) => `- ${s}`).join('\n')}

Accessibility:
${b.erisilebilirlik.map((s) => `- ${s}`).join('\n')}
${b.neden ? `\nWhy it exists: ${b.neden}\n` : ''}${veri.length ? `\nData attributes used by the markup: ${veri.map((d) => `\`${d}\``).join(', ')}.\n` : ''}
${ornekler}
${t ? `
**React** (\`import { ${t.ad} } from '@kiris-ds/react'\`):

\`\`\`jsx
${jsxOrnek(t.ad, t.ornek)}
\`\`\`

**Vue** (\`import { ${t.ad} } from '@kiris-ds/vue'\` or \`app.use(Kiris)\`):

\`\`\`html
${vueOrnek(t.ad, t.ornek)}
\`\`\`

Props shown are the example props; every prop maps to the HTML above. Extra attributes pass through to the root or the input.` : `\nNo React or Vue wrapper: ${SARMALAYICISIZ.includes(b.id) ? 'this part is a set of classes or a file, use the HTML directly.' : ''}`}
`;
};

const tam = `# Kiriş — Türkiye Kamu Tasarım Sistemi (full reference)

> ${ozet}

This file is generated by \`node tools/llms.mjs\` from the registry, the component definitions, the core script, the validators and the tokens. It contains the complete markup of every component, the JavaScript API, the validator API and every design token. Version ${paketSurumu}.

${kisa.slice(kisa.indexOf('## How to integrate'), kisa.indexOf('## Components'))}
## Page skeleton

A Kiriş page has this order. Full-width parts carry their own \`.kiris-kap\` container. The identifier and the footer never stand together; the corporate footer carries the institution.

\`\`\`html
<!doctype html>
<html lang="tr" data-kiris-tema="acik">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hizmet adı — Kurum adı</title>
  <link rel="stylesheet" href="/kiris/kiris.min.css">
</head>
<body>
  <a class="kiris-atla" href="#ana-icerik">Ana içeriğe geç</a>
  <!-- svg sprite: packages/identity/dist/kiris-simgeler.svg, inline once, display:none -->
  <div class="kiris-resmi-afis" data-kiris="resmi-afis">…</div>      <!-- masthead -->
  <header class="kiris-baslik-cubugu" data-kiris="baslik-cubugu">…</header>
  <main id="ana-icerik" tabindex="-1">
    <div class="kiris-kap">…</div>
  </main>
  <footer class="kiris-alt-bilgi">…</footer>
  <script type="module">import { baslat } from '/kiris/kiris.min.js'; baslat();</script>
</body>
</html>
\`\`\`

## JavaScript API (@kiris-ds/core)

\`baslat(kok = document, secenek = {})\` runs every initialiser below on the descendants of \`kok\`. Call it once after the DOM exists, and again after you insert new markup. Each element is initialised once (idempotent). \`secenek.ilceGetir(ilKodu)\` may return a promise of districts for the address part.

Initialisers, each exported and each keyed by a \`data-kiris\` attribute:

${baslaticilar.map((b) => `- \`${b}(kok)\``).join('\n')}

Conventions: a live region is \`[data-kiris-durum]\` (or \`.kiris-*__durum\` in older parts); an error slot is \`[data-kiris-hata]\`; a counter is \`[data-kiris-sayac]\`; \`data-zorunlu\` makes an empty field an error; custom events are \`kiris:secildi\`, \`kiris:kapandi\`, \`kiris:kaldirildi\`, \`kiris:suzgecDegisti\`, \`kiris:cerezSecildi\`.

## Validators (@kiris-ds/validators)

Pure functions, no DOM. The same functions run in the browser and on the server.

${dogrulayicilar.map((d) => `- \`${d.ad}(${d.imza})\` — ${d.aciklama}`).join('\n')}

Also exported: \`AYLAR\` (Turkish month names).

## Design tokens (@kiris-ds/tokens)

${belirtecler.length} tokens. Light values below; the dark theme redefines ${(belirtecCss.match(/\[data-kiris-tema="koyu"\]/) ? 'the colour tokens' : 'colours')} under \`[data-kiris-tema="koyu"]\` and \`prefers-color-scheme: dark\`. High contrast \`[data-kiris-tema="yuksek"]\` thickens borders and removes muted tones. Never hard-code a colour: use the token.

${Object.entries(belirtecGruplari).map(([grup, liste]) => `### ${grup}\n\n${liste.map(([ad, deger]) => `- \`${ad}\`: \`${deger}\``).join('\n')}`).join('\n\n')}

## Themes

Three institution themes override the brand tokens from one colour: \`@kiris-ds/theme-vatandas\` (default, #1e4785), \`@kiris-ds/theme-kurumsal\`, \`@kiris-ds/theme-saglik\`. Include the theme CSS after \`kiris.css\`. A new theme is one JSON file with a brand colour; the build checks contrast.

## Identity licence

${kimlikLisans.split('\n').slice(0, 40).join('\n')}

## Components — complete reference (${BILESENLER.length})

${GRUPLAR.map((g) => `## ${g.ad}\n\n${g.ozet}\n\n${BILESENLER.filter((b) => b.grup === g.id).map(bilesenBolumu).join('\n')}`).join('\n')}

## Unique to Türkiye (${OZGUN_BILESENLER.length})

${OZGUN_BILESENLER.map((b) => `- ${b.ad}: ${b.ozet}`).join('\n')}
`;

for (const hedef of [KOK, join(KOK, 'apps', 'docs', 'site')]) {
  await mkdir(hedef, { recursive: true });
  await writeFile(join(hedef, 'llms.txt'), kisa, 'utf8');
  await writeFile(join(hedef, 'llms-full.txt'), tam, 'utf8');
}
const kb = (m) => `${Math.round(Buffer.byteLength(m) / 1024)} KB`;
console.log(`llms.txt ${kb(kisa)} · llms-full.txt ${kb(tam)} · bileşen: ${BILESENLER.length} · başlatıcı: ${baslaticilar.length} · doğrulayıcı: ${dogrulayicilar.length} · belirteç: ${belirtecler.length}`);
