// Gelir İdaresi Başkanlığı, Dijital Vergi Dairesi ana sayfası, yalnız Kiriş ile.
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
<section class="kiris-kahraman">
  <div class="kiris-kap">
    <div class="kiris-kahraman__eylemler kiris-u-alt-6">
      <div class="kiris-edevlet">
        <a class="kiris-edevlet__dugme" href="#"><span class="kiris-edevlet__isaret" aria-hidden="true"><img src="../../varliklar/e-devlet-isaret.png" alt=""></span><span>e-Devlet ile giriş yap</span></a>
      </div>
      <a class="kiris-link" href="#">Şifre ile giriş</a>
    </div>
    <h1 class="kiris-kahraman__baslik">Dijital Vergi Dairesi</h1>
    <p class="kiris-kahraman__metin">Borcunuzu sorgulayın, beyanname verin, ödeyin. Vergi dairesine gitmeden.</p>
  </div>
</section>

<div class="kiris-kap">
<div class="kiris-bilgi-kutusu kiris-u-ust-6">
    <h2 class="kiris-bilgi-kutusu__baslik"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-information"/></svg> Son gün 31 Mart</h2>
    <p class="kiris-govde kiris-u-alt-0">Yıllık gelir vergisi beyannamesi için son gün 31 Mart 2026 Salı 23:59. Bu tarihten sonra gecikme faizi işler.</p>
  </div>
</div>

<section class="kiris-bolum">
  <div class="kiris-kap">
    <h2 class="kiris-bolum__baslik">Vergi borcu sorgulama</h2>
    <p class="kiris-govde">Giriş yapmadan da sorgulayabilirsiniz. Sonuçta yalnız toplam borç görünür. Ayrıntı için giriş yapın.</p>
    <form action="#" method="post">
      <div class="kiris-alan" data-kiris="vergi-no" data-zorunlu>
        <label class="kiris-etiket" for="vkn">Vergi kimlik numarası</label>
        <p class="kiris-yardim" id="vkn-yardim">Şirketler için 10 hane. Gerçek kişiler T.C. kimlik numarasını yazar.</p>
        <p class="kiris-hata" data-kiris-hata hidden></p>
        <input class="kiris-girdi kiris-girdi--11" id="vkn" name="vkn" type="text" inputmode="numeric" maxlength="11" autocomplete="off" aria-describedby="vkn-yardim vkn-sayac">
        <p class="kiris-sayac" id="vkn-sayac" data-kiris-sayac aria-live="off"></p>
      </div>
      <button class="kiris-button" type="submit">Borcu sorgula</button>
    </form>
    </div>
</section>

<section class="kiris-bolum kiris-bolum--yumusak">
  <div class="kiris-kap">
    <h2 class="kiris-bolum__baslik">Borç durumu</h2>
    <dl class="kiris-ozet">
      <div class="kiris-ozet__satir"><dt class="kiris-ozet__anahtar">Mükellef</dt><dd class="kiris-ozet__deger">Örnek Yazılım A.Ş.</dd><dd class="kiris-ozet__eylem"></dd></div>
      <div class="kiris-ozet__satir"><dt class="kiris-ozet__anahtar">Vadesi geçmiş borç</dt><dd class="kiris-ozet__deger"><strong>12.480,00 ₺</strong></dd><dd class="kiris-ozet__eylem"><a href="#">Öde<span class="kiris-gorsel-gizli"> vadesi geçmiş borcu</span></a></dd></div>
      <div class="kiris-ozet__satir"><dt class="kiris-ozet__anahtar">Vadesi gelmemiş borç</dt><dd class="kiris-ozet__deger">31.200,00 ₺</dd><dd class="kiris-ozet__eylem"><a href="#">Ayrıntı<span class="kiris-gorsel-gizli"> vadesi gelmemiş borç</span></a></dd></div>
      <div class="kiris-ozet__satir"><dt class="kiris-ozet__anahtar">Son ödeme</dt><dd class="kiris-ozet__deger">26.02.2026 · 8.450,00 ₺</dd><dd class="kiris-ozet__eylem"><a href="#">Makbuz<span class="kiris-gorsel-gizli"> son ödeme</span></a></dd></div>
    </dl>
    <details class="kiris-ayrinti">
      <summary>Gecikme faizi nasıl hesaplanır?</summary>
      <p class="kiris-govde">Vadesi geçen her ay için borcun yüzde 3,5’i faiz olarak eklenir. Ay kesirleri gün hesabı ile alınır.</p>
    </details>
    </div>
</section>

<section class="kiris-bolum">
  <div class="kiris-kap">
    <h2 class="kiris-bolum__baslik">Hızlı ödeme</h2>
    <form action="#" method="post">
      <div class="kiris-alan">
        <label class="kiris-etiket" for="tutar">Ödenecek tutar</label>
        <p class="kiris-yardim" id="tutar-yardim">Türk Lirası. Kuruş için virgül kullanın.</p>
        <div class="kiris-girdi-grubu">
          <input class="kiris-girdi kiris-girdi--10" id="tutar" name="tutar" type="text" inputmode="decimal" aria-describedby="tutar-yardim" value="12.480,00">
          <span class="kiris-girdi-grubu__ek" aria-hidden="true">₺</span>
        </div>
      </div>
      <fieldset class="kiris-alan-grubu">
        <legend class="kiris-baslik-legend">Ödeme yöntemi</legend>
        <div class="kiris-secenekler">
          <div class="kiris-secenek"><input class="kiris-radyo" id="o1" name="odeme" type="radio" value="kart" checked><label class="kiris-secenek-etiket" for="o1">Banka kartı veya kredi kartı</label></div>
          <div class="kiris-secenek"><input class="kiris-radyo" id="o2" name="odeme" type="radio" value="banka"><label class="kiris-secenek-etiket" for="o2">Anlaşmalı banka hesabı</label></div>
        </div>
      </fieldset>
      <div class="kiris-button-grubu">
        <button class="kiris-button" type="submit">Ödemeye geç</button>
        <button class="kiris-button kiris-button--ikincil" type="button">Taksit seçenekleri</button>
      </div>
    </form>
    </div>
</section>

<section class="kiris-bolum kiris-bolum--yumusak">
  <div class="kiris-kap">
    <h2 class="kiris-bolum__baslik">Vergi takvimi</h2>
    <div class="kiris-tablo-kap">
      <table class="kiris-tablo">
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
