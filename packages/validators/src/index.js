// @kiris-ds/validators · Türkiye’ye özgü doğrulama ve biçimlendirme.
//
// Bu paketin var olma sebebi tek bir cümledir: bugün her kurum bu on işlevi
// yeniden yazıyor ve çoğu yalnız hane sayısına bakıyor. Buradaki her algoritma
// testlidir. Hiçbiri ağ çağrısı yapmaz.
//
// İstemci doğrulaması sunucu doğrulamasının yerine geçmez. İkisini de yapın.

// ---------------------------------------------------------------------------
// Türkçe büyük ve küçük harf
// ---------------------------------------------------------------------------

const BUYUK_HARITA = { i: 'İ', ı: 'I' };
const KUCUK_HARITA = { I: 'ı', İ: 'i' };

/**
 * Türkçe kuralına göre büyük harfe çevirir.
 * `"istanbul".toUpperCase()` "ISTANBUL" verir. Doğrusu "İSTANBUL" olur.
 * Bu fark bir plaka sorgusunda yanlış aracı bulur.
 * @param {string} metin
 * @returns {string}
 */
export function trBuyuk(metin) {
  return String(metin).replace(/[iı]/g, (h) => BUYUK_HARITA[h]).toUpperCase();
}

/**
 * Türkçe kuralına göre küçük harfe çevirir.
 * @param {string} metin
 * @returns {string}
 */
export function trKucuk(metin) {
  return String(metin).replace(/[Iİ]/g, (h) => KUCUK_HARITA[h]).toLowerCase();
}

/**
 * Türkçe alfabe sırasına göre karşılaştırır. Liste ve tablo sıralamasında
 * kullanın. `Array.prototype.sort` varsayılanı ç, ğ, ı, ö, ş ve ü harflerini
 * yanlış yere koyar.
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function trSirala(a, b) {
  return String(a).localeCompare(String(b), 'tr', { sensitivity: 'base' });
}

// ---------------------------------------------------------------------------
// Kimlik numaraları
// ---------------------------------------------------------------------------

const yalnizRakam = (deger) => String(deger ?? '').replace(/\D/g, '');

/**
 * T.C. kimlik numarasının sağlama toplamını doğrular.
 *
 * Kural:
 *   d10 = ((d1+d3+d5+d7+d9) * 7 - (d2+d4+d6+d8)) mod 10
 *   d11 = (d1 + ... + d10) mod 10
 * Ayrıca ilk hane 0 olamaz.
 *
 * @param {string} deger
 * @returns {boolean}
 */
export function tcKimlikGecerli(deger) {
  const n = yalnizRakam(deger);
  if (n.length !== 11) return false;
  if (n[0] === '0') return false;

  const h = [...n].map(Number);
  const tek = h[0] + h[2] + h[4] + h[6] + h[8];
  const cift = h[1] + h[3] + h[5] + h[7];

  const onuncu = (tek * 7 - cift) % 10;
  if (((onuncu + 10) % 10) !== h[9]) return false;

  const toplam = h.slice(0, 10).reduce((a, b) => a + b, 0);
  return toplam % 10 === h[10];
}

/**
 * Yabancı kimlik numarası biçimini doğrular. Bu numara 99 ile başlar ve
 * T.C. kimlik numarasının sağlama toplamını taşımaz. Bu yüzden yalnız biçim
 * denetlenir. Kesin doğrulama NVİ servisinden yapılır.
 * @param {string} deger
 * @returns {boolean}
 */
export function yabanciKimlikGecerli(deger) {
  const n = yalnizRakam(deger);
  return n.length === 11 && n.startsWith('99');
}

/**
 * Hem T.C. hem yabancı kimlik numarasını kabul eden tek giriş noktası.
 * @param {string} deger
 * @param {{ yabanciKabul?: boolean }} [secenek]
 * @returns {{ gecerli: boolean, tur: 'tc'|'yabanci'|null, hata: string|null }}
 */
export function kimlikNoDenetle(deger, secenek = {}) {
  const { yabanciKabul = false } = secenek;
  const n = yalnizRakam(deger);

  if (n.length === 0) return { gecerli: false, tur: null, hata: 'Kimlik numaranızı yazın.' };
  if (n.length !== 11) {
    return { gecerli: false, tur: null, hata: `Kimlik numarası 11 hane olmalıdır. ${n.length} hane girdiniz.` };
  }
  if (n[0] === '0') return { gecerli: false, tur: null, hata: 'Kimlik numarası 0 ile başlayamaz.' };

  if (yabanciKabul && n.startsWith('99')) {
    return { gecerli: true, tur: 'yabanci', hata: null };
  }
  if (tcKimlikGecerli(n)) {
    return { gecerli: true, tur: 'tc', hata: null };
  }
  return {
    gecerli: false,
    tur: null,
    hata: 'Kimlik numarasını kontrol edin. Sağlama hanesi tutmuyor, bir rakam hatalı görünüyor.'
  };
}

/**
 * Vergi kimlik numarasının sağlama toplamını doğrular. 10 hanedir.
 * @param {string} deger
 * @returns {boolean}
 */
export function vergiNoGecerli(deger) {
  const n = yalnizRakam(deger);
  if (n.length !== 10) return false;

  let toplam = 0;
  for (let i = 0; i < 9; i += 1) {
    const gecici = (Number(n[i]) + 9 - i) % 10;
    if (gecici === 0) continue;
    const katki = (gecici * 2 ** (9 - i)) % 9;
    toplam += katki === 0 ? 9 : katki;
  }
  return ((10 - (toplam % 10)) % 10) === Number(n[9]);
}

// ---------------------------------------------------------------------------
// IBAN
// ---------------------------------------------------------------------------

const IBAN_UZUNLUK = { TR: 26 };

const mod97 = (metin) => {
  let kalan = 0;
  for (const karakter of metin) {
    kalan = (kalan * 10 + Number(karakter)) % 97;
  }
  return kalan;
};

const ibanSayisallastir = (iban) =>
  [...iban.slice(4) + iban.slice(0, 4)]
    .map((k) => (/[A-Z]/.test(k) ? String(k.charCodeAt(0) - 55) : k))
    .join('');

/**
 * IBAN sağlamasını mod 97 kuralı ile doğrular. Boşlukları ve küçük harfleri
 * kabul eder ve temizler.
 * @param {string} deger
 * @returns {boolean}
 */
export function ibanGecerli(deger) {
  const t = String(deger ?? '').replace(/\s+/g, '').toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(t)) return false;
  const beklenen = IBAN_UZUNLUK[t.slice(0, 2)];
  if (beklenen && t.length !== beklenen) return false;
  return mod97(ibanSayisallastir(t)) === 1;
}

/**
 * Bir IBAN gövdesi için iki haneli kontrol numarasını hesaplar.
 * Test ve veri üretimi için kullanılır.
 * @param {string} ulke  iki harfli ülke kodu
 * @param {string} govde kontrol haneleri olmadan IBAN gövdesi
 * @returns {string} iki haneli kontrol numarası
 */
export function ibanKontrolHesapla(ulke, govde) {
  const gecici = `${ulke.toUpperCase()}00${govde.toUpperCase()}`;
  const kalan = mod97(ibanSayisallastir(gecici));
  return String(98 - kalan).padStart(2, '0');
}

/**
 * IBAN’ı dörderli gruplayarak gösterime hazırlar. Gönderilen değer boşluksuz
 * kalır, yalnız ekranda gruplanır.
 * @param {string} deger
 * @returns {string}
 */
export function ibanBicimle(deger) {
  const t = String(deger ?? '').replace(/\s+/g, '').toUpperCase();
  return t.replace(/(.{4})/g, '$1 ').trim();
}

/**
 * Türk IBAN’ından beş haneli banka kodunu çıkarır. Konum: 5. ile 9. karakter.
 * @param {string} deger
 * @returns {string|null}
 */
export function ibanBankaKodu(deger) {
  const t = String(deger ?? '').replace(/\s+/g, '').toUpperCase();
  if (!t.startsWith('TR') || t.length !== 26) return null;
  return t.slice(4, 9);
}

// ---------------------------------------------------------------------------
// Telefon
// ---------------------------------------------------------------------------

/**
 * Telefon numarasını 10 haneye indirger. Başta yazılan 0, +90, 90 ve boşluk
 * gibi ayraçlar sessizce kaldırılır. Kullanıcı numarasını istediği gibi yazar.
 * @param {string} deger
 * @returns {string} 10 haneli numara, veya temizlenmiş kısmi değer
 */
export function telefonNormalle(deger) {
  let n = yalnizRakam(deger);
  if (n.startsWith('0090')) n = n.slice(4);
  if (n.startsWith('90') && n.length > 10) n = n.slice(2);
  if (n.startsWith('0')) n = n.slice(1);
  return n;
}

/**
 * Türk telefon numarasını doğrular. İlk hane 2, 3, 4 veya 5 olur.
 * 5 ile başlayan numara cep telefonudur.
 * @param {string} deger
 * @param {{ yalnizCep?: boolean }} [secenek]
 * @returns {boolean}
 */
export function telefonGecerli(deger, secenek = {}) {
  const n = telefonNormalle(deger);
  if (!/^[2-5]\d{9}$/.test(n)) return false;
  if (secenek.yalnizCep && n[0] !== '5') return false;
  return true;
}

/**
 * Telefon numarasını 5XX XXX XX XX biçiminde gösterir.
 * @param {string} deger
 * @returns {string}
 */
export function telefonBicimle(deger) {
  const n = telefonNormalle(deger);
  if (n.length !== 10) return n;
  return `${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6, 8)} ${n.slice(8)}`;
}

// ---------------------------------------------------------------------------
// Plaka ve posta kodu
// ---------------------------------------------------------------------------

const IL_KODU = /^(0[1-9]|[1-7]\d|8[01])$/;

/**
 * Türk araç plakasını doğrular ve parçalarına ayırır.
 * Kabul edilen kalıplar: 1 harf ve 4 veya 5 rakam, 2 harf ve 3 veya 4 rakam,
 * 3 harf ve 2 veya 3 rakam.
 * @param {string} deger
 * @returns {{ gecerli: boolean, il: string|null, harf: string|null, sayi: string|null }}
 */
export function plakaDenetle(deger) {
  const t = trBuyuk(String(deger ?? '')).replace(/[\s-]/g, '');
  const eslesme = t.match(/^(\d{2})([A-ZÇĞİÖŞÜ]{1,3})(\d{2,5})$/);
  const bos = { gecerli: false, il: null, harf: null, sayi: null };
  if (!eslesme) return bos;

  const [, il, harf, sayi] = eslesme;
  if (!IL_KODU.test(il)) return bos;

  const izin = { 1: [4, 5], 2: [3, 4], 3: [2, 3] }[harf.length];
  if (!izin.includes(sayi.length)) return bos;

  return { gecerli: true, il, harf, sayi };
}

/**
 * Plakayı "34 ABC 123" biçiminde gösterir.
 * @param {string} deger
 * @returns {string}
 */
export function plakaBicimle(deger) {
  const p = plakaDenetle(deger);
  if (!p.gecerli) return trBuyuk(String(deger ?? ''));
  return `${p.il} ${p.harf} ${p.sayi}`;
}

/**
 * Posta kodunu doğrular. Beş hanedir ve ilk iki hane il kodudur.
 * @param {string} deger
 * @returns {boolean}
 */
export function postaKoduGecerli(deger) {
  const n = yalnizRakam(deger);
  return n.length === 5 && IL_KODU.test(n.slice(0, 2));
}

// ---------------------------------------------------------------------------
// Tarih
// ---------------------------------------------------------------------------

export const AYLAR = [
  'ocak', 'şubat', 'mart', 'nisan', 'mayıs', 'haziran',
  'temmuz', 'ağustos', 'eylül', 'ekim', 'kasım', 'aralık'
];

/**
 * Üç parçalı tarih girişini doğrular. Hangi parçanın hatalı olduğunu söyler,
 * böylece odak doğru alana gider.
 * @param {{ gun: string|number, ay: string|number, yil: string|number }} parcalar
 * @param {{ gelecekYasak?: boolean, enEskiYil?: number }} [secenek]
 * @returns {{ gecerli: boolean, hata: string|null, alan: 'gun'|'ay'|'yil'|null, tarih: Date|null }}
 */
export function tarihDenetle(parcalar, secenek = {}) {
  const { gelecekYasak = false, enEskiYil = 1900 } = secenek;
  const gun = Number(yalnizRakam(parcalar.gun));
  const ay = Number(yalnizRakam(parcalar.ay));
  const yil = Number(yalnizRakam(parcalar.yil));

  const bos = (hata, alan) => ({ gecerli: false, hata, alan, tarih: null });

  if (!parcalar.gun && !parcalar.ay && !parcalar.yil) return bos('Tarihi yazın.', 'gun');
  if (!gun || gun < 1 || gun > 31) return bos('Gün 1 ile 31 arasında olmalıdır.', 'gun');
  if (!ay || ay < 1 || ay > 12) return bos('Ay 1 ile 12 arasında olmalıdır.', 'ay');
  if (String(yalnizRakam(parcalar.yil)).length !== 4) return bos('Yılı dört hane olarak yazın.', 'yil');
  if (yil < enEskiYil) return bos(`Yıl ${enEskiYil} yılından önce olamaz.`, 'yil');

  const tarih = new Date(Date.UTC(yil, ay - 1, gun));
  const gercek =
    tarih.getUTCFullYear() === yil && tarih.getUTCMonth() === ay - 1 && tarih.getUTCDate() === gun;
  if (!gercek) return bos(`${ay}. ayda ${gun}. gün yoktur.`, 'gun');

  if (gelecekYasak && tarih.getTime() > Date.now()) {
    return bos('Tarih bugünden sonra olamaz.', 'yil');
  }
  return { gecerli: true, hata: null, alan: null, tarih };
}

/**
 * Tarihi Türkçe gg.aa.yyyy biçiminde yazar.
 * @param {Date} tarih
 * @returns {string}
 */
export function tarihBicimle(tarih) {
  const iki = (s) => String(s).padStart(2, '0');
  return `${iki(tarih.getUTCDate())}.${iki(tarih.getUTCMonth() + 1)}.${tarih.getUTCFullYear()}`;
}

/**
 * Tarihi "27 Mart 1997" biçiminde yazar. Ay adı Türkçe kuralına göre yazılır.
 * @param {Date} tarih
 * @returns {string}
 */
export function tarihUzunBicimle(tarih) {
  const ad = AYLAR[tarih.getUTCMonth()];
  return `${tarih.getUTCDate()} ${trBuyuk(ad[0]) + ad.slice(1)} ${tarih.getUTCFullYear()}`;
}

// ---------------------------------------------------------------------------
// Para
// ---------------------------------------------------------------------------

/**
 * Tutarı Türk Lirası olarak yazar: 1.250,00 ₺
 * @param {number} kurus tam sayı olarak kuruş değeri
 * @returns {string}
 */
export function tlBicimle(kurus) {
  const tutar = Number(kurus) / 100;
  return `${tutar.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺`;
}
