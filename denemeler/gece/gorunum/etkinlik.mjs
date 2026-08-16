import { html, ham, sayi } from '../lib/sablon.mjs';
import { duzen, u } from './duzen.mjs';
import { kurumSeridi } from './serit.mjs';

const foto = (d) => u('/genel/varliklar/foto/' + d);
const ETKAD = { techsummit: 'TechSummit', datacamp: 'DataCamp', digitalized: 'Digitalized', algorun: 'algoRun' };
const KADEME = { ana: 'Ana sponsor', altin: 'Altın sponsor', gumus: 'Gümüş sponsor', ortak: 'Ortak' };

/* ============================ ETKİNLİK LİSTESİ ============================ */
export function etkinlikListesi({ kisi, etkinlikler }) {
  const icerik = html`
<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Etkinlikler</h2>
        <p class="bas-alt">
          Kulübün düzenlediği seriler. Her birinin kendi sayfasında baskı zinciri,
          konuşmacı kadrosu ve sponsorları var.
        </p>
      </div>
      <div class="kunye">${etkinlikler.length} seri</div>
    </div>

    <div class="arsiv">
      ${etkinlikler.map((e) => html`
        <a class="satir" href="${u('/etkinlik/' + e.slug)}">
          <div class="satir-yil">${e.yil || ''}</div>
          <div>
            <h3>${e.ad}${e.tur ? html`<em>${e.tur}</em>` : ''}</h3>
            <p>${e.ozet}</p>
          </div>
          <div class="satir-veri">
            ${e.baski ? html`<span><b>${e.baski}</b></span>` : ''}
            ${e.baski_adet ? html`<span>${e.baski_adet} baskı kayıtlı</span>` : ''}
            ${e.konusmaci_adet ? html`<span>${e.konusmaci_adet} konuşmacı</span>` : ''}
            <span style="color:var(--mavi-koyu)">Ayrıntı</span>
          </div>
        </a>`)}
    </div>
  </div>
</section>`;
  return duzen({
    baslik: 'Etkinlikler',
    aciklama: 'COMPEC etkinlik serileri: TechSummit, DataCamp, Digitalized, Teknodolu, DevTalks, algoRun ve daha fazlası.',
    etkin: '/etkinlikler', kisi,
  }, icerik);
}

/* ============================ ETKİNLİK AYRINTI ============================ */
export function etkinlikSayfasi({ kisi, e, baskilar, konusmacilar, sponsorlar }) {
  const yillar = [...new Set(konusmacilar.map((k) => k.yil))].sort((a, b) => b - a);
  const enSonBaski = baskilar[0];
  // Boş sütun göstermemek için: kayıtlarda gerçekten veri olan sütunlar açılır.
  const noVar = baskilar.some((b) => b.no);
  const sponsorVar = baskilar.some((b) => b.ana_sponsor);

  const icerik = html`
<section class="giris">
  <div class="kap">
    <p class="mono" style="margin-bottom:20px">
      <a href="${u('/etkinlikler')}">Etkinlikler</a> / ${e.ad}
    </p>
    <div class="giris-izgara">
      <div>
        <h1>${e.ad}</h1>
        <p class="giris-ozet">${e.ozet}</p>
      </div>
      <div class="kulak">
        <dl>
          ${e.tur ? html`<dt>Tür</dt><dd><b style="font-size:19px">${e.tur}</b></dd>` : ''}
          ${e.baski ? html`<dt>${noVar ? 'Son baskı' : 'Kapsam'}</dt><dd>${enSonBaski && enSonBaski.no ? html`<b>${enSonBaski.no}.</b>` : ''}${e.baski}</dd>` : ''}
          ${baskilar.length ? html`<dt>Kayıtlı ${noVar ? 'baskı' : 'buluşma'}</dt><dd><b>${baskilar.length}</b></dd>` : ''}
          ${konusmacilar.length ? html`<dt>Kayıtlı konuşmacı</dt><dd><b>${konusmacilar.length}</b></dd>` : ''}
        </dl>
      </div>
    </div>

    ${e.foto ? html`
      <figure class="giris-foto">
        <img src="${foto(e.foto)}" alt="${e.ad}" width="2200" height="1650">
        <figcaption><span>${e.mekan || ''}</span><span>Boğaziçi Üniversitesi</span></figcaption>
      </figure>` : ''}
  </div>
</section>

${baskilar.length ? html`
<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>${noVar ? 'Baskı zinciri' : 'Buluşmalar'}</h2>
        <p class="bas-alt">
          Doğrulanmış kayıtlar. Arada eksik olanlar varsa, onlar için bağımsız
          kaynak bulunamadığı içindir.
        </p>
      </div>
      <div class="kunye">${baskilar.length} ${noVar ? 'baskı' : 'buluşma'}</div>
    </div>
    <div class="tablo-sar"><table class="tablo">
      <thead>
        <tr>
          <th>Yıl</th>${noVar ? html`<th>Baskı</th>` : ''}<th>Tarih</th>
          <th>Mekân</th>${sponsorVar ? html`<th>Ana sponsor</th>` : ''}<th>Not</th>
        </tr>
      </thead>
      <tbody>
        ${baskilar.map((b) => html`
          <tr>
            <td><b>${b.yil}</b></td>
            ${noVar ? html`<td class="mono">${b.no ? b.no + '.' : ''}</td>` : ''}
            <td>${b.tarih || ''}</td>
            <td>${b.mekan || ''}</td>
            ${sponsorVar ? html`<td>${b.ana_sponsor || ''}</td>` : ''}
            <td style="color:var(--murekkep-2)">
              ${b.not_ || ''}
              ${b.kayit_sayisi ? html`<br><span class="mono">${sayi(b.kayit_sayisi)} kayıt</span>` : ''}
            </td>
          </tr>`)}
      </tbody>
    </table></div>
  </div>
</section>` : ''}

${konusmacilar.length ? yillar.map((yil) => html`
<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div><h2>${yil} kadrosu</h2></div>
      <div class="kunye">${konusmacilar.filter((k) => k.yil === yil).length} isim</div>
    </div>
    <div class="arsiv">
      ${konusmacilar.filter((k) => k.yil === yil).map((k) => html`
        <div class="satir">
          <div class="satir-yil">${k.tur === 'egitmen' ? 'Atölye' : 'Konuşma'}</div>
          <div>
            <h3>${k.ad}</h3>
            <p>${[k.unvan, k.kurum].filter(Boolean).join(', ')}</p>
          </div>
          <div class="satir-veri"><span>${k.baslik || ''}</span></div>
        </div>`)}
    </div>
  </div>
</section>`) : ''}

${sponsorlar.length ? html`
<section class="blok">
  <div class="kap">
    <div class="bas">
      <div><h2>Destekleyen kurumlar</h2></div>
      <div class="kunye">${sponsorlar.length} kayıt</div>
    </div>
    <div class="tanimlar">
      ${sponsorlar.map((k) => html`
        <div class="tanim">
          <h3>${k.ad}</h3>
          <p>${[k.yil, KADEME[k.kademe] || ''].filter(Boolean).join(', ')}</p>
        </div>`)}
    </div>
    <p style="margin-top:26px"><a href="${u('/sirketler')}">Sponsorluk için iletişim</a></p>
  </div>
</section>` : ''}

<section class="bolum">
  <div class="kap dar">
    <p class="mono">
      Bu sayfadaki bilgiler bağımsız kaynaklardan (biletimGO, Biletino, Youthall,
      Kommunity, LinkedIn) doğrulanmıştır. Eksik gördüğün bir bilgi varsa
      <a href="mailto:hello@compec.org">hello@compec.org</a> adresine yazabilirsin.
    </p>
    <p style="margin-top:22px"><a class="dugme sade" href="${u('/etkinlikler')}">Tüm etkinlikler</a></p>
  </div>
</section>`;

  return duzen({
    baslik: e.ad,
    aciklama: e.ozet,
    etkin: '/etkinlikler', kisi,
  }, icerik);
}

/* ============================ KURUMLAR ============================ */
export function kurumlarSayfasi({ kisi, kurumlar, logolar }) {
  const yillar = [...new Set(kurumlar.map((k) => k.yil).filter(Boolean))].sort((a, b) => b - a);
  const benzersiz = [...new Set(kurumlar.map((k) => k.ad))];

  const icerik = html`
<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Kurumlar</h2>
        <p class="bas-alt">
          Etkinliklerimizi destekleyen şirketler. Logo duvarı yerine kayıt tutuyoruz:
          hangi kurum, hangi etkinlikte, hangi yıl, hangi kademede.
        </p>
      </div>
      <div class="kunye">${benzersiz.length} kurum</div>
    </div>
  </div>
</section>

${kurumSeridi(kurumlar, logolar)}

<section class="bolum">
  <div class="kap">

    ${yillar.map((yil) => html`
      <div style="margin-bottom:34px">
        <h3 style="font-family:var(--mono);font-size:12.5px;color:var(--murekkep-3);font-weight:500;padding-bottom:9px;border-bottom:1px solid var(--cizgi)">${yil}</h3>
        <div class="tanimlar" style="margin-top:4px">
          ${kurumlar.filter((k) => k.yil === yil).map((k) => html`
            <div class="tanim">
              <h3>${k.ad}</h3>
              <p>${[ETKAD[k.etkinlik] || k.etkinlik, KADEME[k.kademe] || ''].filter(Boolean).join(', ')}</p>
            </div>`)}
        </div>
      </div>`)}

    <div style="margin-top:12px;display:flex;gap:12px;flex-wrap:wrap">
      <a class="dugme" href="${u('/sirketler')}" data-olcum="sirket_sayfasi_tikla">Sponsorluk bilgisi</a>
      <a class="dugme sade" href="${u('/etkinlikler')}">Etkinlikler</a>
    </div>
  </div>
</section>`;

  return duzen({
    baslik: 'Kurumlar',
    aciklama: 'COMPEC etkinliklerini destekleyen kurumlar: Akbank, HubX, Acıbadem Technology, Yapı Kredi Teknoloji, ING, Huawei ve diğerleri.',
    etkin: '/kurumlar', kisi,
  }, icerik);
}
