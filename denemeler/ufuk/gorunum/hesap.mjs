import { html, ham } from '../lib/sablon.mjs';
import { duzen, u } from './duzen.mjs';
import { IZINLI_ALANLAR } from '../lib/guvenlik.mjs';

const csrfAlan = (t) => html`<input type="hidden" name="_csrf" value="${t}">`;
const uyari = (m, tur) => (m ? html`<div class="uyari ${tur || ''}">${m}</div>` : '');

/* ============================ GİRİŞ ============================ */
export function giris({ kisi, hata, bilgi, csrf, eposta }) {
  const icerik = html`
<section class="bolum">
  <div class="kap">
    <div class="bas"><div><h2>Giriş</h2></div><div class="kunye">Üye hesabı</div></div>
    <form class="form" method="post" action="${u('/giris')}">
      ${csrfAlan(csrf)}
      ${uyari(hata, 'hata')}${uyari(bilgi, 'iyi')}
      <div class="alan">
        <label for="eposta">E-posta</label>
        <input id="eposta" name="eposta" type="email" required autocomplete="username"
               value="${eposta || ''}" autofocus>
      </div>
      <div class="alan">
        <label for="parola">Parola</label>
        <input id="parola" name="parola" type="password" required autocomplete="current-password">
      </div>
      <button class="dugme genis" type="submit">Giriş yap</button>
      <p class="mono" style="margin-top:18px">
        Hesabın yok mu? <a href="${u('/kayit')}">Üye ol</a>
      </p>
    </form>
  </div>
</section>`;
  return duzen({ baslik: 'Giriş', aciklama: 'COMPEC üye hesabına giriş.', etkin: '', kisi }, icerik);
}

/* ============================ KAYIT ============================ */
export function kayit({ kisi, hata, csrf, deger }) {
  const d = deger || {};
  const icerik = html`
<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Üye ol</h2>
        <p class="bas-alt">
          Üyelik ücretsiz ve bölüm şartı yok. Hesap açtıktan sonra yönetim
          onayıyla üye dizininde yerini alırsın.
        </p>
      </div>
      <div class="kunye">Boğaziçi öğrencileri</div>
    </div>

    <form class="form enli" method="post" action="${u('/kayit')}">
      ${csrfAlan(csrf)}
      ${uyari(hata, 'hata')}
      <div class="alan">
        <label for="ad">Ad ve soyad</label>
        <input id="ad" name="ad" required maxlength="80" value="${d.ad || ''}" autocomplete="name">
      </div>
      <div class="alan">
        <label for="eposta">Üniversite e-postası</label>
        <input id="eposta" name="eposta" type="email" required value="${d.eposta || ''}" autocomplete="username">
        <div class="ipucu">Yalnızca ${IZINLI_ALANLAR.join(' veya ')} uzantılı adresler kabul edilir.</div>
      </div>
      <div class="ikili">
        <div class="alan">
          <label for="bolum">Bölüm</label>
          <input id="bolum" name="bolum" maxlength="60" value="${d.bolum || ''}">
        </div>
        <div class="alan">
          <label for="giris_yili">Giriş yılı</label>
          <input id="giris_yili" name="giris_yili" type="number" min="1994" max="2030" value="${d.giris_yili || ''}">
        </div>
      </div>
      <div class="alan">
        <label for="linkedin">LinkedIn adresi</label>
        <input id="linkedin" name="linkedin" value="${d.linkedin || ''}" placeholder="linkedin.com/in/kullanici-adin">
        <div class="ipucu">İsteğe bağlı. Dizinde profiline bağlantı olarak görünür.</div>
      </div>
      <div class="alan">
        <label for="parola">Parola</label>
        <input id="parola" name="parola" type="password" required minlength="10" autocomplete="new-password">
        <div class="ipucu">En az 10 karakter.</div>
      </div>
      <button class="dugme genis" type="submit">Hesap aç</button>
      <p class="mono" style="margin-top:18px">
        Hesabın var mı? <a href="${u('/giris')}">Giriş yap</a>
      </p>
    </form>
  </div>
</section>`;
  return duzen({ baslik: 'Üye ol', aciklama: 'COMPEC üyelik başvurusu.', etkin: '', kisi }, icerik);
}

/* ============================ PANEL ============================ */
export function panel({ kisi, hata, bilgi, csrf }) {
  const k = kisi;
  const yetkili = k.rol === 'admin' || k.rol === 'yonetim';
  const icerik = html`
<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div><h2>Hesabım</h2></div>
      <div class="kunye">${k.durum === 'onayli' ? 'Onaylı üye' : 'Onay bekliyor'}</div>
    </div>

    <div class="panel-izgara">
      <nav class="panel-yon">
        <a class="etkin" href="${u('/panel')}">Profil</a>
        ${yetkili ? html`<a href="${u('/panel/yonetim')}">Üye yönetimi</a>
        <a href="${u('/panel/yonetim/oylar')}">Site oyları</a>` : ''}
        <a href="${u('/uye/' + k.slug)}">Genel görünüm</a>
        <a href="${u('/cikis')}">Çıkış</a>
      </nav>

      <div>
        ${uyari(hata, 'hata')}${uyari(bilgi, 'iyi')}
        ${k.durum !== 'onayli'
          ? html`<div class="uyari">
              Hesabın yönetim onayı bekliyor. Onaylanana kadar üye dizininde görünmezsin.
            </div>`
          : ''}

        <form class="form enli" method="post" action="${u('/panel')}">
          ${csrfAlan(csrf)}
          <div class="alan">
            <label for="ad">Ad ve soyad</label>
            <input id="ad" name="ad" required maxlength="80" value="${k.ad}">
          </div>
          <div class="ikili">
            <div class="alan">
              <label for="bolum">Bölüm</label>
              <input id="bolum" name="bolum" maxlength="60" value="${k.bolum || ''}">
            </div>
            <div class="alan">
              <label for="giris_yili">Giriş yılı</label>
              <input id="giris_yili" name="giris_yili" type="number" min="1994" max="2030" value="${k.giris_yili || ''}">
            </div>
          </div>
          <div class="alan">
            <label for="kurul">Alt kurul</label>
            <select id="kurul" name="kurul">
              ${['', 'Teknoloji', 'DevTeam', 'PR', 'Kurumsal İletişim', 'İç İletişim',
                 'Boğaziçi Bilişim Ödülleri', 'Dijital Girişimcilik'].map((s) => html`
                <option value="${s}"${ham(k.kurul === s ? ' selected' : '')}>${s || 'Seçilmedi'}</option>`)}
            </select>
          </div>
          <div class="ikili">
            <div class="alan">
              <label for="linkedin">LinkedIn</label>
              <input id="linkedin" name="linkedin" value="${k.linkedin || ''}" placeholder="linkedin.com/in/...">
            </div>
            <div class="alan">
              <label for="github">GitHub</label>
              <input id="github" name="github" value="${k.github || ''}" placeholder="github.com/...">
            </div>
          </div>
          <div class="alan">
            <label for="hakkinda">Kısa tanıtım</label>
            <textarea id="hakkinda" name="hakkinda" maxlength="400">${k.hakkinda || ''}</textarea>
            <div class="ipucu">En fazla 400 karakter. Dizindeki profilinde görünür.</div>
          </div>
          <div class="alan">
            <label>
              <input type="checkbox" name="goster" value="1"${ham(k.goster ? ' checked' : '')}
                     style="width:auto;margin-right:8px">
              Üye dizininde görünmek istiyorum
            </label>
          </div>
          <button class="dugme" type="submit">Kaydet</button>
        </form>

        <div class="bas" style="margin-top:52px"><div><h2 style="font-size:24px">Parola</h2></div></div>
        <form class="form" method="post" action="${u('/panel/parola')}">
          ${csrfAlan(csrf)}
          <div class="alan">
            <label for="eski">Mevcut parola</label>
            <input id="eski" name="eski" type="password" required autocomplete="current-password">
          </div>
          <div class="alan">
            <label for="yeni">Yeni parola</label>
            <input id="yeni" name="yeni" type="password" required minlength="10" autocomplete="new-password">
          </div>
          <button class="dugme sade" type="submit">Parolayı değiştir</button>
        </form>
      </div>
    </div>
  </div>
</section>`;
  return duzen({ baslik: 'Hesabım', aciklama: '', etkin: '', kisi }, icerik);
}

/* ============================ YÖNETİM ============================ */
export function yonetim({ kisi, bekleyen, tumu, csrf, bilgi }) {
  const icerik = html`
<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div><h2>Üye yönetimi</h2></div>
      <div class="kunye">${bekleyen.length} onay bekliyor</div>
    </div>

    <div class="panel-izgara">
      <nav class="panel-yon">
        <a href="${u('/panel')}">Profil</a>
        <a class="etkin" href="${u('/panel/yonetim')}">Üye yönetimi</a>
        <a href="${u('/panel/yonetim/oylar')}">Site oyları</a>
        <a href="${u('/cikis')}">Çıkış</a>
      </nav>

      <div>
        ${uyari(bilgi, 'iyi')}

        <h3 style="font-size:20px;margin-bottom:14px">Onay bekleyenler</h3>
        ${bekleyen.length === 0
          ? html`<p style="color:var(--metin-2);margin-bottom:40px">Bekleyen başvuru yok.</p>`
          : html`<div class="tablo-sar" style="margin-bottom:44px"><table class="tablo">
              <thead><tr><th>Ad</th><th>E-posta</th><th>Bölüm</th><th>İşlem</th></tr></thead>
              <tbody>
                ${bekleyen.map((b) => html`
                  <tr>
                    <td><b>${b.ad}</b></td>
                    <td class="mono">${b.eposta}</td>
                    <td>${b.bolum || ''} ${b.giris_yili || ''}</td>
                    <td>
                      <form method="post" action="${u('/panel/yonetim/durum')}">
                        ${csrfAlan(csrf)}
                        <input type="hidden" name="id" value="${b.id}">
                        <button name="durum" value="onayli" type="submit">Onayla</button>
                        <button name="durum" value="pasif" type="submit">Reddet</button>
                      </form>
                    </td>
                  </tr>`)}
              </tbody>
            </table></div>`}

        <h3 style="font-size:20px;margin-bottom:6px">Dizin kayıtları</h3>
        <p class="mono" style="margin-bottom:16px">
          Arşivden gelen kayıtların LinkedIn adresi boş. Doğrulanmış adresi olanı
          buradan girebilirsin; tahmin yürütme.
        </p>
        <div class="tablo-sar"><table class="tablo">
          <thead><tr><th>Ad</th><th>Görev</th><th>LinkedIn</th><th></th></tr></thead>
          <tbody>
            ${tumu.map((t) => html`
              <tr>
                <td><a href="${u('/uye/' + t.slug)}">${t.ad}</a><br><span class="mono">${t.donem || ''}</span></td>
                <td style="max-width:230px">${t.gorev || ''}</td>
                <td colspan="2">
                  <form method="post" action="${u('/panel/yonetim/baglanti')}" style="display:flex;gap:8px">
                    ${csrfAlan(csrf)}
                    <input type="hidden" name="id" value="${t.id}">
                    <input name="linkedin" value="${t.linkedin || ''}" placeholder="linkedin.com/in/..."
                           style="flex:1;font-family:var(--mono);font-size:12.5px;padding:6px 9px;border:1px solid var(--cizgi-2);border-radius:3px">
                    <button type="submit">Kaydet</button>
                  </form>
                </td>
              </tr>`)}
          </tbody>
        </table></div>
      </div>
    </div>
  </div>
</section>`;
  return duzen({ baslik: 'Üye yönetimi', aciklama: '', etkin: '', kisi }, icerik);
}

/* ============================ HATA ============================ */
export function hataSayfasi({ kisi, kod, mesaj }) {
  const icerik = html`
<section class="bolum">
  <div class="kap dar">
    <p class="mono">${kod}</p>
    <h1 style="font-size:clamp(30px,4vw,44px);margin-top:8px">${mesaj}</h1>
    <p style="margin-top:18px"><a href="${u('/')}">Ana sayfaya dön</a></p>
  </div>
</section>`;
  return duzen({ baslik: String(kod), aciklama: '', etkin: '', kisi }, icerik);
}

/* ============================ OYLAR (yönetim) ============================ */
export function oylarSayfasi({ kisi, ozet, oylar }) {
  const kisalt = (m, n) => (m && m.length > n ? m.slice(0, n) + '…' : m || '');
  const zaman = (ms) => new Date(ms).toISOString().slice(0, 16).replace('T', ' ');

  const icerik = html`
<section class="bolum">
  <div class="kap">
    <div class="bas">
      <div>
        <h2>Site oyları</h2>
        <p class="bas-alt">
          Hub sayfasındaki beğen ve beğenme oyları. Her satır bir ziyaretçinin
          bir sürüme verdiği oydur; aynı çerez tekrar oy verirse kaydı güncellenir.
        </p>
      </div>
      <div class="kunye">${oylar.length} kayıt</div>
    </div>

    <div class="panel-izgara">
      <nav class="panel-yon">
        <a href="${u('/panel')}">Profil</a>
        <a href="${u('/panel/yonetim')}">Üye yönetimi</a>
        <a class="etkin" href="${u('/panel/yonetim/oylar')}">Site oyları</a>
        <a href="${u('/cikis')}">Çıkış</a>
      </nav>

      <div>
        <h3 style="font-size:20px;margin-bottom:14px">Özet</h3>
        ${ozet.length === 0
          ? html`<p style="color:var(--metin-2)">Henüz oy verilmemiş.</p>`
          : html`<table class="tablo" style="margin-bottom:44px">
              <thead><tr><th>Sürüm</th><th>Beğeni</th><th>Beğenmeme</th><th>Toplam</th><th>Net</th></tr></thead>
              <tbody>
                ${ozet.map((o) => html`
                  <tr>
                    <td><b>${o.surum}</b></td>
                    <td>${o.begeni}</td>
                    <td>${o.begenmeme}</td>
                    <td>${o.toplam}</td>
                    <td><b style="color:${o.begeni - o.begenmeme >= 0 ? 'var(--mavi-koyu)' : '#B4342A'}">${o.begeni - o.begenmeme > 0 ? '+' : ''}${o.begeni - o.begenmeme}</b></td>
                  </tr>`)}
              </tbody>
            </table>`}

        <h3 style="font-size:20px;margin-bottom:6px">Oy dökümü</h3>
        <p class="mono" style="margin-bottom:16px">
          Ayırt edici veriler: çerez kimliği, IP, tarayıcı, dil, ekran, saat dilimi,
          platform ve istemci parmak izi.
        </p>
        <div style="overflow-x:auto">
          <table class="tablo" style="min-width:1000px">
            <thead>
              <tr>
                <th>Zaman</th><th>Sürüm</th><th>Oy</th><th>Çerez</th><th>IP</th>
                <th>Parmak izi</th><th>Ekran</th><th>Saat dilimi</th><th>Dil</th><th>Tarayıcı</th>
              </tr>
            </thead>
            <tbody>
              ${oylar.map((o) => html`
                <tr>
                  <td class="mono">${zaman(o.zaman)}</td>
                  <td><b>${o.surum}</b></td>
                  <td style="color:${o.oy === 1 ? 'var(--mavi-koyu)' : '#B4342A'}"><b>${o.oy === 1 ? 'beğendi' : 'beğenmedi'}</b></td>
                  <td class="mono">${kisalt(o.cerez, 10)}</td>
                  <td class="mono">${o.ip || ''}</td>
                  <td class="mono">${kisalt(o.parmak_izi, 12)}</td>
                  <td class="mono">${o.ekran || ''}</td>
                  <td class="mono">${o.saat_dilimi || ''}</td>
                  <td class="mono">${kisalt(o.dil, 14)}</td>
                  <td class="mono" style="max-width:200px">${kisalt(o.tarayici, 46)}</td>
                </tr>`)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>`;
  return duzen({ baslik: 'Site oyları', aciklama: '', etkin: '', kisi }, icerik);
}
