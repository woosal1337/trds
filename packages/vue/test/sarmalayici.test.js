// Her tanım Vue ile çizilir ve React çıktısı ile aynı ağacı verir.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { TANIMLAR } from '@tr-ds/tanim';
import * as V from '@tr-ds/vue';
import * as R from '@tr-ds/react';

const vueCiz = async (t) => renderToString(createSSRApp({ render: () => h(V[t.ad], t.ornek) }));
const reactCiz = (t) => renderToStaticMarkup(createElement(R[t.ad], t.ornek));

// Ağacı karşılaştırılabilir hale getirir: etiket adı, sıralı öznitelikler,
// metin. Öznitelik sırası ve boş değer yazımı farkları silinir.
const normalle = (html) =>
  html
    .replace(/<!--[\s\S]*?-->/g, '')
    // React 19 sunucuda görsel için preload ipucu ekler. HTML ağacının parçası değildir.
    .replace(/<link [^>]*rel="preload"[^>]*>/g, '')
    // HTML öznitelik adı büyük küçük harf duyarsızdır.
    .replace(/<([a-z0-9]+)((?:\s+[^\s=>]+(?:="[^"]*")?)*)\s*\/?>/g, (m) => m.replace(/\s([A-Za-z-]+)(=|\s|>)/g, (_, ad, son) => ` ${ad.toLowerCase()}${son}`))
    .replace(/\s(id|for|aria-controls|aria-labelledby|aria-describedby|aria-owns)="[^"]*"/g, '')
    .replace(/<([a-z0-9]+)((?:\s+[^\s=>]+(?:="[^"]*")?)*)\s*\/?>/g, (_, tag, attrs) => {
      const liste = (attrs.match(/[^\s=]+(?:="[^"]*")?/g) ?? [])
        .map((a) => a.replace(/=""$/, '').replace(/="true"$/, ''))
        .map((a) => a.replace(/^(class)="([^"]*)"$/, (_m, k, v) => `${k}="${v.split(/\s+/).sort().join(' ')}"`))
        .sort();
      return `<${tag}${liste.length ? ' ' + liste.join(' ') : ''}>`;
    })
    .replace(/\s+/g, ' ')
    .trim();

test('her tanım Vue ile çizilir ve kök sınıfı taşır', async () => {
  for (const t of TANIMLAR) {
    assert.ok(V[t.ad], `${t.id}: ${t.ad} dışa aktarılmadı`);
    const html = await vueCiz(t);
    assert.ok(html.includes(t.kok), `${t.id}: kök sınıf ${t.kok} yok:\n${html.slice(0, 200)}`);
    assert.ok(!html.includes('undefined'), `${t.id}: çıktıda "undefined":\n${html.slice(0, 300)}`);
    if (t.davranis) assert.ok(html.includes(`data-trds="${t.davranis}"`), `${t.id}: data-trds yok`);
  }
});

test('Vue ve React aynı HTML ağacını üretir', async () => {
  const farklar = [];
  for (const t of TANIMLAR) {
    const a = normalle(await vueCiz(t));
    const b = normalle(reactCiz(t));
    if (a !== b) farklar.push(`${t.id}\n  vue:   ${a.slice(0, 400)}\n  react: ${b.slice(0, 400)}`);
  }
  assert.equal(farklar.length, 0, `${farklar.length} tanım farklı:\n${farklar.join('\n')}`);
});

test('eklenti bütün bileşenleri kaydeder', () => {
  const kayitli = [];
  V.Trds.install({ component: (ad) => kayitli.push(ad) });
  assert.equal(kayitli.length, TANIMLAR.length + 2);
  assert.ok(kayitli.includes('TrdsDugme'));
});
