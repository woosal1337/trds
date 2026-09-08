#!/usr/bin/env node
// Her bileşenin ilk canlı örneğinden bir görüntü alır.
//
//   npm run sun                       # belge sitesi 4173 portunda
//   node tools/bilesen-goruntu.mjs    # docs/gorseller/<id>.png
//
// Görüntüler README tablolarında kullanılır. Yalnız örnek sahnesi alınır,
// sayfa çerçevesi alınmaz. Yükseklik sınırlanır, böylece dosya küçük kalır.

import { spawn } from 'node:child_process';
import { mkdir, writeFile, readdir, stat, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { BILESENLER } from './registry/00-index.mjs';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const CIKTI = join(KOK, 'docs', 'gorseller');
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SITE = process.env.SITE ?? 'http://localhost:4173';
const PORT = 9334;
const EN = 1120;
const BOY = 900;
const OLCEK = 2;
const ENCOK_BOY = 460; // CSS pikseli. Uzun bileşen kırpılır.

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--window-size=${EN},${BOY}`,
  '--hide-scrollbars', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--user-data-dir=/tmp/kiris-chrome-goruntu', 'about:blank'
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
const gonder = (method, params = {}) =>
  new Promise((r) => { sira += 1; bekleyen.set(sira, r); ws.send(JSON.stringify({ id: sira, method, params })); });
const olayBekle = (ad) =>
  new Promise((r) => { const f = (v) => { if (v.method === ad) { olaylar.splice(olaylar.indexOf(f), 1); r(v); } }; olaylar.push(f); });

await gonder('Page.enable');
await gonder('Emulation.setDeviceMetricsOverride', { width: EN, height: BOY, deviceScaleFactor: OLCEK, mobile: false });
await rm(CIKTI, { recursive: true, force: true });
await mkdir(CIKTI, { recursive: true });

// Sahnenin kutusunu ölçer. Sahne yoksa bileşen atlanır.
const OLC = `(() => {
  const s = document.querySelector('.dok-ornek__sahne');
  if (!s) return null;
  s.scrollIntoView({ block: 'start' });
  window.scrollTo(0, 0);
  const k = s.getBoundingClientRect();
  return { x: k.x + scrollX, y: k.y + scrollY, en: k.width, boy: k.height };
})()`;

let alinan = 0;
const atlanan = [];
for (const b of BILESENLER) {
  const yuklendi = olayBekle('Page.loadEventFired');
  await gonder('Page.navigate', { url: `${SITE}/bilesenler/${b.id}.html` });
  await yuklendi;
  await gonder('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => true)', awaitPromise: true });
  await bekle(220);

  const yanit = await gonder('Runtime.evaluate', { expression: OLC, returnByValue: true });
  const kutu = yanit?.result?.result?.value;
  if (!kutu || kutu.en < 8 || kutu.boy < 8) { atlanan.push(b.id); continue; }

  const boy = Math.min(kutu.boy, ENCOK_BOY);
  const { result: goruntu } = await gonder('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    clip: { x: kutu.x, y: kutu.y, width: kutu.en, height: boy, scale: 1 }
  });
  await writeFile(join(CIKTI, `${b.id}.png`), Buffer.from(goruntu.data, 'base64'));
  alinan += 1;
}

ws.close();
chrome.kill();

let toplam = 0;
for (const d of await readdir(CIKTI)) toplam += (await stat(join(CIKTI, d))).size;
console.log(`görüntü: ${alinan} · atlanan: ${atlanan.length}${atlanan.length ? ` (${atlanan.join(', ')})` : ''} · toplam: ${Math.round(toplam / 1024)} KB`);
