// T.C. Sağlık Bakanlığı ana sayfası, birebir. Yalnız Kiriş bileşenleri ile.
// Kaynak: https://www.saglik.gov.tr · 6 Eylül 2026 tarihli içerik.
// Manşet fotoğrafları düşer, başlıklar kalır. İki kayan pano kayan pano kalır.

const manset = [
  'Sağlık Bakanı Memişoğlu İzmir’de Dikili Devlet Hastanesi Açılış Töreni’nde Konuştu',
  'Sağlık Bakanı Prof. Dr. Kemal Memişoğlu’nun Burdur Ziyareti',
  'Sağlık Bakanı Memişoğlu Gaziantep’te 30 Sağlık Tesisinin Açılışını Yaptı',
  'Sağlık Bakanı Memişoğlu Nizip Devlet Hastanesi Açılış Töreni’ne Katıldı'
];

const duyurular = [
  { tarih: '3 Eylül 2026', ad: '2026 Yılı Özel Hastaneler Planlama Artırma İşi İlanı', yeni: true },
  { tarih: '3 Eylül 2026', ad: 'Aşı Nakil Aracı ve Minivan Mal Alımı İhalesi (SIHHAT/2026/SUPT/INT/08)', yeni: true },
  { tarih: '31 Ağustos 2026', ad: 'Amendments Regarding the Request for Expression of Interest (REOI) (Consulting Services)' }
];

const personel = [
  { tarih: '3 Ağustos 2026', ad: '130. Dönem Devlet Hizmeti Yükümlülüğü Kurası' },
  { tarih: '29 Ağustos 2026', ad: '130. Dönem Devlet Hizmeti Yükümlülüğü Mazeret (Eş ve Sağlık) Kurası' },
  { tarih: '27 Ağustos 2026', ad: 'Öğrenci Affı Hakkında Duyuru' }
];

const tanitimlar = ['Annelik Yolculuğu', 'Şehir Hastanelerimiz', 'Kişisel Sağlık Sistemi e-Nabız', 'Arayanların 135 bini Sigarayı Bıraktı', 'Ulusal Medikal Kurtarma Ekibi (UMKE)'];

const hizliErisim = ['Aile Hekim Bilgisi Sorgulama', 'Randevu Almak İstiyorum', 'Doktor Bilgi Bankası', 'T.C. Sağlık Bakanlığı Ödeme Sistemi', 'Aşı Bilgilerimi Sorgula', 'e-Rapor Sistemi', 'Açık Veri Portalı', 'Organ ve Doku Bağışı', 'Tahlil Sonuçlarım', 'E-Kütüphane Sistemi', 'Annelik Yolculuğu', 'Radyolojik Görüntülerim'];

const hatlar = [
  { no: 'Alo 112', ad: 'Acil Çağrı', tel: '112' },
  { no: 'Alo 184', ad: 'SABİM', tel: '184' },
  { no: '444 3 833', ad: 'Evde Sağlık', tel: '4443833' },
  { no: 'Alo 171', ad: 'Sigara Bırakma Hattı', tel: '171' }
];

const liste = (ogeler) => ogeler.map((o) => `
      <li class="kiris-kayit"><p class="kiris-kayit__ust">${o.tarih}</p><h3 class="kiris-kayit__baslik"><a href="#">${o.ad}</a></h3>${o.yeni ? '<p class="kiris-kayit__etiketler"><span class="kiris-etiket kiris-etiket--kirmizi">Yeni</span></p>' : ''}</li>`).join('');

const pano = (ad, slaytlar) => `
    <div class="kiris-kayan-pano kiris-u-ust-0" data-kiris="kayan-pano" data-ad="${ad}">
      <div class="kiris-kayan-pano__ust"><p class="kiris-gorsel-gizli" data-kiris-durum aria-live="polite"></p><div class="kiris-kayan-pano__dugmeler"><button class="kiris-button kiris-button--ikincil kiris-button--simge" type="button" data-yon="geri" aria-label="Önceki"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-arrow-left"/></svg></button><button class="kiris-button kiris-button--ikincil kiris-button--simge" type="button" data-yon="ileri" aria-label="Sonraki"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-arrow-right"/></svg></button><button class="kiris-button kiris-button--ikincil kiris-button--kucuk" type="button" data-durdur aria-pressed="false">Durdur</button></div></div>
      <ul class="kiris-kayan-pano__serit">${slaytlar.map((h) => `
        <li class="kiris-kayan-pano__slayt" tabindex="-1">${h}</li>`).join('')}
      </ul>
      <div class="kiris-kayan-pano__noktalar" aria-label="Slaytlar"></div>
    </div>`;

const simgeKart = (simge, ad) => `
      <a class="kiris-simge-kart" href="#"><span class="kiris-simge-kart__simge"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-${simge}"/></svg></span><span class="kiris-simge-kart__ad">${ad}</span></a>`;

const sutunlar = (ogeler, n = 3) => {
  const boy = Math.ceil(ogeler.length / n);
  return Array.from({ length: n }, (_, i) => ogeler.slice(i * boy, (i + 1) * boy))
    .map((parca) => `
      <div class="kiris-sutun kiris-sutun--4">
        <ul class="kiris-liste kiris-liste--sade kiris-liste--aralikli kiris-u-ust-0">${parca.map((a) => `<li><a class="kiris-link" href="#">${a}</a></li>`).join('')}</ul>
      </div>`).join('');
};

export const ornek = {
  slug: 'saglik',
  ad: 'Sağlık Bakanlığı',
  kisaAd: 'SB',
  birebir: true,
  kurum: 'T.C. Sağlık Bakanlığı',
  ustKurum: 'Türkiye Cumhuriyeti Cumhurbaşkanlığı bakanlığıdır.',
  url: 'https://www.saglik.gov.tr',
  baslikLogo: { svg: 'saglik-bakanligi.svg' },
  logo: { svg: 'saglik-bakanligi.svg', genis: true },
  ozet: 'Gerçek ana sayfanın dokuz bölümü aynı sırayla: manşet, altı hizmet kutusu, haberler, iki duyuru listesi, tanıtımlar, hızlı erişim, dört çağrı hattı ve iki sütunlu koyu alt bilgi.',
  menu: ['Bakan', 'Bakanlık', 'Sağlık Mevzuatı', 'Hizmetlerimiz', 'Basın Odası', 'İletişim'],
  bilesenler: ['Simge kartı', 'Kart', 'Liste', 'Etiket', 'Düğme', 'Alt bilgi', 'Simge'],
  koyuAltBilgi: true,
  iletisim: [
    { etiket: 'Adres', deger: 'Üniversiteler Mahallesi Şehit Mehmet Bayraktar Caddesi No:3 Çankaya/Ankara' },
    { etiket: 'Santral', deger: '+90 312 585 10 00', href: 'tel:+903125851000' },
    { etiket: 'Diğer kanallar', deger: 'İletişim seçenekleri', href: '#' }
  ],
  altBilgiSutunlari: [
    { baslik: 'Kurumsal', baglantilar: ['Sağlıklı Bilgi', 'Sağlık Turizmi', 'Sağlıkta Buluşma Noktası', 'Doküman Yönetim Sistemi'] },
    { baslik: 'Bağlı kuruluşlar ve portallar', baglantilar: ['TÜSEB', 'USHAŞ', 'e-Devlet', 'CİMER', 'e-Kütüphane', 'Hasta Hakları'] }
  ],
  sosyal: ['Facebook', 'Instagram', 'YouTube', 'LinkedIn', 'X'],
  yasalBaglantilar: ['Çerez Politikası', 'Bilgi Güvenliği İhlal Bildirimi', 'Site Haritası', 'English'],
  telif: '© 2026 T.C. Sağlık Bakanlığı Tüm hakları saklıdır.',
  govde: `
<div class="kiris-cerez" role="region" aria-label="Çerez tercihi" data-kiris="cerez">
  <div class="kiris-kap">
    <div class="kiris-cerez__soru">
      <h2 class="kiris-cerez__baslik">T.C. Sağlık Bakanlığı Çerez Politikası</h2>
      <p class="kiris-govde">Sitemizde sizlere daha iyi hizmet verebilmek için gizliliğe uygun şekilde çerezler kullanmaktayız. <a class="kiris-link" href="#">Çerez politikamızı inceleyin.</a></p>
      <div class="kiris-button-grubu"><button class="kiris-button" type="button" data-cerez="kabul">Kabul et</button><button class="kiris-button" type="button" data-cerez="ret">Reddet</button></div>
    </div>
    <div class="kiris-cerez__onay" hidden>
      <p class="kiris-govde"><span data-cerez-metin></span> Tercihinizi <a class="kiris-link" href="#">çerez sayfasından</a> değiştirebilirsiniz.</p>
      <button class="kiris-button kiris-button--ikincil" type="button" data-cerez-gizle>Mesajı gizle</button>
    </div>
  </div>
</div>

<section class="kiris-kahraman">
  <div class="kiris-kap">
    <p class="kiris-kahraman__ust">Manşet</p>
    <h1 class="kiris-kahraman__baslik">${manset[0]}</h1>
    ${pano('Manşet', manset.map((m) => `<div class="kiris-kart"><h2 class="kiris-kart__baslik"><a href="#">${m}</a></h2></div>`))}
    <div class="kiris-kart-izgara kiris-kart-izgara--5 kiris-kart-izgara--sik kiris-u-alt-0">
      ${simgeKart('health', 'e-Nabız')}
      ${simgeKart('fastresponse', 'Acil Sağlık')}
      ${simgeKart('complaints', 'SABİM')}
      ${simgeKart('date', 'MHRS')}
      ${simgeKart('information', 'Bilgi Edinme')}
      ${simgeKart('state', 'HealthTürkiye')}
    </div>
  </div>
</section>

<section class="kiris-bolum" aria-label="Haberler ve duyurular">
  <div class="kiris-kap">
    <div class="kiris-izgara">
      <section class="kiris-sutun kiris-sutun--4" aria-labelledby="haberler">
        <div class="kiris-bolum__ust">
          <h2 class="kiris-bolum__baslik" id="haberler">Haberler</h2>
          <a class="kiris-link" href="#">Tümü<span class="kiris-gorsel-gizli">: haberler</span></a>
        </div>
        <ul class="kiris-kayitlar">${liste([{ tarih: '6 Ağustos 2026', ad: 'Sağlık Bakanı Memişoğlu AFAD Başkanı Vali Pehlivan ile Bir Araya Geldi' }])}
        </ul>
      </section>
      <section class="kiris-sutun kiris-sutun--4" aria-labelledby="duyurular">
        <div class="kiris-bolum__ust">
          <h2 class="kiris-bolum__baslik" id="duyurular">Duyurular</h2>
          <a class="kiris-link" href="#">Tümü<span class="kiris-gorsel-gizli">: duyurular</span></a>
        </div>
        <ul class="kiris-kayitlar">${liste(duyurular)}
        </ul>
      </section>
      <section class="kiris-sutun kiris-sutun--4" aria-labelledby="personel">
        <div class="kiris-bolum__ust">
          <h2 class="kiris-bolum__baslik" id="personel">Personel Duyuruları</h2>
          <a class="kiris-link" href="#">Tümü<span class="kiris-gorsel-gizli">: personel duyuruları</span></a>
        </div>
        <ul class="kiris-kayitlar">${liste(personel)}
        </ul>
      </section>
    </div>
  </div>
</section>

<section class="kiris-bolum kiris-bolum--yumusak" aria-labelledby="tanitim">
  <div class="kiris-kap">
    <h2 class="kiris-gorsel-gizli" id="tanitim">Tanıtımlar</h2>
    ${pano('Tanıtımlar', tanitimlar.map((t) => `<div class="kiris-kart"><h3 class="kiris-kart__baslik">${t}</h3><p class="kiris-kart__alt"><a class="kiris-link" href="#">Detaylı Bilgi<span class="kiris-gorsel-gizli">: ${t}</span></a></p></div>`))}
    </div>
</section>

<section class="kiris-bolum" aria-labelledby="hizli">
  <div class="kiris-kap">
    <h2 class="kiris-bolum__baslik" id="hizli">Hızlı Erişim</h2>
    <div class="kiris-izgara">${sutunlar(hizliErisim)}
    </div>
    </div>
</section>

<section class="kiris-bolum kiris-bolum--yumusak" aria-labelledby="hatlar">
  <div class="kiris-kap">
    <h2 class="kiris-gorsel-gizli" id="hatlar">Çağrı hatları</h2>
    <div class="kiris-kart-izgara kiris-kart-izgara--4 kiris-u-ust-0">${hatlar.map((h) => `
      <div class="kiris-kart"><p class="kiris-kart__kurum">${h.ad}</p><span class="kiris-kart__buyuk-deger">${h.no}</span><p class="kiris-kart__alt"><a class="kiris-button kiris-button--ikincil" href="tel:${h.tel}"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-phone"/></svg> Hemen Ara<span class="kiris-gorsel-gizli">: ${h.ad}</span></a></p></div>`).join('')}
    </div>
    </div>
</section>
`
};
