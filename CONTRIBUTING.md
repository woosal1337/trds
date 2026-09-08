# Katkı

Katkı için teşekkürler. Önce [GOVERNANCE.md](./GOVERNANCE.md) dosyasını okuyun.

## Bu depo ne içindir

Bu tasarım sistemi tutarlı ve erişilebilir kamu hizmetlerini destekler.

**Genel amaçlı bir arayüz kütüphanesi değildir ve kamu dışı kullanım için bir
marka aracı değildir.**

## Beş katkı ölçütü

Bir bileşen sisteme girmeden önce beş ölçütü karşılar. Ölçütler Birleşik
Krallık tasarım sisteminden alındı. İlk ikisi işe başlamadan, son üçü
yayımdan önce denetlenir.

### İşe başlamadan önce

1. **Yararlı.** Birden çok kurumun veya hizmetin buna ihtiyacı olduğuna dair
   kanıt var. Kanıt, farklı hizmetlerden ekran görüntüsü veya bağlantı olabilir.
2. **Benzersiz.** Sistemde zaten olan bir şeyi tekrarlamıyor. Var olan bir
   bileşenin yerini alacaksa, ondan daha iyi olduğunu göstermelidir.

### Yayımdan önce

3. **Kullanılabilir.** Engelli kullanıcıları da kapsayan temsili bir örneklemle
   test edildi ve çalıştığı görüldü.
4. **Tutarlı.** Var olan belirteçleri ve bileşenleri kullanır. Metni Kiriş dil
   kuralına uyar. Kodu Kiriş kodlama kuralına uyar.
5. **Çok yönlü.** Farklı hizmetlerde, tarayıcılarda, yardımcı teknolojilerde ve
   cihazlarda çalışır.

## Nasıl katkı verilir

### Tartışma açın

Bir fikri, soruyu veya gözlemi paylaşmak için GitHub Discussions kullanın.
Tam biçimlenmiş bir öneri gerekmez.

### Konu açın

Belirli bir sorun, eksik veya kusur için GitHub Issues kullanın. Şunlara
odaklanın:

- sorun nedir
- kimi etkiliyor
- kamu hizmetleri için neden önemli

Çözüm önermek yerine sorunu ve etkisini anlatın.

### Değişiklik önerin

Değişiklik önerileri genellikle var olan bir konu ile ilişkili olur. Bir
öneri, bir çözümü göstermek veya bir erişilebilirlik sorununu kanıtlamak için
kullanılabilir. Birleştirme garantisi yoktur.

## Kabul edilmeyenler

- Gösterilmiş bir kamu kullanım gerekçesi olmayan yeni bileşen
- Var olan bir kalıbı tekrarlayan öneri
- Yalnız görsel beğeniye dayanan değişiklik
- Marka veya arma değişikliği
- Kamu dışı bir hizmete onay ima eden özellik

## Yerel çalışma

```bash
npm ci
npm run yapi      # her şeyi üretir
npm test          # tüm testler
npm run denetle   # bütünlük denetimi
npm run sun       # belge sitesi
```

Node.js 22.14 veya üstünü kullanın. Değişiklik göndermeden önce yapı, test ve
bütünlük denetimini çalıştırın. Yapı araçları ek bağımlılık istemez. React ve
Vue testleri için `npm ci` gerekir.

## Kod kuralları

- Girinti 2 boşluk. Sekme yok.
- CSS sınıf adı `kiris-` ile başlar. Bileşen adı Türkçedir.
- Bir bileşen **ham renk veya ölçü kullanamaz.** Her değer bir belirteçten gelir.
- Bir bileşen JavaScript olmadan da okunur ve kullanılır olmalıdır.
- Odak halkasını kaldırmayın.
- Yorumlar Türkçe yazılır. Kod tanımlayıcıları da Türkçe yazılır.

## Erişilebilirlik önceliklidir

Erişilebilirliği etkileyen bir konu her zaman önceliklidir. Bu kural USWDS
uygulamasından alındı ve tek istisnasız uygulanır.
