#!/usr/bin/env node
// TRDS belge sitesi üreticisi. Bağımlılık yok.
//
//   node apps/docs/build.mjs
//
// Üretilen site tamamen durağandır. Her sayfa tek bir kaynaktan gelir:
// tools/registry. Görsel dil GOV.UK, USWDS ve designsystemet.no belge
// sitelerinden alındı: açık zemin, tek yazı tipi, kenar çubuğu, canlı önizleme.
//
// Sayfalar:
//   index.html                     giriş
//   temeller/                      renk, tipografi, aralık, belirteçler
//   simgeler/                      TRDS simge seti (Tabler Icons, MIT)
//   bilesenler/                    bileşen dizini, canlı önizlemeli kartlar
//   bilesenler/<id>.html           bir bileşenin tam sayfası
//   entegrasyonlar/                bileşen ve teknoloji tablosu, kurulum
//   erisilebilirlik/               WCAG ölçüt haritası
//   yonetisim/                     katkı ölçütleri ve yaşam döngüsü
//   ornekler/                      örnek kurum sayfaları dizini
//   ornekler/<slug>/               bir kurumun ana sayfası, yalnız TRDS ile

import { readFile, writeFile, mkdir, copyFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  BILESENLER,
  OZGUN_BILESENLER,
  GRUPLAR,
  ENTEGRASYONLAR,
  grupla,
  wcagKapsami
} from '../../tools/registry/00-index.mjs';

const KOK = dirname(fileURLToPath(import.meta.url));
const CIKTI = join(KOK, 'site');
const PAKETLER = join(KOK, '..', '..', 'packages');
const CEKIRDEK = join(PAKETLER, 'core', 'dist');
const BELIRTEC = join(PAKETLER, 'tokens', 'dist');
const KIMLIK = join(PAKETLER, 'identity', 'dist');
const SURUM = JSON.parse(await readFile(join(KOK, '..', '..', 'package.json'), 'utf8')).version;
const SITE_ADRESI = 'https://trds.chele.bi';
const SOSYAL_GORSEL = `${SITE_ADRESI}/varliklar/trds-sosyal-onizleme.png?v=${SURUM}`;
let SPRITE = '';

// ---------------------------------------------------------------- yardımcılar

const kacis = (m) =>
  String(m).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escape, then turn `code` spans into real <code> elements. */
const metin = (deger) => kacis(deger).replace(/`([^`]+)`/g, '<code>$1</code>');

/** Örnek HTML içindeki varlık yolunu sayfanın derinliğine göre doldurur. */
const varlik = (html, yukari) => html.replace(/\{\{VARLIK\}\}/g, `${yukari}varliklar/`);

const sosyalEtiketler = ({ baslik, ozet, yol = '' }) => {
  const adres = new URL(yol, `${SITE_ADRESI}/`).href;
  const gorselAciklamasi = 'TRDS başlığı ve örnek kamu hizmeti bileşenleri';
  return `<link rel="canonical" href="${adres}">
<meta property="og:type" content="website">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="TRDS">
<meta property="og:title" content="${kacis(baslik)}">
<meta property="og:description" content="${kacis(ozet)}">
<meta property="og:url" content="${adres}">
<meta property="og:image" content="${SOSYAL_GORSEL}">
<meta property="og:image:secure_url" content="${SOSYAL_GORSEL}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${gorselAciklamasi}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${kacis(baslik)}">
<meta name="twitter:description" content="${kacis(ozet)}">
<meta name="twitter:image" content="${SOSYAL_GORSEL}">
<meta name="twitter:image:alt" content="${gorselAciklamasi}">`;
};

const DURUM_ETIKET = {
  stable: ['kararlı', 'kararli'],
  beta: ['beta', 'beta'],
  alpha: ['alfa', 'alfa'],
  degerlendiriliyor: ['değerlendiriliyor', 'degerlendiriliyor'],
  yok: ['gerekmiyor', 'yok']
};

const durumRozet = (deger) => {
  const [ad, sinif] = DURUM_ETIKET[deger] ?? [deger, 'ozel'];
  return `<span class="dok-rozet dok-rozet--${sinif}">${kacis(ad)}</span>`;
};

const grupAdi = (id) => GRUPLAR.find((g) => g.id === id)?.ad ?? id;

/**
 * Bir örneği kart içinde küçük ve etkisiz göstermek için temizler.
 * Kimlikler kaldırılır, çünkü aynı örnek bir sayfada birçok kez durur.
 * `inert` ile hiçbir şey odak almaz ve hiçbir betik bağlanmaz.
 */
const onizleme = (html) =>
  html
    // Sprite bağlantısı bir bağlantı değildir, kalır.
    .replace(/<use href=/g, '<use data-kullan=')
    // Görünüm ayarları kartta açık durur. Kapalı bir düğme hiçbir şey anlatmaz.
    .replace(/(<button class="trds-erisim__dugme"[^>]*)aria-expanded="false"/, '$1aria-expanded="true"')
    .replace(/(<div class="trds-erisim__panel"[^>]*)\shidden/, '$1')
    .replace(/\s(id|for|aria-controls|aria-describedby|aria-labelledby|name|href|target|rel)="[^"]*"/g, '')
    .replace(/\sdata-trds(-[a-z]+)?="[^"]*"/g, '')
    .replace(/\sdata-trds-kapat/g, '')
    .replace(/<dialog[\s\S]*?<\/dialog>/g, '')
    // Bir bağlantı içinde bağlantı olamaz. Önizleme etkisizdir, bu yüzden
    // bağlantı ve düğme birer span olur. Sınıflar kalır, görünüm değişmez.
    .replace(/<a\b/g, '<span')
    .replace(/<\/a>/g, '</span>')
    .replace(/<button\b[^>]*?(?=\sclass=|>)/g, '<span')
    .replace(/<\/button>/g, '</span>')
    .replace(/<span\s+type="button"/g, '<span')
    .replace(/<use data-kullan=/g, '<use href=');

const NAV = [
  { yol: '', ad: 'Giriş' },
  { yol: 'temeller/', ad: 'Temeller' },
  { yol: 'simgeler/', ad: 'Simgeler' },
  { yol: 'bilesenler/', ad: 'Bileşenler' },
  { yol: 'entegrasyonlar/', ad: 'Entegrasyonlar' },
  { yol: 'ornekler/', ad: 'Örnekler' },
  { yol: 'erisilebilirlik/', ad: 'Erişilebilirlik' },
  { yol: 'yonetisim/', ad: 'Yönetişim' }
];

// ----------------------------------------------------------------- kabuk

/** The sidebar: the whole component tree, current page marked. */
const kenarCubugu = (yukari, etkinId) => {
  const gruplu = grupla();
  return `
<aside class="dok-kenar" aria-label="Bileşen listesi">
  <nav class="dok-kenar__ic">
    <p class="dok-kenar__baslik"><a href="${yukari}bilesenler/">Bileşenler</a> <span>${BILESENLER.length}</span></p>
${gruplu
  .map(
    (g) => `    <section class="dok-kenar__grup">
      <h2 class="dok-kenar__grup-ad">${kacis(g.ad)}</h2>
      <ul class="dok-kenar__liste">
${g.bilesenler
  .map(
    (b) =>
      `        <li><a href="${yukari}bilesenler/${b.id}.html"${b.id === etkinId ? ' aria-current="page"' : ''}>${kacis(b.ad)}${b.ozgun ? ' <span class="dok-tr" title="Türkiye’ye özgü">TR</span>' : ''}</a></li>`
  )
  .join('\n')}
      </ul>
    </section>`
  )
  .join('\n')}
    <section class="dok-kenar__grup dok-kenar__grup--yz">
      <h2 class="dok-kenar__grup-ad">Yapay zekâ için</h2>
      <ul class="dok-kenar__liste">
        <li><a href="${yukari}llms.txt">llms.txt</a></li>
        <li><a href="${yukari}llms-full.txt">llms-full.txt</a></li>
      </ul>
    </section>
  </nav>
</aside>`;
};

/**
 * Build one page.
 * derinlik: how many folders up the assets live.
 * kenar:    render the sidebar (inner pages).
 * genis:    full-width content (home).
 */
const sayfa = ({ baslik, ozet, govde, yol = '', derinlik = 0, etkin = '', kenar = false, etkinId = '', genis = false }) => {
  const yukari = '../'.repeat(derinlik);
  const menu = NAV.map(
    (m) => `<a href="${yukari}${m.yol}"${m.yol === etkin ? ' aria-current="page"' : ''}>${m.ad}</a>`
  ).join('\n        ');

  const tamBaslik = baslik === 'Türkiye Kamu Tasarım Sistemi' ? baslik : `${baslik} — TRDS`;

  return `<!doctype html>
<html lang="tr" data-trds-tema="acik">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${kacis(tamBaslik)}</title>
<meta name="description" content="${kacis(ozet)}">
${sosyalEtiketler({ baslik: tamBaslik, ozet, yol })}
<meta name="color-scheme" content="light dark">
<link rel="icon" type="image/png" sizes="196x196" href="${yukari}varliklar/e-devlet-isaret.png?v=edevlet-1">
<link rel="icon" type="image/x-icon" sizes="16x16 24x24 32x32 48x48 64x64" href="${yukari}favicon.ico?v=edevlet-1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,500;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="${yukari}varliklar/trds.css">
<link rel="stylesheet" href="${yukari}varliklar/belgeler.css">
<script>
  // Tema seçimi sayfa boyanmadan önce uygulanır. Yanıp sönme olmaz.
  try {
    var t = localStorage.getItem('trds-tema');
    if (t) document.documentElement.setAttribute('data-trds-tema', t);
    var y = localStorage.getItem('trds-yazi');
    if (y && y !== 'normal') document.documentElement.setAttribute('data-trds-yazi', y);
  } catch (e) {}
</script>
</head>
<body class="dok">
<a class="trds-atla" href="#ana-icerik">Ana içeriğe geç</a>

<header class="dok-ust" data-trds="baslik-cubugu">
  <div class="dok-kap dok-ust__ic">
    <a class="dok-marka" href="${yukari}">
      <img class="dok-marka__isaret" src="${yukari}varliklar/e-devlet-isaret.png" alt="" width="36" height="36">
      <span class="dok-marka__ad">TRDS</span>
      <span class="dok-marka__alt">Türkiye Kamu Tasarım Sistemi</span>
    </a>
    <button class="trds-baslik-cubugu__menu-dugmesi dok-ust__menu-dugmesi" type="button" aria-expanded="false" aria-controls="dok-ana-menu">Menü</button>
    <nav class="dok-ust__menu trds-baslik-cubugu__menu" id="dok-ana-menu" aria-label="Ana menü">
        ${menu}
    </nav>
    <div class="trds-erisim trds-erisim--sag dok-ust__erisim" data-trds="erisim-menusu">
      <button class="trds-erisim__dugme" type="button" aria-expanded="false" aria-controls="erisim-panel">Görünüm</button>
      <div class="trds-erisim__panel" id="erisim-panel" hidden>
        <fieldset class="trds-erisim__grup">
          <legend>Yazı boyutu</legend>
          <button class="trds-erisim__secenek" type="button" data-yazi="normal" aria-pressed="true">Normal</button>
          <button class="trds-erisim__secenek" type="button" data-yazi="buyuk" aria-pressed="false">Büyük</button>
          <button class="trds-erisim__secenek" type="button" data-yazi="cok-buyuk" aria-pressed="false">Çok büyük</button>
        </fieldset>
        <fieldset class="trds-erisim__grup">
          <legend>Tema</legend>
          <button class="trds-erisim__secenek" type="button" data-tema="acik" aria-pressed="true">Açık</button>
          <button class="trds-erisim__secenek" type="button" data-tema="koyu" aria-pressed="false">Koyu</button>
          <button class="trds-erisim__secenek" type="button" data-tema="yuksek" aria-pressed="false">Yüksek karşıtlık</button>
        </fieldset>
      </div>
    </div>
  </div>
</header>

<div class="dok-kap dok-govde${kenar ? ' dok-govde--kenarli' : ''}${genis ? ' dok-govde--genis' : ''}">
${kenar ? kenarCubugu(yukari, etkinId) : ''}
<main class="dok-icerik" id="ana-icerik" tabindex="-1">
${govde.includes('href="#trds-') && !govde.includes('<symbol') ? SPRITE : ''}
${varlik(govde, yukari)}
</main>
</div>

<footer class="dok-alt">
  <div class="dok-kap dok-alt__ic">
    <div class="dok-alt__sutun">
      <p class="dok-alt__baslik">TRDS</p>
      <p class="dok-alt__metin">Bu depo bir öneridir. Henüz hiçbir kurum tarafından benimsenmedi. Bu bir örnek sitedir, resmî bir devlet sitesi değildir.</p>
    </div>
    <nav class="dok-alt__sutun" aria-label="Depo bağlantıları">
      <p class="dok-alt__baslik">Depo</p>
      <a href="https://github.com/woosal1337/trds">Kaynak kodu</a>
      <a href="${yukari}yonetisim/">Katkı ölçütleri</a>
      <a href="${yukari}erisilebilirlik/">Erişilebilirlik bildirimi</a>
    </nav>
    <nav class="dok-alt__sutun" aria-label="Yapay zekâ için başvuru">
      <p class="dok-alt__baslik">Yapay zekâ için</p>
      <a href="${yukari}llms.txt">llms.txt</a>
      <a href="${yukari}llms-full.txt">llms-full.txt</a>
    </nav>
    <div class="dok-alt__sutun">
      <p class="dok-alt__baslik">Lisans</p>
      <p class="dok-alt__metin">Kod ve Tabler simgeleri MIT lisanslıdır. e-Devlet işareti ve diğer devlet kimlik varlıkları için ayrı kullanım koşulları geçerlidir.</p>
    </div>
  </div>
</footer>

<script type="module" src="${yukari}varliklar/trds.js"></script>
<script type="module" src="${yukari}varliklar/belgeler.js"></script>
</body>
</html>
`;
};

// ---------------------------------------------------------------- parçalar

/** A live example plus its source, with a small toolbar. */
const ornekBlok = (ornek, b = {}) => `
<figure class="dok-ornek">
  <figcaption class="dok-ornek__cubuk">
    <span class="dok-ornek__ad">${kacis(ornek.baslik)}</span>
    <span class="dok-ornek__not">${b.tamGenislik ? 'Canlı örnek · tam genişlik' : 'Canlı örnek'}</span>
  </figcaption>
${ornek.aciklama ? `  <p class="dok-ornek__aciklama">${kacis(ornek.aciklama)}</p>\n` : ''}  <div class="dok-ornek__sahne${b.tamGenislik ? ' dok-ornek__sahne--tam' : ''}">
${ornek.html}
  </div>
  <details class="dok-ornek__kod">
    <summary>HTML kodunu göster</summary>
    <pre><code>${kacis(ornek.html.replace(/\{\{VARLIK\}\}/g, '/trds/'))}</code></pre>
  </details>
</figure>`;

/** A component card with an inert live preview. */
const bilesenKarti = (b, yukari) => `
<article class="dok-kart">
  <div class="dok-kart__onizleme" inert aria-hidden="true">
    <div class="dok-kart__olcek">
${onizleme(b.ornekler[0].html)}
    </div>
  </div>
  <div class="dok-kart__govde">
    <h3 class="dok-kart__ad"><a href="${yukari}bilesenler/${b.id}.html">${kacis(b.ad)}</a>${b.ozgun ? ' <span class="dok-tr">TR</span>' : ''}</h3>
    <span class="dok-kart__en">${kacis(b.name)}</span>
  </div>
</article>`;

const kartIzgara = (liste, yukari) =>
  `<div class="dok-izgara">${liste.map((b) => bilesenKarti(b, yukari)).join('')}\n</div>`;

// --------------------------------------------------------------------- giriş

const girisSayfasi = () => {
  const gruplu = grupla();
  return sayfa({
    baslik: 'Türkiye Kamu Tasarım Sistemi',
    ozet: 'Türkiye kamu hizmetleri için tek bir açık kaynak tasarım sistemi.',
    yol: '',
    etkin: '',
    genis: true,
    govde: `
<section class="dok-kahraman">
  <p class="dok-kahraman__ust">Öneri · sürüm ${SURUM}</p>
  <h1 class="dok-kahraman__baslik">Her kamu hizmeti için tek bir tasarım sistemi</h1>
  <p class="dok-kahraman__metin">Bakanlık, kurum ve belediye siteleri için ortak bileşenler, kalıplar ve
  kurallar. HTML/CSS çekirdeği, React ve Vue sarmalayıcılarıyla arayüzler oluşturun.</p>
  <div class="dok-kahraman__eylemler">
    <a class="trds-button" href="bilesenler/">Bileşenlere git</a>
    <a class="trds-button trds-button--ikincil" href="entegrasyonlar/">Kurulum</a>
  </div>
</section>

<section class="dok-ucsutun">
  <div>
    <h2 class="dok-ucsutun__baslik"><a href="temeller/">Temeller</a></h2>
    <p>Renk, tipografi, aralık ve tasarım belirteçleri. Her kontrast garantisi yapı sırasında denetlenir.</p>
  </div>
  <div>
    <h2 class="dok-ucsutun__baslik"><a href="bilesenler/">Bileşenler</a></h2>
    <p>${BILESENLER.length} bileşen. Her biri canlı örnek, kullanım kuralı, erişilebilirlik notu ve WCAG ölçütü taşır.</p>
  </div>
  <div>
    <h2 class="dok-ucsutun__baslik"><a href="entegrasyonlar/">Entegrasyonlar</a></h2>
    <p>HTML, React, Next.js, Vue, Angular, ASP.NET ve Java. Hangi bileşen hangi teknolojide hazır, tek tabloda.</p>
  </div>
</section>

<section class="dok-bolum">
  <div class="dok-bolum__ust">
    <h2 class="dok-bolum__baslik">Türkiye’ye özgü bileşenler</h2>
    <p class="dok-bolum__metin">Bu ${OZGUN_BILESENLER.length} bileşenin kuralı, biçimi veya yasal dayanağı Türkiye’ye aittir.
    Benzerleri başka ülkelerde bulunabilir, ama içeriği kopyalanamaz.</p>
  </div>
  ${kartIzgara(OZGUN_BILESENLER, '')}
</section>

<section class="dok-bolum">
  <div class="dok-bolum__ust">
    <h2 class="dok-bolum__baslik">Bileşen grupları</h2>
  </div>
  <ul class="dok-gruplar">
${gruplu
  .map(
    (g) =>
      `    <li><a href="bilesenler/#${g.id}"><span class="dok-gruplar__ad">${kacis(g.ad)}</span><span class="dok-gruplar__sayi">${g.bilesenler.length}</span></a><p>${kacis(g.ozet)}</p></li>`
  )
  .join('\n')}
  </ul>
</section>
`
  });
};

// ---------------------------------------------------------------- bileşenler

const bilesenListesi = () => {
  const gruplu = grupla();
  const TEK = [
    { anahtar: 'css', ad: 'CSS' },
    { anahtar: 'js', ad: 'JavaScript' },
    { anahtar: 'react', ad: 'React' },
    { anahtar: 'vue', ad: 'Vue' }
  ];
  // Dizin rozeti HTML ve CSS durumunu gösterir. Çerçeve durumları tabloda ayrıca durur.
  const genelDurum = (b) => b.durum.css;
  const hazir = (deger) => deger !== 'yok' && deger !== 'degerlendiriliyor';

  const kartlar = BILESENLER.map((b) => {
    const teknolojiler = TEK.filter((t) => hazir(b.durum[t.anahtar]));
    return `
  <li class="dok-dizin__oge"
      data-ad="${kacis(b.ad.toLocaleLowerCase('tr'))} ${kacis(b.name.toLowerCase())}"
      data-grup="${b.grup}"
      data-durum="${genelDurum(b)}"
      data-tek="${teknolojiler.map((t) => t.anahtar).join(' ')}"
      data-ozgun="${b.ozgun ? 'evet' : 'hayir'}">
    <article class="dok-dizin__kart">
      <div class="dok-dizin__onizleme" inert aria-hidden="true">
        <div class="dok-dizin__olcek">
${onizleme(b.ornekler[0].html)}
        </div>
      </div>
      <div class="dok-dizin__govde">
        <div class="dok-dizin__ust">
          <h3 class="dok-dizin__ad"><a href="${b.id}.html">${kacis(b.ad)}</a>${b.ozgun ? ' <span class="dok-tr" title="Türkiye’ye özgü">TR</span>' : ''}</h3>
          ${durumRozet(genelDurum(b))}
        </div>
        <p class="dok-dizin__en">${kacis(b.name)} · ${kacis(grupAdi(b.grup))}</p>
        <p class="dok-dizin__ozet">${metin(b.ozet)}</p>
        <ul class="dok-dizin__tek" aria-label="Hazır teknolojiler">
${teknolojiler.map((t) => `          <li>${t.ad}</li>`).join('\n')}
        </ul>
      </div>
    </article>
  </li>`;
  }).join('\n');

  return sayfa({
    baslik: 'Bileşenler',
    ozet: `TRDS içindeki ${BILESENLER.length} bileşenin tamamı. Her biri canlı önizleme, durum ve hazır teknolojiler ile.`,
    yol: 'bilesenler/',
    derinlik: 1,
    etkin: 'bilesenler/',
    kenar: true,
    govde: `
<nav class="trds-yol dok-yol" aria-label="Sayfa yolu">
  <ol class="trds-yol__liste">
    <li><a href="../">Giriş</a></li>
    <li><span aria-current="page">Bileşenler</span></li>
  </ol>
</nav>

<h1 class="dok-h1">Bileşenler</h1>
<p class="dok-giris">Bileşenler bir kullanıcı arayüzünün yeniden kullanılabilir parçalarıdır.
Hazır ve denenmiş parçalarla kurumlar tutarlı hizmetler kurar.</p>
<p>Her bileşen <a href="../yonetisim/#dongu">bayrak yarışı modeli</a> ile yapılır ve bu yüzden farklı bir
durum taşıyabilir. <span class="dok-tr">TR</span> işareti, o bileşenin kuralının, biçiminin veya yasal
dayanağının Türkiye’ye ait olduğunu gösterir. Teknolojiye göre ayrıntılı durum
<a href="../entegrasyonlar/">entegrasyon sayfasında</a> durur.</p>

<form class="dok-suzgec" data-dok="suzgec" role="search" aria-label="Bileşenleri süz">
  <div class="dok-suzgec__ara">
    <label class="trds-etiket" for="suz-ara">Bileşen ara</label>
    <input class="trds-girdi" id="suz-ara" type="search" name="ara" autocomplete="off" placeholder="Örnek: kimlik, tablo, düğme">
  </div>
  <div class="dok-suzgec__satir">
    <fieldset class="dok-suzgec__grup">
      <legend>Grup</legend>
      <select class="trds-secim dok-suzgec__secim" name="grup" aria-label="Grup">
        <option value="">Tüm gruplar</option>
${gruplu.map((g) => `        <option value="${g.id}">${kacis(g.ad)} (${g.bilesenler.length})</option>`).join('\n')}
      </select>
    </fieldset>
    <fieldset class="dok-suzgec__grup">
      <legend>Durum</legend>
      <div class="dok-suzgec__cipler">
        <label class="dok-cip"><input type="checkbox" name="durum" value="stable"> Kararlı</label>
        <label class="dok-cip"><input type="checkbox" name="durum" value="beta"> Beta</label>
        <label class="dok-cip"><input type="checkbox" name="durum" value="alpha"> Alfa</label>
      </div>
    </fieldset>
    <fieldset class="dok-suzgec__grup">
      <legend>Teknoloji</legend>
      <div class="dok-suzgec__cipler">
${TEK.map((t) => `        <label class="dok-cip"><input type="checkbox" name="tek" value="${t.anahtar}"> ${t.ad}</label>`).join('\n')}
      </div>
    </fieldset>
    <fieldset class="dok-suzgec__grup">
      <legend>Kapsam</legend>
      <div class="dok-suzgec__cipler">
        <label class="dok-cip"><input type="checkbox" name="ozgun" value="evet"> Yalnız Türkiye’ye özgü</label>
      </div>
    </fieldset>
  </div>
  <p class="dok-suzgec__sayi" aria-live="polite" data-dok="sayi">${BILESENLER.length} / ${BILESENLER.length} bileşen görünüyor</p>
  <button class="trds-button trds-button--sade dok-suzgec__temizle" type="reset">Süzgeçleri temizle</button>
</form>

<ol class="dok-dizin" data-dok="dizin">
${kartlar}
</ol>
<p class="dok-dizin__bos" data-dok="bos" hidden>Bu süzgeçlere uyan bileşen yok. Süzgeçleri temizleyin veya başka bir ad deneyin.</p>

<h2 class="dok-h2" id="katki">Bir bileşen eksik mi</h2>
<p>Bir bileşenin sisteme girmesi için beş ölçütü karşılaması gerekir: yararlı, benzersiz,
kullanılabilir, tutarlı ve çok yönlü. Öneriyi <a href="https://github.com/woosal1337/trds/issues/new?template=bilesen-onerisi.yml">bileşen önerisi</a>
olarak açın. Ölçütler <a href="../yonetisim/">yönetişim sayfasında</a> yazılıdır.</p>
`
  });
};

const bilesenSayfasi = (b) => {
  const kaynakSatiri =
    b.kaynak.length > 0
      ? `<p><strong>Benzer bir bileşen şu ülkelerin tasarım sistemlerinde de var:</strong> ${b.kaynak.join(', ')}.</p>`
      : `<p><strong>Bu bileşenin karşılığı hiçbir yabancı tasarım sisteminde yok.</strong></p>`;

  return sayfa({
    baslik: b.ad,
    ozet: b.ozet,
    yol: `bilesenler/${b.id}.html`,
    derinlik: 1,
    etkin: 'bilesenler/',
    kenar: true,
    etkinId: b.id,
    govde: `
<nav class="trds-yol dok-yol" aria-label="Sayfa yolu">
  <ol class="trds-yol__liste">
    <li><a href="../">Giriş</a></li>
    <li><a href="./">Bileşenler</a></li>
    <li><span aria-current="page">${kacis(b.ad)}</span></li>
  </ol>
</nav>

<div class="dok-baslik-blok">
  <p class="dok-ust-bilgi">${kacis(grupAdi(b.grup))} · ${kacis(b.name)}</p>
  <h1 class="dok-h1">${kacis(b.ad)}${b.ozgun ? ' <span class="dok-tr dok-tr--buyuk">TR</span>' : ''}</h1>
  <p class="dok-giris">${metin(b.ozet)}</p>
  <dl class="dok-durumlar">
    <div><dt>CSS</dt><dd>${durumRozet(b.durum.css)}</dd></div>
    <div><dt>JavaScript</dt><dd>${durumRozet(b.durum.js)}</dd></div>
    <div><dt>React</dt><dd>${durumRozet(b.durum.react)}</dd></div>
    <div><dt>Vue</dt><dd>${durumRozet(b.durum.vue)}</dd></div>
  </dl>
</div>

<nav class="dok-icindekiler" aria-label="Bu sayfada">
  <a href="#ornekler">Örnekler</a>
  <a href="#ne-zaman">Ne zaman kullanılır</a>
  <a href="#erisilebilirlik">Erişilebilirlik</a>
  ${b.neden ? '<a href="#neden">Neden var</a>' : ''}
  <a href="#kaynak">Kaynak</a>
</nav>

<h2 class="dok-h2" id="ornekler">Örnekler</h2>
${b.ornekler.map((o) => ornekBlok(o, b)).join('\n')}

<h2 class="dok-h2" id="ne-zaman">Ne zaman kullanılır</h2>
<ul class="dok-liste">
${b.neZaman.map((s) => `  <li>${metin(s)}</li>`).join('\n')}
</ul>

<h2 class="dok-h2" id="erisilebilirlik">Erişilebilirlik</h2>
<ul class="dok-liste">
${b.erisilebilirlik.map((s) => `  <li>${metin(s)}</li>`).join('\n')}
</ul>
<p class="dok-wcag"><span>Karşılanan WCAG 2.2 ölçütleri</span>
${b.wcag.map((o) => `<a class="dok-olcut" href="../erisilebilirlik/#o-${o.replace(/\./g, '-')}">${o}</a>`).join('')}</p>

${b.neden ? `<h2 class="dok-h2" id="neden">Neden bu bileşen var</h2>\n<p>${metin(b.neden)}</p>` : ''}

<h2 class="dok-h2" id="kaynak">Kaynak</h2>
${kaynakSatiri}
`
  });
};

// ------------------------------------------------------------------ simgeler

const simgelerSayfasi = async () => {
  const adlar = JSON.parse(await readFile(join(KIMLIK, 'simgeler.json'), 'utf8'));
  const sprite = await readFile(join(KIMLIK, 'trds-simgeler.svg'), 'utf8');

  // Simge adları Türkçe karşılıkları ile. Ad İngilizce kalır, çünkü kaynak öyledir.
  const TR = {
    a11y: 'Erişilebilirlik', agency: 'Kurum', agriculture: 'Tarım', appstore: 'App Store',
    armyduty: 'Askerlik', 'arrow-left': 'Sol ok', 'arrow-right': 'Sağ ok', business: 'İş dünyası',
    close: 'Kapat', communication: 'İletişim', complaints: 'Şikâyet', contact: 'İletişim bilgisi',
    date: 'Tarih', deaf: 'İşitme engelli', education: 'Eğitim', 'empty-heart': 'Boş kalp',
    eservice: 'e-Hizmet', facebook: 'Facebook', fastresponse: 'Hızlı yanıt', fave: 'Favori',
    fave2: 'Favori 2', 'field-hide': 'Alanı gizle', 'field-unhide': 'Alanı göster',
    'full-heart': 'Dolu kalp', googleplay: 'Google Play', handdrawn: 'El çizimi', health: 'Sağlık',
    hierarchy: 'Hiyerarşi', home: 'Ana sayfa', idea: 'Fikir', identity: 'Kimlik',
    information: 'Bilgi', instagram: 'Instagram', justice: 'Adalet', keyboard13: 'Klavye',
    lightning: 'Şimşek', login: 'Giriş', logout: 'Çıkış', mail: 'Posta', mapbook: 'Harita',
    municipality: 'Belediye', personalinfo: 'Kişisel bilgi', phone: 'Telefon', private: 'Gizli',
    question23: 'Soru', rate: 'Değerlendir', search: 'Ara', security: 'Güvenlik',
    socialsecurity: 'Sosyal güvenlik', 'sort-down': 'Azalan', 'sort-up-down': 'Sırala',
    'sort-up': 'Artan', sso: 'Tek oturum', star: 'Yıldız', star2: 'Yıldız 2', state: 'Devlet',
    tax: 'Vergi', time: 'Saat', 'tool-action': 'Eylem', 'tool-back': 'Geri', 'tool-down': 'Aşağı',
    'tool-edit': 'Düzenle', 'tool-list': 'Liste', 'tool-lock': 'Kilit', 'tool-plus': 'Ekle',
    'tool-print': 'Yazdır', 'tool-refresh': 'Yenile', transportation: 'Ulaşım', try: 'Türk Lirası',
    twitter: 'Twitter', user: 'Kullanıcı', usermanual: 'Kılavuz', warning: 'Uyarı', youtube: 'YouTube'
  };

  return sayfa({
    baslik: 'Simgeler',
    ozet: 'Tek çizim kuralına uyan 74 simge, tek sprite.',
    yol: 'simgeler/',
    derinlik: 1,
    etkin: 'simgeler/',
    kenar: true,
    govde: `
${sprite}
<h1 class="dok-h1">Simgeler</h1>
<p class="dok-giris">${adlar.length} simge, tek bir SVG sprite içinde. Hepsi 24 birimlik kutuda,
2 birim çizgi, yuvarlak uç ve köşe ile çizilir. Bu yüzden hepsi aynı ağırlıkta durur.
Yeni simge çizilmez. Bir hizmet bu setin dışına çıkmaz, böylece vatandaş aynı simgeyi her sitede tanır.</p>

<div class="trds-uyari" role="status">
  <p><strong>MIT lisanslı.</strong> Simgeler <a class="trds-link" href="https://tabler.io/icons">Tabler Icons</a>
  setinden gelir ve serbestçe kullanılır. Devlet kimliği taşıyan parçalar (arma, e-Devlet işareti,
  kurum logoları) ayrıdır ve <code>LICENSE-IDENTITY.md</code> kapsamındadır.</p>
</div>

<h2 class="dok-h2" id="kullanim">Kullanım</h2>
<pre class="dok-kod"><code>&lt;!-- sprite'ı sayfaya bir kez ekleyin --&gt;
&lt;svg style="display:none"&gt;…&lt;/svg&gt;

&lt;!-- sonra istediğiniz yerde --&gt;
&lt;svg class="trds-simge" aria-hidden="true"&gt;&lt;use href="#trds-health"/&gt;&lt;/svg&gt;

&lt;!-- anlam taşıyorsa ad verin --&gt;
&lt;svg class="trds-simge" role="img" aria-label="Sağlık"&gt;&lt;use href="#trds-health"/&gt;&lt;/svg&gt;</code></pre>

<h2 class="dok-h2" id="set">Set</h2>
<ul class="dok-simgeler">
${adlar
  .map(
    (ad) => `  <li class="dok-simge">
    <svg class="dok-simge__gorsel" aria-hidden="true"><use href="#trds-${ad}"/></svg>
    <span class="dok-simge__ad">${kacis(TR[ad] ?? ad)}</span>
    <code class="dok-simge__kod">trds-${ad}</code>
  </li>`
  )
  .join('\n')}
</ul>
`
  });
};

// ------------------------------------------------------------- entegrasyonlar

const entegrasyonSayfasi = () => {
  const izler = [
    { anahtar: 'css', ad: 'HTML ve CSS' },
    { anahtar: 'js', ad: 'JavaScript' },
    { anahtar: 'react', ad: 'React' },
    { anahtar: 'vue', ad: 'Vue' }
  ];

  const matris = `
<div class="trds-tablo-kap dok-tablo-kap">
  <table class="trds-tablo dok-tablo dok-matris">
    <caption class="trds-gorsel-gizli">Her bileşenin her teknolojideki durumu</caption>
    <thead>
      <tr>
        <th scope="col">Bileşen</th>
        <th scope="col">Grup</th>
${izler.map((i) => `        <th scope="col">${kacis(i.ad)}</th>`).join('\n')}
      </tr>
    </thead>
    <tbody>
${BILESENLER.map(
  (b) => `      <tr>
        <th scope="row"><a href="../bilesenler/${b.id}.html">${kacis(b.ad)}</a>${b.ozgun ? ' <span class="dok-tr">TR</span>' : ''}</th>
        <td class="dok-silik">${kacis(grupAdi(b.grup))}</td>
${izler.map((i) => `        <td>${durumRozet(b.durum[i.anahtar])}</td>`).join('\n')}
      </tr>`
).join('\n')}
    </tbody>
  </table>
</div>`;

  const kartlar = ENTEGRASYONLAR.map(
    (e) => `
<section class="dok-entegrasyon" id="${e.id}">
  <div class="dok-entegrasyon__ust">
    <h2 class="dok-h2">${kacis(e.ad)}</h2>
    ${durumRozet(e.durum)}
  </div>
  <p>${kacis(e.ozet)}</p>
  <div class="dok-entegrasyon__kod">
    <div>
      <h3 class="dok-h4">Kurulum</h3>
      <pre class="dok-kod"><code>${kacis(e.kurulum)}</code></pre>
    </div>
    <div>
      <h3 class="dok-h4">Kullanım</h3>
      <pre class="dok-kod"><code>${kacis(e.kullanim)}</code></pre>
    </div>
  </div>
  <ul class="dok-liste dok-liste--sik">
${e.notlar.map((n) => `    <li>${metin(n)}</li>`).join('\n')}
  </ul>
</section>`
  ).join('\n');

  return sayfa({
    baslik: 'Entegrasyonlar',
    ozet: 'Her bileşenin her teknolojideki durumu ve her teknoloji için kurulum.',
    yol: 'entegrasyonlar/',
    derinlik: 1,
    etkin: 'entegrasyonlar/',
    kenar: true,
    govde: `
<h1 class="dok-h1">Entegrasyonlar</h1>
<p class="dok-giris">TRDS tek bir çekirdek üzerine kurulur. Her entegrasyon o çekirdeği sarar ve
kendi iş mantığını taşımaz. Aynı HTML her yerde üretilir, böylece erişilebilirlik davranışı
teknolojiye göre değişmez.</p>

<div class="trds-uyari trds-uyari--bilgi" role="status">
  <p><strong>Sıra.</strong> Bir bileşen önce HTML ve CSS olarak yayımlanır. React ve diğer
  saramalar ondan sonra gelir. JavaScript çalışmadığında hizmet çalışmaya devam eder.</p>
</div>

<h2 class="dok-h2" id="tablo">Bileşen ve teknoloji tablosu</h2>
<p>Bir ekip bu tabloya bakar ve seçtiği teknolojide hangi bileşenin hazır olduğunu görür.
Yöntem İrlanda tasarım sisteminden alındı. ${BILESENLER.length} satır.</p>
<dl class="dok-anahtar">
  <div><dt>${durumRozet('stable')}</dt><dd>Üretimde kullanın.</dd></div>
  <div><dt>${durumRozet('beta')}</dt><dd>Uygulandı, küçük değişiklik olabilir.</dd></div>
  <div><dt>${durumRozet('degerlendiriliyor')}</dt><dd>Yol haritasında.</dd></div>
  <div><dt>${durumRozet('yok')}</dt><dd>O katmana gerek yok.</dd></div>
</dl>
${matris}

<h2 class="dok-h2" id="teknolojiler">Teknolojiler</h2>
<nav class="dok-icindekiler" aria-label="Teknoloji listesi">
${ENTEGRASYONLAR.map((e) => `  <a href="#${e.id}">${kacis(e.ad)}</a>`).join('\n')}
</nav>
${kartlar}
`
  });
};

// ------------------------------------------------------------------- temeller

const temellerSayfasi = async () => {
  const belirtecler = JSON.parse(await readFile(join(BELIRTEC, 'trds-belirtecler.json'), 'utf8'));
  const kontrast = await readFile(join(BELIRTEC, 'kontrast-raporu.md'), 'utf8');

  const olcekler = ['notr', 'birincil', 'tehlike', 'basari', 'uyari'];
  const olcekBloklari = olcekler
    .map((olcek) => {
      const girdiler = Object.entries(belirtecler).filter(([ad]) =>
        new RegExp(`^renk-${olcek}-(zemin|yuzey|kenar|metin|taban)-`).test(ad)
      );
      return `
<section class="dok-olcek-blok">
  <h3 class="dok-h3">${olcek}</h3>
  <div class="dok-renkler">
${girdiler
  .map(
    ([ad, deger]) => `    <div class="dok-renk">
      <span class="dok-renk__ornek" style="background:${deger}"></span>
      <span class="dok-renk__ad">${ad.replace(`renk-${olcek}-`, '')}</span>
      <code class="dok-renk__deger">${deger}</code>
    </div>`
  )
  .join('\n')}
  </div>
</section>`;
    })
    .join('\n');

  const kontrastSatirlari = kontrast
    .split('\n')
    .filter((s) => s.startsWith('| acik') || s.startsWith('| koyu'))
    .map((s) => {
      const [, kip, on, arka, oran, enAz, sonuc] = s.split('|').map((h) => h.trim());
      const gecti = sonuc === 'gecti';
      return `      <tr>
        <td>${kip}</td>
        <td><code>${kacis(on.replace(/`/g, '').replace('renk-', ''))}</code></td>
        <td><code>${kacis(arka.replace(/`/g, '').replace('renk-', ''))}</code></td>
        <td class="trds-sayi">${oran}</td>
        <td class="trds-sayi">${enAz}</td>
        <td><span class="trds-etiket trds-etiket--${gecti ? 'yesil' : 'kirmizi'}">${gecti ? 'geçti' : 'kaldı'}</span></td>
      </tr>`;
    })
    .join('\n');

  const olcek = ['48', '36', '30', '24', '20', '18', '16', '14', '12'];

  return sayfa({
    baslik: 'Temeller',
    ozet: 'Renk, tipografi, aralık ve tasarım belirteçleri.',
    yol: 'temeller/',
    derinlik: 1,
    etkin: 'temeller/',
    kenar: true,
    govde: `
<h1 class="dok-h1">Temeller</h1>
<p class="dok-giris">TRDS ${Object.keys(belirtecler).length} tasarım belirteci yayımlar. Hiçbir bileşen ham bir
renk veya ölçü kullanmaz. Her değer bir belirteçten gelir.</p>

<nav class="dok-icindekiler" aria-label="Bu sayfada">
  <a href="#adlandirma">Adlandırma</a>
  <a href="#kontrast">Kontrast</a>
  <a href="#renk">Renk</a>
  <a href="#tipografi">Tipografi</a>
  <a href="#aralik">Aralık</a>
</nav>

<h2 class="dok-h2" id="adlandirma">Adlandırma</h2>
<p>Renk adı üç parçadan kurulur: <strong>ölçek, grup, çeşit</strong>. Norveç tasarım sisteminden
alınan bu kural, bir rengi görünüşüne göre değil işine göre seçmeyi sağlar.</p>
<pre class="dok-kod"><code>--trds-renk-&lt;ölçek&gt;-&lt;grup&gt;-&lt;çeşit&gt;

ölçek   notr · birincil · tehlike · basari · uyari
grup    zemin · yuzey · kenar · metin · taban
çeşit   varsayilan · yumusak · uzeri · etkin · silik · guclu</code></pre>

<h2 class="dok-h2" id="kontrast">Kontrast bir söz değil, bir denetimdir</h2>
<p>Aşağıdaki tablo belirteçler her üretildiğinde yeniden hesaplanır. Bir garanti tutmazsa yapı
durur ve paket yayımlanmaz.</p>
<div class="trds-tablo-kap dok-tablo-kap">
  <table class="trds-tablo dok-tablo">
    <caption class="trds-gorsel-gizli">Kontrast denetimi, açık ve koyu tema</caption>
    <thead><tr><th scope="col">Kip</th><th scope="col">Ön plan</th><th scope="col">Arka plan</th><th scope="col" class="trds-sayi">Oran</th><th scope="col" class="trds-sayi">En az</th><th scope="col">Sonuç</th></tr></thead>
    <tbody>
${kontrastSatirlari}
    </tbody>
  </table>
</div>

<h2 class="dok-h2" id="renk">Anlamsal renkler</h2>
<p>Beş ölçek. Her ölçek beş gruba ayrılır. Bayrak kırmızısı burada yoktur, çünkü yalnız kimlik
parçalarında kullanılır ve metin rengi olarak AA ölçütünü karşılamaz.</p>
${olcekBloklari}

<h2 class="dok-h2" id="tipografi">Tipografi</h2>
<p>Yazı tipi <strong>Public Sans</strong>. Amerika Birleşik Devletleri tasarım sisteminin ürettiği
ve SIL Open Font License ile yayımladığı bu yazı tipi, her ağırlıkta ş, ğ, ı, İ, ö, ç ve ü
harflerini taşır. Noktasız <code>ı</code> ile noktalı <code>İ</code> 16 pikselde ayırt edilir.</p>
<div class="dok-tip">
${olcek
  .map(
    (b) => `  <div class="dok-tip__satir">
    <span class="dok-tip__ornek" style="font-size:var(--trds-yazi-boyut-${b})">Şığır ile İnce Çizgi</span>
    <code class="dok-tip__ad">yazi-boyut-${b}</code>
  </div>`
  )
  .join('\n')}
</div>

<h2 class="dok-h2" id="aralik">Aralık</h2>
<p>4 piksel tabanlı ölçek. Ara değer yoktur.</p>
<div class="dok-aralik">
${['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
  .map(
    (a) =>
      `  <div class="dok-aralik__satir"><code>aralik-${a}</code><span class="dok-aralik__cubuk" style="inline-size:var(--trds-aralik-${a})"></span><span class="dok-silik">${belirtecler[`aralik-${a}`]}</span></div>`
  )
  .join('\n')}
</div>
`
  });
};

// ------------------------------------------------------------- erişilebilirlik

const erisilebilirlikSayfasi = () => {
  const kapsam = wcagKapsami();
  return sayfa({
    baslik: 'Erişilebilirlik',
    ozet: 'Her WCAG 2.2 ölçütünü hangi bileşenin karşıladığını gösteren harita.',
    yol: 'erisilebilirlik/',
    derinlik: 1,
    etkin: 'erisilebilirlik/',
    kenar: true,
    govde: `
<h1 class="dok-h1">Erişilebilirlik</h1>
<p class="dok-giris">TRDS hedefi WCAG 2.2 AA seviyesidir. Bileşen belgeleri ilgili ölçütleri ve kullanım kurallarını listeler.
Hizmet ekibi tamamlanmış sayfaları ayrıca test etmelidir.</p>

<div class="trds-uyari trds-uyari--uyari" role="status">
  <p><strong>Bu yeterli değildir.</strong> Bir bileşen kütüphanesi uyumu kolaylaştırır, garanti etmez.
  İçerik, sıralama, dil ve odak sırası hizmetin sorumluluğundadır.</p>
</div>

<h2 class="dok-h2" id="harita">Ölçüt haritası</h2>
<p>Bu harita ${BILESENLER.length} bileşeni ${kapsam.length} ilgili ölçütle eşleştirir. Bir uygunluk belgesi değildir.
Hizmet ekibi, tabloda yer almayan ölçütler dahil, tamamlanmış hizmetin erişilebilirliğini test etmelidir.</p>
<div class="trds-tablo-kap dok-tablo-kap">
  <table class="trds-tablo dok-tablo">
    <caption class="trds-gorsel-gizli">WCAG 2.2 ölçütleri ve karşılayan bileşenler</caption>
    <thead><tr><th scope="col">Ölçüt</th><th scope="col">Bileşenler</th></tr></thead>
    <tbody>
${kapsam
  .map(
    (k) => `      <tr id="o-${k.olcut.replace(/\./g, '-')}">
        <th scope="row"><code>${k.olcut}</code></th>
        <td>${k.bilesenler.map((b) => `<a href="../bilesenler/${b.id}.html">${kacis(b.ad)}</a>`).join(', ')}</td>
      </tr>`
  )
  .join('\n')}
    </tbody>
  </table>
</div>

<h2 class="dok-h2" id="ortam">Test hedefleri</h2>
<p>Bu tablo test planı içindir. Testlerin her ortamda tamamlandığını göstermez.</p>
<div class="trds-tablo-kap dok-tablo-kap">
  <table class="trds-tablo dok-tablo">
    <caption class="trds-gorsel-gizli">Hedeflenen tarayıcı ve ekran okuyucu birleşimleri</caption>
    <thead><tr><th scope="col">İşletim sistemi</th><th scope="col">Tarayıcı</th><th scope="col">Ekran okuyucu</th></tr></thead>
    <tbody>
      <tr><td>Windows</td><td>Chrome, Edge, Firefox</td><td>NVDA</td></tr>
      <tr><td>macOS</td><td>Safari, Chrome</td><td>VoiceOver</td></tr>
      <tr><td>iOS</td><td>Safari</td><td>VoiceOver</td></tr>
      <tr><td>Android</td><td>Chrome</td><td>TalkBack</td></tr>
    </tbody>
  </table>
</div>
`
  });
};

// ------------------------------------------------------------------ yönetişim

const yonetisimSayfasi = () => {
  // Ölçütler bugün denetlenen şeyleri yazar. Kurum sayısına bağlı bir ölçüt
  // yoktur, çünkü TRDS'yi henüz hiçbir kurum kullanmıyor.
  const asamalar = [
    { ad: 'Aday gösterildi', ozet: 'Henüz yok, ama ihtiyaç açık.', olcut: ['Ad, TRDS adlandırma kuralına göre belirlendi.', 'Kısa açıklama ve bir görsel var.', 'Birden çok hizmetin buna ihtiyacı olduğu yazıldı.', 'Sistemde aynı işi yapan başka bir bileşen yok.'] },
    { ad: 'Taslak', ozet: 'Kod var, belge yazılıyor.', olcut: ['HTML ve CSS yazıldı. Renk ve aralık yalnız belirteçlerden gelir.', 'Belge sayfasında canlı bir örnek var.', 'Betik olmadan çalışır. Betik yalnız davranış ekler.', 'Bütünlük denetimi geçer: her sınıf ve davranış kodda bulunur.'] },
    { ad: 'Aday bileşen', ozet: 'Ortak sisteme öneri. Görüş toplanıyor.', olcut: ['React ve Vue sarmalayıcısı çekirdek ile aynı HTML’i üretir.', 'Kuruma özgü hiçbir API kalmadı.', 'Erişilebilirlik notları ve karşılanan WCAG ölçütleri yazıldı.', 'Klavye ve ekran okuyucu ile denendi.'] },
    { ad: 'Kararlı', ozet: 'Arayüzü donduruldu.', olcut: ['Sınıf adları ve veri öznitelikleri değişmez. Değişirse ana sürüm artar.', 'Karşıtlık, odak ve dokunma alanı denetimleri geçer.', 'Anlamsal sürümleme ve açık değişiklik günlüğü var.', 'Sık güncellemek güvenlidir.'] }
  ];

  return sayfa({
    baslik: 'Yönetişim',
    ozet: 'Bir bileşen sisteme nasıl girer, kim karar verir ve hangi ölçütleri karşılar.',
    yol: 'yonetisim/',
    derinlik: 1,
    etkin: 'yonetisim/',
    kenar: true,
    govde: `
<h1 class="dok-h1">Yönetişim</h1>
<p class="dok-giris">Bir tasarım sistemi kod deposu değildir. Bu sayfa, bir bileşenin sisteme nasıl
girdiğini ve kimin karar verdiğini yazar. Bu kural yazılmadan hiçbir bileşen yazılmaz.</p>

<h2 class="dok-h2" id="olcut">Katkı ölçütleri</h2>
<p>Birleşik Krallık tasarım sisteminin beş ölçütü temel alındı. İlk iki ölçüt işe başlamadan önce,
son üçü yayımdan önce denetlenir.</p>
<dl class="dok-anahtar dok-anahtar--genis">
  <div><dt>Yararlı</dt><dd>Birden çok kurumun veya hizmetin buna ihtiyacı olduğu gösterilir.</dd></div>
  <div><dt>Benzersiz</dt><dd>Sistemde zaten olan bir şeyi tekrarlamıyor.</dd></div>
  <div><dt>Kullanılabilir</dt><dd>Engelli kullanıcıları da kapsayan bir örneklemle test edilir.</dd></div>
  <div><dt>Tutarlı</dt><dd>Var olan belirteçleri ve bileşenleri kullanır. Metni TRDS dil kılavuzuna uyar.</dd></div>
  <div><dt>Çok yönlü</dt><dd>Farklı hizmetlerde, tarayıcılarda ve yardımcı teknolojilerde çalışır.</dd></div>
</dl>

<h2 class="dok-h2" id="dongu">Yaşam döngüsü</h2>
<p>Hollanda bayrak yarışı modeli temel alındı. Bir bileşen dört durumdan geçer. Her durumun yazılı
bir tamamlanma tanımı vardır. Kararlı bir bileşen, önceki üç durumun bütün ölçütlerini de karşılar.</p>
<div class="trds-uyari trds-uyari--uyari" role="status">
  <p><strong>Kullanım kanıtı yok.</strong> TRDS'yi bugün hiçbir kamu kurumu üretimde kullanmıyor.
  Bir bileşenin “kararlı” etiketi yalnız şunu söyler: arayüzü donduruldu ve denetimden geçti.
  Bir kurum bir bileşeni gerçek bir hizmette çalıştırdığında bu, o bileşenin sayfasına yazılır.</p>
</div>
<ol class="dok-asamalar">
${asamalar
  .map(
    (a, i) => `  <li class="dok-asama">
    <span class="dok-asama__no">${i + 1}</span>
    <h3 class="dok-asama__ad">${kacis(a.ad)}</h3>
    <p class="dok-asama__ozet">${kacis(a.ozet)}</p>
    <ul>${a.olcut.map((o) => `<li>${kacis(o)}</li>`).join('')}</ul>
  </li>`
  )
  .join('\n')}
</ol>

<h2 class="dok-h2" id="karar">Karar yetkisi</h2>
<p>İrlanda tasarım sisteminden alınan cümle burada da geçerlidir:
<strong>bu açık bir depodur, açık bir karar organı değildir.</strong></p>
<ul class="dok-liste">
  <li>Yalnız resmî kamu hizmetleri kendini resmî olarak sunabilir.</li>
  <li>Yalnız <code>gov.tr</code> alan adı gerçekliği gösterir.</li>
  <li>Bu deponun kullanılması bir onay anlamına gelmez.</li>
  <li>Görsel benzerlik tek başına meşruiyet vermez.</li>
</ul>

<h2 class="dok-h2" id="lisans">Lisans ikiye ayrılır</h2>
<div class="trds-tablo-kap dok-tablo-kap">
  <table class="trds-tablo dok-tablo">
    <caption class="trds-gorsel-gizli">Ne serbesttir, ne kısıtlıdır</caption>
    <thead><tr><th scope="col">Paket</th><th scope="col">Lisans</th><th scope="col">Kim kullanabilir</th></tr></thead>
    <tbody>
      <tr><th scope="row"><code>@tr-ds/core</code></th><td>MIT</td><td>Herkes. Tedarikçi, üniversite, belediye, özel şirket.</td></tr>
      <tr><th scope="row"><code>@tr-ds/tokens</code></th><td>MIT</td><td>Herkes.</td></tr>
      <tr><th scope="row"><code>@tr-ds/validators</code></th><td>MIT</td><td>Herkes.</td></tr>
      <tr><th scope="row"><code>@tr-ds/identity</code></th><td>Kısıtlı</td><td>Yalnız <code>gov.tr</code> alan adındaki resmî hizmetler.</td></tr>
    </tbody>
  </table>
</div>
<p>Bu ayrım Fransa ve İrlanda uygulamalarından alındı. Kod herkese açıktır, böylece yeniden
kullanım artar. Devlet kimliği kısıtlıdır, böylece sahte site kuranlar resmî görünmek için hazır
bir araç bulamaz.</p>
`
  });
};

// ------------------------------------------------------------------ belge CSS

const BELGE_CSS = `/* TRDS belge sitesi. Bileşen biçimlerinden ayrıdır, her sınıf 'dok-' ile başlar.
   Görsel dil: açık zemin, bir yazı tipi, hafif kenarlıklar, canlı önizleme.
   Renkler bileşen belirteçlerinden gelir, böylece koyu tema ve yüksek karşıtlık
   burada da çalışır. */

.dok {
  font-family: "Public Sans", var(--trds-yazi-aile-govde);
  font-size: var(--trds-yazi-boyut-16);
  line-height: 1.6;
}
/* Belge düzyazısı. Örnek sahnesindeki bileşen paragraflarına dokunmaz,
   onlar kendi kenar boşluklarını taşır. */
.dok p:not(.dok-ornek__sahne *, .dok-kart__olcek *, .dok-dizin__olcek *) { margin: 0 0 var(--trds-aralik-4); max-width: 68ch; }
/* Örnekler sistemin kendi yazı boyutunda görünür, belge boyutunda değil. */
.dok-ornek__sahne, .dok-kart__olcek, .dok-dizin__olcek {
  font-size: var(--trds-metin-govde);
  line-height: var(--trds-yazi-satir-normal);
}
.dok code {
  font-family: "IBM Plex Mono", var(--trds-yazi-aile-tek);
  font-size: 0.88em;
}
.dok :not(pre) > code {
  padding: 0.08em 0.35em;
  border-radius: var(--trds-kose-1);
  background: var(--trds-renk-notr-yuzey-yumusak);
  border: 1px solid var(--trds-renk-notr-kenar-silik);
}

.dok-kap {
  width: 100%;
  max-width: 82rem;
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 2.5rem);
}

/* ---------- üst çubuk ---------- */
.dok-ust {
  background: var(--trds-renk-notr-taban-varsayilan);
  color: var(--trds-renk-notr-taban-karsit-varsayilan);
  border-block-end: 4px solid var(--trds-renk-kimlik-serit);
}
.dok-ust__ic {
  display: flex;
  align-items: center;
  gap: var(--trds-aralik-6);
  min-height: 4.25rem;
  padding-block: var(--trds-aralik-2);
}
.dok-marka {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  column-gap: var(--trds-aralik-3);
  align-items: center;
  color: inherit;
  text-decoration: none;
  margin-inline-end: auto;
}
.dok-marka__isaret {
  grid-row: span 2;
  width: 2.25rem; height: 2.25rem;
  background: #fff;
  border-radius: 50%;
  padding: 0.15rem;
  object-fit: contain;
}
.dok-marka__ad { font-weight: 700; font-size: var(--trds-yazi-boyut-18); line-height: 1.1; letter-spacing: 0.01em; }
.dok-marka__alt { font-size: var(--trds-yazi-boyut-12); opacity: 0.8; line-height: 1.2; }
.dok-ust__menu { display: flex; gap: var(--trds-aralik-1); }
.dok-ust__menu a {
  color: inherit;
  text-decoration: none;
  padding: var(--trds-aralik-2) var(--trds-aralik-3);
  border-radius: var(--trds-kose-2);
  font-weight: 500;
  font-size: var(--trds-yazi-boyut-14);
  border-block-end: 0 !important;
}
.dok-ust__menu a:hover { background: rgb(255 255 255 / 0.12); }
.dok-ust__menu a[aria-current] { background: rgb(255 255 255 / 0.16); }
.dok-ust__erisim .trds-erisim__dugme { font-size: var(--trds-yazi-boyut-14); }
/* Dar ekranda menü, Menü düğmesi ile açılır. Çekirdek 48rem altında gizler.
   Belge sitesi yedi bağlantı taşır, bu yüzden eşik 60rem olur. */
@media (max-width: 60rem) {
  .dok-ust__ic { flex-wrap: wrap; gap: var(--trds-aralik-3); }
  .dok-ust__menu-dugmesi { display: inline-flex; align-items: center; }
  .dok-ust__menu { display: none; flex-basis: 100%; flex-direction: column; gap: 0; order: 10; }
  .trds-baslik-cubugu--acik .dok-ust__menu { display: flex; }
  .dok-ust__menu a { border-radius: 0; padding-block: var(--trds-aralik-3); border-block-end: 1px solid rgb(255 255 255 / 0.12); }
}

/* ---------- gövde ve kenar çubuğu ---------- */
.dok-govde {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--trds-aralik-8);
  padding-block: var(--trds-aralik-7) var(--trds-aralik-11);
}
@media (min-width: 64rem) {
  .dok-govde--kenarli { grid-template-columns: 15rem minmax(0, 1fr); gap: var(--trds-aralik-10); }
}
.dok-icerik { min-width: 0; }
.dok-govde:not(.dok-govde--genis) .dok-icerik { max-width: 52rem; }

.dok-kenar { font-size: var(--trds-yazi-boyut-14); }
@media (min-width: 64rem) {
  .dok-kenar__ic { position: sticky; top: var(--trds-aralik-5); max-height: calc(100vh - 2.5rem); overflow-y: auto; padding-inline-end: var(--trds-aralik-2); }
}
@media (max-width: 63.99rem) {
  .dok-kenar { display: none; }
}
/* Başlıklar bağlantı metniyle aynı hizada durur. Bağlantı kutusu sola
   taşmaz, çünkü kenar çubuğu bir kaydırma kabıdır ve taşanı kırpar. */
.dok-kenar__baslik {
  display: flex; justify-content: space-between; align-items: baseline;
  margin: 0 0 var(--trds-aralik-4);
  padding: 0 var(--trds-aralik-2) var(--trds-aralik-3);
  border-block-end: 1px solid var(--trds-renk-notr-kenar-silik);
  font-weight: 700; font-size: var(--trds-yazi-boyut-16);
}
.dok-kenar__baslik a { color: inherit; text-decoration: none; }
.dok-kenar__baslik span { color: var(--trds-renk-notr-metin-silik); font-weight: 400; font-size: var(--trds-yazi-boyut-12); }
.dok-kenar__grup { margin: 0 0 var(--trds-aralik-5); }
.dok-kenar__grup-ad {
  margin: 0 0 var(--trds-aralik-1);
  padding-inline: var(--trds-aralik-2);
  font-size: var(--trds-yazi-boyut-12);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--trds-renk-notr-metin-silik);
}
.dok-kenar__liste { list-style: none; margin: 0; padding: 0; }
.dok-kenar__liste a {
  display: flex; align-items: center; gap: var(--trds-aralik-2);
  padding: 0.35rem var(--trds-aralik-2);
  border-radius: var(--trds-kose-2);
  color: var(--trds-renk-notr-metin-varsayilan);
  text-decoration: none;
}
.dok-kenar__liste a:hover { background: var(--trds-renk-notr-yuzey-yumusak); }
.dok-kenar__liste a[aria-current] {
  background: var(--trds-renk-birincil-zemin-yumusak);
  color: var(--trds-renk-birincil-metin-guclu);
  font-weight: 700;
}

/* ---------- başlıklar ---------- */
.dok-h1, .dok-h2, .dok-h3, .dok-h4 {
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--trds-renk-notr-metin-varsayilan);
  text-wrap: balance;
}
.dok-h1 { font-size: clamp(1.9rem, 3.4vw, 2.5rem); margin: 0 0 var(--trds-aralik-4); }
.dok-h2 { font-size: clamp(1.35rem, 2.2vw, 1.6rem); margin: var(--trds-aralik-9) 0 var(--trds-aralik-4); padding-block-start: var(--trds-aralik-5); border-block-start: 1px solid var(--trds-renk-notr-kenar-silik); }
.dok-h3 { font-size: var(--trds-yazi-boyut-18); margin: var(--trds-aralik-6) 0 var(--trds-aralik-3); }
.dok-h4 { font-size: var(--trds-yazi-boyut-12); letter-spacing: 0.08em; text-transform: uppercase; color: var(--trds-renk-notr-metin-silik); margin: 0 0 var(--trds-aralik-2); }
.dok-giris { font-size: var(--trds-yazi-boyut-18); color: var(--trds-renk-notr-metin-silik); max-width: 62ch; margin-bottom: var(--trds-aralik-6); }
.dok-ust-bilgi { font-size: var(--trds-yazi-boyut-14); color: var(--trds-renk-notr-metin-silik); margin: 0 0 var(--trds-aralik-2); }
.dok-baslik-blok { margin-block-end: var(--trds-aralik-6); }
.dok-yol { margin-block: 0 var(--trds-aralik-5); }
.dok-silik { color: var(--trds-renk-notr-metin-silik); }

.dok-liste { padding-inline-start: 1.25rem; max-width: 68ch; margin: 0 0 var(--trds-aralik-5); }
.dok-liste li { margin-block-end: var(--trds-aralik-2); padding-inline-start: 0.25rem; }
.dok-liste li::marker { color: var(--trds-renk-notr-metin-silik); }
.dok-liste--sik li { margin-block-end: var(--trds-aralik-1); font-size: var(--trds-yazi-boyut-14); }

/* ---------- sayfa içi menü ---------- */
.dok-icindekiler {
  display: flex; flex-wrap: wrap; gap: var(--trds-aralik-1) var(--trds-aralik-4);
  margin: 0 0 var(--trds-aralik-6);
  padding: var(--trds-aralik-3) 0;
  border-block: 1px solid var(--trds-renk-notr-kenar-silik);
  font-size: var(--trds-yazi-boyut-14);
}
.dok-icindekiler a { color: var(--trds-renk-birincil-metin-varsayilan); text-decoration: none; }
.dok-icindekiler a:hover { text-decoration: underline; }

/* ---------- durumlar ---------- */
.dok-rozet {
  display: inline-flex; align-items: center; gap: 0.35em;
  padding: 0.1rem 0.55rem;
  border-radius: 999px;
  font-size: var(--trds-yazi-boyut-12);
  font-weight: 500;
  white-space: nowrap;
  line-height: 1.5;
}
.dok-rozet::before { content: ''; width: 0.45em; height: 0.45em; border-radius: 50%; background: currentColor; }
.dok-rozet--kararli { color: var(--trds-renk-basari-metin-varsayilan); background: var(--trds-renk-basari-zemin-yumusak); }
.dok-rozet--beta { color: var(--trds-renk-birincil-metin-varsayilan); background: var(--trds-renk-birincil-zemin-yumusak); }
.dok-rozet--alfa { color: var(--trds-renk-uyari-metin-varsayilan); background: var(--trds-renk-uyari-zemin-yumusak); }
.dok-rozet--degerlendiriliyor { color: var(--trds-renk-notr-metin-silik); background: var(--trds-renk-notr-yuzey-yumusak); }
.dok-rozet--yok { color: var(--trds-renk-notr-metin-silik); background: transparent; border: 1px dashed var(--trds-renk-notr-kenar-varsayilan); }
.dok-rozet--yok::before { display: none; }
.dok-rozet--ozel { color: var(--trds-renk-birincil-metin-varsayilan); background: var(--trds-renk-birincil-zemin-yumusak); }

.dok-durumlar {
  display: flex; flex-wrap: wrap; gap: var(--trds-aralik-5);
  margin: var(--trds-aralik-4) 0 0;
  padding: var(--trds-aralik-3) var(--trds-aralik-4);
  border: 1px solid var(--trds-renk-notr-kenar-silik);
  border-radius: var(--trds-kose-2);
  background: var(--trds-renk-notr-zemin-yumusak);
}
.dok-durumlar > div { display: flex; flex-direction: column; gap: 0.2rem; }
.dok-durumlar dt { font-size: var(--trds-yazi-boyut-12); color: var(--trds-renk-notr-metin-silik); text-transform: uppercase; letter-spacing: 0.06em; }
.dok-durumlar dd { margin: 0; }

.dok-anahtar { display: grid; gap: var(--trds-aralik-2); margin: 0 0 var(--trds-aralik-5); max-width: 68ch; }
.dok-anahtar > div { display: grid; grid-template-columns: 9rem 1fr; gap: var(--trds-aralik-3); align-items: baseline; }
.dok-anahtar dt { margin: 0; font-weight: 700; }
.dok-anahtar dd { margin: 0; color: var(--trds-renk-notr-metin-silik); }
.dok-anahtar--genis > div { grid-template-columns: 8rem 1fr; padding-block: var(--trds-aralik-2); border-block-end: 1px solid var(--trds-renk-notr-kenar-silik); }

.dok-tr {
  display: inline-block;
  padding: 0 0.35rem;
  border-radius: 3px;
  background: var(--trds-renk-kimlik-serit);
  color: var(--trds-renk-kimlik-arma);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.5;
  vertical-align: 0.2em;
}
.dok-tr--buyuk { font-size: 0.9rem; vertical-align: 0.5em; }

/* ---------- kahraman ---------- */
.dok-kahraman { padding-block: var(--trds-aralik-6) var(--trds-aralik-9); max-width: 44rem; }
.dok-kahraman__ust { font-size: var(--trds-yazi-boyut-14); color: var(--trds-renk-notr-metin-silik); margin: 0 0 var(--trds-aralik-3); letter-spacing: 0.02em; }
.dok-kahraman__baslik { font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.05; letter-spacing: -0.02em; font-weight: 700; margin: 0 0 var(--trds-aralik-5); text-wrap: balance; }
.dok-kahraman__metin { font-size: var(--trds-yazi-boyut-20); color: var(--trds-renk-notr-metin-silik); margin: 0 0 var(--trds-aralik-6); max-width: 36rem; }
.dok-kahraman__eylemler { display: flex; flex-wrap: wrap; gap: var(--trds-aralik-3); }
.dok-kahraman__eylemler .trds-button { text-decoration: none; }

.dok-ucsutun {
  display: grid; gap: var(--trds-aralik-6);
  padding-block: var(--trds-aralik-7);
  border-block: 1px solid var(--trds-renk-notr-kenar-silik);
}
@media (min-width: 48rem) { .dok-ucsutun { grid-template-columns: repeat(3, 1fr); gap: var(--trds-aralik-8); } }
.dok-ucsutun__baslik { margin: 0 0 var(--trds-aralik-2); font-size: var(--trds-yazi-boyut-20); }
.dok-ucsutun__baslik a { color: var(--trds-renk-birincil-metin-varsayilan); text-decoration: none; }
.dok-ucsutun__baslik a:hover { text-decoration: underline; }
.dok-ucsutun p { margin: 0; color: var(--trds-renk-notr-metin-silik); font-size: var(--trds-yazi-boyut-16); }

.dok-bolum { padding-block: var(--trds-aralik-8) 0; }
.dok-bolum__ust { margin-block-end: var(--trds-aralik-5); max-width: 62ch; }
.dok-bolum__baslik { font-size: clamp(1.5rem, 2.6vw, 1.9rem); font-weight: 700; letter-spacing: -0.015em; margin: 0 0 var(--trds-aralik-2); }
.dok-bolum__metin { color: var(--trds-renk-notr-metin-silik); margin: 0; }
.dok-bolum > .dok-bolum__metin { margin-block-start: var(--trds-aralik-5); }

/* ---------- kartlar ---------- */
.dok-izgara {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15.5rem, 1fr));
  gap: var(--trds-aralik-4);
}
.dok-kart {
  position: relative;
  display: flex; flex-direction: column;
  border: 1px solid var(--trds-renk-notr-kenar-silik);
  border-radius: var(--trds-kose-3);
  background: var(--trds-renk-notr-yuzey-varsayilan);
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  transition: border-color 120ms ease, box-shadow 120ms ease, transform 120ms ease;
}
.dok-kart:hover {
  border-color: var(--trds-renk-notr-kenar-varsayilan);
  box-shadow: var(--trds-golge-2);
  transform: translateY(-1px);
}
.dok-kart__onizleme {
  height: 9.5rem;
  overflow: hidden;
  padding: var(--trds-aralik-4);
  background: var(--trds-renk-notr-yuzey-yumusak);
  border-block-end: 1px solid var(--trds-renk-notr-kenar-silik);
  pointer-events: none;
  user-select: none;
}
.dok-kart__olcek {
  width: 145%;
  transform: scale(0.69);
  transform-origin: top left;
}
.dok-kart__olcek > * { margin-block-start: 0 !important; }
.dok-kart__olcek .trds-baslik-cubugu,
.dok-kart__olcek .trds-alt-bilgi,
:is(.dok-ornek__sahne, .dok-kart__olcek, .dok-dizin__olcek) :is(.trds-gecici-alan, .trds-yuzen, .trds-alt-gezinme, .trds-basa-don, .trds-cikis) { position: static; width: auto; box-shadow: var(--trds-golge-1); }
:is(.dok-ornek__sahne, .dok-kart__olcek, .dok-dizin__olcek) .trds-alt-gezinme { display: flex; }
:is(.dok-ornek__sahne, .dok-kart__olcek, .dok-dizin__olcek) .trds-u-yapiskan { position: static; }
:is(.dok-kart__olcek, .dok-dizin__olcek) :is(.trds-yuzen, .trds-basa-don) { display: inline-flex; }
:is(.dok-kart__olcek, .dok-dizin__olcek) .trds-cikis { display: flex; justify-content: flex-start; }
:is(.dok-kart__olcek, .dok-dizin__olcek) .trds-erisim__panel { position: static; inset: auto; margin-block-start: var(--trds-aralik-3); max-width: 100%; box-shadow: none; }
.dok-kart__olcek .trds-tanitici,
.dok-kart__olcek .trds-edevlet,
.dok-kart__olcek .trds-kvkk { margin: 0; }
.dok-kart__olcek .trds-kap { padding-inline: var(--trds-aralik-3); }
.dok-kart__olcek .trds-erisim__panel { position: static; margin-block-start: var(--trds-aralik-2); }
.dok-kart__govde { padding: var(--trds-aralik-3) var(--trds-aralik-4) var(--trds-aralik-4); display: flex; flex-direction: column; gap: 0.15rem; }
.dok-kart__ad { margin: 0; font-weight: 700; font-size: var(--trds-yazi-boyut-16); color: var(--trds-renk-notr-metin-varsayilan); line-height: 1.3; }
.dok-kart__ad a { color: inherit; text-decoration: none; }
.dok-kart__ad a:hover { text-decoration: underline; }
/* Kartın tamamı tıklanır. Bağlantı yalnız başlıktadır, kalan alan üstüne yayılır. */
.dok-kart__ad a::after { content: ''; position: absolute; inset: 0; }
.dok-kart:has(.dok-kart__ad a:focus-visible) { outline: var(--trds-olcu-odak-kalinlik) solid var(--trds-renk-odak-dolgu); outline-offset: 2px; }
.dok-kart__ad a:focus-visible { outline: none; background: none; color: inherit; box-shadow: none; }
.dok-kart__en { font-size: var(--trds-yazi-boyut-14); color: var(--trds-renk-notr-metin-silik); }

/* ---------- bileşen dizini ---------- */
.dok-suzgec {
  margin: var(--trds-aralik-6) 0 var(--trds-aralik-5);
  padding: var(--trds-aralik-5);
  border: 1px solid var(--trds-renk-notr-kenar-silik);
  border-radius: var(--trds-kose-3);
  background: var(--trds-renk-notr-zemin-yumusak);
}
.dok-suzgec__ara { max-width: 28rem; margin-block-end: var(--trds-aralik-4); }
.dok-suzgec__ara .trds-etiket { font-size: var(--trds-yazi-boyut-14); }
.dok-suzgec__satir { display: flex; flex-wrap: wrap; gap: var(--trds-aralik-5) var(--trds-aralik-7); }
.dok-suzgec__grup { margin: 0; padding: 0; border: 0; min-width: 0; }
.dok-suzgec__grup legend { padding: 0; margin-block-end: var(--trds-aralik-2); font-size: var(--trds-yazi-boyut-12); font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--trds-renk-notr-metin-silik); }
.dok-suzgec__secim { min-height: 2.5rem; font-size: var(--trds-yazi-boyut-14); width: auto; min-width: 12rem; padding-block: 0.3rem; }
.dok-suzgec__cipler { display: flex; flex-wrap: wrap; gap: var(--trds-aralik-2); }
.dok-cip {
  display: inline-flex; align-items: center; gap: 0.4rem;
  min-height: 2.25rem;
  padding: 0 var(--trds-aralik-3);
  border: 1px solid var(--trds-renk-notr-kenar-varsayilan);
  border-radius: 999px;
  background: var(--trds-renk-notr-yuzey-varsayilan);
  font-size: var(--trds-yazi-boyut-14);
  cursor: pointer;
  user-select: none;
}
.dok-cip input { margin: 0; width: 1rem; height: 1rem; accent-color: var(--trds-renk-birincil-taban-varsayilan); }
.dok-cip:has(input:checked) { background: var(--trds-renk-birincil-zemin-yumusak); border-color: var(--trds-renk-birincil-kenar-varsayilan); color: var(--trds-renk-birincil-metin-guclu); font-weight: 500; }
.dok-cip:has(input:focus-visible) { outline: var(--trds-olcu-odak-kalinlik) solid var(--trds-renk-odak-dolgu); }
.dok-suzgec__sayi { margin: var(--trds-aralik-4) 0 0; font-size: var(--trds-yazi-boyut-14); color: var(--trds-renk-notr-metin-silik); font-variant-numeric: tabular-nums; }
.dok-suzgec__temizle { margin-block-start: var(--trds-aralik-2); padding-inline: 0; min-height: 2rem; font-size: var(--trds-yazi-boyut-14); }

.dok-dizin { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--trds-aralik-4); }
@media (min-width: 56rem) { .dok-dizin { grid-template-columns: 1fr 1fr; } }
.dok-dizin__oge[hidden] { display: none; }
.dok-dizin__kart {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  border: 1px solid var(--trds-renk-notr-kenar-silik);
  border-radius: var(--trds-kose-3);
  background: var(--trds-renk-notr-yuzey-varsayilan);
  overflow: hidden;
  transition: border-color 120ms ease, box-shadow 120ms ease;
}
.dok-dizin__kart:hover { border-color: var(--trds-renk-notr-kenar-varsayilan); box-shadow: var(--trds-golge-2); }
.dok-dizin__onizleme {
  display: block;
  height: 10rem;
  overflow: hidden;
  padding: var(--trds-aralik-4);
  background: var(--trds-renk-notr-yuzey-yumusak);
  border-block-end: 1px solid var(--trds-renk-notr-kenar-silik);
}
.dok-dizin__olcek { width: 145%; transform: scale(0.69); transform-origin: top left; pointer-events: none; user-select: none; }
.dok-dizin__olcek > * { margin-block-start: 0 !important; }
.dok-dizin__olcek .trds-baslik-cubugu, .dok-dizin__olcek .trds-alt-bilgi, .dok-dizin__olcek .trds-tanitici,
.dok-dizin__olcek .trds-edevlet, .dok-dizin__olcek .trds-kvkk { margin: 0; }
.dok-dizin__olcek .trds-kap { padding-inline: var(--trds-aralik-3); }
.dok-dizin__olcek .trds-erisim__panel { position: static; margin-block-start: var(--trds-aralik-2); }
.dok-dizin__govde { display: flex; flex-direction: column; gap: var(--trds-aralik-2); padding: var(--trds-aralik-4) var(--trds-aralik-5) var(--trds-aralik-5); }
.dok-dizin__ust { display: flex; align-items: center; justify-content: space-between; gap: var(--trds-aralik-3); }
.dok-dizin__ad { margin: 0; font-size: var(--trds-yazi-boyut-18); font-weight: 700; line-height: 1.2; }
.dok-dizin__ad a { color: var(--trds-renk-notr-metin-varsayilan); text-decoration: none; }
.dok-dizin__ad a:hover { text-decoration: underline; }
/* Kartın tamamı tıklanır, ama bağlantı yalnız başlıktadır. */
.dok-dizin__ad a::after { content: ''; position: absolute; inset: 0; }
.dok-dizin__kart { position: relative; }
.dok-dizin__en { margin: 0; font-size: var(--trds-yazi-boyut-12); color: var(--trds-renk-notr-metin-silik); letter-spacing: 0.02em; }
.dok-dizin__ozet { margin: 0; font-size: var(--trds-yazi-boyut-14); color: var(--trds-renk-notr-metin-varsayilan); max-width: none; }
.dok-dizin__tek { list-style: none; margin: var(--trds-aralik-2) 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: var(--trds-aralik-1); }
.dok-dizin__tek li { padding: 0.05rem 0.5rem; border-radius: 4px; background: var(--trds-renk-notr-yuzey-yumusak); border: 1px solid var(--trds-renk-notr-kenar-silik); font-size: var(--trds-yazi-boyut-12); font-family: "IBM Plex Mono", monospace; color: var(--trds-renk-notr-metin-silik); }
.dok-dizin__bos { padding: var(--trds-aralik-6); border: 1px dashed var(--trds-renk-notr-kenar-varsayilan); border-radius: var(--trds-kose-3); color: var(--trds-renk-notr-metin-silik); }

/* ---------- gruplar ---------- */
.dok-gruplar { list-style: none; margin: 0; padding: 0; display: grid; gap: 0; border-block-start: 1px solid var(--trds-renk-notr-kenar-silik); }
@media (min-width: 48rem) { .dok-gruplar { grid-template-columns: 1fr 1fr; column-gap: var(--trds-aralik-8); } }
.dok-gruplar li { padding: var(--trds-aralik-4) 0; border-block-end: 1px solid var(--trds-renk-notr-kenar-silik); }
.dok-gruplar a { display: flex; justify-content: space-between; align-items: baseline; gap: var(--trds-aralik-3); color: inherit; text-decoration: none; }
.dok-gruplar a:hover .dok-gruplar__ad { text-decoration: underline; }
.dok-gruplar__ad { font-weight: 700; }
.dok-gruplar__sayi { font-family: "IBM Plex Mono", monospace; font-size: var(--trds-yazi-boyut-12); color: var(--trds-renk-notr-metin-silik); }
.dok-gruplar p { margin: var(--trds-aralik-1) 0 0; font-size: var(--trds-yazi-boyut-14); color: var(--trds-renk-notr-metin-silik); }

/* ---------- örnek ---------- */
.dok-ornek {
  margin: 0 0 var(--trds-aralik-6);
  border: 1px solid var(--trds-renk-notr-kenar-silik);
  border-radius: var(--trds-kose-3);
  background: var(--trds-renk-notr-yuzey-varsayilan);
}
.dok-ornek__cubuk {
  display: flex; justify-content: space-between; align-items: center; gap: var(--trds-aralik-3);
  padding: var(--trds-aralik-2) var(--trds-aralik-4);
  border-block-end: 1px solid var(--trds-renk-notr-kenar-silik);
  background: var(--trds-renk-notr-zemin-yumusak);
  border-start-start-radius: var(--trds-kose-3);
  border-start-end-radius: var(--trds-kose-3);
  font-size: var(--trds-yazi-boyut-14);
}
.dok-ornek__ad { font-weight: 700; }
.dok-ornek__aciklama {
  margin: 0;
  padding: var(--trds-aralik-3) var(--trds-aralik-4);
  border-block-end: 1px solid var(--trds-renk-notr-kenar-silik);
  font-size: var(--trds-yazi-boyut-14);
  color: var(--trds-renk-notr-metin-silik);
}
.dok-ornek__not { color: var(--trds-renk-notr-metin-silik); font-size: var(--trds-yazi-boyut-12); }
/* Sahne taşmayı kırpmaz. Açılır panel gibi parçalar dışarı çıkabilir. */
/* Önizleme zemini alt bilgi ile aynı tondadır. Koyu temada kart yüzeyinden ayrılır. */
.dok-ornek__sahne { padding: var(--trds-aralik-6); overflow: visible; background: var(--trds-renk-notr-yuzey-yumusak); }
/* Tam genişlik bileşen kenardan kenara durur. Kendi kabı sayfa dolgusunu taşır,
   böylece bayrak ve çizgi gerçek sayfadaki gibi hizalanır. */
.dok-ornek__sahne--tam { padding: 0; }
.dok-ornek__sahne--tam .trds-kap { max-width: none; }
.dok-ornek__sahne--tam .trds-alt-bilgi { margin-block-start: 0; }
/* Sahnenin dış kenarındaki boşluk kalkar. İç boşluklar (alan ile düğme
   arası gibi) sistemin kendi aralığıyla kalır. */
.dok-ornek__sahne > :first-child { margin-block-start: 0; }
.dok-ornek__sahne > :last-child,
.dok-ornek__sahne > :last-child > :last-child { margin-block-end: 0; }
.dok-ornek__kod { border-block-start: 1px solid var(--trds-renk-notr-kenar-silik); }
.dok-ornek__kod > summary {
  padding: var(--trds-aralik-3) var(--trds-aralik-4);
  cursor: pointer;
  font-size: var(--trds-yazi-boyut-14);
  font-weight: 500;
  color: var(--trds-renk-birincil-metin-varsayilan);
  list-style: none;
}
.dok-ornek__kod > summary::-webkit-details-marker { display: none; }
.dok-ornek__kod > summary::before { content: '+ '; font-family: "IBM Plex Mono", monospace; }
.dok-ornek__kod[open] > summary::before { content: '− '; }
.dok-ornek__kod pre { margin: 0; border-radius: 0 0 var(--trds-kose-3) var(--trds-kose-3); }

pre, .dok-kod {
  margin: 0 0 var(--trds-aralik-5);
  padding: var(--trds-aralik-4) var(--trds-aralik-5);
  overflow-x: auto;
  background: var(--trds-renk-notr-taban-varsayilan);
  color: var(--trds-renk-notr-taban-karsit-varsayilan);
  border-radius: var(--trds-kose-3);
  font-size: var(--trds-yazi-boyut-14);
  line-height: 1.6;
  tab-size: 2;
}
pre code { font-size: inherit; }

.dok-wcag { display: flex; flex-wrap: wrap; align-items: center; gap: var(--trds-aralik-2); font-size: var(--trds-yazi-boyut-14); }
.dok-wcag > span { color: var(--trds-renk-notr-metin-silik); margin-inline-end: var(--trds-aralik-2); }
.dok-olcut {
  font-family: "IBM Plex Mono", monospace;
  font-size: var(--trds-yazi-boyut-12);
  padding: 0.15rem 0.5rem;
  border: 1px solid var(--trds-renk-notr-kenar-silik);
  border-radius: 999px;
  color: var(--trds-renk-birincil-metin-varsayilan);
  text-decoration: none;
}
.dok-olcut:hover { border-color: var(--trds-renk-birincil-kenar-varsayilan); }

/* ---------- tablolar ---------- */
.dok-tablo-kap { margin: 0 0 var(--trds-aralik-6); border: 1px solid var(--trds-renk-notr-kenar-silik); border-radius: var(--trds-kose-3); }
.dok-tablo { font-size: var(--trds-yazi-boyut-14); min-width: 0; }
.dok-tablo thead th { font-size: var(--trds-yazi-boyut-12); letter-spacing: 0.06em; text-transform: uppercase; color: var(--trds-renk-notr-metin-silik); background: var(--trds-renk-notr-zemin-yumusak); }
.dok-tablo th[scope='row'] { font-weight: 500; }
.dok-tablo tbody tr:hover { background: var(--trds-renk-notr-zemin-yumusak); }
.dok-matris { min-width: 44rem; }

/* ---------- simgeler ---------- */
.dok-simgeler {
  list-style: none; margin: 0; padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr));
  gap: var(--trds-aralik-3);
}
.dok-simge {
  display: flex; flex-direction: column; align-items: center; gap: var(--trds-aralik-2);
  padding: var(--trds-aralik-4) var(--trds-aralik-2);
  border: 1px solid var(--trds-renk-notr-kenar-silik);
  border-radius: var(--trds-kose-3);
  background: var(--trds-renk-notr-yuzey-varsayilan);
  text-align: center;
}
.dok-simge__gorsel { width: 2rem; height: 2rem; fill: currentColor; color: var(--trds-renk-notr-metin-varsayilan); }
.dok-simge__ad { font-size: var(--trds-yazi-boyut-14); font-weight: 500; }
.dok-simge__kod { font-size: 0.68rem; color: var(--trds-renk-notr-metin-silik); background: none !important; border: 0 !important; padding: 0 !important; word-break: break-all; }

/* ---------- entegrasyon ---------- */
.dok-entegrasyon__ust { display: flex; align-items: center; gap: var(--trds-aralik-3); }
.dok-entegrasyon__ust .dok-h2 { margin-block-end: 0; flex: 1; }
/* Her kod bloğu kendi boyunda durur. Kısa kurulum satırı, uzun kullanım
   bloğunun boyuna uzamaz. */
.dok-entegrasyon__kod { display: grid; align-items: start; gap: var(--trds-aralik-4); margin: var(--trds-aralik-4) 0; }
@media (min-width: 56rem) { .dok-entegrasyon__kod { grid-template-columns: 1fr 1fr; } }
.dok-entegrasyon__kod pre { margin: 0; }

/* ---------- temeller ---------- */
.dok-olcek-blok { margin: 0 0 var(--trds-aralik-6); }
.dok-olcek-blok .dok-h3 { font-family: "IBM Plex Mono", monospace; font-size: var(--trds-yazi-boyut-14); text-transform: uppercase; letter-spacing: 0.08em; color: var(--trds-renk-notr-metin-silik); }
.dok-renkler { display: grid; grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr)); gap: var(--trds-aralik-2); }
.dok-renk {
  display: grid; grid-template-columns: 2.25rem 1fr; grid-template-rows: auto auto; column-gap: var(--trds-aralik-3); align-items: center;
  padding: var(--trds-aralik-2);
  border: 1px solid var(--trds-renk-notr-kenar-silik);
  border-radius: var(--trds-kose-2);
}
.dok-renk__ornek { grid-row: span 2; width: 2.25rem; height: 2.25rem; border-radius: var(--trds-kose-2); border: 1px solid rgb(0 0 0 / 0.08); }
.dok-renk__ad { font-size: var(--trds-yazi-boyut-14); font-weight: 500; }
.dok-renk__deger { font-size: var(--trds-yazi-boyut-12); color: var(--trds-renk-notr-metin-silik); background: none !important; border: 0 !important; padding: 0 !important; }

.dok-tip { border-block-start: 1px solid var(--trds-renk-notr-kenar-silik); margin: 0 0 var(--trds-aralik-6); }
.dok-tip__satir { display: flex; justify-content: space-between; align-items: baseline; gap: var(--trds-aralik-4); padding: var(--trds-aralik-3) 0; border-block-end: 1px solid var(--trds-renk-notr-kenar-silik); }
.dok-tip__ornek { line-height: 1.15; font-weight: 700; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dok-tip__ad { flex: 0 0 auto; font-size: var(--trds-yazi-boyut-12); color: var(--trds-renk-notr-metin-silik); background: none !important; border: 0 !important; }

.dok-aralik { display: grid; gap: var(--trds-aralik-2); }
.dok-aralik__satir { display: grid; grid-template-columns: 7rem 1fr 4rem; gap: var(--trds-aralik-4); align-items: center; font-size: var(--trds-yazi-boyut-14); }
.dok-aralik__cubuk { display: block; block-size: 0.9rem; background: var(--trds-renk-birincil-taban-varsayilan); border-radius: 2px; }

/* ---------- aşamalar ---------- */
.dok-asamalar { display: grid; gap: var(--trds-aralik-3); margin: 0 0 var(--trds-aralik-6); padding: 0; list-style: none; }
@media (min-width: 56rem) { .dok-asamalar { grid-template-columns: repeat(2, 1fr); } }
.dok-asama { padding: var(--trds-aralik-5); border: 1px solid var(--trds-renk-notr-kenar-silik); border-radius: var(--trds-kose-3); background: var(--trds-renk-notr-yuzey-varsayilan); }
.dok-asama__no { display: inline-flex; align-items: center; justify-content: center; width: 1.6rem; height: 1.6rem; border-radius: 50%; background: var(--trds-renk-birincil-taban-varsayilan); color: var(--trds-renk-birincil-taban-karsit-varsayilan); font-size: var(--trds-yazi-boyut-12); font-weight: 700; margin-block-end: var(--trds-aralik-3); }
.dok-asama__ad { margin: 0 0 var(--trds-aralik-1); font-size: var(--trds-yazi-boyut-18); font-weight: 700; }
.dok-asama__ozet { margin: 0 0 var(--trds-aralik-3); color: var(--trds-renk-notr-metin-silik); font-size: var(--trds-yazi-boyut-14); }
.dok-asama ul { margin: 0; padding-inline-start: 1.1rem; font-size: var(--trds-yazi-boyut-14); }
.dok-asama li { margin-block-end: var(--trds-aralik-1); }

/* ---------- alt bilgi ---------- */
.dok-alt {
  margin-block-start: var(--trds-aralik-11);
  padding-block: var(--trds-aralik-8) var(--trds-aralik-9);
  border-block-start: 1px solid var(--trds-renk-notr-kenar-silik);
  background: var(--trds-renk-notr-yuzey-yumusak);
  font-size: var(--trds-yazi-boyut-14);
}
.dok-alt__ic { display: grid; gap: var(--trds-aralik-6); }
@media (min-width: 48rem) { .dok-alt__ic { grid-template-columns: 2fr 1fr 1fr 1fr; gap: var(--trds-aralik-8); } }
.dok-alt__sutun { display: flex; flex-direction: column; gap: var(--trds-aralik-2); }
.dok-alt__baslik { font-weight: 700; margin: 0 0 var(--trds-aralik-1); }
.dok-alt__metin { margin: 0; color: var(--trds-renk-notr-metin-silik); max-width: 40ch; }
.dok-alt a { color: var(--trds-renk-notr-metin-varsayilan); }
`;

const BELGE_JS = `// TRDS belge sitesi davranışı: kenar çubuğu kaydırma hafızası ve dizin süzgeci.
// Betik yüklenmezse bütün bileşenler görünür kalır ve kenar çubuğu yine çalışır.

// Kenar çubuğu, sayfa değişince kaydırma konumunu hatırlar. Konum yoksa
// geçerli bağlantıyı görünür alana getirir.
const kenar = document.querySelector('.dok-kenar__ic');
if (kenar) {
  const ANAHTAR = 'dok-kenar-kaydirma';
  try {
    const kayitli = sessionStorage.getItem(ANAHTAR);
    if (kayitli !== null) {
      kenar.scrollTop = Number(kayitli);
    } else {
      kenar.querySelector('[aria-current]')?.scrollIntoView({ block: 'center' });
    }
  } catch (e) {}
  kenar.addEventListener('scroll', () => {
    try { sessionStorage.setItem(ANAHTAR, String(kenar.scrollTop)); } catch (e) {}
  }, { passive: true });
}

const form = document.querySelector('[data-dok="suzgec"]');
if (form) {
  const ogeler = [...document.querySelectorAll('[data-dok="dizin"] > li')];
  const sayi = document.querySelector('[data-dok="sayi"]');
  const bos = document.querySelector('[data-dok="bos"]');
  const toplam = ogeler.length;

  const secili = (ad) => [...form.querySelectorAll(\`[name="\${ad}"]:checked\`)].map((k) => k.value);
  const kucult = (m) => m.toLocaleLowerCase('tr').trim();

  const uygula = () => {
    const ara = kucult(form.elements.ara.value);
    const grup = form.elements.grup.value;
    const durum = secili('durum');
    const tek = secili('tek');
    const ozgun = secili('ozgun').length > 0;
    let gorunen = 0;
    for (const oge of ogeler) {
      const d = oge.dataset;
      const uyar =
        (!ara || d.ad.includes(ara)) &&
        (!grup || d.grup === grup) &&
        (durum.length === 0 || durum.includes(d.durum)) &&
        tek.every((t) => d.tek.split(' ').includes(t)) &&
        (!ozgun || d.ozgun === 'evet');
      oge.hidden = !uyar;
      if (uyar) gorunen += 1;
    }
    sayi.textContent = \`\${gorunen} / \${toplam} bileşen görünüyor\`;
    bos.hidden = gorunen > 0;
  };

  form.addEventListener('input', uygula);
  form.addEventListener('change', uygula);
  form.addEventListener('reset', () => setTimeout(uygula, 0));
  form.addEventListener('submit', (olay) => olay.preventDefault());

  // Adres çubuğundan gelen ?grup= değeri süzgeci kurar.
  const params = new URLSearchParams(location.search);
  if (params.get('grup')) { form.elements.grup.value = params.get('grup'); }
  if (location.hash && form.elements.grup.querySelector(\`option[value="\${location.hash.slice(1)}"]\`)) {
    form.elements.grup.value = location.hash.slice(1);
  }
  uygula();
}
`;

// ------------------------------------------------------------------ örnekler

import { readdir } from 'node:fs/promises';

/**
 * Bir örnek sayfa: gerçek bir kamu sitesinin TRDS ile yeniden kurulmuş hâli.
 * Belge kabuğu yoktur. Sayfa, bir kurumun sitesi gibi durur. Yalnız en üstte
 * ince bir örnek şeridi bulunur.
 */
/** Logo files read from the identity package, keyed by file name. */
const KURUM_LOGOLARI = new Map();

/** Renders a logo as <img>, or inlines the SVG so it takes the text colour. */
const logoEtiketi = (logo, sinif, alt) => {
  if (logo.svg) {
    const kaynak = KURUM_LOGOLARI.get(logo.svg) ?? '';
    return kaynak
      .replace(/<svg\b/, `<svg class="${sinif}"${alt ? '' : ' aria-hidden="true"'}`)
      .replace(/\srole="img"/, alt ? ' role="img"' : '')
      .replace(/\saria-label="[^"]*"/, alt ? ` aria-label="${kacis(alt)}"` : '');
  }
  const olcu = logo.genislik ? ` width="${logo.genislik}" height="${logo.yukseklik}"` : ' width="64" height="64"';
  return `<img class="${sinif}" src="${logo.src}" alt="${kacis(logo.alt ?? alt ?? '')}"${olcu}>`;
};

const SOSYAL_SIMGE = { X: 'twitter', Facebook: 'facebook', YouTube: 'youtube', Instagram: 'instagram', LinkedIn: 'mail' };

/** Example-page footer. Takes the institution logo as input; monogram when absent. */
const ornekAltBilgi = (o) => {
  const marka = o.logo
    ? logoEtiketi(o.logo, `trds-alt-bilgi__logo${o.logo.genis ? ' trds-alt-bilgi__logo--genis' : ''}`, '')
    : `<span class="trds-alt-bilgi__monogram" aria-hidden="true">${kacis(o.kisaAd ?? o.ad)}</span>`;
  const iletisim = (o.iletisim ?? []).map((i) => `        <p><span class="trds-alt-bilgi__iletisim-etiket">${kacis(i.etiket)}</span>${i.href ? `<a href="${i.href}">${kacis(i.deger)}</a>` : kacis(i.deger)}</p>`).join('\n');
  const sutunMetinleri = new Set((o.altBilgiSutunlari ?? []).flatMap((sutun) => sutun.baglantilar.map((b) => b.toLocaleLowerCase('tr'))));
  const sutunlar = (o.altBilgiSutunlari ?? []).map((sutun) => `      <div>${sutun.baslik && sutun.baslik !== o.kurum ? `<p class="trds-alt-bilgi__sutun-baslik">${kacis(sutun.baslik)}</p>` : ''}<ul class="trds-alt-bilgi__sutun-liste">${sutun.baglantilar.map((b) => `<li><a href="#">${kacis(b)}</a></li>`).join('')}</ul></div>`).join('\n');
  const sosyal = (o.sosyal ?? []).map((ad) => `<li><a href="#" aria-label="${kacis(ad)}"><svg class="trds-simge" aria-hidden="true"><use href="#trds-${SOSYAL_SIMGE[ad] ?? 'mail'}"/></svg></a></li>`).join('');
  const yasal = (o.yasalBaglantilar ?? ['Erişilebilirlik bildirimi', 'KVKK aydınlatma metni', 'Çerez politikası', 'Kullanım koşulları'])
    .filter((b) => !sutunMetinleri.has(b.toLocaleLowerCase('tr')));
  return `<footer class="trds-alt-bilgi${o.koyuAltBilgi ? ' trds-alt-bilgi--koyu' : ''}">
  <div class="trds-kap">
    <div class="trds-alt-bilgi__ust">
      <div class="trds-alt-bilgi__marka">
        ${marka}
        <div><p class="trds-alt-bilgi__kurum">${kacis(o.kurum)}</p><p class="trds-alt-bilgi__ust-kurum">${kacis(o.ustKurum)}</p></div>
      </div>
${iletisim ? `      <address class="trds-alt-bilgi__iletisim">\n${iletisim}\n      </address>` : ''}
    </div>
${sutunlar ? `    <div class="trds-alt-bilgi__sutunlar">\n${sutunlar}\n    </div>` : ''}
${o.altBilgiNotu ? `    <p class="trds-alt-bilgi__not">${kacis(o.altBilgiNotu)}</p>` : ''}
    <div class="trds-alt-bilgi__satir">
      <nav class="trds-alt-bilgi__baglantilar" aria-label="Alt bilgi bağlantıları">
${yasal.map((b) => `        <a href="#">${kacis(b)}</a>`).join('\n')}
      </nav>
${sosyal ? `      <ul class="trds-alt-bilgi__sosyal" aria-label="Sosyal medya hesapları">${sosyal}</ul>` : ''}
    </div>
    <p class="trds-alt-bilgi__telif">${kacis(o.telif ?? `© 2026 ${o.kurum}`)}</p>
  </div>
</footer>`;
};

const ornekSayfa = (o) => `<!doctype html>
<html lang="tr" data-trds-tema="acik">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${kacis(o.ad)} — TRDS örneği</title>
<meta name="description" content="${kacis(o.ozet)}">
${sosyalEtiketler({ baslik: `${o.ad} — TRDS örneği`, ozet: o.ozet, yol: `ornekler/${o.slug}/` })}
<link rel="icon" type="image/png" sizes="196x196" href="../../varliklar/e-devlet-isaret.png?v=edevlet-1">
<link rel="icon" type="image/x-icon" sizes="16x16 24x24 32x32 48x48 64x64" href="../../favicon.ico?v=edevlet-1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,500;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="../../varliklar/trds.css">
<style>
  body { font-family: "Public Sans", var(--trds-yazi-aile-govde); }
</style>
</head>
<body>
<a class="trds-atla" href="#ana-icerik">Ana içeriğe geç</a>

<div class="trds-asama" role="note">
  <div class="trds-kap trds-asama__ic">
    <span class="trds-etiket trds-etiket--sari">Örnek</span>
    <p class="trds-asama__metin"><strong>TRDS tasarım örneği.</strong> Bu sayfa ${kacis(o.kurum)} kurumuna ait değildir. Gerçek site: <a class="trds-link" href="${o.url}">${o.url.replace('https://', '')}</a></p>
    <a class="trds-link" href="../">Bütün örnekler</a>
    <a class="trds-link" href="../../">TRDS belgeleri</a>
  </div>
</div>

<div class="trds-resmi-afis" data-trds="resmi-afis">
  <div class="trds-kap trds-resmi-afis__ic">
    <img class="trds-resmi-afis__bayrak" src="../../varliklar/turk-bayragi.svg" alt="">
    <p class="trds-resmi-afis__metin">Bu, Türkiye Cumhuriyeti’ne ait resmî bir devlet sitesidir.</p>
    <button class="trds-resmi-afis__dugme" type="button" aria-expanded="false" aria-controls="afis-nasil">Nasıl anlarım?</button>
  </div>
  <div class="trds-resmi-afis__panel" id="afis-nasil" hidden>
    <div class="trds-kap trds-resmi-afis__panel-ic">
      <div><p class="trds-resmi-afis__panel-baslik">Adres <strong>gov.tr</strong> ile biter</p><p>Resmî devlet siteleri gov.tr uzantısını kullanır. Adres çubuğunu her zaman kontrol edin.</p></div>
      <div><p class="trds-resmi-afis__panel-baslik">Bağlantı <strong>güvenlidir</strong></p><p>Adresin başında https ve kilit simgesi bulunur. Kimlik bilgilerinizi yalnız böyle sayfalara girin.</p></div>
    </div>
  </div>
</div>

<header class="trds-baslik-cubugu" data-trds="baslik-cubugu">
  <div class="trds-kap trds-baslik-cubugu__ic">
    <a class="trds-baslik-cubugu__marka" href="#" aria-label="${kacis(o.kurum)} ana sayfa">
${o.baslikLogo ? `      ${logoEtiketi(o.baslikLogo, `trds-baslik-cubugu__logo${o.baslikLogo.src?.includes('-beyaz') ? ' trds-baslik-cubugu__logo--beyaz' : ''}`, o.kurum)}` : `      <img class="trds-baslik-cubugu__arma" src="../../varliklar/turk-bayragi.svg" alt="" width="48" height="32">
      <span class="trds-baslik-cubugu__ad">${kacis(o.kurum)}</span>`}
    </a>
    <button class="trds-baslik-cubugu__menu-dugmesi" type="button" aria-expanded="false" aria-controls="ana-menu">Menü</button>
    <nav class="trds-baslik-cubugu__menu" id="ana-menu" aria-label="Ana menü">
${o.menu.map((m) => `      <a href="#">${kacis(m)}</a>`).join('\n')}
    </nav>
  </div>
</header>

<main id="ana-icerik" tabindex="-1">
${SPRITE}
${o.govde}
</main>


${ornekAltBilgi(o)}

<script type="module" src="../../varliklar/trds.js"></script>
</body>
</html>
`;

const orneklerIndeksi = (liste) =>
  sayfa({
    baslik: 'Örnekler',
    ozet: 'En çok kullanılan altı kamu sitesinin ana sayfası, yalnız TRDS bileşenleri ile yeniden kurulmuş.',
    yol: 'ornekler/',
    derinlik: 1,
    etkin: 'ornekler/',
    kenar: false,
    genis: true,
    govde: `
<h1 class="dok-h1">Örnekler</h1>
<p class="dok-giris">Türkiye’de en çok kullanılan altı kamu sitesinin ana sayfası, yalnız bu sistemdeki
bileşenlerle yeniden kuruldu. Hiçbir sayfada özel CSS sınıfı yoktur. Her biri tam sayfa olarak açılır.</p>
<p>Amaç bir kurumu eleştirmek değildir. Amaç, aynı bileşen kütüphanesiyle farklı hizmetlerin
nasıl aynı dili konuştuğunu göstermektir. Bir vatandaş SGK’dan ÖSYM’ye geçtiğinde menü, arama,
giriş düğmesi ve form alanları aynı yerde ve aynı biçimde durur.</p>
<p><span class="dok-tr">1:1</span> işaretli sayfalar, gerçek ana sayfanın 6 Eylül 2026 tarihindeki içeriğini
bölüm bölüm, aynı sırayla ve aynı metinle yeniden kurar. Yalnız görseller düşer. Diğer sayfalar birer yorumdur.</p>
<div class="dok-ornekler">
${liste
  .map(
    (o) => `  <article class="dok-ornek-kart">
    <div class="dok-ornek-kart__cerceve">
      <iframe src="${o.slug}/" title="${kacis(o.ad)} önizleme" loading="lazy" tabindex="-1"></iframe>
    </div>
    <div class="dok-ornek-kart__govde">
      <h2 class="dok-ornek-kart__ad"><a href="${o.slug}/">${kacis(o.ad)}</a></h2>
      <p class="dok-ornek-kart__kurum">${kacis(o.kurum)} · <a href="${o.url}">${o.url.replace('https://', '')}</a> · ${o.birebir ? '<span class="dok-tr">1:1</span> gerçek sayfanın birebir yeniden kuruluşu' : 'yorum'}</p>
      <p class="dok-ornek-kart__ozet">${kacis(o.ozet)}</p>
      <p class="dok-ornek-kart__bilesenler">${o.bilesenler.map((b) => `<span>${kacis(b)}</span>`).join('')}</p>
    </div>
  </article>`
  )
  .join('\n')}
</div>
`
  });

const ORNEK_CSS = `
/* ---------- örnek sayfalar ---------- */
.dok-ornekler { display: grid; gap: var(--trds-aralik-6); margin-block: var(--trds-aralik-6); }
@media (min-width: 64rem) { .dok-ornekler { grid-template-columns: 1fr 1fr; } }
.dok-ornek-kart { display: grid; grid-template-rows: auto 1fr; border: 1px solid var(--trds-renk-notr-kenar-silik); border-radius: var(--trds-kose-3); background: var(--trds-renk-notr-yuzey-varsayilan); overflow: hidden; }
.dok-ornek-kart:hover { border-color: var(--trds-renk-notr-kenar-varsayilan); box-shadow: var(--trds-golge-2); }
.dok-ornek-kart__cerceve { position: relative; height: 18rem; overflow: hidden; background: var(--trds-renk-notr-yuzey-yumusak); border-block-end: 1px solid var(--trds-renk-notr-kenar-silik); }
.dok-ornek-kart__cerceve iframe { width: 200%; height: 200%; border: 0; transform: scale(0.5); transform-origin: top left; pointer-events: none; }
.dok-ornek-kart__govde { padding: var(--trds-aralik-4) var(--trds-aralik-5) var(--trds-aralik-5); position: relative; }
.dok-ornek-kart__ad { margin: 0 0 var(--trds-aralik-1); font-size: var(--trds-yazi-boyut-20); }
.dok-ornek-kart__ad a { color: inherit; text-decoration: none; }
.dok-ornek-kart__ad a::after { content: ''; position: absolute; inset: 0; }
.dok-ornek-kart:has(.dok-ornek-kart__ad a:focus-visible) { outline: var(--trds-olcu-odak-kalinlik) solid var(--trds-renk-odak-dolgu); }
.dok-ornek-kart__kurum { margin: 0 0 var(--trds-aralik-2); font-size: var(--trds-yazi-boyut-14); color: var(--trds-renk-notr-metin-silik); }
.dok-ornek-kart__kurum a { position: relative; z-index: 1; }
.dok-ornek-kart__ozet { margin: 0 0 var(--trds-aralik-3); font-size: var(--trds-yazi-boyut-14); }
.dok-ornek-kart__bilesenler { margin: 0; display: flex; flex-wrap: wrap; gap: var(--trds-aralik-1); }
.dok-ornek-kart__bilesenler span { padding: 0.05rem 0.5rem; border-radius: 4px; background: var(--trds-renk-notr-yuzey-yumusak); border: 1px solid var(--trds-renk-notr-kenar-silik); font-size: var(--trds-yazi-boyut-12); color: var(--trds-renk-notr-metin-silik); }
`;

// ------------------------------------------------------------------------ ana

async function main() {
  await rm(CIKTI, { recursive: true, force: true });
  SPRITE = await readFile(join(KIMLIK, 'trds-simgeler.svg'), 'utf8');
  for (const dosya of await readdir(join(KIMLIK, 'kurumlar')).catch(() => [])) {
    if (dosya.endsWith('.svg')) KURUM_LOGOLARI.set(dosya, (await readFile(join(KIMLIK, 'kurumlar', dosya), 'utf8')).trim());
  }
  for (const k of ['varliklar', 'bilesenler', 'entegrasyonlar', 'temeller', 'simgeler', 'erisilebilirlik', 'yonetisim', 'ornekler']) {
    await mkdir(join(CIKTI, k), { recursive: true });
  }

  await copyFile(join(CEKIRDEK, 'trds.css'), join(CIKTI, 'varliklar', 'trds.css'));
  await copyFile(join(CEKIRDEK, 'trds.js'), join(CIKTI, 'varliklar', 'trds.js'));
  await copyFile(join(KIMLIK, 'e-devlet-isaret.png'), join(CIKTI, 'varliklar', 'e-devlet-isaret.png'));
  await copyFile(join(KIMLIK, 'favicon.ico'), join(CIKTI, 'favicon.ico'));
  await copyFile(join(KIMLIK, 'turk-bayragi.svg'), join(CIKTI, 'varliklar', 'turk-bayragi.svg'));
  await copyFile(join(KIMLIK, 'trds-simgeler.svg'), join(CIKTI, 'varliklar', 'trds-simgeler.svg'));
  await copyFile(join(KOK, 'varliklar', 'trds-sosyal-onizleme.png'), join(CIKTI, 'varliklar', 'trds-sosyal-onizleme.png'));
  await mkdir(join(CIKTI, 'varliklar', 'kurumlar'), { recursive: true });
  for (const dosya of await readdir(join(KIMLIK, 'kurumlar')).catch(() => [])) {
    await copyFile(join(KIMLIK, 'kurumlar', dosya), join(CIKTI, 'varliklar', 'kurumlar', dosya));
  }
  await writeFile(join(CIKTI, 'varliklar', 'belgeler.css'), BELGE_CSS + ORNEK_CSS, 'utf8');
  await writeFile(join(CIKTI, 'varliklar', 'belgeler.js'), BELGE_JS, 'utf8');

  await writeFile(join(CIKTI, 'index.html'), girisSayfasi(), 'utf8');
  await writeFile(join(CIKTI, 'bilesenler', 'index.html'), bilesenListesi(), 'utf8');
  await writeFile(join(CIKTI, 'entegrasyonlar', 'index.html'), entegrasyonSayfasi(), 'utf8');
  await writeFile(join(CIKTI, 'temeller', 'index.html'), await temellerSayfasi(), 'utf8');
  await writeFile(join(CIKTI, 'simgeler', 'index.html'), await simgelerSayfasi(), 'utf8');
  await writeFile(join(CIKTI, 'erisilebilirlik', 'index.html'), erisilebilirlikSayfasi(), 'utf8');
  await writeFile(join(CIKTI, 'yonetisim', 'index.html'), yonetisimSayfasi(), 'utf8');

  for (const b of BILESENLER) {
    await writeFile(join(CIKTI, 'bilesenler', `${b.id}.html`), bilesenSayfasi(b), 'utf8');
  }

  // Örnek sayfalar. Her modül bir kamu sitesinin TRDS ile kurulmuş ana sayfasıdır.
  const ornekKlasoru = join(KOK, 'ornekler');
  const ornekDosyalari = (await readdir(ornekKlasoru)).filter((d) => d.endsWith('.mjs')).sort();
  const ornekler = [];
  for (const dosya of ornekDosyalari) {
    const m = await import(join(ornekKlasoru, dosya));
    ornekler.push(m.ornek);
    await mkdir(join(CIKTI, 'ornekler', m.ornek.slug), { recursive: true });
    await writeFile(join(CIKTI, 'ornekler', m.ornek.slug, 'index.html'), ornekSayfa(m.ornek), 'utf8');
  }
  await writeFile(join(CIKTI, 'ornekler', 'index.html'), orneklerIndeksi(ornekler), 'utf8');

  await writeFile(join(CIKTI, '.nojekyll'), '', 'utf8');

  console.log(`sayfa: ${8 + BILESENLER.length + ornekler.length} · bileşen: ${BILESENLER.length} · özgün: ${OZGUN_BILESENLER.length}`);
  console.log('çıktı: apps/docs/site');
}

main().catch((hata) => {
  console.error(hata);
  process.exit(1);
});
