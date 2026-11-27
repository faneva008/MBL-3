export default async function handler(request, response) {
  // Endpoint conservé pour compatibilité avec les anciennes pages du site.
  // Seuls les téléchargements APK validés déclenchent désormais une notification ntfy.
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ error: 'Méthode non autorisée.' });
    return;
  }
  response.status(204).end();
}
