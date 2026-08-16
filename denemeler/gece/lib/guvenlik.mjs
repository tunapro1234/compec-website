import { randomBytes, scrypt, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { db } from './db.mjs';

const scryptAsync = promisify(scrypt);

/* ---------------- parola ---------------- */
// scrypt, node:crypto icinde; harici bcrypt/argon2 bagimliligina gerek yok.
const N = 16384, r = 8, p = 1, uzunluk = 64;

export async function parolaOzeti(parola) {
  const tuz = randomBytes(16);
  const ozet = await scryptAsync(parola.normalize('NFKC'), tuz, uzunluk, { N, r, p });
  return `scrypt$${N}$${r}$${p}$${tuz.toString('base64')}$${ozet.toString('base64')}`;
}

export async function parolaDogru(parola, kayit) {
  if (!kayit) return false;
  const [tur, n, rr, pp, tuzB64, ozetB64] = kayit.split('$');
  if (tur !== 'scrypt') return false;
  const tuz = Buffer.from(tuzB64, 'base64');
  const beklenen = Buffer.from(ozetB64, 'base64');
  const ozet = await scryptAsync(parola.normalize('NFKC'), tuz, beklenen.length,
    { N: +n, r: +rr, p: +pp });
  return ozet.length === beklenen.length && timingSafeEqual(ozet, beklenen);
}

/* ---------------- oturum ---------------- */
const OTURUM_SURESI = 30 * 24 * 3600 * 1000; // 30 gun
export const COOKIE_ADI = 'compec_oturum';

const sha = (s) => createHash('sha256').update(s).digest('hex');

export function oturumAc(kisiId, ip, tarayici) {
  const jeton = randomBytes(32).toString('base64url');
  const simdi = Date.now();
  db.prepare(`INSERT INTO oturumlar (id, kisi_id, olusturma, bitis, ip, tarayici)
              VALUES (?, ?, ?, ?, ?, ?)`)
    .run(sha(jeton), kisiId, simdi, simdi + OTURUM_SURESI, ip || null, (tarayici || '').slice(0, 200));
  return jeton;
}

export function oturumBul(jeton) {
  if (!jeton) return null;
  const satir = db.prepare(`
    SELECT o.id AS oturum_id, o.bitis, k.*
    FROM oturumlar o JOIN kisiler k ON k.id = o.kisi_id
    WHERE o.id = ?`).get(sha(jeton));
  if (!satir) return null;
  if (satir.bitis < Date.now()) {
    db.prepare('DELETE FROM oturumlar WHERE id = ?').run(satir.oturum_id);
    return null;
  }
  if (satir.durum === 'pasif') return null;
  return satir;
}

export function oturumKapat(jeton) {
  if (jeton) db.prepare('DELETE FROM oturumlar WHERE id = ?').run(sha(jeton));
}

export function cerezSecenekleri(guvenli) {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: guvenli,
    maxAge: OTURUM_SURESI,
    path: process.env.TEMEL_YOL || '/',
  };
}

/* ---------------- CSRF ---------------- */
// Oturum jetonundan tureyen, sunucuda saklanmayan token (double submit + HMAC benzeri).
const CSRF_GIZLI = process.env.COMPEC_GIZLI || randomBytes(32).toString('hex');

export function csrfUret(jeton) {
  return createHash('sha256').update(CSRF_GIZLI + '|' + (jeton || 'anonim')).digest('base64url');
}

export function csrfDogru(istek) {
  const beklenen = csrfUret(istek.cookies?.[COOKIE_ADI]);
  const gelen = istek.body?._csrf || istek.get('x-csrf-token') || '';
  if (gelen.length !== beklenen.length) return false;
  return timingSafeEqual(Buffer.from(gelen), Buffer.from(beklenen));
}

/* ---------------- hiz siniri ---------------- */
export function hizSiniri(anahtar, limit, pencereMs) {
  const simdi = Date.now();
  const esik = simdi - pencereMs;
  const { adet } = db.prepare('SELECT COUNT(*) AS adet FROM denemeler WHERE anahtar = ? AND zaman > ?')
    .get(anahtar, esik);
  if (adet >= limit) return false;
  db.prepare('INSERT INTO denemeler (anahtar, zaman) VALUES (?, ?)').run(anahtar, simdi);
  return true;
}

export function hizSayaciSifirla(anahtar) {
  db.prepare('DELETE FROM denemeler WHERE anahtar = ?').run(anahtar);
}

/* ---------------- dogrulama ---------------- */
export const IZINLI_ALANLAR = ['boun.edu.tr', 'compec.org'];

export function epostaGecerli(eposta) {
  const e = String(eposta || '').trim().toLowerCase();
  if (e.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return null;
  const alan = e.split('@')[1];
  const uygun = IZINLI_ALANLAR.some((a) => alan === a || alan.endsWith('.' + a));
  return uygun ? e : null;
}

export function baglantiGecerli(url, alanlar) {
  const s = String(url || '').trim();
  if (!s) return null;
  let u;
  try { u = new URL(s.startsWith('http') ? s : 'https://' + s); } catch { return null; }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
  const alan = u.hostname.replace(/^www\./, '');
  if (alanlar && !alanlar.some((a) => alan === a || alan.endsWith('.' + a))) return null;
  u.protocol = 'https:';
  return u.toString();
}

export function metin(deger, enfazla) {
  return String(deger ?? '').replace(/\s+/g, ' ').trim().slice(0, enfazla);
}

export function slugla(ad) {
  const harita = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', İ: 'i', I: 'i' };
  return ad.toLowerCase()
    .replace(/[çğıöşüİI]/g, (c) => harita[c] || c)
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export function benzersizSlug(taban) {
  let slug = taban || 'uye';
  let i = 2;
  const sorgu = db.prepare('SELECT 1 FROM kisiler WHERE slug = ?');
  while (sorgu.get(slug)) slug = `${taban}-${i++}`;
  return slug;
}
