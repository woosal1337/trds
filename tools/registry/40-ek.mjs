// Kiriş component registry — the second batch.
//
// Sourced from the KERN UX (Germany) catalogue diffed against Kiriş, plus the
// components that appear in five or more of the nine national catalogues and
// were still missing: search, language selector, combobox, side navigation,
// switch, inset text, in-page navigation, tooltip.

/** @type {import('./00-index.mjs').Bilesen[]} */
export const ekBilesenler = [
  // ------------------------------------------------------------ form girdileri
  {
    id: 'email-input',
    ad: 'E-posta girişi',
    name: 'Email input',
    grup: 'form',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'E-posta adresi için tek satırlık alan. Telefonda @ tuşlu klavye açılır.',
    neZaman: [
      'Kullanıcıya e-posta ile döneceğiniz her formda kullanın.',
      'Doğrulama gerekiyorsa adresi ikinci kez yazdırmayın. Onay kodu gönderin.'
    ],
    erisilebilirlik: [
      '`type="email"` ve `autocomplete="email"` kullanılır. Tarayıcı doğru klavyeyi ve öneriyi getirir.',
      'Büyük harf ve boşluk sunucuda temizlenir. Kullanıcı yazdığı için hata almaz.',
      '`spellcheck="false"` ile tarayıcı adresin altını çizmez.'
    ],
    wcag: ['1.3.5', '3.3.1', '3.3.2'],
    kaynak: ['DE'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-alan">\n  <label class="kiris-etiket" for="eposta2">E-posta adresiniz</label>\n  <p class="kiris-yardim" id="eposta2-yardim">Başvuru sonucunu bu adrese göndereceğiz.</p>\n  <input class="kiris-girdi" id="eposta2" name="eposta" type="email" autocomplete="email" spellcheck="false" aria-describedby="eposta2-yardim">\n</div>'
      }
    ]
  },
  {
    id: 'number-input',
    ad: 'Sayı girişi',
    name: 'Number input',
    grup: 'form',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Sayı için tek satırlık alan. Metin türü ve sayısal klavye kullanır, sayı türü kullanmaz.',
    neZaman: [
      'Adet, yıl veya tutar gibi bir sayı isterken kullanın.',
      'Kimlik numarası, plaka veya posta kodu için kullanmayın. Onlar sayı değil koddur.'
    ],
    erisilebilirlik: [
      '`type="text"` ve `inputmode="numeric"` kullanılır. `type="number"` fare tekerleğiyle değeri değiştirir ve ekran okuyucuda sorun çıkarır. GOV.UK aynı kararı verdi.',
      'Ondalık için `inputmode="decimal"` kullanın. Türkçede ondalık ayracı virgüldür, sunucu ikisini de kabul eder.',
      'Alan genişliği beklenen hane sayısına göre daraltılır.'
    ],
    wcag: ['1.3.5', '3.3.2'],
    kaynak: ['DE'],
    ornekler: [
      {
        baslik: 'Tam sayı',
        html: '<div class="kiris-alan">\n  <label class="kiris-etiket" for="kisi">Hanede yaşayan kişi sayısı</label>\n  <input class="kiris-girdi kiris-girdi--2" id="kisi" name="kisi" type="text" inputmode="numeric" pattern="[0-9]*">\n</div>'
      },
      {
        baslik: 'Ondalık',
        html: '<div class="kiris-alan">\n  <label class="kiris-etiket" for="alan">Arsa alanı</label>\n  <p class="kiris-yardim" id="alan-yardim">Metrekare. Ondalık için virgül kullanın: 245,5</p>\n  <div class="kiris-girdi-grubu">\n    <input class="kiris-girdi kiris-girdi--10" id="alan" name="alan" type="text" inputmode="decimal" aria-describedby="alan-yardim">\n    <span class="kiris-girdi-grubu__ek" aria-hidden="true">m²</span>\n  </div>\n</div>'
      }
    ]
  },
  {
    id: 'password-input',
    ad: 'Parola girişi',
    name: 'Password input',
    grup: 'form',
    durum: { css: 'stable', js: 'göster ve gizle', react: 'stable', vue: 'stable' },
    ozet: 'Parola alanı. Kullanıcı yazdığını görmek için "Göster" düğmesine basar.',
    neZaman: [
      'Parola veya şifre isterken kullanın.',
      'T.C. kimlik numarası için kullanmayın. O bir parola değildir.'
    ],
    erisilebilirlik: [
      '"Göster" düğmesi `aria-controls` ile alana bağlıdır ve durumunu `aria-pressed` ile söyler.',
      'Alan gösterilirken de `autocomplete` çalışır. Parola yöneticisi bozulmaz.',
      'Caps Lock açıkken uyarı yalnız ekranda gösterilir, ekran okuyucu tuş durumunu zaten bildirir.'
    ],
    wcag: ['1.3.5', '3.3.2', '4.1.2'],
    kaynak: ['UK', 'FR', 'IE', 'DE'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-alan" data-kiris="parola">\n  <label class="kiris-etiket" for="parola">Parolanız</label>\n  <div class="kiris-parola">\n    <input class="kiris-girdi" id="parola" name="parola" type="password" autocomplete="current-password" spellcheck="false">\n    <button class="kiris-button kiris-button--ikincil kiris-parola__dugme" type="button" aria-controls="parola" aria-pressed="false">Göster</button>\n  </div>\n</div>'
      }
    ]
  },
  {
    id: 'url-input',
    ad: 'Web adresi girişi',
    name: 'URL input',
    grup: 'form',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Web adresi için tek satırlık alan. Telefonda nokta ve eğik çizgi tuşlu klavye açılır.',
    neZaman: ['Kurumsal başvurularda web sitesi isterken kullanın.'],
    erisilebilirlik: [
      '`type="url"` ve `inputmode="url"` kullanılır.',
      'Başta https:// olmadan yazılan adres reddedilmez. Sunucu ekler.'
    ],
    wcag: ['1.3.5', '3.3.2'],
    kaynak: ['DE'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-alan">\n  <label class="kiris-etiket" for="site">Kurumunuzun web sitesi</label>\n  <p class="kiris-yardim" id="site-yardim">Örnek: ornek.com.tr</p>\n  <input class="kiris-girdi" id="site" name="site" type="url" inputmode="url" autocomplete="url" spellcheck="false" aria-describedby="site-yardim">\n</div>'
      }
    ]
  },
  {
    id: 'input-group',
    ad: 'Girdi grubu',
    name: 'Input group',
    grup: 'form',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir alanın başına veya sonuna birim, para işareti veya sabit metin ekler.',
    neZaman: [
      'Tutar, yüzde, ağırlık veya alan gibi birimli bir değer isterken kullanın.',
      'Eki alan içine yazmayın. Kullanıcı silebilir ve ekran okuyucu okuyamaz.'
    ],
    erisilebilirlik: [
      'Ek `aria-hidden="true"` taşır. Birim etiket veya yardım metninde yazılır.',
      'Ek, alanla aynı yükseklikte ve aynı kenarlıkta durur.'
    ],
    wcag: ['1.3.1', '3.3.2'],
    kaynak: ['US', 'DE'],
    ornekler: [
      {
        baslik: 'Sonek',
        html: '<div class="kiris-alan">\n  <label class="kiris-etiket" for="tutar">Tutar</label>\n  <p class="kiris-yardim" id="tutar-yardim">Türk Lirası olarak, kuruşsuz.</p>\n  <div class="kiris-girdi-grubu">\n    <input class="kiris-girdi kiris-girdi--10" id="tutar" name="tutar" type="text" inputmode="numeric" aria-describedby="tutar-yardim">\n    <span class="kiris-girdi-grubu__ek" aria-hidden="true">₺</span>\n  </div>\n</div>'
      },
      {
        baslik: 'Önek',
        html: '<div class="kiris-alan">\n  <label class="kiris-etiket" for="oran">Katkı oranı</label>\n  <div class="kiris-girdi-grubu">\n    <span class="kiris-girdi-grubu__ek" aria-hidden="true">%</span>\n    <input class="kiris-girdi kiris-girdi--4" id="oran" name="oran" type="text" inputmode="decimal">\n  </div>\n</div>'
      }
    ]
  },
  {
    id: 'combobox',
    ad: 'Aranabilir liste',
    name: 'Combobox',
    grup: 'secim',
    durum: { css: 'stable', js: 'süzme ve klavye', react: 'stable', vue: 'stable' },
    ozet: 'Uzun bir listeden yazarak seçim yaptırır. 81 il ve 973 ilçe için açılır liste yerine bunu kullanın.',
    neZaman: [
      'Seçenek sayısı 20 üstündeyse kullanın.',
      'Kullanıcı seçeneği bilmiyorsa kullanmayın. O zaman seçenek düğmesi veya açılır liste daha iyidir.',
      'JavaScript yoksa alan düz bir metin girişi olarak kalır ve sunucu değeri doğrular.'
    ],
    erisilebilirlik: [
      'ARIA 1.2 combobox kalıbı: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`.',
      'Yukarı ve aşağı ok seçenekler arasında gezinir. Enter seçer. Escape kapatır.',
      'Eşleşen seçenek sayısı `aria-live` ile duyurulur: "5 sonuç".',
      'Türkçe harf duyarsız süzer: "i" ile "İ", "ı" ile "I" eşleşir.'
    ],
    wcag: ['1.3.1', '2.1.1', '4.1.2', '4.1.3'],
    kaynak: ['US', 'FR', 'IE', 'JP', 'NO'],
    ornekler: [
      {
        baslik: 'İl seçimi',
        html: '<div class="kiris-alan" data-kiris="aranabilir">\n  <label class="kiris-etiket" for="il-ara">İl</label>\n  <p class="kiris-yardim" id="il-ara-yardim">Yazmaya başlayın ve listeden seçin.</p>\n  <div class="kiris-aranabilir">\n    <input class="kiris-girdi" id="il-ara" name="il" type="text" role="combobox" aria-expanded="false" aria-controls="il-liste" aria-autocomplete="list" autocomplete="off" aria-describedby="il-ara-yardim">\n    <ul class="kiris-aranabilir__liste" id="il-liste" role="listbox" aria-label="İller" hidden>\n      <li role="option" id="il-01" data-deger="01">Adana</li>\n      <li role="option" id="il-06" data-deger="06">Ankara</li>\n      <li role="option" id="il-07" data-deger="07">Antalya</li>\n      <li role="option" id="il-16" data-deger="16">Bursa</li>\n      <li role="option" id="il-21" data-deger="21">Diyarbakır</li>\n      <li role="option" id="il-27" data-deger="27">Gaziantep</li>\n      <li role="option" id="il-32" data-deger="32">Isparta</li>\n      <li role="option" id="il-34" data-deger="34">İstanbul</li>\n      <li role="option" id="il-35" data-deger="35">İzmir</li>\n      <li role="option" id="il-42" data-deger="42">Konya</li>\n      <li role="option" id="il-63" data-deger="63">Şanlıurfa</li>\n    </ul>\n  </div>\n  <p class="kiris-aranabilir__durum kiris-gorsel-gizli" aria-live="polite"></p>\n</div>'
      }
    ]
  },
  {
    id: 'switch',
    ad: 'Anahtar',
    name: 'Switch',
    grup: 'secim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir ayarı açar veya kapatır. Etkisi hemen görülür, form gönderimi beklemez.',
    neZaman: [
      'Bildirim ayarı gibi anında etkili bir açık ve kapalı seçimi için kullanın.',
      'Bir formun parçası olan seçim için onay kutusu kullanın. Anahtar gönderim beklemez.'
    ],
    erisilebilirlik: [
      'Yerel bir onay kutusu `role="switch"` taşır. JavaScript gerekmez, klavye ve ekran okuyucu tarayıcıdan gelir.',
      'Etiket durumu yazmaz. "Bildirim gönder" der, "açık" veya "kapalı" demez. Durumu tarayıcı okur.',
      'Anahtar en az 44 piksel dokunma alanına sahiptir.'
    ],
    wcag: ['1.3.1', '2.5.8', '4.1.2'],
    kaynak: ['FR', 'KR', 'JP', 'DK', 'NO'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-anahtar">\n  <input class="kiris-anahtar__girdi" id="bildirim" name="bildirim" type="checkbox" role="switch">\n  <label class="kiris-anahtar__etiket" for="bildirim">\n    <span class="kiris-anahtar__yol" aria-hidden="true"></span>\n    <span>Başvuru durumu değişince SMS gönder</span>\n  </label>\n</div>'
      }
    ]
  },

  // ---------------------------------------------------------------- gezinme
  {
    id: 'search',
    ad: 'Arama',
    name: 'Search',
    grup: 'gezinme',
    durum: { css: 'stable', js: 'öneri listesi', react: 'stable', vue: 'stable' },
    ozet: 'Site içi arama alanı ve düğmesi. İsteğe bağlı öneri listesi: kullanıcı yazarken gruplu sonuçlar açılır.',
    neZaman: [
      'Sayfa sayısı 30 üstündeki her sitede kullanın.',
      'Bir formun içindeki listeyi süzmek için aranabilir liste kullanın, arama değil.',
      'Öneri listesini `data-kiris="arama"` açar. Kaynak bir sunucu adresi (`data-kaynak`) veya sayfadaki bir JSON betiğidir (`data-kaynak-id`). İki karakterden sonra, 200 ms bekleyip sorar.',
      'Öneriler gruplanır: hizmetler, kurumlar, belediyeler. Her gruptan en çok beş satır. Son satır tam aramaya gider.'
    ],
    erisilebilirlik: [
      '`<form role="search">` ile ekran okuyucu bölgeyi bulur.',
      'Etiket görsel olarak gizlidir ama vardır. Yer tutucu etiket yerine geçmez.',
      'Düğme metni "Ara" olur. Yalnız büyüteç simgesi yeterli değildir.',
      'Öneri listesi ARIA 1.2 combobox kalıbıdır: `role="listbox"`, gruplar `role="group"`, satırlar `role="option"`. Ok tuşları gezer, Escape kapatır, dışarı tıklama kapatır.',
      'Canlı bölge öneri sayısını söyler: "12 öneri, 3 grupta". Eşleşen parça `<mark>` ile kalındır, yalnız renkle gösterilmez.',
      'Betik yüklenmezse veya sunucu geç kalırsa form düz arama olarak çalışır. Enter her zaman formu gönderir.'
    ],
    wcag: ['1.3.1', '2.4.6', '4.1.2'],
    kaynak: ['US', 'FR', 'JP', 'DK', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<form class="kiris-arama" role="search" action="#" method="get">\n  <label class="kiris-etiket kiris-gorsel-gizli" for="ara">Sitede ara</label>\n  <input class="kiris-girdi kiris-arama__girdi" id="ara" name="q" type="search" placeholder="Sitede ara" autocomplete="off">\n  <button class="kiris-button kiris-arama__dugme" type="submit">Ara</button>\n</form>'
      },
      {
        baslik: 'Öneri listesi ile',
        html: '<div class="kiris-arama-onerileri" data-kiris="arama" data-kaynak-id="oneri-verisi">\n  <form class="kiris-arama" role="search" action="#" method="get">\n    <label class="kiris-etiket kiris-gorsel-gizli" for="ara3">Hizmet, kurum veya belediye ara</label>\n    <input class="kiris-girdi kiris-arama__girdi" id="ara3" name="q" type="search" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="ara3-liste" autocomplete="off" placeholder="Örnek: ikamet">\n    <button class="kiris-button kiris-arama__dugme" type="submit">Ara</button>\n  </form>\n  <div class="kiris-arama-onerileri__liste" id="ara3-liste" role="listbox" aria-label="Öneriler" hidden></div>\n  <p class="kiris-gorsel-gizli" data-kiris-durum aria-live="polite"></p>\n  <script type="application/json" id="oneri-verisi">{"gruplar": [{"ad": "Hizmetler", "ogeler": [{"ad": "İkametgâh Belgesi Sorgulama", "ek": "Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü", "href": "#"}, {"ad": "Adli Sicil Kaydı Sorgulama", "ek": "Adalet Bakanlığı", "href": "#"}, {"ad": "Vergi Borcu Sorgulama ve Ödeme", "ek": "Gelir İdaresi Başkanlığı", "href": "#"}, {"ad": "SGK Tescil ve Hizmet Dökümü", "ek": "Sosyal Güvenlik Kurumu", "href": "#"}]}, {"ad": "Kurumlar", "ogeler": [{"ad": "Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü", "href": "#"}, {"ad": "Adalet Bakanlığı", "href": "#"}]}, {"ad": "Belediyeler", "ogeler": [{"ad": "Ankara Büyükşehir Belediyesi", "href": "#"}, {"ad": "İzmir Büyükşehir Belediyesi", "href": "#"}]}]}</script>\n</div>'
      },
      {
        baslik: 'Başlık çubuğunda',
        html: '<form class="kiris-arama kiris-arama--koyu" role="search" action="#" method="get">\n  <label class="kiris-etiket kiris-gorsel-gizli" for="ara2">Hizmet ara</label>\n  <input class="kiris-girdi kiris-arama__girdi" id="ara2" name="q" type="search" placeholder="Hizmet ara" autocomplete="off">\n  <button class="kiris-button kiris-arama__dugme" type="submit">Ara</button>\n</form>'
      }
    ]
  },
  {
    id: 'language-selector',
    ad: 'Dil seçici',
    name: 'Language selector',
    grup: 'gezinme',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcının içerik dilini değiştirmesini sağlar. Her dil kendi adıyla ve kendi yazısıyla yazılır.',
    neZaman: [
      'Hizmetin birden çok dilde sürümü varsa kullanın. Türkçe bilmeyen yerleşikler ve turistler için önemlidir.',
      'Bayrak kullanmayın. Bayrak bir ülkedir, dil değildir.'
    ],
    erisilebilirlik: [
      'Her bağlantı `lang` ve `hreflang` taşır. Ekran okuyucu doğru telaffuzla okur.',
      'Geçerli dil `aria-current="true"` taşır ve bağlantı değildir.',
      'Sağdan sola diller `dir="rtl"` taşır.'
    ],
    wcag: ['3.1.1', '3.1.2', '2.4.4'],
    kaynak: ['UK', 'US', 'KR', 'JP', 'DK'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<nav class="kiris-dil" aria-label="Dil seçimi">\n  <ul class="kiris-dil__liste">\n    <li><span aria-current="true" lang="tr">Türkçe</span></li>\n    <li><a href="?dil=en" lang="en" hreflang="en">English</a></li>\n    <li><a href="?dil=ar" lang="ar" hreflang="ar" dir="rtl">العربية</a></li>\n    <li><a href="?dil=ku" lang="ku" hreflang="ku">Kurdî</a></li>\n    <li><a href="?dil=ru" lang="ru" hreflang="ru">Русский</a></li>\n  </ul>\n</nav>'
      }
    ]
  },
  {
    id: 'side-navigation',
    ad: 'Yan menü',
    name: 'Side navigation',
    grup: 'gezinme',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir bölümün alt sayfaları arasında gezinmeyi sağlar. İçeriğin solunda durur.',
    neZaman: [
      'Bir bölümde 4 ile 15 arasında sayfa varsa kullanın.',
      'Adım adım bir akışta kullanmayın. Orada adım göstergesi kullanın.'
    ],
    erisilebilirlik: [
      '`<nav aria-label>` ile adlandırılır. Bir sayfada birden çok nav varsa adlar farklı olur.',
      'Geçerli sayfa `aria-current="page"` taşır.',
      'Küçük ekranda menü içeriğin üstüne geçer, gizlenmez.'
    ],
    wcag: ['1.3.1', '2.4.7', '2.4.8'],
    kaynak: ['US', 'FR', 'IE', 'KR', 'DK'],
    ornekler: [
      {
        baslik: 'İki düzey',
        html: '<nav class="kiris-yan-menu" aria-label="Emeklilik bölümü">\n  <ul class="kiris-yan-menu__liste">\n    <li><a href="#">Genel bilgi</a></li>\n    <li><a href="#" aria-current="page">Başvuru</a>\n      <ul>\n        <li><a href="#">Gerekli belgeler</a></li>\n        <li><a href="#">Ücretler</a></li>\n      </ul>\n    </li>\n    <li><a href="#">Sıkça sorulan sorular</a></li>\n    <li><a href="#">İletişim</a></li>\n  </ul>\n</nav>'
      }
    ]
  },
  {
    id: 'in-page-navigation',
    ad: 'Sayfa içi gezinme',
    name: 'In-page navigation',
    grup: 'gezinme',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Uzun bir sayfanın bölümlerini listeler ve her birine bağlantı verir.',
    neZaman: [
      'Sayfa 4 ekrandan uzunsa ve 3 üstünde bölüm başlığı varsa kullanın.',
      'Mevzuat, kılavuz ve sıkça sorulan sorular sayfalarında kullanın.'
    ],
    erisilebilirlik: [
      'Bağlantı hedefi bir başlıktır ve `id` taşır.',
      'Liste sıralıdır, `<ol>`. Sıra bilgi taşır.',
      'Sabit konumlu sürüm klavye odağını kapatmaz.'
    ],
    wcag: ['2.4.1', '2.4.5'],
    kaynak: ['US', 'KR', 'JP', 'DK'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<nav class="kiris-icindekiler" aria-labelledby="ic-baslik">\n  <h2 class="kiris-icindekiler__baslik" id="ic-baslik">Bu sayfada</h2>\n  <ol class="kiris-icindekiler__liste">\n    <li><a href="#kosullar">Başvuru koşulları</a></li>\n    <li><a href="#belgeler">Gerekli belgeler</a></li>\n    <li><a href="#sure">Süreç ve süre</a></li>\n    <li><a href="#itiraz">İtiraz yolu</a></li>\n  </ol>\n</nav>'
      }
    ]
  },

  // ---------------------------------------------------------------- içerik
  {
    id: 'typography',
    ad: 'Tipografi',
    name: 'Typography',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Başlık, üst başlık, alt başlık, gövde ve etiket sınıfları. Dokuz kademeli ölçek.',
    neZaman: [
      'Her sayfada tek bir `h1` bulunur. Başlık düzeyi atlanmaz.',
      'Görsel boyut ile anlamsal düzey ayrıdır. `h2` öğesine `kiris-baslik--3` sınıfı verilebilir.',
      'Üst başlık kısa bir bağlam verir: kurum adı, bölüm adı veya belge türü.'
    ],
    erisilebilirlik: [
      'Satır uzunluğu 38rem ile sınırlıdır. Uzun satır okumayı yavaşlatır.',
      'Satır yüksekliği 1,5 altına düşmez. Türkçe uzun sözcük taşır.',
      'Yazı tipi her ağırlıkta ş, ğ, ı, İ, ö, ç, ü taşır.'
    ],
    wcag: ['1.3.1', '1.4.8', '1.4.12', '2.4.6'],
    kaynak: ['IE', 'JP', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Başlık düzeyleri',
        html: '<p class="kiris-ust-baslik">Sosyal Güvenlik Kurumu</p>\n<h1 class="kiris-baslik kiris-baslik--1">Emeklilik başvurusu</h1>\n<p class="kiris-alt-baslik">Yaş ve prim gün sayısı koşullarını sağlıyorsanız çevrim içi başvurun.</p>\n<h2 class="kiris-baslik kiris-baslik--2">Başvuru koşulları</h2>\n<h3 class="kiris-baslik kiris-baslik--3">Yaş koşulu</h3>\n<h4 class="kiris-baslik kiris-baslik--4">İstisnalar</h4>'
      },
      {
        baslik: 'Gövde metni',
        html: '<p class="kiris-govde kiris-govde--buyuk">Başvurunuz 15 iş günü içinde sonuçlanır. Sonuç e-Devlet üzerinden bildirilir.</p>\n<p class="kiris-govde">Eksik belge varsa size SMS gönderilir. Belgeyi 10 gün içinde yüklemeniz gerekir.</p>\n<p class="kiris-govde kiris-kucuk">Son güncelleme: 12 Mart 2026</p>'
      }
    ]
  },
  {
    id: 'list',
    ad: 'Liste',
    name: 'List',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Madde işaretli, numaralı ve aralıklı liste biçimleri.',
    neZaman: [
      'Sıra önemliyse numaralı liste kullanın. Adımlar sıralıdır.',
      'Her madde bir cümleden uzunsa aralıklı biçimi kullanın.',
      'Tek maddelik liste yapmayın. Bir cümle yazın.'
    ],
    erisilebilirlik: [
      '`<ul>` ve `<ol>` kullanılır. Ekran okuyucu madde sayısını duyurur.',
      'Madde işareti CSS ile kaldırılırsa `role="list"` eklenir. Safari aksi hâlde listeyi duyurmaz.'
    ],
    wcag: ['1.3.1'],
    kaynak: ['US', 'IE', 'KR', 'JP', 'NO', 'DE'],
    ornekler: [
      {
        baslik: 'Üç biçim',
        html: '<ul class="kiris-liste kiris-liste--madde">\n  <li>Nüfus cüzdanı</li>\n  <li>İkametgâh belgesi</li>\n  <li>Son üç aylık maaş bordrosu</li>\n</ul>\n<ol class="kiris-liste kiris-liste--sira">\n  <li>e-Devlet ile giriş yapın.</li>\n  <li>Başvuru formunu doldurun.</li>\n  <li>Belgeleri yükleyin.</li>\n</ol>\n<ul class="kiris-liste kiris-liste--madde kiris-liste--aralikli">\n  <li>Başvurunuz alındıktan sonra 15 iş günü içinde değerlendirilir.</li>\n  <li>Eksik belge varsa SMS ile bilgilendirilirsiniz ve 10 gün ek süre verilir.</li>\n</ul>'
      }
    ]
  },
  {
    id: 'description-list',
    ad: 'Tanım listesi',
    name: 'Description list',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Terim ve karşılık çiftlerini gösterir. Düzenleme bağlantısı yoktur, o özet listesindedir.',
    neZaman: [
      'Başvuru numarası ve tarihi gibi salt okunur bilgi çiftleri için kullanın.',
      'Kullanıcının düzenleyeceği bilgi için özet listesi kullanın.'
    ],
    erisilebilirlik: [
      '`<dl>`, `<dt>` ve `<dd>` kullanılır.',
      'Bir terim birden çok karşılık taşıyabilir. Her biri ayrı `<dd>` olur.'
    ],
    wcag: ['1.3.1'],
    kaynak: ['DE', 'JP', 'IE'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<dl class="kiris-tanim">\n  <div class="kiris-tanim__satir"><dt>Başvuru numarası</dt><dd>2026-004512</dd></div>\n  <div class="kiris-tanim__satir"><dt>Başvuru tarihi</dt><dd>12.03.2026</dd></div>\n  <div class="kiris-tanim__satir"><dt>Durum</dt><dd><span class="kiris-etiket kiris-etiket--mavi">İnceleniyor</span></dd></div>\n</dl>'
      }
    ]
  },
  {
    id: 'inset-text',
    ad: 'Vurgulu metin',
    name: 'Inset text',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Metnin geri kalanından ayrılması gereken bir paragrafı sol çizgiyle öne çıkarır.',
    neZaman: [
      'Bir istisna, koşul veya önemli bir not için kullanın.',
      'Uyarı için uyarı bileşenini kullanın. Bu bileşen renk taşımaz.',
      'Sayfada birden çok kez kullanmayın. Vurgu çoğalınca kaybolur.'
    ],
    erisilebilirlik: [
      'Anlam sol çizgiye bağlı değildir. Metin kendi başına anlaşılır.',
      'Çizgi rengi metin rengiyle aynı kontrastı taşır.'
    ],
    wcag: ['1.4.1'],
    kaynak: ['UK', 'US', 'FR', 'IE'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-vurgu">\n  <p>Yurt dışında yaşıyorsanız başvurunuzu en yakın konsolosluk üzerinden yapın. Çevrim içi başvuru yurt dışı adresini kabul etmez.</p>\n</div>'
      }
    ]
  },
  {
    id: 'badge',
    ad: 'Rozet',
    name: 'Badge',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir öğenin yanında küçük bir sayı veya kısa bir kelime gösterir. Etiketten küçüktür.',
    neZaman: [
      'Okunmamış bildirim sayısı gibi bir sayı için kullanın.',
      '"Yeni" gibi tek kelimelik bir işaret için kullanın.',
      'Başvuru durumu için etiket kullanın. Rozet cümle taşımaz.'
    ],
    erisilebilirlik: [
      'Sayı rozeti bağlamını metinden alır: "Bildirimler 12". Tek başına 12 anlamsızdır.',
      'Yalnız renkle anlam vermez. Kırmızı rozet "Yeni" yazar.'
    ],
    wcag: ['1.4.1', '1.4.3'],
    kaynak: ['FR', 'KR', 'DK', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Sayı ve kelime',
        html: '<a class="kiris-link" href="#">Bildirimler <span class="kiris-rozet kiris-rozet--sayi">12</span></a>\n<span class="kiris-rozet">Taslak</span>\n<span class="kiris-rozet kiris-rozet--kirmizi">Yeni</span>\n<span class="kiris-rozet kiris-rozet--mavi">Beta</span>'
      }
    ]
  },

  // ---------------------------------------------------------------- yerleşim
  {
    id: 'divider',
    ad: 'Ayraç',
    name: 'Divider',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'İki içerik bölümünü ince bir çizgiyle ayırır.',
    neZaman: [
      'Başlık aralığı yeterli olmadığında kullanın.',
      'Her paragraf arasına koymayın. Boşluk yeterlidir.'
    ],
    erisilebilirlik: [
      'Anlamsal ayrım için `<hr>` kullanılır. Süs için `role="presentation"` eklenir.'
    ],
    wcag: ['1.3.1'],
    kaynak: ['IE', 'JP', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'İki kalınlık',
        html: '<p class="kiris-govde">Birinci bölüm.</p>\n<hr class="kiris-ayrac">\n<p class="kiris-govde">İkinci bölüm.</p>\n<hr class="kiris-ayrac kiris-ayrac--kalin">\n<p class="kiris-govde">Üçüncü bölüm.</p>'
      }
    ]
  },
  {
    id: 'grid',
    ad: 'Izgara',
    name: 'Grid',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'On iki sütunlu yerleşim. Küçük ekranda sütunlar alt alta iner.',
    neZaman: [
      'İçerik ve yan menü gibi iki bölgeli sayfalarda kullanın.',
      'Form alanlarını yan yana dizmek için kullanmayın. Alanlar alt alta durur.',
      'Okuma sütunu 8 sütunu geçmez. Uzun satır okumayı yavaşlatır.'
    ],
    erisilebilirlik: [
      'Görsel sıra ile DOM sırası aynıdır. Sütunlar CSS ile yer değiştirmez.',
      'Küçük ekranda içerik hiçbir zaman yatay kaymaz.'
    ],
    wcag: ['1.3.2', '1.4.10'],
    kaynak: ['IE', 'DE'],
    ornekler: [
      {
        baslik: 'Sekiz ve dört',
        html: '<div class="kiris-izgara">\n  <div class="kiris-sutun kiris-sutun--8"><div class="kiris-izgara-ornek">Ana içerik · 8 sütun</div></div>\n  <div class="kiris-sutun kiris-sutun--4"><div class="kiris-izgara-ornek">Yan bölge · 4 sütun</div></div>\n</div>\n<div class="kiris-izgara">\n  <div class="kiris-sutun kiris-sutun--4"><div class="kiris-izgara-ornek">4</div></div>\n  <div class="kiris-sutun kiris-sutun--4"><div class="kiris-izgara-ornek">4</div></div>\n  <div class="kiris-sutun kiris-sutun--4"><div class="kiris-izgara-ornek">4</div></div>\n</div>'
      }
    ]
  },
  {
    id: 'utilities',
    ad: 'Yardımcı sınıflar',
    name: 'Utility classes',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'yok', react: 'yok', vue: 'yok' },
    ozet: 'Boşluk, hizalama ve görünürlük için tek işli sınıflar. Bileşen olmayan yerde kullanılır.',
    neZaman: [
      'Bir bileşenin dış boşluğunu bir kez değiştirmek için kullanın.',
      'Yeni bir bileşen kurmak için kullanmayın. Beş yardımcı sınıf bir araya geliyorsa bir bileşen eksiktir.'
    ],
    erisilebilirlik: [
      '`kiris-u-gizle-telefon` yalnız görsel olarak gizler. İçerik ekran okuyucuda kalır.',
      'Tam gizlemek için `hidden` özniteliği kullanılır.'
    ],
    wcag: ['1.3.2'],
    kaynak: ['US', 'DE'],
    ornekler: [
      {
        baslik: 'Boşluk ve hizalama',
        html: '<p class="kiris-govde kiris-u-alt-0">Bu paragrafın altında boşluk yok.</p>\n<p class="kiris-govde kiris-u-ust-6 kiris-u-metin-sag">Bu paragraf 6 birim üst boşluk taşır ve sağa yaslıdır.</p>\n<p class="kiris-govde kiris-u-gizle-telefon">Bu paragraf telefonda görünmez.</p>'
      }
    ]
  },

  // ------------------------------------------------------------ geri bildirim
  {
    id: 'spinner',
    ad: 'Yükleniyor',
    name: 'Spinner',
    grup: 'geri-bildirim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir işlemin sürdüğünü ve süresinin bilinmediğini gösterir.',
    neZaman: [
      'Sorgu 1 saniyeden uzun sürüyorsa gösterin.',
      'Süre biliniyorsa ilerleme çubuğu kullanın.',
      '10 saniyeden uzun sürerse metin ekleyin: "Bu işlem bir dakika sürebilir."'
    ],
    erisilebilirlik: [
      '`role="status"` ile durum bir kez duyurulur. `aria-live="assertive"` kullanılmaz.',
      'Dönme hareketi `prefers-reduced-motion` ile durur, halka yine görünür.',
      'Görsel yanında her zaman metin bulunur.'
    ],
    wcag: ['2.3.3', '4.1.3'],
    kaynak: ['IE', 'KR', 'DK', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-yukleniyor" role="status">\n  <span class="kiris-yukleniyor__halka" aria-hidden="true"></span>\n  <span>Başvurunuz sorgulanıyor</span>\n</div>'
      }
    ]
  },
  {
    id: 'progress',
    ad: 'İlerleme çubuğu',
    name: 'Progress',
    grup: 'geri-bildirim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Süresi bilinen bir işlemin ne kadarının bittiğini gösterir.',
    neZaman: [
      'Dosya yükleme gibi yüzdesi bilinen işlemlerde kullanın.',
      'Çok adımlı bir formda kullanmayın. Orada adım göstergesi kullanın.'
    ],
    erisilebilirlik: [
      'Yerel `<progress>` öğesi kullanılır. Değeri ekran okuyucu yüzde olarak okur.',
      'Yüzde metin olarak da yazılır. Çubuk tek başına yeterli değildir.',
      'Etiket `aria-labelledby` ile bağlanır.'
    ],
    wcag: ['1.3.1', '4.1.2'],
    kaynak: ['IE', 'JP', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Dosya yükleme',
        html: '<div class="kiris-ilerleme">\n  <div class="kiris-ilerleme__ust">\n    <span id="ilerleme-etiket">ikametgah.pdf yükleniyor</span>\n    <span class="kiris-ilerleme__deger">%60</span>\n  </div>\n  <progress class="kiris-ilerleme__cubuk" value="60" max="100" aria-labelledby="ilerleme-etiket">%60</progress>\n</div>'
      }
    ]
  },
  {
    id: 'tooltip',
    ad: 'İpucu',
    name: 'Tooltip',
    grup: 'geri-bildirim',
    durum: { css: 'stable', js: 'göster ve gizle', react: 'stable', vue: 'stable' },
    ozet: 'Bir düğme veya simge için kısa bir açıklama gösterir. Odak veya işaretçi ile açılır.',
    neZaman: [
      'Yalnız simgeden oluşan bir düğmeye ad vermek için kullanın.',
      'Zorunlu bilgi için kullanmayın. Dokunmatik ekranda ipucu güvenilir değildir. Yardım metni kullanın.',
      'İçinde bağlantı veya düğme olmaz.'
    ],
    erisilebilirlik: [
      'Tetikleyici `aria-describedby` ile ipucuna bağlıdır. Ekran okuyucu düğmeyle birlikte okur.',
      'Klavye odağı ile açılır, Escape ile kapanır. Yalnız işaretçiye bağlı değildir.',
      'İşaretçi ipucunun üstüne geçince ipucu kapanmaz. WCAG 1.4.13.'
    ],
    wcag: ['1.4.13', '2.1.1', '4.1.2'],
    kaynak: ['US', 'FR', 'IE', 'KR', 'DK', 'NO'],
    ornekler: [
      {
        baslik: 'Simge düğmesi',
        html: '<span class="kiris-ipucu-kap" data-kiris="ipucu">\n  <button class="kiris-button kiris-button--ikincil" type="button" aria-describedby="ipucu-yazdir">Yazdır</button>\n  <span class="kiris-ipucu" id="ipucu-yazdir" role="tooltip" hidden>Bu sayfayı yazıcıya gönderir</span>\n</span>'
      }
    ]
  },

  // ---------------------------------------------------------------- portal
  {
    id: 'stat',
    ad: 'İstatistik kutusu',
    name: 'Stat tile',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir kurumun büyüklüğünü dört rakamla anlatır. Kayıtlı kullanıcı, hizmet sayısı gibi.',
    neZaman: [
      'Ana sayfada, en çok dört sayı ile kullanın.',
      'Sayı ne anlama geliyorsa altına yazın. Tek başına 9.409 anlamsızdır.',
      'Ondalık ve binlik ayracı Türkçe kuralına göre yazılır: 69.596.229.'
    ],
    erisilebilirlik: [
      'Sayı ve adı tek bir okuma sırasında gelir. Sayı önce, ad sonra.',
      'Rakamlar eş genişliktedir, sütunlar hizalanır.'
    ],
    wcag: ['1.3.1', '1.3.2'],
    kaynak: [],
    ornekler: [
      {
        baslik: 'Dört sayı',
        html: '<div class="kiris-istatistik">\n  <div class="kiris-istatistik__kutu"><span class="kiris-istatistik__deger">69.596.229</span><span class="kiris-istatistik__ad">Kayıtlı kullanıcı</span></div>\n  <div class="kiris-istatistik__kutu"><span class="kiris-istatistik__deger">9.409</span><span class="kiris-istatistik__ad">Hizmet</span></div>\n  <div class="kiris-istatistik__kutu"><span class="kiris-istatistik__deger">6.426</span><span class="kiris-istatistik__ad">Mobil hizmet</span></div>\n  <div class="kiris-istatistik__kutu"><span class="kiris-istatistik__deger">1.129</span><span class="kiris-istatistik__ad">Kurum</span></div>\n</div>'
      }
    ]
  },
  {
    id: 'icon-card',
    ad: 'Simge kartı',
    name: 'Icon card',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir portalın ana bölümlerine giden büyük simgeli bağlantı. e-Devlet’in beş temel işlevi bu kalıptadır.',
    neZaman: [
      'Ana sayfada üç ile altı ana bölüm için kullanın.',
      'Simge e-Devlet resmî setinden seçilir. Yeni simge çizilmez.'
    ],
    erisilebilirlik: [
      'Kartın tamamı tek bir bağlantıdır. Simge süstür ve `aria-hidden` taşır.',
      'Ad bağlantı metnidir. Açıklama kısa bir cümledir.'
    ],
    wcag: ['1.1.1', '2.4.4'],
    kaynak: [],
    ornekler: [
      {
        baslik: 'Beş bölüm',
        html: '<div class="kiris-izgara">\n  <a class="kiris-sutun kiris-sutun--4 kiris-simge-kart" href="#"><span class="kiris-simge-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-eservice"/></svg></span><span class="kiris-simge-kart__ad">e-Hizmetler</span><p class="kiris-simge-kart__aciklama">Sorgulama, başvuru ve ödeme hizmetleri.</p></a>\n  <a class="kiris-sutun kiris-sutun--4 kiris-simge-kart" href="#"><span class="kiris-simge-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-agency"/></svg></span><span class="kiris-simge-kart__ad">Kurumlar</span><p class="kiris-simge-kart__aciklama">Resmî kurumların hizmetleri ve iletişim bilgileri.</p></a>\n  <a class="kiris-sutun kiris-sutun--4 kiris-simge-kart" href="#"><span class="kiris-simge-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-municipality"/></svg></span><span class="kiris-simge-kart__ad">Belediyeler</span><p class="kiris-simge-kart__aciklama">Belediyelerin iletişim bilgileri ve hizmetleri.</p></a>\n</div>'
      }
    ]
  },

  // ---------------------------------------------------------------- kimlik
  {
    id: 'logo',
    ad: 'Kurum logosu',
    name: 'Logo lockup',
    grup: 'kimlik',
    ozgun: true,
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Kurumun kendi logosu, tek bir bağlantıda ve sabit yükseklikte. Logosu olmayan kurum için bayrak ve ad kilidi.',
    neZaman: [
      'Her sayfada, aynı yerde kullanın. Ana sayfaya bağlanır.',
      'Kurumun resmî logosu varsa onu kullanın. Dosya kimlik paketinde durur ve yalnız o kurumu gösterir.',
      'Logo yoksa bayrak ve ad kilidini kullanın. Arma ile adın oranını değiştirmeyin.',
      'Koyu zeminde beyaz sürüm, açık zeminde renkli sürüm durur. Logoyu yeniden boyamayın.'
    ],
    erisilebilirlik: [
      'Logo görseli kurum adını `alt` olarak taşır. Bağlantı metni odur.',
      'Bayrak ve ad kilidinde bayrak boş `alt` taşır. Kurum adı metindir, ekran okuyucu onu okur.',
      'Üst satır "T.C." her zaman yazılır. Bu bir kimlik işaretidir.'
    ],
    wcag: ['1.1.1', '2.4.4'],
    kaynak: ['DE', 'FR'],
    neden:
      'Kurumun işaretini ve adını aynı düzende gösterir. Logo boyutu, boşlukları ve açık veya koyu zemin seçeneklerini ortak kurallarla belirler.',
    ornekler: [
      {
        baslik: 'Kurumun kendi logosu',
        html: '<div class="kiris-logo-dizisi">\n  <a class="kiris-logo" href="/"><img class="kiris-logo__gorsel" src="{{VARLIK}}kurumlar/saglik-bakanligi-kirmizi.svg" alt="T.C. Sağlık Bakanlığı" width="1448" height="490"></a>\n  <a class="kiris-logo" href="/"><img class="kiris-logo__gorsel" src="{{VARLIK}}kurumlar/sgk.svg" alt="Sosyal Güvenlik Kurumu" width="150" height="73"></a>\n  <a class="kiris-logo" href="/"><img class="kiris-logo__gorsel" src="{{VARLIK}}e-devlet-isaret.png" alt="e-Devlet Kapısı" width="196" height="196"></a>\n</div>'
      },
      {
        baslik: 'Koyu zeminde beyaz sürüm',
        html: '<div class="kiris-logo-dizisi kiris-logo-dizisi--koyu">\n  <a class="kiris-logo" href="/"><img class="kiris-logo__gorsel" src="{{VARLIK}}kurumlar/e-devlet-kapisi-beyaz.svg" alt="türkiye.gov.tr" width="250" height="60"></a>\n  <a class="kiris-logo" href="/"><img class="kiris-logo__gorsel" src="{{VARLIK}}kurumlar/sgk-beyaz.svg" alt="Sosyal Güvenlik Kurumu" width="1303" height="640"></a>\n  <a class="kiris-logo" href="/"><img class="kiris-logo__gorsel" src="{{VARLIK}}kurumlar/saglik-bakanligi-beyaz.svg" alt="T.C. Sağlık Bakanlığı" width="1448" height="490"></a>\n</div>'
      },
      {
        baslik: 'Bayrak ve ad kilidi',
        html: '<a class="kiris-logo" href="/">\n  <img class="kiris-logo__arma" src="{{VARLIK}}turk-bayragi.svg" alt="" width="48" height="32">\n  <span class="kiris-logo__metin">\n    <span class="kiris-logo__ust">T.C.</span>\n    <span class="kiris-logo__ad">Sağlık Bakanlığı</span>\n  </span>\n</a>'
      },
      {
        baslik: 'Bağlı kuruluş',
        html: '<a class="kiris-logo" href="/">\n  <img class="kiris-logo__arma" src="{{VARLIK}}turk-bayragi.svg" alt="" width="48" height="32">\n  <span class="kiris-logo__metin">\n    <span class="kiris-logo__ust">T.C. Çalışma ve Sosyal Güvenlik Bakanlığı</span>\n    <span class="kiris-logo__ad">Sosyal Güvenlik Kurumu</span>\n  </span>\n</a>'
      }
    ]
  },
  {
    id: 'icon',
    ad: 'Simge',
    name: 'Icon',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Kiriş simge setinden bir simgeyi üç boyda gösterir. Yeni simge çizilmez.',
    neZaman: [
      'Bir eylemi veya bölümü tanımak için metnin yanında kullanın.',
      'Simgeyi tek başına anlam taşıyacak biçimde kullanmayın. Yanında metin bulunur.',
      'Set dışından simge kullanmayın. Vatandaş aynı simgeyi her sitede tanır.'
    ],
    erisilebilirlik: [
      'Süs simgesi `aria-hidden="true"` taşır.',
      'Anlam taşıyan simge `role="img"` ve `aria-label` taşır.',
      'Simge `currentColor` ile metnin rengini alır. Karşıtlık metinle aynıdır.'
    ],
    wcag: ['1.1.1', '1.4.11'],
    kaynak: ['US', 'IE', 'DE', 'KR'],
    ornekler: [
      {
        baslik: 'Üç boy',
        html: '<p class="kiris-govde">\n  <svg class="kiris-simge kiris-simge--kucuk" aria-hidden="true"><use href="#kiris-health"/></svg>\n  <svg class="kiris-simge" aria-hidden="true"><use href="#kiris-health"/></svg>\n  <svg class="kiris-simge kiris-simge--buyuk" aria-hidden="true"><use href="#kiris-health"/></svg>\n  Sağlık hizmetleri\n</p>'
      },
      {
        baslik: 'Metinle',
        html: '<a class="kiris-link kiris-simgeli" href="#"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-tool-print"/></svg> Belgeyi yazdır</a>\n<button class="kiris-button kiris-button--ikincil kiris-simgeli" type="button"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-tool-refresh"/></svg> Yenile</button>'
      }
    ]
  }
];
