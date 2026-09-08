// Kiriş component registry — the components that exist only because this is
// Türkiye. No foreign design system supplies these. They carry the national
// identity, the national identifiers and the national legal obligations.

/** @type {import('./00-index.mjs').Bilesen[]} */
export const turkiyeBilesenleri = [
  {
    id: 'masthead',
    tamGenislik: true,
    ad: 'Resmî site afişi',
    name: 'Masthead',
    grup: 'kimlik',
    ozgun: true,
    durum: { css: 'stable', js: 'aç ve kapat', react: 'stable', vue: 'stable' },
    ozet: 'Sayfanın en üstünde durur ve kullanıcıya bu sitenin resmî bir devlet sitesi olduğunu söyler.',
    neZaman: [
      'Her kamu sayfasında, her zaman en üstte kullanın.',
      'Metni değiştirmeyin. Tek bir metin her sitede aynıdır.',
      'Bu bileşen `@kiris-ds/identity` paketindedir ve kısıtlı lisans taşır.'
    ],
    erisilebilirlik: [
      'Ekran okuyucu için sayfanın ilk bölgesidir.',
      '"Nasıl anlarım?" bölümü bir düğme ile açılır ve `aria-expanded` taşır.',
      'Bayrak, Türk Bayrağı Tüzüğü ölçülerine göre çizilmiştir. Boş `alt` taşır, çünkü anlamı yanındaki metin verir.'
    ],
    wcag: ['1.3.1', '2.4.1', '4.1.2'],
    kaynak: ['US', 'KR'],
    neden:
      'Resmî hizmetlerde kurum kimliğini ve alan adını kontrol etme yolunu gösterir. Afiş tek başına sitenin gerçekliğini kanıtlamaz.',
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-resmi-afis" data-kiris="resmi-afis">\n  <div class="kiris-kap kiris-resmi-afis__ic">\n    <img class="kiris-resmi-afis__bayrak" src="{{VARLIK}}turk-bayragi.svg" alt="">\n    <p class="kiris-resmi-afis__metin">Bu, Türkiye Cumhuriyeti’ne ait resmî bir devlet sitesidir.</p>\n    <button class="kiris-resmi-afis__dugme" type="button" aria-expanded="false" aria-controls="afis-nasil">Nasıl anlarım?</button>\n  </div>\n  <div class="kiris-resmi-afis__panel" id="afis-nasil" hidden>\n    <div class="kiris-kap kiris-resmi-afis__panel-ic">\n      <div>\n        <p class="kiris-resmi-afis__panel-baslik">Adres <strong>gov.tr</strong> ile biter</p>\n        <p>Resmî devlet siteleri gov.tr uzantısını kullanır. Adres çubuğunu her zaman kontrol edin.</p>\n      </div>\n      <div>\n        <p class="kiris-resmi-afis__panel-baslik">Bağlantı <strong>güvenlidir</strong></p>\n        <p>Adresin başında https ve kilit simgesi bulunur. Kimlik bilgilerinizi yalnız böyle sayfalara girin.</p>\n      </div>\n    </div>\n  </div>\n</div>'
      }
    ]
  },
  {
    id: 'identifier',
    tamGenislik: true,
    ad: 'Kurum tanıtıcısı',
    name: 'Identifier',
    grup: 'kimlik',
    ozgun: true,
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Sayfanın sonunda hizmeti işleten kurumu ve bağlı olduğu bakanlığı adlandırır.',
    neZaman: [
      'Kurumsal alt bilgi ile birlikte kullanmayın. O alt bilgi kurum adını ve üst kurumu zaten taşır. Bir metin bir sayfada bir kez durur.',
      'Her sayfada alt bilginin hemen üstünde kullanın.',
      'Bağlı kuruluşlar üst kurumu da yazar.'
    ],
    erisilebilirlik: [
      'Kurum adı görsel değil metindir. Logo yalnız metne eşlik eder.',
      'İletişim bağlantıları gerçek bağlantılardır.'
    ],
    wcag: ['1.1.1', '1.3.1', '2.4.5'],
    kaynak: ['US', 'KR'],
    neden:
      'Türkiye’de bir vatandaş bir hizmeti hangi kurumun yürüttüğünü çoğu zaman bilmez. Bu bileşen sorumluyu adlandırır ve şikâyet yolunu açar.',
    ornekler: [
      {
        baslik: 'Temel',
        html: '<section class="kiris-tanitici" aria-label="Kurum bilgisi">\n  <div class="kiris-kap kiris-tanitici__ic">\n    <div>\n      <p class="kiris-tanitici__kurum">Sosyal Güvenlik Kurumu</p>\n      <p class="kiris-tanitici__ust">Çalışma ve Sosyal Güvenlik Bakanlığı bağlı kuruluşudur.</p>\n    </div>\n    <nav class="kiris-tanitici__baglantilar" aria-label="Kurum bağlantıları">\n      <a href="#">Hakkımızda</a>\n      <a href="#">Bilgi edinme</a>\n      <a href="#">CİMER</a>\n    </nav>\n  </div>\n</section>'
      }
    ]
  },
  {
    id: 'kimlik-no',
    ad: 'T.C. kimlik numarası girişi',
    name: 'National identity number input',
    grup: 'turkiye-form',
    ozgun: true,
    durum: { css: 'stable', js: 'doğrulama', react: 'stable', vue: 'stable' },
    ozet: '11 haneli T.C. kimlik numarasını alır, biçimini denetler ve sağlama toplamını doğrular.',
    neZaman: [
      'Kimlik doğrulaması yasal olarak gerekiyorsa kullanın. Gerekmiyorsa istemeyin.',
      'Yabancı kimlik numarası da kabul edilecekse `data-ykn="acik"` ekleyin.',
      'Numarayı asla adres satırında veya sorgu dizesinde taşımayın.'
    ],
    erisilebilirlik: [
      '`inputmode="numeric"` ile telefonda sayı klavyesi açılır.',
      '`autocomplete` kapalıdır. Tarayıcı bu değeri saklamamalıdır.',
      'Parola alanı değildir. Değeri yıldızla gizlemeyin. Kullanıcı yazdığını görür.',
      'Yazarken altta bir sayaç ilerler: "7 / 11 hane". Son iki hanede duyurulur.',
      'Alandan çıkınca hane sayısı ve sağlama toplamı denetlenir. Hata ne olduğunu söyler: "11 hane olmalıdır. 7 hane girdiniz."',
      '`data-zorunlu` ile boş bırakılan alan da hata alır. Aksi hâlde boş alan sessizdir ve zorunluluğu sunucu denetler.'
    ],
    wcag: ['1.3.5', '3.3.1', '3.3.3'],
    kaynak: [],
    neden:
      'Kimlik numarasının hane sayısını ve sağlama toplamını denetler. Bu kontrol, numaranın gerçek bir kişiye ait olduğunu doğrulamaz.',
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-alan" data-kiris="kimlik-no" data-zorunlu>\n  <label class="kiris-etiket" for="tckn">T.C. kimlik numaranız</label>\n  <p class="kiris-yardim" id="tckn-yardim">Nüfus cüzdanınızın ön yüzünde yazan 11 haneli numara.</p>\n  <p class="kiris-hata" data-kiris-hata hidden></p>\n  <input class="kiris-girdi kiris-girdi--11" id="tckn" name="tckn" type="text"\n         inputmode="numeric" maxlength="11" autocomplete="off"\n         aria-describedby="tckn-yardim tckn-sayac">\n  <p class="kiris-sayac" id="tckn-sayac" data-kiris-sayac aria-live="off"></p>\n</div>'
      },
      {
        baslik: 'Yabancı kimlik numarası da kabul eder',
        html: '<div class="kiris-alan" data-kiris="kimlik-no" data-ykn="acik">\n  <label class="kiris-etiket" for="kn">Kimlik numaranız</label>\n  <p class="kiris-yardim" id="kn-yardim">T.C. vatandaşı iseniz 11 haneli T.C. kimlik numaranızı, değilseniz 99 ile başlayan yabancı kimlik numaranızı yazın.</p>\n  <p class="kiris-hata" data-kiris-hata hidden></p>\n  <input class="kiris-girdi kiris-girdi--11" id="kn" name="kn" type="text" inputmode="numeric" maxlength="11" autocomplete="off" aria-describedby="kn-yardim kn-sayac">\n  <p class="kiris-sayac" id="kn-sayac" data-kiris-sayac aria-live="off"></p>\n</div>'
      }
    ]
  },
  {
    id: 'tarih-girisi',
    ad: 'Tarih girişi',
    name: 'Date input',
    grup: 'turkiye-form',
    ozgun: true,
    durum: { css: 'stable', js: 'doğrulama', react: 'stable', vue: 'stable' },
    ozet: 'Gün, ay ve yıl için üç ayrı alan verir. Türkçe gg.aa.yyyy biçimini kullanır.',
    neZaman: [
      'Doğum tarihi gibi kullanıcının ezbere bildiği bir tarih için kullanın.',
      'Randevu seçimi gibi takvim gerektiren bir tarih için takvim bileşenini kullanın.',
      'Doğum tarihi için takvim açmayın. 60 yıl geri gitmek yavaştır.'
    ],
    erisilebilirlik: [
      'Üç alan tek bir `fieldset` içinde durur ve `legend` soruyu taşır.',
      'Her alanın kendi görünür etiketi vardır: Gün, Ay, Yıl.',
      'Hata tek bir mesajda toplanır ve odak ilk hatalı alana gider.',
      'Ay alanı sayı kabul eder. Ay adlarını Türkçe küçük harfle yazın: ocak, şubat.'
    ],
    wcag: ['1.3.1', '1.3.5', '3.3.1', '3.3.2'],
    kaynak: ['UK', 'KR', 'DK', 'DE'],
    neden:
      'Biçim farkı gerçek bir hata kaynağıdır. 03.04.2026 Türkiye’de 3 Nisan, Amerika’da 4 Mart okunur. Üç ayrı alan bu belirsizliği kaldırır.',
    ornekler: [
      {
        baslik: 'Doğum tarihi',
        html: '<fieldset class="kiris-alan-grubu" data-kiris="tarih">\n  <legend class="kiris-baslik-legend">Doğum tarihiniz nedir?</legend>\n  <p class="kiris-yardim" id="dt-yardim">Örnek: 27 03 1997</p>\n  <div class="kiris-tarih" role="group" aria-describedby="dt-yardim">\n    <div class="kiris-tarih__parca">\n      <label class="kiris-etiket kiris-etiket--kucuk" for="dt-gun">Gün</label>\n      <input class="kiris-girdi kiris-girdi--2" id="dt-gun" name="gun" type="text" inputmode="numeric" maxlength="2">\n    </div>\n    <div class="kiris-tarih__parca">\n      <label class="kiris-etiket kiris-etiket--kucuk" for="dt-ay">Ay</label>\n      <input class="kiris-girdi kiris-girdi--2" id="dt-ay" name="ay" type="text" inputmode="numeric" maxlength="2">\n    </div>\n    <div class="kiris-tarih__parca">\n      <label class="kiris-etiket kiris-etiket--kucuk" for="dt-yil">Yıl</label>\n      <input class="kiris-girdi kiris-girdi--4" id="dt-yil" name="yil" type="text" inputmode="numeric" maxlength="4">\n    </div>\n  </div>\n  <p class="kiris-hata" data-kiris-hata hidden></p>\n</fieldset>'
      }
    ]
  },
  {
    id: 'telefon-girisi',
    ad: 'Telefon girişi',
    name: 'Phone input',
    grup: 'turkiye-form',
    ozgun: true,
    durum: { css: 'stable', js: 'biçimlendirme', react: 'stable', vue: 'stable' },
    ozet: '+90 ülke kodunu sabit tutar ve 10 haneli numarayı alır.',
    neZaman: [
      'Cep telefonu veya sabit hat numarası isterken kullanın.',
      'Doğrulama kodu gönderilecekse cep telefonu olduğunu etikette belirtin.'
    ],
    erisilebilirlik: [
      'Ülke kodu bir etikettir, girdi değildir. Kullanıcı silemez.',
      'Başta yazılan 0 sessizce kaldırılır. Kullanıcı 0 ile yazmaya alışkındır.',
      'Numara yazılırken 3-3-2-2 öbeklerine ayrılır. On birinci hane yazılamaz.',
      'Boşluk ve tire kabul edilir ve temizlenir. Yapıştırılan numarayı reddetmeyin.',
      '`autocomplete="tel-national"` kullanılır.'
    ],
    wcag: ['1.3.5', '3.3.1', '3.3.2'],
    kaynak: ['UK'],
    neden:
      'Türk kullanıcı numarasını 0 ile yazar. Çoğu form bunu hata sayar. Bu bileşen 0 ile yazılan, boşluklu ve +90 ile yazılan biçimlerin hepsini kabul eder.',
    ornekler: [
      {
        baslik: 'Cep telefonu',
        html: '<div class="kiris-alan" data-kiris="telefon" data-cep="zorunlu" data-zorunlu>\n  <label class="kiris-etiket" for="tel">Cep telefonu numaranız</label>\n  <p class="kiris-yardim" id="tel-yardim">Doğrulama kodu bu numaraya gönderilecek.</p>\n  <p class="kiris-hata" data-kiris-hata hidden></p>\n  <div class="kiris-telefon">\n    <span class="kiris-telefon__kod" aria-hidden="true">+90</span>\n    <input class="kiris-girdi kiris-girdi--10" id="tel" name="tel" type="tel"\n           inputmode="tel" autocomplete="tel-national" maxlength="13" aria-describedby="tel-yardim tel-sayac">\n  </div>\n  <p class="kiris-sayac" id="tel-sayac" data-kiris-sayac aria-live="off"></p>\n</div>'
      }
    ]
  },
  {
    id: 'iban-girisi',
    ad: 'IBAN girişi',
    name: 'IBAN input',
    grup: 'turkiye-form',
    ozgun: true,
    durum: { css: 'stable', js: 'doğrulama', react: 'stable', vue: 'stable' },
    ozet: 'TR ile başlayan 26 karakterlik IBAN alır, dörderli gösterir ve mod 97 sağlamasını yapar.',
    neZaman: [
      'İade, ödeme veya maaş hesabı isterken kullanın.',
      'Kullanıcının bankasını da gösterin. Banka kodu IBAN içinde durur.'
    ],
    erisilebilirlik: [
      'TR öneki alanda hazır durur ve silinemez. İmleç önekin önüne geçmez. Yapıştırılan bir IBAN’daki TR yinelenmez.',
      'Boşluklu yapıştırma kabul edilir ve temizlenir.',
      'Gösterim dörderli gruplanır ama değer boşluksuz gönderilir.',
      'Yazı tipi tek aralıklıdır, böylece rakamlar hizalanır.',
      'Sağlama hatası "IBAN yanlış" değil "IBAN’ı kontrol edin, bir hane hatalı görünüyor" der.'
    ],
    wcag: ['1.3.5', '3.3.1', '3.3.3'],
    kaynak: [],
    neden:
      'IBAN hatası para kaybına yol açar. Mod 97 sağlaması bu hatanın çoğunu form gönderilmeden yakalar. Bugün bu doğrulama her kurumda ayrı yazılıyor.',
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-alan" data-kiris="iban">\n  <label class="kiris-etiket" for="iban">IBAN numaranız</label>\n  <p class="kiris-yardim" id="iban-yardim">TR hazır yazılıdır. 24 rakam yazın. Boşluklu yapıştırabilirsiniz.</p>\n  <p class="kiris-hata" data-kiris-hata hidden></p>\n  <input class="kiris-girdi kiris-girdi--iban" id="iban" name="iban" type="text"\n         autocomplete="off" spellcheck="false" maxlength="32" aria-describedby="iban-yardim iban-sayac">\n  <p class="kiris-sayac" id="iban-sayac" data-kiris-sayac aria-live="off"></p>\n</div>'
      }
    ]
  },
  {
    id: 'vergi-no',
    ad: 'Vergi kimlik numarası girişi',
    name: 'Tax number input',
    grup: 'turkiye-form',
    ozgun: true,
    durum: { css: 'stable', js: 'doğrulama', react: 'stable', vue: 'stable' },
    ozet: '10 haneli vergi kimlik numarasını alır ve sağlama toplamını doğrular.',
    neZaman: [
      'Kurumsal başvurularda kullanın.',
      'Gerçek kişi için T.C. kimlik numarası alanını kullanın.'
    ],
    erisilebilirlik: [
      '`inputmode="numeric"` kullanılır.',
      'Hata metni hangi haneye bakılacağını söylemez, yalnız numarayı kontrol etmeyi ister.'
    ],
    wcag: ['1.3.5', '3.3.1'],
    kaynak: [],
    neden: 'Kurumsal hizmetlerin tamamı bu numarayı ister. Sağlama algoritması tek bir yerde durmalıdır.',
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-alan" data-kiris="vergi-no">\n  <label class="kiris-etiket" for="vkn">Vergi kimlik numarası</label>\n  <p class="kiris-hata" data-kiris-hata hidden></p>\n  <input class="kiris-girdi kiris-girdi--10" id="vkn" name="vkn" type="text" inputmode="numeric" maxlength="10" autocomplete="off" aria-describedby="vkn-sayac">\n  <p class="kiris-sayac" id="vkn-sayac" data-kiris-sayac aria-live="off"></p>\n</div>'
      }
    ]
  },
  {
    id: 'plaka-girisi',
    ad: 'Plaka girişi',
    name: 'Licence plate input',
    grup: 'turkiye-form',
    ozgun: true,
    durum: { css: 'stable', js: 'biçimlendirme', react: 'stable', vue: 'stable' },
    ozet: 'Türk araç plakasını alır, büyük harfe çevirir ve biçimini denetler.',
    neZaman: [
      'Trafik cezası sorgusu, muayene randevusu veya araç işlemlerinde kullanın.'
    ],
    erisilebilirlik: [
      'Büyük harfe çevirme Türkçe kuralına göre yapılır. "i" harfi "İ" olur.',
      'Boşluklu ve boşluksuz yazım kabul edilir.',
      'Alan görsel olarak plakaya benzetilir ama bu bir süs değildir, tanımayı kolaylaştırır.'
    ],
    wcag: ['1.3.5', '3.3.1'],
    kaynak: [],
    neden:
      'Türkçe büyük harf kuralı burada gerçek bir hata kaynağıdır. `toUpperCase()` ile "34 iz 1234" plakası "34 IZ 1234" olur ve yanlış plaka sorgulanır. Kiriş bu dönüşümü Türkçe kuralına göre yapar.',
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-alan" data-kiris="plaka">\n  <label class="kiris-etiket" for="plaka">Araç plakası</label>\n  <p class="kiris-yardim" id="plaka-yardim">Örnek: 34 ABC 123</p>\n  <p class="kiris-hata" data-kiris-hata hidden></p>\n  <input class="kiris-girdi kiris-girdi--plaka" id="plaka" name="plaka" type="text" autocomplete="off" spellcheck="false" aria-describedby="plaka-yardim">\n</div>'
      }
    ]
  },
  {
    id: 'adres',
    ad: 'Adres',
    name: 'Address',
    grup: 'turkiye-form',
    ozgun: true,
    durum: { css: 'stable', js: 'bağlı listeler', react: 'stable', vue: 'stable' },
    ozet: 'İl, ilçe ve mahalle alanlarını birbirine bağlar, sonra açık adresi alır.',
    neZaman: [
      'Tebligat adresi veya ikametgâh adresi isterken kullanın.',
      'Adres kayıt sistemine bağlanabiliyorsanız bağlanın. Bağlanamıyorsanız serbest metin verin.'
    ],
    erisilebilirlik: [
      'İlçe listesi il seçilmeden devre dışı kalmaz. Boş kalır ve durum duyurulur.',
      'Liste yüklenirken `aria-busy="true"` kullanılır.',
      'Sokak adı olmayan adresler için serbest metin alanı her zaman bulunur.',
      'Posta kodu zorunlu değildir. Çok sayıda adreste bilinmez.'
    ],
    wcag: ['1.3.1', '3.3.2', '4.1.3'],
    kaynak: ['UK'],
    neden:
      'Türk adresi il, ilçe, mahalle, cadde veya sokak, bina no ve daire no olarak yapılır. Bu yapı hiçbir yabancı adres bileşenine uymaz.',
    ornekler: [
      {
        baslik: 'Bağlı listeler',
        html: '<fieldset class="kiris-alan-grubu" data-kiris="adres">\n  <legend class="kiris-baslik-legend">Tebligat adresiniz</legend>\n  <div class="kiris-alan">\n    <label class="kiris-etiket" for="a-il">İl</label>\n    <select class="kiris-secim" id="a-il" name="il" data-adres="il"><option value="">Seçiniz</option></select>\n  </div>\n  <div class="kiris-alan">\n    <label class="kiris-etiket" for="a-ilce">İlçe</label>\n    <select class="kiris-secim" id="a-ilce" name="ilce" data-adres="ilce"><option value="">Önce il seçiniz</option></select>\n  </div>\n  <div class="kiris-alan">\n    <label class="kiris-etiket" for="a-acik">Açık adres</label>\n    <p class="kiris-yardim" id="a-acik-yardim">Mahalle, cadde veya sokak, bina no ve daire no.</p>\n    <textarea class="kiris-metin-alani" id="a-acik" name="acik_adres" rows="3" aria-describedby="a-acik-yardim"></textarea>\n  </div>\n  <div class="kiris-alan">\n    <label class="kiris-etiket" for="a-posta">Posta kodu <span class="kiris-etiket__istege-bagli">(isteğe bağlı)</span></label>\n    <input class="kiris-girdi kiris-girdi--5" id="a-posta" name="posta_kodu" type="text" inputmode="numeric" maxlength="5" autocomplete="postal-code">\n  </div>\n</fieldset>'
      }
    ]
  },
  {
    id: 'edevlet-giris',
    ad: 'e-Devlet ile giriş',
    name: 'e-Devlet sign in',
    grup: 'turkiye-kimlik',
    ozgun: true,
    durum: { css: 'stable', js: 'yok', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcıyı e-Devlet Kapısı kimlik doğrulamasına gönderen tek ve değişmez düğme.',
    neZaman: [
      'Kimlik doğrulaması gereken her hizmette birincil giriş yolu olarak kullanın.',
      'Görünümünü değiştirmeyin. Her sitede aynı görünmesi güven işaretidir.',
      'Bu bileşen `@kiris-ds/identity` paketindedir ve kısıtlı lisans taşır.'
    ],
    erisilebilirlik: [
      'Bir `<a>` öğesidir, çünkü kullanıcıyı başka bir alan adına götürür.',
      'Metin her zaman "e-Devlet ile giriş yap" olur.',
      'Yanında alternatif giriş yolları listelenir. e-Devlet tek yol olmamalıdır.'
    ],
    wcag: ['2.4.4', '3.2.4'],
    kaynak: ['FR'],
    neden:
      'e-Devlet ile giriş seçeneğini tutarlı bir işaret ve etiketle gösterir. Kimlik doğrulama için ayrı bir hizmet entegrasyonu gerekir.',
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-edevlet">\n  <a class="kiris-edevlet__dugme" href="#">\n    <span class="kiris-edevlet__isaret" aria-hidden="true"><img src="{{VARLIK}}e-devlet-isaret.png" alt=""></span>\n    <span>e-Devlet ile giriş yap</span>\n  </a>\n  <p class="kiris-edevlet__yardim">e-Devlet şifreniz yoksa <a class="kiris-link" href="#">PTT şubelerinden alabilirsiniz</a>.</p>\n</div>'
      }
    ]
  },
  {
    id: 'kvkk-onay',
    ad: 'KVKK açık rıza',
    name: 'Data protection consent',
    grup: 'turkiye-kimlik',
    ozgun: true,
    durum: { css: 'stable', js: 'gönderim denetimi', react: 'stable', vue: 'stable' },
    ozet: '6698 sayılı kanun kapsamında açık rıza alır ve aydınlatma metnine bağlantı verir.',
    neZaman: [
      'Kişisel veri işlenen her formda kullanın.',
      'Kutu önceden işaretli gelmez. Açık rıza işaretlenmiş sayılamaz.',
      'Rıza vermeyen kullanıcı için alternatif bir yol gösterin.'
    ],
    erisilebilirlik: [
      'Aydınlatma metni ayrı bir sayfada durur ve bağlantı yeni sekmede açılır.',
      'Rıza metni sade Türkçe ile yazılır. Hukuk dili özet metinde kullanılmaz.',
      'Zorunlu ve isteğe bağlı rızalar ayrı kutulardır. Tek kutuda toplanmaz.',
      'Zorunlu onay boşken form gönderilmez. Hata metni kutunun üstünde görünür ve odak onay kutusuna gider.'
    ],
    wcag: ['1.3.1', '3.3.1', '3.3.2'],
    kaynak: ['FR'],
    neden:
      'Aydınlatma metni bağlantısını ve kullanıcının onay seçeneğini aynı alanda gösterir. Onay seçeneği başlangıçta işaretli değildir.',
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-kvkk">\n  <h2 class="kiris-kvkk__baslik">Kişisel verilerinizin işlenmesi</h2>\n  <p class="kiris-govde">Başvurunuzu değerlendirmek için kimlik ve iletişim bilgilerinizi işliyoruz. Ayrıntılar <a class="kiris-link" href="#" target="_blank" rel="noopener">aydınlatma metninde</a> yazılıdır (yeni sekmede açılır).</p>\n  <div class="kiris-secenek">\n    <input class="kiris-onay" id="kvkk-zorunlu" name="kvkk" type="checkbox" required>\n    <label class="kiris-secenek-etiket" for="kvkk-zorunlu">Başvurumun değerlendirilmesi için verilerimin işlenmesine izin veriyorum.</label>\n  </div>\n  <div class="kiris-secenek">\n    <input class="kiris-onay" id="kvkk-istege" name="kvkk_bilgilendirme" type="checkbox">\n    <label class="kiris-secenek-etiket" for="kvkk-istege">Yeni hizmetler hakkında bilgilendirme almak istiyorum <span class="kiris-etiket__istege-bagli">(isteğe bağlı)</span>.</label>\n  </div>\n</div>'
      },
      {
        baslik: 'Gönderim denetimi',
        aciklama: 'Onay kutusu boşken "Başvuruyu gönder" düğmesine basın. Form gönderilmez, hata görünür.',
        html: '<form action="#" method="post" novalidate>\n  <div class="kiris-kvkk" data-kiris="kvkk">\n    <h2 class="kiris-kvkk__baslik">Kişisel verilerinizin işlenmesi</h2>\n    <p class="kiris-govde">Başvurunuzu değerlendirmek için kimlik ve iletişim bilgilerinizi işliyoruz. Ayrıntılar <a class="kiris-link" href="#" target="_blank" rel="noopener">aydınlatma metninde</a> yazılıdır (yeni sekmede açılır).</p>\n    <p class="kiris-hata" id="kvkk-g-hata" hidden></p>\n    <div class="kiris-secenek">\n      <input class="kiris-onay" id="kvkk-g-zorunlu" name="kvkk" type="checkbox" required>\n      <label class="kiris-secenek-etiket" for="kvkk-g-zorunlu">Başvurumun değerlendirilmesi için verilerimin işlenmesine izin veriyorum.</label>\n    </div>\n    <div class="kiris-secenek">\n      <input class="kiris-onay" id="kvkk-g-istege" name="kvkk_bilgilendirme" type="checkbox">\n      <label class="kiris-secenek-etiket" for="kvkk-g-istege">Yeni hizmetler hakkında bilgilendirme almak istiyorum <span class="kiris-etiket__istege-bagli">(isteğe bağlı)</span>.</label>\n    </div>\n  </div>\n  <button class="kiris-button" type="submit">Başvuruyu gönder</button>\n</form>'
      },
      {
        baslik: 'Hata durumu',
        html: '<div class="kiris-kvkk kiris-kvkk--hata">\n  <h2 class="kiris-kvkk__baslik">Kişisel verilerinizin işlenmesi</h2>\n  <p class="kiris-govde">Başvurunuzu değerlendirmek için kimlik ve iletişim bilgilerinizi işliyoruz. Ayrıntılar <a class="kiris-link" href="#" target="_blank" rel="noopener">aydınlatma metninde</a> yazılıdır (yeni sekmede açılır).</p>\n  <p class="kiris-hata" id="kvkk-h-hata"><span class="kiris-gorsel-gizli">Hata:</span> Devam etmek için verilerinizin işlenmesine izin vermeniz gerekir.</p>\n  <div class="kiris-secenek">\n    <input class="kiris-onay" id="kvkk-h-zorunlu" name="kvkk" type="checkbox" required aria-invalid="true" aria-describedby="kvkk-h-hata">\n    <label class="kiris-secenek-etiket" for="kvkk-h-zorunlu">Başvurumun değerlendirilmesi için verilerimin işlenmesine izin veriyorum.</label>\n  </div>\n  <div class="kiris-secenek">\n    <input class="kiris-onay" id="kvkk-h-istege" name="kvkk_bilgilendirme" type="checkbox">\n    <label class="kiris-secenek-etiket" for="kvkk-h-istege">Yeni hizmetler hakkında bilgilendirme almak istiyorum <span class="kiris-etiket__istege-bagli">(isteğe bağlı)</span>.</label>\n  </div>\n</div>'
      }
    ]
  },
  {
    id: 'erisim-menusu',
    ad: 'Erişilebilirlik menüsü',
    name: 'Accessibility menu',
    grup: 'turkiye-kimlik',
    ozgun: true,
    durum: { css: 'stable', js: 'ayar saklama', react: 'stable', vue: 'stable' },
    ozet: 'Kullanıcının yazı boyutunu, karşıtlığı ve temayı değiştirmesini sağlar.',
    neZaman: [
      'Her sayfada başlık çubuğunun içinde kullanın.',
      'Ayarları kullanıcının tarayıcısında saklayın. Sunucuya göndermeyin.'
    ],
    erisilebilirlik: [
      'Yazı boyutu üç kademedir ve sayfayı bozmadan yüzde 200 büyür.',
      'Yüksek karşıtlık kipi 7 üzerinde kontrast sağlar.',
      'Ayar `localStorage` içinde saklanır. Erişilemezse sayfa yine çalışır.',
      'Panel üç yolla kapanır: kapat düğmesi, Esc tuşu veya dışarı tıklama.',
      'Bu menü erişilebilirlik yükümlülüğünün yerine geçmez. Sayfa menü kapalıyken de uyumludur.'
    ],
    wcag: ['1.4.4', '1.4.6', '1.4.12'],
    kaynak: ['FR', 'KR'],
    neden:
      'Yazı boyutu ve tema tercihlerini tek menüde toplar. Bu tercihler, sayfanın temel erişilebilirlik özelliklerinin yerine geçmez.',
    ornekler: [
      {
        baslik: 'Temel',
        html: '<div class="kiris-erisim" data-kiris="erisim-menusu">\n  <button class="kiris-erisim__dugme" type="button" aria-expanded="false" aria-controls="erisim-panel">Görünüm ayarları</button>\n  <div class="kiris-erisim__panel" id="erisim-panel" hidden>\n    <button class="kiris-erisim__kapat" type="button" aria-label="Menüyü kapat"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-close"/></svg></button>\n    <fieldset class="kiris-erisim__grup">\n      <legend>Yazı boyutu</legend>\n      <button class="kiris-erisim__secenek" type="button" data-yazi="normal" aria-pressed="true">Normal</button>\n      <button class="kiris-erisim__secenek" type="button" data-yazi="buyuk" aria-pressed="false">Büyük</button>\n      <button class="kiris-erisim__secenek" type="button" data-yazi="cok-buyuk" aria-pressed="false">Çok büyük</button>\n    </fieldset>\n    <fieldset class="kiris-erisim__grup">\n      <legend>Tema</legend>\n      <button class="kiris-erisim__secenek" type="button" data-tema="acik" aria-pressed="true">Açık</button>\n      <button class="kiris-erisim__secenek" type="button" data-tema="koyu" aria-pressed="false">Koyu</button>\n      <button class="kiris-erisim__secenek" type="button" data-tema="yuksek" aria-pressed="false">Yüksek karşıtlık</button>\n    </fieldset>\n  </div>\n</div>'
      }
    ]
  }
];
