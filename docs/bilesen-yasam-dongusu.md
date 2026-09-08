# Bileşen yaşam döngüsü

Bir bileşen dört durumdan geçer. Her durumun yazılı bir tamamlanma tanımı
vardır. Kararlı bir bileşen, önceki üç durumun bütün ölçütlerini de karşılar.

Model Hollanda NL Design System bayrak yarışı (`estafettemodel`) yaklaşımından
alındı. Sebebi şudur: çok sayıda kurumun olduğu bir ülkede merkezî ekip
darboğaz olur. Bayrak yarışı, bir kurumun kendisi için yaptığı işi başka
kurumların devralmasına izin verir.

## 1. Aday gösterildi

Bileşen henüz yok, ama ihtiyaç açık.

- [ ] Ad, TRDS adlandırma kuralına göre belirlendi.
- [ ] Kısa açıklama yazıldı.
- [ ] Bileşeni gösteren bir görsel eklendi.
- [ ] Bir GitHub tartışması açıldı.
- [ ] Genel olarak yararlı olduğuna dair kanıt toplandı.
- [ ] Gerekli çeşitlerin adı ve amacı yazıldı.
- [ ] İhtiyaç kullanıcı araştırması ile desteklendi.
- [ ] Çekirdek ekip ihtiyacı onayladı.

**Erişilebilir yapılamayacağı anlaşılan bir bileşen "önerilmez" olarak
işaretlenir ve sessizce düşürülmez.**

## 2. Topluluk

Bir kurum bileşeni yaptı ve paylaştı.

- [ ] CSS olarak erişilebilir.
- [ ] Belge sayfasında canlı bir örnek var.
- [ ] Uygulama, tartışmadaki ad ve amaca uyar.
- [ ] En az renk ve tipografi kararları belirteçlerle uygulandı.
- [ ] Belirteç adları kurala uyar ve kurum önekini taşır.
- [ ] Görsel gerileme testleri her tema için çalışır.
- [ ] Kod ve belge MIT lisanslıdır. Devlet kimliği için ayrı koşullar geçerlidir.

Bu aşamada iki kurum aynı bileşenin farklı sürümlerini taşıyabilir. Bu bir
sorun değildir. Farklar, bir sonraki aşamada tek bir ortak paydaya indirilir.

## 3. Aday bileşen

Ortak sisteme öneri. Görüş toplanıyor.

- [ ] Klavye ve ekran okuyucu ile denendi.
- [ ] React ve Vue sarmalayıcıları çekirdek ile aynı HTML’i üretir.
- [ ] Bileşenin anatomisi yazıldı.
- [ ] Alternatif adlar belgede takma ad olarak kaydedildi.
- [ ] Gerekiyorsa bileşen sadeleştirildi veya bölündü.
- [ ] Kuruma özgü hiçbir API kalmadı.
- [ ] API ve belirteçler `trds` önekini taşır.
- [ ] Erişilebilirlik uzmanı bileşeni doğruladı.
- [ ] Tasarımcı ve geliştirici birlikte çalışabiliyor.

Tartışmalı parçalar topluluk aşamasında kalabilir veya yeni bileşene bir ek
olarak dönüştürülür.

## 4. Kararlı

Kanıtlanmış ve güvence altında.

- [ ] Sınıf adları ve veri öznitelikleri donduruldu.
- [ ] Tam erişilebilirlik denetiminden geçti.
- [ ] Anlamsal sürümleme uygulanır.
- [ ] Değişiklik günlüğü kırıcı değişikliği açıkça söyler.
- [ ] Belgesi eksiksizdir.
- [ ] Kapsamlı biçimde test edildi.
- [ ] Sık güncellemek güvenlidir.

## Teknolojiye göre durum

Bir bileşen her teknolojide aynı olgunlukta olmayabilir. Bu yüzden durum
CSS, JavaScript, React ve Vue için ayrı verilir. Yöntem İrlanda GOV.IE
tasarım sisteminden alındı.

Bir ekip, seçtiği teknolojide bileşenin hazır olup olmadığını
[entegrasyon tablosundan](../apps/docs/build.mjs) görür.

## Önceliklendirme

Bir öneri üç soruya göre değerlendirilir. Yöntem USWDS uygulamasından alındı.

1. **Büyüklük.** Bir yineleme içinde biter mi, yoksa bölünmesi mi gerekir?
2. **Ciddiyet.** Hangi işlev etkileniyor? Geçici bir çözüm var mı?
3. **Öncelik.** Yol haritasına uyuyor mu?

**Tek istisna:** Erişilebilirliği etkileyen bir konu her zaman önceliklidir.
