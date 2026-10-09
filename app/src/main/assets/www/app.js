(() => {
  "use strict";

  const ICONS = {
    scale: '<path d="M12 3v17m-6 1h12M4 7h16M12 3l-8 4m8-4 8 4M4 7l-3 8m3-8 3 8m10-8-3 8m3-8 3 8M1 15c1 3 5 3 6 0m10 0c1 3 5 3 6 0"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    moon: '<path d="M20.8 14.2A8.7 8.7 0 0 1 9.8 3.2 8.8 8.8 0 1 0 20.8 14.2Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    reset: '<path d="M3 7v5h5"/><path d="M5 16a8 8 0 1 0 0-8L3 12"/>',
    x: '<path d="m18 6-12 12M6 6l12 12"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M8 7h8M8 11h8"/>',
    bookOpen: '<path d="M12 7v14m0-14C9.7 5.2 6.5 4.5 3 5v14c3.5-.5 6.7.2 9 2m0-14c2.3-1.8 5.5-2.5 9-2v14c-3.5-.5-6.7.2-9 2"/>',
    dictionary: '<path d="M5 3.5A2.5 2.5 0 0 1 7.5 1H21v19H7.5A2.5 2.5 0 0 1 5 17.5v-14Z"/><path d="M5 6H3v14a2 2 0 0 0 2 2h14M9 6h8m-8 4h8m-8 4h6"/>',
    arrowLeft: '<path d="M19 12H5m7 7-7-7 7-7"/>',
    arrowRight: '<path d="M5 12h14m-7-7 7 7-7 7"/>',
    pencil: '<path d="m15 5 4 4M4 20l4-.8L19.2 8a2.1 2.1 0 0 0-3-3L5 16.2 4 20Z"/>',
    bookmark: '<path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V22l-6-4-6 4V4.5Z"/>',
    sliders: '<path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4"/>',
    landmark: '<path d="m3 9 9-6 9 6M4 10h16M5 10v9m4-9v9m6-9v9m4-9v9M3 21h18"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-13 5h18M10 12v2h4v-2"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15m6-12v15"/><path d="M15 7a3 3 0 1 0-6 0c0 2 3 6 3 6s3-4 3-6Z"/>',
    gavel: '<path d="m14 5 5 5m-7-7 7 7m-9-5 6 6m-10 0 6 6m-8-4 6 6M4 20h9"/><path d="m16 3 5 5-4 4-5-5 4-4ZM8 11l5 5-4 4-5-5 4-4Z"/>',
    chart: '<path d="M4 19V5m0 14h17"/><path d="m7 14 4-4 3 3 6-7"/><path d="M17 6h3v3"/>',
    tree: '<path d="m12 2 4 6h-2l4 6h-4l4 5H6l4-5H6l4-6H8l4-6Z"/><path d="M12 19v3"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    quote: '<path d="M10 11H5V6h5v5Zm9 0h-5V6h5v5ZM5 11c0 4-1 6-3 7m12-7c0 4-1 6-3 7"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
    sync: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9a7 7 0 0 1 11.8-2L20 12M4 12l2.7 5a7 7 0 0 0 11.8-2"/>',
    warning: '<path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
    external: '<path d="M14 3h7v7m0-7-9 9"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    font: '<path d="m4 19 6-14 6 14M6 15h8m2 4 4-10 4 10m-6-3h4"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 2.9l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1.7-1.7"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8m-8 4h8"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    arrow: '<path d="M5 12h14m-7-7 7 7-7 7"/>'
  };

  const icon = (name, size = 20, className = "") => `<svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.file}</svg>`;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const config = window.TENIKOLO_CONFIG || {};
  const ACCESS = window.MBLAccess;
  const AUTH_STORAGE_KEY = "mbl-mobile-auth-v1";
  const MEMBERSHIP_CACHE_KEY = "mbl-mobile-membership-v1";
  const TYPES = ["Constitution", "Loi Organique", "Loi Ordinaire", "Décret", "Arrêté"];
  const FONT_SIZES = ["Normal", "Grand", "Très grand"];
  const READER_PAGE_SIZE = 12;
  const ARTICLE_LINK_INDEX_MAX_CHARS = 12000;
  const PREVIEW_ARTICLE_LIMIT = 5;
  const DEFAULT_FAVORITES = ["const-2010", "loi-travail-2003"];
  const state = {
    content: { legalTexts: [], lexicon: [], dataset: "demo-unverified" },
    session: null, user: null, profile: null, guestFree: false, authMode: "login", authLoading: false,
    authBootstrapComplete: false, authMessage: "", authenticatedAppVisible: false, freeTextIds: new Set(), membershipCheckedAt: 0,
    membershipError: "", premiumContentStale: false, whatsappNumber: ACCESS?.DEFAULT_WHATSAPP_NUMBER || "261340517635", whatsappLoadedAt: 0, pendingPaywallLawId: "",
    query: "", lexiconQuery: "", type: "ALL", domain: "ALL", tab: "recherche", returnTab: "recherche",
    favoriteFolders: [], readingHistory: [], activeReader: null, currentLaw: null, currentArticleTarget: null, readerResumeScrollTop: 0,
    readerPage: 0, readerIndexedPage: -1, readerMatches: [], readerMatchIndex: -1, readerAccordionState: {}, readerTree: null, readerIndexedLaw: null,
    readerSearchIndex: new Map(), readerSearchTimer: null, readerSearchGeneration: 0, readerSearchBusy: false,
    lexiconTrie: null, lexiconLimit: 100, pendingFavorite: null, folderDialogMode: "pick", editingFolderId: "",
    copyTarget: null, definitionTerm: "", preview: null, homeSearchTimer: null, readerErrorActive: false,
    theme: "light", fontSize: 0, lastSync: null, lastCheckAt: 0, syncing: false, syncMode: "idle", isDemo: true,
    pendingUpdate: null, toastTimer: null, readingSaveTimer: null
  };

  function installIcons() {
    const ids = {
      "admin-icon": "shield", "theme-icon": "moon", "search-icon": "search", "reset-icon": "reset", "domain-clear-icon": "x",
      "directory-icon": "book", "favorites-icon": "bookmark", "lexicon-icon": "dictionary", "lex-search-icon": "search", "pin-icon": "pin", "profile-theme-icon": "moon",
      "font-icon": "font", "database-icon": "database", "sync-icon": "sync", "admin-profile-icon": "shield", "legal-icon": "file", "chevron-icon": "chevron",
      "chevron-icon-two": "chevron", "nav-search-icon": "search", "nav-reading-icon": "bookOpen", "nav-directory-icon": "folder", "nav-favorites-icon": "bookmark", "nav-lexicon-icon": "dictionary",
      "nav-profile-icon": "sliders", "reader-bookmark-icon": "bookmark", "reader-search-icon": "search", "reader-search-clear-icon": "x", "reader-toc-icon": "menu", "reader-history-icon": "clock", "reader-empty-icon": "bookOpen",
      "notice-icon": "warning", "external-icon": "external", "preview-mark": "link", "preview-close-icon": "x", "copy-icon": "copy", "preview-expand-icon": "eye", "arrow-icon": "arrow", "info-close-icon": "x", "update-close-icon": "x", "update-icon": "sync"
    };
    Object.entries(ids).forEach(([id, name]) => {
      const node = document.getElementById(id);
      if (!node) return;
      if (id === "preview-mark") node.innerHTML = icon(name, 21);
      else node.innerHTML = icon(name, id.startsWith("nav-") ? 22 : 18);
    });
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  }
  function normalizeSearch(value) {
    return String(value || "").toLocaleLowerCase("fr").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  }
  function slug(value) {
    return normalizeSearch(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function highlight(value, query) {
    const text = escapeHtml(value);
    if (!query) return text;
    const safeQuery = escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    try { return text.replace(new RegExp(`(${safeQuery})`, "gi"), '<mark class="highlight">$1</mark>'); }
    catch { return text; }
  }
  function createArticleSearchIndex(article = {}, domain = MBLData.GENERAL_CATEGORY) {
    const safeArticle = article && typeof article === "object" && !Array.isArray(article) ? article : {};
    const text = MBLData.readText(safeArticle?.text ?? safeArticle?.content ?? safeArticle?.body ?? "");
    // Preserve every character while avoiding costly per-character maps for a single oversized article.
    if (text.length > ARTICLE_LINK_INDEX_MAX_CHARS) {
      return { article: safeArticle, text, textSearchMap: null, links: [], linkedIndexes: new Set(), plainTextOnly: true };
    }
    const textSearchMap = MBLData.buildTextSearchIndex(text);
    const references = [];
    (Array.isArray(safeArticle?.references) ? safeArticle.references : []).forEach((reference, referenceIndex) => {
      const label = String(reference?.label || "").trim();
      if (!label || !reference?.lawId) return;
      MBLData.findIndexedTextRanges(textSearchMap, label).forEach(range => references.push({ ...range, kind: "reference", priority: 0, reference, referenceIndex }));
    });
    references.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
    const selectedReferences = [];
    for (const range of references) {
      if (selectedReferences.some(item => range.start < item.end && range.end > item.start)) continue;
      selectedReferences.push(range);
    }
    const localDefinitions = (Array.isArray(safeArticle?.definitions) ? safeArticle.definitions : []).map(definition => ({
      ...definition,
      category: MBLData.normalizeLegalCategory(definition?.category || domain),
      articleSpecific: true
    }));
    const localTrie = MBLData.buildLexiconTrie(localDefinitions);
    const localRanges = MBLData.findLexiconRanges(text, localTrie, domain).map(range => ({ ...range, sourcePriority: 0 }));
    const globalRanges = MBLData.findLexiconRanges(text, state.lexiconTrie, domain).map(range => ({ ...range, sourcePriority: 1 }));
    const selectedLexicon = [...localRanges, ...globalRanges].filter(range =>
      !selectedReferences.some(reference => range.start < reference.end && range.end > reference.start)
    ).map(range => ({ ...range, kind: "lexicon", priority: 1 }));
    selectedLexicon.sort((a, b) => a.start - b.start || a.sourcePriority - b.sourcePriority || (b.end - a.end));
    const nonOverlappingLexicon = [];
    for (const range of selectedLexicon) {
      if (nonOverlappingLexicon.some(item => range.start < item.end && range.end > item.start)) continue;
      nonOverlappingLexicon.push(range);
    }
    const links = [...selectedReferences, ...nonOverlappingLexicon].sort((a, b) => a.start - b.start || a.priority - b.priority);
    return {
      article: safeArticle, text, textSearchMap, links,
      linkedIndexes: new Set(selectedReferences.map(range => range.referenceIndex)), plainTextOnly: false
    };
  }
  function buildReaderSearchIndex(law, articles = law?.articles) {
    state.readerSearchIndex = new Map();
    for (const article of Array.isArray(articles) ? articles : []) {
      const safeArticle = article && typeof article === "object" ? article : {};
      const key = String(safeArticle?.key || "");
      if (key) state.readerSearchIndex.set(key, createArticleSearchIndex(safeArticle, law?.domain));
    }
    state.readerIndexedLaw = law || null;
    state.readerIndexedPage = state.readerPage;
  }
  function renderLinkedArticleText(article, query, options = {}) {
    const safeArticle = article && typeof article === "object" && !Array.isArray(article) ? article : {};
    const indexed = options.index || state.readerSearchIndex.get(String(safeArticle?.key || "")) || createArticleSearchIndex(safeArticle, state.currentLaw?.domain);
    const text = String(indexed?.text ?? "");
    const trackSearch = options.trackSearch !== false;
    const searchRanges = trackSearch && indexed?.textSearchMap ? MBLData.findIndexedTextRanges(indexed.textSearchMap, query) : [];
    const links = Array.isArray(indexed?.links) ? indexed.links : [];
    let html = ""; let cursor = 0;
    const renderSlice = (start, end) => {
      if (!trackSearch || !searchRanges.length) return escapeHtml(text.slice(start, end));
      let result = ""; let localCursor = start;
      for (const match of searchRanges) {
        if (match.end <= start || match.start >= end) continue;
        const matchStart = Math.max(start, match.start);
        const matchEnd = Math.min(end, match.end);
        result += escapeHtml(text.slice(localCursor, matchStart));
        const matchIndex = state.readerMatches.length;
        result += `<mark class="reader-match" data-reader-match-index="${matchIndex}">${escapeHtml(text.slice(matchStart, matchEnd))}</mark>`;
        state.readerMatches.push(matchIndex);
        localCursor = matchEnd;
      }
      return result + escapeHtml(text.slice(localCursor, end));
    };
    for (const range of links) {
      html += renderSlice(cursor, range.start);
      const body = renderSlice(range.start, range.end);
      if (range.kind === "reference") {
        html += `<button class="inline-reference" type="button" data-reference-law="${escapeHtml(range.reference.lawId)}" data-reference-article="${escapeHtml(range.reference.article)}" aria-label="Aperçu : ${escapeHtml(range.reference.label || text.slice(range.start, range.end))}" title="Afficher un aperçu">${body}</button>`;
      } else {
        html += `<button class="dictionary-term-link" type="button" data-lexicon-term="${escapeHtml(range.item.term)}" data-lexicon-category="${escapeHtml(range.item.category)}" data-lexicon-definition="${escapeHtml(range.item.definition)}" aria-label="Définition de ${escapeHtml(range.item.term)} (${escapeHtml(range.item.category)})">${body}</button>`;
      }
      cursor = range.end;
    }
    html += renderSlice(cursor, text.length);
    return { html, linkedIndexes: indexed?.linkedIndexes instanceof Set ? indexed.linkedIndexes : new Set() };
  }
  function normalizeLaw(row) { return MBLData.normalizeLegalText(row || {}); }
  function normalizeLexicon(row) { return { term: String(row.term || ""), definition: String(row.definition || ""), category: MBLData.normalizeLegalCategory(row.category), updatedAt: String(row.updated_at || row.updatedAt || "") }; }
  function normalizeContent(raw) {
    const laws = raw && (raw.legalTexts || raw.legal_texts);
    const lexicon = raw && (raw.lexicon || raw.lexicon_terms);
    if (!Array.isArray(laws)) return null;
    return {
      schemaVersion: Number(raw.schemaVersion || raw.schema_version || 1),
      dataset: String(raw.dataset || "remote"),
      notice: String(raw.notice || ""),
      legalTexts: laws.map(normalizeLaw).filter(law => law.id && law.title),
      lexicon: Array.isArray(lexicon) ? lexicon.map(normalizeLexicon).filter(term => term.term) : []
    };
  }
  function normalizeCatalogRecords(catalogRows, contentRows) {
    const contentByCatalogId = new Map((contentRows || []).map(row => [String(row.catalog_id || ""), row]));
    return (catalogRows || []).map(row => {
      const contentRow = contentByCatalogId.get(String(row.id || "")) || null;
      return MBLData.normalizeCatalogDocument(row, contentRow);
    }).filter(law => law.id && law.title);
  }
  function lawKey(law) { return String(law?.catalogId || law?.id || ""); }
  function rebuildLexiconIndex() { state.lexiconTrie = MBLData.buildLexiconTrie(state.content.lexicon); }
  function lawById(id) {
    const key = String(id || "");
    return state.content.legalTexts.find(law => law.id === key || law.catalogId === key || lawKey(law) === key) || null;
  }
  function remapLaw(law) {
    if (!law) return null;
    return lawById(lawKey(law))
      || (law.code ? state.content.legalTexts.find(item => normalizeSearch(item.code) === normalizeSearch(law.code)) : null)
      || (law.title ? state.content.legalTexts.find(item => normalizeSearch(item.title) === normalizeSearch(law.title)) : null);
  }
  function reconcileCurrentReader() {
    if (!state.currentLaw) return;
    const previousLaw = state.currentLaw;
    const mapped = remapLaw(previousLaw);
    if (!mapped) {
      state.currentLaw = null; state.currentArticleTarget = ""; state.readerResumeScrollTop = 0; state.readerAccordionState = {};
      state.readerTree = null; state.readerIndexedLaw = null; state.readerIndexedPage = -1; state.readerPage = 0; state.readerSearchIndex = new Map();
      state.activeReader = null;
      void kvSet("activeReader", null);
      renderReader();
      return;
    }
    const target = findArticleByTarget(mapped, state.currentArticleTarget) || findArticleByTarget(mapped, state.activeReader?.articleNumber);
    if (mapped !== previousLaw) { state.readerTree = null; state.readerIndexedLaw = null; state.readerIndexedPage = -1; state.readerPage = 0; state.readerSearchIndex = new Map(); }
    state.currentLaw = mapped;
    state.currentArticleTarget = target?.key || "";
    recordReading(mapped, target?.key || "", target?.number || state.activeReader?.articleNumber || "", $("#reader-scroll").scrollTop, { render: false });
    renderReader();
  }


  let databasePromise;
  function openDatabase() {
    if (databasePromise) return databasePromise;
    databasePromise = new Promise((resolve, reject) => {
      if (!window.indexedDB) return reject(new Error("IndexedDB indisponible"));
      const request = indexedDB.open("tenikolo_droit_local", 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("kv")) db.createObjectStore("kv");
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("Ouverture IndexedDB impossible"));
    });
    return databasePromise;
  }
  async function kvGet(key) {
    try {
      const db = await openDatabase();
      return await new Promise((resolve, reject) => {
        const request = db.transaction("kv", "readonly").objectStore("kv").get(key);
        request.onsuccess = () => resolve(request.result ?? null);
        request.onerror = () => reject(request.error);
      });
    } catch {
      try { const value = localStorage.getItem(`td:${key}`); return value ? JSON.parse(value) : null; } catch { return null; }
    }
  }
  async function kvSet(key, value) {
    try {
      const db = await openDatabase();
      await new Promise((resolve, reject) => {
        const transaction = db.transaction("kv", "readwrite");
        transaction.objectStore("kv").put(value, key);
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(transaction.error);
      });
    } catch {
      try { localStorage.setItem(`td:${key}`, JSON.stringify(value)); } catch (error) { console.warn("Cache locale pleine", error); }
    }
  }
  function isSupabaseConfigured() { return /^https?:\/\//i.test(String(config.supabaseUrl || "")) && String(config.supabaseAnonKey || "").trim().length > 10; }
  function currentAccountEmail() { return String(state.user?.email || "").trim(); }
  function currentProfileStatus() { return String(state.profile?.status || "pending").trim().toLowerCase(); }
  function hasActivePro(now = Date.now()) { return ACCESS?.hasActivePro(state.profile, now) === true; }
  function recomputeFreeTextIds() {
    state.freeTextIds = ACCESS?.freeTextIds(state.content.legalTexts, ACCESS.MAX_FREE_TEXTS) || new Set();
    return state.freeTextIds;
  }
  function isFreeText(law) {
    const ids = [law?.catalogId, law?.id].map(value => String(value || "")).filter(Boolean);
    return ids.some(id => state.freeTextIds.has(id));
  }
  function canReadText(law, now = Date.now()) {
    return Boolean(ACCESS?.canReadText(law, state.freeTextIds, state.profile, now));
  }
  function showAuthMessage(message, kind = "error") {
    const node = $("#auth-message");
    if (!node) return;
    node.textContent = String(message || "");
    node.className = `auth-message is-${kind}`;
    node.hidden = !message;
  }
  function setAuthMode(mode) {
    state.authMode = mode === "signup" ? "signup" : "login";
    const signup = state.authMode === "signup";
    $("#auth-title").textContent = signup ? "Créer un compte" : "Connectez-vous";
    $("#auth-copy").textContent = signup
      ? "Créez un compte Mada Base Légale. Le statut initial est Freemium; le Lexique reste gratuit."
      : "Connectez-vous pour consulter le catalogue. Le Lexique juridique reste gratuit.";
    $("#auth-submit-label").textContent = signup ? "Créer mon compte" : "Se connecter";
    $("#auth-switch-copy").textContent = signup ? "Déjà un compte ?" : "Pas encore de compte ?";
    $("#auth-mode-toggle").textContent = signup ? "Se connecter" : "Créer un compte";
    $("#auth-password").autocomplete = signup ? "new-password" : "current-password";
    if (signup) $("#auth-password").setAttribute("minlength", "6");
    else $("#auth-password").removeAttribute("minlength");
    showAuthMessage("");
  }
  function showAuthGate(message = "") {
    const shell = $("#app-shell");
    const gate = $("#auth-gate");
    if (shell) { shell.hidden = true; shell.inert = true; }
    if (gate) { gate.hidden = false; gate.inert = false; gate.setAttribute("aria-hidden", "false"); }
    const status = $("#auth-bootstrap-status");
    if (status) status.textContent = isSupabaseConfigured()
      ? (navigator.onLine ? "Connexion requise pour ouvrir l’application." : "Hors ligne : connectez-vous dès qu’une connexion est disponible.")
      : "Supabase n’est pas configuré. Vérifiez la configuration publique de l’application.";
    $("#auth-submit").disabled = !state.authBootstrapComplete || state.authLoading;
    $("#auth-mode-toggle").disabled = !state.authBootstrapComplete || state.authLoading;
    if (message) showAuthMessage(message);
    if (state.authBootstrapComplete && isSupabaseConfigured()) setTimeout(() => $("#auth-email")?.focus(), 50);
  }
  function hideAuthGate() {
    const gate = $("#auth-gate");
    if (!gate) return;
    gate.hidden = true;
    gate.inert = true;
    gate.setAttribute("aria-hidden", "true");
  }
  function loadStoredSession() {
    try {
      const value = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "null");
      return value && typeof value === "object" && value.access_token && value.refresh_token ? value : null;
    } catch { return null; }
  }
  function storeSession(session) {
    state.session = session || null;
    try {
      if (session) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      else localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) { console.warn("Session non persistée dans le stockage WebView", error); }
  }
  function buildSession(authData, previous = null) {
    const expiresIn = Math.max(1, Number(authData?.expires_in) || 3600);
    const rawExpiry = Number(authData?.expires_at);
    const expiresAt = Number.isFinite(rawExpiry) && rawExpiry > 0
      ? (rawExpiry < 1000000000000 ? rawExpiry * 1000 : rawExpiry)
      : Date.now() + expiresIn * 1000;
    return {
      access_token: String(authData?.access_token || previous?.access_token || ""),
      refresh_token: String(authData?.refresh_token || previous?.refresh_token || ""),
      token_type: String(authData?.token_type || previous?.token_type || "bearer"),
      expires_at: expiresAt,
      user: authData?.user || previous?.user || null
    };
  }
  function applyAuthResponse(authData) {
    const session = buildSession(authData, state.session);
    if (!session.access_token || !session.refresh_token) throw new Error("Supabase n’a pas renvoyé une session complète.");
    state.user = session.user || state.user;
    storeSession(session);
    return session;
  }
  async function authRequest(path, { method = "POST", body, accessToken = "" } = {}) {
    if (!isSupabaseConfigured()) throw new Error("La connexion Supabase n’est pas configurée.");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), Math.max(5000, Number(config.requestTimeoutMs) || 15000));
    const headers = { apikey: String(config.supabaseAnonKey), Accept: "application/json" };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
    let response;
    try {
      response = await fetch(`${supabaseBase()}/auth/v1/${path}`, {
        method, headers, body: body === undefined ? undefined : JSON.stringify(body), signal: controller.signal
      });
    } catch (cause) {
      const error = new Error(cause?.name === "AbortError" ? "La connexion Supabase a dépassé le délai d’attente." : "Supabase est injoignable. Vérifiez votre connexion.");
      error.network = true;
      throw error;
    } finally { clearTimeout(timeout); }
    let data = null;
    try { data = await response.json(); } catch {}
    if (!response.ok) {
      const error = new Error(String(data?.msg || data?.message || data?.error_description || data?.error || `Supabase Auth (${response.status})`));
      error.status = response.status;
      error.code = String(data?.code || data?.error || "");
      throw error;
    }
    return data;
  }
  let sessionRefreshPromise = null;
  async function refreshSession() {
    if (sessionRefreshPromise) return sessionRefreshPromise;
    if (!state.session?.refresh_token) throw new Error("Session absente. Reconnectez-vous.");
    sessionRefreshPromise = (async () => {
      const data = await authRequest("token?grant_type=refresh_token", { body: { refresh_token: state.session.refresh_token } });
      const session = applyAuthResponse(data);
      if (session.user) state.user = session.user;
      return session;
    })();
    try { return await sessionRefreshPromise; }
    catch (error) {
      if ([400, 401].includes(error.status)) storeSession(null);
      throw error;
    } finally { sessionRefreshPromise = null; }
  }
  async function ensureFreshSession() {
    if (state.session && Number(state.session.expires_at) < Date.now() + 45000) await refreshSession();
  }
  function makeNetworkError(message, cause = null) {
    const error = new Error(message || "Connexion Supabase impossible.");
    error.network = true;
    if (cause) error.cause = cause;
    return error;
  }
  async function supabaseRestGet(table, params = {}, { range = null, attempt = 0 } = {}) {
    if (!isSupabaseConfigured()) throw new Error("La connexion Supabase n’est pas configurée.");
    await ensureFreshSession();
    const url = new URL(`${supabaseBase()}/rest/v1/${table}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, String(value));
    });
    const headers = {
      apikey: String(config.supabaseAnonKey),
      Authorization: `Bearer ${state.session?.access_token || String(config.supabaseAnonKey)}`,
      Accept: "application/json"
    };
    if (range) { headers["Range-Unit"] = "items"; headers.Range = `${range[0]}-${range[1]}`; headers.Prefer = "count=exact"; }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), Math.max(5000, Number(config.requestTimeoutMs) || 15000));
    let response;
    try { response = await fetch(url, { method: "GET", headers, signal: controller.signal }); }
    catch (cause) { throw makeNetworkError(cause?.name === "AbortError" ? "Délai dépassé pendant la synchronisation." : "Supabase est injoignable.", cause); }
    finally { clearTimeout(timeout); }
    if (response.status === 401 && attempt === 0 && state.session?.refresh_token) {
      await refreshSession();
      return supabaseRestGet(table, params, { range, attempt: 1 });
    }
    let data = null;
    try { data = await response.json(); } catch {}
    if (!response.ok) {
      const error = new Error(String(data?.message || data?.details || data?.hint || `Supabase (${response.status})`));
      error.status = response.status;
      error.code = String(data?.code || "");
      throw error;
    }
    if (!Array.isArray(data)) throw new Error(`Réponse Supabase invalide pour ${table}.`);
    return data;
  }
  async function cachedMembershipFor(userId) {
    const cached = await kvGet(MEMBERSHIP_CACHE_KEY);
    return cached && String(cached.id || cached.user_id || "") === String(userId || "") ? cached : null;
  }
  async function pruneRestrictedCache({ persist = true, showGate = false } = {}) {
    recomputeFreeTextIds();
    if (hasActivePro()) return false;
    let changed = false;
    state.content.legalTexts = state.content.legalTexts.map(law => {
      if (isFreeText(law)) return law;
      if ((law.articles || []).length || law.hasContent !== false) changed = true;
      return { ...law, articles: [], hasContent: false };
    });
    const restrictedLaw = state.currentLaw && !isFreeText(state.currentLaw) ? state.currentLaw : null;
    if (restrictedLaw) {
      state.currentLaw = null; state.currentArticleTarget = ""; state.readerResumeScrollTop = 0;
      state.readerTree = null; state.readerIndexedLaw = null; state.readerIndexedPage = -1;
      state.readerPage = 0; state.readerSearchIndex = new Map(); state.activeReader = null;
      await kvSet("activeReader", null);
      if (!$("#view-lecture").hidden) switchTab("recherche");
      renderReader();
    }
    if (state.activeReader && !isFreeText(lawById(state.activeReader.lawId))) {
      state.activeReader = null;
      await kvSet("activeReader", null);
    }
    if (state.preview?.kind === "law" && !isFreeText(lawById(state.preview.lawId))) {
      state.preview = null;
      setOverlay("preview-overlay", false);
    }
    if (changed && persist) await kvSet("content", state.content);
    rebuildLexiconIndex();
    sanitizeFavoriteFolders();
    if (showGate && restrictedLaw) showProRequired(restrictedLaw);
    return changed;
  }
  async function refreshMembership({ allowCacheOnNetworkError = true } = {}) {
    const userId = String(state.user?.id || state.session?.user?.id || "");
    if (!state.session?.access_token || !userId) {
      state.profile = state.user?.id ? { id: state.user.id, email: currentAccountEmail(), status: "pending", expires_at: null } : null;
      state.membershipCheckedAt = Date.now();
      await pruneRestrictedCache();
      return state.profile;
    }
    const previousWasPro = hasActivePro();
    try {
      const rows = await supabaseRestGet("profiles", { select: "id,email,status,expires_at", id: `eq.${userId}`, limit: "1" });
      const row = rows.find(profile => String(profile?.id || "") === userId) || null;
      state.profile = {
        id: userId,
        email: String(row?.email || currentAccountEmail()),
        status: String(row?.status || "pending").trim().toLowerCase(),
        expires_at: row?.expires_at || null
      };
      state.membershipError = row ? "" : "Profil introuvable; accès Freemium appliqué.";
      await kvSet(MEMBERSHIP_CACHE_KEY, { ...state.profile, user_id: userId, cached_at: Date.now() });
    } catch (error) {
      const cached = allowCacheOnNetworkError && (error.network || Number(error.status) >= 500)
        ? await cachedMembershipFor(userId)
        : null;
      if (cached) {
        state.profile = { id: userId, email: String(cached.email || currentAccountEmail()), status: String(cached.status || "pending").toLowerCase(), expires_at: cached.expires_at || null };
        state.membershipError = "Statut non vérifiable hors ligne; dernier état mémorisé utilisé jusqu’à expiration.";
      } else {
        state.profile = { id: userId, email: currentAccountEmail(), status: "pending", expires_at: null };
        state.membershipError = error.message || "Statut Pro non vérifiable; accès Freemium appliqué.";
      }
    }
    state.membershipCheckedAt = Date.now();
    const currentIsPro = hasActivePro();
    if (!previousWasPro && currentIsPro) state.premiumContentStale = true;
    await pruneRestrictedCache({ showGate: previousWasPro && !currentIsPro });
    if (state.authenticatedAppVisible) renderProfile();
    return state.profile;
  }
  async function restoreAuthSession() {
    const stored = loadStoredSession();
    if (!stored || !isSupabaseConfigured()) return false;
    state.session = stored;
    state.user = stored.user || null;
    const cached = await cachedMembershipFor(state.user?.id);
    if (!navigator.onLine) {
      if (!state.user && cached) state.user = { id: cached.id, email: cached.email };
      state.profile = cached ? { id: cached.id, email: cached.email, status: cached.status, expires_at: cached.expires_at } : null;
      state.membershipError = "Hors ligne : dernier statut connu utilisé jusqu’à l’expiration.";
      return Boolean(state.user?.email);
    }
    try {
      if (Number(stored.expires_at) < Date.now() + 45000) await refreshSession();
      const user = await authRequest("user", { method: "GET", accessToken: state.session.access_token });
      if (!user?.id || !user?.email) throw Object.assign(new Error("Session Supabase invalide."), { status: 401 });
      state.user = user;
      storeSession({ ...state.session, user });
      await refreshMembership();
      return true;
    } catch (error) {
      if ((error.network || Number(error.status) >= 500) && (state.user?.email || stored.user?.email)) {
        state.user = state.user || stored.user || null;
        const fallback = await cachedMembershipFor(state.user?.id);
        state.profile = fallback ? { id: fallback.id, email: fallback.email, status: fallback.status, expires_at: fallback.expires_at } : null;
        state.membershipError = "Supabase indisponible; dernier statut connu appliqué.";
        await pruneRestrictedCache();
        return Boolean(state.user?.email);
      }
      storeSession(null);
      state.user = null; state.profile = null;
      return false;
    }
  }
  async function loadWhatsAppNumber(force = false) {
    if (!force && state.whatsappLoadedAt && Date.now() - state.whatsappLoadedAt < 10 * 60 * 1000) return state.whatsappNumber;
    state.whatsappNumber = ACCESS?.DEFAULT_WHATSAPP_NUMBER || "261340517635";
    if (!isSupabaseConfigured() || !navigator.onLine) return state.whatsappNumber;
    try {
      const rows = await supabaseRestGet("app_config", { select: "key,value", key: "in.(whatsapp_support_number,whatsapp_number)" });
      const canonical = rows.find(row => row.key === "whatsapp_support_number" && String(row.value || "").trim());
      const legacy = rows.find(row => row.key === "whatsapp_number" && String(row.value || "").trim());
      state.whatsappNumber = ACCESS.normalizeWhatsAppNumber(canonical?.value || legacy?.value || state.whatsappNumber);
      state.whatsappLoadedAt = Date.now();
    } catch (error) { console.warn("Numéro WhatsApp Supabase indisponible; valeur par défaut utilisée", error.message); }
    return state.whatsappNumber;
  }
  async function openWhatsApp(message) {
    await loadWhatsAppNumber();
    const url = ACCESS.buildWhatsAppUrl(state.whatsappNumber, message);
    try {
      // Android WebView's shouldOverrideUrlLoading sends this universal link to ACTION_VIEW.
      window.location.assign(url);
    } catch (error) {
      console.warn("Ouverture WhatsApp impossible", error);
      showToast("Impossible d’ouvrir WhatsApp sur cet appareil.");
    }
  }
  function upgradeMessage(law = null) {
    const email = currentAccountEmail() || "adresse e-mail non disponible";
    return law
      ? `Bonjour, je souhaite souscrire à l'offre Pro pour débloquer le texte : ${String(law.title || "Texte juridique")} (Compte : ${email})`
      : `Bonjour, je souhaite souscrire à l'offre Pro de Mada Base Légale pour mon compte : ${email}`;
  }
  function showWelcome() {
    hideAuthGate();
    $("#app-shell").hidden = true;
    $("#app-shell").inert = true;
    $("#welcome-copy").textContent = state.session
      ? "Votre compte est créé avec un accès Freemium en attente. Choisissez comment continuer."
      : "Votre compte est créé. Confirmez votre adresse e-mail pour garder votre session; vous pouvez déjà explorer le mode gratuit sur cet appareil.";
    $("#welcome-email").textContent = currentAccountEmail();
    setOverlay("welcome-overlay", true);
  }
  function startAuthorizedSync() {
    if (!isSupabaseConfigured()) return;
    void loadWhatsAppNumber(true);
    if (!navigator.onLine) return;
    if (state.content.dataset !== "remote") void loadInitialRemoteData();
    else if (state.premiumContentStale && hasActivePro()) {
      state.premiumContentStale = false;
      void loadInitialRemoteData();
    } else void checkForUpdates({ silent: true });
  }
  async function enterAuthorizedApp({ guestFree = false } = {}) {
    state.guestFree = Boolean(guestFree && !state.session);
    state.authenticatedAppVisible = true;
    recomputeFreeTextIds();
    await pruneRestrictedCache();
    hideAuthGate();
    setOverlay("welcome-overlay", false);
    const shell = $("#app-shell");
    shell.hidden = false;
    shell.inert = false;
    renderAll();
    updateConnection();
    if (state.activeReader && lawById(state.activeReader.lawId) && canReadText(lawById(state.activeReader.lawId))) {
      const resume = { ...state.activeReader };
      setTimeout(() => openReader(resume.lawId, resume.articleKey || resume.articleNumber || "", false, { resume: true, scrollTop: Number(resume.scrollTop) || 0 }), 120);
    }
    startAuthorizedSync();
  }
  function updateAuthLoading(isLoading) {
    state.authLoading = Boolean(isLoading);
    $("#auth-submit").disabled = state.authLoading || !state.authBootstrapComplete;
    $("#auth-mode-toggle").disabled = state.authLoading || !state.authBootstrapComplete;
    $("#auth-submit-label").textContent = state.authLoading ? "Connexion…" : state.authMode === "signup" ? "Créer mon compte" : "Se connecter";
  }
  async function handleAuthSubmit(event) {
    event.preventDefault();
    if (!state.authBootstrapComplete || state.authLoading) return;
    if (!isSupabaseConfigured()) { showAuthMessage("La configuration Supabase publique est absente ou invalide."); return; }
    if (!navigator.onLine) { showAuthMessage("Une connexion Internet est nécessaire pour créer un compte ou se connecter."); return; }
    const emailField = $("#auth-email");
    const email = String(emailField.value || "").trim().toLowerCase();
    const password = String($("#auth-password").value || "");
    if (!email || !password) { showAuthMessage("Saisissez votre adresse e-mail et votre mot de passe."); return; }
    if (!emailField.checkValidity()) { showAuthMessage("Saisissez une adresse e-mail valide."); emailField.focus(); return; }
    const mode = state.authMode;
    if (mode === "signup" && password.length < 6) { showAuthMessage("Choisissez un mot de passe d’au moins six caractères."); $("#auth-password").focus(); return; }
    updateAuthLoading(true);
    showAuthMessage("");
    try {
      if (mode === "signup") {
        const data = await authRequest("signup", { body: { email, password } });
        state.user = data?.user || { email };
        state.profile = { id: String(state.user.id || ""), email, status: "pending", expires_at: null };
        if (data?.access_token && data?.refresh_token) {
          applyAuthResponse(data);
          let user = data.user || state.user;
          if (!user?.id) {
            try { user = await authRequest("user", { method: "GET", accessToken: state.session.access_token }); }
            catch (error) { console.warn("Profil Auth post-inscription non vérifiable immédiatement", error.message); }
          }
          if (user?.id) { state.user = user; storeSession({ ...state.session, user }); }
          else if (state.user?.email) storeSession({ ...state.session, user: state.user });
          await refreshMembership();
        } else {
          state.session = null;
          state.guestFree = true;
        }
        state.authBootstrapComplete = true;
        await loadWhatsAppNumber(true);
        showWelcome();
      } else {
        const data = await authRequest("token?grant_type=password", { body: { email, password } });
        applyAuthResponse(data);
        const user = data.user || await authRequest("user", { method: "GET", accessToken: state.session.access_token });
        if (!user?.id) throw new Error("Supabase n’a pas retourné votre compte.");
        state.user = user;
        storeSession({ ...state.session, user });
        await refreshMembership();
        state.authBootstrapComplete = true;
        await loadWhatsAppNumber(true);
        await enterAuthorizedApp();
      }
    } catch (error) {
      showAuthMessage(error.message || "Échec de l’authentification. Réessayez.");
    } finally { updateAuthLoading(false); }
  }
  async function signOutMobileUser() {
    const token = state.session?.access_token;
    if (token && isSupabaseConfigured() && navigator.onLine) {
      try { await authRequest("logout", { accessToken: token }); }
      catch (error) { console.warn("Déconnexion distante ignorée", error.message); }
    }
    storeSession(null);
    state.user = null; state.profile = null; state.guestFree = false; state.authenticatedAppVisible = false;
    state.pendingPaywallLawId = ""; state.currentLaw = null; state.currentArticleTarget = ""; state.activeReader = null;
    state.readerSearchIndex = new Map();
    await kvSet(MEMBERSHIP_CACHE_KEY, null);
    await kvSet("activeReader", null);
    await pruneRestrictedCache();
    ["welcome-overlay", "pro-required-overlay", "preview-overlay"].forEach(id => setOverlay(id, false));
    setAuthMode("login");
    state.authBootstrapComplete = true;
    showAuthMessage("");
    showAuthGate();
  }
  function showProRequired(law = null) {
    if (law && canReadText(law)) return false;
    state.pendingPaywallLawId = law ? lawKey(law) : "";
    const titleNode = $("#pro-required-law");
    if (law) {
      titleNode.textContent = `Texte demandé : ${law.title}`;
      titleNode.hidden = false;
    } else titleNode.hidden = true;
    setOverlay("pro-required-overlay", true);
    return true;
  }
  async function handleProSubscription() {
    const law = state.pendingPaywallLawId ? lawById(state.pendingPaywallLawId) : null;
    if (law && canReadText(law)) {
      setOverlay("pro-required-overlay", false);
      state.pendingPaywallLawId = "";
      openReader(lawKey(law));
      return;
    }
    await openWhatsApp(upgradeMessage(law));
  }

  async function init() {
    installIcons();
    let seed = null;
    try {
      const response = await fetch("./data.json", { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      seed = normalizeContent(await response.json());
    } catch (error) {
      console.error("Impossible de charger la base embarquée", error);
    }
    const storedContent = normalizeContent(await kvGet("content"));
    state.content = storedContent && storedContent.legalTexts.length ? storedContent : (seed || { legalTexts: [], lexicon: [], dataset: "empty" });
    state.isDemo = state.content.dataset === "demo-unverified" || state.content.legalTexts.some(law => law.verificationStatus !== "verified");
    if (!storedContent && seed) await kvSet("content", seed);
    recomputeFreeTextIds();
    rebuildLexiconIndex();

    const storedFolders = await kvGet("favoriteFolders");
    const legacyFavorites = await kvGet("favorites");
    const fallbackFavorites = DEFAULT_FAVORITES.map(id => lawById(id)).filter(Boolean).map(lawKey);
    state.favoriteFolders = MBLData.normalizeFavoriteFolders(storedFolders ?? legacyFavorites, fallbackFavorites);
    sanitizeFavoriteFolders();
    await kvSet("favoriteFolders", state.favoriteFolders);
    const storedHistory = await kvGet("readingHistory");
    state.readingHistory = normalizeReadingHistory(storedHistory).filter(item => lawById(item.lawId));
    state.activeReader = await kvGet("activeReader");

    const settings = await kvGet("settings") || {};
    state.theme = settings.theme === "dark" ? "dark" : "light";
    state.fontSize = Number.isInteger(settings.fontSize) ? Math.max(0, Math.min(FONT_SIZES.length - 1, settings.fontSize)) : 0;
    state.lastSync = await kvGet("lastSync");
    applyTheme();
    $("#auth-bootstrap-status").textContent = isSupabaseConfigured() ? "Vérification de votre session…" : "Supabase n’est pas configuré.";
    const restored = await restoreAuthSession();
    state.authBootstrapComplete = true;
    if (!restored) {
      state.authenticatedAppVisible = false;
      showAuthGate();
      return;
    }
    await enterAuthorizedApp();
    if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1") && location.hostname !== "appassets.androidplatform.net") {
      navigator.serviceWorker.register("./sw.js").catch(error => console.warn("Service worker non activé", error));
    }
  }

  function renderAll() {
    renderTypeFilters(); renderHome(); renderDirectory(); renderTypes(); renderFavorites(); renderLexicon(); renderReadingHistory(); renderReader(); renderProfile(); updateFavoriteIndicators();
  }
  function renderTypeFilters() {
    const root = $("#type-filters");
    const options = [{ value: "ALL", label: "Tous les textes" }, ...TYPES.map(type => ({ value: type, label: type }))];
    root.innerHTML = options.map(option => `<button class="filter-pill${state.type === option.value ? " is-active" : ""}" type="button" data-type="${escapeHtml(option.value)}">${escapeHtml(option.label)}</button>`).join("");
  }
  function statusBadge(law = {}) {
    const safeLaw = law && typeof law === "object" && !Array.isArray(law) ? law : {};
    const verificationStatus = String(safeLaw?.verificationStatus || "unverified");
    if (verificationStatus !== "verified") return `<span class="status-chip status-demo">${icon("warning", 13)} ${state.content.dataset === "remote" ? "À vérifier" : "Démo · à vérifier"}</span>`;
    const lawStatus = String(safeLaw?.status || "inconnu");
    const status = lawStatus === "abroge" ? "status-abroge" : "";
    const label = String(safeLaw?.statusLabel || (lawStatus === "en_vigueur" ? "En vigueur" : lawStatus));
    return `<span class="status-chip ${status}">${icon(lawStatus === "en_vigueur" ? "check" : "file", 13)} ${escapeHtml(label)}</span>`;
  }
  function renderHome() {
    const disclaimer = $("#content-disclaimer");
    if (disclaimer) disclaimer.textContent = state.content.dataset === "remote"
      ? "Les références, la consolidation et le statut des textes doivent être vérifiés auprès des sources officielles."
      : "Les extraits de démonstration et leur statut ne sont pas vérifiés. Consultez toujours le Journal Officiel.";
    const query = normalizeSearch(state.query);
    const filtered = state.content.legalTexts.filter(law => {
      if (state.type !== "ALL" && law.type !== state.type) return false;
      if (state.domain !== "ALL" && law.domain !== state.domain) return false;
      if (!query) return true;
      const metadata = [law?.title, law?.summary, law?.code, law?.domain, law?.type, ...(Array.isArray(law?.hashtags) ? law.hashtags : [])];
      if (metadata.some(value => normalizeSearch(value).includes(query))) return true;
      return (Array.isArray(law?.articles) ? law.articles : []).some(article =>
        normalizeSearch(MBLData.readText(article?.text ?? article?.content ?? article?.body ?? "")).includes(query)
      );
    });
    $("#results-count").textContent = `${filtered.length} texte${filtered.length === 1 ? "" : "s"} disponible${filtered.length === 1 ? "" : "s"}`;
    const chip = $("#domain-filter-chip");
    chip.hidden = state.domain === "ALL";
    $("#domain-filter-label").textContent = state.domain === "ALL" ? "" : state.domain;
    if (!filtered.length) {
      $("#law-list").innerHTML = `<div class="empty-state"><div class="empty-icon">${icon("folder", 30)}</div><strong>Aucun texte trouvé</strong><p>Modifiez les filtres ou essayez un autre mot-clé.</p></div>`;
      return;
    }
    $("#law-list").innerHTML = filtered.map(law => {
      const free = isFreeText(law);
      const accessible = canReadText(law);
      const accessBadge = free
        ? '<span class="law-access-badge is-free">GRATUIT</span>'
        : hasActivePro() ? '<span class="law-access-badge is-pro-active">PRO</span>' : '<span class="law-access-badge">PRO REQUIS</span>';
      const contentLabel = accessible
        ? `${law.articles.length} art.`
        : "Accès Pro 🔒";
      return `
      <article class="law-card" tabindex="0" role="button" data-open-law="${escapeHtml(law.id)}" aria-label="${accessible ? "Consulter" : "Débloquer"} ${escapeHtml(law.title)}">
        <div class="card-topline">${statusBadge(law)}${accessBadge}<span class="category-label">${escapeHtml(law.domain)}</span></div>
        <h2 class="law-title">${highlight(law.title, state.query)}</h2>
        <p class="law-summary">${highlight(law.summary, state.query)}</p>
        <div class="hashtags">${law.hashtags.slice(0, 5).map(tag => `<span class="hashtag">${highlight(tag, state.query)}</span>`).join("")}</div>
        <div class="card-footer"><span>${escapeHtml(law.code)}</span><span class="consult-link">${contentLabel} ${icon("chevron", 14)}</span></div>
      </article>`;
    }).join("");
  }
  const DOMAIN_ICONS = {
    "Droit Constitutionnel": "landmark", "Droit du Travail": "briefcase", "Droit Foncier": "map", "Droit Pénal & Procédure": "gavel",
    "Droit Commercial & des Affaires": "chart", "Droit de l'Environnement": "tree"
  };
  function renderDirectory() {
    const groups = new Map();
    state.content.legalTexts.forEach(law => {
      if (!groups.has(law.domain)) groups.set(law.domain, { count: 0, icon: DOMAIN_ICONS[law.domain] || "book" });
      groups.get(law.domain).count++;
    });
    $("#domains-list").innerHTML = [...groups.entries()].map(([name, details]) => `
      <button class="domain-card" type="button" data-domain="${escapeHtml(name)}"><span class="domain-symbol">${icon(details.icon, 25)}</span><span class="domain-copy"><strong>${escapeHtml(name)}</strong><small>${details.count} texte${details.count === 1 ? "" : "s"} répertorié${details.count === 1 ? "" : "s"}</small></span><span class="chevron">${icon("chevron", 17)}</span></button>`).join("") || `<div class="empty-state"><strong>Répertoire vide</strong><p>Les textes apparaîtront après configuration de la base.</p></div>`;
  }
  function renderTypes() {
    $("#types-grid").innerHTML = TYPES.map(type => {
      const count = state.content.legalTexts.filter(law => law.type === type).length;
      return `<button class="type-card" type="button" data-type-card="${escapeHtml(type)}"><strong>${escapeHtml(type)}</strong><span>${count} texte${count === 1 ? "" : "s"}</span></button>`;
    }).join("");
  }
  function totalFavoriteCount() {
    return state.favoriteFolders.reduce((total, folder) => total + (folder.items?.length || 0), 0);
  }
  function isLawFavorited(law) {
    const key = lawKey(law);
    return state.favoriteFolders.some(folder => folder.items.some(item => item.type === "law" && lawById(item.lawId) && lawKey(lawById(item.lawId)) === key));
  }
  function isArticleFavorited(law, article) {
    const key = lawKey(law);
    return state.favoriteFolders.some(folder => folder.items.some(item => item.type === "article"
      && lawById(item.lawId) && lawKey(lawById(item.lawId)) === key
      && (item.articleKey === article.key || (!item.articleKey && item.articleNumber === article.number))));
  }
  function sanitizeFavoriteFolders() {
    if (!Array.isArray(state.favoriteFolders)) state.favoriteFolders = MBLData.normalizeFavoriteFolders(null, []);
    state.favoriteFolders = state.favoriteFolders.map(folder => ({ ...folder, items: (folder.items || []).flatMap(item => {
      const law = lawById(item.lawId);
      if (!law) return [];
      if (item.type !== "article") return [{ type: "law", lawId: lawKey(law) }];
      const article = law.articles.find(entry => entry.key === item.articleKey) || law.articles.find(entry => entry.number === item.articleNumber);
      return article ? [{ type: "article", lawId: lawKey(law), articleKey: article.key, articleNumber: article.number }] : [];
    }) }));
    if (!state.favoriteFolders.some(folder => folder.id === "default")) state.favoriteFolders.unshift({ id: "default", name: "Favoris", items: [] });
  }
  async function saveFavoriteFolders() {
    await kvSet("favoriteFolders", state.favoriteFolders);
    renderFavorites(); renderProfile(); updateFavoriteIndicators();
  }
  function renderFavorites() {
    const root = $("#favorites-list");
    if (!state.favoriteFolders.length) state.favoriteFolders = MBLData.normalizeFavoriteFolders(null, []);
    const total = totalFavoriteCount();
    const notice = total ? "" : `<div class="empty-state"><div class="empty-icon">${icon("bookmark", 28)}</div><strong>Vos dossiers sont prêts</strong><p>Ouvrez un texte ou un article, puis touchez le signet pour le classer.</p></div>`;
    root.innerHTML = `${notice}${state.favoriteFolders.map((folder, index) => {
      const items = folder.items.map(item => {
        const law = lawById(item.lawId);
        if (!law) return "";
        const article = item.type === "article" ? law.articles.find(entry => entry.key === item.articleKey || entry.number === item.articleNumber) : null;
        const title = article ? `${law.title} · ${article.number}` : law.title;
        const subtitle = article ? `${law.code || law.domain} · Article favori` : `${law.code || law.domain} · Texte complet`;
        const removeKey = MBLData.favoriteItemKey(item);
        return `<div class="favorite-item"><button class="favorite-open" type="button" data-open-law="${escapeHtml(lawKey(law))}" data-open-article="${escapeHtml(article?.key || "")}"><small>${escapeHtml(subtitle)}</small><strong>${escapeHtml(title)}</strong></button><button class="favorite-remove" type="button" data-action="remove-favorite-item" data-folder-id="${escapeHtml(folder.id)}" data-item-key="${escapeHtml(removeKey)}" aria-label="Retirer des favoris">${icon("trash", 15)}</button></div>`;
      }).join("");
      return `<details class="favorite-folder"${index === 0 ? " open" : ""}><summary class="favorite-folder-summary"><span class="favorite-folder-icon">${icon("folder", 17)}</span><span class="favorite-folder-copy"><strong>${escapeHtml(folder.name)}</strong><small>${folder.items.length} élément${folder.items.length === 1 ? "" : "s"}</small></span><span class="favorite-folder-manage"><button type="button" data-action="rename-favorite-folder" data-folder-id="${escapeHtml(folder.id)}" aria-label="Renommer ${escapeHtml(folder.name)}">${icon("pencil", 14)}</button>${folder.id === "default" ? "" : `<button type="button" data-action="delete-favorite-folder" data-folder-id="${escapeHtml(folder.id)}" aria-label="Supprimer ${escapeHtml(folder.name)}">${icon("trash", 14)}</button>`}</span></summary><div class="favorite-folder-items">${items || `<p class="favorite-empty">Aucun favori dans ce dossier.</p>`}</div></details>`;
    }).join("")}`;
  }
  function renderLexicon() {
    const query = normalizeSearch(state.lexiconQuery);
    const terms = state.content.lexicon.filter(item => !query || normalizeSearch(`${item.term} ${item.category}`).includes(query));
    if (!terms.length) {
      $("#lexicon-list").innerHTML = `<div class="empty-state"><strong>Aucun terme trouvé</strong><p>Essayez un autre terme de recherche.</p></div>`;
      return;
    }
    const limit = state.lexiconQuery ? Math.max(state.lexiconLimit, 120) : state.lexiconLimit;
    const visible = terms.slice(0, limit);
    $("#lexicon-list").innerHTML = `${visible.map(item => `<article class="lexicon-card"><h3><button class="lexicon-term-open" type="button" data-lexicon-term="${escapeHtml(item.term)}" data-lexicon-category="${escapeHtml(item.category)}">${icon("dictionary", 14)} ${highlight(item.term, state.lexiconQuery)}</button></h3><small class="lexicon-category-label">${escapeHtml(item.category)}</small><p>${escapeHtml(item.definition)}</p></article>`).join("")}${terms.length > visible.length ? `<button class="secondary-button lexicon-show-more" type="button" data-action="show-more-lexicon">Afficher davantage (${terms.length - visible.length} entrée(s) restante(s))</button>` : ""}`;
  }
  function renderReadingHistory() {
    const recent = state.readingHistory.filter(item => lawById(item.lawId)).sort((a, b) => b.readAt - a.readAt).slice(0, 5);
    const homePanel = $("#reading-history-panel");
    const homeRoot = $("#reading-history-list");
    const modalRoot = $("#reader-history-list");
    const renderCards = () => recent.map(item => {
      const law = lawById(item.lawId);
      const date = new Date(item.readAt);
      const dateLabel = Number.isNaN(date.getTime()) ? "Récemment consulté" : date.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
      const articleLabel = item.articleNumber ? `Reprendre à ${item.articleNumber}` : "Reprendre la lecture";
      return `<button class="recent-read-card" type="button" data-open-law="${escapeHtml(lawKey(law))}" data-open-article="${escapeHtml(item.articleKey || "")}" data-open-article-number="${escapeHtml(item.articleNumber || "")}" data-resume-scroll="${Math.max(0, Number(item.scrollTop) || 0)}"><small>${escapeHtml(dateLabel)} · ${escapeHtml(law.code || law.domain)}</small><strong>${escapeHtml(law.title)}</strong><span>${escapeHtml(articleLabel)}</span></button>`;
    }).join("");
    if (homePanel && homeRoot) {
      homePanel.hidden = recent.length === 0;
      homeRoot.innerHTML = renderCards();
    }
    if (modalRoot) modalRoot.innerHTML = recent.length
      ? renderCards()
      : `<div class="history-empty-state"><span>${icon("clock", 25)}</span><strong>Aucune lecture récente</strong><p>Les textes ouverts apparaîtront ici pour une reprise rapide.</p></div>`;
    const clearButton = $("#history-clear-button");
    if (clearButton) clearButton.disabled = recent.length === 0;
  }
  function normalizeReadingHistory(value) {
    if (!Array.isArray(value)) return [];
    return value.map(item => ({
      lawId: String(item?.lawId ?? item?.law_id ?? ""),
      articleKey: String(item?.articleKey ?? item?.article_key ?? ""),
      articleNumber: String(item?.articleNumber ?? item?.article_number ?? ""),
      scrollTop: Math.max(0, Number(item?.scrollTop ?? item?.scroll_top) || 0),
      readAt: Number(item?.readAt ?? item?.read_at) || Date.parse(item?.readAt ?? item?.read_at ?? "") || Date.now()
    })).filter(item => item.lawId);
  }
  function recordReading(law, articleKey = "", articleNumber = "", scrollTop = 0, { persistActive = true, render = true } = {}) {
    if (!law) return;
    const key = lawKey(law);
    const entry = { lawId: key, articleKey: String(articleKey || ""), articleNumber: String(articleNumber || ""), scrollTop: Math.max(0, Number(scrollTop) || 0), readAt: Date.now() };
    state.readingHistory = [entry, ...state.readingHistory.filter(item => lawKey(lawById(item.lawId) || { id: item.lawId }) !== key)].slice(0, 12);
    void kvSet("readingHistory", state.readingHistory);
    if (persistActive) {
      state.activeReader = { ...entry };
      void kvSet("activeReader", state.activeReader);
    }
    if (render) renderReadingHistory();
  }
  function persistReadingPosition() {
    if (!state.currentLaw || $("#view-lecture").hidden) return;
    const scroll = $("#reader-scroll");
    const cards = $$(".article-card[data-article-key]", $("#reader-articles"));
    const visibleTop = scroll.getBoundingClientRect().top + 90;
    const currentCard = cards.find(card => card.getBoundingClientRect().bottom > visibleTop) || cards[cards.length - 1];
    const articleKey = currentCard?.dataset.articleKey || state.currentArticleTarget || "";
    const articleNumber = currentCard?.dataset.articleNumber || "";
    recordReading(state.currentLaw, articleKey, articleNumber, scroll.scrollTop, { render: false });
  }
  function scheduleReadingPositionSave() {
    clearTimeout(state.readingSaveTimer);
    state.readingSaveTimer = setTimeout(persistReadingPosition, 280);
  }
  async function clearReadingHistory() {
    state.readingHistory = [];
    state.activeReader = null;
    await Promise.all([kvSet("readingHistory", []), kvSet("activeReader", null)]);
    renderReadingHistory();
    if (!$("#reading-history-overlay").hidden) setOverlay("reading-history-overlay", false);
    showToast("Historique de lecture effacé.");
  }
  function totalArticleCount() { return state.content.legalTexts.reduce((sum, law) => sum + law.articles.length, 0); }
  function renderProfile() {
    const proActive = hasActivePro();
    const profileStatus = currentProfileStatus();
    const profileExpiry = state.profile?.expires_at ? new Date(state.profile.expires_at) : null;
    $("#profile-plan-title").textContent = proActive ? "Accès Pro actif" : profileStatus === "active" || profileStatus === "expired" ? "Accès Pro expiré" : "Mode Freemium";
    $("#profile-plan-badge").textContent = proActive ? "PRO" : "FREEMIUM";
    $("#profile-plan-badge").classList.toggle("is-pro", proActive);
    $("#profile-pro-badge").hidden = !proActive;
    $("#profile-account-email").textContent = currentAccountEmail() || "Compte invité · session non confirmée";
    $("#profile-plan-detail").textContent = proActive && profileExpiry && !Number.isNaN(profileExpiry.getTime())
      ? `Accès complet jusqu’au ${profileExpiry.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}.`
      : profileStatus === "active" || profileStatus === "expired"
        ? "L’accès Pro est expiré ou sa date de fin est invalide. Les cinq textes gratuits et le Lexique restent accessibles."
        : "Le Lexique est gratuit et illimité; cinq textes du catalogue sont accessibles sans abonnement.";
    $("#profile-upgrade-button").textContent = proActive ? "Contacter WhatsApp pour renouveler" : "Souscrire via WhatsApp";
    $("#profile-logout-button").hidden = !state.session;
    $("#profile-login-button").hidden = Boolean(state.session);
    $("#profile-favorites-count").textContent = totalFavoriteCount();
    $("#profile-text-count").textContent = state.content.legalTexts.length;
    $("#storage-summary").textContent = `${state.content.legalTexts.length} textes · ${totalArticleCount()} articles · ${state.content.lexicon.length} termes hors ligne`;
    const bytes = new Blob([JSON.stringify(state.content)]).size;
    const size = bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} Ko` : `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
    $("#storage-size").textContent = `${size} / 50 Mo`;
    $("#storage-meter-fill").style.width = `${Math.min(100, Math.max(5, bytes / (50 * 1024 * 1024) * 100))}%`;
    const date = state.lastSync ? new Date(state.lastSync) : null;
    $("#last-sync-label").textContent = date && !Number.isNaN(date.getTime()) ? date.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }) : "Jamais";
    $("#storage-state").textContent = state.syncing ? (state.syncMode === "check" ? "Vérification…" : "Mise à jour…") : (state.content.dataset === "remote" ? "Supabase synchronisé" : state.isDemo ? "Cache démo actif" : "Cache local prêt");
    $("#sync-button").disabled = state.syncing;
    $("#sync-button").classList.toggle("is-busy", state.syncing);
    $("#sync-label").textContent = state.syncing ? (state.syncMode === "check" ? "Vérification des nouveautés…" : "Téléchargement des textes…") : "Vérifier les mises à jour";
    $("#sync-note").innerHTML = isSupabaseConfigured()
      ? "Lecture seule via Supabase : <code>catalog</code>, <code>text_contents</code> et <code>lexicons</code>. Le cache local permet de lire hors ligne."
      : 'Mode hors ligne fonctionnel. Configurez <code>config.js</code> avec l’URL Supabase et la clé publishable pour activer la synchronisation.';
    $("#theme-toggle").classList.toggle("is-on", state.theme === "dark");
    $("#font-size-label").textContent = FONT_SIZES[state.fontSize];
  }
  function updateFavoriteIndicators() {
    $("#favorites-dot").hidden = totalFavoriteCount() === 0;
    const button = $("#reader-bookmark-button");
    if (button && state.currentLaw) {
      const saved = isLawFavorited(state.currentLaw);
      button.innerHTML = icon("bookmark", 21);
      button.classList.toggle("is-saved", saved);
      button.setAttribute("aria-label", saved ? "Texte déjà classé en favoris" : "Classer le texte en favoris");
      $$("[data-action='favorite-article'][data-article-key]", $("#reader-articles")).forEach(articleButton => {
        const article = state.currentLaw.articles.find(item => item.key === articleButton.dataset.articleKey);
        if (!article) return;
        const articleSaved = isArticleFavorited(state.currentLaw, article);
        articleButton.classList.toggle("is-saved", articleSaved);
        articleButton.setAttribute("aria-label", articleSaved ? `${article.number} déjà classé en favoris` : `Classer ${article.number} en favoris`);
      });
    }
  }
  function updateConnection() {
    const offline = !navigator.onLine;
    const configured = isSupabaseConfigured();
    const synced = state.content.dataset === "remote";
    const dot = $("#connection-dot");
    dot.classList.toggle("is-offline", offline || !configured || !synced);
    $("#connection-label").textContent = offline ? "Hors ligne · cache local" : synced ? "Supabase synchronisé" : configured ? "Connexion Supabase en attente" : "Base locale prête";
    $("#demo-pill").hidden = !state.isDemo;
    $("#demo-pill").textContent = synced ? "À VÉRIFIER" : "DÉMO";
    $("#profile-online").style.background = offline || !synced ? "#f0ad35" : "#18bd91";
    $("#profile-offline-label").textContent = offline ? "Hors ligne" : "Disponible";
    renderProfile();
  }

  function switchTab(tab) {
    if (state.tab === "lecture" && tab !== "lecture") persistReadingPosition();
    if (state.tab !== "lecture" && tab === "lecture") state.returnTab = state.tab;
    state.tab = tab;
    $$("[data-view]").forEach(view => { view.hidden = view.dataset.view !== tab; });
    $$(".nav-item").forEach(item => item.classList.toggle("nav-active", item.dataset.tab === tab));
    $("#main-scroll").scrollTop = 0;
    if (tab === "lecture") applyReaderFontSize();
  }
  function setType(type) {
    state.type = type;
    renderTypeFilters(); renderHome();
  }
  function setDomain(domain) {
    state.domain = domain;
    state.type = "ALL";
    renderTypeFilters(); renderHome(); switchTab("recherche");
  }
  function resetFilters() {
    state.query = ""; state.type = "ALL"; state.domain = "ALL";
    $("#search-input").value = "";
    renderTypeFilters(); renderHome();
  }
  function applyTheme() {
    document.body.classList.toggle("dark", state.theme === "dark");
    const themeIconName = state.theme === "dark" ? "sun" : "moon";
    $("#theme-icon").innerHTML = icon(themeIconName, 18);
    $("#profile-theme-icon").innerHTML = icon(themeIconName, 20);
    document.querySelector('meta[name="theme-color"]').content = state.theme === "dark" ? "#0d1424" : "#191747";
  }
  async function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    applyTheme(); renderProfile();
    const settings = await kvGet("settings") || {};
    await kvSet("settings", { ...settings, theme: state.theme, fontSize: state.fontSize });
  }
  function applyReaderFontSize() {
    const reader = $("#view-lecture");
    reader.classList.toggle("reader-font-large", state.fontSize === 1);
    reader.classList.toggle("reader-font-xlarge", state.fontSize >= 2);
    $("#reader-font-size").textContent = FONT_SIZES[state.fontSize];
    $("[data-action='font-down']").disabled = state.fontSize <= 0;
    $("[data-action='font-up']").disabled = state.fontSize >= FONT_SIZES.length - 1;
  }
  async function setFontSize(value, notify = false) {
    state.fontSize = Math.max(0, Math.min(FONT_SIZES.length - 1, Number(value) || 0));
    applyReaderFontSize();
    renderProfile();
    const settings = await kvGet("settings") || {};
    await kvSet("settings", { ...settings, theme: state.theme, fontSize: state.fontSize });
    if (notify) showToast(`Taille du texte : ${FONT_SIZES[state.fontSize]}`);
  }
  function cycleFontSize() { void setFontSize((state.fontSize + 1) % FONT_SIZES.length, true); }
  function changeFontSize(delta) { void setFontSize(state.fontSize + delta, true); }
  function setOverlay(id, isOpen) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.hidden = !isOpen;
    overlay.inert = !isOpen;
    overlay.setAttribute("aria-hidden", String(!isOpen));
    if (isOpen) document.body.classList.add("overlay-open");
    else if ($$(".overlay:not([hidden])").length === 0) document.body.classList.remove("overlay-open");
  }
  function closeAllOverlays() {
    ["preview-overlay", "info-overlay", "toc-overlay", "reading-history-overlay"].forEach(id => setOverlay(id, false));
  }
  function findArticleByTarget(law, target) {
    const value = String(target || "");
    const articles = Array.isArray(law?.articles) ? law.articles : [];
    if (!value) return null;
    return articles.find(article => String(article?.key || "") === value)
      || articles.find(article => normalizeSearch(article?.number) === normalizeSearch(value))
      || null;
  }
  function articleAnchorId(article) { return `article-${slug(article.key || article.number)}`; }
  function setHierarchyExpanded(details, expanded) {
    if (!details) return;
    details.open = expanded;
    const key = details.dataset.hierarchyKey;
    if (key) state.readerAccordionState[key] = expanded;
  }
  function expandAncestors(node, includeSelf = false) {
    let current = includeSelf && node?.tagName === "DETAILS" ? node : node?.parentElement;
    while (current && current !== $("#reader-articles")) {
      if (current.tagName === "DETAILS") setHierarchyExpanded(current, true);
      current = current.parentElement;
    }
  }
  function markTargetArticle(article) {
    $$(".article-card.is-target", $("#reader-articles")).forEach(card => card.classList.remove("is-target"));
    state.currentArticleTarget = article?.key || "";
    if (article) document.getElementById(articleAnchorId(article))?.classList.add("is-target");
  }
  function openReader(id, articleTarget = "", fromPreview = false, options = {}) {
    const law = lawById(id);
    if (!law) { showToast("Ce texte n'est pas disponible dans le cache local."); return; }
    if (!canReadText(law)) {
      if (fromPreview) { state.preview = null; setOverlay("preview-overlay", false); }
      showProRequired(law);
      return;
    }
    const sameLaw = Boolean(state.currentLaw && lawKey(state.currentLaw) === lawKey(law));
    const prior = state.readingHistory.find(item => lawKey(lawById(item.lawId) || { id: item.lawId }) === lawKey(law));
    const rememberedTarget = options.resume
      ? options.articleKey || options.articleNumber || ""
      : (!articleTarget && prior?.scrollTop > 0 ? prior.articleKey || prior.articleNumber || "" : "");
    const target = articleTarget || rememberedTarget;
    const targetArticle = findArticleByTarget(law, target) || (options.resume && options.articleNumber ? findArticleByTarget(law, options.articleNumber) : null);
    const shouldResume = Boolean(options.resume || (!articleTarget && prior && prior.scrollTop > 0));
    const previousPage = state.readerPage;
    if (!$("#reading-history-overlay").hidden) setOverlay("reading-history-overlay", false);
    if (!sameLaw) {
      clearTimeout(state.readerSearchTimer);
      state.readerSearchTimer = null;
      state.readerSearchGeneration++;
      state.currentLaw = law;
      state.currentArticleTarget = "";
      state.readerAccordionState = {};
      state.readerTree = null;
      state.readerIndexedLaw = null;
      state.readerIndexedPage = -1;
      state.readerPage = 0;
      state.readerSearchIndex = new Map();
      $("#reader-search").value = "";
      state.readerMatchIndex = 0;
      $("#reader-scroll").scrollTop = 0;
    } else {
      state.currentLaw = law;
    }
    if (targetArticle) {
      state.currentArticleTarget = String(targetArticle.key || "");
      const articleIndex = (Array.isArray(law.articles) ? law.articles : []).findIndex(article => String(article?.key || "") === state.currentArticleTarget);
      if (articleIndex >= 0) state.readerPage = Math.floor(articleIndex / READER_PAGE_SIZE);
    }
    state.readerResumeScrollTop = shouldResume ? Math.max(0, Number(options.scrollTop ?? prior?.scrollTop) || 0) : 0;
    if (fromPreview) setOverlay("preview-overlay", false);
    if (!sameLaw || previousPage !== state.readerPage || state.readerIndexedLaw !== law || state.readerIndexedPage !== state.readerPage) renderReader();
    switchTab("lecture");
    applyReaderFontSize();
    if (sameLaw && targetArticle) markTargetArticle(targetArticle);
    const articleKey = targetArticle?.key || (shouldResume ? prior?.articleKey || options.articleKey || "" : state.currentArticleTarget || "");
    const articleNumber = targetArticle?.number || (shouldResume ? prior?.articleNumber || options.articleNumber || "" : "");
    recordReading(law, articleKey, articleNumber, state.readerResumeScrollTop, { render: true });
    setTimeout(() => {
      if (state.currentLaw !== law) return;
      const scroller = $("#reader-scroll");
      if (targetArticle) {
        const targetNode = document.getElementById(articleAnchorId(targetArticle));
        if (targetNode) {
          expandAncestors(targetNode);
          if (shouldResume) scroller.scrollTop = state.readerResumeScrollTop;
          else targetNode.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (shouldResume) scroller.scrollTop = state.readerResumeScrollTop;
      } else if (shouldResume) {
        scroller.scrollTop = state.readerResumeScrollTop;
      }
      scheduleReadingPositionSave();
    }, 100);
  }
  function leaveLecture() {
    if (state.tab === "lecture") switchTab(state.returnTab || "recherche");
  }
  function renderTocNodes(nodes, path = []) {
    return (Array.isArray(nodes) ? nodes : []).map(rawNode => {
      const node = rawNode && typeof rawNode === "object" ? rawNode : {};
      if (node.kind === "article") {
        const article = node.article && typeof node.article === "object" ? node.article : {};
        return `<button class="toc-entry toc-article-entry" type="button" data-action="jump-to-toc" data-toc-kind="article" data-article-key="${escapeHtml(article?.key || "")}"><span class="toc-level">Article</span><span>${escapeHtml(article?.number || "Article")}</span></button>`;
      }
      const levelKey = String(node?.level || "structure");
      const label = String(node?.label || "Structure");
      const nextPath = [...path, `${levelKey}:${label}`];
      const key = encodeURIComponent(nextPath.join("\u001f"));
      const level = ({ book: "Livre", title: "Titre", chapter: "Chapitre", section: "Section" })[levelKey] || "Structure";
      return `<div class="toc-group"><button class="toc-entry toc-${escapeHtml(levelKey)}" type="button" data-action="jump-to-toc" data-toc-kind="group" data-toc-key="${escapeHtml(key)}"><span class="toc-level">${escapeHtml(level)}</span><span>${escapeHtml(label)}</span></button><div class="toc-children">${renderTocNodes(node.children, nextPath)}</div></div>`;
    }).join("");
  }
  function readerPageInfo(law = state.currentLaw, page = state.readerPage) {
    return MBLData.paginateArticles(Array.isArray(law?.articles) ? law.articles : [], page, READER_PAGE_SIZE);
  }
  function renderReaderPagination(info, actionPrefix = "reader-page") {
    if (!info || info.total <= info.pageSize) return "";
    const first = info.total ? info.start + 1 : 0;
    return `<nav class="reader-pagination" aria-label="Navigation des articles">
      <button type="button" data-action="${actionPrefix}-prev"${info.page <= 0 ? " disabled" : ""}>‹ Précédents</button>
      <span>Articles ${first}–${info.end} / ${info.total}<small>Page ${info.page + 1} sur ${info.pageCount}</small></span>
      <button type="button" data-action="${actionPrefix}-next"${info.page >= info.pageCount - 1 ? " disabled" : ""}>Suivants ›</button>
    </nav>`;
  }
  function renderTocDrawer() {
    if (!state.currentLaw) return;
    const info = readerPageInfo();
    const first = info.total ? info.start + 1 : 0;
    $("#toc-subtitle").textContent = info.total > info.pageSize
      ? `${state.currentLaw.title} · articles ${first}–${info.end} sur ${info.total}`
      : state.currentLaw.title;
    $("#toc-list").innerHTML = `${renderTocNodes(Array.isArray(state.readerTree) ? state.readerTree : [])}${renderReaderPagination(info, "toc-page")}`;
  }
  function setReaderPage(requestedPage, { persist = true, resetScroll = true } = {}) {
    if (!state.currentLaw) return false;
    captureReaderAccordionState($("#reader-articles"));
    const info = readerPageInfo(state.currentLaw, requestedPage);
    if (info.page === state.readerPage && state.readerIndexedPage === info.page) return false;
    state.readerSearchGeneration++;
    state.readerPage = info.page;
    state.currentArticleTarget = "";
    state.readerResumeScrollTop = 0;
    renderReader();
    if (resetScroll) $("#reader-scroll").scrollTop = 0;
    const firstArticle = info.items[0];
    if (persist && firstArticle) recordReading(state.currentLaw, firstArticle.key, firstArticle.number, 0, { render: false });
    if (!$("#toc-overlay").hidden) renderTocDrawer();
    return true;
  }
  function openTocDrawer() {
    if (!state.currentLaw) { showToast("Ouvrez un texte pour afficher son sommaire."); return; }
    if (!state.readerTree?.length) { showToast("Aucun sommaire n'est disponible pour ce texte."); return; }
    renderTocDrawer();
    setOverlay("toc-overlay", true);
  }
  function jumpToToc(actionNode) {
    if (!state.currentLaw) return;
    const kind = actionNode.dataset.tocKind;
    setOverlay("toc-overlay", false);
    let targetNode = null;
    let article = null;
    if (kind === "article") {
      article = findArticleByTarget(state.currentLaw, actionNode.dataset.articleKey);
      if (article) {
        const articleIndex = (Array.isArray(state.currentLaw.articles) ? state.currentLaw.articles : []).findIndex(item => String(item?.key || "") === String(article.key || ""));
        const targetPage = articleIndex >= 0 ? Math.floor(articleIndex / READER_PAGE_SIZE) : state.readerPage;
        if (targetPage !== state.readerPage) {
          state.readerPage = targetPage;
          state.currentArticleTarget = String(article.key || "");
          renderReader();
        }
        targetNode = document.getElementById(articleAnchorId(article));
      }
      if (targetNode) markTargetArticle(article);
    } else {
      const key = actionNode.dataset.tocKey;
      const group = $$("details[data-hierarchy-key]", $("#reader-articles")).find(item => item.dataset.hierarchyKey === key);
      if (group) {
        targetNode = group.querySelector(":scope > summary");
        article = group.querySelector(".article-card[data-article-key]")
          ? findArticleByTarget(state.currentLaw, group.querySelector(".article-card[data-article-key]").dataset.articleKey)
          : null;
      }
    }
    if (!targetNode) return;
    expandAncestors(targetNode, targetNode.tagName === "DETAILS");
    targetNode.scrollIntoView({ behavior: "smooth", block: "start" });
    const key = article?.key || state.currentArticleTarget || "";
    const number = article?.number || "";
    recordReading(state.currentLaw, key, number, $("#reader-scroll").scrollTop, { render: true });
    scheduleReadingPositionSave();
  }
  function renderArticleCard(article = {}) {
    const safeArticle = article && typeof article === "object" && !Array.isArray(article) ? article : {};
    const law = state.currentLaw;
    const articleKey = String(safeArticle?.key ?? safeArticle?.id ?? "");
    const articleNumber = String(safeArticle?.number ?? safeArticle?.article_number ?? "Article");
    const articleStatus = String(safeArticle?.status ?? "EN_VIGUEUR").trim() || "EN_VIGUEUR";
    const articleText = MBLData.readText(safeArticle?.text ?? safeArticle?.content ?? safeArticle?.body ?? "");
    const normalizedArticle = { ...safeArticle, key: articleKey, number: articleNumber, status: articleStatus, text: articleText };
    const isTarget = Boolean(state.currentArticleTarget && (articleKey === state.currentArticleTarget || normalizeSearch(articleNumber) === normalizeSearch(state.currentArticleTarget)));
    const linkedText = renderLinkedArticleText(normalizedArticle, $("#reader-search").value, { trackSearch: true });
    const references = Array.isArray(safeArticle?.references) ? safeArticle.references : [];
    const definitionsList = Array.isArray(safeArticle?.definitions) ? safeArticle.definitions : [];
    const refs = references.map((reference, index) => linkedText.linkedIndexes.has(index) ? "" : `<button class="article-ref" type="button" data-reference-law="${escapeHtml(reference?.lawId ?? reference?.law_id ?? "")}" data-reference-article="${escapeHtml(reference?.article ?? reference?.article_number ?? "")}">${escapeHtml(reference?.label || reference?.article || reference?.article_number || "Ouvrir la référence")}</button>`).join("");
    const definitions = definitionsList.map(definition => {
      const term = String(definition?.term ?? "");
      const text = MBLData.readText(definition?.definition ?? definition?.text);
      const category = String(definition?.category || law?.domain || MBLData.GENERAL_CATEGORY);
      return term ? `<button class="article-ref" type="button" data-definition-term="${escapeHtml(term)}" data-definition-text="${escapeHtml(text)}" data-definition-category="${escapeHtml(category)}">Définition : ${escapeHtml(term)} · ${escapeHtml(category)}</button>` : "";
    }).join("");
    const saved = law ? isArticleFavorited(law, normalizedArticle) : false;
    const tools = `${isTarget ? `<span class="quoted-badge">Article ciblé</span>` : ""}<button class="article-tool-button" type="button" data-copy-article="${escapeHtml(articleKey)}" aria-label="Copier ${escapeHtml(articleNumber)}" title="Copier">${icon("copy", 16)}</button><button class="article-tool-button${saved ? " is-saved" : ""}" type="button" data-action="favorite-article" data-article-key="${escapeHtml(articleKey)}" aria-label="Classer ${escapeHtml(articleNumber)} en favoris" title="Ajouter aux favoris">${icon("bookmark", 16)}</button>`;
    return `<article class="article-card${isTarget ? " is-target" : ""}" id="${escapeHtml(articleAnchorId(normalizedArticle))}" data-article-key="${escapeHtml(articleKey)}" data-article-number="${escapeHtml(articleNumber)}" data-article-status="${escapeHtml(articleStatus)}"><div class="article-card-top"><span class="article-number">${highlight(articleNumber, $("#reader-search").value)}</span><span class="article-tools">${tools}</span></div><p class="article-text">${linkedText.html}</p><div class="article-ref-list">${definitions ? `<span class="article-ref-label">Termes &amp; définitions</span>${definitions}` : ""}${refs ? `<span class="article-ref-label">Autres références</span>${refs}` : ""}</div></article>`;
  }
  function captureReaderAccordionState(root = $("#reader-articles")) {
    if (!state.currentLaw || root.dataset.lawKey !== lawKey(state.currentLaw)) return;
    $$("details[data-hierarchy-key]", root).forEach(details => {
      state.readerAccordionState[details.dataset.hierarchyKey] = details.open;
    });
  }
  function renderArticleNodes(nodes, path = []) {
    return (Array.isArray(nodes) ? nodes : []).map(rawNode => {
      const node = rawNode && typeof rawNode === "object" ? rawNode : {};
      if (node.kind === "article") return renderArticleCard(node.article);
      const label = String(node.label ?? "Structure non renseignée");
      const nodeLevel = String(node.level ?? "structure");
      const level = ({ book: "Livre", title: "Titre", chapter: "Chapitre", section: "Section" })[nodeLevel] || "Structure";
      const nextPath = [...path, `${nodeLevel}:${label}`];
      const hierarchyKey = encodeURIComponent(nextPath.join("\u001f"));
      const open = Object.prototype.hasOwnProperty.call(state.readerAccordionState, hierarchyKey) ? state.readerAccordionState[hierarchyKey] : true;
      return `<details class="hierarchy-group hierarchy-${escapeHtml(nodeLevel)}" data-hierarchy-key="${escapeHtml(hierarchyKey)}"${open ? " open" : ""}><summary><span class="hierarchy-group-level">${escapeHtml(level)}</span><span>${escapeHtml(label)}</span></summary><div class="hierarchy-children">${renderArticleNodes(node.children, nextPath)}</div></details>`;
    }).join("");
  }
  function updateReaderSearchHighlights(query) {
    state.readerMatches = [];
    const root = $("#reader-articles");
    if (state.currentLaw && root && state.readerSearchIndex.size) {
      $$(".article-card[data-article-key]", root).forEach(card => {
        const indexed = state.readerSearchIndex.get(card.dataset.articleKey);
        if (!indexed) return;
        const body = $(".article-text", card);
        const number = $(".article-number", card);
        if (body) body.innerHTML = renderLinkedArticleText(indexed.article, query, { index: indexed }).html;
        if (number) number.innerHTML = highlight(indexed.article?.number || "Article", query);
      });
    }
    updateReaderSearchNavigation();
  }
  function updateReaderSearchNavigation() {
    const total = state.readerMatches.length;
    if (!total) state.readerMatchIndex = -1;
    else if (state.readerMatchIndex < 0 || state.readerMatchIndex >= total) state.readerMatchIndex = 0;
    const info = readerPageInfo();
    const hasQuery = Boolean(normalizeSearch($("#reader-search")?.value || ""));
    const pageLabel = info.pageCount > 1 ? ` · ${info.start + 1}–${info.end}/${info.total}` : "";
    $("#reader-search-status").textContent = `${total ? state.readerMatchIndex + 1 : 0} / ${total}${pageLabel}`;
    const canSearchOtherPages = hasQuery && info.pageCount > 1 && !state.readerSearchBusy;
    $("[data-action='reader-search-previous']").disabled = state.readerSearchBusy || (total < 2 && !canSearchOtherPages);
    $("[data-action='reader-search-next']").disabled = state.readerSearchBusy || (total < 2 && !canSearchOtherPages);
    const matches = $$(".reader-match[data-reader-match-index]");
    matches.forEach((node, index) => node.classList.toggle("is-current", index === state.readerMatchIndex));
  }
  function scrollToCurrentSearchMatch(fallbackArticle = null) {
    const match = $(`.reader-match[data-reader-match-index='${state.readerMatchIndex}']`);
    if (match) {
      let parent = match.parentElement;
      while (parent && parent !== $("#reader-articles")) {
        if (parent.tagName === "DETAILS") setHierarchyExpanded(parent, true);
        parent = parent.parentElement;
      }
      match.scrollIntoView({ behavior: "smooth", block: "center" });
      return true;
    }
    const article = fallbackArticle || null;
    const card = article ? document.getElementById(articleAnchorId(article)) : null;
    if (card) { card.scrollIntoView({ behavior: "smooth", block: "start" }); return true; }
    return false;
  }
  async function findReaderMatchOnAnotherPage(direction, query, generation) {
    const law = state.currentLaw;
    if (!law || state.readerSearchBusy) return;
    const currentPage = state.readerPage;
    const pageInfo = readerPageInfo(law, currentPage);
    if (pageInfo.pageCount <= 1) {
      const total = state.readerMatches.length;
      if (total) {
        state.readerMatchIndex = direction > 0 ? 0 : total - 1;
        updateReaderSearchNavigation();
        scrollToCurrentSearchMatch();
      }
      return;
    }
    state.readerSearchBusy = true;
    $("#reader-search-status").textContent = "Recherche…";
    $("[data-action='reader-search-previous']").disabled = true;
    $("[data-action='reader-search-next']").disabled = true;
    try {
      const normalizedQuery = normalizeSearch(query);
      for (let step = 1; step < pageInfo.pageCount; step++) {
        if (generation !== state.readerSearchGeneration || state.currentLaw !== law) return;
        const targetPage = (currentPage + direction * step + pageInfo.pageCount) % pageInfo.pageCount;
        const targetInfo = readerPageInfo(law, targetPage);
        let matchingArticle = null;
        for (const article of targetInfo.items) {
          if (generation !== state.readerSearchGeneration || state.currentLaw !== law) return;
          const text = MBLData.readText(article?.text ?? article?.content ?? article?.body ?? "");
          if (normalizeSearch(text).includes(normalizedQuery)) { matchingArticle = article; break; }
          await new Promise(resolve => setTimeout(resolve, 0));
        }
        if (matchingArticle) {
          state.readerPage = targetPage;
          state.currentArticleTarget = String(matchingArticle?.key || "");
          state.readerResumeScrollTop = 0;
          renderReader();
          if (state.readerMatches.length) state.readerMatchIndex = direction > 0 ? 0 : state.readerMatches.length - 1;
          updateReaderSearchNavigation();
          scrollToCurrentSearchMatch(matchingArticle);
          scheduleReadingPositionSave();
          return;
        }
      }
      if (generation === state.readerSearchGeneration && state.currentLaw === law) {
        const total = state.readerMatches.length;
        if (total) {
          state.readerMatchIndex = direction > 0 ? 0 : total - 1;
          updateReaderSearchNavigation();
          scrollToCurrentSearchMatch();
        } else $("#reader-search-status").textContent = `0 / 0 · aucun résultat`;
      }
    } catch (error) {
      handleUiError(error);
    } finally {
      state.readerSearchBusy = false;
      updateReaderSearchNavigation();
    }
  }
  function goToSearchMatch(direction) {
    const total = state.readerMatches.length;
    if (state.readerSearchBusy) return;
    if (total) {
      const nextIndex = state.readerMatchIndex + direction;
      if (nextIndex >= 0 && nextIndex < total) {
        state.readerMatchIndex = nextIndex;
        updateReaderSearchNavigation();
        scrollToCurrentSearchMatch();
        return;
      }
    }
    const query = String($("#reader-search")?.value || "");
    const info = readerPageInfo();
    if (normalizeSearch(query) && info.pageCount > 1) {
      void findReaderMatchOnAnotherPage(direction, query, state.readerSearchGeneration);
      return;
    }
    if (total) {
      state.readerMatchIndex = (state.readerMatchIndex + direction + total) % total;
      updateReaderSearchNavigation();
      scrollToCurrentSearchMatch();
    }
  }
  function renderReaderErrorBoundary(error) {
    state.readerErrorActive = true;
    console.error("Erreur capturée par le garde-fou du lecteur", error);
    const root = $("#reader-articles");
    if (root) {
      state.readerTree = null;
      state.readerIndexedLaw = null;
      state.readerIndexedPage = -1;
      state.readerSearchIndex = new Map();
      state.readerMatches = [];
      root.innerHTML = `<section class="reader-error" role="alert"><strong>Ce texte n’a pas pu être affiché normalement.</strong><p>Le contenu n’a pas été supprimé. Réessayez l’affichage ou revenez à la recherche; les autres écrans restent disponibles.</p><div><button class="secondary-button" type="button" data-action="reader-retry">Réessayer</button><button class="primary-button" type="button" data-action="go-to-search">Retour aux textes</button></div></section>`;
      root.dataset.readerPage = "";
    }
    try { updateReaderSearchNavigation(); } catch {}
    showToast("Erreur de rendu isolée : le lecteur n’a pas bloqué le reste de l’application.");
  }
  function handleUiError(error) {
    console.error("Erreur d’interaction dans l’application mobile", error);
    if (state.tab === "lecture" && state.currentLaw) renderReaderErrorBoundary(error);
    else showToast("Une erreur d’affichage a été récupérée. Vous pouvez continuer à utiliser l’application.");
  }
  function renderReader() {
    try { return renderReaderView(); }
    catch (error) { renderReaderErrorBoundary(error); }
  }
  function renderReaderView() {
    const law = state.currentLaw;
    const content = $("#reader-content");
    const empty = $("#reader-empty-state");
    const root = $("#reader-articles");
    const scroller = $("#reader-scroll");
    const searchRow = $("#reader-search-row");
    const readingTools = $("#reader-reading-tools");
    content.hidden = false;
    if (!law) {
      empty.hidden = false;
      searchRow.hidden = true;
      readingTools.hidden = true;
      scroller.classList.add("reader-scroll-empty");
      $("#reader-toc-button").disabled = true;
      $("#reader-reference").textContent = "Choisir un texte";
      $("#reader-reference").title = "Choisir un texte";
      $("#reader-mode-label").textContent = "";
      $("#reader-title").textContent = "";
      $("#reader-domain").textContent = "";
      $("#reader-badges").innerHTML = "";
      $("#reader-verification-notice").hidden = true;
      $("#reader-source").hidden = true;
      root.innerHTML = "";
      root.dataset.lawKey = "";
      root.dataset.readerPage = "";
      state.readerPage = 0;
      state.readerTree = null;
      state.readerIndexedLaw = null;
      state.readerIndexedPage = -1;
      state.readerSearchIndex = new Map();
      state.readerMatches = [];
      scroller.scrollTop = 0;
      updateReaderSearchNavigation();
      return;
    }
    captureReaderAccordionState(root);
    const savedScrollTop = scroller.scrollTop;
    const title = String(law?.title || "Texte sans titre");
    const articles = Array.isArray(law?.articles) ? law.articles : [];
    empty.hidden = true;
    searchRow.hidden = false;
    readingTools.hidden = false;
    scroller.classList.remove("reader-scroll-empty");
    $("#reader-toc-button").disabled = law?.hasContent === false || articles.length === 0;
    $("#reader-reference").textContent = title;
    $("#reader-reference").title = title;
    $("#reader-mode-label").textContent = String(law?.code || law?.domain || "");
    $("#reader-title").textContent = title;
    $("#reader-domain").textContent = String(law?.domain || MBLData.GENERAL_CATEGORY);
    const verified = String(law?.verificationStatus || "unverified") === "verified";
    $("#reader-verification-notice").hidden = verified;
    $("#reader-badges").innerHTML = `<span class="type-chip">${escapeHtml(law?.type || "Autre")}</span><span class="reader-status ${verified ? "" : "is-unverified"}">${verified ? escapeHtml(law?.statusLabel || "Vérifié") : "Statut non vérifié"}</span>${law?.isFree ? `<span class="type-chip">Accès libre</span>` : ""}`;
    const source = $("#reader-source");
    let validSource = "";
    try { const parsed = new URL(String(law?.sourceUrl || "")); if (parsed.protocol === "https:") validSource = parsed.href; } catch {}
    source.hidden = !validSource;
    source.href = validSource || "#";
    updateFavoriteIndicators();
    $("#reader-search-clear").hidden = !$("#reader-search").value;
    if (law?.hasContent === false || !articles.length) {
      state.readerTree = [];
      state.readerIndexedLaw = law;
      state.readerIndexedPage = 0;
      state.readerSearchIndex = new Map();
      state.readerMatches = [];
      root.innerHTML = `<div class="no-articles">Le texte est présent dans le catalogue, mais son contenu enrichi n'est pas encore disponible dans <code>text_contents</code>.</div>`;
      root.dataset.lawKey = lawKey(law);
      root.dataset.readerPage = "0";
      updateReaderSearchNavigation();
      scroller.scrollTop = savedScrollTop;
      state.readerErrorActive = false;
      return;
    }
    if (state.currentArticleTarget) {
      const targetIndex = articles.findIndex(article => String(article?.key || "") === String(state.currentArticleTarget));
      if (targetIndex >= 0) state.readerPage = Math.floor(targetIndex / READER_PAGE_SIZE);
    }
    const page = MBLData.paginateArticles(articles, state.readerPage, READER_PAGE_SIZE);
    state.readerPage = page.page;
    const pageNeedsRender = state.readerIndexedLaw !== law
      || state.readerIndexedPage !== page.page
      || !Array.isArray(state.readerTree)
      || root.dataset.lawKey !== lawKey(law)
      || Number(root.dataset.readerPage) !== page.page;
    if (pageNeedsRender) {
      state.readerTree = MBLData.buildArticleTree(page.items);
      buildReaderSearchIndex(law, page.items);
      state.readerMatches = [];
      state.readerMatchIndex = 0;
      root.innerHTML = `${renderArticleNodes(state.readerTree)}${renderReaderPagination(page)}`;
      root.dataset.lawKey = lawKey(law);
      root.dataset.readerPage = String(page.page);
      $$("details[data-hierarchy-key]", root).forEach(details => {
        details.addEventListener("toggle", () => {
          state.readerAccordionState[details.dataset.hierarchyKey] = details.open;
        });
      });
    }
    updateReaderSearchNavigation();
    scroller.scrollTop = savedScrollTop;
    state.readerErrorActive = false;
  }
  function renderFavoriteFolderOptions() {
    const root = $("#favorite-folder-options");
    root.innerHTML = state.favoriteFolders.map(folder => `<button class="favorite-folder-option" type="button" data-action="select-favorite-folder" data-folder-id="${escapeHtml(folder.id)}">${icon("folder", 17)}<span>${escapeHtml(folder.name)}</span><small>${folder.items.length}</small></button>`).join("");
    root.hidden = state.folderDialogMode !== "pick";
    $("#favorite-picker-new-folder").hidden = state.folderDialogMode !== "pick";
    $("#favorite-folder-form").hidden = state.folderDialogMode === "pick";
    $("#favorite-folder-save").textContent = state.folderDialogMode === "rename" ? "Enregistrer" : "Créer le dossier";
    $("#favorite-picker-title").textContent = state.folderDialogMode === "rename" ? "Renommer le dossier" : state.folderDialogMode === "create" ? "Nouveau dossier" : "Classer dans un dossier";
    $("#favorite-picker-description").textContent = state.folderDialogMode === "rename" ? "Choisissez un nom facile à retrouver." : state.folderDialogMode === "create" ? "Créez un dossier pour organiser vos textes et articles favoris." : state.pendingFavorite?.type === "article" ? "Choisissez où enregistrer cet article." : "Choisissez le dossier où enregistrer ce texte.";
  }
  function openFavoritePicker(item = null) {
    state.pendingFavorite = item ? { ...item, lawId: String(item.lawId || lawKey(state.currentLaw)) } : null;
    state.editingFolderId = "";
    state.folderDialogMode = "pick";
    $("#favorite-folder-name").value = "";
    renderFavoriteFolderOptions();
    setOverlay("favorites-picker-overlay", true);
  }
  function showNewFavoriteFolder() {
    state.pendingFavorite = null;
    state.editingFolderId = "";
    state.folderDialogMode = "create";
    $("#favorite-folder-name").value = "";
    renderFavoriteFolderOptions();
    setOverlay("favorites-picker-overlay", true);
    setTimeout(() => $("#favorite-folder-name").focus(), 80);
  }
  function showFavoriteFolderForm() {
    if (state.folderDialogMode === "pick") state.folderDialogMode = "create";
    renderFavoriteFolderOptions();
    setTimeout(() => $("#favorite-folder-name").focus(), 40);
  }
  function cancelFavoriteFolderForm() {
    if (state.pendingFavorite && state.folderDialogMode === "create") {
      state.folderDialogMode = "pick";
      renderFavoriteFolderOptions();
    } else closeFavoritePicker();
  }
  function closeFavoritePicker() {
    state.pendingFavorite = null;
    state.editingFolderId = "";
    state.folderDialogMode = "pick";
    setOverlay("favorites-picker-overlay", false);
  }
  async function addFavoriteToFolder(folderId, item) {
    const folder = state.favoriteFolders.find(candidate => candidate.id === folderId);
    if (!folder || !item) return;
    const normalizedItem = item.type === "article"
      ? { type: "article", lawId: String(item.lawId), articleKey: String(item.articleKey || ""), articleNumber: String(item.articleNumber || "") }
      : { type: "law", lawId: String(item.lawId) };
    const itemKey = MBLData.favoriteItemKey(normalizedItem);
    if (folder.items.some(saved => MBLData.favoriteItemKey(saved) === itemKey)) {
      showToast("Cet élément est déjà enregistré dans ce dossier.");
      closeFavoritePicker();
      return;
    }
    folder.items.push(normalizedItem);
    await saveFavoriteFolders();
    closeFavoritePicker();
    showToast(normalizedItem.type === "article" ? "Article ajouté aux favoris." : "Texte ajouté aux favoris.");
  }
  async function saveFavoriteFolder(event) {
    event.preventDefault();
    const name = String($("#favorite-folder-name").value || "").trim().replace(/\s+/g, " ");
    if (!name) { showToast("Saisissez un nom de dossier."); return; }
    const duplicate = state.favoriteFolders.some(folder => folder.id !== state.editingFolderId && normalizeSearch(folder.name) === normalizeSearch(name));
    if (duplicate) { showToast("Un dossier porte déjà ce nom."); return; }
    if (state.folderDialogMode === "rename") {
      const folder = state.favoriteFolders.find(candidate => candidate.id === state.editingFolderId);
      if (!folder) { closeFavoritePicker(); return; }
      folder.name = name.slice(0, 48);
      await saveFavoriteFolders();
      closeFavoritePicker();
      showToast("Dossier renommé.");
      return;
    }
    const id = `folder-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    const folder = { id, name: name.slice(0, 48), items: [] };
    state.favoriteFolders.push(folder);
    if (state.pendingFavorite) {
      const item = state.pendingFavorite;
      const normalizedItem = item.type === "article"
        ? { type: "article", lawId: item.lawId, articleKey: item.articleKey, articleNumber: item.articleNumber }
        : { type: "law", lawId: item.lawId };
      folder.items.push(normalizedItem);
    }
    await saveFavoriteFolders();
    const added = Boolean(state.pendingFavorite);
    closeFavoritePicker();
    showToast(added ? "Dossier créé et favori classé." : "Dossier de favoris créé.");
  }
  function chooseFavoriteFolder(folderId) {
    if (!state.pendingFavorite) { closeFavoritePicker(); return; }
    void addFavoriteToFolder(folderId, state.pendingFavorite);
  }
  async function removeFavoriteItem(folderId, itemKey) {
    const folder = state.favoriteFolders.find(candidate => candidate.id === folderId);
    if (!folder) return;
    folder.items = folder.items.filter(item => MBLData.favoriteItemKey(item) !== itemKey);
    await saveFavoriteFolders();
    showToast("Favori retiré.");
  }
  async function renameFavoriteFolder(folderId) {
    const folder = state.favoriteFolders.find(candidate => candidate.id === folderId);
    if (!folder) return;
    state.pendingFavorite = null;
    state.editingFolderId = folder.id;
    state.folderDialogMode = "rename";
    $("#favorite-folder-name").value = folder.name;
    renderFavoriteFolderOptions();
    setOverlay("favorites-picker-overlay", true);
    setTimeout(() => $("#favorite-folder-name").focus(), 60);
  }
  async function deleteFavoriteFolder(folderId) {
    const folder = state.favoriteFolders.find(candidate => candidate.id === folderId);
    if (!folder || folder.id === "default") return;
    if (!window.confirm(`Supprimer le dossier « ${folder.name} » et ses favoris ?`)) return;
    state.favoriteFolders = state.favoriteFolders.filter(candidate => candidate.id !== folderId);
    await saveFavoriteFolders();
    showToast("Dossier supprimé.");
  }
  function toggleFavorite() {
    if (!state.currentLaw) return;
    openFavoritePicker({ type: "law", lawId: lawKey(state.currentLaw) });
  }
  function openPreview(lawId, articleTarget = "") {
    const law = lawById(lawId);
    if (!law) { showToast("Référence indisponible hors ligne."); return; }
    if (!canReadText(law)) { showProRequired(law); return; }
    state.preview = { kind: "law", lawId, articleTarget, expanded: false };
    renderPreview();
    setOverlay("preview-overlay", true);
  }
  function openDefinitionPreview(term, fallbackDefinition = "", category = "") {
    const key = normalizeSearch(term);
    const entries = state.content.lexicon.filter(item => normalizeSearch(item.term) === key);
    const preferredCategory = MBLData.normalizeLegalCategory(category || state.currentLaw?.domain || MBLData.GENERAL_CATEGORY, "");
    const fallback = String(fallbackDefinition || "").trim();
    const exactEntry = entries.find(item => item.category === preferredCategory && (!fallback || item.definition === fallback));
    const entry = exactEntry || (!fallback ? entries.find(item => item.category === MBLData.GENERAL_CATEGORY) || entries[0] : null);
    state.definitionTerm = entry?.term || String(term || "Terme juridique");
    $("#definition-sheet-term").textContent = state.definitionTerm;
    $("#definition-sheet-category").textContent = entry?.category || preferredCategory || "";
    $("#definition-sheet-content").textContent = entry?.definition || fallback || "Aucune définition n'est disponible dans le cache local.";
    setOverlay("definition-bottom-overlay", true);
  }
  function closeDefinitionSheet() { setOverlay("definition-bottom-overlay", false); }
  function lookupDefinitionTerm() {
    const term = state.definitionTerm;
    closeDefinitionSheet();
    state.lexiconQuery = term;
    $("#lexicon-search").value = term;
    switchTab("lexique");
    renderLexicon();
  }
  function renderPreview() {
    const preview = state.preview;
    if (!preview) return;
    const actions = $("#preview-actions");
    const expandButton = $("#preview-expand-button");
    const expandLabel = $("#preview-expand-label");
    const openButton = $("#preview-open-law");
    if (preview.kind === "definition") {
      $("#preview-title").textContent = preview.term;
      $("#preview-badges").innerHTML = `<span>Définition</span>`;
      $("#preview-body").innerHTML = `<div class="preview-description">${escapeHtml(preview.definition)}</div>`;
      actions.classList.add("is-definition");
      expandButton.dataset.action = "close-preview";
      expandButton.innerHTML = `${icon("x", 15)}<span>Fermer</span>`;
      openButton.hidden = true;
      return;
    }
    const law = lawById(preview.lawId);
    if (!law) { showToast("Référence indisponible hors ligne."); setOverlay("preview-overlay", false); return; }
    const verified = law.verificationStatus === "verified";
    $("#preview-title").textContent = law.title;
    $("#preview-badges").innerHTML = `<span>${escapeHtml(law.code)}</span><span>${verified ? escapeHtml(law.statusLabel) : "À vérifier"}</span>`;
    const articles = Array.isArray(law?.articles) ? law.articles : [];
    const selected = articles.find(article => preview.articleTarget && normalizeSearch(article?.number) === normalizeSearch(preview.articleTarget)) || articles[0] || null;
    const summary = `<div class="preview-description">${escapeHtml(law.summary || "")}</div>`;
    const articleCard = (rawArticle, isTarget) => {
      const article = rawArticle && typeof rawArticle === "object" ? rawArticle : {};
      const number = String(article?.number || "Article");
      return `<article class="preview-article${isTarget ? " preview-article-target" : ""}"${isTarget ? ' data-preview-target="true"' : ""}><h3>${escapeHtml(number)}${isTarget ? " · Article cité" : ""}</h3><p>${renderLinkedArticleText(article, "", { trackSearch: false }).html}</p></article>`;
    };
    let articlesHtml = "";
    let previewLimitNote = "";
    if (preview.expanded) {
      const selectedIndex = selected ? articles.indexOf(selected) : 0;
      const start = Math.max(0, Math.min(Math.max(0, articles.length - PREVIEW_ARTICLE_LIMIT), selectedIndex - Math.floor(PREVIEW_ARTICLE_LIMIT / 2)));
      const visibleArticles = articles.slice(start, start + PREVIEW_ARTICLE_LIMIT);
      articlesHtml = visibleArticles.map(article => articleCard(article, article === selected)).join("");
      if (articles.length > visibleArticles.length) {
        previewLimitNote = `<p class="preview-limit-note">Aperçu limité aux articles ${start + 1}–${Math.min(articles.length, start + visibleArticles.length)} sur ${articles.length} pour garder l’application fluide. Utilisez « Ouvrir le texte » pour parcourir toutes les pages.</p>`;
      }
    } else if (selected) {
      articlesHtml = articleCard(selected, Boolean(preview.articleTarget));
    }
    $("#preview-body").innerHTML = `${summary}${articlesHtml || `<p class="preview-empty">Aucun article détaillé n'est encore disponible.</p>`}${previewLimitNote}`;
    actions.classList.remove("is-definition");
    expandButton.dataset.action = "preview-expand";
    expandButton.innerHTML = `${icon(preview.expanded ? "chevron" : "eye", 15)}<span>${preview.expanded ? "Réduire l’aperçu" : `Afficher jusqu’à ${PREVIEW_ARTICLE_LIMIT} articles`}</span>`;
    openButton.hidden = false;
    openButton.innerHTML = `Ouvrir le texte ${icon("arrow", 15)}`;
  }
  function togglePreviewExpanded() {
    if (!state.preview || state.preview.kind !== "law") return;
    state.preview.expanded = !state.preview.expanded;
    renderPreview();
    if (state.preview.expanded) {
      const target = $("[data-preview-target='true']", $("#preview-body"));
      if (target) setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "nearest" }), 40);
    } else {
      $("#preview-body").scrollTop = 0;
    }
  }
  function openPreviewLaw() {
    if (!state.preview || state.preview.kind !== "law") return;
    const { lawId, articleTarget } = state.preview;
    openReader(lawId, articleTarget, true);
    state.preview = null;
  }
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const textarea = document.createElement("textarea"); textarea.value = text; textarea.style.position = "fixed"; textarea.style.opacity = "0"; document.body.appendChild(textarea); textarea.select();
        const ok = document.execCommand("copy"); textarea.remove(); if (!ok) throw new Error("copy refused");
      }
      showToast("Texte copié dans le presse-papiers");
    } catch { showToast("Copie impossible sur cet appareil"); }
  }
  function openCopyDialog(articleKey) {
    const law = state.currentLaw;
    if (!law) return;
    const article = law.articles.find(item => item.key === articleKey) || findArticleByTarget(law, articleKey);
    if (!article) { showToast("Article introuvable."); return; }
    state.copyTarget = { lawId: lawKey(law), articleKey: article.key };
    $("#copy-dialog-title").textContent = `Copier ${article.number}`;
    $("#copy-article-description").textContent = `Choisissez le format à copier depuis « ${law.title} ».`;
    setOverlay("copy-dialog-overlay", true);
  }
  async function copySelectedArticle(includeFullReference) {
    const target = state.copyTarget;
    const law = target ? lawById(target.lawId) : null;
    const article = law?.articles.find(item => item.key === target.articleKey);
    if (!law || !article) { showToast("Article introuvable."); setOverlay("copy-dialog-overlay", false); return; }
    const formatted = MBLData.formatArticleForCopy(law, article, includeFullReference);
    setOverlay("copy-dialog-overlay", false);
    state.copyTarget = null;
    await copyText(formatted);
  }
  function showInfo(title, html) {
    $("#info-title").textContent = title;
    $("#info-body").innerHTML = html;
    setOverlay("info-overlay", true);
  }
  function showToast(message) {
    const toast = $("#toast"); toast.textContent = message; toast.classList.add("show");
    clearTimeout(state.toastTimer); state.toastTimer = setTimeout(() => toast.classList.remove("show"), 2700);
  }
  function showAdminInfo() {
    const configured = isSupabaseConfigured();
    showInfo("Administration des textes", `<p><strong>${configured ? "Authentification et synchronisation prêtes" : "Mode local actuellement actif"}</strong></p><p>Cette APK utilise Supabase Auth, vérifie le profil d’abonnement à chaque lancement et lit le catalogue selon les politiques RLS. La publication ou la correction des textes reste réservée à Manette Admin / Supabase avec un compte administrateur sécurisé.</p><p><strong>Ne placez jamais la clé <code>service_role</code> dans <code>config.js</code> ou dans une APK.</strong> Le client n’embarque qu’une clé publique et ne reçoit aucun droit d’écriture admin.</p>`);
  }
  function showLegalInfo() {
    const sourceNotice = state.content.dataset === "remote"
      ? "Les titres proviennent du catalogue Supabase; l’accès aux contenus est filtré par RLS selon le statut Pro et les textes gratuits. Le Lexique reste libre. Leur publication dans l'application ne vaut pas validation juridique : vérifiez la version, les références JORM et le statut auprès des sources officielles."
      : "La base embarquée contient des extraits de démonstration; leur contenu et leur statut ne sont pas vérifiés. Ils sont signalés « Démo · à vérifier » jusqu'à validation à partir d'une source officielle.";
    showInfo("Mentions légales & crédits", `<p><strong>Outil d'information juridique.</strong> Il ne remplace ni le Journal Officiel de Madagascar, ni une consultation auprès d'un professionnel du droit.</p><p>${sourceNotice}</p><p>Les favoris et l'historique de lecture restent enregistrés localement sur cet appareil.</p>`);
  }

  function supabaseBase() {
    return String(config.supabaseUrl || "").trim().replace(/\/$/, "").replace(/\/rest\/v1$/i, "");
  }
  async function fetchTable(table, orderColumn, columns = "*") {
    const pageSize = 250;
    const rows = [];
    const orderColumns = (Array.isArray(orderColumn) ? orderColumn : String(orderColumn || "").split(","))
      .map(column => String(column).trim()).filter(Boolean).map(column => `${column}.asc`);
    const params = { select: columns };
    if (orderColumns.length) params.order = orderColumns.join(",");
    for (let offset = 0; offset < 50000; offset += pageSize) {
      const page = await supabaseRestGet(table, params, { range: [offset, offset + pageSize - 1] });
      rows.push(...page);
      if (page.length < pageSize) return rows;
    }
    throw new Error(`La table ${table} dépasse la limite de synchronisation configurée.`);
  }
  function remoteCatalogSnapshot(catalogRows, contentMetadata) {
    const contentById = new Map((contentMetadata || []).map(row => [String(row.catalog_id || ""), row]));
    return (catalogRows || []).map(row => {
      const id = String(row.id || "");
      const content = contentById.get(id);
      return {
        catalogId: id,
        title: String(row.title || ""),
        category: String(row.category || ""),
        isFree: Boolean(row.is_free),
        createdAt: String(row.created_at || ""),
        contentUpdatedAt: String(content?.updated_at || ""),
        hasContent: Boolean(content)
      };
    });
  }
  function compareCatalogSnapshot(remoteRows, localLaws) {
    const localMap = new Map(localLaws.map(law => [String(law.catalogId || law.id || ""), law]));
    const remoteIds = new Set(remoteRows.map(row => row.catalogId));
    const result = { added: 0, modified: 0, removed: 0 };
    for (const row of remoteRows) {
      const previous = localMap.get(row.catalogId);
      if (!previous) result.added++;
      else {
        const before = JSON.stringify([previous.title, previous.domain, Boolean(previous.isFree), previous.updatedAt, Boolean(previous.hasContent)]);
        const after = JSON.stringify([row.title, row.category, row.isFree, row.contentUpdatedAt || row.createdAt, row.hasContent]);
        if (before !== after) result.modified++;
      }
    }
    for (const law of localLaws) if (!remoteIds.has(String(law.catalogId || law.id || ""))) result.removed++;
    return result;
  }
  function compareLexiconRows(remoteRows, localRows) {
    const keyFor = row => `${normalizeSearch(row.term)}\u0000${MBLData.normalizeLegalCategory(row.category)}`;
    const localMap = new Map(localRows.map(row => [keyFor(row), row]));
    const remoteKeys = new Set(remoteRows.map(keyFor));
    const result = { added: 0, modified: 0, removed: 0 };
    for (const row of remoteRows) {
      const previous = localMap.get(keyFor(row));
      if (!previous) result.added++;
      else if (String(row.definition || "") !== String(previous.definition || "") || (String(row.updated_at || "") && String(row.updated_at) !== String(previous.updatedAt || ""))) result.modified++;
    }
    for (const row of localRows) if (!remoteKeys.has(keyFor(row))) result.removed++;
    return result;
  }
  function hashSignature(value) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) { hash ^= value.charCodeAt(i); hash = Math.imul(hash, 16777619); }
    return `mbl-${(hash >>> 0).toString(16).padStart(8, "0")}-${value.length}`;
  }
  function summarizeRemoteChanges(remoteCatalog, contentMetadata, remoteLexicon) {
    const snapshot = remoteCatalogSnapshot(remoteCatalog, contentMetadata);
    const texts = compareCatalogSnapshot(snapshot, state.content.legalTexts);
    const terms = compareLexiconRows(remoteLexicon, state.content.lexicon);
    const signaturePayload = JSON.stringify({
      catalog: snapshot.slice().sort((a, b) => a.catalogId.localeCompare(b.catalogId)),
      lexicon: remoteLexicon.map(row => [row.term, MBLData.normalizeLegalCategory(row.category), row.definition || "", row.updated_at || ""]).sort((a, b) => `${a[0]}\u0000${a[1]}`.localeCompare(`${b[0]}\u0000${b[1]}`))
    });
    const timestamps = [...snapshot.map(row => row.contentUpdatedAt || row.createdAt), ...remoteLexicon.map(row => row.updated_at)].filter(Boolean).sort();
    return {
      texts, terms, signature: hashSignature(signaturePayload),
      latestUpdate: timestamps[timestamps.length - 1] || "",
      replacingDemo: state.content.dataset !== "remote",
      hasChanges: Object.values(texts).some(Boolean) || Object.values(terms).some(Boolean)
    };
  }
  async function fetchRemoteContent() {
    const [catalogRows, contentRows, lexiconRows] = await Promise.all([
      fetchTable("catalog", "id", "id,title,category,is_free,created_at"),
      fetchTable("text_contents", "catalog_id", "catalog_id,structure_json,updated_at"),
      fetchTable("lexicons", "term,category", "term,definition,category,updated_at")
    ]);
    if (!catalogRows.length) throw new Error("La table catalog est vide; le cache local a été conservé.");
    const normalized = {
      schemaVersion: 2,
      dataset: "remote",
      notice: "Contenu public synchronisé depuis catalog, text_contents et lexicons.",
      legalTexts: normalizeCatalogRecords(catalogRows, contentRows),
      lexicon: lexiconRows.map(normalizeLexicon).filter(item => item.term).sort((a, b) => a.term.localeCompare(b.term, "fr") || a.category.localeCompare(b.category, "fr"))
    };
    if (!normalized.legalTexts.length) throw new Error("Aucun texte exploitable reçu depuis catalog; le cache local a été conservé.");
    return normalized;
  }
  function renderUpdatePrompt(summary) {
    const lines = [];
    if (summary.replacingDemo) {
      lines.push(`<p>La base Supabase contient <strong>${summary.texts.added + summary.texts.modified} texte(s)</strong> et <strong>${summary.terms.added + summary.terms.modified} terme(s) de lexique</strong>. Elle remplacera les extraits de démonstration après votre accord.</p>`);
    } else {
      const formatLine = (label, change) => {
        const parts = [];
        if (change.added) parts.push(`${change.added} nouveau(x)`);
        if (change.modified) parts.push(`${change.modified} modifié(s)`);
        if (change.removed) parts.push(`${change.removed} supprimé(s)`);
        return parts.length ? `<li><strong>${escapeHtml(label)}</strong> : ${parts.join(", ")}</li>` : "";
      };
      const changes = `${formatLine("Textes juridiques", summary.texts)}${formatLine("Termes du lexique", summary.terms)}`;
      lines.push(`<p>Une nouvelle version du contenu est disponible dans Supabase.</p>${changes ? `<ul class="update-change-list">${changes}</ul>` : "<p>Le contenu distant a été actualisé.</p>"}`);
    }
    if (summary.latestUpdate) {
      const date = new Date(summary.latestUpdate);
      if (!Number.isNaN(date.getTime())) lines.push(`<p class="update-date">Mise à jour publiée le ${escapeHtml(date.toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" }))}.</p>`);
    }
    $("#update-title").textContent = summary.replacingDemo ? "Base juridique disponible" : "Mise à jour disponible";
    $("#update-body").innerHTML = lines.join("");
    setOverlay("update-overlay", true);
  }
  async function checkForUpdates(options = {}) {
    const silent = Boolean(options.silent);
    if (state.syncing) return;
    if (!isSupabaseConfigured()) {
      if (!silent) showInfo("Synchronisation à configurer", `<p>Pour charger les textes, configurez l'URL Supabase et la clé publishable dans <code>config.js</code>. Les données déjà enregistrées restent consultables hors ligne.</p><p>N'utilisez jamais la clé <code>service_role</code> dans l'application.</p>`);
      return;
    }
    if (!navigator.onLine) { if (!silent) showToast("Pas de connexion : les textes locaux restent disponibles."); return; }
    state.lastCheckAt = Date.now();
    state.syncing = true; state.syncMode = "check"; renderProfile(); updateConnection();
    try {
      const [remoteCatalog, contentMetadata, remoteLexicon] = await Promise.all([
        fetchTable("catalog", "id", "id,title,category,is_free,created_at"),
        fetchTable("text_contents", "catalog_id", "catalog_id,updated_at"),
        fetchTable("lexicons", "term,category", "term,definition,category,updated_at")
      ]);
      if (!remoteCatalog.length) throw new Error("La table catalog est vide; le cache local a été conservé.");
      const summary = summarizeRemoteChanges(remoteCatalog, contentMetadata, remoteLexicon);
      if (!summary.hasChanges) {
        state.pendingUpdate = null;
        if (!silent) showToast("Votre base locale est déjà à jour.");
        return;
      }
      const deferredSignature = await kvGet("deferredUpdateSignature");
      if (silent && deferredSignature === summary.signature) return;
      state.pendingUpdate = summary;
      renderUpdatePrompt(summary);
    } catch (error) {
      console.warn("Vérification Supabase impossible; cache local conservé", error);
      if (!silent) showToast(error.message || "Vérification impossible. Les données locales sont conservées.");
      else $("#sync-note").textContent = "Vérification distante indisponible. Le cache local reste utilisable.";
    } finally {
      state.syncing = false; state.syncMode = "idle"; renderProfile(); updateConnection();
    }
  }
  async function loadInitialRemoteData() {
    if (state.syncing || !isSupabaseConfigured() || !navigator.onLine) return;
    state.syncing = true; state.syncMode = "download"; renderProfile(); updateConnection();
    try {
      const normalized = await fetchRemoteContent();
      state.content = normalized;
      recomputeFreeTextIds();
      state.isDemo = normalized.legalTexts.some(law => law.verificationStatus !== "verified");
      await pruneRestrictedCache();
      sanitizeFavoriteFolders();
      state.readingHistory = state.readingHistory.filter(item => lawById(item.lawId));
      if (state.activeReader && !lawById(state.activeReader.lawId)) { state.activeReader = null; await kvSet("activeReader", null); }
      state.lastSync = new Date().toISOString();
      rebuildLexiconIndex();
      reconcileCurrentReader();
      await Promise.all([
        kvSet("content", state.content), kvSet("favoriteFolders", state.favoriteFolders),
        kvSet("readingHistory", state.readingHistory), kvSet("lastSync", state.lastSync)
      ]);
      renderAll(); updateConnection();
      showToast(`${normalized.legalTexts.length} textes et ${totalArticleCount()} articles chargés depuis Supabase.`);
    } catch (error) {
      console.warn("Chargement initial Supabase impossible; cache embarqué conservé", error);
      $("#sync-note").textContent = `${error.message || "Connexion Supabase indisponible."} Les données locales restent accessibles.`;
      showToast("Supabase indisponible. La base locale reste consultable.");
    } finally {
      state.syncing = false; state.syncMode = "idle"; renderProfile(); updateConnection();
    }
  }
  async function deferUpdate() {
    if (state.pendingUpdate) await kvSet("deferredUpdateSignature", state.pendingUpdate.signature);
    state.pendingUpdate = null;
    setOverlay("update-overlay", false);
  }
  async function applyPendingUpdate() {
    if (!state.pendingUpdate || state.syncing) return;
    if (!navigator.onLine) { showToast("Pas de connexion : réessayez plus tard."); return; }
    const summary = state.pendingUpdate;
    setOverlay("update-overlay", false);
    state.syncing = true; state.syncMode = "download"; renderProfile(); updateConnection();
    try {
      const normalized = await fetchRemoteContent();
      if (!normalized.legalTexts.length) throw new Error("Aucun texte exploitable reçu; le cache précédent a été conservé.");
      state.content = normalized;
      recomputeFreeTextIds();
      state.isDemo = normalized.legalTexts.some(law => law.verificationStatus !== "verified");
      await pruneRestrictedCache();
      sanitizeFavoriteFolders();
      state.readingHistory = state.readingHistory.filter(item => lawById(item.lawId));
      if (state.activeReader && !lawById(state.activeReader.lawId)) { state.activeReader = null; await kvSet("activeReader", null); }
      state.lastSync = new Date().toISOString();
      rebuildLexiconIndex();
      await Promise.all([
        kvSet("content", state.content), kvSet("favoriteFolders", state.favoriteFolders),
        kvSet("readingHistory", state.readingHistory), kvSet("lastSync", state.lastSync),
        kvSet("deferredUpdateSignature", null)
      ]);
      reconcileCurrentReader();
      state.pendingUpdate = null;
      renderAll(); updateConnection();
      if (summary.replacingDemo) showToast(`${normalized.legalTexts.length} textes, ${totalArticleCount()} articles et ${normalized.lexicon.length} termes chargés.`);
      else {
        const parts = [];
        if (summary.texts.added) parts.push(`+${summary.texts.added} texte(s)`);
        if (summary.texts.modified) parts.push(`${summary.texts.modified} texte(s) modifié(s)`);
        if (summary.texts.removed) parts.push(`${summary.texts.removed} texte(s) retiré(s)`);
        if (summary.terms.added) parts.push(`+${summary.terms.added} terme(s)`);
        if (summary.terms.modified) parts.push(`${summary.terms.modified} terme(s) modifié(s)`);
        if (summary.terms.removed) parts.push(`${summary.terms.removed} terme(s) retiré(s)`);
        showToast(`Mise à jour terminée : ${parts.join(", ") || "contenu actualisé"}.`);
      }
    } catch (error) {
      console.warn("Téléchargement Supabase impossible; cache local conservé", error);
      showToast(error.message || "Échec de mise à jour. Le cache précédent est conservé.");
    } finally {
      state.syncing = false; state.syncMode = "idle"; renderProfile(); updateConnection();
      if (state.pendingUpdate) renderUpdatePrompt(state.pendingUpdate);
    }
  }


  function onAction(event) {
    const tabButton = event.target.closest("[data-tab]");
    if (tabButton) { switchTab(tabButton.dataset.tab); return; }
    const typeButton = event.target.closest("[data-type]");
    if (typeButton) { setType(typeButton.dataset.type); return; }
    const typeCard = event.target.closest("[data-type-card]");
    if (typeCard) { setType(typeCard.dataset.typeCard); switchTab("recherche"); return; }
    const domainCard = event.target.closest("[data-domain]");
    if (domainCard) { setDomain(domainCard.dataset.domain); return; }
    const lawCard = event.target.closest("[data-open-law]");
    if (lawCard) {
      openReader(lawCard.dataset.openLaw, lawCard.dataset.openArticle || "", false, {
        resume: lawCard.hasAttribute("data-resume-scroll"),
        scrollTop: Number(lawCard.dataset.resumeScroll) || 0,
        articleKey: lawCard.dataset.openArticle || "",
        articleNumber: lawCard.dataset.openArticleNumber || ""
      });
      return;
    }
    const ref = event.target.closest("[data-reference-law]");
    if (ref) { openPreview(ref.dataset.referenceLaw, ref.dataset.referenceArticle); return; }
    const definitionButton = event.target.closest("[data-definition-term]");
    if (definitionButton) { openDefinitionPreview(definitionButton.dataset.definitionTerm, definitionButton.dataset.definitionText, definitionButton.dataset.definitionCategory); return; }
    const lexiconButton = event.target.closest("[data-lexicon-term]");
    if (lexiconButton) { openDefinitionPreview(lexiconButton.dataset.lexiconTerm, lexiconButton.dataset.lexiconDefinition, lexiconButton.dataset.lexiconCategory); return; }
    const copyArticleButton = event.target.closest("[data-copy-article]");
    if (copyArticleButton) { openCopyDialog(copyArticleButton.dataset.copyArticle); return; }

    const actionNode = event.target.closest("[data-action]");
    const action = actionNode?.dataset.action;
    if (!action || actionNode.disabled) return;
    switch (action) {
      case "toggle-auth-mode":
        if (state.authBootstrapComplete && !state.authLoading) {
          setAuthMode(state.authMode === "login" ? "signup" : "login");
          $("#auth-password").value = "";
        }
        break;
      case "continue-free": void enterAuthorizedApp({ guestFree: true }); break;
      case "welcome-whatsapp": void openWhatsApp(upgradeMessage()); break;
      case "pro-required-whatsapp": void handleProSubscription(); break;
      case "close-pro-required": setOverlay("pro-required-overlay", false); state.pendingPaywallLawId = ""; break;
      case "profile-upgrade": void openWhatsApp(upgradeMessage()); break;
      case "help-whatsapp": void openWhatsApp(`Bonjour, j’ai besoin d’aide avec Mada Base Légale.\nE-mail du compte : ${currentAccountEmail() || "non connecté"}\nProblème : téléphone perdu / appareil inaccessible ou autre difficulté.`); break;
      case "logout": void signOutMobileUser(); break;
      case "reauth":
        setAuthMode("login");
        showAuthGate();
        if (currentAccountEmail()) $("#auth-email").value = currentAccountEmail();
        break;
      case "theme": void toggleTheme(); break;
      case "font-size": cycleFontSize(); break;
      case "font-down": changeFontSize(-1); break;
      case "font-up": changeFontSize(1); break;
      case "reset": resetFilters(); break;
      case "clear-domain": state.domain = "ALL"; renderHome(); break;
      case "go-to-search": switchTab("recherche"); break;
      case "toc-open": openTocDrawer(); break;
      case "reader-page-prev": setReaderPage(state.readerPage - 1); break;
      case "reader-page-next": setReaderPage(state.readerPage + 1); break;
      case "toc-page-prev": setReaderPage(state.readerPage - 1); break;
      case "toc-page-next": setReaderPage(state.readerPage + 1); break;
      case "reader-retry": state.readerErrorActive = false; renderReader(); break;
      case "history-open": renderReadingHistory(); setOverlay("reading-history-overlay", true); break;
      case "close-reading-history": setOverlay("reading-history-overlay", false); break;
      case "close-toc": setOverlay("toc-overlay", false); break;
      case "jump-to-toc": jumpToToc(actionNode); break;
      case "close-preview": state.preview = null; setOverlay("preview-overlay", false); break;
      case "close-info": setOverlay("info-overlay", false); break;
      case "toggle-current-favorite": toggleFavorite(); break;
      case "favorite-article": {
        const article = state.currentLaw?.articles.find(item => item.key === actionNode.dataset.articleKey);
        if (article && state.currentLaw) openFavoritePicker({ type: "article", lawId: lawKey(state.currentLaw), articleKey: article.key, articleNumber: article.number });
        break;
      }
      case "clear-reader-search": clearTimeout(state.readerSearchTimer); state.readerSearchTimer = null; state.readerSearchGeneration++; $("#reader-search").value = ""; $("#reader-search-clear").hidden = true; state.readerMatchIndex = 0; updateReaderSearchHighlights(""); break;
      case "reader-search-previous": goToSearchMatch(-1); break;
      case "reader-search-next": goToSearchMatch(1); break;
      case "open-preview-law": openPreviewLaw(); break;
      case "copy-preview": {
        const body = $("#preview-body").innerText;
        void copyText(`${$("#preview-title").textContent}\n${body}`); break;
      }
      case "preview-expand": togglePreviewExpanded(); break;
      case "copy-article-compact": void copySelectedArticle(false); break;
      case "copy-article-complete": void copySelectedArticle(true); break;
      case "close-copy-dialog": setOverlay("copy-dialog-overlay", false); state.copyTarget = null; break;
      case "new-favorite-folder": showNewFavoriteFolder(); break;
      case "show-favorite-folder-form": showFavoriteFolderForm(); break;
      case "cancel-favorite-folder-form": cancelFavoriteFolderForm(); break;
      case "close-favorites-picker": closeFavoritePicker(); break;
      case "select-favorite-folder": event.preventDefault(); chooseFavoriteFolder(actionNode.dataset.folderId); break;
      case "remove-favorite-item": event.preventDefault(); event.stopPropagation(); void removeFavoriteItem(actionNode.dataset.folderId, actionNode.dataset.itemKey); break;
      case "rename-favorite-folder": event.preventDefault(); event.stopPropagation(); void renameFavoriteFolder(actionNode.dataset.folderId); break;
      case "delete-favorite-folder": event.preventDefault(); event.stopPropagation(); void deleteFavoriteFolder(actionNode.dataset.folderId); break;
      case "close-definition-sheet": closeDefinitionSheet(); break;
      case "lookup-definition-term": lookupDefinitionTerm(); break;
      case "show-more-lexicon": state.lexiconLimit += 100; renderLexicon(); break;
      case "clear-reading-history": void clearReadingHistory(); break;
      case "sync": void checkForUpdates({ silent: false }); break;
      case "defer-update": void deferUpdate(); break;
      case "apply-update": void applyPendingUpdate(); break;
      case "admin-info": showAdminInfo(); break;
      case "legal-info": showLegalInfo(); break;
    }
  }

  function onActionSafely(event) {
    try {
      const result = onAction(event);
      if (result && typeof result.catch === "function") result.catch(handleUiError);
    } catch (error) { handleUiError(error); }
  }
  $("#auth-form").addEventListener("submit", event => { void handleAuthSubmit(event); });
  document.addEventListener("click", onActionSafely);
  window.addEventListener("error", event => handleUiError(event.error || new Error(event.message || "Erreur JavaScript")));
  window.addEventListener("unhandledrejection", event => handleUiError(event.reason || new Error("Promesse rejetée")));
  document.addEventListener("keydown", event => {
    try {
    if (event.key === "Escape") {
      if (!$("#welcome-overlay").hidden) event.preventDefault();
      else if (!$("#pro-required-overlay").hidden) { setOverlay("pro-required-overlay", false); state.pendingPaywallLawId = ""; }
      else if (!$("#definition-bottom-overlay").hidden) closeDefinitionSheet();
      else if (!$("#toc-overlay").hidden) setOverlay("toc-overlay", false);
      else if (!$("#reading-history-overlay").hidden) setOverlay("reading-history-overlay", false);
      else if (!$("#copy-dialog-overlay").hidden) { setOverlay("copy-dialog-overlay", false); state.copyTarget = null; }
      else if (!$("#favorites-picker-overlay").hidden) closeFavoritePicker();
      else if (!$("#update-overlay").hidden) void deferUpdate();
      else if (!$("#preview-overlay").hidden) { state.preview = null; setOverlay("preview-overlay", false); }
      else if (!$("#info-overlay").hidden) setOverlay("info-overlay", false);
      else if (state.tab === "lecture") leaveLecture();
    }
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-open-law]")) {
      event.preventDefault(); openReader(event.target.dataset.openLaw, event.target.dataset.openArticle || "", false, { resume: event.target.hasAttribute("data-resume-scroll"), scrollTop: Number(event.target.dataset.resumeScroll) || 0, articleKey: event.target.dataset.openArticle || "", articleNumber: event.target.dataset.openArticleNumber || "" });
    }
    } catch (error) { handleUiError(error); }
  });
  $("#search-form").addEventListener("submit", event => event.preventDefault());
  $("#search-input").addEventListener("input", event => {
    state.query = event.target.value;
    clearTimeout(state.homeSearchTimer);
    state.homeSearchTimer = setTimeout(() => { state.homeSearchTimer = null; renderHome(); }, 180);
  });
  $("#lexicon-search").addEventListener("input", event => { state.lexiconQuery = event.target.value; state.lexiconLimit = 100; renderLexicon(); });
  $("#reader-search").addEventListener("input", event => {
    const query = event.target.value;
    state.readerSearchGeneration++;
    $("#reader-search-clear").hidden = !query;
    $("#reader-search-status").textContent = query ? "…" : "0 / 0";
    $("[data-action='reader-search-previous']").disabled = true;
    $("[data-action='reader-search-next']").disabled = true;
    clearTimeout(state.readerSearchTimer);
    state.readerSearchTimer = setTimeout(() => {
      state.readerSearchTimer = null;
      state.readerMatchIndex = 0;
      updateReaderSearchHighlights(query);
    }, 300);
  });
  $("#favorite-folder-form").addEventListener("submit", event => { void saveFavoriteFolder(event); });
  $("#reader-scroll").addEventListener("scroll", scheduleReadingPositionSave, { passive: true });
  ["preview-overlay", "info-overlay", "update-overlay", "favorites-picker-overlay", "copy-dialog-overlay", "definition-bottom-overlay", "toc-overlay", "reading-history-overlay"].forEach(id => {
    document.getElementById(id).addEventListener("click", event => {
      if (event.target.id !== id) return;
      if (id === "update-overlay") void deferUpdate();
      else if (id === "preview-overlay") { state.preview = null; setOverlay(id, false); }
      else if (id === "favorites-picker-overlay") closeFavoritePicker();
      else if (id === "copy-dialog-overlay") { state.copyTarget = null; setOverlay(id, false); }
      else setOverlay(id, false);
    });
  });
  window.addEventListener("online", () => {
    updateConnection();
    if (!isSupabaseConfigured() || !state.authenticatedAppVisible) return;
    void refreshMembership().then(() => {
      if (state.premiumContentStale && hasActivePro()) startAuthorizedSync();
      else if (!state.pendingUpdate && !state.syncing) void checkForUpdates({ silent: true });
    });
  });
  window.addEventListener("offline", updateConnection);
  window.addEventListener("pagehide", persistReadingPosition);
  function checkWhenAppReturns() {
    if (document.visibilityState === "hidden") { persistReadingPosition(); return; }
    if (!state.authenticatedAppVisible || !isSupabaseConfigured() || !navigator.onLine) return;
    if (Date.now() - state.membershipCheckedAt >= 120000) {
      void refreshMembership().then(() => {
        if (state.premiumContentStale && hasActivePro()) startAuthorizedSync();
      });
    }
    if (state.pendingUpdate || state.syncing || Date.now() - state.lastCheckAt < 120000) return;
    void checkForUpdates({ silent: true });
  }
  document.addEventListener("visibilitychange", checkWhenAppReturns);
  window.addEventListener("focus", checkWhenAppReturns);
  window.appBack = () => {
    if (!$("#welcome-overlay").hidden) return true;
    if (!$("#pro-required-overlay").hidden) { setOverlay("pro-required-overlay", false); state.pendingPaywallLawId = ""; return true; }
    if (!$("#definition-bottom-overlay").hidden) { closeDefinitionSheet(); return true; }
    if (!$("#toc-overlay").hidden) { setOverlay("toc-overlay", false); return true; }
    if (!$("#reading-history-overlay").hidden) { setOverlay("reading-history-overlay", false); return true; }
    if (!$("#copy-dialog-overlay").hidden) { setOverlay("copy-dialog-overlay", false); state.copyTarget = null; return true; }
    if (!$("#favorites-picker-overlay").hidden) { closeFavoritePicker(); return true; }
    if (!$("#update-overlay").hidden) { void deferUpdate(); return true; }
    if (!$("#preview-overlay").hidden) { state.preview = null; setOverlay("preview-overlay", false); return true; }
    if (!$("#info-overlay").hidden) { setOverlay("info-overlay", false); return true; }
    if (state.tab === "lecture") { leaveLecture(); return true; }
    return false;
  };

  init().catch(error => {
    console.error("Erreur de démarrage de l’application", error);
    state.authBootstrapComplete = true;
    showAuthGate(error?.message || "Erreur au démarrage. Rechargez l’application.");
  });
})();
