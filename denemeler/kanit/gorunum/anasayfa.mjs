import { html, ham, sayi } from '../lib/sablon.mjs';
import { duzen, u } from './duzen.mjs';
import { kurumSeridi } from './serit.mjs';

const foto = (d) => u('/genel/varliklar/foto/' + d);
const ETIKET_AD = { dogrulanmis: 'doğrulanmış', 'kulup-ici': 'kulüp içi', supheli: 'şüpheli', eksik: 'eksik' };
export const cip = (e) => html`<span class="cip ${e}">${ETIKET_AD[e] || e}</span>`;

export function anasayfa({ kisi, gemiler, digerleri, serit, logolar, kadro, geziler, kunye, uyeSayisi }) {
  const icerik = html`
<section class="kapak">
  <div class="kap">
    <div class="kapak-ic">
      <div>
        <h1>Sektörle aynı salonda olmanın <span>en kısa yolu.</span></h1>
        <p class="kapak-ozet">
          COMPEC 1994'ten beri Boğaziçi Üniversitesi'nde. Etkinlikleri öğrenciler
          kuruyor, konuşmacıları öğrenciler buluyor, sponsorlarını öğrenciler ikna
          ediyor. Aşağıdaki her rakamın kaynağı yazılı; bilmediğimizi de bilmediğimizi
          söylüyoruz.
        </p>
        <div class="kapak-eylem">
          <a class="dugme" href="${u('/kayit')}" data-olcum="uye_ol_tikla" data-olcum-veri="kapak">Aramıza katıl</a>
          <a class="dugme sade" href="${u('/kimlerle')}">Kimlerle tanışırsın</a>
        </div>
      </div>

      <div class="kunye-tablo">
        ${kunye.map((k) => html`
          <div class="kunye-satir">
            <b>${k.deger}</b>
            <div class="ne">
              ${k.iddia}
              <span class="kaynak">${k.kaynak || 'kaynak yok'}</span>
            </div>
          </div>`)}
        <p class="mono" style="margin-top:14px">
          <a href="${u('/kanit')}">Tüm rakamlar ve kaynakları</a>
        </p>
      </div>
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Kulüp sana ne katıyor</h2>
        <p>Dört madde, dördü de gerçekleşmiş etkinliklerden. İsim ve rakam vermeden anlatmıyoruz.</p>
      </div>
      <div class="yan"><a href="${u('/ogrenciler')}">Ayrıntılı anlatım</a></div>
    </div>

    <div class="deger">
      <div class="deger-oge">
        <div class="no">01</div>
        <div>
          <h3>Ulaşamayacağın insanlarla aynı odaya girersin</h3>
          <p>
            Geçen yıl DataCamp'te NVIDIA'dan bir Senior LLM Technologist, Hepsiburada'nın
            teknoloji direktörü ve Insider'dan bir staff engineer konuştu. Digitalized'de
            Insider'ın kurucu ortağı ve iki risk sermayesi şirketinden yatırımcı vardı.
            Bunlar LinkedIn'de mesajına dönmeyecek insanlar; etkinlikte kahve sırasında
            yanlarında duruyorsun.
          </p>
          <div class="kanit-not">
            ${kadro.length} konuşmacının adı, kurumu ve konuşma başlığı kayıtlı ·
            <a href="${u('/kimlerle')}">kadroyu gör</a>
          </div>
        </div>
      </div>

      <div class="deger-oge">
        <div class="no">02</div>
        <div>
          <h3>Şirketlerin içine girersin</h3>
          <p>
            Sadece dinlemek değil. TechSummit 2018'de on şirkete teknik gezi düzenlendi:
            ${geziler.map((g) => g.kurum).join(', ')}. Ofisi görmek, ekiple konuşmak ve
            işin nasıl yürüdüğünü yerinde anlamak bambaşka bir şey.
          </p>
          <div class="kanit-not">Kaynak: Youthall etkinlik kaydı, 2018 ${cip('dogrulanmis')}</div>
        </div>
      </div>

      <div class="deger-oge">
        <div class="no">03</div>
        <div>
          <h3>CV'ne "üyeydim" değil "yönettim" yazarsın</h3>
          <p>
            TechSummit'i, DataCamp'i, Digitalized'ı öğrenciler kuruyor: sponsor görüşmesi,
            bütçe, mekân, bilet sistemi, konuşmacı takibi, kriz yönetimi. 801 kayıtlı bir
            etkinliğin lojistiğini Garanti Kültür Merkezi'nde çevirmiş olmak, mülakatta
            anlatacak gerçek bir hikâye demek.
          </p>
          <div class="kanit-not">
            Yedi alt kuruldan birinde görev alınır · TechSummit 2022 kaydı 801, kaynak Kommunity
            ${cip('dogrulanmis')}
          </div>
        </div>
      </div>

      <div class="deger-oge">
        <div class="no">04</div>
        <div>
          <h3>Bitirdiğin bir şey olur</h3>
          <p>
            algoRun'da Invent Analytics gerçek bir veri problemi koydu. Game Jam'de hafta
            sonunda oynanabilir bir prototip çıkarman gerekiyor. DataCamp atölyelerini
            invent.ai, Lyrebird Studio, Buluttan ve iki yapay zekâ girişiminin kurucuları
            yürüttü. Ders projesinden farkı: süre kısıtlı, ekibi sen seçmiyorsun, sonunda
            çalışan bir şey çıkması gerekiyor.
          </p>
          <div class="kanit-not">Atölye ve hackathon kadrosu etkinlik sayfalarında kayıtlı</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="bolum" style="padding-top:0">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Amiral gemilerimiz</h2>
        <p>Her birinin kendi sayfasında baskı zinciri, konuşmacı kadrosu ve destekleyen kurumlar var.</p>
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
      <div><h2>Bunları da yapıyoruz</h2></div>
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
            <span style="color:var(--mavi-parlak)">Ayrıntı</span>
          </div>
        </a>`)}
    </div>
  </div>
</section>

<section class="bolum" style="padding-top:0">
  <div class="kap">
    <div class="bas"><div><h2>Buradan devam et</h2></div></div>
    <div class="kapilar">
      <a class="kapi" href="${u('/ogrenciler')}" data-olcum="ogrenci_sayfasi_tikla">
        <span>Öğrenciysen</span>
        <h3>Ne kazanırsın, nasıl katılırsın</h3>
        <p>Kimlerle tanışacağın, hangi alt kurulda çalışabileceğin ve karşılığında ne ödediğin.</p>
        <span class="git">Öğrenciler için &rarr;</span>
      </a>
      <a class="kapi" href="${u('/sirketler')}" data-olcum="sirket_sayfasi_tikla">
        <span>Şirketseniz</span>
        <h3>Kime ulaşırsınız</h3>
        <p>Erişim formatları, geçmiş baskıların kaynaklı rakamları ve birlikte çalıştığımız kurumlar.</p>
        <span class="git">Şirketler için &rarr;</span>
      </a>
      <a class="kapi" href="${u('/kanit')}">
        <span>Şüpheciysen</span>
        <h3>Rakamlar ve kaynakları</h3>
        <p>Her sayının nereden geldiği, hangisinin bağımsız kaynakla doğrulandığı ve neyi bilmediğimiz.</p>
        <span class="git">Kanıt sayfası &rarr;</span>
      </a>
    </div>
  </div>
</section>`;

  return duzen({
    baslik: 'Boğaziçi Üniversitesi Bilişim Kulübü',
    aciklama: "1994'ten beri Boğaziçi Üniversitesi'nde teknoloji. Sitedeki her rakamın kaynağı yazılı.",
    etkin: '/', kisi,
  }, icerik);
}
