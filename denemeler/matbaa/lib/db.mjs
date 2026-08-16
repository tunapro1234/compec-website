import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const kok = dirname(dirname(fileURLToPath(import.meta.url)));
const yol = process.env.COMPEC_DB || join(kok, 'veri', 'compec.db');
mkdirSync(dirname(yol), { recursive: true });

export const db = new Database(yol);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
// v2 ve v3 AYNI dosyaya yazıyor: eşzamanlı yazımda SQLITE_BUSY yerine kısa süre beklesin.
// better-sqlite3 senkron olduğu için bu bekleme event loop'u kilitler, o yüzden kısa tutuldu.
db.pragma('busy_timeout = 5000');
db.pragma('synchronous = NORMAL');   // WAL ile güvenli, yazma gecikmesini düşürür

db.exec(`
CREATE TABLE IF NOT EXISTS kisiler (
  id            INTEGER PRIMARY KEY,
  slug          TEXT    NOT NULL UNIQUE,
  ad            TEXT    NOT NULL,
  eposta        TEXT    UNIQUE,
  sifre_hash    TEXT,
  rol           TEXT    NOT NULL DEFAULT 'uye',      -- uye | yonetim | admin
  durum         TEXT    NOT NULL DEFAULT 'beklemede',-- beklemede | onayli | pasif
  bolum         TEXT,
  giris_yili    INTEGER,
  linkedin      TEXT,
  github        TEXT,
  hakkinda      TEXT,
  foto          TEXT,
  gorev         TEXT,
  donem         TEXT,
  kurul         TEXT,
  kaynak        TEXT    NOT NULL DEFAULT 'kayit',    -- kayit | kulup-arsivi
  goster        INTEGER NOT NULL DEFAULT 1,
  olusturma     TEXT    NOT NULL DEFAULT (datetime('now')),
  guncelleme    TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS ix_kisiler_durum  ON kisiler(durum, goster);
CREATE INDEX IF NOT EXISTS ix_kisiler_donem  ON kisiler(donem);

CREATE TABLE IF NOT EXISTS oturumlar (
  id            TEXT    PRIMARY KEY,               -- token'in sha256'si
  kisi_id       INTEGER NOT NULL REFERENCES kisiler(id) ON DELETE CASCADE,
  olusturma     INTEGER NOT NULL,
  bitis         INTEGER NOT NULL,
  ip            TEXT,
  tarayici      TEXT
);
CREATE INDEX IF NOT EXISTS ix_oturum_kisi ON oturumlar(kisi_id);

CREATE TABLE IF NOT EXISTS denemeler (
  anahtar       TEXT    NOT NULL,
  zaman         INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_deneme ON denemeler(anahtar, zaman);

CREATE TABLE IF NOT EXISTS etkinlikler (
  id            INTEGER PRIMARY KEY,
  slug          TEXT    NOT NULL UNIQUE,
  ad            TEXT    NOT NULL,
  ozet          TEXT    NOT NULL,
  tur           TEXT,
  yil           TEXT,
  mekan         TEXT,
  kayit_sayisi  INTEGER,
  sure          TEXT,
  baski         TEXT,
  foto          TEXT,
  sira          INTEGER NOT NULL DEFAULT 100,
  yayinda       INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS kurumlar (
  id            INTEGER PRIMARY KEY,
  ad            TEXT    NOT NULL,
  etkinlik      TEXT,
  yil           INTEGER,
  kademe        TEXT,                                  -- ana | altin | gumus | ortak
  sira          INTEGER NOT NULL DEFAULT 100
);

CREATE TABLE IF NOT EXISTS baskilar (
  id            INTEGER PRIMARY KEY,
  etkinlik      TEXT    NOT NULL,
  no            INTEGER,
  yil           INTEGER NOT NULL,
  tarih         TEXT,
  mekan         TEXT,
  ana_sponsor   TEXT,
  not_          TEXT,
  kayit_sayisi  INTEGER
);
CREATE INDEX IF NOT EXISTS ix_baski_etk ON baskilar(etkinlik, yil DESC);

CREATE TABLE IF NOT EXISTS oylar (
  id            INTEGER PRIMARY KEY,
  surum         TEXT    NOT NULL,
  oy            INTEGER NOT NULL,          -- 1 begendi, -1 begenmedi
  cerez         TEXT    NOT NULL,
  ip            TEXT,
  tarayici      TEXT,
  dil           TEXT,
  yonlendiren   TEXT,
  ekran         TEXT,
  saat_dilimi   TEXT,
  platform      TEXT,
  parmak_izi    TEXT,
  zaman         INTEGER NOT NULL,
  UNIQUE(surum, cerez)
);
CREATE INDEX IF NOT EXISTS ix_oy_surum ON oylar(surum);

CREATE TABLE IF NOT EXISTS konusmacilar (
  id            INTEGER PRIMARY KEY,
  ad            TEXT    NOT NULL,
  kurum         TEXT,
  unvan         TEXT,
  baslik        TEXT,
  etkinlik      TEXT,
  yil           INTEGER,
  tur           TEXT    NOT NULL DEFAULT 'konusmaci',  -- konusmaci | egitmen
  sira          INTEGER NOT NULL DEFAULT 100
);
CREATE INDEX IF NOT EXISTS ix_konusmaci_etk ON konusmacilar(etkinlik, yil);
`);

// eski oturumlari ve deneme kayitlarini temizle
export function bakim() {
  const simdi = Date.now();
  db.prepare('DELETE FROM oturumlar WHERE bitis < ?').run(simdi);
  db.prepare('DELETE FROM denemeler WHERE zaman < ?').run(simdi - 24 * 3600 * 1000);
}
bakim();
setInterval(bakim, 30 * 60 * 1000).unref();
