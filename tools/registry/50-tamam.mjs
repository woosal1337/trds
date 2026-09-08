const s = (id) => `<svg class="kiris-simge" aria-hidden="true"><use href="#kiris-${id}"/></svg>`;

/** @type {import('./00-index.mjs').Bilesen[]} */
export const tamamBilesenler = [
  // ------------------------------------------------------------ geri bildirim
  {
    id: 'toast',
    ad: 'Geçici bildirim',
    name: 'Toast',
    grup: 'geri-bildirim',
    durum: { css: 'stable', js: 'kapatma ve süre', react: 'stable', vue: 'stable' },
    ozet: 'Bir işlemin sonucunu köşede, kısa süre gösterir. Kaydedildi, gönderildi, silindi.',
    neZaman: [
      'Kullanıcının sayfada kalmasını gerektirmeyen kısa bir sonuç için kullanın.',
      'Hata için kullanmayın. Hata sayfada kalır, uyarı bileşeni ile gösterilir.',
      'En çok bir tane açık durur. Yenisi eskisini kapatır.'
    ],
    erisilebilirlik: [
      'Alan `role="status"` ve `aria-live="polite"` taşır. Ekran okuyucu metni okur, odağı almaz.',
      'Kapat düğmesi vardır. Süre 8 saniyeden kısa olmaz. Fare üstündeyken süre durur.',
      'Metin bir eylem içermez. Bir eylem gerekiyorsa bağlantı metnin içinde durur ve süre kapanır.'
    ],
    wcag: ['2.2.1', '4.1.3'],
    kaynak: ['DK', 'NO', 'IE', 'FI', 'IT', 'KR'],
    ornekler: [
      {
        baslik: 'Üç tür',
        html: `<div class="kiris-gecici-alan" role="status" aria-live="polite" data-kiris="gecici">\n  <div class="kiris-gecici kiris-gecici--basari"><p class="kiris-gecici__metin">Başvurunuz kaydedildi.</p><button class="kiris-gecici__kapat" type="button" aria-label="Bildirimi kapat">${s('close')}</button></div>\n  <div class="kiris-gecici"><p class="kiris-gecici__metin">Belge indiriliyor.</p><button class="kiris-gecici__kapat" type="button" aria-label="Bildirimi kapat">${s('close')}</button></div>\n  <div class="kiris-gecici kiris-gecici--uyari"><p class="kiris-gecici__metin">Oturumunuz 2 dakika içinde kapanacak.</p><button class="kiris-gecici__kapat" type="button" aria-label="Bildirimi kapat">${s('close')}</button></div>\n</div>`
      },
      { baslik: 'Eylemli (snackbar)', html: `<div class="kiris-gecici-alan" role="status" aria-live="polite" data-kiris="gecici">\n  <div class="kiris-gecici"><p class="kiris-gecici__metin">Belge silindi. <a class="kiris-link" href="#">Geri al</a></p><button class="kiris-gecici__kapat" type="button" aria-label="Bildirimi kapat">${s('close')}</button></div>\n</div>` }
    ]
  },
  {
    id: 'skeleton',
    ad: 'İskelet',
    name: 'Skeleton',
    grup: 'geri-bildirim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'İçerik yüklenirken yerini tutan gri şekiller. Sayfa zıplamaz.',
    neZaman: [
      'Bir liste veya kart 1 saniyeden geç geliyorsa kullanın.',
      'Bir düğmenin sonucu için kullanmayın. Orada yükleniyor halkası durur.'
    ],
    erisilebilirlik: [
      'Kap `aria-busy="true"` taşır. İçerik gelince kalkar.',
      'Hareket azaltma isteyen kullanıcıda parıltı durur.'
    ],
    wcag: ['2.3.3', '4.1.3'],
    kaynak: ['NO'],
    ornekler: [
      {
        baslik: 'Kart yerine',
        html: '<div class="kiris-kart" aria-busy="true">\n  <span class="kiris-iskelet kiris-iskelet--baslik"></span>\n  <span class="kiris-iskelet kiris-iskelet--satir"></span>\n  <span class="kiris-iskelet kiris-iskelet--satir"></span>\n  <span class="kiris-iskelet kiris-iskelet--satir kiris-iskelet--kisa"></span>\n</div>'
      }
    ]
  },
  {
    id: 'warning-text',
    ad: 'Uyarı metni',
    name: 'Warning text',
    grup: 'geri-bildirim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcının atlamaması gereken bir sonucu söyler. Para cezası, hak kaybı, süre.',
    neZaman: [
      'Bir eylemin ciddi sonucu varsa, eylemden hemen önce kullanın.',
      'Sayfada en çok bir tane durur. İkisi birden dikkati böler.'
    ],
    erisilebilirlik: [
      'Simge süstür. "Uyarı" kelimesi görsel gizli metin olarak durur, ekran okuyucu onu okur.',
      'Metin kalındır ama yalnız kalınlığa güvenmez. Simge ve kelime birlikte anlatır.'
    ],
    wcag: ['1.3.3', '1.4.1'],
    kaynak: ['UK'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-uyari-metni">\n  <span class="kiris-uyari-metni__simge" aria-hidden="true">!</span>\n  <p class="kiris-uyari-metni__metin"><span class="kiris-gorsel-gizli">Uyarı:</span> Başvurunuzu 30 gün içinde tamamlamazsanız yeniden başlamanız gerekir.</p>\n</div>'
      }
    ]
  },
  {
    id: 'panel',
    ad: 'Sonuç paneli',
    name: 'Panel',
    grup: 'geri-bildirim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir işlemin bittiğini büyük ve yeşil söyler. Başvuru numarası bu kutuda durur.',
    neZaman: [
      'Onay sayfasının en üstünde kullanın. Bir kere.',
      'Bir hata için kullanmayın. Yeşil zemin başarı demektir.'
    ],
    erisilebilirlik: [
      'Başlık `h1` olur. Sayfanın başlığı budur.',
      'Referans numarası büyük yazılır ve kopyalanabilir. Görsel olarak gizli bir "Başvuru numaranız" etiketi taşır.'
    ],
    wcag: ['1.3.1', '2.4.6'],
    kaynak: ['UK'],
    ornekler: [
      {
        baslik: 'Onay',
        html: '<div class="kiris-panel">\n  <h1 class="kiris-panel__baslik">Başvurunuz alındı</h1>\n  <div class="kiris-panel__govde"><span class="kiris-gorsel-gizli">Başvuru numaranız</span><strong>2026-EM-004512</strong></div>\n</div>'
      }
    ]
  },

  // ------------------------------------------------------------------ içerik
  {
    id: 'avatar',
    ad: 'Avatar',
    name: 'Avatar',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir kişiyi veya kurumu fotoğraf ya da baş harflerle gösterir.',
    neZaman: [
      'Yorum, mesaj ve görev listesinde kişiyi göstermek için kullanın.',
      'Fotoğraf yoksa baş harfler durur. Rastgele renk kullanmayın, tek renk vardır.'
    ],
    erisilebilirlik: [
      'Fotoğraf `alt` olarak kişinin adını taşır. Baş harfler `aria-hidden` taşır, ad yanında metin olarak durur.',
      'Yığın en çok beş avatar gösterir. Fazlası "+12" olarak yazılır.'
    ],
    wcag: ['1.1.1'],
    kaynak: ['NL', 'NO', 'IT', 'BR', 'CH'],
    ornekler: [
      {
        baslik: 'Baş harf ve yığın',
        html: '<div class="kiris-u-satir">\n  <span class="kiris-avatar" aria-hidden="true">AY</span>\n  <span class="kiris-avatar kiris-avatar--buyuk" aria-hidden="true">SGK</span>\n  <div class="kiris-avatar-yigini" aria-label="Görevli 7 kişi">\n    <span class="kiris-avatar" aria-hidden="true">AY</span><span class="kiris-avatar" aria-hidden="true">MK</span><span class="kiris-avatar" aria-hidden="true">ZD</span><span class="kiris-avatar kiris-avatar--sayi">+4</span>\n  </div>\n</div>'
      }
    ]
  },
  {
    id: 'blockquote',
    ad: 'Alıntı',
    name: 'Blockquote',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Başka bir kaynaktan alınan bir cümleyi metinden ayırır. Kaynağı altında yazar.',
    neZaman: ['Mevzuat maddesi, karar metni veya bir açıklamayı alıntılarken kullanın.', 'Vurgu için kullanmayın. Vurgu için vurgulu metin vardır.'],
    erisilebilirlik: ['`<blockquote>` ve `<cite>` kullanılır. Kaynak bir bağlantı olabilir.', 'Tırnak işareti CSS ile gelir, metne yazılmaz.'],
    wcag: ['1.3.1'],
    kaynak: ['NL', 'JP', 'FR', 'CH'],
    ornekler: [
      {
        baslik: 'Kaynaklı',
        html: '<figure class="kiris-alinti">\n  <blockquote class="kiris-alinti__metin"><p>Herkes, dilekçe hakkına sahiptir. Vatandaşlar ve karşılıklılık esası gözetilmek kaydıyla Türkiye’de ikamet eden yabancılar kendileriyle veya kamu ile ilgili dilek ve şikâyetleri hakkında yetkili makamlara başvurma hakkına sahiptir.</p></blockquote>\n  <figcaption class="kiris-alinti__kaynak">Anayasa, <cite>Madde 74</cite></figcaption>\n</figure>'
      }
    ]
  },
  {
    id: 'figure',
    ad: 'Görsel',
    name: 'Figure',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir görsel ve altında bir açıklama. Görsel içeriğin genişliğini aşmaz.',
    neZaman: ['Bir haber, duyuru veya kılavuz görseli için kullanın.', 'Süs görseli için kullanmayın. Süs görselinin açıklaması olmaz.'],
    erisilebilirlik: ['`alt` görseli anlatır. Açıklama görseli yorumlar. İkisi aynı cümle olmaz.', 'Görsel `width` ve `height` taşır, sayfa yüklenirken zıplamaz.'],
    wcag: ['1.1.1', '1.4.5'],
    kaynak: ['NL', 'JP', 'KR', 'FR'],
    ornekler: [
      {
        baslik: 'Açıklamalı',
        html: '<figure class="kiris-gorsel">\n  <img src="{{VARLIK}}turk-bayragi.svg" alt="Türk bayrağı: kırmızı zemin üzerinde beyaz ay ve yıldız" width="1200" height="800">\n  <figcaption class="kiris-gorsel__altyazi">Bayrağın oranları 2893 sayılı Türk Bayrağı Kanunu ile belirlenir.</figcaption>\n</figure>'
      }
    ]
  },
  {
    id: 'timeline',
    ad: 'Zaman çizelgesi',
    name: 'Timeline',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir başvurunun geçtiği adımları tarih sırasıyla gösterir. En yenisi en üstte.',
    neZaman: ['Başvuru geçmişi, dava süreci veya kargo takibi için kullanın.', 'Gelecek adımlar için adım göstergesi kullanın. Zaman çizelgesi geçmişi anlatır.'],
    erisilebilirlik: ['Sıralı liste kullanılır. Ekran okuyucu adım sayısını söyler.', 'Tarih `<time datetime>` taşır. Çizgi ve nokta süstür.'],
    wcag: ['1.3.1', '1.3.2'],
    kaynak: ['IT', 'NL'],
    ornekler: [
      {
        baslik: 'Başvuru geçmişi',
        html: '<ol class="kiris-zaman">\n  <li class="kiris-zaman__oge kiris-zaman__oge--etkin"><time class="kiris-zaman__tarih" datetime="2026-09-04">4 Eylül 2026</time><p class="kiris-zaman__baslik">İnceleme başladı</p><p class="kiris-zaman__metin">Başvurunuz Emeklilik Hizmetleri Genel Müdürlüğüne iletildi.</p></li>\n  <li class="kiris-zaman__oge"><time class="kiris-zaman__tarih" datetime="2026-09-02">2 Eylül 2026</time><p class="kiris-zaman__baslik">Belgeler alındı</p><p class="kiris-zaman__metin">3 belge yüklendi.</p></li>\n  <li class="kiris-zaman__oge"><time class="kiris-zaman__tarih" datetime="2026-09-01">1 Eylül 2026</time><p class="kiris-zaman__baslik">Başvuru oluşturuldu</p></li>\n</ol>'
      }
    ]
  },
  {
    id: 'callout',
    ad: 'Bilgi kutusu',
    name: 'Callout',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Başlıklı bir bilgi kutusu. Bir durum bildirmez, bir bilgiyi öne çıkarır.',
    neZaman: ['Bir sayfanın en önemli bilgisini, örneğin son günü veya ücreti, ayrı bir kutuda vermek için kullanın.', 'Hata veya başarı için uyarı bileşeni kullanın.'],
    erisilebilirlik: ['Başlık bir başlık ögesidir ve sayfa sırasına uyar.', 'Simge süstür.'],
    wcag: ['1.3.1'],
    kaynak: ['FR', 'US', 'IT', 'NL', 'JP'],
    ornekler: [
      {
        baslik: 'Temel',
        html: `<div class="kiris-bilgi-kutusu">\n  <h3 class="kiris-bilgi-kutusu__baslik">${s('information')} Son gün 31 Mart</h3>\n  <p class="kiris-govde kiris-u-alt-0">Yıllık gelir vergisi beyannamesini 31 Mart 2026 Salı 23:59’a kadar verin. Ücret yoktur.</p>\n</div>`
      }
    ]
  },
  {
    id: 'date-modified',
    ad: 'Son güncelleme',
    name: 'Date modified',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Sayfanın en son ne zaman değiştiğini söyler. Her içerik sayfasının sonunda durur.',
    neZaman: ['Mevzuat, kılavuz ve duyuru sayfalarında kullanın.', 'Form adımlarında kullanmayın.'],
    erisilebilirlik: ['Tarih `<time datetime>` taşır.', 'Metin "Son güncelleme" ile başlar. Yalnız tarih yazılmaz.'],
    wcag: ['1.3.1'],
    kaynak: ['CA', 'CH'],
    ornekler: [{ baslik: 'Temel', html: '<p class="kiris-guncelleme">Son güncelleme: <time datetime="2026-09-06">6 Eylül 2026</time></p>' }]
  },
  {
    id: 'code',
    ad: 'Kod',
    name: 'Code',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Satır içi kod ve kod bloğu. API belgeleri ve teknik kılavuzlar için.',
    neZaman: ['Bir komut, dosya adı veya parametre yazarken kullanın.', 'Vatandaşa dönük sayfalarda kullanmayın.'],
    erisilebilirlik: ['`<code>` ve `<pre>` kullanılır. Blok yatay kayar, sayfa kaymaz.', 'Karşıtlık koyu zeminde de 4,5:1 üstündedir.'],
    wcag: ['1.4.3', '1.4.10'],
    kaynak: ['NL'],
    ornekler: [{ baslik: 'İkisi', html: '<p class="kiris-govde">Belirteçleri <code class="kiris-kod">node packages/tokens/build.mjs</code> ile üretin.</p>\n<pre class="kiris-kod-blok"><code>&lt;input class="kiris-girdi" id="tc" inputmode="numeric" maxlength="11"&gt;</code></pre>' }]
  },
  {
    id: 'collection',
    ad: 'Kayıt listesi',
    name: 'Collection',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Haber, duyuru veya belge kayıtlarının listesi. Her kayıt başlık, tarih, özet ve etiket taşır.',
    neZaman: ['Arama sonucu, duyuru listesi ve haber listesi için kullanın.', 'Üç kayıttan az ise kart kullanın.'],
    erisilebilirlik: ['Liste `<ul>` ve `<li>` ile kurulur. Başlık bağlantıdır.', 'Tarih ve kurum, başlıktan önce küçük satırda durur.'],
    wcag: ['1.3.1', '2.4.4'],
    kaynak: ['US', 'KR', 'JP', 'BR'],
    ornekler: [
      {
        baslik: 'Duyurular',
        html: '<ul class="kiris-kayitlar">\n  <li class="kiris-kayit"><p class="kiris-kayit__ust"><time datetime="2026-09-02">2 Eylül 2026</time> · Genel Sağlık Sigortası Genel Müdürlüğü</p><h3 class="kiris-kayit__baslik"><a href="#">Bedeli Ödenecek İlaçlar Listesinde Yapılan Düzenlemeler Hakkında Duyuru 2026/34</a></h3><p class="kiris-kayit__ozet">Liste 5 Eylül 2026 tarihinden itibaren geçerlidir.</p><p class="kiris-kayit__etiketler"><span class="kiris-etiket kiris-etiket--mavi">Duyuru</span></p></li>\n  <li class="kiris-kayit"><p class="kiris-kayit__ust"><time datetime="2026-08-31">31 Ağustos 2026</time> · İnşaat ve Emlak Daire Başkanlığı</p><h3 class="kiris-kayit__baslik"><a href="#">Gayrimenkul Satış İlanı</a></h3><p class="kiris-kayit__etiketler"><span class="kiris-etiket kiris-etiket--sari">İhale</span></p></li>\n</ul>'
      }
    ]
  },
  {
    id: 'icon-list',
    ad: 'Simgeli liste',
    name: 'Icon list',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Her maddesi bir simge ile başlayan liste. Gerekli belgeler, koşullar.',
    neZaman: ['Koşul listesi ve belge listesi için kullanın.', 'Simge maddeyi anlatır, süslemez. Her maddede aynı simge de olabilir.'],
    erisilebilirlik: ['Simge süstür. Madde metni tek başına anlaşılır.', 'Onay işareti "tamam" anlamına gelir. Anlam yalnız simgeyle verilmez, metin de söyler.'],
    wcag: ['1.3.1', '1.4.1'],
    kaynak: ['US'],
    ornekler: [{ baslik: 'Gerekli belgeler', html: `<ul class="kiris-simgeli-liste">\n  <li>${s('identity')}<span>T.C. kimlik kartı</span></li>\n  <li>${s('home')}<span>İkametgâh belgesi, son 30 gün içinde alınmış</span></li>\n  <li>${s('mail')}<span>Bir e-posta adresi</span></li>\n</ul>` }]
  },
  {
    id: 'process-list',
    ad: 'Süreç listesi',
    name: 'Process list',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir işin adımlarını numaralı ve açıklamalı anlatır. Başvurudan önce okunur.',
    neZaman: ['"Nasıl başvururum?" sayfalarında kullanın.', 'Form içinde ilerleme için adım göstergesi kullanın.'],
    erisilebilirlik: ['Sıralı liste kullanılır. Numara CSS ile gelir, ekran okuyucu listeden sayar.', 'Her adımın başlığı bir başlık ögesidir.'],
    wcag: ['1.3.1'],
    kaynak: ['US', 'FR'],
    ornekler: [{ baslik: 'Üç adım', html: '<ol class="kiris-surec">\n  <li class="kiris-surec__adim"><h3 class="kiris-surec__baslik">Belgeleri hazırlayın</h3><p class="kiris-surec__metin">Kimlik kartı ve ikametgâh belgesi. İkisi de e-Devlet’ten alınır.</p></li>\n  <li class="kiris-surec__adim"><h3 class="kiris-surec__baslik">Başvuruyu doldurun</h3><p class="kiris-surec__metin">Form 10 dakika sürer. Kaydedip sonra devam edebilirsiniz.</p></li>\n  <li class="kiris-surec__adim"><h3 class="kiris-surec__baslik">Sonucu bekleyin</h3><p class="kiris-surec__metin">Sonuç 15 iş günü içinde e-Devlet’e düşer.</p></li>\n</ol>' }]
  },
  {
    id: 'follow',
    ad: 'Takip et',
    name: 'Follow',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bülten kaydı ve sosyal medya hesapları tek blokta. Alt bilginin hemen üstünde durur.',
    neZaman: ['Kurumun bir bülteni varsa kullanın.', 'Sosyal hesaplar alt bilgide zaten varsa burada yinelemeyin.'],
    erisilebilirlik: ['E-posta alanı etiket taşır. Düğme metni "Abone ol" olur.', 'Sosyal bağlantılar `aria-label` ile platform adını söyler.'],
    wcag: ['1.3.1', '2.4.4'],
    kaynak: ['FR', 'CH'],
    ornekler: [{ baslik: 'Temel', html: `<div class="kiris-takip">\n  <form class="kiris-takip__bulten" action="#" method="post">\n    <h3 class="kiris-takip__baslik">Bültene abone olun</h3>\n    <p class="kiris-govde">Ayda bir e-posta. İstediğiniz zaman ayrılın.</p>\n    <div class="kiris-alan"><label class="kiris-etiket" for="bulten-eposta">E-posta adresiniz</label><input class="kiris-girdi" id="bulten-eposta" name="eposta" type="email" autocomplete="email"></div>\n    <button class="kiris-button" type="submit">Abone ol</button>\n  </form>\n  <div class="kiris-takip__sosyal">\n    <h3 class="kiris-takip__baslik">Bizi takip edin</h3>\n    <ul class="kiris-paylas__liste"><li><a href="#" aria-label="X">${s('twitter')}</a></li><li><a href="#" aria-label="YouTube">${s('youtube')}</a></li><li><a href="#" aria-label="Instagram">${s('instagram')}</a></li><li><a href="#" aria-label="Facebook">${s('facebook')}</a></li></ul>\n  </div>\n</div>` }]
  },
  {
    id: 'audio',
    ad: 'Ses',
    name: 'Audio',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Ses kaydı ve altında dökümü. Tarayıcının kendi oynatıcısı kullanılır.',
    neZaman: ['Basın açıklaması veya sesli kılavuz için kullanın.'],
    erisilebilirlik: ['Döküm her zaman vardır. Ayrıntılar bileşeninin içinde durur.', 'Oynatıcı kendiliğinden başlamaz.'],
    wcag: ['1.2.1', '1.4.2'],
    kaynak: ['CH', 'KR'],
    ornekler: [{ baslik: 'Dökümlü', html: '<div class="kiris-ses">\n  <p class="kiris-ses__baslik">Sağlık Bakanı’nın açıklaması, 6 Eylül 2026, 4 dakika</p>\n  <audio class="kiris-ses__oynatici" controls preload="none" src="#"></audio>\n  <details class="kiris-ayrinti"><summary>Döküm</summary><p class="kiris-govde">Değerli basın mensupları, bugün Dikili Devlet Hastanesi’ni hizmete açıyoruz.</p></details>\n</div>' }]
  },
  {
    id: 'video',
    ad: 'Video',
    name: 'Video',
    grup: 'icerik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Altyazılı video ve altında dökümü. 16:9 kutu, sayfa zıplamaz.',
    neZaman: ['Kılavuz videosu ve tören kaydı için kullanın.', 'Sayfanın tek içeriği video olmaz. Metin de olur.'],
    erisilebilirlik: ['`<track kind="captions">` ile altyazı gelir. Döküm ayrıntılar içinde durur.', 'Kendiliğinden başlamaz, ses açık gelmez.'],
    wcag: ['1.2.2', '1.2.3', '1.4.2'],
    kaynak: ['NL', 'IT', 'FR', 'CH', 'KR'],
    ornekler: [{ baslik: 'Altyazılı', html: '<div class="kiris-video">\n  <div class="kiris-video__kap"><video class="kiris-video__oynatici" controls preload="metadata" poster="{{VARLIK}}turk-bayragi.svg"><track kind="captions" srclang="tr" label="Türkçe" src="#"></video></div>\n  <p class="kiris-video__altyazi">Dikili Devlet Hastanesi açılış töreni, 6 Eylül 2026, 12 dakika</p>\n  <details class="kiris-ayrinti"><summary>Döküm</summary><p class="kiris-govde">Törenin tam dökümü burada durur.</p></details>\n</div>' }]
  },

  // ---------------------------------------------------------------- yerleşim
  {
    id: 'hero',
    tamGenislik: true,
    ad: 'Karşılama bloğu',
    name: 'Hero',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Ana sayfanın ilk bloğu. Bir başlık, bir cümle ve bir arama veya düğme. Fotoğraf yok.',
    neZaman: ['Kurum ana sayfasında ve hizmet giriş sayfasında kullanın.', 'Kayan pano yerine kullanın. Tek bir mesaj, tek bir eylem.'],
    erisilebilirlik: ['Başlık `h1` olur.', 'Zemin düz renktir. Metin fotoğraf üstüne binmez.'],
    wcag: ['1.4.3', '2.4.6'],
    kaynak: ['IT', 'CH', 'FR'],
    ornekler: [{ baslik: 'Aramalı', html: '<section class="kiris-kahraman">\n  <div class="kiris-kap">\n    <p class="kiris-kahraman__ust">Sosyal Güvenlik Kurumu</p>\n    <h1 class="kiris-kahraman__baslik">Daima Yanınızda</h1>\n    <p class="kiris-kahraman__metin">Çalışan, işveren, emekli ve hak sahibi için sosyal güvenlik işlemleri tek adreste.</p>\n    <div class="kiris-kahraman__eylemler"><a class="kiris-button" href="#">e-Devlet ile giriş yap</a><a class="kiris-button kiris-button--ikincil" href="#">Hizmetleri gör</a></div>\n  </div>\n</section>' }]
  },
  {
    id: 'section',
    tamGenislik: true,
    ad: 'Bölüm',
    name: 'Section',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Ana sayfayı yatay şeritlere böler. Her şeridin bir başlığı ve isteğe bağlı "Tümü" bağlantısı vardır.',
    neZaman: ['Ana sayfada her konu bir bölümdür: duyurular, hizmetler, haberler.', 'Ardışık iki bölüm aynı zemini almaz. Açık ve yumuşak sırayla gelir.'],
    erisilebilirlik: ['`<section>` başlık ile etiketlenir: `aria-labelledby`.', '"Tümü" bağlantısı görsel gizli metinle neyin tümü olduğunu söyler.'],
    wcag: ['1.3.1', '2.4.4'],
    kaynak: ['IT', 'CH'],
    ornekler: [{ baslik: 'Başlık ve bağlantı', html: '<section class="kiris-bolum kiris-bolum--yumusak" aria-labelledby="b-duyuru">\n  <div class="kiris-kap">\n    <div class="kiris-bolum__ust"><h2 class="kiris-bolum__baslik" id="b-duyuru">Duyurular</h2><a class="kiris-link" href="#">Tümü<span class="kiris-gorsel-gizli">: duyurular</span></a></div>\n    <p class="kiris-govde kiris-u-alt-0">Bölümün içeriği burada durur.</p>\n  </div>\n</section>' }]
  },
  {
    id: 'container',
    ad: 'Kap',
    name: 'Container',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'İçeriği ortalar ve genişliğini sınırlar. Her sayfa bloğu bir kap içinde durur.',
    neZaman: ['Başlık çubuğu, gövde ve alt bilgi aynı kapı kullanır. Kenarlar hizalanır.', 'Uzun metin için dar kap kullanın. Satır 75 karakteri geçmez.'],
    erisilebilirlik: ['Kap bir anlam taşımaz, yalnız genişlik verir. Bölge rolleri içindeki ögelere aittir.'],
    wcag: ['1.4.8', '1.4.10'],
    kaynak: ['CA', 'IE', 'FI', 'DE'],
    ornekler: [{ baslik: 'Geniş ve dar', html: '<div class="kiris-kap kiris-izgara-ornek">kiris-kap · en çok 75rem</div>\n<div class="kiris-kap kiris-kap--dar kiris-izgara-ornek kiris-u-ust-2">kiris-kap--dar · en çok 48rem</div>' }]
  },
  {
    id: 'tile',
    ad: 'Karo',
    name: 'Tile',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir konuya giden büyük bağlantı kutusu. Simge, başlık ve bir cümle. Kartın bağlantı olan hali.',
    neZaman: ['Ana sayfada üç ile altı ana konu için kullanın.', 'Bir kutuda birden çok bağlantı gerekiyorsa kart kullanın.'],
    erisilebilirlik: ['Karonun tamamı tek bir bağlantıdır. Bağlantı metni başlıktır.', 'Simge süstür.'],
    wcag: ['2.4.4', '2.5.8'],
    kaynak: ['FR'],
    ornekler: [{ baslik: 'Üç karo', html: `<div class="kiris-kart-izgara kiris-kart-izgara--3 kiris-u-ust-0 kiris-u-alt-0">\n  <a class="kiris-karo" href="#"><span class="kiris-karo__simge">${s('socialsecurity')}</span><span class="kiris-karo__baslik">Emeklilik</span><span class="kiris-karo__aciklama">Ne zaman emekli olurum, başvuru, maaş.</span></a>\n  <a class="kiris-karo" href="#"><span class="kiris-karo__simge">${s('health')}</span><span class="kiris-karo__baslik">Sağlık</span><span class="kiris-karo__aciklama">Provizyon, rapor, ilaç.</span></a>\n  <a class="kiris-karo" href="#"><span class="kiris-karo__simge">${s('business')}</span><span class="kiris-karo__baslik">İşveren</span><span class="kiris-karo__aciklama">Bildirge, prim, teşvik.</span></a>\n</div>` }]
  },

  // ------------------------------------------------------------------ kimlik
  {
    id: 'phase-banner',
    tamGenislik: true,
    ad: 'Aşama afişi',
    name: 'Phase banner',
    grup: 'kimlik',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Hizmetin deneme aşamasında olduğunu söyler ve geri bildirim ister. Başlık çubuğunun hemen altında durur.',
    neZaman: ['Alfa ve beta aşamasında her sayfada kullanın.', 'Hizmet canlıya geçince kaldırın.'],
    erisilebilirlik: ['Etiket ve metin aynı satırdadır. Geri bildirim bağlantısı yeni sekmede açılmaz.'],
    wcag: ['1.3.1'],
    kaynak: ['UK', 'IE'],
    ornekler: [{ baslik: 'Beta', html: '<div class="kiris-asama">\n  <div class="kiris-kap kiris-asama__ic"><span class="kiris-etiket kiris-etiket--mavi">Beta</span><p class="kiris-asama__metin">Bu yeni bir hizmettir. <a class="kiris-link" href="#">Geri bildiriminiz</a> onu iyileştirir.</p></div>\n</div>' }]
  },
  {
    id: 'favicon',
    ad: 'Sekme simgesi',
    name: 'Favicon',
    grup: 'kimlik',
    durum: { css: 'yok', js: 'yok', react: 'yok', vue: 'yok' },
    ozet: 'Tarayıcı sekmesinde ve yer imlerinde duran küçük simge. Kurumun arması, iki boyutta.',
    neZaman: ['Her sitede kullanın. 32×32 ve 180×180 piksel. SVG de eklenir.', 'Simge kurumun kendi armasıdır. Bayrak tek başına kullanılmaz.'],
    erisilebilirlik: ['Sekme simgesi bir bilgi taşımaz. Sayfa başlığı taşır. `<title>` kurum adıyla biter.'],
    wcag: ['2.4.2'],
    kaynak: ['KR'],
    ornekler: [{ baslik: 'İki boyut', html: '<div class="kiris-u-satir">\n  <img src="{{VARLIK}}e-devlet-isaret.png" alt="" width="32" height="32">\n  <img src="{{VARLIK}}e-devlet-isaret.png" alt="" width="64" height="64">\n  <code class="kiris-kod">&lt;link rel="icon" href="{{VARLIK}}e-devlet-isaret.png" type="image/png"&gt;</code>\n</div>' }]
  },

  // ----------------------------------------------------------------- gezinme
  {
    id: 'service-navigation',
    tamGenislik: true,
    ad: 'Hizmet gezinmesi',
    name: 'Service navigation',
    grup: 'gezinme',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir hizmetin adını ve kendi bölümlerini taşıyan ikinci çubuk. Başlık çubuğu kurumu, bu çubuk hizmeti söyler.',
    neZaman: ['Bir hizmetin üç ile altı bölümü varsa kullanın.', 'Tek sayfalık bir hizmette kullanmayın.'],
    erisilebilirlik: ['`<nav aria-label="Hizmet menüsü">` ile bölge olur. Geçerli sayfa `aria-current="page"` taşır.', 'Hizmet adı bağlantıdır ve hizmetin ana sayfasına gider.'],
    wcag: ['2.4.7', '2.4.8'],
    kaynak: ['UK', 'FI', 'FR'],
    ornekler: [{ baslik: 'Temel', html: '<div class="kiris-hizmet-gezinme">\n  <div class="kiris-kap kiris-hizmet-gezinme__ic">\n    <a class="kiris-hizmet-gezinme__ad" href="#">Emeklilik başvurusu</a>\n    <nav aria-label="Hizmet menüsü"><ul class="kiris-hizmet-gezinme__liste"><li><a href="#" aria-current="page">Başvuru</a></li><li><a href="#">Belgeler</a></li><li><a href="#">Durum</a></li><li><a href="#">Yardım</a></li></ul></nav>\n  </div>\n</div>' }]
  },
  {
    id: 'bottom-navigation',
    tamGenislik: true,
    ad: 'Alt gezinme',
    name: 'Bottom navigation',
    grup: 'gezinme',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Telefonda ekranın altına yapışan üç ile beş ana bölüm. Uygulama benzeri hizmetler için.',
    neZaman: ['Kullanıcının sık geçtiği üç ile beş bölüm varsa kullanın.', 'Masaüstünde gizlenir, başlık çubuğu menüsü görünür.'],
    erisilebilirlik: ['`<nav aria-label="Ana bölümler">`. Geçerli bölüm `aria-current="page"` taşır.', 'Her öge simge ve metin taşır. Yalnız simge yeterli değildir. Dokunma alanı 44 pikseldir.'],
    wcag: ['2.5.8', '2.4.7'],
    kaynak: ['IT', 'JP', 'KR'],
    ornekler: [{ baslik: 'Dört bölüm', html: `<nav class="kiris-alt-gezinme" aria-label="Ana bölümler">\n  <a href="#" aria-current="page">${s('home')}<span>Ana sayfa</span></a>\n  <a href="#">${s('search')}<span>Ara</span></a>\n  <a href="#">${s('date')}<span>Randevu</span></a>\n  <a href="#">${s('user')}<span>Hesabım</span></a>\n</nav>` }]
  },

  // ------------------------------------------------------------------- eylem
  {
    id: 'download-link',
    ad: 'İndirme bağlantısı',
    name: 'Download link',
    grup: 'eylem',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir dosyaya giden bağlantı. Dosya türünü ve boyutunu bağlantı metninin içinde söyler.',
    neZaman: ['PDF, XLSX veya ZIP verdiğiniz her yerde kullanın.', 'Tür ve boyut yazılmayan bir dosya bağlantısı yayımlanmaz.'],
    erisilebilirlik: ['Tür ve boyut bağlantı metninin parçasıdır. Ekran okuyucu "Başvuru formu, PDF, 240 kilobayt" okur.', '`download` özniteliği dosyayı sayfa yerine indirir.'],
    wcag: ['2.4.4', '3.2.5'],
    kaynak: ['FR', 'CH'],
    ornekler: [{ baslik: 'Liste', html: `<ul class="kiris-liste kiris-liste--sade kiris-liste--aralikli">\n  <li><a class="kiris-indir" href="#" download>${s('tool-down')}<span class="kiris-indir__ad">Emeklilik başvuru formu</span><span class="kiris-indir__bilgi">PDF, 240 KB</span></a></li>\n  <li><a class="kiris-indir" href="#" download>${s('tool-down')}<span class="kiris-indir__ad">2026 prim tablosu</span><span class="kiris-indir__bilgi">XLSX, 1,2 MB</span></a></li>\n</ul>` }]
  },
  {
    id: 'share',
    ad: 'Paylaş',
    name: 'Share',
    grup: 'eylem',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Sayfayı sosyal medyada veya e-posta ile paylaşan bağlantılar. Haber ve duyuru sayfasının sonunda durur.',
    neZaman: ['Haber, duyuru ve kılavuz sayfalarında kullanın.', 'Form adımlarında ve kişisel sayfalarda kullanmayın.'],
    erisilebilirlik: ['Her bağlantı `aria-label` ile platform adını söyler. Simge süstür.', 'Bağlantılar yeni sekmede açılıyorsa görsel gizli metin bunu söyler.'],
    wcag: ['2.4.4', '3.2.5'],
    kaynak: ['FR', 'CH'],
    ornekler: [{ baslik: 'Temel', html: `<div class="kiris-paylas">\n  <p class="kiris-paylas__baslik">Paylaş</p>\n  <ul class="kiris-paylas__liste"><li><a href="#" aria-label="X’te paylaş">${s('twitter')}</a></li><li><a href="#" aria-label="Facebook’ta paylaş">${s('facebook')}</a></li><li><a href="#" aria-label="E-posta ile gönder">${s('mail')}</a></li><li><a href="#" aria-label="Yazdır">${s('tool-print')}</a></li></ul>\n</div>` }]
  },
  {
    id: 'fab',
    ad: 'Yüzen düğme',
    name: 'Floating action button',
    grup: 'eylem',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Ekranın köşesinde her zaman görünen tek eylem. Telefonda "Randevu al" gibi.',
    neZaman: ['Sayfanın tek ana eylemi varsa ve sayfa uzunsa kullanın.', 'Masaüstünde kullanmayın. Orada eylem sayfanın başında durur.'],
    erisilebilirlik: ['Metin taşır. Yalnız simge yeterli değildir.', 'İçeriği örtmez. Sayfanın altında düğme kadar boşluk bırakılır.'],
    wcag: ['2.5.8', '1.4.10'],
    kaynak: ['KR', 'BR'],
    ornekler: [{ baslik: 'Temel', html: `<a class="kiris-yuzen" href="#">${s('date')}<span>Randevu al</span></a>` }]
  },

  // -------------------------------------------------------------------- form
  {
    id: 'time-input',
    ad: 'Saat girişi',
    name: 'Time input',
    grup: 'form',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Saat ve dakika için iki kısa alan. Tarih girişiyle aynı kalıp.',
    neZaman: ['Randevu saati veya olay saati isterken kullanın.', 'Saat seçici açılır liste kullanmayın. Yazmak daha hızlıdır.'],
    erisilebilirlik: ['Alan grubu `<fieldset>` ve `<legend>` ile etiketlenir.', '24 saat biçimi kullanılır. Yardım metni "Örnek: 14 30" der.'],
    wcag: ['1.3.1', '3.3.2'],
    kaynak: ['FI', 'IT', 'US'],
    ornekler: [{ baslik: 'Temel', html: '<fieldset class="kiris-alan-grubu">\n  <legend class="kiris-baslik-legend">Randevu saati</legend>\n  <p class="kiris-yardim" id="saat-yardim">24 saat biçimi. Örnek: 14 30</p>\n  <div class="kiris-saat" aria-describedby="saat-yardim">\n    <div class="kiris-saat__parca"><label class="kiris-etiket kiris-etiket--kucuk" for="saat">Saat</label><input class="kiris-girdi kiris-girdi--2" id="saat" name="saat" type="text" inputmode="numeric" maxlength="2"></div>\n    <span class="kiris-saat__ayrac" aria-hidden="true">:</span>\n    <div class="kiris-saat__parca"><label class="kiris-etiket kiris-etiket--kucuk" for="dakika">Dakika</label><input class="kiris-girdi kiris-girdi--2" id="dakika" name="dakika" type="text" inputmode="numeric" maxlength="2"></div>\n  </div>\n</fieldset>' }]
  },

  // ------------------------------------------------------------------- seçim
  {
    id: 'chip',
    ad: 'Seçim etiketi',
    name: 'Chip',
    grup: 'secim',
    durum: { css: 'stable', js: 'kaldırma', react: 'stable', vue: 'stable' },
    ozet: 'Basılabilen küçük etiket. Süzgeç seçmek veya seçileni kaldırmak için.',
    neZaman: ['Arama sonucunu süzerken ve çoklu seçimde seçilenleri göstermek için kullanın.', 'Durum göstermek için etiket kullanın. Etiket basılmaz.'],
    erisilebilirlik: ['Süzgeç etiketi bir `button` ve `aria-pressed` taşır.', 'Kaldırma düğmesi görsel gizli metinle neyi kaldırdığını söyler: "Ankara’yı kaldır".'],
    wcag: ['4.1.2', '2.5.8'],
    kaynak: ['NO', 'IE', 'FI', 'IT', 'JP', 'CH'],
    ornekler: [{ baslik: 'Süzgeç ve seçili', html: `<div class="kiris-cip-grubu" data-kiris="cip">\n  <button class="kiris-cip" type="button" aria-pressed="true">Emekli</button>\n  <button class="kiris-cip" type="button" aria-pressed="false">Çalışan</button>\n  <button class="kiris-cip" type="button" aria-pressed="false">İşveren</button>\n  <span class="kiris-cip kiris-cip--secili">Ankara<button class="kiris-cip__kaldir" type="button" aria-label="Ankara’yı kaldır">${s('close')}</button></span>\n</div>` }]
  },
  {
    id: 'rating',
    ad: 'Puanlama',
    name: 'Rating',
    grup: 'secim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir hizmeti 1 ile 5 arasında puanlar. Beş seçenek düğmesi, yıldız görünümünde.',
    neZaman: ['Hizmet sonunda memnuniyet sorusu için kullanın.', 'Puanı zorunlu yapmayın. Kullanıcı atlayabilir.'],
    erisilebilirlik: ['Beş `radio` ve bir `legend`. Ekran okuyucu "5 üzerinden 3" okur.', 'Klavye ile ok tuşları puanı değiştirir. Odak halkası yıldızda görünür.'],
    wcag: ['1.3.1', '2.1.1', '4.1.2'],
    kaynak: ['IT', 'IE'],
    ornekler: [{ baslik: 'Beş yıldız', html: `<fieldset class="kiris-puan">\n  <legend class="kiris-baslik-legend">Bu hizmetten ne kadar memnun kaldınız?</legend>\n  <div class="kiris-puan__yildizlar">\n    <input class="kiris-gorsel-gizli" type="radio" name="puan" id="puan-5" value="5"><label for="puan-5"><svg class="kiris-simge kiris-puan__bos" aria-hidden="true"><use href="#kiris-star"/></svg><svg class="kiris-simge kiris-puan__dolu" aria-hidden="true"><use href="#kiris-star2"/></svg><span class="kiris-gorsel-gizli">5 üzerinden 5</span></label>\n    <input class="kiris-gorsel-gizli" type="radio" name="puan" id="puan-4" value="4" checked><label for="puan-4"><svg class="kiris-simge kiris-puan__bos" aria-hidden="true"><use href="#kiris-star"/></svg><svg class="kiris-simge kiris-puan__dolu" aria-hidden="true"><use href="#kiris-star2"/></svg><span class="kiris-gorsel-gizli">5 üzerinden 4</span></label>\n    <input class="kiris-gorsel-gizli" type="radio" name="puan" id="puan-3" value="3"><label for="puan-3"><svg class="kiris-simge kiris-puan__bos" aria-hidden="true"><use href="#kiris-star"/></svg><svg class="kiris-simge kiris-puan__dolu" aria-hidden="true"><use href="#kiris-star2"/></svg><span class="kiris-gorsel-gizli">5 üzerinden 3</span></label>\n    <input class="kiris-gorsel-gizli" type="radio" name="puan" id="puan-2" value="2"><label for="puan-2"><svg class="kiris-simge kiris-puan__bos" aria-hidden="true"><use href="#kiris-star"/></svg><svg class="kiris-simge kiris-puan__dolu" aria-hidden="true"><use href="#kiris-star2"/></svg><span class="kiris-gorsel-gizli">5 üzerinden 2</span></label>\n    <input class="kiris-gorsel-gizli" type="radio" name="puan" id="puan-1" value="1"><label for="puan-1"><svg class="kiris-simge kiris-puan__bos" aria-hidden="true"><use href="#kiris-star"/></svg><svg class="kiris-simge kiris-puan__dolu" aria-hidden="true"><use href="#kiris-star2"/></svg><span class="kiris-gorsel-gizli">5 üzerinden 1</span></label>\n  </div>\n</fieldset>` }]
  },
  {
    id: 'segmented-control',
    ad: 'Bölümlü seçim',
    name: 'Segmented control',
    grup: 'secim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'İki ile dört seçenek, yan yana ve tek satırda. Görünüm veya sıralama seçmek için.',
    neZaman: ['Liste ve harita gibi iki görünüm arasında geçiş için kullanın.', 'Beş üstü seçenek için seçenek düğmesi veya açılır liste kullanın.'],
    erisilebilirlik: ['Seçenek düğmesi kalıbıdır: `radio` ve `label`. Ok tuşları gezer.', 'Seçili olan yalnız renkle değil, kalın metinle de belli olur.'],
    wcag: ['1.4.1', '4.1.2'],
    kaynak: ['NO', 'FR'],
    ornekler: [{ baslik: 'Üç seçenek', html: '<fieldset class="kiris-bolumlu">\n  <legend class="kiris-gorsel-gizli">Görünüm</legend>\n  <input class="kiris-gorsel-gizli" type="radio" name="gorunum" id="gorunum-1" value="liste" checked><label for="gorunum-1">Liste</label>\n  <input class="kiris-gorsel-gizli" type="radio" name="gorunum" id="gorunum-2" value="harita"><label for="gorunum-2">Harita</label>\n  <input class="kiris-gorsel-gizli" type="radio" name="gorunum" id="gorunum-3" value="takvim"><label for="gorunum-3">Takvim</label>\n</fieldset>' }]
  },

  // ------------------------------------------------------------ betikli parçalar
  {
    id: 'popover',
    ad: 'Açılır bilgi',
    name: 'Popover',
    grup: 'geri-bildirim',
    durum: { css: 'stable', js: 'aç ve kapat', react: 'stable', vue: 'stable' },
    ozet: 'Bir düğmeye basınca açılan küçük panel. İpucundan farkı: dokunmayla çalışır ve bağlantı taşıyabilir.',
    neZaman: ['Bir alanın yanında "Bu nedir?" sorusu için kullanın.', 'Uzun metin için kullanmayın. Ayrıntılar bileşeni vardır.'],
    erisilebilirlik: ['Düğme `aria-expanded` ve `aria-controls` taşır. Panel açılınca odak düğmede kalır.', 'Escape, dışarı tıklama ve kapat düğmesi kapatır. Panel `aria-live="polite"` ile duyurulur.'],
    wcag: ['1.4.13', '4.1.2'],
    kaynak: ['NO', 'IE', 'IT', 'NL', 'CH'],
    ornekler: [{ baslik: 'Alan yanında', html: `<div class="kiris-acilir-bilgi" data-kiris="acilir-bilgi">\n  <button class="kiris-acilir-bilgi__dugme" type="button" aria-expanded="false" aria-controls="ab-1">${s('question23')}<span class="kiris-gorsel-gizli">Vergi kimlik numarası nedir?</span></button>\n  <div class="kiris-acilir-bilgi__panel" id="ab-1" role="region" aria-live="polite" hidden>\n    <p class="kiris-govde">10 haneli numara. Vergi levhanızda ve <a class="kiris-link" href="#">Dijital Vergi Dairesi</a>’nde yazar.</p>\n    <button class="kiris-button kiris-button--ikincil kiris-button--kucuk" type="button" data-kiris-kapat>Kapat</button>\n  </div>\n</div>` }]
  },
  {
    id: 'drawer',
    ad: 'Yan panel',
    name: 'Drawer',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'aç ve kapat', react: 'stable', vue: 'stable' },
    ozet: 'Kenardan kayan panel. Yardım metni, süzgeçler veya telefonda alt sayfa için. Altta açılan hali alt sayfadır.',
    neZaman: ['Süzgeç formu ve yardım paneli için kullanın.', 'Onay istemek için kip pencere kullanın.'],
    erisilebilirlik: ['Yerel `<dialog>` ile açılır. Odak panele geçer, Escape kapatır, arka plan kilitlenir.', 'Başlık `aria-labelledby` ile panele bağlanır. Kapat düğmesi ilk odaktır.'],
    wcag: ['2.1.2', '2.4.3', '4.1.2'],
    kaynak: ['NL', 'JP', 'IE', 'KR'],
    ornekler: [{ baslik: 'Sağdan ve alttan', html: `<div data-kiris="yan-panel">\n  <button class="kiris-button kiris-button--ikincil" type="button" data-kiris-panel-ac>Süzgeçleri aç</button>\n  <dialog class="kiris-yan-panel" aria-labelledby="yp-baslik">\n    <div class="kiris-yan-panel__ust"><h2 class="kiris-yan-panel__baslik" id="yp-baslik">Süzgeçler</h2><button class="kiris-button kiris-button--ikincil kiris-button--simge" type="button" aria-label="Paneli kapat" data-kiris-kapat>${s('close')}</button></div>\n    <div class="kiris-yan-panel__govde"><div class="kiris-alan"><label class="kiris-etiket" for="yp-il">İl</label><select class="kiris-secim" id="yp-il"><option>Ankara</option><option>İstanbul</option></select></div></div>\n    <div class="kiris-yan-panel__alt"><button class="kiris-button" type="button" data-kiris-kapat>Uygula</button></div>\n  </dialog>\n</div>\n<div data-kiris="yan-panel" class="kiris-u-ust-4">\n  <button class="kiris-button kiris-button--ikincil" type="button" data-kiris-panel-ac>Alt sayfayı aç</button>\n  <dialog class="kiris-yan-panel kiris-yan-panel--alt" aria-labelledby="as-baslik">\n    <div class="kiris-yan-panel__ust"><h2 class="kiris-yan-panel__baslik" id="as-baslik">Paylaş</h2><button class="kiris-button kiris-button--ikincil kiris-button--simge" type="button" aria-label="Kapat" data-kiris-kapat>${s('close')}</button></div>\n    <div class="kiris-yan-panel__govde"><ul class="kiris-liste kiris-liste--sade"><li><a class="kiris-link" href="#">Bağlantıyı kopyala</a></li><li><a class="kiris-link" href="#">E-posta ile gönder</a></li></ul></div>\n  </dialog>\n</div>` }, { baslik: 'Yardım paneli', html: `<div data-kiris="yan-panel">\n  <button class="kiris-button kiris-button--ikincil" type="button" data-kiris-panel-ac>${s('question23')} Yardım</button>\n  <dialog class="kiris-yan-panel kiris-yan-panel--sol" aria-labelledby="yardim-baslik">\n    <div class="kiris-yan-panel__ust"><h2 class="kiris-yan-panel__baslik" id="yardim-baslik">Bu sayfa hakkında</h2><button class="kiris-button kiris-button--ikincil kiris-button--simge" type="button" aria-label="Yardımı kapat" data-kiris-kapat>${s('close')}</button></div>\n    <div class="kiris-yan-panel__govde"><dl class="kiris-tanim"><div class="kiris-tanim__satir"><dt>Prim günü</dt><dd>Sigortalı çalıştığınız her gün için bir prim günü işlenir.</dd></div><div class="kiris-tanim__satir"><dt>Hizmet dökümü</dt><dd>Bütün işverenleriniz ve prim günleriniz.</dd></div></dl><p class="kiris-govde">Daha fazlası için <a class="kiris-link" href="#">Alo 170</a>.</p></div>\n  </dialog>\n</div>` }]
  },
  {
    id: 'action-menu',
    ad: 'Eylem menüsü',
    name: 'Action menu',
    grup: 'eylem',
    durum: { css: 'stable', js: 'klavye desteği', react: 'stable', vue: 'stable' },
    ozet: 'Bir düğmenin altında açılan eylem listesi. Düzenle, indir, sil.',
    neZaman: ['Bir kayıt için üç ile altı eylem varsa kullanın.', 'Sayfa gezinmesi için kullanmayın. O menü başlık çubuğundadır.'],
    erisilebilirlik: ['`aria-haspopup="menu"`, `role="menu"` ve `role="menuitem"`. Ok tuşları gezer, Home ve End uçlara gider, Escape kapatır.', 'Yıkıcı eylem en altta ve kırmızı durur.'],
    wcag: ['2.1.1', '4.1.2'],
    kaynak: ['NO', 'DK', 'FI', 'IT', 'FR', 'JP'],
    ornekler: [{ baslik: 'Kayıt eylemleri', html: `<div class="kiris-eylem-menusu" data-kiris="eylem-menusu">\n  <button class="kiris-button kiris-button--ikincil" type="button" id="em-1-dugme" aria-haspopup="menu" aria-expanded="false" aria-controls="em-1">Eylemler ${s('tool-down')}</button>\n  <div class="kiris-eylem-menusu__liste" id="em-1" role="menu" aria-labelledby="em-1-dugme" hidden>\n    <button class="kiris-eylem-menusu__oge" role="menuitem" type="button">${s('tool-edit')} Düzenle</button>\n    <button class="kiris-eylem-menusu__oge" role="menuitem" type="button">${s('tool-down')} İndir</button>\n    <button class="kiris-eylem-menusu__oge" role="menuitem" type="button">${s('tool-print')} Yazdır</button>\n    <button class="kiris-eylem-menusu__oge kiris-eylem-menusu__oge--tehlike" role="menuitem" type="button">${s('close')} Sil</button>\n  </div>\n</div>` }]
  },
  {
    id: 'back-to-top',
    ad: 'Başa dön',
    name: 'Back to top',
    grup: 'gezinme',
    durum: { css: 'stable', js: 'görünürlük', react: 'stable', vue: 'stable' },
    ozet: 'Uzun sayfada iki ekran aşağı inince beliren bağlantı. Başa kaydırır ve odağı ana içeriğe verir.',
    neZaman: ['Üç ekrandan uzun sayfalarda kullanın.', 'Form adımlarında kullanmayın. Adımlar kısa olur.'],
    erisilebilirlik: ['Bir bağlantıdır, `#ana-icerik` hedefine gider. Betik yoksa da çalışır.', 'Hareket azaltma isteyen kullanıcıda kaydırma anlıktır.'],
    wcag: ['2.4.1', '2.3.3'],
    kaynak: ['IT', 'JP', 'DK', 'FR', 'CH'],
    ornekler: [{ baslik: 'Temel', html: `<a class="kiris-basa-don" href="#ana-icerik" data-kiris="basa-don" data-hep-goster>${s('tool-back')}<span>Başa dön</span></a>` }]
  },
  {
    id: 'cookie-banner',
    tamGenislik: true,
    ad: 'Çerez bildirimi',
    name: 'Cookie banner',
    grup: 'kimlik',
    durum: { css: 'stable', js: 'tercih saklama', react: 'stable', vue: 'stable' },
    ozet: 'İsteğe bağlı çerezler için izin ister. Kabul ve ret eşit büyüklüktedir. Tercih saklanır.',
    neZaman: ['Zorunlu olmayan bir çerez varsa her sitede kullanın. 5651 sayılı Kanun ve KVKK gereğidir.', 'Yalnız zorunlu çerez varsa kullanmayın. Çerez sayfasına bağlantı yeter.'],
    erisilebilirlik: ['Afiş sayfanın en başındadır ve `role="region"` ile adlandırılır. Odağı çalmaz.', 'Ret, kabul kadar kolaydır. Karanlık kalıp yoktur. Seçimden sonra afiş bir onay cümlesine döner.'],
    wcag: ['1.3.1', '2.4.3', '3.2.2'],
    kaynak: ['UK', 'FR', 'DK', 'BR', 'CH', 'IT'],
    ornekler: [{ baslik: 'Temel', html: '<div class="kiris-cerez" role="region" aria-label="Çerez tercihi" data-kiris="cerez" data-hep-goster>\n  <div class="kiris-kap">\n    <div class="kiris-cerez__soru">\n      <h2 class="kiris-cerez__baslik">Bu sitede çerez kullanıyoruz</h2>\n      <p class="kiris-govde">Zorunlu çerezler siteyi çalıştırır. İsteğe bağlı çerezler kullanımı ölçer ve hizmeti iyileştirir.</p>\n      <div class="kiris-button-grubu"><button class="kiris-button" type="button" data-cerez="kabul">İsteğe bağlı çerezleri kabul et</button><button class="kiris-button" type="button" data-cerez="ret">İsteğe bağlı çerezleri reddet</button><a class="kiris-link" href="#">Çerezleri görüntüle</a></div>\n    </div>\n    <div class="kiris-cerez__onay" hidden>\n      <p class="kiris-govde"><span data-cerez-metin></span> Tercihinizi <a class="kiris-link" href="#">çerez sayfasından</a> değiştirebilirsiniz.</p>\n      <button class="kiris-button kiris-button--ikincil" type="button" data-cerez-gizle>Mesajı gizle</button>\n    </div>\n  </div>\n</div>' }]
  },
  {
    id: 'exit-this-page',
    ad: 'Sayfadan çık',
    name: 'Exit this page',
    grup: 'eylem',
    durum: { css: 'stable', js: 'hızlı çıkış', react: 'stable', vue: 'stable' },
    ozet: 'Şiddet ve istismar konulu sayfalarda kullanıcının sayfayı bir dokunuşla terk etmesini sağlar.',
    neZaman: ['Aile içi şiddet, KADES ve benzeri hizmet sayfalarında kullanın.', 'Başka hiçbir sayfada kullanmayın.'],
    erisilebilirlik: ['Düğme sayfanın sağ üstünde, kaydırınca da yerinde kalır. Shift tuşuna üç kez basmak da çıkarır.', 'Hedef zararsız bir sayfadır. Yeni sekme açılır ve bu sayfa geçmişte değiştirilir.'],
    wcag: ['2.1.1', '2.4.3'],
    kaynak: ['UK'],
    ornekler: [{ baslik: 'Temel', html: '<div class="kiris-cikis" data-kiris="cikis">\n  <a class="kiris-cikis__dugme" href="https://www.mgm.gov.tr" rel="nofollow noreferrer"><span class="kiris-cikis__ust">Acil</span> Sayfadan çık</a>\n  <p class="kiris-gorsel-gizli" data-kiris-durum aria-live="polite"></p>\n</div>\n<p class="kiris-yardim kiris-u-ust-2">Shift tuşuna üç kez basmak da sayfadan çıkarır.</p>' }]
  },
  {
    id: 'sortable-table',
    ad: 'Sıralanabilir tablo',
    name: 'Sortable table',
    grup: 'icerik',
    durum: { css: 'stable', js: 'sütun sıralama', react: 'stable', vue: 'stable' },
    ozet: 'Başlığa basınca sütuna göre sıralanan tablo. Sayı sütunları sayı olarak sıralanır.',
    neZaman: ['10 satırdan uzun veri tablosunda kullanın.', 'Sunucudan sayfalanan veride sıralamayı sunucu yapar. Bu bileşen sayfadaki satırları sıralar.'],
    erisilebilirlik: ['Başlıklar `aria-sort` taşır ve düğmedir. Sıralama sonucu canlı bölgeden duyurulur.', 'Sıralama yönü ok simgesiyle ve metinle belli olur.'],
    wcag: ['1.3.1', '4.1.3'],
    kaynak: ['IE', 'JP'],
    ornekler: [{ baslik: 'Üç sütun', html: `<div class="kiris-tablo-kap">\n  <table class="kiris-tablo kiris-tablo--siralanabilir" data-kiris="sirala">\n    <caption>Sosyal güvenlik il müdürlükleri</caption>\n    <thead><tr><th scope="col" aria-sort="none"><button type="button">İl ${s('sort-up-down')}</button></th><th scope="col" aria-sort="none"><button type="button">Merkez sayısı ${s('sort-up-down')}</button></th><th scope="col" aria-sort="none"><button type="button">Çalışan ${s('sort-up-down')}</button></th></tr></thead>\n    <tbody><tr><td>İzmir</td><td>28</td><td>1.940</td></tr><tr><td>Ankara</td><td>31</td><td>2.310</td></tr><tr><td>Çanakkale</td><td>7</td><td>312</td></tr><tr><td>İstanbul</td><td>52</td><td>4.120</td></tr></tbody>\n  </table>\n</div>` }]
  },
  {
    id: 'range',
    ad: 'Aralık seçici',
    name: 'Range slider',
    grup: 'form',
    durum: { css: 'stable', js: 'değer gösterimi', react: 'stable', vue: 'stable' },
    ozet: 'Bir aralıktan yaklaşık bir sayı seçtirir. Seçilen değer her zaman yazıyla görünür.',
    neZaman: ['Kesin sayı gerekmeyen yerde kullanın: yarıçap, bütçe aralığı.', 'Kesin sayı için sayı girişi kullanın.'],
    erisilebilirlik: ['Yerel `<input type="range">`. Ok tuşları değeri değiştirir. Değer `<output>` ile bağlıdır.', 'Uçlar yazıyla belirtilir. Yalnız kaydırıcı yeterli değildir.'],
    wcag: ['1.3.1', '4.1.2'],
    kaynak: ['US', 'FR', 'NL', 'KR'],
    ornekler: [{ baslik: 'Temel', html: '<div class="kiris-alan kiris-aralik" data-kiris="aralik" data-birim=" km">\n  <label class="kiris-etiket" for="uzaklik">En çok uzaklık</label>\n  <p class="kiris-yardim" id="uzaklik-yardim">1 ile 50 kilometre arası.</p>\n  <div class="kiris-aralik__satir"><input class="kiris-aralik__girdi" id="uzaklik" name="uzaklik" type="range" min="1" max="50" step="1" value="10" aria-describedby="uzaklik-yardim"><output class="kiris-aralik__deger" for="uzaklik">10 km</output></div>\n  <div class="kiris-aralik__uclar" aria-hidden="true"><span>1 km</span><span>50 km</span></div>\n</div>' }]
  },
  {
    id: 'quantity',
    ad: 'Adet seçici',
    name: 'Quantity stepper',
    grup: 'form',
    durum: { css: 'stable', js: 'artır, azalt', react: 'stable', vue: 'stable' },
    ozet: 'Eksi ve artı düğmeli sayı alanı. Küçük sayılar için: bilet, kişi, adet.',
    neZaman: ['1 ile 20 arası bir adet için kullanın.', 'Büyük sayılar için sayı girişi kullanın.'],
    erisilebilirlik: ['Alan yazılabilir. Düğmeler `aria-label` taşır: "Bir azalt", "Bir artır".', 'Sınırda düğme devre dışı kalır. Değer `aria-live` ile duyurulmaz, alan zaten odaktadır.'],
    wcag: ['2.1.1', '4.1.2'],
    kaynak: ['KR', 'IT'],
    ornekler: [{ baslik: 'Temel', html: `<div class="kiris-alan" data-kiris="adet">\n  <label class="kiris-etiket" for="kisi-sayisi">Kişi sayısı</label>\n  <div class="kiris-adet"><button class="kiris-adet__dugme" type="button" data-adet="eksi" aria-label="Bir azalt">−</button><input class="kiris-girdi kiris-adet__girdi" id="kisi-sayisi" name="kisi" type="text" inputmode="numeric" value="2" min="1" max="8"><button class="kiris-adet__dugme" type="button" data-adet="arti" aria-label="Bir artır">+</button></div>\n</div>` }]
  },
  {
    id: 'print',
    ad: 'Yazdır',
    name: 'Print button',
    grup: 'eylem',
    durum: { css: 'stable', js: 'yazdırma', react: 'stable', vue: 'stable' },
    ozet: 'Tarayıcının yazdırma penceresini açan düğme. Onay sayfasında ve belgelerde.',
    neZaman: ['Onay sayfasında ve resmî belge görüntüleyen sayfada kullanın.'],
    erisilebilirlik: ['Bir düğmedir, bağlantı değil. Betik yoksa görünmez.', 'Yazdırma stili başlık çubuğunu ve menüyü gizler, içeriği tam genişlikte basar.'],
    wcag: ['4.1.2'],
    kaynak: ['CH'],
    ornekler: [{ baslik: 'Temel', html: `<button class="kiris-button kiris-button--ikincil" type="button" data-kiris="yazdir">${s('tool-print')} Bu sayfayı yazdır</button>` }]
  },
  {
    id: 'input-mask',
    ad: 'Girdi maskesi',
    name: 'Input mask',
    grup: 'form',
    durum: { css: 'stable', js: 'biçimlendirme', react: 'stable', vue: 'stable' },
    ozet: 'Yazarken boşluk ve ayraçları kendisi koyar. Kart numarası, referans numarası.',
    neZaman: ['Sabit biçimli bir kod için kullanın. Kalıp `#` ile rakam yerini gösterir.', 'T.C. kimlik, IBAN, telefon ve plaka için kendi bileşenlerini kullanın. Onlar doğrular da.'],
    erisilebilirlik: ['Yardım metni biçimi örnekle söyler. Maske betik yoksa da alan çalışır.', 'Sunucu ham rakamları alır. Kullanıcı boşluklu yazsa da hata almaz.'],
    wcag: ['3.3.2', '3.3.3'],
    kaynak: ['US'],
    ornekler: [{ baslik: 'Referans numarası', html: '<div class="kiris-alan">\n  <label class="kiris-etiket" for="ref">Başvuru referans numarası</label>\n  <p class="kiris-yardim" id="ref-yardim">12 hane. Örnek: 2026 0450 1234</p>\n  <input class="kiris-girdi kiris-girdi--20" id="ref" name="ref" type="text" inputmode="numeric" maxlength="14" data-kiris="maske" data-maske="#### #### ####" aria-describedby="ref-yardim">\n</div>' }]
  },

  // --------------------------------------------------------------- üçüncü parti
  {
    id: 'date-picker',
    ad: 'Takvim',
    name: 'Date picker',
    grup: 'form',
    durum: { css: 'stable', js: 'ay ızgarası ve klavye', react: 'stable', vue: 'stable' },
    ozet: 'Tarih alanının yanında bir takvim düğmesi. Alan yazılabilir kalır, takvim yardımcıdır.',
    neZaman: ['Kullanıcının bilmediği bir tarihi seçtirirken kullanın: randevu, gelecek bir gün.', 'Doğum tarihi gibi bilinen tarih için tarih girişi kullanın. Yazmak daha hızlıdır.'],
    erisilebilirlik: ['Alan tek başına çalışır. Takvim betik ile gelir ve `aria-expanded` taşıyan bir düğme ile açılır.', 'Izgara `role="grid"`. Ok tuşları gün, Page Up ve Page Down ay, Shift ile yıl değiştirir. Enter seçer, Escape kapatır.', 'Ay ve yıl listesi başlıkta durur. Uzun geçmişe giden bir tarih için ok düğmesi yetmez.', 'Her gün düğmesi tam tarihi söyler: "14 Eylül 2026 Pazartesi". Bugün ve seçili gün yalnız renkle değil, kalın ve çerçeve ile belli olur.'],
    wcag: ['1.3.1', '2.1.1', '4.1.2'],
    kaynak: ['NL', 'IT', 'JP', 'DK', 'NO', 'FI', 'US', 'BR', 'KR', 'CH'],
    ornekler: [{ baslik: 'Randevu tarihi', html: `<div class="kiris-alan kiris-takvim" data-kiris="takvim" data-en-az="2026-09-07" data-en-cok="2026-12-31">\n  <label class="kiris-etiket" for="randevu">Randevu tarihi</label>\n  <p class="kiris-yardim" id="randevu-yardim">GG.AA.YYYY. Örnek: 14.09.2026</p>\n  <div class="kiris-takvim__satir">\n    <input class="kiris-girdi kiris-girdi--10" id="randevu" name="randevu" type="text" inputmode="numeric" autocomplete="off" aria-describedby="randevu-yardim">\n    <button class="kiris-button kiris-button--ikincil kiris-takvim__ac" type="button" aria-expanded="false" aria-label="Takvimi aç">${s('date')}</button>\n  </div>\n  <div class="kiris-takvim__panel" role="dialog" aria-label="Takvim" hidden></div>\n</div>` },
      {
        baslik: 'Geçmiş bir tarih',
        aciklama: 'Yıl listesi 120 yıl geriye gider. Ay ve yıl tek tıklamayla değişir.',
        html: `<div class="kiris-alan kiris-takvim" data-kiris="takvim" data-en-cok="2026-09-07">\n  <label class="kiris-etiket" for="belge-tarih">Belge tarihi</label>\n  <p class="kiris-yardim" id="belge-tarih-yardim">GG.AA.YYYY. Örnek: 12.03.1998</p>\n  <div class="kiris-takvim__satir">\n    <input class="kiris-girdi kiris-girdi--10" id="belge-tarih" name="belge_tarih" type="text" inputmode="numeric" autocomplete="off" aria-describedby="belge-tarih-yardim">\n    <button class="kiris-button kiris-button--ikincil kiris-takvim__ac" type="button" aria-expanded="false" aria-label="Takvimi aç">${s('date')}</button>\n  </div>\n  <div class="kiris-takvim__panel" role="dialog" aria-label="Takvim" hidden></div>\n</div>`
      }]
  },
  {
    id: 'multi-select',
    ad: 'Çoklu seçim',
    name: 'Multi-select',
    grup: 'secim',
    durum: { css: 'stable', js: 'süzme, seçim etiketi', react: 'stable', vue: 'stable' },
    ozet: 'Uzun bir listeden birden çok seçim. Yazarak süzülür, seçilenler etiket olur.',
    neZaman: ['Seçenek sayısı 10 üstündeyse ve birden çok seçim gerekiyorsa kullanın.', 'Seçenek 10 altındaysa onay kutusu kullanın.'],
    erisilebilirlik: ['ARIA 1.2 combobox ve `aria-multiselectable` liste. Enter seçer ve kaldırır, Backspace son etiketi kaldırır.', 'Yerel bir `<select multiple>` formu taşır. Betik yoksa yalnız o görünür ve tek başına çalışır. Betik onu gizler ve zenginleştirilmiş alanı açar.', 'Seçilenler canlı bölgeden duyurulur.'],
    wcag: ['1.3.1', '4.1.2', '4.1.3'],
    kaynak: ['FI', 'IE', 'FR', 'CH'],
    ornekler: [{ baslik: 'İller', html: '<div class="kiris-alan kiris-coklu" data-kiris="coklu-secim">\n  <label class="kiris-etiket" for="iller" id="iller-etiket">Hizmet verilen iller</label>\n  <p class="kiris-yardim" id="iller-yardim">Yazın ve listeden seçin. Birden çok il seçebilirsiniz.</p>\n  <div class="kiris-coklu__secilenler" aria-label="Seçilen iller" hidden></div>\n  <input class="kiris-girdi" id="iller" type="text" role="combobox" hidden aria-autocomplete="list" aria-expanded="false" aria-controls="iller-liste" aria-describedby="iller-yardim" autocomplete="off">\n  <div class="kiris-coklu__liste" id="iller-liste" role="listbox" aria-multiselectable="true" aria-label="İller" hidden>\n    <div class="kiris-coklu__oge" role="option" id="il-06" data-deger="06" aria-selected="true">Ankara</div><div class="kiris-coklu__oge" role="option" id="il-34" data-deger="34" aria-selected="false">İstanbul</div><div class="kiris-coklu__oge" role="option" id="il-35" data-deger="35" aria-selected="false">İzmir</div><div class="kiris-coklu__oge" role="option" id="il-16" data-deger="16" aria-selected="false">Bursa</div><div class="kiris-coklu__oge" role="option" id="il-07" data-deger="07" aria-selected="false">Antalya</div><div class="kiris-coklu__oge" role="option" id="il-42" data-deger="42" aria-selected="false">Konya</div><div class="kiris-coklu__oge" role="option" id="il-01" data-deger="01" aria-selected="false">Adana</div><div class="kiris-coklu__oge" role="option" id="il-27" data-deger="27" aria-selected="false">Gaziantep</div>\n  </div>\n  <p class="kiris-gorsel-gizli" data-kiris-durum aria-live="polite"></p>\n  <select class="kiris-secim kiris-coklu__yerel" id="iller-yerel" name="iller" multiple aria-labelledby="iller-etiket"><option value="06" selected>Ankara</option><option value="34">İstanbul</option><option value="35">İzmir</option><option value="16">Bursa</option><option value="07">Antalya</option><option value="42">Konya</option><option value="01">Adana</option><option value="27">Gaziantep</option></select>\n</div>' }]
  },
  {
    id: 'mega-menu',
    tamGenislik: true,
    ad: 'Geniş menü',
    name: 'Mega menu',
    grup: 'gezinme',
    durum: { css: 'stable', js: 'aç ve kapat', react: 'stable', vue: 'stable' },
    ozet: 'Başlık çubuğunun altında, her ana konu için tam genişlikte bir bağlantı paneli. Bir kerede bir panel açık.',
    neZaman: ['Kurumun 30 üstü hizmeti ve dört ile altı ana konusu varsa kullanın.', 'Bir hizmetin içinde kullanmayın. Orada hizmet gezinmesi vardır.'],
    erisilebilirlik: ['Her konu bir düğmedir: `aria-expanded` ve `aria-controls`. Escape paneli kapatır ve odağı düğmeye verir.', 'Panel bağlantıları sütun başlıkları ile gruplanır. Sütun sayısı üçü geçmez, sütun başına bağlantı sekizi geçmez.', 'Dar ekranda paneller alt alta açılır.'],
    wcag: ['2.1.1', '2.4.3', '4.1.2'],
    kaynak: ['IT', 'JP', 'CA'],
    ornekler: [{ baslik: 'İki konu', html: '<nav class="kiris-genis-menu" aria-label="Ana konular" data-kiris="genis-menu">\n  <div class="kiris-kap kiris-genis-menu__ic">\n    <button class="kiris-genis-menu__dugme" type="button" aria-expanded="false" aria-controls="gm-calisan">Çalışan</button>\n    <button class="kiris-genis-menu__dugme" type="button" aria-expanded="false" aria-controls="gm-emekli">Emekli</button>\n    <a class="kiris-genis-menu__dugme" href="#">İletişim</a>\n  </div>\n  <div class="kiris-genis-menu__panel" id="gm-calisan" hidden>\n    <div class="kiris-kap kiris-genis-menu__sutunlar">\n      <div><p class="kiris-genis-menu__baslik">Sigortalılık</p><ul class="kiris-genis-menu__liste"><li><a href="#">Hizmet dökümü</a></li><li><a href="#">İşe giriş bildirgesi</a></li><li><a href="#">4A, 4B, 4C</a></li></ul></div>\n      <div><p class="kiris-genis-menu__baslik">Sağlık</p><ul class="kiris-genis-menu__liste"><li><a href="#">Provizyon sorgulama</a></li><li><a href="#">Rapor işlemleri</a></li></ul></div>\n      <div><p class="kiris-genis-menu__baslik">Ödemeler</p><ul class="kiris-genis-menu__liste"><li><a href="#">Geçici iş göremezlik</a></li><li><a href="#">Emzirme ödeneği</a></li></ul></div>\n    </div>\n  </div>\n  <div class="kiris-genis-menu__panel" id="gm-emekli" hidden>\n    <div class="kiris-kap kiris-genis-menu__sutunlar">\n      <div><p class="kiris-genis-menu__baslik">Aylık</p><ul class="kiris-genis-menu__liste"><li><a href="#">Ne zaman emekli olurum?</a></li><li><a href="#">Maaş bilgisi</a></li><li><a href="#">Bayram ikramiyesi</a></li></ul></div>\n      <div><p class="kiris-genis-menu__baslik">Başvuru</p><ul class="kiris-genis-menu__liste"><li><a href="#">Yaşlılık aylığı</a></li><li><a href="#">Ölüm aylığı</a></li></ul></div>\n    </div>\n  </div>\n</nav>' }]
  },
  {
    id: 'carousel',
    ad: 'Kayan pano',
    name: 'Carousel',
    grup: 'yerlesim',
    durum: { css: 'stable', js: 'düğmeler ve noktalar', react: 'stable', vue: 'stable' },
    ozet: 'Yan yana kartlardan bir şerit. Kendiliğinden dönmez. Düğmeler bir kart kaydırır.',
    neZaman: ['Eşit önemde üç ile altı tanıtım için kullanın. Ana mesaj için karşılama bloğu vardır.', 'Kendiliğinden döndürmeyin. Zorunluysa 5 saniye altına inmeyin ve bir durdur düğmesi koyun.', 'Kullanıcıların çoğu ikinci slaytı görmez. Önemli içeriği kaydırmaya saklamayın.'],
    erisilebilirlik: ['Her slayt `role="group"` ve "1 / 5" etiketi taşır. Şerit klavye ile de kayar.', 'Hareket azaltma isteyen kullanıcıda kayma anlıktır ve kendiliğinden dönme kapalıdır.', 'İşaretçi veya odak şeritteyken dönme durur.'],
    wcag: ['2.2.2', '2.3.3', '4.1.2'],
    kaynak: ['IT', 'JP', 'BR', 'KR', 'CH'],
    ornekler: [{ baslik: 'Üç kart', html: `<div class="kiris-kayan-pano" data-kiris="kayan-pano">\n  <div class="kiris-kayan-pano__ust"><p class="kiris-gorsel-gizli" data-kiris-durum aria-live="polite"></p><div class="kiris-kayan-pano__dugmeler"><button class="kiris-button kiris-button--ikincil kiris-button--simge" type="button" data-yon="geri" aria-label="Önceki">${s('arrow-left')}</button><button class="kiris-button kiris-button--ikincil kiris-button--simge" type="button" data-yon="ileri" aria-label="Sonraki">${s('arrow-right')}</button><button class="kiris-button kiris-button--ikincil kiris-button--kucuk" type="button" data-durdur aria-pressed="false">Durdur</button></div></div>\n  <ul class="kiris-kayan-pano__serit">\n    <li class="kiris-kayan-pano__slayt" tabindex="-1"><div class="kiris-kart"><h3 class="kiris-kart__baslik">Annelik Yolculuğu</h3><p class="kiris-kart__ozet">Gebelikten doğuma kadar her adımda rehber.</p><p class="kiris-kart__alt"><a class="kiris-link" href="#">Detaylı bilgi</a></p></div></li>\n    <li class="kiris-kayan-pano__slayt" tabindex="-1"><div class="kiris-kart"><h3 class="kiris-kart__baslik">Şehir Hastanelerimiz</h3><p class="kiris-kart__ozet">23 şehir hastanesi, 34 bin yatak.</p><p class="kiris-kart__alt"><a class="kiris-link" href="#">Detaylı bilgi</a></p></div></li>\n    <li class="kiris-kayan-pano__slayt" tabindex="-1"><div class="kiris-kart"><h3 class="kiris-kart__baslik">e-Nabız</h3><p class="kiris-kart__ozet">Kişisel sağlık sistemi.</p><p class="kiris-kart__alt"><a class="kiris-link" href="#">Detaylı bilgi</a></p></div></li>\n    <li class="kiris-kayan-pano__slayt" tabindex="-1"><div class="kiris-kart"><h3 class="kiris-kart__baslik">Alo 171</h3><p class="kiris-kart__ozet">Arayanların 135 bini sigarayı bıraktı.</p><p class="kiris-kart__alt"><a class="kiris-link" href="#">Detaylı bilgi</a></p></div></li>\n  </ul>\n  <div class="kiris-kayan-pano__noktalar" aria-label="Slaytlar"></div>\n</div>` }]
  },
  {
    id: 'coach-mark',
    ad: 'Yönlendirme',
    name: 'Coach mark',
    grup: 'geri-bildirim',
    durum: { css: 'stable', js: 'adımlar', react: 'stable', vue: 'stable' },
    ozet: 'İlk kullanımda sayfanın parçalarını sırayla tanıtır. Her adım bir hedefi halkalar ve yanında bir kutu açar.',
    neZaman: ['Yeni ve karmaşık bir ekranın ilk açılışında kullanın. Bir kere gösterin, atlanabilsin.', 'Basit bir formda kullanmayın. Yardım metni yeter.'],
    erisilebilirlik: ['Kutu `role="dialog"` taşır, odak içine geçer, Escape bitirir ve odak başlat düğmesine döner.', 'Her adım "Adım 2 / 3" der. Hedef halkası yalnız renk değildir, kalın bir çerçevedir.', 'Betik yoksa hedefler sıradan içerik olarak kalır.'],
    wcag: ['2.1.1', '2.4.3', '4.1.2'],
    kaynak: ['KR'],
    ornekler: [{ baslik: 'Üç adım', html: '<div data-kiris="yonlendirme">\n  <button class="kiris-button kiris-button--ikincil" type="button" data-yonlendirme-baslat>Sayfayı tanıt</button>\n  <div class="kiris-kart-izgara kiris-kart-izgara--3">\n    <div class="kiris-kart" data-yonlendirme-adim="1" data-yonlendirme-baslik="Başvurularınız" data-yonlendirme-metin="Açık ve biten başvurular burada durur."><h3 class="kiris-kart__baslik">Başvurularım</h3><p class="kiris-kart__ozet">2 açık başvuru</p></div>\n    <div class="kiris-kart" data-yonlendirme-adim="2" data-yonlendirme-baslik="Belgeleriniz" data-yonlendirme-metin="Yüklediğiniz her belge burada saklanır."><h3 class="kiris-kart__baslik">Belgelerim</h3><p class="kiris-kart__ozet">7 belge</p></div>\n    <div class="kiris-kart" data-yonlendirme-adim="3" data-yonlendirme-baslik="Mesajlar" data-yonlendirme-metin="Kurumdan gelen her yazı burada. E-posta ile de bildiririz."><h3 class="kiris-kart__baslik">Mesajlar</h3><p class="kiris-kart__ozet">1 yeni mesaj</p></div>\n  </div>\n</div>' }]
  }
];

/** Extra examples that widen an existing component. Merged by id. */
export const ekOrnekler = {
  button: [
    { baslik: 'Yalnız simge', html: `<div class="kiris-button-grubu">\n  <button class="kiris-button kiris-button--ikincil kiris-button--simge" type="button" aria-label="Yazdır">${s('tool-print')}</button>\n  <button class="kiris-button kiris-button--ikincil kiris-button--simge" type="button" aria-label="Düzenle">${s('tool-edit')}</button>\n  <button class="kiris-button kiris-button--tehlike kiris-button--simge" type="button" aria-label="Sil">${s('close')}</button>\n</div>` }
  ],
  'back-link': [
    { baslik: 'Geri ve ileri', html: '<nav class="kiris-geri-ileri" aria-label="Sayfa sırası">\n  <a class="kiris-geri" href="#">Önceki: Kişisel bilgiler</a>\n  <a class="kiris-ileri" href="#">Sonraki: Banka bilgileri</a>\n</nav>' }
  ],
  progress: [
    { baslik: 'Daire', html: '<div class="kiris-ilerleme-daire" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70" aria-label="Yükleme" style="--kiris-ilerleme: 70"><span class="kiris-ilerleme-daire__deger">%70</span></div>' }
  ],
  modal: [
    { baslik: 'Onay isteyen (alertdialog)', html: '<dialog class="kiris-kip" role="alertdialog" aria-labelledby="kip-sil-baslik" aria-describedby="kip-sil-metin" open>\n  <h2 class="kiris-kip__baslik" id="kip-sil-baslik">Başvuruyu silmek istiyor musunuz?</h2>\n  <p class="kiris-govde" id="kip-sil-metin">Bu işlem geri alınamaz. Yüklediğiniz 3 belge de silinir.</p>\n  <div class="kiris-button-grubu"><button class="kiris-button kiris-button--tehlike" type="button">Sil</button><button class="kiris-button kiris-button--ikincil" type="button">Vazgeç</button></div>\n</dialog>' }
  ],
  header: [
    { baslik: 'Oturum açık', html: `<header class="kiris-baslik-cubugu" data-kiris="baslik-cubugu">\n  <div class="kiris-kap kiris-baslik-cubugu__ic">\n    <a class="kiris-baslik-cubugu__marka" href="/"><img class="kiris-baslik-cubugu__arma" src="{{VARLIK}}turk-bayragi.svg" alt="" width="48" height="32"><span class="kiris-baslik-cubugu__ad">Sosyal Güvenlik Kurumu</span></a>\n    <div class="kiris-baslik-cubugu__oturum"><span class="kiris-avatar kiris-avatar--kucuk" aria-hidden="true">AY</span><span class="kiris-baslik-cubugu__kullanici">Ayşe Yılmaz</span><a class="kiris-baslik-cubugu__cikis" href="#">${s('logout')} Çıkış</a></div>\n    <button class="kiris-baslik-cubugu__menu-dugmesi" type="button" aria-expanded="false" aria-controls="ana-menu-3">Menü</button>\n    <nav class="kiris-baslik-cubugu__menu" id="ana-menu-3" aria-label="Ana menü"><a href="#">Başvurularım</a><a href="#">Belgelerim</a><a href="#">Mesajlar</a></nav>\n  </div>\n</header>` }
  ],
  utilities: [
    { baslik: 'Yapışkan', html: '<div class="kiris-u-yapiskan kiris-izgara-ornek">kiris-u-yapiskan · kaydırırken üstte kalır</div>' }
  ]
};
