#!/usr/bin/env node
/* Tek komutla yerel çalıştırma.
 *
 *   npm start          -> v7 (en güncel sürüm)
 *   npm start v3       -> v3
 *   npm start v3 4000  -> v3, 4000 portunda
 *
 * Neden bu dosya var: bir arkadaşımız depoyu klonlayıp siteyi kendi
 * bilgisayarında başlatamadı. Sebebi tek tek şunlardı ve hepsi burada
 * hallediliyor, kimse elle uğraşmasın:
 *   1. Her sürümün kendi klasöründe ayrı npm kurulumu gerekiyor.
 *   2. Sunucudan önce tohum dosyalarının DOĞRU SIRAYLA çalışması gerekiyor
 *      (önce tohum.mjs, sonra ek tohumlar).
 *   3. TEMEL_YOL verilmezse site kök dizinden servis edilir; yayında
 *      /website/vN önekiyle çalıştığı için bu ayrım kafa karıştırıyordu.
 *   4. GUVENLI_CEREZ varsayılan olarak 1; düz http://localhost üzerinde
 *      güvenli çerez tarayıcıya yazılmaz ve giriş yapılamaz. Yerelde 0 olmalı.
 *   5. COMPEC_GIZLI sabit değilse her başlatmada oturumlar düşer.
 *
 * Harici bağımlılığı yok, sadece Node.js gerekir (18 ve üstü).
 */

import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readdirSync, createReadStream, statSync } from 'node:fs';
import { dirname, join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';

const kok = dirname(fileURLToPath(import.meta.url));

/* Sürüm -> klasör ve yayındaki port. Yerelde port serbest, bu değerler
   yalnızca varsayılan; ikinci argümanla değiştirilebilir. */
const SURUMLER = {
  v1: { klasor: 'mavi',   port: 8411, statik: true,  ad: 'ilk deneme, tek sayfa' },
  v2: { klasor: 'matbaa', port: 8412, ad: 'açık tema, hesap sistemi buradan başladı' },
  v3: { klasor: 'gece',   port: 8413, ad: 'fotoğraf önderliğinde, koyu mavi' },
  v4: { klasor: 'kanit',  port: 8414, ad: 'veri önderliğinde, her rakamın kaynağı görünür' },
  v5: { klasor: 'isik',   port: 8415, ad: "v4'ün açık temalı karşılığı" },
  v6: { klasor: 'oyun',   port: 8416, ad: 'afiş dili, piksel tipografi' },
  v7: { klasor: 'ufuk',   port: 8417, ad: "v3'ün görsel dili + v4'ün kanıt derinliği" },
};

/* Tohumların çalışma sırası. tohum.mjs tabloları ve temel kayıtları kurar,
   diğerleri onun üstüne yazar; sıra bozulursa boş sayfa çıkar. */
const TOHUM_SIRASI = ['tohum.mjs', 'tohum-kanit.mjs', 'tohum-oduller.mjs', 'tohum-v7.mjs'];

const NPM = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function yardim() {
  console.log('\nCOMPEC site denemeleri, yerel çalıştırma\n');
  console.log('  npm start [sürüm] [port]\n');
  for (const [s, v] of Object.entries(SURUMLER)) {
    console.log(`  ${s}  ${String(v.port).padEnd(6)} ${v.klasor.padEnd(8)} ${v.ad}`);
  }
  console.log('\nÖrnek:  npm start v3      ·  npm start v7 4000\n');
}

const arg = process.argv.slice(2);
if (arg.includes('-h') || arg.includes('--help')) { yardim(); process.exit(0); }

const istenen = (arg[0] || 'v7').toLowerCase().replace(/^v?/, 'v');
const surum = SURUMLER[istenen];
if (!surum) {
  console.error(`\nBöyle bir sürüm yok: ${arg[0]}`);
  yardim();
  process.exit(1);
}
const port = Number(arg[1]) || surum.port;
const dizin = join(kok, 'denemeler', surum.klasor);

if (!existsSync(dizin)) {
  console.error(`Klasör bulunamadı: ${dizin}`);
  process.exit(1);
}

/* Node sürümü: better-sqlite3 ve Express 5 için 18 altı yetmiyor. */
const nodeAna = Number(process.versions.node.split('.')[0]);
if (nodeAna < 18) {
  console.error(`Node.js ${process.versions.node} çok eski. En az 18 gerekiyor.`);
  process.exit(1);
}

console.log(`\nCOMPEC ${istenen} (${surum.klasor}) hazırlanıyor...\n`);

/* ---------------- v1: statik, sunucu uygulaması yok ---------------- */
if (surum.statik) {
  const TIP = {
    '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8', '.png': 'image/png',
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.json': 'application/json',
  };
  createServer((istek, cevap) => {
    // Yol geçişi (path traversal) engeli: istenen yol her zaman dizinin altında kalmalı.
    const temiz = normalize(decodeURIComponent(istek.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
    let dosya = join(dizin, temiz);
    if (!dosya.startsWith(dizin)) { cevap.writeHead(403).end('403'); return; }
    if (existsSync(dosya) && statSync(dosya).isDirectory()) dosya = join(dosya, 'index.html');
    if (!existsSync(dosya)) { cevap.writeHead(404).end('404'); return; }
    cevap.writeHead(200, { 'Content-Type': TIP[extname(dosya)] || 'application/octet-stream' });
    createReadStream(dosya).pipe(cevap);
  }).listen(port, '127.0.0.1', () => {
    console.log(`  v1 yayında:  http://127.0.0.1:${port}/\n  durdurmak için Ctrl-C\n`);
  });
} else {
  /* ---------------- v2-v7: node uygulaması ---------------- */

  // 1) bağımlılıklar
  if (!existsSync(join(dizin, 'node_modules'))) {
    console.log('  bağımlılıklar kuruluyor (ilk çalıştırmada bir kez)...');
    const kurulum = spawnSync(NPM, ['install', '--no-audit', '--no-fund'], {
      cwd: dizin, stdio: 'inherit', shell: process.platform === 'win32',
    });
    if (kurulum.status !== 0) {
      console.error('\n  npm install başarısız. Node.js kurulu mu, internet var mı?');
      process.exit(1);
    }
  } else {
    console.log('  bağımlılıklar zaten kurulu');
  }

  // 2) tohumlar, doğru sırayla. Hepsi tekrar çalıştırılabilir, aynı sonucu üretir.
  const tohumlar = TOHUM_SIRASI.filter((t) => existsSync(join(dizin, t)));
  const fazladan = readdirSync(dizin).filter((f) => /^tohum.*\.mjs$/.test(f) && !TOHUM_SIRASI.includes(f));
  if (fazladan.length) console.log(`  not: sırası tanımlı olmayan tohum var, atlandı: ${fazladan.join(', ')}`);

  for (const t of tohumlar) {
    const c = spawnSync(process.execPath, [t], { cwd: dizin, encoding: 'utf8' });
    if (c.status !== 0) {
      console.error(`\n  ${t} başarısız oldu:\n${c.stderr || c.stdout}`);
      process.exit(1);
    }
    console.log(`  ${t.padEnd(18)} tamam`);
  }

  // 3) sunucu. Yerel varsayılanlar: kök dizinden servis, çerez güvenli değil,
  //    gizli anahtar sabit (yoksa her başlatmada oturum düşer).
  const cevre = {
    ...process.env,
    PORT: String(port),
    TEMEL_YOL: process.env.TEMEL_YOL ?? '',
    GUVENLI_CEREZ: process.env.GUVENLI_CEREZ ?? '0',
    COMPEC_GIZLI: process.env.COMPEC_GIZLI ?? 'yerel-gelistirme-anahtari-degistirme-gerekmez',
  };

  console.log(`\n  açılıyor:  http://127.0.0.1:${port}/\n  durdurmak için Ctrl-C\n`);
  const s = spawn(process.execPath, ['sunucu.mjs'], { cwd: dizin, env: cevre, stdio: 'inherit' });
  s.on('exit', (kod) => process.exit(kod ?? 0));
  for (const sinyal of ['SIGINT', 'SIGTERM']) process.on(sinyal, () => s.kill(sinyal));
}
