# Değişiklik günlüğü

Sürümleme [anlamsal sürümleme](https://semver.org/lang/tr/) kuralına uyar.

## [1.0.1] · 2026-09-08

- Arama önerileri yalnız HTTP ve HTTPS adreslerine gider. Betik adresleri
  HTML çıktısına, seçim olayına ve gezinmeye geçmez.
- Kimlik yapısı eski çıktıları siler. Paket, kimlik koşullarını ve Tabler
  lisansını içerir. Kiriş, üçüncü taraf logoları için izin vermez.
- Vue alt sınırı 3.5 oldu. Yerel yapı için Node.js 22.14 veya üstü gerekir.
- Paket denetimi sürümleri, dışa aktarımları ve lisans dosyalarını denetler.
  Yayın akışı sürüm etiketi ve GitHub Actions sırrı kullanır.
  Aynı sürümün farklı içeriğini yayımlamaz.
- Araştırma notları ürün deposundan çıktı. Belge bağlantıları ve kurulum
  adımları düzeldi. Üç yeni otomatik test ve tarayıcı arama testi eklendi.

## [1.0.0] · 2026-09-07

İlk genel sürüm. Henüz hiçbir kurum tarafından benimsenmedi.

### Eklendi

- 116 bileşen, 10 grupta. 13 tanesi Türkiye'ye özgüdür.
- 161 tasarım belirteci. Kontrast garantileri yapı sırasında denetlenir.
- `@kiris-ds/validators`: T.C. kimlik numarası, vergi kimlik numarası, IBAN,
  telefon, plaka, tarih ve Türkçe büyük harf kuralı. 21 doğrulayıcı.
- `@kiris-ds/react` ve `@kiris-ds/vue`: 114 bileşen için sarmalayıcı. Tek bir tanım
  paketinden üretilir ve çekirdek ile aynı HTML çıkarır.
- 39 ilerlemeli iyileştirme başlatıcısı. Betik olmadan her parça çalışır.
- Üç kurum teması. Her biri tek bir marka renginden üretilir.
- Belge sitesi: 130 sayfa, bileşen dizini, entegrasyon tablosu ve üç gerçek
  kamu sitesinin birebir yeniden kurulumu.
- `llms.txt` ve `llms-full.txt`. Bir dil modeli sistemi tek dosyadan öğrenir.
- Bütünlük denetimi: belgelerdeki her sınıf ve davranış kodda aranır.
- 42 test. Yapı, test ve denetim her gönderimde çalışır.

### Lisans

- Kod, simgeler ve belgeler MIT lisanslıdır.
- Devlet kimliği taşıyan parçalar (arma, e-Devlet işareti, resmî site afişi,
  kurum logoları) `LICENSE-IDENTITY.md` kapsamındadır ve yalnız `gov.tr`
  hizmetleri kullanabilir.
- Simge seti Tabler Icons setinden gelir (MIT).
