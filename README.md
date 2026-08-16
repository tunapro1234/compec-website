# compec-website

Boğaziçi Üniversitesi Bilişim Kulübü (COMPEC) için hazırlanan web sitesi tasarım
denemeleri. Bu bir çalışma deposudur: kulübün resmî sitesi değildir ve henüz kulüp
tarafından onaylanmamıştır.

Canlı önizleme: <https://compec.tunapro.xyz/website/>

## Sürümler

Yedi ayrı tasarım denemesi var. Hepsi aynı içeriği gösterir, ayrıldıkları yer
görsel dil ve anlatım biçimidir. Hangisiyle devam edileceğine kulüp karar verecek.

| Sürüm | Klasör | Karakter | Tema | Port |
|---|---|---|---|---|
| v1 | `denemeler/mavi/` | Tek sayfa, ilk deneme | Koyu | statik |
| v2 | `denemeler/matbaa/` | Çok sayfalı, hesap sistemi buradan başladı | Açık | 8412 |
| v3 | `denemeler/gece/` | Fotoğraf önderliğinde, koyu mavi | Koyu | 8413 |
| v4 | `denemeler/kanit/` | Veri önderliğinde, her rakamın kaynağı görünür | Koyu | 8414 |
| v5 | `denemeler/isik/` | v4'ün açık temalı karşılığı | Açık | 8415 |
| v6 | `denemeler/oyun/` | Afiş dili, piksel tipografi | Koyu | 8416 |
| v7 | `denemeler/ufuk/` | v3'ün görsel dili + v4'ün kanıt derinliği | Koyu | 8417 |

Geri bildirime göre en çok beğenilen v3 oldu, v7 de onun üzerine kuruldu:
görünüm şablonları v4'ten, görsel dil v3'ten alındı. v7'ye özel olanlar:
1994-2026 zaman çizelgesi, dört kayıt kümesini toplayan `/arsiv` sayfası,
altında kaynağı yazan rakam şeridi ve ödül seçkisi.

v7 şu an bilerek hub listesinde değil (`surumler/v7` symlink'i yok).

## Çalıştırma

Klonla ve başlat, başka adım yok. Node.js 18 veya üstü yeterli:

```bash
git clone https://github.com/tunapro1234/compec-website.git
cd compec-website
npm start
```

Açılan adres: <http://127.0.0.1:8417> (v7). Başka sürüm ve port için:

```bash
npm start v3          # v3, kendi varsayılan portunda
npm start v3 4000     # v3, 4000 portunda
npm start --help      # sürüm listesi
```

`npm start` gereken her şeyi kendi yapar: o sürümün bağımlılıklarını kurar,
tohum dosyalarını doğru sırayla çalıştırır ve sunucuyu yerel ayarlarla açar
(kök dizinden servis, çerez güvenli değil, sabit oturum anahtarı). Yayındaki
kurulumla karıştırmamak için: sunucuda site `/website/vN` öneki altında
çalışır, yerelde kök dizinden.

Elle çalıştırmak istersen tek tek de yapılabilir, ama tohum sırası önemlidir:
önce `tohum.mjs`, sonra varsa `tohum-kanit.mjs`, `tohum-oduller.mjs`,
`tohum-v7.mjs`. Hepsi tekrar çalıştırılabilir, aynı sonucu üretir.

| Ortam değişkeni | Varsayılan | Açıklama |
|---|---|---|
| `TEMEL_YOL` | boş | Uygulamanın altında çalışacağı yol öneki |
| `PORT` | `8412` | Dinlenecek port (yalnızca 127.0.0.1) |
| `COMPEC_GIZLI` | rastgele | CSRF için gizli anahtar, sabit olmalı |
| `GUVENLI_CEREZ` | `1` | HTTPS arkasında değilse `0` yap |
| `POSTHOG_ANAHTAR` | gömülü | PostHog proje anahtarı (tarayıcıya giden açık anahtar) |

Yönetici hesabı açmak için: `node yonetici.mjs <eposta> admin`

Sunucuda her sürüm `compec-vN.service` olarak systemd altında çalışır ve nginx
`location ^~ /website/vN/` ile proxy'lenir. Yeni sürüm yayınlamak için
`./surum-yayinla.sh <vN> <klasor> <port>`.

## Katkı verecekler için bilinmesi gerekenler

Bunlar kodu okuyunca anlaşılmayan, ama bilinmezse hata üretilen şeyler:

**Veritabanı paylaşılıyor.** Fiziksel dosya `denemeler/matbaa/veri/compec.db`,
diğer sürümlerin `veri` klasörü oraya symlink. Yani bir sürümde yaptığın veri
değişikliği hepsini etkiler. Sürüme özel veriyi sürüme özel tabloda tut:
örnek olarak v7 etkinlik fotoğraflarını `v7_fotolar` tablosunda tutuyor, çünkü
paylaşılan `etkinlikler.foto` kolonuna yazınca diğer sürümlerde 404 üretiyordu.

**Hub oylaması v2'ye bağlı.** `oylama.js` parçacığı ve oy API'si v2 üzerinden
sunuluyor. v2 kapatılırsa hub'ın oylaması ve sıralaması düşer. Sürümden bağımsız
bir yola taşınması bekleyen iş.

**Ölçüm dosyası önbellek damgalı.** `genel/olcum.js` `?s=<sayı>` ile çağrılır.
Statik dosyalar yedi gün önbelleğe alındığı için, bu dosyanın davranışını
değiştirirsen damgayı da artır; yoksa düzeltme mevcut ziyaretçilere ulaşmaz.

**Uzun tire kullanılmaz.** Metinlerde ve yorumlarda uzun tire (em dash) yasak,
kullanıcı kuralı.

**Doğrulama etiketleri yalnızca istisnalar için.** "doğrulanmış" çipi basılmaz,
çünkü kayıtların neredeyse tamamı doğrulanmış ve etiket bilgi taşımıyordu.
Yalnızca `çıkarım`, `kulüp içi` ve `eksik` işaretlenir.

## İçerik kuralı

Sitedeki her olgu doğrulanmış kaynaklara dayanır; kaynak listesi `icerik/veri.md`
dosyasındadır. Uydurma konuşmacı, boş sponsor kutusu, hayalî program akışı veya
teyit edilmemiş bağlantı **yoktur**. Doğrulanamayan bilgi siteye konmaz, bölüm
boş bırakılır.

Rakamlar oldukları gibi etiketlenir: Kommunity üzerinden alınan sayılar
"katılımcı" değil "kayıt" olarak yazılır.

Fotoğraflarda da aynı kural geçerli: bir kare "salon doluydu" mesajını
desteklemiyorsa o iddia için kullanılmaz. Tanınabilir çocuk yüzü içeren kareler
veli izni olmadığı için depoya alınmadı.

## Marka

Renkler kulübün kendi logosundan piksel örneklemesiyle çıkarılmıştır:

| | hex | hsl |
|---|---|---|
| Ana mavi | `#1A5EAA` | `hsl(212, 73%, 38%)` |
| Koyu | `#164F91` | `hsl(212, 74%, 33%)` |
| Açık | `#1C64B8` | `hsl(212, 74%, 42%)` |

Logonun vektör sürümü elimizde yok. `denemeler/*/varliklar/logo/` altındakiler,
kulübün yayımladığı 1080 piksellik görselden alfa maskesiyle çıkarılmış PNG'lerdir.

Yazı tipleri kendi sunucumuzdan gelir, Google Fonts'a istek gitmez.

## Depoda bilerek bulunmayanlar

- `node_modules/` ve SQLite veritabanı dosyaları. Veritabanı üye hesapları,
  oturum jetonları ve IP içeren oy kayıtları barındırdığı için dışarıda tutuldu.
- `reference/mevcut-site/` altındaki arşiv kopyalarında kişisel e-posta adresleri
  maskelenmiştir.

## Uyarı

Oylama sistemi ayırt edici veri toplar: çerez kimliği, IP adresi, cihaz özellikleri
ve tarayıcı parmak izi. Bunlar KVKK kapsamında kişisel veridir. Sistem `compec.org`
gibi bir üretim ortamına taşınacaksa aydınlatma metni ve açık rıza akışı eklenmelidir.
