import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

async function render(pathname = "/") {
  const url = new URL(workerUrl);
  url.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(url.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the trust-ready home without unsupported reviews", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Pourquoi Strongbear/);
  assert.match(html, /Tous nos professeurs sont diplômés/);
  assert.match(html, /Quatre étapes/);
  assert.match(html, /Réservation externe sécurisée sur Fighty/);
  assert.match(html, /disciplines adultes/);
  assert.match(html, /gratuit en septembre/i);
  assert.match(html, /10 € après septembre/);
  assert.match(html, /SportsActivityLocation/);
  assert.match(html, /LocalBusiness/);
  assert.match(html, /type="image\/avif"/);
  assert.match(html, /\.avif 320w/);
  assert.match(html, /srcset="[^"]+\.webp 640w/i);
  assert.match(html, /data-media-slot="home\.hero-video"/);
  assert.match(html, /data-media-status="verified-academy"/);
  assert.match(html, /<video\b/);
  assert.match(html, /poster="\/media\/home-hero-video-thumbnail\.webp"/);
  assert.match(html, /home-hero-video-mobile\.webm/);
  assert.match(html, /data-caption=/);
  assert.match(html, /background-image:url\(data:image\/webp;base64,/);
  assert.equal((html.match(/rel="preload" href="\/fonts\/geist-latin\.woff2"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /Alexandre M\.|Sonia L\.|Thomas R\./);
  assert.doesNotMatch(html, /Avis vérifié/);
  assert.doesNotMatch(html, /"@type":"Review"|"@type":"Event"|"@type":"VideoObject"/);
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);
  const htmlCacheControl = response.headers.get("cache-control") ?? "";
  assert.match(htmlCacheControl, /s-maxage=0/);
  assert.match(htmlCacheControl, /must-revalidate/);
  assert.doesNotMatch(htmlCacheControl, /stale-while-revalidate/);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
});

test("renders the centralized Kids FAQ and keeps MMA out of the offer", async () => {
  const response = await render("/kids");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Mon enfant peut-il commencer sans aucune expérience/);
  assert.match(html, /Les filles peuvent-elles pratiquer/);
  assert.match(html, /Tous nos professeurs sont diplômés/);
  assert.match(html, /Consulter les guides parents/);
  assert.match(html, /href="\/academy\/enfants-parents"/);
  assert.match(html, /À partir de 6 ans/);
  assert.match(html, /6–10 ans/);
  assert.match(html, /11–14 ans/);
  assert.match(html, /"suggestedMinAge":6/);
  assert.match(html, /"suggestedMaxAge":14/);
  assert.match(html, /gratuit en septembre/);
  assert.match(html, /Après septembre, son tarif est de 10 €/);
  assert.match(html, /10 € après septembre/);
  assert.doesNotMatch(html, /4–6 ans/);
  assert.doesNotMatch(html, /6–7 ans|8–10 ans/);
  assert.match(html, /FAQPage/);
  assert.match(html, /data-image-authenticity="provisional-generated"/);
  assert.match(html, /data-media-slot="kids\.hero"/);
  assert.match(html, /property="og:image" content="https?:\/\/[^\"]+\/og.jpg"/);
  assert.doesNotMatch(html, /Cours de MMA|MMA pour enfants|MMA Kids/i);
});

test("renders the Academy hub with five editorial collections", async () => {
  const response = await render("/academy");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Comprendre/);
  assert.match(html, /Bien débuter/);
  assert.match(html, /Jiu-Jitsu Brésilien/);
  assert.match(html, /Cinq collections/);
  assert.doesNotMatch(html, /Enfants &amp; Parents/);
  assert.match(html, /Vie Strongbear/);
  assert.match(html, /sujets structurés/);
});

test("renders a category and the complete SEO article template", async () => {
  const grapplingResponse = await render("/academy/grappling");
  assert.equal(grapplingResponse.status, 200);
  const grapplingHtml = await grapplingResponse.text();
  assert.match(grapplingHtml, /academy-category-page-grappling/);

  const categoryResponse = await render("/academy/bien-debuter");
  assert.equal(categoryResponse.status, 200);
  const categoryHtml = await categoryResponse.text();
  assert.match(categoryHtml, /Collection évolutive/);
  assert.match(categoryHtml, /Votre premier cours de JJB/);

  const articleResponse = await render("/academy/bien-debuter/premier-cours-jiu-jitsu-bresilien");
  assert.equal(articleResponse.status, 200);
  const articleHtml = await articleResponse.text();
  assert.match(articleHtml, /Dans ce guide/);
  assert.match(articleHtml, /Avant de venir/);
  assert.match(articleHtml, /Questions fréquentes/);
  assert.match(articleHtml, /La théorie vous prépare/);
  assert.match(articleHtml, /BreadcrumbList/);
  assert.match(articleHtml, /FAQPage/);
  assert.match(articleHtml, /"@type":"Article"/);
  assert.doesNotMatch(articleHtml, /"@type":"Article"[^<]+"image":/);
  assert.match(articleHtml, /property="og:image" content="https?:\/\/[^\"]+\/og.jpg"/);
  assert.match(articleHtml, /rel="canonical"/);
});

test("publishes Academy routes in the sitemap", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  assert.match(xml, /\/academy<\/loc>/);
  assert.match(xml, /\/academy\/bien-debuter<\/loc>/);
  assert.match(xml, /premier-cours-jiu-jitsu-bresilien<\/loc>/);
  assert.doesNotMatch(xml, /equipement-premier-cours<\/loc>/);
});

test("redirects legacy discipline URLs and returns an accessible noindex 404", async () => {
  const redirect = await render("/mma");
  assert.equal(redirect.status, 308);
  assert.match(redirect.headers.get("location") ?? "", /\/academy\/mma$/);

  const missing = await render("/page-inexistante");
  assert.equal(missing.status, 404);
  const html = await missing.text();
  assert.match(html, /Cette page/);
  assert.match(html, /<meta[^>]+content="noindex"[^>]+name="robots"/);
  assert.match(html, /Revenir à l’accueil/);
});
