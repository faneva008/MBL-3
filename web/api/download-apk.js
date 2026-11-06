const ALLOWED_HOSTS = new Set([
  'drive.usercontent.google.com',
  'drive.google.com'
]);

function cleanFilename(value) {
  const fallback = 'application.apk';
  const name = String(value || fallback)
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '');
  return name.toLowerCase().endsWith('.apk') ? name : `${name || 'application'}.apk`;
}

export default async function handler(request, response) {
  const params = new URL(request.url, `https://${request.headers.host || 'mbl-web.vercel.app'}`).searchParams;
  const id = String(params.get('id') || '').trim();
  const filename = cleanFilename(params.get('filename') || 'application.apk');

  if (!/^[A-Za-z0-9_-]{10,120}$/.test(id)) {
    response.status(400).json({ error: 'Identifiant Drive invalide.' });
    return;
  }

  const source = new URL('https://drive.usercontent.google.com/download');
  source.searchParams.set('id', id);
  source.searchParams.set('export', 'download');
  source.searchParams.set('confirm', 't');

  try {
    if (!ALLOWED_HOSTS.has(source.hostname)) {
      response.status(400).json({ error: 'Source de téléchargement non autorisée.' });
      return;
    }
    const upstream = await fetch(source, { redirect: 'follow' });
    if (!upstream.ok) {
      response.status(upstream.status).send('Le fichier APK est temporairement indisponible.');
      return;
    }
    const content = Buffer.from(await upstream.arrayBuffer());
    response.setHeader('Content-Type', 'application/vnd.android.package-archive');
    response.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    response.setHeader('Content-Length', String(content.length));
    response.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
    response.status(200).send(content);
  } catch (_) {
    response.status(502).send('Impossible de récupérer le fichier APK.');
  }
}
