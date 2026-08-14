const analyticsConfig = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  privacyUrl: process.env.NEXT_PUBLIC_PRIVACY_URL,
};

function bootstrapAnalytics(config: typeof analyticsConfig) {
  const storageKey = "strongbear-consent-v1";
  const banner = document.getElementById("cookie-consent");
  const loadScript = (src: string) => {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  };
  const start = () => {
    const run = () => {
      if (config.gtmId) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
        loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.gtmId)}`);
      } else if (config.ga4Id) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
        window.gtag("js", new Date());
        window.gtag("config", config.ga4Id, { anonymize_ip: true });
        loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.ga4Id)}`);
      }
      if (config.metaPixelId) {
        window.fbq = window.fbq || function (...args: unknown[]) { window.fbq.queue.push(args); };
        window.fbq.queue = window.fbq.queue || [];
        window.fbq("init", config.metaPixelId);
        window.fbq("track", "PageView");
        loadScript("https://connect.facebook.net/fr_FR/fbevents.js");
      }
      document.addEventListener("click", (event) => {
        const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('[data-conversion="fighty"]') : null;
        if (!target) return;
        const detail = { event: "fighty_click", cta_label: target.dataset.ctaLabel || target.textContent?.trim() || "Fighty", page_path: window.location.pathname };
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(detail);
        if (config.ga4Id && window.gtag) window.gtag("event", "fighty_click", { cta_label: detail.cta_label, page_path: detail.page_path });
        if (config.metaPixelId && window.fbq) window.fbq("trackCustom", "FightyClick", { cta_label: detail.cta_label });
      }, { passive: true });
    };
    if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(run, { timeout: 2500 });
    else window.setTimeout(run, 1200);
  };
  const consent = window.localStorage.getItem(storageKey);
  if (consent === "granted") start();
  else if (!consent && banner) banner.hidden = false;
  document.getElementById("cookie-accept")?.addEventListener("click", () => {
    window.localStorage.setItem(storageKey, "granted");
    if (banner) banner.hidden = true;
    start();
  });
  document.getElementById("cookie-refuse")?.addEventListener("click", () => {
    window.localStorage.setItem(storageKey, "denied");
    if (banner) banner.hidden = true;
  });
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: ((...args: unknown[]) => void) & { queue: unknown[] };
  }
}

export function AnalyticsReady() {
  const hasTracker = Boolean(analyticsConfig.gtmId || analyticsConfig.ga4Id || analyticsConfig.metaPixelId);
  if (!hasTracker || !analyticsConfig.privacyUrl) return null;
  const source = `(${bootstrapAnalytics.toString()})(${JSON.stringify(analyticsConfig)});`;
  return <>
    <aside className="cookie-consent" id="cookie-consent" aria-label="Choix des cookies de mesure d’audience" hidden>
      <p><strong>Mesure d’audience</strong><span>Les traceurs restent désactivés tant que vous ne les acceptez pas.</span><a href={analyticsConfig.privacyUrl}>En savoir plus</a></p>
      <div><button className="button button-secondary" id="cookie-refuse" type="button">Refuser</button><button className="button button-primary" id="cookie-accept" type="button">Accepter</button></div>
    </aside>
    <script dangerouslySetInnerHTML={{ __html: source }} />
  </>;
}
