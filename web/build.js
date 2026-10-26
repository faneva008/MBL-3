const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const compressed = path.join(__dirname, 'site.json.br');
const out = path.resolve(__dirname, 'dist');
const entries = JSON.parse(zlib.brotliDecompressSync(fs.readFileSync(compressed)).toString('utf8'));
fs.rmSync(out, { recursive: true, force: true });
for (const [relativePath, content] of Object.entries(entries)) {
  const target = path.resolve(out, relativePath);
  if (!target.startsWith(out + path.sep)) throw new Error(`Invalid path: ${relativePath}`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
}
for (const seoFile of ['robots.txt', 'sitemap.xml']) {
  const source = path.join(__dirname, seoFile);
  const target = path.join(out, seoFile);
  if (fs.existsSync(source)) fs.copyFileSync(source, target);
}
console.log(`Prepared ${Object.keys(entries).length} static files plus SEO files`);
