// ÖSYM ana sayfası, yalnız Kiriş bileşenleri ile.
// Gerçek site: https://www.osym.gov.tr — sınav günlerinde milyonlarca ziyaret.

export const ornek = {
  slug: 'osym',
  ad: 'ÖSYM',
  kurum: 'Ölçme, Seçme ve Yerleştirme Merkezi',
  ustKurum: 'Yükseköğretim Kurulu ile ilişkili bağımsız bir kurumdur.',
  kisaAd: 'ÖSYM',
  iletisim: [{ etiket: 'Adres', deger: 'Üniversiteler Mahallesi İhsan Doğramacı Bulvarı No:1 Bilkent Çankaya/Ankara' }, { etiket: 'Çağrı merkezi', deger: '444 6 796', href: 'tel:4446796' }],
  sosyal: ['X', 'Facebook', 'YouTube', 'Instagram'],
  url: 'https://www.osym.gov.tr',
  ozet: 'Sınav günü tek bir şey aranır: sonuç. Sonuç sorgusu en üsttedir, takvim ve duyurular onun altındadır.',
  menu: ['Sınavlar', 'Sonuçlar', 'Başvurular', 'Duyurular', 'Aday işlemleri'],
  bilesenler: ['T.C. kimlik numarası girişi', 'Metin girişi', 'Tablo', 'Liste', 'Uyarı', 'Sayfalama'],
  govde: `
<section class="kiris-kahraman">
  <div class="kiris-kap">
    <h1 class="kiris-kahraman__baslik">Sınav sonucu sorgulama</h1>
    <p class="kiris-kahraman__metin">YKS 2026 sonuçları açıklandı. T.C. kimlik numaranız ve aday şifrenizle sorgulayın.</p>
    <form action="#" method="post">
      <div class="kiris-izgara">
        <div class="kiris-sutun kiris-sutun--5">
          <div class="kiris-alan kiris-u-alt-0" data-kiris="kimlik-no" data-zorunlu>
            <label class="kiris-etiket" for="aday-tc">T.C. kimlik numaranız</label>
            <p class="kiris-hata" data-kiris-hata hidden></p>
            <input class="kiris-girdi" id="aday-tc" name="tc" type="text" inputmode="numeric" maxlength="11" autocomplete="off" aria-describedby="aday-tc-sayac">
            <p class="kiris-sayac" id="aday-tc-sayac" data-kiris-sayac aria-live="off"></p>
          </div>
        </div>
        <div class="kiris-sutun kiris-sutun--4">
          <div class="kiris-alan kiris-u-alt-0" data-kiris="parola">
            <label class="kiris-etiket" for="aday-sifre">Aday şifreniz</label>
            <div class="kiris-parola">
              <input class="kiris-girdi" id="aday-sifre" name="sifre" type="password" autocomplete="current-password">
              <button class="kiris-button kiris-button--ikincil kiris-parola__dugme" type="button" aria-controls="aday-sifre" aria-pressed="false">Göster</button>
            </div>
          </div>
        </div>
        <div class="kiris-sutun kiris-sutun--3">
          <div class="kiris-alan kiris-u-alt-0">
            <span class="kiris-etiket" aria-hidden="true">&nbsp;</span>
            <button class="kiris-button kiris-u-tam-genislik" type="submit">Sonucu gör</button>
          </div>
        </div>
      </div>
    </form>
    <p class="kiris-govde kiris-kucuk kiris-u-ust-4 kiris-u-alt-0">Şifrenizi unuttuysanız <a class="kiris-link" href="#">aday işlemleri sisteminden</a> yeni şifre alın.</p>
  </div>
</section>

<div class="kiris-kap">
<div class="kiris-uyari kiris-uyari--uyari kiris-u-ust-6" role="status">
    <p><strong>Yoğunluk uyarısı.</strong> Sonuç açıklandığı ilk saatte sorgu birkaç dakika sürebilir. Sonuçlar 30 gün boyunca erişilebilir kalır.</p>
  </div>
</div>

<section class="kiris-bolum">
  <div class="kiris-kap">
    <div class="kiris-bolum__ust">
      <h2 class="kiris-bolum__baslik">Sınav takvimi</h2>
      <a class="kiris-link" href="#">Tam takvim (PDF)</a>
    </div>
    <div class="kiris-tablo-kap">
      <table class="kiris-tablo">
        <caption>2026 yılı sınavları</caption>
        <thead><tr><th scope="col">Sınav</th><th scope="col">Başvuru</th><th scope="col">Sınav tarihi</th><th scope="col">Sonuç</th><th scope="col">Durum</th></tr></thead>
        <tbody>
          <tr><th scope="row">YKS</th><td>05.02 – 24.02.2026</td><td>20 – 21.06.2026</td><td>17.07.2026</td><td><span class="kiris-etiket kiris-etiket--yesil">Sonuçlar açıklandı</span></td></tr>
          <tr><th scope="row">KPSS Lisans</th><td>13.05 – 27.05.2026</td><td>06.09.2026</td><td>07.10.2026</td><td><span class="kiris-etiket kiris-etiket--mavi">Sınav yapıldı</span></td></tr>
          <tr><th scope="row">ALES/3</th><td>17.09 – 01.10.2026</td><td>15.11.2026</td><td>15.12.2026</td><td><span class="kiris-etiket kiris-etiket--sari">Başvuru açık</span></td></tr>
          <tr><th scope="row">YDS/2</th><td>08.10 – 22.10.2026</td><td>29.11.2026</td><td>24.12.2026</td><td><span class="kiris-etiket kiris-etiket--gri">Yakında</span></td></tr>
        </tbody>
      </table>
    </div>
    </div>
</section>

<section class="kiris-bolum kiris-bolum--yumusak">
  <div class="kiris-kap">
    <div class="kiris-bolum__ust">
      <h2 class="kiris-bolum__baslik">Duyurular</h2>
      <a class="kiris-link" href="#">Tüm duyurular</a>
    </div>
    <ul class="kiris-kayitlar">
      <li class="kiris-kayit"><p class="kiris-kayit__ust"><time datetime="2026-07-17">17 Temmuz 2026</time></p><h3 class="kiris-kayit__baslik"><a href="#">2026-YKS sonuçları açıklandı</a></h3></li>
      <li class="kiris-kayit"><p class="kiris-kayit__ust"><time datetime="2026-07-10">10 Temmuz 2026</time></p><h3 class="kiris-kayit__baslik"><a href="#">2026-KPSS Lisans sınav giriş belgeleri erişime açıldı</a></h3></li>
      <li class="kiris-kayit"><p class="kiris-kayit__ust"><time datetime="2026-07-02">2 Temmuz 2026</time></p><h3 class="kiris-kayit__baslik"><a href="#">Engelli adaylar için sınav uygulamaları kılavuzu güncellendi</a></h3></li>
    </ul>
    <nav class="kiris-sayfalama" aria-label="Duyuru sayfaları">
      <a href="#" aria-current="page">1</a>
      <a href="#">2</a>
      <a href="#">3</a>
      <a class="kiris-sayfalama__yon" href="#">Sonraki</a>
    </nav>
    </div>
</section>
`
};
