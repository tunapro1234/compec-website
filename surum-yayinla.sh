#!/bin/bash
# COMPEC surum yayinlama: node uygulamasini systemd servisi + nginx proxy olarak yayina alir.
# Kullanim: ./surum-yayinla.sh <vN> <klasor-adi> <port>
#   ornek : ./surum-yayinla.sh v5 sabah 8415
# Yaptigi: env dosyasi (yeni COMPEC_GIZLI) -> systemd unit -> elle kosan sureci devral ->
#          nginx location ^~ /website/<vN>/ (onek soyulmaz) -> dogrulama.
set -euo pipefail
V="${1:?surum (orn v5)}"; KLASOR="${2:?klasor adi (orn sabah)}"; PORT="${3:?port (orn 8415)}"
DIR="/srv/compec/site/denemeler/$KLASOR"
CONF="/etc/nginx/sites-available/tunapro.xyz.conf"
[ -d "$DIR" ] || { echo "HATA: $DIR yok"; exit 1; }
[[ "$V" =~ ^v[0-9]+$ ]] || { echo "HATA: surum vN formatinda olmali"; exit 1; }

# 1) env
cat > "/etc/compec-$V.env" <<ENV
TEMEL_YOL=/website/$V
PORT=$PORT
COMPEC_GIZLI=$(openssl rand -hex 32)
GUVENLI_CEREZ=1
NODE_ENV=production
ENV
chmod 600 "/etc/compec-$V.env"

# 2) systemd unit (root: paylasimli SQLite izinleri icin sart)
cat > "/etc/systemd/system/compec-$V.service" <<UNIT
[Unit]
Description=COMPEC site $V ($KLASOR) — node/express, /website/$V altinda proxy'lenir
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=$DIR
Environment=HOME=/root
EnvironmentFile=/etc/compec-$V.env
ExecStart=/usr/bin/node sunucu.mjs
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
UNIT

# 3) elle kosan sureci devral
PID=$(ss -lptnH "sport = :$PORT" 2>/dev/null | grep -oP 'pid=\K[0-9]+' | head -1 || true)
[ -n "${PID:-}" ] && { kill "$PID" 2>/dev/null || true; sleep 2; echo "elle kosan surec devralindi (pid $PID)"; }
systemctl daemon-reload && systemctl enable --now "compec-$V.service" >/dev/null
sleep 3
systemctl is-active --quiet "compec-$V.service" || { echo "HATA: servis kalkmadi"; journalctl -u "compec-$V" -n 20 --no-pager; exit 1; }

# 4) nginx location (zaten varsa atla)
if ! grep -q "location ^~ /website/$V/" "$CONF"; then
python3 - "$CONF" "$V" "$PORT" <<'PY'
import sys
conf, v, port = sys.argv[1], sys.argv[2], sys.argv[3]
s = open(conf).read()
anchor = '    location ~ ^/website/(v[0-9]+)/(.*)$ {'
block = f'''    # {v}: node uygulamasi (compec-{v}.service, 127.0.0.1:{port})
    location ^~ /website/{v}/ {{
        auth_basic off;
        proxy_pass http://127.0.0.1:{port};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }}

'''
i = s.find('server_name compec.tunapro.xyz'); j = s.find(anchor, i)
open(conf, 'w').write(s[:j] + block + s[j:])
PY
nginx -t >/dev/null 2>&1 || { echo "HATA: nginx testi basarisiz, degisikligi geri al"; exit 1; }
systemctl reload nginx
fi

# 5) dogrulama (port sahibi GERCEKTEN systemd mi — elle kosan kopya kalmadi mi)
sleep 3
OWN=$(ss -lptnH "sport = :$PORT" 2>/dev/null | grep -oP 'pid=\K[0-9]+' | head -1 || true)
MAIN=$(systemctl show "compec-$V" -p MainPID --value)
if [ "${OWN:-x}" != "$MAIN" ]; then
  echo "UYARI: port $PORT sahibi ($OWN) systemd MainPID ($MAIN) DEGIL — elle kosan bir kopya var."
  echo "       Servis surekli restart eder. Duzeltme: kill $OWN && systemctl restart compec-$V"
  exit 1
fi
L=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT/website/$V/")
P=$(curl -s -o /dev/null -w '%{http_code}' "https://compec.tunapro.xyz/website/$V/")
echo "lokal:$L  public:$P  servis:$(systemctl is-active compec-$V)"
[ "$P" = "200" ] && echo "✓ /website/$V yayinda" || { echo "UYARI: public 200 degil"; exit 1; }
