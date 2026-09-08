# Güvenlik

## Bir açık bildirmek

Bir güvenlik açığı bulursanız **genel bir konu açmayın.** Bildirimi
<ege@chele.bi> adresine gönderin. Yanıt süresi 5 iş günüdür.

Bildirimde şunları yazın:

1. Etkilenen paket ve sürüm
2. Sorunu yeniden üretme adımları
3. Etkisi ve kimi etkilediği

## Kapsam

Bu depo bir arayüz kütüphanesidir. Kimlik doğrulaması, oturum yönetimi veya
veri saklama yapmaz.

**Önemli:** İstemci tarafındaki doğrulama bir güvenlik önlemi değildir.
`@tr-ds/validators` paketi kullanıcıya erken geri bildirim verir. Sunucu
tarafında aynı doğrulamayı yeniden yapın.

## Kimlik parçaları

Devlet kimliğini taşıyan bileşenler (`@tr-ds/identity`) kısıtlı lisanslıdır.
Bu paketin bir sahte sitede kullanıldığını görürseniz bildirin.
