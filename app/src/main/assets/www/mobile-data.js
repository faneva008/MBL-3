(function exposeMobileData(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.MBLData = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createMobileData() {
  "use strict";

  const HIERARCHY_LEVELS = [
    { level: "book", label: "Livre", aliases: ["book", "livre", "booktitle", "livre_title"] },
    { level: "title", label: "Titre", aliases: ["title", "titre", "heading"] },
    { level: "chapter", label: "Chapitre", aliases: ["chapter", "chapitre"] },
    { level: "section", label: "Section", aliases: ["section", "subsection", "sous_section"] }
  ];

  function normalizeSearch(value) {
    return String(value || "").toLocaleLowerCase("fr").normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();
  }

  const GENERAL_CATEGORY = "Général";
  const LEGAL_CATEGORIES = Object.freeze([
    "Droit administratif",
    "Droit constitutionnel & Institutions publiques",
    "Finances publiques & Droit fiscal",
    "Marchés publics & PPP",
    "Droit du travail & Prévoyance sociale",
    "Droit civil & Personnes (LTGO)",
    "Droit commercial & des Sociétés",
    "Droit bancaire, Financier & Change",
    "Droit de la concurrence & Consommation",
    "Droit foncier & Immatriculation",
    "Droit de l'environnement & Mines",
    "Droit rural & Agrobusiness",
    "Droit pénal & Criminologie",
    "Procédure civile & Voies d'exécution",
    "Procédures collectives",
    "Droit du numérique & Télécoms",
    "Droit international & Commerce international",
    GENERAL_CATEGORY
  ]);
  function categoryKey(value) {
    return normalizeSearch(value).replace(/[’']/g, " ").replace(/&/g, " et ")
      .replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
  }
  const CANONICAL_CATEGORIES = new Map(LEGAL_CATEGORIES.map(category => [categoryKey(category), category]));
  const LEGACY_CATEGORIES = new Map([
    ["general", GENERAL_CATEGORY], ["droit general", GENERAL_CATEGORY],
    ["droit constitutionnel", "Droit constitutionnel & Institutions publiques"],
    ["droit du travail", "Droit du travail & Prévoyance sociale"],
    ["droit foncier", "Droit foncier & Immatriculation"],
    ["droit penal et procedure", "Droit pénal & Criminologie"],
    ["droit commercial et des affaires", "Droit commercial & des Sociétés"],
    ["droit de l environnement", "Droit de l'environnement & Mines"],
    ["droit civil", "Droit civil & Personnes (LTGO)"],
    ["droit fiscal", "Finances publiques & Droit fiscal"]
  ]);
  function normalizeLegalCategory(value, fallback = GENERAL_CATEGORY) {
    const key = categoryKey(value);
    return CANONICAL_CATEGORIES.get(key) || LEGACY_CATEGORIES.get(key) || fallback;
  }

  function readText(value) {
    if (value == null) return "";
    if (typeof value === "string" || typeof value === "number") return String(value);
    if (Array.isArray(value)) return value.map(item => readText(item)).filter(Boolean).join("\n");
    if (typeof value === "object") {
      if (Array.isArray(value.paragraphs)) return value.paragraphs.map(item => readText(item)).filter(Boolean).join("\n\n");
      for (const key of ["text", "content", "body", "value", "paragraph"]) {
        if (value[key] != null) return readText(value[key]);
      }
    }
    return "";
  }

  function valueLabel(value) {
    if (value == null) return "";
    if (Array.isArray(value)) return value.map(valueLabel).filter(Boolean).join(" ");
    if (typeof value === "object") {
      for (const key of ["label", "title", "name", "value", "number", "text"]) {
        if (value[key] != null) return valueLabel(value[key]);
      }
      return "";
    }
    return String(value).trim();
  }

  function normalizeHierarchy(value, article = {}) {
    let source = value;
    if (source == null || source === "") {
      source = {};
      for (const group of HIERARCHY_LEVELS) {
        for (const alias of group.aliases) {
          if (article[alias] != null) { source[alias] = article[alias]; break; }
        }
      }
    }
    if (typeof source === "string") {
      const parts = source.split(/\s*(?:>|\/|\u203a|\u2192)\s*/).filter(Boolean);
      return parts.slice(0, 4).map((label, index) => ({ level: HIERARCHY_LEVELS[index].level, label: label.trim() })).filter(item => item.label);
    }
    if (Array.isArray(source)) {
      const result = [];
      source.forEach((item, index) => {
        const rawLevel = typeof item === "object" && item
          ? String(item.level || item.type || item.kind || item.key || "").toLocaleLowerCase("fr").replace(/[^a-z]/g, "")
          : "";
        const group = HIERARCHY_LEVELS.find(candidate => candidate.aliases.includes(rawLevel)) || HIERARCHY_LEVELS[index];
        const label = valueLabel(item);
        if (group && label) result.push({ level: group.level, label });
      });
      return result;
    }
    if (typeof source !== "object") return [];
    const result = [];
    for (const group of HIERARCHY_LEVELS) {
      let valueForLevel;
      for (const alias of group.aliases) {
        if (source[alias] != null) { valueForLevel = source[alias]; break; }
      }
      const label = valueLabel(valueForLevel);
      if (label) result.push({ level: group.level, label });
    }
    if (!result.length && Array.isArray(source.path)) return normalizeHierarchy(source.path, article);
    return result;
  }

  function normalizeArticle(rawArticle, index = 0, defaultCategory = GENERAL_CATEGORY) {
    const row = rawArticle && typeof rawArticle === "object" && !Array.isArray(rawArticle) ? rawArticle : {};
    const number = String(row?.number ?? row?.article_number ?? row?.article ?? `Article ${index + 1}`);
    const text = readText(row?.text ?? row?.content ?? row?.body ?? row?.paragraphs);
    return {
      key: String(row?.id ?? row?.article_id ?? row?.key ?? `${number}-${index}`),
      number,
      status: String(row?.status ?? "EN_VIGUEUR").trim() || "EN_VIGUEUR",
      statusNote: String(row?.status_note ?? row?.statusNote ?? ""),
      text,
      hierarchy: normalizeHierarchy(row?.hierarchy ?? row?.structure ?? null, row),
      references: Array.isArray(row?.references) ? row.references.map(reference => ({
        lawId: String(reference?.law_id ?? reference?.lawId ?? reference?.text_id ?? ""),
        article: String(reference?.article ?? reference?.article_number ?? ""),
        label: String(reference?.label ?? reference?.title ?? reference?.article ?? "Référence")
      })) : [],
      definitions: Array.isArray(row?.definitions) ? row.definitions.map(definition => ({
        term: String(definition?.term ?? ""),
        definition: readText(definition?.definition ?? definition?.text),
        category: normalizeLegalCategory(definition?.category || defaultCategory)
      })).filter(definition => definition.term) : []
    };
  }

  function normalizeLegalText(row = {}) {
    row = row && typeof row === "object" && !Array.isArray(row) ? row : {};
    const rawArticles = Array.isArray(row.articles) ? row.articles : [];
    const catalogId = String(row.catalogId ?? row.catalog_id ?? row.id ?? "");
    const identity = String(row.id ?? row.business_id ?? row.code ?? catalogId);
    const source = row.source_url ?? row.sourceUrl ?? row.source ?? row.sources ?? "";
    const sourceRecord = Array.isArray(source) ? source.find(item => item && (item.url || item.href)) : source;
    const sourceUrl = typeof sourceRecord === "string" ? sourceRecord : String(sourceRecord?.url ?? sourceRecord?.href ?? "");
    const domain = normalizeLegalCategory(row.domain ?? row.category ?? GENERAL_CATEGORY);
    return {
      id: identity,
      catalogId,
      code: String(row.code ?? row.reference ?? ""),
      type: String(row.type ?? row.kind ?? "Loi"),
      domain,
      domainIcon: String(row.domain_icon ?? row.domainIcon ?? "book"),
      status: String(row.status ?? "inconnu"),
      statusLabel: String(row.status_label ?? row.statusLabel ?? "Statut inconnu"),
      verificationStatus: String(row.verification_status ?? row.verificationStatus ?? "unverified"),
      title: String(row.title ?? "Texte sans titre"),
      summary: readText(row.summary ?? row.description),
      hashtags: Array.isArray(row.hashtags) ? row.hashtags.map(String) : [],
      articlesCount: rawArticles.length || Number(row.articles_count ?? row.articlesCount ?? 0),
      articles: rawArticles.map((article, index) => normalizeArticle(article, index, domain)),
      replacedBy: String(row.replaced_by ?? row.replacedBy ?? ""),
      sourceUrl,
      updatedAt: String(row.updated_at ?? row.updatedAt ?? row.created_at ?? ""),
      isFree: Boolean(row.is_free ?? row.isFree ?? false),
      hasContent: row.hasContent !== false
    };
  }

  function readStructureJson(value) {
    let structure = value;
    if (typeof structure === "string") {
      try { structure = JSON.parse(structure); } catch { return {}; }
    }
    return structure && typeof structure === "object" && !Array.isArray(structure) ? structure : {};
  }

  function normalizeCatalogDocument(catalogRow = {}, contentRow = null) {
    catalogRow = catalogRow && typeof catalogRow === "object" && !Array.isArray(catalogRow) ? catalogRow : {};
    const structure = readStructureJson(contentRow?.structure_json);
    return normalizeLegalText({
      ...structure,
      id: structure?.id ?? structure?.business_id ?? structure?.code ?? catalogRow.id,
      catalogId: String(catalogRow.id ?? contentRow?.catalog_id ?? ""),
      title: structure?.title || catalogRow.title || "Texte sans titre",
      domain: normalizeLegalCategory(structure?.domain || catalogRow.category || GENERAL_CATEGORY),
      is_free: catalogRow.is_free ?? structure?.is_free ?? false,
      updated_at: contentRow?.updated_at ?? catalogRow.created_at ?? "",
      hasContent: Boolean(contentRow && Object.keys(structure).length)
    });
  }

  function paginateArticles(articles, requestedPage = 0, requestedPageSize = 20) {
    const safeArticles = Array.isArray(articles) ? articles : [];
    const parsedPageSize = Math.floor(Number(requestedPageSize));
    const pageSize = Number.isFinite(parsedPageSize) ? Math.max(1, Math.min(parsedPageSize, 100)) : 20;
    const pageCount = Math.max(1, Math.ceil(safeArticles.length / pageSize));
    const parsedPage = Math.floor(Number(requestedPage));
    const page = Number.isFinite(parsedPage) ? Math.max(0, Math.min(parsedPage, pageCount - 1)) : 0;
    const start = page * pageSize;
    const end = Math.min(start + pageSize, safeArticles.length);
    return { page, pageSize, pageCount, total: safeArticles.length, start, end, items: safeArticles.slice(start, end) };
  }

  function buildArticleTree(articles = []) {
    const roots = [];
    for (const rawArticle of Array.isArray(articles) ? articles : []) {
      const article = rawArticle && typeof rawArticle === "object" && !Array.isArray(rawArticle) ? rawArticle : normalizeArticle(rawArticle);
      let siblings = roots;
      for (const hierarchy of Array.isArray(article?.hierarchy) ? article.hierarchy : []) { 
        const key = `${hierarchy.level}\u0000${hierarchy.label}`;
        let node = siblings.find(item => item.kind === "group" && item.key === key);
        if (!node) {
          node = { kind: "group", key, level: hierarchy.level, label: hierarchy.label, children: [] };
          siblings.push(node);
        }
        siblings = node.children;
      }
      siblings.push({ kind: "article", key: article.key, article });
    }
    return roots;
  }

  function favoriteItemKey(item = {}) {
    return item.type === "article"
      ? `article:${String(item.lawId || "")}:${String(item.articleKey || item.articleNumber || "")}`
      : `law:${String(item.lawId || "")}`;
  }

  function normalizeFavoriteFolders(stored, defaultFavorites = []) {
    const defaultFolder = { id: "default", name: "Favoris", items: [] };
    let folders = [];
    if (Array.isArray(stored) && stored.every(item => typeof item === "string")) {
      defaultFolder.items = stored.map(lawId => ({ type: "law", lawId: String(lawId) }));
      folders = [defaultFolder];
    } else if (Array.isArray(stored)) {
      folders = stored;
    } else if (stored && Array.isArray(stored.folders)) {
      folders = stored.folders;
    }
    if (!folders.length) {
      defaultFolder.items = (defaultFavorites || []).map(lawId => ({ type: "law", lawId: String(lawId) }));
      folders = [defaultFolder];
    }
    const normalized = folders.map((folder, index) => ({
      id: String(folder?.id || (index === 0 ? "default" : `folder-${index}`)),
      name: String(folder?.name || (index === 0 ? "Favoris" : `Dossier ${index + 1}`)).trim().slice(0, 48) || `Dossier ${index + 1}`,
      items: Array.isArray(folder?.items) ? folder.items.map(item => ({
        type: item?.type === "article" ? "article" : "law",
        lawId: String(item?.lawId ?? item?.law_id ?? item?.id ?? ""),
        articleKey: String(item?.articleKey ?? item?.article_key ?? ""),
        articleNumber: String(item?.articleNumber ?? item?.article_number ?? "")
      })).filter(item => item.lawId) : []
    }));
    if (!normalized.some(folder => folder.id === "default")) normalized.unshift(defaultFolder);
    for (const folder of normalized) {
      const seen = new Set();
      folder.items = folder.items.filter(item => {
        const key = favoriteItemKey(item);
        if (seen.has(key)) return false;
        seen.add(key); return true;
      });
    }
    return normalized;
  }

  function normalizeTextMap(value) {
    const source = String(value ?? "");
    let normalized = "";
    const spans = [];
    let sourceOffset = 0;
    for (const originalChar of Array.from(source)) {
      const start = sourceOffset;
      const end = start + originalChar.length;
      sourceOffset = end;
      let folded = originalChar.toLocaleLowerCase("fr").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (/\s/.test(folded)) {
        if (!normalized || normalized.endsWith(" ")) {
          if (normalized) spans[spans.length - 1].end = end;
          continue;
        }
        folded = " ";
      }
      for (const char of Array.from(folded)) {
        normalized += char;
        spans.push({ start, end });
      }
    }
    if (normalized.endsWith(" ")) { normalized = normalized.slice(0, -1); spans.pop(); }
    const unitToChar = new Uint32Array(normalized.length + 1);
    let unitOffset = 0;
    let charOffset = 0;
    for (const char of normalized) {
      for (let unit = 0; unit < char.length; unit++) unitToChar[unitOffset++] = charOffset;
      charOffset++;
    }
    unitToChar[unitOffset] = charOffset;
    return { normalized, chars: Array.from(normalized), spans, unitToChar };
  }

  function buildTextSearchIndex(text) {
    return normalizeTextMap(text);
  }

  function findIndexedTextRanges(mapped, query) {
    const target = normalizeSearch(query);
    if (!target || !mapped?.normalized) return [];
    const ranges = [];
    let searchFrom = 0;
    while (searchFrom < mapped.normalized.length) {
      const index = mapped.normalized.indexOf(target, searchFrom);
      if (index < 0) break;
      const startChar = mapped.unitToChar?.[index] ?? Array.from(mapped.normalized.slice(0, index)).length;
      const endCharExclusive = mapped.unitToChar?.[index + target.length] ?? (startChar + Array.from(target).length);
      const first = mapped.spans[startChar];
      const last = mapped.spans[endCharExclusive - 1];
      if (first && last) ranges.push({ start: first.start, end: last.end });
      searchFrom = index + Math.max(1, target.length);
    }
    return ranges;
  }

  function findTextRanges(text, query) {
    return findIndexedTextRanges(normalizeTextMap(text), query);
  }

  function buildLexiconTrie(lexicon = []) {
    const root = { children: new Map(), items: [] };
    for (const item of lexicon) {
      const term = String(item?.term || "").trim();
      const normalized = normalizeSearch(term);
      if (normalized.length < 2) continue;
      let node = root;
      for (const char of Array.from(normalized)) {
        if (!node.children.has(char)) node.children.set(char, { children: new Map(), items: [] });
        node = node.children.get(char);
      }
      const category = normalizeLegalCategory(item?.category || GENERAL_CATEGORY);
      const variant = {
        term,
        definition: String(item?.definition || ""),
        category,
        articleSpecific: Boolean(item?.articleSpecific)
      };
      if (!node.items.some(existing => existing.category === variant.category && existing.definition === variant.definition && existing.articleSpecific === variant.articleSpecific)) {
        node.items.push(variant);
      }
    }
    return root;
  }

  function chooseLexiconVariant(items, preferredCategory) {
    if (!Array.isArray(items) || !items.length) return null;
    const preferred = normalizeLegalCategory(preferredCategory, "");
    const selectUnambiguous = candidates => {
      if (!candidates.length) return null;
      return new Set(candidates.map(item => item.definition)).size === 1 ? candidates[0] : null;
    };
    const local = items.filter(item => item.articleSpecific);
    if (local.length) {
      if (preferred) {
        const exactLocal = selectUnambiguous(local.filter(item => item.category === preferred));
        if (exactLocal) return exactLocal;
      }
      const generalLocal = selectUnambiguous(local.filter(item => item.category === GENERAL_CATEGORY));
      if (generalLocal) return generalLocal;
      if (local.length === 1) return local[0];
      return null;
    }
    if (preferred) {
      const exact = selectUnambiguous(items.filter(item => item.category === preferred));
      if (exact) return exact;
    }
    const general = selectUnambiguous(items.filter(item => item.category === GENERAL_CATEGORY));
    if (general) return general;
    return preferred ? null : selectUnambiguous(items);
  }

  function isWordCharacter(char) {
    return Boolean(char) && (char.toLocaleLowerCase("fr") !== char.toLocaleUpperCase("fr") || /[0-9]/.test(char));
  }

  function findLexiconRanges(text, trie, preferredCategory = "") {
    if (!trie?.children?.size) return [];
    const mapped = normalizeTextMap(text);
    const ranges = [];
    for (let start = 0; start < mapped.chars.length; start++) {
      let node = trie;
      for (let end = start; end < mapped.chars.length; end++) {
        node = node.children.get(mapped.chars[end]);
        if (!node) break;
        const item = chooseLexiconVariant(node.items, preferredCategory);
        if (!item) continue;
        const firstChar = mapped.chars[start - 1] || "";
        const lastChar = mapped.chars[end + 1] || "";
        if (isWordCharacter(mapped.chars[start]) && isWordCharacter(firstChar)) continue;
        if (isWordCharacter(mapped.chars[end]) && isWordCharacter(lastChar)) continue;
        const first = mapped.spans[start];
        const last = mapped.spans[end];
        if (first && last) ranges.push({ start: first.start, end: last.end, item });
      }
    }
    return ranges;
  }

  function formatArticleForCopy(law, article, includeLawReference = false) {
    const number = String(article?.number || "Article");
    const articleLabel = /^article\b/i.test(number) ? number : `Article ${number}`;
    const text = readText(article?.text ?? article?.content);
    const lines = [includeLawReference && law?.title ? `${articleLabel} — ${String(law.title).trim()}` : articleLabel];
    if (includeLawReference) {
      const reference = [law?.code, law?.type, law?.domain].map(value => String(value || "").trim()).filter(Boolean);
      if (reference.length) lines.push(`Référence complète : ${[...new Set(reference)].join(" — ")}`);
    }
    lines.push("", text);
    return lines.join("\n");
  }

  return {
    normalizeSearch,
    normalizeLegalCategory,
    LEGAL_CATEGORIES,
    GENERAL_CATEGORY,
    readText,
    normalizeHierarchy,
    normalizeArticle,
    normalizeLegalText,
    normalizeCatalogDocument,
    readStructureJson,
    paginateArticles,
    buildArticleTree,
    favoriteItemKey,
    normalizeFavoriteFolders,
    normalizeTextMap,
    buildTextSearchIndex,
    findIndexedTextRanges,
    findTextRanges,
    buildLexiconTrie,
    findLexiconRanges,
    formatArticleForCopy
  };
});
