import { html, ham } from '../lib/sablon.mjs';

export const TEMEL = process.env.TEMEL_YOL || '';
export const u = (yol) => (TEMEL + yol).replace(/\/+$/, '') || '/';

/* PostHog. Proje anahtari zaten tarayiciya gidiyor, gizli degil; yine de env ile ezilebilir.
   Kisisel API anahtari (phx_...) burada KULLANILMAZ, sunucuda da tutulmaz. */
export const OLCUM_ANAHTARI = process.env.POSTHOG_ANAHTAR
  ?? 'phc_yYNh8yiQqmwFeTzxYiQ4UTvmoWAXi7wu8rHADbu6WxQJ';
export const OLCUM_SUNUCU = process.env.POSTHOG_SUNUCU || 'https://eu.i.posthog.com';
export const OLCUM_SUNUCU_VARLIK = process.env.POSTHOG_VARLIK || 'https://eu-assets.i.posthog.com';

const IKON = {
  linkedin: ham('<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.4 20.5h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.04c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4a2.1 2.1 0 110-4.1 2.1 2.1 0 010 4.1zM7.1 20.5H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 1 .8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-.9-.8-1.7-1.8-1.7z"/></svg>'),
  github: ham('<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.999 4.6 19 4.9 19 4.9c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3z"/></svg>'),
  instagram: ham('<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.2.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-3.2 1.7-4.8 4.9-4.9C8.4 2.2 8.8 2.2 12 2.2zm0 1.4c-3.1 0-3.5 0-4.7.1-2.6.1-3.9 1.4-4.1 4.1 0 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 2.6 1.4 3.9 4.1 4.1 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c2.6-.1 3.9-1.4 4.1-4.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-2.6-1.4-3.9-4.1-4.1-1.2-.1-1.6-.1-4.7-.1zm0 4.9a3.5 3.5 0 100 6.9 3.5 3.5 0 000-6.9zm0 5.7a2.2 2.2 0 110-4.5 2.2 2.2 0 010 4.5zM17 6.6a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2z"/></svg>'),
  youtube: ham('<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>'),
};
export { IKON };

/**
 * @param {object} s sayfa bilgisi
 * @param {string} s.baslik
 * @param {string} s.aciklama
 * @param {string} s.etkin  gezinmede isaretlenecek bolum
 * @param {object|null} s.kisi oturum acmis kisi
 * @param {Ham} icerik
 */
export function duzen(s, icerik) {
  const k = s.kisi;
  // Header v1'deki gibi kulup gezinmesi tutar; ogrenci/sirket sayfalari
  // ana sayfadaki yonlendirmelerden ve alt bilgiden acilir.
  const bag = [
    ['/', 'Kulüp'],
    ['/etkinlikler', 'Etkinlikler'],
    ['/ekip', 'Ekip'],
    ['/kurumlar', 'Kurumlar'],
  ];
  const yonBaglari = bag.map(([yol, ad]) => html`
    <a href="${u(yol)}"${ham(s.etkin === yol ? ' class="etkin"' : '')}>${ad}</a>`);

  return html`<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${s.baslik} · COMPEC</title>
<meta name="description" content="${s.aciklama || ''}">
<meta property="og:title" content="${s.baslik} · COMPEC">
<meta property="og:description" content="${s.aciklama || ''}">
<meta property="og:locale" content="tr_TR">
<link rel="icon" type="image/png" href="${u('/genel/varliklar/logo/compec-mark-mavi.png')}">
<link rel="stylesheet" href="${u('/genel/yazi.css')}">
<link rel="stylesheet" href="${u('/genel/stil.css')}">
${OLCUM_ANAHTARI ? html`
<script>window.COMPEC_OLCUM={anahtar:${ham(JSON.stringify(OLCUM_ANAHTARI))},sunucu:${ham(JSON.stringify(OLCUM_SUNUCU))},surum:"v3-gece"${s.kisi ? ham(`,kisi:${JSON.stringify('uye-' + s.kisi.id)},rol:${JSON.stringify(s.kisi.rol)}`) : ''}};</script>
<script defer src="${u('/genel/olcum.js')}?s=2"></script>` : ''}
</head>
<body>

<header class="tepe">
  <div class="kap tepe-ic">
    <a class="arma" href="${u('/')}">
      <img src="${u('/genel/varliklar/logo/compec-mark-beyaz.png')}" alt="" width="789" height="439">
      <b>Compec</b>
    </a>
    <nav class="yon">${yonBaglari}</nav>
    <div class="tepe-hesap">
      ${k
        ? html`<a href="${u('/panel')}" style="font-size:15px;text-decoration:none;color:var(--murekkep-2)">${k.ad.split(' ')[0]}</a>
               <a class="dugme sade" href="${u('/cikis')}">Çıkış</a>`
        : html`<a href="${u('/giris')}" style="font-size:15px;text-decoration:none;color:var(--murekkep-2)">Giriş</a>
               <a class="dugme" href="${u('/kayit')}">Üye ol</a>`}
    </div>
    <button class="mnu" id="mnu" aria-label="Menü" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>
  </div>
</header>

<div class="gocmen" id="gocmen">
  <div class="kap">
    ${bag.map(([yol, ad]) => html`<a href="${u(yol)}">${ad}</a>`)}
    ${k
      ? html`<a href="${u('/panel')}">Hesabım</a><a href="${u('/cikis')}">Çıkış</a>`
      : html`<a href="${u('/giris')}">Giriş</a><a href="${u('/kayit')}">Üye ol</a>`}
  </div>
</div>

${icerik}

<footer class="dip">
  <div class="kap">
    <div class="dip-izgara">
      <div class="dip-arma">
        <img src="${u('/genel/varliklar/logo/compec-lockup-beyaz.png')}" alt="Compec" width="793" height="637">
        <p>Boğaziçi Üniversitesi Bilişim Kulübü. Güney Kampüs, Bebek, İstanbul.</p>
      </div>
      <div>
        <h4>Site</h4>
        <ul>
          <li><a href="${u('/')}">Kulüp</a></li>
          <li><a href="${u('/etkinlikler')}">Etkinlikler</a></li>
          <li><a href="${u('/ekip')}">Ekip</a></li>
          <li><a href="${u('/kurumlar')}">Kurumlar</a></li>
          <li><a href="${u('/ogrenciler')}">Öğrenciler için</a></li>
          <li><a href="${u('/sirketler')}">Şirketler için</a></li>
        </ul>
      </div>
      <div>
        <h4>Hesap</h4>
        <ul>
          <li><a href="${u('/kayit')}">Üye ol</a></li>
          <li><a href="${u('/giris')}">Giriş</a></li>
          <li><a href="${u('/panel')}">Hesabım</a></li>
        </ul>
      </div>
      <div>
        <h4>Bağlantı</h4>
        <ul>
          <li><a href="mailto:hello@compec.org">hello@compec.org</a></li>
          <li><a href="https://www.instagram.com/bouncompec/" rel="noopener">Instagram</a></li>
          <li><a href="https://www.linkedin.com/company/bouncompec" rel="noopener">LinkedIn</a></li>
          <li><a href="https://www.youtube.com/user/compecboun" rel="noopener">YouTube</a></li>
          <li><a href="https://kommunity.com/compec" rel="noopener">Kommunity</a></li>
        </ul>
      </div>
    </div>
    <div class="dip-son">
      <span>© 2026 COMPEC. Kuruluş 1994.</span>
      <span>#compecrocks</span>
    </div>
  </div>
</footer>

<script>
var tepe = document.querySelector('.tepe');
var kaydiKontrol = function () { tepe.classList.toggle('kaydi', window.scrollY > 6); };
kaydiKontrol();
addEventListener('scroll', kaydiKontrol, { passive: true });

document.getElementById('mnu').addEventListener('click', function () {
  var g = document.getElementById('gocmen');
  var acik = g.classList.toggle('acik');
  this.setAttribute('aria-expanded', acik);
});
</script>
</body>
</html>`;
}
