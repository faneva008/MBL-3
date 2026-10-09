const test = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const MBLData = require("../app/src/main/assets/www/mobile-data.js");

const appPath = join(__dirname, "../app/src/main/assets/www/app.js");
const cssPath = join(__dirname, "../app/src/main/assets/www/reader-safety.css");
const htmlPath = join(__dirname, "../app/src/main/assets/www/index.html");
const app = readFileSync(appPath, "utf8");
const css = readFileSync(cssPath, "utf8");
const html = readFileSync(htmlPath, "utf8");

test("structure_json safely accepts objects or JSON strings and guards null/missing article fields", () => {
  const law = MBLData.normalizeCatalogDocument(
    { id: "catalog-uuid", title: "Texte", category: "Général" },
    { catalog_id: "catalog-uuid", structure_json: JSON.stringify({
      id: "business-id",
      articles: [null, { number: "Article 1", content: { paragraphs: ["Texte", "intégral"] } }, { number: "Article 2", status: "ABROGE", text: null }]
    }) }
  );
  assert.equal(law.id, "business-id");
  assert.equal(law.articles.length, 3);
  assert.equal(law.articles[0].number, "Article 1");
  assert.equal(law.articles[0].text, "");
  assert.equal(law.articles[0].status, "EN_VIGUEUR");
  assert.equal(law.articles[1].text, "Texte\n\nintégral");
  assert.equal(law.articles[1].status, "EN_VIGUEUR");
  assert.equal(law.articles[2].status, "ABROGE");
  assert.equal(law.articles[2].text, "");

  const malformed = MBLData.normalizeCatalogDocument(
    { id: "bad-json", title: "Sans contenu" },
    { catalog_id: "bad-json", structure_json: "{not-json" }
  );
  assert.equal(malformed.hasContent, false);
  assert.deepEqual(malformed.articles, []);
});

test("article pagination is bounded, deterministic and clamps invalid pages", () => {
  const articles = Array.from({ length: 29 }, (_, index) => ({ number: `Article ${index + 1}` }));
  const first = MBLData.paginateArticles(articles, 0, 12);
  const second = MBLData.paginateArticles(articles, 1, 12);
  const last = MBLData.paginateArticles(articles, 999, 12);
  assert.deepEqual([first.start, first.end, first.pageCount], [0, 12, 3]);
  assert.equal(first.items.length, 12);
  assert.deepEqual([second.start, second.end], [12, 24]);
  assert.deepEqual([last.page, last.start, last.end, last.items.length], [2, 24, 29, 5]);
  assert.deepEqual(MBLData.paginateArticles(null, NaN, 0).items, []);
});

test("large reader renders one page and builds only bounded per-page article indexes", () => {
  assert.match(app, /const READER_PAGE_SIZE = 12/);
  assert.match(app, /const ARTICLE_LINK_INDEX_MAX_CHARS = 12000/);
  assert.match(app, /text\.length > ARTICLE_LINK_INDEX_MAX_CHARS/);
  assert.match(app, /buildReaderSearchIndex\(law, page\.items\)/);
  assert.match(app, /renderArticleNodes\(state\.readerTree\)\}\$\{renderReaderPagination\(page\)\}/);
  assert.match(app, /renderReaderPagination\(info, "toc-page"\)/);
  assert.match(app, /PREVIEW_ARTICLE_LIMIT = 5/);
  assert.match(app, /visibleArticles = articles\.slice\(start, start \+ PREVIEW_ARTICLE_LIMIT\)/);
  assert.doesNotMatch(app, /buildReaderSearchIndex\(law\);/);
  assert.doesNotMatch(app, /law\.articles\.map\(article => articleCard\(article/);
  assert.doesNotMatch(app, /useEffect\s*\(/);
});

test("reader errors are isolated and hidden overlays cannot intercept taps", () => {
  assert.match(app, /function renderReader\(\)\s*\{\s*try \{ return renderReaderView\(\); \}\s*catch \(error\) \{ renderReaderErrorBoundary\(error\); \}/);
  assert.match(app, /function renderReaderErrorBoundary\(error\)/);
  assert.match(app, /document\.addEventListener\("click", onActionSafely\)/);
  assert.match(app, /window\.addEventListener\("unhandledrejection"/);
  assert.match(app, /overlay\.inert = !isOpen/);
  assert.match(css, /\.overlay\[hidden\][\s\S]*?pointer-events:\s*none\s*!important/);
  assert.match(html, /href="\.\/reader-safety\.css"/);
});
