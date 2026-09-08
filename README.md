# Kiriş — Türkiye Kamu Tasarım Sistemi

Türkiye'deki kamu hizmetleri için bileşen kütüphanesi, tasarım belirteçleri ve
uygulama rehberi. HTML/CSS çekirdeği, React ve Vue sarmalayıcıları içerir.

> **Bu proje bağımsız bir öneridir.** Resmî bir kamu hizmeti değildir.

## Belgeler

- [Bileşenler ve canlı örnekler](https://trds.chele.bi/bilesenler/)
- [Kurulum ve entegrasyonlar](https://trds.chele.bi/entegrasyonlar/)
- [Örnek kurum siteleri](https://trds.chele.bi/ornekler/)
- [llms.txt](llms.txt) ve [llms-full.txt](llms-full.txt): bir yapay zekâ yardımcısının bileşenleri doğru kullanması için tam başvuru. `node tools/llms.mjs` üretir, belge sitesi kökünde de durur.

## Hızlı başlangıç

```bash
git clone https://github.com/woosal1337/trds.git
cd kiris
npm ci
npm run yapi
npm test
npm run denetle
npm run sun
```

Node 22.14 veya üstünü kullanın. Çekirdek ve belge üreticisi yalnız Node standart
kütüphanesini kullanır. `npm ci`, React ve Vue testleri için bağımlılıkları kurar.
Yerel site: <http://localhost:4173>.

Bir projede kullanmak için:

```html
<link rel="stylesheet" href="kiris.min.css">
<script type="module" src="kiris.min.js"></script>
```

## Mimari

```
kiris/
├── tools/registry/          tek doğruluk kaynağı — her bileşenin tanımı
│   ├── 10-form.mjs          form ve eylem bileşenleri
│   ├── 20-yapi.mjs          yerleşim, gezinme, içerik, geri bildirim
│   ├── 30-turkiye.mjs       Türkiye'ye özgü bileşenler
│   ├── 40-ek.mjs            ikinci parti: girdi türleri, arama, gezinme, metin
│   └── 50-tamam.mjs         ek içerik, gezinme ve etkileşim bileşenleri
├── packages/
│   ├── tokens/              tasarım belirteçleri, DTCG biçiminde
│   ├── core/                HTML, CSS ve ilerlemeli iyileştirme katmanı
│   ├── validators/          Türkçe doğrulama ve biçimlendirme, testli
│   ├── tanim/               bileşen tanımları, çerçeveden bağımsız çizim işlevleri
│   ├── react/               React sarmalayıcıları, tanımlardan üretilir
│   ├── vue/                 Vue sarmalayıcıları, tanımlardan üretilir
│   └── themes/              marka renginden üretilen kurum temaları
└── apps/docs/               belge sitesi üreticisi ve sunucusu
```

**Kayıt defteri her şeyi besler.** Belge sitesi, bileşen dizini, entegrasyon
tablosu, WCAG haritası ve aşağıdaki tablo tek bir kaynaktan üretilir. Bir
bileşen hakkında hiçbir bilgi iki kez yazılmaz.

### Katman sırası

1. **Belirteçler** — renk, aralık, tipografi. Bir bileşen ham değer kullanmaz.
2. **Çekirdek** — HTML ve CSS. JavaScript olmadan da çalışır.
3. **Davranış** — `data-kiris` ile bağlanan ilerlemeli iyileştirme.
4. **Saramalar** — React ve diğerleri. Aynı HTML'i üretir, iş mantığı taşımaz.

Bu sıra bilerek seçildi. JavaScript çalışmazsa hizmet çalışmaya devam eder.

## Kontrast bir söz değil, bir denetimdir

`node packages/tokens/build.mjs` her çalıştığında 36 kontrast garantisi
yeniden hesaplanır. Bir garanti tutmazsa **yapı durur**.

```
belirteç: 161 · koyu fark: 43 · kontrast denetimi: 36
Bütün kontrast garantileri tutuyor.
```

Tema üreticisi de aynı kuralı uygular. Bir kurum tek bir marka rengi verir,
`packages/themes/build.mjs` ondan tam bir ölçek üretir ve ölçüt karşılanana
kadar renkleri koyulaştırır.

```
Sağlık (saglik) marka #0d7a5f
    metin / beyaz zemin: 5.29 (en az 4.5) gecti
    guclu / beyaz zemin: 7.23 (en az 7) gecti
```

## Türkiye'ye özgü olan ne

Aşağıdaki bileşenlerin kuralı, biçimi veya yasal dayanağı Türkiye'ye aittir.
Bunları hiçbir yabancı tasarım sisteminden kopyalayamazsınız.

<!-- OZGUN:BASLA -->
<!-- Bu blok üretilir. Elle değiştirmeyin: node tools/readme.mjs -->

| Bileşen | İngilizce | Neden Türkiye’ye özgü |
|---|---|---|
| **Adres** | Address | Türk adresi il, ilçe, mahalle, cadde veya sokak, bina no ve daire no olarak yapılır. |
| **e-Devlet ile giriş** | e-Devlet sign in | e-Devlet ile giriş seçeneğini tutarlı bir işaret ve etiketle gösterir. |
| **Erişilebilirlik menüsü** | Accessibility menu | Yazı boyutu ve tema tercihlerini tek menüde toplar. |
| **IBAN girişi** | IBAN input | IBAN hatası para kaybına yol açar. |
| **Kurum logosu** | Logo lockup | Kurumun işaretini ve adını aynı düzende gösterir. |
| **Kurum tanıtıcısı** | Identifier | Türkiye’de bir vatandaş bir hizmeti hangi kurumun yürüttüğünü çoğu zaman bilmez. |
| **KVKK açık rıza** | Data protection consent | Aydınlatma metni bağlantısını ve kullanıcının onay seçeneğini aynı alanda gösterir. |
| **Plaka girişi** | Licence plate input | Türkçe büyük harf kuralı burada gerçek bir hata kaynağıdır. |
| **Resmî site afişi** | Masthead | Resmî hizmetlerde kurum kimliğini ve alan adını kontrol etme yolunu gösterir. |
| **T.C. kimlik numarası girişi** | National identity number input | Kimlik numarasının hane sayısını ve sağlama toplamını denetler. |
| **Tarih girişi** | Date input | Biçim farkı gerçek bir hata kaynağıdır. |
| **Telefon girişi** | Phone input | Türk kullanıcı numarasını 0 ile yazar. |
| **Vergi kimlik numarası girişi** | Tax number input | Kurumsal hizmetlerin tamamı bu numarayı ister. |

<!-- OZGUN:BITIR -->

### Türkçe büyük harf kuralı bir süs değil

```js
'34 iz 1234'.toUpperCase()   // '34 IZ 1234'  — yanlış plaka sorgulanır
trBuyuk('34 iz 1234')        // '34 İZ 1234'  — doğru
```

`@kiris-ds/validators` paketi bu kuralı, T.C. kimlik numarası sağlamasını, vergi
kimlik numarası sağlamasını, IBAN mod 97 denetimini, telefon normalleştirmesini,
plaka biçimini ve Türkçe alfabe sıralamasını **36 test ile** kapsar.

## Bileşenler

<!-- BILESEN:BASLA -->
<!-- Bu blok üretilir. Elle değiştirmeyin: node tools/readme.mjs -->

Toplam **116 bileşen**, 10 grupta. 🇹🇷 işareti, o bileşenin kuralının veya yasal dayanağının Türkiye’ye ait olduğunu gösterir. Her görüntü, belge sitesindeki canlı örneğin kendisidir ve `node tools/bilesen-goruntu.mjs` ile yenilenir.

### Kimlik

Kullanıcıya bunun bir devlet hizmeti olduğunu söyleyen parçalar.

| Görünüm | Bileşen | CSS | JS | React | |
|---|---|---|---|---|---|
| <img src="docs/gorseller/footer.png" alt="Alt bilgi" width="260"> | **Alt bilgi**<br><sub>Footer</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/footer.html) |
| <img src="docs/gorseller/phase-banner.png" alt="Aşama afişi" width="260"> | **Aşama afişi**<br><sub>Phase banner</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/phase-banner.html) |
| <img src="docs/gorseller/header.png" alt="Başlık" width="260"> | **Başlık**<br><sub>Header</sub> | kararlı | mobil menü | kararlı | [Belge](https://trds.chele.bi/bilesenler/header.html) |
| <img src="docs/gorseller/cookie-banner.png" alt="Çerez bildirimi" width="260"> | **Çerez bildirimi**<br><sub>Cookie banner</sub> | kararlı | tercih saklama | kararlı | [Belge](https://trds.chele.bi/bilesenler/cookie-banner.html) |
| <img src="docs/gorseller/logo.png" alt="Kurum logosu" width="260"> | 🇹🇷 **Kurum logosu**<br><sub>Logo lockup</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/logo.html) |
| <img src="docs/gorseller/identifier.png" alt="Kurum tanıtıcısı" width="260"> | 🇹🇷 **Kurum tanıtıcısı**<br><sub>Identifier</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/identifier.html) |
| <img src="docs/gorseller/masthead.png" alt="Resmî site afişi" width="260"> | 🇹🇷 **Resmî site afişi**<br><sub>Masthead</sub> | kararlı | aç ve kapat | kararlı | [Belge](https://trds.chele.bi/bilesenler/masthead.html) |
| <img src="docs/gorseller/favicon.png" alt="Sekme simgesi" width="260"> | **Sekme simgesi**<br><sub>Favicon</sub> | — | — | — | [Belge](https://trds.chele.bi/bilesenler/favicon.html) |

### Gezinme

Kullanıcının nerede olduğunu ve nereye gidebileceğini gösteren parçalar.

| Görünüm | Bileşen | CSS | JS | React | |
|---|---|---|---|---|---|
| <img src="docs/gorseller/step-indicator.png" alt="Adım göstergesi" width="260"> | **Adım göstergesi**<br><sub>Step indicator</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/step-indicator.html) |
| <img src="docs/gorseller/bottom-navigation.png" alt="Alt gezinme" width="260"> | **Alt gezinme**<br><sub>Bottom navigation</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/bottom-navigation.html) |
| <img src="docs/gorseller/search.png" alt="Arama" width="260"> | **Arama**<br><sub>Search</sub> | kararlı | öneri listesi | kararlı | [Belge](https://trds.chele.bi/bilesenler/search.html) |
| <img src="docs/gorseller/back-to-top.png" alt="Başa dön" width="260"> | **Başa dön**<br><sub>Back to top</sub> | kararlı | görünürlük | kararlı | [Belge](https://trds.chele.bi/bilesenler/back-to-top.html) |
| <img src="docs/gorseller/language-selector.png" alt="Dil seçici" width="260"> | **Dil seçici**<br><sub>Language selector</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/language-selector.html) |
| <img src="docs/gorseller/mega-menu.png" alt="Geniş menü" width="260"> | **Geniş menü**<br><sub>Mega menu</sub> | kararlı | aç ve kapat | kararlı | [Belge](https://trds.chele.bi/bilesenler/mega-menu.html) |
| <img src="docs/gorseller/back-link.png" alt="Geri bağlantısı" width="260"> | **Geri bağlantısı**<br><sub>Back link</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/back-link.html) |
| <img src="docs/gorseller/service-navigation.png" alt="Hizmet gezinmesi" width="260"> | **Hizmet gezinmesi**<br><sub>Service navigation</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/service-navigation.html) |
| <img src="docs/gorseller/skip-link.png" alt="İçeriğe atlama bağlantısı" width="260"> | **İçeriğe atlama bağlantısı**<br><sub>Skip link</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/skip-link.html) |
| <img src="docs/gorseller/in-page-navigation.png" alt="Sayfa içi gezinme" width="260"> | **Sayfa içi gezinme**<br><sub>In-page navigation</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/in-page-navigation.html) |
| <img src="docs/gorseller/breadcrumb.png" alt="Sayfa yolu" width="260"> | **Sayfa yolu**<br><sub>Breadcrumb</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/breadcrumb.html) |
| <img src="docs/gorseller/pagination.png" alt="Sayfalama" width="260"> | **Sayfalama**<br><sub>Pagination</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/pagination.html) |
| <img src="docs/gorseller/side-navigation.png" alt="Yan menü" width="260"> | **Yan menü**<br><sub>Side navigation</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/side-navigation.html) |

### Form

Kullanıcıdan bilgi alan parçalar.

| Görünüm | Bileşen | CSS | JS | React | |
|---|---|---|---|---|---|
| <img src="docs/gorseller/select.png" alt="Açılır liste" width="260"> | **Açılır liste**<br><sub>Select</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/select.html) |
| <img src="docs/gorseller/quantity.png" alt="Adet seçici" width="260"> | **Adet seçici**<br><sub>Quantity stepper</sub> | kararlı | artır, azalt | kararlı | [Belge](https://trds.chele.bi/bilesenler/quantity.html) |
| <img src="docs/gorseller/fieldset.png" alt="Alan grubu" width="260"> | **Alan grubu**<br><sub>Fieldset</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/fieldset.html) |
| <img src="docs/gorseller/range.png" alt="Aralık seçici" width="260"> | **Aralık seçici**<br><sub>Range slider</sub> | kararlı | değer gösterimi | kararlı | [Belge](https://trds.chele.bi/bilesenler/range.html) |
| <img src="docs/gorseller/textarea.png" alt="Çok satırlı metin" width="260"> | **Çok satırlı metin**<br><sub>Textarea</sub> | kararlı | karakter sayacı | kararlı | [Belge](https://trds.chele.bi/bilesenler/textarea.html) |
| <img src="docs/gorseller/file-upload.png" alt="Dosya yükleme" width="260"> | **Dosya yükleme**<br><sub>File upload</sub> | kararlı | sürükle, listele, kaldır | kararlı | [Belge](https://trds.chele.bi/bilesenler/file-upload.html) |
| <img src="docs/gorseller/email-input.png" alt="E-posta girişi" width="260"> | **E-posta girişi**<br><sub>Email input</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/email-input.html) |
| <img src="docs/gorseller/input-group.png" alt="Girdi grubu" width="260"> | **Girdi grubu**<br><sub>Input group</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/input-group.html) |
| <img src="docs/gorseller/input-mask.png" alt="Girdi maskesi" width="260"> | **Girdi maskesi**<br><sub>Input mask</sub> | kararlı | biçimlendirme | kararlı | [Belge](https://trds.chele.bi/bilesenler/input-mask.html) |
| <img src="docs/gorseller/text-input.png" alt="Metin girişi" width="260"> | **Metin girişi**<br><sub>Text input</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/text-input.html) |
| <img src="docs/gorseller/password-input.png" alt="Parola girişi" width="260"> | **Parola girişi**<br><sub>Password input</sub> | kararlı | göster ve gizle | kararlı | [Belge](https://trds.chele.bi/bilesenler/password-input.html) |
| <img src="docs/gorseller/time-input.png" alt="Saat girişi" width="260"> | **Saat girişi**<br><sub>Time input</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/time-input.html) |
| <img src="docs/gorseller/number-input.png" alt="Sayı girişi" width="260"> | **Sayı girişi**<br><sub>Number input</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/number-input.html) |
| <img src="docs/gorseller/date-picker.png" alt="Takvim" width="260"> | **Takvim**<br><sub>Date picker</sub> | kararlı | ay ızgarası ve klavye | kararlı | [Belge](https://trds.chele.bi/bilesenler/date-picker.html) |
| <img src="docs/gorseller/url-input.png" alt="Web adresi girişi" width="260"> | **Web adresi girişi**<br><sub>URL input</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/url-input.html) |
| <img src="docs/gorseller/hint.png" alt="Yardım metni" width="260"> | **Yardım metni**<br><sub>Hint</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/hint.html) |

### Seçim

Kullanıcının seçenekler arasından seçim yapmasını sağlayan parçalar.

| Görünüm | Bileşen | CSS | JS | React | |
|---|---|---|---|---|---|
| <img src="docs/gorseller/switch.png" alt="Anahtar" width="260"> | **Anahtar**<br><sub>Switch</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/switch.html) |
| <img src="docs/gorseller/combobox.png" alt="Aranabilir liste" width="260"> | **Aranabilir liste**<br><sub>Combobox</sub> | kararlı | süzme ve klavye | kararlı | [Belge](https://trds.chele.bi/bilesenler/combobox.html) |
| <img src="docs/gorseller/segmented-control.png" alt="Bölümlü seçim" width="260"> | **Bölümlü seçim**<br><sub>Segmented control</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/segmented-control.html) |
| <img src="docs/gorseller/multi-select.png" alt="Çoklu seçim" width="260"> | **Çoklu seçim**<br><sub>Multi-select</sub> | kararlı | süzme, seçim etiketi | kararlı | [Belge](https://trds.chele.bi/bilesenler/multi-select.html) |
| <img src="docs/gorseller/checkbox.png" alt="Onay kutusu" width="260"> | **Onay kutusu**<br><sub>Checkbox</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/checkbox.html) |
| <img src="docs/gorseller/rating.png" alt="Puanlama" width="260"> | **Puanlama**<br><sub>Rating</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/rating.html) |
| <img src="docs/gorseller/radio.png" alt="Seçenek düğmesi" width="260"> | **Seçenek düğmesi**<br><sub>Radio</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/radio.html) |
| <img src="docs/gorseller/chip.png" alt="Seçim etiketi" width="260"> | **Seçim etiketi**<br><sub>Chip</sub> | kararlı | kaldırma | kararlı | [Belge](https://trds.chele.bi/bilesenler/chip.html) |

### Eylem

Kullanıcının bir işlem başlatmasını sağlayan parçalar.

| Görünüm | Bileşen | CSS | JS | React | |
|---|---|---|---|---|---|
| <img src="docs/gorseller/link.png" alt="Bağlantı" width="260"> | **Bağlantı**<br><sub>Link</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/link.html) |
| <img src="docs/gorseller/button.png" alt="Düğme" width="260"> | **Düğme**<br><sub>Button</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/button.html) |
| <img src="docs/gorseller/action-menu.png" alt="Eylem menüsü" width="260"> | **Eylem menüsü**<br><sub>Action menu</sub> | kararlı | klavye desteği | kararlı | [Belge](https://trds.chele.bi/bilesenler/action-menu.html) |
| <img src="docs/gorseller/download-link.png" alt="İndirme bağlantısı" width="260"> | **İndirme bağlantısı**<br><sub>Download link</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/download-link.html) |
| <img src="docs/gorseller/share.png" alt="Paylaş" width="260"> | **Paylaş**<br><sub>Share</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/share.html) |
| <img src="docs/gorseller/exit-this-page.png" alt="Sayfadan çık" width="260"> | **Sayfadan çık**<br><sub>Exit this page</sub> | kararlı | hızlı çıkış | kararlı | [Belge](https://trds.chele.bi/bilesenler/exit-this-page.html) |
| <img src="docs/gorseller/print.png" alt="Yazdır" width="260"> | **Yazdır**<br><sub>Print button</sub> | kararlı | yazdırma | kararlı | [Belge](https://trds.chele.bi/bilesenler/print.html) |
| <img src="docs/gorseller/fab.png" alt="Yüzen düğme" width="260"> | **Yüzen düğme**<br><sub>Floating action button</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/fab.html) |

### Geri bildirim

Sistemin kullanıcıya durum bildiren parçaları.

| Görünüm | Bileşen | CSS | JS | React | |
|---|---|---|---|---|---|
| <img src="docs/gorseller/popover.png" alt="Açılır bilgi" width="260"> | **Açılır bilgi**<br><sub>Popover</sub> | kararlı | aç ve kapat | kararlı | [Belge](https://trds.chele.bi/bilesenler/popover.html) |
| <img src="docs/gorseller/notification-banner.png" alt="Bildirim afişi" width="260"> | **Bildirim afişi**<br><sub>Notification banner</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/notification-banner.html) |
| <img src="docs/gorseller/toast.png" alt="Geçici bildirim" width="260"> | **Geçici bildirim**<br><sub>Toast</sub> | kararlı | kapatma ve süre | kararlı | [Belge](https://trds.chele.bi/bilesenler/toast.html) |
| <img src="docs/gorseller/error-message.png" alt="Hata mesajı" width="260"> | **Hata mesajı**<br><sub>Error message</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/error-message.html) |
| <img src="docs/gorseller/error-summary.png" alt="Hata özeti" width="260"> | **Hata özeti**<br><sub>Error summary</sub> | kararlı | odak yönetimi | kararlı | [Belge](https://trds.chele.bi/bilesenler/error-summary.html) |
| <img src="docs/gorseller/progress.png" alt="İlerleme çubuğu" width="260"> | **İlerleme çubuğu**<br><sub>Progress</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/progress.html) |
| <img src="docs/gorseller/tooltip.png" alt="İpucu" width="260"> | **İpucu**<br><sub>Tooltip</sub> | kararlı | göster ve gizle | kararlı | [Belge](https://trds.chele.bi/bilesenler/tooltip.html) |
| <img src="docs/gorseller/skeleton.png" alt="İskelet" width="260"> | **İskelet**<br><sub>Skeleton</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/skeleton.html) |
| <img src="docs/gorseller/panel.png" alt="Sonuç paneli" width="260"> | **Sonuç paneli**<br><sub>Panel</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/panel.html) |
| <img src="docs/gorseller/alert.png" alt="Uyarı" width="260"> | **Uyarı**<br><sub>Alert</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/alert.html) |
| <img src="docs/gorseller/warning-text.png" alt="Uyarı metni" width="260"> | **Uyarı metni**<br><sub>Warning text</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/warning-text.html) |
| <img src="docs/gorseller/coach-mark.png" alt="Yönlendirme" width="260"> | **Yönlendirme**<br><sub>Coach mark</sub> | kararlı | adımlar | kararlı | [Belge](https://trds.chele.bi/bilesenler/coach-mark.html) |
| <img src="docs/gorseller/spinner.png" alt="Yükleniyor" width="260"> | **Yükleniyor**<br><sub>Spinner</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/spinner.html) |

### Yerleşim

İçeriği düzenleyen ve gruplayan parçalar.

| Görünüm | Bileşen | CSS | JS | React | |
|---|---|---|---|---|---|
| <img src="docs/gorseller/accordion.png" alt="Akordiyon" width="260"> | **Akordiyon**<br><sub>Accordion</sub> | kararlı | aç ve kapat | kararlı | [Belge](https://trds.chele.bi/bilesenler/accordion.html) |
| <img src="docs/gorseller/divider.png" alt="Ayraç" width="260"> | **Ayraç**<br><sub>Divider</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/divider.html) |
| <img src="docs/gorseller/details.png" alt="Ayrıntılar" width="260"> | **Ayrıntılar**<br><sub>Details</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/details.html) |
| <img src="docs/gorseller/section.png" alt="Bölüm" width="260"> | **Bölüm**<br><sub>Section</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/section.html) |
| <img src="docs/gorseller/grid.png" alt="Izgara" width="260"> | **Izgara**<br><sub>Grid</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/grid.html) |
| <img src="docs/gorseller/container.png" alt="Kap" width="260"> | **Kap**<br><sub>Container</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/container.html) |
| <img src="docs/gorseller/tile.png" alt="Karo" width="260"> | **Karo**<br><sub>Tile</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/tile.html) |
| <img src="docs/gorseller/hero.png" alt="Karşılama bloğu" width="260"> | **Karşılama bloğu**<br><sub>Hero</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/hero.html) |
| <img src="docs/gorseller/card.png" alt="Kart" width="260"> | **Kart**<br><sub>Card</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/card.html) |
| <img src="docs/gorseller/carousel.png" alt="Kayan pano" width="260"> | **Kayan pano**<br><sub>Carousel</sub> | kararlı | düğmeler ve noktalar | kararlı | [Belge](https://trds.chele.bi/bilesenler/carousel.html) |
| <img src="docs/gorseller/modal.png" alt="Kip pencere" width="260"> | **Kip pencere**<br><sub>Modal</sub> | kararlı | odak tuzağı | kararlı | [Belge](https://trds.chele.bi/bilesenler/modal.html) |
| <img src="docs/gorseller/tabs.png" alt="Sekmeler" width="260"> | **Sekmeler**<br><sub>Tabs</sub> | kararlı | klavye desteği | kararlı | [Belge](https://trds.chele.bi/bilesenler/tabs.html) |
| <img src="docs/gorseller/icon-card.png" alt="Simge kartı" width="260"> | **Simge kartı**<br><sub>Icon card</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/icon-card.html) |
| <img src="docs/gorseller/drawer.png" alt="Yan panel" width="260"> | **Yan panel**<br><sub>Drawer</sub> | kararlı | aç ve kapat | kararlı | [Belge](https://trds.chele.bi/bilesenler/drawer.html) |
| <img src="docs/gorseller/utilities.png" alt="Yardımcı sınıflar" width="260"> | **Yardımcı sınıflar**<br><sub>Utility classes</sub> | kararlı | — | — | [Belge](https://trds.chele.bi/bilesenler/utilities.html) |

### İçerik

Veriyi ve metni sunan parçalar.

| Görünüm | Bileşen | CSS | JS | React | |
|---|---|---|---|---|---|
| <img src="docs/gorseller/blockquote.png" alt="Alıntı" width="260"> | **Alıntı**<br><sub>Blockquote</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/blockquote.html) |
| <img src="docs/gorseller/avatar.png" alt="Avatar" width="260"> | **Avatar**<br><sub>Avatar</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/avatar.html) |
| <img src="docs/gorseller/callout.png" alt="Bilgi kutusu" width="260"> | **Bilgi kutusu**<br><sub>Callout</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/callout.html) |
| <img src="docs/gorseller/tag.png" alt="Etiket" width="260"> | **Etiket**<br><sub>Tag</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/tag.html) |
| <img src="docs/gorseller/task-list.png" alt="Görev listesi" width="260"> | **Görev listesi**<br><sub>Task list</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/task-list.html) |
| <img src="docs/gorseller/figure.png" alt="Görsel" width="260"> | **Görsel**<br><sub>Figure</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/figure.html) |
| <img src="docs/gorseller/stat.png" alt="İstatistik kutusu" width="260"> | **İstatistik kutusu**<br><sub>Stat tile</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/stat.html) |
| <img src="docs/gorseller/collection.png" alt="Kayıt listesi" width="260"> | **Kayıt listesi**<br><sub>Collection</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/collection.html) |
| <img src="docs/gorseller/code.png" alt="Kod" width="260"> | **Kod**<br><sub>Code</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/code.html) |
| <img src="docs/gorseller/list.png" alt="Liste" width="260"> | **Liste**<br><sub>List</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/list.html) |
| <img src="docs/gorseller/summary-list.png" alt="Özet listesi" width="260"> | **Özet listesi**<br><sub>Summary list</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/summary-list.html) |
| <img src="docs/gorseller/badge.png" alt="Rozet" width="260"> | **Rozet**<br><sub>Badge</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/badge.html) |
| <img src="docs/gorseller/audio.png" alt="Ses" width="260"> | **Ses**<br><sub>Audio</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/audio.html) |
| <img src="docs/gorseller/sortable-table.png" alt="Sıralanabilir tablo" width="260"> | **Sıralanabilir tablo**<br><sub>Sortable table</sub> | kararlı | sütun sıralama | kararlı | [Belge](https://trds.chele.bi/bilesenler/sortable-table.html) |
| <img src="docs/gorseller/icon.png" alt="Simge" width="260"> | **Simge**<br><sub>Icon</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/icon.html) |
| <img src="docs/gorseller/icon-list.png" alt="Simgeli liste" width="260"> | **Simgeli liste**<br><sub>Icon list</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/icon-list.html) |
| <img src="docs/gorseller/date-modified.png" alt="Son güncelleme" width="260"> | **Son güncelleme**<br><sub>Date modified</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/date-modified.html) |
| <img src="docs/gorseller/process-list.png" alt="Süreç listesi" width="260"> | **Süreç listesi**<br><sub>Process list</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/process-list.html) |
| <img src="docs/gorseller/table.png" alt="Tablo" width="260"> | **Tablo**<br><sub>Table</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/table.html) |
| <img src="docs/gorseller/follow.png" alt="Takip et" width="260"> | **Takip et**<br><sub>Follow</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/follow.html) |
| <img src="docs/gorseller/description-list.png" alt="Tanım listesi" width="260"> | **Tanım listesi**<br><sub>Description list</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/description-list.html) |
| <img src="docs/gorseller/typography.png" alt="Tipografi" width="260"> | **Tipografi**<br><sub>Typography</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/typography.html) |
| <img src="docs/gorseller/video.png" alt="Video" width="260"> | **Video**<br><sub>Video</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/video.html) |
| <img src="docs/gorseller/inset-text.png" alt="Vurgulu metin" width="260"> | **Vurgulu metin**<br><sub>Inset text</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/inset-text.html) |
| <img src="docs/gorseller/timeline.png" alt="Zaman çizelgesi" width="260"> | **Zaman çizelgesi**<br><sub>Timeline</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/timeline.html) |

### Türkiye’ye özgü form

Türk kimlik, adres ve finans biçimlerini alan parçalar.

| Görünüm | Bileşen | CSS | JS | React | |
|---|---|---|---|---|---|
| <img src="docs/gorseller/adres.png" alt="Adres" width="260"> | 🇹🇷 **Adres**<br><sub>Address</sub> | kararlı | bağlı listeler | kararlı | [Belge](https://trds.chele.bi/bilesenler/adres.html) |
| <img src="docs/gorseller/iban-girisi.png" alt="IBAN girişi" width="260"> | 🇹🇷 **IBAN girişi**<br><sub>IBAN input</sub> | kararlı | doğrulama | kararlı | [Belge](https://trds.chele.bi/bilesenler/iban-girisi.html) |
| <img src="docs/gorseller/plaka-girisi.png" alt="Plaka girişi" width="260"> | 🇹🇷 **Plaka girişi**<br><sub>Licence plate input</sub> | kararlı | biçimlendirme | kararlı | [Belge](https://trds.chele.bi/bilesenler/plaka-girisi.html) |
| <img src="docs/gorseller/kimlik-no.png" alt="T.C. kimlik numarası girişi" width="260"> | 🇹🇷 **T.C. kimlik numarası girişi**<br><sub>National identity number input</sub> | kararlı | doğrulama | kararlı | [Belge](https://trds.chele.bi/bilesenler/kimlik-no.html) |
| <img src="docs/gorseller/tarih-girisi.png" alt="Tarih girişi" width="260"> | 🇹🇷 **Tarih girişi**<br><sub>Date input</sub> | kararlı | doğrulama | kararlı | [Belge](https://trds.chele.bi/bilesenler/tarih-girisi.html) |
| <img src="docs/gorseller/telefon-girisi.png" alt="Telefon girişi" width="260"> | 🇹🇷 **Telefon girişi**<br><sub>Phone input</sub> | kararlı | biçimlendirme | kararlı | [Belge](https://trds.chele.bi/bilesenler/telefon-girisi.html) |
| <img src="docs/gorseller/vergi-no.png" alt="Vergi kimlik numarası girişi" width="260"> | 🇹🇷 **Vergi kimlik numarası girişi**<br><sub>Tax number input</sub> | kararlı | doğrulama | kararlı | [Belge](https://trds.chele.bi/bilesenler/vergi-no.html) |

### Türkiye’ye özgü hizmet

Türk mevzuatından ve altyapısından doğan parçalar.

| Görünüm | Bileşen | CSS | JS | React | |
|---|---|---|---|---|---|
| <img src="docs/gorseller/edevlet-giris.png" alt="e-Devlet ile giriş" width="260"> | 🇹🇷 **e-Devlet ile giriş**<br><sub>e-Devlet sign in</sub> | kararlı | — | kararlı | [Belge](https://trds.chele.bi/bilesenler/edevlet-giris.html) |
| <img src="docs/gorseller/erisim-menusu.png" alt="Erişilebilirlik menüsü" width="260"> | 🇹🇷 **Erişilebilirlik menüsü**<br><sub>Accessibility menu</sub> | kararlı | ayar saklama | kararlı | [Belge](https://trds.chele.bi/bilesenler/erisim-menusu.html) |
| <img src="docs/gorseller/kvkk-onay.png" alt="KVKK açık rıza" width="260"> | 🇹🇷 **KVKK açık rıza**<br><sub>Data protection consent</sub> | kararlı | gönderim denetimi | kararlı | [Belge](https://trds.chele.bi/bilesenler/kvkk-onay.html) |

<!-- BILESEN:BITIR -->

## Entegrasyonlar

<!-- ENTEGRASYON:BASLA -->
<!-- Bu blok üretilir. Elle değiştirmeyin: node tools/readme.mjs -->

| Teknoloji | Paket | Durum | Kurulum |
|---|---|---|---|
| Düz HTML ve CSS | `@kiris-ds/core` | kararlı | `npm install @kiris-ds/core` |
| React | `@kiris-ds/react` | kararlı | `npm install @kiris-ds/react @kiris-ds/core` |
| Next.js | `@kiris-ds/react` | beta | `npm install @kiris-ds/react @kiris-ds/core` |
| Vue | `@kiris-ds/vue` | kararlı | `npm install @kiris-ds/vue @kiris-ds/core` |
| Angular | `@kiris-ds/core` | beta | `npm install @kiris-ds/core` |
| ASP.NET Core | `@kiris-ds/core` | değerlendiriliyor | `CSS ve JS dosyalarını wwwroot altına kopyalayın.` |
| Java ve Thymeleaf | `@kiris-ds/core` | değerlendiriliyor | `CSS ve JS dosyalarını static klasörüne kopyalayın.` |

<!-- ENTEGRASYON:BITIR -->

## Lisans ikiye ayrılır

| Paket | Lisans | Kim kullanabilir |
|---|---|---|
| `@kiris-ds/core` | MIT | Herkes |
| `@kiris-ds/tokens` | MIT | Herkes |
| `@kiris-ds/validators` | MIT | Herkes |
| `@kiris-ds/react` | MIT | Herkes |
| `@kiris-ds/vue`, `@kiris-ds/tanim` | MIT | Herkes |
| `@kiris-ds/theme-*` | MIT | Herkes |
| `@kiris-ds/identity` simgeleri | MIT (Tabler Icons) | Herkes |
| `@kiris-ds/identity` devlet kimliği | Ayrı koşullar | Hak sahibinin izni gerekir |

Kod herkese açıktır, böylece tedarikçi, üniversite ve belediye izin istemeden
kullanır. Devlet kimliği kısıtlıdır, böylece sahte site kuranlar resmî görünmek
için hazır bir araç bulamaz. Bu ayrım Fransa (DSFR) ve İrlanda (GOV.IE)
uygulamalarından alındı.

Ayrıntı: [LICENSE](./LICENSE) ve [LICENSE-IDENTITY.md](./LICENSE-IDENTITY.md).

## Katkı

Bu açık bir depodur, açık bir karar organı değildir. Önce
[CONTRIBUTING.md](./CONTRIBUTING.md) ve [GOVERNANCE.md](./GOVERNANCE.md)
dosyalarını okuyun.

Bir bileşen beş ölçütü karşılamadan sisteme girmez: **yararlı, benzersiz,
kullanılabilir, tutarlı, çok yönlü.** Ölçütler Birleşik Krallık tasarım
sisteminden alındı. Yaşam döngüsü Hollanda bayrak yarışı modelinden alındı.

## Kaynaklar

Bu sistem on beş ulusal tasarım sistemi okunarak tasarlandı. En çok
yararlanılanlar:

| Ne alındı | Kaynak |
|---|---|
| Katkı ölçütleri, tip ölçeği, odak halkası | [GOV.UK Design System](https://design-system.service.gov.uk/) |
| Belirteç ve yardımcı sınıf ayrımı, olgunluk modeli | [USWDS](https://designsystem.digital.gov/) |
| Bayrak yarışı yaşam döngüsü, tamamlanma tanımı | [NL Design System](https://nldesignsystem.nl/) |
| Renk adlandırma kuralı, temadan tema üretimi | [Designsystemet, Norveç](https://designsystemet.no/) |
| Teknolojiye göre bileşen durumu | [GOV.IE Design System](https://ds.services.gov.ie/) |
| Kısıtlı kimlik lisansı | [DSFR, Fransa](https://www.systeme-de-design.gouv.fr/) |
| İki tema, vatandaş ve işletme | [DKFDS, Danimarka](https://designsystem.dk/) |
| Resmî site afişi, erişilebilirlik bileşenleri | [KRDS, Kore](https://www.krds.go.kr/) |
| Belirteç boru hattı | [Digital Agency, Japonya](https://design.digital.go.jp/) |
