// Kimlik, gezinme, yerleşim, içerik ve geri bildirim parçaları.

const ETIKET_RENK = { mavi: 'trds-etiket--mavi', yesil: 'trds-etiket--yesil', kirmizi: 'trds-etiket--kirmizi', sari: 'trds-etiket--sari', gri: 'trds-etiket--gri' };

const menuBaglantilari = (h, ogeler) => ogeler.map((m) => h('a', { href: m.href ?? '#', 'aria-current': m.etkin ? 'page' : undefined }, m.ad));

export const yapiTanimlari = [
  // ------------------------------------------------------------------ kimlik
  {
    id: 'header', ad: 'BaslikCubugu', kok: 'trds-baslik-cubugu', davranis: 'baslik-cubugu',
    ornek: { kurum: 'Çalışma ve Sosyal Güvenlik Bakanlığı', menu: [{ ad: 'Hizmetler' }, { ad: 'Duyurular' }] },
    ciz: (h, { id: verilen, kurum, href = '/', arma = '/trds/turk-bayragi.svg', logo, menu = [], oturum, children }, y) => {
      const id = verilen ?? y.kimlik('menu');
      return h('header', { class: 'trds-baslik-cubugu', 'data-trds': 'baslik-cubugu' },
        h('div', { class: 'trds-kap trds-baslik-cubugu__ic' },
          h('a', { class: 'trds-baslik-cubugu__marka', href, 'aria-label': logo ? `${kurum} ana sayfa` : undefined },
            logo
              ? h('img', { class: y.bir('trds-baslik-cubugu__logo', logo.beyaz && 'trds-baslik-cubugu__logo--beyaz'), src: logo.src, alt: logo.alt ?? kurum, width: logo.genislik, height: logo.yukseklik })
              : [h('img', { class: 'trds-baslik-cubugu__arma', src: arma, alt: '', width: '48', height: '32' }), h('span', { class: 'trds-baslik-cubugu__ad' }, kurum)]
          ),
          oturum ? h('div', { class: 'trds-baslik-cubugu__oturum' },
            h('span', { class: 'trds-avatar trds-avatar--kucuk', 'aria-hidden': 'true' }, oturum.basHarf),
            h('span', { class: 'trds-baslik-cubugu__kullanici' }, oturum.ad),
            h('a', { class: 'trds-baslik-cubugu__cikis', href: oturum.cikisHref ?? '#' }, y.simge('logout'), ' Çıkış')
          ) : null,
          children,
          h('button', { class: 'trds-baslik-cubugu__menu-dugmesi', type: 'button', 'aria-expanded': 'false', 'aria-controls': id }, 'Menü'),
          h('nav', { class: 'trds-baslik-cubugu__menu', id, 'aria-label': 'Ana menü' }, ...menuBaglantilari(h, menu))
        )
      );
    }
  },
  {
    id: 'footer', ad: 'AltBilgi', kok: 'trds-alt-bilgi',
    ornek: { kurum: 'Sosyal Güvenlik Kurumu', ustKurum: 'Çalışma ve Sosyal Güvenlik Bakanlığı bağlı kuruluşudur.', kisaAd: 'SGK', baglantilar: [{ ad: 'KVKK' }] },
    ciz: (h, { kurum, ustKurum, logo, kisaAd, iletisim = [], sutunlar = [], baglantilar = [], sosyal = [], notMetni, telif, koyu = false, children }, y) =>
      h('footer', { class: y.bir('trds-alt-bilgi', koyu && 'trds-alt-bilgi--koyu') },
        h('div', { class: 'trds-kap' },
          kurum || iletisim.length ? h('div', { class: 'trds-alt-bilgi__ust' },
            kurum ? h('div', { class: 'trds-alt-bilgi__marka' },
              logo ? h('img', { class: y.bir('trds-alt-bilgi__logo', logo.genis && 'trds-alt-bilgi__logo--genis'), src: logo.src, alt: logo.alt ?? '', width: logo.genislik ?? '64', height: logo.yukseklik ?? '64' })
                   : h('span', { class: 'trds-alt-bilgi__monogram', 'aria-hidden': 'true' }, kisaAd ?? kurum),
              h('div', null, h('p', { class: 'trds-alt-bilgi__kurum' }, kurum), ustKurum ? h('p', { class: 'trds-alt-bilgi__ust-kurum' }, ustKurum) : null)
            ) : null,
            iletisim.length ? h('address', { class: 'trds-alt-bilgi__iletisim' },
              ...iletisim.map((i) => h('p', null, h('span', { class: 'trds-alt-bilgi__iletisim-etiket' }, i.etiket), i.href ? h('a', { href: i.href }, i.deger) : i.deger))
            ) : null
          ) : null,
          sutunlar.length ? h('div', { class: 'trds-alt-bilgi__sutunlar' },
            ...sutunlar.map((s) => h('div', null,
              h('p', { class: 'trds-alt-bilgi__sutun-baslik' }, s.baslik),
              h('ul', { class: 'trds-alt-bilgi__sutun-liste' }, ...s.baglantilar.map((b) => h('li', null, h('a', { href: b.href ?? '#' }, b.ad ?? b))))
            ))
          ) : null,
          notMetni ? h('p', { class: 'trds-alt-bilgi__not' }, notMetni) : null,
          h('div', { class: 'trds-alt-bilgi__satir' },
            h('nav', { class: 'trds-alt-bilgi__baglantilar', 'aria-label': 'Alt bilgi bağlantıları' }, ...baglantilar.map((b) => h('a', { href: b.href ?? '#' }, b.ad ?? b))),
            sosyal.length ? h('ul', { class: 'trds-alt-bilgi__sosyal', 'aria-label': 'Sosyal medya hesapları' },
              ...sosyal.map((s) => h('li', null, h('a', { href: s.href ?? '#', 'aria-label': s.ad }, y.simge(s.simge ?? 'mail'))))
            ) : null,
            children
          ),
          telif ? h('p', { class: 'trds-alt-bilgi__telif' }, telif) : null
        )
      )
  },
  {
    id: 'masthead', ad: 'ResmiAfis', kok: 'trds-resmi-afis', davranis: 'resmi-afis',
    ornek: {},
    ciz: (h, { id: verilen, bayrak = '/trds/turk-bayragi.svg', sag = false }, y) => {
      const id = verilen ?? y.kimlik('afis');
      return h('div', { class: y.bir('trds-resmi-afis', sag && 'trds-resmi-afis--sag'), 'data-trds': 'resmi-afis' },
        h('div', { class: 'trds-kap trds-resmi-afis__ic' },
          h('img', { class: 'trds-resmi-afis__bayrak', src: bayrak, alt: '' }),
          h('p', { class: 'trds-resmi-afis__metin' }, 'Bu, Türkiye Cumhuriyeti’ne ait resmî bir devlet sitesidir.'),
          h('button', { class: 'trds-resmi-afis__dugme', type: 'button', 'aria-expanded': 'false', 'aria-controls': id }, 'Nasıl anlarım?')
        ),
        h('div', { class: 'trds-resmi-afis__panel', id, hidden: true },
          h('div', { class: 'trds-kap trds-resmi-afis__panel-ic' },
            h('div', null, h('p', { class: 'trds-resmi-afis__panel-baslik' }, 'Adres ', h('strong', null, 'gov.tr'), ' ile biter'), h('p', null, 'Resmî devlet siteleri gov.tr uzantısını kullanır. Adres çubuğunu her zaman kontrol edin.')),
            h('div', null, h('p', { class: 'trds-resmi-afis__panel-baslik' }, 'Bağlantı ', h('strong', null, 'güvenlidir')), h('p', null, 'Adresin başında https ve kilit simgesi bulunur. Kimlik bilgilerinizi yalnız böyle sayfalara girin.'))
          )
        )
      );
    }
  },
  {
    id: 'identifier', ad: 'KurumTanitici', kok: 'trds-tanitici',
    ornek: { kurum: 'Sosyal Güvenlik Kurumu', ustKurum: 'Çalışma ve Sosyal Güvenlik Bakanlığı bağlı kuruluşudur.' },
    ciz: (h, { kurum, ustKurum, baglantilar = [{ ad: 'Hakkımızda' }, { ad: 'Bilgi edinme' }, { ad: 'CİMER' }] }) =>
      h('section', { class: 'trds-tanitici', 'aria-label': 'Kurum bilgisi' },
        h('div', { class: 'trds-kap trds-tanitici__ic' },
          h('div', null, h('p', { class: 'trds-tanitici__kurum' }, kurum), ustKurum ? h('p', { class: 'trds-tanitici__ust' }, ustKurum) : null),
          h('nav', { class: 'trds-tanitici__baglantilar', 'aria-label': 'Kurum bağlantıları' }, ...baglantilar.map((b) => h('a', { href: b.href ?? '#' }, b.ad)))
        )
      )
  },
  {
    id: 'logo', ad: 'KurumLogosu', kok: 'trds-logo',
    ornek: { src: '/trds/kurumlar/sgk.svg', alt: 'Sosyal Güvenlik Kurumu' },
    ciz: (h, { href = '/', src, alt, genislik, yukseklik, buyuk = false, kurum, ust = 'T.C.', arma = '/trds/turk-bayragi.svg' }, y) =>
      src
        ? h('a', { class: y.bir('trds-logo', buyuk && 'trds-logo--buyuk'), href }, h('img', { class: 'trds-logo__gorsel', src, alt, width: genislik, height: yukseklik }))
        : h('a', { class: 'trds-logo', href },
            h('img', { class: 'trds-logo__arma', src: arma, alt: '', width: '48', height: '32' }),
            h('span', { class: 'trds-logo__metin' }, h('span', { class: 'trds-logo__ust' }, ust), h('span', { class: 'trds-logo__ad' }, kurum))
          )
  },
  {
    id: 'phase-banner', ad: 'AsamaAfisi', kok: 'trds-asama',
    ornek: { asama: 'Beta', children: 'Bu yeni bir hizmettir.' },
    ciz: (h, { asama = 'Beta', renk = 'mavi', children }, y) =>
      h('div', { class: 'trds-asama' }, h('div', { class: 'trds-kap trds-asama__ic' }, h('span', { class: y.bir('trds-etiket', ETIKET_RENK[renk]) }, asama), h('p', { class: 'trds-asama__metin' }, children)))
  },
  {
    id: 'cookie-banner', ad: 'CerezBildirimi', kok: 'trds-cerez', davranis: 'cerez',
    ornek: { baslik: 'Bu sitede çerez kullanıyoruz', children: 'Zorunlu çerezler siteyi çalıştırır.' },
    ciz: (h, { baslik = 'Bu sitede çerez kullanıyoruz', children, cerezHref = '#', hepGoster = false }) =>
      h('div', { class: 'trds-cerez', role: 'region', 'aria-label': 'Çerez tercihi', 'data-trds': 'cerez', 'data-hep-goster': hepGoster ? '' : undefined },
        h('div', { class: 'trds-kap' },
          h('div', { class: 'trds-cerez__soru' },
            h('h2', { class: 'trds-cerez__baslik' }, baslik),
            h('p', { class: 'trds-govde' }, children),
            h('div', { class: 'trds-button-grubu' },
              h('button', { class: 'trds-button', type: 'button', 'data-cerez': 'kabul' }, 'İsteğe bağlı çerezleri kabul et'),
              h('button', { class: 'trds-button', type: 'button', 'data-cerez': 'ret' }, 'İsteğe bağlı çerezleri reddet'),
              h('a', { class: 'trds-link', href: cerezHref }, 'Çerezleri görüntüle')
            )
          ),
          h('div', { class: 'trds-cerez__onay', hidden: true },
            h('p', { class: 'trds-govde' }, h('span', { 'data-cerez-metin': '' }), ' Tercihinizi ', h('a', { class: 'trds-link', href: cerezHref }, 'çerez sayfasından'), ' değiştirebilirsiniz.'),
            h('button', { class: 'trds-button trds-button--ikincil', type: 'button', 'data-cerez-gizle': '' }, 'Mesajı gizle')
          )
        )
      )
  },
  {
    id: 'edevlet-giris', ad: 'EdevletGiris', kok: 'trds-edevlet',
    ornek: { href: '#' },
    ciz: (h, { href = '#', yardim = true, isaret = '/trds/e-devlet-isaret.png' }) =>
      h('div', { class: 'trds-edevlet' },
        h('a', { class: 'trds-edevlet__dugme', href }, h('span', { class: 'trds-edevlet__isaret', 'aria-hidden': 'true' }, h('img', { src: isaret, alt: '' })), h('span', null, 'e-Devlet ile giriş yap')),
        yardim ? h('p', { class: 'trds-edevlet__yardim' }, 'e-Devlet şifreniz yoksa ', h('a', { class: 'trds-link', href: 'https://www.turkiye.gov.tr/bilgilendirme?konu=sifre' }, 'PTT şubelerinden alabilirsiniz'), '.') : null
      )
  },
  {
    id: 'kvkk-onay', ad: 'KvkkOnayi', kok: 'trds-kvkk', davranis: 'kvkk',
    ornek: { aydinlatmaHref: '#' },
    // `hata` verilirse kutu hata durumunda çizilir. `data-trds="kvkk"` ile
    // çevreleyen form gönderilirken zorunlu onay denetlenir.
    ciz: (h, { id: verilen, baslik = 'Kişisel verilerinizin işlenmesi', aydinlatmaHref = '#', metin = 'Başvurunuzu değerlendirmek için kimlik ve iletişim bilgilerinizi işliyoruz.', zorunluMetin = 'Başvurumun değerlendirilmesi için verilerimin işlenmesine izin veriyorum.', istegeMetin = 'Yeni hizmetler hakkında bilgilendirme almak istiyorum', hata }, y) => {
      const id = verilen ?? y.kimlik('kvkk');
      return h('div', { class: y.bir('trds-kvkk', hata && 'trds-kvkk--hata'), 'data-trds': 'kvkk' },
        h('h2', { class: 'trds-kvkk__baslik' }, baslik),
        h('p', { class: 'trds-govde' }, metin, ' Ayrıntılar ', h('a', { class: 'trds-link', href: aydinlatmaHref, target: '_blank', rel: 'noopener' }, 'aydınlatma metninde'), ' yazılıdır (yeni sekmede açılır).'),
        hata ? h('p', { class: 'trds-hata', id: `${id}-hata` }, h('span', { class: 'trds-gorsel-gizli' }, 'Hata:'), ' ', hata) : null,
        h('div', { class: 'trds-secenek' }, h('input', { class: 'trds-onay', id: `${id}-zorunlu`, name: 'kvkk', type: 'checkbox', required: true, 'aria-invalid': hata ? 'true' : undefined, 'aria-describedby': hata ? `${id}-hata` : undefined }), h('label', { class: 'trds-secenek-etiket', for: `${id}-zorunlu` }, zorunluMetin)),
        h('div', { class: 'trds-secenek' }, h('input', { class: 'trds-onay', id: `${id}-istege`, name: 'kvkk_bilgilendirme', type: 'checkbox' }), h('label', { class: 'trds-secenek-etiket', for: `${id}-istege` }, istegeMetin, ' ', h('span', { class: 'trds-etiket__istege-bagli' }, '(isteğe bağlı)'), '.'))
      );
    }
  },
  {
    id: 'erisim-menusu', ad: 'ErisimMenusu', kok: 'trds-erisim', davranis: 'erisim-menusu',
    ornek: {},
    ciz: (h, { id: verilen, sag = false, etiket = 'Görünüm ayarları' }, y) => {
      const id = verilen ?? y.kimlik('erisim');
      const secenek = (veri, deger, ad, basili) => h('button', { class: 'trds-erisim__secenek', type: 'button', [veri]: deger, 'aria-pressed': basili ? 'true' : 'false' }, ad);
      return h('div', { class: y.bir('trds-erisim', sag && 'trds-erisim--sag'), 'data-trds': 'erisim-menusu' },
        h('button', { class: 'trds-erisim__dugme', type: 'button', 'aria-expanded': 'false', 'aria-controls': id }, etiket),
        h('div', { class: 'trds-erisim__panel', id, hidden: true },
          h('button', { class: 'trds-erisim__kapat', type: 'button', 'aria-label': 'Menüyü kapat' }, y.simge('close')),
          h('fieldset', { class: 'trds-erisim__grup' }, h('legend', null, 'Yazı boyutu'), secenek('data-yazi', 'normal', 'Normal', true), secenek('data-yazi', 'buyuk', 'Büyük'), secenek('data-yazi', 'cok-buyuk', 'Çok büyük')),
          h('fieldset', { class: 'trds-erisim__grup' }, h('legend', null, 'Tema'), secenek('data-tema', 'acik', 'Açık', true), secenek('data-tema', 'koyu', 'Koyu'), secenek('data-tema', 'yuksek', 'Yüksek karşıtlık'))
        )
      );
    }
  },

  // ----------------------------------------------------------------- gezinme
  {
    id: 'skip-link', ad: 'IceriyeAtla', kok: 'trds-atla',
    ornek: {},
    ciz: (h, { hedef = '#ana-icerik', children = 'Ana içeriğe geç' }) => h('a', { class: 'trds-atla', href: hedef }, children)
  },
  {
    id: 'breadcrumb', ad: 'SayfaYolu', kok: 'trds-yol',
    ornek: { ogeler: [{ ad: 'Ana sayfa', href: '/' }, { ad: 'Hizmetler', href: '#' }, { ad: 'Emeklilik başvurusu' }] },
    ciz: (h, { ogeler = [] }) =>
      h('nav', { class: 'trds-yol', 'aria-label': 'Sayfa yolu' },
        h('ol', { class: 'trds-yol__liste' }, ...ogeler.map((o, i) => h('li', null, i === ogeler.length - 1 ? h('span', { 'aria-current': 'page' }, o.ad) : h('a', { href: o.href ?? '#' }, o.ad))))
      )
  },
  {
    id: 'pagination', ad: 'Sayfalama', kok: 'trds-sayfalama',
    ornek: { sayfa: 2, toplam: 3 },
    ciz: (h, { sayfa = 1, toplam = 1, baglanti = (n) => `?sayfa=${n}`, etiket = 'Sayfalama' }) => {
      const sayfalar = [];
      for (let n = 1; n <= toplam; n += 1) sayfalar.push(h('a', { href: baglanti(n), 'aria-current': n === sayfa ? 'page' : undefined }, String(n)));
      return h('nav', { class: 'trds-sayfalama', 'aria-label': etiket },
        sayfa > 1 ? h('a', { class: 'trds-sayfalama__yon', href: baglanti(sayfa - 1) }, 'Önceki') : null,
        ...sayfalar,
        sayfa < toplam ? h('a', { class: 'trds-sayfalama__yon', href: baglanti(sayfa + 1) }, 'Sonraki') : null
      );
    }
  },
  {
    id: 'back-link', ad: 'GeriBaglantisi', kok: 'trds-geri',
    ornek: { href: '#', children: 'Geri' },
    ciz: (h, { href = '#', children = 'Geri', ileri }) =>
      ileri
        ? h('nav', { class: 'trds-geri-ileri', 'aria-label': 'Sayfa sırası' }, h('a', { class: 'trds-geri', href }, children), h('a', { class: 'trds-ileri', href: ileri.href }, ileri.ad))
        : h('a', { class: 'trds-geri', href }, children)
  },
  {
    id: 'step-indicator', ad: 'AdimGostergesi', kok: 'trds-adimlar',
    ornek: { adimlar: ['Kimlik doğrulama', 'Başvuru bilgileri', 'Belgeler'], etkin: 2 },
    ciz: (h, { adimlar = [], etkin = 1, etiket = 'Başvuru adımları' }, y) =>
      h('nav', { class: 'trds-adimlar', 'aria-label': etiket },
        h('p', { class: 'trds-adimlar__sayi' }, `Adım ${etkin} / ${adimlar.length}`),
        h('ol', { class: 'trds-adimlar__liste' }, ...adimlar.map((a, i) => h('li', { class: y.bir('trds-adimlar__oge', i + 1 < etkin && 'trds-adimlar__oge--bitti', i + 1 === etkin && 'trds-adimlar__oge--etkin'), 'aria-current': i + 1 === etkin ? 'step' : undefined }, a)))
      )
  },
  {
    id: 'side-navigation', ad: 'YanMenu', kok: 'trds-yan-menu',
    ornek: { etiket: 'Emeklilik bölümü', ogeler: [{ ad: 'Genel bilgi', href: '#' }, { ad: 'Başvuru', href: '#', etkin: true, alt: [{ ad: 'Gerekli belgeler', href: '#' }] }] },
    ciz: (h, { etiket = 'Bölüm menüsü', ogeler = [] }) => {
      const liste = (l) => h('ul', l === ogeler ? { class: 'trds-yan-menu__liste' } : null, ...l.map((o) => h('li', null, h('a', { href: o.href ?? '#', 'aria-current': o.etkin ? 'page' : undefined }, o.ad), o.alt ? liste(o.alt) : null)));
      return h('nav', { class: 'trds-yan-menu', 'aria-label': etiket }, liste(ogeler));
    }
  },
  {
    id: 'in-page-navigation', ad: 'SayfaIciGezinme', kok: 'trds-icindekiler',
    ornek: { ogeler: [{ ad: 'Başvuru koşulları', href: '#kosullar' }, { ad: 'Gerekli belgeler', href: '#belgeler' }] },
    ciz: (h, { id: verilen, baslik = 'Bu sayfada', ogeler = [] }, y) => {
      const id = verilen ?? y.kimlik('icindekiler');
      return h('nav', { class: 'trds-icindekiler', 'aria-labelledby': id },
        h('h2', { class: 'trds-icindekiler__baslik', id }, baslik),
        h('ol', { class: 'trds-icindekiler__liste' }, ...ogeler.map((o) => h('li', null, h('a', { href: o.href }, o.ad))))
      );
    }
  },
  {
    id: 'language-selector', ad: 'DilSecici', kok: 'trds-dil',
    ornek: { diller: [{ kod: 'tr', ad: 'Türkçe', etkin: true }, { kod: 'en', ad: 'English', href: '?dil=en' }] },
    ciz: (h, { diller = [] }) =>
      h('nav', { class: 'trds-dil', 'aria-label': 'Dil seçimi' },
        h('ul', { class: 'trds-dil__liste' }, ...diller.map((d) => h('li', null, d.etkin ? h('span', { 'aria-current': 'true', lang: d.kod }, d.ad) : h('a', { href: d.href ?? `?dil=${d.kod}`, lang: d.kod, hreflang: d.kod, dir: d.kod === 'ar' ? 'rtl' : undefined }, d.ad))))
      )
  },
  {
    id: 'search', ad: 'Arama', kok: 'trds-arama',
    ornek: { etiket: 'Sitede ara' },
    ciz: (h, { id: verilen, etiket = 'Sitede ara', ad = 'q', action = '#', koyu = false, buyuk = false, yerTutucu, oneriler, ...kalan }, y) => {
      const id = verilen ?? y.kimlik('arama');
      const form = h('form', { class: y.bir('trds-arama', koyu && 'trds-arama--koyu', buyuk && 'trds-arama--buyuk'), role: 'search', action, method: 'get' },
        h('label', { class: 'trds-etiket trds-gorsel-gizli', for: id }, etiket),
        h('input', { class: 'trds-girdi trds-arama__girdi', id, name: ad, type: 'search', placeholder: yerTutucu ?? etiket, autocomplete: 'off', role: oneriler ? 'combobox' : undefined, 'aria-autocomplete': oneriler ? 'list' : undefined, 'aria-expanded': oneriler ? 'false' : undefined, 'aria-controls': oneriler ? `${id}-liste` : undefined, ...kalan }),
        h('button', { class: 'trds-button trds-arama__dugme', type: 'submit' }, 'Ara')
      );
      if (!oneriler) return form;
      return h('div', { class: 'trds-arama-onerileri', 'data-trds': 'arama', 'data-kaynak': oneriler.kaynak, 'data-kaynak-id': oneriler.kaynakId },
        form,
        h('div', { class: 'trds-arama-onerileri__liste', id: `${id}-liste`, role: 'listbox', 'aria-label': 'Öneriler', hidden: true }),
        h('p', { class: 'trds-gorsel-gizli', 'data-trds-durum': '', 'aria-live': 'polite' })
      );
    }
  },
  {
    id: 'service-navigation', ad: 'HizmetGezinmesi', kok: 'trds-hizmet-gezinme',
    ornek: { hizmet: 'Emeklilik başvurusu', ogeler: [{ ad: 'Başvuru', etkin: true }, { ad: 'Belgeler' }] },
    ciz: (h, { hizmet, href = '#', ogeler = [] }) =>
      h('div', { class: 'trds-hizmet-gezinme' },
        h('div', { class: 'trds-kap trds-hizmet-gezinme__ic' },
          h('a', { class: 'trds-hizmet-gezinme__ad', href }, hizmet),
          h('nav', { 'aria-label': 'Hizmet menüsü' }, h('ul', { class: 'trds-hizmet-gezinme__liste' }, ...ogeler.map((o) => h('li', null, h('a', { href: o.href ?? '#', 'aria-current': o.etkin ? 'page' : undefined }, o.ad)))))
        )
      )
  },
  {
    id: 'bottom-navigation', ad: 'AltGezinme', kok: 'trds-alt-gezinme',
    ornek: { ogeler: [{ ad: 'Ana sayfa', simge: 'home', etkin: true }, { ad: 'Ara', simge: 'search' }] },
    ciz: (h, { ogeler = [], etiket = 'Ana bölümler' }, y) =>
      h('nav', { class: 'trds-alt-gezinme', 'aria-label': etiket }, ...ogeler.map((o) => h('a', { href: o.href ?? '#', 'aria-current': o.etkin ? 'page' : undefined }, y.simge(o.simge), h('span', null, o.ad))))
  },
  {
    id: 'back-to-top', ad: 'BasaDon', kok: 'trds-basa-don', davranis: 'basa-don',
    ornek: {},
    ciz: (h, { hedef = '#ana-icerik', hepGoster = false }, y) => h('a', { class: 'trds-basa-don', href: hedef, 'data-trds': 'basa-don', 'data-hep-goster': hepGoster ? '' : undefined }, y.simge('tool-back'), h('span', null, 'Başa dön'))
  },
  {
    id: 'mega-menu', ad: 'GenisMenu', kok: 'trds-genis-menu', davranis: 'genis-menu',
    ornek: { konular: [{ ad: 'Çalışan', sutunlar: [{ baslik: 'Sigortalılık', baglantilar: [{ ad: 'Hizmet dökümü' }] }] }, { ad: 'İletişim', href: '#' }] },
    ciz: (h, { id: verilen, konular = [], etiket = 'Ana konular' }, y) => {
      const id = verilen ?? y.kimlik('genis');
      return h('nav', { class: 'trds-genis-menu', 'aria-label': etiket, 'data-trds': 'genis-menu' },
        h('div', { class: 'trds-kap trds-genis-menu__ic' }, ...konular.map((k, i) => k.sutunlar
          ? h('button', { class: 'trds-genis-menu__dugme', type: 'button', 'aria-expanded': 'false', 'aria-controls': `${id}-${i}` }, k.ad)
          : h('a', { class: 'trds-genis-menu__dugme', href: k.href ?? '#' }, k.ad))),
        ...konular.filter((k) => k.sutunlar).map((k) => h('div', { class: 'trds-genis-menu__panel', id: `${id}-${konular.indexOf(k)}`, hidden: true },
          h('div', { class: 'trds-kap trds-genis-menu__sutunlar' }, ...k.sutunlar.map((s) => h('div', null, h('p', { class: 'trds-genis-menu__baslik' }, s.baslik), h('ul', { class: 'trds-genis-menu__liste' }, ...s.baglantilar.map((b) => h('li', null, h('a', { href: b.href ?? '#' }, b.ad)))))))
        ))
      );
    }
  },

  // ---------------------------------------------------------------- yerleşim
  {
    id: 'accordion', ad: 'Akordiyon', kok: 'trds-akordiyon', davranis: 'akordiyon',
    ornek: { bolumler: [{ baslik: 'Başvurum ne kadar sürede sonuçlanır?', icerik: 'Başvurular 15 iş günü içinde sonuçlanır.' }] },
    ciz: (h, { id: verilen, bolumler = [], seviye = 'h3' }, y) => {
      const id = verilen ?? y.kimlik('akordiyon');
      return h('div', { class: 'trds-akordiyon', 'data-trds': 'akordiyon' }, ...bolumler.map((b, i) =>
        h('div', { class: 'trds-akordiyon__bolum' },
          h(seviye, { class: 'trds-akordiyon__baslik' }, h('button', { class: 'trds-akordiyon__dugme', type: 'button', 'aria-expanded': b.acik ? 'true' : 'false', 'aria-controls': `${id}-${i}` }, b.baslik)),
          h('div', { class: 'trds-akordiyon__icerik', id: `${id}-${i}`, hidden: !b.acik }, typeof b.icerik === 'string' ? h('p', { class: 'trds-govde' }, b.icerik) : b.icerik)
        )));
    }
  },
  {
    id: 'tabs', ad: 'Sekmeler', kok: 'trds-sekmeler', davranis: 'sekmeler',
    ornek: { etiket: 'Başvuru bilgileri', sekmeler: [{ ad: 'Genel', icerik: 'Başvurunuz alındı.' }, { ad: 'Belgeler', icerik: 'İki belge eksik.' }] },
    ciz: (h, { id: verilen, etiket = 'Sekmeler', sekmeler = [] }, y) => {
      const id = verilen ?? y.kimlik('sekme');
      return h('div', { class: 'trds-sekmeler', 'data-trds': 'sekmeler' },
        h('div', { class: 'trds-sekmeler__liste', role: 'tablist', 'aria-label': etiket }, ...sekmeler.map((s, i) => h('button', { class: 'trds-sekmeler__dugme', role: 'tab', 'aria-selected': i === 0 ? 'true' : 'false', 'aria-controls': `${id}-p${i}`, id: `${id}-s${i}`, tabindex: i === 0 ? undefined : '-1' }, s.ad))),
        ...sekmeler.map((s, i) => h('div', { class: 'trds-sekmeler__panel', role: 'tabpanel', id: `${id}-p${i}`, 'aria-labelledby': `${id}-s${i}`, tabindex: '0', hidden: i !== 0 }, typeof s.icerik === 'string' ? h('p', { class: 'trds-govde' }, s.icerik) : s.icerik))
      );
    }
  },
  {
    id: 'details', ad: 'Ayrintilar', kok: 'trds-ayrinti',
    ornek: { ozet: 'T.C. kimlik numaramı nerede bulurum?', children: 'Nüfus cüzdanınızın ön yüzünde yazar.' },
    ciz: (h, { ozet, acik = false, children }) => h('details', { class: 'trds-ayrinti', open: acik || undefined }, h('summary', null, ozet), typeof children === 'string' ? h('p', { class: 'trds-govde' }, children) : children)
  },
  {
    id: 'modal', ad: 'KipPencere', kok: 'trds-kip', davranis: 'kip',
    ornek: { id: 'silme-onay', baslik: 'Başvuruyu silmek istiyor musunuz?', children: 'Bu işlem geri alınamaz.', acici: 'Başvuruyu sil' },
    ciz: (h, { id: verilen, baslik, children, acici, aciciTur = 'tehlike', onay = 'Onayla', vazgec = 'Vazgeç', uyari = false }, y) => {
      const id = verilen ?? y.kimlik('kip');
      const dugmeTur = { birincil: '', ikincil: 'trds-button--ikincil', tehlike: 'trds-button--tehlike' };
      return [
        acici ? h('button', { class: y.bir('trds-button', dugmeTur[aciciTur]), type: 'button', 'data-trds-ac': id }, acici) : null,
        h('dialog', { class: 'trds-kip', id, 'data-trds': 'kip', role: uyari ? 'alertdialog' : undefined, 'aria-labelledby': `${id}-baslik` },
          h('h2', { class: 'trds-kip__baslik', id: `${id}-baslik` }, baslik),
          typeof children === 'string' ? h('p', { class: 'trds-govde' }, children) : children,
          h('div', { class: 'trds-button-grubu' }, h('button', { class: y.bir('trds-button', dugmeTur[aciciTur]), type: 'button' }, onay), h('button', { class: 'trds-button trds-button--ikincil', type: 'button', 'data-trds-kapat': '' }, vazgec))
        )
      ];
    }
  },
  {
    id: 'drawer', ad: 'YanPanel', kok: 'trds-yan-panel', davranis: 'yan-panel',
    ornek: { baslik: 'Süzgeçler', acici: 'Süzgeçleri aç', children: 'İçerik' },
    ciz: (h, { id: verilen, baslik, acici, konum = 'sag', children, alt }, y) => {
      const id = verilen ?? y.kimlik('panel');
      return h('div', { 'data-trds': 'yan-panel' },
        acici ? h('button', { class: 'trds-button trds-button--ikincil', type: 'button', 'data-trds-panel-ac': '' }, acici) : null,
        h('dialog', { class: y.bir('trds-yan-panel', konum === 'alt' && 'trds-yan-panel--alt', konum === 'sol' && 'trds-yan-panel--sol'), 'aria-labelledby': `${id}-baslik` },
          h('div', { class: 'trds-yan-panel__ust' }, h('h2', { class: 'trds-yan-panel__baslik', id: `${id}-baslik` }, baslik), h('button', { class: 'trds-button trds-button--ikincil trds-button--simge', type: 'button', 'aria-label': 'Paneli kapat', 'data-trds-kapat': '' }, y.simge('close'))),
          h('div', { class: 'trds-yan-panel__govde' }, children),
          alt ? h('div', { class: 'trds-yan-panel__alt' }, alt) : null
        )
      );
    }
  },
  {
    id: 'card', ad: 'Kart', kok: 'trds-kart',
    ornek: { baslik: 'Emeklilik başvurusu', href: '#', ozet: 'Çevrim içi başvurun.' },
    ciz: (h, { baslik, href, ozet, kurum, simge, sade = false, seviye = 'h3', alt, children }, y) =>
      h('div', { class: y.bir('trds-kart', sade && 'trds-kart--sade') },
        simge ? h('span', { class: 'trds-kart__simge' }, y.simge(simge)) : null,
        kurum ? h('p', { class: 'trds-kart__kurum' }, kurum) : null,
        baslik ? h(seviye, { class: 'trds-kart__baslik' }, href ? h('a', { href }, baslik) : baslik) : null,
        ozet ? h('p', { class: 'trds-kart__ozet' }, ozet) : null,
        children,
        alt ? h('p', { class: 'trds-kart__alt' }, alt) : null
      )
  },
  {
    id: 'grid', ad: 'Izgara', kok: 'trds-izgara',
    ornek: { children: 'Sütunlar' },
    ciz: (h, { children, class: sinif }, y) => h('div', { class: y.bir('trds-izgara', sinif) }, children)
  },
  {
    id: 'container', ad: 'Kap', kok: 'trds-kap',
    ornek: { children: 'İçerik' },
    ciz: (h, { dar = false, children, class: sinif }, y) => h('div', { class: y.bir('trds-kap', dar && 'trds-kap--dar', sinif) }, children)
  },
  {
    id: 'divider', ad: 'Ayrac', kok: 'trds-ayrac',
    ornek: {},
    ciz: (h, { kalin = false }, y) => h('hr', { class: y.bir('trds-ayrac', kalin && 'trds-ayrac--kalin') })
  },
  {
    id: 'hero', ad: 'KarsilamaBlogu', kok: 'trds-kahraman',
    ornek: { baslik: 'Daima Yanınızda', ust: 'Sosyal Güvenlik Kurumu', metin: 'Sosyal güvenlik işlemleri tek adreste.' },
    ciz: (h, { ust, baslik, metin, koyu = false, eylemler, children }, y) =>
      h('section', { class: y.bir('trds-kahraman', koyu && 'trds-kahraman--koyu') },
        h('div', { class: 'trds-kap' },
          ust ? h('p', { class: 'trds-kahraman__ust' }, ust) : null,
          h('h1', { class: 'trds-kahraman__baslik' }, baslik),
          metin ? h('p', { class: 'trds-kahraman__metin' }, metin) : null,
          eylemler ? h('div', { class: 'trds-kahraman__eylemler' }, eylemler) : null,
          children
        )
      )
  },
  {
    id: 'section', ad: 'Bolum', kok: 'trds-bolum',
    ornek: { baslik: 'Duyurular', children: 'İçerik' },
    ciz: (h, { id: verilen, baslik, tumu, tumuHref = '#', yumusak = false, koyu = false, children }, y) => {
      const id = verilen ?? y.kimlik('bolum');
      return h('section', { class: y.bir('trds-bolum', yumusak && 'trds-bolum--yumusak', koyu && 'trds-bolum--koyu'), 'aria-labelledby': baslik ? id : undefined },
        h('div', { class: 'trds-kap' },
          baslik ? h('div', { class: 'trds-bolum__ust' }, h('h2', { class: 'trds-bolum__baslik', id }, baslik), tumu ? h('a', { class: 'trds-link', href: tumuHref }, 'Tümü', h('span', { class: 'trds-gorsel-gizli' }, `: ${tumu}`)) : null) : null,
          children
        )
      );
    }
  },
  {
    id: 'tile', ad: 'Karo', kok: 'trds-karo',
    ornek: { baslik: 'Emeklilik', simge: 'socialsecurity', aciklama: 'Başvuru, maaş.', href: '#' },
    ciz: (h, { href = '#', simge, baslik, aciklama, yatay = false }, y) =>
      h('a', { class: y.bir('trds-karo', yatay && 'trds-karo--yatay'), href }, simge ? h('span', { class: 'trds-karo__simge' }, y.simge(simge)) : null, h('span', { class: 'trds-karo__baslik' }, baslik), aciklama ? h('span', { class: 'trds-karo__aciklama' }, aciklama) : null)
  },
  {
    id: 'icon-card', ad: 'SimgeKarti', kok: 'trds-simge-kart',
    ornek: { ad: 'e-Hizmetler', simge: 'eservice', aciklama: 'Sorgulama, başvuru ve ödeme.' },
    ciz: (h, { href = '#', simge, ad, aciklama, class: sinif }, y) =>
      h('a', { class: y.bir('trds-simge-kart', sinif), href }, h('span', { class: 'trds-simge-kart__simge' }, y.simge(simge)), h('span', { class: 'trds-simge-kart__ad' }, ad), aciklama ? h('p', { class: 'trds-simge-kart__aciklama' }, aciklama) : null)
  },
  {
    id: 'carousel', ad: 'KayanPano', kok: 'trds-kayan-pano', davranis: 'kayan-pano',
    ornek: { ad: 'Tanıtımlar', slaytlar: ['Bir', 'İki', 'Üç'] },
    ciz: (h, { ad = 'Kayan pano', slaytlar = [], otomatik }, y) =>
      h('div', { class: 'trds-kayan-pano', 'data-trds': 'kayan-pano', 'data-ad': ad, 'data-otomatik': otomatik },
        h('div', { class: 'trds-kayan-pano__ust' },
          h('p', { class: 'trds-gorsel-gizli', 'data-trds-durum': '', 'aria-live': 'polite' }),
          h('div', { class: 'trds-kayan-pano__dugmeler' },
            h('button', { class: 'trds-button trds-button--ikincil trds-button--simge', type: 'button', 'data-yon': 'geri', 'aria-label': 'Önceki' }, y.simge('arrow-left')),
            h('button', { class: 'trds-button trds-button--ikincil trds-button--simge', type: 'button', 'data-yon': 'ileri', 'aria-label': 'Sonraki' }, y.simge('arrow-right')),
            h('button', { class: 'trds-button trds-button--ikincil trds-button--kucuk', type: 'button', 'data-durdur': '', 'aria-pressed': 'false' }, 'Durdur')
          )
        ),
        h('ul', { class: 'trds-kayan-pano__serit' }, ...slaytlar.map((s) => h('li', { class: 'trds-kayan-pano__slayt', tabindex: '-1' }, s))),
        h('div', { class: 'trds-kayan-pano__noktalar', 'aria-label': 'Slaytlar' })
      )
  },

  // ------------------------------------------------------------------ içerik
  {
    id: 'typography', ad: 'Baslik', kok: 'trds-baslik',
    ornek: { seviye: 1, children: 'Emeklilik başvurusu' },
    ciz: (h, { seviye = 2, ust, alt, children }, y) => [
      ust ? h('p', { class: 'trds-ust-baslik' }, ust) : null,
      h(`h${seviye}`, { class: y.bir('trds-baslik', `trds-baslik--${seviye}`) }, children),
      alt ? h('p', { class: 'trds-alt-baslik' }, alt) : null
    ]
  },
  {
    id: 'list', ad: 'Liste', kok: 'trds-liste',
    ornek: { ogeler: ['Nüfus cüzdanı', 'İkametgâh belgesi'] },
    ciz: (h, { tur = 'madde', aralikli = false, ogeler = [], children }, y) =>
      h(tur === 'sira' ? 'ol' : 'ul', { class: y.bir('trds-liste', `trds-liste--${tur}`, aralikli && 'trds-liste--aralikli') }, ...ogeler.map((o) => h('li', null, o)), children)
  },
  {
    id: 'table', ad: 'Tablo', kok: 'trds-tablo-kap',
    ornek: { baslik: 'Başvuru geçmişi', sutunlar: ['Tarih', 'İşlem'], satirlar: [['12.03.2026', 'Başvuru alındı']] },
    ciz: (h, { baslik, sutunlar = [], satirlar = [], sayisal = [] }, y) =>
      h('div', { class: 'trds-tablo-kap' },
        h('table', { class: 'trds-tablo' },
          baslik ? h('caption', null, baslik) : null,
          h('thead', null, h('tr', null, ...sutunlar.map((s, i) => h('th', { scope: 'col', class: sayisal.includes(i) ? 'trds-sayi' : undefined }, s)))),
          h('tbody', null, ...satirlar.map((r) => h('tr', null, ...r.map((c, i) => h('td', { class: sayisal.includes(i) ? 'trds-sayi' : undefined }, c)))))
        )
      )
  },
  {
    id: 'sortable-table', ad: 'SiralanabilirTablo', kok: 'trds-tablo-kap', davranis: 'sirala',
    ornek: { baslik: 'İl müdürlükleri', sutunlar: ['İl', 'Çalışan'], satirlar: [['İzmir', '1.940'], ['Ankara', '2.310']] },
    ciz: (h, { baslik, sutunlar = [], satirlar = [] }, y) =>
      h('div', { class: 'trds-tablo-kap' },
        h('table', { class: 'trds-tablo trds-tablo--siralanabilir', 'data-trds': 'sirala' },
          baslik ? h('caption', null, baslik) : null,
          h('thead', null, h('tr', null, ...sutunlar.map((s) => h('th', { scope: 'col', 'aria-sort': 'none' }, h('button', { type: 'button' }, s, ' ', y.simge('sort-up-down')))))),
          h('tbody', null, ...satirlar.map((r) => h('tr', null, ...r.map((c) => h('td', null, c)))))
        )
      )
  },
  {
    id: 'summary-list', ad: 'OzetListesi', kok: 'trds-ozet',
    ornek: { satirlar: [{ anahtar: 'Ad soyad', deger: 'Ayşe Yılmaz', eylem: { href: '#', ad: 'Değiştir' } }] },
    ciz: (h, { satirlar = [] }) =>
      h('dl', { class: 'trds-ozet' }, ...satirlar.map((s) => h('div', { class: 'trds-ozet__satir' },
        h('dt', { class: 'trds-ozet__anahtar' }, s.anahtar),
        h('dd', { class: 'trds-ozet__deger' }, s.deger),
        h('dd', { class: 'trds-ozet__eylem' }, s.eylem ? h('a', { href: s.eylem.href }, s.eylem.ad, h('span', { class: 'trds-gorsel-gizli' }, ` ${String(s.anahtar).toLocaleLowerCase('tr')}`)) : null)
      )))
  },
  {
    id: 'description-list', ad: 'TanimListesi', kok: 'trds-tanim',
    ornek: { satirlar: [{ ad: 'Başvuru numarası', deger: '2026-004512' }] },
    ciz: (h, { satirlar = [] }) => h('dl', { class: 'trds-tanim' }, ...satirlar.map((s) => h('div', { class: 'trds-tanim__satir' }, h('dt', null, s.ad), h('dd', null, s.deger))))
  },
  {
    id: 'tag', ad: 'Etiket', kok: 'trds-etiket',
    ornek: { renk: 'mavi', children: 'İnceleniyor' },
    ciz: (h, { renk = 'gri', children, class: sinif }, y) => h('span', { class: y.bir('trds-etiket', ETIKET_RENK[renk], sinif) }, children)
  },
  {
    id: 'badge', ad: 'Rozet', kok: 'trds-rozet',
    ornek: { children: 'Yeni', renk: 'kirmizi' },
    ciz: (h, { sayi = false, renk, children, class: sinif }, y) => h('span', { class: y.bir('trds-rozet', sayi && 'trds-rozet--sayi', renk && `trds-rozet--${renk}`, sinif) }, children)
  },
  {
    id: 'task-list', ad: 'GorevListesi', kok: 'trds-gorev-listesi',
    ornek: { gorevler: [{ ad: 'Kişisel bilgiler', href: '#', durum: 'Tamamlandı', renk: 'yesil' }] },
    ciz: (h, { id: verilen, gorevler = [] }, y) => {
      const id = verilen ?? y.kimlik('gorev');
      return h('ol', { class: 'trds-gorev-listesi' }, ...gorevler.map((g, i) => h('li', { class: 'trds-gorev-listesi__oge' }, h('a', { href: g.href ?? '#', 'aria-describedby': `${id}-${i}` }, g.ad), h('span', { class: y.bir('trds-etiket', ETIKET_RENK[g.renk ?? 'gri']), id: `${id}-${i}` }, g.durum))));
    }
  },
  {
    id: 'inset-text', ad: 'VurguluMetin', kok: 'trds-vurgu',
    ornek: { children: 'Yurt dışında yaşıyorsanız konsolosluk üzerinden başvurun.' },
    ciz: (h, { children }) => h('div', { class: 'trds-vurgu' }, typeof children === 'string' ? h('p', null, children) : children)
  },
  {
    id: 'icon', ad: 'Simge', kok: 'trds-simge',
    ornek: { ad: 'health' },
    ciz: (h, { ad, etiket, boyut }, y) => h('svg', { class: y.bir('trds-simge', boyut && `trds-simge--${boyut}`), role: etiket ? 'img' : undefined, 'aria-label': etiket, 'aria-hidden': etiket ? undefined : 'true' }, h('use', { href: `#trds-${ad}` }))
  },
  {
    id: 'stat', ad: 'Istatistik', kok: 'trds-istatistik',
    ornek: { kutular: [{ deger: '69.596.229', ad: 'Kayıtlı kullanıcı' }] },
    ciz: (h, { kutular = [] }) => h('div', { class: 'trds-istatistik' }, ...kutular.map((k) => h('div', { class: 'trds-istatistik__kutu' }, h('span', { class: 'trds-istatistik__deger' }, k.deger), h('span', { class: 'trds-istatistik__ad' }, k.ad))))
  },
  {
    id: 'avatar', ad: 'Avatar', kok: 'trds-avatar',
    ornek: { basHarf: 'AY', ad: 'Ayşe Yılmaz' },
    ciz: (h, { basHarf, ad, src, boyut, sayi = false }, y) =>
      h('span', { class: y.bir('trds-avatar', boyut && `trds-avatar--${boyut}`, sayi && 'trds-avatar--sayi'), 'aria-hidden': src ? undefined : 'true', title: ad }, src ? h('img', { src, alt: ad ?? '' }) : basHarf)
  },
  {
    id: 'blockquote', ad: 'Alinti', kok: 'trds-alinti',
    ornek: { children: 'Herkes, dilekçe hakkına sahiptir.', kaynak: 'Anayasa', eser: 'Madde 74' },
    ciz: (h, { children, kaynak, eser }) => h('figure', { class: 'trds-alinti' }, h('blockquote', { class: 'trds-alinti__metin' }, h('p', null, children)), kaynak ? h('figcaption', { class: 'trds-alinti__kaynak' }, kaynak, eser ? [', ', h('cite', null, eser)] : null) : null)
  },
  {
    id: 'figure', ad: 'Gorsel', kok: 'trds-gorsel',
    ornek: { src: '/trds/turk-bayragi.svg', alt: 'Türk bayrağı', altyazi: 'Bayrağın oranları kanunla belirlenir.' },
    ciz: (h, { src, alt, altyazi, genislik, yukseklik }) => h('figure', { class: 'trds-gorsel' }, h('img', { src, alt, width: genislik, height: yukseklik }), altyazi ? h('figcaption', { class: 'trds-gorsel__altyazi' }, altyazi) : null)
  },
  {
    id: 'timeline', ad: 'ZamanCizelgesi', kok: 'trds-zaman',
    ornek: { ogeler: [{ tarih: '4 Eylül 2026', iso: '2026-09-04', baslik: 'İnceleme başladı', etkin: true }] },
    ciz: (h, { ogeler = [] }, y) => h('ol', { class: 'trds-zaman' }, ...ogeler.map((o) => h('li', { class: y.bir('trds-zaman__oge', o.etkin && 'trds-zaman__oge--etkin') }, h('time', { class: 'trds-zaman__tarih', datetime: o.iso }, o.tarih), h('p', { class: 'trds-zaman__baslik' }, o.baslik), o.metin ? h('p', { class: 'trds-zaman__metin' }, o.metin) : null)))
  },
  {
    id: 'callout', ad: 'BilgiKutusu', kok: 'trds-bilgi-kutusu',
    ornek: { baslik: 'Son gün 31 Mart', children: 'Beyannameyi 31 Mart’a kadar verin.' },
    ciz: (h, { baslik, simge = 'information', notr = false, seviye = 'h3', children }, y) => h('div', { class: y.bir('trds-bilgi-kutusu', notr && 'trds-bilgi-kutusu--notr') }, h(seviye, { class: 'trds-bilgi-kutusu__baslik' }, y.simge(simge), ' ', baslik), typeof children === 'string' ? h('p', { class: 'trds-govde trds-u-alt-0' }, children) : children)
  },
  {
    id: 'date-modified', ad: 'SonGuncelleme', kok: 'trds-guncelleme',
    ornek: { tarih: '6 Eylül 2026', iso: '2026-09-06' },
    ciz: (h, { tarih, iso }) => h('p', { class: 'trds-guncelleme' }, 'Son güncelleme: ', h('time', { datetime: iso }, tarih))
  },
  {
    id: 'code', ad: 'Kod', kok: 'trds-kod',
    ornek: { children: 'node build.mjs' },
    ciz: (h, { blok = false, children }) => blok ? h('pre', { class: 'trds-kod-blok' }, h('code', null, children)) : h('code', { class: 'trds-kod' }, children)
  },
  {
    id: 'collection', ad: 'KayitListesi', kok: 'trds-kayitlar',
    ornek: { kayitlar: [{ ust: '2 Eylül 2026 · GSS', baslik: 'Duyuru 2026/34', href: '#' }] },
    ciz: (h, { kayitlar = [] }, y) => h('ul', { class: 'trds-kayitlar' }, ...kayitlar.map((k) => h('li', { class: 'trds-kayit' },
      k.ust ? h('p', { class: 'trds-kayit__ust' }, k.ust) : null,
      h('h3', { class: 'trds-kayit__baslik' }, h('a', { href: k.href ?? '#' }, k.baslik)),
      k.ozet ? h('p', { class: 'trds-kayit__ozet' }, k.ozet) : null,
      k.etiketler ? h('p', { class: 'trds-kayit__etiketler' }, ...k.etiketler.map((e) => h('span', { class: y.bir('trds-etiket', ETIKET_RENK[e.renk ?? 'gri']) }, e.ad))) : null
    )))
  },
  {
    id: 'icon-list', ad: 'SimgeliListe', kok: 'trds-simgeli-liste',
    ornek: { ogeler: [{ simge: 'identity', ad: 'T.C. kimlik kartı' }] },
    ciz: (h, { ogeler = [] }, y) => h('ul', { class: 'trds-simgeli-liste' }, ...ogeler.map((o) => h('li', null, y.simge(o.simge), h('span', null, o.ad))))
  },
  {
    id: 'process-list', ad: 'SurecListesi', kok: 'trds-surec',
    ornek: { adimlar: [{ baslik: 'Belgeleri hazırlayın', metin: 'Kimlik ve ikametgâh.' }] },
    ciz: (h, { adimlar = [], seviye = 'h3' }) => h('ol', { class: 'trds-surec' }, ...adimlar.map((a) => h('li', { class: 'trds-surec__adim' }, h(seviye, { class: 'trds-surec__baslik' }, a.baslik), a.metin ? h('p', { class: 'trds-surec__metin' }, a.metin) : null)))
  },
  {
    id: 'follow', ad: 'TakipEt', kok: 'trds-takip',
    ornek: { sosyal: [{ ad: 'X', simge: 'twitter' }] },
    ciz: (h, { id: verilen, bultenBaslik = 'Bültene abone olun', bultenMetin = 'Ayda bir e-posta. İstediğiniz zaman ayrılın.', action = '#', sosyalBaslik = 'Bizi takip edin', sosyal = [] }, y) => {
      const id = verilen ?? y.kimlik('bulten');
      return h('div', { class: 'trds-takip' },
        h('form', { class: 'trds-takip__bulten', action, method: 'post' },
          h('h3', { class: 'trds-takip__baslik' }, bultenBaslik), h('p', { class: 'trds-govde' }, bultenMetin),
          h('div', { class: 'trds-alan' }, h('label', { class: 'trds-etiket', for: id }, 'E-posta adresiniz'), h('input', { class: 'trds-girdi', id, name: 'eposta', type: 'email', autocomplete: 'email' })),
          h('button', { class: 'trds-button', type: 'submit' }, 'Abone ol')
        ),
        h('div', { class: 'trds-takip__sosyal' }, h('h3', { class: 'trds-takip__baslik' }, sosyalBaslik), h('ul', { class: 'trds-paylas__liste' }, ...sosyal.map((s) => h('li', null, h('a', { href: s.href ?? '#', 'aria-label': s.ad }, y.simge(s.simge))))))
      );
    }
  },
  {
    id: 'audio', ad: 'Ses', kok: 'trds-ses',
    ornek: { baslik: 'Açıklama, 4 dakika', src: '#', dokum: 'Döküm metni' },
    ciz: (h, { baslik, src, dokum }) => h('div', { class: 'trds-ses' }, h('p', { class: 'trds-ses__baslik' }, baslik), h('audio', { class: 'trds-ses__oynatici', controls: true, preload: 'none', src }), dokum ? h('details', { class: 'trds-ayrinti' }, h('summary', null, 'Döküm'), typeof dokum === 'string' ? h('p', { class: 'trds-govde' }, dokum) : dokum) : null)
  },
  {
    id: 'video', ad: 'Video', kok: 'trds-video',
    ornek: { altyazi: 'Tören, 12 dakika', src: '#', dokum: 'Döküm' },
    ciz: (h, { src, poster, altyaziSrc, altyazi, dokum, iframe }) => h('div', { class: 'trds-video' },
      h('div', { class: 'trds-video__kap' }, iframe ? h('iframe', { src: iframe, title: altyazi, allowfullscreen: true }) : h('video', { class: 'trds-video__oynatici', controls: true, preload: 'metadata', poster, src }, altyaziSrc ? h('track', { kind: 'captions', srclang: 'tr', label: 'Türkçe', src: altyaziSrc }) : null)),
      altyazi ? h('p', { class: 'trds-video__altyazi' }, altyazi) : null,
      dokum ? h('details', { class: 'trds-ayrinti' }, h('summary', null, 'Döküm'), typeof dokum === 'string' ? h('p', { class: 'trds-govde' }, dokum) : dokum) : null)
  },

  // ------------------------------------------------------------ geri bildirim
  {
    id: 'alert', ad: 'Uyari', kok: 'trds-uyari',
    ornek: { tur: 'bilgi', children: 'Başvurunuz alındı.' },
    ciz: (h, { tur = 'bilgi', children }) => h('div', { class: `trds-uyari trds-uyari--${tur}`, role: tur === 'hata' ? 'alert' : 'status' }, typeof children === 'string' ? h('p', null, children) : children)
  },
  {
    id: 'notification-banner', ad: 'BildirimAfisi', kok: 'trds-afis',
    ornek: { baslik: 'Önemli', children: 'Sistem bakımı 14 Mart 02:00 ile 05:00 arasında.', acil: true },
    ciz: (h, { id: verilen, baslik = 'Önemli', acil = false, children }, y) => {
      const id = verilen ?? y.kimlik('afis');
      return h('div', { class: y.bir('trds-afis', acil && 'trds-afis--acil'), role: 'region', 'aria-labelledby': id }, h('h2', { class: 'trds-afis__baslik', id }, baslik), typeof children === 'string' ? h('p', null, children) : children);
    }
  },
  {
    id: 'error-summary', ad: 'HataOzeti', kok: 'trds-hata-ozeti', davranis: 'hata-ozeti',
    ornek: { hatalar: [{ hedef: '#kimlik', metin: 'T.C. kimlik numarası 11 hane olmalıdır' }] },
    ciz: (h, { baslik = 'Bir sorun var', hatalar = [] }) => hatalar.length === 0 ? null : h('div', { class: 'trds-hata-ozeti', 'data-trds': 'hata-ozeti', role: 'alert', tabindex: '-1' }, h('h2', { class: 'trds-hata-ozeti__baslik' }, baslik), h('ul', { class: 'trds-hata-ozeti__liste' }, ...hatalar.map((e) => h('li', null, h('a', { href: e.hedef }, e.metin)))))
  },
  {
    id: 'spinner', ad: 'Yukleniyor', kok: 'trds-yukleniyor',
    ornek: { children: 'Başvurunuz sorgulanıyor' },
    ciz: (h, { children = 'Yükleniyor' }) => h('div', { class: 'trds-yukleniyor', role: 'status' }, h('span', { class: 'trds-yukleniyor__halka', 'aria-hidden': 'true' }), h('span', null, children))
  },
  {
    id: 'progress', ad: 'Ilerleme', kok: 'trds-ilerleme',
    ornek: { deger: 60, etiket: 'ikametgah.pdf yükleniyor' },
    ciz: (h, { id: verilen, deger = 0, etiket, daire = false }, y) => {
      const id = verilen ?? y.kimlik('ilerleme');
      if (daire) return h('div', { class: 'trds-ilerleme-daire', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(deger), 'aria-label': etiket, style: `--trds-ilerleme: ${deger}` }, h('span', { class: 'trds-ilerleme-daire__deger' }, `%${deger}`));
      return h('div', { class: 'trds-ilerleme' }, h('div', { class: 'trds-ilerleme__ust' }, h('span', { id }, etiket), h('span', { class: 'trds-ilerleme__deger' }, `%${deger}`)), h('progress', { class: 'trds-ilerleme__cubuk', value: deger, max: 100, 'aria-labelledby': id }, `%${deger}`));
    }
  },
  {
    id: 'tooltip', ad: 'Ipucu', kok: 'trds-ipucu-kap', davranis: 'ipucu',
    ornek: { metin: 'Bu sayfayı yazıcıya gönderir', children: 'Yazdır' },
    ciz: (h, { id: verilen, metin, children }, y) => {
      const id = verilen ?? y.kimlik('ipucu');
      return h('span', { class: 'trds-ipucu-kap', 'data-trds': 'ipucu' }, h('button', { class: 'trds-button trds-button--ikincil', type: 'button', 'aria-describedby': id }, children), h('span', { class: 'trds-ipucu', id, role: 'tooltip', hidden: true }, metin));
    }
  },
  {
    id: 'toast', ad: 'GeciciBildirim', kok: 'trds-gecici-alan', davranis: 'gecici',
    ornek: { bildirimler: [{ metin: 'Başvurunuz kaydedildi.', tur: 'basari' }] },
    ciz: (h, { bildirimler = [] }, y) => h('div', { class: 'trds-gecici-alan', role: 'status', 'aria-live': 'polite', 'data-trds': 'gecici' }, ...bildirimler.map((b) => h('div', { class: y.bir('trds-gecici', b.tur && `trds-gecici--${b.tur}`), 'data-sure': b.sure }, h('p', { class: 'trds-gecici__metin' }, b.metin), h('button', { class: 'trds-gecici__kapat', type: 'button', 'aria-label': 'Bildirimi kapat' }, y.simge('close')))))
  },
  {
    id: 'skeleton', ad: 'Iskelet', kok: 'trds-iskelet',
    ornek: { tur: 'satir' },
    ciz: (h, { tur = 'satir', kisa = false }, y) => h('span', { class: y.bir('trds-iskelet', `trds-iskelet--${tur}`, kisa && 'trds-iskelet--kisa') })
  },
  {
    id: 'warning-text', ad: 'UyariMetni', kok: 'trds-uyari-metni',
    ornek: { children: 'Başvurunuzu 30 gün içinde tamamlayın.' },
    ciz: (h, { children }) => h('div', { class: 'trds-uyari-metni' }, h('span', { class: 'trds-uyari-metni__simge', 'aria-hidden': 'true' }, '!'), h('p', { class: 'trds-uyari-metni__metin' }, h('span', { class: 'trds-gorsel-gizli' }, 'Uyarı:'), ' ', children))
  },
  {
    id: 'panel', ad: 'SonucPaneli', kok: 'trds-panel',
    ornek: { baslik: 'Başvurunuz alındı', referans: '2026-EM-004512' },
    ciz: (h, { baslik, referans, referansEtiketi = 'Başvuru numaranız', children }) => h('div', { class: 'trds-panel' }, h('h1', { class: 'trds-panel__baslik' }, baslik), h('div', { class: 'trds-panel__govde' }, referans ? [h('span', { class: 'trds-gorsel-gizli' }, referansEtiketi), h('strong', null, referans)] : null, children))
  },
  {
    id: 'popover', ad: 'AcilirBilgi', kok: 'trds-acilir-bilgi', davranis: 'acilir-bilgi',
    ornek: { etiket: 'Vergi kimlik numarası nedir?', children: '10 haneli numara.' },
    ciz: (h, { id: verilen, etiket, simge = 'question23', children }, y) => {
      const id = verilen ?? y.kimlik('acilir');
      return h('div', { class: 'trds-acilir-bilgi', 'data-trds': 'acilir-bilgi' },
        h('button', { class: 'trds-acilir-bilgi__dugme', type: 'button', 'aria-expanded': 'false', 'aria-controls': id }, y.simge(simge), h('span', { class: 'trds-gorsel-gizli' }, etiket)),
        h('div', { class: 'trds-acilir-bilgi__panel', id, role: 'region', 'aria-live': 'polite', hidden: true }, typeof children === 'string' ? h('p', { class: 'trds-govde' }, children) : children, h('button', { class: 'trds-button trds-button--ikincil trds-button--kucuk', type: 'button', 'data-trds-kapat': '' }, 'Kapat'))
      );
    }
  },
  {
    id: 'coach-mark', ad: 'Yonlendirme', kok: 'trds-yonlendirme', davranis: 'yonlendirme',
    ornek: { baslat: 'Sayfayı tanıt', children: 'Adımlar' },
    ciz: (h, { baslat = 'Sayfayı tanıt', children }) => h('div', { class: 'trds-yonlendirme', 'data-trds': 'yonlendirme' }, h('button', { class: 'trds-button trds-button--ikincil', type: 'button', 'data-yonlendirme-baslat': '' }, baslat), children)
  },

  // ------------------------------------------------------------------- eylem
  {
    id: 'action-menu', ad: 'EylemMenusu', kok: 'trds-eylem-menusu', davranis: 'eylem-menusu',
    ornek: { etiket: 'Eylemler', eylemler: [{ ad: 'Düzenle', simge: 'tool-edit' }, { ad: 'Sil', simge: 'close', tehlike: true }] },
    ciz: (h, { id: verilen, etiket = 'Eylemler', eylemler = [], sag = false }, y) => {
      const id = verilen ?? y.kimlik('eylem');
      return h('div', { class: y.bir('trds-eylem-menusu', sag && 'trds-eylem-menusu--sag'), 'data-trds': 'eylem-menusu' },
        h('button', { class: 'trds-button trds-button--ikincil', type: 'button', id: `${id}-dugme`, 'aria-haspopup': 'menu', 'aria-expanded': 'false', 'aria-controls': id }, etiket, ' ', y.simge('tool-down')),
        h('div', { class: 'trds-eylem-menusu__liste', id, role: 'menu', 'aria-labelledby': `${id}-dugme`, hidden: true }, ...eylemler.map((e) => h(e.href ? 'a' : 'button', { class: y.bir('trds-eylem-menusu__oge', e.tehlike && 'trds-eylem-menusu__oge--tehlike'), role: 'menuitem', type: e.href ? undefined : 'button', href: e.href, onClick: e.onClick }, e.simge ? y.simge(e.simge) : null, e.simge ? ' ' : null, e.ad)))
      );
    }
  },
  {
    id: 'download-link', ad: 'IndirmeBaglantisi', kok: 'trds-indir',
    ornek: { href: '#', ad: 'Başvuru formu', bilgi: 'PDF, 240 KB' },
    ciz: (h, { href, ad, bilgi }, y) => h('a', { class: 'trds-indir', href, download: true }, y.simge('tool-down'), h('span', { class: 'trds-indir__ad' }, ad), h('span', { class: 'trds-indir__bilgi' }, bilgi))
  },
  {
    id: 'share', ad: 'Paylas', kok: 'trds-paylas',
    ornek: { kanallar: [{ ad: 'X’te paylaş', simge: 'twitter', href: '#' }] },
    ciz: (h, { baslik = 'Paylaş', kanallar = [] }, y) => h('div', { class: 'trds-paylas' }, h('p', { class: 'trds-paylas__baslik' }, baslik), h('ul', { class: 'trds-paylas__liste' }, ...kanallar.map((k) => h('li', null, h('a', { href: k.href ?? '#', 'aria-label': k.ad }, y.simge(k.simge))))))
  },
  {
    id: 'fab', ad: 'YuzenDugme', kok: 'trds-yuzen',
    ornek: { href: '#', simge: 'date', children: 'Randevu al' },
    ciz: (h, { href = '#', simge, children }, y) => h('a', { class: 'trds-yuzen', href }, simge ? y.simge(simge) : null, h('span', null, children))
  },
  {
    id: 'exit-this-page', ad: 'SayfadanCik', kok: 'trds-cikis', davranis: 'cikis',
    ornek: {},
    ciz: (h, { href = 'https://www.mgm.gov.tr' }) => h('div', { class: 'trds-cikis', 'data-trds': 'cikis' }, h('a', { class: 'trds-cikis__dugme', href, rel: 'nofollow noreferrer' }, h('span', { class: 'trds-cikis__ust' }, 'Acil'), ' Sayfadan çık'), h('p', { class: 'trds-gorsel-gizli', 'data-trds-durum': '', 'aria-live': 'polite' }))
  },
  {
    id: 'print', ad: 'Yazdir', kok: 'trds-button', davranis: 'yazdir',
    ornek: {},
    ciz: (h, { children = 'Bu sayfayı yazdır' }, y) => h('button', { class: 'trds-button trds-button--ikincil', type: 'button', 'data-trds': 'yazdir' }, y.simge('tool-print'), ' ', children)
  }
];
