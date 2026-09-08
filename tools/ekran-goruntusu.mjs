#!/usr/bin/env node
// Yüksek çözünürlüklü ekran görüntüsü. Bağımlılık yok: sistemdeki Chrome,
// DevTools protokolü ve Node'un yerleşik WebSocket istemcisi.
//
//   node tools/ekran-goruntusu.mjs            # dört görüntüyü outputs/twitter/ altına yazar
//   node tools/ekran-goruntusu.mjs --olcek 3  # 3x piksel yoğunluğu
//
// Belge sitesi http://localhost:4173 üstünde çalışıyor olmalı: npm run sun

import { spawn } from 'node:child_process';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SITE = process.env.SITE ?? 'http://localhost:4173';
const OLCEK = Number(process.argv[process.argv.indexOf('--olcek') + 1]) || 2;
const EN = 1600;
const BOY = 900;
const PORT = 9333;
const CIKTI = join(process.cwd(), 'outputs', 'twitter');

// Tek sayfa inceleme: node tools/ekran-goruntusu.mjs --sayfa /simgeler/ --cikti /tmp/simgeler.png
const tekSayfa = process.argv.includes('--sayfa') ? process.argv[process.argv.indexOf('--sayfa') + 1] : null;
const tekCikti = process.argv.includes('--cikti') ? process.argv[process.argv.indexOf('--cikti') + 1] : null;
const tekKaydir = Number(process.argv[process.argv.indexOf('--kaydir') + 1]) || 0;
// --hazirla: çekimden önce çalışan bir JS ifadesi. Örnek: "document.querySelector('.x').scrollIntoView()"
const tekHazirla = process.argv.includes('--hazirla') ? process.argv[process.argv.indexOf('--hazirla') + 1] : null;

const GORUNTULER = tekSayfa ? [{ ad: 'inceleme', yol: tekSayfa, kaydir: tekKaydir, hazirla: tekHazirla, dosya: tekCikti }] : [
  { ad: '01-landing-page', yol: '/', kaydir: 0 },
  { ad: '02-component-catalog', yol: '/bilesenler/', kaydir: 560 },
  {
    ad: '03-search-suggestions',
    yol: '/ornekler/e-devlet/',
    kaydir: 0,
    hazirla: `(() => { const g = document.getElementById('aranan'); g.focus(); g.value = 'ikamet'; g.dispatchEvent(new Event('input', { bubbles: true })); return true; })()`
  },
  { ad: '04-e-devlet-example', yol: '/ornekler/e-devlet/', kaydir: 0 }
];

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--window-size=${EN},${BOY}`,
  '--hide-scrollbars', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--user-data-dir=/tmp/trds-chrome-profile', 'about:blank'
], { stdio: 'ignore' });

const bekle = (ms) => new Promise((r) => setTimeout(r, ms));

const hedefBul = async () => {
  for (let i = 0; i < 40; i += 1) {
    try {
      const liste = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      const sayfa = liste.find((t) => t.type === 'page');
      if (sayfa) return sayfa.webSocketDebuggerUrl;
    } catch { /* henüz açılmadı */ }
    await bekle(250);
  }
  throw new Error('Chrome DevTools yanıt vermedi.');
};

const ws = new WebSocket(await hedefBul());
await new Promise((r) => ws.addEventListener('open', r));
let sira = 0;
const bekleyen = new Map();
const olaylar = [];
ws.addEventListener('message', (m) => {
  const veri = JSON.parse(m.data);
  if (veri.id && bekleyen.has(veri.id)) { bekleyen.get(veri.id)(veri); bekleyen.delete(veri.id); }
  else if (veri.method) olaylar.forEach((f) => f(veri));
});
const gonder = (method, params = {}) => new Promise((r) => { sira += 1; bekleyen.set(sira, r); ws.send(JSON.stringify({ id: sira, method, params })); });
const olayBekle = (ad) => new Promise((r) => { const f = (v) => { if (v.method === ad) { olaylar.splice(olaylar.indexOf(f), 1); r(v); } }; olaylar.push(f); });

await gonder('Page.enable');
await gonder('Emulation.setDeviceMetricsOverride', { width: EN, height: BOY, deviceScaleFactor: OLCEK, mobile: false });
await mkdir(CIKTI, { recursive: true });

for (const g of GORUNTULER) {
  const yuklendi = olayBekle('Page.loadEventFired');
  await gonder('Page.navigate', { url: `${SITE}${g.yol}` });
  await yuklendi;
  await gonder('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => true)', awaitPromise: true });
  if (g.hazirla) await gonder('Runtime.evaluate', { expression: g.hazirla });
  if (g.kaydir) await gonder('Runtime.evaluate', { expression: `window.scrollTo(0, ${g.kaydir}); true` });
  await bekle(400);
  const { result } = await gonder('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  const dosya = g.dosya ?? join(CIKTI, `${g.ad}.png`);
  await writeFile(dosya, Buffer.from(result.data, 'base64'));
  console.log(`${dosya}  ${EN * OLCEK}×${BOY * OLCEK}`);
}

ws.close();
chrome.kill();
