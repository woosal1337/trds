// ÖSYM ana sayfası, yalnız TRDS bileşenleri ile.
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
<section class="trds-kahraman">
  <div class="trds-kap">
    <h1 class="trds-kahraman__baslik">Sınav sonucu sorgulama</h1>
    <p class="trds-kahraman__metin">YKS 2026 sonuçları açıklandı. T.C. kimlik numaranız ve aday şifrenizle sorgulayın.</p>
    <form action="#" method="post">
      <div class="trds-izgara">
        <div class="trds-sutun trds-sutun--5">
          <div class="trds-alan trds-u-alt-0" data-trds="kimlik-no" data-zorunlu>
            <label class="trds-etiket" for="aday-tc">T.C. kimlik numaranız</label>
            <p class="trds-hata" data-trds-hata hidden></p>
            <input class="trds-girdi" id="aday-tc" name="tc" type="text" inputmode="numeric" maxlength="11" autocomplete="off" aria-describedby="aday-tc-sayac">
            <p class="trds-sayac" id="aday-tc-sayac" data-trds-sayac aria-live="off"></p>
          </div>
        </div>
        <div class="trds-sutun trds-sutun--4">
          <div class="trds-alan trds-u-alt-0" data-trds="parola">
            <label class="trds-etiket" for="aday-sifre">Aday şifreniz</label>
            <div class="trds-parola">
              <input class="trds-girdi" id="aday-sifre" name="sifre" type="password" autocomplete="current-password">
              <button class="trds-button trds-button--ikincil trds-parola__dugme" type="button" aria-controls="aday-sifre" aria-pressed="false">Göster</button>
            </div>
          </div>
        </div>
        <div class="trds-sutun trds-sutun--3">
          <div class="trds-alan trds-u-alt-0">
            <span class="trds-etiket" aria-hidden="true">&nbsp;</span>
            <button class="trds-button trds-u-tam-genislik" type="submit">Sonucu gör</button>
          </div>
        </div>
      </div>
    </form>
    <p class="trds-govde trds-kucuk trds-u-ust-4 trds-u-alt-0">Şifrenizi unuttuysanız <a class="trds-link" href="#">aday işlemleri sisteminden</a> yeni şifre alın.</p>
  </div>
</section>

<div class="trds-kap">
<div class="trds-uyari trds-uyari--uyari trds-u-ust-6" role="status">
    <p><strong>Yoğunluk uyarısı.</strong> Sonuç açıklandığı ilk saatte sorgu birkaç dakika sürebilir. Sonuçlar 30 gün boyunca erişilebilir kalır.</p>
  </div>
</div>

<section class="trds-bolum">
  <div class="trds-kap">
    <div class="trds-bolum__ust">
      <h2 class="trds-bolum__baslik">Sınav takvimi</h2>
      <a class="trds-link" href="#">Tam takvim (PDF)</a>
    </div>
    <div class="trds-tablo-kap">
      <table class="trds-tablo">
        <caption>2026 yılı sınavları</caption>
        <thead><tr><th scope="col">Sınav</th><th scope="col">Başvuru</th><th scope="col">Sınav tarihi</th><th scope="col">Sonuç</th><th scope="col">Durum</th></tr></thead>
        <tbody>
          <tr><th scope="row">YKS</th><td>05.02 – 24.02.2026</td><td>20 – 21.06.2026</td><td>17.07.2026</td><td><span class="trds-etiket trds-etiket--yesil">Sonuçlar açıklandı</span></td></tr>
          <tr><th scope="row">KPSS Lisans</th><td>13.05 – 27.05.2026</td><td>06.09.2026</td><td>07.10.2026</td><td><span class="trds-etiket trds-etiket--mavi">Sınav yapıldı</span></td></tr>
          <tr><th scope="row">ALES/3</th><td>17.09 – 01.10.2026</td><td>15.11.2026</td><td>15.12.2026</td><td><span class="trds-etiket trds-etiket--sari">Başvuru açık</span></td></tr>
          <tr><th scope="row">YDS/2</th><td>08.10 – 22.10.2026</td><td>29.11.2026</td><td>24.12.2026</td><td><span class="trds-etiket trds-etiket--gri">Yakında</span></td></tr>
        </tbody>
      </table>
    </div>
    </div>
</section>

<section class="trds-bolum trds-bolum--yumusak">
  <div class="trds-kap">
    <div class="trds-bolum__ust">
      <h2 class="trds-bolum__baslik">Duyurular</h2>
      <a class="trds-link" href="#">Tüm duyurular</a>
    </div>
    <ul class="trds-kayitlar">
      <li class="trds-kayit"><p class="trds-kayit__ust"><time datetime="2026-07-17">17 Temmuz 2026</time></p><h3 class="trds-kayit__baslik"><a href="#">2026-YKS sonuçları açıklandı</a></h3></li>
      <li class="trds-kayit"><p class="trds-kayit__ust"><time datetime="2026-07-10">10 Temmuz 2026</time></p><h3 class="trds-kayit__baslik"><a href="#">2026-KPSS Lisans sınav giriş belgeleri erişime açıldı</a></h3></li>
      <li class="trds-kayit"><p class="trds-kayit__ust"><time datetime="2026-07-02">2 Temmuz 2026</time></p><h3 class="trds-kayit__baslik"><a href="#">Engelli adaylar için sınav uygulamaları kılavuzu güncellendi</a></h3></li>
    </ul>
    <nav class="trds-sayfalama" aria-label="Duyuru sayfaları">
      <a href="#" aria-current="page">1</a>
      <a href="#">2</a>
      <a href="#">3</a>
      <a class="trds-sayfalama__yon" href="#">Sonraki</a>
    </nav>
    </div>
</section>
`
};
