import { html, ham } from '../lib/sablon.mjs';
import { duzen, u } from './duzen.mjs';
import { cip } from './anasayfa.mjs';

const KONU_AD = {
  olcek: 'Ölçek',
  sureklilik: 'Süreklilik',
  erisim: 'Erişilebilirlik',
  topluluk: 'Topluluk büyüklüğü',
  eksik: 'Bilmediklerimiz',
};
const KONU_ALT = {
  olcek: 'Kaç kişiye ulaştığımız. Kayıt sayısı ile kapıdan geçen katılımcı sayısını ayırıyoruz.',
  sureklilik: 'Kaç yıldır aynı işi yaptığımız.',
  erisim: 'Katılmanın maliyeti.',
  topluluk: 'Takip eden insan sayısı. Bunlar platform takipçisidir, kulüp üyesi değildir.',
  eksik: 'Söylenmesi kolay olurdu ama doğrulayamadık, o yüzden siteye koymadık.',
};

/* ============================ KANIT SAYFASI ============================ */
export function kanitSayfasi({ kisi, gruplar, sayim }) {
  const icerik = html`
<section class="kapak">
  <div class="kap">
    <div class="kapak-ic">
      <div>
        <h1>Rakamlar ve <span>kaynakları.</span></h1>
        <p class="kapak-ozet">
          Öğrenci kulüpleri tanıtımlarında büyük sayılar kullanır ve genellikle bu
          sayıların nereden geldiği yazmaz. Biz tersini yapıyoruz: sitedeki her rakamın
          yanında kimin söylediği duruyor. Doğrulayamadıklarımızı da bu sayfada
          listeliyoruz, çünkü bir kulübün neyi bilmediğini söylemesi neyi bildiğini
          söylemesi kadar önemli.
        </p>
      </div>
      <div class="kunye-tablo">
        <div class="kunye-satir">
          <b>${sayim.dogrulanmis}</b>
          <div class="ne">bağımsız kaynakla doğrulanmış kayıt<span class="kaynak">biletimGO, Biletino, Kommunity, Youthall, LinkedIn, Boğaziçi Üniversitesi</span></div>
        </div>
        <div class="kunye-satir">
          <b>${sayim['kulup-ici'] || 0}</b>
          <div class="ne">yalnızca kulüp kaydına dayanan<span class="kaynak">bağımsız doğrulama yok, öyle etiketlendi</span></div>
        </div>
        <div class="kunye-satir">
          <b>${sayim.eksik || 0}</b>
          <div class="ne">bilmediğimizi kabul ettiğimiz<span class="kaynak">tahminle doldurulmadı</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    ${gruplar.map(([konu, satirlar]) => html`
      <div class="kanit-grup">
        <h3>${KONU_AD[konu] || konu}</h3>
        ${KONU_ALT[konu] ? html`<p style="color:var(--metin-3);font-size:14.5px;margin:10px 0 4px">${KONU_ALT[konu]}</p>` : ''}
        ${satirlar.map((s) => html`
          <div class="kanit">
            <div class="iddia">
              ${s.deger ? html`<b>${s.deger}</b>` : ''}
              ${s.iddia} ${cip(s.etiket)}
              ${s.aciklama ? html`<p>${s.aciklama}</p>` : ''}
            </div>
            <div class="kaynak">
              ${s.kaynak_url
                ? html`<a href="${s.kaynak_url}" target="_blank" rel="noopener">${s.kaynak}</a>`
                : (s.kaynak || html`<span style="color:var(--metin-3)">kaynak yok</span>`)}
            </div>
          </div>`)}
      </div>`)}

    <div class="not" style="margin-top:10px">
      Bir hata gördüysen ya da elinde daha iyi bir kaynak varsa
      <a href="mailto:hello@compec.org">hello@compec.org</a> adresine yazabilirsin.
      Düzeltiriz ve kaynağını yazarız.
    </div>
  </div>
</section>`;

  return duzen({
    baslik: 'Rakamlar ve kaynakları',
    aciklama: 'COMPEC sitesindeki her rakamın kaynağı, doğrulama durumu ve doğrulayamadığımız iddialar.',
    etkin: '/kanit', kisi,
  }, icerik);
}

/* ============================ KİMLERLE TANIŞIRSIN ============================ */
const ETKAD = { techsummit: 'TechSummit', datacamp: 'DataCamp', digitalized: 'Digitalized', algorun: 'algoRun' };

export function kimlerleSayfasi({ kisi, kadro, logolar, kurumSayisi }) {
  const yillar = [...new Set(kadro.map((k) => k.yil))].sort((a, b) => b - a);
  return duzen({
    baslik: 'Kimlerle tanışırsın',
    aciklama: 'COMPEC etkinliklerinde konuşan ve atölye veren kişiler: adları, kurumları ve konuşma başlıkları.',
    etkin: '/kimlerle', kisi,
  }, html`
<section class="kapak">
  <div class="kap">
    <div class="kapak-ic">
      <div>
        <h1>Sahnede <span>kimler oldu.</span></h1>
        <p class="kapak-ozet">
          Etkinliklerimizde konuşan ve atölye veren herkesin adı, kurumu ve konuştuğu
          konu burada. Bu liste bir vaat değil, gerçekleşmiş etkinliklerin kaydı.
          Uydurma isim yok; kulübün eski sitesinde vardı, kaldırdık.
        </p>
      </div>
      <div class="kunye-tablo">
        <div class="kunye-satir"><b>${kadro.length}</b><div class="ne">kayıtlı konuşmacı ve eğitmen<span class="kaynak">etkinlik duyuruları ve biletimGO kayıtları</span></div></div>
        <div class="kunye-satir"><b>${kurumSayisi}</b><div class="ne">ayrı kurum<span class="kaynak">NVIDIA, Insider, Hepsiburada, Boyner, Vestel, Amadeus ve diğerleri</span></div></div>
      </div>
    </div>
  </div>
</section>

${yillar.map((yil) => html`
<section class="bolum" style="padding-bottom:0">
  <div class="kap">
    <div class="bas">
      <div><h2>${yil}</h2></div>
      <div class="yan">${kadro.filter((k) => k.yil === yil).length} kişi</div>
    </div>
    <div class="kadro">
      ${kadro.filter((k) => k.yil === yil).map((k) => html`
        <div class="kadro-oge">
          <div class="kurum">
            ${logolar[k.kurum]
              ? html`<img src="${u('/genel/varliklar/kurumlogo/' + logolar[k.kurum])}" alt="${k.kurum}" loading="lazy">`
              : ''}
            <span>${k.tur === 'egitmen' ? 'atölye' : 'konuşma'} · ${ETKAD[k.etkinlik] || k.etkinlik}</span>
          </div>
          <h4>${k.ad}</h4>
          <div class="unvan">${[k.unvan, k.kurum].filter(Boolean).join(', ')}</div>
          ${k.baslik ? html`<div class="konu">${k.baslik}</div>` : ''}
        </div>`)}
    </div>
  </div>
</section>`)}

<section class="bolum">
  <div class="kap dar">
    <p class="mono">
      Bu kadro doğrulanmış kayıtlardan derlendi. Eksik gördüğün bir isim varsa
      <a href="mailto:hello@compec.org">hello@compec.org</a>.
    </p>
    <p style="margin-top:22px"><a class="dugme sade" href="${u('/kanit')}">Rakamlar ve kaynakları</a></p>
  </div>
</section>`);
}

/* ============================ ÖDÜL ARŞİVİ ============================ */
export function odulSayfasi({ kisi, yillar, toplam, kategoriSayisi }) {
  return duzen({
    baslik: 'Boğaziçi Bilişim Ödülleri arşivi',
    aciklama: 'Boğaziçi Bilişim Ödülleri’nin 2013’ten bugüne kazananları, kategori kategori ve kaynaklarıyla.',
    etkin: '/oduller', kisi,
  }, html`
<section class="kapak">
  <div class="kap">
    <div class="kapak-ic">
      <div>
        <h1>Bilişim Ödülleri <span>arşivi.</span></h1>
        <p class="kapak-ozet">
          Bir ödül töreninin en kalıcı çıktısı kazanan listesidir. Boğaziçi Bilişim
          Ödülleri 2013'ten beri düzenleniyor ve bu liste bugüne kadar hiçbir yerde
          toplu halde durmuyordu. Her satırın yanında kaynağı var; çoğu Wayback
          Machine üzerinden kurtarılmış eski tören sayfalarından geliyor.
        </p>
      </div>
      <div class="kunye-tablo">
        <div class="kunye-satir"><b>${toplam}</b><div class="ne">kayıtlı ödül<span class="kaynak">2013-2025</span></div></div>
        <div class="kunye-satir"><b>${yillar.length}</b><div class="ne">tören yılı<span class="kaynak">arşivden çıkarılabilen</span></div></div>
        <div class="kunye-satir"><b>${kategoriSayisi}</b><div class="ne">ayrı kategori<span class="kaynak">yıllar içinde değişti</span></div></div>
        <div class="kunye-satir"><b>130.000+</b><div class="ne">2018 oyu, 20 gün içinde<span class="kaynak">Boğaziçi Üniversitesi resmî haber sitesi</span></div></div>
      </div>
    </div>
  </div>
</section>

${yillar.map(([yil, satirlar]) => html`
<section class="bolum" style="padding-bottom:0">
  <div class="kap">
    <div class="bas">
      <div><h2>${yil}</h2></div>
      <div class="yan">${satirlar.length} ödül</div>
    </div>
    <div class="tablo-sar">
      <table class="tablo odul-tablo">
        <thead><tr><th>Kategori</th><th>Kazanan</th><th>Kaynak</th></tr></thead>
        <tbody>
          ${satirlar.map((o) => html`
            <tr>
              <td>${o.kategori}</td>
              <td><b>${o.kazanan || ''}</b> ${cip(o.etiket)}</td>
              <td>${o.kaynak_url ? html`<a href="${o.kaynak_url}" target="_blank" rel="noopener">arşiv kaydı</a>` : ''}</td>
            </tr>`)}
        </tbody>
      </table>
    </div>
  </div>
</section>`)}

<section class="bolum">
  <div class="kap dar">
    <div class="not">
      Bu arşiv tamamlanmış değil. Bazı yılların kategori dökümü eksik, bazı kazananlar
      yalnızca tek kaynakta geçiyor ve o satırlar şüpheli olarak işaretli. Elinde eski
      bir tören programı ya da haber bağlantısı varsa
      <a href="mailto:hello@compec.org">hello@compec.org</a> adresine yazarsan ekleriz.
    </div>
    <p style="margin-top:22px"><a class="dugme sade" href="${u('/kanit')}">Rakamlar ve kaynakları</a></p>
  </div>
</section>`);
}

/* ============================ ARŞİV HUB ============================
   Kurum hafızasının tek giriş noktası. Fikir kaynağı: HackIllinois kalıcı
   kurum sitesini etkinlik sitesinden ayırmış (info.hackillinois.org).
   Bizde ayrı alan adı gerekmiyor, ayrı bir bölüm yeterli.               */
export function arsivSayfasi({ kisi, sayimlar, sonBaskilar }) {
  return duzen({
    baslik: 'Kurum arşivi',
    aciklama: 'COMPEC kurum hafızası: baskı kayıtları, ödül arşivi, konuşmacı kadrosu, kurumlar ve kaynak künyeleri.',
    etkin: '/arsiv', kisi,
  }, html`
<section class="giris">
  <div class="kap">
    <div class="giris-izgara">
      <div>
        <h1>Kurum <i>arşivi.</i></h1>
        <p class="giris-ozet">
          Kulüp 1994'ten beri çalışıyor ama kurum hafızası her yıl yönetim
          değişince biraz daha eksiliyordu. Burası o hafızanın durduğu yer:
          hangi etkinlik hangi yıl kaç kez yapıldı, kim konuştu, kim destekledi,
          kim kazandı. Her kaydın yanında kaynağı var.
        </p>
        <div class="giris-eylem">
          <a class="dugme sade" href="${u('/kanit')}">Rakamlar ve kaynakları</a>
        </div>
      </div>
      <div class="kulak">
        <dl>
          <dt>Toplam kayıt</dt><dd><b>${sayimlar.toplam}</b>arşivde</dd>
          <dt>En eski kayıt</dt><dd><b>1994</b>kuruluş</dd>
        </dl>
      </div>
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div><h2>Dört kayıt kümesi</h2></div>
      <div class="yan">hepsi kaynaklı</div>
    </div>
    <div class="arsiv-kapi">
      <a class="arsiv-kart" href="${u('/oduller')}">
        <span class="sayi">${sayimlar.odul}</span>
        <h3>Ödül kaydı</h3>
        <p>Boğaziçi Bilişim Ödülleri, 2013'ten bugüne ${sayimlar.odulYil} tören yılı. Yıl, kategori, kazanan ve arşiv bağlantısı.</p>
        <span class="git">Aç &rarr;</span>
      </a>
      <a class="arsiv-kart" href="${u('/etkinlikler')}">
        <span class="sayi">${sayimlar.baski}</span>
        <h3>Baskı kaydı</h3>
        <p>Dokuz etkinlik serisinin baskı zincirleri. Yıl, tarih, mekân, ana sponsor ve not.</p>
        <span class="git">Aç &rarr;</span>
      </a>
      <a class="arsiv-kart" href="${u('/kimlerle')}">
        <span class="sayi">${sayimlar.konusmaci}</span>
        <h3>Konuşmacı kaydı</h3>
        <p>Sahnede olan ve atölye veren herkes: adı, kurumu, unvanı ve konuştuğu konu.</p>
        <span class="git">Aç &rarr;</span>
      </a>
      <a class="arsiv-kart" href="${u('/kurumlar')}">
        <span class="sayi">${sayimlar.kurum}</span>
        <h3>Kurum kaydı</h3>
        <p>Hangi kurum, hangi etkinlikte, hangi yıl, hangi kademede destek verdi.</p>
        <span class="git">Aç &rarr;</span>
      </a>
    </div>
  </div>
</section>

<section class="bolum" style="padding-top:0">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>En son ne oldu</h2>
        <p>Arşivdeki en yeni baskı kayıtları.</p>
      </div>
      <div class="yan">son ${sonBaskilar.length} kayıt</div>
    </div>
    <div class="liste">
      ${sonBaskilar.map((b) => html`
        <a class="satir" href="${u('/etkinlik/' + b.etkinlik)}">
          <div class="satir-yan">${b.yil}${b.tarih ? html`<br>${b.tarih}` : ''}</div>
          <div>
            <h3>${b.ad}${b.no ? html`<em>${b.no}. baskı</em>` : ''}</h3>
            <p>${[b.mekan, b.ana_sponsor ? 'ana sponsor ' + b.ana_sponsor : null, b.not_].filter(Boolean).join(' · ')}</p>
          </div>
          <div class="satir-veri">
            ${b.kayit_sayisi ? html`<span><b>${b.kayit_sayisi}</b> kayıt</span>` : ''}
            <span style="color:var(--mavi-parlak)">Ayrıntı</span>
          </div>
        </a>`)}
    </div>
  </div>
</section>

<section class="bolum" style="padding-top:0">
  <div class="kap dar">
    <div class="not">
      Bu arşiv tamamlanmış değil. Katılımcı sayısı çoğu yıl için kayıt altına
      alınmamış, bazı baskıların tarihi bilinmiyor, Bilişim Ödülleri'nin bazı
      yıllarında kategori dökümü eksik. Bunları gizlemiyoruz; eksik olduğunu
      bilmek, kayıt tutmaya başlamak için en iyi gerekçe.
      <a href="mailto:hello@compec.org">hello@compec.org</a>
    </div>
  </div>
</section>`);
}
