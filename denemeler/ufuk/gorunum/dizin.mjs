import { html, ham } from '../lib/sablon.mjs';
import { duzen, u, IKON } from './duzen.mjs';

const foto = (d) => u('/genel/varliklar/foto/' + d);
const bashARF = (ad) => (ad || '?').trim().charAt(0).toLocaleUpperCase('tr');

function baglantilar(k) {
  const p = [];
  if (k.linkedin) p.push(html`<a href="${k.linkedin}" target="_blank" rel="noopener me">${IKON.linkedin} LinkedIn</a>`);
  if (k.github) p.push(html`<a href="${k.github}" target="_blank" rel="noopener me">${IKON.github} GitHub</a>`);
  if (!p.length) p.push(html`<span class="yok" style="display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:11.5px;border:1px dashed var(--cizgi-2);border-radius:3px;padding:4px 9px;color:var(--metin-3)">Bağlantı eklenmemiş</span>`);
  return p;
}

/* ============================ ÜYE DİZİNİ ============================ */
export function uyeler({ kisi, liste, donemler, secili, arama, toplam }) {
  const icerik = html`
<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Üye dizini</h2>
        <p class="bas-alt">
          Kulüpte görev almış ve almakta olan üyeler. Profiline LinkedIn ekleyen
          herkese buradan doğrudan ulaşabilirsin.
        </p>
      </div>
      <div class="kunye">${toplam} kayıt</div>
    </div>

    <div class="suzgec">
      <a href="${u('/ekip')}"${ham(!secili ? ' class="etkin"' : '')}>Tümü</a>
      ${donemler.map((d) => html`
        <a href="${u('/ekip')}?donem=${encodeURIComponent(d.donem)}"${ham(secili === d.donem ? ' class="etkin"' : '')}>${d.donem} (${d.adet})</a>`)}
      <form method="get" action="${u('/ekip')}">
        <input type="search" name="q" placeholder="İsim ara" value="${arama || ''}" aria-label="İsim ara">
        <button class="dugme sade" type="submit">Ara</button>
      </form>
    </div>

    ${liste.length === 0
      ? html`<p style="color:var(--metin-2)">Bu ölçütlere uyan kayıt yok.</p>`
      : html`<div class="dizin">
          ${liste.map((k) => html`
            <article class="kart">
              <div class="kart-foto">
                ${k.foto
                  ? html`<img src="${foto(k.foto)}" alt="${k.ad}" loading="lazy">`
                  : html`<div class="kart-bos" aria-hidden="true">${bashARF(k.ad)}</div>`}
              </div>
              <div class="kart-ic">
                <h3><a href="${u('/uye/' + k.slug)}">${k.ad}</a></h3>
                ${k.gorev ? html`<div class="rol">${k.gorev}</div>` : ''}
                ${k.donem ? html`<div class="kunye">${k.donem}</div>` : ''}
                <div class="kart-bag">${baglantilar(k)}</div>
              </div>
            </article>`)}
        </div>`}

    ${(() => {
      const eksik = liste.filter((k) => !k.linkedin && !k.github).length;
      return eksik
        ? html`<p class="mono" style="margin-top:24px">
            ${eksik} kişinin bağlantısı henüz eklenmemiş. Doğrulanmış kişisel adresi
            olmadan tahmin etmiyoruz. Kendi profilin buradaysa
            <a href="${u('/giris')}">giriş yapıp</a> ekleyebilirsin.
          </p>`
        : html`<p class="mono" style="margin-top:24px">
            Listedeki herkesin bağlantısı doğrulanmış kaynaklardan eklendi.
            Kendi profilin buradaysa <a href="${u('/giris')}">giriş yapıp</a> güncelleyebilirsin.
          </p>`;
    })()}
  </div>
</section>`;

  return duzen({
    baslik: 'Üye dizini',
    aciklama: 'COMPEC üyeleri ve yönetim kurullarında görev almış kişiler.',
    etkin: '/ekip', kisi,
  }, icerik);
}

/* ============================ KİŞİ SAYFASI ============================ */
export function uyeSayfasi({ kisi, k, benMi }) {
  const icerik = html`
<section class="bolum">
  <div class="kap">
    <p class="mono" style="margin-bottom:22px"><a href="${u('/ekip')}">Üye dizini</a> / ${k.ad}</p>

    <div class="kisi-ust">
      <div class="foto">
        ${k.foto
          ? html`<img src="${foto(k.foto)}" alt="${k.ad}">`
          : html`<div class="kart-bos" aria-hidden="true">${bashARF(k.ad)}</div>`}
      </div>
      <div>
        <h1>${k.ad}</h1>
        ${k.gorev ? html`<p class="kisi-kimlik">${k.gorev}</p>` : ''}
        ${k.hakkinda ? html`<p style="margin-top:18px;color:var(--metin-2);max-width:56ch">${k.hakkinda}</p>` : ''}

        <dl class="kisi-veri">
          ${k.donem ? html`<div><dt>Dönem</dt><dd>${k.donem}</dd></div>` : ''}
          ${k.kurul ? html`<div><dt>Alt kurul</dt><dd>${k.kurul}</dd></div>` : ''}
          ${k.bolum ? html`<div><dt>Bölüm</dt><dd>${k.bolum}</dd></div>` : ''}
          ${k.giris_yili ? html`<div><dt>Giriş yılı</dt><dd>${k.giris_yili}</dd></div>` : ''}
          <div>
            <dt>Bağlantı</dt>
            <dd><div class="kart-bag" style="margin-top:0;padding-top:0;border-top:0">${baglantilar(k)}</div></dd>
          </div>
        </dl>

        ${benMi ? html`<p style="margin-top:24px"><a class="dugme sade" href="${u('/panel')}">Profilini düzenle</a></p>` : ''}
      </div>
    </div>
  </div>
</section>`;

  return duzen({
    baslik: k.ad,
    aciklama: [k.ad, k.gorev, k.donem].filter(Boolean).join(', '),
    etkin: '/ekip', kisi,
  }, icerik);
}
