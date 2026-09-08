// @kiris-ds/tanim — bileşen tanımları. Çerçeveden bağımsız.
//
// Her tanım bir çizim işlevi taşır: ciz(h, props, y). h(tag, attrs, ...children)
// HTML öznitelik adlarını alır. React ve Vue paketleri aynı tanımı kendi h'leri
// ile çağırır. Böylece iki paket de çekirdek belgelerindeki HTML'i üretir.

import { formTanimlari } from './10-form.js';
import { yapiTanimlari } from './20-yapi.js';
export { bir, tanimlar, alan, girdiAlani } from './yardimci.js';

/** @type {Array<{id:string, ad:string, kok:string, davranis?:string, ornek:object, ciz:Function}>} */
export const TANIMLAR = [...formTanimlari, ...yapiTanimlari];

/** Kayıt defteri kimliği → bileşen adı. */
export const KARSILIK = Object.fromEntries(TANIMLAR.map((t) => [t.id, t.ad]));

/** Sarmalayıcı gerektirmeyen kayıt defteri parçaları: yalnız sınıf ve belge. */
export const SARMALAYICISIZ = ['utilities', 'favicon'];

const kimlikler = new Map(TANIMLAR.map((t) => [t.id, t]));
export const tanimBul = (id) => kimlikler.get(id);
