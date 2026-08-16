import express from 'express';
import { randomBytes } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './lib/db.mjs';
import {
  parolaOzeti, parolaDogru, oturumAc, oturumBul, oturumKapat, cerezSecenekleri,
  COOKIE_ADI, csrfUret, csrfDogru, hizSiniri, hizSayaciSifirla,
  epostaGecerli, baglantiGecerli, metin, slugla, benzersizSlug,
} from './lib/guvenlik.mjs';
import { ogrenciler, sirketler } from './gorunum/sayfalar.mjs';
import { anasayfa } from './gorunum/anasayfa.mjs';
import { uyeler, uyeSayfasi } from './gorunum/dizin.mjs';
import { etkinlikListesi, etkinlikSayfasi, kurumlarSayfasi } from './gorunum/etkinlik.mjs';
import { giris, kayit, panel, yonetim, hataSayfasi, oylarSayfasi } from './gorunum/hesap.mjs';
import { TEMEL } from './gorunum/duzen.mjs';
import { logoBul } from './lib/logo.mjs';

const kok = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8412);
const GUVENLI = process.env.GUVENLI_CEREZ !== '0';
const ADMIN_EPOSTA = (process.env.COMPEC_ADMIN || '').toLowerCase();

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);

const yol = express.Router();

/* ---------------- ara katmanlar ---------------- */
app.use((istek, cevap, sonraki) => {
  cevap.setHeader('X-Content-Type-Options', 'nosniff');
  cevap.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  cevap.setHeader('X-Frame-Options', 'DENY');
  // Yazi tipleri kendi sunucumuzdan; disariya sadece PostHog'a izin var.
  cevap.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "img-src 'self' data: https://eu.i.posthog.com",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "script-src 'self' 'unsafe-inline' https://eu-assets.i.posthog.com",
    "connect-src 'self' https://eu.i.posthog.com https://eu-assets.i.posthog.com",
    "worker-src 'self' blob:",
    "form-action 'self'", "frame-ancestors 'none'", "base-uri 'none'",
  ].join('; '));
  sonraki();
});

yol.use(express.urlencoded({ extended: false, limit: '64kb' }));
yol.use('/api', express.json({ limit: '16kb' }));

// cerez cozumleyici (harici bagimlilik yok)
yol.use((istek, _cevap, sonraki) => {
  istek.cookies = {};
  const ham = istek.headers.cookie;
  if (ham) for (const parca of ham.split(';')) {
    const i = parca.indexOf('=');
    if (i > 0) istek.cookies[parca.slice(0, i).trim()] = decodeURIComponent(parca.slice(i + 1).trim());
  }
  sonraki();
});

// oturum
yol.use((istek, _cevap, sonraki) => {
  istek.jeton = istek.cookies[COOKIE_ADI];
  istek.kisi = oturumBul(istek.jeton);
  istek.csrf = csrfUret(istek.jeton);
  sonraki();
});

yol.use('/genel', express.static(join(kok, 'genel'), { maxAge: '7d', index: false }));

const gonder = (cevap, sayfa, kod = 200) => cevap.status(kod).type('html').send(String(sayfa));
const ip = (istek) => (istek.ip || '').replace(/^::ffff:/, '');

function girisGerekli(istek, cevap, sonraki) {
  if (!istek.kisi) return cevap.redirect(TEMEL + '/giris');
  sonraki();
}
function yetkiGerekli(istek, cevap, sonraki) {
  if (!istek.kisi) return cevap.redirect(TEMEL + '/giris');
  if (istek.kisi.rol !== 'admin' && istek.kisi.rol !== 'yonetim')
    return gonder(cevap, hataSayfasi({ kisi: istek.kisi, kod: 403, mesaj: 'Bu sayfaya erişim yetkin yok.' }), 403);
  sonraki();
}
function csrfGerekli(istek, cevap, sonraki) {
  if (!csrfDogru(istek))
    return gonder(cevap, hataSayfasi({ kisi: istek.kisi, kod: 400, mesaj: 'Form oturumu doğrulanamadı. Sayfayı yenileyip tekrar dene.' }), 400);
  sonraki();
}

/* ---------------- sorgular ---------------- */
const S = {
  etkinlikler: db.prepare('SELECT * FROM etkinlikler WHERE yayinda = 1 ORDER BY sira'),
  konusmacilar: db.prepare('SELECT * FROM konusmacilar ORDER BY yil DESC, sira'),
  konusmacilarEtkinlik: db.prepare('SELECT * FROM konusmacilar WHERE etkinlik = ? AND yil = ? ORDER BY sira'),
  kurumlar: db.prepare('SELECT * FROM kurumlar ORDER BY sira'),
  uyeSayisi: db.prepare("SELECT COUNT(*) c FROM kisiler WHERE durum='onayli' AND goster=1"),
  donemler: db.prepare(`SELECT donem, COUNT(*) adet FROM kisiler
                        WHERE durum='onayli' AND goster=1 AND donem IS NOT NULL
                        GROUP BY donem ORDER BY donem DESC`),
  kisiSlug: db.prepare('SELECT * FROM kisiler WHERE slug = ?'),
  kisiEposta: db.prepare('SELECT * FROM kisiler WHERE eposta = ?'),
  kisiId: db.prepare('SELECT * FROM kisiler WHERE id = ?'),
  bekleyen: db.prepare("SELECT * FROM kisiler WHERE durum='beklemede' ORDER BY olusturma DESC"),
  tumKisiler: db.prepare("SELECT * FROM kisiler WHERE durum='onayli' ORDER BY donem DESC, ad"),
  adminVar: db.prepare("SELECT COUNT(*) c FROM kisiler WHERE rol='admin'"),
  guncelEkip: db.prepare(`SELECT * FROM kisiler WHERE durum='onayli' AND goster=1
                          AND donem='2025-2026' ORDER BY id`),
  etkinlikSlug: db.prepare('SELECT * FROM etkinlikler WHERE slug = ? AND yayinda = 1'),
  baskilar: db.prepare('SELECT * FROM baskilar WHERE etkinlik = ? ORDER BY yil DESC'),
  konusmaciEtk: db.prepare('SELECT * FROM konusmacilar WHERE etkinlik = ? ORDER BY yil DESC, sira'),
  sponsorEtk: db.prepare('SELECT * FROM kurumlar WHERE etkinlik = ? ORDER BY sira'),
  etkinlikSayilar: db.prepare(`
    SELECT e.*,
      (SELECT COUNT(*) FROM baskilar b WHERE b.etkinlik = e.slug)     AS baski_adet,
      (SELECT COUNT(*) FROM konusmacilar k WHERE k.etkinlik = e.slug) AS konusmaci_adet
    FROM etkinlikler e WHERE e.yayinda = 1 ORDER BY e.sira`),
};

/** Şeritte gösterilecek kurum listesi: sponsorlar + konuşmacı kurumları.
 *  Etiket ayrımı korunur, sponsor olmayan kurum sponsor gibi gösterilmez. */
function seritKurumlari() {
  const liste = [];
  const gorulen = new Set();
  const kurumlar = S.kurumlar.all();
  // en yeni yılın ana sponsoru şeritte öne çıkarılır
  const guncel = kurumlar.filter((k) => k.kademe === 'ana')
    .reduce((a, b) => ((b.yil || 0) > (a?.yil || 0) ? b : a), null);
  for (const k of kurumlar) {
    if (gorulen.has(k.ad)) continue;
    gorulen.add(k.ad);
    const bu = guncel && k.ad === guncel.ad && k.yil === guncel.yil;
    liste.push({
      ad: k.ad,
      etiket: bu ? `${k.yil} ana sponsoru`
        : [k.kademe === 'ana' ? 'ana sponsor' : 'sponsor', k.yil].filter(Boolean).join(' '),
      anaSponsor: bu,
    });
  }
  // öne çıkan kurum şeridin başında dursun
  liste.sort((a, b) => (b.anaSponsor ? 1 : 0) - (a.anaSponsor ? 1 : 0));
  for (const k of S.konusmacilar.all()) {
    const ad = k.kurum;
    if (!ad || gorulen.has(ad)) continue;
    gorulen.add(ad);
    liste.push({ ad, etiket: ['konuşmacı', k.yil].filter(Boolean).join(' ') });
  }
  return liste;
}

/** Kurum adi -> logo dosyasi eslemesi (diskte olanlar). */
function logoEslemesi(kurumlar) {
  const h = {};
  for (const k of kurumlar) if (!(k.ad in h)) h[k.ad] = logoBul(k.ad);
  return h;
}

/* SQLite'ın LIKE'ı yalnızca ASCII için harf büyüklüğü katlar; "yilmaz" araması
   "Yılmaz" ile eşleşmez. Türkçe karakterleri sadeleştirip karşılaştırıyoruz. */
const TR_HARITA = { ı: 'i', İ: 'i', ş: 's', Ş: 's', ğ: 'g', Ğ: 'g',
                    ü: 'u', Ü: 'u', ö: 'o', Ö: 'o', ç: 'c', Ç: 'c', I: 'i' };
function sadelestir(metin) {
  return String(metin || '')
    .replace(/[ıİşŞğĞüÜöÖçÇI]/g, (c) => TR_HARITA[c])
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function uyeAra({ donem, q }) {
  let sql = "SELECT * FROM kisiler WHERE durum='onayli' AND goster=1";
  const p = [];
  if (donem) { sql += ' AND donem = ?'; p.push(donem); }
  sql += " ORDER BY CASE WHEN donem='2025-2026' THEN 0 ELSE 1 END, donem DESC, ad";
  const satirlar = db.prepare(sql).all(...p);
  if (!q) return satirlar;
  const aranan = sadelestir(q);
  return satirlar.filter((k) =>
    sadelestir(k.ad).includes(aranan) || sadelestir(k.gorev).includes(aranan));
}

/* ---------------- genel sayfalar ---------------- */
yol.get('/', (istek, cevap) => {
  const kurumlar = S.kurumlar.all();
  const serit = seritKurumlari();
  const hepsi = S.etkinlikler.all();
  const AMIRAL = ['techsummit', 'datacamp', 'digitalized'];
  gonder(cevap, anasayfa({
    kisi: istek.kisi,
    gemiler: AMIRAL.map((s) => hepsi.find((e) => e.slug === s)).filter(Boolean),
    digerleri: hepsi.filter((e) => !AMIRAL.includes(e.slug)),
    serit,
    logolar: logoEslemesi([...kurumlar, ...serit]),
    ekip: S.guncelEkip.all(),
    uyeSayisi: S.uyeSayisi.get().c,
  }));
});

yol.get('/ogrenciler', (istek, cevap) => gonder(cevap, ogrenciler({
  kisi: istek.kisi,
  konusmacilar: S.konusmacilarEtkinlik.all('datacamp', 2025),
})));

yol.get('/sirketler', (istek, cevap) => {
  const kurumlar = S.kurumlar.all();
  const serit = seritKurumlari();
  gonder(cevap, sirketler({
    kisi: istek.kisi,
    sponsorZinciri: kurumlar,
    serit,
    logolar: logoEslemesi([...kurumlar, ...serit]),
    konusmacilar: S.konusmacilar.all(),
  }));
});

yol.get('/etkinlikler', (istek, cevap) => gonder(cevap, etkinlikListesi({
  kisi: istek.kisi, etkinlikler: S.etkinlikSayilar.all(),
})));

yol.get('/etkinlik/:slug', (istek, cevap) => {
  const e = S.etkinlikSlug.get(istek.params.slug);
  if (!e) return gonder(cevap, hataSayfasi({ kisi: istek.kisi, kod: 404, mesaj: 'Böyle bir etkinlik kaydı yok.' }), 404);
  gonder(cevap, etkinlikSayfasi({
    kisi: istek.kisi, e,
    baskilar: S.baskilar.all(e.slug),
    konusmacilar: S.konusmaciEtk.all(e.slug),
    sponsorlar: S.sponsorEtk.all(e.slug),
  }));
});

yol.get('/kurumlar', (istek, cevap) => {
  const kurumlar = S.kurumlar.all();
  gonder(cevap, kurumlarSayfasi({ kisi: istek.kisi, kurumlar, logolar: logoEslemesi(kurumlar) }));
});

yol.get('/uyeler', (istek, cevap) => cevap.redirect(301, TEMEL + '/ekip' + (istek.originalUrl.includes('?') ? '?' + istek.originalUrl.split('?')[1] : '')));

yol.get('/ekip', (istek, cevap) => {
  const donem = metin(istek.query.donem, 20) || null;
  const q = metin(istek.query.q, 40) || null;
  const liste = uyeAra({ donem, q });
  gonder(cevap, uyeler({
    kisi: istek.kisi, liste, donemler: S.donemler.all(),
    secili: donem, arama: q, toplam: S.uyeSayisi.get().c,
  }));
});

yol.get('/uye/:slug', (istek, cevap) => {
  const k = S.kisiSlug.get(istek.params.slug);
  if (!k || k.durum !== 'onayli' || !k.goster)
    return gonder(cevap, hataSayfasi({ kisi: istek.kisi, kod: 404, mesaj: 'Böyle bir üye kaydı bulunamadı.' }), 404);
  gonder(cevap, uyeSayfasi({ kisi: istek.kisi, k, benMi: istek.kisi?.id === k.id }));
});

/* ---------------- giriş ---------------- */
yol.get('/giris', (istek, cevap) => {
  if (istek.kisi) return cevap.redirect(TEMEL + '/panel');
  gonder(cevap, giris({ kisi: null, csrf: istek.csrf, bilgi: istek.query.yeni ? 'Hesabın oluşturuldu. Yönetim onayından sonra dizinde görüneceksin.' : null }));
});

yol.post('/giris', csrfGerekli, async (istek, cevap) => {
  const eposta = String(istek.body.eposta || '').trim().toLowerCase();
  const parola = String(istek.body.parola || '');
  const anahtar = 'giris:' + ip(istek);

  if (!hizSiniri(anahtar, 10, 15 * 60 * 1000))
    return gonder(cevap, giris({ kisi: null, csrf: istek.csrf, eposta, hata: 'Çok fazla deneme yapıldı. On beş dakika sonra tekrar dene.' }), 429);

  const k = S.kisiEposta.get(eposta);
  const uydu = k && k.sifre_hash ? await parolaDogru(parola, k.sifre_hash) : false;

  if (!uydu)
    return gonder(cevap, giris({ kisi: null, csrf: istek.csrf, eposta, hata: 'E-posta veya parola hatalı.' }), 401);
  if (k.durum === 'pasif')
    return gonder(cevap, giris({ kisi: null, csrf: istek.csrf, eposta, hata: 'Bu hesap kapatılmış.' }), 403);

  hizSayaciSifirla(anahtar);
  const jeton = oturumAc(k.id, ip(istek), istek.get('user-agent'));
  cevap.cookie(COOKIE_ADI, jeton, cerezSecenekleri(GUVENLI));
  cevap.redirect(TEMEL + '/panel');
});

/* ---------------- kayıt ---------------- */
yol.get('/kayit', (istek, cevap) => {
  if (istek.kisi) return cevap.redirect(TEMEL + '/panel');
  gonder(cevap, kayit({ kisi: null, csrf: istek.csrf }));
});

yol.post('/kayit', csrfGerekli, async (istek, cevap) => {
  const d = {
    ad: metin(istek.body.ad, 80),
    eposta: String(istek.body.eposta || '').trim().toLowerCase(),
    bolum: metin(istek.body.bolum, 60),
    giris_yili: parseInt(istek.body.giris_yili, 10) || null,
    linkedin: metin(istek.body.linkedin, 200),
  };
  const bas = (hata, kod = 400) => gonder(cevap, kayit({ kisi: null, csrf: istek.csrf, hata, deger: d }), kod);

  if (!hizSiniri('kayit:' + ip(istek), 5, 60 * 60 * 1000))
    return bas('Çok fazla kayıt denemesi yapıldı. Bir saat sonra tekrar dene.', 429);
  if (d.ad.length < 3) return bas('Ad ve soyadını yaz.');

  const eposta = epostaGecerli(d.eposta);
  if (!eposta) return bas(`Yalnızca boun.edu.tr veya compec.org uzantılı e-posta adresleri kabul ediliyor.`);
  if (S.kisiEposta.get(eposta)) return bas('Bu e-posta adresiyle bir hesap zaten var.');

  const parola = String(istek.body.parola || '');
  if (parola.length < 10) return bas('Parola en az 10 karakter olmalı.');

  const linkedin = d.linkedin ? baglantiGecerli(d.linkedin, ['linkedin.com']) : null;
  if (d.linkedin && !linkedin) return bas('LinkedIn adresi geçerli görünmüyor.');

  if (d.giris_yili && (d.giris_yili < 1994 || d.giris_yili > 2030)) d.giris_yili = null;

  const ilkAdmin = ADMIN_EPOSTA && eposta === ADMIN_EPOSTA && S.adminVar.get().c === 0;
  const hash = await parolaOzeti(parola);
  const slug = benzersizSlug(slugla(d.ad));

  const sonuc = db.prepare(`
    INSERT INTO kisiler (slug, ad, eposta, sifre_hash, rol, durum, bolum, giris_yili, linkedin, kaynak, goster)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'kayit', 1)`)
    .run(slug, d.ad, eposta, hash,
      ilkAdmin ? 'admin' : 'uye',
      ilkAdmin ? 'onayli' : 'beklemede',
      d.bolum || null, d.giris_yili, linkedin);

  const jeton = oturumAc(sonuc.lastInsertRowid, ip(istek), istek.get('user-agent'));
  cevap.cookie(COOKIE_ADI, jeton, cerezSecenekleri(GUVENLI));
  cevap.redirect(TEMEL + '/panel');
});

/* ---------------- çıkış ---------------- */
yol.get('/cikis', (istek, cevap) => {
  oturumKapat(istek.jeton);
  cevap.clearCookie(COOKIE_ADI, cerezSecenekleri(GUVENLI));
  cevap.redirect(TEMEL + '/');
});

/* ---------------- panel ---------------- */
yol.get('/panel', girisGerekli, (istek, cevap) =>
  gonder(cevap, panel({ kisi: istek.kisi, csrf: istek.csrf, bilgi: istek.query.ok ? 'Kaydedildi.' : null })));

yol.post('/panel', girisGerekli, csrfGerekli, (istek, cevap) => {
  const ad = metin(istek.body.ad, 80);
  if (ad.length < 3)
    return gonder(cevap, panel({ kisi: istek.kisi, csrf: istek.csrf, hata: 'Ad ve soyadını yaz.' }), 400);

  const linkedinHam = metin(istek.body.linkedin, 200);
  const githubHam = metin(istek.body.github, 200);
  const linkedin = linkedinHam ? baglantiGecerli(linkedinHam, ['linkedin.com']) : null;
  const github = githubHam ? baglantiGecerli(githubHam, ['github.com']) : null;
  if (linkedinHam && !linkedin)
    return gonder(cevap, panel({ kisi: istek.kisi, csrf: istek.csrf, hata: 'LinkedIn adresi geçerli görünmüyor.' }), 400);
  if (githubHam && !github)
    return gonder(cevap, panel({ kisi: istek.kisi, csrf: istek.csrf, hata: 'GitHub adresi geçerli görünmüyor.' }), 400);

  let yil = parseInt(istek.body.giris_yili, 10) || null;
  if (yil && (yil < 1994 || yil > 2030)) yil = null;

  db.prepare(`UPDATE kisiler SET ad=?, bolum=?, giris_yili=?, kurul=?, linkedin=?, github=?,
              hakkinda=?, goster=?, guncelleme=datetime('now') WHERE id=?`)
    .run(ad, metin(istek.body.bolum, 60) || null, yil, metin(istek.body.kurul, 40) || null,
      linkedin, github, metin(istek.body.hakkinda, 400) || null,
      istek.body.goster ? 1 : 0, istek.kisi.id);

  cevap.redirect(TEMEL + '/panel?ok=1');
});

yol.post('/panel/parola', girisGerekli, csrfGerekli, async (istek, cevap) => {
  const eski = String(istek.body.eski || '');
  const yeni = String(istek.body.yeni || '');
  const kisi = { ...istek.kisi };

  if (!(await parolaDogru(eski, kisi.sifre_hash)))
    return gonder(cevap, panel({ kisi, csrf: istek.csrf, hata: 'Mevcut parola hatalı.' }), 401);
  if (yeni.length < 10)
    return gonder(cevap, panel({ kisi, csrf: istek.csrf, hata: 'Yeni parola en az 10 karakter olmalı.' }), 400);

  db.prepare('UPDATE kisiler SET sifre_hash=?, guncelleme=datetime(\'now\') WHERE id=?')
    .run(await parolaOzeti(yeni), kisi.id);
  // diger oturumlari kapat
  db.prepare('DELETE FROM oturumlar WHERE kisi_id=? AND id != ?')
    .run(kisi.id, istek.kisi.oturum_id);
  cevap.redirect(TEMEL + '/panel?ok=1');
});

/* ---------------- yönetim ---------------- */
yol.get('/panel/yonetim', yetkiGerekli, (istek, cevap) =>
  gonder(cevap, yonetim({
    kisi: istek.kisi, bekleyen: S.bekleyen.all(), tumu: S.tumKisiler.all(),
    csrf: istek.csrf, bilgi: istek.query.ok ? 'Kaydedildi.' : null,
  })));

yol.post('/panel/yonetim/durum', yetkiGerekli, csrfGerekli, (istek, cevap) => {
  const durum = istek.body.durum === 'onayli' ? 'onayli' : 'pasif';
  const hedef = S.kisiId.get(parseInt(istek.body.id, 10));
  if (hedef && hedef.rol !== 'admin')
    db.prepare('UPDATE kisiler SET durum=?, guncelleme=datetime(\'now\') WHERE id=?').run(durum, hedef.id);
  cevap.redirect(TEMEL + '/panel/yonetim?ok=1');
});

yol.post('/panel/yonetim/baglanti', yetkiGerekli, csrfGerekli, (istek, cevap) => {
  const ham = metin(istek.body.linkedin, 200);
  const linkedin = ham ? baglantiGecerli(ham, ['linkedin.com']) : null;
  if (!ham || linkedin)
    db.prepare('UPDATE kisiler SET linkedin=?, guncelleme=datetime(\'now\') WHERE id=?')
      .run(linkedin, parseInt(istek.body.id, 10));
  cevap.redirect(TEMEL + '/panel/yonetim?ok=1');
});


/* ================= OYLAMA API (website hub'i icin) =================
   Hub sayfasi (compec.tunapro.xyz/website/) buradaki uclara ayni kaynaktan
   istek atar. Oy basina ayirt edici veri toplanir: kalici cerez kimligi, IP,
   tarayici, dil, ekran, saat dilimi, platform ve istemci parmak izi.
   Ayni (surum, cerez) ikilisi tek kayittir; tekrar oy verirse gunceller.      */
const OY_CEREZ = 'compec_oy_kimlik';

function oyKimligi(istek, cevap) {
  let k = istek.cookies[OY_CEREZ];
  if (!k || !/^[a-zA-Z0-9_-]{16,64}$/.test(k)) {
    k = randomBytes(18).toString('base64url');
    cevap.cookie(OY_CEREZ, k, {
      httpOnly: false, sameSite: 'lax', secure: GUVENLI,
      maxAge: 365 * 24 * 3600 * 1000, path: '/',
    });
  }
  return k;
}

function ayniKaynak(istek) {
  const kok = istek.get('origin') || istek.get('referer') || '';
  if (!kok) return true;                       // dogrudan istek (curl) engellenmiyor
  try { return new URL(kok).host === istek.get('host'); } catch { return false; }
}

const OY_S = {
  yaz: db.prepare(`
    INSERT INTO oylar (surum, oy, cerez, ip, tarayici, dil, yonlendiren, ekran,
                       saat_dilimi, platform, parmak_izi, zaman)
    VALUES (@surum,@oy,@cerez,@ip,@tarayici,@dil,@yonlendiren,@ekran,
            @saat_dilimi,@platform,@parmak_izi,@zaman)
    ON CONFLICT(surum, cerez) DO UPDATE SET
      oy=@oy, ip=@ip, tarayici=@tarayici, dil=@dil, yonlendiren=@yonlendiren,
      ekran=@ekran, saat_dilimi=@saat_dilimi, platform=@platform,
      parmak_izi=@parmak_izi, zaman=@zaman`),
  ozet: db.prepare(`
    SELECT surum,
           SUM(CASE WHEN oy = 1 THEN 1 ELSE 0 END)  AS begeni,
           SUM(CASE WHEN oy = -1 THEN 1 ELSE 0 END) AS begenmeme,
           COUNT(*) AS toplam
    FROM oylar GROUP BY surum`),
  benimki: db.prepare('SELECT surum, oy FROM oylar WHERE cerez = ?'),
  hepsi: db.prepare('SELECT * FROM oylar ORDER BY zaman DESC LIMIT 500'),
};

yol.get('/api/oy', (istek, cevap) => {
  const kimlik = istek.cookies[OY_CEREZ] || '';
  cevap.set('Cache-Control', 'no-store').json({
    ozet: OY_S.ozet.all(),
    benim: kimlik ? OY_S.benimki.all(kimlik) : [],
  });
});

yol.post('/api/oy', (istek, cevap) => {
  if (!ayniKaynak(istek)) return cevap.status(403).json({ hata: 'kaynak-disi' });
  const g = istek.body || {};
  const surum = metin(g.surum, 24);
  const oy = Number(g.oy);
  if (!/^[a-z0-9][a-z0-9._-]{0,23}$/i.test(surum)) return cevap.status(400).json({ hata: 'surum' });
  if (oy !== 1 && oy !== -1) return cevap.status(400).json({ hata: 'oy' });

  const adres = ip(istek);
  if (!hizSiniri('oy:' + adres, 60, 60 * 60 * 1000))
    return cevap.status(429).json({ hata: 'cok-fazla-istek' });

  const kimlik = oyKimligi(istek, cevap);
  OY_S.yaz.run({
    surum, oy, cerez: kimlik, ip: adres,
    tarayici: (istek.get('user-agent') || '').slice(0, 250),
    dil: (istek.get('accept-language') || '').slice(0, 100),
    yonlendiren: (istek.get('referer') || '').slice(0, 250),
    ekran: metin(g.ekran, 40) || null,
    saat_dilimi: metin(g.saat_dilimi, 60) || null,
    platform: metin(g.platform, 80) || null,
    parmak_izi: metin(g.parmak_izi, 80) || null,
    zaman: Date.now(),
  });
  cevap.set('Cache-Control', 'no-store').json({ tamam: true, ozet: OY_S.ozet.all() });
});

yol.get('/panel/yonetim/oylar', yetkiGerekli, (istek, cevap) =>
  gonder(cevap, oylarSayfasi({ kisi: istek.kisi, ozet: OY_S.ozet.all(), oylar: OY_S.hepsi.all() })));

/* ---------------- 404 / hata ---------------- */
yol.use((istek, cevap) =>
  gonder(cevap, hataSayfasi({ kisi: istek.kisi, kod: 404, mesaj: 'Aradığın sayfa burada değil.' }), 404));

app.use(TEMEL || '/', yol);

app.use((hata, istek, cevap, _sonraki) => {
  console.error('[hata]', hata?.message);
  gonder(cevap, hataSayfasi({ kisi: null, kod: 500, mesaj: 'Sunucuda bir sorun oldu.' }), 500);
});

app.listen(PORT, '127.0.0.1', () =>
  console.log(`compec v3 (gece) hazir: http://127.0.0.1:${PORT}${TEMEL || ''}/`));
