# LinkedIn profilleri — doğrulama bulguları

compec-site, 2026-07-25. **Kural: sadece `KESIN` işaretli satırlardaki URL siteye girer.**
`ZAYIF` ve `BULUNAMADI` olanlara URL yazılmamıştır — yanlış kişinin profilini yayınlamak
gerçek zarardır.

## Özet — 17 kişinin 17'si KESIN, 0 ZAYIF, 0 BULUNAMADI

| Dönem | İsim | Durum | URL |
|---|---|---|---|
| 25-26 | Özlem Yavuz | KESIN | `tr.linkedin.com/in/ozllemyavuzz` |
| 25-26 | Zişan Ferzin Yalçın | KESIN | `tr.linkedin.com/in/zisan-ferzin-yalcin` |
| 25-26 | Ali Saffan Kökoğlu | KESIN | `tr.linkedin.com/in/ali-kokoglu` |
| 25-26 | Havva Berre Yılmaz | KESIN | `tr.linkedin.com/in/havva-berre-yilmaz` |
| 25-26 | Kerem Yoldaş | KESIN | `tr.linkedin.com/in/keremyoldas0101` |
| 25-26 | Taha Kuter (Sancak) | KESIN | `tr.linkedin.com/in/kuter` |
| 25-26 | Ekrem Ladikli (Resul Ekrem) | KESIN | `tr.linkedin.com/in/ekremladikli` |
| 25-26 | İremnur Yıldız | KESIN | `tr.linkedin.com/in/iremnur-yildiz` |
| 24-25 | Mert Gökyar | KESIN | `tr.linkedin.com/in/mertgokyar` |
| 24-25 | Semih Mutlu | KESIN | `tr.linkedin.com/in/semihmutsuz` |
| 24-25 | Tuana Yücedağ | KESIN | `tr.linkedin.com/in/tuana-yucedag` |
| 24-25 | Hüseyin Emir Akdağ | KESIN | `tr.linkedin.com/in/huseyinemirakdag` |
| 24-25 | Edanur Bozkurt | KESIN | `tr.linkedin.com/in/edanur-bozkurt` |
| 24-25 | Oğuz Özer | KESIN | `tr.linkedin.com/in/o%C4%9Fuz-%C3%B6zer-865095247` |
| 24-25 | Serdar Şen | KESIN | `tr.linkedin.com/in/serdarsenn` |
| 24-25 | Hasan (Hasancan) Deveci | KESIN | `tr.linkedin.com/in/hasancandeveci0hd` |
| 24-25 | Sema Aydın | KESIN | `tr.linkedin.com/in/sema-aydin` |

**Siteye koymadan önce bakılacak 3 isim sorusu** (aşağıda detaylı):
Taha Kuter → LinkedIn'de *Taha Kuter Sancak* · Ekrem Ladikli → *Resul Ekrem Ladikli* ·
Hasan Deveci → *Hasancan Deveci*.

---

## Yöntem ve kanıt kaynakları

LinkedIn profil sayfaları (`linkedin.com/in/...`) bu sunucudan **HTTP 999 authwall** döndürüyor;
Googlebot user-agent'ı da işe yaramıyor. Google/Bing/DuckDuckGo/Brave/Mojeek sunucunun IP'sinden
CAPTCHA veriyor. Çalışan yol:

1. **LinkedIn gönderi sayfaları giriş yapmadan tam açılıyor** — gönderi metni, etiketlenen
   kişiler ve yorum bölümü dahil. Her isim kendi profil linkiyle birlikte geliyor, yani
   **isim → URL eşleşmesi tahminle değil, anchor metniyle birebir** kuruldu.
2. **Startpage ve Yandex** (Google/Bing aksine engellenmiyor) arama sonucu başlıkları,
   profilin **kendi başlığını (headline)** gösteriyor — profili açmadan doğrulama sağlıyor.
3. **Kulübün kendi LinkedIn şirket sayfası** `linkedin.com/company/bouncompec` → "Hakkımızda"
   bölümü 2025-2026 YK'sını isim isim listeliyor.

> ⚠️ **URL'lerin "canlı mı" diye HTTP ile test edilmesi ANLAMSIZ:** LinkedIn giriş yapmamış
> isteklere ayrım gözetmeksizin `999` dönüyor — uydurma bir adres (`/in/bu-slug-kesinlikle-yok-12345xyz`)
> de aynı `999`'u veriyor. Yani status kodu var/yok ayrımı yapmıyor.
> Adreslerin gerçekliği bunun yerine **iki bağımsız kanıtla** sabit: (a) LinkedIn'in kendisi bu
> linkleri kendi gönderi sayfasında üretti, (b) arama motorları bu adresleri gerçek profil
> başlıklarıyla indekslemiş.

### 🔑 Ana kanıt: Havva Berre Yılmaz'ın 27 Haziran 2025 tarihli gönderisi
`linkedin.com/posts/havva-berre-yilmaz_compec-boğaziçi-üniversitesi-bilişim-kulübü-activity-7344328868163416064-rWwF`

Berre'nin "Compec'te Veri Bilimi ve Yapay Zeka & Ar-Ge Direktörü olarak görev almaya
başladığımı paylaşmaktan mutluluk duyuyorum" gönderisi. Gönderi metninde **2025-26 YK'nın
diğer 7 üyesinin tamamı etiketlenmiş**, yorumlarda da 2024-25 YK'sından isimler var.
Her etiket/yorum kendi profil URL'siyle geliyor.

### Diğer kaynak gönderiler (2024-25 dönemi — ileride tekrar işe yarar)
- `linkedin.com/posts/mertgokyar_compecrocks-activity-7224769746301292544-iNDB` —
  Mert Gökyar'ın başkanlık duyurusu (li-anchor ile tam okunabiliyor)
- `linkedin.com/posts/sema-aydin_compec-boğaziçi-üniversitesi-bilişim-kulübünde-activity-7223333108891172866-cSW0` —
  Sema Aydın'ın görev duyurusu, **24 yorum**, 2024-25 YK'sının büyük kısmı yorumcu olarak var
- `linkedin.com/posts/semihmutsuz_...-activity-7223983169820119043-qRc8` — Semih Mutlu'nun
  görev duyurusu (bu biri signup-wall arkasında; yalnızca arama motoru snippet'iyle okundu)

### 🔑 İkinci kanıt: `linkedin.com/company/bouncompec` → Hakkımızda
Kulübün kendi yazdığı metin (6.057 takipçi, compec.org sitesi, 1994 kuruluş, Güney Kampüs adresi):

> 2025-2026 Yönetim Kurulu Üyeleri: Başkan: Özlem Yavuz · Genel Sekreter: Zişan Ferzin Yalçın ·
> Finans ve Kurumsal İletişim Direktörü: Ali Saffan Kökoğlu · Veri Bilimi & Yapay Zeka Direktörü:
> Havva Berre Yılmaz · Dijital Girişimcilik Direktörü: Kerem Yoldaş · BBÖ Direktörü: İremnur Yıldız ·
> PR Direktörleri: Resul Ekrem Ladikli & Taha Kuter Sancak · Ar-Ge Direktörleri: Havva Berre Yılmaz &
> Kerem Yoldaş · Teknoloji Direktörü: Taha Kuter Sancak · Oyun Geliştirme Direktörü: Ali Saffan Kökoğlu

---

## 2025-2026 Yönetim Kurulu

### Özlem Yavuz — Yönetim Kurulu Başkanı
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/ozllemyavuzz`
- Kanıt:
  - ✅ **Boğaziçi eğitimi** — Startpage'de profil başlığı: *"Özlem Yavuz — Management Student at Boğaziçi University"*
  - ✅ **COMPEC deneyimi** — Yandex'te profil başlığı: *"Özlem Yavuz — Compec - Boğaziçi Üniversitesi Bilişim Kulübü"*
  - ✅ **Görev örtüşüyor — kendi ağzından** — `linkedin.com/posts/ozllemyavuzz_dear-connections...`
    gönderisi: *"Dear connections, I am happy to share that I am starting a new position as the
    **President of Compec** - Boğaziçi Üniversitesi Bilişim Kulübü."*
  - ✅ **COMPEC deneyim kaydı profilde** — Startpage snippet'i profildeki deneyim satırını gösteriyor:
    *"Board Member · Compec - Boğaziçi Üniversitesi Bilişim Kulübü · Mar 2025 - Haz 2025"*
  - ✅ **Gönderide etiketli** — Berre'nin YK gönderisinde `Özlem Yavuz` anchor'ı bu URL'ye bağlı; ayrıca aynı gönderiye *"Bu harika ekibe, harika bir yıl diliyorum✨"* yorumunu yapmış
  - ✅ Kulübün şirket sayfası "Başkan: Özlem Yavuz" diyor; profilinde 13. Boğaziçi Bilişim
    Ödülleri'ne (20 Aralık) katıldığına dair paylaşım da var
- ⚠️ **Karışma riski:** "Özlem Yavuz" çok yaygın bir ad — LinkedIn'de 100+ profil var
  (Atos Global HR Director vb.). Ayrıca Yandex `özlem-yavuz-b83b30258` diye ikinci bir
  Compec bağlantılı kayıt gösteriyor. Yukarıdaki URL, başkanlık duyurusunu yapan ve
  kulübün YK gönderisinde etiketlenen profildir — **yalnızca onu kullan.**

### Zişan Ferzin Yalçın — Genel Sekreter
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/zisan-ferzin-yalcin`
- Kanıt:
  - ✅ **Hem Boğaziçi hem COMPEC tek başlıkta** — Startpage'de profil başlığı: *"Zişan Ferzin YALÇIN — Boğaziçi Üniversitesi/COMPEC/ATOALDER"*, snippet: *"Eğitim: Boğaziçi Üniversitesi"*
  - ✅ Yandex başlığı: *"Zişan Ferzin YALÇIN — Compec - Boğaziçi Üniversitesi Bilişim..."*
  - ✅ **Gönderide etiketli** — `Zişan Ferzin YALÇIN` anchor'ı bu URL'ye bağlı; gönderiye *"Birlikte güzel günlere... 💙🚀"* yorumu yapmış
- ⚠️ **Dikkat — karışma riski:** Aynı isimde ikinci bir profil var:
  `zişan-ferzin-yalçin-00017128a` (*"İş Geliştirme Asistanı - Locomar"*). **Onu kullanma.**
  Doğru olan yukarıdaki, kulübün gönderisinde etiketlenen profildir.

### Ali Saffan Kökoğlu — Kurumsal İletişim ve Finans Direktörü
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/ali-kokoglu`
- Kanıt:
  - ✅ **Görev birebir örtüşüyor** — profil başlığı: *"Ali Saffan Kökoğlu — Kurumsal İletişim ve Finans Direktörü @Compec"*
  - ✅ **COMPEC deneyimi** — snippet: *"Compec - Boğaziçi Üniversitesi Bilişim..."*
  - ✅ **Gönderide etiketli** — `Ali Saffan Kökoğlu` anchor'ı bu URL'ye bağlı
  - ✅ Kulübün şirket sayfası "Finans ve Kurumsal İletişim Direktörü: Ali Saffan Kökoğlu" diyor
- Not: LinkedIn bu profili bazen `/in/ali-kokoglu/tr` biçiminde veriyor; `/tr` soneki dil
  yönlendirmesi, kanonik adres `/in/ali-kokoglu`.

### Havva Berre Yılmaz — Veri Bilimi ve YZ, Ar-Ge Direktörü
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/havva-berre-yilmaz`
- Kanıt:
  - ✅ **Görev birebir örtüşüyor** — ana kanıt gönderisinin **yazarı**; kendi ağzından:
    *"Compec - Boğaziçi Üniversitesi Bilişim Kulübü'nde Veri Bilimi ve Yapay Zeka & Ar&Ge
    Direktörü olarak görev almaya başladığımı paylaşmaktan mutluluk duyuyorum"*
  - ✅ **COMPEC deneyimi** — aynı gönderide *"Geçtiğimiz yıl Developer Team Leader olarak görev aldığım bu kulüpte"*
  - ✅ **Boğaziçi eğitimi** — profil başlığı: *"Havva Berre Yılmaz — Senior International Trade Student at Boğaziçi University"*

### Kerem Yoldaş — Dijital Girişimcilik ve Ar-Ge Direktörü
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/keremyoldas0101`
- Kanıt:
  - ✅ **Boğaziçi eğitimi** — Yandex'te profil başlığı ve snippet: *"Kerem Yoldas — Innovis VC · Eğitim: Boğaziçi Üniversitesi · Konum: İstanbul"*
  - ✅ **Gönderide etiketli** — `Kerem Yoldaş` anchor'ı bu URL'ye bağlı; ayrıca gönderiye
    kulübün sloganıyla *"That's IT! 💙"* yorumunu yapmış (`That's IT!` COMPEC'in LinkedIn sloganı)
  - ✅ **Görev örtüşüyor** — kulübün şirket sayfası "Dijital Girişimcilik Direktörü: Kerem Yoldaş"
    diyor; profildeki Innovis VC / girişim sermayesi deneyimi bu görevle tutarlı
  - Startpage başlığı: *"Kerem Yoldas — building tech you'll love"*

### Taha Kuter — Teknoloji Direktörü
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/kuter`
- Kanıt:
  - ✅ **Boğaziçi eğitimi** — profil başlığı: *"Taha Kuter Sancak — Chemical Engineering
    Undergraduate at Boğaziçi Üniversitesi · Eğitim: Boğaziçi Üniversitesi"*
  - ✅ **Gönderide etiketli** — `Taha Kuter Sancak` anchor'ı bu URL'ye bağlı
  - ✅ **Görev örtüşüyor** — kulübün şirket sayfası "Teknoloji Direktörü: Taha Kuter Sancak" diyor
  - ✅ Yandex'te aynı profilin başlığı: *"Taha Kuter Sancak — Boğaziçi Üniversitesi"*
- ⚠️ **İsim notu:** LinkedIn'deki tam ad **Taha Kuter Sancak**. Sitede/`veri.md`'de "Taha Kuter"
  yazıyor. Aynı kişi (kulübün kendi şirket sayfası da "Taha Kuter Sancak" diyor), ama sitede
  hangi biçimin kullanılacağı kulübe sorulmalı.
- Not: Arama motorlarında aynı kişi için ikinci bir adres de görünüyor
  (`/in/taha-kuter-sancak`, aynı başlık/aynı kişi). **Kulübün gönderisinde linklenen ve
  güncel olan `/in/kuter`'i kullan.**

### Ekrem Ladikli — Pazarlama Direktörü
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/ekremladikli`
- Kanıt:
  - ✅ **Boğaziçi eğitimi** — profil başlığı: *"Resul Ekrem Ladikli — Samsung Electronics |
    Boğaziçi Üniversitesi · Eğitim: Boğaziçi Üniversitesi · Konum: İstanbul"*
  - ✅ **Gönderide etiketli** — `Resul Ekrem Ladikli` anchor'ı bu URL'ye bağlı
  - ✅ **Görev örtüşüyor** — kulübün şirket sayfası "PR Direktörleri: Resul Ekrem Ladikli &
    Taha Kuter Sancak" diyor (compec.org'da bu rol "Marketing Director / Pazarlama" olarak geçiyor)
- ⚠️ **İsim notu:** LinkedIn'deki tam ad **Resul Ekrem Ladikli**; sitede "Ekrem Ladikli" yazıyor.

### İremnur Yıldız — Boğaziçi Bilişim Ödülleri ve Blockchain Direktörü
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/iremnur-yildiz`
- Kanıt:
  - ✅ **Boğaziçi eğitimi** — profil başlığı: *"İremnur Yıldız — Computer Engineering Student at
    Bogazici University"*
  - ✅ **COMPEC bağlantısı** — snippet: *"İremnur sizi Compec - Boğaziçi Üniversitesi Bilişim
    Kulübü şirketindeki 10 üzerinde [kişiye ulaştırabilir]"*
  - ✅ **Gönderide etiketli** — `İremnur Yıldız` anchor'ı bu URL'ye bağlı
  - ✅ **Görev örtüşüyor** — kendi gönderisi: `linkedin.com/posts/iremnur-yildiz_20-aralıkta-13-boğaziçi-bilişim-ödülleri-activity-7416174246365835264-0MNd`
    (11 Oca 2026, **13. Boğaziçi Bilişim Ödülleri** hakkında) — BBÖ direktörlüğüyle birebir örtüşüyor.
    Kulübün şirket sayfası da "BBÖ Direktörü: İremnur Yıldız" diyor

---

## 2024-2025 Yönetim Kurulu

### Edanur Bozkurt — Veri Bilimi Direktörü
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/edanur-bozkurt`
- Kanıt:
  - ✅ **Boğaziçi eğitimi** — profil başlığı: *"Edanur Bozkurt — Industrial Engineering @
    Bogazici University · Deneyim: Navlungo · Eğitim: Boğaziçi University · Konum: İstanbul"*
  - ✅ **Görev örtüşüyor — kendi ağzından** — kendi gönderisi `tr.linkedin.com/posts/edanur-bozkurt_compec...`:
    *"Compec - Boğaziçi Üniversitesi Bilişim Kulübü'nde **Veri Bilimi Direktörü** olarak
    çalışmaya başladığımı paylaşmaktan mutluluk duyuyorum"* (gönderi URL'sindeki yazar
    slug'ı = `edanur-bozkurt`)
  - ✅ **COMPEC bağlamı** — Berre'nin 2025-26 YK gönderisinin yorumcusu; yorumda gösterilen
    başlık (*"Industrial Engineering @ Bogazici University"*) profilinkiyle birebir aynı,
    dolayısıyla yorumcu = bu URL. Yorumu: *"Tebrikler! Ekip ve kulüp için unutulmaz bir sene
    olması dileğiyle 🚀🚀"* — devreden YK üyesinin gelen YK'ya tebriği
- ⚠️ **Karışma riski:** `edanur-bozkurt-152b7813a` **başka bir kişi** (Anadolu Üniversitesi, Ankara). Kullanma.

### Serdar Şen — Teknoloji ve Ar-Ge Direktörü
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/serdarsenn`
- Kanıt:
  - ✅ **Boğaziçi eğitimi** — Yandex'te profil başlığı: *"Serdar Şen — Boğaziçi Üniversitesi"*
  - ✅ **Görev örtüşüyor** — Startpage başlığı: *"Serdar Şen — Senior Computer Engineering &
    Mathematics Student"* → Teknoloji & Ar-Ge direktörlüğüyle tutarlı
  - ✅ **COMPEC deneyimi** — profil snippet'i: *"Senior Computer Engineering & Mathematics
    Student ... CMPE250 ... **Compec -** ..."*
  - ✅ **COMPEC bağlamı** — Berre'nin YK gönderisine yorum: *"Tebrikler Berre! Hepinize
    başarılar diliyorum💙🎉"*; `Serdar Şen` anchor'ı bu URL'ye bağlı. Ayrıca Sema Aydın'ın
    Tem 2024 COMPEC gönderisinde de anchor eşlemeli yorumcu
- ⚠️ **Karışma riski:** `serdar-sen-346a993` (Casta Group) başka kişi; ayrıca Anadolu Ü.
  öğretim görevlisi, MEB daire başkanı ve göğüs cerrahı adaşları var. Kullanma.

### Sema Aydın — Oyun Geliştirme ve PR Direktörü
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/sema-aydin`
- Kanıt:
  - ✅ **Boğaziçi eğitimi** — profil snippet'i: *"Eğitim: Boğaziçi Üniversitesi"*, başlık:
    *"Sema Aydın — Bogazici University CE | Game Artist"*, özet: *"I am currently a Civil
    Engineering student at Boğaziçi University"*
  - ✅ **COMPEC deneyimi** — snippet: *"Deneyim: Compec - Boğaziçi Üniversitesi Bilişim Kulübü"*
  - ✅ **Görev örtüşüyor** — başlıktaki *"Game Artist"* + özetteki *"interested in game
    developing, art and music"* → **Oyun Geliştirme** direktörlüğüyle birebir
  - ✅ **Görev örtüşüyor — kendi ağzından** — 28 Tem 2024 tarihli **kendi gönderisinin yazarı**
    (`tr.linkedin.com/posts/sema-aydin_compec-boğaziçi-üniversitesi-bilişim-kulübünde-activity-7223333108891172866-cSW0`,
    anchor: `{href: .../in/sema-aydin, parentText: "Sema Aydın 1y Düzenlendi"}`):
    *"Compec - Boğaziçi Üniversitesi Bilişim Kulübü'nde **Oyun Geliştirme ve PR Direktörü**
    olarak çalışmaya başladığımı paylaşmak..."* — unvan birebir
  - ✅ **COMPEC bağlamı** — Berre'nin YK gönderisine yorum: *"Mükemmelsiniz, Arkanızdayız!!!"*

### Mert Gökyar — Yönetim Kurulu Başkanı
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/mertgokyar`
- Kanıt:
  - ✅ **Görev örtüşüyor — kendi ağzından** — `linkedin.com/posts/mertgokyar_compecrocks-activity-7224769746301292544-iNDB`
    (1 Ağu 2024): *"Boğaziçi'ne adım attığım günden bu yana... Compec - Boğaziçi Üniversitesi
    Bilişim Kulübü'nün **yönetim kurulu başkanlığı görevine seçildiğimi** gurur ve mutlulukla
    paylaşmak isterim... #compecrocks"*
  - ✅ **Gönderi yazarı bağlantısı birebir eşlendi** — `{href: tr.linkedin.com/in/mertgokyar, parentText: "Mert Gökyar 1y Düzenlendi"}`;
    gönderi metnindeki kulüp etiketi de `company/bouncompec`'e bağlı
  - ✅ **Boğaziçi eğitimi** — profil snippet'i: *"Mert Gökyar — CEO Office @ Brik | Head of Brand
    @ 180DC Bogazici · Eğitim: Boğaziçi Üniversitesi · ...Compec - Boğaziçi..."*

### Semih Mutlu — Genel Sekreter ve PR Direktörü
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/semihmutsuz`
- Kanıt:
  - ✅ **COMPEC deneyimi** — Yandex'te profil başlığı (iki ayrı sorguda aynı): *"Semih Mutlu —
    Compec - Boğaziçi Üniversitesi Bilişim Kulübü"* (güncel pozisyonu doğrudan kulüp)
  - ✅ **Görev örtüşüyor — kendi ağzından** — `linkedin.com/posts/semihmutsuz_compec-boğaziçi-üniversitesi-bilişim-kulübünde-activity-7223983169820119043-qRc8`
    (30 Tem 2024): *"Compec - Boğaziçi Üniversitesi Bilişim Kulübünde **Başkan Yardımcısı &
    Genel Sekreter ve PR Direktörü** olarak çalışmaya başladığımı..."*
  - ✅ compec.org/hakkimizda da "General Secretary & PR Director — Semih Mutlu" diyor
- ⚠️ **Karışma riski yüksek:** LinkedIn'de 40+ "Semih Mutlu" profili var
  (`semih-mutlu-217918233`, `semih-mutlu-475b6a216` vb. **başka kişiler**).
  Ayırt edici olan vanity slug `semihmutsuz` ve profil başlığındaki Compec'tir.

### Tuana Yücedağ — Kurumsal İletişim ve Finans Direktörü
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/tuana-yucedag`
- Kanıt:
  - ✅ **COMPEC deneyimi + dönem** — profil deneyim snippet'i: *"Tuana Yücedağ — Bogazici
    University Graduate ... **Tem 2024 - Haz 2025, 1 yıl · Compec - ...**"* → tam olarak
    2024-25 dönemi
  - ✅ **Boğaziçi eğitimi** — *"Bogazici University Graduate"*
  - ✅ **Gönderide anchor eşlemesi** — Sema Aydın'ın 28 Tem 2024 tarihli COMPEC yönetim
    gönderisinin yorumcusu: `{href: .../in/tuana-yucedag, text: "Tuana Yücedağ"}`
  - ✅ LinkedIn dizin snippet'i: *"200+ 'Yücedağ' profili ... Istanbul. Compec - Boğaziçi
    Üniversitesi Bilişim Kulübü, +3 more"*

### Hüseyin Emir Akdağ — Ar-Ge Direktörü
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/huseyinemirakdag`
- Kanıt (üç ölçüt tek snippet'te — en temiz eşleşmelerden biri):
  - ✅ **Boğaziçi eğitimi** — *"Hüseyin Emir Akdağ — Boğaziçi Üniversitesi eğitim kurumunda öğrenci"*
  - ✅ **COMPEC deneyimi** — *"Compec - Boğaziçi Üniversitesi Bilişim Kulübü. 2 yıl 4 ay."*
  - ✅ **Görev örtüşüyor** — aynı satırda: *"**DevTeam & AR-GE Direktörü**"*
- Not: `veri.md`'ye göre **portresi yok**; site için baş harf monogramı önerisi geçerliliğini koruyor.

### Oğuz Özer — Dijital Girişimcilik Direktörü
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/o%C4%9Fuz-%C3%B6zer-865095247`
  (okunabilir hâli: `tr.linkedin.com/in/oğuz-özer-865095247` — **HTML'e encode edilmiş hâlini koyun**)
- Kanıt:
  - ✅ **Boğaziçi eğitimi** — profil başlığı: *"Oğuz Özer — Bogazici University / Computer Engineering"*
  - ✅ **COMPEC deneyimi + dönem** — *"**Board Member. Compec - Boğaziçi Üniversitesi Bilişim
    Kulübü. Haz 2023 - May 2025**"* → 2024-25 dönemini kapsıyor
- ⚠️ **Karışma riski yüksek:** "Oğuz Özer" çok yaygın; avukat/akademisyen/futbolcu adaşları var.
  Yalnızca yukarıdaki sayısal sonekli adres doğrulanmıştır.

### Hasan Deveci — Boğaziçi Bilişim Ödülleri ve Blockchain Direktörü
- **Durum: KESIN**
- **URL:** `https://tr.linkedin.com/in/hasancandeveci0hd`
- Kanıt:
  - ✅ **COMPEC deneyimi + görev birebir** — profil snippet'i: *"Hasancan Deveci — Management
    Trainee @Mondelez International ... Compec - Boğaziçi Üniversitesi Bilişim Kulübü ·
    **Bogazici IT Rewards & Blockchain Board Member**"* → "BBÖ ve Blockchain Direktörü" ile birebir
  - ✅ **Boğaziçi eğitimi** — profil özeti: *"I have graduated from Boğaziçi University,
    International Trade Department."*
  - ✅ **Gönderide anchor eşlemesi** — Sema Aydın'ın Tem 2024 COMPEC gönderisinde yorumcu:
    `{href: .../in/hasancandeveci0hd, text: "Hasancan Deveci"}`; Mert Gökyar'ın başkanlık
    gönderisinde de yorumcu
- ⚠️ **İSİM FARKI — karar gerekiyor:** LinkedIn'de adı **"Hasancan Deveci"**, sitede/`veri.md`'de
  **"Hasan Deveci"**. Kanıtlar aynı kişi olduğunu gösteriyor (Compec BBÖ & Blockchain görevi
  birebir). Sitede hangi yazımın kullanılacağı **kulübe sorulmalı** — kişinin kendi tercih ettiği
  yazım LinkedIn'dekidir.

---

## Yan bulgular (LinkedIn görevi dışında ama siteye dokunuyor)

1. **`compec.org/hakkimizda`'daki tüm "LinkedIn" butonları ölü.** Hepsi `<a href="#">`.
   E-posta butonlarında gerçek `mailto:` var, LinkedIn butonlarında hiçbir URL yok — bu
   görevin varlık sebebi de bu. Yeni sitede ya gerçek URL koyun ya butonu koymayın.
2. **`linkedin.com/company/bouncompec` DOĞRULANDI.** `veri.md` bunu "teyit edilemedi" diye
   işaretlemişti. Sayfa gerçek: 6.057 takipçi, web sitesi `compec.org`, kuruluş 1994,
   adres "Boğaziçi Üniversitesi Güney Kampüsü Erkek Yurdu Binası 1. Kat", 70 çalışan/üye.
   Üstelik **kulübün kendi sitesinin (compec.org) footer'ı da tam olarak bu URL'ye link veriyor**
   (`https://linkedin.com/company/bouncompec`) — yani kaynak kulübün kendisi.
   ⚠️ `company/11467006` (sayısal ID) **doğrulanamadı**: giriş yapmadan 999 authwall veriyor,
   yönlendirmenin bouncompec'e gittiği teyit edilemedi. Sitede sayısal ID yerine
   **`linkedin.com/company/bouncompec`** kullanılması önerilir — bu adresin kulübe ait
   olduğu iki bağımsız kaynakla sabit.
3. **TechSummit 2026 = 17. baskı, kulübün kendi ağzından.** Şirket sayfasındaki gönderi:
   *"Bu yıl 17. kez düzenlenen TechSummit"*, 5 Nisan, Albert Long Hall, **Akbank ana sponsor**;
   konuşmacı şirketleri: Akbank, Ace Games, Allianz, HONOR, GIGABYTE, Softtech, IBM, Hepsiburada.
   `veri.md` "17. kez yazma, çıkarım" diyordu — **artık çıkarım değil, kulübün kendi beyanı.**
4. **Rol tanımlarında sitedeki ile LinkedIn'deki liste çelişiyor.** Kulübün şirket sayfası
   Ali Saffan Kökoğlu'nu ayrıca "Oyun Geliştirme Direktörü", Taha Kuter Sancak'ı da "PR
   Direktörü" olarak sayıyor — compec.org'daki görev dağılımıyla tam örtüşmüyor. Sitede
   compec.org'daki resmî unvanları kullanın; bu fark kulübe sorulabilir.
