import { html, ham, sayi } from '../lib/sablon.mjs';
import { duzen, u } from './duzen.mjs';
import { kurumSeridi } from './serit.mjs';

const foto = (d) => u('/genel/varliklar/foto/' + d);

/* ============================ ANA SAYFA ============================ */
export function anasayfa({ kisi, etkinlikler, konusmacilar, kurumlar, serit, logolar, uyeSayisi }) {
  const anaSponsorlar = kurumlar.filter((k) => k.kademe === 'ana' && k.etkinlik === 'techsummit');

  const icerik = html`
<section class="giris">
  <div class="kap">
    <div class="giris-izgara">
      <div>
        <h1>Boğaziçi'nin bilişim kulübü, <i>1994'ten</i> bu yana.</h1>
        <p class="giris-ozet">
          Yedi alt kurul, otuz iki yıllık bir arşiv. TechSummit 2010'dan, DataCamp
          2017'den, Digitalized 2022'den beri her yıl düzenleniyor. Aşağıdaki her
          isim, rakam ve tarih doğrulanmış kaynaklara dayanıyor.
        </p>
        <div class="giris-eylem">
          <a class="dugme" href="${u('/ogrenciler')}" data-olcum="ogrenci_sayfasi_tikla">Öğrenciler için</a>
          <a class="dugme sade" href="${u('/sirketler')}" data-olcum="sirket_sayfasi_tikla">Şirketler için</a>
        </div>
      </div>

      <div class="kulak">
        <dl>
          <dt>Kuruluş</dt><dd><b>1994</b></dd>
          <dt>TechSummit</dt><dd><b>17.</b>2026 baskısı</dd>
          <dt>DataCamp</dt><dd><b>8.</b>2025 baskısı</dd>
          <dt>Digitalized</dt><dd><b>4.</b>2025 baskısı</dd>
        </dl>
      </div>
    </div>

    <figure class="giris-foto">
      <img src="${foto('dc23-havadan.jpg')}" alt="Albert Long Hall'da DataCamp 2023 sırasında dolu salon"
           width="2200" height="1650" fetchpriority="high">
      <figcaption>
        <span>DataCamp 2023, Albert Long Hall. Salonun fiziksel kapasitesi dolmuştu.</span>
        <span>Boğaziçi Üniversitesi, Güney Kampüs</span>
      </figcaption>
    </figure>
  </div>
</section>

${kurumSeridi(serit, logolar)}

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div><h2>Ne yapıyoruz</h2></div>
      <div class="kunye"><a href="${u('/etkinlikler')}">${etkinlikler.length} etkinlik serisi</a></div>
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
            ${e.mekan ? html`<span>${e.mekan}</span>` : ''}
            ${e.kayit_sayisi ? html`<span><b>${sayi(e.kayit_sayisi)}</b> kayıt</span>` : ''}
            <span style="color:var(--mavi-koyu)">Ayrıntı</span>
          </div>
        </a>`)}
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Sahnede kimler oldu</h2>
        <p class="bas-alt">
          Son iki yılın konuşmacı ve atölye kadrosundan bir kesit. Hepsi gerçekleşmiş
          etkinliklerden, kurum ve unvanlarıyla birlikte.
        </p>
      </div>
      <div class="kunye">${konusmacilar.length} isim</div>
    </div>

    <div class="arsiv">
      ${konusmacilar.map((k) => html`
        <div class="satir">
          <div class="satir-yil">${k.yil}</div>
          <div>
            <h3>${k.ad}${k.tur === 'egitmen' ? html`<em>atölye</em>` : ''}</h3>
            <p>${[k.unvan, k.kurum].filter(Boolean).join(', ')}${k.baslik ? '. ' + k.baslik + '.' : ''}</p>
          </div>
          <div class="satir-veri"><span>${k.etkinlik === 'datacamp' ? 'DataCamp' : k.etkinlik === 'digitalized' ? 'Digitalized' : 'TechSummit'}</span></div>
        </div>`)}
    </div>
  </div>
</section>

<section class="blok">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>TechSummit ana sponsorları</h2>
        <p class="bas-alt" style="color:#B7C4D3">
          2018'den bugüne kesintisiz. Kurumlar değişti, etkinlik durmadı.
        </p>
      </div>
      <div class="kunye">${anaSponsorlar.length} yıl</div>
    </div>
    <div class="tanimlar">
      ${anaSponsorlar.map((k) => html`
        <div class="tanim">
          <h3>${k.ad}</h3>
          <p>${k.yil}</p>
        </div>`)}
    </div>
    <p style="margin-top:26px"><a href="${u('/kurumlar')}">Tüm kurumlar</a> · <a href="${u('/sirketler')}">Sponsorluk formatları ve iletişim</a></p>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div><h2>Yedi alt kurul</h2></div>
      <div class="kunye">Tek topluluk</div>
    </div>
    <div class="tanimlar">
      <div class="tanim"><h3>Teknoloji</h3><p>Teknik etkinlikler, altyapı ve kulübün yazılım işleri.</p></div>
      <div class="tanim"><h3>DevTeam</h3><p>Kulüp projelerini geliştiren yazılım ekibi.</p></div>
      <div class="tanim"><h3>PR</h3><p>Tanıtım, iletişim ve topluluk görünürlüğü.</p></div>
      <div class="tanim"><h3>Kurumsal İletişim</h3><p>Şirket ilişkileri, iş birlikleri ve sponsorluklar.</p></div>
      <div class="tanim"><h3>İç İletişim</h3><p>Üye deneyimi ve kurullar arası koordinasyon.</p></div>
      <div class="tanim"><h3>Boğaziçi Bilişim Ödülleri</h3><p>Sektörün başarılarının değerlendirildiği ödül programı.</p></div>
      <div class="tanim"><h3>Dijital Girişimcilik</h3><p>Girişimcilik programları ve startup ekosistemiyle bağ.</p></div>
    </div>

    <div style="margin-top:40px;display:flex;gap:12px;flex-wrap:wrap">
      <a class="dugme" href="${u('/ekip')}" data-olcum="dizin_tikla">Üye dizini (${uyeSayisi})</a>
      <a class="dugme sade" href="${u('/kayit')}">Üye ol</a>
    </div>
  </div>
</section>`;

  return duzen({
    baslik: 'Boğaziçi Üniversitesi Bilişim Kulübü',
    aciklama: "1994'ten beri Boğaziçi Üniversitesi'nde teknoloji. TechSummit, DataCamp, Digitalized, hackathonlar ve sosyal sorumluluk projeleri.",
    etkin: '/', kisi,
  }, icerik);
}

/* ============================ ÖĞRENCİLER ============================ */
export function ogrenciler({ kisi, konusmacilar }) {
  const icerik = html`
<section class="giris">
  <div class="kap">
    <div class="giris-izgara">
      <div>
        <h1>Mezun olduğunda seni <i>tanıyan</i> biri olsun.</h1>
        <p class="giris-ozet">
          Boğaziçi'nde iyi not almak zor değil. Zor olan, iyi not aldığını kimin
          bileceği. COMPEC'in yaptığı iş bu: seni sektörle aynı odaya koymak, ve
          o odayı senin kurmanı sağlamak.
        </p>
        <div class="giris-eylem">
          <a class="dugme" href="${u('/kayit')}" data-olcum="uye_ol_tikla" data-olcum-veri="ogrenciler-giris">Üye ol</a>
          <a class="dugme sade" href="${u('/ekip')}">Üyeleri gör</a>
        </div>
      </div>
      <div class="kulak">
        <dl>
          <dt>Üyelik</dt><dd><b>Ücretsiz</b></dd>
          <dt>Bölüm şartı</dt><dd><b>Yok</b></dd>
          <dt>Alt kurul</dt><dd><b>7</b>seçebileceğin</dd>
        </dl>
      </div>
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div><h2>Sana ne katıyor</h2></div>
      <div class="kunye">Dört somut şey</div>
    </div>

    <div class="arsiv">
      <div class="satir">
        <div class="satir-yil">01</div>
        <div>
          <h3>Sektörle mesafeni kapatır</h3>
          <p>
            DataCamp 2025'te NVIDIA'dan bir Senior LLM Technologist, Hepsiburada'nın
            teknoloji direktörü ve Insider'dan bir staff engineer konuştu. Bunlar
            LinkedIn'de mesajına dönmeyecek insanlar. Etkinlikte kahve sırasında
            yanlarında duruyorsun.
          </p>
        </div>
        <div class="satir-veri"><span>DataCamp, Digitalized, TechSummit</span></div>
      </div>

      <div class="satir">
        <div class="satir-yil">02</div>
        <div>
          <h3>CV'ne "üyeydim" değil, "yönettim" yazdırır</h3>
          <p>
            TechSummit'i, DataCamp'i, Digitalized'ı öğrenciler kuruyor: sponsor
            görüşmesi, bütçe, mekân, bilet sistemi, konuşmacı takibi, kriz yönetimi.
            801 kayıtlı bir etkinliğin lojistiğini çevirmiş olmak, mülakatta
            anlatacak gerçek bir hikâye demek.
          </p>
        </div>
        <div class="satir-veri"><span>Yedi alt kurulda görev</span></div>
      </div>

      <div class="satir">
        <div class="satir-yil">03</div>
        <div>
          <h3>Bitirdiğin bir şey olur</h3>
          <p>
            Hackathon (algoRun), oyun geliştirme maratonu (Game Jam), veri atölyeleri.
            Ders projelerinden farkı: süre kısıtlı, ekip senin seçmediğin insanlardan
            oluşuyor ve sonunda ortaya çalışan bir şey çıkması gerekiyor. İş hayatı
            da böyle.
          </p>
        </div>
        <div class="satir-veri"><span>Atölye, hackathon, jam</span></div>
      </div>

      <div class="satir">
        <div class="satir-yil">04</div>
        <div>
          <h3>Otuz iki yıllık bir ağa bağlanırsın</h3>
          <p>
            1994'ten beri bu kulüpten geçen herkes bir yerlerde çalışıyor. Üye
            dizinindeki profiller LinkedIn'e bağlı; kim nerede, ne yapıyor
            görebiliyorsun. Staj ararken tanıdık aramak, tanıdığın olduğunda çok
            daha kolay.
          </p>
        </div>
        <div class="satir-veri"><span><a href="${u('/ekip')}">Üye dizini</a></span></div>
      </div>
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Geçen yıl kimlerden dinledin</h2>
        <p class="bas-alt">Bunlar gerçekleşmiş etkinliklerin kadrosu, gelecek vaadi değil.</p>
      </div>
      <div class="kunye">DataCamp 2025</div>
    </div>
    <div class="tanimlar">
      ${konusmacilar.map((k) => html`
        <div class="tanim">
          <h3>${k.ad}</h3>
          <p>${[k.unvan, k.kurum].filter(Boolean).join(', ')}</p>
        </div>`)}
    </div>
  </div>
</section>

<section class="blok">
  <div class="kap dar">
    <h2 style="font-size:clamp(26px,3.4vw,36px)">Nasıl katılırsın</h2>
    <p style="margin-top:16px;color:#B7C4D3">
      Üyelik ücretsiz ve bölüm şartı yok. Buradan hesap açtığında kulüp üye
      dizininde yerini alırsın; hangi alt kurulda çalışmak istediğini birlikte
      konuşuruz. Etkinliklerin çoğu üye olmayanlara da açık, ama düzenleyen
      tarafta olmak istiyorsan başlangıç noktası burası.
    </p>
    <div style="margin-top:26px;display:flex;gap:12px;flex-wrap:wrap">
      <a class="dugme" href="${u('/kayit')}" data-olcum="uye_ol_tikla" data-olcum-veri="ogrenciler-alt">Hesap aç</a>
      <a class="dugme sade" href="mailto:hello@compec.org">hello@compec.org</a>
    </div>
  </div>
</section>`;

  return duzen({
    baslik: 'Öğrenciler için',
    aciklama: 'COMPEC üyeliği sana ne katar: sektörle temas, gerçek organizasyon deneyimi, bitirilmiş projeler ve otuz iki yıllık bir mezun ağı.',
    etkin: '/ogrenciler', kisi,
  }, icerik);
}

/* ============================ ŞİRKETLER ============================ */
export function sirketler({ kisi, sponsorZinciri, serit, logolar, konusmacilar }) {
  const icerik = html`
<section class="giris">
  <div class="kap">
    <div class="giris-izgara">
      <div>
        <h1>Boğaziçi mühendislik öğrencisiyle <i>aynı salonda</i> olmanın yolu.</h1>
        <p class="giris-ozet">
          İşe almak istediğiniz profil kampüsten çıkmadan önce burada. COMPEC
          1994'ten beri bu öğrencileri bir araya getiriyor ve etkinliklerini
          onlar düzenliyor. Sponsorluk, bir logoyu duvara asmak değil; o salona
          girmek.
        </p>
        <div class="giris-eylem">
          <a class="dugme" href="mailto:hello@compec.org?subject=Sponsorluk%20g%C3%B6r%C3%BC%C5%9Fmesi" data-olcum="sponsor_iletisim" data-olcum-veri="giris">Görüşme talep et</a>
          <a class="dugme sade" href="${u('/')}">Etkinlik arşivi</a>
        </div>
      </div>
      <div class="kulak">
        <dl>
          <dt>En büyük etkinlik</dt><dd><b>TechSummit</b>2026'da 17. baskı</dd>
          <dt>Ölçek kaydı</dt><dd><b>801</b>kayıt, TechSummit 2022</dd>
          <dt>Kesintisiz sponsor</dt><dd><b>2018</b>'den beri</dd>
        </dl>
      </div>
    </div>
  </div>
</section>

${kurumSeridi(serit, logolar)}

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div><h2>Neden buradasınız</h2></div>
      <div class="kunye">Dört gerekçe</div>
    </div>

    <div class="arsiv">
      <div class="satir">
        <div class="satir-yil">01</div>
        <div>
          <h3>İşe alım hunisinin en üstü</h3>
          <p>
            Boğaziçi'nin mühendislik ve bilgisayar bölümleri Türkiye'nin en dar
            kontenjanlı programları. TechSummit 2023'te Güney Kampüs çimlerinde
            teknoloji fuarı kuruldu ve öğrenciler stantlara CV bıraktı. 2025'te
            HubX staj ödüllü bir case study yürüttü. Bu formatlar duruyor.
          </p>
        </div>
        <div class="satir-veri"><span>Stant, case study, CV havuzu</span></div>
      </div>

      <div class="satir">
        <div class="satir-yil">02</div>
        <div>
          <h3>Marka bilinirliği, doğru zamanda</h3>
          <p>
            Öğrenci ilk işini seçerken hangi şirketleri tanıdığına bakar.
            2018'de Huawei ve Facebook Türkiye aynı etkinliğin sponsoruydu.
            O yıl kampüste olan öğrenciler bugün sektörde çalışıyor.
          </p>
        </div>
        <div class="satir-veri"><span>Ana, altın, gümüş kademeler</span></div>
      </div>

      <div class="satir">
        <div class="satir-yil">03</div>
        <div>
          <h3>Teknik ekibiniz için sahne</h3>
          <p>
            Sponsorluk sadece logo değil. Mühendisleriniz atölye verebilir,
            konuşabilir, hackathon problemi koyabilir. Invent Analytics algoRun'da
            veri problemi verdi, invent.ai DataCamp'te atölye yürüttü. Bu, işveren
            markası açısından bir stanttan daha kalıcı.
          </p>
        </div>
        <div class="satir-veri"><span>Atölye, konuşma, hackathon</span></div>
      </div>

      <div class="satir">
        <div class="satir-yil">04</div>
        <div>
          <h3>Yanınızda duracağı belli bir kurum</h3>
          <p>
            Otuz iki yıllık bir kulüp ve kesintisiz süren etkinlik serileri.
            Yapı Kredi Teknoloji iki yıl üst üste ana sponsor oldu. Insider
            2018 ve 2019'da altın sponsordu, 2025'te DataCamp'e konuşmacı verdi.
            İlişki tek seferlik olmak zorunda değil.
          </p>
        </div>
        <div class="satir-veri"><span>Süreklilik</span></div>
      </div>
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Bizimle çalışan kurumlar</h2>
        <p class="bas-alt">
          TechSummit ana sponsor zinciri ve diğer etkinlik ortakları. Logolar
          yerine kayıt: hangi kurum, hangi yıl, hangi kademede.
        </p>
      </div>
      <div class="kunye">${sponsorZinciri.length} kayıt</div>
    </div>

    <div class="tablo-sar"><table class="tablo">
      <thead><tr><th>Kurum</th><th>Etkinlik</th><th>Yıl</th><th>Kademe</th></tr></thead>
      <tbody>
        ${sponsorZinciri.map((k) => html`
          <tr>
            <td><b>${k.ad}</b></td>
            <td>${k.etkinlik === 'techsummit' ? 'TechSummit' : k.etkinlik === 'datacamp' ? 'DataCamp' : k.etkinlik === 'digitalized' ? 'Digitalized' : 'algoRun'}</td>
            <td>${k.yil || ''}</td>
            <td>${k.kademe === 'ana' ? 'Ana sponsor' : k.kademe === 'altin' ? 'Altın' : k.kademe === 'gumus' ? 'Gümüş' : 'Ortak'}</td>
          </tr>`)}
      </tbody>
    </table></div>
  </div>
</section>

<section class="blok">
  <div class="kap dar">
    <h2 style="font-size:clamp(26px,3.4vw,36px)">Konuşalım</h2>
    <p style="margin-top:16px;color:#B7C4D3">
      Hangi etkinlik, hangi format ve hangi bütçe aralığı sizin için anlamlı,
      onu birlikte belirleyelim. Kurumsal İletişim ve Finans ekibimiz güncel
      etkinlik takvimi ve sponsorluk dosyasıyla dönüş yapar.
    </p>
    <div style="margin-top:26px">
      <a class="dugme" href="mailto:hello@compec.org?subject=Sponsorluk%20g%C3%B6r%C3%BC%C5%9Fmesi" data-olcum="sponsor_iletisim" data-olcum-veri="alt">hello@compec.org</a>
    </div>
    <p class="mono" style="margin-top:20px;color:#93A6BD">
      Not: 2026-2027 sezonunun etkinlik takvimi henüz ilan edilmedi. Görüşmede
      güncel tarihleri paylaşırız.
    </p>
  </div>
</section>`;

  return duzen({
    baslik: 'Şirketler için',
    aciklama: 'COMPEC sponsorluğu: Boğaziçi mühendislik öğrencilerine doğrudan erişim, işe alım formatları ve 2018\'den beri süren sponsor zinciri.',
    etkin: '/sirketler', kisi,
  }, icerik);
}
