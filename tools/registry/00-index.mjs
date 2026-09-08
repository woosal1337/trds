// TRDS registry — the single source of truth.
//
// The documentation site, the component index, the integrations page, the
// README table and the coverage report all read this file. Nothing about a
// component is written down twice.

import { formBilesenleri } from './10-form.mjs';
import { yapiBilesenleri } from './20-yapi.mjs';
import { turkiyeBilesenleri } from './30-turkiye.mjs';
import { ekBilesenler } from './40-ek.mjs';
import { tamamBilesenler, ekOrnekler } from './50-tamam.mjs';

/**
 * @typedef {'stable'|'beta'|'alpha'|'degerlendiriliyor'|'yok'|string} Durum
 * @typedef {object} Ornek
 * @property {string} baslik
 * @property {string} html
 *
 * @typedef {object} Bilesen
 * @property {string} id            kebab-case, the URL and the file name
 * @property {string} ad            Turkish name, shown to the reader
 * @property {string} name          English name, for cross-referencing
 * @property {string} grup          group id, see GRUPLAR
 * @property {boolean} [ozgun]      true when the rule, format or law is Turkish
 * @property {boolean} [tamGenislik] true when the component spans the viewport, like a header
 * @property {{css:Durum, js:Durum, react:Durum, vue:Durum}} durum
 * @property {string} ozet
 * @property {string[]} neZaman
 * @property {string[]} erisilebilirlik
 * @property {string[]} wcag        WCAG 2.2 success criteria numbers
 * @property {string[]} kaynak      national systems that also ship it
 * @property {string} [neden]       why this component exists for Türkiye
 * @property {Ornek[]} ornekler
 */

export const GRUPLAR = [
  { id: 'kimlik', ad: 'Kimlik', ozet: 'Kullanıcıya bunun bir devlet hizmeti olduğunu söyleyen parçalar.' },
  { id: 'gezinme', ad: 'Gezinme', ozet: 'Kullanıcının nerede olduğunu ve nereye gidebileceğini gösteren parçalar.' },
  { id: 'form', ad: 'Form', ozet: 'Kullanıcıdan bilgi alan parçalar.' },
  { id: 'secim', ad: 'Seçim', ozet: 'Kullanıcının seçenekler arasından seçim yapmasını sağlayan parçalar.' },
  { id: 'eylem', ad: 'Eylem', ozet: 'Kullanıcının bir işlem başlatmasını sağlayan parçalar.' },
  { id: 'geri-bildirim', ad: 'Geri bildirim', ozet: 'Sistemin kullanıcıya durum bildiren parçaları.' },
  { id: 'yerlesim', ad: 'Yerleşim', ozet: 'İçeriği düzenleyen ve gruplayan parçalar.' },
  { id: 'icerik', ad: 'İçerik', ozet: 'Veriyi ve metni sunan parçalar.' },
  { id: 'turkiye-form', ad: 'Türkiye’ye özgü form', ozet: 'Türk kimlik, adres ve finans biçimlerini alan parçalar.' },
  { id: 'turkiye-kimlik', ad: 'Türkiye’ye özgü hizmet', ozet: 'Türk mevzuatından ve altyapısından doğan parçalar.' }
];

export const ENTEGRASYONLAR = [
  {
    id: 'html',
    ad: 'Düz HTML ve CSS',
    ozet: 'Yapı taşı budur. Diğer bütün entegrasyonlar bunun üstüne kurulur.',
    paket: '@tr-ds/core',
    durum: 'stable',
    kurulum: 'npm install @tr-ds/core',
    kullanim: [
      '<link rel="stylesheet" href="/trds/trds.min.css">',
      '<script type="module" src="/trds/trds.min.js"></script>'
    ].join('\n'),
    notlar: [
      'JavaScript olmadan da her bileşen okunur ve kullanılır.',
      'CSS tek dosyadır ve tema değişkenlerini içermez.'
    ]
  },
  {
    id: 'react',
    ad: 'React',
    ozet: 'Çekirdek sınıfları saran ince bir bileşen katmanı. İş mantığı taşımaz.',
    paket: '@tr-ds/react',
    durum: 'stable',
    kurulum: 'npm install @tr-ds/react @tr-ds/core',
    kullanim: [
      "import '@tr-ds/core/css';",
      "import { Dugme, KimlikNoGirisi } from '@tr-ds/react';",
      '',
      'export function Basvuru() {',
      '  return (',
      '    <form>',
      '      <KimlikNoGirisi name="tckn" etiket="T.C. kimlik numaranız" ykn />',
      '      <Dugme tur="birincil">Devam et</Dugme>',
      '    </form>',
      '  );',
      '}'
    ].join('\n'),
    notlar: [
      'React 18 ve 19 desteklenir. Paket düz JavaScript’tir, JSX derleyicisi gerektirmez.',
      'Her bileşen @tr-ds/tanim içindeki tek tanımdan üretilir. React ve Vue çıktısı testte birebir karşılaştırılır.',
      'Form bileşenleri `ref` iletir ve bilinmeyen özellikleri kök öğeye geçirir. Yerleşim ve kimlik bileşenleri sabit bir özellik listesi taşır.'
    ]
  },
  {
    id: 'nextjs',
    ad: 'Next.js',
    ozet: 'App Router ile sunucu tarafında işlenir. Bileşenler istemci tarafına yalnız gerektiğinde iner.',
    paket: '@tr-ds/react',
    durum: 'beta',
    kurulum: 'npm install @tr-ds/react @tr-ds/core',
    kullanim: [
      "// app/layout.tsx",
      "import '@tr-ds/core/css';",
      "import '@tr-ds/theme-vatandas';",
      '',
      'export default function RootLayout({ children }) {',
      '  return (',
      '    <html lang="tr">',
      '      <body>{children}</body>',
      '    </html>',
      '  );',
      '}'
    ].join('\n'),
    notlar: [
      '`lang="tr"` her zaman kök `<html>` öğesinde durur.',
      'Etkileşimli bileşenler `"use client"` ile işaretlenir.'
    ]
  },
  {
    id: 'vue',
    ad: 'Vue',
    ozet: 'Çekirdeği saran ince bir bileşen katmanı. Şablon derleyicisi gerektirmez, çizim işlevi taşır.',
    paket: '@tr-ds/vue',
    durum: 'stable',
    kurulum: 'npm install @tr-ds/vue @tr-ds/core',
    kullanim: [
      "import { createApp } from 'vue';",
      "import { Trds } from '@tr-ds/vue';",
      "import '@tr-ds/core/css';",
      '',
      'createApp(App).use(Trds);',
      '',
      '<!-- App.vue -->',
      '<template>',
      '  <form>',
      '    <TrdsKimlikNoGirisi etiket="T.C. kimlik numaranız" name="tckn" />',
      '    <TrdsDugme>Devam et</TrdsDugme>',
      '  </form>',
      '</template>'
    ].join('\n'),
    notlar: [
      'Vue 3.5 ve üstü desteklenir. Bileşenler h() ile çizilir, .vue dosyası yoktur.',
      'app.use(Trds) bütün bileşenleri Trds öneki ile kaydeder. Tek tek içe aktarmak da olur.',
      'Davranış bağlandıktan sonra @tr-ds/core baslat() ile gelir. Sunucu tarafında aynı HTML üretilir.'
    ]
  },
  {
    id: 'angular',
    ad: 'Angular',
    ozet: 'CSS ve HTML bugün çalışır. Davranış için görünüm kurulduktan sonra baslat() çağrılır. Sarmalayıcı paket yol haritasında.',
    paket: '@tr-ds/core',
    durum: 'beta',
    kurulum: 'npm install @tr-ds/core',
    kullanim: [
      "import { AfterViewInit, Component, ElementRef } from '@angular/core';",
      "import { baslat } from '@tr-ds/core';",
      '',
      '@Component({',
      "  selector: 'app-basvuru',",
      "  templateUrl: './basvuru.component.html'",
      '})',
      'export class BasvuruComponent implements AfterViewInit {',
      '  constructor(private kok: ElementRef<HTMLElement>) {}',
      '  ngAfterViewInit() { baslat(this.kok.nativeElement); }',
      '}'
    ].join('\n'),
    notlar: [
      "`angular.json` içinde styles listesine `node_modules/@tr-ds/core/dist/trds.css` eklenir.",
      'Angular 17 ve üstü hedeflenir.',
      'Angular bileşen sarmalayıcıları (`@tr-ds/angular`) yol haritasındadır.'
    ]
  },
  {
    id: 'dotnet',
    ad: 'ASP.NET Core',
    ozet: 'Kamu kurumlarında en yaygın sunucu tarafı yığındır. Tag Helper olarak sarılır.',
    paket: '@tr-ds/core',
    durum: 'degerlendiriliyor',
    kurulum: 'CSS ve JS dosyalarını wwwroot altına kopyalayın.',
    kullanim: [
      '<link rel="stylesheet" href="~/lib/trds/trds.min.css" />',
      '<script type="module" src="~/lib/trds/trds.min.js"></script>',
      '',
      '<trds-kimlik-no asp-for="TcKimlikNo" etiket="T.C. kimlik numaranız" />'
    ].join('\n'),
    notlar: [
      'Sunucu tarafı doğrulaması için `Trds.Validators` NuGet paketi planlanmıştır.',
      'İstemci doğrulaması sunucu doğrulamasının yerine geçmez.'
    ]
  },
  {
    id: 'java',
    ad: 'Java ve Thymeleaf',
    ozet: 'Bakanlık uygulamalarında yaygındır. Parça şablonları olarak sarılır.',
    paket: '@tr-ds/core',
    durum: 'degerlendiriliyor',
    kurulum: 'CSS ve JS dosyalarını static klasörüne kopyalayın.',
    kullanim: [
      '<div th:replace="~{trds/kimlik-no :: alan(',
      "  ad='tckn', etiket='T.C. kimlik numaranız')}\"></div>"
    ].join('\n'),
    notlar: ['Sunucu tarafı doğrulaması için `tr.gov.trds:validators` paketi planlanmıştır.']
  }
];

/** @type {Bilesen[]} */
export const BILESENLER = [
  ...turkiyeBilesenleri,
  ...formBilesenleri,
  ...yapiBilesenleri,
  ...ekBilesenler,
  ...tamamBilesenler
]
  .map((b) => (ekOrnekler[b.id] ? { ...b, ornekler: [...b.ornekler, ...ekOrnekler[b.id]] } : b))
  .sort((a, b) => a.ad.localeCompare(b.ad, 'tr'));

/** Components that no foreign design system supplies. */
export const OZGUN_BILESENLER = BILESENLER.filter((b) => b.ozgun);

/** Group a component list by its group id, in GRUPLAR order. */
export function grupla(bilesenler = BILESENLER) {
  return GRUPLAR.map((grup) => ({
    ...grup,
    bilesenler: bilesenler.filter((b) => b.grup === grup.id)
  })).filter((g) => g.bilesenler.length > 0);
}

/** Every WCAG success criterion the catalogue claims to address. */
export function wcagKapsami(bilesenler = BILESENLER) {
  const harita = new Map();
  for (const b of bilesenler) {
    for (const olcut of b.wcag) {
      if (!harita.has(olcut)) harita.set(olcut, []);
      harita.get(olcut).push(b);
    }
  }
  return [...harita.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], 'en', { numeric: true }))
    .map(([olcut, liste]) => ({ olcut, bilesenler: liste }));
}
