import { html, ham } from '../lib/sablon.mjs';
import { u } from './duzen.mjs';

/* Kurum etiketi ("TechSummit 2026 · Ana sponsor" gibi) burada değil sunucuda
   üretiliyor: seritKurumlari() sponsorlarla konuşmacı kurumlarını birleştirip
   her ögeye kendi etiketini yazıyor. Şerit yalnızca k.etiket'i basar. */

/** YC tarzı akan kurum şeridi. Logosu olan kurum logoyla, olmayan adıyla görünür. */
export function kurumSeridi(kurumlar, logolar) {
  // aynı kurum birden çok yıl sponsor olduysa tek kez göster, en yeni bağlamıyla
  const gorulen = new Set();
  const ogeler = [];
  for (const k of kurumlar) {
    if (gorulen.has(k.ad)) continue;
    gorulen.add(k.ad);
    ogeler.push(k);
  }
  if (!ogeler.length) return '';

  const oge = (k) => {
    const dosya = logolar[k.ad];
    return html`
      <div class="serit-oge${ham(k.anaSponsor ? ' ana' : '')}">
        ${dosya
          ? html`<img src="${u('/genel/varliklar/kurumlogo/' + dosya)}" alt="${k.ad}" loading="lazy">`
          : html`<b>${k.ad}</b>`}
        <i>${k.etiket}</i>
      </div>`;
  };

  // Akış hızı içerik uzunluğundan bağımsız olsun: öge başına sabit süre.
  // Rahat okunan hız yaklaşık 45 piksel/saniye; öge genişliği ortalama 200 piksel.
  const sure = Math.max(90, Math.round(ogeler.length * 4.4));

  // kesintisiz akış için liste iki kez basılır
  return html`
    <div class="serit-sar" aria-label="Etkinliklerimizi destekleyen kurumlar">
      <div class="serit" style="--sure:${sure}s">
        ${ogeler.map(oge)}${ogeler.map(oge)}
      </div>
    </div>`;
}

/* Ana sponsoru ŞERİDİN DIŞINDA ayrı bir vitrinde gösteren blok BİLEREK YOK.
   Bir kez denendi ve kullanıcı reddetti: "akbank niye ayrı bi yere koydun?".
   Sponsoru öne çıkarmak isteniyor, ama şeritten kopararak değil. Çözüm
   kurumSeridi'nin içinde: sponsorlar ve konuşmacı kurumları tek şeritte akıyor,
   her öge kendi kademe etiketini taşıyor. Yeniden ayrı vitrin ekleme. */
