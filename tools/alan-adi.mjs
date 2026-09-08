#!/usr/bin/env node
// Belge sitesinin alan adını bütün depoda değiştirir.
//
//   node tools/alan-adi.mjs kiris.example.tr
//
// Paket alanları, README dosyaları, llms üreticisi ve PROJECT.json güncellenir.
// Değişiklikten sonra `npm run yapi` ve `node tools/readme.mjs` çalıştırın.

import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const ESKI = 'trds.chele.bi';
const yeni = process.argv[2]?.replace(/^https?:\/\//, '').replace(/\/$/, '');
if (!yeni) {
  console.error('Kullanım: node tools/alan-adi.mjs <yeni-alan-adi>');
  process.exit(1);
}

const cikti = execFileSync('git', ['grep', '-l', ESKI], { encoding: 'utf8' }).trim();
const dosyalar = cikti ? cikti.split('\n') : [];

let toplam = 0;
for (const dosya of dosyalar) {
  const metin = await readFile(dosya, 'utf8');
  const sayi = metin.split(ESKI).length - 1;
  await writeFile(dosya, metin.split(ESKI).join(yeni), 'utf8');
  toplam += sayi;
  console.log(`${dosya}  ${sayi}`);
}
console.log(`\ndosya: ${dosyalar.length} · değişiklik: ${toplam} · yeni alan adı: ${yeni}`);
