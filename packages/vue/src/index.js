// @tr-ds/vue — çekirdeği saran ince Vue katmanı.
//
// Kural: bu paket iş mantığı taşımaz. Her bileşen @tr-ds/tanim içindeki tek
// tanımı Vue'nun h'si ile çizer. Ürettiği HTML, @tr-ds/core belgelerindeki
// HTML ile birebir aynıdır. Davranış bağlandıktan sonra @tr-ds/core baslat()
// ile gelir. Şablon derleyicisi gerekmez: bileşenler çizim işlevi taşır.
//
//   import { createApp } from 'vue';
//   import { Trds, KimlikNoGirisi } from '@tr-ds/vue';
//   createApp(App).use(Trds);            // bütün bileşenler küresel
//   // veya tek tek: components: { KimlikNoGirisi }

import { defineComponent, h as vueH, onMounted, getCurrentInstance, useId } from 'vue';
import { TANIMLAR, KARSILIK, SARMALAYICISIZ, bir } from '@tr-ds/tanim';
import { baslat } from '@tr-ds/core';

export { KARSILIK, SARMALAYICISIZ, baslat };

const duzlestir = (cocuklar) => cocuklar.flat(Infinity).filter((c) => c !== null && c !== undefined && c !== false);

const temizle = (attrs) => {
  const c = {};
  for (const [k, v] of Object.entries(attrs ?? {})) {
    if (v === undefined || v === null || v === false) continue;
    c[k] = v;
  }
  return c;
};

const h = (tag, attrs, ...cocuklar) => vueH(tag, temizle(attrs), duzlestir(cocuklar));

const simge = (ad, sinif) => h('svg', { class: bir('trds-simge', sinif), 'aria-hidden': 'true' }, h('use', { href: `#trds-${ad}` }));

const deveBoynu = (ad) => ad.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

const uret = (tanim) =>
  defineComponent({
    name: tanim.ad,
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      const ornek = getCurrentInstance();
      const onek = useId().replace(/[^a-zA-Z0-9_-]/g, '');
      onMounted(() => {
        const el = ornek?.proxy?.$el;
        const kok = el && el.nodeType === 1 ? el : el?.parentElement;
        if (tanim.davranis || attrs.oneriler || attrs.enCok) baslat(kok?.parentElement ?? document);
      });
      return () => {
        let sayac = 0;
        const y = { bir, simge, kimlik: (ad) => `${ad}-${onek}${sayac++ ? `-${sayac}` : ''}` };
        const props = {};
        for (const [k, v] of Object.entries(attrs)) props[deveBoynu(k)] = v;
        if (slots.default) props.children = slots.default();
        const agac = tanim.ciz(h, props, y);
        return Array.isArray(agac) ? duzlestir(agac) : agac;
      };
    }
  });

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

/** Düğme grubu. Kayıt defterinde düğmenin bir örneğidir. */
export const DugmeGrubu = defineComponent({
  name: 'DugmeGrubu',
  setup(_, { slots, attrs }) { return () => vueH('div', { class: bir('trds-button-grubu', attrs.class) }, slots.default?.()); }
});

/** Sütun. Izgaranın içinde 1 ile 12 arası genişlik. */
export const Sutun = defineComponent({
  name: 'Sutun',
  props: { genislik: { type: [Number, String], default: 12 } },
  setup(props, { slots, attrs }) { return () => vueH('div', { class: bir('trds-sutun', `trds-sutun--${props.genislik}`, attrs.class) }, slots.default?.()); }
});

/** Bütün bileşenler, kayıt defteri kimliği ile. */
export const BILESENLER = Object.fromEntries(TANIMLAR.map((t) => [t.id, bilesenler[t.ad]]));

/** Eklenti: app.use(Trds) bütün bileşenleri Trds öneki ile kaydeder: <TrdsDugme>. */
export const Trds = {
  install(app, { onek = 'Trds' } = {}) {
    for (const [ad, b] of Object.entries(bilesenler)) app.component(`${onek}${ad}`, b);
    app.component(`${onek}DugmeGrubu`, DugmeGrubu);
    app.component(`${onek}Sutun`, Sutun);
  }
};
