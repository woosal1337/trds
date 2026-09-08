# Mimari kararlar

Bu belge, geri dönülmesi pahalı olan kararları ve gerekçelerini yazar. Bir
karar değişirse buraya yeni bir kayıt eklenir. Eski kayıt silinmez.

## 0001 — Bağımlılık yok

**Karar.** Yapı betikleri, test çatısı, tema üreticisi ve belge üreticisi
yalnız Node standart kütüphanesini kullanır.

**Gerekçe.** Bir kamu kurumu bu depoyu kapalı bir ağda derleyebilmelidir. Bir
bağımlılık ağacı, kurumun onaylaması gereken yüzlerce paket demektir. Ayrıca
bir tasarım sistemi on yıl yaşar. Bugün kurulan bir yapı aracı beş yıl sonra
bakımsız kalır.

**Bedeli.** Küçültme basittir ve bir paketleyici kadar iyi değildir. Gerçek
kazanç sunucunun gzip veya brotli sıkıştırmasından gelir.

## 0002 — Tek doğruluk kaynağı: kayıt defteri

**Karar.** Her bileşenin tanımı `tools/registry/` içinde durur. Belge sitesi,
bileşen dizini, entegrasyon tablosu, WCAG haritası ve README bundan üretilir.

**Gerekçe.** Bir bileşen hakkındaki bilgi iki yerde durursa biri eskir.
Eskiyen belge, olmayan belgeden daha zararlıdır.

**Denetim.** `tools/denetle.mjs`, belgelerdeki her CSS sınıfını ve her
`data-kiris` davranışını derlenmiş kodda arar. Bulamazsa yapı durur.

## 0003 — Kontrast bir denetimdir, bir söz değil

**Karar.** Belirteç yapısı 36 kontrast garantisini hesaplar. Bir garanti
tutmazsa süreç kodu 1 ile biter.

**Gerekçe.** Renk değişiklikleri kontrastı bozabilir. Yapı sırasında üretilen
rapor, tanımlı renk çiftlerinin ölçümünü gösterir.

## 0004 — Etkileşim rengi mavi, kimlik rengi kırmızı

**Karar.** Birincil etkileşim rengi koyu mavidir. Bayrak kırmızısı yalnız
kimlik parçalarında kullanılır: resmî afiş şeridi, arma, e-Devlet düğmesi.

**Gerekçe.** İki sebep var. Birincisi kontrast: `#e30a17` beyaz üstünde
3.94:1 verir ve normal metin için AA ölçütünü karşılamaz. İkincisi anlam:
kırmızı her arayüzde hata ve tehlike demektir. Birincil düğme kırmızı olursa
hata rengi ile çakışır. Fransa, Kore, Amerika ve Danimarka aynı ayrımı yapar.

## 0005 — Türkçe kod, İngilizce yapı adları

**Karar.** CSS sınıfları, veri öznitelikleri, işlev adları ve yorumlar
Türkçedir. Bileşen kimlikleri (`kimlik-no`, `error-summary`) İngilizce veya
Türkçe olabilir ve URL'de kullanılır.

**Gerekçe.** Bu sistemin kullanıcısı Türk kamu tedarikçisidir. Danimarka
İngilizce sınıf adı kullanır, Kore Korece bileşen adı kullanır. İkisi de
çalışır. Belirleyici olan, belgeyi okuyanın dilidir.

## 0006 — İlerlemeli iyileştirme zorunludur

**Karar.** Her bileşen JavaScript olmadan okunur ve kullanılır. JavaScript
yalnız iyileştirir.

**Gerekçe.** Bir vatandaş bir kamu hizmetini kullanmak zorundadır. Alternatifi
yoktur. Yavaş bir bağlantı, eski bir cihaz veya bir betik hatası hizmeti
kullanılamaz hâle getiremez. Birleşik Krallık tarayıcı derecelendirmesi aynı
kuralı uygular: A, B ve C sınıfı tarayıcılar betiği çalıştırır, X sınıfı
tarayıcı çalışan HTML ve CSS alır.

## 0007 — Lisans ikiye ayrılır

**Karar.** Kod MIT, devlet kimliği kısıtlı.

**Gerekçe.** Tek bir lisans iki hedefi birden karşılayamaz. Yeniden kullanım
için serbestlik gerekir. Sahteciliğe karşı kısıtlama gerekir. Fransa
kısıtlamayı kullanım koşullarıyla, İrlanda yönetişim belgesiyle çözer. Kiriş
ikisini birleştirir.

## 0008 — Doğrulama ayrı bir pakette durur

**Karar.** T.C. kimlik numarası, vergi kimlik numarası, IBAN, telefon, plaka,
tarih ve Türkçe büyük harf kuralı `@kiris-ds/validators` paketindedir ve testlidir.

**Gerekçe.** Bu algoritmalar bugün her kurumda yeniden yazılıyor ve çoğu yalnız
hane sayısına bakıyor. Ayrı bir paket, aynı algoritmanın sunucu tarafında da
kullanılmasını sağlar. İstemci doğrulaması bir güvenlik önlemi değildir.
