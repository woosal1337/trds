// Arama önerileri için örnek veri. Gerçek e-Devlet aramasının üç grubu:
// hizmetler, kurumlar, belediyeler. Sunucu yerine sayfaya gömülür.
// Biçim, @kiris-ds/core `data-kiris="arama"` davranışının beklediği biçimdir.

const hizmet = (ad, ek) => ({ ad, ek, href: '#' });
const kurum = (ad) => ({ ad, href: '#' });

export const aramaOnerileri = {
  gruplar: [
    {
      ad: 'Hizmetler',
      ogeler: [
        hizmet('İkametgâh Belgesi Sorgulama', 'Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü'),
        hizmet('İkametgâhım (Adrese Bağlı Hizmetler)', 'e-Devlet Kapısı'),
        hizmet('Yerleşim Yeri ve Diğer Adres Belgesi Sorgulama', 'Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü'),
        hizmet('Adli Sicil Kaydı Sorgulama', 'Adalet Bakanlığı'),
        hizmet('Adres Değişikliği Bildirimi', 'Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü'),
        hizmet('Nüfus Kayıt Örneği Belgesi Sorgulama', 'Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü'),
        hizmet('Vergi Borcu Sorgulama ve Ödeme', 'Gelir İdaresi Başkanlığı'),
        hizmet('Vergi Borcu İçin Taksitlendirme', 'Gelir İdaresi Başkanlığı'),
        hizmet('Motorlu Taşıtlar Vergisi Ödeme', 'Gelir İdaresi Başkanlığı'),
        hizmet('SGK Tescil ve Hizmet Dökümü', 'Sosyal Güvenlik Kurumu'),
        hizmet('Normal Şartlarda Ne Zaman Emekli Olabilirim?', 'Sosyal Güvenlik Kurumu'),
        hizmet('4A Sigortalı Tescil Kaydı Tespiti', 'Sosyal Güvenlik Kurumu'),
        hizmet('Sağlık Provizyon Aktivasyon Sistemi (SPAS)', 'Sosyal Güvenlik Kurumu'),
        hizmet('Araçlarım', 'e-Devlet Kapısı'),
        hizmet('Araç Plakasına Yazılan Ceza Sorgulama', 'Emniyet Genel Müdürlüğü'),
        hizmet('Adıma Tescilli Araç Sorgulama', 'Türkiye Noterler Birliği'),
        hizmet('Sürücü Belgesi Ceza Puanı Sorgulama', 'Emniyet Genel Müdürlüğü'),
        hizmet('Tapu Bilgileri Sorgulama', 'Tapu ve Kadastro Genel Müdürlüğü'),
        hizmet('Kariyer Kapısı Kamu İşe Alım', 'Cumhurbaşkanlığı'),
        hizmet('Çalışma Hayatım', 'e-Devlet Kapısı'),
        hizmet('Aşı Bilgisi Sorgulama', 'Sağlık Bakanlığı'),
        hizmet('Merkezi Hekim Randevu Sistemi (MHRS)', 'Sağlık Bakanlığı'),
        hizmet('e-Nabız Kişisel Sağlık Sistemi', 'Sağlık Bakanlığı'),
        hizmet('Öğrenci Belgesi Sorgulama', 'Yükseköğretim Kurulu'),
        hizmet('Sınav Sonucu Sorgulama', 'ÖSYM'),
        hizmet('Şifremi Unuttum', 'e-Devlet Kapısı'),
        hizmet('Adrese Teslim Şifre Başvurusu', 'e-Devlet Kapısı'),
        hizmet('Belge Doğrulama', 'e-Devlet Kapısı'),
        hizmet('e-Tebligatlarım', 'e-Devlet Kapısı'),
        hizmet('Pasaport Başvurusu', 'Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü')
      ]
    },
    {
      ad: 'Kurumlar',
      ogeler: [
        kurum('Cumhurbaşkanlığı'),
        kurum('Adalet Bakanlığı'),
        kurum('Aile ve Sosyal Hizmetler Bakanlığı'),
        kurum('Çalışma ve Sosyal Güvenlik Bakanlığı'),
        kurum('İçişleri Bakanlığı'),
        kurum('Millî Eğitim Bakanlığı'),
        kurum('Millî Savunma Bakanlığı'),
        kurum('Sağlık Bakanlığı'),
        kurum('Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü'),
        kurum('Emniyet Genel Müdürlüğü'),
        kurum('Gelir İdaresi Başkanlığı'),
        kurum('Sosyal Güvenlik Kurumu'),
        kurum('Tapu ve Kadastro Genel Müdürlüğü'),
        kurum('Ölçme, Seçme ve Yerleştirme Merkezi (ÖSYM)'),
        kurum('Yükseköğretim Kurulu (YÖK)')
      ]
    },
    {
      ad: 'Belediyeler',
      ogeler: [
        kurum('Ankara Büyükşehir Belediyesi'),
        kurum('İstanbul Büyükşehir Belediyesi'),
        kurum('İzmir Büyükşehir Belediyesi'),
        kurum('Bursa Büyükşehir Belediyesi'),
        kurum('Antalya Büyükşehir Belediyesi'),
        kurum('Konya Büyükşehir Belediyesi'),
        kurum('Adana Büyükşehir Belediyesi'),
        kurum('Gaziantep Büyükşehir Belediyesi'),
        kurum('Kayseri Büyükşehir Belediyesi'),
        kurum('Çankaya Belediyesi'),
        kurum('Kadıköy Belediyesi'),
        kurum('Karşıyaka Belediyesi')
      ]
    }
  ]
};
