import test from 'node:test';
import assert from 'node:assert/strict';
import { guvenliGezinmeAdresi } from '../src/scripts/trds.js';

const taban = 'https://example.gov.tr/hizmetler/';

test('arama HTTP ve HTTPS bağlantılarını kabul eder', () => {
  for (const [girdi, beklenen] of [
    ['/basvuru', 'https://example.gov.tr/basvuru'],
    ['ikamet?q=ankara', 'https://example.gov.tr/hizmetler/ikamet?q=ankara'],
    ['#sonuc', 'https://example.gov.tr/hizmetler/#sonuc'],
    ['https://diger.gov.tr/hizmet', 'https://diger.gov.tr/hizmet'],
    ['http://localhost:4173/ornekler/', 'http://localhost:4173/ornekler/'],
    ['//diger.gov.tr/', 'https://diger.gov.tr/']
  ]) {
    assert.equal(guvenliGezinmeAdresi(girdi, taban), beklenen);
  }
});

test('arama çalıştırılabilir ve geçersiz adresleri reddeder', () => {
  for (const girdi of [
    'javascript:alert(1)', 'JaVaScRiPt:alert(1)', ' javascript:alert(1)',
    'java\nscript:alert(1)', 'java\tscript:alert(1)', '\u0000javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>', 'vbscript:msgbox(1)',
    'file:///tmp/test', 'blob:https://example.gov.tr/123', 'mailto:test@example.gov.tr',
    'https://kullanici:parola@example.gov.tr/', 'https://[', '', ' ', '#', null, undefined, {}, 42
  ]) {
    assert.equal(guvenliGezinmeAdresi(girdi, taban), '', String(girdi));
  }
});
