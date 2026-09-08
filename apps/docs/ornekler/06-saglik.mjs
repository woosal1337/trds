// T.C. Sağlık Bakanlığı ana sayfası, birebir. Yalnız TRDS bileşenleri ile.
// Kaynak: https://www.saglik.gov.tr — 6 Eylül 2026 tarihli içerik.
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
      <li class="trds-kayit"><p class="trds-kayit__ust">${o.tarih}</p><h3 class="trds-kayit__baslik"><a href="#">${o.ad}</a></h3>${o.yeni ? '<p class="trds-kayit__etiketler"><span class="trds-etiket trds-etiket--kirmizi">Yeni</span></p>' : ''}</li>`).join('');

const pano = (ad, slaytlar) => `
    <div class="trds-kayan-pano trds-u-ust-0" data-trds="kayan-pano" data-ad="${ad}">
      <div class="trds-kayan-pano__ust"><p class="trds-gorsel-gizli" data-trds-durum aria-live="polite"></p><div class="trds-kayan-pano__dugmeler"><button class="trds-button trds-button--ikincil trds-button--simge" type="button" data-yon="geri" aria-label="Önceki"><svg class="trds-simge" aria-hidden="true"><use href="#trds-arrow-left"/></svg></button><button class="trds-button trds-button--ikincil trds-button--simge" type="button" data-yon="ileri" aria-label="Sonraki"><svg class="trds-simge" aria-hidden="true"><use href="#trds-arrow-right"/></svg></button><button class="trds-button trds-button--ikincil trds-button--kucuk" type="button" data-durdur aria-pressed="false">Durdur</button></div></div>
      <ul class="trds-kayan-pano__serit">${slaytlar.map((h) => `
        <li class="trds-kayan-pano__slayt" tabindex="-1">${h}</li>`).join('')}
      </ul>
      <div class="trds-kayan-pano__noktalar" aria-label="Slaytlar"></div>
    </div>`;

const simgeKart = (simge, ad) => `
      <a class="trds-simge-kart" href="#"><span class="trds-simge-kart__simge"><svg class="trds-simge" aria-hidden="true"><use href="#trds-${simge}"/></svg></span><span class="trds-simge-kart__ad">${ad}</span></a>`;

const sutunlar = (ogeler, n = 3) => {
  const boy = Math.ceil(ogeler.length / n);
  return Array.from({ length: n }, (_, i) => ogeler.slice(i * boy, (i + 1) * boy))
    .map((parca) => `
      <div class="trds-sutun trds-sutun--4">
        <ul class="trds-liste trds-liste--sade trds-liste--aralikli trds-u-ust-0">${parca.map((a) => `<li><a class="trds-link" href="#">${a}</a></li>`).join('')}</ul>
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
<div class="trds-cerez" role="region" aria-label="Çerez tercihi" data-trds="cerez">
  <div class="trds-kap">
    <div class="trds-cerez__soru">
      <h2 class="trds-cerez__baslik">T.C. Sağlık Bakanlığı Çerez Politikası</h2>
      <p class="trds-govde">Sitemizde sizlere daha iyi hizmet verebilmek için gizliliğe uygun şekilde çerezler kullanmaktayız. <a class="trds-link" href="#">Çerez politikamızı inceleyin.</a></p>
      <div class="trds-button-grubu"><button class="trds-button" type="button" data-cerez="kabul">Kabul et</button><button class="trds-button" type="button" data-cerez="ret">Reddet</button></div>
    </div>
    <div class="trds-cerez__onay" hidden>
      <p class="trds-govde"><span data-cerez-metin></span> Tercihinizi <a class="trds-link" href="#">çerez sayfasından</a> değiştirebilirsiniz.</p>
      <button class="trds-button trds-button--ikincil" type="button" data-cerez-gizle>Mesajı gizle</button>
    </div>
  </div>
</div>

<section class="trds-kahraman">
  <div class="trds-kap">
    <p class="trds-kahraman__ust">Manşet</p>
    <h1 class="trds-kahraman__baslik">${manset[0]}</h1>
    ${pano('Manşet', manset.map((m) => `<div class="trds-kart"><h2 class="trds-kart__baslik"><a href="#">${m}</a></h2></div>`))}
    <div class="trds-kart-izgara trds-kart-izgara--5 trds-kart-izgara--sik trds-u-alt-0">
      ${simgeKart('health', 'e-Nabız')}
      ${simgeKart('fastresponse', 'Acil Sağlık')}
      ${simgeKart('complaints', 'SABİM')}
      ${simgeKart('date', 'MHRS')}
      ${simgeKart('information', 'Bilgi Edinme')}
      ${simgeKart('state', 'HealthTürkiye')}
    </div>
  </div>
</section>

<section class="trds-bolum" aria-label="Haberler ve duyurular">
  <div class="trds-kap">
    <div class="trds-izgara">
      <section class="trds-sutun trds-sutun--4" aria-labelledby="haberler">
        <div class="trds-bolum__ust">
          <h2 class="trds-bolum__baslik" id="haberler">Haberler</h2>
          <a class="trds-link" href="#">Tümü<span class="trds-gorsel-gizli">: haberler</span></a>
        </div>
        <ul class="trds-kayitlar">${liste([{ tarih: '6 Ağustos 2026', ad: 'Sağlık Bakanı Memişoğlu AFAD Başkanı Vali Pehlivan ile Bir Araya Geldi' }])}
        </ul>
      </section>
      <section class="trds-sutun trds-sutun--4" aria-labelledby="duyurular">
        <div class="trds-bolum__ust">
          <h2 class="trds-bolum__baslik" id="duyurular">Duyurular</h2>
          <a class="trds-link" href="#">Tümü<span class="trds-gorsel-gizli">: duyurular</span></a>
        </div>
        <ul class="trds-kayitlar">${liste(duyurular)}
        </ul>
      </section>
      <section class="trds-sutun trds-sutun--4" aria-labelledby="personel">
        <div class="trds-bolum__ust">
          <h2 class="trds-bolum__baslik" id="personel">Personel Duyuruları</h2>
          <a class="trds-link" href="#">Tümü<span class="trds-gorsel-gizli">: personel duyuruları</span></a>
        </div>
        <ul class="trds-kayitlar">${liste(personel)}
        </ul>
      </section>
    </div>
  </div>
</section>

<section class="trds-bolum trds-bolum--yumusak" aria-labelledby="tanitim">
  <div class="trds-kap">
    <h2 class="trds-gorsel-gizli" id="tanitim">Tanıtımlar</h2>
    ${pano('Tanıtımlar', tanitimlar.map((t) => `<div class="trds-kart"><h3 class="trds-kart__baslik">${t}</h3><p class="trds-kart__alt"><a class="trds-link" href="#">Detaylı Bilgi<span class="trds-gorsel-gizli">: ${t}</span></a></p></div>`))}
    </div>
</section>

<section class="trds-bolum" aria-labelledby="hizli">
  <div class="trds-kap">
    <h2 class="trds-bolum__baslik" id="hizli">Hızlı Erişim</h2>
    <div class="trds-izgara">${sutunlar(hizliErisim)}
    </div>
    </div>
</section>

<section class="trds-bolum trds-bolum--yumusak" aria-labelledby="hatlar">
  <div class="trds-kap">
    <h2 class="trds-gorsel-gizli" id="hatlar">Çağrı hatları</h2>
    <div class="trds-kart-izgara trds-kart-izgara--4 trds-u-ust-0">${hatlar.map((h) => `
      <div class="trds-kart"><p class="trds-kart__kurum">${h.ad}</p><span class="trds-kart__buyuk-deger">${h.no}</span><p class="trds-kart__alt"><a class="trds-button trds-button--ikincil" href="tel:${h.tel}"><svg class="trds-simge" aria-hidden="true"><use href="#trds-phone"/></svg> Hemen Ara<span class="trds-gorsel-gizli">: ${h.ad}</span></a></p></div>`).join('')}
    </div>
    </div>
</section>
`
};
