// Kiriş component registry — layout, navigation, content and feedback.

/** @type {import('./00-index.mjs').Bilesen[]} */
export const yapiBilesenleri = [
  {
    id: 'skip-link',
    ad: 'İçeriğe atlama bağlantısı',
    name: 'Skip link',
    grup: 'gezinme',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Klavye kullanıcısının menüyü atlayıp doğrudan ana içeriğe gitmesini sağlar.',
    neZaman: [
      'Her sayfada kullanın. İstisnası yoktur.',
      'Sayfadaki ilk odaklanabilir öğe olur.'
    ],
    erisilebilirlik: [
      'Odak almadan gizlidir. Odak alınca görünür olur.',
      '`display: none` kullanmayın. O zaman klavye de bulamaz.',
      'Hedef öğe `tabindex="-1"` taşır, yoksa odak taşınmaz.',
      'Ölçüm: 16 Türk bakanlık sitesinin 15 tanesinde bu bağlantı yok.'
    ],
    wcag: ['2.4.1', '2.4.7'],
    kaynak: ['UK', 'FR', 'KR', 'DK', 'NO'],
    ornekler: [
      { baslik: 'Temel', html: '<a class="kiris-atla" href="#ana-icerik">Ana içeriğe geç</a>\n<main id="ana-icerik" tabindex="-1">\n  <h1 class="kiris-baslik kiris-baslik--1">Sayfa başlığı</h1>\n</main>' }
    ]
  },
  {
    id: 'header',
    tamGenislik: true,
    ad: 'Başlık',
    name: 'Header',
    grup: 'kimlik',
    durum: { css: 'stable', js: 'mobil menü', react: 'stable', vue: 'stable' },
    ozet: 'Her sayfanın en üstünde durur, kurumu adlandırır ve ana menüyü taşır.',
    neZaman: [
      'Her sayfada aynı biçimde kullanın.',
      'Resmî site afişinin hemen altında durur.'
    ],
    erisilebilirlik: [
      '`<header>` ve `<nav>` etiketlerini kullanın.',
      'Mobil menü düğmesi `aria-expanded` taşır.',
      'Menü açıkken odak menü içinde kalır.'
    ],
    wcag: ['1.3.1', '2.1.2', '2.4.1', '4.1.2'],
    kaynak: ['UK', 'US', 'FR', 'IE', 'KR', 'JP', 'DK', 'DE'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<header class="kiris-baslik-cubugu" data-kiris="baslik-cubugu">\n  <div class="kiris-kap kiris-baslik-cubugu__ic">\n    <a class="kiris-baslik-cubugu__marka" href="/">\n      <img class="kiris-baslik-cubugu__arma" src="{{VARLIK}}turk-bayragi.svg" alt="" width="48" height="32">\n      <span class="kiris-baslik-cubugu__ad">Çalışma ve Sosyal Güvenlik Bakanlığı</span>\n    </a>\n    <button class="kiris-baslik-cubugu__menu-dugmesi" type="button" aria-expanded="false" aria-controls="ana-menu">Menü</button>\n    <nav class="kiris-baslik-cubugu__menu" id="ana-menu" aria-label="Ana menü">\n      <a href="#">Hizmetler</a>\n      <a href="#">Duyurular</a>\n      <a href="#">İletişim</a>\n    </nav>\n  </div>\n</header>'
      },
      {
        baslik: 'Kurumun kendi logosu ile',
        html: '<header class="kiris-baslik-cubugu" data-kiris="baslik-cubugu">\n  <div class="kiris-kap kiris-baslik-cubugu__ic">\n    <a class="kiris-baslik-cubugu__marka" href="/" aria-label="Sosyal Güvenlik Kurumu ana sayfa">\n      <img class="kiris-baslik-cubugu__logo kiris-baslik-cubugu__logo--beyaz" src="{{VARLIK}}kurumlar/sgk-beyaz.svg" alt="Sosyal Güvenlik Kurumu" width="1303" height="640">\n    </a>\n    <button class="kiris-baslik-cubugu__menu-dugmesi" type="button" aria-expanded="false" aria-controls="ana-menu-2">Menü</button>\n    <nav class="kiris-baslik-cubugu__menu" id="ana-menu-2" aria-label="Ana menü">\n      <a href="#">Çalışan</a>\n      <a href="#">Emekli</a>\n      <a href="#">İşveren</a>\n      <a href="#">İletişim</a>\n    </nav>\n  </div>\n</header>'
      }
    ]
  },
  {
    id: 'footer',
    tamGenislik: true,
    ad: 'Alt bilgi',
    name: 'Footer',
    grup: 'kimlik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Sayfanın sonunda kurumu, zorunlu bağlantıları ve iletişim bilgisini taşır. Kurum logosunu girdi olarak alır.',
    neZaman: [
      'Her sayfada kullanın. Kurumsal seçenek kurum adını ve üst kurumu kendi taşır. O zaman kurum tanıtıcısı kullanılmaz. Sade seçenek tanıtıcının hemen altında durur.',
      'Kurumun kendi logosunu `kiris-alt-bilgi__logo` ile verin. Logo yoksa kısa ad bir monogram olarak durur: SGK, ÖSYM.',
      'Adres, santral ve çağrı hattı iletişim bloğundadır. Beş sütuna kadar bağlantı grubu eklenir.',
      'Koyu seçeneği bakanlık siteleri için vardır. Kırmızı şerit iki seçenekte de kalır.',
      'Erişilebilirlik bildirimi, KVKK aydınlatma metni ve çerez sayfası bağlantıları burada durur. Kurum bağlantıları tanıtıcıdadır. Bir bağlantı iki yerde durmaz.',
      'Dil seçici sağda durur. Telif satırı en alttadır.'
    ],
    erisilebilirlik: [
      '`<footer>` etiketini kullanın.',
      'Bağlantı listelerine görünür başlık verin.',
      'Erişilebilirlik bildirimi bağlantısını alt bilgide kolay bulunur bir yerde gösterin.'
    ],
    wcag: ['1.3.1', '2.4.5'],
    kaynak: ['UK', 'US', 'FR', 'IE', 'KR', 'DK'],
    ornekler: [
      {
        baslik: 'Kurumsal, logo girdisi ile',
        html: '<footer class="kiris-alt-bilgi">\n  <div class="kiris-kap">\n    <div class="kiris-alt-bilgi__ust">\n      <div class="kiris-alt-bilgi__marka">\n        <img class="kiris-alt-bilgi__logo" src="{{VARLIK}}/e-devlet-isaret.png" alt="" width="64" height="64">\n        <div><p class="kiris-alt-bilgi__kurum">e-Devlet Kapısı</p><p class="kiris-alt-bilgi__ust-kurum">T.C. Cumhurbaşkanlığı Siber Güvenlik Başkanlığı kurar ve yönetir. Türksat A.Ş. işletir.</p></div>\n      </div>\n      <address class="kiris-alt-bilgi__iletisim">\n        <p><span class="kiris-alt-bilgi__iletisim-etiket">Çağrı merkezi</span><a href="tel:160">160</a></p>\n        <p><span class="kiris-alt-bilgi__iletisim-etiket">Engelsiz çağrı merkezi</span>İşaret dili ile görüntülü görüşme</p>\n      </address>\n    </div>\n    <div class="kiris-alt-bilgi__sutunlar">\n      <div><p class="kiris-alt-bilgi__sutun-baslik">e-Hizmetler</p><ul class="kiris-alt-bilgi__sutun-liste"><li><a href="#">Sık kullanılan hizmetler</a></li><li><a href="#">Yeni eklenen hizmetler</a></li><li><a href="#">Kurum hizmetleri</a></li></ul></div>\n      <div><p class="kiris-alt-bilgi__sutun-baslik">Yardım</p><ul class="kiris-alt-bilgi__sutun-liste"><li><a href="#">Genel yardım</a></li><li><a href="#">Sıkça sorulanlar</a></li><li><a href="#">Güvenliğiniz için</a></li></ul></div>\n      <div><p class="kiris-alt-bilgi__sutun-baslik">Bize ulaşın</p><ul class="kiris-alt-bilgi__sutun-liste"><li><a href="#">İletişim</a></li><li><a href="#">CİMER başvurusu</a></li></ul></div>\n    </div>\n    <div class="kiris-alt-bilgi__satir">\n      <nav class="kiris-alt-bilgi__baglantilar" aria-label="Alt bilgi bağlantıları"><a href="#">Erişilebilirlik bildirimi</a><a href="#">KVKK aydınlatma metni</a><a href="#">Çerez politikası</a></nav>\n      <ul class="kiris-alt-bilgi__sosyal" aria-label="Sosyal medya hesapları"><li><a href="#" aria-label="X"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-twitter"/></svg></a></li><li><a href="#" aria-label="YouTube"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-youtube"/></svg></a></li><li><a href="#" aria-label="Instagram"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-instagram"/></svg></a></li></ul>\n    </div>\n    <p class="kiris-alt-bilgi__telif">© 2026 Türkiye Cumhuriyeti</p>\n  </div>\n</footer>'
      },
      {
        baslik: 'Koyu',
        html: '<footer class="kiris-alt-bilgi kiris-alt-bilgi--koyu">\n  <div class="kiris-kap">\n    <div class="kiris-alt-bilgi__ust">\n      <div class="kiris-alt-bilgi__marka">\n        <span class="kiris-alt-bilgi__monogram" aria-hidden="true">SGK</span>\n        <div><p class="kiris-alt-bilgi__kurum">Sosyal Güvenlik Kurumu</p><p class="kiris-alt-bilgi__ust-kurum">Çalışma ve Sosyal Güvenlik Bakanlığı bağlı kuruluşudur.</p></div>\n      </div>\n      <address class="kiris-alt-bilgi__iletisim">\n        <p><span class="kiris-alt-bilgi__iletisim-etiket">Adres</span>Ziyabey Cad. No:6 06520 Balgat/Ankara</p>\n        <p><span class="kiris-alt-bilgi__iletisim-etiket">Telefon</span><a href="tel:+903122078000">0 (312) 207 80 00</a> · Alo 170</p>\n      </address>\n    </div>\n    <div class="kiris-alt-bilgi__satir">\n      <nav class="kiris-alt-bilgi__baglantilar" aria-label="Alt bilgi bağlantıları"><a href="#">KVKK</a><a href="#">Aydınlatma metni</a><a href="#">Yasal uyarı</a><a href="#">Site haritası</a></nav>\n    </div>\n    <p class="kiris-alt-bilgi__telif">© 2026 Sosyal Güvenlik Kurumu</p>\n  </div>\n</footer>'
      },
      {
        baslik: 'Bağlantı sütunları ile',
        html: '<footer class="kiris-alt-bilgi">\n  <div class="kiris-kap">\n    <div class="kiris-alt-bilgi__sutunlar">\n      <div><p class="kiris-alt-bilgi__sutun-baslik">e-Hizmetler</p><ul class="kiris-alt-bilgi__sutun-liste"><li><a href="#">Sık kullanılan hizmetler</a></li><li><a href="#">Yeni eklenen hizmetler</a></li><li><a href="#">Kurum hizmetleri</a></li></ul></div>\n      <div><p class="kiris-alt-bilgi__sutun-baslik">Yardım</p><ul class="kiris-alt-bilgi__sutun-liste"><li><a href="#">Genel yardım</a></li><li><a href="#">Sıkça sorulanlar</a></li><li><a href="#">Güvenliğiniz için</a></li></ul></div>\n      <div><p class="kiris-alt-bilgi__sutun-baslik">Bize ulaşın</p><ul class="kiris-alt-bilgi__sutun-liste"><li><a href="#">İletişim</a></li><li><a href="#">CİMER başvurusu</a></li></ul></div>\n    </div>\n    <div class="kiris-alt-bilgi__satir">\n      <nav class="kiris-alt-bilgi__baglantilar" aria-label="Alt bilgi bağlantıları"><a href="#">Erişilebilirlik bildirimi</a><a href="#">KVKK aydınlatma metni</a><a href="#">Çerez politikası</a></nav>\n    </div>\n    <p class="kiris-alt-bilgi__telif">© 2026 Türkiye Cumhuriyeti</p>\n  </div>\n</footer>'
      },
      {
        baslik: 'Temel',
        html: '<footer class="kiris-alt-bilgi">\n  <div class="kiris-kap">\n    <div class="kiris-alt-bilgi__satir">\n      <nav class="kiris-alt-bilgi__baglantilar" aria-label="Alt bilgi bağlantıları">\n        <a href="#">Erişilebilirlik bildirimi</a>\n        <a href="#">KVKK aydınlatma metni</a>\n        <a href="#">Çerez politikası</a>\n        <a href="#">Kullanım koşulları</a>\n      </nav>\n      <nav class="kiris-dil" aria-label="Dil seçimi">\n        <ul class="kiris-dil__liste">\n          <li><span aria-current="true" lang="tr">Türkçe</span></li>\n          <li><a href="#" lang="en" hreflang="en">English</a></li>\n        </ul>\n      </nav>\n    </div>\n    <p class="kiris-alt-bilgi__telif">© 2026 Türkiye Cumhuriyeti</p>\n  </div>\n</footer>'
      }
    ]
  },
  {
    id: 'breadcrumb',
    ad: 'Sayfa yolu',
    name: 'Breadcrumb',
    grup: 'gezinme',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcının site yapısında nerede olduğunu gösterir ve üst seviyeye dönmeyi sağlar.',
    neZaman: [
      'Üç seviyeden derin site yapılarında kullanın.',
      'Adım adım ilerleyen bir hizmet akışında kullanmayın. Orada geri bağlantısı kullanın.'
    ],
    erisilebilirlik: [
      '`<nav aria-label="Sayfa yolu">` içine alın.',
      'Son öğe bağlantı değildir ve `aria-current="page"` taşır.',
      'Ayraç karakteri CSS ile eklenir, metne yazılmaz.'
    ],
    wcag: ['1.3.1', '2.4.8'],
    kaynak: ['UK', 'US', 'FR', 'IE', 'KR', 'JP', 'DK', 'NO'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<nav class="kiris-yol" aria-label="Sayfa yolu">\n  <ol class="kiris-yol__liste">\n    <li><a href="/">Ana sayfa</a></li>\n    <li><a href="#">Hizmetler</a></li>\n    <li><span aria-current="page">Emeklilik başvurusu</span></li>\n  </ol>\n</nav>'
      }
    ]
  },
  {
    id: 'back-link',
    ad: 'Geri bağlantısı',
    name: 'Back link',
    grup: 'gezinme',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Çok adımlı bir akışta kullanıcıyı bir önceki adıma götürür.',
    neZaman: [
      'Her form adımında kullanın.',
      'Sayfa başlığının üstünde durur.',
      'Tarayıcının geri düğmesine güvenmeyin. Girilen veri kaybolabilir.'
    ],
    erisilebilirlik: [
      'Gerçek bir bağlantıdır. JavaScript ile `history.back()` çağırmaz.',
      'Metin her zaman "Geri" olur.'
    ],
    wcag: ['2.4.4', '3.2.3'],
    kaynak: ['UK', 'KR', 'DK'],
    ornekler: [
      { baslik: 'Temel', html: '<a class="kiris-geri" href="#">Geri</a>' }
    ]
  },
  {
    id: 'pagination',
    ad: 'Sayfalama',
    name: 'Pagination',
    grup: 'gezinme',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Uzun bir listeyi sayfalara böler ve sayfalar arasında gezinmeyi sağlar.',
    neZaman: [
      'Bir listede 20 satırdan çok kayıt varsa kullanın.',
      'Bir hizmet akışında adım göstergesi kullanın, sayfalama kullanmayın.'
    ],
    erisilebilirlik: [
      '`<nav aria-label="Sayfalama">` içine alın.',
      'Geçerli sayfa `aria-current="page"` taşır.',
      'Her bağlantı 44 x 44 piksel dokunma alanına sahiptir.'
    ],
    wcag: ['2.4.8', '2.5.8', '4.1.2'],
    kaynak: ['UK', 'US', 'FR', 'IE', 'KR', 'JP', 'DK', 'NO'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<nav class="kiris-sayfalama" aria-label="Sayfalama">\n  <a class="kiris-sayfalama__yon" href="#">Önceki</a>\n  <a href="#">1</a>\n  <a href="#" aria-current="page">2</a>\n  <a href="#">3</a>\n  <a class="kiris-sayfalama__yon" href="#">Sonraki</a>\n</nav>'
      }
    ]
  },
  {
    id: 'tabs',
    ad: 'Sekmeler',
    name: 'Tabs',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'klavye desteği', react: 'stable', vue: 'stable' },
    ozet: 'Aynı alanda birbirini dışlayan içerik bölümleri arasında geçiş yapar.',
    neZaman: [
      'İçerik bölümleri eş değerdeyse ve karşılaştırma gerekmiyorsa kullanın.',
      'Bir formun adımları için kullanmayın. Adım göstergesi kullanın.',
      'Mobil ekranda sekmeler akordiyona dönüşür.'
    ],
    erisilebilirlik: [
      'Ok tuşları sekmeler arasında gezinir. Home ve End uçlara gider.',
      'Etkin sekme `aria-selected="true"` taşır.',
      'Panel `role="tabpanel"` ve `tabindex="0"` taşır.'
    ],
    wcag: ['2.1.1', '2.4.3', '4.1.2'],
    kaynak: ['UK', 'FR', 'IE', 'KR', 'JP', 'DK', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-sekmeler" data-kiris="sekmeler">\n  <div class="kiris-sekmeler__liste" role="tablist" aria-label="Başvuru bilgileri">\n    <button class="kiris-sekmeler__dugme" role="tab" aria-selected="true" aria-controls="p1" id="s1">Genel</button>\n    <button class="kiris-sekmeler__dugme" role="tab" aria-selected="false" aria-controls="p2" id="s2" tabindex="-1">Belgeler</button>\n  </div>\n  <div class="kiris-sekmeler__panel" role="tabpanel" id="p1" aria-labelledby="s1" tabindex="0">\n    <p class="kiris-govde">Başvurunuz 12 Mart 2026 tarihinde alındı.</p>\n  </div>\n  <div class="kiris-sekmeler__panel" role="tabpanel" id="p2" aria-labelledby="s2" tabindex="0" hidden>\n    <p class="kiris-govde">İki belge eksik.</p>\n  </div>\n</div>'
      }
    ]
  },
  {
    id: 'accordion',
    ad: 'Akordiyon',
    name: 'Accordion',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'aç ve kapat', react: 'stable', vue: 'stable' },
    ozet: 'Uzun içeriği başlıklara böler ve her bölümü istek üzerine açar.',
    neZaman: [
      'Sık sorulan sorular gibi tarama yapılan içerikte kullanın.',
      'Kullanıcının tümünü okuması gereken içeriği gizlemeyin.'
    ],
    erisilebilirlik: [
      'Her başlık bir `<button>` içinde durur ve `aria-expanded` taşır.',
      'JavaScript çalışmazsa tüm bölümler açık kalır.',
      '"Tümünü göster" düğmesi durumu duyurur.'
    ],
    wcag: ['1.3.1', '2.1.1', '4.1.2'],
    kaynak: ['UK', 'US', 'FR', 'IE', 'KR', 'JP', 'DK', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-akordiyon" data-kiris="akordiyon">\n  <div class="kiris-akordiyon__bolum">\n    <h3 class="kiris-akordiyon__baslik">\n      <button class="kiris-akordiyon__dugme" type="button" aria-expanded="false" aria-controls="a1">Başvurum ne kadar sürede sonuçlanır?</button>\n    </h3>\n    <div class="kiris-akordiyon__icerik" id="a1" hidden>\n      <p class="kiris-govde">Başvurular 15 iş günü içinde sonuçlanır.</p>\n    </div>\n  </div>\n</div>'
      }
    ]
  },
  {
    id: 'details',
    ad: 'Ayrıntılar',
    name: 'Details',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Tek bir yardımcı açıklamayı istek üzerine gösterir.',
    neZaman: [
      'Kullanıcıların çoğunun ihtiyaç duymadığı bir açıklama için kullanın.',
      'Birden çok bölüm için akordiyon kullanın.'
    ],
    erisilebilirlik: [
      'Yerel `<details>` ve `<summary>` etiketlerini kullanın. JavaScript gerekmez.',
      'Özet metni bir soru gibi yazılır.'
    ],
    wcag: ['1.3.1', '2.1.1'],
    kaynak: ['UK', 'IE', 'KR', 'JP', 'DK', 'NO'],
    ornekler: [
      { baslik: 'Temel', html: '<details class="kiris-ayrinti">\n  <summary>T.C. kimlik numaramı nerede bulurum?</summary>\n  <p class="kiris-govde">Nüfus cüzdanınızın ön yüzünde, ad ve soyadınızın üstünde yazar.</p>\n</details>' }
    ]
  },
  {
    id: 'table',
    ad: 'Tablo',
    name: 'Table',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Veriyi satır ve sütun olarak düzenler.',
    neZaman: [
      'İki boyutlu veriyi göstermek için kullanın.',
      'Sayfa düzeni için kullanmayın.',
      'Küçük ekranda tablo yatay kayar. Sayfanın kendisi yatay kaymaz.'
    ],
    erisilebilirlik: [
      'Her tabloda `<caption>` bulunur.',
      'Başlık hücreleri `<th scope="col">` veya `<th scope="row">` olur.',
      'Sayı sütunları sağa yaslanır ve `font-variant-numeric: tabular-nums` alır.'
    ],
    wcag: ['1.3.1', '1.4.10'],
    kaynak: ['UK', 'US', 'FR', 'IE', 'KR', 'JP', 'DK', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-tablo-kap">\n  <table class="kiris-tablo">\n    <caption>Başvuru geçmişi</caption>\n    <thead>\n      <tr><th scope="col">Tarih</th><th scope="col">İşlem</th><th scope="col" class="kiris-sayi">Tutar</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>12.03.2026</td><td>Başvuru alındı</td><td class="kiris-sayi">0,00 ₺</td></tr>\n      <tr><td>18.03.2026</td><td>Harç ödendi</td><td class="kiris-sayi">1.250,00 ₺</td></tr>\n    </tbody>\n  </table>\n</div>'
      }
    ]
  },
  {
    id: 'summary-list',
    ad: 'Özet listesi',
    name: 'Summary list',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcının girdiği bilgileri gönderim öncesinde tek sayfada gösterir.',
    neZaman: [
      'Her form akışının sonunda "Cevaplarınızı kontrol edin" sayfasında kullanın.',
      'Her satır düzenleme bağlantısı taşır.'
    ],
    erisilebilirlik: [
      '`<dl>`, `<dt>` ve `<dd>` etiketlerini kullanın.',
      'Düzenleme bağlantısı hangi alanı düzenlediğini gizli metinle söyler.'
    ],
    wcag: ['1.3.1', '2.4.4', '3.3.4'],
    kaynak: ['UK', 'FR', 'IE', 'JP', 'DE'],
    ornekler: [
      {
        baslik: 'Cevaplarınızı kontrol edin',
        html: '<dl class="kiris-ozet">\n  <div class="kiris-ozet__satir">\n    <dt class="kiris-ozet__anahtar">Ad soyad</dt>\n    <dd class="kiris-ozet__deger">Ayşe Yılmaz</dd>\n    <dd class="kiris-ozet__eylem"><a href="#">Değiştir<span class="kiris-gorsel-gizli"> ad soyad</span></a></dd>\n  </div>\n  <div class="kiris-ozet__satir">\n    <dt class="kiris-ozet__anahtar">Doğum tarihi</dt>\n    <dd class="kiris-ozet__deger">27.03.1997</dd>\n    <dd class="kiris-ozet__eylem"><a href="#">Değiştir<span class="kiris-gorsel-gizli"> doğum tarihi</span></a></dd>\n  </div>\n</dl>'
      }
    ]
  },
  {
    id: 'task-list',
    ad: 'Görev listesi',
    name: 'Task list',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Çok parçalı bir başvuruda hangi bölümün tamamlandığını gösterir.',
    neZaman: [
      'Kullanıcı başvuruyu birden çok oturumda tamamlıyorsa kullanın.',
      'Kısa ve doğrusal bir formda kullanmayın.'
    ],
    erisilebilirlik: [
      'Durum etiketi `aria-describedby` ile göreve bağlanır.',
      'Durumu yalnız renkle göstermeyin. Metin de yazın.'
    ],
    wcag: ['1.4.1', '1.3.1'],
    kaynak: ['UK', 'DE'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<ol class="kiris-gorev-listesi">\n  <li class="kiris-gorev-listesi__oge">\n    <a href="#" aria-describedby="g1">Kişisel bilgiler</a>\n    <span class="kiris-etiket kiris-etiket--yesil" id="g1">Tamamlandı</span>\n  </li>\n  <li class="kiris-gorev-listesi__oge">\n    <a href="#" aria-describedby="g2">Belgeleri yükleyin</a>\n    <span class="kiris-etiket kiris-etiket--gri" id="g2">Başlanmadı</span>\n  </li>\n</ol>'
      }
    ]
  },
  {
    id: 'step-indicator',
    ad: 'Adım göstergesi',
    name: 'Step indicator',
    grup: 'gezinme',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Çok adımlı bir akışta kullanıcının kaçıncı adımda olduğunu gösterir.',
    neZaman: [
      'Üç ile yedi adım arasındaki akışlarda kullanın.',
      'Adım sayısı belirsizse kullanmayın.'
    ],
    erisilebilirlik: [
      'Geçerli adım `aria-current="step"` taşır.',
      'Metin "3 / 5" biçiminde de yazılır. Görsel gösterge tek başına yeterli değildir.'
    ],
    wcag: ['1.3.1', '2.4.8'],
    kaynak: ['US', 'FR', 'IE', 'KR', 'JP', 'DK'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<nav class="kiris-adimlar" aria-label="Başvuru adımları">\n  <p class="kiris-adimlar__sayi">Adım 2 / 4</p>\n  <ol class="kiris-adimlar__liste">\n    <li class="kiris-adimlar__oge kiris-adimlar__oge--bitti">Kimlik doğrulama</li>\n    <li class="kiris-adimlar__oge kiris-adimlar__oge--etkin" aria-current="step">Başvuru bilgileri</li>\n    <li class="kiris-adimlar__oge">Belgeler</li>\n    <li class="kiris-adimlar__oge">Onay</li>\n  </ol>\n</nav>'
      }
    ]
  },
  {
    id: 'alert',
    ad: 'Uyarı',
    name: 'Alert',
    grup: 'geri-bildirim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Sayfa içinde bilgi, başarı, uyarı veya hata mesajı gösterir.',
    neZaman: [
      'İşlem sonucunu bildirmek için kullanın.',
      'Form alanı hatası için hata mesajı bileşenini kullanın.'
    ],
    erisilebilirlik: [
      'Dört tür ikonla ve metinle ayırt edilir. Renk tek işaret değildir.',
      'Sayfa yüklendikten sonra eklenen uyarı `role="status"` taşır.',
      'Acil bir durum için `role="alert"` kullanın.'
    ],
    wcag: ['1.4.1', '1.4.3', '4.1.3'],
    kaynak: ['US', 'FR', 'IE', 'DK', 'DE', 'NO'],
    ornekler: [
      { baslik: 'Bilgi', html: '<div class="kiris-uyari kiris-uyari--bilgi" role="status">\n  <p><strong>Başvurunuz alındı.</strong> Başvuru numaranız: 2026-004512.</p>\n</div>' },
      { baslik: 'Hata', html: '<div class="kiris-uyari kiris-uyari--hata" role="alert">\n  <p><strong>Ödeme tamamlanmadı.</strong> Kart bilgilerinizi kontrol edin ve yeniden deneyin.</p>\n</div>' }
    ]
  },
  {
    id: 'notification-banner',
    ad: 'Bildirim afişi',
    name: 'Notification banner',
    grup: 'geri-bildirim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Sayfanın en üstünde önemli veya acil bir duyuru gösterir.',
    neZaman: [
      'Hizmet kesintisi veya acil durum duyurusu için kullanın.',
      'Sayfada en çok bir tane bulunur.'
    ],
    erisilebilirlik: [
      'Başlık bir `<h2>` öğesidir.',
      'Acil durum afişi kırmızı zemin ve beyaz metin kullanır. Kontrast oranı 7 üzerindedir.'
    ],
    wcag: ['1.4.3', '1.3.1', '4.1.3'],
    kaynak: ['UK', 'FR', 'JP', 'DE'],
    ornekler: [
      {
        baslik: 'Acil',
        html: '<div class="kiris-afis kiris-afis--acil" role="region" aria-labelledby="afis-baslik">\n  <h2 class="kiris-afis__baslik" id="afis-baslik">Önemli</h2>\n  <p>Sistem bakımı nedeniyle 14 Mart 02:00 ile 05:00 arasında hizmet verilmeyecektir.</p>\n</div>'
      }
    ]
  },
  {
    id: 'tag',
    ad: 'Etiket',
    name: 'Tag',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir kaydın durumunu kısa bir sözcükle gösterir.',
    neZaman: [
      'Başvuru durumu gibi bir durumu göstermek için kullanın.',
      'Bağlantı veya düğme olarak kullanmayın.'
    ],
    erisilebilirlik: [
      'Metin her zaman bulunur. Yalnız renk kullanmayın.',
      'Beş renk seçeneğinin hepsi 4.5 üzerinde kontrast sağlar.'
    ],
    wcag: ['1.4.1', '1.4.3'],
    kaynak: ['UK', 'US', 'FR', 'IE', 'KR', 'JP', 'DK', 'NO'],
    ornekler: [
      { baslik: 'Durumlar', html: '<span class="kiris-etiket kiris-etiket--mavi">İnceleniyor</span>\n<span class="kiris-etiket kiris-etiket--yesil">Onaylandı</span>\n<span class="kiris-etiket kiris-etiket--kirmizi">Reddedildi</span>\n<span class="kiris-etiket kiris-etiket--sari">Belge bekleniyor</span>\n<span class="kiris-etiket kiris-etiket--gri">Başlanmadı</span>' }
    ]
  },
  {
    id: 'card',
    ad: 'Kart',
    name: 'Card',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir hizmeti veya duyuruyu başlık, açıklama ve bağlantı ile tanıtır.',
    neZaman: [
      'Hizmet listeleri ve duyuru listeleri için kullanın.',
      'Form alanlarını kart içine koymayın.'
    ],
    erisilebilirlik: [
      'Tüm kartı tıklanabilir yapmayın. Başlıktaki bağlantı tıklanır.',
      'Kart başlıkları sayfadaki başlık düzenine uyar.'
    ],
    wcag: ['1.3.1', '2.4.4'],
    kaynak: ['US', 'FR', 'IE', 'JP', 'DK', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-kart">\n  <h3 class="kiris-kart__baslik"><a href="#">Emeklilik başvurusu</a></h3>\n  <p class="kiris-kart__ozet">Yaş ve prim gün sayısı koşullarını sağlıyorsanız çevrim içi başvurun.</p>\n</div>'
      }
    ]
  },
  {
    id: 'modal',
    ad: 'Kip pencere',
    name: 'Modal',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'odak tuzağı', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcıdan tek bir onay veya küçük bir karar ister.',
    neZaman: [
      'Geri alınamaz bir işlemi onaylatmak için kullanın.',
      'Uzun bir form için kullanmayın. Ayrı bir sayfa kullanın.'
    ],
    erisilebilirlik: [
      'Yerel `<dialog>` öğesini kullanın. Odak tuzağı tarayıcıdan gelir.',
      'Escape tuşu pencereyi kapatır.',
      'Kapatınca odak pencereyi açan düğmeye döner.'
    ],
    wcag: ['2.1.2', '2.4.3', '4.1.2'],
    kaynak: ['US', 'FR', 'IE', 'KR', 'JP', 'DK', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Onay',
        html: '<button class="kiris-button kiris-button--tehlike" type="button" data-kiris-ac="silme-onay">Başvuruyu sil</button>\n<dialog class="kiris-kip" id="silme-onay" data-kiris="kip">\n  <h2 class="kiris-kip__baslik">Başvuruyu silmek istiyor musunuz?</h2>\n  <p class="kiris-govde">Bu işlem geri alınamaz.</p>\n  <div class="kiris-button-grubu">\n    <button class="kiris-button kiris-button--tehlike" type="button">Evet, sil</button>\n    <button class="kiris-button kiris-button--ikincil" type="button" data-kiris-kapat>Vazgeç</button>\n  </div>\n</dialog>'
      }
    ]
  }
];
