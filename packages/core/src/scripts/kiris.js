// @kiris-ds/core — davranış katmanı.
//
// Kural: JavaScript bir iyileştirmedir, bir gereklilik değildir. Bu dosya
// yüklenmezse her bileşen yine okunur ve kullanılır. Akordiyon açık kalır,
// sekmeler ardışık bölümlere döner, doğrulama sunucuda yapılır.
//
// Her başlatıcı `data-kiris="<ad>"` özniteliğine bakar. Bir öğe iki kez
// başlatılmaz.

import {
  kimlikNoDenetle,
  vergiNoGecerli,
  ibanGecerli,
  ibanBicimle,
  telefonNormalle,
  telefonGecerli,
  plakaDenetle,
  plakaBicimle,
  tarihDenetle,
  trKucuk,
  trSirala
} from '@kiris-ds/validators';

const BASLATILDI = 'kirisHazir';

const her = (secici, kok = document) => [...kok.querySelectorAll(secici)];

const bir = (eleman, ad, islev) => {
  if (eleman.dataset[BASLATILDI]) return;
  eleman.dataset[BASLATILDI] = ad;
  islev(eleman);
};

// ---------------------------------------------------------------------------
// Hata gösterimi. Her doğrulayıcı bunu kullanır, böylece hata her yerde aynı
// görünür ve aynı biçimde duyurulur.
// ---------------------------------------------------------------------------

const hataGoster = (alan, girdi, mesaj) => {
  const kutu = alan.querySelector('[data-kiris-hata]');
  if (!kutu) return;
  if (mesaj) {
    kutu.innerHTML = `<span class="kiris-gorsel-gizli">Hata:</span> ${mesaj}`;
    kutu.hidden = false;
    alan.classList.add('kiris-alan--hata');
    girdi.setAttribute('aria-invalid', 'true');
    if (!kutu.id) kutu.id = `${girdi.id || 'alan'}-hata`;
    const tanim = (girdi.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    if (!tanim.includes(kutu.id)) {
      girdi.setAttribute('aria-describedby', [...tanim, kutu.id].join(' '));
    }
  } else {
    kutu.hidden = true;
    kutu.textContent = '';
    alan.classList.remove('kiris-alan--hata');
    girdi.removeAttribute('aria-invalid');
  }
};

/**
 * Alanı odaktan çıkınca doğrula. Yazarken hata gösterme, bu rahatsız eder.
 * Boş alan sessiz kalır. `data-zorunlu` varsa boş alan da hata alır.
 */
const ciktikcaDenetle = (alan, girdi, denetci, bosMesaj = 'Bu alanı doldurun.') => {
  girdi.addEventListener('blur', () => {
    if (girdi.value.trim() === '') {
      return hataGoster(alan, girdi, alan.dataset.zorunlu !== undefined ? bosMesaj : null);
    }
    hataGoster(alan, girdi, denetci(girdi.value));
  });
  girdi.addEventListener('input', () => {
    if (girdi.getAttribute('aria-invalid') === 'true') hataGoster(alan, girdi, null);
  });
};

/**
 * Hane sayacı. Kullanıcı yazarken "7 / 11 hane" gösterir. Yalnız son iki
 * hanede duyurulur, böylece ekran okuyucu her tuşta konuşmaz.
 * Sayacı gösterecek öğe HTML'de durur: <p class="kiris-sayac" data-kiris-sayac>.
 */
const haneSayaci = (alan, girdi, hedef, birim = 'hane', sayici = (d) => d.replace(/\D/g, '').length) => {
  const sayac = alan.querySelector('[data-kiris-sayac]');
  if (!sayac) return;
  const yenile = () => {
    const n = sayici(girdi.value);
    sayac.textContent = n === 0 ? `${hedef} ${birim} girin` : `${n} / ${hedef} ${birim}`;
    sayac.classList.toggle('kiris-sayac--asildi', n > hedef);
    sayac.setAttribute('aria-live', n >= hedef - 1 ? 'polite' : 'off');
  };
  girdi.addEventListener('input', yenile);
  yenile();
};

// ---------------------------------------------------------------------------
// Akordiyon
// ---------------------------------------------------------------------------

export function akordiyonBaslat(kok = document) {
  her('[data-kiris="akordiyon"]', kok).forEach((el) =>
    bir(el, 'akordiyon', (akordiyon) => {
      her('.kiris-akordiyon__dugme', akordiyon).forEach((dugme) => {
        const icerik = document.getElementById(dugme.getAttribute('aria-controls'));
        if (!icerik) return;
        dugme.addEventListener('click', () => {
          const acik = dugme.getAttribute('aria-expanded') === 'true';
          dugme.setAttribute('aria-expanded', String(!acik));
          icerik.hidden = acik;
        });
      });
    })
  );
}

// ---------------------------------------------------------------------------
// Sekmeler. Ok tuşları, Home ve End desteklenir.
// ---------------------------------------------------------------------------

export function sekmelerBaslat(kok = document) {
  her('[data-kiris="sekmeler"]', kok).forEach((el) =>
    bir(el, 'sekmeler', (sekmeler) => {
      const dugmeler = her('[role="tab"]', sekmeler);
      if (dugmeler.length === 0) return;

      const sec = (indeks) => {
        dugmeler.forEach((dugme, i) => {
          const etkin = i === indeks;
          dugme.setAttribute('aria-selected', String(etkin));
          dugme.tabIndex = etkin ? 0 : -1;
          const panel = document.getElementById(dugme.getAttribute('aria-controls'));
          if (panel) panel.hidden = !etkin;
        });
        dugmeler[indeks].focus();
      };

      dugmeler.forEach((dugme, i) => {
        dugme.addEventListener('click', () => sec(i));
        dugme.addEventListener('keydown', (olay) => {
          const son = dugmeler.length - 1;
          const harita = {
            ArrowRight: i === son ? 0 : i + 1,
            ArrowLeft: i === 0 ? son : i - 1,
            Home: 0,
            End: son
          };
          if (olay.key in harita) {
            olay.preventDefault();
            sec(harita[olay.key]);
          }
        });
      });
    })
  );
}

// ---------------------------------------------------------------------------
// Kip pencere. Yerel <dialog> kullanılır, odak tuzağı tarayıcıdan gelir.
// ---------------------------------------------------------------------------

export function kipBaslat(kok = document) {
  // Kip pencerenin kendisi `data-kiris="kip"` taşır, açan düğme `data-kiris-ac`.
  // İkisi de burada ele alınır, böylece bütünlük denetimi ikisini de görür.
  her('[data-kiris="kip"]', kok).forEach((kip) => bir(kip, 'kip', () => {}));

  her('[data-kiris-ac]', kok).forEach((acici) =>
    bir(acici, 'kip-acici', (dugme) => {
      const kip = document.getElementById(dugme.dataset.kirisAc);
      if (!kip || typeof kip.showModal !== 'function') return;
      dugme.addEventListener('click', () => kip.showModal());
      her('[data-kiris-kapat]', kip).forEach((kapat) =>
        kapat.addEventListener('click', () => kip.close())
      );
      // Kapanınca odak açan düğmeye döner.
      kip.addEventListener('close', () => dugme.focus());
    })
  );
}

// ---------------------------------------------------------------------------
// Hata özeti. Sayfa açılınca odak buraya gider.
// ---------------------------------------------------------------------------

export function hataOzetiBaslat(kok = document) {
  her('[data-kiris="hata-ozeti"]', kok).forEach((el) =>
    bir(el, 'hata-ozeti', (ozet) => {
      ozet.focus();
      her('a[href^="#"]', ozet).forEach((baglanti) => {
        baglanti.addEventListener('click', (olay) => {
          const hedef = document.getElementById(baglanti.getAttribute('href').slice(1));
          if (!hedef) return;
          olay.preventDefault();
          hedef.focus();
          hedef.scrollIntoView({ block: 'center' });
        });
      });
    })
  );
}

// ---------------------------------------------------------------------------
// Karakter sayacı. Yalnız son 20 karakterde duyurulur.
// ---------------------------------------------------------------------------

export function karakterSayaciBaslat(kok = document) {
  her('[data-kiris="karakter-sayaci"]', kok).forEach((el) =>
    bir(el, 'karakter-sayaci', (alan) => {
      const girdi = alan.querySelector('textarea, input');
      const sayac = alan.querySelector('.kiris-sayac');
      const sinir = Number(alan.dataset.sinir || 0);
      if (!girdi || !sayac || !sinir) return;

      const yenile = () => {
        const kalan = sinir - girdi.value.length;
        sayac.textContent =
          kalan >= 0 ? `${kalan} karakter kaldı` : `${Math.abs(kalan)} karakter fazla`;
        sayac.classList.toggle('kiris-sayac--asildi', kalan < 0);
        // Ekran okuyucu her tuşta konuşmasın.
        sayac.setAttribute('aria-live', kalan <= 20 ? 'polite' : 'off');
      };
      girdi.addEventListener('input', yenile);
      yenile();
    })
  );
}

// ---------------------------------------------------------------------------
// Dosya yükleme durumu
// ---------------------------------------------------------------------------

export function dosyaBaslat(kok = document) {
  const boyut = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

  her('[data-kiris="dosya"]', kok).forEach((el) =>
    bir(el, 'dosya', (alan) => {
      const girdi = alan.querySelector('input[type="file"]');
      const bolge = alan.querySelector('.kiris-dosya-alani');
      const liste = alan.querySelector('.kiris-dosya-liste');
      const durum = alan.querySelector('.kiris-dosya-durum');
      if (!girdi) return;

      const enBuyuk = Number(alan.dataset.enBuyuk || 0); // bayt

      // Seçilen dosyalar burada tutulur. Kaldırma için gerekir, çünkü bir
      // dosya girdisinin listesi tek tek düzenlenemez.
      let dosyalar = [];

      const yaz = () => {
        if (liste) {
          liste.innerHTML = dosyalar
            .map(
              (d, i) => `<li>
  <span class="kiris-dosya-liste__ad">${d.name.replace(/</g, '&lt;')}</span>
  <span class="kiris-dosya-liste__boyut">${boyut(d.size)}</span>
  <button class="kiris-dosya-liste__kaldir" type="button" data-indeks="${i}">Kaldır<span class="kiris-gorsel-gizli"> ${d.name.replace(/</g, '&lt;')}</span></button>
</li>`
            )
            .join('');
        }
        if (durum) {
          durum.textContent =
            dosyalar.length === 0 ? 'Dosya seçilmedi' : `${dosyalar.length} dosya seçildi`;
        }
        // Girdinin kendi listesini de eşitle, böylece form gönderimi doğru kalır.
        const aktarim = new DataTransfer();
        dosyalar.forEach((d) => aktarim.items.add(d));
        girdi.files = aktarim.files;
      };

      const ekle = (yeniler) => {
        const kabul = [];
        for (const d of yeniler) {
          if (enBuyuk && d.size > enBuyuk) {
            hataGoster(alan, girdi, `${d.name} çok büyük. En çok ${boyut(enBuyuk)} olabilir.`);
            continue;
          }
          kabul.push(d);
        }
        dosyalar = girdi.multiple ? [...dosyalar, ...kabul] : kabul.slice(0, 1);
        if (kabul.length > 0) hataGoster(alan, girdi, null);
        yaz();
      };

      girdi.addEventListener('change', () => ekle([...(girdi.files || [])]));

      liste?.addEventListener('click', (olay) => {
        const dugme = olay.target.closest('[data-indeks]');
        if (!dugme) return;
        dosyalar.splice(Number(dugme.dataset.indeks), 1);
        yaz();
        girdi.focus();
      });

      if (bolge) {
        ['dragenter', 'dragover'].forEach((ad) =>
          bolge.addEventListener(ad, (olay) => {
            olay.preventDefault();
            bolge.classList.add('kiris-dosya-alani--surukleniyor');
          })
        );
        ['dragleave', 'drop'].forEach((ad) =>
          bolge.addEventListener(ad, () => bolge.classList.remove('kiris-dosya-alani--surukleniyor'))
        );
        bolge.addEventListener('drop', (olay) => {
          olay.preventDefault();
          ekle([...(olay.dataTransfer?.files || [])]);
        });
      }
    })
  );
}

// ---------------------------------------------------------------------------
// Parola. "Göster" düğmesi alan türünü değiştirir.
// ---------------------------------------------------------------------------

export function parolaBaslat(kok = document) {
  her('[data-kiris="parola"]', kok).forEach((el) =>
    bir(el, 'parola', (alan) => {
      const girdi = alan.querySelector('input');
      const dugme = alan.querySelector('.kiris-parola__dugme');
      if (!girdi || !dugme) return;
      dugme.addEventListener('click', () => {
        const acik = girdi.type === 'text';
        girdi.type = acik ? 'password' : 'text';
        dugme.textContent = acik ? 'Göster' : 'Gizle';
        dugme.setAttribute('aria-pressed', String(!acik));
        girdi.focus();
      });
    })
  );
}

// ---------------------------------------------------------------------------
// Aranabilir liste. ARIA 1.2 combobox kalıbı. Türkçe harf duyarsız süzer.
// ---------------------------------------------------------------------------

export function aranabilirBaslat(kok = document) {
  her('[data-kiris="aranabilir"]', kok).forEach((el) =>
    bir(el, 'aranabilir', (alan) => {
      const girdi = alan.querySelector('[role="combobox"]');
      const liste = alan.querySelector('[role="listbox"]');
      const durum = alan.querySelector('.kiris-aranabilir__durum');
      if (!girdi || !liste) return;

      const secenekler = her('[role="option"]', liste);
      let etkin = -1;

      const gorunenler = () => secenekler.filter((s) => !s.hidden);

      const ac = () => { liste.hidden = false; girdi.setAttribute('aria-expanded', 'true'); };
      const kapat = () => {
        liste.hidden = true;
        girdi.setAttribute('aria-expanded', 'false');
        girdi.removeAttribute('aria-activedescendant');
        etkin = -1;
      };

      const isaretle = (indeks) => {
        const g = gorunenler();
        secenekler.forEach((s) => s.setAttribute('aria-selected', 'false'));
        if (indeks < 0 || indeks >= g.length) { etkin = -1; girdi.removeAttribute('aria-activedescendant'); return; }
        etkin = indeks;
        g[indeks].setAttribute('aria-selected', 'true');
        girdi.setAttribute('aria-activedescendant', g[indeks].id);
        g[indeks].scrollIntoView({ block: 'nearest' });
      };

      const suz = () => {
        const ara = trKucuk(girdi.value.trim());
        let n = 0;
        secenekler.forEach((s) => {
          const uyar = !ara || trKucuk(s.textContent).includes(ara);
          s.hidden = !uyar;
          if (uyar) n += 1;
        });
        if (durum) durum.textContent = n === 0 ? 'Sonuç yok' : `${n} sonuç. Seçmek için aşağı ok.`;
        isaretle(-1);
        n > 0 ? ac() : kapat();
      };

      const sec = (secenek) => {
        girdi.value = secenek.textContent.trim();
        girdi.dataset.deger = secenek.dataset.deger ?? secenek.textContent.trim();
        kapat();
        if (durum) durum.textContent = `${girdi.value} seçildi`;
        girdi.dispatchEvent(new CustomEvent('kiris:secildi', { bubbles: true, detail: { deger: girdi.dataset.deger } }));
      };

      girdi.addEventListener('input', suz);
      girdi.addEventListener('focus', () => { if (girdi.value.trim()) suz(); });
      girdi.addEventListener('keydown', (olay) => {
        const g = gorunenler();
        if (olay.key === 'ArrowDown') { olay.preventDefault(); if (liste.hidden) suz(); isaretle(Math.min(etkin + 1, g.length - 1)); }
        else if (olay.key === 'ArrowUp') { olay.preventDefault(); isaretle(Math.max(etkin - 1, 0)); }
        else if (olay.key === 'Enter' && etkin >= 0) { olay.preventDefault(); sec(g[etkin]); }
        else if (olay.key === 'Escape') { kapat(); }
        else if (olay.key === 'Tab') { kapat(); }
      });
      liste.addEventListener('mousedown', (olay) => {
        const secenek = olay.target.closest('[role="option"]');
        if (secenek) { olay.preventDefault(); sec(secenek); }
      });
      document.addEventListener('click', (olay) => { if (!alan.contains(olay.target)) kapat(); });
    })
  );
}

// ---------------------------------------------------------------------------
// Arama önerileri. Kullanıcı yazarken gruplu bir öneri listesi açılır.
// Kaynak iki türlü olur: sayfadaki bir JSON betiği (data-kaynak-id) veya bir
// sunucu adresi (data-kaynak). İkisi de aynı biçimi verir:
//   { "gruplar": [ { "ad": "Hizmetler", "ogeler": [ { "ad", "ek", "href" } ] } ] }
// Betik yoksa form düz arama olarak çalışır. ARIA 1.2 combobox kalıbı.
// ---------------------------------------------------------------------------

const htmlKacis = (metin) =>
  String(metin).replace(/[&<>"']/g, (h) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[h]);

export function guvenliGezinmeAdresi(deger, taban) {
  if (typeof deger !== 'string' || !deger.trim() || deger.trim() === '#') return '';
  try {
    const adres = new URL(deger, taban);
    if (!['http:', 'https:'].includes(adres.protocol) || adres.username || adres.password) return '';
    return adres.href;
  } catch {
    return '';
  }
}

// Eşleşen parçayı <mark> içine alır. Türkçe harf duyarsızdır. Küçük harfe
// çevrim uzunluğu değiştirirse işaretlemez, metni olduğu gibi verir.
const vurgula = (metin, ara) => {
  const kucuk = trKucuk(metin);
  const i = kucuk.indexOf(trKucuk(ara));
  if (i < 0 || kucuk.length !== metin.length) return htmlKacis(metin);
  return `${htmlKacis(metin.slice(0, i))}<mark>${htmlKacis(metin.slice(i, i + ara.length))}</mark>${htmlKacis(metin.slice(i + ara.length))}`;
};

export function aramaBaslat(kok = document) {
  her('[data-kiris="arama"]', kok).forEach((el) =>
    bir(el, 'arama', (kap) => {
      const form = kap.querySelector('form');
      const girdi = kap.querySelector('[role="combobox"]');
      const liste = kap.querySelector('[role="listbox"]');
      const durum = kap.querySelector('[data-kiris-durum]');
      if (!form || !girdi || !liste) return;

      const enAz = Number(kap.dataset.enAz || 2);
      const enCok = Number(kap.dataset.enCok || 5);
      const bekleme = Number(kap.dataset.bekleme || 200);
      const yerel = kap.dataset.kaynakId
        ? (() => { try { return JSON.parse(document.getElementById(kap.dataset.kaynakId)?.textContent || '{}'); } catch { return {}; } })()
        : null;
      const kaynak = kap.dataset.kaynak;
      const kimlik = girdi.id || 'arama';

      let etkin = -1;
      let zamanlayici = 0;
      let iptal = null;
      let sonSorgu = '';

      const secenekler = () => her('[role="option"]', liste);

      const kapat = () => {
        liste.hidden = true;
        girdi.setAttribute('aria-expanded', 'false');
        girdi.removeAttribute('aria-activedescendant');
        etkin = -1;
      };

      const isaretle = (indeks) => {
        const g = secenekler();
        g.forEach((o) => o.setAttribute('aria-selected', 'false'));
        if (indeks < 0 || indeks >= g.length) { etkin = -1; girdi.removeAttribute('aria-activedescendant'); return; }
        etkin = indeks;
        g[indeks].setAttribute('aria-selected', 'true');
        girdi.setAttribute('aria-activedescendant', g[indeks].id);
        g[indeks].scrollIntoView({ block: 'nearest' });
      };

      // Yerel kaynak: ad ve ek alanlarında geçen sorguyu süzer, her gruptan en çok N tane.
      const yerelSuz = (sorgu) => {
        const ara = trKucuk(sorgu);
        return (yerel?.gruplar || [])
          .map((grup) => ({
            ad: grup.ad,
            ogeler: (grup.ogeler || [])
              .filter((o) => trKucuk(`${o.ad} ${o.ek || ''}`).includes(ara))
              .slice(0, enCok)
          }))
          .filter((grup) => grup.ogeler.length > 0);
      };

      const ciz = (gruplar, sorgu) => {
        let sayac = 0;
        const parcalar = gruplar.map((grup, gi) => {
          const baslikId = `${kimlik}-grup-${gi}`;
          const ogeler = grup.ogeler.slice(0, enCok).map((o) => {
            const id = `${kimlik}-oneri-${sayac++}`;
            return `<div class="kiris-arama-onerileri__oge" role="option" id="${id}" aria-selected="false" data-href="${htmlKacis(guvenliGezinmeAdresi(o.href, document.baseURI))}" data-ad="${htmlKacis(o.ad)}"><span class="kiris-arama-onerileri__ad">${vurgula(o.ad, sorgu)}</span>${o.ek ? `<span class="kiris-arama-onerileri__ek">${htmlKacis(o.ek)}</span>` : ''}</div>`;
          }).join('');
          return `<div class="kiris-arama-onerileri__grup" role="group" aria-labelledby="${baslikId}"><p class="kiris-arama-onerileri__grup-adi" id="${baslikId}">${htmlKacis(grup.ad)}</p>${ogeler}</div>`;
        });
        const toplam = sayac;
        parcalar.push(`<div class="kiris-arama-onerileri__oge kiris-arama-onerileri__tumu" role="option" id="${kimlik}-oneri-tumu" aria-selected="false" data-tumu>Tüm sonuçları gör: “${htmlKacis(sorgu)}”</div>`);
        liste.innerHTML = parcalar.join('');
        liste.hidden = false;
        girdi.setAttribute('aria-expanded', 'true');
        isaretle(-1);
        if (durum) {
          durum.textContent = toplam === 0
            ? 'Öneri yok. Aramak için Enter.'
            : `${toplam} öneri, ${gruplar.length} grupta. Seçmek için aşağı ok.`;
        }
      };

      const getir = (sorgu) => {
        if (yerel) { ciz(yerelSuz(sorgu), sorgu); return; }
        if (!kaynak || typeof fetch !== 'function') return;
        iptal?.abort();
        iptal = new AbortController();
        fetch(`${kaynak}${encodeURIComponent(sorgu)}`, { signal: iptal.signal, headers: { Accept: 'application/json' } })
          .then((y) => (y.ok ? y.json() : { gruplar: [] }))
          .then((veri) => { if (girdi.value.trim() === sorgu) ciz(veri.gruplar || [], sorgu); })
          .catch(() => {});
      };

      const sorgula = () => {
        const sorgu = girdi.value.trim();
        clearTimeout(zamanlayici);
        if (sorgu.length < enAz) { kapat(); sonSorgu = ''; return; }
        if (sorgu === sonSorgu && !liste.hidden) return;
        sonSorgu = sorgu;
        zamanlayici = setTimeout(() => getir(sorgu), yerel ? 0 : bekleme);
      };

      const sec = (oge) => {
        if (oge.hasAttribute('data-tumu')) { kapat(); form.requestSubmit ? form.requestSubmit() : form.submit(); return; }
        girdi.value = oge.dataset.ad || '';
        kapat();
        if (durum) durum.textContent = `${girdi.value} seçildi.`;
        const href = guvenliGezinmeAdresi(oge.dataset.href, document.baseURI);
        girdi.dispatchEvent(new CustomEvent('kiris:secildi', { bubbles: true, detail: { ad: girdi.value, href } }));
        if (href) window.location.assign(href);
      };

      girdi.addEventListener('input', sorgula);
      girdi.addEventListener('focus', () => { if (girdi.value.trim().length >= enAz) sorgula(); });
      girdi.addEventListener('keydown', (olay) => {
        const g = secenekler();
        if (olay.key === 'ArrowDown') { olay.preventDefault(); if (liste.hidden) { sorgula(); return; } isaretle(Math.min(etkin + 1, g.length - 1)); }
        else if (olay.key === 'ArrowUp') { olay.preventDefault(); isaretle(Math.max(etkin - 1, 0)); }
        else if (olay.key === 'Home' && !liste.hidden) { olay.preventDefault(); isaretle(0); }
        else if (olay.key === 'End' && !liste.hidden) { olay.preventDefault(); isaretle(g.length - 1); }
        else if (olay.key === 'Enter' && etkin >= 0) { olay.preventDefault(); sec(g[etkin]); }
        else if (olay.key === 'Escape') { kapat(); }
        else if (olay.key === 'Tab') { kapat(); }
      });
      liste.addEventListener('mousedown', (olay) => {
        const oge = olay.target.closest('[role="option"]');
        if (oge) { olay.preventDefault(); sec(oge); }
      });
      document.addEventListener('click', (olay) => { if (!kap.contains(olay.target)) kapat(); });
    })
  );
}

// ---------------------------------------------------------------------------
// Geçici bildirim. Kapat düğmesi gizler. data-sure (ms) varsa süre sonunda
// kendiliğinden kapanır. İşaretçi veya odak üstündeyken süre durur.
// ---------------------------------------------------------------------------

export function geciciBaslat(kok = document) {
  her('[data-kiris="gecici"]', kok).forEach((el) =>
    bir(el, 'gecici', (alan) => {
      let disOdak = null;
      alan.addEventListener('focusin', (olay) => { if (olay.relatedTarget && !alan.contains(olay.relatedTarget)) disOdak = olay.relatedTarget; });
      const kapat = (bildirim) => {
        const odakIcerde = bildirim.contains(document.activeElement);
        bildirim.hidden = true;
        if (odakIcerde) {
          const sonraki = alan.querySelector('.kiris-gecici:not([hidden]) .kiris-gecici__kapat');
          (sonraki || (disOdak?.isConnected ? disOdak : null) || document.getElementById('ana-icerik') || document.body).focus?.();
        }
        bildirim.dispatchEvent(new CustomEvent('kiris:kapandi', { bubbles: true }));
      };
      alan.addEventListener('click', (olay) => {
        const dugme = olay.target.closest('.kiris-gecici__kapat');
        if (dugme) kapat(dugme.closest('.kiris-gecici'));
      });
      her('.kiris-gecici[data-sure]', alan).forEach((bildirim) => {
        const sure = Math.max(8000, Number(bildirim.dataset.sure) || 0);
        let zamanlayici = setTimeout(() => kapat(bildirim), sure);
        const durdur = () => clearTimeout(zamanlayici);
        const surdur = () => { durdur(); zamanlayici = setTimeout(() => kapat(bildirim), sure); };
        bildirim.addEventListener('mouseenter', durdur);
        bildirim.addEventListener('focusin', durdur);
        bildirim.addEventListener('mouseleave', surdur);
        bildirim.addEventListener('focusout', surdur);
      });
    })
  );
}

// ---------------------------------------------------------------------------
// Seçim etiketi. Süzgeç etiketi aria-pressed ile açılır kapanır. Kaldır
// düğmesi etiketi siler ve durumu duyurur.
// ---------------------------------------------------------------------------

export function cipBaslat(kok = document) {
  her('[data-kiris="cip"]', kok).forEach((el) =>
    bir(el, 'cip', (grup) => {
      let durum = grup.querySelector('[data-kiris-durum]');
      if (!durum) {
        durum = document.createElement('p');
        durum.className = 'kiris-gorsel-gizli';
        durum.setAttribute('aria-live', 'polite');
        durum.setAttribute('data-kiris-durum', '');
        grup.append(durum);
      }
      grup.addEventListener('click', (olay) => {
        const kaldir = olay.target.closest('.kiris-cip__kaldir');
        if (kaldir) {
          const cip = kaldir.closest('.kiris-cip');
          const ad = cip.textContent.trim();
          const sonraki = cip.nextElementSibling?.querySelector?.('button') ?? grup.querySelector('.kiris-cip');
          cip.remove();
          durum.textContent = `${ad} kaldırıldı.`;
          (sonraki ?? grup).focus?.();
          grup.dispatchEvent(new CustomEvent('kiris:kaldirildi', { bubbles: true, detail: { ad } }));
          return;
        }
        const suzgec = olay.target.closest('.kiris-cip[aria-pressed]');
        if (suzgec) {
          const acik = suzgec.getAttribute('aria-pressed') !== 'true';
          suzgec.setAttribute('aria-pressed', String(acik));
          durum.textContent = `${suzgec.textContent.trim()} ${acik ? 'seçildi' : 'kaldırıldı'}.`;
          grup.dispatchEvent(new CustomEvent('kiris:suzgecDegisti', { bubbles: true, detail: { ad: suzgec.textContent.trim(), acik } }));
        }
      });
    })
  );
}

// ---------------------------------------------------------------------------
// Açılır bilgi. Bir düğme bir paneli açar. Escape, dışarı tıklama ve aynı
// düğme kapatır. Odak düğmede kalır, panel aria-live ile duyurulur.
// ---------------------------------------------------------------------------

export function acilirBilgiBaslat(kok = document) {
  her('[data-kiris="acilir-bilgi"]', kok).forEach((el) =>
    bir(el, 'acilir-bilgi', (kap) => {
      const dugme = kap.querySelector('[aria-expanded]');
      const panel = kap.querySelector('.kiris-acilir-bilgi__panel');
      if (!dugme || !panel) return;
      const ayarla = (acik) => { panel.hidden = !acik; dugme.setAttribute('aria-expanded', String(acik)); };
      dugme.addEventListener('click', () => ayarla(panel.hidden));
      kap.addEventListener('keydown', (olay) => { if (olay.key === 'Escape' && !panel.hidden) { ayarla(false); dugme.focus(); } });
      document.addEventListener('click', (olay) => { if (!kap.contains(olay.target)) ayarla(false); });
      const kapat = panel.querySelector('[data-kiris-kapat]');
      if (kapat) kapat.addEventListener('click', () => { ayarla(false); dugme.focus(); });
    })
  );
}

// ---------------------------------------------------------------------------
// Yan panel. Yerel <dialog> ile açılır. Kenardan veya alttan gelir.
// ---------------------------------------------------------------------------

export function yanPanelBaslat(kok = document) {
  her('[data-kiris="yan-panel"]', kok).forEach((el) =>
    bir(el, 'yan-panel', (kap) => {
      const panel = kap.querySelector('dialog');
      if (!panel) return;
      her('[data-kiris-panel-ac]', kap).forEach((d) => d.addEventListener('click', () => panel.showModal()));
      her('[data-kiris-kapat]', panel).forEach((d) => d.addEventListener('click', () => panel.close()));
      panel.addEventListener('click', (olay) => { if (olay.target === panel) panel.close(); });
    })
  );
}

// ---------------------------------------------------------------------------
// Eylem menüsü. Düğme bir menü açar. Ok tuşları gezer, Escape kapatır.
// ---------------------------------------------------------------------------

export function eylemMenusuBaslat(kok = document) {
  her('[data-kiris="eylem-menusu"]', kok).forEach((el) =>
    bir(el, 'eylem-menusu', (kap) => {
      const dugme = kap.querySelector('[aria-haspopup]');
      const menu = kap.querySelector('[role="menu"]');
      if (!dugme || !menu) return;
      const ogeler = () => her('[role="menuitem"]', menu).filter((o) => !o.hidden);
      const ac = (odak = 0) => {
        menu.hidden = false;
        dugme.setAttribute('aria-expanded', 'true');
        const g = ogeler();
        g[odak < 0 ? g.length - 1 : odak]?.focus();
      };
      const kapat = (odakla = false) => {
        menu.hidden = true;
        dugme.setAttribute('aria-expanded', 'false');
        if (odakla) dugme.focus();
      };
      dugme.addEventListener('click', () => (menu.hidden ? ac() : kapat()));
      dugme.addEventListener('keydown', (olay) => {
        if (olay.key === 'ArrowDown') { olay.preventDefault(); ac(0); }
        if (olay.key === 'ArrowUp') { olay.preventDefault(); ac(-1); }
      });
      menu.addEventListener('keydown', (olay) => {
        const g = ogeler();
        const i = g.indexOf(document.activeElement);
        if (olay.key === 'ArrowDown') { olay.preventDefault(); g[(i + 1) % g.length]?.focus(); }
        else if (olay.key === 'ArrowUp') { olay.preventDefault(); g[(i - 1 + g.length) % g.length]?.focus(); }
        else if (olay.key === 'Home') { olay.preventDefault(); g[0]?.focus(); }
        else if (olay.key === 'End') { olay.preventDefault(); g[g.length - 1]?.focus(); }
        else if (olay.key === 'Escape') { olay.preventDefault(); kapat(true); }
        else if (olay.key === 'Tab') { kapat(); }
      });
      menu.addEventListener('click', (olay) => { if (olay.target.closest('[role="menuitem"]')) kapat(true); });
      document.addEventListener('click', (olay) => { if (!kap.contains(olay.target)) kapat(); });
    })
  );
}

// ---------------------------------------------------------------------------
// Başa dön. İki ekran aşağı inince görünür. Tıklama başa kaydırır ve odağı
// ana içeriğe verir.
// ---------------------------------------------------------------------------

export function basaDonBaslat(kok = document) {
  her('[data-kiris="basa-don"]', kok).forEach((el) =>
    bir(el, 'basa-don', (dugme) => {
      const esik = () => window.innerHeight * 2;
      const guncelle = () => { dugme.hidden = window.scrollY < esik(); };
      if (!dugme.hasAttribute('data-hep-goster')) {
        guncelle();
        window.addEventListener('scroll', guncelle, { passive: true });
      }
      dugme.addEventListener('click', (olay) => {
        olay.preventDefault();
        const azHareket = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: azHareket ? 'auto' : 'smooth' });
        const hedef = document.getElementById(dugme.getAttribute('href')?.slice(1) || 'ana-icerik') || document.querySelector('h1');
        if (hedef) { if (!hedef.hasAttribute('tabindex')) hedef.setAttribute('tabindex', '-1'); hedef.focus({ preventScroll: true }); }
      });
    })
  );
}

// ---------------------------------------------------------------------------
// Çerez bildirimi. Kabul veya ret tarayıcıda saklanır. Seçimden sonra
// bildirim bir onay cümlesine döner. Tercih varsa afiş hiç görünmez.
// ---------------------------------------------------------------------------

const CEREZ_ANAHTAR = 'kiris-cerez';

export function cerezBaslat(kok = document) {
  her('[data-kiris="cerez"]', kok).forEach((el) =>
    bir(el, 'cerez', (afis) => {
      const soru = afis.querySelector('.kiris-cerez__soru');
      const onay = afis.querySelector('.kiris-cerez__onay');
      let tercih = null;
      try { tercih = localStorage.getItem(CEREZ_ANAHTAR); } catch { /* özel pencere */ }
      if (tercih && !afis.hasAttribute('data-hep-goster')) { afis.hidden = true; return; }
      afis.addEventListener('click', (olay) => {
        const dugme = olay.target.closest('[data-cerez]');
        if (dugme) {
          const deger = dugme.dataset.cerez;
          try { localStorage.setItem(CEREZ_ANAHTAR, deger); } catch { /* saklanamadı */ }
          if (soru && onay) {
            soru.hidden = true;
            onay.hidden = false;
            const metin = onay.querySelector('[data-cerez-metin]');
            if (metin) metin.textContent = deger === 'kabul' ? 'İsteğe bağlı çerezleri kabul ettiniz.' : 'İsteğe bağlı çerezleri reddettiniz.';
            onay.querySelector('button')?.focus();
          } else {
            afis.hidden = true;
          }
          afis.dispatchEvent(new CustomEvent('kiris:cerezSecildi', { bubbles: true, detail: { deger } }));
          return;
        }
        if (olay.target.closest('[data-cerez-gizle]')) afis.hidden = true;
      });
    })
  );
}

// ---------------------------------------------------------------------------
// Sayfadan çık. Düğme güvenli bir adrese gider ve geçmişte iz bırakmaz.
// Shift tuşuna üç kez basmak da aynı işi yapar.
// ---------------------------------------------------------------------------

export function cikisBaslat(kok = document) {
  her('[data-kiris="cikis"]', kok).forEach((el) =>
    bir(el, 'cikis', (kap) => {
      const baglanti = kap.querySelector('a');
      if (!baglanti) return;
      const hedef = baglanti.getAttribute('href') || 'https://www.google.com';
      const cik = () => {
        try { window.open(hedef, '_blank', 'noopener,noreferrer'); } catch { /* engellendi */ }
        window.location.replace(hedef);
      };
      baglanti.addEventListener('click', (olay) => { olay.preventDefault(); cik(); });
      let sayac = 0;
      let zaman = 0;
      document.addEventListener('keyup', (olay) => {
        if (olay.key !== 'Shift') return;
        const simdi = Date.now();
        sayac = simdi - zaman < 1000 ? sayac + 1 : 1;
        zaman = simdi;
        const durum = kap.querySelector('[data-kiris-durum]');
        if (durum) durum.textContent = sayac < 3 ? `Çıkmak için Shift tuşuna ${3 - sayac} kez daha basın.` : '';
        if (sayac >= 3) cik();
      });
    })
  );
}

// ---------------------------------------------------------------------------
// Sıralanabilir tablo. Başlıktaki düğme sütunu sıralar. Sayı sütunları
// sayı olarak, diğerleri Türkçe alfabe ile sıralanır.
// ---------------------------------------------------------------------------

export function siralaBaslat(kok = document) {
  her('[data-kiris="sirala"]', kok).forEach((el) =>
    bir(el, 'sirala', (tablo) => {
      const govde = tablo.tBodies[0];
      const basliklar = her('th[aria-sort]', tablo);
      let durum = tablo.parentElement?.querySelector('[data-kiris-durum]');
      if (!durum) {
        durum = document.createElement('p');
        durum.className = 'kiris-gorsel-gizli';
        durum.setAttribute('aria-live', 'polite');
        durum.setAttribute('data-kiris-durum', '');
        tablo.insertAdjacentElement('afterend', durum);
      }
      if (!govde) return;
      const sayiMi = (metin) => /^-?[\d.]+(,\d+)?\s*[%₺]?$/.test(metin.trim());
      const sayi = (metin) => Number(metin.replace(/[^\d,-]/g, '').replace(',', '.'));
      basliklar.forEach((th, sutun) => {
        const dugme = th.querySelector('button') || th;
        dugme.addEventListener('click', () => {
          const yon = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
          basliklar.forEach((b) => b.setAttribute('aria-sort', 'none'));
          th.setAttribute('aria-sort', yon);
          const satirlar = her('tr', govde);
          const hucre = (tr) => tr.children[sutun]?.textContent ?? '';
          const sayisal = satirlar.every((tr) => sayiMi(hucre(tr)));
          satirlar.sort((a, b) => {
            const x = hucre(a);
            const y = hucre(b);
            const fark = sayisal ? sayi(x) - sayi(y) : trSirala(x, y);
            return yon === 'ascending' ? fark : -fark;
          });
          satirlar.forEach((tr) => govde.append(tr));
          const ad = (th.querySelector('button')?.textContent || th.textContent).trim();
          durum.textContent = `${ad} sütununa göre ${yon === 'ascending' ? 'artan' : 'azalan'} sıralandı.`;
        });
      });
    })
  );
}

// ---------------------------------------------------------------------------
// Aralık seçici. Kaydırıcının değeri yanındaki çıktıda görünür.
// ---------------------------------------------------------------------------

export function aralikBaslat(kok = document) {
  her('[data-kiris="aralik"]', kok).forEach((el) =>
    bir(el, 'aralik', (alan) => {
      const girdi = alan.querySelector('input[type="range"]');
      const cikti = alan.querySelector('output');
      if (!girdi || !cikti) return;
      const birim = alan.dataset.birim || '';
      const yaz = () => { cikti.textContent = `${girdi.value}${birim}`; };
      yaz();
      girdi.addEventListener('input', yaz);
    })
  );
}

// ---------------------------------------------------------------------------
// Adet seçici. Eksi ve artı düğmeleri sayıyı sınırlar içinde değiştirir.
// ---------------------------------------------------------------------------

export function adetBaslat(kok = document) {
  her('[data-kiris="adet"]', kok).forEach((el) =>
    bir(el, 'adet', (alan) => {
      const girdi = alan.querySelector('input');
      const eksi = alan.querySelector('[data-adet="eksi"]');
      const arti = alan.querySelector('[data-adet="arti"]');
      if (!girdi || !eksi || !arti) return;
      const enAz = Number(girdi.min || 0);
      const enCok = girdi.max === '' ? Infinity : Number(girdi.max);
      const adim = Number(girdi.step || 1);
      let durum = alan.querySelector('[data-kiris-durum]');
      if (!durum) {
        durum = document.createElement('p');
        durum.className = 'kiris-gorsel-gizli';
        durum.setAttribute('aria-live', 'polite');
        durum.setAttribute('data-kiris-durum', '');
        alan.append(durum);
      }
      // Sınırdaki düğme devre dışı kalmaz, odağı kaybetmez. aria-disabled ile
      // söylenir ve basınca bir şey yapmaz.
      const ayarla = (deger, duyur = false) => {
        const yeni = Math.min(enCok, Math.max(enAz, deger));
        girdi.value = String(yeni);
        eksi.setAttribute('aria-disabled', String(yeni <= enAz));
        arti.setAttribute('aria-disabled', String(yeni >= enCok));
        if (duyur) durum.textContent = `${yeni}${yeni <= enAz ? ', en az' : yeni >= enCok ? ', en çok' : ''}`;
        girdi.dispatchEvent(new Event('change', { bubbles: true }));
      };
      eksi.addEventListener('click', () => { if (eksi.getAttribute('aria-disabled') !== 'true') ayarla(Number(girdi.value || 0) - adim, true); });
      arti.addEventListener('click', () => { if (arti.getAttribute('aria-disabled') !== 'true') ayarla(Number(girdi.value || 0) + adim, true); });
      girdi.addEventListener('blur', () => ayarla(Number(girdi.value || enAz)));
      ayarla(Number(girdi.value || enAz));
    })
  );
}

// ---------------------------------------------------------------------------
// Yazdır. Tarayıcının yazdırma penceresini açar.
// ---------------------------------------------------------------------------

export function yazdirBaslat(kok = document) {
  her('[data-kiris="yazdir"]', kok).forEach((el) =>
    bir(el, 'yazdir', (dugme) => {
      dugme.addEventListener('click', (olay) => { olay.preventDefault(); window.print(); });
    })
  );
}

// ---------------------------------------------------------------------------
// Girdi maskesi. data-maske "#### #### ####" gibi bir kalıp verir. Yalnız
// rakam alır, boşluk ve ayraçları kendisi koyar. Sunucu ham değeri alır.
// ---------------------------------------------------------------------------

export function maskeBaslat(kok = document) {
  her('[data-kiris="maske"]', kok).forEach((el) =>
    bir(el, 'maske', (girdi) => {
      const kalip = girdi.dataset.maske || '';
      if (!kalip) return;
      const bicimle = (rakamlar) => {
        let cikti = '';
        let i = 0;
        for (const k of kalip) {
          if (i >= rakamlar.length) break;
          if (k === '#') { cikti += rakamlar[i]; i += 1; } else { cikti += k; }
        }
        return cikti;
      };
      // İmleç korunur: imleçten önceki rakam sayısı bulunur, biçimlenmiş
      // metinde aynı rakam sayısına gelen yere konur.
      const uygula = () => {
        const imlec = girdi.selectionStart ?? girdi.value.length;
        const onceRakam = girdi.value.slice(0, imlec).replace(/\D/g, '').length;
        girdi.value = bicimle(girdi.value.replace(/\D/g, ''));
        let yer = 0;
        let sayac = 0;
        while (yer < girdi.value.length && sayac < onceRakam) { if (/\d/.test(girdi.value[yer])) sayac += 1; yer += 1; }
        try { girdi.setSelectionRange(yer, yer); } catch { /* tür desteklemiyor */ }
      };
      girdi.addEventListener('input', uygula);
      uygula();
    })
  );
}

// ---------------------------------------------------------------------------
// Takvim. Metin alanının yanındaki düğme bir ay ızgarası açar. Ok tuşları
// gün gezer, Page Up ve Page Down ay değiştirir, Enter seçer, Escape kapatır.
// Seçim alana GG.AA.YYYY olarak yazılır. Alan yazılabilir kalır.
// ---------------------------------------------------------------------------

const TAKVIM_AYLAR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const TAKVIM_GUNLER = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const TAKVIM_GUNLER_UZUN = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const iki = (n) => String(n).padStart(2, '0');
const tarihYaz = (t) => `${iki(t.getDate())}.${iki(t.getMonth() + 1)}.${t.getFullYear()}`;
const tarihOku = (metin) => {
  const m = /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/.exec(metin.trim());
  if (!m) return null;
  const t = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  return Number.isNaN(t.getTime()) ? null : t;
};
const isoOku = (metin) => (metin ? new Date(`${metin}T00:00:00`) : null);
const ayniGun = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export function takvimBaslat(kok = document) {
  her('[data-kiris="takvim"]', kok).forEach((el) =>
    bir(el, 'takvim', (alan) => {
      const girdi = alan.querySelector('input');
      const dugme = alan.querySelector('.kiris-takvim__ac');
      const panel = alan.querySelector('.kiris-takvim__panel');
      if (!girdi || !dugme || !panel) return;
      const enAz = isoOku(alan.dataset.enAz);
      const enCok = isoOku(alan.dataset.enCok);
      const bugun = new Date();
      let gorunen = tarihOku(girdi.value) || bugun;
      let odak = new Date(gorunen);

      const disarida = (t) => (enAz && t < enAz) || (enCok && t > enCok);
      const sinirla = (t) => (enAz && t < enAz ? new Date(enAz) : enCok && t > enCok ? new Date(enCok) : t);
      let durum = alan.querySelector('[data-kiris-durum]');
      if (!durum) {
        durum = document.createElement('p');
        durum.className = 'kiris-gorsel-gizli';
        durum.setAttribute('aria-live', 'polite');
        durum.setAttribute('data-kiris-durum', '');
        alan.append(durum);
      }

      // Panel kabuğu bir kere kurulur. Yalnız ızgara ve seçim değerleri
      // yeniden çizilir. Eskiden bütün panel yeniden yazılıyordu, bu yüzden
      // tıklanan ok düğmesi DOM'dan düşüyor ve panel kapanıyordu.
      const yilBasi = enAz ? enAz.getFullYear() : bugun.getFullYear() - 120;
      const yilSonu = enCok ? enCok.getFullYear() : bugun.getFullYear() + 10;
      const yillar = [];
      for (let y = yilBasi; y <= yilSonu; y += 1) yillar.push(y);
      panel.innerHTML = `
          <div class="kiris-takvim__ust">
            <button class="kiris-takvim__yon" type="button" data-ay="-1" aria-label="Önceki ay">‹</button>
            <div class="kiris-takvim__secimler">
              <label class="kiris-gorsel-gizli" for="${girdi.id}-ay-secim">Ay</label>
              <select class="kiris-secim kiris-takvim__secim" id="${girdi.id}-ay-secim" data-ay-secim>${TAKVIM_AYLAR.map((a, i) => `<option value="${i}">${a}</option>`).join('')}</select>
              <label class="kiris-gorsel-gizli" for="${girdi.id}-yil-secim">Yıl</label>
              <select class="kiris-secim kiris-takvim__secim" id="${girdi.id}-yil-secim" data-yil-secim>${yillar.map((y) => `<option value="${y}">${y}</option>`).join('')}</select>
            </div>
            <button class="kiris-takvim__yon" type="button" data-ay="1" aria-label="Sonraki ay">›</button>
          </div>
          <table class="kiris-takvim__izgara" role="grid">
            <thead><tr>${TAKVIM_GUNLER.map((g, i) => `<th scope="col" abbr="${TAKVIM_GUNLER_UZUN[i]}">${g}</th>`).join('')}</tr></thead>
            <tbody></tbody>
          </table>
          <div class="kiris-takvim__alt"><button class="kiris-link kiris-takvim__bugun" type="button" data-bugun>Bugün</button><button class="kiris-link" type="button" data-kiris-kapat>Kapat</button></div>`;
      const izgara = panel.querySelector('.kiris-takvim__izgara');
      const govde = panel.querySelector('tbody');
      const aySecim = panel.querySelector('[data-ay-secim]');
      const yilSecim = panel.querySelector('[data-yil-secim]');
      const geriDugme = panel.querySelector('[data-ay="-1"]');
      const ileriDugme = panel.querySelector('[data-ay="1"]');
      const bugunDugme = panel.querySelector('[data-bugun]');

      const ciz = () => {
        const yil = gorunen.getFullYear();
        const ay = gorunen.getMonth();        const ilk = new Date(yil, ay, 1);
        const kaydir = (ilk.getDay() + 6) % 7;
        const gunSayisi = new Date(yil, ay + 1, 0).getDate();
        const secili = tarihOku(girdi.value);
        let hucreler = '';
        let gun = 1 - kaydir;
        for (let satir = 0; satir < 6; satir += 1) {
          hucreler += '<tr>';
          for (let sutun = 0; sutun < 7; sutun += 1, gun += 1) {
            if (gun < 1 || gun > gunSayisi) { hucreler += '<td></td>'; continue; }
            const t = new Date(yil, ay, gun);
            const sinif = ['kiris-takvim__gun', ayniGun(t, bugun) ? 'kiris-takvim__gun--bugun' : '', ayniGun(t, secili) ? 'kiris-takvim__gun--secili' : ''].filter(Boolean).join(' ');
            const etiket = `${gun} ${TAKVIM_AYLAR[ay]} ${yil} ${TAKVIM_GUNLER_UZUN[sutun]}`;
            hucreler += `<td><button class="${sinif}" type="button" tabindex="${ayniGun(t, odak) ? 0 : -1}" data-gun="${gun}" aria-label="${etiket}"${ayniGun(t, secili) ? ' aria-pressed="true"' : ''}${disarida(t) ? ' disabled' : ''}>${gun}</button></td>`;
          }
          hucreler += '</tr>';
          if (gun > gunSayisi) break;
        }
        govde.innerHTML = hucreler;
        izgara.setAttribute('aria-label', `${TAKVIM_AYLAR[ay]} ${yil}`);
        aySecim.value = String(ay);
        yilSecim.value = String(yil);
        // Ay ve yıl sınırın dışına çıkamaz. Ok düğmesi son ayda kapanır.
        const oncekiSon = new Date(yil, ay, 0);
        const sonrakiIlk = new Date(yil, ay + 1, 1);
        geriDugme.disabled = Boolean(enAz && oncekiSon < enAz);
        ileriDugme.disabled = Boolean(enCok && sonrakiIlk > enCok);
        bugunDugme.disabled = disarida(bugun);
        durum.textContent = `${TAKVIM_AYLAR[ay]} ${yil}`;
      };

      const ac = () => {
        gorunen = tarihOku(girdi.value) || bugun;
        if (enAz && gorunen < enAz) gorunen = new Date(enAz);
        if (enCok && gorunen > enCok) gorunen = new Date(enCok);
        odak = new Date(gorunen);
        ciz();
        panel.hidden = false;

        dugme.setAttribute('aria-expanded', 'true');
        panel.querySelector('[tabindex="0"]')?.focus();
      };
      const kapat = (odakla = true) => {
        panel.hidden = true;
        dugme.setAttribute('aria-expanded', 'false');
        if (odakla) dugme.focus();
      };
      const sec = (t) => {
        girdi.value = tarihYaz(t);
        girdi.dispatchEvent(new Event('input', { bubbles: true }));
        girdi.dispatchEvent(new Event('change', { bubbles: true }));
        kapat();
      };
      const odakla = (hedef) => {
        const t = sinirla(hedef);
        odak = t;
        if (t.getMonth() !== gorunen.getMonth() || t.getFullYear() !== gorunen.getFullYear()) gorunen = new Date(t.getFullYear(), t.getMonth(), 1);
        ciz();
        panel.querySelector('[tabindex="0"]')?.focus();
      };

      dugme.addEventListener('click', () => (panel.hidden ? ac() : kapat()));
      panel.addEventListener('click', (olay) => {
        const gun = olay.target.closest('[data-gun]');
        if (gun && !gun.disabled) { sec(new Date(gorunen.getFullYear(), gorunen.getMonth(), Number(gun.dataset.gun))); return; }
        const ay = olay.target.closest('[data-ay]');
        if (ay && !ay.disabled) {
          gorunen = new Date(gorunen.getFullYear(), gorunen.getMonth() + Number(ay.dataset.ay), 1);
          odak = sinirla(new Date(gorunen));
          ciz();
          if (ay.disabled) panel.querySelector('[data-ay]:not(:disabled)')?.focus();
          return;
        }
        if (olay.target.closest('[data-bugun]')) { if (!disarida(bugun)) sec(new Date()); return; }
        if (olay.target.closest('[data-kiris-kapat]')) kapat();
      });
      // Ay ve yıl listesi. Uzun geçmişe giden bir tarih için ok düğmesi yetmez.
      panel.addEventListener('change', (olay) => {
        if (olay.target !== aySecim && olay.target !== yilSecim) return;
        gorunen = new Date(Number(yilSecim.value), Number(aySecim.value), 1);
        odak = sinirla(new Date(gorunen));
        ciz();
      });
      panel.addEventListener('keydown', (olay) => {
        const gun = olay.target.closest('[data-gun]');
        if (olay.key === 'Escape') { olay.preventDefault(); kapat(); return; }
        if (olay.key === 'Tab' && !olay.target.closest('.kiris-takvim__ust')) { kapat(false); return; }
        if (!gun) return;
        const t = new Date(odak);
        const adim = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[olay.key];
        if (adim) { olay.preventDefault(); t.setDate(t.getDate() + adim); odakla(t); }
        else if (olay.key === 'Home') { olay.preventDefault(); t.setDate(t.getDate() - ((t.getDay() + 6) % 7)); odakla(t); }
        else if (olay.key === 'End') { olay.preventDefault(); t.setDate(t.getDate() + (6 - ((t.getDay() + 6) % 7))); odakla(t); }
        else if (olay.key === 'PageUp') { olay.preventDefault(); t.setMonth(t.getMonth() - (olay.shiftKey ? 12 : 1)); odakla(t); }
        else if (olay.key === 'PageDown') { olay.preventDefault(); t.setMonth(t.getMonth() + (olay.shiftKey ? 12 : 1)); odakla(t); }
        else if (olay.key === 'Enter' || olay.key === ' ') { olay.preventDefault(); if (!gun.disabled) sec(new Date(odak)); }
      });
      document.addEventListener('click', (olay) => { if (!alan.contains(olay.target)) kapat(false); });
    })
  );
}

// ---------------------------------------------------------------------------
// Çoklu seçim. Yazarak süzülen bir listeden birden çok seçim. Seçilenler
// alanın üstünde etiket olur. Gizli bir <select multiple> formu taşır.
// ---------------------------------------------------------------------------

export function cokluSecimBaslat(kok = document) {
  her('[data-kiris="coklu-secim"]', kok).forEach((el) =>
    bir(el, 'coklu-secim', (alan) => {
      const girdi = alan.querySelector('[role="combobox"]');
      const liste = alan.querySelector('[role="listbox"]');
      const secilenler = alan.querySelector('.kiris-coklu__secilenler');
      const gizli = alan.querySelector('select');
      const durum = alan.querySelector('[data-kiris-durum]');
      if (!girdi || !liste || !secilenler || !gizli) return;
      const secenekler = her('[role="option"]', liste);
      let etkin = -1;

      // Betik yerel listeyi gizler ve zenginleştirilmiş alanı açar.
      gizli.hidden = true;
      gizli.setAttribute('aria-hidden', 'true');
      gizli.tabIndex = -1;
      girdi.hidden = false;
      secilenler.hidden = false;

      const gorunenler = () => secenekler.filter((o) => !o.hidden);
      const degeri = (o) => o.dataset.deger ?? o.textContent.trim();
      const seciliMi = (o) => o.getAttribute('aria-selected') === 'true';

      const cizSecilenler = () => {
        secilenler.innerHTML = secenekler.filter(seciliMi).map((o) =>
          `<span class="kiris-cip kiris-cip--secili">${htmlKacis(o.textContent.trim())}<button class="kiris-cip__kaldir" type="button" data-deger="${htmlKacis(degeri(o))}" aria-label="${htmlKacis(o.textContent.trim())} seçimini kaldır"><svg class="kiris-simge" aria-hidden="true"><use href="#kiris-close"/></svg></button></span>`
        ).join('');
        her('option', gizli).forEach((opt) => { opt.selected = secenekler.some((o) => degeri(o) === opt.value && seciliMi(o)); });
      };
      const ac = () => { liste.hidden = false; girdi.setAttribute('aria-expanded', 'true'); };
      const kapat = () => { liste.hidden = true; girdi.setAttribute('aria-expanded', 'false'); girdi.removeAttribute('aria-activedescendant'); etkin = -1; };
      const isaretle = (i) => {
        const g = gorunenler();
        secenekler.forEach((o) => o.classList.remove('kiris-coklu__oge--etkin'));
        if (i < 0 || i >= g.length) { etkin = -1; girdi.removeAttribute('aria-activedescendant'); return; }
        etkin = i;
        g[i].classList.add('kiris-coklu__oge--etkin');
        girdi.setAttribute('aria-activedescendant', g[i].id);
        g[i].scrollIntoView({ block: 'nearest' });
      };
      const suz = () => {
        const ara = trKucuk(girdi.value.trim());
        let n = 0;
        secenekler.forEach((o) => { const uyar = !ara || trKucuk(o.textContent).includes(ara); o.hidden = !uyar; if (uyar) n += 1; });
        if (durum) durum.textContent = n === 0 ? 'Sonuç yok.' : `${n} seçenek. Seçmek için aşağı ok ve Enter.`;
        isaretle(-1);
        ac();
      };
      const degistir = (o) => {
        const yeni = !seciliMi(o);
        o.setAttribute('aria-selected', String(yeni));
        cizSecilenler();
        if (durum) durum.textContent = `${o.textContent.trim()} ${yeni ? 'seçildi' : 'kaldırıldı'}.`;
        girdi.dispatchEvent(new CustomEvent('kiris:secildi', { bubbles: true, detail: { deger: degeri(o), secili: yeni } }));
      };

      girdi.addEventListener('input', suz);
      girdi.addEventListener('focus', suz);
      girdi.addEventListener('keydown', (olay) => {
        const g = gorunenler();
        if (olay.key === 'ArrowDown') { olay.preventDefault(); if (liste.hidden) suz(); isaretle(Math.min(etkin + 1, g.length - 1)); }
        else if (olay.key === 'ArrowUp') { olay.preventDefault(); isaretle(Math.max(etkin - 1, 0)); }
        else if (olay.key === 'Enter' && etkin >= 0) { olay.preventDefault(); degistir(g[etkin]); }
        else if (olay.key === 'Escape') { kapat(); }
        else if (olay.key === 'Backspace' && girdi.value === '') { const son = secenekler.filter(seciliMi).pop(); if (son) degistir(son); }
        else if (olay.key === 'Tab') { kapat(); }
      });
      liste.addEventListener('mousedown', (olay) => { const o = olay.target.closest('[role="option"]'); if (o) { olay.preventDefault(); degistir(o); } });
      secilenler.addEventListener('click', (olay) => {
        const kaldir = olay.target.closest('[data-deger]');
        if (!kaldir) return;
        const o = secenekler.find((x) => degeri(x) === kaldir.dataset.deger);
        if (o) degistir(o);
        girdi.focus();
      });
      document.addEventListener('click', (olay) => { if (!alan.contains(olay.target)) kapat(); });
      cizSecilenler();
    })
  );
}

// ---------------------------------------------------------------------------
// Geniş menü. Üst düğme tam genişlikte bir panel açar. Bir kerede bir panel.
// ---------------------------------------------------------------------------

export function genisMenuBaslat(kok = document) {
  her('[data-kiris="genis-menu"]', kok).forEach((el) =>
    bir(el, 'genis-menu', (menu) => {
      const dugmeler = her('[aria-expanded][aria-controls]', menu);
      const kapatHepsi = () => dugmeler.forEach((d) => { d.setAttribute('aria-expanded', 'false'); const p = document.getElementById(d.getAttribute('aria-controls')); if (p) p.hidden = true; });
      dugmeler.forEach((d) => {
        d.addEventListener('click', () => {
          const acik = d.getAttribute('aria-expanded') === 'true';
          kapatHepsi();
          if (!acik) { d.setAttribute('aria-expanded', 'true'); const p = document.getElementById(d.getAttribute('aria-controls')); if (p) p.hidden = false; }
        });
      });
      menu.addEventListener('keydown', (olay) => {
        if (olay.key !== 'Escape') return;
        const acik = dugmeler.find((d) => d.getAttribute('aria-expanded') === 'true');
        if (acik) { kapatHepsi(); acik.focus(); }
      });
      document.addEventListener('click', (olay) => { if (!menu.contains(olay.target)) kapatHepsi(); });
    })
  );
}

// ---------------------------------------------------------------------------
// Kayan pano. Kaydırma yakalamalı bir şerit. Düğmeler bir kart kaydırır.
// Kendiliğinden dönmez. data-otomatik varsa döner ve bir durdur düğmesi olur.
// ---------------------------------------------------------------------------

export function kayanPanoBaslat(kok = document) {
  her('[data-kiris="kayan-pano"]', kok).forEach((el) =>
    bir(el, 'kayan-pano', (pano) => {
      const serit = pano.querySelector('.kiris-kayan-pano__serit');
      const slaytlar = her('.kiris-kayan-pano__slayt', pano);
      const geri = pano.querySelector('[data-yon="geri"]');
      const ileri = pano.querySelector('[data-yon="ileri"]');
      const noktalar = pano.querySelector('.kiris-kayan-pano__noktalar');
      const durdur = pano.querySelector('[data-durdur]');
      const durum = pano.querySelector('[data-kiris-durum]');
      if (!serit || slaytlar.length === 0) return;
      let indeks = 0;
      let zamanlayici = 0;
      const azHareket = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!pano.hasAttribute('role')) pano.setAttribute('role', 'region');
      pano.setAttribute('aria-roledescription', 'kayan pano');
      if (!pano.hasAttribute('aria-label') && !pano.hasAttribute('aria-labelledby')) pano.setAttribute('aria-label', pano.dataset.ad || 'Kayan pano');
      slaytlar.forEach((s, i) => { s.setAttribute('role', 'group'); s.setAttribute('aria-roledescription', 'slayt'); s.setAttribute('aria-label', `${i + 1} / ${slaytlar.length}`); });
      if (noktalar) {
        noktalar.innerHTML = slaytlar.map((_, i) => `<button type="button" data-indeks="${i}" aria-label="${i + 1}. slayta git"${i === 0 ? ' aria-current="true"' : ''}></button>`).join('');
      }
      const git = (i, odakla = false) => {
        indeks = (i + slaytlar.length) % slaytlar.length;
        serit.scrollTo({ left: slaytlar[indeks].offsetLeft - slaytlar[0].offsetLeft, behavior: azHareket ? 'auto' : 'smooth' });
        her('[data-indeks]', pano).forEach((n) => { if (Number(n.dataset.indeks) === indeks) n.setAttribute('aria-current', 'true'); else n.removeAttribute('aria-current'); });
        if (durum) durum.textContent = `Slayt ${indeks + 1} / ${slaytlar.length}`;
        if (odakla) slaytlar[indeks].focus?.();
      };
      geri?.addEventListener('click', () => git(indeks - 1));
      ileri?.addEventListener('click', () => git(indeks + 1));
      noktalar?.addEventListener('click', (olay) => { const n = olay.target.closest('[data-indeks]'); if (n) git(Number(n.dataset.indeks)); });
      serit.addEventListener('scroll', () => {
        const sifir = slaytlar[0].offsetLeft;
        const yakin = slaytlar.reduce((enIyi, s, i) => (Math.abs(s.offsetLeft - sifir - serit.scrollLeft) < Math.abs(slaytlar[enIyi].offsetLeft - sifir - serit.scrollLeft) ? i : enIyi), 0);
        if (yakin !== indeks) { indeks = yakin; her('[data-indeks]', pano).forEach((n) => { if (Number(n.dataset.indeks) === indeks) n.setAttribute('aria-current', 'true'); else n.removeAttribute('aria-current'); }); }
      }, { passive: true });

      const sure = Number(pano.dataset.otomatik || 0);
      if (sure > 0 && durdur && !azHareket) {
        const basla = () => { zamanlayici = setInterval(() => git(indeks + 1), Math.max(5000, sure)); durdur.setAttribute('aria-pressed', 'false'); durdur.textContent = 'Durdur'; };
        const dur = () => { clearInterval(zamanlayici); zamanlayici = 0; durdur.setAttribute('aria-pressed', 'true'); durdur.textContent = 'Sürdür'; };
        durdur.addEventListener('click', () => (zamanlayici ? dur() : basla()));
        pano.addEventListener('mouseenter', () => { if (zamanlayici) { clearInterval(zamanlayici); zamanlayici = -1; } });
        pano.addEventListener('mouseleave', () => { if (zamanlayici === -1) { zamanlayici = setInterval(() => git(indeks + 1), Math.max(5000, sure)); } });
        pano.addEventListener('focusin', () => { if (zamanlayici) { clearInterval(zamanlayici); zamanlayici = -1; } });
        basla();
      } else if (durdur) {
        durdur.hidden = true;
      }
    })
  );
}

// ---------------------------------------------------------------------------
// Yönlendirme. İlk kullanımda sayfanın parçalarını sırayla tanıtır. Hedef
// bir halka ile işaretlenir, açıklama yanında durur. Escape bitirir.
// ---------------------------------------------------------------------------

export function yonlendirmeBaslat(kok = document) {
  her('[data-kiris="yonlendirme"]', kok).forEach((el) =>
    bir(el, 'yonlendirme', (kap) => {
      const baslat = kap.querySelector('[data-yonlendirme-baslat]');
      const adimlar = her('[data-yonlendirme-adim]', document).sort((a, b) => Number(a.dataset.yonlendirmeAdim) - Number(b.dataset.yonlendirmeAdim));
      if (!baslat || adimlar.length === 0) return;
      let kutu = null;
      let i = 0;

      const temizle = () => { adimlar.forEach((a) => a.classList.remove('kiris-yonlendirme__hedef')); };
      const bitir = () => { temizle(); kutu?.remove(); kutu = null; baslat.focus(); };
      const goster = (n) => {
        i = n;
        temizle();
        const hedef = adimlar[i];
        hedef.classList.add('kiris-yonlendirme__hedef');
        hedef.scrollIntoView({ block: 'center', behavior: 'smooth' });
        if (!kutu) {
          kutu = document.createElement('div');
          kutu.className = 'kiris-yonlendirme__kutu';
          kutu.setAttribute('role', 'dialog');
          kutu.setAttribute('aria-modal', 'false');
          kutu.setAttribute('aria-labelledby', 'kiris-yonlendirme-baslik');
          document.body.append(kutu);
        }
        kutu.innerHTML = `
          <p class="kiris-yonlendirme__adim">Adım ${i + 1} / ${adimlar.length}</p>
          <h2 class="kiris-yonlendirme__baslik" id="kiris-yonlendirme-baslik">${hedef.dataset.yonlendirmeBaslik || ''}</h2>
          <p class="kiris-yonlendirme__metin">${hedef.dataset.yonlendirmeMetin || ''}</p>
          <div class="kiris-button-grubu">
            ${i > 0 ? '<button class="kiris-button kiris-button--ikincil kiris-button--kucuk" type="button" data-geri>Geri</button>' : ''}
            <button class="kiris-button kiris-button--kucuk" type="button" data-ileri>${i === adimlar.length - 1 ? 'Bitir' : 'İleri'}</button>
            <button class="kiris-link" type="button" data-bitir>Atla</button>
          </div>`;
        const r = hedef.getBoundingClientRect();
        const genislik = kutu.offsetWidth || 320;
        kutu.style.top = `${window.scrollY + r.bottom + 12}px`;
        kutu.style.left = `${Math.max(16, Math.min(window.scrollX + r.left, window.innerWidth - genislik - 16))}px`;
        kutu.querySelector('[data-ileri]').focus();
      };
      baslat.addEventListener('click', () => goster(0));
      document.addEventListener('click', (olay) => {
        if (!kutu || !kutu.contains(olay.target)) return;
        if (olay.target.closest('[data-geri]')) goster(i - 1);
        else if (olay.target.closest('[data-ileri]')) (i === adimlar.length - 1 ? bitir() : goster(i + 1));
        else if (olay.target.closest('[data-bitir]')) bitir();
      });
      document.addEventListener('keydown', (olay) => { if (kutu && olay.key === 'Escape') bitir(); });
    })
  );
}

// ---------------------------------------------------------------------------
// İpucu. Odak ve işaretçi ile açılır, Escape ile kapanır.
// ---------------------------------------------------------------------------

export function ipucuBaslat(kok = document) {
  her('[data-kiris="ipucu"]', kok).forEach((el) =>
    bir(el, 'ipucu', (kap) => {
      const tetik = kap.querySelector('[aria-describedby]');
      const ipucu = kap.querySelector('[role="tooltip"]');
      if (!tetik || !ipucu) return;
      const goster = () => { ipucu.hidden = false; };
      const gizle = () => { ipucu.hidden = true; };
      tetik.addEventListener('mouseenter', goster);
      tetik.addEventListener('focus', goster);
      kap.addEventListener('mouseleave', gizle);
      tetik.addEventListener('blur', gizle);
      document.addEventListener('keydown', (olay) => { if (olay.key === 'Escape') gizle(); });
    })
  );
}

// ---------------------------------------------------------------------------
// Başlık çubuğu, mobil menü
// ---------------------------------------------------------------------------

export function baslikCubuguBaslat(kok = document) {
  her('[data-kiris="baslik-cubugu"]', kok).forEach((el) =>
    bir(el, 'baslik-cubugu', (cubuk) => {
      const dugme = cubuk.querySelector('.kiris-baslik-cubugu__menu-dugmesi');
      if (!dugme) return;
      dugme.addEventListener('click', () => {
        const acik = dugme.getAttribute('aria-expanded') === 'true';
        dugme.setAttribute('aria-expanded', String(!acik));
        cubuk.classList.toggle('kiris-baslik-cubugu--acik', !acik);
      });
    })
  );
}

// ---------------------------------------------------------------------------
// Resmî afiş paneli
// ---------------------------------------------------------------------------

export function resmiAfisBaslat(kok = document) {
  her('[data-kiris="resmi-afis"]', kok).forEach((el) =>
    bir(el, 'resmi-afis', (afis) => {
      const dugme = afis.querySelector('.kiris-resmi-afis__dugme');
      const panel = afis.querySelector('.kiris-resmi-afis__panel');
      if (!dugme || !panel) return;
      dugme.addEventListener('click', () => {
        const acik = dugme.getAttribute('aria-expanded') === 'true';
        dugme.setAttribute('aria-expanded', String(!acik));
        panel.hidden = acik;
      });
    })
  );
}

// ---------------------------------------------------------------------------
// Erişilebilirlik menüsü. Ayar tarayıcıda saklanır, sunucuya gitmez.
// ---------------------------------------------------------------------------

const ayarOku = (anahtar) => {
  try {
    return localStorage.getItem(anahtar);
  } catch {
    return null; // Gizli sekme veya kapalı site verisi. Sayfa yine çalışır.
  }
};

const ayarYaz = (anahtar, deger) => {
  try {
    localStorage.setItem(anahtar, deger);
  } catch {
    /* sessizce geç */
  }
};

export function erisimMenusuBaslat(kok = document) {
  const uygula = (tur, deger) => {
    // Yazı boyutunda "normal" özniteliği kaldırır. Temada her seçim açıkça
    // yazılır, böylece "açık" seçimi işletim sistemi tercihini ezer.
    const kaldir = (tur === 'yazi' && deger === 'normal') || deger === 'sistem';
    if (kaldir) document.documentElement.removeAttribute(`data-kiris-${tur}`);
    else document.documentElement.setAttribute(`data-kiris-${tur}`, deger);
    ayarYaz(`kiris-${tur}`, deger);
  };

  // Sayfa açılır açılmaz saklanan ayarı uygula.
  for (const tur of ['yazi', 'tema']) {
    const kayitli = ayarOku(`kiris-${tur}`);
    if (kayitli) uygula(tur, kayitli);
  }

  her('[data-kiris="erisim-menusu"]', kok).forEach((el) =>
    bir(el, 'erisim-menusu', (menu) => {
      const dugme = menu.querySelector('.kiris-erisim__dugme');
      const panel = menu.querySelector('.kiris-erisim__panel');
      if (!dugme || !panel) return;

      dugme.addEventListener('click', () => {
        const acik = dugme.getAttribute('aria-expanded') === 'true';
        dugme.setAttribute('aria-expanded', String(!acik));
        panel.hidden = acik;
      });

      const kapat = () => {
        panel.hidden = true;
        dugme.setAttribute('aria-expanded', 'false');
      };
      // Görünür kapat düğmesi. Dışarı tıklamayı veya Esc tuşunu bilmeyen
      // kullanıcı için tek tıklık çıkış.
      const kapatDugmesi = menu.querySelector('.kiris-erisim__kapat');
      if (kapatDugmesi) kapatDugmesi.addEventListener('click', () => { kapat(); dugme.focus(); });
      document.addEventListener('keydown', (olay) => {
        if (olay.key === 'Escape' && !panel.hidden) {
          kapat();
          dugme.focus();
        }
      });
      // Dışarı tıklayınca kapanır. Panel içine tıklamak açık bırakır.
      document.addEventListener('click', (olay) => {
        if (!panel.hidden && !menu.contains(olay.target)) kapat();
      });

      her('.kiris-erisim__secenek', menu).forEach((secenek) => {
        const tur = 'yazi' in secenek.dataset ? 'yazi' : 'tema';
        secenek.addEventListener('click', () => {
          const deger = secenek.dataset[tur];
          her(`.kiris-erisim__secenek[data-${tur}]`, menu).forEach((k) =>
            k.setAttribute('aria-pressed', String(k === secenek))
          );
          uygula(tur, deger);
        });
        // Sayfa yüklendiğinde basılı durumu saklanan ayara göre kur.
        const kayitli = ayarOku(`kiris-${tur}`);
        if (kayitli) secenek.setAttribute('aria-pressed', String(secenek.dataset[tur] === kayitli));
      });
    })
  );
}

// ---------------------------------------------------------------------------
// Türkiye’ye özgü alan doğrulayıcıları
// ---------------------------------------------------------------------------

export function kimlikNoBaslat(kok = document) {
  her('[data-kiris="kimlik-no"]', kok).forEach((el) =>
    bir(el, 'kimlik-no', (alan) => {
      const girdi = alan.querySelector('input');
      if (!girdi) return;
      const yabanciKabul = alan.dataset.ykn === 'acik';
      girdi.addEventListener('input', () => {
        girdi.value = girdi.value.replace(/\D/g, '').slice(0, 11);
      });
      haneSayaci(alan, girdi, 11);
      ciktikcaDenetle(alan, girdi, (deger) => kimlikNoDenetle(deger, { yabanciKabul }).hata, 'Kimlik numaranızı yazın.');
    })
  );
}

export function vergiNoBaslat(kok = document) {
  her('[data-kiris="vergi-no"]', kok).forEach((el) =>
    bir(el, 'vergi-no', (alan) => {
      const girdi = alan.querySelector('input');
      if (!girdi) return;
      girdi.addEventListener('input', () => {
        girdi.value = girdi.value.replace(/\D/g, '').slice(0, 10);
      });
      haneSayaci(alan, girdi, 10);
      ciktikcaDenetle(
        alan,
        girdi,
        (deger) => {
          const n = deger.replace(/\D/g, '').length;
          if (n !== 10) return `Vergi kimlik numarası 10 hane olmalıdır. ${n} hane girdiniz.`;
          return vergiNoGecerli(deger) ? null : 'Vergi kimlik numarasını kontrol edin. Sağlama hanesi tutmuyor.';
        },
        'Vergi kimlik numaranızı yazın.'
      );
    })
  );
}

export function ibanBaslat(kok = document) {
  her('[data-kiris="iban"]', kok).forEach((el) =>
    bir(el, 'iban', (alan) => {
      const girdi = alan.querySelector('input');
      if (!girdi) return;

      // TR öneki alanda hazır durur ve silinemez. Kullanıcı yalnız 24 rakam
      // yazar. Yapıştırılan bir IBAN'daki TR yinelenmez. İmleç önekin önüne
      // geçmez.
      const ONEK = 'TR';
      const duzelt = () => {
        const imlec = girdi.selectionStart ?? girdi.value.length;
        const onceki = girdi.value.slice(0, imlec).replace(/\s+/g, '').replace(/^tr/i, '').replace(/\D/g, '').length;
        let govde = girdi.value.replace(/\s+/g, '').toUpperCase();
        if (govde.startsWith(ONEK)) govde = govde.slice(2);
        govde = govde.replace(/\D/g, '').slice(0, 24);
        girdi.value = ibanBicimle(ONEK + govde);
        let yer = 2;
        let sayac = 0;
        while (yer < girdi.value.length && sayac < onceki) { if (/\d/.test(girdi.value[yer])) sayac += 1; yer += 1; }
        try { girdi.setSelectionRange(yer, yer); } catch { /* tür desteklemiyor */ }
      };
      const imleciKoru = () => {
        if (girdi.selectionStart !== null && girdi.selectionStart < 2) {
          try { girdi.setSelectionRange(2, Math.max(2, girdi.selectionEnd ?? 2)); } catch { /* yok */ }
        }
      };
      if (!girdi.value.replace(/\s+/g, '')) girdi.value = ONEK;
      girdi.addEventListener('input', duzelt);
      // Sayaç düzeltmeden sonra bağlanır, böylece temiz değeri sayar.
      haneSayaci(alan, girdi, 26, 'karakter', (d) => d.replace(/\s+/g, '').length);
      girdi.addEventListener('focus', () => { if (!girdi.value.replace(/\s+/g, '')) girdi.value = ONEK; imleciKoru(); });
      girdi.addEventListener('keyup', imleciKoru);
      girdi.addEventListener('click', imleciKoru);
      girdi.addEventListener('keydown', (olay) => {
        const bas = girdi.selectionStart ?? 0;
        const son = girdi.selectionEnd ?? 0;
        if ((olay.key === 'Backspace' && bas <= 2 && son <= 2) || (olay.key === 'Delete' && bas < 2)) olay.preventDefault();
        if (olay.key === 'Home' || (olay.key === 'ArrowLeft' && bas <= 2 && !olay.shiftKey)) { olay.preventDefault(); girdi.setSelectionRange(2, 2); }
      });

      girdi.addEventListener('blur', () => {
        const temiz = girdi.value.replace(/\s+/g, '');
        if (temiz === '' || temiz === ONEK) {
          return hataGoster(alan, girdi, alan.dataset.zorunlu !== undefined ? 'IBAN numaranızı yazın.' : null);
        }
        girdi.value = ibanBicimle(girdi.value);
        if (temiz.length !== 26) {
          return hataGoster(alan, girdi, `IBAN 26 karakter olmalıdır. ${temiz.length} karakter girdiniz.`);
        }
        hataGoster(
          alan,
          girdi,
          ibanGecerli(girdi.value) ? null : 'IBAN’ı kontrol edin. Bir hane hatalı görünüyor.'
        );
      });
      girdi.addEventListener('input', () => {
        if (girdi.getAttribute('aria-invalid') === 'true') hataGoster(alan, girdi, null);
      });
    })
  );
}

export function telefonBaslat(kok = document) {
  her('[data-kiris="telefon"]', kok).forEach((el) =>
    bir(el, 'telefon', (alan) => {
      const girdi = alan.querySelector('input');
      if (!girdi) return;
      const yalnizCep = alan.dataset.cep === 'zorunlu';

      // Numara yazılırken 3-3-2-2 öbeklerine ayrılır ve 10 haneyi geçemez.
      // Baştaki 0 ve +90 sessizce düşer. İmleç yazılan hanenin peşinde kalır.
      const bicimle = (n) => [n.slice(0, 3), n.slice(3, 6), n.slice(6, 8), n.slice(8, 10)].filter(Boolean).join(' ');
      const duzelt = () => {
        const imlec = girdi.selectionStart ?? girdi.value.length;
        const onceki = telefonNormalle(girdi.value.slice(0, imlec)).length;
        girdi.value = bicimle(telefonNormalle(girdi.value).slice(0, 10));
        let yer = 0;
        let sayac = 0;
        while (yer < girdi.value.length && sayac < onceki) { if (/\d/.test(girdi.value[yer])) sayac += 1; yer += 1; }
        try { girdi.setSelectionRange(yer, yer); } catch { /* tür desteklemiyor */ }
      };
      girdi.addEventListener('input', duzelt);
      if (girdi.value) duzelt();
      // Sayaç düzeltmeden sonra bağlanır, böylece temiz değeri sayar.
      haneSayaci(alan, girdi, 10, 'hane', (d) => telefonNormalle(d).length);
      girdi.addEventListener('blur', () => {
        if (girdi.value.trim() === '') {
          return hataGoster(alan, girdi, alan.dataset.zorunlu !== undefined ? 'Telefon numaranızı yazın.' : null);
        }
        const temiz = telefonNormalle(girdi.value);
        girdi.value = bicimle(temiz);
        const n = temiz.length;
        if (n !== 10) {
          return hataGoster(alan, girdi, `Telefon numarası 10 hane olmalıdır. ${n} hane girdiniz. Başındaki 0 gerekmez.`);
        }
        hataGoster(
          alan,
          girdi,
          telefonGecerli(temiz, { yalnizCep })
            ? null
            : yalnizCep
              ? 'Cep telefonu numarası 5 ile başlar.'
              : 'Telefon numarası 2, 3, 4 veya 5 ile başlar.'
        );
      });
      girdi.addEventListener('input', () => {
        if (girdi.getAttribute('aria-invalid') === 'true') hataGoster(alan, girdi, null);
      });
    })
  );
}

export function plakaBaslat(kok = document) {
  her('[data-kiris="plaka"]', kok).forEach((el) =>
    bir(el, 'plaka', (alan) => {
      const girdi = alan.querySelector('input');
      if (!girdi) return;
      girdi.addEventListener('blur', () => {
        if (girdi.value.trim() === '') return hataGoster(alan, girdi, null);
        girdi.value = plakaBicimle(girdi.value);
        hataGoster(
          alan,
          girdi,
          plakaDenetle(girdi.value).gecerli ? null : 'Plakayı kontrol edin. Örnek: 34 ABC 123.'
        );
      });
    })
  );
}

export function tarihBaslat(kok = document) {
  her('[data-kiris="tarih"]', kok).forEach((el) =>
    bir(el, 'tarih', (alan) => {
      const gun = alan.querySelector('[name="gun"]');
      const ay = alan.querySelector('[name="ay"]');
      const yil = alan.querySelector('[name="yil"]');
      if (!gun || !ay || !yil) return;

      const parcalar = { gun, ay, yil };
      const denetle = () => {
        const bos = !gun.value && !ay.value && !yil.value;
        if (bos) return hataGoster(alan, gun, null);
        const sonuc = tarihDenetle(
          { gun: gun.value, ay: ay.value, yil: yil.value },
          { gelecekYasak: alan.dataset.gelecek === 'yasak' }
        );
        hataGoster(alan, parcalar[sonuc.alan] ?? gun, sonuc.hata);
      };

      [gun, ay, yil].forEach((girdi) => {
        girdi.addEventListener('input', () => {
          girdi.value = girdi.value.replace(/\D/g, '');
        });
        girdi.addEventListener('blur', () => {
          // Üç alanın hepsi odaktan çıkınca denetle. Aksi halde kullanıcı
          // gün alanından çıkarken hata görür.
          setTimeout(() => {
            if (![gun, ay, yil].includes(document.activeElement)) denetle();
          }, 0);
        });
      });
    })
  );
}

// ---------------------------------------------------------------------------
// Adres. Bağlı listeler. Veri kaynağı ayrı verilir, burada sabit veri yoktur.
// ---------------------------------------------------------------------------

/**
 * @param {Document|Element} kok
 * @param {(ilKodu: string) => Promise<{kod: string, ad: string}[]>} [ilceGetir]
 */
export function adresBaslat(kok = document, ilceGetir) {
  her('[data-kiris="adres"]', kok).forEach((el) =>
    bir(el, 'adres', (alan) => {
      const il = alan.querySelector('[data-adres="il"]');
      const ilce = alan.querySelector('[data-adres="ilce"]');
      if (!il || !ilce || typeof ilceGetir !== 'function') return;

      il.addEventListener('change', async () => {
        ilce.innerHTML = '<option value="">Yükleniyor…</option>';
        ilce.setAttribute('aria-busy', 'true');
        try {
          const liste = await ilceGetir(il.value);
          ilce.innerHTML =
            '<option value="">Seçiniz</option>' +
            liste.map((k) => `<option value="${k.kod}">${k.ad}</option>`).join('');
        } catch {
          ilce.innerHTML = '<option value="">İlçeler yüklenemedi</option>';
        } finally {
          ilce.removeAttribute('aria-busy');
        }
      });
    })
  );
}

// ---------------------------------------------------------------------------
// KVKK açık rıza: gönderim denetimi
// ---------------------------------------------------------------------------

// Zorunlu onay boşken form gönderilemez. Kutu hata durumuna geçer, hata
// metni onay kutusunun üstünde görünür ve odak onay kutusuna gider.
// Kullanıcı kutuyu işaretleyince hata kalkar.
export function kvkkBaslat(kok = document) {
  her('[data-kiris="kvkk"]', kok).forEach((el) =>
    bir(el, 'kvkk', (kutu) => {
      const form = kutu.closest('form');
      const onay = kutu.querySelector('.kiris-onay[required]');
      if (!form || !onay) return;
      const metin = kutu.dataset.hataMetni || 'Devam etmek için verilerinizin işlenmesine izin vermeniz gerekir.';
      let hata = kutu.querySelector('.kiris-hata');
      if (!hata) {
        hata = document.createElement('p');
        hata.className = 'kiris-hata';
        hata.hidden = true;
        onay.closest('.kiris-secenek').insertAdjacentElement('beforebegin', hata);
      }
      const hataId = hata.id || `${onay.id || 'kvkk'}-hata`;
      hata.id = hataId;
      const goster = (acik) => {
        kutu.classList.toggle('kiris-kvkk--hata', acik);
        hata.hidden = !acik;
        if (acik) {
          hata.innerHTML = `<span class="kiris-gorsel-gizli">Hata:</span> ${metin}`;
          onay.setAttribute('aria-invalid', 'true');
          onay.setAttribute('aria-describedby', [onay.getAttribute('aria-describedby'), hataId].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(' '));
        } else {
          onay.removeAttribute('aria-invalid');
        }
      };
      form.addEventListener('submit', (olay) => {
        if (onay.checked) return;
        olay.preventDefault();
        goster(true);
        onay.focus();
      });
      onay.addEventListener('change', () => { if (onay.checked) goster(false); });
    })
  );
}

// ---------------------------------------------------------------------------
// Tek giriş noktası
// ---------------------------------------------------------------------------

export function baslat(kok = document, secenek = {}) {
  akordiyonBaslat(kok);
  sekmelerBaslat(kok);
  kipBaslat(kok);
  hataOzetiBaslat(kok);
  karakterSayaciBaslat(kok);
  dosyaBaslat(kok);
  baslikCubuguBaslat(kok);
  resmiAfisBaslat(kok);
  erisimMenusuBaslat(kok);
  kvkkBaslat(kok);
  kimlikNoBaslat(kok);
  vergiNoBaslat(kok);
  ibanBaslat(kok);
  telefonBaslat(kok);
  plakaBaslat(kok);
  tarihBaslat(kok);
  adresBaslat(kok, secenek.ilceGetir);
  parolaBaslat(kok);
  aranabilirBaslat(kok);
  aramaBaslat(kok);
  geciciBaslat(kok);
  cipBaslat(kok);
  acilirBilgiBaslat(kok);
  yanPanelBaslat(kok);
  eylemMenusuBaslat(kok);
  basaDonBaslat(kok);
  cerezBaslat(kok);
  cikisBaslat(kok);
  siralaBaslat(kok);
  aralikBaslat(kok);
  adetBaslat(kok);
  yazdirBaslat(kok);
  maskeBaslat(kok);
  takvimBaslat(kok);
  cokluSecimBaslat(kok);
  genisMenuBaslat(kok);
  kayanPanoBaslat(kok);
  yonlendirmeBaslat(kok);
  ipucuBaslat(kok);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => baslat());
  } else {
    baslat();
  }
}
