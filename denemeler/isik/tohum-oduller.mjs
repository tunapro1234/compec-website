/* Boğaziçi Bilişim Ödülleri arşivini kaynak dosyadan okuyup veritabanına yazar.
   Kaynak: /srv/compec/compec-memory/kaynaklar/bulgular-bilisim-odulleri.md

   O dosyadaki tabloda ÜÇ AYRI ŞEY aynı biçimde duruyor:
     1. Ödül kazananları        -> oduller tablosu
     2. Tören sponsorları       -> kurumlar tablosu (sütunlar ters: kategori=kurum, kazanan=rol)
     3. Arşivin kendi notları   -> hiçbir yere, atılır ("[EKSİK] diğer kategoriler" gibi)
   Ayrım ölçütleri aşağıda kod içinde açık yazılı; kaynak dosya büyüdükçe
   bu betik yeniden çalıştırılabilir.                                            */
import { readFileSync } from 'node:fs';
import { db } from './lib/db.mjs';

const KAYNAK = process.env.BBO_KAYNAK
  || '/srv/compec/compec-memory/kaynaklar/bulgular-bilisim-odulleri.md';

const SATIR = /^\|\s*((?:19|20)\d{2})\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|\s*\[?([A-ZĞİŞÖÇÜ]+)\]?\s*\|/;
const SPONSOR = /sponsor|destekç|ortağ|partner|iş ?birliğ/i;
const NOT_SATIRI = /^\[|^—|EKSİK|ŞÜPHELİ|çelişkili|takvim|bir haber|kategori şeklinde|kayıt yok|bulunamadı/i;

const oduller = [];
const sponsorlar = [];
let notSayisi = 0;

for (const ham of readFileSync(KAYNAK, 'utf8').split('\n')) {
  const m = SATIR.exec(ham);
  if (!m) continue;
  const [, yil, kategori, kazananHam, kaynakHucre, etiketHam] = m;
  const url = /\((https?:\/\/[^)]+)\)/.exec(kaynakHucre)?.[1] || null;
  const kat = kategori.trim();
  let kazanan = kazananHam.trim();
  if (kazanan === '-' || kazanan === '—' || kazanan.startsWith('[')) kazanan = '';

  if (NOT_SATIRI.test(kat) || NOT_SATIRI.test(kazanan) || !kazanan) { notSayisi++; continue; }

  if (SPONSOR.test(kazanan)) {                 // sütunlar ters
    sponsorlar.push({ ad: kat, rol: kazanan, yil: +yil });
    continue;
  }
  if (kat.length < 6) { notSayisi++; continue; }

  const etiket = /DOĞRULANMIŞ|DOGRULANMIS/.test(etiketHam) ? 'dogrulanmis'
    : /KULÜP/.test(etiketHam) ? 'kulup-ici'
      : /ŞÜPHELİ|SUPHELI/.test(etiketHam) ? 'supheli' : 'eksik';
  oduller.push({ yil: +yil, kategori: kat, kazanan, url, etiket });
}

const kademe = (rol) => (/ana sponsor/i.test(rol) ? 'ana' : /altın/i.test(rol) ? 'altin' : 'ortak');

db.transaction(() => {
  db.prepare('DELETE FROM oduller').run();
  const o = db.prepare('INSERT INTO oduller (yil,kategori,kazanan,kaynak_url,etiket,sira) VALUES (?,?,?,?,?,?)');
  oduller.forEach((r, i) => o.run(r.yil, r.kategori, r.kazanan, r.url, r.etiket, i));

  db.prepare("DELETE FROM kurumlar WHERE etkinlik='bilisim-odulleri'").run();
  const k = db.prepare('INSERT INTO kurumlar (ad,etkinlik,yil,kademe,sira) VALUES (?,?,?,?,?)');
  sponsorlar.forEach((s, i) => k.run(s.ad, 'bilisim-odulleri', s.yil, kademe(s.rol), 400 + i));
})();

const yil = new Set(oduller.map((r) => r.yil)).size;
console.log(`ödül=${oduller.length} (${yil} yıl) · tören sponsoru=${sponsorlar.length} · atılan not satırı=${notSayisi}`);
