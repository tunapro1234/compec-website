import { html, ham } from '../lib/sablon.mjs';
import { u } from './duzen.mjs';

const ETKAD = { techsummit: 'TechSummit', datacamp: 'DataCamp', digitalized: 'Digitalized', algorun: 'algoRun' };
const KADEME = { ana: 'Ana sponsor', altin: 'Altın sponsor', gumus: 'Gümüş sponsor', ortak: 'Ortak' };

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

/** Güncel ana sponsoru öne çıkaran vitrin. */
export function sponsorVitrini(k, dosya) {
  if (!k) return '';
  return html`
    <div class="vitrin">
      <div class="vitrin-logo">
        ${dosya
          ? html`<img src="${u('/genel/varliklar/kurumlogo/' + dosya)}" alt="${k.ad}">`
          : html`<b>${k.ad}</b>`}
      </div>
      <div class="vitrin-yazi">
        <span class="etiket">${ETKAD[k.etkinlik] || k.etkinlik} ${k.yil} · ${KADEME[k.kademe] || ''}</span>
        <h3>${k.yil} yılında ${k.ad} ana sponsorumuz oldu.</h3>
        <p>
          TechSummit'in ana sponsorluğu 2018'den beri kesintisiz devam ediyor:
          Huawei, ING, Yapı Kredi Teknoloji, Acıbadem Technology, HubX ve ${k.ad}.
        </p>
      </div>
    </div>`;
}
