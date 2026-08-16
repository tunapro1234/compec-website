/* Bir hesabi yonetici yapar:  node yonetici.mjs <eposta> [admin|yonetim|uye] */
import { db } from './lib/db.mjs';
const [, , eposta, rol = 'admin'] = process.argv;
if (!eposta) { console.error('kullanim: node yonetici.mjs <eposta> [admin|yonetim|uye]'); process.exit(1); }
const s = db.prepare("UPDATE kisiler SET rol=?, durum='onayli' WHERE eposta=?").run(rol, eposta.toLowerCase());
console.log(s.changes ? `${eposta} -> ${rol} (onayli)` : `bulunamadi: ${eposta}`);
