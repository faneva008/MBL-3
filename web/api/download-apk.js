import crypto from 'node:crypto';

const ALLOWED_HOSTS = new Set([
  'drive.usercontent.google.com',
  'drive.google.com'
]);
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fekcmhwberumklgdqshf.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_js5AqdCWk9CvJWDoWeWPzw_GNFgzfrH';
const MAX_APK_BYTES = 4_500_000;
const NTFY_SERVER = String(process.env.NTFY_SERVER || 'https://ntfy.sh').replace(/\/$/, '');
const NTFY_TOPIC = String(process.env.NTFY_TOPIC || 'mbl-site-alerts').trim();
const NTFY_TOKEN = String(process.env.NTFY_TOKEN || '').trim();

async function notifyDownload(filename) {
  if (!NTFY_TOKEN || !NTFY_TOPIC) return;
  try {
    await fetch(`${NTFY_SERVER}/${encodeURIComponent(NTFY_TOPIC)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NTFY_TOKEN}`,
        'Content-Type': 'text/plain; charset=utf-8',
        Title: 'Nouvelle demande de téléchargement MBL',
        Tags: 'arrow_down'
      },
      body: `Type : APK Android\nFichier : ${filename}\nSource : relais sécurisé /api/download-apk\nDate : ${new Date().toISOString()}`
    });
  } catch (_) {
    // Une panne ntfy ne doit jamais empêcher le téléchargement.
  }
}

function cleanFilename(value) {
  const fallback = 'application.apk';
  const name = String(value || fallback)
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '');
  return name.toLowerCase().endsWith('.apk') ? name : `${name || 'application'}.apk`;
}

async function publishedDriveFile(id) {
  const url = new URL(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/website_apps`);
  url.searchParams.set('select', 'storage_path,sha256,is_published');
  url.searchParams.set('is_published', 'eq.true');
  url.searchParams.set('limit', '100');
  const response = await fetch(url, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
  });
  if (!response.ok) throw new Error('Impossible de vérifier le catalogue publié.');
  const apps = await response.json();
  return apps.find((app) => {
    const path = String(app.storage_path || '');
    return path.includes(`id=${encodeURIComponent(id)}`) || path.includes(`id=${id}`);
  }) || null;
}

export default async function handler(request, response) {
  const params = new URL(request.url, `https://${request.headers.host || 'mbl-web.vercel.app'}`).searchParams;
  const id = String(params.get('id') || '').trim();
  const filename = cleanFilename(params.get('filename') || 'application.apk');

  if (!/^[A-Za-z0-9_-]{10,120}$/.test(id)) {
    response.status(400).json({ error: 'Identifiant Drive invalide.' });
    return;
  }

  try {
    const published = await publishedDriveFile(id);
    if (!published) {
      response.status(404).json({ error: 'Fichier non publié dans le catalogue.' });
      return;
    }

    const source = new URL('https://drive.usercontent.google.com/download');
    source.searchParams.set('id', id);
    source.searchParams.set('export', 'download');
    source.searchParams.set('confirm', 't');
    if (!ALLOWED_HOSTS.has(source.hostname)) {
      response.status(400).json({ error: 'Source de téléchargement non autorisée.' });
      return;
    }

    const upstream = await fetch(source, { redirect: 'follow' });
    if (!upstream.ok) {
      response.status(upstream.status).send('Le fichier APK est temporairement indisponible.');
      return;
    }
    const contentLength = Number(upstream.headers.get('content-length') || 0);
    if (contentLength > MAX_APK_BYTES) {
      response.status(413).send('Le fichier APK dépasse la taille autorisée.');
      return;
    }
    const contentType = String(upstream.headers.get('content-type') || '').toLowerCase();
    if (contentType.includes('text/html') || contentType.includes('application/json')) {
      response.status(502).send('Google Drive n’a pas renvoyé un fichier APK.');
      return;
    }
    const content = Buffer.from(await upstream.arrayBuffer());
    if (content.length > MAX_APK_BYTES || content.length < 4) {
      response.status(502).send('Fichier APK invalide ou trop volumineux.');
      return;
    }
    const sha256 = crypto.createHash('sha256').update(content).digest('hex');
    if (published.sha256 && sha256.toLowerCase() !== String(published.sha256).toLowerCase()) {
      response.status(502).send('L’empreinte du fichier APK ne correspond pas au catalogue.');
      return;
    }
    await notifyDownload(filename);
    response.setHeader('Content-Type', 'application/vnd.android.package-archive');
    response.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    response.setHeader('Content-Length', String(content.length));
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
    response.status(200).send(content);
  } catch (_) {
    response.status(502).send('Impossible de vérifier ou de récupérer le fichier APK.');
  }
}
