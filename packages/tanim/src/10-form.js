// Form, seçim ve Türkiye'ye özgü form alanları.
import { alan, girdiAlani, secenekler, tanimlar } from './yardimci.js';

const DUGME_TUR = { birincil: '', ikincil: 'trds-button--ikincil', tehlike: 'trds-button--tehlike', sade: 'trds-button--sade' };

export const formTanimlari = [
  {
    id: 'button', ad: 'Dugme', kok: 'trds-button',
    ornek: { children: 'Devam et' },
    ciz: (h, { tur = 'birincil', simge = false, kucuk = false, class: sinif, children, ...kalan }, y) =>
      h('button', { type: 'button', class: y.bir('trds-button', DUGME_TUR[tur], simge && 'trds-button--simge', kucuk && 'trds-button--kucuk', sinif), ...kalan }, children)
  },
  {
    id: 'link', ad: 'Baglanti', kok: 'trds-link',
    ornek: { href: '#', children: 'Başvuru koşulları' },
    ciz: (h, { class: sinif, children, ...kalan }, y) => h('a', { class: y.bir('trds-link', sinif), ...kalan }, children)
  },
  {
    id: 'text-input', ad: 'MetinGirisi', kok: 'trds-alan',
    ornek: { etiket: 'Adınız', yardim: 'Kimliğinizde yazdığı gibi.' },
    ciz: (h, p, y) => girdiAlani(h, y, p)
  },
  {
    id: 'email-input', ad: 'EPostaGirisi', kok: 'trds-alan',
    ornek: { etiket: 'E-posta adresiniz' },
    ciz: (h, p, y) => girdiAlani(h, y, p, { type: 'email', autocomplete: 'email', spellcheck: 'false' })
  },
  {
    id: 'number-input', ad: 'SayiGirisi', kok: 'trds-alan',
    ornek: { etiket: 'Kişi sayısı', genislik: '2' },
    ciz: (h, { ondalik = false, ...p }, y) => girdiAlani(h, y, p, { inputmode: ondalik ? 'decimal' : 'numeric', pattern: ondalik ? undefined : '[0-9]*' })
  },
  {
    id: 'url-input', ad: 'WebAdresiGirisi', kok: 'trds-alan',
    ornek: { etiket: 'Web sitesi' },
    ciz: (h, p, y) => girdiAlani(h, y, p, { type: 'url', inputmode: 'url', autocomplete: 'url', spellcheck: 'false' })
  },
  {
    id: 'password-input', ad: 'ParolaGirisi', kok: 'trds-alan', davranis: 'parola',
    ornek: { etiket: 'Parolanız' },
    ciz: (h, { id: verilen, etiket, yardim, hata, yeni = false, class: sinif, ...kalan }, y) => {
      const id = verilen ?? y.kimlik('parola');
      return alan(h, y, { id, etiket, yardim, hata, davranis: 'parola' },
        h('div', { class: 'trds-parola' },
          h('input', { class: y.bir('trds-girdi', hata && 'trds-girdi--hata', sinif), id, type: 'password', autocomplete: yeni ? 'new-password' : 'current-password', spellcheck: 'false', 'aria-describedby': tanimlar(id, yardim, hata), 'aria-invalid': hata ? 'true' : undefined, ...kalan }),
          h('button', { class: 'trds-button trds-button--ikincil trds-parola__dugme', type: 'button', 'aria-controls': id, 'aria-pressed': 'false' }, 'Göster')
        )
      );
    }
  },
  {
    id: 'textarea', ad: 'MetinAlani', kok: 'trds-alan',
    ornek: { etiket: 'Başvuru gerekçeniz', enCok: 200 },
    ciz: (h, { id: verilen, etiket, yardim, hata, enCok, satir = 5, class: sinif, ...kalan }, y) => {
      const id = verilen ?? y.kimlik('metin');
      return alan(h, y, { id, etiket, yardim, hata, davranis: enCok ? 'karakter-sayaci' : undefined, ek: { 'data-sinir': enCok } },
        h('textarea', { class: y.bir('trds-metin-alani', hata && 'trds-girdi--hata', sinif), id, rows: satir, 'aria-describedby': tanimlar(id, yardim, hata, enCok ? `${id}-sayac` : undefined), 'aria-invalid': hata ? 'true' : undefined, ...kalan }),
        enCok ? h('p', { class: 'trds-sayac', id: `${id}-sayac`, 'aria-live': 'polite' }, `${enCok} karakter kaldı`) : null
      );
    }
  },
  {
    id: 'select', ad: 'AcilirListe', kok: 'trds-alan',
    ornek: { etiket: 'İl', secenekler: [{ deger: '06', ad: 'Ankara' }, { deger: '34', ad: 'İstanbul' }] },
    ciz: (h, { id: verilen, etiket, yardim, hata, secenekler: liste = [], bosMetin = 'Seçiniz', deger, class: sinif, ...kalan }, y) => {
      const id = verilen ?? y.kimlik('secim');
      return alan(h, y, { id, etiket, yardim, hata },
        h('select', { class: y.bir('trds-secim', sinif), id, value: deger, 'aria-describedby': tanimlar(id, yardim, hata), 'aria-invalid': hata ? 'true' : undefined, ...kalan },
          h('option', { value: '' }, bosMetin),
          ...liste.map((s) => h('option', { value: s.deger }, s.ad))
        )
      );
    }
  },
  {
    id: 'radio', ad: 'SecenekDugmesi', kok: 'trds-alan-grubu',
    ornek: { etiket: 'Başvuru türü', ad: 'tur', secenekler: [{ deger: 'bireysel', ad: 'Bireysel' }, { deger: 'kurumsal', ad: 'Kurumsal' }] },
    ciz: (h, { id: verilen, etiket, yardim, hata, ad, secenekler: liste, deger }, y) => {
      const id = verilen ?? y.kimlik('radyo');
      return alan(h, y, { id, etiket, yardim, hata, grup: true }, secenekler(h, y, { id, ad, tur: 'radio', secenekler: liste, deger }));
    }
  },
  {
    id: 'checkbox', ad: 'OnayKutusu', kok: 'trds-alan-grubu',
    ornek: { etiket: 'Hangi belgeleri yükleyeceksiniz?', ad: 'belge', secenekler: [{ deger: 'kimlik', ad: 'Kimlik fotokopisi' }, { deger: 'ikametgah', ad: 'İkametgâh belgesi' }] },
    ciz: (h, { id: verilen, etiket, yardim, hata, ad, secenekler: liste, deger }, y) => {
      const id = verilen ?? y.kimlik('onay');
      return alan(h, y, { id, etiket, yardim, hata, grup: true }, secenekler(h, y, { id, ad, tur: 'checkbox', secenekler: liste, deger }));
    }
  },
  {
    id: 'fieldset', ad: 'AlanGrubu', kok: 'trds-alan-grubu',
    ornek: { etiket: 'Adres', children: 'Alanlar' },
    ciz: (h, { id: verilen, etiket, yardim, hata, children }, y) => alan(h, y, { id: verilen ?? y.kimlik('grup'), etiket, yardim, hata, grup: true }, children)
  },
  {
    id: 'hint', ad: 'YardimMetni', kok: 'trds-yardim',
    ornek: { id: 'ad-yardim', children: 'Kimliğinizde yazdığı gibi.' },
    ciz: (h, { id, children, class: sinif }, y) => h('p', { class: y.bir('trds-yardim', sinif), id }, children)
  },
  {
    id: 'error-message', ad: 'HataMesaji', kok: 'trds-hata',
    ornek: { id: 'ad-hata', children: 'Adınızı yazın.' },
    ciz: (h, { id, children, class: sinif }, y) => h('p', { class: y.bir('trds-hata', sinif), id }, h('span', { class: 'trds-gorsel-gizli' }, 'Hata:'), ' ', children)
  },
  {
    id: 'input-group', ad: 'GirdiGrubu', kok: 'trds-alan',
    ornek: { etiket: 'Tutar', sonek: '₺', genislik: '10' },
    ciz: (h, { id: verilen, etiket, yardim, hata, onek, sonek, genislik, class: sinif, ...kalan }, y) => {
      const id = verilen ?? y.kimlik('grup');
      return alan(h, y, { id, etiket, yardim, hata },
        h('div', { class: 'trds-girdi-grubu' },
          onek ? h('span', { class: 'trds-girdi-grubu__ek', 'aria-hidden': 'true' }, onek) : null,
          h('input', { class: y.bir('trds-girdi', genislik && `trds-girdi--${genislik}`, hata && 'trds-girdi--hata', sinif), id, type: 'text', 'aria-describedby': tanimlar(id, yardim, hata), ...kalan }),
          sonek ? h('span', { class: 'trds-girdi-grubu__ek', 'aria-hidden': 'true' }, sonek) : null
        )
      );
    }
  },
  {
    id: 'file-upload', ad: 'DosyaYukleme', kok: 'trds-alan', davranis: 'dosya',
    ornek: { etiket: 'İkametgâh belgesi', yardim: 'PDF veya JPG. En çok 5 MB.', kabul: '.pdf,.jpg' },
    ciz: (h, { id: verilen, etiket, yardim, hata, kabul, coklu = false, enBuyuk, ...kalan }, y) => {
      const id = verilen ?? y.kimlik('dosya');
      return alan(h, y, { id, etiket, yardim, hata, davranis: 'dosya', ek: { 'data-en-buyuk': enBuyuk } },
        h('div', { class: 'trds-dosya-alani' },
          h('input', { class: 'trds-dosya', id, type: 'file', accept: kabul, multiple: coklu || undefined, 'aria-describedby': tanimlar(id, yardim, hata), ...kalan }),
          h('span', { class: 'trds-button trds-button--ikincil trds-dosya-alani__dugme', 'aria-hidden': 'true' }, 'Dosya seç'),
          h('p', { class: 'trds-dosya-alani__metin' }, 'veya dosyayı buraya sürükleyin')
        ),
        h('ul', { class: 'trds-dosya-liste', 'aria-label': 'Seçilen dosyalar' }),
        h('p', { class: 'trds-dosya-durum trds-gorsel-gizli', 'aria-live': 'polite' })
      );
    }
  },
  {
    id: 'switch', ad: 'Anahtar', kok: 'trds-anahtar',
    ornek: { etiket: 'Başvuru durumu değişince SMS gönder', ad: 'bildirim' },
    ciz: (h, { id: verilen, etiket, ad, acik = false, ...kalan }, y) => {
      const id = verilen ?? y.kimlik('anahtar');
      return h('div', { class: 'trds-anahtar' },
        h('input', { class: 'trds-anahtar__girdi', id, name: ad, type: 'checkbox', role: 'switch', checked: acik || undefined, ...kalan }),
        h('label', { class: 'trds-anahtar__etiket', for: id }, h('span', { class: 'trds-anahtar__yol', 'aria-hidden': 'true' }), h('span', null, etiket))
      );
    }
  },
  {
    id: 'combobox', ad: 'AranabilirListe', kok: 'trds-alan', davranis: 'aranabilir',
    ornek: { etiket: 'İl', secenekler: [{ deger: '06', ad: 'Ankara' }, { deger: '34', ad: 'İstanbul' }] },
    ciz: (h, { id: verilen, etiket, yardim = 'Yazmaya başlayın ve listeden seçin.', hata, secenekler: liste = [], listeAdi = 'Seçenekler', ...kalan }, y) => {
      const id = verilen ?? y.kimlik('aranabilir');
      return alan(h, y, { id, etiket, yardim, hata, davranis: 'aranabilir' },
        h('div', { class: 'trds-aranabilir' },
          h('input', { class: 'trds-girdi', id, type: 'text', role: 'combobox', 'aria-expanded': 'false', 'aria-controls': `${id}-liste`, 'aria-autocomplete': 'list', autocomplete: 'off', 'aria-describedby': tanimlar(id, yardim, hata), ...kalan }),
          h('ul', { class: 'trds-aranabilir__liste', id: `${id}-liste`, role: 'listbox', 'aria-label': listeAdi, hidden: true },
            ...liste.map((s) => h('li', { role: 'option', id: `${id}-${s.deger}`, 'data-deger': s.deger }, s.ad))
          ),
          h('p', { class: 'trds-aranabilir__durum trds-gorsel-gizli', 'aria-live': 'polite' })
        )
      );
    }
  },
  {
    id: 'time-input', ad: 'SaatGirisi', kok: 'trds-alan-grubu',
    ornek: { etiket: 'Randevu saati' },
    ciz: (h, { id: verilen, etiket, yardim = '24 saat biçimi. Örnek: 14 30', hata }, y) => {
      const id = verilen ?? y.kimlik('saat');
      const parca = (ad, etiketi) => h('div', { class: 'trds-saat__parca' },
        h('label', { class: 'trds-etiket trds-etiket--kucuk', for: `${id}-${ad}` }, etiketi),
        h('input', { class: y.bir('trds-girdi trds-girdi--2', hata && 'trds-girdi--hata'), id: `${id}-${ad}`, name: ad, type: 'text', inputmode: 'numeric', maxlength: '2' })
      );
      return alan(h, y, { id, etiket, yardim, hata, grup: true },
        h('div', { class: 'trds-saat', 'aria-describedby': tanimlar(id, yardim, hata) }, parca('saat', 'Saat'), h('span', { class: 'trds-saat__ayrac', 'aria-hidden': 'true' }, ':'), parca('dakika', 'Dakika'))
      );
    }
  },
  {
    id: 'range', ad: 'AralikSecici', kok: 'trds-alan', davranis: 'aralik',
    ornek: { etiket: 'En çok uzaklık', enAz: 1, enCok: 50, deger: 10, birim: ' km' },
    ciz: (h, { id: verilen, etiket, yardim, hata, enAz = 0, enCok = 100, adim = 1, deger, birim = '', ...kalan }, y) => {
      const id = verilen ?? y.kimlik('aralik');
      return alan(h, y, { id, etiket, yardim, hata, class: 'trds-aralik', davranis: 'aralik', ek: { 'data-birim': birim } },
        h('div', { class: 'trds-aralik__satir' },
          h('input', { class: 'trds-aralik__girdi', id, type: 'range', min: enAz, max: enCok, step: adim, value: deger, 'aria-describedby': tanimlar(id, yardim, hata), ...kalan }),
          h('output', { class: 'trds-aralik__deger', for: id }, `${deger ?? enAz}${birim}`)
        ),
        h('div', { class: 'trds-aralik__uclar', 'aria-hidden': 'true' }, h('span', null, `${enAz}${birim}`), h('span', null, `${enCok}${birim}`))
      );
    }
  },
  {
    id: 'quantity', ad: 'AdetSecici', kok: 'trds-alan', davranis: 'adet',
    ornek: { etiket: 'Kişi sayısı', enAz: 1, enCok: 8, deger: 2 },
    ciz: (h, { id: verilen, etiket, yardim, hata, enAz = 0, enCok, deger, ...kalan }, y) => {
      const id = verilen ?? y.kimlik('adet');
      return alan(h, y, { id, etiket, yardim, hata, davranis: 'adet' },
        h('div', { class: 'trds-adet' },
          h('button', { class: 'trds-adet__dugme', type: 'button', 'data-adet': 'eksi', 'aria-label': 'Bir azalt' }, '−'),
          h('input', { class: 'trds-girdi trds-adet__girdi', id, type: 'text', inputmode: 'numeric', value: deger ?? enAz, min: enAz, max: enCok, 'aria-describedby': tanimlar(id, yardim, hata), ...kalan }),
          h('button', { class: 'trds-adet__dugme', type: 'button', 'data-adet': 'arti', 'aria-label': 'Bir artır' }, '+')
        )
      );
    }
  },
  {
    id: 'input-mask', ad: 'GirdiMaskesi', kok: 'trds-alan',
    ornek: { etiket: 'Referans numarası', maske: '#### #### ####', yardim: 'Örnek: 2026 0450 1234' },
    ciz: (h, { maske, ...p }, y) => girdiAlani(h, y, { ...p, genislik: p.genislik ?? '20' }, { inputmode: 'numeric', maxlength: maske.length, 'data-trds': 'maske', 'data-maske': maske })
  },
  {
    id: 'date-picker', ad: 'Takvim', kok: 'trds-alan', davranis: 'takvim',
    ornek: { etiket: 'Randevu tarihi', enAz: '2026-09-07' },
    ciz: (h, { id: verilen, etiket, yardim = 'GG.AA.YYYY. Örnek: 14.09.2026', hata, enAz, enCok, ...kalan }, y) => {
      const id = verilen ?? y.kimlik('takvim');
      return alan(h, y, { id, etiket, yardim, hata, class: 'trds-takvim', davranis: 'takvim', ek: { 'data-en-az': enAz, 'data-en-cok': enCok } },
        h('div', { class: 'trds-takvim__satir' },
          h('input', { class: y.bir('trds-girdi trds-girdi--10', hata && 'trds-girdi--hata'), id, type: 'text', inputmode: 'numeric', autocomplete: 'off', 'aria-describedby': tanimlar(id, yardim, hata), ...kalan }),
          h('button', { class: 'trds-button trds-button--ikincil trds-takvim__ac', type: 'button', 'aria-expanded': 'false', 'aria-label': 'Takvimi aç' }, y.simge('date'))
        ),
        h('div', { class: 'trds-takvim__panel', role: 'dialog', 'aria-label': 'Takvim', hidden: true })
      );
    }
  },
  {
    id: 'multi-select', ad: 'CokluSecim', kok: 'trds-alan', davranis: 'coklu-secim',
    ornek: { etiket: 'İller', ad: 'iller', secenekler: [{ deger: '06', ad: 'Ankara', secili: true }, { deger: '34', ad: 'İstanbul' }] },
    ciz: (h, { id: verilen, etiket, yardim = 'Yazın ve listeden seçin.', hata, ad, secenekler: liste = [], listeAdi = 'Seçenekler' }, y) => {
      const id = verilen ?? y.kimlik('coklu');
      return alan(h, y, { id, etiket, yardim, hata, class: 'trds-coklu', davranis: 'coklu-secim', ek: {} },
        h('div', { class: 'trds-coklu__secilenler', 'aria-label': `Seçilen: ${etiket}`, hidden: true }),
        h('input', { class: 'trds-girdi', id, type: 'text', role: 'combobox', 'aria-autocomplete': 'list', 'aria-expanded': 'false', 'aria-controls': `${id}-liste`, 'aria-describedby': tanimlar(id, yardim, hata), autocomplete: 'off', hidden: true }),
        h('div', { class: 'trds-coklu__liste', id: `${id}-liste`, role: 'listbox', 'aria-multiselectable': 'true', 'aria-label': listeAdi, hidden: true },
          ...liste.map((s) => h('div', { class: 'trds-coklu__oge', role: 'option', id: `${id}-${s.deger}`, 'data-deger': s.deger, 'aria-selected': s.secili ? 'true' : 'false' }, s.ad))
        ),
        h('p', { class: 'trds-gorsel-gizli', 'data-trds-durum': '', 'aria-live': 'polite' }),
        h('select', { class: 'trds-secim trds-coklu__yerel', id: `${id}-yerel`, name: ad, multiple: true, 'aria-labelledby': `${id}-etiket` },
          ...liste.map((s) => h('option', { value: s.deger, selected: s.secili || undefined }, s.ad))
        )
      );
    }
  },
  {
    id: 'chip', ad: 'SecimEtiketi', kok: 'trds-cip-grubu', davranis: 'cip',
    ornek: { ogeler: [{ ad: 'Emekli', basili: true }, { ad: 'Çalışan' }, { ad: 'Ankara', secili: true }] },
    ciz: (h, { ogeler = [] }, y) =>
      h('div', { class: 'trds-cip-grubu', 'data-trds': 'cip' },
        ...ogeler.map((o) => o.secili
          ? h('span', { class: 'trds-cip trds-cip--secili' }, o.ad, h('button', { class: 'trds-cip__kaldir', type: 'button', 'aria-label': `${o.ad} seçimini kaldır` }, y.simge('close')))
          : h('button', { class: 'trds-cip', type: 'button', 'aria-pressed': o.basili ? 'true' : 'false' }, o.ad))
      )
  },
  {
    id: 'rating', ad: 'Puanlama', kok: 'trds-puan',
    ornek: { etiket: 'Bu hizmetten ne kadar memnun kaldınız?', ad: 'puan', deger: 4 },
    ciz: (h, { id: verilen, etiket, ad = 'puan', deger, enCok = 5 }, y) => {
      const id = verilen ?? y.kimlik('puan');
      const yildizlar = [];
      for (let n = enCok; n >= 1; n -= 1) {
        yildizlar.push(
          h('input', { class: 'trds-gorsel-gizli', type: 'radio', name: ad, id: `${id}-${n}`, value: n, checked: deger === n || undefined }),
          h('label', { for: `${id}-${n}` }, y.simge('star', 'trds-puan__bos'), y.simge('star2', 'trds-puan__dolu'), h('span', { class: 'trds-gorsel-gizli' }, `${enCok} üzerinden ${n}`))
        );
      }
      return h('fieldset', { class: 'trds-puan' }, h('legend', { class: 'trds-baslik-legend' }, etiket), h('div', { class: 'trds-puan__yildizlar' }, ...yildizlar));
    }
  },
  {
    id: 'segmented-control', ad: 'BolumluSecim', kok: 'trds-bolumlu',
    ornek: { etiket: 'Görünüm', ad: 'gorunum', secenekler: [{ deger: 'liste', ad: 'Liste' }, { deger: 'harita', ad: 'Harita' }], deger: 'liste' },
    ciz: (h, { id: verilen, etiket, ad, secenekler: liste = [], deger }, y) => {
      const id = verilen ?? y.kimlik('bolumlu');
      const parcalar = [];
      liste.forEach((s) => {
        parcalar.push(
          h('input', { class: 'trds-gorsel-gizli', type: 'radio', name: ad, id: `${id}-${s.deger}`, value: s.deger, checked: deger === s.deger || undefined }),
          h('label', { for: `${id}-${s.deger}` }, s.ad)
        );
      });
      return h('fieldset', { class: 'trds-bolumlu' }, h('legend', { class: 'trds-gorsel-gizli' }, etiket), ...parcalar);
    }
  },

  // ---------------------------------------------------------- Türkiye alanları
  {
    id: 'kimlik-no', ad: 'KimlikNoGirisi', kok: 'trds-alan', davranis: 'kimlik-no',
    ornek: { etiket: 'T.C. kimlik numaranız' },
    ciz: (h, { etiket = 'T.C. kimlik numaranız', yardim = 'Nüfus cüzdanınızın ön yüzünde yazan 11 haneli numara.', ykn = false, ...p }, y) =>
      girdiAlani(h, y, { ...p, etiket, yardim, genislik: '11', davranis: 'kimlik-no', sayac: true }, { inputmode: 'numeric', maxlength: '11', autocomplete: 'off', 'data-ykn': ykn ? '' : undefined })
  },
  {
    id: 'vergi-no', ad: 'VergiNoGirisi', kok: 'trds-alan', davranis: 'vergi-no',
    ornek: { etiket: 'Vergi kimlik numarası' },
    ciz: (h, { etiket = 'Vergi kimlik numarası', ...p }, y) =>
      girdiAlani(h, y, { ...p, etiket, genislik: '11', davranis: 'vergi-no', sayac: true }, { inputmode: 'numeric', maxlength: '11', autocomplete: 'off' })
  },
  {
    id: 'iban-girisi', ad: 'IbanGirisi', kok: 'trds-alan', davranis: 'iban',
    ornek: { etiket: 'IBAN numaranız' },
    ciz: (h, { etiket = 'IBAN numaranız', yardim = 'TR hazır yazılıdır. 24 rakam yazın. Boşluklu yapıştırabilirsiniz.', ...p }, y) =>
      girdiAlani(h, y, { ...p, etiket, yardim, davranis: 'iban', sayac: true, class: y.bir('trds-girdi--iban', p.class) }, { autocomplete: 'off', spellcheck: 'false', inputmode: 'numeric' })
  },
  {
    id: 'telefon-girisi', ad: 'TelefonGirisi', kok: 'trds-alan', davranis: 'telefon',
    ornek: { etiket: 'Telefon numaranız' },
    ciz: (h, { id: verilen, etiket = 'Telefon numaranız', yardim, hata, yalnizCep = false, zorunlu, ...kalan }, y) => {
      const id = verilen ?? y.kimlik('telefon');
      return alan(h, y, { id, etiket, yardim, hata, davranis: 'telefon', ek: { 'data-cep': yalnizCep ? 'zorunlu' : undefined, 'data-zorunlu': zorunlu ? '' : undefined } },
        h('div', { class: 'trds-telefon' },
          h('span', { class: 'trds-telefon__kod', 'aria-hidden': 'true' }, '+90'),
          h('input', { class: y.bir('trds-girdi trds-girdi--10', hata && 'trds-girdi--hata'), id, type: 'tel', inputmode: 'tel', autocomplete: 'tel-national', maxlength: '13', 'aria-describedby': tanimlar(id, yardim, hata, `${id}-sayac`), ...kalan })
        ),
        h('p', { class: 'trds-sayac', id: `${id}-sayac`, 'data-trds-sayac': '', 'aria-live': 'off' })
      );
    }
  },
  {
    id: 'plaka-girisi', ad: 'PlakaGirisi', kok: 'trds-alan', davranis: 'plaka',
    ornek: { etiket: 'Araç plakası' },
    ciz: (h, { etiket = 'Araç plakası', yardim = 'Örnek: 34 ABC 123', ...p }, y) =>
      girdiAlani(h, y, { ...p, etiket, yardim, davranis: 'plaka', sayac: true, class: y.bir('trds-girdi--plaka', p.class) }, { autocomplete: 'off', spellcheck: 'false', maxlength: '11' })
  },
  {
    id: 'tarih-girisi', ad: 'TarihGirisi', kok: 'trds-alan-grubu', davranis: 'tarih',
    ornek: { etiket: 'Doğum tarihiniz' },
    ciz: (h, { id: verilen, etiket, yardim = 'Örnek: 27 03 1997', hata, gelecekYasak = false }, y) => {
      const id = verilen ?? y.kimlik('tarih');
      const parca = (ad, etiketi, uzunluk, genislik) => h('div', { class: 'trds-tarih__parca' },
        h('label', { class: 'trds-etiket trds-etiket--kucuk', for: `${id}-${ad}` }, etiketi),
        h('input', { class: y.bir('trds-girdi', `trds-girdi--${genislik}`, hata && 'trds-girdi--hata'), id: `${id}-${ad}`, name: ad, type: 'text', inputmode: 'numeric', maxlength: String(uzunluk) })
      );
      return alan(h, y, { id, etiket, yardim, hata, grup: true, davranis: 'tarih', ek: { 'data-gelecek-yasak': gelecekYasak ? '' : undefined } },
        h('div', { class: 'trds-tarih', role: 'group', 'aria-describedby': tanimlar(id, yardim, hata) }, parca('gun', 'Gün', 2, '2'), parca('ay', 'Ay', 2, '2'), parca('yil', 'Yıl', 4, '4'))
      );
    }
  },
  {
    id: 'adres', ad: 'AdresGirisi', kok: 'trds-alan-grubu', davranis: 'adres',
    ornek: { etiket: 'Tebligat adresiniz' },
    ciz: (h, { id: verilen, etiket = 'Adresiniz', yardim, hata }, y) => {
      const id = verilen ?? y.kimlik('adres');
      const secim = (ad, etiketi, bos, veri) => h('div', { class: 'trds-alan' },
        h('label', { class: 'trds-etiket', for: `${id}-${ad}` }, etiketi),
        h('select', { class: 'trds-secim', id: `${id}-${ad}`, name: ad, 'data-adres': veri }, h('option', { value: '' }, bos))
      );
      return alan(h, y, { id, etiket, yardim, hata, grup: true, davranis: 'adres' },
        secim('il', 'İl', 'Seçiniz', 'il'),
        secim('ilce', 'İlçe', 'Önce il seçiniz', 'ilce'),
        h('div', { class: 'trds-alan' },
          h('label', { class: 'trds-etiket', for: `${id}-acik` }, 'Açık adres'),
          h('p', { class: 'trds-yardim', id: `${id}-acik-yardim` }, 'Mahalle, cadde veya sokak, bina no ve daire no.'),
          h('textarea', { class: 'trds-metin-alani', id: `${id}-acik`, name: 'acik_adres', rows: 3, 'aria-describedby': `${id}-acik-yardim` })
        ),
        h('div', { class: 'trds-alan' },
          h('label', { class: 'trds-etiket', for: `${id}-posta` }, 'Posta kodu ', h('span', { class: 'trds-etiket__istege-bagli' }, '(isteğe bağlı)')),
          h('input', { class: 'trds-girdi trds-girdi--5', id: `${id}-posta`, name: 'posta_kodu', type: 'text', inputmode: 'numeric', maxlength: '5', autocomplete: 'postal-code' })
        )
      );
    }
  }
];
