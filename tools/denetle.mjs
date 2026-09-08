#!/usr/bin/env node
// TRDS bütünlük denetimi. Bağımlılık yok.
//
//   node tools/denetle.mjs
//
// Kayıt defteri ile üretilen kod arasındaki sözü denetler. Belgelerde duran
// her bileşenin kodda bir karşılığı olmalıdır. Aksi halde belge yalan söyler.
//
// Denetlenenler:
//   1. Her bileşenin kayıt defterindeki alanları eksiksiz mi
//   2. Her bileşen kimliği benzersiz mi
//   3. Her bileşenin en az bir örneği var mı
//   4. Her örnekteki CSS sınıfı derlenmiş CSS içinde var mı
//   5. Her `data-trds` davranışı JavaScript içinde başlatılıyor mu
//   6. Her WCAG ölçütü geçerli bir numara mı

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { BILESENLER, GRUPLAR, ENTEGRASYONLAR } from './registry/00-index.mjs';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');

const sorunlar = [];
const bildir = (kural, ileti) => sorunlar.push({ kural, ileti });

const oku = (yol) =>
  readFile(join(KOK, yol), 'utf8').catch(() => {
    bildir('yapi', `${yol} bulunamadı. Önce "npm run yapi" çalıştırın.`);
    return '';
  });

const ZORUNLU = ['id', 'ad', 'name', 'grup', 'durum', 'ozet', 'neZaman', 'erisilebilirlik', 'wcag', 'ornekler'];
const GRUP_IDLERI = new Set(GRUPLAR.map((g) => g.id));
const WCAG_KALIP = /^\d\.\d\.\d{1,2}$/;

async function main() {
  const css = await oku('packages/core/dist/trds.css');
  const js = await oku('packages/core/dist/trds.js');

  // 1, 2, 3, 6
  const gorulen = new Set();
  for (const b of BILESENLER) {
    for (const alan of ZORUNLU) {
      if (b[alan] === undefined) bildir('alan', `${b.id}: "${alan}" alanı eksik.`);
    }
    if (gorulen.has(b.id)) bildir('kimlik', `${b.id}: kimlik iki kez kullanılmış.`);
    gorulen.add(b.id);

    if (!GRUP_IDLERI.has(b.grup)) bildir('grup', `${b.id}: "${b.grup}" tanımlı bir grup değil.`);
    if (!b.ornekler || b.ornekler.length === 0) bildir('ornek', `${b.id}: hiç örnek yok.`);

    for (const olcut of b.wcag ?? []) {
      if (!WCAG_KALIP.test(olcut)) bildir('wcag', `${b.id}: "${olcut}" geçerli bir WCAG numarası değil.`);
    }

    // "ozgun" bir bileşenin Türkiye'ye özgü olduğunu söyler. Bu, benzerinin
    // başka ülkede bulunmadığı anlamına GELMEZ. Kore'nin de bir resmî afişi
    // vardır. Anlamı şudur: kural, biçim veya mevzuat Türkiye'ye aittir.
    // Bu yüzden özgün bir bileşen gerekçesini yazmak zorundadır.
    if (b.ozgun && !b.neden) {
      bildir('ozgun', `${b.id}: özgün işaretli, ama "neden" alanı yok.`);
    }
  }

  // 4 — örneklerdeki her trds- sınıfı derlenmiş CSS içinde geçmeli
  if (css) {
    const cssSiniflari = new Set([...css.matchAll(/\.(trds-[a-z0-9_-]+)/g)].map((e) => e[1]));
    const eksik = new Map();
    for (const b of BILESENLER) {
      for (const ornek of b.ornekler ?? []) {
        for (const eslesme of ornek.html.matchAll(/class="([^"]+)"/g)) {
          for (const sinif of eslesme[1].split(/\s+/)) {
            if (!sinif.startsWith('trds-')) continue;
            if (cssSiniflari.has(sinif)) continue;
            if (!eksik.has(sinif)) eksik.set(sinif, new Set());
            eksik.get(sinif).add(b.id);
          }
        }
      }
    }
    for (const [sinif, bilesenler] of eksik) {
      bildir('css', `.${sinif} CSS içinde yok. Kullanan: ${[...bilesenler].join(', ')}`);
    }
  }

  // 4b — örnek sayfalardaki her trds- sınıfı da CSS içinde geçmeli
  if (css) {
    const { readdir } = await import('node:fs/promises');
    const cssSiniflari = new Set([...css.matchAll(/\.(trds-[a-z0-9_-]+)/g)].map((e) => e[1]));
    const klasor = join(KOK, 'apps', 'docs', 'ornekler');
    const dosyalar = (await readdir(klasor).catch(() => [])).filter((d) => d.endsWith('.mjs'));
    for (const dosya of dosyalar) {
      const { ornek } = await import(join(klasor, dosya));
      for (const eslesme of ornek.govde.matchAll(/class="([^"]+)"/g)) {
        for (const sinif of eslesme[1].split(/\s+/)) {
          if (sinif.startsWith('trds-') && !cssSiniflari.has(sinif)) {
            bildir('ornek-css', `.${sinif} CSS içinde yok. Örnek: ${ornek.slug}`);
          }
          if (!sinif.startsWith('trds-')) {
            bildir('ornek-sinif', `${ornek.slug}: "${sinif}" TRDS dışı bir sınıf. Örnekler yalnız TRDS bileşeni kullanır.`);
          }
        }
      }
    }
  }

  // 4c — üretilmiş örnek sayfada bir metin çerçevede bir kez durur.
  // Çerçeve: başlık çubuğu, alt bilgi ve gövdedeki ikinci düzey başlıklar.
  // Aynı bağlantı metni alt bilgide iki kez, veya alt bilgi ile menüde birer
  // kez dursa denetim durur.
  {
    const { readdir, readFile: oku } = await import('node:fs/promises');
    const siteKlasoru = join(KOK, 'apps', 'docs', 'site', 'ornekler');
    const sayfalar = (await readdir(siteKlasoru, { withFileTypes: true }).catch(() => []))
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
    const duz = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
    const anahtar = (metin) => duz(metin).toLocaleLowerCase('tr');
    for (const slug of sayfalar) {
      const html = await oku(join(siteKlasoru, slug, 'index.html'), 'utf8').catch(() => '');
      const altBilgi = html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? '';
      const baslik = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';
      const govde = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
      const metinler = (parca, kalip) => [...parca.matchAll(kalip)].map((e) => anahtar(e[1])).filter((m) => m.length > 2);

      const altMetinler = [
        ...metinler(altBilgi, /<a [^>]*>([\s\S]*?)<\/a>/g),
        ...metinler(altBilgi, /<p class="trds-alt-bilgi__(?:sutun-baslik|kurum|ust-kurum|not|telif)">([\s\S]*?)<\/p>/g),
        ...metinler(altBilgi, /<span class="trds-alt-bilgi__iletisim-etiket">([\s\S]*?)<\/span>/g)
      ];
      const gorulen = new Set();
      for (const m of altMetinler) {
        if (gorulen.has(m)) bildir('alt-bilgi-tekrar', `${slug}: "${m}" alt bilgide iki kez duruyor.`);
        gorulen.add(m);
      }
      // Kurum adı sayfanın başında ve sonunda birer kez durur. Bu bir tekrar
      // değil, kimliktir. Menü karşılaştırması marka bağlantısını atlar.
      const menu = new Set(metinler(baslik.replace(/<a class="trds-baslik-cubugu__marka"[\s\S]*?<\/a>/, ''), /<a [^>]*>([\s\S]*?)<\/a>/g));
      const basliklar = new Set(metinler(govde, /<h[23][^>]*>([\s\S]*?)<\/h[23]>/g));
      for (const m of gorulen) {
        if (menu.has(m)) bildir('alt-bilgi-tekrar', `${slug}: "${m}" hem menüde hem alt bilgide duruyor.`);
        if (basliklar.has(m)) bildir('alt-bilgi-tekrar', `${slug}: "${m}" hem gövde başlığı hem alt bilgi metni.`);
      }
    }
  }

  // 4d — React ve Vue durumu tanım paketiyle örtüşmeli. Tanımı olan parça
  // 'stable', olmayan 'yok'. Her tanım kayıt defterinde bir parçaya bağlanır.
  {
    const { TANIMLAR, SARMALAYICISIZ } = await import(join(KOK, 'packages', 'tanim', 'src', 'index.js'));
    const tanimli = new Set(TANIMLAR.map((t) => t.id));
    for (const b of BILESENLER) {
      const bekle = tanimli.has(b.id) ? 'stable' : 'yok';
      for (const cerceve of ['react', 'vue']) {
        if (b.durum[cerceve] !== bekle) bildir('sarmalayici', `${b.id}: ${cerceve} durumu '${b.durum[cerceve]}', beklenen '${bekle}'.`);
      }
      if (!tanimli.has(b.id) && !SARMALAYICISIZ.includes(b.id)) bildir('sarmalayici', `${b.id}: tanım yok.`);
    }
    for (const t of TANIMLAR) if (!BILESENLER.some((b) => b.id === t.id)) bildir('sarmalayici', `${t.id}: tanım var, kayıt defterinde parça yok.`);
  }

  // 5 — her data-trds davranışı JavaScript içinde başlatılmalı
  if (js) {
    const davranislar = new Set();
    for (const b of BILESENLER) {
      for (const ornek of b.ornekler ?? []) {
        for (const eslesme of ornek.html.matchAll(/data-trds="([a-z-]+)"/g)) {
          davranislar.add(eslesme[1]);
        }
      }
    }
    for (const davranis of davranislar) {
      if (!js.includes(`'${davranis}'`) && !js.includes(`"${davranis}"`)) {
        bildir('js', `data-trds="${davranis}" için başlatıcı yok.`);
      }
    }
  }

  // Entegrasyon durumları bileşen durumlarıyla tutarlı mı
  const reactHazir = BILESENLER.filter((b) => b.durum.react === 'stable').length;
  const reactEntegrasyon = ENTEGRASYONLAR.find((e) => e.id === 'react');
  if (reactEntegrasyon?.durum === 'stable' && reactHazir < BILESENLER.length / 2) {
    bildir('entegrasyon', 'React entegrasyonu kararlı görünüyor, ama bileşenlerin yarısından azı hazır.');
  }

  // ------------------------------------------------------------------ sonuç
  const ozet = [
    `bileşen: ${BILESENLER.length}`,
    `grup: ${GRUPLAR.length}`,
    `entegrasyon: ${ENTEGRASYONLAR.length}`,
    `örnek: ${BILESENLER.reduce((t, b) => t + (b.ornekler?.length ?? 0), 0)}`
  ].join(' · ');
  console.log(ozet);

  if (sorunlar.length === 0) {
    console.log('Bütünlük denetimi geçti.');
    return;
  }

  console.error(`\n${sorunlar.length} sorun bulundu:`);
  for (const s of sorunlar) console.error(`  [${s.kural}] ${s.ileti}`);
  process.exit(1);
}

main().catch((hata) => {
  console.error(hata);
  process.exit(1);
});
