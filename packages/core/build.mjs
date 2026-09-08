#!/usr/bin/env node
// @tr-ds/core yapı betiği. Bağımlılık yok.
//
//   node packages/core/build.mjs
//
// Üretir:
//   dist/trds.css       belirteçler + dört katman, sırayla
//   dist/trds.min.css   boşlukları ve yorumları alınmış sürüm
//   dist/trds.js        @tr-ds/validators içine katılmış tek dosya
//   dist/trds.min.js    yorumları alınmış sürüm
//
// Küçültme kasıtlı olarak basittir. Amaç bağımlılıksız kalmaktır. Üretim
// dağıtımında sunucunuzun gzip veya brotli sıkıştırması asıl kazancı verir.

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KOK = dirname(fileURLToPath(import.meta.url));
const PAKETLER = join(KOK, '..');
const CIKTI = join(KOK, 'dist');

const oku = (yol) => readFile(yol, 'utf8');

// CSS içindeki yorumları ve fazla boşluğu alır. Dize içindeki içeriği bozmaz,
// çünkü TRDS CSS dosyalarında `content` yalnız boş dize kullanır.
const cssKucult = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\s+/g, ' ')
    .trim();

// Satır yorumlarını ve blok yorumlarını alır. Dize ve düzenli ifade içindeki
// eğik çizgileri korumak için basit bir durum makinesi kullanır.
const jsKucult = (js) => {
  let cikti = '';
  let i = 0;
  let dize = null;
  while (i < js.length) {
    const k = js[i];
    const sonraki = js[i + 1];
    if (dize) {
      cikti += k;
      if (k === '\\') { cikti += js[i + 1] ?? ''; i += 2; continue; }
      if (k === dize) dize = null;
      i += 1;
      continue;
    }
    if (k === '"' || k === "'" || k === '`') { dize = k; cikti += k; i += 1; continue; }
    if (k === '/' && sonraki === '/') { while (i < js.length && js[i] !== '\n') i += 1; continue; }
    if (k === '/' && sonraki === '*') { i += 2; while (i < js.length && !(js[i] === '*' && js[i + 1] === '/')) i += 1; i += 2; continue; }
    cikti += k;
    i += 1;
  }
  return cikti.replace(/\n{2,}/g, '\n').replace(/^[ \t]+/gm, '').trim();
};

/** Replace the single bare import of @tr-ds/validators with its source. */
const validatorlariKat = async (kaynak) => {
  const yol = join(PAKETLER, 'validators', 'src', 'index.js');
  const govde = (await oku(yol))
    .replace(/^export\s+(?=(function|const|class))/gm, '')
    .trim();

  const kalip = /import\s*\{[\s\S]*?\}\s*from\s*'@tr-ds\/validators';?/;
  if (!kalip.test(kaynak)) throw new Error('@tr-ds/validators içe aktarımı bulunamadı.');

  return kaynak.replace(
    kalip,
    [
      '// ---- @tr-ds/validators, yapı sırasında içeri katıldı ----',
      govde,
      '// ---- @tr-ds/validators sonu ----'
    ].join('\n')
  );
};

async function main() {
  await mkdir(CIKTI, { recursive: true });

  // --- CSS ------------------------------------------------------------------
  const belirtecler = await oku(join(PAKETLER, 'tokens', 'dist', 'trds-belirtecler.css')).catch(
    () => {
      throw new Error('Önce belirteçleri üretin: node packages/tokens/build.mjs');
    }
  );

  const stilKlasoru = join(KOK, 'src', 'styles');
  const stilDosyalari = (await readdir(stilKlasoru)).filter((d) => d.endsWith('.css')).sort();
  const katmanlar = [];
  for (const dosya of stilDosyalari) katmanlar.push(await oku(join(stilKlasoru, dosya)));

  const css = [
    '/*! TRDS — Türkiye Kamu Tasarım Sistemi. Üretilmiş dosya, elle değiştirmeyin. */',
    belirtecler,
    ...katmanlar
  ].join('\n\n');

  await writeFile(join(CIKTI, 'trds.css'), css, 'utf8');
  await writeFile(join(CIKTI, 'trds.min.css'), cssKucult(css), 'utf8');

  // --- JavaScript -----------------------------------------------------------
  const kaynak = await oku(join(KOK, 'src', 'scripts', 'trds.js'));
  const js = await validatorlariKat(kaynak);
  await writeFile(join(CIKTI, 'trds.js'), js, 'utf8');
  await writeFile(join(CIKTI, 'trds.min.js'), jsKucult(js), 'utf8');

  // Paket, doğrulayıcıları içine kattığı için bir ad çakışması yalnız burada
  // görünür. Çıktı ayrıştırılamıyorsa yapı durur.
  for (const dosya of ['trds.js', 'trds.min.js']) {
    try {
      execFileSync(process.execPath, ['--check', join(CIKTI, dosya)], { stdio: 'pipe' });
    } catch (hata) {
      throw new Error(`${dosya} ayrıştırılamıyor:\n${hata.stderr?.toString() ?? hata.message}`);
    }
  }

  const kb = (metin) => `${Math.round(Buffer.byteLength(metin) / 102.4) / 10} KB`;
  console.log(`css: ${kb(css)} → ${kb(cssKucult(css))} küçültülmüş`);
  console.log(`js:  ${kb(js)} → ${kb(jsKucult(js))} küçültülmüş`);
  console.log(`katman: ${stilDosyalari.join(', ')}`);
}

main().catch((hata) => {
  console.error(hata.message);
  process.exit(1);
});
