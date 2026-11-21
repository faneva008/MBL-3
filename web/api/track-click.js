const NTFY_SERVER = String(process.env.NTFY_SERVER || 'https://ntfy.sh').replace(/\/$/, '');
const NTFY_TOPIC = String(process.env.NTFY_TOPIC || 'mbl-ef98e81338fc6b1f69a5').trim();
const NTFY_TOKEN = String(process.env.NTFY_TOKEN || '').trim();
const recent = globalThis.__mblNtfyClickAlerts || (globalThis.__mblNtfyClickAlerts = new Map());

function clean(value, fallback, max = 180) {
  const text = String(value || fallback).replace(/[\r\n<>]/g, ' ').trim();
  return text.slice(0, max) || fallback;
}

function isBot(userAgent) {
  return /bot|crawler|spider|headless|preview|lighthouse|curl|wget/i.test(String(userAgent || ''));
}

async function sendNtfy({ title, message, tags = 'computer' }) {
  if (!NTFY_TOKEN || !NTFY_TOPIC) return false;
  const response = await fetch(`${NTFY_SERVER}/${encodeURIComponent(NTFY_TOPIC)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NTFY_TOKEN}`,
      'Content-Type': 'text/plain; charset=utf-8',
      Title: title,
      Tags: tags
    },
    body: message
  });
  return response.ok;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ error: 'Méthode non autorisée.' });
    return;
  }
  if (isBot(request.headers['user-agent'])) {
    response.status(204).end();
    return;
  }
  const origin = clean(request.headers.origin, '', 240);
  if (origin && !/^https:\/\/mbl-web\.vercel\.app$/i.test(origin)) {
    response.status(204).end();
    return;
  }
  const body = typeof request.body === 'object' && request.body ? request.body : {};
  const page = clean(body.page, 'Page inconnue');
  const now = Date.now();
  const key = `${page}|${String(request.headers['x-forwarded-for'] || '').split(',')[0].trim()}`;
  const last = recent.get(key) || 0;
  if (now - last < 60_000) {
    response.status(204).end();
    return;
  }
  recent.set(key, now);
  for (const [entry, timestamp] of recent) {
    if (now - timestamp > 120_000) recent.delete(entry);
  }
  try {
    await sendNtfy({
      title: 'Nouveau clic sur le téléchargement MBL',
      message: `Page : ${page}\nType : clic sur le bouton de téléchargement\nDate : ${new Date(now).toISOString()}`,
      tags: 'point_up'
    });
  } catch (_) {
    // Une panne ntfy ne doit jamais perturber le site.
  }
  response.status(204).end();
}

export { sendNtfy };
