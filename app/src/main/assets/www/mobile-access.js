(function exposeMobileAccess(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.MBLAccess = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createMobileAccess() {
  "use strict";

  const DEFAULT_WHATSAPP_NUMBER = "261340517635";
  const MAX_FREE_TEXTS = 5;

  function truthyFlag(value) {
    return value === true || value === 1 || /^(true|t|1|yes)$/i.test(String(value ?? "").trim());
  }

  function lawIds(record) {
    if (!record || typeof record !== "object" || Array.isArray(record)) return [];
    return [...new Set([record.catalogId, record.catalog_id, record.id]
      .map(value => String(value ?? "").trim())
      .filter(Boolean))];
  }

  function freeTextIds(records, maxFree = MAX_FREE_TEXTS) {
    const rows = Array.isArray(records) ? records.filter(row => row && typeof row === "object" && !Array.isArray(row)) : [];
    const limit = Math.max(0, Math.min(100, Math.floor(Number(maxFree) || 0)));
    if (!limit || !rows.length) return new Set();
    const marked = rows.filter(row => truthyFlag(row.isFree ?? row.is_free));
    const candidates = (marked.length ? marked : rows).slice(0, limit);
    return new Set(candidates.flatMap(lawIds));
  }

  function hasActivePro(profile, now = Date.now()) {
    if (!profile || typeof profile !== "object") return false;
    if (String(profile.status ?? "pending").trim().toLowerCase() !== "active") return false;
    const expiry = new Date(profile.expires_at ?? profile.expiresAt ?? "").getTime();
    return Number.isFinite(expiry) && expiry > Number(now);
  }

  function canReadText(record, freeIds, profile, now = Date.now()) {
    const free = freeIds instanceof Set ? freeIds : new Set(Array.isArray(freeIds) ? freeIds.map(String) : []);
    if (lawIds(record).some(id => free.has(id))) return true;
    return hasActivePro(profile, now);
  }

  function normalizeWhatsAppNumber(value, fallback = DEFAULT_WHATSAPP_NUMBER) {
    const digits = String(value ?? "").replace(/\D/g, "");
    if (digits.length >= 7 && digits.length <= 15) return digits;
    const fallbackDigits = String(fallback ?? DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, "");
    return fallbackDigits.length >= 7 && fallbackDigits.length <= 15 ? fallbackDigits : DEFAULT_WHATSAPP_NUMBER;
  }

  function buildWhatsAppUrl(number, message) {
    const safeNumber = normalizeWhatsAppNumber(number);
    return `https://wa.me/${safeNumber}?text=${encodeURIComponent(String(message ?? ""))}`;
  }

  return Object.freeze({
    DEFAULT_WHATSAPP_NUMBER,
    MAX_FREE_TEXTS,
    freeTextIds,
    hasActivePro,
    canReadText,
    normalizeWhatsAppNumber,
    buildWhatsAppUrl
  });
});
