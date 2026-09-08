#!/usr/bin/env node
// TRDS tema üreticisi. Bağımlılık yok.
//
//   node packages/themes/build.mjs
//
// Bir kurum tek bir marka rengi verir. Bu betik ondan tam bir renk ölçeği
// üretir, kontrastı denetler ve tema CSS dosyasını yazar. Kurum kendi ölçeğini
// elle seçmez, çünkü elle seçilen ölçek kontrast garantisini bozar.
//
// Yöntem Norveç Designsystemet yaklaşımından alındı: marka rengi korunur,
// metin ve kenarlık renkleri ondan türetilir ve ölçüt karşılanana kadar
// koyulaştırılır.

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KOK = dirname(fileURLToPath(import.meta.url));

// ------------------------------------------------------------------ renk işi

const hexOku = (hex) => {
  const t = hex.replace('#', '');
  const g = t.length === 3 ? [...t].map((c) => c + c).join('') : t;
  return [0, 2, 4].map((i) => parseInt(g.slice(i, i + 2), 16));
};

const hexYaz = ([r, g, b]) =>
  '#' + [r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('');

const rgbHsl = ([r, g, b]) => {
  const [kr, kg, kb] = [r / 255, g / 255, b / 255];
  const enBuyuk = Math.max(kr, kg, kb);
  const enKucuk = Math.min(kr, kg, kb);
  const l = (enBuyuk + enKucuk) / 2;
  const fark = enBuyuk - enKucuk;
  if (fark === 0) return [0, 0, l];
  const s = l > 0.5 ? fark / (2 - enBuyuk - enKucuk) : fark / (enBuyuk + enKucuk);
  let h;
  if (enBuyuk === kr) h = ((kg - kb) / fark + (kg < kb ? 6 : 0)) / 6;
  else if (enBuyuk === kg) h = ((kb - kr) / fark + 2) / 6;
  else h = ((kr - kg) / fark + 4) / 6;
  return [h, s, l];
};

const hslRgb = ([h, s, l]) => {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const kanal = (t) => {
    let k = t;
    if (k < 0) k += 1;
    if (k > 1) k -= 1;
    if (k < 1 / 6) return p + (q - p) * 6 * k;
    if (k < 1 / 2) return q;
    if (k < 2 / 3) return p + (q - p) * (2 / 3 - k) * 6;
    return p;
  };
  return [kanal(h + 1 / 3), kanal(h), kanal(h - 1 / 3)].map((v) => v * 255);
};

const kanalDuzelt = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);

const parlaklik = (hex) => {
  const [r, g, b] = hexOku(hex).map((v) => v / 255);
  return 0.2126 * kanalDuzelt(r) + 0.7152 * kanalDuzelt(g) + 0.0722 * kanalDuzelt(b);
};

const kontrast = (a, b) => {
  const [x, y] = [parlaklik(a), parlaklik(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

/** Darken the colour step by step until it meets the ratio against white. */
const olcutuKarsilayanaKadarKoyulastir = (hex, zemin, enAz) => {
  let [h, s, l] = rgbHsl(hexOku(hex));
  let sonuc = hex;
  for (let adim = 0; adim < 100; adim += 1) {
    if (kontrast(sonuc, zemin) >= enAz) return sonuc;
    l = Math.max(0, l - 0.01);
    sonuc = hexYaz(hslRgb([h, s, l]));
  }
  return sonuc;
};

const acHex = (hex, hedefL) => {
  const [h, s] = rgbHsl(hexOku(hex));
  return hexYaz(hslRgb([h, s, hedefL]));
};

// ------------------------------------------------------------------ tema yaz

const BEYAZ = '#ffffff';

function temaUret(ayar) {
  const marka = ayar.marka;

  // Metin ve kenarlık için: markadan türet, sonra ölçüt karşılanana kadar koyulaştır.
  const metin = olcutuKarsilayanaKadarKoyulastir(marka, BEYAZ, 4.5);
  const guclu = olcutuKarsilayanaKadarKoyulastir(marka, BEYAZ, 7);

  // Dolu yüzey için: markanın üstünde beyaz 4.5 sağlamıyorsa markayı koyulaştır.
  const taban = kontrast(BEYAZ, marka) >= 4.5 ? marka : metin;
  const tabanUzeri = olcutuKarsilayanaKadarKoyulastir(taban, BEYAZ, 5.5);
  const tabanEtkin = olcutuKarsilayanaKadarKoyulastir(taban, BEYAZ, 7);

  const yumusakZemin = acHex(marka, 0.96);
  const yumusakYuzey = acHex(marka, 0.91);
  const silikKenar = acHex(marka, 0.8);

  const degerler = {
    'renk-birincil-zemin-yumusak': yumusakZemin,
    'renk-birincil-yuzey-yumusak': yumusakYuzey,
    'renk-birincil-yuzey-uzeri': yumusakYuzey,
    'renk-birincil-kenar-silik': silikKenar,
    'renk-birincil-kenar-varsayilan': metin,
    'renk-birincil-metin-varsayilan': metin,
    'renk-birincil-metin-guclu': guclu,
    'renk-birincil-taban-varsayilan': taban,
    'renk-birincil-taban-uzeri': tabanUzeri,
    'renk-birincil-taban-etkin': tabanEtkin,
    'renk-birincil-taban-karsit-varsayilan': BEYAZ
  };

  const denetim = [
    { ad: 'metin / beyaz zemin', oran: kontrast(metin, BEYAZ), enAz: 4.5 },
    { ad: 'guclu / beyaz zemin', oran: kontrast(guclu, BEYAZ), enAz: 7 },
    { ad: 'beyaz / taban', oran: kontrast(BEYAZ, taban), enAz: 4.5 },
    { ad: 'beyaz / taban-etkin', oran: kontrast(BEYAZ, tabanEtkin), enAz: 4.5 }
  ];

  return { degerler, denetim, marka };
}

async function main() {
  const klasorler = (await readdir(KOK, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  let hataVar = false;

  for (const klasor of klasorler) {
    const ayarYolu = join(KOK, klasor, 'tema.config.json');
    const ayar = await readFile(ayarYolu, 'utf8').then(JSON.parse).catch(() => null);
    if (!ayar) continue;

    const { degerler, denetim } = temaUret(ayar);
    const basarisiz = denetim.filter((d) => d.oran < d.enAz);
    if (basarisiz.length > 0) hataVar = true;

    const satirlar = Object.entries(degerler).map(([ad, deger]) => `  --trds-${ad}: ${deger};`);
    const css = [
      `/* TRDS teması: ${ayar.ad}. Üretilmiş dosya, elle değiştirmeyin. */`,
      `/* Marka rengi: ${ayar.marka} — üretim: node packages/themes/build.mjs */`,
      '',
      `[data-trds-tema-kurum="${klasor}"],`,
      ':root {',
      ...satirlar,
      '}',
      ''
    ].join('\n');

    await mkdir(join(KOK, klasor, 'dist'), { recursive: true });
    await writeFile(join(KOK, klasor, 'dist', 'tema.css'), css, 'utf8');

    const rapor = denetim
      .map((d) => `    ${d.ad}: ${d.oran.toFixed(2)} (en az ${d.enAz}) ${d.oran >= d.enAz ? 'gecti' : 'KALDI'}`)
      .join('\n');
    console.log(`${ayar.ad} (${klasor}) marka ${ayar.marka}\n${rapor}`);
  }

  if (hataVar) {
    console.error('\nBir tema kontrast ölçütünü karşılamıyor.');
    process.exit(1);
  }
}

main().catch((hata) => {
  console.error(hata.message);
  process.exit(1);
});
