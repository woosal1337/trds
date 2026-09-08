#!/usr/bin/env node
// README içindeki üretilen blokları yeniler.
//
//   node tools/readme.mjs
//
// Bileşen listesi iki yerde durursa biri eskir. Bu yüzden README'deki tablolar
// da kayıt defterinden üretilir.

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { BILESENLER, OZGUN_BILESENLER, ENTEGRASYONLAR, GRUPLAR, grupla } from './registry/00-index.mjs';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const YOL = join(KOK, 'README.md');

const UYARI = '<!-- Bu blok üretilir. Elle değiştirmeyin: node tools/readme.mjs -->';

const blokYaz = (metin, ad, icerik) => {
  const basla = `<!-- ${ad}:BASLA -->`;
  const bitir = `<!-- ${ad}:BITIR -->`;
  const kalip = new RegExp(`${basla}[\\s\\S]*?${bitir}`);
  if (!kalip.test(metin)) throw new Error(`README içinde ${ad} bloğu yok.`);
  return metin.replace(kalip, `${basla}\n${UYARI}\n\n${icerik}\n\n${bitir}`);
};

const DURUM = {
  stable: 'kararlı',
  beta: 'beta',
  alpha: 'alfa',
  degerlendiriliyor: 'değerlendiriliyor',
  yok: '—'
};
const durumAd = (d) => DURUM[d] ?? d;

// Bileşen görüntüleri node tools/bilesen-goruntu.mjs ile üretilir.
const GORSEL = join(KOK, 'docs', 'gorseller');
const gorsel = (b) =>
  existsSync(join(GORSEL, `${b.id}.png`))
    ? `<img src="docs/gorseller/${b.id}.png" alt="${b.ad}" width="260">`
    : '—';

// --------------------------------------------------------------------- özgün

const ozgunBlok = () =>
  [
    '| Bileşen | İngilizce | Neden Türkiye’ye özgü |',
    '|---|---|---|',
    ...OZGUN_BILESENLER.map((b) => {
      const neden = (b.neden ?? '').split('.')[0].replace(/\|/g, '\\|');
      return `| **${b.ad}** | ${b.name} | ${neden}. |`;
    })
  ].join('\n');

// ------------------------------------------------------------------ bileşen

const bilesenBlok = () => {
  const gruplu = grupla();
  const bolumler = gruplu.map((g) => {
    const satirlar = g.bilesenler.map(
      (b) =>
        `| ${gorsel(b)} | ${b.ozgun ? '🇹🇷 ' : ''}**${b.ad}**<br><sub>${b.name}</sub> | ${durumAd(b.durum.css)} | ${durumAd(b.durum.js)} | ${durumAd(b.durum.react)} | [Belge](https://trds.chele.bi/bilesenler/${b.id}.html) |`
    );
    return [
      `### ${g.ad}`,
      '',
      g.ozet,
      '',
      '| Görünüm | Bileşen | CSS | JS | React | |',
      '|---|---|---|---|---|---|',
      ...satirlar
    ].join('\n');
  });

  const giris =
    `Toplam **${BILESENLER.length} bileşen**, ${gruplu.length} grupta. ` +
    '🇹🇷 işareti, o bileşenin kuralının veya yasal dayanağının Türkiye’ye ait ' +
    'olduğunu gösterir. Her görüntü, belge sitesindeki canlı örneğin kendisidir ' +
    've `node tools/bilesen-goruntu.mjs` ile yenilenir.';

  return [giris, ...bolumler].join('\n\n');
};

// -------------------------------------------------------------- entegrasyon

const entegrasyonBlok = () =>
  [
    '| Teknoloji | Paket | Durum | Kurulum |',
    '|---|---|---|---|',
    ...ENTEGRASYONLAR.map(
      (e) => `| ${e.ad} | \`${e.paket}\` | ${durumAd(e.durum)} | \`${e.kurulum.split('\n')[0]}\` |`
    )
  ].join('\n');

// ------------------------------------------------------------------------ ana

async function main() {
  let metin = await readFile(YOL, 'utf8');
  metin = blokYaz(metin, 'OZGUN', ozgunBlok());
  metin = blokYaz(metin, 'BILESEN', bilesenBlok());
  metin = blokYaz(metin, 'ENTEGRASYON', entegrasyonBlok());
  await writeFile(YOL, metin, 'utf8');
  console.log(
    `README yenilendi: ${BILESENLER.length} bileşen, ${OZGUN_BILESENLER.length} özgün, ${ENTEGRASYONLAR.length} entegrasyon, ${GRUPLAR.length} grup tanımlı`
  );
}

main().catch((hata) => {
  console.error(hata.message);
  process.exit(1);
});
