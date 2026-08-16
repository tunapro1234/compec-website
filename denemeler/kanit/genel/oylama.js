/* COMPEC website hub'i icin begen / begenme parcacigi.
   KULLANIM (hub sayfasina eklenir):
     <div data-compec-oy="v1"></div>
     <div data-compec-oy="v2"></div>
     <script src="/website/v2/genel/oylama.js" defer></script>
   Stiller satir ici verilir, hub'in kendi CSS'ine bagimli degildir. */
(function () {
  var UC = '/website/v2/api/oy';

  /* --- ayirt edici istemci verisi --- */
  function parmakIzi() {
    var p = [];
    try {
      p.push(navigator.userAgent, navigator.language, (navigator.languages || []).join(','),
        screen.width + 'x' + screen.height + 'x' + (screen.colorDepth || ''),
        window.devicePixelRatio, new Date().getTimezoneOffset(),
        navigator.hardwareConcurrency || '', navigator.deviceMemory || '',
        navigator.maxTouchPoints || '', navigator.platform || '');
      var c = document.createElement('canvas');
      c.width = 200; c.height = 40;
      var x = c.getContext('2d');
      x.textBaseline = 'top';
      x.font = "14px 'Arial'";
      x.fillStyle = '#1a5eaa';
      x.fillRect(0, 0, 200, 20);
      x.fillStyle = '#fff';
      x.fillText('compec-oy-ölçüm', 2, 2);
      p.push(c.toDataURL().slice(-80));
      var gl = document.createElement('canvas').getContext('webgl');
      if (gl) {
        var d = gl.getExtension('WEBGL_debug_renderer_info');
        if (d) p.push(gl.getParameter(d.UNMASKED_RENDERER_WEBGL));
      }
    } catch (e) { /* yoksay */ }
    var s = p.join('|'), h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h * 16777619) >>> 0; }
    return h.toString(16) + '-' + s.length.toString(16);
  }

  function istemciVerisi() {
    var d = {};
    try {
      d.ekran = screen.width + 'x' + screen.height + '@' + (window.devicePixelRatio || 1);
      d.saat_dilimi = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      d.platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
      d.parmak_izi = parmakIzi();
    } catch (e) { /* yoksay */ }
    return d;
  }

  /* --- arayuz --- */
  var D = 'display:inline-flex;align-items:center;gap:7px;padding:8px 14px;border-radius:6px;' +
          'border:1px solid rgba(125,125,125,.42);background:transparent;cursor:pointer;' +
          'font:500 14px/1 ui-sans-serif,system-ui,sans-serif;color:inherit;transition:all .15s';

  function simge(yukari) {
    return yukari
      ? '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M2 21h4V9H2v12zm20-11a2 2 0 0 0-2-2h-6.3l.95-4.57.03-.32a1.5 1.5 0 0 0-.44-1.06L13.17 1 6.59 7.59A2 2 0 0 0 6 9v10a2 2 0 0 0 2 2h9a2 2 0 0 0 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>'
      : '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M22 3h-4v12h4V3zM2 14a2 2 0 0 0 2 2h6.3l-.95 4.57-.03.32c0 .41.17.79.44 1.06L10.83 23l6.58-6.59A2 2 0 0 0 18 15V5a2 2 0 0 0-2-2H7a2 2 0 0 0-1.84 1.22L2.14 11.27c-.09.23-.14.47-.14.73v2z"/></svg>';
  }

  var kutular = [].slice.call(document.querySelectorAll('[data-compec-oy]'));
  if (!kutular.length) return;

  var durum = { ozet: {}, benim: {} };

  function ciz() {
    kutular.forEach(function (kutu) {
      var surum = kutu.getAttribute('data-compec-oy');
      var o = durum.ozet[surum] || { begeni: 0, begenmeme: 0 };
      var benim = durum.benim[surum];
      kutu.innerHTML =
        '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
          '<button type="button" data-oy="1" style="' + D +
            (benim === 1 ? ';border-color:#1A5EAA;background:rgba(26,94,170,.12);color:#1A5EAA' : '') + '">' +
            simge(true) + '<span>' + o.begeni + '</span></button>' +
          '<button type="button" data-oy="-1" style="' + D +
            (benim === -1 ? ';border-color:#B4342A;background:rgba(180,52,42,.1);color:#B4342A' : '') + '">' +
            simge(false) + '<span>' + o.begenmeme + '</span></button>' +
          '<span data-bilgi style="font:400 12px/1.4 ui-monospace,monospace;opacity:.62"></span>' +
        '</div>';
      kutu.querySelectorAll('button').forEach(function (d) {
        var deger = Number(d.dataset.oy);
        if (benim === deger) d.title = 'Oyunu geri almak için tekrar bas';
        d.addEventListener('click', function () { oyVer(surum, deger, kutu); });
      });
    });
  }

  /* Oy alanını içeren KARTI bul: oy alanından yukarı çıkıp, tüm kartların ortak
     kabının doğrudan çocuğu olan öğeyi döndür. Sınıf adına bağımlı değil, hub'ın
     işaretlemesi değişse de çalışır. */
  function ortakKap() {
    if (kutular.length < 2) return null;
    var a = kutular[0].parentElement;
    while (a) {
      var hepsi = true;
      for (var i = 1; i < kutular.length; i++) if (!a.contains(kutular[i])) { hepsi = false; break; }
      if (hepsi) return a;
      a = a.parentElement;
    }
    return null;
  }

  function kartBul(kutu, kap) {
    var oge = kutu;
    while (oge.parentElement && oge.parentElement !== kap) oge = oge.parentElement;
    return oge.parentElement === kap ? oge : null;
  }

  /* Beğenisi fazla olan sürüm yukarıda dursun. Yalnızca SAYFA AÇILIŞINDA sıralanır;
     oy verdikten hemen sonra sıra değiştirilmez, yoksa kart imlecin altından kayar. */
  function sirala() {
    var kap = ortakKap();
    if (!kap) return;
    var satirlar = [];
    for (var i = 0; i < kutular.length; i++) {
      var surum = kutular[i].getAttribute('data-compec-oy');
      var kart = kartBul(kutular[i], kap);
      if (!kart) return;                       // beklenmeyen yapı, hiç dokunma
      var o = durum.ozet[surum] || { begeni: 0, begenmeme: 0, toplam: 0 };
      satirlar.push({ kart: kart, net: (o.begeni || 0) - (o.begenmeme || 0), toplam: o.toplam || 0, sira: i });
    }
    satirlar.sort(function (a, b) {
      return (b.net - a.net) || (b.toplam - a.toplam) || (a.sira - b.sira);
    });
    satirlar.forEach(function (r) { kap.appendChild(r.kart); });
  }

  function bilgiYaz(kutu, metin) {
    var b = kutu.querySelector('[data-bilgi]');
    if (b) b.textContent = metin;
  }

  function ozetiAl(liste, benimListe) {
    durum.ozet = {}; durum.benim = {};
    (liste || []).forEach(function (o) { durum.ozet[o.surum] = o; });
    (benimListe || []).forEach(function (o) { durum.benim[o.surum] = o.oy; });
  }

  function oyVer(surum, oy, kutu) {
    // aynı düğmeye tekrar basmak oyu geri alır
    var geriAl = durum.benim[surum] === oy;
    var g = istemciVerisi();
    g.surum = surum; g.oy = geriAl ? 0 : oy;
    bilgiYaz(kutu, geriAl ? 'geri alınıyor' : 'gönderiliyor');
    fetch(UC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(g),
    })
      .then(function (c) { return c.ok ? c.json() : c.json().then(function (h) { throw new Error(h.hata || c.status); }); })
      .then(function (c) {
        var benimKopya = durum.benim;
        ozetiAl(c.ozet, []);
        durum.benim = benimKopya;
        if (c.geriAlindi) delete durum.benim[surum];
        else durum.benim[surum] = oy;
        ciz();
        bilgiYaz(kutu, c.geriAlindi ? 'oyun geri alındı' : 'oyun kaydedildi');
      })
      .catch(function (h) { bilgiYaz(kutu, 'gönderilemedi (' + h.message + ')'); });
  }

  ciz();
  fetch(UC, { credentials: 'same-origin' })
    .then(function (c) { return c.json(); })
    .then(function (c) { ozetiAl(c.ozet, c.benim); ciz(); sirala(); })
    .catch(function () { /* sessiz gec */ });
})();
