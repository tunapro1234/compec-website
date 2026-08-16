# Kuzey Amerika kıyaslaması: öğrenci teknoloji kulübü ve hackathon siteleri

compec-site, 2026-07-25. Yöntem: 9 sitenin tamamı Playwright ile (headless Chromium, 1440x900,
tam sayfa kaydırma + ağ ölçümü) gezildi; ayrıca 11 alt sayfa/alt alan adı ayrı ayrı tarandı.
Font adları, renkler ve sayfa ağırlıkları **computed style ve gerçek ağ trafiğinden** alındı,
göz kararı değil. Erişilemeyen site yok: 9/9 açıldı.

Bu dosya **site tarafına** bakıyor. Ticari model / fiyat merdiveni tarafı zaten
`compec-memory/kiyaslama/dunya/` içinde işlenmiş; burada onunla çakışan yerlerde atıf verdim.

> ⚠️ En önemli tek bulgu en başta: **bu dokuz sitenin sekizinde sponsorluk kademe tablosu,
> fiyat ve indirilebilir sponsorluk dosyası YOK.** Hepsi tek bir e-posta adresine düşüyor.
> Ayrıntı: [Bölüm 11](#11-çapraz-bulgu-sponsor-sayfası-diye-bir-şey-yok).

---

## 1. hackthenorth.com (Hack the North, Waterloo)

**Künye.** 18-20 Eylül 2026, 13. yıl, 1.000+ katılımcı. React (CRA benzeri, `/static/media/`),
tek sayfa + hash navigasyon (`/#about`, `/#projects`, `/#jobOpportunities`, `/#sponsors`, `/#faq`)
+ iki gerçek alt sayfa (`/code-of-conduct`, `/travel-guidelines`) + ayrı bir alt alan adı
(`museum.hackthenorth.com`). Sayfa yüksekliği 24.149 px. **Ağırlık: 21,5 MB, 285 görsel.**

**Tipografi:** Castledown (başlık, weight 900) + Satoshi (gövde). İkisi de lisanslı,
self-hosted `@font-face`.
**Palet:** krem zemin `#FCFCFC`, gövde metni kahve `#8E420B`, koyu kahve `#5F2C07` ve `#2F1604`,
turuncu `#ED6E12` / `#BD580F`, krem sarı `#FDF7CE`, nane `#A7FBE9`, camgöbeği `#00A0CC`,
kırmızı `#D42B2B`.

**Öne çıkan 3 şey**

1. **Museum of Hack the North** (`museum.hackthenorth.com`): "12 yıldan 161 seçme proje"
   diye kendini tanımlayan ayrı bir arşiv sitesi. Görsel dil birebir müze: tavandan sarkan
   bir lamba, ışığın altında duvara asılı **çerçeveli proje ekran görüntüleri**, sol altta
   **ses aç/kapa düğmesi** (ortam sesi var). İçeride 2014'ten 2025'e yıl yıl "Finalists"
   başlıkları, her projede ad + 1-2 cümle açıklama + proje linki. Bu, tarama boyunca
   gördüğüm **en güçlü tek fikir**.
2. **Live Job Opportunities:** sponsorların açık pozisyonları, **son başvuru tarihiyle**
   ("Due 09/17", "Due 12/31") canlı bir liste olarak ana sayfada. Sponsorluğun katılımcıya
   dönen somut faydası site üzerinde görünür hale gelmiş.
3. **Sponsor sunumu logo duvarı değil, editoryal:** her sponsor için tam paragraf tanıtım
   metni + "Open Roles →" / "Careers Page →" linki. Bazıları katılımcıya doğrudan sesleniyor
   (Cursor: "bu hafta sonu her hacker'a 50 $ Cursor kredisi"). Ayrıca ekipten imzalı bir
   mektup ("Hey Hackers! ... this wonderful website'ta sürprizler sakladık, İmza: Team Hack
   the North 💚").

**Katılımcı tarafı:** başvuru + gönüllü başvurusu ayrı, "Applications close July 27 @ 11:59 PM ET"
şeklinde sayfanın en üstünde tarih baskısı, 11 soruluk SSS, ayrı Code of Conduct ve
**Travel Guidelines** sayfası, "yol/yemek/konaklama bizden" vaadi açıkça yazılı.

**Animasyon yaklaşımı:** hero tek bir illüstrasyon değil, **~285 ayrı webp katmanı**
(bulut, dağ, yaprak, çiçek, piknik masası, vinil, polaroid...) ile kurulmuş kağıt kesme
diorama; kaydırınca paralaks. Sonuç muhteşem, maliyeti 21,5 MB.

---

## 2. hackclub.com (Hack Club)

**Künye.** Kâr amaçsız (501(c)(3), EIN sitede yazılı), 2014'te 16 yaşındaki Zach Latta
kurmuş, 1.400+ lisede, yılda 100.000 genç. Ağırlık 8,2 MB, 78 görsel, 18 script.

**Tipografi:** Phantom Sans (marka fontu, gövde) + Zarathustra (serif başlık, 90 px, weight 400)
+ Cormorant + Geologica.
**Palet (kendi marka sayfasından, birebir):** Hack Club Red `#EC3750` (kahraman renk),
Orange `#FF8C37`, Yellow `#F1C40F`, Green `#33D6A6`, Cyan `#5BC0DE`, Blue `#338EDA`,
Purple `#A633D6`, Muted `#8492A6`. Yüzeyler: `--surface #F9FAFC`, `--surface-hover #F1F2F5`,
`--ink #17171D`, `--nav-bg #FFFFFFD1` (yarı saydam yapışkan menü), `--footer-bg #000`.

**Bilgi mimarisi.** Menü sade: About (Programs / Clubs / Hackathons) + Resources (Donate /
Join the community). Ağırlık **footer'da**: Philosophy, Team & Board, Jobs, Branding, Press,
Donate, Imprint, Programs, Community Events, Hackathons, Toolbox, Clubs, HCB, Code of Conduct,
Safeguarding Policy, Privacy & Terms.

Ana sayfa sırası: hero ("Where teens make cool stuff") → **proje vitrini** (5 gerçek öğrenci
projesi: ad, yapanın adı, yaşı, ülkesi, "Try it out" + GitHub kaynak linki) → aktif programlar
→ geçmiş etkinlik videoları → topluluk videosu → **bağışçılar** → 4 üyelik faydası → katıl.

**Öne çıkan 3 şey**

1. **/brand ve /press: ayrı, eksiksiz, indirilebilir kimlik altyapısı.** Marka sayfasında her
   logo SVG + PNG + PDF olarak, ham asset URL'si ekranda yazılı (`assets.hackclub.com/...`),
   "Download all logos", **kopyala-yapıştır HTML banner snippet'leri**, React bileşeni,
   sekiz rengin hex'i, webfont CSS'i (tıkla-açıl + Copy düğmesi), `@hackclub/icons` ikon seti,
   hazır CSS teması ve GitHub starter'ı. Press Kit ayrı: "Download press kit", **hızlı olgular**
   (2014 kuruluş / 1.400+ lise / yılda 100.000 genç), **basına hazır etkinlik fotoğrafları**
   (her birinin altyazısı yazılı, "Download all photos"), isimli basın irtibatı ve e-postası.
2. **Şeffaflık gerçekten şeffaf.** `/philanthropy` sayfasında bağışçılar **dolar bandına göre**
   listeli: `$5M-$10M`, `$1M-$5M`, `$500k-$1M`, `$200k-$500k`, `$100k-$200k`, ve isimlerin
   yanında "(9x)", "(6x)" gibi **2018'den bu yana kaç kez bağış yaptığı**. Altında ürün bağışı
   yapan şirketler, etki hikâyeleri (isim, yaş, ülke), yönetim kurulu, ve **Financials**:
   IRS Form 990 (2020-2024) + yıllık raporlar (2022-2024), "2025 formu hazır olunca paylaşılacak"
   notuyla. Ayrıca `hcb.hackclub.com/hq` üzerinden harcamalar kalem kalem kamuya açık.
3. **magazine.hackclub.com: yıllık PDF dergi.** "2025 Hack Club showcase, 150+ proje,
   **her genç kendi sayfasını tasarlamış**". Üç dergi (magazine 109 MB, juice 59 MB,
   highway 43 MB), "get a copy" (fiziksel) + "see the pdf" seçenekleri, "v1'e git" ile önceki
   sürüm. Sayaçlar: dergideki proje / yapılan proje / harcanan saat / ülke.

**Diğer özgün detaylar:** footer'da **canlı git commit hash'i** ("Commit 39c8e2, open source at
hackclub/site") yani site kendi kaynağına ve o anki sürümüne işaret ediyor. Sağ altta
"System mode" tema anahtarı. Ücretsiz toll-free telefon numarası ("1-855-625-HACK").
`hackathons.hackclub.com`: **891 lise hackathonunu** 30 eyalet + 26 ülkede listeleyen,
Online/Hybrid/In-Person filtreli, "Add Your Event" ile dışarıdan katkı alan bir dizin.

---

## 3. hackmit.org (HackMIT)

**Künye.** 19-20 Eylül 2026. Tek sayfa, gerçek alt sayfa yok; arşiv ayrı alan adında
(`archive.hackmit.org`). **Ağırlık: 40,8 MB, 230 görsel** (taramanın en ağır sitesi).

**Tipografi:** ambicase-modern (başlık, 104 px) + garamond-atf-micro (gövde serif). İkisi de
Adobe Fonts. Nadir görülen bir tercih: gövde metni tamamen serif.
**Palet:** lacivert `#323E8F`, koyu lacivert `#101735`, krem `#FDF7EC`, altın `#F3DA8E`,
şeftali `#FCBC72` / `#F7A174`, mercan `#EA616F`, camgöbeği `#6BC6DC`, mavi `#27629F`.

**Öne çıkan 3 şey**

1. **Tema tam taahhütlü illüstrasyon.** Bütün sayfa elle çizilmiş, Alice-in-Wonderland/karnaval
   dünyası: kıvrılan şeritler, iskambil kâğıtları, parşömen üzerinde "Apply", menü bir **kurdele**
   üzerinde yazılı, geri sayım bir **köstek saatinin içinde** ("UNTIL 56 DAYS HACKMIT").
   Hiçbir yerde stok görsel veya jenerik gradient yok.
2. **Admissions Puzzle.** SSS'den: "Bu yıl da yıllık Admissions Puzzle'da **ilk 50'ye girene
   otomatik kabul** veriyoruz. Yeterince ararsan başlangıç anahtarını bulacaksın." Yani sitenin
   içine gömülü bir bulmaca, hem oyunlaştırma hem seçme mekanizması, hem de bir easter egg türü.
3. **Rakam duvarı en tepede, dört sayı + bir geri sayım:** `100k+ in prizes`, `1000+ STUDENTS`,
   `200+ SCHOOLS`, `24 HOURS`, `56 days`. Sayfa kendini tanıtmaya değil ölçeğini kanıtlamaya
   başlıyor.

**Katılımcı tarafı çok güçlü.** SSS dört kategoriye ayrılmış: General / Tracks / Registration /
In-Person Logistics. İçinde bizde hiç düşünülmemiş sorular var: "Artık uygun değilim, jüri veya
mentor olabilir miyim?" (mentor/jüri başvuru linki ayrı), "**Hacker ağırlamak istersem?**"
(şehir dışından gelen katılımcıyı evinde ağırlayan MIT öğrencisine otomatik kabul garantisi),
"Hackweek" (etkinlikten önceki hafta **canlı yayınlanan** teknik konuşma/atölye serisi, geçmişleri
YouTube kanalında), Discord sunucusu, ödünç verilen donanım, bölgesel üst sınıra kadar yol
masrafı iadesi ve "proje teslim etmezsen iade alamazsın" kuralı.

**archive.hackmit.org:** tek işi olan minik bir sayfa (211 KB). 2014'ten 2025'e her yılın
**kendi sitesi olduğu gibi dondurulmuş**, üstte yıl sekmeleri, "A look into the past".

---

## 4. treehacks.com (Stanford TreeHacks)

**Künye.** 13-15 Şubat 2026, 12. yıl. Tek sayfa (`#about`, `#tracks`, `#speakers`, `#sponsors`,
`#faqs`) + üstte `2025` linkiyle geçen yılın sitesi (`2025.treehacks.com`).
Ağırlık 2,7 MB (bu setin en hafif ciddi tasarımlı sitesi), 10 font dosyası.

**Tipografi:** Bruno Ace hem başlıkta hem gövdede (72 px başlık) + Geist Mono + Gaegu (el yazısı)
+ Otomanopee One. Dört ayrı ailenin aynı sayfada olması cesur, sınırda.
**Palet:** neredeyse siyah zemin `#0A0A0A` (Tailwind neutral-950), üstüne derin lacivert
`#0D1040` ve `#373FA8`, açık periwinkle `#8B9FFF`, logo yeşili `#3F7E48`.

**Öne çıkan 3 şey**

1. **Beş rakamlı seçicilik/ölçek şeridi:** `36 HOURS`, `30 UNIVERSITIES`, `1000+ HACKERS`,
   `$150K+ PRIZES`, `12 COUNTRIES`. Ölçüyü ülke ve üniversite çeşitliliğiyle veriyor,
   sadece kişi sayısıyla değil.
2. **Sekiz "track" (tema kulvarı)** ana sayfada birinci sınıf içerik: healthcare, sustainability,
   edge AI, education, human flourishing, cloud AI, AI, inference. Her biri ayrı başlık
   ve kart. Katılımcı ne yapacağını sitede görüyor.
3. **Konuşmacı sunumu az ama derin:** iki keynote (Sam Altman, Garry Tan), her biri için
   unvan + gerçek bir paragraf biyografi. Otuz logo yerine iki isim, ve o iki isim taşıyor.
   Aynı mantık sponsorda da var: NVIDIA'ya tam paragraf ("GPU'yu icat etti, CUDA...").

**Zayıf yeri:** SSS'de yedi soru var ama içerikleri açılır panelde ve sayfa dışına
çıkarılmamış; program akışı, ödül dağılımı, yol/konaklama detayı sitede yok. TreeHacks
"her şeyi karşılıyoruz" diyor ama nasıl olduğunu anlatmıyor.

---

## 5. calhacks.io (Cal Hacks, UC Berkeley)

**Künye.** Cal Hacks 12.0, 24-26 Ekim 2025, Palace of Fine Arts (San Francisco). 12. yıl.
Ağırlık 3,9 MB. `apply.calhacks.io` ayrı başvuru alan adı. Footer'da
"The Cal Hacks Foundation (a registered 501c3 nonprofit)".

**Tipografi:** sfPro (gövde) + **ivyPresto** (serif başlık). Zemin beyaz, metin siyah,
tek bir güçlü vurgu rengi: **`#3933DF`** (elektrik moru-mavi). Bütün site bu tek renkle
kuruluyor. Bu setteki en disiplinli palet.

**Öne çıkan 3 şey**

1. **"Our Story: Twelve Years of Hacking":** yatay kaydırmalı bir tarihçe şeridi (2014, 2015,
   2016 ... 2023, 2024) ve şeridin içine serpiştirilmiş **katılımcı alıntıları**:
   *"Cal Hacks was the first time I ever shipped something end-to-end."* / *"There was so much
   Red Bull!!!"* Kuru bir zaman çizelgesi değil, insan sesli bir tarihçe.
2. **"Hack Month": etkinlikten önceki bir aya yayılan 9 ayrı ön etkinlik**, hepsi tarih + saat +
   salon + RSVP linkiyle numaralanmış (01/ Intro to Hackathons, 02/ URM Hack Night,
   03/ Pre-Hackathon Social, 04/ Anthropic Workshop, 06/ AppLovin Workshop, 08/ Crash Course
   in Figma Make ...). Ana etkinlik tek bir gün değil, bir sezon haline getirilmiş; sponsor
   atölyeleri de bu takvimin içine yerleştirilmiş.
3. **Ekip bölümü rol filtreli:** 30+ organizatör, her biri ad + rol ("logistics lead",
   "sponsorship director", "cubstart lead"), altta rol etiketleriyle filtre
   (exec / cubstart / design / finance / hei / logistics / marketing / sponsorship / tech).
   Sponsorluk direktörlerinin **LinkedIn profilleri doğrudan linkli**, yani şirket kiminle
   konuşacağını biliyor.

**Rakamlar:** `48 hours`, `$200,000 in prizes`, `400+ projects`, `2,000+ hackers`.
**Mekân bölümü ayrı:** adres, açık adres satırı ve "Get directions" linki.

---

## 6. nwhacks.io (nwHacks, UBC / nwPlus)

**Künye.** 16-17 Ocak 2027, 12. baskı, UBC Life Sciences Institute. **Next.js + React**
(taramada tespit edilen tek modern framework'lü etkinlik sitesi). 13,4 MB, 139 görsel.
Her yıl arşivlenmiş alt alan adı: `2026.nwhacks.io`, `2025.nwhacks.io`.

**Tipografi:** Space Grotesk (gövde) + HK Grotesk + **LT Museum**.
**Palet:** mor-mauve'dan pudra pembeye dikey gradient hero, üstüne çok renkli izometrik
"uçan ada şehir" illüstrasyonu; vurgu turkuaz `#01DACC`.

**Öne çıkan 3 şey**

1. **Menü doğrudan kanıt sıralaması:** About / **Recap** / **Testimonials** / **Past Projects** /
   FAQ / Sponsors / Contact us / 2026. Yedi menü öğesinin üçü geçmişe ait. "Recap" bölümü
   "Last year we had... Hackers / Projects / Mentors" diye animasyonlu sayaçlarla açılıyor.
2. **Baloncuk arayüzü:** hem Testimonials hem Past Projects, ekrana serpilmiş tıklanabilir
   baloncuklar olarak sunulmuş. Referanslar **rol etiketli**: Diego D. (Hacker), Jason F.
   (Mentor), **Eli M. (Sponsor)**. Sponsorun ağzından referans, bu setteki tek örnek.
   Projeler: "nwHacks arşivinden bazı harika projelerde bir tur atın, öğrenmek için bir
   baloncuk seçin."
3. **Üç ayrı başvuru yolu tek yerde:** "Apply to be a: Hacker / Mentor-Judge / Volunteer"
   (2026 sürümünde) + "Become a Sponsor". Ayrıca etkinlik sırasında kullanılan **"Live Portal"**
   (portal.nwplus.io) menünün en başında duruyor: site sadece tanıtım değil, etkinlik yazılımına
   kapı.

**Diğer:** SSS üç sekmeye ayrılmış (General / Teams & Projects / Logistics). Footer'da
**yerli halklara toprak beyanı** (Musqueam ve Tsleil-Waututh toprakları, kaynak linkiyle).
Sağ üstte MLH "OFFICIAL 2027 SEASON" rozeti. "Meet the minds behind nwHacks" ekip bölümü.
Başvurular kapanmadan önceki sürümde gün/saat/dakika **geri sayım** vardı.

---

## 7. mlh.io (Major League Hacking) ve sponsor.mlh.io

**Künye.** Ticari kuruluş ("Major League Hacking PBC Inc"), DEV.to ile aynı çatı altında.
`mlh.io` → `mlh.com` yönleniyor; kurumsal taraf tamamen ayrı bir alan adında: **`sponsor.mlh.io`**.
Ana sayfa 2,4 MB ama **72 script** (bu setin en ağır izleme/analitik yükü).

**Tipografi:** Roboto Mono hem başlıkta (72 px, weight 700, letter-spacing -1.44px) hem gövdede.
Baştan sona monospace, "geliştirici" kimliğinin en doğrudan tipografik ifadesi. Sponsor sitesi
ise Open Sans, yani **B2B tarafı bilinçli olarak daha nötr**.
**Palet:** `#F5F5F5` zemin, MLH sarısı `#F8B92A` / `#EBC62C`, kurumsal mavi `#1D539F` / `#4787E2`,
metin `#242425`.

**Öne çıkan 3 şey (bunlar sponsor sayfası dersleri)**

1. **Başlık şirketin diliyle, kulübün diliyle değil:** "Get in Front of Developers at Scale".
   Ardından üç rakam: **`1 in 3` ABD'deki CS mezunu**, **`150,000` geliştirici**,
   **`1,500` etkinlik** (yıllık). Ana sayfada ayrıca "5M+ developers" (DEV ile birlikte).
2. **Altı faydanın her biri ayrı kutu, hepsi şirketin kazancı üzerinden yazılı:** Reach
   Thousands of Developers / Drive Product Adoption / **Access Developer Feedback** /
   Leverage our DevRel Expertise / Accelerate Business Impact / Build an Innovative Reputation.
   Hiçbiri "logonuz şurada görünür" demiyor.
3. **Vaka çalışması, sayılarla:** "2023 sezonunda MLH Twilio'yu **170 etkinlikte** tanıttı,
   sezon sonunda Twilio **585 proje teslimi** aldı, **2.000+ geliştirici** Twilio ürünlerini
   projelerinde kullandı, ortaklık sonunda Twilio küresel olarak **200 binden fazla
   geliştiriciye** ulaştı." Tek bir paragraf, dört sayı, "Read More →".

**Yine de:** fiyat yok, kademe yok, PDF yok. Tek eylem çağrısı bir Qualtrics formu ("Get in Touch").
Ayrıca MLH'in kulüplere sattığı şey de sitede duruyor: `mlh.com/events/prizes` (ödül/bedava
ürün havuzu), `mlh.com/brand-guidelines`, `mlh.com/code-of-conduct` (bütün ağın ortak
kullandığı belge, nwHacks ve HackIllinois kendi CoC'si yerine buna link veriyor),
`blog.mlh.com`, ve organizatörlere yönelik yazılar ("4 Ways to Cut Down Your Hackathon Budget").

---

## 8. pennapps.com (PennApps, UPenn)

**Künye.** PennApps XXVI, 19-21 Eylül 2025 (yani **bu sayfa 10 aydır güncellenmemiş**).
1909'dan değil, 2009 sonbaharından beri: "ülkenin ilk öğrenci yürütülen üniversite hackathonu".
Ağırlık 1,5 MB, sadece 4 görsel.

**Tipografi:** **hiç özel font yok**, `ui-sans-serif, system-ui, ...` yani tarayıcı varsayılanı.
**Palet:** Tailwind varsayılanları (slate `#0F172A`, `#475569`, `#1E293B`, pembe-mor gradient
başlık, yeşil `#4ADE80`). Bu setteki tek gerçek "hazır tema" hissi veren site.

**Öne çıkan 3 şey**

1. **Tek metafor bütün siteyi taşıyor: havalimanı.** "PennApps International", `FLIGHT PA XXVI`,
   `DESTINATION INNOVATION`, `STATUS BOARDING`, `GATE A1`. Bölümlerin adları kapı numarası
   ("GATE 15 Schedule", "GATE 17 Location", "GATE 26 Food", "GATE 42 Housing"), SSS bir
   **kalkış panosu** (GATE / QUESTION / STATUS / ACTION sütunları, her satır `INFO-0`...`INFO-12`
   ve `READY` durumu), ekranda **canlı saat** (`9:52:32 AM EST`), ve gerçek bir
   **boarding pass** kartı (Passenger: You! / Flight: PA 2025 / Seat: 25A / Gate: XXVI,
   üzerinde "Scan to Apply" QR alanı). Metafor, fikir olarak bu setin en zeki işi;
   uygulaması ise tipografi ve renk yokluğundan dolayı fikri taşıyamıyor.
2. **"Doodle" anahtarı:** sağ üstte bir toggle, sağ altta fırça düğmesi. Sayfanın üstüne
   çizim yapmayı açıyor. Easter egg olarak değil, **görünür bir oyuncak** olarak konmuş.
3. **Lojistik dürüst ve insani yazılmış.** "Housing: Sleep? What's that? jkjk",
   "uyku tulumu, banyo malzemesi ve yedek kıyafet getirmeniz önerilir",
   "**barınma bir sorun oluşturuyorsa bize yazın**". Yemek: "Philly'nin çeşitli yemek
   sahnesinden" (yer bilgisiyle övünüyor).

**Kötü örnek olarak da değerli:** geri sayım `00 / 00 / 00 / 00` gösteriyor (etkinlik geçmiş),
"Track details coming soon!" hâlâ orada, "Detailed hour by hour schedule will be released closer
to the event" hâlâ orada. Yani sitede **üç ayrı yerde tamamlanmamış vaat** duruyor.
Ayrıntı: [Bölüm 12](#12-yapmamalı).

---

## 9. hackillinois.org (HackIllinois, UIUC)

**Künye.** Tek etkinlik sitesi (`www.hackillinois.org`) ile **kurumsal site
(`info.hackillinois.org`) ayrılmış**. Ana sayfa şaşırtıcı biçimde hafif: **52 KB**.
Kaynak kod açık: `github.com/HackIllinois/`.

**Tipografi:** sadece **Montserrat** (Google Fonts), tek aile, tek font. Bu setteki en
minimal tipografik karar.
**Palet:** turkuaz `#68C8BF` / `#168277` / `#B4E4DF`, turuncu `#FBA036` / `#F99F48`,
krem `#FCE891`, metin `#3E3E3E`.

**Öne çıkan 3 şey**

1. **İki alan adına bölünmüş bilgi mimarisi.** `info.hackillinois.org` menüsü:
   About / FAQ / **Team** / **History** / **Stories**. Etkinlik sitesi her yıl sıfırlanırken
   kurumun hafızası ayrı ve kalıcı bir yerde duruyor. v4'ün "kayıt sitesi" tezine en yakın
   yapısal örnek bu.
2. **/history sayfası:** kuruluş anlatısı sayılarla ("Ekim 2013'te kuruldu, ilk yıl **50
   öğrencilik bir ekip** lojistik/finans/tanıtım/teknoloji için toplandı, **21 okuldan 750
   öğrenci** ilk etkinliğe geldi"), altında **"Previous Sponsors"** logo bölümü, altında
   **"Previous Years" 2017'den 2026'ya yıl sekmeleri**. Yani geçmiş sponsorlar utanılacak
   değil, sergilenecek bir varlık olarak konumlanmış.
3. **/stories: organizatör tanıklıkları.** "HackIllinois ekibinin bir parçası olmak nasıl bir
   şey?" Yedi kişinin uzun uzun, isim + rol + dönem imzalı yazısı ("- Nancy Zhang, Co-Director
   2024-25", "- Alex Yang, Systems 2024-25"). Katılımcı değil **organizatör** deneyimi anlatılıyor:
   bu bir **üye kazanma** aracı, katılımcı kazanma aracı değil. Setteki tek örnek.

**Diğer:** ekipler beş birime ayrılmış (Experience / Outreach / Systems / Design / Marketing),
newsletter aboneliği ayrı bir bölüm, CoC olarak MLH'in GitHub'daki ortak belgesine link.

---

## 10. Teknik karşılaştırma tablosu

| Site | Ağırlık | Görsel | Yükseklik | Framework | Başlık fontu | Gövde fontu |
|---|---|---|---|---|---|---|
| hackmit.org | **40,8 MB** | 230 | 13.956 px | (vanilla) | ambicase-modern | garamond-atf-micro |
| hackthenorth.com | **21,5 MB** | 285 | 24.149 px | React (CRA) | Castledown 900 | Satoshi |
| nwhacks.io | 13,4 MB | 139 | 11.260 px | **Next.js** | LT Museum | Space Grotesk |
| hackclub.com | 8,2 MB | 78 | 8.639 px | (vanilla+) | Zarathustra (serif) | Phantom Sans |
| calhacks.io | 3,9 MB | 24 | 10.748 px | (vanilla) | ivyPresto (serif) | sfPro |
| treehacks.com | 2,7 MB | 39 | 8.381 px | (vanilla) | Bruno Ace | Bruno Ace |
| mlh.com | 2,4 MB | 26 | 8.384 px | Tailwind | Roboto Mono | Roboto Mono |
| pennapps.com | 1,5 MB | 4 | 5.249 px | Tailwind | system-ui | system-ui |
| hackillinois.org | **52 KB** | 12 | 2.598 px | (vanilla) | Montserrat | Montserrat |

Okunuşu: **ağırlık ile kalite arasında ilişki yok.** 52 KB'lık HackIllinois ile 40 MB'lık
HackMIT aynı ligde iş yapıyor, ikisi farklı stratejiyle. Ama 21-40 MB'lık siteler bunu
**tek bir sanat yönü kararı** için harcıyor (elle çizilmiş katmanlı illüstrasyon), hazır stok
görsel veya video için değil. Bizim 3 sürümde de öyle bir varlığımız yok, dolayısıyla o
bütçeyi harcamamız için sebep de yok.

**Ortak teknik kalıplar**
- **Yıl bazlı alt alan adı arşivi neredeyse standart:** `2025.hackthenorth.com`,
  `2025.treehacks.com`, `2026.nwhacks.io`, `archive.hackmit.org/2014...2025`. Menünün sağ ucunda
  sadece yıl yazan bir link duruyor. Kimse eski siteyi silmiyor.
- **Başvuru her zaman ayrı alan adı/ürün:** `apply.calhacks.io`, `apply.pennapps.com`,
  `fellowship.mlh.io/apply`, HackMIT'te "Plume". Site başvuruyu kendi içinde çözmüyor.
- Sponsor logoları hiçbir yerde gri kutu değil; ya gerçek logo ya hiç.
- MLH üyesi olanlar sağ üst köşede resmî sezon rozetini taşıyor (nwHacks, PennApps).

---

## 11. Çapraz bulgu: "sponsor sayfası" diye bir şey yok

Bunu ayrı başlık yapıyorum çünkü beklentinin tersi çıktı ve v4 kararını doğrudan etkiliyor.

| Site | Ayrı sponsor sayfası | Kademe tablosu | Fiyat | PDF dosya | Medya kiti | İletişim yolu |
|---|---|---|---|---|---|---|
| hackthenorth | yok (`/#sponsors`) | yok | yok | yok | yok | `sponsor@hackthenorth.com` |
| hackmit | yok (`#sponsors`) | yok | yok | yok | yok | `sponsor@hackmit.org` |
| treehacks | yok (`/sponsor` → 404) | yok | yok | yok | yok | yok (sadece bölüm) |
| calhacks | yok (`/sponsor` → 404) | yok | yok | yok | yok | sponsorluk direktörlerinin LinkedIn'i |
| nwhacks | yok (`/#sponsors`) | yok | yok | yok | yok | `sponsorship@nwplus.io` (mailto konu satırı hazır) |
| pennapps | `/sponsor` var ama **952 bayt** (boş yönlendirme) | yok | yok | yok | yok | `contact@pennapps.com` |
| hackillinois | yok | yok | yok | yok | yok | `contact@hackillinois.org` |
| hackclub | `/philanthropy` (bağış, sponsorluk değil) | **bağış bandı var** | bant var | 990 + yıllık rapor | **/brand + /press** | isimli kişi + e-posta |
| mlh | **`sponsor.mlh.io`** | yok | yok | yok | `/brand-guidelines` | Qualtrics formu |

**Çıkarım.** Kuzey Amerika'nın en iyi hackathonları sponsorluğu **siteden satmıyor**; site
sponsora bakan yüzüyle sadece iki iş yapıyor: (a) mevcut sponsorları ikna edici biçimde
sergilemek, (b) tek bir doğru e-posta adresine yönlendirmek. Satış işi sitede değil, insanda.

Bunun iki okuması var ve ikisi de doğru:
1. **Fiyatı sitede vermemek onların lüksü.** Talep zaten arzdan fazla, isim kendini satıyor.
   COMPEC'in böyle bir lüksü yok; `dunya/taktikler.md` ve `v4-site-onerisi.md` haklı olarak
   açık fiyat merdivenini öneriyor (kaynağı da **PennApps'in 2015 sponsor PDF'i**, yani
   PennApps bunu bir zamanlar yapıyordu ve bugünkü sitesinde bırakmış).
2. **Ama boşluk sadece fiyatta değil, kanıtta.** Hiçbiri "geçen sene ne oldu" raporu
   yayımlamıyor. MLH'in bir vaka çalışması var, o kadar. Yani **sponsora kanıt sunan bir sayfa
   yapmak, bu ligde bile ayırt edici olur.** COMPEC'in yapması gereken şey onları kopyalamak
   değil, onların atladığı yeri doldurmak.

---

## 12. COMPEC'e uyarlanabilir fikirler

Her madde: **(a) fikir · (b) kaynak · (c) bizde hangi veriyle beslenir · (d) zorluk.**
Sıralama etkiye göre, ilk 5 en güçlüsü.

### 1. Proje/kazanan müzesi: BBÖ arşivini "gezilebilir koleksiyon" yap
- **(a)** Ayrı bir bölüm veya alt alan adı, kendini bir koleksiyon olarak tanıtsın:
  "13 törenden 250 kayıt, 2013'ten 2025'e." Üstte yıl sekmeleri, her yıl kategori kategori
  kazananlar, her kayıtta o yılın jürisi ve tören sponsoru. HTN'in yaptığı şey tam olarak bu:
  "12 yıldan 161 seçme proje", yıl yıl "Finalists", her kayıtta ad + iki cümle + link.
- **(b)** `museum.hackthenorth.com` (birincil), `archive.hackmit.org` (yıl sekmeleri kalıbı),
  `nwhacks.io` Past Projects.
- **(c)** `kaynaklar/bulgular-bilisim-odulleri.md`: 2013-2025, 13 törenin tam kazanan listesi,
  345 tablo satırı, 2019 ve 2020 jüri üyeleri (2020'de 23 isim), tören sponsorları
  (LC Waikiki 2019-21, Garanti 2018, PeP 2022), mekân/oy/katılım bilgileri.
- **(d)** **Orta.** Veri hazır, iş kırılım + arayüz. Görsel yok, o yüzden HTN'in
  "çerçeveli ekran görüntüsü duvarı" birebir taklit edilemez; tipografik bir koleksiyon
  düzeni gerekir (bkz. madde 14).

### 2. Baskı kaydını "yıl sekmeli arşiv" olarak kur, eski sürümleri silme
- **(a)** Her etkinlik serisi için yıl yıl kayıt: tarih, mekân, ana/altın sponsor, konuşmacı
  kadrosu, bilet fiyatı, varsa katılım. Menünün sağ ucunda sadece yıl yazan bir link olsun.
  Bu, dokuz sitenin dördünde birebir var ve kimse eski sayfayı çöpe atmıyor.
- **(b)** `2025.hackthenorth.com` / `2025.treehacks.com` / `2026.nwhacks.io` /
  `archive.hackmit.org`; ayrıca `info.hackillinois.org/history` içindeki "Previous Years
  2017...2026" sekmeleri.
- **(c)** 9 seri, 35+ baskı; TechSummit ana sponsor tarihçesi 2017-2026 (8 yıl, her yıl için
  en az bir kurum); bilet fiyatları (DataCamp'21 20-120 TL, TechSummit'23 25-80 TL,
  Digitalized'23 40-70 TL, BBÖ'22 100 TL); mekânlar (Garanti Kültür Merkezi, Albert Long Hall,
  İbrahim Bodur Oditoryumu, Natuk Birkan).
- **(d)** **Orta.** Veri var, eksik hücrelerin dürüst gösterimi karar gerektiriyor
  ("kayıt tutulmamış" yazmak, gizlememek).

### 3. "Previous Sponsors" bölümünü utanmadan kur
- **(a)** Geçmiş sponsorları ayrı ve gururlu bir bölüm yap, "mevcut sponsorlarımız" diye
  değil, "2017'den bugüne bizimle çalışan kurumlar" diye. HackIllinois bunu `/history`
  sayfasının ortasına koymuş. Üstüne bizim tek fark yaratıcı verimiz: **tekrar eden ilişkiler**.
  "Yapı Kredi Teknoloji 2022 ve 2023'te üst üste ana sponsor", "Insider dört farklı yıl,
  üç farklı etkinlik", "KoçSistem 2017 ve 2026, dokuz yıl arayla".
- **(b)** `info.hackillinois.org/history` (Previous Sponsors), Hack Club `/philanthropy`
  ("(9x)" tekrar sayacı fikri buradan).
- **(c)** `sponsorlar/README.md`: 55+ kurum, 2018-2026 her yıl için en az bir sponsor,
  tekrar eden 14 kurum, kademe bilgisi (ana/altın/gümüş) çoğu yıl için mevcut.
  Ve en güçlü tek cümle: **"1998'de Computus dergimizi basan Koç Sistem, 2024'te DataCamp'in
  sponsoruydu."**
- **(d)** **Kolay.** Metin işi. ⚠️ Logo dosyası yok (`veri.md`), o yüzden isim/tipografi
  tabanlı sunum şart; gri logo kutusu yasak.

### 4. Sponsor sayfası = fiyat + kanıt, ikisi birlikte
- **(a)** İki katmanlı sayfa. Üst katman **MLH'in dili**: şirketin kazancı üzerinden 5-6 fayda
  kutusu, üstte üç rakam, altta sayılarla bir vaka anlatısı. Alt katman **bizim farkımız**:
  demografi, erişim, geçmiş sponsor kaydı, ve "geçen sene ne oldu" raporu. Fiyat merdiveni
  bu ligde kimsede yok ama Türkiye'de fiyat çıpası da yok, dolayısıyla açık fiyat bizde
  ayırt edici olur (`dunya/README.md` #5).
- **(b)** `sponsor.mlh.io` (fayda kutuları, "1 in 3 CS grads", Twilio vaka çalışması),
  Hack Club `/philanthropy` (bant + şeffaflık), `dunya/en-iyiler.md` (PennApps 2015 fiyat
  merdiveni, MIT FCF fiyat listesi).
- **(c)** DataCamp'24 demografisi (Bilgisayar Müh. %40,5 · Endüstri %10,9 · Matematik %10,1 ·
  EEE %7,1 · İstatistik %6,1); topluluk erişimi ~24.000 (Instagram 9.032, LinkedIn 6.057,
  BBÖ IG 4.453, TechSummit IG 2.675, DataCamp LI 1.102); üçüncü taraf onaylı
  **1.486 üye, 44 kulüp arasında 2., 167 etkinlik**; BBÖ 2018'de 20 günde 130.000+ oy.
- **(d)** **Orta.** Veri var; fiyat kararı kulübe ait, site sadece yer açar.

### 5. Kaynak künyesi: her sayının yanında nereden geldiği
- **(a)** Kayıttaki her rakamın yanında küçük bir kaynak işareti. Kuzey Amerika'da **hiç kimse
  bunu yapmıyor** (tarama boyunca tek örnek yok), ama Hack Club'ın 990 formlarını ve denetim
  firmasını yayımlaması aynı içgüdünün mali versiyonu; ve bu, kulübün sitesinin geçmişte
  uydurma içerik barındırmış olmasından sonra en güçlü duruş.
- **(b)** Hack Club `/philanthropy` → Financials (IRS 990 2020-2024 + yıllık raporlar,
  "2025 hazır olunca"); ayrıca Hack Club footer'ındaki canlı commit hash'i (aynı fikrin
  yazılım tarafı: "şu an gördüğün sürüm bu").
- **(c)** Arşivin `[DOĞRULANMIŞ]` / `[ŞÜPHELİ]` / `[EKSİK]` etiket sistemi zaten var;
  2.500+ iddianın kaynağı kayıtlı.
- **(d)** **Kolay-orta.** Tasarım kararı, veri işi değil.

### 6. Organizatör tanıklıkları: üye kazanma aracı olarak "Stories"
- **(a)** Katılımcı yorumu değil, **yönetim kurulu ve alt kurul üyelerinin** kendi ağzından
  "COMPEC'te çalışmak nasıl bir şey" yazıları. İsim + rol + dönem imzalı, uzun, gerçek.
- **(b)** `info.hackillinois.org/stories` (yedi organizatör, birebir bu kalıp);
  `calhacks.io` "Our Story" içindeki alıntı serpiştirmesi.
- **(c)** 17 doğrulanmış YK üyesi (2025-26 ve 2024-25, LinkedIn'leri KESIN), 7 alt kurul.
  ⚠️ Metinleri **kişilerin kendisi yazmalı**; bizim yazıp altına isim koymamız olmaz.
- **(d)** **Kolay teknik olarak, orta operasyonel olarak** (17 kişiden yazı toplamak gerekir).

### 7. Ekip bölümünü rol filtreli yap, sponsorluk irtibatını görünür kıl
- **(a)** Ad + rol + dönem, altta birim etiketleriyle filtre. Kurumsal İletişim ve Finans
  direktörünün LinkedIn'i doğrudan tıklanabilir olsun: şirket kiminle konuşacağını bilsin.
- **(b)** `calhacks.io` ekip bölümü (9 rol etiketiyle filtre, sponsorluk direktörlerinin
  LinkedIn'i linkli); `nwhacks.io` "Meet the minds behind"; HackMIT'in bütün organizatör
  isimlerini akan şerit olarak vermesi.
- **(c)** 17 YK üyesi + görev adları + KESIN LinkedIn URL'leri + 2025-26 için 8 portre,
  2024-25 için 8 portre. ⚠️ Emir Akdağ'ın portresi yok: jenerik avatar değil, baş harf monogramı.
- **(d)** **Kolay.**

### 8. Ön etkinlik takvimi: tek günü bir sezona çevir
- **(a)** Ana etkinlikten önce numaralanmış ön etkinlik dizisi, her biri tarih + saat + yer +
  kayıt linkiyle. Sponsor atölyeleri de bu takvimin içine yerleşir, yani sponsora sitede
  görünen ikinci bir mecra açılır.
- **(b)** `calhacks.io` "Hack Month" (9 etkinlik, 01/...09/ numaralı, her birinde RSVP);
  HackMIT "Hackweek" (etkinlik öncesi hafta, canlı yayınlı teknik konuşmalar, geçmişleri
  YouTube'da).
- **(c)** DevTalks kadrosu (14 kurum, 16 konuşmacı) ve Blockchain Meetups (7 buluşma) tam olarak
  bu formatın geçmişteki hali, yani kulüp bunu zaten yapmış, sadece takvimleştirmemiş.
  ⚠️ 2026-27 takvimi elimizde yok, gelecek tarih uydurulamaz; bölüm **geçmiş serilerle** kurulur.
- **(d)** **Kolay** (geçmiş için), gelecek için kulüpten veri bekler.

### 9. SSS'yi kategorilere böl ve "kenar" sorularını ekle
- **(a)** Tek uzun liste değil, üç-dört sekme: Genel / Başvuru / Lojistik / Takım-Proje.
  Ve bizde hiç olmayan sorular: "Artık öğrenci değilim, mentor veya jüri olabilir miyim?",
  "Şehir dışından geliyorum, konaklama?", "Hiç deneyimim yok", "Bilet ne kadar?".
- **(b)** HackMIT (4 kategori, 24 soru, "hacker ağırlamak istersem" dahil), CalHacks
  (3 kategori), nwHacks (3 sekme).
- **(c)** Bilet fiyatı verisi var (erişilebilirlik anlatısı), mekân verisi var. Mentor/jüri
  sorusu için: BBÖ jüri listeleri (2020'de 23 isim) zaten kulübün böyle bir kanalı olduğunu
  kanıtlıyor.
- **(d)** **Kolay**, ama cevapların kulüp tarafından teyidi gerekir.

### 10. Marka + basın kiti sayfası
- **(a)** İki sayfa: `/marka` (logo SVG/PNG/PDF, ham URL'ler ekranda, hex paleti, font,
  "hepsini indir") ve `/basin` (hızlı olgular, basına hazır fotoğraflar altyazılı, isimli
  basın irtibatı). Bu, kulübü "haber yapılabilir" hale getirir; gazetecinin işini bize sormadan
  bitirmesini sağlar.
- **(b)** `hackclub.com/brand` ve `hackclub.com/press` (bu setteki en olgun örnek, tek başına
  incelemeye değer); `mlh.com/brand-guidelines`.
- **(c)** ⚠️ **Bugün beslenemez.** Logonun vektörü yok, marka rengi beklemede, marka kiti
  kulüpten isteniyor (`veri.md`). Ama: BÜ resmî haber sitesinde geçen rakamlar (1.486 üye,
  167 etkinlik, 130.000+ oy) "hızlı olgular" bölümünü doldurmaya yeter ve gerçek fotoğraflar
  (`dc23-havadan.jpeg` tam dolu salon, `bbo-ekip.jpeg`, `teknodolu.jpeg`, `egitim.jpeg`) var.
- **(d)** **Kolay-orta**, ama marka kiti gelmeden yapılmaz. `KULUPTEN-ISTENECEKLER.md`'ye
  bağlı bir madde.

### 11. Konuşmacıyı logo değil, paragraf olarak sun
- **(a)** Otuz küçük logo yerine az sayıda isim, her birine unvan + gerçek bir paragraf.
  TreeHacks bütün konuşmacı bölümünü iki kişiyle kuruyor; HTN her sponsora tam paragraf yazıyor.
- **(b)** `treehacks.com` (Sam Altman ve Garry Tan, ikisi de paragraflı), `hackthenorth.com`
  sponsor bölümü.
- **(c)** 23 doğrulanmış konuşmacı; NVIDIA, Insider, Hepsiburada gibi kurumlar; DevTalks
  kadrosunda Yemeksepeti CTO, Microsoft, Huawei/HMS, Fibabanka CIO, Pixery, GittiGidiyor,
  Vertigo, Masomo, Locomation.
- **(d)** **Kolay.** ⛔ Mevcut sitedeki DeepMind/Google/OpenAI iddiaları uydurma, girmez.

### 12. Erişim ve mentor/jüri/gönüllü için ayrı başvuru yolları
- **(a)** Tek "katıl" düğmesi yerine üç ayrı yol: Katılımcı / Mentor-Jüri / Gönüllü.
  nwHacks bunu hero'nun içine koymuş ("Apply to be a: ...").
- **(b)** `nwhacks.io`, HackMIT (mentor/jüri başvurusu SSS içinde ayrı link), HTN
  ("Hacker Applications" + "Volunteer Sign Up" iki ayrı düğme).
- **(c)** 7 alt kurul (kulübe katılma yolu), BBÖ jüri geçmişi (jüri çağrısı için dayanak),
  17 YK üyesi (kime başvurulacağı).
- **(d)** **Kolay.**

### 13. Bilet fiyatı ve maliyet şeffaflığı: "cebine göre" anlatısı
- **(a)** Bu ligin tamamı "ücretsiz, yol ve konaklama bizden" diyor; bizim durumumuz farklı,
  ama **düşük ve açık fiyat** kendi başına bir erişilebilirlik iddiası. Geçmiş bilet fiyatlarını
  baskı kaydının içinde göster.
- **(b)** Karşı örnek olarak HackMIT/TreeHacks/CalHacks'in "What's the cost? Free" cevapları;
  PennApps'in "barınma sorun oluşturuyorsa bize yazın" tonu.
- **(c)** DataCamp'21 20-120 TL, TechSummit'23 25-80 TL, DataCamp'22 30-90 TL,
  Digitalized'23 40-70 TL, BBÖ'22 100 TL.
- **(d)** **Kolay.**

### 14. Tek metafora tam taahhüt (v4'ün görsel dili için)
- **(a)** Bu setin en akılda kalan siteleri **bir fikre sonuna kadar bağlı** olanlar: HackMIT
  bir karnaval, HTN bir piknik masası diorama'sı, PennApps bir havalimanı, nwHacks uçan bir
  şehir. Yarım taahhüt yok. v4 "kayıt sitesi" olacaksa metafor **arşiv/kayıt** olabilir:
  müze etiketi, künye, fiş, katalog numarası, kaynak dipnotu. HTN Museum'un lamba-ve-çerçeve
  kurgusu bu metaforun bir uygulaması.
- **(b)** `museum.hackthenorth.com` (müze), `hackmit.org` (karnaval), `pennapps.com`
  (havalimanı, fikir iyi uygulama kötü), `treehacks.com` (uzay).
- **(c)** Fotoğraflarımız kanıt olarak kullanılabilir (`v4-site-onerisi.md` de böyle diyor):
  her baskı kaydının yanında o yılın karesi. Elimizde 4 gerçek etkinlik fotoğrafı + 16 portre var.
- **(d)** **Zor.** Bu bir tasarım kararı, veri işi değil; ve elde illüstrasyon bütçesi yok,
  o yüzden metafor **tipografi ve düzenle** kurulmak zorunda.

### 15. Ekipten imzalı mektup
- **(a)** Sayfanın sonunda, kurumsal olmayan, birinci tekil/çoğul şahıs, imzalı kısa bir metin.
  HTN'de bu, sitenin en insani parçası ("bu wonderful website'ta sürprizler sakladık").
- **(b)** `hackthenorth.com` ("Hey Hackers! ... - Team Hack the North 💚");
  `hackillinois.org/stories` aynı tonun uzun hali.
- **(c)** 2025-26 YK'sı, Başkan Özlem Yavuz imzasıyla. Kulüpten metin gerekir.
- **(d)** **Kolay** teknik olarak, kulüpten metin bekler.

### 16. Kaynak kodu açık, footer'da sürüm
- **(a)** Sitenin GitHub reposu footer'da linkli, yanında o anki commit. Hem şeffaflık
  hem de teknoloji kulübü olduğunu iddia eden bir kurum için tutarlılık.
- **(b)** `hackclub.com` ("Commit 39c8e2, open source at hackclub/site"),
  `github.com/HackIllinois/` (bütün altyapı açık).
- **(c)** `bulgular-github-repolari.md` zaten kulübün repo geçmişini içeriyor.
- **(d)** **Kolay.**

### 17. Dizin/kaynak olmak: "toplayan taraf" konumu
- **(a)** Hack Club, kendi etkinliklerini değil **891 hackathonu** listeleyen bir dizin
  kurmuş (30 eyalet, 26 ülke, "Add Your Event" ile dışarıdan katkı). Bu, kulübü katılınacak
  bir yer olmaktan bakılacak bir kaynağa çeviriyor. Türkiye'de öğrenci teknoloji
  etkinliklerinin derli toplu bir listesi yok.
- **(b)** `hackathons.hackclub.com`.
- **(c)** `turkiye/rakip-etkinlikler.md` (811 satır) ve `turkiye/universiteler.md` (558 satır)
  zaten böyle bir dizinin ham verisi. ⚠️ Ama rakipleri tanıtmak stratejik bir karar,
  tasarım kararı değil; kulübe sorulmalı.
- **(d)** **Zor** (kapsam + bakım yükü). Uzun vadeli fikir olarak not.

---

## 13. Yapmamalı

Gözlenen kötü kalıplar. Çoğu somut bir siteden, kaynağıyla.

1. **⛔ Geçmiş etkinliği ana sayfada bırakmak.** `pennapps.com` bugün (Temmuz 2026) hâlâ
   19-21 Eylül **2025** etkinliğini tanıtıyor. Bir hackathon sitesinin verebileceği en kötü
   sinyal: kulüp ya öldü ya siteyi umursamıyor. Kulübün mevcut sitesinde de tarih tutarsızlığı
   var (`veri.md`), aynı tuzak.
2. **⛔ Geri sayımın `00:00:00:00` göstermesi.** PennApps'te tam olarak bu duruyor. Geri sayım
   koyacaksan bitince kendini gizlemeli. Sayaç, bakılmayan bir sitede en hızlı bozulan öğedir.
3. **⛔ "Coming soon" vaadini sitede unutmak.** PennApps: "Track details coming soon!" ve
   "Detailed hour by hour schedule will be released closer to the event", ikisi de etkinlikten
   10 ay sonra hâlâ ekranda. TreeHacks'te de program ve ödül dağılımı hiç gelmemiş.
   Vaat, doldurulmayacaksa yazılmaz.
4. **⛔ Sistem fontuyla "tasarım" yapmak.** PennApps'in fikri (havalimanı metaforu) bu setin
   en zeki fikri, ama `ui-sans-serif` + Tailwind varsayılan slate/pembe paleti fikri taşıyamıyor;
   site hazır şablon gibi duruyor. Fikir tipografiyle desteklenmezse görünmez.
5. **⛔ Ağırlığı sanat yönü olmadan harcamak.** HackMIT 40,8 MB / 230 görsel, HTN 21,5 MB /
   285 görsel. Bu bedeli **kendi çizdirdikleri** özgün illüstrasyon karşılığında ödüyorlar.
   Aynı ağırlığı stok görsel, video arka plan veya gradient yığınıyla harcamak aynı sonucu
   vermez. Karşı kanıt aynı listede: HackIllinois **52 KB** ile işini yapıyor.
6. **⛔ Aynı sayfada dörtten fazla font ailesi.** TreeHacks'te Bruno Ace + Geist Mono + Gaegu +
   Otomanopee One aynı arada; sonuç dağınık. Buna karşılık HackIllinois tek fontla (Montserrat),
   CalHacks iki fontla (sfPro + ivyPresto) daha derli toplu.
7. **⛔ Kaydırınca tekrarlanan sonsuz şerit.** HTN'in iş ilanı listesi tarayıcıya **aynı 16
   ilanı 4 kez** veriyor (sonsuz marquee kopyası); HackMIT'te 60+ organizatör ismi iki kez
   akıyor. Ekranda hoş, ama erişilebilirlik ve arama açısından kirli. Marquee kullanacaksan
   içeriği DOM'da tekrarlamayan bir yöntem seç.
8. **⛔ Menüyü hash'e gömüp gerçek sayfa yapmamak.** Dokuz sitenin altısında bütün gezinme
   `/#about` gibi tek sayfa çapaları. Sonuç: paylaşılabilir link yok, arama sonucu yok,
   arşivlenebilir kayıt yok. **v4 bir kayıt sitesi olacaksa bu kalıp bizim için doğrudan
   zararlıdır**; kayıtların kendi URL'si olmalı.
9. **⛔ Sponsor bölümünü logo duvarına indirgemek.** Setin çoğunluğu bunu yapıyor ve en iyileri
   (HTN, TreeHacks) yapmıyor: paragraf yazıyorlar. Bizde ayrıca logo dosyası bile yok,
   yani gri "Sponsor Logo 1" kutusu kesinlikle yasak (`veri.md`).
10. **⛔ 72 script yüklemek.** `mlh.com` böyle; ticari bir şirket için savunulabilir, öğrenci
    kulübü için değil. Analitik yığını sayfanın kendisinden ağır olmamalı.
11. **⛔ Aynı içeriği iki alan adına bölerken bağı koparmak.** HackIllinois'in
    `hackillinois.org` / `info.hackillinois.org` ayrımı doğru fikir, ama etkinlik sitesinin
    ana sayfası aslında `/about` içeriği gösteriyor ve iki site arasındaki geçiş zayıf.
    Ayırmak iyi, köprüyü kurmayı unutmamak şart.
12. **⛔ Rakamı bağlamsız vermek.** "2.000+ hackers" ile "15.000 başvurudan seçilen 1.000 kişi"
    aynı şey değil (`v4-site-onerisi.md` de bunu söylüyor). Ve bizim özel durumumuz:
    Kommunity kaydı katılımcı değildir, "801 kayıt (Kommunity, 2022)" diye yazılır.
13. **⛔ Fotoğrafı olmayan kişiye jenerik avatar koymak.** Mevcut sitede yapılmış. Bu ligde
    tercih edilen: monogram veya kişiyi hiç göstermemek. Sahte insan silueti kurumu
    özensiz gösterir.

---

## 14. Bu taramanın sınırları

- **Fiyat bilgisi bulunamadı** çünkü hiçbir sitede yok, arşiv/PDF taramasıyla da çıkmadı.
  PennApps'in 2015 sponsor PDF'i (`dunya/en-iyiler.md`) bugünkü sitesinde **bulunmuyor**;
  o veri ikincil kaynaklardan geliyor.
- Sitelerin **etkinlik sırasındaki** hali görülemedi (nwHacks "Live Portal", HackMIT
  Hackweek canlı yayınları, HTN'in "sitede sakladığımız sürprizler" iddiası). Bunlar
  yıl içinde farklı zamanlarda açılıyor.
- **HackMIT Admissions Puzzle** SSS'de doğrulandı ama bulmacanın kendisi henüz yayında değil
  ("coming soon..."), yani mekaniği incelenemedi.
- Mobil görünüm incelenmedi; ölçümlerin tamamı 1440x900 masaüstü.
- `hackillinois.org` ana sayfası tarama anında `/about` içeriğini gösteriyordu
  (2026 etkinliği sitesi ya yayında değil ya yönlendirilmiş). 52 KB ölçümü bu haliyle geçerli.
