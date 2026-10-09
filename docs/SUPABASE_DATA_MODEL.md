# Modèle des données synchronisées

Le client Android est une WebView vanilla : il utilise Supabase Auth REST pour l’inscription/connexion et envoie le jeton utilisateur à PostgREST. La session reste dans le `localStorage` persistant de la WebView; les contenus synchronisés restent dans IndexedDB. Les tables sont lues par pages de 250 lignes. L’APK ne modifie ni le catalogue, ni les textes, ni le lexique, ni le statut du profil; les seules écritures Auth sont la création de compte et la déconnexion.

## Source actuelle consommée par le client

Le client mobile lit `catalog`, `text_contents`, `lexicons`, son propre profil `profiles` et les deux clés WhatsApp publiques de `app_config`. `catalog.id` est l’UUID technique; l’identifiant métier conservé dans `text_contents.structure_json.id` n’est pas remplacé. `text_contents.structure_json` porte notamment le `domain` du texte, ses articles et leurs éventuelles définitions `{ "term", "definition", "category" }`. RLS expose tous les titres du catalogue et le Lexique, mais ne sert que cinq contenus gratuits au mode Freemium; un compte Pro valide peut lire les autres contenus.

`public.lexicons` porte `term`, `category`, `definition`, `created_at` et `updated_at`. La clé primaire composite `(term, category)` autorise plusieurs définitions d’un terme dans des catégories distinctes. Le client sélectionne d’abord la catégorie du texte, puis « Général »; une définition liée directement à l’article reste prioritaire. Une variante qui n’est ni dans le domaine du texte ni dans « Général » n’est pas appliquée arbitrairement.

`public.profiles` lie `id` à `auth.users(id)` et stocke `status` (`pending` par défaut) et `expires_at`. Le trigger d’inscription crée le profil sans donner au propriétaire des droits de modification; RLS autorise seulement la lecture de sa propre ligne. Le mode Pro exige `status = 'active'` et `expires_at > now()`.

`public.app_config` utilise `whatsapp_support_number` comme clé canonique. `whatsapp_number` reste un alias synchronisé. Seules ces deux clés sont lisibles publiquement; écriture admin uniquement. Si aucune valeur valide n’est disponible, l’APK utilise `261340517635`.

Catégories canoniques : Droit administratif; Droit constitutionnel & Institutions publiques; Finances publiques & Droit fiscal; Marchés publics & PPP; Droit du travail & Prévoyance sociale; Droit civil & Personnes (LTGO); Droit commercial & des Sociétés; Droit bancaire, Financier & Change; Droit de la concurrence & Consommation; Droit foncier & Immatriculation; Droit de l'environnement & Mines; Droit rural & Agrobusiness; Droit pénal & Criminologie; Procédure civile & Voies d'exécution; Procédures collectives; Droit du numérique & Télécoms; Droit international & Commerce international; Général. L’ancienne étiquette « Droit général » correspond à « Général ».

La table historique `lexicon_terms` documentée ci-dessous reste inchangée et demeure disponible à ses anciens consommateurs; elle ne représente que les entrées globales « Général » et ne peut pas exprimer les variantes par catégorie.

## `legal_texts`

Champs utilisés : `id`, `code`, `type`, `domain`, `domain_icon`, `status`, `status_label`, `verification_status`, `title`, `summary`, `hashtags` (text[]), `articles_count`, `articles` (JSONB array), `replaced_by`, `source_url`, `updated_at`.

Exemple d'un article dans `articles` :

```json
{
  "number": "Article 1",
  "text": "Texte révisé à partir de la publication officielle.",
  "references": [
    { "law_id": "loi-2003-044", "article": "Article 11", "label": "Code du Travail, article 11" }
  ],
  "definitions": [
    { "term": "Préavis", "definition": "Délai à respecter avant la rupture du contrat." }
  ]
}
```

`verification_status` vaut `unverified` ou `verified`. Un texte vérifié doit avoir une URL source HTTPS et une date `verified_at`; ce contrôle est appliqué dans `schema.sql`. Le client affiche les textes non vérifiés avec un avertissement.

## `lexicon_terms`

`term` (clé primaire), `definition`, `updated_at`.

## Synchronisation

La synchronisation n'est pas du temps réel push. Le client récupère l'instantané complet au lancement (si réseau et configuration), au retour du réseau et sur action manuelle. Après succès, l'instantané distant remplace le cache juridique local. Si le serveur est inaccessible, l'ancien cache demeure. Les favoris restent locaux sur l'appareil.
