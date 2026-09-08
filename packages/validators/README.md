# @kiris-ds/validators

Kiriş doğrulayıcıları. T.C. kimlik numarası, vergi numarası, IBAN, telefon, plaka ve Türkçe metin kuralları.

Kiriş, Türkiye kamu hizmetleri için bir tasarım sistemidir.
Belgeler: <https://trds.chele.bi>

## Kurulum

```bash
npm install @kiris-ds/validators
```

## Kullanım

```js
import { kimlikNoGecerli, ibanGecerli } from '@kiris-ds/validators';

kimlikNoGecerli('10000000146');
```

## Lisans

MIT
