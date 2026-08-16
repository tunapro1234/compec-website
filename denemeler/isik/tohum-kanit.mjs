/* v4 kanıt katmanı tohumu. KURAL: her satırın kaynağı yazılı.
   Kaynak: /srv/compec/compec-memory/ (kiyaslama + etkinlikler + insanlar) */
import { db } from './lib/db.mjs';

const BU = 'Boğaziçi Üniversitesi resmî haber sitesi';

const kanitlar = [
  // ---- ölçek ----
  ['olcek', 'TechSummit 2022 kaydı', '801', 'Kommunity etkinlik sayfası', 'https://kommunity.com/compec/events/bountechsummit-7cf6c240', 'dogrulanmis',
   'Kommunity üzerinden alınan kayıt sayısıdır, kapıdan geçen katılımcı sayısı değildir.', 10],
  ['olcek', 'Digitalized 2022 kaydı', '569', 'Kommunity etkinlik sayfası', 'https://kommunity.com/compec/events/boundigitalized-827282a9', 'dogrulanmis',
   'Serinin ilk baskısı.', 20],
  ['olcek', 'TechSummit 2019 katılımcısı', '~500', 'Youthall etkinlik kaydı', null, 'dogrulanmis', 'Ana sponsor ING.', 30],
  ['olcek', 'Bilişim Ödülleri 2018 oyu, 20 gün içinde', '130.000+', BU, null, 'dogrulanmis',
   'Kulübün elindeki en güçlü dış kaynaklı rakam.', 40],
  ['olcek', 'Bilişim Ödülleri 2018 katılımcısı', '500+', BU, null, 'dogrulanmis', null, 50],
  ['olcek', 'Bilişim Ödülleri 2024 tekil oyu', '2.500.000+', 'Kulübün kendi oylama sistemi', null, 'kulup-ici',
   'Bağımsız kaynakla doğrulanamadı. Dış kaynaklı rakamımız 2018 için 130.000+.', 60],
  ['olcek', 'DataCamp 2023 salon doluluğu', 'Fiziksel kapasite doldu', 'biletimGO kullanıcı yorumları', null, 'dogrulanmis',
   'Sayı verilmiyor; sitedeki hero fotoğrafı bu baskıdan.', 70],
  ['olcek', 'Kommunity topluluk üyesi', '957', 'kommunity.com/compec', 'https://kommunity.com/compec', 'dogrulanmis',
   'Platform takipçisidir, kulüp üyesi sayısı değildir.', 80],

  // ---- süreklilik ----
  ['sureklilik', 'Kuruluş', '1994', 'Kulübün kendi beyanı ve LinkedIn sayfası', 'https://www.linkedin.com/company/bouncompec', 'dogrulanmis', null, 10],
  ['sureklilik', 'TechSummit baskı sayısı', "2026'da 17.", 'Kulübün kendi duyurusu ve biletimGO', null, 'dogrulanmis',
   '2022 duyurusunda “13. kez” ifadesi geçiyor; zincir kesintisiz kuruldu.', 20],
  ['sureklilik', 'DataCamp baskı sayısı', "2025'te 8.", 'LinkedIn boundatacamp sayfası ve biletimGO', null, 'dogrulanmis',
   'Sayfa metni “2017’den beri düzenlenen” diyor.', 30],
  ['sureklilik', 'Digitalized baskı sayısı', "2025'te 4.", 'biletimGO ve Biletino', null, 'dogrulanmis', 'İlk baskı 2022.', 40],
  ['sureklilik', 'Bilişim Ödülleri baskı sayısı', "2025'te 13.", 'biletimGO', null, 'dogrulanmis', 'İlk baskı 2013 civarı.', 50],
  ['sureklilik', 'TechSummit ana sponsor zinciri', "2018'den beri kesintisiz", 'Youthall, biletimGO, Biletino, Webtekno', null, 'dogrulanmis',
   'Huawei, ING, Yapı Kredi Teknoloji, Acıbadem Technology, HubX, Akbank.', 60],

  // ---- erişim ----
  ['erisim', 'Bilet fiyatı, TechSummit 2023', '25-80 TL', 'Biletino', null, 'dogrulanmis', null, 10],
  ['erisim', 'Bilet fiyatı, DataCamp 2022', '30-90 TL', 'Biletino', null, 'dogrulanmis', null, 20],
  ['erisim', 'Bilet fiyatı, Digitalized 2023', '40-70 TL', 'biletimGO', null, 'dogrulanmis', null, 30],
  ['erisim', 'Üyelik ücreti', 'Ücretsiz', 'Kulüp beyanı', null, 'dogrulanmis', 'Bölüm şartı da yok.', 40],

  // ---- topluluk ----
  ['topluluk', 'LinkedIn takipçisi', '6.057', 'linkedin.com/company/bouncompec', 'https://www.linkedin.com/company/bouncompec', 'dogrulanmis', null, 10],
  ['topluluk', 'TechSummit Instagram takipçisi', '2.675', 'instagram.com/bountechsummit', 'https://www.instagram.com/bountechsummit', 'dogrulanmis', '416 gönderi.', 20],
  ['topluluk', 'DataCamp LinkedIn takipçisi', '1.102', 'linkedin.com/company/boundatacamp', null, 'dogrulanmis', null, 30],
  ['topluluk', 'Digitalized LinkedIn takipçisi', '443', 'linkedin.com/company/boundigitalized', null, 'dogrulanmis', null, 40],

  // ---- bilerek koymadıklarımız ----
  ['eksik', 'Toplam katılımcı sayısı', null, null, null, 'eksik',
   'Kulüp tanıtımlarında "5.000+ katılımcı" geçiyor ama bunu doğrulayan bir kayıt bulunamadı. Aynı etkinlik için farklı belgelerde farklı sayılar var. Doğrulayamadığımız için siteye koymuyoruz.', 10],
  ['eksik', 'Yıllık etkinlik sayısı', null, null, null, 'eksik',
   '"Yılda 50+ etkinlik" iddiası bağımsız kaynakla doğrulanamadı. Kommunity üzerinde 25 etkinlik kayıtlı, bu da kısmi bir pencere.', 20],
  ['eksik', 'Bilişim Ödülleri kazanan arşivi', '13 baskıdan 2 baskı biliniyor', 'YouTube kategori videoları (2018)', null, 'eksik',
   '2019, 2020, 2022, 2023, 2024 ve 2025 kazananları arşivde yok. Bir ödül töreninin en kalıcı çıktısı kazanan listesidir; bu boşluk kapatılmalı.', 30],
  ['eksik', 'Bilişim Ödülleri sponsorları', null, null, null, 'eksik',
   '13 baskı boyunca tek bir sponsor adı bulunamadı.', 40],
];

// 2018 şirket gezileri [DOĞRULANMIŞ] (Youthall TechSummit 2018 sayfası)
const geziler = ['Huawei','Microsoft','SAP Türkiye','Getir','Insider','Digiturk','Armut.com','Yemeksepeti','AdColony','Turkcell'];

// Bilişim Ödülleri 2018 kazananları [DOĞRULANMIŞ] (YouTube kategori videoları)
const oduller = [
  [2018, 'Sosyal Medyayı En İyi Kullanan Marka', 'Netflix', 'dogrulanmis', 10],
  [2018, 'Kategori dökümü', null, 'eksik', 20],
];

db.transaction(() => {
  db.prepare('DELETE FROM kanitlar').run();
  const k = db.prepare('INSERT INTO kanitlar (konu,iddia,deger,kaynak,kaynak_url,etiket,aciklama,sira) VALUES (?,?,?,?,?,?,?,?)');
  for (const r of kanitlar) k.run(...r);

  db.prepare('DELETE FROM gezileri').run();
  const g = db.prepare('INSERT INTO gezileri (kurum,yil,sira) VALUES (?,?,?)');
  geziler.forEach((ad, i) => g.run(ad, 2018, (i + 1) * 10));

  db.prepare('DELETE FROM oduller').run();
  const o = db.prepare('INSERT INTO oduller (yil,kategori,kazanan,etiket,sira) VALUES (?,?,?,?,?)');
  for (const r of oduller) o.run(...r);

  // BBÖ baskı zinciri
  const b = db.prepare(`INSERT INTO baskilar (etkinlik,no,yil,tarih,mekan,ana_sponsor,not_,kayit_sayisi) VALUES (?,?,?,?,?,?,?,?)`);
  db.prepare("DELETE FROM baskilar WHERE etkinlik='bilisim-odulleri'").run();
  b.run('bilisim-odulleri', 13, 2025, '20 Aralık', 'Albert Long Hall', null, '19:00-22:00', null);
  b.run('bilisim-odulleri', 6, 2018, null, null, null, "19 kategori. 20 günde 130.000'den fazla oy, 500'den fazla katılımcı.", null);
})();

const say = (t) => db.prepare(`SELECT COUNT(*) c FROM ${t}`).get().c;
console.log(`kanit=${say('kanitlar')} gezi=${say('gezileri')} odul=${say('oduller')} baski=${say('baskilar')}`);
