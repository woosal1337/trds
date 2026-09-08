// Sosyal Güvenlik Kurumu ana sayfası, birebir. Yalnız Kiriş bileşenleri ile.
// Kaynak: https://www.sgk.gov.tr · 6 Eylül 2026 tarihli içerik.
// Bölümler gerçek sayfa ile aynı sırada. Manşet fotoğrafı düşer, slogan kalır.

const duyurular = [
  { tarih: '2 Eylül 2026', birim: 'Genel Sağlık Sigortası Genel Müdürlüğü', ad: 'Bedeli Ödenecek İlaçlar Listesinde Yapılan Düzenlemeler Hakkında Duyuru 2026/34' },
  { tarih: '31 Ağustos 2026', birim: 'Genel Sağlık Sigortası Genel Müdürlüğü', ad: '29/08/2026 SUT Değişiklik Tebliği İşlenmiş Güncel 2013 SUT' },
  { tarih: '31 Ağustos 2026', birim: 'Genel Sağlık Sigortası Genel Müdürlüğü', ad: '29/08/2026 Tarihli ve 33355 Sayılı Resmî Gazete’de Yayımlanan “Sosyal Güvenlik Kurumu Sağlık Uygulama Tebliği”' },
  { tarih: '31 Ağustos 2026', birim: 'İnşaat ve Emlak Daire Başkanlığı', ad: 'Gayrimenkul Satış İlanı' },
  { tarih: '26 Ağustos 2026', birim: 'Genel Sağlık Sigortası Genel Müdürlüğü', ad: 'Bedeli Ödenecek İlaçlar Listesinde Yapılan Düzenlemeler Hakkında Duyuru 2026/33' },
  { tarih: '21 Ağustos 2026', birim: 'Bilgi Teknolojileri Genel Müdürlüğü', ad: 'Planlı Altyapı Çalışması' }
];

const haberler = [
  { tarih: '20 Ağustos 2026', ad: 'Sosyal Güvenlik Kurumu ve Kamu İhale Kurumu İş Birliğiyle Yurt Dışı İlaç Tedariki Dijitale Taşınıyor', ozet: 'Sosyal Güvenlik Kurumu (SGK) ile Kamu İhale Kurumu (KİK) arasında, yurt dışından beşerî tıbbi ürün temini ve bunlara ilişkin hizmet alımlarının elektronik ortamda yürütülmesine dair iş birliği protokolü imzalandı.' },
  { tarih: '28 Temmuz 2026', ad: 'SGK ile Türkiye Sigorta Arasında Emeklilere Özel Protokol İmzalandı', ozet: 'Protokolle Emekli Dijital Kart sahiplerine tamamlayıcı sağlık, konut, kasko ve trafik sigortalarında, ödeme avantajları ve yüzde 30\'a varan indirim imkanı sağlandı.' },
  { tarih: '22 Temmuz 2026', ad: 'SGK Başkanı Elitaş, TÜED’i Ziyaret Etti', ozet: 'Sosyal Güvenlik Kurumu (SGK) Başkanı Yunus Elitaş, Türkiye Emekliler Derneği (TÜED) Genel Merkezini ziyaret etti.' },
  { tarih: '17 Temmuz 2026', ad: 'SGK Başkanı Elitaş’tan 15 Temmuz Şehitlerinin Ailelerine Anlamlı Ziyaret', ozet: 'SGK Başkanı Yunus Elitaş, 15 Temmuz Demokrasi ve Milli Birlik Günü vesilesiyle, darbe girişimi gecesi şehit düşen SGK personeli Ali İhsan Lezgi ve Yakup Kozan’ın ailelerini ziyaret etti.' },
  { tarih: '3 Temmuz 2026', ad: 'Başkan Elitaş, Karabük İl Müdürlüğünü Ziyaret Etti', ozet: 'Sosyal Güvenlik Kurumu (SGK) Başkanı Yunus Elitaş, Karabük Sosyal Güvenlik İl Müdürlüğünü ziyaret etti.' }
];

const [ilkHaber, ...digerHaberler] = haberler;

const simgeKart = (simge, ad, aciklama) => `
      <a class="kiris-simge-kart" href="#"><span class="kiris-simge-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-${simge}"/></svg></span><span class="kiris-simge-kart__ad">${ad}</span><p class="kiris-simge-kart__aciklama">${aciklama}</p></a>`;

export const ornek = {
  slug: 'sgk',
  ad: 'SGK',
  kisaAd: 'SGK',
  birebir: true,
  kurum: 'Sosyal Güvenlik Kurumu',
  ustKurum: 'Çalışma ve Sosyal Güvenlik Bakanlığı bağlı kuruluşudur.',
  url: 'https://www.sgk.gov.tr',
  baslikLogo: { src: '../../varliklar/kurumlar/sgk-beyaz.svg', alt: 'Sosyal Güvenlik Kurumu', genislik: 1303, yukseklik: 640 },
  logo: { src: '../../varliklar/kurumlar/sgk.svg', alt: '', genis: true, genislik: 150, yukseklik: 73 },
  ozet: 'Gerçek ana sayfanın sekiz bölümü aynı sırayla: üç bilgi kutusu, duyurular, ihale ilanları, haberler, e-uygulamalar, SMS kaydı ve iletişim. Adres ve telefon yalnız koyu alt bilgide durur.',
  menu: ['Ana Sayfa', 'Birimler', 'İl Müdürlükleri', 'İstatistikler', 'E-SGK', 'S.S.S.', 'İletişim', 'Mevzuat'],
  bilesenler: ['Kart', 'Simge kartı', 'Liste', 'Vurgulu metin', 'Tanım listesi', 'Alt bilgi', 'Simge'],
  koyuAltBilgi: true,
  iletisim: [
    { etiket: 'Adres', deger: 'Sosyal Güvenlik Kurumu Ziyabey Cad. No:6 06520 Balgat/ANKARA' },
    { etiket: 'Telefon', deger: '0 (312) 207 80 00', href: 'tel:+903122078000' },
    { etiket: 'Canlı destek', deger: 'Alo 170', href: 'tel:170' }
  ],
  sosyal: ['Facebook', 'X', 'YouTube', 'Instagram', 'LinkedIn'],
  yasalBaglantilar: ['KVKK', 'Aydınlatma Metni', 'Yasal Uyarı', 'RSS', 'Site Haritası'],
  telif: 'Tüm Hakları Saklıdır © 2025 Basın ve Halkla İlişkiler Müşavirliği / Bilgi Teknolojileri Genel Müdürlüğü',
  govde: `
<section class="kiris-kahraman">
  <div class="kiris-kap">
    <p class="kiris-kahraman__ust">Sosyal Güvenlik Kurumu</p>
    <h1 class="kiris-kahraman__baslik">Daima Yanınızda</h1>
    <p class="kiris-kahraman__metin">Çalışan, işveren, emekli ve hak sahibi için sosyal güvenlik işlemleri tek adreste.</p>
    <div class="kiris-kart-izgara kiris-kart-izgara--3 kiris-u-alt-0">
      <div class="kiris-kart"><span class="kiris-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-user"/></svg></span><h2 class="kiris-kart__baslik"><a href="#">Çalışan ve İşveren</a></h2><p class="kiris-kart__ozet">Çalışan ve İşveren Hakkında Bilmek İstedikleriniz</p></div>
      <div class="kiris-kart"><span class="kiris-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-socialsecurity"/></svg></span><h2 class="kiris-kart__baslik"><a href="#">Emeklilik</a></h2><p class="kiris-kart__ozet">Emeklilik Hakkında Bilmek İstedikleriniz</p></div>
      <div class="kiris-kart"><span class="kiris-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-health"/></svg></span><h2 class="kiris-kart__baslik"><a href="#">Genel Sağlık Sigortası</a></h2><p class="kiris-kart__ozet">Genel Sağlık Sigortası Hakkında Bilmek İstedikleriniz</p></div>
    </div>
  </div>
</section>

<section class="kiris-bolum" aria-labelledby="duyurular">
  <div class="kiris-kap">
    <div class="kiris-bolum__ust">
      <h2 class="kiris-bolum__baslik" id="duyurular">Duyurular</h2>
      <a class="kiris-link" href="#">Tüm Duyurular</a>
    </div>
    <ul class="kiris-kayitlar">${duyurular.map((d) => `
      <li class="kiris-kayit"><p class="kiris-kayit__ust">${d.tarih} · ${d.birim}</p><h3 class="kiris-kayit__baslik"><a href="#">${d.ad}</a></h3></li>`).join('')}
    </ul>
    </div>
</section>

<section class="kiris-bolum kiris-bolum--yumusak" aria-labelledby="ihale">
  <div class="kiris-kap">
    <h2 class="kiris-bolum__baslik" id="ihale">İhale ve Satış İlanları</h2>
    <div class="kiris-kart-izgara kiris-kart-izgara--4 kiris-kart-izgara--sik">
      <div class="kiris-kart kiris-kart--sade"><h3 class="kiris-kart__baslik"><a href="#">Gayrimenkul Satış İhaleleri</a></h3></div>
      <div class="kiris-kart kiris-kart--sade"><h3 class="kiris-kart__baslik"><a href="#">Diğer İhaleler</a></h3></div>
      <div class="kiris-kart kiris-kart--sade"><h3 class="kiris-kart__baslik"><a href="#">Hacizli Malların Satış İlanları</a></h3></div>
      <div class="kiris-kart kiris-kart--sade"><h3 class="kiris-kart__baslik"><a href="#">EKAP</a></h3></div>
    </div>
    </div>
</section>

<section class="kiris-bolum" aria-labelledby="haberler">
  <div class="kiris-kap">
    <div class="kiris-bolum__ust">
      <h2 class="kiris-bolum__baslik" id="haberler">Haberler</h2>
      <a class="kiris-link" href="#">Tüm Haberler</a>
    </div>
    <div class="kiris-izgara">
      <div class="kiris-sutun kiris-sutun--7">
        <article class="kiris-kart">
          <p class="kiris-kart__kurum">${ilkHaber.tarih} · Başkanlık</p>
          <h3 class="kiris-kart__baslik"><a href="#">${ilkHaber.ad}</a></h3>
          <p class="kiris-kart__ozet">${ilkHaber.ozet}</p>
          <p class="kiris-kart__alt"><a class="kiris-link" href="#">Devamını Oku<span class="kiris-gorsel-gizli">: ${ilkHaber.ad}</span></a></p>
        </article>
      </div>
      <div class="kiris-sutun kiris-sutun--5">
        <ul class="kiris-liste kiris-liste--sade kiris-liste--aralikli kiris-u-ust-0">${digerHaberler.map((h) => `
          <li><p class="kiris-ust-baslik kiris-u-alt-0">${h.tarih} · Başkanlık</p><a class="kiris-link" href="#">${h.ad}</a></li>`).join('')}
        </ul>
      </div>
    </div>
    </div>
</section>

<section class="kiris-bolum kiris-bolum--yumusak" aria-labelledby="euyg">
  <div class="kiris-kap">
    <h2 class="kiris-bolum__baslik" id="euyg">E-Uygulamalar</h2>
    <div class="kiris-kart-izgara kiris-kart-izgara--4 kiris-kart-izgara--sik">
      ${simgeKart('state', 'Kamu', 'Kamu çalışanları için')}
      ${simgeKart('user', 'Vatandaş', 'Bireysel işlemler için')}
      ${simgeKart('business', 'İşveren', 'Kurumsal işlemler için')}
      ${simgeKart('health', 'Sağlık Hizmet Sunucuları', 'Sağlık kurumları için')}
    </div>
    </div>
</section>

<section class="kiris-bolum" aria-labelledby="sms">
  <div class="kiris-kap">
    <h2 class="kiris-bolum__baslik" id="sms">Cep Telefonu Kayıt</h2>
    <div class="kiris-vurgu">
      <p class="kiris-govde">Kurumumuz tarafından verilen sigortalı, işveren, emekli ve hak sahiplerine ait muhasebe ödemeleri, medula hastane-eczane-optik, emeklilik, hak sahipliği ve sigortalılık işlemleri vb. konularda Cep Telefonunuza Bilgilendirme Mesajı Gelmesi için SGK SMS Bilgilendirme Sistemine Cep Telefonu Numaranızı Kayıt Ediniz.</p>
      <p class="kiris-govde">Sosyal Güvenlik Kurumu SMS Bilgilendirme Sistemi ile aşağıdaki konularda bilgilendirme yapılmaktadır:</p>
      <ul class="kiris-liste kiris-liste--madde">
        <li>Sigortalılık hizmetleri (işe giriş - çıkış vb.)</li>
        <li>Emeklilik hizmetleri (ikramiye, aylık vb.)</li>
        <li>GSS (e-reçete, hastane optik vb.)</li>
        <li>Ödeme (rapor, cenaze, evlilik vb.)</li>
        <li>Evrak başvuru ve takip vb.</li>
      </ul>
      <p class="kiris-govde kiris-u-alt-0">SMS Bilgilendirme Sistemimize kayıt olmak için <a class="kiris-link" href="https://www.turkiye.gov.tr/sgk-cep-telefonu-bilgisi-beyan">e-Devlet üzerinden cep telefonu bilgisi beyanı</a> sayfasına gidin.</p>
    </div>
    </div>
</section>

<section class="kiris-bolum kiris-bolum--yumusak" aria-labelledby="iletisim">
  <div class="kiris-kap">
    <h2 class="kiris-bolum__baslik" id="iletisim">İletişim</h2>
    <p class="kiris-govde">Daha fazla bilgi için lütfen <a class="kiris-link" href="#">bizimle iletişime geçin</a>. Adres, santral ve Alo 170 hattı sayfanın altındadır.</p>
    <div class="kiris-kart-izgara kiris-kart-izgara--2 kiris-kart-izgara--sik">
      <div class="kiris-kart kiris-kart--sade"><p class="kiris-kart__kurum">Merkez birimleri</p><h3 class="kiris-kart__baslik"><a href="#">Birimlerin listesi</a></h3></div>
      <div class="kiris-kart kiris-kart--sade"><p class="kiris-kart__kurum">Taşra teşkilatı</p><h3 class="kiris-kart__baslik"><a href="#">İl müdürlüklerinin listesi</a></h3></div>
    </div>
    </div>
</section>
`
};
