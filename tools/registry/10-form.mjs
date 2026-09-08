// Kiriş component registry — form and action components.
// One source of truth. The documentation site, the component index, the
// integrations page and the README table are all generated from this file.

/** @type {import('./00-index.mjs').Bilesen[]} */
export const formBilesenleri = [
  {
    id: 'button',
    ad: 'Düğme',
    name: 'Button',
    grup: 'eylem',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcının bir işlemi başlatmasını sağlar. Her ekranda tek bir birincil düğme bulunur.',
    neZaman: [
      'Bir formu gönderirken birincil düğmeyi kullanın.',
      'Geri dönüş gibi ikincil işlemler için ikincil düğmeyi kullanın.',
      'Silme gibi geri alınamaz işlemler için tehlike düğmesini kullanın.',
      'Başka bir sayfaya götüren bir eylem için düğme değil bağlantı kullanın.'
    ],
    erisilebilirlik: [
      'Dokunma alanı en az 44 x 44 piksel olur.',
      'Odak halkası 3 piksel kalınlığında ve sarı renktedir. Odak halkasını kaldırmayın.',
      'Etiket metni eylemi anlatır. "Tıkla" veya "Gönder" yerine "Başvuruyu gönder" yazın.',
      'Devre dışı düğme yerine düğmeyi görünür tutun ve hata mesajı gösterin.'
    ],
    wcag: ['1.4.11', '2.4.7', '2.5.5', '2.5.8'],
    kaynak: ['UK', 'US', 'FR', 'IE', 'KR', 'JP', 'DK', 'DE', 'NO'],
    ornekler: [
      { baslik: 'Birincil', html: '<button class="kiris-button" type="button">Başvuruyu gönder</button>' },
      { baslik: 'İkincil', html: '<button class="kiris-button kiris-button--ikincil" type="button">Taslağı kaydet</button>' },
      { baslik: 'Tehlike', html: '<button class="kiris-button kiris-button--tehlike" type="button">Başvuruyu sil</button>' },
      { baslik: 'Düğme grubu', html: '<div class="kiris-button-grubu">\n  <button class="kiris-button" type="button">Devam et</button>\n  <button class="kiris-button kiris-button--ikincil" type="button">İptal</button>\n</div>' }
    ]
  },
  {
    id: 'link',
    ad: 'Bağlantı',
    name: 'Link',
    grup: 'eylem',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcıyı başka bir sayfaya veya aynı sayfadaki bir bölüme götürür.',
    neZaman: [
      'Gezinme için bağlantı kullanın. İşlem için düğme kullanın.',
      'Bağlantı metni hedefi anlatır. "Buraya tıklayın" yazmayın.',
      'Yeni sekmede açılan bir bağlantıyı metinde belirtin.'
    ],
    erisilebilirlik: [
      'Alt çizgi her zaman görünür. Rengi tek ayırt edici işaret olarak kullanmayın.',
      'Ziyaret edilmiş bağlantı ayrı bir renk alır.',
      'Dış bağlantı için hedefi metinde adlandırın.'
    ],
    wcag: ['1.4.1', '2.4.4', '2.4.7'],
    kaynak: ['US', 'FR', 'IE', 'KR', 'DK', 'DE', 'NO'],
    ornekler: [
      { baslik: 'Metin içi', html: '<p class="kiris-govde">Ayrıntılar için <a class="kiris-link" href="#">başvuru koşullarını okuyun</a>.</p>' },
      { baslik: 'Yeni sekme', html: '<a class="kiris-link" href="#" target="_blank" rel="noopener">Kılavuzu indirin (PDF, yeni sekmede açılır)</a>' }
    ]
  },
  {
    id: 'text-input',
    ad: 'Metin girişi',
    name: 'Text input',
    grup: 'form',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcının tek satırlık kısa bir metin girmesini sağlar.',
    neZaman: [
      'Ad, e-posta veya başvuru numarası gibi kısa bir değer için kullanın.',
      'Beklenen uzunluğa göre alanı daraltın. Posta kodu alanı ad alanı kadar geniş olmaz.',
      'Uzun metin için çok satırlı metin alanını kullanın.'
    ],
    erisilebilirlik: [
      'Her alanın görünür bir etiketi olur. Yer tutucu metni etiket yerine geçmez.',
      'Yardım metnini `aria-describedby` ile alana bağlayın.',
      'Hata durumunda kenarlık 2 pikselden kalın olur ve hata metni alanın üstünde durur.',
      'Türkçe adlar için alan genişliğini 60 karakterden aşağı düşürmeyin.'
    ],
    wcag: ['1.3.1', '1.3.5', '3.3.1', '3.3.2', '4.1.2'],
    kaynak: ['UK', 'US', 'FR', 'IE', 'KR', 'JP', 'DK', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Etiket ve yardım metni ile',
        html: '<div class="kiris-alan">\n  <label class="kiris-etiket" for="ad">Adınız</label>\n  <p class="kiris-yardim" id="ad-yardim">Nüfus cüzdanınızda yazdığı gibi yazın.</p>\n  <input class="kiris-girdi" id="ad" name="ad" type="text" aria-describedby="ad-yardim" autocomplete="given-name">\n</div>'
      },
      {
        baslik: 'Hata durumu',
        html: '<div class="kiris-alan kiris-alan--hata">\n  <label class="kiris-etiket" for="eposta">E-posta adresiniz</label>\n  <p class="kiris-hata" id="eposta-hata"><span class="kiris-gorsel-gizli">Hata:</span> E-posta adresi bir @ işareti içermelidir.</p>\n  <input class="kiris-girdi kiris-girdi--hata" id="eposta" name="eposta" type="email" aria-describedby="eposta-hata">\n</div>'
      }
    ]
  },
  {
    id: 'textarea',
    ad: 'Çok satırlı metin',
    name: 'Textarea',
    grup: 'form',
    durum: { css: 'stable', js: 'karakter sayacı', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcının birden çok satır metin girmesini sağlar.',
    neZaman: [
      'Açıklama, gerekçe veya adres gibi uzun bir metin için kullanın.',
      'Bir sınır varsa karakter sayacını açın.'
    ],
    erisilebilirlik: [
      'Karakter sayacı `aria-live="polite"` ile duyurulur.',
      'Sayaç yalnız son 20 karakterde duyurulur. Her tuşta duyurmayın.',
      'Alanı kullanıcı büyütebilir. `resize: none` kullanmayın.'
    ],
    wcag: ['1.3.1', '3.3.1', '4.1.3'],
    kaynak: ['UK', 'IE', 'KR', 'JP', 'DK', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Karakter sayacı ile',
        html: '<div class="kiris-alan" data-kiris="karakter-sayaci" data-sinir="200">\n  <label class="kiris-etiket" for="aciklama">Başvuru gerekçeniz</label>\n  <textarea class="kiris-metin-alani" id="aciklama" name="aciklama" rows="5" aria-describedby="aciklama-sayac"></textarea>\n  <p class="kiris-sayac" id="aciklama-sayac" aria-live="polite">200 karakter kaldı</p>\n</div>'
      }
    ]
  },
  {
    id: 'select',
    ad: 'Açılır liste',
    name: 'Select',
    grup: 'form',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcının bir listeden tek bir seçenek seçmesini sağlar.',
    neZaman: [
      'Seçenek sayısı 7 ile 20 arasındaysa kullanın.',
      '6 seçenekten azsa seçenek düğmesi kullanın.',
      '20 seçenekten çoksa aranabilir liste kullanın.'
    ],
    erisilebilirlik: [
      'İlk seçenek bir yönerge değil boş bir değer olur.',
      'Seçenekleri alfabetik değil mantıklı bir sırayla dizin.',
      'Türkçe sıralamada ç, ğ, ı, i, ö, ş ve ü harflerini doğru sıraya koyun.'
    ],
    wcag: ['1.3.1', '3.3.2', '4.1.2'],
    kaynak: ['UK', 'US', 'FR', 'IE', 'KR', 'JP', 'DK', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-alan">\n  <label class="kiris-etiket" for="il">İl</label>\n  <select class="kiris-secim" id="il" name="il">\n    <option value="">Seçiniz</option>\n    <option value="34">İstanbul</option>\n    <option value="06">Ankara</option>\n    <option value="35">İzmir</option>\n    <option value="16">Bursa</option>\n  </select>\n</div>'
      }
    ]
  },
  {
    id: 'checkbox',
    ad: 'Onay kutusu',
    name: 'Checkbox',
    grup: 'secim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcının bir listeden birden çok seçenek seçmesini sağlar.',
    neZaman: [
      'Birden çok seçim mümkünse kullanın.',
      'Tek bir evet ve hayır sorusu için tek onay kutusu kullanın.',
      'Seçenekler birbirini dışlıyorsa seçenek düğmesi kullanın.'
    ],
    erisilebilirlik: [
      'Etiketin tamamı tıklanabilir alandır.',
      'Kutu 24 x 24 piksel, dokunma alanı 44 x 44 pikseldir.',
      'Grubu `fieldset` ve `legend` içine alın.'
    ],
    wcag: ['1.3.1', '2.5.8', '4.1.2'],
    kaynak: ['UK', 'US', 'FR', 'IE', 'KR', 'JP', 'DK', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Grup',
        html: '<fieldset class="kiris-alan-grubu">\n  <legend class="kiris-baslik-legend">Hangi belgeleri yükleyeceksiniz?</legend>\n  <div class="kiris-secenekler">\n    <div class="kiris-secenek">\n      <input class="kiris-onay" id="b1" name="belge" type="checkbox" value="kimlik">\n      <label class="kiris-secenek-etiket" for="b1">Kimlik fotokopisi</label>\n    </div>\n    <div class="kiris-secenek">\n      <input class="kiris-onay" id="b2" name="belge" type="checkbox" value="ikametgah">\n      <label class="kiris-secenek-etiket" for="b2">İkametgâh belgesi</label>\n    </div>\n  </div>\n</fieldset>'
      }
    ]
  },
  {
    id: 'radio',
    ad: 'Seçenek düğmesi',
    name: 'Radio',
    grup: 'secim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcının birbirini dışlayan seçeneklerden birini seçmesini sağlar.',
    neZaman: [
      'Seçenekler birbirini dışlıyorsa kullanın.',
      '6 seçeneğe kadar kullanın. Daha fazlası için açılır liste kullanın.',
      'Hiçbir seçenek varsayılan olarak seçili gelmez.'
    ],
    erisilebilirlik: [
      'Grubu `fieldset` ve `legend` içine alın.',
      'Ok tuşları grup içinde gezinir. Bu tarayıcının kendi davranışıdır. Bozmayın.',
      'Koşullu alan açan bir seçenek `aria-expanded` taşır.'
    ],
    wcag: ['1.3.1', '2.1.1', '4.1.2'],
    kaynak: ['UK', 'US', 'FR', 'IE', 'KR', 'JP', 'DK', 'DE', 'NO'],
    ornekler: [
      {
        baslik: 'Grup',
        html: '<fieldset class="kiris-alan-grubu">\n  <legend class="kiris-baslik-legend">Başvuru türü</legend>\n  <div class="kiris-secenekler">\n    <div class="kiris-secenek">\n      <input class="kiris-radyo" id="t1" name="tur" type="radio" value="bireysel">\n      <label class="kiris-secenek-etiket" for="t1">Bireysel</label>\n    </div>\n    <div class="kiris-secenek">\n      <input class="kiris-radyo" id="t2" name="tur" type="radio" value="kurumsal">\n      <label class="kiris-secenek-etiket" for="t2">Kurumsal</label>\n    </div>\n  </div>\n</fieldset>'
      }
    ]
  },
  {
    id: 'file-upload',
    ad: 'Dosya yükleme',
    name: 'File upload',
    grup: 'form',
    durum: { css: 'stable', js: 'sürükle, listele, kaldır', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcının cihazından bir veya daha çok dosya seçmesini sağlar. Sürükle ve bırak alanı ve dosya listesi ile.',
    neZaman: [
      'Belge, fotoğraf veya form eki istediğinizde kullanın.',
      'Kabul edilen biçimi ve en büyük boyutu etiketin altında yazın.'
    ],
    erisilebilirlik: [
      'Yerel girdi görünmez ama vardır ve odak alır. Klavye ve ekran okuyucu onu kullanır. Sürükle ve bırak tek yol değildir.',
      'Seçilen her dosya adı ve boyutu ile listelenir. Her satırda kaldırma düğmesi vardır.',
      'Seçim `aria-live` ile duyurulur: "2 dosya seçildi".',
      'Kabul edilen biçim ve en büyük boyut yardım metninde yazılır. Sunucu yine denetler.'
    ],
    wcag: ['1.3.1', '2.1.1', '3.3.2', '4.1.3'],
    kaynak: ['UK', 'US', 'FR', 'IE', 'KR', 'JP', 'DK', 'DE'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-alan" data-kiris="dosya">\n  <label class="kiris-etiket" for="ek">İkametgâh belgesi</label>\n  <p class="kiris-yardim" id="ek-yardim">PDF veya JPG. En çok 5 MB.</p>\n  <div class="kiris-dosya-alani">\n    <input class="kiris-dosya" id="ek" name="ek" type="file" accept=".pdf,.jpg,.jpeg" aria-describedby="ek-yardim">\n    <span class="kiris-button kiris-button--ikincil kiris-dosya-alani__dugme" aria-hidden="true">Dosya seç</span>\n    <p class="kiris-dosya-alani__metin">veya dosyayı buraya sürükleyin</p>\n  </div>\n  <ul class="kiris-dosya-liste" aria-label="Seçilen dosyalar"></ul>\n  <p class="kiris-dosya-durum kiris-gorsel-gizli" aria-live="polite"></p>\n</div>'
      }
    ]
  },
  {
    id: 'fieldset',
    ad: 'Alan grubu',
    name: 'Fieldset',
    grup: 'form',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Birbirine bağlı form alanlarını tek bir soru altında toplar.',
    neZaman: [
      'Onay kutusu veya seçenek düğmesi grubunda her zaman kullanın.',
      'Tarih gibi çok parçalı bir girişte kullanın.'
    ],
    erisilebilirlik: [
      '`legend` sorunun kendisidir. Ekran okuyucu her alanla birlikte okur.',
      'Sayfada tek soru varsa `legend` sayfa başlığı ile aynı olur.'
    ],
    wcag: ['1.3.1', '3.3.2'],
    kaynak: ['UK', 'DE', 'NO'],
    ornekler: [
      { baslik: 'Temel', html: '<fieldset class="kiris-alan-grubu">\n  <legend class="kiris-baslik-legend kiris-baslik-legend--buyuk">Doğum tarihiniz nedir?</legend>\n  <p class="kiris-yardim">Örnek: 27 03 1997</p>\n</fieldset>' }
    ]
  },
  {
    id: 'hint',
    ad: 'Yardım metni',
    name: 'Hint',
    grup: 'form',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Bir alanın nasıl doldurulacağını kısaca anlatır.',
    neZaman: [
      'Beklenen biçim açık değilse kullanın.',
      'Yardım metnini alanın üstüne koyun. Kullanıcı yazmadan önce okur.'
    ],
    erisilebilirlik: [
      'Alana `aria-describedby` ile bağlanır.',
      'Metin gri olsa da kontrast oranı 4.5 üzerinde kalır.'
    ],
    wcag: ['1.4.3', '3.3.2'],
    kaynak: ['UK', 'IE', 'DK', 'NO'],
    ornekler: [
      { baslik: 'Temel', html: '<p class="kiris-yardim">Nüfus cüzdanınızın ön yüzünde yazan 11 haneli numara.</p>' }
    ]
  },
  {
    id: 'error-message',
    ad: 'Hata mesajı',
    name: 'Error message',
    grup: 'geri-bildirim',
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Tek bir alandaki hatayı alanın yanında anlatır.',
    neZaman: [
      'Her hatalı alanın üstünde gösterin.',
      'Hatayı ve çözümü birlikte yazın. Yalnız "Geçersiz" yazmayın.'
    ],
    erisilebilirlik: [
      'Metin "Hata:" ile başlar. Bu kısım ekran okuyucu için gizli metindir.',
      'Rengi tek işaret olarak kullanmayın. Kalın kenarlık de ekleyin.',
      'Alan `aria-describedby` ile hata metnine bağlanır.'
    ],
    wcag: ['1.4.1', '3.3.1', '3.3.3'],
    kaynak: ['UK', 'US', 'DK', 'NO'],
    ornekler: [
      { baslik: 'Temel', html: '<p class="kiris-hata"><span class="kiris-gorsel-gizli">Hata:</span> T.C. kimlik numarası 11 hane olmalıdır.</p>' }
    ]
  },
  {
    id: 'error-summary',
    ad: 'Hata özeti',
    name: 'Error summary',
    grup: 'geri-bildirim',
    durum: { css: 'stable', js: 'odak yönetimi', react: 'stable', vue: 'stable' },
    ozet: 'Sayfadaki tüm hataları en üstte toplar ve her birine bağlantı verir.',
    neZaman: [
      'Sunucu doğrulaması hata döndüğünde sayfanın en üstüne koyun.',
      'Hataları sayfadaki alan sırasına göre listeleyin.'
    ],
    erisilebilirlik: [
      'Sayfa yüklendiğinde odak hata özetine gider.',
      '`role="alert"` ile duyurulur.',
      'Her madde hatalı alana giden bir bağlantıdır.',
      'Sayfa başlığı da "Hata: " ile başlar.'
    ],
    wcag: ['2.4.3', '3.3.1', '4.1.3'],
    kaynak: ['UK', 'DK', 'NO'],
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-hata-ozeti" data-kiris="hata-ozeti" role="alert" tabindex="-1">\n  <h2 class="kiris-hata-ozeti__baslik">Bir sorun var</h2>\n  <ul class="kiris-hata-ozeti__liste">\n    <li><a href="#kimlik">T.C. kimlik numarası 11 hane olmalıdır</a></li>\n    <li><a href="#dogum">Doğum tarihi bugünden sonra olamaz</a></li>\n  </ul>\n</div>'
      }
    ]
  }
];
