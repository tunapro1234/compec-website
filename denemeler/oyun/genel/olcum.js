/* PostHog olcumu.
   Resmi PostHog snippet'i (asagidaki tek satirlik blok) + kendi yapilandirmamiz.
   array.js'i dogrudan <script src> ile yuklemek yerine snippet kullaniliyor:
   snippet, kutuphane inmeden once cagrilan capture/init isteklerini kuyruga alir;
   dogrudan yuklemede init calisiyor ama olaylar gonderilmiyordu.

   Gizlilik tercihleri:
   - person_profiles 'identified_only': giris yapmamis ziyaretci icin kisi profili olusturulmaz.
   - Oturum kaydi (session recording) KAPALI: ekran videosu toplanmiyor.
   - respect_dnt: tarayicida "Do Not Track" aciksa hic olcum yapilmaz.
   - sanitize_properties: e-posta benzeri her deger olaydan temizlenir.
   Ozel olay icin HTML'de: data-olcum="olay_adi" data-olcum-veri="serbest metin"

   DIKKAT, bu dosya "?s=<sayi>" damgasiyla cagriliyor (bkz. gorunum/duzen.mjs).
   Statik dosyalar 7 gun onbellege aliniyor (max-age=604800). Surum etiketi hatasini
   duzelttigimizde kaynak duzeldi ama daha once siteyi gezmis tarayicilar ESKI dosyayi
   calistirmaya devam etti: gercek trafikte v3/v4/v6 sayfalari haftalarca "v2-matbaa"
   etiketiyle geldi. Bu dosyanin davranisini degistirirsen damgayi da artir, yoksa
   duzeltme mevcut ziyaretcilere ULASMAZ. */
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

(function () {
  var c = window.COMPEC_OLCUM;
  if (!c || !c.anahtar) return;

  var EPOSTA = /[\w.+-]+@[\w-]+\.[\w.-]+/g;

  /* Bulunulan sürümün etiketi. Yapılandırmadan gelir, gelmezse yoldan türetilir. */
  function surumEtiketi() {
    return c.surum || (location.pathname.match(/\/website\/(v[0-9]+)/) || [])[1] || 'bilinmiyor';
  }

  posthog.init(c.anahtar, {
    api_host: c.sunucu,
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    capture_heatmaps: true,
    disable_session_recording: true,
    respect_dnt: true,
    persistence: 'localStorage+cookie',
    sanitize_properties: function (ozellikler) {
      for (var a in ozellikler) {
        if (Object.prototype.hasOwnProperty.call(ozellikler, a) && typeof ozellikler[a] === 'string') {
          ozellikler[a] = ozellikler[a].replace(EPOSTA, '[eposta]');
        }
      }
      // Sürüm HER OLAYA burada yazılır. register() ile kalıcı süper özellik olarak
      // saklamak yanlıştı: tarayıcı bir sürümü gezdikten sonra o etiketi diğer
      // sürümlerde de taşıyordu. Sürüm sayfa başına değişir, olay başına yazılmalı.
      ozellikler.surum = surumEtiketi();
      return ozellikler;
    },
    loaded: function (ph) {
      if (c.kisi) ph.identify(c.kisi, { rol: c.rol || 'uye' });
      // Sürüm etiketi register() ile SAKLANMAZ, sanitize_properties içinde
      // her olaya yeniden yazılır. Bkz. yukarıdaki not.
    },
  });

  /* data-olcum tasiyan ogelerde tiklama */
  document.addEventListener('click', function (olay) {
    var oge = olay.target && olay.target.closest ? olay.target.closest('[data-olcum]') : null;
    if (!oge) return;
    var veri = { yer: location.pathname };
    if (oge.dataset.olcumVeri) veri.deger = oge.dataset.olcumVeri;
    posthog.capture(oge.dataset.olcum, veri);
  }, { passive: true });

  /* uye dizininden LinkedIn'e cikis */
  document.addEventListener('click', function (olay) {
    var a = olay.target && olay.target.closest ? olay.target.closest('a[href*="linkedin.com/in/"]') : null;
    if (a) posthog.capture('uye_linkedin_tikla', { yer: location.pathname });
  }, { passive: true });
})();
