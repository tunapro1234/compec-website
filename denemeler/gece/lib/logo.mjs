import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { slugla } from './guvenlik.mjs';

const kok = dirname(dirname(fileURLToPath(import.meta.url)));
const dizin = join(kok, 'genel', 'varliklar', 'kurumlogo');

let onbellek = null;
let zaman = 0;

/** Diskteki kurum logolarini slug -> dosya adi olarak dondurur.
 *  30 saniyelik onbellek: yeni logo eklenince servisi yeniden baslatmaya gerek yok. */
export function logoHaritasi() {
  const simdi = Date.now();
  if (onbellek && simdi - zaman < 30000) return onbellek;
  const harita = {};
  try {
    for (const dosya of readdirSync(dizin)) {
      if (!/\.(png|svg|webp|jpg)$/i.test(dosya)) continue;
      harita[dosya.replace(/\.[^.]+$/, '').toLowerCase()] = dosya;
    }
  } catch { /* dizin henuz yok */ }
  onbellek = harita;
  zaman = simdi;
  return harita;
}

/** Bir kurum adi icin logo dosyasi (yoksa null). */
export function logoBul(ad) {
  return logoHaritasi()[slugla(ad)] || null;
}
