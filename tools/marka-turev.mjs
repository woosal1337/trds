// TRDS işaretinin PNG ve ICO türevlerini kaynak SVG'den üretir.
// Elle çalıştırılır, yapı hattının parçası değildir:
//   node tools/marka-turev.mjs
// Kaynak: packages/identity/src/kaynak/trds-isaret.svg
// Çıktı:  aynı klasöre trds-isaret-<boyut>.png ve trds-favicon.ico
//
// Bağımlılık yok. Yalnız <rect> okur, yuvarlak köşeyi (rx) hesaba katar ve
// süper örneklemeyle kenar yumuşatma uygular.

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { deflateSync, crc32 } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const KOK = dirname(dirname(fileURLToPath(import.meta.url)));
const KAYNAK = join(KOK, 'packages', 'identity', 'src', 'kaynak');
const ISARET = join(KAYNAK, 'trds-isaret.svg');

// İşaretin sabit rengi. Birincil güçlü mavi belirtecinin değeri.
const RENK = [17, 42, 81];
const PNG_BOYUTLAR = [16, 32, 48, 64, 128, 196];
const ICO_BOYUTLAR = [16, 32, 48];
const ORNEK = 8; // piksel başına ORNEK×ORNEK alt örnek

/** SVG metnindeki her <rect> için [x, y, genişlik, yükseklik, yarıçap]. */
const rectleriOku = (metin) =>
  [...metin.matchAll(/<rect\b[^>]*>/g)].map(([etiket]) => {
    const oz = Object.fromEntries([...etiket.matchAll(/([a-z]+)="([^"]*)"/g)].map(([, a, d]) => [a, d]));
    return [Number(oz.x), Number(oz.y), Number(oz.width), Number(oz.height), Number(oz.rx ?? 0)];
  });

/** Nokta rect'lerden birinin içinde mi. Yuvarlak köşede en yakın iç merkeze uzaklığa bakar. */
const icinde = (px, py, rects) =>
  rects.some(([x, y, g, y2, r]) => {
    if (px < x || px > x + g || py < y || py > y + y2) return false;
    if (r <= 0) return true;
    const mx = Math.min(Math.max(px, x + r), x + g - r);
    const my = Math.min(Math.max(py, y + r), y + y2 - r);
    return (px - mx) ** 2 + (py - my) ** 2 <= r * r + 1e-9;
  });

/** Ham RGBA satırları: her satır bir filtre baytıyla başlar (PNG filtre 0). */
const cizdir = (rects, boyut) => {
  const satirlar = [];
  for (let j = 0; j < boyut; j += 1) {
    const satir = Buffer.alloc(1 + boyut * 4);
    for (let i = 0; i < boyut; i += 1) {
      let vurus = 0;
      for (let aj = 0; aj < ORNEK; aj += 1) {
        for (let ai = 0; ai < ORNEK; ai += 1) {
          const ux = ((i + (ai + 0.5) / ORNEK) / boyut) * 24;
          const uy = ((j + (aj + 0.5) / ORNEK) / boyut) * 24;
          if (icinde(ux, uy, rects)) vurus += 1;
        }
      }
      const p = 1 + i * 4;
      satir[p] = RENK[0];
      satir[p + 1] = RENK[1];
      satir[p + 2] = RENK[2];
      satir[p + 3] = Math.round((255 * vurus) / (ORNEK * ORNEK));
    }
    satirlar.push(satir);
  }
  return Buffer.concat(satirlar);
};

const parca = (tur, veri) => {
  const govde = Buffer.concat([Buffer.from(tur, 'latin1'), veri]);
  const uzunluk = Buffer.alloc(4);
  uzunluk.writeUInt32BE(veri.length);
  const kontrol = Buffer.alloc(4);
  kontrol.writeUInt32BE(crc32(govde) >>> 0);
  return Buffer.concat([uzunluk, govde, kontrol]);
};

const pngKur = (boyut, ham) => {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(boyut, 0);
  ihdr.writeUInt32BE(boyut, 4);
  ihdr[8] = 8; // bit derinliği
  ihdr[9] = 6; // renk tipi: RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    parca('IHDR', ihdr),
    parca('IDAT', deflateSync(ham, { level: 9 })),
    parca('IEND', Buffer.alloc(0)),
  ]);
};

/** PNG gömülü ICO. Her girdi 16 baytlık dizin kaydı taşır. */
const icoKur = (pngler) => {
  const bas = Buffer.alloc(6);
  bas.writeUInt16LE(0, 0);
  bas.writeUInt16LE(1, 2); // tür: simge
  bas.writeUInt16LE(pngler.length, 4);
  let ofset = 6 + 16 * pngler.length;
  const dizin = [];
  for (const [boyut, veri] of pngler) {
    const kayit = Buffer.alloc(16);
    kayit[0] = boyut < 256 ? boyut : 0;
    kayit[1] = boyut < 256 ? boyut : 0;
    kayit.writeUInt16LE(1, 4); // renk düzlemi
    kayit.writeUInt16LE(32, 6); // bit derinliği
    kayit.writeUInt32LE(veri.length, 8);
    kayit.writeUInt32LE(ofset, 12);
    dizin.push(kayit);
    ofset += veri.length;
  }
  return Buffer.concat([bas, ...dizin, ...pngler.map(([, v]) => v)]);
};

/** Alfası 128'in üstündeki piksel sayısı. Piksel hizasını doğrulamak için. */
const opakSay = (ham, boyut) => {
  let n = 0;
  for (let j = 0; j < boyut; j += 1) {
    for (let i = 0; i < boyut; i += 1) {
      if (ham[j * (1 + boyut * 4) + 1 + i * 4 + 3] > 128) n += 1;
    }
  }
  return n;
};

const rects = rectleriOku(await readFile(ISARET, 'utf8'));
if (rects.length === 0) throw new Error(`${ISARET} içinde <rect> bulunamadı`);

const onbellek = new Map();
const png = (boyut) => {
  if (!onbellek.has(boyut)) {
    const ham = cizdir(rects, boyut);
    onbellek.set(boyut, { veri: pngKur(boyut, ham), opak: opakSay(ham, boyut) });
  }
  return onbellek.get(boyut);
};

for (const boyut of PNG_BOYUTLAR) {
  const { veri, opak } = png(boyut);
  await writeFile(join(KAYNAK, `trds-isaret-${boyut}.png`), veri);
  console.log(`trds-isaret-${boyut}.png · ${veri.length} bayt · opak ${opak}/${boyut * boyut}`);
}

const ico = icoKur(ICO_BOYUTLAR.map((b) => [b, png(b).veri]));
await writeFile(join(KAYNAK, 'trds-favicon.ico'), ico);
console.log(`trds-favicon.ico · ${ico.length} bayt · ${ICO_BOYUTLAR.join(', ')} piksel`);
