# Mevcut COMPEC web varlıkları — analiz

Tarih: 2026-07-24. Toplayan: compec-site agent. Ham kopyalar: `reference/mevcut-site/`.

## Envanter

| Adres | Durum | Ne |
|---|---|---|
| `compec.org` | **CANLI** (Netlify) | Güncel resmî site. El yazımı düz HTML/CSS/JS, framework yok. |
| `www.compec.org` | canlı | `compec.org`'a gider |
| `beta.compec.org` | canlı ama **ÖLÜ** | 2019'dan kalma CRA/React SPA. S3 + CloudFront, `last-modified: 2019-07-02`. Tawk.to canlı-destek widget'ı hâlâ ekli. |
| `compec.boun.edu.tr` | **ERİŞİLEMİYOR** | DNS/bağlantı yok (arama sonuçlarında hâlâ görünüyor) |
| `compec.org.tr` | **ERİŞİLEMİYOR** | DNS yok |
| `luma.com/bouncompec` | canlı | Etkinlik takvimi — **tamamen boş**, ne geçmiş ne gelecek etkinlik girilmiş |

Sosyal: LinkedIn `company/bouncompec`, Facebook `bouncompec`, Instagram/X/YouTube/TikTok (luma'da listeli).

## compec.org — yapı

Sayfalar: `/` · `/etkinlikler` · `/hakkimizda` · `/reg` · ve **7 etkinlik alt sayfası**:
`/digitalized` `/datacamp` `/bbo` `/blockchain-techsummit` `/techsummit` `/teknodolu` `/gamejam`.
Ortak `style.css` **45 KB tek dosya**, `script.js` 3.6 KB.
Tek dış bağımlılık: unpkg'dan `@studio-freight/lenis@1.0.42` (smooth scroll).

### Tespit edilen kusurlar
- `<title>Club Website</title>` — ana sayfanın başlığı jenerik placeholder. SEO açısından ölümcül.
- **Tüm sosyal medya linkleri `href="#"`** — footer'daki Instagram/YouTube/LinkedIn ikonları hiçbir yere gitmiyor.
- Footer "Quick Links" içindeki `bize-katil.html` → **404**.
- "Subcommittees" linki `href="#"` — 7 alt kurulun hiçbirinin sayfası yok.
- Footer copyright sayfadan sayfaya tutarsız: ana sayfa/hakkımızda "© 2025", etkinlikler "© 2024".
- İçerik **tamamen İngilizce**, ama URL slug'ları Türkçe (`/etkinlikler`, `/hakkimizda`). Karma kimlik.
- Newsletter formunda `action` yok — hiçbir yere post etmiyor, dekoratif.
- Renk paleti Bootstrap varsayılanı `#007bff` — **marka rengi değil**. Gerçek logo mavisi `#1b5fab`.
- Etkinlik tarihleri karışık yıl: Ekim–Aralık 2025 ile Mart–Mayıs **2025** yan yana. 2025-26 akademik yılı için Mart–Mayıs **2026** olmalı; muhtemelen kopyala-yapıştır hatası.
- Sponsor sayfası/bölümü **yok** — kurumsal ilişkiler için en kritik eksik.
- Geçmiş etkinlik arşivi yok, katılımcı sayısı/fotoğraf/sonuç yok. Site kurumsal hafızayı hiç taşımıyor.

### `/etkinlikler` — yıllık takvim (sitedeki hâliyle)
| Tarih (sitede yazan) | Etkinlik |
|---|---|
| 24 Ekim 2025 | Digitalized — girişimcilik festivali |
| 21 Kasım 2025 | Datacamp — VB & YZ kampı (NLP, CV, IoT, Big Data) |
| 19 Aralık 2025 | Boğaziçi Bilişim Ödülleri |
| 14 Mart 2025 | Boğaziçi Blockchain TechSummit (DeFi/NFT/Web3) |
| 11 Nisan 2025 | Boğaziçi TechSummit |
| 25 Nisan 2025 | Teknodolu — sosyal sorumluluk, Anadolu'da lise/ortaokul |
| 16 Mayıs 2025 | GameJam — 48 saat |

> **Datacamp bizim birimin etkinliği** (Veri Bilimi & YZ).

### `/hakkimizda` — yönetim kurulu
**2025-2026:** Başkan Özlem Yavuz · Genel Sekreter Zişan Ferzin Yalçın · Kurumsal İletişim & Finans Dir. Ali Saffan Kökoğlu · **Veri Bilimi & YZ + Ar-Ge Dir. Havva Berre Yılmaz** · Dijital Girişimcilik & Ar-Ge Dir. Kerem Yoldaş · Teknoloji Dir. Taha Kuter · Pazarlama Dir. Ekrem Ladikli · Boğaziçi Bilişim Ödülleri & Blockchain Dir. İremnur Yıldız

**2024-2025:** Başkan Mert Gökyar · Genel Sekreter & PR Semih Mutlu · Kurumsal İletişim & Finans Tuana Yücedağ · Ar-Ge Hüseyin Emir Akdağ · Veri Bilimi Edanur Bozkurt · Dijital Girişimcilik Oğuz Özer · Teknoloji & Ar-Ge Serdar Şen · BBÖ & Blockchain Hasan Deveci · Oyun Geliştirme & PR Sema Aydın

## 🚨 UYDURMA İÇERİK — canlı yayında (doğrulandı 2026-07-24)

compec-main'in bulgusu; ben de 7 etkinlik sayfasının hepsini indirip teyit ettim. Etkinlik
sayfalarındaki **konuşmacılar, sponsorlar ve program akışları tamamen uydurma placeholder**.

**İki farklı ağırlık sınıfı var, karıştırmamak lazım:**

**(a) Bariz lorem-ipsum** — uydurma olduğu okur okumaz anlaşılıyor, utanç verici ama iddia değil:
- Digitalized: "Jane Doe / CEO, Tech Innovators", "Founder, Startup Hub"
- TechSummit: "CTO, Future Systems", "Lead Engineer, QuantumLeap"
- Blockchain TechSummit: "CEO, CryptoX"
- Tüm 7 sayfada: "Sponsor Logo 1..4" gri kutular ("Our Proud Sponsors" / "Previous Sponsors")

**(b) GERÇEK KURUM ADI kullanan sahte iddia — asıl risk:**
- **`/datacamp`** → "Meet the Instructors: Emily White / **AI Researcher, DeepMind** · Michael
  Green / **Data Scientist, Google** · Laura Black / **NLP Specialist, OpenAI**"
- Ayrıca uydurma 2 günlük program akışı (saat saat).

(b) diğerlerinden kategorik olarak farklı: var olmayan kişileri **gerçek şirketlerin** çalışanı
olarak gösteriyor. Bu artık "placeholder unutulmuş" değil, kamuya açık yanlış beyan — ve
**Datacamp bizim birimimizin (Veri Bilimi & YZ) etkinliği**. Yani bu doğrudan bizim kapımıza
düşüyor.

> **Kural (compec-main direktifi, kabul):** yeni sitede placeholder içerik YASAK. Veri yoksa
> bölüm hiç olmayacak. Boş sponsor duvarı, hayali konuşmacı, uydurma program akışı yok.

> **Ayrı iş, ama acil:** bu mevcut canlı sitede duruyor. Düzeltmek/kaldırmak yeni site
> yayına girene kadar bekleyemeyebilir — özellikle `/datacamp`. Tuna'ya iletilmesi gereken
> bir karar; compec-main'e bildirdim.

## Marka kimliği (elde olan)
- **Logo:** iç içe geçmiş iki halka ("CO" / sonsuzluk) + "Compec" wordmark. Sert siyah gölge (2000'ler estetiği).
- **Marka mavisi: `#1b5fab`** (logo pikselinden örneklendi).
- Sitede kullanılan font: Poppins. Site paleti koyu tema (`#0d0d0d` zemin), aksan `#007bff` + `#00c6ff` gradyan.
- Hashtag: `#compecrocks`.
- Logo dosyaları: `reference/mevcut-site/logo.png` (beyaz, uzun), `cmp-mavi.png` (mavi, kare).

## Değerlendirme
Mevcut site tek kişilik hızlı bir çalışma; görsel olarak fena değil ama **kurumsal hafıza taşımıyor** (arşiv/sponsor/alt kurul yok), **bağlantıları kopuk** (sosyal medya, join, subcommittees) ve **kimlik tutarsız** (dil, renk, yıl). 1994 kurulu, yılda 50+ etkinlik yapan bir kulüp için yetersiz.
