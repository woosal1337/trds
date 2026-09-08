// @kiris-ds/react · çekirdeği saran ince React katmanı.
//
// Kural: bu paket iş mantığı taşımaz. Her bileşen @kiris-ds/tanim içindeki tek
// tanımı React'ın createElement'i ile çizer. Ürettiği HTML, @kiris-ds/core
// belgelerindeki HTML ile birebir aynıdır. Davranış @kiris-ds/core baslat() ile
// bağlanır. Böylece bir bileşen React ile düz HTML arasında farklı davranmaz.

import { createElement, forwardRef, useEffect, useId, useRef, cloneElement, isValidElement, Fragment, useState, useCallback } from 'react';
import { TANIMLAR, KARSILIK, SARMALAYICISIZ, bir } from '@kiris-ds/tanim';
import { baslat } from '@kiris-ds/core';

export { KARSILIK, SARMALAYICISIZ, baslat };

const OZNITELIK = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex', maxlength: 'maxLength', autocomplete: 'autoComplete',
  inputmode: 'inputMode', spellcheck: 'spellCheck', readonly: 'readOnly', srclang: 'srcLang', datetime: 'dateTime',
  hreflang: 'hrefLang', allowfullscreen: 'allowFullScreen', autofocus: 'autoFocus', colspan: 'colSpan', rowspan: 'rowSpan'
};

const stilNesnesi = (metin) =>
  Object.fromEntries(metin.split(';').filter(Boolean).map((p) => { const [k, v] = p.split(':'); return [k.trim(), v.trim()]; }));

/** HTML öznitelik adlarını React adlarına çevirir. Boş değerleri atar. */
const cevir = (attrs, tag) => {
  const c = {};
  for (const [k, v] of Object.entries(attrs ?? {})) {
    if (v === undefined || v === null || v === false) continue;
    if (k === 'checked') c.defaultChecked = v;
    else if (k === 'value' && tag !== 'option' && tag !== 'output' && tag !== 'progress') c.defaultValue = v;
    else if (k === 'selected') { if (v) c['data-secili'] = ''; continue; } // select defaultValue okur, sonra siler
    else if (k === 'style' && typeof v === 'string') c.style = stilNesnesi(v);
    else c[OZNITELIK[k] ?? k] = v === true && k !== 'download' && k !== 'multiple' && k !== 'controls' && k !== 'open' && k !== 'required' && k !== 'hidden' && k !== 'selected' && k !== 'allowfullscreen' ? '' : v;
  }
  return c;
};

const duzlestir = (cocuklar) => cocuklar.flat(Infinity).filter((c) => c !== null && c !== undefined && c !== false);

const h = (tag, attrs, ...cocuklar) => {
  const duz = duzlestir(cocuklar);
  const props = cevir(attrs, tag);
  if (tag === 'select') {
    // React seçili seçeneği <option selected> ile değil, select defaultValue ile ister.
    const seciliDegerler = duz.filter((c) => isValidElement(c) && c.type === 'option' && c.props['data-secili'] !== undefined).map((c) => c.props.value);
    if (seciliDegerler.length) props.defaultValue = attrs?.multiple ? seciliDegerler : seciliDegerler[0];
  }
  const temiz = duz.map((c) => (isValidElement(c) && c.type === 'option' && c.props['data-secili'] !== undefined ? cloneElement(c, { 'data-secili': undefined }) : c));
  return createElement(tag, props, ...temiz);
};

const simge = (ad, sinif) => h('svg', { class: bir('kiris-simge', sinif), 'aria-hidden': 'true' }, h('use', { href: `#kiris-${ad}` }));

const koklendir = (agac, ref) => {
  if (isValidElement(agac)) return cloneElement(agac, { ref });
  if (Array.isArray(agac)) {
    const i = agac.findIndex((p) => isValidElement(p));
    return createElement(Fragment, null, ...agac.map((p, j) => (j === i ? cloneElement(p, { ref, key: j }) : isValidElement(p) ? cloneElement(p, { key: j }) : p)));
  }
  return agac;
};

const uret = (tanim) => {
  const Bilesen = forwardRef(function KirisBilesen(props, disRef) {
    const kok = useRef(null);
    const onek = useId().replace(/[^a-zA-Z0-9_-]/g, '');
    let sayac = 0;
    const y = { bir, simge, kimlik: (ad) => `${ad}-${onek}${sayac++ ? `-${sayac}` : ''}` };
    const refAta = useCallback((el) => {
      kok.current = el;
      if (typeof disRef === 'function') disRef(el);
      else if (disRef) disRef.current = el;
    }, [disRef]);
    useEffect(() => {
      if (tanim.davranis || props.oneriler || props.enCok) baslat(kok.current?.parentElement ?? document);
    });
    return koklendir(tanim.ciz(h, props, y), refAta);
  });
  Bilesen.displayName = tanim.ad;
  return Bilesen;
};

const bilesenler = Object.fromEntries(TANIMLAR.map((t) => [t.ad, uret(t)]));

export const {
  Dugme, Baglanti, MetinGirisi, EPostaGirisi, SayiGirisi, WebAdresiGirisi, ParolaGirisi, MetinAlani, AcilirListe,
  SecenekDugmesi, OnayKutusu, AlanGrubu, YardimMetni, HataMesaji, GirdiGrubu, DosyaYukleme, Anahtar, AranabilirListe,
  SaatGirisi, AralikSecici, AdetSecici, GirdiMaskesi, Takvim, CokluSecim, SecimEtiketi, Puanlama, BolumluSecim,
  KimlikNoGirisi, VergiNoGirisi, IbanGirisi, TelefonGirisi, PlakaGirisi, TarihGirisi, AdresGirisi,
  BaslikCubugu, AltBilgi, ResmiAfis, KurumTanitici, KurumLogosu, AsamaAfisi, CerezBildirimi, EdevletGiris, KvkkOnayi, ErisimMenusu,
  IceriyeAtla, SayfaYolu, Sayfalama, GeriBaglantisi, AdimGostergesi, YanMenu, SayfaIciGezinme, DilSecici, Arama, HizmetGezinmesi,
  AltGezinme, BasaDon, GenisMenu, Akordiyon, Sekmeler, Ayrintilar, KipPencere, YanPanel, Kart, Izgara, Kap, Ayrac, KarsilamaBlogu,
  Bolum, Karo, SimgeKarti, KayanPano, Baslik, Liste, Tablo, SiralanabilirTablo, OzetListesi, TanimListesi, Etiket, Rozet,
  GorevListesi, VurguluMetin, Simge, Istatistik, Avatar, Alinti, Gorsel, ZamanCizelgesi, BilgiKutusu, SonGuncelleme, Kod,
  KayitListesi, SimgeliListe, SurecListesi, TakipEt, Ses, Video, Uyari, BildirimAfisi, HataOzeti, Yukleniyor, Ilerleme, Ipucu,
  GeciciBildirim, Iskelet, UyariMetni, SonucPaneli, AcilirBilgi, Yonlendirme, EylemMenusu, IndirmeBaglantisi, Paylas, YuzenDugme,
  SayfadanCik, Yazdir
} = bilesenler;

/** Eski ad. Seçenek grubu: tur 'radyo' veya 'onay'. */
export const SecenekGrubu = forwardRef(function SecenekGrubu({ tur = 'radyo', ...props }, ref) {
  return createElement(tur === 'onay' ? OnayKutusu : SecenekDugmesi, { ...props, ref });
});

/** Düğme grubu. Kayıt defterinde düğmenin bir örneğidir. */
export function DugmeGrubu({ children, className }) {
  return createElement('div', { className: bir('kiris-button-grubu', className) }, children);
}

/** Sütun. Izgaranın içinde 1 ile 12 arası genişlik. */
export function Sutun({ genislik = 12, children, className }) {
  return createElement('div', { className: bir('kiris-sutun', `kiris-sutun--${genislik}`, className) }, children);
}

/** Bütün bileşenler, kayıt defteri kimliği ile. */
export const BILESENLER = Object.fromEntries(TANIMLAR.map((t) => [t.id, bilesenler[t.ad]]));

/**
 * Form durumu. Alan değerlerini ve hatalarını tek nesnede tutar. Gönderimde
 * hata özeti için listeyi verir.
 */
export function useKirisForm(baslangic = {}) {
  const [degerler, setDegerler] = useState(baslangic);
  const [hatalar, setHatalar] = useState({});
  const degistir = useCallback((ad) => (olay) => {
    const deger = olay?.target ? olay.target.value : olay;
    setDegerler((d) => ({ ...d, [ad]: deger }));
    setHatalar((h2) => (h2[ad] ? { ...h2, [ad]: undefined } : h2));
  }, []);
  const hataListesi = Object.entries(hatalar).filter(([, m]) => m).map(([ad, metin]) => ({ hedef: `#${ad}`, metin }));
  return { degerler, hatalar, degistir, setHatalar, hataListesi };
}
