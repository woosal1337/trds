#!/usr/bin/env node
// @kiris-ds/identity yapı betiği. Bağımlılık yok.
//
//   node packages/identity/build.mjs
//
// Simge seti Tabler Icons'tan gelir (MIT). Kaynak dosyalar
// src/simgeler/ altında durur. Hepsi 24 birimlik kutuda, 2 birim çizgi,
// yuvarlak uç ve köşe ile çizilmiştir. Bu yüzden hepsi aynı ağırlıkta durur.
// Ad eşlemesi src/simgeler/harita.json içindedir.
//
// Devlet kimliği taşıyan varlıklar (arma, e-Devlet işareti, kurum logoları)
// LICENSE-IDENTITY.md kapsamındadır. Simgeler MIT lisanslıdır.

import { readFile, writeFile, mkdir, copyFile, readdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KOK = dirname(fileURLToPath(import.meta.url));
const KAYNAK = join(KOK, 'src', 'kaynak');
const SIMGE_KAYNAK = join(KOK, 'src', 'simgeler');
const CIKTI = join(KOK, 'dist');

// Her simge aynı çizim kuralını taşır. Tek yerde durur, tek yerde değişir.
const CIZIM = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const KUTU = 24;

async function main() {
  await rm(CIKTI, { recursive: true, force: true });
  await mkdir(join(CIKTI, 'simgeler'), { recursive: true });
  await copyFile(join(KOK, '..', '..', 'LICENSE-IDENTITY.md'), join(CIKTI, 'LICENSE-IDENTITY.md'));

  const dosyalar = (await readdir(SIMGE_KAYNAK)).filter((d) => d.endsWith('.svg')).sort();
  const adlar = [];
  const sembolller = [];
  for (const dosya of dosyalar) {
    const ad = dosya.replace(/\.svg$/, '');
    const metin = await readFile(join(SIMGE_KAYNAK, dosya), 'utf8');
    const govde = metin
      .replace(/^[\s\S]*?<svg[^>]*>/, '')
      .replace(/<\/svg>\s*$/, '')
      // Tabler her dosyaya görünmez bir hizalama karesi koyar. Sprite'ta gerekmez.
      .replace(/<path\s+stroke="none"[^>]*\/>\s*/g, '')
      .split('\n')
      .map((satir) => satir.trim())
      .filter(Boolean)
      .join('');
    if (!govde) throw new Error(`${dosya}: boş simge`);
    adlar.push(ad);
    await writeFile(
      join(CIKTI, 'simgeler', `${ad}.svg`),
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${KUTU} ${KUTU}" ${CIZIM} aria-hidden="true" focusable="false">${govde}</svg>\n`,
      'utf8'
    );
    sembolller.push(`  <symbol id="kiris-${ad}" viewBox="0 0 ${KUTU} ${KUTU}" ${CIZIM}>${govde}</symbol>`);
  }

  const sprite = [
    '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">',
    ...sembolller,
    '</svg>',
    ''
  ].join('\n');
  await writeFile(join(CIKTI, 'kiris-simgeler.svg'), sprite, 'utf8');
  await writeFile(join(CIKTI, 'simgeler.json'), JSON.stringify(adlar, null, 2) + '\n', 'utf8');

  // Kiriş'in kendi marka işareti. Devlet kimliği taşımaz, LICENSE-IDENTITY.md
  // kapsamı dışındadır. Kaynağı kiris-isaret.svg, türevleri tools/marka-turev.mjs üretir.
  await copyFile(join(KAYNAK, 'kiris-isaret.svg'), join(CIKTI, 'kiris-isaret.svg'));
  await copyFile(join(KAYNAK, 'kiris-favicon.ico'), join(CIKTI, 'kiris-favicon.ico'));
  for (const boyut of [16, 32, 48, 64, 128, 196]) {
    await copyFile(join(KAYNAK, `kiris-isaret-${boyut}.png`), join(CIKTI, `kiris-isaret-${boyut}.png`));
  }

  await copyFile(join(KAYNAK, 'favicon-196x196.1.8.0.png'), join(CIKTI, 'e-devlet-isaret.png'));
  await copyFile(join(KAYNAK, 'favicon.ico'), join(CIKTI, 'favicon.ico'));
  await copyFile(join(KAYNAK, 'turk-bayragi.svg'), join(CIKTI, 'turk-bayragi.svg'));
  await copyFile(join(KAYNAK, 'mygovlogo.png'), join(CIKTI, 'mygov-isaret.png'));

  // Kurum logoları. Her dosya kurumun kendi sitesinden alınmış resmî logodur.
  // Kaynak ve kullanım koşulu LICENSE-IDENTITY.md içindedir.
  await mkdir(join(CIKTI, 'kurumlar'), { recursive: true });
  for (const dosya of await readdir(join(KAYNAK, 'kurumlar'))) {
    if (!(dosya.endsWith('.svg') || dosya.endsWith('.png'))) continue;
    await copyFile(join(KAYNAK, 'kurumlar', dosya), join(CIKTI, 'kurumlar', dosya));
    // Renksiz bir SVG (fill="currentColor") satır içinde metin rengini alır.
    // <img> içinde ise renk alamaz. O yüzden iki sabit renkli kopya da çıkar:
    // kurumun kendi kırmızısı ve beyaz.
    if (dosya.endsWith('.svg')) {
      const svg = await readFile(join(KAYNAK, 'kurumlar', dosya), 'utf8');
      if (svg.includes('fill="currentColor"')) {
        const govde = dosya.replace(/\.svg$/, '');
        const renkler = { kirmizi: '#ee2825', beyaz: '#ffffff', koyu: '#1a2027' };
        for (const [ad, renk] of Object.entries(renkler)) {
          await writeFile(join(CIKTI, 'kurumlar', `${govde}-${ad}.svg`), svg.replace('fill="currentColor"', `fill="${renk}"`), 'utf8');
        }
      }
    }
  }

  console.log(`simge: ${adlar.length} · kutu: ${KUTU} · kaynak: Tabler Icons (MIT)`);
}

main().catch((hata) => {
  console.error(hata.message);
  process.exit(1);
});
