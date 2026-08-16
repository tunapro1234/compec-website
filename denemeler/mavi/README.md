# Deneme: "mavi" — v1

COMPEC kulüp sitesi tasarım denemesi. **Hedef adres: `compec.tunapro.xyz/website/v1`**

## Ne
Tek sayfa, düz statik HTML/CSS/JS. Build adımı yok, framework yok, çalışma zamanı
bağımlılığı yok. Klasör **kendi kendine yeter** — olduğu gibi herhangi bir yola
kopyalanabilir, tüm yollar görecelidir (`varliklar/...`). Tek dış bağımlılık Google Fonts;
gerekirse fontlar yerelleştirilip o da kaldırılabilir.

```
index.html      tek sayfa
style.css       tüm stiller
varliklar/logo  logo (şeffaf PNG, 4 varyant)
varliklar/foto  optimize fotoğraflar (16 MB → 1.6 MB)
```

## Renkler — logodan ölçüldü, uydurma değil
Kulübün Kommunity/YouTube profilindeki 1080px logodan piksel örneklemesiyle çıkarıldı:

| | hex | hsl | logodaki pay |
|---|---|---|---|
| Ana mavi | `#1A5EAA` | `hsl(212, 73%, 38%)` | %61.7 |
| Koyu | `#164F91` | `hsl(212, 74%, 33%)` | %8.9 |
| Açık | `#1C64B8` | `hsl(212, 74%, 42%)` | %4.9 |

Tek renk tonu (212°), üç açıklık kademesi. `--mavi-300/200/100` bunlardan **türetilmiş**
arayüz tonlarıdır (koyu zeminde metin kontrastı için); marka rengi değildirler.
Hepsi `style.css` başındaki `:root` bloğunda — resmî marka kiti gelirse tek yerden değişir.

Logodaki dama deseni marka motifi olarak `.dama` sınıfında kullanıldı (mavi tonlu ve
seyrek; beyaz/gri olursa "şeffaflık ızgarası" gibi okunuyor).

## Logo
`varliklar/logo/` içindekiler, Kommunity'deki 1080px logodan alfa maskesiyle çıkarıldı
(mark + lockup, beyaz ve mavi). **Vektör değil** — resmî SVG kulüpten gelince
değiştirilmeli. Mevcut `compec.org`'daki mavi + siyah gölgeli logo bir önceki kuşak;
kulüp etkinliklerinde bu gölgesiz sürümü kullanıyor.

## İçerik kuralı
Sayfadaki **her olgu doğrulanmış**. Kaynak: `../../icerik/veri.md`.
Uydurma konuşmacı, boş sponsor kutusu, hayali program akışı, teyitsiz sosyal ikon **yok**.
Mevcut `compec.org`'un en büyük sorunu buydu (`/datacamp` sayfası hâlâ DeepMind/Google/
OpenAI çalışanı olarak var olmayan üç isim gösteriyor).

Rakamlar **"kayıt" olarak** etiketlendi, "katılımcı" değil — kaynak Kommunity RSVP sayısı.
Gelecek etkinlik tarihi yok, çünkü 2026-27 takvimi elimizde yok.

## Bilinçli eksikler
- **Sponsor logoları yok** — elimizde sadece isim var, logo dosyası yok. Gri placeholder
  kutu koymaktansa düz metin listesi tercih edildi.
- **Ekrem Ladikli'nin e-postası yok** — mevcut sitede de yoktu, uydurulmadı.
- **X / TikTok ikonu yok** — hesap URL'leri teyit edilemedi.
- **Alt sayfalar yok** — bu bir tasarım yönü denemesi; yön onaylanırsa etkinlik detay
  sayfaları, EN dili ve arşiv sayfası eklenir. Yapı i18n'e hazır kuruldu.

## Doğrulama
Playwright ile 1440px ve 390px'te ekran görüntüsü alındı; yatay taşma yok, konsol hatası
yok, kırık kaynak yok. Betikler: `/srv/browser/compec-shot.mjs`, `compec-bolge.mjs`.

Yerelde bakmak için:
```
cd /srv/compec/site && python3 -m http.server 8899 --bind 127.0.0.1
# http://127.0.0.1:8899/denemeler/mavi/
```

## Erişilebilirlik / performans notları
- `prefers-reduced-motion` destekli; JS çalışmazsa içerik görünür kalır (`html.js` koşulu).
- Giriş animasyonu IntersectionObserver yerine doğrudan konum ölçümüyle yapılıyor —
  IO hızlı kaydırmada geri bildirimi kaçırıp bölümleri boş bırakabiliyordu.
- Fotoğraflar `loading="lazy"`, hero `fetchpriority="high"`.
- Toplam sayfa ağırlığı ~1.7 MB (çoğu hero fotoğrafı).
