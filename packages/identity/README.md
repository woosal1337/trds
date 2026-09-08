# @kiris-ds/identity

Kiriş simge seti, marka işareti ve kimlik parçaları. MIT lisanslı 74 simge ve
Kiriş'in kendi marka işareti. Devlet kimliği taşıyan parçalar kısıtlıdır.

Kiriş, Türkiye kamu hizmetleri için bir tasarım sistemidir.
Belgeler: <https://trds.chele.bi>

## Kurulum

```bash
npm install @kiris-ds/identity
```

## Kullanım

```js
<svg class="kiris-simge" aria-hidden="true"><use href="#kiris-health"/></svg>
```

Marka işareti tek renktir ve `currentColor` alır, açık ve koyu zeminde aynı
dosya çalışır. `dist/` içinde SVG kaynağı, 16'dan 196 piksele PNG türevleri ve
üç boyutlu `kiris-favicon.ico` bulunur.

## Lisans

Tabler simgeleri MIT lisanslıdır: `src/simgeler/LICENSE-TABLER.txt`. Kiriş marka
işareti özgün bir çizimdir, devlet sembolü içermez ve MIT lisanslıdır.
Devlet kimliği taşıyan parçalar için paketin içindeki
`dist/LICENSE-IDENTITY.md` dosyasını okuyun. Kiriş, bu parçalar için resmî
kullanım izni vermez ve kamu kurumu onayı taşımaz.
