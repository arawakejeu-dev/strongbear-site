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
  assert.match(html, /Quatre étapes/);
  assert.match(html, /Réservation externe sécurisée sur Fighty/);
  assert.match(html, /disciplines adultes/);
  assert.doesNotMatch(html, /Alexandre M\.|Sonia L\.|Thomas R\./);
  assert.doesNotMatch(html, /Avis vérifié/);
});

test("renders the centralized Kids FAQ and keeps MMA out of the offer", async () => {
  const response = await render("/kids");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Mon enfant peut-il commencer sans aucune expérience/);
  assert.match(html, /Les filles peuvent-elles pratiquer/);
  assert.match(html, /FAQPage/);
  assert.doesNotMatch(html, /Cours de MMA|MMA pour enfants|MMA Kids/i);
});
