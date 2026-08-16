/* v7 ek tohumu: etkinliklere gerçek fotoğraf ataması ve zaman çizelgesi.
   Fotoğraf künyeleri: site/varliklar/foto/etkinlik/<klasör>/KAYNAK.md
   KVKK: çocuk yüzü görünen kare bilerek alınmadı.                        */
import { db } from './lib/db.mjs';

db.exec(`
CREATE TABLE IF NOT EXISTS kilometre (
  id       INTEGER PRIMARY KEY,
  yil      INTEGER NOT NULL,
  baslik   TEXT NOT NULL,
  aciklama TEXT,
  kaynak   TEXT,
  etiket   TEXT NOT NULL DEFAULT 'dogrulanmis',
  sira     INTEGER NOT NULL DEFAULT 100
);`);

/* Etkinlik başına ana fotoğraf. TechSummit'in geniş salon karesi BİLEREK
   kullanılmadı: o karede salon yarı boş, "dolu geçti" mesajının tersini veriyor.

   DİKKAT: bunlar v7_fotolar tablosuna yazılır, PAYLAŞILAN etkinlikler.foto
   kolonuna DEĞİL. İlk sürümde paylaşılan kolona yazıyordu ve v3/v4/v5/v6
   sayfalarında fotoğraflar 404 verdi: bu dosyalar yalnızca ufuk/ ağacında var.
   Aynı veritabanını altı sürüm paylaşıyor, sürüme özel veri sürüme özel tabloda. */
const fotolar = [
  ['techsummit',        'etkinlik/techsummit/techsummit26-sahne-branda.jpg'],
  ['datacamp',          'etkinlik/datacamp/datacamp-salon-dolu.jpg'],
  ['digitalized',       'etkinlik/digitalized/digitalized25-salon-genis.jpg'],
  ['teknodolu',         'etkinlik/teknodolu/teknodolu26-atolye-arduino.jpg'],
  ['bilisim-odulleri',  'bbo-ekip.jpg'],
];

/* Zaman çizelgesi. Hepsi arşivde [DOĞRULANMIŞ]; çıkarım olanlar işaretli. */
const kilometreler = [
  [1994, 'Kulüp kuruldu', 'Bilgisayar Mühendisliği Kulübü adıyla; sonra Bilişim Kulübü oldu.', 'Kulüp beyanı ve LinkedIn sayfası', 'dogrulanmis', 10],
  [1998, 'Computus dergisi çıktı', 'Sayı 1, Sonbahar 1998. Basım sponsoru Koç Sistem. Aynı grup 2024’te DataCamp’e sponsor oldu.', 'Dergi künyesi', 'dogrulanmis', 20],
  [2010, 'İlk TechSummit', 'Serinin başlangıcı. 2022 duyurusundaki “13. kez” ifadesinden geriye sayıldı.', 'Kulüp duyurusu üzerinden çıkarım', 'supheli', 30],
  [2013, 'İlk Boğaziçi Bilişim Ödülleri', 'Ödül töreni serisinin başlangıcı. Kazanan kaydı bugüne dek 222 satır.', 'Arşivlenmiş tören sayfaları', 'dogrulanmis', 40],
  [2017, 'İlk DataCamp', 'Veri bilimi ve yapay zekâ kampı. LinkedIn sayfası “2017’den beri” diyor.', 'LinkedIn boundatacamp', 'dogrulanmis', 50],
  [2018, 'Huawei ve Facebook Türkiye aynı sahnede', 'TechSummit 9. baskı. On şirkete teknik gezi düzenlendi.', 'Youthall etkinlik kaydı', 'dogrulanmis', 60],
  [2018, 'Bilişim Ödülleri 130.000 oy aldı', '19 kategori, 20 gün içinde 130.000’den fazla oy, 500’den fazla katılımcı.', 'Boğaziçi Üniversitesi resmî haber sitesi', 'dogrulanmis', 70],
  [2019, 'Ana sponsor ING, yaklaşık 500 katılımcı', 'TechSummit 10. baskı. LC Waikiki aynı yıl Bilişim Ödülleri ana sponsoru.', 'Youthall ve arşivlenmiş tören sayfası', 'dogrulanmis', 80],
  [2020, 'Pandemi: her şey çevrim içine taşındı', 'Blockchain Meetups yedi buluşma, DevTalks serisi on dört kurumla.', 'Kommunity kayıtları', 'dogrulanmis', 90],
  [2022, 'TechSummit 801 kayıt, Digitalized başladı', 'TechSummit 13. baskı Garanti Kültür Merkezi’nde; Digitalized’in ilk baskısı.', 'Kommunity', 'dogrulanmis', 100],
  [2025, 'DataCamp 8. baskı, NVIDIA sahnede', 'Senior LLM Technologist konuştu. Digitalized 4. baskı, Startup Lounge.', 'biletimGO ve LinkedIn', 'dogrulanmis', 110],
  [2026, 'TechSummit 17. baskı, ana sponsor Akbank', 'Albert Long Hall. IBM, Hepsiburada, KoçSistem, Softtech ve diğerleri.', 'biletimGO', 'dogrulanmis', 120],
];

db.exec(`CREATE TABLE IF NOT EXISTS v7_fotolar (
  slug TEXT PRIMARY KEY,
  foto TEXT NOT NULL
);`);

/* Paylaşılan kolonun v7 öncesi hali. Kaynak: gece/tohum.mjs artı arşivden
   doğrulanmış tek düzeltme (dc23-havadan.jpg DataCamp 2023 karesidir, bir ara
   yanlışlıkla TechSummit'te duruyordu). v1'in statik HTML'i de bu eşleşmeyi
   gösteriyor, oradan teyit edildi. TechSummit'te bilerek fotoğraf yok. */
const paylasilanEski = [
  ['techsummit',        null],
  ['datacamp',          'dc23-havadan.jpg'],
  ['digitalized',       'egitim.jpg'],
  ['bilisim-odulleri',  'bbo-ekip.jpg'],
  ['teknodolu',         'teknodolu.jpg'],
];

db.transaction(() => {
  const eski = db.prepare('UPDATE etkinlikler SET foto = ? WHERE slug = ?');
  for (const [slug, foto] of paylasilanEski) eski.run(foto, slug);
  db.prepare('DELETE FROM v7_fotolar').run();
  const g = db.prepare('INSERT INTO v7_fotolar (slug, foto) VALUES (?, ?)');
  for (const [slug, foto] of fotolar) g.run(slug, foto);
  db.prepare('DELETE FROM kilometre').run();
  const k = db.prepare('INSERT INTO kilometre (yil,baslik,aciklama,kaynak,etiket,sira) VALUES (?,?,?,?,?,?)');
  for (const r of kilometreler) k.run(...r);
})();

console.log('fotoğraf atanan etkinlik:', fotolar.length, '· kilometre taşı:', db.prepare('SELECT COUNT(*) c FROM kilometre').get().c);
