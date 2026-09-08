// Merkezi Hekim Randevu Sistemi ana sayfası, yalnız TRDS bileşenleri ile.
// Gerçek site: https://mhrs.gov.tr — günde 500 binden fazla randevu.

export const ornek = {
  slug: 'mhrs',
  ad: 'MHRS',
  kurum: 'Merkezi Hekim Randevu Sistemi',
  ustKurum: 'Sağlık Bakanlığı bağlı hizmetidir.',
  kisaAd: 'MHRS',
  koyuAltBilgi: true,
  iletisim: [{ etiket: 'Randevu hattı', deger: 'Alo 182', href: 'tel:182' }],
  sosyal: ['X', 'Instagram', 'YouTube'],
  url: 'https://mhrs.gov.tr',
  ozet: 'Tek bir iş vardır: randevu almak. Sayfa bu işe üç adımda götürür ve başka hiçbir şey anlatmaz.',
  menu: ['Randevu al', 'Randevularım', 'Aile hekimi', 'Yardım'],
  bilesenler: ['Adım göstergesi', 'Aranabilir liste', 'Seçenek düğmesi', 'Tarih girişi', 'Uyarı', 'Düğme'],
  govde: `
<section class="trds-kahraman">
  <div class="trds-kap">
    <h1 class="trds-kahraman__baslik">Hastane randevusu alın</h1>
    <p class="trds-kahraman__metin">Devlet hastaneleri ve aile hekimleri için ücretsiz randevu. Ortalama üç dakika sürer.</p>
    <div class="trds-button-grubu trds-u-alt-0">
      <a class="trds-button" href="#randevu">Randevu al</a>
      <a class="trds-button trds-button--ikincil" href="#">Randevularımı gör</a>
    </div>
  </div>
</section>

<div class="trds-kap">
<div class="trds-uyari trds-uyari--bilgi trds-u-ust-6" role="status">
    <p><strong>Telefonla da alabilirsiniz.</strong> Alo 182 hattı 7 gün 24 saat açıktır. Görme engelli kullanıcılar için sesli menü vardır.</p>
  </div>
</div>

<section class="trds-bolum" id="randevu">
  <div class="trds-kap">
    <nav class="trds-adimlar" aria-label="Randevu adımları">
      <p class="trds-adimlar__sayi">Adım 1 / 3</p>
      <ol class="trds-adimlar__liste">
        <li class="trds-adimlar__oge trds-adimlar__oge--etkin" aria-current="step">Hastane ve bölüm</li>
        <li class="trds-adimlar__oge">Tarih ve saat</li>
        <li class="trds-adimlar__oge">Onay</li>
      </ol>
    </nav>

    <form action="#" method="post">
      <div class="trds-alan" data-trds="aranabilir">
        <label class="trds-etiket" for="il">İl</label>
        <div class="trds-aranabilir">
          <input class="trds-girdi" id="il" name="il" type="text" role="combobox" aria-expanded="false" aria-controls="il-liste" aria-autocomplete="list" autocomplete="off">
          <ul class="trds-aranabilir__liste" id="il-liste" role="listbox" aria-label="İller" hidden>
            <li role="option" id="m-il-06" data-deger="06">Ankara</li>
            <li role="option" id="m-il-34" data-deger="34">İstanbul</li>
            <li role="option" id="m-il-35" data-deger="35">İzmir</li>
            <li role="option" id="m-il-16" data-deger="16">Bursa</li>
            <li role="option" id="m-il-07" data-deger="07">Antalya</li>
          </ul>
        </div>
        <p class="trds-aranabilir__durum trds-gorsel-gizli" aria-live="polite"></p>
      </div>

      <div class="trds-alan" data-trds="aranabilir">
        <label class="trds-etiket" for="bolum">Bölüm</label>
        <p class="trds-yardim" id="bolum-yardim">Hangi bölüme gideceğinizi bilmiyorsanız aile hekiminize gidin.</p>
        <div class="trds-aranabilir">
          <input class="trds-girdi" id="bolum" name="bolum" type="text" role="combobox" aria-expanded="false" aria-controls="bolum-liste" aria-autocomplete="list" autocomplete="off" aria-describedby="bolum-yardim">
          <ul class="trds-aranabilir__liste" id="bolum-liste" role="listbox" aria-label="Bölümler" hidden>
            <li role="option" id="b-1">Aile hekimliği</li>
            <li role="option" id="b-2">Dahiliye</li>
            <li role="option" id="b-3">Göz hastalıkları</li>
            <li role="option" id="b-4">Kulak burun boğaz</li>
            <li role="option" id="b-5">Ortopedi</li>
            <li role="option" id="b-6">Çocuk sağlığı</li>
          </ul>
        </div>
        <p class="trds-aranabilir__durum trds-gorsel-gizli" aria-live="polite"></p>
      </div>

      <fieldset class="trds-alan-grubu">
        <legend class="trds-baslik-legend">Randevu kimin için?</legend>
        <div class="trds-secenekler">
          <div class="trds-secenek"><input class="trds-radyo" id="k1" name="kim" type="radio" value="ben"><label class="trds-secenek-etiket" for="k1">Kendim için</label></div>
          <div class="trds-secenek"><input class="trds-radyo" id="k2" name="kim" type="radio" value="cocuk"><label class="trds-secenek-etiket" for="k2">Çocuğum için</label></div>
          <div class="trds-secenek"><input class="trds-radyo" id="k3" name="kim" type="radio" value="baska"><label class="trds-secenek-etiket" for="k3">Bakmakla yükümlü olduğum bir yakınım için</label></div>
        </div>
      </fieldset>

      <div class="trds-button-grubu">
        <button class="trds-button" type="submit">Devam et</button>
        <a class="trds-link" href="#">Vazgeç</a>
      </div>
    </form>
    </div>
</section>

<section class="trds-bolum trds-bolum--yumusak">
  <div class="trds-kap">
    <h2 class="trds-bolum__baslik">Randevularım</h2>
    <div class="trds-tablo-kap">
      <table class="trds-tablo">
        <caption>Yaklaşan randevular</caption>
        <thead><tr><th scope="col">Tarih</th><th scope="col">Hastane</th><th scope="col">Bölüm</th><th scope="col">Durum</th></tr></thead>
        <tbody>
          <tr><td>18.03.2026 09:40</td><td>Ankara Şehir Hastanesi</td><td>Göz hastalıkları</td><td><span class="trds-etiket trds-etiket--yesil">Onaylı</span></td></tr>
          <tr><td>24.03.2026 14:20</td><td>Çankaya ASM 12</td><td>Aile hekimliği</td><td><span class="trds-etiket trds-etiket--sari">Bekliyor</span></td></tr>
        </tbody>
      </table>
    </div>
    </div>
</section>
`
};
