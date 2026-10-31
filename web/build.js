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

function sourceEntries(value) {
  const values = Array.isArray(value) ? value : (value ? [value] : []);
  return values.filter(source => source && typeof source === 'object');
}

function displayDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(date);
}

function decisionTitle(record) {
  const number = String(record.decision_number || '').trim();
  const date = displayDate(record.decision_date);
  const reference = number ? `Arrêt N° ${number}${date ? ` du ${date}` : ''}` : (date ? `Arrêt du ${date}` : 'Décision');
  return `${reference} — ${String(record.title || 'Jurisprudence de Madagascar').trim()}`;
}

function consolidationPanel(record, structure) {
  const sources = sourceEntries(structure.sources);
  const status = String(structure.status_label || record.status || 'Version consolidée');
  const officialHeader = String(structure.official_header || '').trim();
  const references = sources.map(source => {
    const title = String(source.title || source.name || 'Référence juridique');
    const url = String(source.url || '').trim();
    const verified = source.verified_at ? ` <small>Vérifiée le ${escapeHtml(displayDate(source.verified_at))}</small>` : '';
    return url.startsWith('http')
      ? `<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>${verified}</li>`
      : `<li>${escapeHtml(title)}${verified}</li>`;
  }).join('');
  const amended = record.last_amended_at ? `<span><strong>Dernier effet juridique intégré</strong><em>${escapeHtml(displayDate(record.last_amended_at))}</em></span>` : '';
  const updated = record.updated_at ? `<span><strong>Fiche consolidée le</strong><em>${escapeHtml(displayDate(record.updated_at))}</em></span>` : '';
  return `<section class="consolidation-card" aria-labelledby="consolidationTitle">
    <div class="consolidation-heading"><div><span class="eyebrow">CONSOLIDATION JURIDIQUE</span><h2 id="consolidationTitle">${escapeHtml(status)}</h2></div><span class="consolidation-mark" aria-hidden="true">✓</span></div>
    <p>Cette version intègre les effets des textes modificatifs, abrogatifs et complémentaires renseignés dans les références de cette fiche.</p>
    <div class="consolidation-dates">${amended}${updated}</div>
    ${officialHeader ? `<details><summary>Voir la base juridique et les références</summary><p class="official-header">${escapeHtml(officialHeader)}</p>${references ? `<ul class="source-list">${references}</ul>` : ''}</details>` : (references ? `<details><summary>Voir les références de consolidation</summary><ul class="source-list">${references}</ul></details>` : '')}
  </section>`;
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

async function fetchJson(url, headers, options = {}) {
  const response = await fetch(url, { ...options, headers, signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Supabase returned ${response.status} for ${url}`);
  return response.json();
}

function publicConfig() {
  const config = entries['config.js'] || '';
  const supabaseUrl = config.match(/supabaseUrl:\s*["']([^"']+)/)?.[1];
  const supabaseKey = config.match(/supabaseAnonKey:\s*["']([^"']+)/)?.[1];
  if (!supabaseUrl || !supabaseKey) throw new Error('Supabase public configuration is missing from the site bundle.');
  return { supabaseUrl: supabaseUrl.replace(/\/$/, ''), supabaseKey };
}

async function loadPublicTexts() {
  const { supabaseUrl, supabaseKey } = publicConfig();
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/mbl_website_public_texts?select=catalog_id,title,category,status,status_note,last_amended_at,updated_at,structure_json&limit=1000`;
  return fetchJson(url, { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` });
}

async function callPublicRpc(name, body) {
  const { supabaseUrl, supabaseKey } = publicConfig();
  return fetchJson(`${supabaseUrl}/rest/v1/rpc/${name}`, {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }, { method: 'POST', body: JSON.stringify(body) });
}

async function loadPublicJurisprudence() {
  const items = [];
  let offset = 0;
  do {
    const list = await callPublicRpc('juris_web_list20', { p_query: '', p_nature: '', p_limit: 20, p_offset: offset });
    const page = Array.isArray(list?.items) ? list.items : [];
    items.push(...page);
    if (!list?.has_more || !page.length) break;
    offset += page.length;
  } while (items.length < 1000);
  const details = [];
  for (const item of items) details.push(await callPublicRpc('juris_web_read20', { p_id: item.id }));
  return details.filter(item => item && item.id);
}

function withSeoPage(template, record, slug) {
  const structure = record.structure_json && typeof record.structure_json === 'object' ? record.structure_json : {};
  const title = String(record.title || structure.title || 'Texte juridique');
  const description = String(structure.summary || record.status_note || `Consultez ${title} dans la base légale de Madagascar.`).replace(/\s+/g, ' ').trim().slice(0, 155);
  const canonical = `${siteBase}/textes/${slug}.html`;
  const sources = sourceEntries(structure.sources);
  const metadata = [record.category, record.status].filter(Boolean).map(value => `<span>${escapeHtml(value)}</span>`).join('');
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Legislation',
    name: title,
    description,
    inLanguage: 'fr-MG',
    url: canonical,
    dateModified: record.updated_at || record.last_amended_at || undefined,
    isBasedOn: sources.map(source => source.url).filter(url => String(url || '').startsWith('http')),
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
    .replace('</details>', `</details>${consolidationPanel(record, structure)}`)
    .replace('<section class="reader-content" id="readerArticles" aria-live="polite"></section>', `<section class="reader-content" id="readerArticles" aria-live="polite">${staticArticles(structure)}</section>`)
    .replace('texte.html?id=', `textes/${slug}.html?id=`)
    .replace('href="styles.css"', 'href="../styles.css"')
    .replace('src="config.js"', 'src="../config.js"')
    .replace('src="app.js"', 'src="../app.js"')
    .replace('src="reader.js"', 'src="../reader.js"')
    .replaceAll('href="index.html', 'href="../index.html')
    .replaceAll('href="lexique.html', 'href="../lexique.html')
    .replaceAll('href="applications.html', 'href="../applications.html');
  return html;
}

function ficheHtml(fiche) {
  const fields = [['question', 'Question juridique'], ['facts', 'Faits'], ['claims', 'Prétentions et moyens'], ['holding', 'Solution'], ['reasoning', 'Motivation'], ['takeaway', 'À retenir'], ['limits', 'Limites de la fiche']];
  return fields.filter(([key]) => fiche?.[key]).map(([key, label]) => `<section><h2>${escapeHtml(label)}</h2><p>${escapeHtml(fiche[key])}</p></section>`).join('');
}

function withJurisprudencePage(template, record, slug) {
  const title = decisionTitle(record);
  const description = String(record.fiche?.takeaway || record.subject || `Décision de jurisprudence publiée : ${title}.`).replace(/\s+/g, ' ').trim().slice(0, 155);
  const canonical = `${siteBase}/jurisprudence/${slug}.html`;
  const structuredData = {
    '@context': 'https://schema.org', '@type': 'LegalCase', name: title, description, inLanguage: 'fr-MG', url: canonical,
    datePublished: record.published_at, dateModified: record.published_at,
    isBasedOn: String(record.source_url || '').startsWith('http') ? record.source_url : undefined,
    about: { '@type': 'Thing', name: 'Jurisprudence de Madagascar' },
    publisher: { '@type': 'Organization', name: 'Rohy — Juritech' }
  };
  const meta = [['Juridiction', record.jurisdiction], ['Chambre', record.chamber], ['Décision', record.decision_number], ['Affaire', record.case_number], ['Date', displayDate(record.decision_date)], ['Solution', record.outcome]]
    .filter(([, value]) => value).map(([label, value]) => `<span><strong>${escapeHtml(label)}</strong>${escapeHtml(value)}</span>`).join('');
  const source = String(record.source_url || '');
  let html = template
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(description)}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapeHtml(title)} | Mada Base Légale">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapeHtml(description)}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)} | Mada Base Légale</title>`)
    .replace('<link rel="canonical" href="https://mbl-web.vercel.app/jurisprudence.html">', `<link rel="canonical" href="${escapeHtml(canonical)}">`)
    .replace('</head>', `<script type="application/ld+json">${jsonForScript(structuredData)}</script></head>`)
    .replace('<h1 id="jurisTitle">Chargement de la décision…</h1>', `<h1 id="jurisTitle">${escapeHtml(title)}</h1>`)
    .replace('<p class="juris-lede" id="jurisLead"></p>', `<p class="juris-lede" id="jurisLead">${escapeHtml(record.fiche?.question || record.subject || '')}</p>`)
    .replace('<div class="juris-meta" id="jurisMeta"></div>', `<div class="juris-meta" id="jurisMeta">${meta}</div>`)
    .replace('<details class="juris-editorial" id="jurisEditorial"><summary>Comprendre la décision <span aria-hidden="true">＋</span></summary><div class="fiche-content"></div></details>', `<details class="juris-editorial" id="jurisEditorial"><summary>Comprendre la décision <span aria-hidden="true">＋</span></summary><div class="fiche-content"><div class="fiche-heading"><span class="section-kicker">FICHE ÉDITORIALE</span><p>Cette synthèse est distincte du texte source.</p></div><div class="fiche-grid">${ficheHtml(record.fiche)}</div></div></details>`)
    .replace('<a id="jurisSourceLink" class="text-link" href="#" target="_blank" rel="noopener noreferrer" hidden>Voir la source officielle ↗</a>', source.startsWith('http') ? `<a id="jurisSourceLink" class="text-link" href="${escapeHtml(source)}" target="_blank" rel="noopener noreferrer">Voir la source officielle ↗</a>` : '')
    .replace('<pre id="jurisBody"></pre>', `<pre id="jurisBody">${escapeHtml(record.body_text || '')}</pre>`);
  return html;
}

function staticSitemap(texts, jurisprudence = []) {
  const urls = [
    `${siteBase}/`,
    `${siteBase}/lexique.html`,
    `${siteBase}/applications.html`,
    `${siteBase}/jurisprudence.html`
  ];
  for (const record of texts) urls.push(`${siteBase}/textes/${slugify(record.title, record.catalog_id)}.html`);
  for (const record of jurisprudence) urls.push(`${siteBase}/jurisprudence/${slugify(record.title, record.id)}.html`);
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
  let jurisprudence = [];
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
    jurisprudence = await loadPublicJurisprudence();
    fs.writeFileSync(path.join(out, 'jurisprudence.html'), entries['jurisprudence.html'], 'utf8');
    const jurisTemplate = entries['jurisprudence-detail.html'];
    for (const record of jurisprudence) {
      const slug = slugify(record.title, record.id);
      const target = path.join(out, 'jurisprudence', `${slug}.html`);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, withJurisprudencePage(jurisTemplate, record, slug), 'utf8');
    }
    fs.writeFileSync(path.join(out, 'sitemap.xml'), staticSitemap(texts, jurisprudence), 'utf8');
    console.log(`Prepared ${Object.keys(entries).length} static files, ${texts.length} SEO text pages and ${jurisprudence.length} public jurisprudence pages`);
  } catch (error) {
    console.warn(`SEO generation partially skipped: ${error.message}`);
    console.warn('The base site remains deployable; rerun the build when Supabase is available.');
    fs.writeFileSync(path.join(out, 'sitemap.xml'), staticSitemap(texts, jurisprudence), 'utf8');
    console.log(`Prepared ${Object.keys(entries).length} static files plus existing SEO files`);
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
