const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const compressed = path.join(__dirname, 'site.json.br');
const out = path.resolve(__dirname, 'dist');
const entries = JSON.parse(zlib.brotliDecompressSync(fs.readFileSync(compressed)).toString('utf8'));
const siteBase = String(process.env.PUBLIC_SITE_URL || 'https://mbl-web.vercel.app').replace(/\/$/, '');

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function jsonForScript(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c').replaceAll('>', '\\u003e').replaceAll('&', '\\u0026');
}

function slugify(value, id) {
  const base = String(value || 'texte-juridique')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '').slice(0, 90);
  const suffix = String(id || '').replace(/[^a-z0-9]/gi, '').slice(0, 8).toLowerCase();
  return `${base || 'texte-juridique'}-${suffix || 'public'}`;
}

function articleText(article) {
  return String(article?.content || article?.text || article?.body || article?.description || '');
}

function articleTitle(article, index) {
  return article?.title || (article?.number ? `Article ${article.number}` : `Article ${index + 1}`);
}

function hierarchy(article) {
  const value = article?.hierarchy || {};
  return [value.book, value.title, value.chapter, value.section].filter(Boolean).join(' · ');
}

function staticArticles(structure) {
  const articles = Array.isArray(structure?.articles) ? structure.articles : [];
  let previous = '';
  return articles.map((article, index) => {
    const current = hierarchy(article);
    const heading = current && current !== previous ? `<h2 class="reader-section-heading">${escapeHtml(current)}</h2>` : '';
    previous = current || previous;
    return `${heading}<article class="legal-article"><h3>${escapeHtml(articleTitle(article, index))}</h3><div class="legal-article-text">${escapeHtml(articleText(article)).replace(/\r?\n/g, '<br>')}</div></article>`;
  }).join('\n');
}

async function fetchJson(url, headers) {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Supabase returned ${response.status} for ${url}`);
  return response.json();
}

async function loadPublicTexts() {
  const config = entries['config.js'] || '';
  const supabaseUrl = config.match(/supabaseUrl:\s*["']([^"']+)/)?.[1];
  const supabaseKey = config.match(/supabaseAnonKey:\s*["']([^"']+)/)?.[1];
  if (!supabaseUrl || !supabaseKey) throw new Error('Supabase public configuration is missing from the site bundle.');
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/mbl_website_public_texts?select=catalog_id,title,category,status,status_note,last_amended_at,updated_at,structure_json&limit=1000`;
  return fetchJson(url, { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` });
}

function withSeoPage(template, record, slug) {
  const structure = record.structure_json && typeof record.structure_json === 'object' ? record.structure_json : {};
  const title = String(record.title || structure.title || 'Texte juridique');
  const description = String(structure.summary || record.status_note || `Consultez ${title} dans la base légale de Madagascar.`).replace(/\s+/g, ' ').trim().slice(0, 155);
  const canonical = `${siteBase}/textes/${slug}.html`;
  const metadata = [record.category, record.status].filter(Boolean).map(value => `<span>${escapeHtml(value)}</span>`).join('');
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Legislation',
    name: title,
    description,
    inLanguage: 'fr-MG',
    url: canonical,
    dateModified: record.updated_at || record.last_amended_at || undefined,
    isPartOf: { '@type': 'WebSite', name: 'Mada Base Légale', url: siteBase },
    publisher: { '@type': 'Organization', name: 'Rohy — Juritech' }
  };
  let html = template
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(description)}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapeHtml(title)} | Mada Base Légale">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapeHtml(description)}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)} | Mada Base Légale</title>`)
    .replace('</head>', `<link rel="canonical" href="${escapeHtml(canonical)}"><script type="application/ld+json">${jsonForScript(structuredData)}</script><script>window.__MBL_PRELOADED_TEXT__=${jsonForScript(record)};</script></head>`)
    .replace('<h1 id="readerTitle">Chargement du texte…</h1>', `<h1 id="readerTitle">${escapeHtml(title)}</h1>`)
    .replace('<div class="reader-meta" id="readerMeta"></div>', `<div class="reader-meta" id="readerMeta">${metadata}</div>`)
    .replace('<p id="readerSummary"></p>', `<p id="readerSummary">${escapeHtml(String(structure.summary || record.status_note || ''))}</p>`)
    .replace('<section class="reader-content" id="readerArticles" aria-live="polite"></section>', `<section class="reader-content" id="readerArticles" aria-live="polite">${staticArticles(structure)}</section>`)
    .replace('texte.html?id=', `textes/${slug}.html?id=`);
  return html;
}

function staticSitemap(texts) {
  const urls = [
    `${siteBase}/`,
    `${siteBase}/lexique.html`,
    `${siteBase}/applications.html`
  ];
  for (const record of texts) urls.push(`${siteBase}/textes/${slugify(record.title, record.catalog_id)}.html`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${escapeHtml(url)}</loc></url>`).join('\n')}\n</urlset>\n`;
}

async function main() {
  fs.rmSync(out, { recursive: true, force: true });
  for (const [relativePath, content] of Object.entries(entries)) {
    const target = path.resolve(out, relativePath);
    if (!target.startsWith(out + path.sep)) throw new Error(`Invalid path: ${relativePath}`);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content, 'utf8');
  }
  for (const seoFile of ['robots.txt', 'sitemap.xml', 'google1d6d15102a042fee.html']) {
    const source = path.join(__dirname, seoFile);
    const target = path.join(out, seoFile);
    if (fs.existsSync(source)) fs.copyFileSync(source, target);
  }

  let texts = [];
  try {
    texts = await loadPublicTexts();
    const template = entries['texte.html'];
    if (!template) throw new Error('texte.html template is missing from the site bundle.');
    const seen = new Set();
    for (const record of texts) {
      const slug = slugify(record.title, record.catalog_id);
      if (seen.has(slug)) continue;
      seen.add(slug);
      const target = path.join(out, 'textes', `${slug}.html`);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, withSeoPage(template, record, slug), 'utf8');
    }
    fs.writeFileSync(path.join(out, 'sitemap.xml'), staticSitemap(texts), 'utf8');
    console.log(`Prepared ${Object.keys(entries).length} static files, ${texts.length} SEO text pages and a generated sitemap`);
  } catch (error) {
    console.warn(`SEO generation skipped: ${error.message}`);
    console.warn('The base site remains deployable; rerun the build when Supabase is available.');
    console.log(`Prepared ${Object.keys(entries).length} static files plus existing SEO files`);
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
