# @tr-ds/identity

TRDS simge seti, marka işareti ve kimlik parçaları. MIT lisanslı 74 simge ve
TRDS'nin kendi marka işareti. Devlet kimliği taşıyan parçalar kısıtlıdır.

TRDS, Türkiye kamu hizmetleri için bir tasarım sistemidir.
Belgeler: <https://trds.chele.bi>

## Kurulum

```bash
npm install @tr-ds/identity
```

## Kullanım

```js
<svg class="trds-simge" aria-hidden="true"><use href="#trds-health"/></svg>
```

Marka işareti tek renktir ve `currentColor` alır, açık ve koyu zeminde aynı
dosya çalışır. `dist/` içinde SVG kaynağı, 16'dan 196 piksele PNG türevleri ve
üç boyutlu `trds-favicon.ico` bulunur.

## Lisans

Tabler simgeleri MIT lisanslıdır: `src/simgeler/LICENSE-TABLER.txt`. TRDS marka
işareti özgün bir çizimdir, devlet sembolü içermez ve MIT lisanslıdır.
Devlet kimliği taşıyan parçalar için paketin içindeki
`dist/LICENSE-IDENTITY.md` dosyasını okuyun. TRDS, bu parçalar için resmî
kullanım izni vermez ve kamu kurumu onayı taşımaz.
