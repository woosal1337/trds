// e-Devlet Kapısı ana sayfası, birebir. Yalnız Kiriş bileşenleri ile.
// Kaynak: https://www.turkiye.gov.tr — 6 Eylül 2026 tarihli içerik.
// Bölümler gerçek sayfa ile aynı sırada ve aynı metinle durur. Yalnız görseller düşer.

import { aramaOnerileri } from './veri/arama-onerileri.mjs';

const kartlar = (ogeler) => ogeler.map((o) => `
      <div class="kiris-kart kiris-kart--sade">
        <p class="kiris-kart__kurum">${o.kurum}</p>
        <h3 class="kiris-kart__baslik"><a href="#">${o.ad}</a></h3>
      </div>`).join('');

const encokKullanilan = [
  { kurum: 'Sosyal Güvenlik Kurumu', ad: 'SGK Tescil ve Hizmet Dökümü / İşyeri Ünvan Listesi' },
  { kurum: 'e-Devlet Kapısı', ad: 'Araçlarım' },
  { kurum: 'Emniyet Genel Müdürlüğü', ad: 'Araç Plakasına Yazılan Ceza Sorgulama' },
  { kurum: 'Türkiye Noterler Birliği', ad: 'Adıma Tescilli Araç Sorgulama' },
  { kurum: 'Gelir İdaresi Başkanlığı', ad: 'Vergi Borcu Sorgulama ve Ödeme' },
  { kurum: 'Sosyal Güvenlik Kurumu', ad: 'Normal Şartlarda Ne Zaman Emekli Olabilirim?' },
  { kurum: 'e-Devlet Kapısı', ad: 'Çalışma Hayatım' },
  { kurum: 'Cumhurbaşkanlığı', ad: 'Kariyer Kapısı Kamu İşe Alım' },
  { kurum: 'Tapu ve Kadastro Genel Müdürlüğü', ad: 'Tapu Bilgileri Sorgulama' }
];

const oneCikan = [
  { kurum: 'Milli Savunma Bakanlığı', ad: '3713 Sayılı Kanun Kapsamında Başvurular', ozet: '3713 Sayılı Kanunun Geçici 20’nci Maddesi Kapsamında Terörle Mücadelede Malul Kalmayacak Şekilde Yaralananlar İçin Başvuru', eylem: 'Başvuru yap' },
  { kurum: 'İçişleri Bakanlığı', ad: '3713 Sayılı Kanun Kapsamında Başvurular', ozet: '3713 Sayılı Kanunun Geçici 20’nci Maddesi Kapsamında Terörle Mücadelede Malul Kalmayacak Şekilde Yaralananlar İçin Başvuru', eylem: 'Başvuru yap' },
  { kurum: 'Türkiye Cumhuriyet Merkez Bankası', ad: 'Ödeme ve Elektronik Para Hesap Sorgulama', ozet: 'Ödeme ve elektronik para kuruluşlarında hangi kuruluşlarda hesabınız olduğunu bu hizmet üzerinden sorgulayabilirsiniz.', eylem: 'Hesapları Sorgula' },
  { kurum: 'Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü', ad: 'İkametgâh Belgesi Sorgulama', ozet: 'Yerleşim yeri ve diğer adres bilgilerinizi görüntüleyebilir, barkodlu ikametgâh belgenizi kolayca oluşturabilirsiniz.', eylem: 'İkametgâh Belgesi Sorgulama' },
  { kurum: 'Gelir İdaresi Başkanlığı', ad: 'Vergi Borcu İçin Taksitlendirme', ozet: '05.06.2026 itibarıyla vadesinde ödenmemiş amme alacaklarının tecil ve taksitlendirmesi için başvurabilirsiniz.', eylem: 'Taksitlendirme Başvurusu' },
  { kurum: 'Aile ve Sosyal Hizmetler Bakanlığı', ad: 'Koruyucu Aile Ön Başvurusu', ozet: 'Devlet korumasındaki çocuklara sevgi dolu bir yuva sunmak için koruyucu aile ön başvuru işleminizi buradan yapabilirsiniz.', eylem: 'Koruyucu Aile Ön Başvurusu' }
];

const kategoriler = ['Adalet', 'Çevre, Tarım ve Hayvancılık', 'Devlet ve Mevzuat', 'Eğitim', 'Engelsiz', 'Genel Bilgiler', 'Güvenlik', 'İş ve Kariyer', 'Kişisel Bilgiler', 'Sağlık', 'Sosyal Güvenlik ve Sigorta', 'Şikayet ve Bilgi Edinme', 'Telekomünikasyon', 'Trafik ve Ulaşım', 'Vergi, Harç ve Cezalar'];
const kisayollar = ['Çalışma Hayatım', 'Araçlarım (Gerçek Kişi)', 'Araçlarım (Tüzel Kişi)', 'Adrese Teslim Şifre Başvurusu', 'İkametgâhım (Adrese Bağlı Hizmetler)', 'Vâris Hizmetleri', 'Türkiye Ulusal Coğrafi Bilgi Sistemi', 'Özel Sigortalarım', 'e-Tebligatlarım'];

const sutunlar = (liste, n = 3) => {
  const boy = Math.ceil(liste.length / n);
  return Array.from({ length: n }, (_, i) => liste.slice(i * boy, (i + 1) * boy))
    .map((parca) => `
      <div class="kiris-sutun kiris-sutun--4">
        <ul class="kiris-liste kiris-liste--sade kiris-liste--aralikli kiris-u-ust-0">${parca.map((a) => `<li><a class="kiris-link" href="#">${a}</a></li>`).join('')}</ul>
      </div>`).join('');
};

const simgeKart = (simge, ad, aciklama) => `
      <a class="kiris-simge-kart" href="#"><span class="kiris-simge-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-${simge}"/></svg></span><span class="kiris-simge-kart__ad">${ad}</span><p class="kiris-simge-kart__aciklama">${aciklama}</p></a>`;

export const ornek = {
  slug: 'e-devlet',
  ad: 'e-Devlet Kapısı',
  kisaAd: 'e-Devlet',
  birebir: true,
  kurum: 'e-Devlet Kapısı',
  ustKurum: 'T.C. Cumhurbaşkanlığı Siber Güvenlik Başkanlığı kurar ve yönetir. Türksat A.Ş. geliştirir ve işletir.',
  url: 'https://www.turkiye.gov.tr',
  baslikLogo: { src: '../../varliklar/kurumlar/e-devlet-kapisi-beyaz.svg', alt: 'türkiye.gov.tr, Devletin Kısayolu', genislik: 250, yukseklik: 60 },
  logo: { src: '../../varliklar/e-devlet-isaret.png', alt: '' },
  ozet: 'Gerçek ana sayfanın on üç bölümü aynı sırayla: arama, beş temel işlev, öne çıkan hizmetler, kısayollar, en çok kullanılanlar, kategoriler, mobil, sayılar ve beş sütunlu alt bilgi.',
  menu: ['Hızlı Çözüm', 'Giriş Yap'],
  bilesenler: ['Arama (öneri listesi ile)', 'Simge kartı', 'Kart', 'Liste', 'İstatistik kutusu', 'Alt bilgi', 'Simge'],
  iletisim: [
    { etiket: 'Hızlı Çözüm Merkezi', deger: 'Bize Yazın', href: '#' },
    { etiket: 'e-Devlet Çağrı Merkezi', deger: '160', href: 'tel:160' },
    { etiket: 'Engelsiz Çağrı Merkezi', deger: 'İşaret dili ile görüntülü görüşme', href: '#' }
  ],
  altBilgiSutunlari: [
    { baslik: 'Kurumsal', baglantilar: ['English', 'Hakkımızda', 'Yasal Bildirim', 'KVKK Aydınlatma Yükümlülüğü', 'Gizlilik ve Kullanım', 'Politikalarımız', 'DETSİS', 'Kurumsal Kimlik'] },
    { baslik: 'e-Hizmetler', baglantilar: ['Sık Kullanılan Hizmetler', 'Yeni Eklenen Hizmetler', 'Kurum Hizmetleri'] },
    { baslik: 'Yardım', baglantilar: ['Genel Yardım', 'Sıkça Sorulanlar', 'Güvenliğiniz İçin', 'Help For Non-Citizens'] },
    { baslik: 'Bize Ulaşın', baglantilar: ['İletişim', 'CİMER Başvurusu'] },
    { baslik: 'Erişilebilirlik Seçenekleri', baglantilar: ['Salt Metin Görünümü', 'Daha Belirgin Odaklama', 'Klavye Kısayolları', 'Site Haritası'] }
  ],
  sosyal: ['Facebook', 'X', 'YouTube', 'Instagram'],
  yasalBaglantilar: ['Gizlilik, Kullanım ve Telif Hakları'],
  telif: '© 2026 Tüm hakları saklıdır.',
  govde: `
<section class="kiris-kahraman">
  <div class="kiris-kap">
    <h1 class="kiris-kahraman__baslik">Hızlı Arama</h1>
    <p class="kiris-kahraman__metin">e-Devlet Kapısı ile bilgi ve belgelerinize tek noktadan ulaşabilir, başvuru işlemlerinizi hızla gerçekleştirebilirsiniz.</p>
    <div class="kiris-arama-onerileri" data-kiris="arama" data-kaynak-id="arama-verisi">
      <form class="kiris-arama kiris-arama--buyuk" role="search" action="#" method="get">
        <label class="kiris-gorsel-gizli" for="aranan">Aranan terim</label>
        <input class="kiris-girdi kiris-arama__girdi" id="aranan" name="q" type="search" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="aranan-liste" autocomplete="off" placeholder="Ulaşmak istediğiniz hizmet, kurum veya bilgiyi yazın">
        <button class="kiris-button kiris-arama__dugme" type="submit">Ara</button>
      </form>
      <div class="kiris-arama-onerileri__liste" id="aranan-liste" role="listbox" aria-label="Arama önerileri" hidden></div>
      <p class="kiris-gorsel-gizli" data-kiris-durum aria-live="polite"></p>
      <script type="application/json" id="arama-verisi">${JSON.stringify(aramaOnerileri)}</script>
    </div>
    <p class="kiris-yardim kiris-u-ust-2 kiris-u-alt-0">Örneğin “adli sicil belgesi”, “şifremi unuttum”, “cumhurbaşkanlığı” ya da “ankara” şeklinde arama yapabilirsiniz.</p>
  </div>
</section>

<section class="kiris-bolum" aria-labelledby="temel">
  <div class="kiris-kap">
    <h2 class="kiris-bolum__baslik" id="temel">Temel İşlevler</h2>
    <div class="kiris-kart-izgara kiris-kart-izgara--5 kiris-kart-izgara--sik">
      ${simgeKart('eservice', 'e-Hizmetler', 'Sorgulama, Başvuru ve Ödeme hizmetleri.')}
      ${simgeKart('agency', 'Kurumlar', 'Resmi kurumların hizmetleri ve iletişim bilgileri.')}
      ${simgeKart('municipality', 'Belediyeler', 'Belediyelerin iletişim bilgileri ve sundukları hizmetler.')}
      ${simgeKart('business', 'Firmalar', 'Şirketlerdeki fatura ve abonelik bilgilerinize erişin.')}
      ${simgeKart('education', 'Üniversiteler', 'Üniversitelerin sundukları hizmetler.')}
    </div>
    </div>
</section>

<section class="kiris-bolum kiris-bolum--yumusak" aria-labelledby="one-cikan">
  <div class="kiris-kap">
    <h2 class="kiris-gorsel-gizli" id="one-cikan">Öne çıkan hizmetler</h2>
    <div class="kiris-izgara">
      <div class="kiris-sutun kiris-sutun--3">
        <div class="kiris-vurgu">
          <p class="kiris-ust-baslik">ATAM</p>
          <p class="kiris-govde">Atatürk Araştırma Merkezi Başkanlığı İnternet sitesini ziyaret edin.</p>
          <a class="kiris-link" href="#">Siteye git<span class="kiris-gorsel-gizli"> (yeni sekmede açılır)</span></a>
        </div>
      </div>
      <div class="kiris-sutun kiris-sutun--9">
        <div class="kiris-kayan-pano kiris-u-ust-0" data-kiris="kayan-pano" data-ad="Öne çıkan hizmetler">
          <div class="kiris-kayan-pano__ust"><p class="kiris-gorsel-gizli" data-kiris-durum aria-live="polite"></p><div class="kiris-kayan-pano__dugmeler"><button class="kiris-button kiris-button--ikincil kiris-button--simge" type="button" data-yon="geri" aria-label="Önceki"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-arrow-left"/></svg></button><button class="kiris-button kiris-button--ikincil kiris-button--simge" type="button" data-yon="ileri" aria-label="Sonraki"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-arrow-right"/></svg></button><button class="kiris-button kiris-button--ikincil kiris-button--kucuk" type="button" data-durdur aria-pressed="false">Durdur</button></div></div>
          <ul class="kiris-kayan-pano__serit">${oneCikan.map((o) => `
            <li class="kiris-kayan-pano__slayt" tabindex="-1"><div class="kiris-kart">
              <p class="kiris-kart__kurum">${o.kurum}</p>
              <h3 class="kiris-kart__baslik">${o.ad}</h3>
              <p class="kiris-kart__ozet">${o.ozet}</p>
              <p class="kiris-kart__alt"><a class="kiris-button kiris-button--ikincil" href="#">${o.eylem}</a></p>
            </div></li>`).join('')}
          </ul>
          <div class="kiris-kayan-pano__noktalar" aria-label="Slaytlar"></div>
        </div>
      </div>
    </div>
    </div>
</section>

<section class="kiris-bolum" aria-labelledby="kisayollar">
  <div class="kiris-kap">
    <h2 class="kiris-gorsel-gizli" id="kisayollar">Kısayollar</h2>
    <div class="kiris-izgara">${sutunlar(kisayollar)}
    </div>
    </div>
</section>

<section class="kiris-bolum kiris-bolum--yumusak" aria-labelledby="uc-kutu">
  <div class="kiris-kap">
    <h2 class="kiris-gorsel-gizli" id="uc-kutu">Hizmet grupları</h2>
    <div class="kiris-kart-izgara kiris-kart-izgara--3 kiris-u-ust-0">
      <div class="kiris-kart"><span class="kiris-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-business"/></svg></span><h3 class="kiris-kart__baslik">Şirket Hizmetleri</h3><p class="kiris-kart__ozet">Yetkilisi Olduğunuz Şirket Hizmetleri</p><p class="kiris-kart__alt"><a class="kiris-link" href="#">Tümü<span class="kiris-gorsel-gizli">: şirket hizmetleri</span></a></p></div>
      <div class="kiris-kart"><span class="kiris-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-lightning"/></svg></span><h3 class="kiris-kart__baslik">Yeni Hizmetler</h3><p class="kiris-kart__ozet">e-Devlet Kapısı'na En Son Eklenen Hizmetler</p><p class="kiris-kart__alt"><a class="kiris-link" href="#">Tümü<span class="kiris-gorsel-gizli">: yeni hizmetler</span></a></p></div>
      <div class="kiris-kart"><span class="kiris-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-security"/></svg></span><h3 class="kiris-kart__baslik">Evrak Doğrulama Hizmetleri</h3><p class="kiris-kart__ozet">e-Devlet Kapısı Evrak Doğrulama Hizmetleri</p><p class="kiris-kart__alt"><a class="kiris-link" href="#">Tümü<span class="kiris-gorsel-gizli">: evrak doğrulama hizmetleri</span></a></p></div>
    </div>
    </div>
</section>

<section class="kiris-bolum" aria-labelledby="encok">
  <div class="kiris-kap">
    <h2 class="kiris-bolum__baslik" id="encok">En Çok Kullanılan Hizmetler</h2>
    <div class="kiris-kart-izgara kiris-kart-izgara--3 kiris-kart-izgara--sik">${kartlar(encokKullanilan)}
    </div>
    </div>
</section>

<section class="kiris-bolum kiris-bolum--yumusak" aria-labelledby="gundem">
  <div class="kiris-kap">
    <h2 class="kiris-bolum__baslik" id="gundem">Gündemdeki Kısayollar</h2>
    <div class="kiris-kart-izgara kiris-kart-izgara--2">
      <div class="kiris-kart"><span class="kiris-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-tool-list"/></svg></span><h3 class="kiris-kart__baslik"><a href="#">Belge Doğrulama</a></h3><p class="kiris-kart__ozet">e-Devlet Kapısı'ndan alınan barkodlu belgeleri burada doğrulayın.</p></div>
      <div class="kiris-kart"><span class="kiris-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-deaf"/></svg></span><h3 class="kiris-kart__baslik"><a href="#">e-Devlet'te Engel Yok</a></h3><p class="kiris-kart__ozet">Çağrı Merkezimize artık işaret dili kullanarak da ulaşabilirsiniz.</p></div>
    </div>
    </div>
</section>

<section class="kiris-bolum" aria-labelledby="kategoriler">
  <div class="kiris-kap">
    <h2 class="kiris-bolum__baslik" id="kategoriler">e-Hizmet Kategorileri</h2>
    <p class="kiris-govde">e-Devlet Kapısı altyapısını kullanarak hizmet sunan yüzlerce kuruma ait binlerce hizmetten siz de güvenle faydalanabilir bu sayede zamanınızı ve paranızı boşa harcamamış olursunuz. Bu sayfa üzerindeki seçenekleri kullanarak ulaşmak istediğiniz bilgi, belge veya başvuru formuna hızla ulaşabilirsiniz.</p>
    <div class="kiris-izgara">${sutunlar(kategoriler)}
    </div>
    </div>
</section>

<section class="kiris-bolum kiris-bolum--yumusak" aria-labelledby="mobil">
  <div class="kiris-kap">
    <h2 class="kiris-gorsel-gizli" id="mobil">Mobil, Azerbaycan ve sosyal medya</h2>
    <div class="kiris-kart-izgara kiris-kart-izgara--3 kiris-u-ust-0">
      <div class="kiris-kart">
        <h3 class="kiris-kart__baslik">Mobil Cihazlar için e-Devlet Kapısı</h3>
        <p class="kiris-kart__ozet">e-Devlet Kapısı Mobil ile e-hizmetlere Android, iPhone, iPad ve Huawei cihazlarınızdan kolayca erişebilir, "Anlık Bilgilendirme" ile gelişmelerden vakit kaybetmeden haberdar olabilirsiniz.</p>
        <p class="kiris-kart__alt kiris-button-grubu">
          <a class="kiris-button kiris-button--ikincil" href="#"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-appstore"/></svg> App Store</a>
          <a class="kiris-button kiris-button--ikincil" href="#"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-googleplay"/></svg> Google Play</a>
        </p>
      </div>
      <div class="kiris-kart">
        <h3 class="kiris-kart__baslik">Kardeş Ülke Azerbaycan e-Devlet Portalı</h3>
        <p class="kiris-kart__ozet">Azerbaycan Cumhuriyeti’nin elektronik hükûmet portalı.</p>
        <p class="kiris-kart__alt"><a class="kiris-link" href="https://my.gov.az/">my.gov.az<span class="kiris-gorsel-gizli"> (yeni sekmede açılır)</span></a></p>
      </div>
      <div class="kiris-kart">
        <h3 class="kiris-kart__baslik">Sosyal Medyada da Sizin Yanınızdayız!</h3>
        <p class="kiris-kart__ozet">Resmî sosyal medya hesaplarımızda e-Devlet Kapısı ile ilgili gelişmelerden haberdar olabilir, tüm soru ve hata bildirimlerinizi ekibimize iletebilirsiniz. Bize ulaşan tüm yorum ve mesajlar dikkatle incelenmekte ve tümüne cevap verilmesi amaçlanmaktadır.</p>
        <ul class="kiris-liste kiris-liste--sade">
          <li><a class="kiris-link" href="#">Twitter @ekapi</a></li>
          <li><a class="kiris-link" href="#">Facebook /edevletkapi</a></li>
          <li><a class="kiris-link" href="#">YouTube e-Devlet Kapısı</a></li>
          <li><a class="kiris-link" href="#">Instagram /edevletkapisi</a></li>
        </ul>
        <p class="kiris-kart__alt"><a class="kiris-link" href="#">#edevlet Sosyal Medya Kullanım Kılavuzu</a></p>
      </div>
    </div>
    </div>
</section>

<section class="kiris-bolum" aria-labelledby="bilgiler">
  <div class="kiris-kap">
    <h2 class="kiris-bolum__baslik" id="bilgiler">e-Devlet Kapısı ile İlgili Bilgiler</h2>
    <div class="kiris-istatistik">
      <div class="kiris-istatistik__kutu"><span class="kiris-istatistik__deger">69.596.229</span><span class="kiris-istatistik__ad">Kayıtlı Kullanıcı</span></div>
      <div class="kiris-istatistik__kutu"><span class="kiris-istatistik__deger">9.409</span><span class="kiris-istatistik__ad">Hizmet Sayısı</span></div>
      <div class="kiris-istatistik__kutu"><span class="kiris-istatistik__deger">6.426</span><span class="kiris-istatistik__ad">Mobil Hizmetler</span></div>
      <div class="kiris-istatistik__kutu"><span class="kiris-istatistik__deger">1.129</span><span class="kiris-istatistik__ad">Kurum</span></div>
    </div>
    <p class="kiris-govde"><a class="kiris-link" href="#">Detaylı İstatistik Bilgileri</a></p>
    <p class="kiris-govde">e-Devlet Kapısı ile kamu kurumlarının sunduğu hizmetlere tek noktadan, hızlı ve güvenli erişin.</p>
    <div class="kiris-kart-izgara kiris-kart-izgara--3">
      <div class="kiris-kart"><span class="kiris-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-information"/></svg></span><h3 class="kiris-kart__baslik"><a href="#">Nasıl Çalışıyor?</a></h3><p class="kiris-kart__ozet">e-Hizmetlerin nasıl çalıştığını ve sistemin genel mimarisini öğrenin.</p></div>
      <div class="kiris-kart"><span class="kiris-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-a11y"/></svg></span><h3 class="kiris-kart__baslik"><a href="#">Erişilebilirlik</a></h3><p class="kiris-kart__ozet">Engelli bireyler için kullanımı kolaylaştıran özelliklerimizi inceleyin.</p></div>
      <div class="kiris-kart"><span class="kiris-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-security"/></svg></span><h3 class="kiris-kart__baslik"><a href="#">Yüksek Güvenlik</a></h3><p class="kiris-kart__ozet">Kişisel bilgilerinizin korunması için aldığımız önlemleri inceleyin.</p></div>
    </div>
    </div>
</section>
`
};
