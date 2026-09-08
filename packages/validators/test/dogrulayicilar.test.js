// node --test packages/validators/test/
//
// Bu testler ağ kullanmaz ve bağımlılık istemez. Node 20 ve üstü yeterlidir.

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  trBuyuk,
  trKucuk,
  trSirala,
  tcKimlikGecerli,
  yabanciKimlikGecerli,
  kimlikNoDenetle,
  vergiNoGecerli,
  ibanGecerli,
  ibanKontrolHesapla,
  ibanBicimle,
  ibanBankaKodu,
  telefonNormalle,
  telefonGecerli,
  telefonBicimle,
  plakaDenetle,
  plakaBicimle,
  postaKoduGecerli,
  tarihDenetle,
  tarihBicimle,
  tarihUzunBicimle,
  tlBicimle
} from '../src/index.js';

// ---------------------------------------------------------------------------

test('trBuyuk noktalı ve noktasız i harflerini doğru çevirir', () => {
  assert.equal(trBuyuk('istanbul'), 'İSTANBUL');
  assert.equal(trBuyuk('ısparta'), 'ISPARTA');
  assert.equal(trBuyuk('34 iz 1234'), '34 İZ 1234');
  // Bu satır hatayı gösterir: yerleşik çevrim yanlış plaka üretir.
  assert.notEqual('34 iz 1234'.toUpperCase(), trBuyuk('34 iz 1234'));
});

test('trKucuk noktalı ve noktasız I harflerini doğru çevirir', () => {
  assert.equal(trKucuk('İSTANBUL'), 'istanbul');
  assert.equal(trKucuk('ISPARTA'), 'ısparta');
});

test('trSirala Türkçe alfabe sırasını kullanır', () => {
  const iller = ['Çanakkale', 'Adana', 'İzmir', 'Isparta', 'Şanlıurfa', 'Sakarya'];
  const sirali = [...iller].sort(trSirala);
  assert.deepEqual(sirali, ['Adana', 'Çanakkale', 'Isparta', 'İzmir', 'Sakarya', 'Şanlıurfa']);
});

// ---------------------------------------------------------------------------

test('tcKimlikGecerli bilinen geçerli numarayı kabul eder', () => {
  assert.equal(tcKimlikGecerli('10000000146'), true);
});

test('tcKimlikGecerli tek hane değişince reddeder', () => {
  assert.equal(tcKimlikGecerli('10000000147'), false);
  assert.equal(tcKimlikGecerli('10000000246'), false);
});

test('tcKimlikGecerli 0 ile başlayan numarayı reddeder', () => {
  assert.equal(tcKimlikGecerli('00000000146'), false);
});

test('tcKimlikGecerli yanlış uzunluğu reddeder', () => {
  assert.equal(tcKimlikGecerli('1000000014'), false);
  assert.equal(tcKimlikGecerli('100000001466'), false);
  assert.equal(tcKimlikGecerli(''), false);
});

test('tcKimlikGecerli boşluklu ve tireli yazımı kabul eder', () => {
  assert.equal(tcKimlikGecerli('100 000 001 46'), true);
  assert.equal(tcKimlikGecerli('10000000-146'), true);
});

test('tcKimlikGecerli aynı rakamdan oluşan numarayı sağlamaya göre değerlendirir', () => {
  assert.equal(tcKimlikGecerli('11111111111'), false);
});

// ---------------------------------------------------------------------------

test('yabanciKimlikGecerli 99 ile başlayan 11 haneyi kabul eder', () => {
  assert.equal(yabanciKimlikGecerli('99123456789'), true);
  assert.equal(yabanciKimlikGecerli('98123456789'), false);
  assert.equal(yabanciKimlikGecerli('9912345678'), false);
});

test('kimlikNoDenetle yabancı numarayı yalnız izin verilince kabul eder', () => {
  assert.equal(kimlikNoDenetle('99123456789').gecerli, false);
  const acik = kimlikNoDenetle('99123456789', { yabanciKabul: true });
  assert.equal(acik.gecerli, true);
  assert.equal(acik.tur, 'yabanci');
});

test('kimlikNoDenetle hata metnini kullanıcının anlayacağı dilde verir', () => {
  assert.equal(kimlikNoDenetle('123').hata, 'Kimlik numarası 11 hane olmalıdır. 3 hane girdiniz.');
  assert.equal(kimlikNoDenetle('').hata, 'Kimlik numaranızı yazın.');
  assert.equal(kimlikNoDenetle('00000000146').hata, 'Kimlik numarası 0 ile başlayamaz.');
  assert.match(kimlikNoDenetle('10000000147').hata, /Sağlama hanesi/);
});

// ---------------------------------------------------------------------------

test('vergiNoGecerli kendi ürettiği sağlama hanesini doğrular', () => {
  // Gövdeyi al, sağlama hanesini algoritmanın kendisiyle üret, sonra doğrula.
  const govde = '012345678';
  let bulunan = null;
  for (let hane = 0; hane <= 9; hane += 1) {
    if (vergiNoGecerli(`${govde}${hane}`)) bulunan = hane;
  }
  assert.notEqual(bulunan, null, 'bir sağlama hanesi bulunmalıdır');
  assert.equal(vergiNoGecerli(`${govde}${bulunan}`), true);
  assert.equal(vergiNoGecerli(`${govde}${(bulunan + 1) % 10}`), false);
});

test('vergiNoGecerli yanlış uzunluğu reddeder', () => {
  assert.equal(vergiNoGecerli('12345'), false);
  assert.equal(vergiNoGecerli('12345678901'), false);
});

// ---------------------------------------------------------------------------

test('ibanGecerli kendi hesapladığı kontrol hanesini doğrular', () => {
  const govde = '0006100519786457841326'; // 22 karakter: banka + rezerv + hesap
  const kontrol = ibanKontrolHesapla('TR', govde);
  const iban = `TR${kontrol}${govde}`;
  assert.equal(iban.length, 26);
  assert.equal(ibanGecerli(iban), true);
});

test('ibanGecerli tek hane değişince reddeder', () => {
  const govde = '0006100519786457841326';
  const iban = `TR${ibanKontrolHesapla('TR', govde)}${govde}`;
  const bozuk = `${iban.slice(0, 10)}${iban[10] === '9' ? '8' : '9'}${iban.slice(11)}`;
  assert.equal(ibanGecerli(bozuk), false);
});

test('ibanGecerli boşluklu ve küçük harfli yazımı kabul eder', () => {
  const govde = '0006100519786457841326';
  const iban = `TR${ibanKontrolHesapla('TR', govde)}${govde}`;
  assert.equal(ibanGecerli(ibanBicimle(iban)), true);
  assert.equal(ibanGecerli(iban.toLowerCase()), true);
});

test('ibanGecerli yanlış uzunluktaki TR numarasını reddeder', () => {
  assert.equal(ibanGecerli('TR33 0006 1005 1978 6457 8413'), false);
});

test('ibanBicimle dörderli gruplar', () => {
  assert.equal(ibanBicimle('TR330006100519786457841326'), 'TR33 0006 1005 1978 6457 8413 26');
});

test('ibanBankaKodu beş haneli banka kodunu verir', () => {
  assert.equal(ibanBankaKodu('TR330006100519786457841326'), '00061');
  assert.equal(ibanBankaKodu('DE89370400440532013000'), null);
});

// ---------------------------------------------------------------------------

test('telefonNormalle her yazım biçimini 10 haneye indirir', () => {
  const beklenen = '5321234567';
  assert.equal(telefonNormalle('0532 123 45 67'), beklenen);
  assert.equal(telefonNormalle('+90 532 123 45 67'), beklenen);
  assert.equal(telefonNormalle('90 532 123 45 67'), beklenen);
  assert.equal(telefonNormalle('00905321234567'), beklenen);
  assert.equal(telefonNormalle('532-123-45-67'), beklenen);
  assert.equal(telefonNormalle('5321234567'), beklenen);
});

test('telefonGecerli sabit hattı ve cebi ayırır', () => {
  assert.equal(telefonGecerli('0212 123 45 67'), true);
  assert.equal(telefonGecerli('0212 123 45 67', { yalnizCep: true }), false);
  assert.equal(telefonGecerli('0532 123 45 67', { yalnizCep: true }), true);
});

test('telefonGecerli geçersiz ilk haneyi reddeder', () => {
  assert.equal(telefonGecerli('0132 123 45 67'), false);
  assert.equal(telefonGecerli('0932 123 45 67'), false);
});

test('telefonBicimle okunur bir biçim verir', () => {
  assert.equal(telefonBicimle('05321234567'), '532 123 45 67');
});

// ---------------------------------------------------------------------------

test('plakaDenetle üç harf kalıbının hepsini kabul eder', () => {
  assert.equal(plakaDenetle('34 A 1234').gecerli, true);
  assert.equal(plakaDenetle('06 AB 123').gecerli, true);
  assert.equal(plakaDenetle('35 ABC 12').gecerli, true);
  assert.equal(plakaDenetle('16ABC123').gecerli, true);
});

test('plakaDenetle geçersiz il kodunu reddeder', () => {
  assert.equal(plakaDenetle('82 ABC 123').gecerli, false);
  assert.equal(plakaDenetle('00 ABC 123').gecerli, false);
});

test('plakaDenetle yanlış rakam sayısını reddeder', () => {
  assert.equal(plakaDenetle('34 ABC 1234').gecerli, false);
  assert.equal(plakaDenetle('34 A 123').gecerli, false);
});

test('plakaDenetle Türkçe harfleri doğru büyütür', () => {
  const p = plakaDenetle('34 iz 1234');
  assert.equal(p.gecerli, true);
  assert.equal(p.harf, 'İZ');
  assert.equal(plakaBicimle('34iz1234'), '34 İZ 1234');
});

test('postaKoduGecerli il kodunu denetler', () => {
  assert.equal(postaKoduGecerli('34710'), true);
  assert.equal(postaKoduGecerli('06510'), true);
  assert.equal(postaKoduGecerli('82000'), false);
  assert.equal(postaKoduGecerli('3471'), false);
});

// ---------------------------------------------------------------------------

test('tarihDenetle geçerli tarihi kabul eder', () => {
  const s = tarihDenetle({ gun: '27', ay: '03', yil: '1997' });
  assert.equal(s.gecerli, true);
  assert.equal(tarihBicimle(s.tarih), '27.03.1997');
});

test('tarihDenetle var olmayan günü yakalar', () => {
  const s = tarihDenetle({ gun: '31', ay: '02', yil: '2026' });
  assert.equal(s.gecerli, false);
  assert.equal(s.alan, 'gun');
});

test('tarihDenetle artık yılı bilir', () => {
  assert.equal(tarihDenetle({ gun: '29', ay: '02', yil: '2024' }).gecerli, true);
  assert.equal(tarihDenetle({ gun: '29', ay: '02', yil: '2023' }).gecerli, false);
});

test('tarihDenetle hangi alanın hatalı olduğunu söyler', () => {
  assert.equal(tarihDenetle({ gun: '45', ay: '03', yil: '1997' }).alan, 'gun');
  assert.equal(tarihDenetle({ gun: '01', ay: '13', yil: '1997' }).alan, 'ay');
  assert.equal(tarihDenetle({ gun: '01', ay: '03', yil: '97' }).alan, 'yil');
});

test('tarihDenetle gelecek tarihi isteğe bağlı olarak yasaklar', () => {
  const gelecek = { gun: '01', ay: '01', yil: '2099' };
  assert.equal(tarihDenetle(gelecek).gecerli, true);
  assert.equal(tarihDenetle(gelecek, { gelecekYasak: true }).gecerli, false);
});

test('tarihUzunBicimle ay adını Türkçe yazar', () => {
  const s = tarihDenetle({ gun: '27', ay: '03', yil: '1997' });
  assert.equal(tarihUzunBicimle(s.tarih), '27 Mart 1997');
});

// ---------------------------------------------------------------------------

test('tlBicimle kuruşu Türk Lirası olarak yazar', () => {
  assert.equal(tlBicimle(125000), '1.250,00 ₺');
  assert.equal(tlBicimle(0), '0,00 ₺');
  assert.equal(tlBicimle(99), '0,99 ₺');
});
