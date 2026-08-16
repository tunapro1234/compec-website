import { html, ham, sayi } from '../lib/sablon.mjs';
import { duzen, u, IKON } from './duzen.mjs';
import { kurumSeridi } from './serit.mjs';

const foto = (d) => u('/genel/varliklar/foto/' + d);
const bashARF = (ad) => (ad || '?').trim().charAt(0).toLocaleUpperCase('tr');

/* Amiral gemisi kart: fotoğrafı varsa fotoğraf, yoksa baskı sayısıyla tipografik.
   Yer tutucu görsel KULLANILMAZ; olmayan fotoğrafın yerine sahte bir şey konmaz. */
function gemi(e) {
  const numara = (e.baski || '').match(/(\d+)\./);
  return html`
    <a class="gemi" href="${u('/etkinlik/' + e.slug)}">
      ${e.foto
        ? html`<div class="gemi-foto"><img src="${foto(e.foto)}" alt="" loading="lazy"></div>`
        : html`<div class="gemi-yazisiz">${numara ? html`<b>${numara[1]}</b>` : ''}</div>`}
      <div class="gemi-ic">
        <span class="gemi-etiket">${e.tur || ''}</span>
        <h3>${e.ad}</h3>
        <p>${e.ozet}</p>
        <div class="gemi-veri">
          ${e.baski ? html`<span><b>${e.baski}</b></span>` : ''}
          ${e.kayit_sayisi ? html`<span><b>${sayi(e.kayit_sayisi)}</b> kayıt</span>` : ''}
          ${e.mekan ? html`<span>${e.mekan}</span>` : ''}
        </div>
      </div>
    </a>`;
}

export function anasayfa({ kisi, gemiler, digerleri, serit, logolar, ekip, uyeSayisi }) {
  const icerik = html`
<section class="kahraman">
  <figure class="kahraman-foto">
    <img src="${foto('dc23-havadan.jpg')}"
         alt="Albert Long Hall'da dolu bir COMPEC etkinliği"
         width="2200" height="1650" fetchpriority="high">
    <figcaption class="kahraman-kunye-foto">DataCamp 2023, Albert Long Hall. Salonun fiziksel kapasitesi dolmuştu.</figcaption>
  </figure>
  <div class="kap">
    <h1>Boğaziçi'nde teknoloji, <span>1994'ten beri.</span></h1>
    <p class="kahraman-ozet">
      TechSummit 2010'dan, DataCamp 2017'den beri kesintisiz düzenleniyor.
      Hepsini öğrenciler kuruyor. Sen de kuranlardan biri olabilirsin.
    </p>
    <div class="kahraman-eylem">
      <a class="dugme" href="${u('/kayit')}" data-olcum="uye_ol_tikla" data-olcum-veri="giris">Aramıza katıl</a>
      <a class="dugme sade" href="${u('/etkinlikler')}">Etkinlikleri gör</a>
    </div>
    <div class="kahraman-kunye">
      <div><b>32</b><span>yıldır kampüste</span></div>
      <div><b>17.</b><span>TechSummit, 2026</span></div>
      <div><b>8.</b><span>DataCamp, 2025</span></div>
      <div><b>7</b><span>alt kurul</span></div>
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Amiral gemilerimiz</h2>
        <p>Her biri yıllardır kesintisiz düzenleniyor. Ayrıntı sayfalarında baskı zinciri, konuşmacı kadrosu ve sponsorlar var.</p>
      </div>
      <div class="yan"><a href="${u('/etkinlikler')}">Tüm etkinlikler</a></div>
    </div>
    <div class="gemiler">${gemiler.map(gemi)}</div>
  </div>
</section>

${kurumSeridi(serit, logolar)}

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Bunları da yapıyoruz</h2>
        <p>Hackathon, oyun geliştirme maratonu, sektör söyleşileri ve Anadolu'da atölyeler.</p>
      </div>
      <div class="yan">${digerleri.length} seri</div>
    </div>
    <div class="liste">
      ${digerleri.map((e) => html`
        <a class="satir" href="${u('/etkinlik/' + e.slug)}">
          <div class="satir-yan">${e.yil || ''}</div>
          <div>
            <h3>${e.ad}${e.tur ? html`<em>${e.tur}</em>` : ''}</h3>
            <p>${e.ozet}</p>
          </div>
          <div class="satir-veri">
            ${e.baski ? html`<span><b>${e.baski}</b></span>` : ''}
            ${e.kayit_sayisi ? html`<span><b>${sayi(e.kayit_sayisi)}</b> kayıt</span>` : ''}
            <span style="color:var(--mavi-parlak)">Ayrıntı</span>
          </div>
        </a>`)}
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Kulübü yürütenler</h2>
        <p>2025-2026 yönetim kurulu. Herkesin LinkedIn profiline buradan ulaşabilirsin.</p>
      </div>
      <div class="yan"><a href="${u('/ekip')}">Üye dizini (${uyeSayisi})</a></div>
    </div>
    <div class="ekip">
      ${ekip.map((k) => html`
        <article class="kisi">
          <div class="kisi-foto">
            ${k.foto
              ? html`<img src="${foto(k.foto)}" alt="${k.ad}" loading="lazy">`
              : html`<div class="kisi-bos" aria-hidden="true">${bashARF(k.ad)}</div>`}
          </div>
          <div class="kisi-ic">
            <h3><a href="${u('/uye/' + k.slug)}">${k.ad}</a></h3>
            <div class="rol">${k.gorev || ''}</div>
            <div class="kisi-bag">
              ${k.linkedin
                ? html`<a href="${k.linkedin}" target="_blank" rel="noopener me">${IKON.linkedin} LinkedIn</a>`
                : html`<span>eklenmemiş</span>`}
            </div>
          </div>
        </article>`)}
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bas"><div><h2>Buradan devam et</h2></div></div>
    <div class="kapilar">
      <a class="kapi" href="${u('/ogrenciler')}" data-olcum="ogrenci_sayfasi_tikla">
        <span>Öğrenciyseniz</span>
        <h3>Kulüp sana ne katar</h3>
        <p>
          Sektörle aynı odada olmak, organize eden taraf olmak ve mezun olduğunda
          seni tanıyan birilerinin olması. Üyelik ücretsiz, bölüm şartı yok.
        </p>
        <span class="git">Öğrenciler için &rarr;</span>
      </a>
      <a class="kapi" href="${u('/sirketler')}" data-olcum="sirket_sayfasi_tikla">
        <span>Şirketseniz</span>
        <h3>Neden sponsor olunur</h3>
        <p>
          Boğaziçi mühendislik öğrencisiyle aynı salonda olmanın yolu. Sponsor
          zincirimiz 2018'den beri kesintisiz; formatlar ve iletişim burada.
        </p>
        <span class="git">Şirketler için &rarr;</span>
      </a>
    </div>
  </div>
</section>`;

  return duzen({
    baslik: 'Boğaziçi Üniversitesi Bilişim Kulübü',
    aciklama: "1994'ten beri Boğaziçi Üniversitesi'nde teknoloji. TechSummit, DataCamp, Digitalized, hackathonlar ve sosyal sorumluluk projeleri.",
    etkin: '/', kisi,
  }, icerik);
}
