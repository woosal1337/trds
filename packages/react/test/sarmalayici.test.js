// Her tanım React ile çizilir. Kök sınıf, davranış özniteliği ve kayıt
// defteri kapsamı denetlenir. React ile Vue çıktısı da karşılaştırılır.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { TANIMLAR, SARMALAYICISIZ } from '@tr-ds/tanim';
import * as R from '@tr-ds/react';
import { BILESENLER } from '../../../tools/registry/00-index.mjs';

const ciz = (t) => renderToStaticMarkup(createElement(R[t.ad], t.ornek));

test('her tanım React ile çizilir ve kök sınıfı taşır', () => {
  for (const t of TANIMLAR) {
    assert.ok(R[t.ad], `${t.id}: ${t.ad} dışa aktarılmadı`);
    const html = ciz(t);
    assert.ok(html.length > 0, `${t.id}: boş çıktı`);
    assert.ok(html.includes(`class="${t.kok}`) || html.includes(` ${t.kok}`) || html.includes(`class="${t.kok.replace('trds-', 'trds-')}`), `${t.id}: kök sınıf ${t.kok} yok:\n${html.slice(0, 200)}`);
    assert.ok(!html.includes('undefined'), `${t.id}: çıktıda "undefined":\n${html.slice(0, 300)}`);
    if (t.davranis) assert.ok(html.includes(`data-trds="${t.davranis}"`), `${t.id}: data-trds="${t.davranis}" yok`);
  }
});

test('kayıt defterindeki her parçanın bir sarmalayıcısı var', () => {
  const tanimli = new Set(TANIMLAR.map((t) => t.id));
  for (const b of BILESENLER) {
    if (SARMALAYICISIZ.includes(b.id)) continue;
    assert.ok(tanimli.has(b.id), `${b.id} (${b.ad}) için tanım yok`);
  }
  for (const t of TANIMLAR) assert.ok(BILESENLER.some((b) => b.id === t.id), `${t.id} kayıt defterinde yok`);
});

test('bileşen adları tek ve ref kök öğeye iner', () => {
  const adlar = TANIMLAR.map((t) => t.ad);
  assert.equal(new Set(adlar).size, adlar.length, 'yinelenen bileşen adı');
  assert.equal(Object.keys(R.BILESENLER).length, TANIMLAR.length);
});
