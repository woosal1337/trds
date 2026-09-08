// Ortak yardımcılar. Her tanım aynı üç işlevi alır:
//   h(tag, attrs, ...children)  — HTML öznitelik adlarıyla (class, for, tabindex)
//   y.bir(...sinif)             — sınıf birleştirir, boşları atar
//   y.kimlik(onek)              — sayfada tek olan bir id verir
//   y.simge(ad, sinif?)         — e-Devlet simgesi, sprite'a <use> ile bağlanır

export const bir = (...sinif) => sinif.filter(Boolean).join(' ');

/** aria-describedby değeri: var olan parçalardan kurulur. */
export const tanimlar = (id, yardim, hata, ek) =>
  [yardim && `${id}-yardim`, hata && `${id}-hata`, ek].filter(Boolean).join(' ') || undefined;

/**
 * Alan sarmalayıcısı: etiket, yardım, hata ve alan tek yerde.
 * grup=true ise fieldset ve legend olur.
 */
export const alan = (h, y, { id, etiket, yardim, hata, grup = false, class: sinif, davranis, ek = {} }, ...cocuklar) => {
  const Kok = grup ? 'fieldset' : 'div';
  const Etiket = grup ? 'legend' : 'label';
  return h(
    Kok,
    {
      class: y.bir(grup ? 'trds-alan-grubu' : 'trds-alan', hata && 'trds-alan--hata', sinif),
      'data-trds': davranis,
      ...ek
    },
    h(Etiket, { class: grup ? 'trds-baslik-legend' : 'trds-etiket', for: grup ? undefined : id }, etiket),
    yardim ? h('p', { class: 'trds-yardim', id: `${id}-yardim` }, yardim) : null,
    davranis || hata ? h('p', { class: 'trds-hata', id: `${id}-hata`, 'data-trds-hata': davranis ? '' : undefined, hidden: !hata }, hata ? [h('span', { class: 'trds-gorsel-gizli' }, 'Hata:'), ' ', hata] : null) : null,
    ...cocuklar
  );
};

/** Tek satırlı girdi: alan + input. Türkiye alanları da bunu kullanır. */
export const girdiAlani = (h, y, p, girdiEk = {}) => {
  const { id: verilen, etiket, yardim, hata, genislik, davranis, zorunlu, sayac, sayacBirim, class: sinif, ...kalan } = p;
  const id = verilen ?? y.kimlik('alan');
  return alan(
    h, y,
    { id, etiket, yardim, hata, davranis, ek: { 'data-zorunlu': zorunlu ? '' : undefined } },
    h('input', {
      id,
      type: 'text',
      class: y.bir('trds-girdi', genislik && `trds-girdi--${genislik}`, hata && 'trds-girdi--hata', sinif),
      'aria-describedby': tanimlar(id, yardim, hata, sayac ? `${id}-sayac` : undefined),
      'aria-invalid': hata ? 'true' : undefined,
      ...girdiEk,
      ...kalan
    }),
    sayac ? h('p', { class: 'trds-sayac', id: `${id}-sayac`, 'data-trds-sayac': '', 'aria-live': 'off' }) : null
  );
};

export const secenekler = (h, y, { id, ad, tur, secenekler: liste = [], deger }) =>
  h('div', { class: 'trds-secenekler' },
    ...liste.map((s, i) => {
      const secenekId = `${id}-${s.deger ?? i}`;
      const secili = tur === 'radio' ? deger === s.deger : (Array.isArray(deger) ? deger.includes(s.deger) : Boolean(s.secili));
      return h('div', { class: 'trds-secenek' },
        h('input', { class: tur === 'radio' ? 'trds-radyo' : 'trds-onay', id: secenekId, name: ad, type: tur, value: s.deger, checked: secili || undefined, 'aria-describedby': s.yardim ? `${secenekId}-yardim` : undefined }),
        h('label', { class: 'trds-secenek-etiket', for: secenekId }, s.ad),
        s.yardim ? h('p', { class: 'trds-secenek-yardim', id: `${secenekId}-yardim` }, s.yardim) : null
      );
    })
  );
