# @tr-ds/validators

TRDS doğrulayıcıları. T.C. kimlik numarası, vergi numarası, IBAN, telefon, plaka ve Türkçe metin kuralları.

TRDS, Türkiye kamu hizmetleri için bir tasarım sistemidir.
Belgeler: <https://trds.chele.bi>

## Kurulum

```bash
npm install @tr-ds/validators
```

## Kullanım

```js
import { kimlikNoGecerli, ibanGecerli } from '@tr-ds/validators';

kimlikNoGecerli('10000000146');
```

## Lisans

MIT
