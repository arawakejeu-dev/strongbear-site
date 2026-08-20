import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const manifestPath = new URL("../.next/routes-manifest.json", import.meta.url);

const redirects = [
  ["/jiu-jitsu-bresilien", "/jiu-jitsu-bresilien-marines"],
  ["/jiu-jitsu", "/jiu-jitsu-bresilien-marines"],
  ["/cours-de-jiu-jitsu-bresilien", "/jiu-jitsu-bresilien-marines"],
  ["/cours-darts-martiaux-a-marines", "/"],
  ["/cours-de-mma", "/mma-marines"],
  ["/grappling", "/grappling-marines"],
  ["/mma", "/mma-marines"],
  ["/a-propos", "/#strongbear"],
  ["/contact", "/#contact"],
];

test("Hostinger receives the standard Next.js build output", () => {
  assert.ok(existsSync(new URL("../.next/BUILD_ID", import.meta.url)));
  assert.ok(existsSync(new URL("../.next/server", import.meta.url)));
});

test("legacy URLs are configured as HTTP 301 redirects", () => {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

  for (const [source, destination] of redirects) {
    const redirect = manifest.redirects.find((entry) => entry.source === source && !entry.has?.length);
    assert.ok(redirect, `missing redirect for ${source}`);
    assert.equal(redirect.destination, destination);
    assert.equal(redirect.statusCode, 301);
  }
});

test("www URLs redirect directly to the non-www canonical domain", () => {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const hostRedirect = manifest.redirects.find((entry) => entry.source === "/:path*" && entry.has?.some((condition) => condition.type === "host" && condition.value === "www.strongbearbjj.com"));

  assert.ok(hostRedirect, "missing www host redirect");
  assert.equal(hostRedirect.destination, "https://strongbearbjj.com/:path*");
  assert.equal(hostRedirect.statusCode, 301);

  for (const [source, destination] of redirects) {
    const redirect = manifest.redirects.find((entry) => entry.source === source && entry.has?.some((condition) => condition.type === "host" && condition.value === "www.strongbearbjj.com"));
    assert.ok(redirect, `missing direct www legacy redirect for ${source}`);
    assert.equal(redirect.destination, `https://strongbearbjj.com${destination}`);
    assert.equal(redirect.statusCode, 301);
  }
});
