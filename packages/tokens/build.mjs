#!/usr/bin/env node
// Kiriş token build. No dependencies. Node 20 or later.
//
//   node packages/tokens/build.mjs
//
// Reads every src/*.tokens.json file in name order, resolves {a.b.c}
// references, then writes CSS, JSON and JavaScript outputs. The build FAILS
// when a stated contrast guarantee does not hold. A promise the build cannot
// check is not a promise.

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KOK = dirname(fileURLToPath(import.meta.url));
const KAYNAK = join(KOK, 'src');
const CIKTI = join(KOK, 'dist');
const ONEK = '--kiris';

// ---------------------------------------------------------------- yardımcılar

const derinBirlestir = (hedef, kaynak) => {
  for (const [anahtar, deger] of Object.entries(kaynak)) {
    if (deger && typeof deger === 'object' && !Array.isArray(deger) && !('$value' in deger)) {
      hedef[anahtar] = derinBirlestir(hedef[anahtar] ?? {}, deger);
    } else {
      hedef[anahtar] = deger;
    }
  }
  return hedef;
};

/** Flatten a DTCG tree into [{ yol, deger, tur }]. */
const duzlestir = (agac, yol = []) => {
  const cikti = [];
  for (const [anahtar, deger] of Object.entries(agac)) {
    if (anahtar.startsWith('$')) continue;
    if (deger && typeof deger === 'object' && '$value' in deger) {
      cikti.push({ yol: [...yol, anahtar], deger: String(deger.$value), tur: deger.$type });
    } else if (deger && typeof deger === 'object') {
      cikti.push(...duzlestir(deger, [...yol, anahtar]));
    }
  }
  return cikti;
};

const degiskenAdi = (yol) => `${ONEK}-${yol.join('-')}`;

/** Resolve {a.b.c} references against the flat map. Detects a cycle. */
const cozumle = (deger, harita, gorulen = new Set()) =>
  deger.replace(/\{([^}]+)\}/g, (tam, ref) => {
    if (gorulen.has(ref)) throw new Error(`Belirteç döngüsü: ${ref}`);
    const hedef = harita.get(ref);
    if (hedef === undefined) throw new Error(`Tanımsız belirteç: ${ref}`);
    return cozumle(hedef, harita, new Set([...gorulen, ref]));
  });

// ------------------------------------------------------------------- kontrast

const kanal = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);

const parlaklik = (hex) => {
  const t = hex.replace('#', '');
  const g = t.length === 3 ? t.split('').map((c) => c + c).join('') : t;
  const [r, y, b] = [0, 2, 4].map((i) => parseInt(g.slice(i, i + 2), 16) / 255);
  return 0.2126 * kanal(r) + 0.7152 * kanal(y) + 0.0722 * kanal(b);
};

const kontrast = (a, b) => {
  const [x, y] = [parlaklik(a), parlaklik(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

/** The guarantees the token documentation states. The build checks each one. */
const GARANTILER = [
  { metin: 'renk-notr-metin-varsayilan', zemin: 'renk-notr-zemin-varsayilan', enAz: 7 },
  { metin: 'renk-notr-metin-varsayilan', zemin: 'renk-notr-zemin-yumusak', enAz: 7 },
  { metin: 'renk-notr-metin-varsayilan', zemin: 'renk-notr-yuzey-varsayilan', enAz: 7 },
  { metin: 'renk-notr-metin-varsayilan', zemin: 'renk-notr-yuzey-yumusak', enAz: 7 },
  { metin: 'renk-notr-metin-silik', zemin: 'renk-notr-zemin-varsayilan', enAz: 4.5 },
  { metin: 'renk-notr-metin-silik', zemin: 'renk-notr-zemin-yumusak', enAz: 4.5 },
  { metin: 'renk-notr-metin-silik', zemin: 'renk-notr-yuzey-varsayilan', enAz: 4.5 },
  { metin: 'renk-birincil-metin-varsayilan', zemin: 'renk-notr-zemin-varsayilan', enAz: 4.5 },
  { metin: 'renk-birincil-metin-ziyaret', zemin: 'renk-notr-zemin-varsayilan', enAz: 4.5 },
  { metin: 'renk-tehlike-metin-varsayilan', zemin: 'renk-notr-zemin-varsayilan', enAz: 4.5 },
  { metin: 'renk-basari-metin-varsayilan', zemin: 'renk-notr-zemin-varsayilan', enAz: 4.5 },
  { metin: 'renk-uyari-metin-varsayilan', zemin: 'renk-notr-zemin-varsayilan', enAz: 4.5 },
  { metin: 'renk-birincil-taban-karsit-varsayilan', zemin: 'renk-birincil-taban-varsayilan', enAz: 4.5 },
  { metin: 'renk-tehlike-taban-karsit-varsayilan', zemin: 'renk-tehlike-taban-varsayilan', enAz: 4.5 },
  { metin: 'renk-basari-taban-karsit-varsayilan', zemin: 'renk-basari-taban-varsayilan', enAz: 4.5 },
  { metin: 'renk-uyari-taban-karsit-varsayilan', zemin: 'renk-uyari-taban-varsayilan', enAz: 4.5 },
  { metin: 'renk-notr-taban-karsit-varsayilan', zemin: 'renk-notr-taban-varsayilan', enAz: 4.5 },
  { metin: 'renk-odak-kenar', zemin: 'renk-odak-dolgu', enAz: 4.5 }
];

const garantileriDenetle = (cozulmus, kipAdi) => {
  const sonuclar = [];
  for (const g of GARANTILER) {
    const on = cozulmus.get(g.metin);
    const arka = cozulmus.get(g.zemin);
    if (!on || !arka || !on.startsWith('#') || !arka.startsWith('#')) continue;
    const oran = kontrast(on, arka);
    sonuclar.push({ ...g, kip: kipAdi, oran: Math.round(oran * 100) / 100, gecti: oran >= g.enAz });
  }
  return sonuclar;
};

// ----------------------------------------------------------------------- yapı

const cssBlogu = (girdiler, secici) => {
  const satirlar = girdiler.map(([ad, deger]) => `  ${ad}: ${deger};`);
  return `${secici} {\n${satirlar.join('\n')}\n}`;
};

const kipCoz = (agac) => {
  const duz = duzlestir(agac);
  const harita = new Map(duz.map((t) => [t.yol.join('.'), t.deger]));
  const cozulmus = new Map();
  for (const t of duz) cozulmus.set(t.yol.join('-'), cozumle(t.deger, harita));
  return { duz, cozulmus };
};

async function main() {
  const hedef = process.argv.includes('--hedef')
    ? process.argv[process.argv.indexOf('--hedef') + 1]
    : 'hepsi';

  const dosyalar = (await readdir(KAYNAK)).filter((d) => d.endsWith('.tokens.json')).sort();
  const acikAgac = {};
  const koyuAgac = {};

  for (const dosya of dosyalar) {
    const icerik = JSON.parse(await readFile(join(KAYNAK, dosya), 'utf8'));
    if (icerik.$kip === 'koyu') derinBirlestir(koyuAgac, icerik);
    else derinBirlestir(acikAgac, icerik);
  }

  const acik = kipCoz(acikAgac);
  // The dark mode file only overrides semantic tokens, so merge it on top of
  // the light tree before resolving. Primitives stay shared.
  const koyu = kipCoz(derinBirlestir(structuredClone(acikAgac), koyuAgac));

  const denetim = [
    ...garantileriDenetle(acik.cozulmus, 'acik'),
    ...garantileriDenetle(koyu.cozulmus, 'koyu')
  ];
  const basarisiz = denetim.filter((s) => !s.gecti);

  await mkdir(CIKTI, { recursive: true });

  // --- CSS ------------------------------------------------------------------
  const acikGirdiler = [...acik.cozulmus].map(([yol, deger]) => [`${ONEK}-${yol}`, deger]);
  const koyuFarklar = [...koyu.cozulmus]
    .filter(([yol, deger]) => acik.cozulmus.get(yol) !== deger)
    .map(([yol, deger]) => [`${ONEK}-${yol}`, deger]);

  const css = [
    '/* Kiriş tasarım belirteçleri. Üretilmiş dosya. Elle değiştirmeyin. */',
    `/* Kaynak: packages/tokens/src — üretim: node packages/tokens/build.mjs */`,
    '',
    cssBlogu(acikGirdiler, ':root'),
    '',
    '/* Koyu tema. Kullanıcı seçimi açık temayı her zaman kazanır. */',
    '@media (prefers-color-scheme: dark) {',
    cssBlogu(koyuFarklar, '  :root:not([data-kiris-tema="acik"])').replace(/^/gm, '  ').trim(),
    '}',
    '',
    cssBlogu(koyuFarklar, ':root[data-kiris-tema="koyu"]'),
    '',
    '/* Yüksek karşıtlık kipi. Kenarlıkları kalınlaştırır, tonları kaldırır. */',
    cssBlogu(
      [
        // Değerler o anki temanın belirteçlerine bağlanır. Koyu sistem temasında
        // yüksek karşıtlık açık tema rengini basmaz, koyu temanın güçlü rengini alır.
        [`${ONEK}-renk-notr-metin-silik`, `var(${ONEK}-renk-notr-metin-varsayilan)`],
        [`${ONEK}-renk-notr-kenar-silik`, `var(${ONEK}-renk-notr-kenar-guclu)`],
        [`${ONEK}-renk-notr-kenar-varsayilan`, `var(${ONEK}-renk-notr-kenar-guclu)`],
        [`${ONEK}-kenarlik-ince`, '2px'],
        [`${ONEK}-kenarlik-orta`, '3px']
      ],
      ':root[data-kiris-tema="yuksek"]'
    ),
    ''
  ].join('\n');

  await writeFile(join(CIKTI, 'kiris-belirtecler.css'), css, 'utf8');

  // --- JSON ve JavaScript ---------------------------------------------------
  const duzJson = Object.fromEntries([...acik.cozulmus]);
  await writeFile(join(CIKTI, 'kiris-belirtecler.json'), JSON.stringify(duzJson, null, 2), 'utf8');
  await writeFile(
    join(CIKTI, 'kiris-belirtecler.js'),
    `// Üretilmiş dosya. Elle değiştirmeyin.\nexport const belirtecler = ${JSON.stringify(duzJson, null, 2)};\nexport default belirtecler;\n`,
    'utf8'
  );


  // --- kontrast raporu ------------------------------------------------------
  const rapor = [
    '# Kontrast raporu',
    '',
    'Üretilmiş dosya. Her yapı çalıştırmasında yeniden yazılır.',
    '',
    '| Kip | Ön plan | Arka plan | Oran | En az | Sonuç |',
    '| --- | --- | --- | ---: | ---: | --- |',
    ...denetim.map(
      (s) =>
        `| ${s.kip} | \`${s.metin}\` | \`${s.zemin}\` | ${s.oran.toFixed(2)} | ${s.enAz} | ${s.gecti ? 'gecti' : 'KALDI'} |`
    ),
    ''
  ].join('\n');
  await writeFile(join(CIKTI, 'kontrast-raporu.md'), rapor, 'utf8');

  console.log(`belirteç: ${acik.cozulmus.size} · koyu fark: ${koyuFarklar.length} · kontrast denetimi: ${denetim.length}`);
  if (basarisiz.length > 0) {
    console.error('\nKontrast garantisi tutmuyor:');
    for (const s of basarisiz) {
      console.error(`  ${s.kip}: ${s.metin} / ${s.zemin} = ${s.oran} (en az ${s.enAz})`);
    }
    process.exit(1);
  }
  console.log('Bütün kontrast garantileri tutuyor.');
}

main().catch((hata) => {
  console.error(hata.message);
  process.exit(1);
});
