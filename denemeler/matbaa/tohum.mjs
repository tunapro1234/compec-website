/* Tohum verisi. KURAL: buraya SADECE [DOĞRULANMIŞ] olgular girer.
   Kaynak: /srv/compec/compec-memory/ (2026-07-25 guncellemesi) + icerik/veri.md
   [SUPHELI] ve [CIKARIM] etiketli hicbir sey siteye konmadi.                    */
import { db } from './lib/db.mjs';
import { slugla } from './lib/guvenlik.mjs';

/* ---------------- etkinlikler ---------------- */
const etkinlikler = [
  {
    slug: 'techsummit', ad: 'Boğaziçi TechSummit', tur: 'Zirve',
    ozet: 'Kulübün en büyük ve en eski etkinliği. Paneller, konuşmalar, atölyeler, şirket gezileri ve teknoloji fuarı.',
    yil: '2010-2026', mekan: 'Albert Long Hall', kayit_sayisi: 801, sure: '2-3 gün',
    baski: "2026'da 17. kez", foto: null, sira: 10,
  },
  {
    slug: 'datacamp', ad: 'Boğaziçi DataCamp', tur: 'Kamp',
    ozet: 'Veri bilimi ve yapay zekâ kampı: NLP, bilgisayarlı görü, IoT, büyük veri ve biyoenformatik. Önce çevrim içi atölyeler, son gün yüz yüze zirve.',
    yil: '2017-2025', mekan: 'Albert Long Hall', kayit_sayisi: null, sure: '3 gün',
    baski: "2025'te 8. kez", foto: 'dc23-havadan.jpg', sira: 20,
  },
  {
    slug: 'digitalized', ad: 'Boğaziçi Digitalized', tur: 'Girişimcilik',
    ozet: 'Dijital girişimcilik zirvesi. Kurucular, yatırımcılar ve erken aşama öğrenci girişimlerinin sergilendiği Startup Lounge.',
    yil: '2022-2025', mekan: 'Albert Long Hall', kayit_sayisi: 569, sure: '1-4 gün',
    baski: "2025'te 4. kez", foto: null, sira: 30,
  },
  {
    slug: 'bilisim-odulleri', ad: 'Boğaziçi Bilişim Ödülleri', tur: 'Ödül programı',
    ozet: 'Bilişim sektöründeki başarıların halk oyu, jüri ve bilişim kulüplerinin değerlendirmesiyle belirlendiği ödül gecesi.',
    yil: null, mekan: null, kayit_sayisi: null, sure: null, baski: null,
    foto: 'bbo-ekip.jpg', sira: 40,
  },
  {
    slug: 'teknodolu', ad: 'Teknodolu', tur: 'Sosyal sorumluluk',
    ozet: "Anadolu'daki ortaokul ve lise öğrencilerini kodlama, yapay zekâ ve robotikle buluşturan proje.",
    yil: null, mekan: null, kayit_sayisi: null, sure: null, baski: null,
    foto: 'teknodolu.jpg', sira: 50,
  },
  {
    slug: 'devtalks', ad: 'DevTalks', tur: 'Söyleşi serisi',
    ozet: 'Sektörden mühendis ve yöneticilerle söyleşi serisi. Microsoft, Yemeksepeti, Huawei, GittiGidiyor, Pixery, Fibabanka, Masomo ve Vertigo Games ekipleri konuk oldu.',
    yil: '2020-2021', mekan: 'Çevrim içi', kayit_sayisi: null, sure: null,
    baski: '8 şirket iş birliği', foto: null, sira: 60,
  },
  {
    slug: 'blockchain-meetups', ad: 'Boğaziçi Blockchain Meetups', tur: 'Seri',
    ozet: '2020 boyunca süren yedi buluşmalık seri. İlk buluşma serinin en yüksek katılımını aldı.',
    yil: '2020', mekan: 'Çevrim içi', kayit_sayisi: 126, sure: '7 buluşma',
    baski: null, foto: null, sira: 70,
  },
  {
    slug: 'algorun', ad: 'algoRun', tur: 'Hackathon',
    ozet: 'Veri odaklı hackathon. 2021 baskısı Invent Analytics iş birliğiyle düzenlendi.',
    yil: '2021', mekan: 'Çevrim içi', kayit_sayisi: null, sure: '2 gün',
    baski: null, foto: null, sira: 80,
  },
  {
    slug: 'game-jam', ad: 'Boğaziçi Game Jam', tur: 'Oyun geliştirme',
    ozet: 'Fikirden oynanabilir prototipe giden, hafta sonuna sıkıştırılmış geliştirme maratonu.',
    yil: '2021', mekan: 'Çevrim içi', kayit_sayisi: null, sure: '3 gün',
    baski: null, foto: null, sira: 90,
  },
];

/* ---------------- kurumlar: TechSummit ana sponsor zinciri + digerleri ---------------- */
const kurumlar = [
  ['Akbank',               'techsummit',  2026, 'ana',   10],
  ['HubX',                 'techsummit',  2025, 'ana',   20],
  ['Acıbadem Technology',  'techsummit',  2024, 'ana',   30],
  ['Yapı Kredi Teknoloji', 'techsummit',  2023, 'ana',   40],
  ['Yapı Kredi Teknoloji', 'techsummit',  2022, 'ana',   50],
  ['ING',                  'techsummit',  2019, 'ana',   60],
  ['Huawei',               'techsummit',  2018, 'ana',   70],
  ['Facebook Türkiye',     'techsummit',  2018, 'gumus', 80],
  ['Insider',              'techsummit',  2018, 'altin', 90],
  ['TEB',                  'techsummit',  2018, 'altin', 100],
  ['Global Maksimum',      'techsummit',  2018, 'altin', 110],
  ['Getir',                'techsummit',  2019, 'altin', 120],
  ['Teknasyon',            'techsummit',  2019, 'altin', 130],
  ['Sestek',               'techsummit',  2019, 'altin', 140],
  ['Solvoyo',              'techsummit',  2019, 'altin', 150],
  ['IBM',                  'techsummit',  2026, 'ortak', 160],
  ['Hepsiburada',          'techsummit',  2026, 'ortak', 170],
  ['KoçSistem',            'techsummit',  2026, 'ortak', 180],
  ['Softtech',             'techsummit',  2026, 'ortak', 190],
  ['Ace Games',            'techsummit',  2026, 'ortak', 200],
  ['Allianz',              'techsummit',  2026, 'ortak', 210],
  ['HONOR',                'techsummit',  2026, 'ortak', 220],
  ['GIGABYTE',             'techsummit',  2026, 'ortak', 230],
  ['Madlen',               'datacamp',    2025, 'ana',   240],
  ['PlusMinusOne',         'digitalized', 2025, 'ana',   250],
  ['obilet',               'digitalized', 2025, 'ana',   260],
  ['Macellan SuperApp',    'digitalized', 2024, 'ana',   270],
  ['Invent Analytics',     'algorun',     2021, 'ortak', 280],
];

/* ---------------- konusmacilar: uydurma isimlerin yerine gecen GERCEK kadro ---------- */
const konusmacilar = [
  // DataCamp 2025 zirve
  ['Ahmet Erdem',      'NVIDIA',      'Senior LLM Technologist',   "LLM'lerin güçlü ve zayıf yönleri",        'datacamp', 2025, 'konusmaci', 10],
  ['Ata Ozkaya',       'Madlen',      'Founder',                   'Yapay zekâ ve paradigma değişimi',        'datacamp', 2025, 'konusmaci', 20],
  ['Alper Hankendi',   'Hepsiburada', 'Head of Technology',        'Yazılım geliştiriciler için yapay zekâ',  'datacamp', 2025, 'konusmaci', 30],
  ['Mutlu Polatcan',   'Insider',     'Staff Software Engineer',   'Bulut ve veri',                           'datacamp', 2025, 'konusmaci', 40],
  ['Enes Karataş',     'Upsonic',     'Founding Engineer',         'Yapay zekâ çağında dijital girişim',      'datacamp', 2025, 'konusmaci', 50],
  ['Gürsel Karacor',   'Fenerbahçe Üniversitesi', null,            'Weighted Nearest Centroid Estimator',     'datacamp', 2025, 'konusmaci', 60],
  ['Celil Aktaş',      'İstanbul Barosu Bilişim Komisyonu', 'Sekreter', 'Yapay zekâ ve hukuk',                'datacamp', 2025, 'konusmaci', 70],
  // DataCamp 2025 atolye
  ['Samet Öztürk ve Mert Acar', 'invent.ai', null, 'Perakende analitiği ve üretken yapay zekâ',                'datacamp', 2025, 'egitmen',   80],
  ['Caner Şahin',      'Lyrebird Studio', null,   'Vision language modellerine giriş',                         'datacamp', 2025, 'egitmen',   90],
  ['Gökçen Büyükbaş',  'Buluttan',    null,       'Hava durumu tahmininde makine öğrenmesi',                   'datacamp', 2025, 'egitmen',  100],
  ['Caner Şekerci',    'CNR AI HUB',  'Founder',  'AI agent ve RAG sistemleri',                                'datacamp', 2025, 'egitmen',  110],
  ['Kubilay Cebeci',   'Logix AI Labs', 'Founder','Kod yazmadan AI agent geliştirme',                          'datacamp', 2025, 'egitmen',  120],
  // Digitalized 2025
  ['Muharrem Derinkök','Insider',     'Co-Founder, CPO',           null,                                      'digitalized', 2025, 'konusmaci', 130],
  ['Seyhun R. Özkara', 'ideasoft',    'Co-Founder',                null,                                      'digitalized', 2025, 'konusmaci', 140],
  ['Ahmet Zahid Özcan','PlusMinusOne','Co-Founder, COO',           null,                                      'digitalized', 2025, 'konusmaci', 150],
  ['Ali Yılmaz',       'obilet',      'Co-Founder',                null,                                      'digitalized', 2025, 'konusmaci', 160],
  ['Görkem Utku Yıldız','Ludus Ventures','Associate',              null,                                      'digitalized', 2025, 'konusmaci', 170],
  ['Dilan Sisu',       'e2vc',        'Associate',                 null,                                      'digitalized', 2025, 'konusmaci', 180],
  // TechSummit 2023
  ['Cihan Yıldız',     'Boyner',      'CTO',                       null,                                      'techsummit', 2023, 'konusmaci', 190],
  ['Fatih Üstündağ',   'Teknasyon',   'CTO',                       null,                                      'techsummit', 2023, 'konusmaci', 200],
  ['Selahattin Köksal','Vestel',      'IoT ve Dijital Strateji Müdürü', null,                                 'techsummit', 2023, 'konusmaci', 210],
  ['Numan Yılmaz',     'Amadeus',     'Software Development Manager', null,                                   'techsummit', 2023, 'konusmaci', 220],
  ['Soner Aktaş',      'Amadeus',     'Software Development Manager', null,                                   'techsummit', 2023, 'konusmaci', 230],
];

/* ---------------- kisiler (kulup arsivi) ----------------
   compec.org yonetim kurulu listelerinden. E-POSTA BILEREK YOK: sayfa herkese acik,
   kisisel adres yayinlamiyoruz. LINKEDIN BOS: dogrulanmis kisisel URL elimizde yok,
   tahmin etmiyoruz. Kisi kendi hesabini acip ekler ya da yonetim panelden girer.   */
const yk2526 = [
  ['Özlem Yavuz', 'Yönetim Kurulu Başkanı', 'ozlem.jpg'],
  ['Zişan Ferzin Yalçın', 'Genel Sekreter', 'zisan.jpg'],
  ['Ali Saffan Kökoğlu', 'Kurumsal İletişim ve Finans Direktörü', 'ali.jpg'],
  ['Havva Berre Yılmaz', 'Veri Bilimi ve Yapay Zekâ, Ar-Ge Direktörü', 'berre.jpg'],
  ['Kerem Yoldaş', 'Dijital Girişimcilik, Ar-Ge Direktörü', 'kerem.jpg'],
  ['Taha Kuter', 'Teknoloji Direktörü', 'kuter.jpg'],
  ['Ekrem Ladikli', 'Pazarlama Direktörü', 'ekrem.jpg'],
  ['İremnur Yıldız', 'Boğaziçi Bilişim Ödülleri ve Blockchain Direktörü', 'irem.jpg'],
];
const yk2425 = [
  ['Mert Gökyar', 'Yönetim Kurulu Başkanı', 'mert.jpg'],
  ['Semih Mutlu', 'Genel Sekreter ve PR Direktörü', 'semih.jpg'],
  ['Tuana Yücedağ', 'Kurumsal İletişim ve Finans Direktörü', 'tuana.jpg'],
  ['Hüseyin Emir Akdağ', 'Ar-Ge Direktörü', null],
  ['Edanur Bozkurt', 'Veri Bilimi Direktörü', 'eda.jpg'],
  ['Oğuz Özer', 'Dijital Girişimcilik Direktörü', 'oguz.jpg'],
  ['Serdar Şen', 'Teknoloji ve Ar-Ge Direktörü', 'serdar.jpg'],
  ['Hasan Deveci', 'Boğaziçi Bilişim Ödülleri ve Blockchain Direktörü', 'hasan.jpg'],
  ['Sema Aydın', 'Oyun Geliştirme ve PR Direktörü', 'sema.jpg'],
];

const ekleEtkinlik = db.prepare(`
  INSERT INTO etkinlikler (slug, ad, ozet, tur, yil, mekan, kayit_sayisi, sure, baski, foto, sira)
  VALUES (@slug, @ad, @ozet, @tur, @yil, @mekan, @kayit_sayisi, @sure, @baski, @foto, @sira)
  ON CONFLICT(slug) DO UPDATE SET
    ad=@ad, ozet=@ozet, tur=@tur, yil=@yil, mekan=@mekan,
    kayit_sayisi=@kayit_sayisi, sure=@sure, baski=@baski, foto=@foto, sira=@sira`);

const ekleKisi = db.prepare(`
  INSERT INTO kisiler (slug, ad, rol, durum, gorev, donem, foto, kaynak, goster)
  VALUES (@slug, @ad, 'uye', 'onayli', @gorev, @donem, @foto, 'kulup-arsivi', 1)
  ON CONFLICT(slug) DO UPDATE SET gorev=@gorev, donem=@donem, foto=@foto`);

db.transaction(() => {
  for (const e of etkinlikler) ekleEtkinlik.run(e);

  db.prepare('DELETE FROM kurumlar').run();
  const ek = db.prepare('INSERT INTO kurumlar (ad, etkinlik, yil, kademe, sira) VALUES (?,?,?,?,?)');
  for (const k of kurumlar) ek.run(...k);

  db.prepare('DELETE FROM konusmacilar').run();
  const ko = db.prepare('INSERT INTO konusmacilar (ad, kurum, unvan, baslik, etkinlik, yil, tur, sira) VALUES (?,?,?,?,?,?,?,?)');
  for (const k of konusmacilar) ko.run(...k);

  for (const [ad, gorev, foto] of yk2526)
    ekleKisi.run({ slug: slugla(ad), ad, gorev, donem: '2025-2026', foto: foto ? 'yk2526/' + foto : null });
  for (const [ad, gorev, foto] of yk2425)
    ekleKisi.run({ slug: slugla(ad), ad, gorev, donem: '2024-2025', foto: foto ? 'yk2425/' + foto : null });
})();

const say = (t) => db.prepare(`SELECT COUNT(*) c FROM ${t}`).get().c;
console.log(`tohum tamam: etkinlik=${say('etkinlikler')} kurum=${say('kurumlar')} ` +
            `konusmaci=${say('konusmacilar')} kisi=${say('kisiler')}`);

/* ---------------- baskilar (edisyon zincirleri) ----------------
   Kaynak: compec-memory/etkinlikler/*.md, 2026-07-25 guncellemesi. Hepsi [DOGRULANMIS].
   [CIKARIM] ve [SUPHELI] satirlar alinmadi.                                          */
const baskilar = [
  // etkinlik, no, yil, tarih, mekan, ana sponsor, not, kayit
  ['techsummit', 17, 2026, '5 Nisan', 'Albert Long Hall', 'Akbank', 'Ace Games, Allianz, HONOR, GIGABYTE, IBM, Hepsiburada, Softtech, KoçSistem', null],
  ['techsummit', 16, 2025, '3 Mayıs', 'Güney Kampüs', 'HubX', 'Midas, Softtech, EPAM, Monster Energy. Staj ödüllü case study.', null],
  ['techsummit', 15, 2024, '27-28 Nisan', 'Albert Long Hall', 'Acıbadem Technology', null, null],
  ['techsummit', 14, 2023, '29-30 Nisan', 'Albert Long Hall', 'Yapı Kredi Teknoloji', 'Güney çimlerde teknoloji fuarı ve CV bırakma. Bilet 25-80 TL.', null],
  ['techsummit', 13, 2022, '4-6 Mart', 'Garanti Kültür Merkezi', 'Yapı Kredi Teknoloji', 'Hibrit düzenlendi.', 801],
  ['techsummit', 10, 2019, '1-3 Mart', 'Albert Long Hall ve GKM', 'ING', 'Altın: Getir, Teknasyon, Sestek, Insider, Solvoyo. Yaklaşık 500 katılımcı.', null],
  ['techsummit',  9, 2018, '23-25 Şubat', 'Albert Long Hall ve Natuk Birkan', 'Huawei', 'Altın: Global Maksimum, TEB, Insider. Gümüş: Facebook Türkiye. On şirket gezisi.', null],
  ['techsummit',  8, 2017, '24-26 Şubat', 'Natuk Birkan ve İbrahim Bodur', null, 'IBM 24 saatlik hackathon ortağı.', null],

  ['datacamp', 8, 2025, '31 Ekim - 2 Kasım', 'Albert Long Hall', 'Madlen', 'İki gün çevrim içi atölye, son gün yüz yüze zirve.', null],
  ['datacamp', 7, 2024, '1-3 Kasım', 'Güney Kampüs', null, null, null],
  ['datacamp', 6, 2023, '2-5 Kasım', 'Albert Long Hall', null, 'Salonun fiziksel kapasitesi doldu.', null],
  ['datacamp', 5, 2022, '11-14 Kasım', 'Albert Long Hall', null, 'Bilet 30-90 TL.', null],
  ['datacamp', 4, 2021, '1-5 Aralık', 'Garanti Kültür Merkezi', null, 'Hibrit. Bilet 20-120 TL.', null],
  ['datacamp', 1, 2017, null, null, null, 'Serinin ilk baskısı.', null],

  ['digitalized', 4, 2025, '19 Ekim', 'Albert Long Hall', 'PlusMinusOne ve obilet', 'Startup Lounge: erken aşama öğrenci girişimleri sergilendi.', null],
  ['digitalized', 3, 2024, '21 Nisan', 'Güney Kampüs', 'Macellan SuperApp', null, null],
  ['digitalized', 2, 2023, '26 Mart', 'Demir Demirgil Öğrenci Faaliyet Binası', null, 'Bilet 40-70 TL.', null],
  ['digitalized', 1, 2022, '26-29 Mart', 'Natuk Birkan Binası', null, 'Dört gün, dört başlık: dijital girişimcilik, SaaS, blockchain, veri.', 569],

  // DevTalks: her buluşma ayrı konuk şirketle. Kaynak: Kommunity kayıtları [DOĞRULANMIŞ]
  ['devtalks', null, 2021, '8 Nisan',  'Çevrim içi', null, 'Konuk: Fibabanka. Bankacılık sektöründe CIO olmak', 6],
  ['devtalks', null, 2021, '24 Mart',  'Çevrim içi', null, 'Konuk: Pixery. Mobil uygulama sektöründe CTO olmak', 22],
  ['devtalks', null, 2021, '16 Ocak',  'Çevrim içi', null, 'Konuk: Yemeksepeti. Robot kuryeler', 34],
  ['devtalks', null, 2020, '23 Aralık','Çevrim içi', null, 'Konuk: Huawei. Yeni mobil servis HMS', 14],
  ['devtalks', null, 2020, '18 Aralık','Çevrim içi', null, "Konuk: Microsoft. Türkiye'den Amerika'ya yazılım yolculuğu", 58],
  ['devtalks', null, 2020, '3 Aralık', 'Çevrim içi', null, 'Konuk: GittiGidiyor. E-ticaret dünyasının teknolojisi', 18],
  ['devtalks', null, 2020, '25 Kasım', 'Çevrim içi', null, 'Konuk: Vertigo Games. Game Edition', 12],
  ['devtalks', null, 2020, '6 Ekim',   'Çevrim içi', null, 'Konuk: Masomo. Dünya çapında bir girişimin CTO’su olmak', 8],

  // Blockchain Meetups: 2020 boyunca yedi buluşma [DOĞRULANMIŞ]
  ['blockchain-meetups', 1, 2020, '13 Nisan',  'Çevrim içi', null, 'Serinin açılışı, en yüksek katılım', 126],
  ['blockchain-meetups', 2, 2020, '20 Nisan',  'Çevrim içi', null, null, 55],
  ['blockchain-meetups', 3, 2020, '27 Nisan',  'Çevrim içi', null, null, 28],
  ['blockchain-meetups', 4, 2020, '4 Mayıs',   'Çevrim içi', null, null, 26],
  ['blockchain-meetups', 5, 2020, '18 Mayıs',  'Çevrim içi', null, null, 59],
  ['blockchain-meetups', 6, 2020, '1 Haziran', 'Çevrim içi', null, null, 14],
  ['blockchain-meetups', 7, 2020, '15 Haziran','Çevrim içi', null, 'Serinin son buluşması', 16],

  // algoRun ve Game Jam [DOĞRULANMIŞ]
  ['algorun',  null, 2021, '10-11 Nisan', 'Çevrim içi', null, 'Invent Analytics iş birliğiyle veri hackathonu', null],
  ['game-jam', null, 2021, '4-6 Haziran', 'Çevrim içi', null, 'Hafta sonuna sıkıştırılmış oyun geliştirme maratonu', null],
];
db.transaction(() => {
  db.prepare('DELETE FROM baskilar').run();
  const b = db.prepare(`INSERT INTO baskilar (etkinlik,no,yil,tarih,mekan,ana_sponsor,not_,kayit_sayisi)
                        VALUES (?,?,?,?,?,?,?,?)`);
  for (const s of baskilar) b.run(...s);
})();
console.log('baski=', db.prepare('SELECT COUNT(*) c FROM baskilar').get().c);
