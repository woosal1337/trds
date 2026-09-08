// Gelir İdaresi Başkanlığı, Dijital Vergi Dairesi ana sayfası, yalnız TRDS ile.
// Gerçek site: https://dijital.gib.gov.tr — vergi borcu, beyanname, ödeme.

export const ornek = {
  slug: 'gib',
  ad: 'Dijital Vergi Dairesi',
  kurum: 'Gelir İdaresi Başkanlığı',
  ustKurum: 'Hazine ve Maliye Bakanlığı bağlı kuruluşudur.',
  kisaAd: 'GİB',
  iletisim: [{ etiket: 'Vergi iletişim merkezi', deger: '189', href: 'tel:189' }],
  sosyal: ['X', 'YouTube', 'Instagram'],
  url: 'https://dijital.gib.gov.tr',
  ozet: 'Gerçek kişi ve şirket aynı sayfaya gelir. Sayfa ikisini vergi kimlik numarası ile ayırır ve borcu ilk ekranda gösterir.',
  menu: ['Borç sorgulama', 'Beyanname', 'Ödeme', 'Belgeler', 'Vergi takvimi'],
  bilesenler: ['Vergi kimlik numarası girişi', 'Girdi grubu', 'Özet listesi', 'Tablo', 'Uyarı', 'Ayrıntılar'],
  govde: `
<section class="trds-kahraman">
  <div class="trds-kap">
    <div class="trds-kahraman__eylemler trds-u-alt-6">
      <div class="trds-edevlet">
        <a class="trds-edevlet__dugme" href="#"><span class="trds-edevlet__isaret" aria-hidden="true"><img src="../../varliklar/e-devlet-isaret.png" alt=""></span><span>e-Devlet ile giriş yap</span></a>
      </div>
      <a class="trds-link" href="#">Şifre ile giriş</a>
    </div>
    <h1 class="trds-kahraman__baslik">Dijital Vergi Dairesi</h1>
    <p class="trds-kahraman__metin">Borcunuzu sorgulayın, beyanname verin, ödeyin. Vergi dairesine gitmeden.</p>
  </div>
</section>

<div class="trds-kap">
<div class="trds-bilgi-kutusu trds-u-ust-6">
    <h2 class="trds-bilgi-kutusu__baslik"><svg class="trds-simge" aria-hidden="true"><use href="#trds-information"/></svg> Son gün 31 Mart</h2>
    <p class="trds-govde trds-u-alt-0">Yıllık gelir vergisi beyannamesi için son gün 31 Mart 2026 Salı 23:59. Bu tarihten sonra gecikme faizi işler.</p>
  </div>
</div>

<section class="trds-bolum">
  <div class="trds-kap">
    <h2 class="trds-bolum__baslik">Vergi borcu sorgulama</h2>
    <p class="trds-govde">Giriş yapmadan da sorgulayabilirsiniz. Sonuçta yalnız toplam borç görünür. Ayrıntı için giriş yapın.</p>
    <form action="#" method="post">
      <div class="trds-alan" data-trds="vergi-no" data-zorunlu>
        <label class="trds-etiket" for="vkn">Vergi kimlik numarası</label>
        <p class="trds-yardim" id="vkn-yardim">Şirketler için 10 hane. Gerçek kişiler T.C. kimlik numarasını yazar.</p>
        <p class="trds-hata" data-trds-hata hidden></p>
        <input class="trds-girdi trds-girdi--11" id="vkn" name="vkn" type="text" inputmode="numeric" maxlength="11" autocomplete="off" aria-describedby="vkn-yardim vkn-sayac">
        <p class="trds-sayac" id="vkn-sayac" data-trds-sayac aria-live="off"></p>
      </div>
      <button class="trds-button" type="submit">Borcu sorgula</button>
    </form>
    </div>
</section>

<section class="trds-bolum trds-bolum--yumusak">
  <div class="trds-kap">
    <h2 class="trds-bolum__baslik">Borç durumu</h2>
    <dl class="trds-ozet">
      <div class="trds-ozet__satir"><dt class="trds-ozet__anahtar">Mükellef</dt><dd class="trds-ozet__deger">Örnek Yazılım A.Ş.</dd><dd class="trds-ozet__eylem"></dd></div>
      <div class="trds-ozet__satir"><dt class="trds-ozet__anahtar">Vadesi geçmiş borç</dt><dd class="trds-ozet__deger"><strong>12.480,00 ₺</strong></dd><dd class="trds-ozet__eylem"><a href="#">Öde<span class="trds-gorsel-gizli"> vadesi geçmiş borcu</span></a></dd></div>
      <div class="trds-ozet__satir"><dt class="trds-ozet__anahtar">Vadesi gelmemiş borç</dt><dd class="trds-ozet__deger">31.200,00 ₺</dd><dd class="trds-ozet__eylem"><a href="#">Ayrıntı<span class="trds-gorsel-gizli"> vadesi gelmemiş borç</span></a></dd></div>
      <div class="trds-ozet__satir"><dt class="trds-ozet__anahtar">Son ödeme</dt><dd class="trds-ozet__deger">26.02.2026 · 8.450,00 ₺</dd><dd class="trds-ozet__eylem"><a href="#">Makbuz<span class="trds-gorsel-gizli"> son ödeme</span></a></dd></div>
    </dl>
    <details class="trds-ayrinti">
      <summary>Gecikme faizi nasıl hesaplanır?</summary>
      <p class="trds-govde">Vadesi geçen her ay için borcun yüzde 3,5’i faiz olarak eklenir. Ay kesirleri gün hesabı ile alınır.</p>
    </details>
    </div>
</section>

<section class="trds-bolum">
  <div class="trds-kap">
    <h2 class="trds-bolum__baslik">Hızlı ödeme</h2>
    <form action="#" method="post">
      <div class="trds-alan">
        <label class="trds-etiket" for="tutar">Ödenecek tutar</label>
        <p class="trds-yardim" id="tutar-yardim">Türk Lirası. Kuruş için virgül kullanın.</p>
        <div class="trds-girdi-grubu">
          <input class="trds-girdi trds-girdi--10" id="tutar" name="tutar" type="text" inputmode="decimal" aria-describedby="tutar-yardim" value="12.480,00">
          <span class="trds-girdi-grubu__ek" aria-hidden="true">₺</span>
        </div>
      </div>
      <fieldset class="trds-alan-grubu">
        <legend class="trds-baslik-legend">Ödeme yöntemi</legend>
        <div class="trds-secenekler">
          <div class="trds-secenek"><input class="trds-radyo" id="o1" name="odeme" type="radio" value="kart" checked><label class="trds-secenek-etiket" for="o1">Banka kartı veya kredi kartı</label></div>
          <div class="trds-secenek"><input class="trds-radyo" id="o2" name="odeme" type="radio" value="banka"><label class="trds-secenek-etiket" for="o2">Anlaşmalı banka hesabı</label></div>
        </div>
      </fieldset>
      <div class="trds-button-grubu">
        <button class="trds-button" type="submit">Ödemeye geç</button>
        <button class="trds-button trds-button--ikincil" type="button">Taksit seçenekleri</button>
      </div>
    </form>
    </div>
</section>

<section class="trds-bolum trds-bolum--yumusak">
  <div class="trds-kap">
    <h2 class="trds-bolum__baslik">Vergi takvimi</h2>
    <div class="trds-tablo-kap">
      <table class="trds-tablo">
        <caption>Mart 2026</caption>
        <thead><tr><th scope="col">Son gün</th><th scope="col">Beyanname</th><th scope="col">Kim verir</th></tr></thead>
        <tbody>
          <tr><td>26.03.2026</td><td>KDV beyannamesi, Şubat dönemi</td><td>Bütün mükellefler</td></tr>
          <tr><td>26.03.2026</td><td>Muhtasar ve prim hizmet beyannamesi</td><td>İşverenler</td></tr>
          <tr><td>31.03.2026</td><td>Yıllık gelir vergisi beyannamesi</td><td>Gerçek kişiler</td></tr>
        </tbody>
      </table>
    </div>
    </div>
</section>
`
};
