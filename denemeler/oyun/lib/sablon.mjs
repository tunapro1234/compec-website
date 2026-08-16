/* Kucuk sablon katmani: etiketli sablon degistirgeci ile otomatik HTML kacisi.
   Harici sablon motoruna gerek yok; ${} icine giren her sey varsayilan olarak kacisli. */

const KACIS = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function kac(deger) {
  if (deger === null || deger === undefined || deger === false) return '';
  return String(deger).replace(/[&<>"']/g, (c) => KACIS[c]);
}

/** Kacistan muaf tutulacak, zaten guvenli HTML. */
export class Ham {
  constructor(html) { this.html = html; }
  toString() { return this.html; }
}
export const ham = (html) => new Ham(html);

export function html(parcalar, ...degerler) {
  let cikti = parcalar[0];
  for (let i = 0; i < degerler.length; i++) {
    const d = degerler[i];
    if (d instanceof Ham) cikti += d.html;
    else if (Array.isArray(d)) cikti += d.map((x) => (x instanceof Ham ? x.html : kac(x))).join('');
    else cikti += kac(d);
    cikti += parcalar[i + 1];
  }
  return new Ham(cikti);
}

/** Sayiyi Turkce bicimde yaz (1234 -> 1.234) */
export function sayi(n) {
  return typeof n === 'number' ? n.toLocaleString('tr-TR') : '';
}
