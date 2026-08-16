import { html, ham, sayi } from '../lib/sablon.mjs';
import { duzen, u, IKON } from './duzen.mjs';
import { kurumSeridi } from './serit.mjs';

const foto = (d) => u('/genel/varliklar/foto/' + d);
const ETIKET_AD = { 'kulup-ici': 'kulüp içi', supheli: 'çıkarım', eksik: 'eksik' };

/* "doğrulanmış" çipi BİLEREK basılmıyor (Tuna, 2026-07-25: "doğrulanmış
   yazılarını beğenmedim, istemiyorum"). Zaten bilgi taşımıyordu: ödüllerde 222
   kaydın 220'si, kanıtlarda 26'nın 21'i doğrulanmış, yani etiket neredeyse her
   satırda tekrarlanıyordu. Anlamlı olan İSTİSNALAR: çıkarım, kulüp içi, eksik.
   Doğrulamanın kanıtı kaybolmuyor, kaynak metni her satırda yerinde duruyor. */
export const cip = (e) => (!e || e === 'dogrulanmis' ? '' : html`<span class="cip ${e}">${ETIKET_AD[e] || e}</span>`);
const bashARF = (ad) => (ad || '?').trim().charAt(0).toLocaleUpperCase('tr');

export function anasayfa({ kisi, gemiler, digerleri, serit, logolar, ekip, kadro,
                           kanitli, kilometreler, secki, sayimlar, uyeSayisi }) {
  /* Ödül seçkisi ızgarası 4 / 2 / 1 sütun. Öge sayısı 4'ün katına indiriliyor:
     7 ögeyle son satırda üç boş hücre kalıyordu ve kabın arka planı orada açık
     bir blok gibi görünüyordu (Tuna: "burası boş kalmış"). Sorgu artık 8 döndüğü
     için kırpma yapmıyor; bu satır veri değişirse boşluğun geri gelmemesi için. */
  const seckiDolu = secki.slice(0, Math.floor(secki.length / 4) * 4);

  const icerik = html`
<section class="kahraman">
  <figure class="kahraman-foto">
    <!-- Hero karesi v3'ten geri alındı (Tuna, 2026-08-16: "v3 herodaki foto daha
         güzel o kalsın"). Digitalized 2025 karesi de dolu bir salon gösteriyordu
         ama bu havadan çekim salonun kapasitesinin dolduğunu daha net anlatıyor.
         Ölçüler gerçek dosyayla birebir (2200x1650); yanlış oran verilirse
         tarayıcı yükleme sırasında yerleşimi kaydırıyor. -->
    <img src="${foto('dc23-havadan.jpg')}"
         alt="Albert Long Hall'da dolu bir COMPEC etkinliği"
         width="2200" height="1650" fetchpriority="high">
    <figcaption class="kahraman-kunye-foto">DataCamp 2023, Albert Long Hall. Salonun fiziksel kapasitesi dolmuştu.</figcaption>
  </figure>
  <div class="kap">
    <h1>Boğaziçi'nde teknoloji, <span>1994'ten beri.</span></h1>
    <p class="kahraman-ozet">
      TechSummit 2010'dan, DataCamp 2017'den beri kesintisiz düzenleniyor.
      Hepsini öğrenciler kuruyor. Bu sayfadaki her rakamın yanında kaynağı yazılı.
    </p>
    <div class="kahraman-eylem">
      <a class="dugme" href="${u('/kayit')}" data-olcum="uye_ol_tikla" data-olcum-veri="kahraman">Aramıza katıl</a>
      <a class="dugme sade" href="${u('/arsiv')}">Arşive gir</a>
    </div>
    <div class="kahraman-kunye">
      <div><b>32</b><span>yıldır kampüste</span></div>
      <div><b>17.</b><span>TechSummit, 2026</span></div>
      <div><b>${sayimlar.odul}</b><span>kayıtlı ödül</span></div>
      <div><b>${sayimlar.konusmaci}</b><span>kayıtlı konuşmacı</span></div>
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Rakamlar ve nereden geldikleri</h2>
        <p>
          Öğrenci kulüpleri tanıtımlarında büyük sayılar kullanır, kaynağını yazmaz.
          Biz tersini yapıyoruz. Doğrulayamadıklarımız da ayrı bir sayfada duruyor.
        </p>
      </div>
      <div class="yan"><a href="${u('/kanit')}">Tüm kayıtlar</a></div>
    </div>
    <div class="kanitli">
      ${kanitli.map((k) => html`
        <div class="kanitli-oge">
          <b>${k.deger}</b>
          <div class="ne">${k.iddia}</div>
          <span class="kaynak">${k.kaynak || 'kaynak yok'}</span>
        </div>`)}
    </div>
  </div>
</section>

<section class="bolum" style="padding-top:0">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Amiral gemilerimiz</h2>
        <p>Her birinin sayfasında baskı zinciri, konuşmacı kadrosu ve destekleyen kurumlar var.</p>
      </div>
      <div class="yan"><a href="${u('/etkinlikler')}">Tüm etkinlikler</a></div>
    </div>
    <div class="gemiler">
      ${gemiler.map((e) => {
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
            </div>
          </div>
        </a>`;
      })}
    </div>
  </div>
</section>

${kurumSeridi(serit, logolar)}

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>1994'ten bugüne</h2>
        <p>
          Kulübün kendi tarihini kimse derli toplu yazmamıştı. Aşağıdaki her satır
          arşivden çıkarıldı; çıkarım olanlar ayrıca işaretli.
        </p>
      </div>
      <div class="yan">${kilometreler.length} kilometre taşı</div>
    </div>
    <div class="cizelge ikili">
      ${kilometreler.map((t) => html`
        <div class="tas${ham([1994, 2013, 2017, 2026].includes(t.yil) ? ' buyuk' : '')}">
          <div class="tas-yil">${t.yil}</div>
          <h3>${t.baslik}</h3>
          ${t.aciklama ? html`<p>${t.aciklama}</p>` : ''}
          <div class="kunye-alt">${cip(t.etiket)}<span>${t.kaynak || ''}</span></div>
        </div>`)}
    </div>
  </div>
</section>

<section class="bolum" style="padding-top:0">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Sahnede kimler oldu</h2>
        <p>Son iki yılın kadrosundan bir kesit. Kulübün eski sitesinde bu bölüm uydurma isimlerle doluydu; artık gerçek.</p>
      </div>
      <div class="yan"><a href="${u('/kimlerle')}">${sayimlar.konusmaci} kişilik kadro</a></div>
    </div>
    <div class="kadro">
      ${kadro.map((k) => html`
        <div class="kadro-oge">
          <div class="kurum">
            ${logolar[k.kurum]
              ? html`<img src="${u('/genel/varliklar/kurumlogo/' + logolar[k.kurum])}" alt="${k.kurum}" loading="lazy">`
              : ''}
            <span>${k.tur === 'egitmen' ? 'atölye' : 'konuşma'} · ${k.yil}</span>
          </div>
          <h4>${k.ad}</h4>
          <div class="unvan">${[k.unvan, k.kurum].filter(Boolean).join(', ')}</div>
          ${k.baslik ? html`<div class="konu">${k.baslik}</div>` : ''}
        </div>`)}
    </div>
  </div>
</section>

<section class="blok">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Bilişim Ödülleri arşivi</h2>
        <p style="color:#B7C4D3">
          2013'ten bugüne ${sayimlar.odul} kazanan kaydı, ${sayimlar.odulYil} tören yılı.
          Bir ödül töreninin en kalıcı çıktısı kazanan listesidir ve bu liste
          hiçbir yerde toplu halde durmuyordu.
        </p>
      </div>
      <div class="yan"><a href="${u('/oduller')}">Tam arşiv</a></div>
    </div>
    <div class="secki">
      ${seckiDolu.map((o) => html`
        <div class="secki-oge">
          <div class="yil">${o.yil}</div>
          <b>${o.kazanan}</b>
          <span>${o.kategori}</span>
        </div>`)}
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

<section class="bolum" style="padding-top:0">
  <div class="kap">
    <div class="bas"><div><h2>Buradan devam et</h2></div></div>
    <div class="kapilar">
      <a class="kapi" href="${u('/ogrenciler')}" data-olcum="ogrenci_sayfasi_tikla">
        <span>Öğrenciysen</span>
        <h3>Kulüp sana ne katar</h3>
        <p>Kimlerle tanışacağın, hangi şirketlere gezi düzenlendiği ve bunun ne kadar tuttuğu.</p>
        <span class="git">Öğrenciler için &rarr;</span>
      </a>
      <a class="kapi" href="${u('/sirketler')}" data-olcum="sirket_sayfasi_tikla">
        <span>Şirketseniz</span>
        <h3>Kime ulaşırsınız</h3>
        <p>Erişim formatları, geçmiş baskıların kaynaklı rakamları ve sponsor tarihçesi.</p>
        <span class="git">Şirketler için &rarr;</span>
      </a>
      <a class="kapi" href="${u('/arsiv')}">
        <span>Merak ediyorsan</span>
        <h3>Kurum arşivi</h3>
        <p>Baskı kayıtları, ödül arşivi, konuşmacı kadrosu, kurumlar ve kaynak künyeleri bir arada.</p>
        <span class="git">Arşive gir &rarr;</span>
      </a>
    </div>
  </div>
</section>`;

  return duzen({
    baslik: 'Boğaziçi Üniversitesi Bilişim Kulübü',
    aciklama: "1994'ten beri Boğaziçi Üniversitesi'nde teknoloji. Her rakamın kaynağı yazılı.",
    etkin: '/', kisi,
  }, icerik);
}
