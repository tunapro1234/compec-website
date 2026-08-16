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
    <div class="cerceve">
      <div class="kapak-ic">
        <div>
          <p class="skor">Press start</p>
          <h1 style="margin-top:16px">
            <span class="kucuk">1994'ten beri</span>
            <span class="iri blokyazi">Oyundayız</span>
          </h1>
          <p class="kapak-ozet">
            COMPEC 1994'te kuruldu ve o zamandan beri her yıl aynı şeyi yapıyor:
            sektörü kampüse getirmek. Etkinlikleri öğrenciler kuruyor, konuşmacıları
            öğrenciler buluyor, sponsorları öğrenciler ikna ediyor. Aşağıdaki her
            rakamın kaynağı yazılı, çünkü blöf yapmıyoruz.
          </p>
          <div class="kapak-eylem">
            <a class="dugme kirmizi" href="${u('/kayit')}" data-olcum="uye_ol_tikla" data-olcum-veri="kapak">Oyuna katıl</a>
            <a class="dugme sade" href="${u('/kimlerle')}">Kimler geldi?</a>
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
          <p class="mono" style="margin-top:12px">
            <a href="${u('/kanit')}">Tüm skorlar ve kaynakları</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Bu işten sana ne kalır?</h2>
        <p>Dört madde. Hiçbiri "kendini geliştirme fırsatı" gibi bir şey değil, hepsi isim ve rakam.</p>
      </div>
      <div class="yan"><a href="${u('/ogrenciler')}">Uzun hâli</a></div>
    </div>

    <div class="deger">
      <div class="deger-oge">
        <div class="no">01</div>
        <div>
          <h3>Mesajına dönmeyecek insanlarla aynı odaya girersin</h3>
          <p>
            Geçen yıl DataCamp'te NVIDIA'dan bir Senior LLM Technologist, Hepsiburada'nın
            teknoloji direktörü ve Insider'dan bir staff engineer konuştu. Digitalized'de
            Insider'ın kurucu ortağı ve iki risk sermayesi şirketinden yatırımcı vardı.
            Kahve sırasında yanlarında duruyorsun, tek yapman gereken selam vermek.
          </p>
          <div class="kanit-not">
            ${kadro.length} kişinin adı, kurumu ve konuşma başlığı kayıtlı ·
            <a href="${u('/kimlerle')}">kadroyu gör</a>
          </div>
        </div>
      </div>

      <div class="deger-oge">
        <div class="no">02</div>
        <div>
          <h3>Şirketlerin içine girersin, dışından bakmakla kalmazsın</h3>
          <p>
            TechSummit 2018'de on şirkete teknik gezi düzenlendi:
            ${geziler.map((g) => g.kurum).join(', ')}. Ofisi görmek, ekiple konuşmak
            ve işin gerçekte nasıl yürüdüğünü anlamak bir sunum dinlemekten farklı.
          </p>
          <div class="kanit-not">Kaynak: Youthall etkinlik kaydı, 2018 ${cip('dogrulanmis')}</div>
        </div>
      </div>

      <div class="deger-oge">
        <div class="no">03</div>
        <div>
          <h3>CV'nde "üyeydim" değil "yönettim" yazar</h3>
          <p>
            TechSummit'i, DataCamp'i, Digitalized'ı öğrenciler kuruyor. Sponsor görüşmesi,
            bütçe, mekân, bilet sistemi, konuşmacı takibi ve kaçınılmaz kriz yönetimi
            dahil. 801 kayıtlı bir etkinliği Garanti Kültür Merkezi'nde çevirmiş olmak
            mülakatta anlatacak gerçek bir hikâye demek.
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
          <h3>Sonunda çalışan bir şey çıkar</h3>
          <p>
            algoRun'da Invent Analytics gerçek bir veri problemi koydu. Game Jam'de hafta
            sonu bitmeden oynanabilir bir prototip çıkarman gerekiyor. DataCamp atölyelerini
            invent.ai, Lyrebird Studio, Buluttan ve iki yapay zekâ girişiminin kurucuları
            yürüttü. Ders projesinden farkı: süre kısa, ekibi sen seçmiyorsun, mazeret yok.
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
        <h2>Büyük maçlar</h2>
        <p>Üçü de yıllardır kesintisiz. Her birinin sayfasında baskı zinciri, konuşmacı kadrosu ve destekleyenler var.</p>
      </div>
      <div class="yan"><a href="${u('/etkinlikler')}">Tümü</a></div>
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
      <div><h2>Bir de bunlar var</h2></div>
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
            <span style="color:var(--sari)">Aç</span>
          </div>
        </a>`)}
    </div>
  </div>
</section>

<section class="bolum" style="padding-top:0">
  <div class="kap">
    <div class="bas"><div><h2>Sıra sende</h2></div></div>
    <div class="kapilar">
      <a class="kapi" href="${u('/ogrenciler')}" data-olcum="ogrenci_sayfasi_tikla">
        <span>Öğrenciysen</span>
        <h3>Ne kazanırsın</h3>
        <p>Kimlerle tanışacağın, hangi alt kurulda çalışabileceğin ve bunun ne kadar tuttuğu (pek tutmuyor).</p>
        <span class="git">Öğrenciler için &rarr;</span>
      </a>
      <a class="kapi" href="${u('/sirketler')}" data-olcum="sirket_sayfasi_tikla">
        <span>Şirketseniz</span>
        <h3>Kime ulaşırsınız</h3>
        <p>Erişim formatları, geçmiş baskıların kaynaklı rakamları ve birlikte çalıştığımız kurumlar.</p>
        <span class="git">Şirketler için &rarr;</span>
      </a>
      <a class="kapi" href="${u('/oduller')}">
        <span>Meraklıysan</span>
        <h3>Ödül arşivi</h3>
        <p>Boğaziçi Bilişim Ödülleri'nin 2013'ten bugüne 222 kazananı, her satırda kaynağıyla.</p>
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
