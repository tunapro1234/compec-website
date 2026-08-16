# Kıyas: Avrupa ve Asya'daki öğrenci teknoloji/girişimcilik kulüpleri

compec-site, 2026-07-25. Amaç: v4 için çıkarılabilir fikir üretmek. Yöntem: her site
Playwright ile gerçekten render edildi (SPA'lar statik curl ile boş geliyor), gövde metni,
menü linkleri, hesaplanmış font/renk değerleri ve script listesi çıkarıldı. Erişilemeyenler
açıkça işaretlendi. Ham dökümler: session scratchpad (`kiyas/*.txt`), kalıcı değil.

Not: Bu dosya fikir kaynağıdır, `icerik/veri.md` değildir. Buradaki hiçbir rakam COMPEC
verisi değil, başka kulüplerin kendi iddialarıdır. Siteye girecek COMPEC rakamları yine
sadece `veri.md`den gelir.

---

## Erişim durumu

| Site | Durum |
|---|---|
| cutec.io | Erişildi (tam) |
| oxfordentrepreneurs.co.uk | **ERİŞİLEMEDİ**. Alan adı Wix'e bağlı ama site yok: "This domain isn't connected to a site". Yani Avrupa'nın en büyük girişimcilik topluluğunun sitesi şu an ölü. |
| hackzurich.com | Erişildi ama **site kapanmış**: "HackZurich is currently on hiatus". Üstelik sayfada eczane/ilaç spam linkleri var (VivaFarmacia, AptekaWarszawa24, FarmakeioLarisa). |
| junction.fi | **ERİŞİLEMEDİ** (bağlantı reddedildi). Gerçek alan adları: `hackjunction.com` ve `2026.hackjunction.com`. İkisine de erişildi. |
| analytics-club.org (ETH) | Erişildi (tam: hack4good, structure, past editions, education, careers, join) |
| entrepreneur-club.org (ETH) | Erişildi (ana sayfa) |
| dreamteams.tudelft.nl | **ERİŞİLEMEDİ** (DNS yok). Dream Team'ler tudelft.nl altında dağınık duruyor, ortak bir hub sitesi bulunamadı. Aramada sadece kurumsal TU Delft sayfaları ve tek tek takım siteleri (Formula Student Team Delft, Eco-Runner) çıktı. |
| estiem.org | Erişildi (ana sayfa + career center). `/partners` 404. |
| best.eu.org | Erişildi (ana sayfa). WebFetch'e 403 veriyor, Playwright ile alındı. |
| techfest.org (IIT Bombay) | Erişildi ama **sezon dışı**: ana sayfa ve /aboutus/history "COMING SOON". /sponsors, /aboutus/media, /aboutus/recognition, /aboutus/smp, /aboutus/legals dolu. Rota listesi JS bundle'dan çıkarıldı. |
| ecell.in (E-Cell IIT Bombay) | Erişildi (tam: ana sayfa, about, esummit, esummit/sponsors). `/ca` "TAP TO ENTER" kapısının arkasında, linkleri okundu. |
| nushackers.org | Erişildi (tam) |
| shaastra.org (IIT Madras) | Erişildi (/sponsors, /events). Ana sayfa arcade oyun intro'su ile açılıyor. |
| ituacm.com | Erişildi (tam) |
| ieee.metu.edu.tr | Erişildi |
| ieee.bilkent.edu.tr | Erişildi |

Ek olarak denenip DNS/bağlantı bulunamayanlar: `bilgisayartopluluk.metu.edu.tr`,
`sucs.sabanciuniv.edu`, `ieee.yildiz.edu.tr`, `bounquant.com`, `bugik.org`,
`bogazicigamejam.com` (COMPEC'in kendi GameJam alan adı: **şu an ayakta değil**, `veri.md`de
"var" diye yazılı, düzeltilmeli).

---

# AVRUPA

## CUTEC (cutec.io) - Cambridge University Technology and Enterprise Club

**Künye.** Ekim 2003 kuruluş, Cambridge öğrencileri + MIT Venture Capital and Private Equity
Club üyeleri birlikte kurmuş. 2006'ya kadar Cambridge-MIT Institute fonlamış, sonrasında
bağımsız sponsorlarla yürüyor. Menü: Home, Events, Competition, Committee, TVC, More (Join us,
CUTalks Archive, Blog). Vite ile derlenmiş SPA. Fizikî adres ve telefon sitede yazıyor
(9a Bridge Street Cambridge, +44 1223 566421).

**Öne çıkan 3 şey.**
1. **Kuruluş hikâyesini dürüstçe yazmışlar**: kim kurdu, kim fonladı, fon **ne zaman bitti**.
   "It was initially funded by the Cambridge-MIT Institute until 2006 and has since been
   supported by independent sponsors." Bir kulübün finansal geçmişini böyle açık yazması nadir.
2. **Podcast/konuşma arşivi ayrı bir sayfa** (CUTalks Archive) ve menüde ana seviyede duruyor.
   Blog ise Medium'a dışarıdan bağlanmış: kendi CMS'ini yazmamışlar.
3. **Üyelik bir e-posta listesi hunisi** ve karşılığı numaralandırılarak yazılmış: "Access
   startup competitions, job positions, accelerator programs, consulting projects, and partner
   opportunities", "Registration is completely free", "a community of students and alumni
   across 25+ countries".

**Sponsor tarafı.** Ayrı bir sponsorluk sayfası **yok**. Ana sayfada "Our Sponsors" ve "Our
Partners" iki ayrı logo satırı. Sponsor listesinde para dışı destekçiler de var: Cambridge
Judge Business School, IdeaSpace, Bradfield Centre, Farrer & Co (hukuk bürosu), Robinson
College, Cambridge TV. Kademe tablosu, fiyat, medya kiti yok.

**Üye tarafı.** /join sayfası: 4 numaralı "Why Join?" maddesi + kayıt formu. Başvuru
değerlendirmesi yok, üyelik ücretsiz ve otomatik. Alt kurul tanıtımı yok, sadece Committee
sayfası.

**Teknik.** Başlık fontu **Red Hat Display** (h1 40px/800, letter-spacing 0.5px), gövde
**Poppins**. Renkler: lacivert metin `#141A52`, marka mavisi `#202C90`, vurgu camgöbeği
`#59CFF4`, zemin beyaz ve `#F8F8F8`.

---

## Analytics Club at ETH Zürich (analytics-club.org) - bu listede COMPEC'e en yakın kulüp

**Künye.** Kendini "the largest and most active student-run analytics society in Europe" ve
"The data science club at ETH" diye tanımlıyor. Webflow. Menü: Datathon (dış alan adı),
Hack4Good (Overview / Structure 2026 / Past Editions / Team / FAQ), Education, Quant (Main /
QRG Research Blog), Events, Join us, About us, **Careers**.

**Öne çıkan 3 şey.**
1. **Proje arşivi, isim isim.** `/hack4good-past-editions`: 2019'dan bu yana 7 baskının **her
   projesi**; STK adı, proje başlığı (tırnak içinde), 1 paragraf özet, **çalışan öğrencilerin
   adları** ve "Report" + "Code" linkleri. Örnek: WWF için "BBQ-GPT", rapor hazırlama süresini
   "~80 hours per report"tan aşağı çekmiş. Bu sayfa tek başına kulübün en güçlü kanıtı.
2. **Sponsorların açtığı işleri listeleyen iş panosu.** `/careers` = "Open Careers by Our
   Sponsors": Squarepoint, Millennium, Othis, Calcada, BIL Suisse. Her biri için şirket
   tanıtımı, aranan profil, "View open roles" linki. Sponsorun aldığı şey burada çok net:
   erişim.
3. **Programı ürün gibi yayımlamak.** `/structure`: Hack4Good'un 8 haftalık akışı adım adım
   (Kickoff, Hack Days & Hack Nights, Agile Workshop, Impact Workshop, Pitch Workshop, Final
   Presentations, Project Closing) ve kapanışta ne teslim edildiği: "The developed code will be
   open-source and uploaded to a git repository together with your documentation. Each of the
   participants will receive a certificate of participation." Ayrıca o yılın **challenge
   brief'leri** tam metin, her birinde "Key skills:" etiketi (RAG, anomaly detection, web
   scraping...).

**Sponsor tarafı.** Ayrı "sponsor ol" sayfası **yok**, bu bir eksik. Ama Platinum/Gold kademesi
ana sayfada, ve sponsora verilen değer başka yerlerden okunuyor: challenge sahipliği, iş
panosu, CV havuzu. Datathon tarafında ise açık bir sponsor argüman bloğu var (aşağıda).

**Üye tarafı.** `/join`: "Join over 600 ACE members". Üye faydaları emoji ile 4 madde:
WhatsApp grubu, iş ilanı içeren bülten, üyeye özel etkinlikler, **"CV pool access for job
search"**. Ayrıca ikinci bir kapı: "WANT TO DO MORE? Join the Committee (Applications Closed)".
Yani sıradan üyelik ile ekipte çalışmak ayrı ayrı sunulmuş, ve komite başvurusu kapalıyken
"kapalı" yazıyor.

**Dikkat: kendi rakamlarıyla çelişiyorlar.** Ana sayfa "1000+ Active members", /join "over 600
ACE members". Bu tür tutarsızlık bir siteyi hızla inandırıcılıktan düşürür.

**Teknik.** Webflow. Zemin çok koyu lacivert `#01001A`, vurgu nane yeşili `#1BEF94`, ikincil
mor `#58128E`, derin mavi `#051651`.

### Datathon (datathon.ai) - Analytics Club'ın amiral gemisi, ayrı site

Sponsor ve katılımcı ikna metni bakımından bu sitede iki şey çok iyi:

1. **"Why attend?" başlığını ikiye bölmüşler: "As Sponsor" ve "As Participant".** Sponsora üç
   argüman: Exposure, Talent recruitment, Grow your Network. Katılımcıya üç argüman: Skill
   Enhancing, Network, Win Prizes and Experience. Aynı sayfada, yan yana. Kimse "bu benim için
   mi" diye düşünmek zorunda kalmıyor.
2. **Sponsor arşivi yıla göre gruplanmış**: "Hackathon Sponsors 2026", "Hackathon Partners
   2026", "Hackathon Sponsors 2025", "Event Partners 2025", "Hackathon Sponsors 2024", "Event
   Partners 2024", "Hackathon Sponsors 2023". Sponsorluk sürekliliği bu şekilde görünür oluyor.

Ayrıca **fazlasıyla pratik bir SSS**: duş nerede (yürüme mesafesi dakikayla), uyku tulumu
getir, "In Switzerland, tap water is of very high quality... We will not provide water bottles
so please bring your own", ne getirmeli listesi (diyet kısıtlaması olan için "kendi yemeğini"
maddesi dahil), takım kuralı ("All teams will be made up of 3-4 members... you will be assigned
a full team by us"), yedek liste, son anda iptal prosedürü, ENHANCE ittifakı üzerinden günlük
80 CHF + sürdürülebilir yolculuk için 100 CHF harçlık (uçak ve araba **sayılmıyor**, fiş
zorunlu). Seçicilik de açık: "From over 500 applicants". Ekip listesinde roller yazılı ve
**3 kişi "Sponsoring"**, ayrıca 3 kişi "Advisor" (yani devir teslim/hafıza rolü).

**Teknik.** Webflow "Evently" şablonu. Başlık **Plus Jakarta Display**, gövde **IBM Plex Sans**
+ **Inter**. Renkler: mavi `#316BFF`, koyu lacivert `#1A2447`, gri `#5E5F79`, açık zemin
`#F4F7FF`.

---

## ETH Entrepreneur Club (entrepreneur-club.org)

**Künye.** "one of the most active and prominent student-run clubs in Europe". Rakamlar: 100
Active Members, 20+ Startups Launched, 30+ Events per Year, 5000+ Annual Event Visitors.
Alt markaların hepsi **ayrı alan adında**: launch-startup.ch, incubechallenge.com,
colosseum-ec.ch, colabzurich.com, joinup.ch.

**Öne çıkan 3 şey.**
1. **Üç aşamalı yolculuk haritası (Inspire, Educate, Accelerate) + "30 saniyelik quiz"**:
   "Not sure? Take the 30-second quiz". Ziyaretçiyi kendi kendine doğru programa yönlendiren
   bir yönlendirici.
2. **Dört ayrı destekçi kategorisi**: Club Sponsors, **Legal Partner** (Walder Wyss),
   Partners (13 kurum, çoğu ekosistem kurumu), **In-kind Sponsors** (ElTony Mate, Rivella,
   Falken, PEAQ). Para dışı desteği kategori olarak meşrulaştırmak akıllı: içecek veren firma
   da duvarda yer alıyor, ama para verenle aynı kutuda değil.
3. **Öğrenci ve şirket için ayrı fayda listeleri yan yana.** Şirkete verilen argümanlar: "Give
   back to the next generation", "top student talent", "Speaking and partnership
   opportunities".

**Eksikleri (bizim için ders).** Blog yok, podcast yok, rapor yok, mezun dizini yok, girişim
vitrini yok, iş panosu yok, ayrı sponsorluk sayfası yok. Yani çok etkinlik, az kalıcı içerik.
Alt markaları ayrı alan adlarına dağıtmak da SEO ve bakım açısından pahalı; COMPEC'in 9
etkinlik serisini 9 alan adına dağıtmasını **önermiyorum**.

---

## Junction (hackjunction.com + 2026.hackjunction.com) - sponsorluk sayfası bu listenin en iyisi

**Künye.** 2015'te Aalto Üniversitesi'nde kurulmuş, Aaltoes'tan spinout, **Slush'ın kardeş
kuruluşu**, Startup Foundation çatısı altında. "not-for-profit hackathon organizer and tech
community led by students and recent graduates". 2025'te 15+ ülkede etkinlik, ana etkinlik
1500+ katılımcı. 2026 ana etkinliği 13-15 Kasım, 2000 builder, 48 saat, 100.000 EUR ödül.

**Öne çıkan 3 şey.**

1. **`/partners` sayfası: sponsorluk sayfası nasıl yazılır dersi.** Sırası şu:
   - Tek cümlelik teklif: "Partner with Junction Europe's largest hackathon and put your brand,
     challenge, and talent pipeline at the centre of 10,000+ builders."
   - İki buton: **"DOWNLOAD PARTNERSHIP DECK"** ve **"BOOK A MEETING"**.
   - Dört rakam: 10K+ PARTICIPANTS, 100+ HACKATHONS, 20K EUR PRIZE POOL, **200+ PARTNER
     COMPANIES**.
   - **Altı "neden sponsor olun" argümanı**, hiçbiri "marka bilinirliği" klişesinde kalmıyor:
     *Rapid prototyping and R&D* ("Instead of a three-month internal sprint, throw a real-world
     business challenge at hundreds of bright minds. Walk away with dozens of unique prototypes
     ... after 48 hours"), *Access to top technical talent*, *Visibility in a global developer
     community*, *Gather valuable feedback* ("conduct rapid user interviews, usability tests,
     and surveys"), *Push product adaptation*, **_Cultural injection_** ("Partnering with
     Junction allows your employees to mentor ... Expose your internal team to the builder
     mindset").
   - **Üç paket, kalem kalem teslimat listesiyle**: Tech Partner (API entegrasyon challenge'ı,
     logo, 2 mentor kontenjanı, projelere erişim, etkinlik sonrası kullanım raporu), Challenge
     Partner (kendi challenge track'i, finalist projelere erişim, stant, 4 mentor/jüri
     kontenjanı, etkinlik sonrası yetenek havuzu), Main Partner ("Event naming rights", sahne
     süresi, mekânda kendi katı, sınırsız ekip erişimi, ortak pazarlama kampanyası, sosyal
     medya devralma). **Fiyat yok**, ama içerik o kadar somut ki fiyat sormak için yazıyorsun.
   - **Vaka çalışmaları.** KONE: "Turning 2D building blueprints into production-ready 3D BIM
     models. Built by hackers in 48 hours", sonuç "KONE pursued continued collaboration with the
     top teams through direct recruitment". Google Cloud: "One third of all Junction teams built
     with Google Cloud", "~500 DEVELOPERS ON GCP IN 48 HOURS". Bir de soru-cevap formatında
     partner röportajı: "WHY JUNCTION? / WERE THE EXPECTATIONS MET? / WERE THE SOLUTIONS
     VALUABLE? / WOULD YOU RECOMMEND JUNCTION?" ve altında "✓ RECOMMENDS JUNCTION".
   - **İsim isim insan**: partnerships sorumlusu ve CCO, e-posta + telefon + "Book a Meeting".

2. **"A DECADE OF INNOVATION AND GROWTH" zaman çizelgesi.** 2015'ten 2025'e her yıl: tarih,
   **mekân adı**, tek cümle ne oldu. 2015 "400+ hackers", 2019 "over 1,500 participants from
   100+ countries", 2020 "Online", 2021 "Pioneered hybrid format". Küçülen ve pandemiye
   uğrayan yılları da yazmışlar.

3. **KVKK/GDPR'ı tasarıma katmışlar.** YouTube gömüleri varsayılan olarak yüklenmiyor: "This
   video is embedded from YouTube, which sets marketing cookies. **Allow & load video**".
   Granüler çerez yönetimi ("Accept all / Reject all / Manage preferences") ve hangi alan
   adlarını kapsadığı yazılı. COMPEC v2'de PostHog + oylama parmak izi meselesi olduğu için
   bu bizde doğrudan işe yarar.

**Katılımcı tarafı (2026.hackjunction.com).** Manifesto tonunda metin ("Every revolution begins
with someone unwilling to accept the current model", "Someone will move the center of gravity.
The mover could be you."), üç ortaklık kademesinin **katılımcıya bakan tarifi**, seyahat
hibesi ("Travel grants are available on a limited basis for the strongest applications", vize
süresi uyarısıyla), Terminal Week'ten kapanışa saatli program, jüri metodolojisi, Hardware Lab,
Startup Lounge, "Demos & Deals". SSS'nin en hızlı cevabı Discord'a yönlendiriliyor.

**Teknik.** Terminal/monospace estetiği: bölüm başlıkları `// FOR PARTNERS`, `// WHY PARTNER
WITH US` gibi kod yorumu biçiminde; ürün adı gibi bir sürüm etiketi `JUNCTION·OS V2.0`; orta
nokta ayraç (`JUNCTION·2025 AFTERMOVIE`). Fontlar: **Titillium Web** (ana), **Space Mono**
(etiket/monospace), Inter, Montserrat. Renkler: zemin `#050508`, paneller `#131318` ve
`#1C1C22`, metin beyazın kademeli saydamlıkları (0.45 / 0.65 / 0.75), durum noktaları
amber/yeşil/kırmızı.

---

## ESTIEM (estiem.org) - 1990'dan beri, 79 yerel grup ölçeğinde ağ

**Künye.** "Connecting students around Europe of IEM since 1990". WordPress + Astra +
Elementor. Menü: About Us (Organisation, Structure, IEM Involvement, Join ESTIEM), Events
(**Organize an Event**, Join an Event, **Financial Support**), Central (Get Active, Leadership
Programme, Leadership Open Calls, Council Meeting), Students (**Career Center**, Growing
Together, ESTIEM Incubator, **Magazine Shop**, **Merch**), Network (Partners, Alumni).
"Attend more than 150 different events per year."

**Öne çıkan 3 şey.**
1. **Dört gelişim ekseni** (Academic, Career, Cultural, Personal) tüm program yelpazesini
   sınıflandırmak için kullanılıyor. COMPEC'in 9 etkinlik serisini de böyle 3-4 eksene
   oturtmak mümkün.
2. **Career Center**: öğrenciye iş/staj ilanları + mezun mentorluğu ("Growing Together":
   "Mentorship from alumni") + kuluçka (ESTIEM Incubator). Mezun ağı ayrı portalda
   (my.estiem.org/alumni).
3. **Dergi ve merch dükkânı menüde**. Kulüp kimliğini satılabilir bir nesneye bağlamışlar.
   (COMPEC'in tarihsel "Computus" dergisi burada devreye girebilir, ama `veri.md`ye göre bu
   iddia hâlâ teyitsiz.)

**Eksik.** Şirkete bakan taraf zayıf: `/partners` 404 veriyor, Career Center'da şirket için
paket/fiyat/başvuru akışı yok. 36 yıllık bir ağda bu tuhaf bir boşluk.

---

## BEST - Board of European Students of Technology (best.eu.org)

**Künye.** 1989'dan beri, "voluntary and politically unaffiliated non-profit organisation".
Tüzel kişilik künyede yazılı: "Board of European Students of Technology AISBL".

**Öne çıkan 3 şey.**
1. **"BEST IN NUMBERS": 79 Local Groups / 29 Countries / more than 3300 volunteers.** "more
   than" ibaresini rakamın üstüne küçük punto ile koymuşlar, yani belirsizliği gizlemiyorlar.
2. **Üç net sütun: Courses, Career, Educational Involvement.** Üçüncüsü ilginç: öğrencinin
   mühendislik eğitimi politikasına katılması. Alt maddeleri fiil olarak yazılmış: "Participate
   in BEST Symposia on Education", "Give input on education related surveys", "Provide feedback
   on academic programmes". Ayrıca bir **"BEST Position Paper"** ve yayın/konferans sayfası var.
3. **"How to write a ML"** (motivation letter) rehberi menüde. Başvuracak öğrenciye başvurusunu
   nasıl yazacağını öğreten bir sayfa. Bu, başvuru kalitesini yükseltmenin en ucuz yolu.
   Ayrıca "Identity" (marka/kimlik), "History", "Press" ve "Student Associations" sayfaları var.

**Teknik.** Roboto. Mavi `#0071B9` / `#1B75BC`, turkuaz `#00A99D`. Tasarım eski moda ama bilgi
mimarisi bu listedeki en olgun olanlardan biri. Ana sayfada ayrıca bir siyasi durum metni
("Statement on the Russo-Ukrainian war") var: kurumsal duruş beyanı.

---

## HackZurich (hackzurich.com) - kapanmış, uyarı vakası

Site tek sayfaya inmiş: "HackZurich is currently on hiatus as we evaluate future opportunities
and directions for Switzerland's leading hackathon." Daha kötüsü: sayfada Avrupa eczane
sitelerine giden spam linkler var (`vivafarmacia.com`, `aptekawarszawa24.com`,
`farmakeiolarisa.com`). Bir zamanlar Avrupa'nın en büyük hackathon'larından biriydi. Ders,
"Yapmamalı" bölümünde.

---

# ASYA

## Techfest, IIT Bombay (techfest.org) - sponsor taksonomisinde sınır tanımıyor

**Künye.** 1998'den beri, kendini "Asia's largest science and technology festival" diye
tanımlıyor. Dış kaynaklarda (Wikipedia, basın) son baskı için 1,75-1,8 lakh (175.000-180.000)
ayak trafiği ve "2500+ colleges across India and over 500 overseas" erişimi geçiyor; bunlar
Techfest'in kendi sitesinden **doğrulanamadı**, sezon dışı olduğu için ana sayfa boş.

**Öne çıkan 3 şey.**

1. **Sponsor kademesi diye bir şey yok, sponsor *rolü* var.** `/sponsors` sayfasındaki
   etiketler: Title Sponsor, Associate Title, Powered By, Co-Powered by, Experience Partner,
   UPI Partner, Platinum, Gold; sonra **her alt etkinlik için ayrı Title Sponsor** (International
   Summit, International Edufair, International Technoholix, Auto Expo); sonra Competition
   Partners, TechExpo Partners, Media Partners, Official Network Partner, Transit Media Partner,
   Digital Out Of Home Advertising Partner, Email and Collaboration Partner, Official Multiplex
   Partner, **Official Skin Care Partner**, Official Hospitality Partner. Yani envanteri
   parçalayıp her parçaya isim vermişler: 30 sponsorun 30'u da "tek ve özel" görünüyor.

2. **`/aboutus/media`: basın panosu.** Gazete kupürlerinin taranmış görüntüleri + haber
   linkleri: Times of India, The Hindu, Hindustan Times, CNBC TV18, Free Press Journal,
   Navbharat Times, Maharashtra Times, Mumbai Mirror, Economic Times. Başlık: "TV Coverage".
   Üçüncü tarafın söylediği, kulübün kendi söylediğinden ağırdır.

3. **`/aboutus/recognition`: himaye ve takdir arşivi.** "Patronages over the Years" ve her
   himayenin **gerekçesi** tek satırla: "For promotion of Technical Knowledge", "For various
   social causes taken up", "For its Innovation Challenge", "For Environment Education". Alt
   başlıklar: "Recognition", "Leader's Appreciation".

**Ek gözlemler.** `/aboutus/smp` = **Social Media Partners**: para sponsoru değil, YouTube/
Instagram içerik üreticileri (Tech Burner, Trakintech, Iqlipse Nova...), üstelik "Previous Year
Partners" ayrı bölümde. `/aboutus/legals`: T&C, GDPR, çerez, gizlilik, hyperlinking, frames,
content liability. JS bundle'dan çıkan rota listesi bir etkinlik platformunun tam envanteri:
`/competitions/:name/{register,createteam,jointeam,leaveteam,dissolveteam}`,
`/workshops/combos/:comboName` (atölye paketi!), `/accommodation` + `/accodetails`, `/store`
(merch), `/betting` + `/overallbet` (robot savaşlarına tahmin oyunu), `/map`, `/scanner`
(kapıda QR okuma), `/profile`, `/esports`, `/idrl` (drone yarış ligi), `/twmun`.

**Teknik.** React (CRA). Fontlar: **Blender Pro Book** ve **Kensmark-03-Bold** (ikisi de
lisanslı, "teknik/askerî" karakterli tipografi). Mor vurgu `#4C1D95`, siyah-beyaz zemin.

## E-Cell IIT Bombay (ecell.in) - ikna mimarisi burada

**Künye.** 1998 kuruluş, motto **"Creating Job Creators"**. Kendini "Asia's largest student-run
entrepreneurship-promoting Non-Profit Organization **as designated by Thomson Reuters**" diye
tanımlıyor: iddiayı üçüncü tarafa dayandırıyor. Ekip büyüklüğünü de somut yazıyor: "a team of
22 Managers, 2 Overall Coordinators", ve ofisi: "an 18x18x14 room, popularly known as the
'E-Cell office'".

**Öne çıkan 3 şey.**

1. **Kurumsal onay katmanı (bizde tamamen eksik olan şey).** Ana sayfada üç referans var ve
   üçü de kulübün değil, **kurumun tepesinin** sözü: IIT Bombay eski Rektörü, eski Dekanı ve
   **Hindistan Eğitim Bakanı**. Bakanın sözü: "E-Cell IIT Bombay has been instrumental in
   fostering a culture of innovation among its students." Buna "In the Spotlight" bölümü
   ekleniyor: Forbes'ta çıkma, The Hindu birinci sayfa, Harvard US-India Initiative,
   TiEcon 2005, **Nasdaq Tower Times Square** ve Shibuya ekranında gösterilme.

2. **1998'den 2023'e yıl yıl tarih sayfası.** Kurucu ekibin **7 kişinin adı tek tek yazılı**.
   Her yıl bir kilometre taşı: 1999 ilk kampüs girişimi, 2001 CNN'in Eureka'yı tanıması, 2005
   NEN ödülü, 2008 MIT'nin Madrid'deki Global Conference of E-Cells'inde Hindistan'ı temsil,
   2013 **UNESCO himayesi**, 2015 Make in India himayesi, 2020 pandemide tamamen online,
   2021 sosyal medyada resmî onay (mavi tik), 2023 Forbes.

3. **Sponsor sayfasında her sponsora özel bir rol adı + iletişim için isim isim insan.**
   E-Summit sponsor sayfası: WestBridge Capital "TITLE SPONSOR", Stripe "TITLE SPONSOR",
   Google AdMob ve GitLab "ASSOCIATE TITLE", SBI "CO-TITLE", KRAFTON "OFFICIAL GAMING PARTNER",
   NVIDIA "TECHNOLOGY PARTNER", Croma "GADGETS PARTNER", Cipla Health "CASE-COMPETITION
   PARTNER", ve daha 20 tane. **"Media Associates" ayrı satır** (Inc42, YourStory, Business
   Standard, The Better India). Sayfanın altında **3 Marketing Head ve 2 Media Head, adları,
   e-postaları, WhatsApp linkleri ve LinkedIn profilleriyle**. Ayrıca beş rol e-postası:
   `esummit@`, `hospitality@`, `marketing@` (sponsorluk), `speaking@` (konuşmacı önerisi),
   `associate@` (kurumsal işbirliği).

**Ek gözlemler.**
- **13 girişim alt markası** ana sayfada kart kart, her biri tek cümlelik tanım ve kendi
  microsite'ı: E-Summit, Eureka!, Eureka! Junior, Eureka! GCC, illuminate, Summit Chapters,
  NEC, NEC Junior, Campus Ambassador, FInCoF, EnB Club, EnSpace, Aasha.
- **"Our Reach" = platform platform takipçi sayısı** (444K+ / 80K+ / 68K+). Doğrulanabilir bir
  ölçü kullanıyorlar; "500.000 kişiye ulaştık" gibi havada bir sayı değil. (Ana sayfadaki
  "1000+ Cities / 60K+ Startups / 500K+ Students" ise kaynaksız ve bence zayıf tarafı.)
- **Campus Ambassador programı**: diğer üniversitelerde temsilci öğrenciler, `#incentives` ve
  `#tnc` (şartlar) bölümleri, ve 30+ markadan üye avantajı (kurs, ürün indirimi).
- **Konuşmacı duvarı ad + unvan** ile: Travis Kalanick (Uber), Werner Vogels (CTO, Amazon),
  Indra Nooyi, Ratan Tata, Nandan Nilekani, Jordan Belfort. Yalnızca isim değil, **kim olduğu**
  yazıyor.

**Teknik.** Angular. Fontlar: gövde **Poppins**, başlık **Bebas Neue** (h1 64px). Renkler:
koyu petrol `#243137`, sarı `#FFDF00`, altın `#BD9F67`, metin `#212529`. E-Summit microsite'ı
tamamen ayrı bir dünya: **GTA6-Bold / GTA6-Heading / GTA6-Thin** adlı oyun temalı özel fontlar,
Spline 3D viewer, three.js + GSAP + p5.js, Razorpay ile bilet satışı. Yani ana kulüp sitesi
sakin, etkinlik sitesi gösterişli. **Bu ayrım COMPEC için doğrudan uygulanabilir bir model.**

## Shaastra, IIT Madras (shaastra.org)

**Künye.** IIT Madras'ın yıllık teknik festivali. 2026 teması: **"Artifacts of Arcades"**.
Ana sayfa bir arcade oyunu intro'su ile açılıyor: "LET'S / PLAY / A GAME / ARE YOU / READY! /
SKIP INTRO". Tüm site **Press Start 2P** piksel fontuyla yazılmış.

**Öne çıkan 3 şey.**
1. **Yıllık tema, sitenin tamamını yönetiyor.** Tipografi, renk, giriş animasyonu temanın
   parçası. Her yıl siteyi baştan yapmak pahalı ama kimlik tazeliyor.
2. **~50 sponsor, ~50 farklı rol adı.** Title, Diamond, Innovation Partner, Platinum, Imperial,
   Titanium, Gold, Silver, Ruby, Growth Partner, Cybersecurity Partner, Prize Pool Sponsor,
   Defense Innovation Partner, Official Magazine Partner, Cultural Outreach Partner (British
   Council), **Official Campus Ambassador Program Sponsor (üç ayrı şirket)**, Official Music
   Streaming (JioSaavn), Network (D-Link), Writing (Pilot Pens), Snacking, 3D Printing, Online
   Gaming (Chess.com), Community Service (hastane), Comfort, Transit, Cubing, Confectionery,
   Computational (JarvisLabs). Techfest ile aynı mantık: envanteri sonsuza kadar bölmek.
3. **Etkinlikler 7 kümede** (AeroFest, Biogen, Business, Coding and Logic, Design and Build,
   Elecfest, Ignite): 100+ yarışma tek listede boğulmuyor.

**Teknik.** Vite + Tailwind (renkler `oklch()` ile tanımlı, modern CSS), Razorpay ile ödeme.

## NUS Hackers (nushackers.org) - küçük ölçekte en zarif olan

**Künye.** Singapur Ulusal Üniversitesi. Slogan: "Spreading the hacker culture". Üç format:
**Friday Hacks** (konuşma), **Hackerschool** (atölye), **Hack&Roll** ("24-hour hackathon for
students", ayrı yerde "Singapore's largest student-run hackathon").

**Öne çıkan 3 şey.**
1. **Her konuşma numaralı: #296, #297, #298 ... #304.** 300'üncü Friday Hacks'e gidiyorlar.
   Numaralandırma, kurumsal hafızayı bedavaya inşa eden en güçlü hamle.
2. **Bütün dönemin takvimi baştan yayımlanmış, boş haftalar dahil.** Konuşmacısı olmayan
   haftalar "Looking for speakers 👀" diye duruyor; etkinlik **olmayan** haftaların gerekçesi
   yazılı: "No Friday Hacks - Recess Week", "- Midterms", "- NUS Well-being day". Hem şeffaf,
   hem de konuşmacı çağrısı yapan bir takvim.
3. **Arşiv menüde ana seviyede** (Archive > Friday Hacks / Hackerschool), **RSS** var, arama
   var, **Code of Conduct** ayrı sayfa, çekirdek ekip başvurusu ayrı sayfa (`/join-coreteam`).

**Teknik.** Statik site. Font **Rubik**, beyaz zemin, tek vurgu rengi turuncu `#E66000`.
Ton samimi ve emoji kullanıyor ("for everyone", "from all walks of life"). Sponsorluk sayfası
**yok**; tek sponsor izi bir etkinlikte Jane Street adı. En büyük eksiği bu.

---

# TÜRKİYE: YEREL KIYAS

## İTÜ ACM (ituacm.com)

**Künye.** Vite SPA, Cloudflare arkasında. Menü: Home, Events, **Courses**, **Calendar**,
About, Contact. Ana sayfa rakamları: "100+ Active Members", "20+ Sponsors", "3 Technical
Squads". Kendini "the largest computer science and software club at Istanbul Technical
University" diye tanımlıyor. Amiral etkinlik: AlgoComp.

**İyi yaptıkları.** (1) **Courses ayrı bir bölüm**: "Past Courses" listesi, ders sayısı ve
süresiyle ("Long Term Course, 4 lessons, 4 weeks", Python101). (2) **Calendar ayrı bölüm**.
(3) Danışman akademisyeni ve ACM bağını yazıyorlar, kurumsal meşruiyet devşiriyorlar.
(4) GitHub hesabı sosyal ikonlar arasında.

**Zayıf yaptıkları.** "20+ Sponsors" yazıyor ama **sponsor listesi yok, sponsorluk sayfası
yok, sponsor logosu yok**. Geçmiş etkinlik arşivi çıktı odaklı değil. Dil karışık: menü ve
kurumsal metin İngilizce, YK unvanları ve kurs açıklaması Türkçe. Üyelik bir Google Form'a
gidiyor. Alt kurul tanıtımı yok ("3 Technical Squads" deyip geçiyor).

**Teknik.** Font **Space Grotesk** (h1 64px/600). Renkler: lacivert `#002F6C`, mavi `#0085CA`.
Temiz ama sığ: 6 sayfa ve hepsi kısa.

## IEEE ODTÜ (ieee.metu.edu.tr)

**Künye.** WordPress, "OnePage Express" hazır teması. 1990'da **12 kurucu üyeyle** kurulmuş,
"one of the 1,150 student branches of IEEE Global". Menü: Home, IEEE Structure, Subdivisions,
**Achievements**, Events, Contact, **HACKMETU**.

**Durum.** Site fiilen terk edilmiş görünüyor: blogda 2 yazı (biri 2023 "hello-world"), "Home"
linki başka bir alan adına (blog.metu.edu.tr) gidiyor, footer'da tema reklamı duruyor ("Built
using WordPress and OnePage Express Theme"), üyelik yine Google Form. Slogan Türkçe ("Çünkü
Hayaller Sınır Tanımaz"), gövde İngilizce, menü İngilizce, tarih formatları Türkçe.
**"Achievements" (başarılar) bölümü fikir olarak iyi**, içerik olarak boş.

## IEEE Bilkent (ieee.bilkent.edu.tr) - Türkiye'de gördüğüm en iyisi

**Künye.** WordPress block tema. Menü: Our Activities, **Scoreboard & Activity Calendar**,
GRC'26, Our Subbranches, Our Team, About Us. "IEEE Bilkent with Numbers: **2000+ MEMBERS /
40+ YEARS OF EXPERIENCE / 12 SUBBRANCHES**".

**İyi yaptıkları.**
1. **12 alt kurulun her biri için tek cümlelik, somut tanım.** Örnek: IAS "connects students
   with industry, offering career events, alumni talks, internship support, company tours";
   YEA "introduces high school students to engineering"; **Web Team** "builds and maintains the
   IEEE Bilkent website, educates members in web development". Kendi web ekibini alt kurul
   yapmak, sitenin ölmemesini garantiye alıyor.
2. **Her etkinliğe geçmişe dönük özet yazısı.** ComTalks oturumları, konuşmacının adı, unvanı ve
   konuşma başlığıyla ("Why Multiple Antennas?", Dr. Özlem Tuğfe Demir; "Wireless Indoor
   Localization via Visible Lights", Prof. Sinan Gezici). Etkinlik afişi değil, etkinlik
   **kaydı**.
3. **"Scoreboard & Activity Calendar"**: üye faaliyetini puanlayan bir tablo. Kulüp içi
   motivasyonu siteye taşımak.
4. Alt etkinliğin (GRC'26) kendi microsite'ı var.

**Zayıf.** Sponsor/kurumsal taraf yok. Misyon-vizyon metinleri IEEE'nin genel kurumsal
metninin kopyası, Bilkent'e özgü hiçbir şey söylemiyor (iki paragraf tam anlamıyla dolgu).
Tipografi: **Jost** + Inter; renkler `#1C2930`, `#25637A`, `#8ED1FC`.

## Yerel kıyasta COMPEC nerede öne geçebilir

Türkiye'deki bilişim kulübü siteleri şu üç şeyi **hiç** yapmıyor, üçü de bizde hazır veriyle
mümkün:

1. **Sponsor tarafını kurmak.** İTÜ ACM "20+ sponsor" diyor ama tek sponsor adı yazmıyor. IEEE
   Bilkent ve ODTÜ hiç değinmiyor. Bizde 28 sponsor kaydı ve gerçek marka adları var (Akbank,
   HubX, Huawei, ING, Yapı Kredi Teknoloji, Acıbadem Technology, TEB, Insider, Global Maksimum,
   Invent Analytics). Junction kalıbında bir "Kurumlar için" sayfası, Türkiye'de bu ligde
   **rakipsiz** olur.
2. **Baskı zinciri ve süreklilik.** Kimse "bu etkinliği 17 kez yaptık" diyebilecek durumda
   değil; İTÜ ACM AlgoComp'u, ODTÜ HackMETU'yu tek tek anlatıyor. TechSummit 2010'dan beri,
   DataCamp 2017'den beri, kulüp 1994'ten beri. **Zaman derinliği bizim en büyük ve en
   kullanılmamış varlığımız.**
3. **Etkinlik sonrası kayıt.** IEEE Bilkent özet yazısı yazıyor (Türkiye'de en iyisi bu), ama
   çıktı/proje/kod arşivi kimsede yok. algoRun ve Game Jam bizde proje üreten etkinlikler:
   Hack4Good kalıbında bir proje arşivi Türkiye'de ilk olur.

Ayrıca **doğrulanmış bir basın kaydı bulundu** (v4'te "Basında biz" bölümünün ilk maddesi
olabilir): Hürriyet Teknoloji, "Hackathon AlgoRun İTÜ Teknokent'te gerçekleşti",
16-17 Şubat (2019). Tam alıntı: *"Invent Analytics ve Boğaziçi Bilişim Kulübü Compec tarafından
düzenlenen ve 100'den fazla katılımcının takımlar halinde yarıştığı Hackathon AlgoRun'ın bu yıl
ki konusu Espor oldu."* Bu, `veri.md`deki algoRun '21 kaydından farklı, **daha eski bir baskıyı**
(2019, Espor teması, 100+ katılımcı, İTÜ Teknokent) belgeliyor ve "100'den fazla katılımcı"
ifadesi bir Kommunity RSVP'si değil, üçüncü taraf beyanı.
URL: `https://www.hurriyet.com.tr/teknoloji/hackathon-algorun-itu-teknokentte-gerceklesti-41124592`

---

# COMPEC'E UYARLANABİLİR FİKİRLER

Zorluk ölçeği: **Kolay** = mevcut veriyle bir oturumda yapılır · **Orta** = veri toplama veya
yeni sayfa gerekir · **Zor** = kulüpten karar, içerik üretimi veya süreç gerekir.

## A. Sponsor tarafı (bizim en büyük eksiğimiz)

**1. "Kurumlar için" sayfası, Junction sırasıyla**
- (a) Fikir: Tek sayfa, şu sırayla: tek cümlelik teklif → 4 rakam → 5-6 "neden" argümanı →
  3 paket kalem kalem → geçmiş iş örnekleri → isim isim iletişim + randevu linki.
  Kademe adı ("Altın/Gümüş") değil, **teslimat kalemi** yazılır: kaç mentor kontenjanı, stant,
  sahne süresi, veri seti sahipliği, etkinlik sonrası ne rapor edilir.
- (b) Kaynak: hackjunction.com/partners (birebir kalıp), ecell.in/esummit/sponsors (rol adları),
  datathon.ai ("As Sponsor" bloğu).
- (c) Bizde: 28 sponsor kaydı, 9 etkinlik serisi, TechSummit 801 ve Digitalized 569 kaydı,
  Albert Long Hall'un dolu salon fotoğrafı, 7 alt kurul (kimin ne teslim edeceği belli).
- (d) Zorluk: **Orta**. Paket içerikleri kulüple birlikte kararlaştırılmalı. Fiyat yazmak
  zorunlu değil; Junction da yazmıyor.

**2. Sponsor kademesi yerine sponsor rolü**
- (a) Fikir: "Ana sponsor / altın / gümüş" üçlemesini bırakıp envanteri role bölmek: Veri
  Sponsoru (algoRun veri setini veren), Challenge Sponsoru, Mekân Ortağı, Eğitim Ortağı,
  Ödül Havuzu Sponsoru, Medya Ortağı, İkram Ortağı, Ulaşım Ortağı. Böylece nakit vermeyen
  destekçi de duvarda yer alır ve nakit verenle karışmaz.
- (b) Kaynak: techfest.org/sponsors (20+ rol), shaastra.org/sponsors (~50 rol),
  entrepreneur-club.org ("In-kind Sponsors", "Legal Partner").
- (c) Bizde: Invent Analytics zaten algoRun'ın veri/challenge ortağı; Boğaziçi'nin mekânları
  (Albert Long Hall, Garanti Kültür Merkezi, Natuk Birkan) etkinlik bazında farklı.
- (d) Zorluk: **Kolay** (taksonomiyi yazmak), **Orta** (hangi sponsorun hangi rolde olduğunu
  kulüpten teyit etmek).

**3. Sponsorluk dosyasını indirilebilir yapmak + randevu linki**
- (a) Fikir: "Sponsorluk dosyasını indir" (PDF) ve "Görüşme ayarla" iki buton, sayfanın hem
  başında hem sonunda. PDF'in içeriği: etkinlik istatistikleri, geçmiş sponsorlar, kitle
  profili, SSS.
- (b) Kaynak: hackjunction.com/partners ("DOWNLOAD PARTNERSHIP DECK", "BOOK A MEETING").
- (c) Bizde: Kurumsal İletişim & Finans direktörlüğü var (Ali Saffan Kökoğlu), yani sahibi
  belli. Dosya içeriği bu kıyas dosyasından ve `veri.md`den çıkar.
- (d) Zorluk: **Orta**. PDF üretimi kulübün işi; sitede yer ve buton bizim işimiz.

**4. Sponsorluk iletişimi için isim isim insan, rol e-postasıyla birlikte**
- (a) Fikir: `info@` yerine `kurumsal@compec.org` (sponsorluk), `konusmaci@compec.org`
  (konuşmacı önerisi), `basin@compec.org`. Yanında sorumlu kişinin adı, fotoğrafı ve LinkedIn'i.
- (b) Kaynak: ecell.in/esummit/sponsors (5 rol e-postası + 5 kişi, e-posta/WhatsApp/LinkedIn),
  hackjunction.com/partners (2 kişi, telefon + Calendly).
- (c) Bizde: 17 YK üyesi ve 25-26 portreleri hazır (`reference/varliklar/25-26YK/`).
- (d) Zorluk: **Kolay** (sayfa), **Orta** (e-posta hesaplarının açılması kulübe bağlı).

**5. Geçmiş sponsorları yıla göre gruplamak**
- (a) Fikir: "Mevcut sponsorlarımız" yerine "2024 · 2022 · 2018" başlıklı satırlar. Tekrar
  eden sponsor varsa süreklilik kendiliğinden görünür.
- (b) Kaynak: datathon.ai (Sponsors 2026/2025/2024/2023), techfest (Previous Year Partners).
- (c) Bizde: `veri.md`de sponsor yılları zaten dağınık (2018, 2022, 2024) ve bu yüzden
  "mevcut sponsorlar" denemiyor. Yıla göre gruplama bu sorunu **çözüyor**: dağınıklık kusur
  değil arşiv olur.
- (d) Zorluk: **Kolay**. Logo yok, isim listesi olarak yazılır (`veri.md` kuralı).

**6. Sponsora dönük vaka çalışması (1 sayfa, 4 soru)**
- (a) Fikir: "Invent Analytics x algoRun" için: Hedef neydi / Challenge ne oldu / Sonuç ne oldu /
  Neden işe yaradı. Sonunda tek satır sonuç etiketi.
- (b) Kaynak: hackjunction.com/partners (KONE ve Google Cloud vakaları, "✓ CONTINUED
  POST-HACKATHON COLLABORATION" etiketi).
- (c) Bizde: algoRun 2019 (Espor teması, 100+ katılımcı, Hürriyet haberi) ve algoRun '21
  (Invent Analytics ortaklığı) doğrulanmış. DevTalks serisinde 8 gerçek kurum ortaklığı var
  (Microsoft, Yemeksepeti, Pixery, Huawei/HMS, GittiGidiyor, Fibabanka, Masomo, Vertigo Games).
- (d) Zorluk: **Zor**. Sonuç cümlesi için kurumdan tek bir alıntı almak gerekir; almadan
  yazılmaz.

**7. "Neden sponsor olun" argümanlarını klişeden çıkarmak**
- (a) Fikir: "Marka bilinirliği" demeyi bırakıp Junction'ın altı argümanını Türkiye/Boğaziçi
  bağlamına çevirmek: **hızlı prototipleme** (üç aylık iç sprint yerine 48 saatte onlarca
  prototip), **yetenek hattı** (staj/işe alım), **ürün benimsetme** (API/araçlarınızı öğrenciye
  kullandırma), **geri bildirim** (kullanıcı testi yaptırma), **kültürel enjeksiyon**
  (kendi mühendisinizi mentor yapmak), **görünürlük**.
- (b) Kaynak: hackjunction.com/partners, datathon.ai ("As Sponsor": Exposure / Talent
  recruitment / Grow your Network).
- (c) Bizde: Doğrudan veri gerekmiyor, argüman metni. Ama her argümanın altına bizden bir
  örnek konur (mentorluk için DevTalks, prototip için algoRun/Game Jam).
- (d) Zorluk: **Kolay**. Bu bir kopya (copywriting) işi.

## B. Kanıt ve kurumsal onay

**8. "Basında biz" sayfası**
- (a) Fikir: Haber linkleri + yayın adı + tarih + tek satır alıntı. Kupür görüntüsü varsa
  görsel, yoksa düz liste.
- (b) Kaynak: techfest.org/aboutus/media (kupür duvarı), ecell.in/about ("In the Spotlight").
- (c) Bizde: **Hürriyet Teknoloji / AlgoRun 2019** doğrulandı (yukarıda tam alıntı ve URL).
  Muhtemelen başka kayıtlar da var; taranması gerekir.
- (d) Zorluk: **Orta**. Bir haber ile başlanabilir; tek maddelik bir "Basında biz" bile
  hiç yoktan iyidir, ama üç madde olmadan bölüm açmam.

**9. Kurumsal onay katmanı: Boğaziçi'nden bir cümle**
- (a) Fikir: Rektörlük, dekanlık, CmpE bölüm başkanlığı veya danışman akademisyenden tek
  paragraf destek metni, ad-unvanla.
- (b) Kaynak: ecell.in (Rektör + Dekan + Eğitim Bakanı alıntıları), ituacm.com (danışman
  akademisyeni yazmak), ieee.metu.edu.tr (IEEE bağını yazmak).
- (c) Bizde: **Şu an yok.** Kulübün Boğaziçi'ndeki resmî statüsü ve danışmanı isteniyor.
- (d) Zorluk: **Zor**. Kulübün gidip alması gerekir. Ama etkisi büyük: sponsor gözünde
  "öğrenci kulübü" ile "üniversite bünyesinde 32 yıllık kurum" arasındaki farkı bu yapıyor.

**10. Rakamları üçüncü tarafa dayandırmak**
- (a) Fikir: "Asya'nın en büyüğü, **Thomson Reuters'a göre**" kalıbı. Kendi iddiamızı kendimiz
  değil, kaynak söylesin.
- (b) Kaynak: ecell.in ("as designated by Thomson Reuters", "recognized by CNN"), best.eu.org
  ("more than 3300" ibaresiyle belirsizliği açıkça yazmak).
- (c) Bizde: Kommunity kayıt sayıları (platform verisi, "kayıt" olarak etiketlenmeli),
  Hürriyet'in "100'den fazla katılımcı" ifadesi, sosyal medya takipçi sayıları.
- (d) Zorluk: **Kolay**. Zaten `veri.md`nin kuralı bu; bu fikir kuralı bir **tasarım öğesine**
  çeviriyor: her rakamın yanında küçük punto kaynak etiketi.

**11. Takipçi sayısını "erişim" olarak dürüstçe kullanmak**
- (a) Fikir: "X kişiye ulaştık" yerine platform platform takipçi tablosu: Instagram / LinkedIn /
  YouTube / Kommunity. Her satır doğrulanabilir.
- (b) Kaynak: ecell.in/about ("Our Reach": 444K+ / 80K+ / 68K+ followers).
- (c) Bizde: 6 teyitli kanal var (`veri.md`), 957 Kommunity üyesi dahil. Kommunity sayısı
  "kulüp üyesi" diye sunulamaz ama **"Kommunity takipçisi"** diye sunulabilir.
- (d) Zorluk: **Kolay**. Sayılar çekilip tarih damgasıyla yazılır ("Temmuz 2026 itibarıyla").

## C. Zaman derinliği ve arşiv

**12. 1994'ten bugüne yıl yıl tarih sayfası**
- (a) Fikir: Her yıl için tarih + tek cümle + varsa mekân adı. Boş yıllar boş kalır, uydurulmaz.
  Pandemi yılı "tamamen online" diye yazılır.
- (b) Kaynak: ecell.in/about (1998-2023, kurucu adları dahil), hackjunction.com/about
  ("A DECADE OF INNOVATION AND GROWTH", mekân adlarıyla).
- (c) Bizde: 1994 kuruluş, eski adlar (Bilgisayar Mühendisliği Kulübü → Bilişim Kulübü),
  TechSummit 2010'dan beri, DataCamp 2017'den beri, 2020 Blockchain Meetups (7 buluşma, tamamı
  online), 2022 TechSummit 13. baskı (Garanti Kültür Merkezi), 2022 Digitalized ilk baskı
  (Natuk Birkan), 2023 DataCamp (Albert Long Hall), 2024 TechSummit (Acıbadem Technology).
  Tarihsel notlar (Computus dergisi, ücretsiz bilgisayar kursları, composto portalı) teyit
  edilirse çizelgenin 1994-2004 aralığı dolar.
- (d) Zorluk: **Orta**. Elimizdeki veriyle 2010 sonrası dolu, öncesi seyrek. Seyrekliği
  kabul etmek gerekir; uydurmak yasak.

**13. Etkinlik baskı zinciri (aynı etkinliğin bütün yılları tek sayfada)**
- (a) Fikir: TechSummit sayfası: 2010'dan bugüne her baskı satır satır (yıl, tema, mekân,
  kayıt sayısı, ana sponsor). DataCamp, Digitalized, algoRun için aynısı.
- (b) Kaynak: datathon.ai (yıla göre sponsor grupları), hackjunction.com/about (yıl zinciri),
  ecell.in (13 alt marka, her biri kendi sayfası).
- (c) Bizde: v2 (`denemeler/matbaa`) zaten "baskı zincirleri" fikrini uygulamış, veri şeması
  var. Doğrulanmış: TechSummit 2022 = 13. baskı, 801 kayıt, Garanti Kültür Merkezi; Digitalized
  2022 = ilk baskı, 569 kayıt, NB.
- (d) Zorluk: **Orta**. İskelet var, ara yıllar eksik; eksik yıllar "kayıt bulunamadı" diye
  boş bırakılır.

**14. Proje/çıktı arşivi (isim isim öğrenci + kod linki)**
- (a) Fikir: algoRun, Game Jam ve DataCamp çıktılarının arşivi: yıl, takım, proje adı, 2-3
  cümle özet, **katılan öğrencilerin adı**, varsa repo linki. Bu sayfa hem katılımcıyı hem
  sponsoru ikna eder.
- (b) Kaynak: analytics-club.org/hack4good-past-editions (7 baskının her projesi, öğrenci
  adları, "Report" + "Code" linkleri).
- (c) Bizde: **Şu an yok.** Game Jam'in itch.io/GitHub izleri ve algoRun sonuçları taranmalı;
  kulüpten kazanan takım listeleri istenmeli.
- (d) Zorluk: **Zor** (veri toplama), ama getirisi en yüksek maddelerden biri. Tek bir yılla
  başlanabilir.

**15. Konuşmacı duvarı: ad + unvan + kurum, fotoğraf şart değil**
- (a) Fikir: Sadece kurum logosu değil, **kişi adı ve unvanı**. Fotoğraf yoksa monogram.
- (b) Kaynak: ecell.in (Travis Kalanick "Co-founder, Uber", Werner Vogels "CTO, Amazon"),
  ieee.bilkent.edu.tr (her konuşmacının unvanı ve konuşma başlığı).
- (c) Bizde: 23 doğrulanmış konuşmacı (NVIDIA, Insider, Hepsiburada dahil). `veri.md`
  uydurma konuşmacı yasağını koyuyor; gerçek 23 kişi zaten yeter.
- (d) Zorluk: **Kolay**, isim/unvan listesi teyitliyse.

**16. Etkinlik sonrası özet yazısı (afiş değil, kayıt)**
- (a) Fikir: Her etkinlikten sonra 1 paragraf: kim konuştu, ne anlattı, kaç kişi geldi, bir
  fotoğraf. Etkinlik sayfası duyuru öncesi "duyuru", sonrası "kayıt" olur.
- (b) Kaynak: ieee.bilkent.edu.tr (Türkiye'de en iyi örnek), nushackers.org (arşiv + RSS).
- (c) Bizde: 25 Kommunity etkinliği + kulübün kendi kayıtları; DevTalks'ın 8 kurumu.
- (d) Zorluk: **Orta**. Sürdürülebilirliği kulübün PR alt kuruluna bağlı; site tarafında
  şablon hazırlanır.

**17. Etkinlikleri numaralandırmak**
- (a) Fikir: "DevTalks #9", "Blockchain Meetup #7". Numara, hem süreklilik iddiasını hem
  arşivi bedavaya kurar.
- (b) Kaynak: nushackers.org (Friday Hacks #296 ... #304, 300'e yaklaşıyorlar).
- (c) Bizde: Blockchain Meetups 2020 serisi tam 7 buluşma (kayıt sayıları da elimizde),
  DevTalks en az 8 oturum, TechSummit 13+ baskı.
- (d) Zorluk: **Kolay**, seri sayıları doğruysa.

## D. Üye/katılımcı tarafı

**18. İki kapılı üyelik: "üye ol" ve "ekipte çalış" ayrı**
- (a) Fikir: Bültene/topluluğa katılmak (ücretsiz, anında) ile alt kurulda görev almak
  (başvuru, dönemsel) ayrı iki akış. Başvuru kapalıysa **"başvurular kapalı"** yazmak.
- (b) Kaynak: analytics-club.org/join ("Become a member" + "WANT TO DO MORE? Join the
  Committee (Applications Closed)"), cutec.io/join (ücretsiz üyelik hunisi),
  nushackers.org (`/join-coreteam`).
- (c) Bizde: 7 alt kurul adı hazır; Kommunity/luma zaten topluluk kapısı olarak kullanılabilir.
- (d) Zorluk: **Kolay**.

**19. Alt kurulların her birine somut tek cümle**
- (a) Fikir: "Teknoloji · DevTeam · PR · Kurumsal İletişim · İç İletişim · BBÖ · Dijital
  Girişimcilik" listesini bırakıp her biri için "ne yapar, ne öğrenirsin, dönemde kaç saat"
  yazmak.
- (b) Kaynak: ieee.bilkent.edu.tr (12 alt kurul, her biri tek cümle ve somut),
  best.eu.org (üç sütun, alt maddeleri fiil olarak).
- (c) Bizde: 7 alt kurul + YK'nın direktörlük yapısı (Veri Bilimi & YZ, Dijital Girişimcilik,
  Teknoloji, Pazarlama, BBÖ & Blockchain).
- (d) Zorluk: **Orta**. Cümleleri alt kurul sorumlularından toplamak gerekir.

**20. Ciddi bir SSS: lojistik ayrıntı = güven**
- (a) Fikir: "Ücretli mi? Boğaziçi öğrencisi olmak şart mı? Takım kaç kişi? Bilgisayar
  getirmeli miyim? Yemek var mı? Kampüse nasıl girilir, kimlik gerekir mi? Sertifika veriliyor
  mu?" Cevaplar kısa ve kesin.
- (b) Kaynak: datathon.ai SSS (duş, uyku tulumu, musluk suyu, ne getirmeli, yedek liste,
  iptal), 2026.hackjunction.com (vize/seyahat).
- (c) Bizde: Kampüs içi etkinlikler (Albert Long Hall, NB, Garanti Kültür Merkezi) ve
  hibrit deneyim (2022 TechSummit). Boğaziçi kampüsüne dışarıdan giriş, İstanbul ulaşımı,
  hafta içi/sonu gibi bize özgü sorular var.
- (d) Zorluk: **Orta**. Cevapları kulüpten almak lazım, ama liste hazır çıkarılabilir.

**21. Dönemin tüm takvimi, boş haftalar dahil**
- (a) Fikir: Takvimi baştan yayımlamak; tarihi kesinleşmemiş etkinlik "tarih açıklanacak",
  konuşmacı arayan hafta "konuşmacı arıyoruz", etkinlik olmayan hafta ise **gerekçesiyle**
  ("ara tatil", "final haftası").
- (b) Kaynak: nushackers.org (dönemin tamamı, "Looking for speakers 👀", "No Friday Hacks -
  Midterms"), ituacm.com (Calendar sayfası).
- (c) Bizde: **2026-27 takvimi elimizde YOK** (`veri.md` uyarısı). Bu fikir tam bu yüzden
  değerli: uydurma tarih koymadan takvim sayfası açmanın dürüst yolu.
- (d) Zorluk: **Kolay** (sayfa yapısı), **Orta** (kulüpten akademik takvim + planlar).

**22. Başvuru rehberi: "iyi başvuru nasıl yazılır"**
- (a) Fikir: Alt kurul veya hackathon başvurusunda ne aradığımızı yazan kısa sayfa.
- (b) Kaynak: best.eu.org ("How to write a ML").
- (c) Bizde: Alt kurul seçim kriterleri kulüpte sözlü olarak vardır, yazıya geçmemiştir.
- (d) Zorluk: **Orta**.

**23. Eğitim programını ürün gibi yayımlamak**
- (a) Fikir: Eğitimleri "Python101 · 4 hafta · 4 ders · başlangıç tarihi · ön koşul yok · katılım
  belgesi var" formatında listelemek; geçmiş eğitimleri de arşivde tutmak.
- (b) Kaynak: ituacm.com/courses (Türkiye'deki en iyi örnek), analytics-club.org/education,
  analytics-club.org/structure (8 haftalık akış, sertifika, açık kaynak teslim).
- (c) Bizde: `egitim.jpeg` (atölye fotoğrafı), Kurumsal İş İngilizcesi Eğitimi (75 kayıt,
  serinin en yükseği), Fusion 360 atölyesi, tarihsel "ücretsiz bilgisayar kursları" iddiası.
- (d) Zorluk: **Orta**.

**24. Programın adım adım akışını yayımlamak (hackathon/kamp için)**
- (a) Fikir: DataCamp veya algoRun için: açılış → veri tanıtımı → mentor eşleştirme →
  ara sunum → final → teslim (kod açık kaynak + sertifika). Katılımcı ne alacağını, sponsor
  nerede sahnede olacağını okuyarak anlar.
- (b) Kaynak: analytics-club.org/structure (Kickoff / Hack Days / Agile-Impact-Pitch Workshop /
  Final / Project Closing), 2026.hackjunction.com (saatli program + jüri metodolojisi).
- (c) Bizde: algoRun ve DataCamp formatları kulüpte bilinir; siteye hiç yazılmamış.
- (d) Zorluk: **Orta**.

## E. Özgün özellikler (bizim düşünmediklerimiz)

**25. Kampüs temsilcisi programı**
- (a) Fikir: Başka üniversitelerden öğrenciler COMPEC etkinliklerini kendi kampüsünde temsil
  eder; karşılığında erken kayıt, sertifika, mentorluk. Ayrı sayfa: ne yapar, ne kazanır,
  şartlar.
- (b) Kaynak: ecell.in/ca (teşvikler + şartlar + 30+ marka avantajı), shaastra.org (Campus
  Ambassador programına **ayrı sponsor** bulmuşlar: üç şirket).
- (c) Bizde: TechSummit ve Digitalized İstanbul dışından katılımcı çekebilecek ölçekte.
  Şu an böyle bir program yok.
- (d) Zorluk: **Zor** (program kurmak), ama sponsorluk envanterine yeni bir kalem açıyor.

**26. Sponsor destekli iş/staj panosu**
- (a) Fikir: "Sponsorlarımızın açık pozisyonları": şirket, pozisyon, aranan profil, başvuru
  linki. Öğrenciye somut fayda, sponsora somut karşılık.
- (b) Kaynak: analytics-club.org/careers, hackjunction.com/jobs, estiem.org/career-center,
  best.eu.org ("Job offers").
- (c) Bizde: 28 sponsor kaydı ve LinkedIn üzerinden ulaşılabilir kurumsal ilişkiler
  (`icerik/linkedin-bulgular.md`).
- (d) Zorluk: **Zor** (sürekli güncelleme gerekir; bayat ilan panosu zarar verir). Alternatif:
  "sponsorlarımızın kariyer sayfaları" diye statik link listesi, güncelleme yükü sıfır.

**27. Mezun ağı**
- (a) Fikir: "COMPEC'ten geçenler şimdi nerede": mezun adı, mezuniyet yılı, şu anki kurum.
  Gönüllü katılımla, izin alınarak.
- (b) Kaynak: estiem.org (alumni portalı + "Growing Together" mezun mentorluğu),
  entrepreneur-club.org ("Strong Alumni network" vaadi), cutec.io ("students and alumni across
  25+ countries").
- (c) Bizde: 1994'ten beri 32 yıl var; LinkedIn şirket sayfası (11467006) üzerinden eski YK
  üyeleri bulunabilir. `veri.md`de 24-25 ve 25-26 YK listeleri hazır: **geçmiş YK arşivi mezun
  ağının çekirdeği olabilir.**
- (d) Zorluk: **Zor** (KVKK gereği açık rıza şart), ama geçmiş YK listelerini yayımlamak
  (isim + görev + dönem) kolay ve zaten yapılmış.

**28. Şeffaflık: yıllık faaliyet raporu**
- (a) Fikir: Dönem sonunda tek PDF/sayfa: kaç etkinlik, kaç katılımcı, hangi sponsorlar, alt
  kurul faaliyetleri. Bütçe kalemleri kulüp isterse.
- (b) Kaynak: best.eu.org ("BEST Position Paper", yayınlar), estiem.org (kurumsal yapı
  sayfaları), techfest.org/aboutus/legals (hukuki şeffaflık).
- (c) Bizde: Kommunity kayıtları, sponsor listesi, alt kurul yapısı hazır; **bütçe verisi yok**.
- (d) Zorluk: **Zor**. Bütçe kısmı olmadan "faaliyet raporu" yapılabilir; bütçe için kulüp
  kararı gerekir. Türkiye'de hiçbir öğrenci kulübü bunu yapmıyor: **ayrışma noktası.**

**29. Dergi/yayın: "Computus"un dirilmesi**
- (a) Fikir: Kulübün tarihsel dergisini blog/dergi bölümü olarak diriltmek; veya QRG
  benzeri bir teknik yazı dizisi (Veri Bilimi & YZ birimi zaten var).
- (b) Kaynak: estiem.org (Magazine Shop), analytics-club.org (QRG Research Blog),
  cutec.io (Medium'da blog), shaastra.org (Shaastra Magazine ayrı sponsorlu yayın).
- (c) Bizde: Computus iddiası **[ŞÜPHELİ]** (`veri.md`, tek kaynak: ekşi 2003). Doğrulanırsa
  "1994'ten beri" anlatısını çok güçlendirir.
- (d) Zorluk: **Zor** (içerik üretimi süreklilik ister). Blogu Medium'a vermek (CUTEC kalıbı)
  bakım yükünü sıfırlar.

**30. Konuşma/podcast arşivi (YouTube'u siteye taşımak)**
- (a) Fikir: YouTube kanalındaki kayıtları site içinde aranabilir bir arşive dönüştürmek:
  başlık, konuşmacı, tarih, etkinlik serisi, süre.
- (b) Kaynak: cutec.io (CUTalks Archive menüde ana seviyede), nushackers.org (Archive + RSS).
- (c) Bizde: YouTube kanalı teyitli (`UCNo7VY-ZXDgIGF0n2qlH66A`). İçerik dökümü çıkarılmalı.
- (d) Zorluk: **Orta**. YouTube Data API ile liste otomatik çekilebilir.

**31. Yıllık tema**
- (a) Fikir: Her sezona bir tema adı ve o temaya göre görsel dil. Site iskeleti sabit, üst
  katman değişir.
- (b) Kaynak: shaastra.org ("Artifacts of Arcades", tüm site piksel font ve arcade intro'su),
  ecell.in/esummit ("Deciphering the Labyrinth", GTA temalı özel fontlar).
- (c) Bizde: TechSummit ve DataCamp'in geçmiş temaları varsa kulüpten alınır.
- (d) Zorluk: **Orta**. v4'ün mimarisi tema katmanına izin verecek şekilde kurulmalı
  (tek CSS değişkeni yaklaşımı zaten var: `--marka`).

**32. Sakin kulüp sitesi + gösterişli etkinlik microsite'ı ayrımı**
- (a) Fikir: compec.org kurumsal, sakin, arşiv odaklı; TechSummit/DataCamp kendi alt
  sayfasında (veya alt alan adında) sezonluk ve gösterişli. Kurumsal site her yıl
  yeniden yapılmaz.
- (b) Kaynak: ecell.in (Angular, sakin, Poppins) vs ecell.in/esummit (3D, GSAP, oyun fontları);
  hackjunction.com vs 2026.hackjunction.com; analytics-club.org vs datathon.ai.
- (c) Bizde: 9 etkinlik serisi var, hepsine site yapılamaz; ama TechSummit'e sezonluk bir üst
  katman yapılabilir. `go.compec.org` ve `bogazicigamejam.com` deneyimi var (ikincisi şu an
  ölü, uyarı).
- (d) Zorluk: **Orta**. Mimari karar, v4'ün başında alınmalı.

**33. Sosyal medya içerik üreticisi ortaklığı ("medya ortağı"nın yeni hali)**
- (a) Fikir: Teknoloji YouTuber'ı/Instagram içerik üreticisi ile takas: duyuru karşılığı
  görünürlük. Sponsor duvarında ayrı kategori.
- (b) Kaynak: techfest.org/aboutus/smp (isim isim influencer, üstelik geçmiş yıl ortakları
  ayrı satırda).
- (c) Bizde: `#compecrocks` hashtag'i ve Instagram hesabı var; böyle bir ortaklık geçmişi yok.
- (d) Zorluk: **Orta**. Kulübün PR alt kurulunun işi; sitede sadece kategori yeri açılır.

**34. Merch**
- (a) Fikir: Tişört/sticker. Kimlik nesnesi ve küçük gelir kalemi.
- (b) Kaynak: techfest.org/store, estiem.org (Merch), ESTIEM Magazine Shop.
- (d) Zorluk: **Zor** (üretim/lojistik kulübün işi). Sitede sadece bir sayfa yeri.

## F. Teknik ve hukuki

**35. Çerez rızası ve gömülü içerik kapısı (KVKK)**
- (a) Fikir: YouTube gömülerini varsayılan olarak yüklememek, yerine "Bu video YouTube'dan
  gelir ve pazarlama çerezleri kullanır. **İzin ver ve yükle**" düğmesi. Granüler çerez
  tercih paneli.
- (b) Kaynak: hackjunction.com (birebir bu kalıp + "Accept all / Reject all / Manage
  preferences" + hangi alan adlarını kapsadığı), techfest.org/aboutus/legals (GDPR metni).
- (c) Bizde: v2'de PostHog ve oylama parmak izi var, README'de KVKK uyarısı yazılı. Bu
  fikir o uyarının somut çözümü.
- (d) Zorluk: **Orta**. Teknik olarak kolay, metin için dikkat gerekir.

**36. Fizikî künye: adres, telefon, tüzel kimlik**
- (a) Fikir: Footer'da tam adres, kurum içi konum (oda/bina), varsa telefon. Sponsor için
  "gerçek bir kurum" sinyali.
- (b) Kaynak: cutec.io (sokak adresi + telefon), best.eu.org ("AISBL" tüzel kişilik),
  ecell.in ("Students Activity Centre, SAC" + oda tarifi), shaastra.org (IITM Students
  Activities Trust).
- (c) Bizde: "Boğaziçi Üniversitesi Güney Kampüs, Bebek, İstanbul" doğrulanmış; **oda/bina
  bilgisi yok**, kulüpten istenmeli.
- (d) Zorluk: **Kolay**.

**37. Tipografi ve renk yönü (v4 farklı olsun diye)**
- (a) Fikir: v1 koyu tek sayfa, v2 açık editoryal, v3 koyu mavi fotoğraf ağırlıklı yapıldıysa
  v4 için **teknik/terminal** yön düşünülebilir: monospace etiketler, `// bölüm` işaretleri,
  sürüm damgası, çok koyu nötr zemin (`#050508` gibi) + tek canlı vurgu, beyazın kademeli
  saydamlıkları ile hiyerarşi. Junction'ın kalıbı bu ve bir yazılım kulübüne fazlasıyla uygun.
  Alternatif yön: Shaastra'nın "yıllık tema" oyunbazlığı, ama o kurumsal ciddiyeti düşürür.
- (b) Kaynak: hackjunction.com (Titillium Web + Space Mono, `// FOR PARTNERS`, `JUNCTION·OS
  V2.0`, `#050508`), ituacm.com (Space Grotesk: yerelde şu an en modern tipografi),
  ecell.in (Bebas Neue + Poppins: klasik kurumsal), cutec.io (Red Hat Display 800 + Poppins).
- (c) Bizde: Marka rengi **BEKLEMEDE**; tek CSS değişkeni disiplini zaten var. Poppins mevcut
  sitede kullanılıyor ve E-Cell/CUTEC de Poppins kullanıyor: yani Poppins "güvenli ama
  ayırt edici değil". Space Grotesk'i İTÜ ACM kullandığı için ondan kaçınmak akıllı olur.
- (d) Zorluk: **Orta**. Marka kiti gelmeden nihai karar verilmemeli.

---

# YAPMAMALI

1. **Kendi alan adını ölü bırakmak.** `oxfordentrepreneurs.co.uk` şu an "This domain isn't
   connected to a site" diyor: Avrupa'nın en büyük girişimcilik topluluğu, sitesiz. Bizde
   `bogazicigamejam.com` şu an cevap vermiyor ve `veri.md` onu "var" diye listeliyor. Ya
   yenilenir ya listeden çıkarılır.
2. **Terk edilmiş siteyi ayakta tutmak.** `hackzurich.com` hem "hiatus" diyor hem de sayfasında
   eczane spam linkleri barındırıyor. Bakılmayan site, itibar zararına dönüşür. Bir sayfa
   kalacaksa tek ve temiz bir "arşiv/duyuru" sayfası kalsın.
3. **Rakamları birbiriyle çelişik yazmak.** Analytics Club ana sayfada "1000+ members",
   üyelik sayfasında "over 600 members" diyor. Junction ana sayfada 100.000 EUR ödül,
   partner sayfasında 20.000 EUR "prize pool" yazıyor. Tek bir rakam kaynağı olmalı
   (bizde: `veri.md`) ve her sayfa oradan beslenmeli.
4. **Kaynaksız büyük sayı atmak.** E-Cell'in "1000+ Cities / 60K+ Startups / 500K+ Students"
   üçlüsü hiçbir kaynağa dayanmıyor ve sayfanın en zayıf yeri. Aynı sitedeki "444K+ followers"
   ise doğrulanabilir. Doğrulanabilir olanı öne çıkar.
5. **Sponsor sayısı iddia edip sponsoru göstermemek.** İTÜ ACM "20+ Sponsors" yazıp tek isim
   vermiyor. Bu, iddiayı çürütür. Bizde 28 kayıt var: yıla göre isim listesi olarak yazılır
   (logo yoksa isim; gri "Sponsor Logo 1" kutusu asla).
6. **Kurumsal kopyala-yapıştır misyon-vizyon.** IEEE Bilkent'in iki uzun paragrafı IEEE'nin
   küresel metninin kopyası ve Bilkent'e dair hiçbir şey söylemiyor. COMPEC'in misyonu 1994'ten
   beri ne yaptığıyla anlatılmalı, soyut cümlelerle değil.
7. **Hazır tema reklamını footer'da bırakmak.** IEEE ODTÜ footer'ında "Built using WordPress and
   OnePage Express Theme" yazıyor. Küçük bir detay ama "burayla kimse ilgilenmiyor" mesajı verir.
8. **Ana menüyü başka alan adına yönlendirmek.** IEEE ODTÜ'de "HOME" linki blog.metu.edu.tr'ye
   gidiyor. Ziyaretçi siteden çıkıyor ve dönmüyor.
9. **Alt markaları ayrı alan adlarına dağıtmak.** ETH Entrepreneur Club'ın 5 alt markası 5 ayrı
   alan adında; her biri ayrı bakım, ayrı SSL, ayrı SEO, ayrı ölüm riski. COMPEC'in 9 serisi
   için `compec.org/techsummit` yolu doğru tercih.
10. **Dil karışıklığı.** İTÜ ACM ve IEEE ODTÜ'de menü İngilizce, içerik yarı Türkçe. Ya tek dil,
    ya düzgün bir dil anahtarı. Yarısı çevrilmiş site, ikisinden de kötüdür.
11. **Girişte oyun/intro engeli.** Shaastra'nın arcade intro'su ("SKIP INTRO") ve E-Cell Campus
    Ambassador'ın "TAP TO ENTER" kapısı: eğlenceli ama sponsor bilgiye ulaşmak isteyen ziyaretçi
    için engel, arama motoru için görünmez içerik. Kulüp sitesinde yapılmaz; olsa olsa tek bir
    etkinlik microsite'ında yapılır.
12. **"Coming Soon" sayfası bırakmak.** Techfest'in /aboutus/history sayfası "COMING SOON"
    diyor: 1998'den beri süren bir festivalin tarih sayfası boş. Boş bölüm açmak yerine bölümü
    hiç açmamak daha iyidir (`veri.md` kuralıyla aynı yönde).
13. **Yalnızca etkinlik yapıp hiç kalıcı içerik bırakmamak.** ETH Entrepreneur Club'da blog,
    rapor, arşiv, mezun ağı, iş panosu, proje vitrini yok: 30+ etkinlik/yıl yapıyor ama sitesi
    hafızasız. Bizim 32 yıllık avantajımızı harcamamanın yolu arşivdir.
14. **Sponsorluk sayfasında kademe tablosunu boş bırakmak.** "Altın sponsor / Gümüş sponsor"
    yazıp içine ne girdiğini yazmamak. Junction fiyat yazmıyor ama **her paketin kalemlerini**
    yazıyor: kaç mentor, kaç jüri, stant var mı, sahne süresi var mı, etkinlik sonrası ne
    raporlanıyor.
15. **RSVP'yi katılımcı diye sunmak.** (`veri.md` kuralı, burada da doğrulandı: incelediğim
    ciddi sitelerin hepsi ya kaynak belirtiyor ya "more than" gibi bir belirsizlik ibaresi
    koyuyor.)

---

# EN GÜÇLÜ 5 FİKİR (özet)

1. **"Kurumlar için" sayfası, Junction kalıbıyla**: 4 rakam, 6 somut "neden", 3 paket kalem
   kalem, vaka çalışması, isim isim iletişim, indirilebilir dosya + randevu linki. Türkiye'de
   hiçbir bilişim kulübünde yok, bizde besleyecek veri var (28 sponsor, 9 seri, 801/569 kayıt).
2. **Sponsor kademesi yerine sponsor rolü**: Veri Sponsoru, Challenge Sponsoru, Mekân Ortağı,
   Eğitim Ortağı, Medya Ortağı, İkram Ortağı. Techfest/Shaastra 20-50 rol kullanıyor; nakit
   dışı desteği meşrulaştırıyor ve envanteri büyütüyor.
3. **1994'ten bugüne yıl yıl tarih sayfası + etkinlik baskı zincirleri**: E-Cell'in 1998-2023
   çizelgesi ve Junction'ın 10 yıllık arşivi kalıbında. Zaman derinliği bizim en büyük, en
   kullanılmamış varlığımız ve yerel rakiplerin hiçbirinde yok.
4. **Proje/çıktı arşivi (Hack4Good kalıbı)**: algoRun, Game Jam, DataCamp çıktıları; proje adı,
   özet, **öğrenci adları**, varsa kod linki. Hem katılımcıyı hem sponsoru ikna eden tek sayfa.
   Veri toplama gerektiriyor ama tek yılla başlanabilir.
5. **Kanıt katmanı: "Basında biz" + kurumsal onay + kaynaklı rakam**: Hürriyet'in 2019 algoRun
   haberi elimizde (100'den fazla katılımcı, üçüncü taraf beyanı); Boğaziçi'nden tek paragraflık
   destek metni alınırsa "öğrenci kulübü" algısı "üniversite bünyesinde 32 yıllık kurum"a döner.
   Her rakamın yanında küçük punto kaynak etiketi (E-Cell'in "as designated by Thomson Reuters"
   kalıbı) `veri.md` disiplinini tasarım öğesine çevirir.
