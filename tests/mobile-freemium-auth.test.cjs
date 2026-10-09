const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { readFile } = require("node:fs/promises");
const Access = require("../app/src/main/assets/www/mobile-access.js");

test("freemium uses explicit is_free flags and selects at most five catalog entries in stable list order", () => {
  const catalog = Array.from({ length: 8 }, (_, index) => ({ id: `text-${index + 1}`, is_free: index < 7 }));
  const selected = Access.freeTextIds(catalog);
  assert.equal(selected.size, 5);
  assert.deepEqual([...selected], ["text-1", "text-2", "text-3", "text-4", "text-5"]);
  assert.equal(Access.canReadText({ id: "text-6" }, selected, { status: "pending" }), false);
});

test("first five catalog rows are the fallback only when no free flag exists", () => {
  const catalog = [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }, { id: "e" }, { id: "f" }];
  const selected = Access.freeTextIds(catalog);
  assert.equal(selected.size, 5);
  assert.deepEqual([...selected], ["a", "b", "c", "d", "e"]);
  assert.equal(Access.freeTextIds([{ id: "a", is_free: "false" }, { id: "b", is_free: "true" }]).has("b"), true);
});

test("Pro requires status active and a valid future expires_at; missing, expired and invalid dates fail closed", () => {
  const now = Date.parse("2026-10-08T09:00:00Z");
  assert.equal(Access.hasActivePro({ status: "ACTIVE", expires_at: "2026-10-09T00:00:00Z" }, now), true);
  assert.equal(Access.hasActivePro({ status: "pending", expires_at: "2026-10-09T00:00:00Z" }, now), false);
  assert.equal(Access.hasActivePro({ status: "active", expires_at: null }, now), false);
  assert.equal(Access.hasActivePro({ status: "active", expires_at: "bad-date" }, now), false);
  assert.equal(Access.hasActivePro({ status: "active", expires_at: "2026-10-08T09:00:00Z" }, now), false);
});

test("free content remains readable, paid content requires an unexpired Pro profile", () => {
  const freeIds = new Set(["free-uuid"]);
  const now = Date.parse("2026-10-08T09:00:00Z");
  assert.equal(Access.canReadText({ id: "business-id", catalogId: "free-uuid" }, freeIds, { status: "pending" }, now), true);
  assert.equal(Access.canReadText({ id: "paid-uuid" }, freeIds, { status: "active", expires_at: "2026-10-09T00:00:00Z" }, now), true);
  assert.equal(Access.canReadText({ id: "paid-uuid" }, freeIds, { status: "active", expires_at: null }, now), false);
});

test("WhatsApp numbers normalize to digits, fall back safely, and prefill encoded messages", () => {
  assert.equal(Access.DEFAULT_WHATSAPP_NUMBER, "261340517635");
  assert.equal(Access.normalizeWhatsAppNumber("+261 34 051 76 35"), "261340517635");
  assert.equal(Access.normalizeWhatsAppNumber("invalid"), "261340517635");
  const text = "Bonjour, je souhaite souscrire pour le texte : Loi n° 1 (Compte : test@example.mg)";
  const url = new URL(Access.buildWhatsAppUrl("+261 34 051 76 35", text));
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/261340517635");
  assert.equal(url.searchParams.get("text"), text);
});

test("APK web UI gates startup, persists Supabase Auth, checks profiles, protects reader and uses the native WebView deep link path", async () => {
  const projectRoot = path.resolve(__dirname, "..");
  const [app, html, java, migration] = await Promise.all([
    readFile(path.join(projectRoot, "app/src/main/assets/www/app.js"), "utf8"),
    readFile(path.join(projectRoot, "app/src/main/assets/www/index.html"), "utf8"),
    readFile(path.join(projectRoot, "app/src/main/java/mg/tenikolo/droit/MainActivity.java"), "utf8"),
    readFile(path.resolve(projectRoot, "../manette-admin/sql/mobile_freemium_auth.sql"), "utf8")
  ]);
  assert.match(html, /id="auth-gate"/);
  assert.match(html, /id="app-shell" hidden inert/);
  assert.match(html, /id="welcome-overlay"/);
  assert.match(html, /id="pro-required-overlay"/);
  assert.match(app, /authRequest\("signup"/);
  assert.match(app, /token\?grant_type=password/);
  assert.match(app, /localStorage\.setItem\(AUTH_STORAGE_KEY/);
  assert.match(app, /supabaseRestGet\("profiles"/);
  assert.match(app, /if \(!canReadText\(law\)\)[\s\S]*showProRequired\(law\)/);
  assert.match(app, /ACCESS\.buildWhatsAppUrl/);
  assert.match(java, /shouldOverrideUrlLoading\(WebView view, WebResourceRequest request\)/);
  assert.match(java, /new Intent\(Intent\.ACTION_VIEW, uri\)/);
  assert.match(migration, /create policy "Public can read free or active text contents"/);
});
