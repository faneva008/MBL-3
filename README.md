# Mada Base Légale — Android / consultation hors ligne

Client Android destiné à la consultation juridique à Madagascar. L'application est une interface web locale (HTML/CSS/JavaScript) embarquée dans une WebView Android, pas React Native. Les ressources restent dans l'APK; l'accès et les données déjà chargées peuvent rester disponibles hors connexion selon la session et l'échéance mémorisées. Version préparée : **1.0.9-debug** (`versionCode` 10).

## Fonctions du client

- **Lecture est un onglet principal** : le texte ouvert, l'article courant et le défilement sont sauvegardés localement, conservés quand on change d'onglet et repris après fermeture/relance.
- Barre Lecture compacte : Sommaire à gauche, titre courant au centre et horloge à droite. L'historique récent s'ouvre à la demande; il n'occupe plus une rangée fixe au-dessus du texte.
- Table des matières navigable (Livre → Titre → Chapitre → Section → Article) et hiérarchie ouverte par défaut.
- Réglage persistant de la taille du texte; recherche interne temporisée de 300 ms, avec index d'occurrences pré-calculé, compteur et occurrences précédente/suivante.
- Navigation inférieure dans l'ordre Recherche → Répertoire (icône dossier) → Lecture → Favoris → Lexique → Profil. La recherche du Lexique porte sur le terme et sa catégorie; chaque entrée affiche son domaine.
- Copie d'un article en format court ou avec le titre et la référence complète du texte.
- Termes du lexique mis en évidence selon la catégorie du texte (avec repli « Général »); une définition propre à l’article reste prioritaire et la fiche précise sa catégorie.
- Favoris de textes et d'articles classés dans des dossiers locaux personnalisables.
- Recherche dans le répertoire, filtres par type/domaine, mode sombre et cache IndexedDB avec repli `localStorage`.
- Synchronisation descendante Supabase après confirmation de mise à jour. L’APK n’écrit aucun texte, lexique ni statut d’abonnement; elle utilise seulement Supabase Auth pour créer/ouvrir/fermer une session et lit son profil en RLS.

## Sécurité du lecteur et fluidité (v1.0.8)

- `structure_json` accepte un objet JSON ou une chaîne JSON valide; un JSON invalide devient un état « contenu indisponible » au lieu de faire planter l'interface. Les articles, leur statut, leur contenu, leurs références et définitions sont normalisés avec valeurs de repli et vérifications de type.
- Le lecteur affiche au plus **12 articles par page**. Le sommaire suit la page courante et dispose lui aussi de commandes précédent/suivant; les liens vers un article choisissent automatiquement sa page.
- L'index de recherche/liaison (références et Lexique) est construit uniquement pour la page visible. Pour un article de plus de 12 000 caractères, le texte entier reste affiché, mais les transformations coûteuses de surlignage automatique sont évitées. Les aperçus de référence sont limités à cinq articles; le lecteur paginé reste la voie pour parcourir l'ensemble.
- La recherche peut passer d'une page à l'autre à la demande et cède le thread entre articles. Il n'y a pas de parsing JSON dans un cycle de rendu React : le client est du JavaScript classique dans une WebView, sans React, `useEffect` ni `FlatList`.
- Le rendu du lecteur et les clics sont protégés par un garde-fou `try/catch`; une anomalie montre un écran de reprise local au lieu d'interrompre toute l'application. Les overlays fermés portent `hidden`/`inert` et ne capturent pas les touches.

## Authentification et accès Freemium/Pro (v1.0.9)

- Au démarrage, l’écran de connexion/inscription est imposé s’il n’existe aucune session locale. Supabase Auth est appelé directement via REST; la session (access/refresh token) est persistée dans `localStorage` de la WebView Android, rendue persistance possible par `setDomStorageEnabled(true)`. Ce projet n’utilise ni React Native, ni `Linking`, ni AsyncStorage.
- Chaque lancement connecté revalide la session et lit `profiles.status` et `profiles.expires_at`. Le Pro n’est actif que si `status='active'`, `expires_at` est une date valide et cette date est strictement dans le futur. Une expiration manquante/invalide, `pending` ou `expired` retombe sur Freemium.
- À l’inscription, la migration Supabase crée le profil avec `pending` via un trigger `auth.users`. Une confirmation d’e-mail peut être exigée par la configuration Supabase; sans session immédiatement renvoyée, l’écran de bienvenue reste disponible, mais l’utilisateur devra confirmer puis se reconnecter pour persister son accès.
- Le catalogue affiche les titres complets. La sélection gratuite est bornée à cinq textes : jusqu’à cinq `catalog.is_free=true` par UUID croissant, ou, si aucun n’est marqué, les cinq premiers UUID. Manette indique ces mêmes accès effectifs.
- Les ouvertures de textes payants sont bloquées par la modale Pro. Le Lexique reste gratuit. Les articles payants sont aussi filtrés dans `text_contents` par RLS; l’interface ne constitue donc pas l’unique barrière. Manette conserve les écritures des statuts/échéances et du contenu derrière `app_metadata.role='admin'`.
- Le numéro WhatsApp est chargé depuis `app_config.whatsapp_support_number`; l’ancien `whatsapp_number` est gardé synchronisé. Valeur de repli : `261340517635`. Le lien `https://wa.me` préremplit le message. Dans cette WebView, `window.location.assign()` est routé par `MainActivity` vers Android `ACTION_VIEW`; le texte n’est jamais envoyé automatiquement.
- Pour installer les policies à jour, exécuter `manette-admin/sql/mobile_freemium_auth.sql` comme propriétaire Supabase après `admin_access.sql` et `admin_modules.sql`. Le script retire les policies non reconnues sur les tables concernées, recrée les règles Admin/public attendues, accorde uniquement à chaque utilisateur la lecture de son profil et verrouille les contenus payants dans `text_contents`.
- Hors ligne, la dernière session/profil est utilisée jusqu’à l’échéance mémorisée. Une révocation serveur ne peut être connue de l’appareil qu’à la prochaine connexion; l’app retire alors les articles payants du cache local si le statut n’est plus valide.

## Modèle Supabase lu par le client mobile

Le client utilise le modèle courant suivant, sans migration destructive :

- `public.catalog` : métadonnées de texte (`id`, `title`, `category`, `is_free`, `created_at`). L'UUID `catalog.id` sert de clé technique.
- `public.text_contents` : contenu enrichi (`catalog_id`, `structure_json`, `updated_at`), relié à `catalog.id` par `catalog_id`.
- `public.lexicons` : entrées (`term`, `category`, `definition`, `created_at`, `updated_at`), avec clé composite `(term, category)` pour les variantes contextuelles; lecture publique car le Lexique est gratuit.
- `public.profiles` : `id`, `email`, `status`, `created_at`, `expires_at`; l’app ne lit que sa propre ligne, créée par trigger avec le statut `pending`. Seul Manette Admin peut modifier `status` et `expires_at`.
- `public.app_config` : l’app lit publiquement uniquement `whatsapp_support_number` et son alias `whatsapp_number`; les changements demeurent admin-only.

Les catégories disponibles sont : Droit administratif; Droit constitutionnel & Institutions publiques; Finances publiques & Droit fiscal; Marchés publics & PPP; Droit du travail & Prévoyance sociale; Droit civil & Personnes (LTGO); Droit commercial & des Sociétés; Droit bancaire, Financier & Change; Droit de la concurrence & Consommation; Droit foncier & Immatriculation; Droit de l'environnement & Mines; Droit rural & Agrobusiness; Droit pénal & Criminologie; Procédure civile & Voies d'exécution; Procédures collectives; Droit du numérique & Télécoms; Droit international & Commerce international; Général. « Droit général » est normalisé en « Général ». Les définitions d’article peuvent porter leur propre catégorie; les anciennes structures sans catégorie héritent du domaine du texte.

Le client parse `text_contents.structure_json` en hiérarchie de lecture. Si ce contenu est absent ou inutilisable, il n'invente pas d'articles : le texte peut rester dans le catalogue, mais l'écran signale l'absence de contenu enrichi. L'identifiant métier éventuellement présent dans `structure_json` reste distinct de l'UUID technique du catalogue.

La configuration se trouve dans `app/src/main/assets/www/config.js`. Seuls l'URL du projet et la clé Supabase publique `anon`/`publishable` y sont admises. **Ne jamais intégrer `service_role`, un mot de passe ou un secret administrateur dans le client.** Les favoris, dossiers, préférences et historique de lecture restent locaux à l'appareil.

Les anciennes tables `legal_texts` et `lexicon_terms`, ainsi que `supabase/schema.sql`, sont conservées pour compatibilité avec leurs consommateurs historiques. Elles ne sont pas la source lue par cette version du client. Ne supprimez aucune de ces tables dans le cadre d'une mise à jour de l'application.

## Contenu hors ligne et vérification juridique

L'APK conserve un jeu de démonstration issu de la maquette (10 textes, 22 articles et 8 entrées de lexique). Ces extraits et leurs statuts n'ont pas été vérifiés par rapport au Journal officiel de la République de Madagascar; l'application les signale comme contenu à vérifier. Ils ne remplacent ni une publication officielle ni un conseil juridique. Les données Supabase peuvent également être signalées comme non vérifiées : le statut doit être confirmé à partir d'une source primaire.

## Configuration Supabase

Exemple de configuration, avec une clé publique uniquement :

```js
window.TENIKOLO_CONFIG = {
  supabaseUrl: "https://VOTRE-PROJET.supabase.co",
  supabaseAnonKey: "VOTRE_CLE_ANON_OU_PUBLISHABLE",
  requestTimeoutMs: 15000
};
```

Les rôles publics doivent disposer des droits `SELECT` nécessaires, protégés par RLS. Les modifications de données restent du ressort d'un outil administrateur/serveur sécurisé. Le client demande explicitement confirmation avant de remplacer le cache local; un échec réseau conserve les données précédentes.

## Construire et installer

Prérequis : JDK 17 ou supérieur (compilation Java 17), Android SDK Platform 35 et Build Tools 35.0.0. Vérification effectuée avec JDK 21; le wrapper Gradle utilise Gradle 8.10.2.

```bash
bash ./gradlew --no-daemon clean assembleDebug
```

APK généré : `app/build/outputs/apk/debug/app-debug.apk`. Copie livrée : `/home/user/Mada-Base-Legale-v1.0.9-debug.apk`. Les versions précédentes (1.0.4–1.0.8) et l’APK historique non versionné sont conservés, sans suppression. Package `mg.tenikolo.droit.debug`, `versionCode` 10, cible Android 35, minimum Android 6.0 / API 23. Signée par la clé debug Gradle : test/sideload uniquement, pas Play Store; une version installée avec la même clé peut être mise à jour.

Validation 1.0.9 : `clean assembleDebug` réussi avec JDK 21, Gradle 8.10.2 et SDK/Build Tools 35; package, version et signatures v1/v2 contrôlés. Tests Node : Manette 78/78 et mobile 14/14; contrôles syntaxiques JavaScript réussis. SHA-256 de l’APK livré : `aa0c06d0e229166b31cdb47a1bc3c7db410b9b042eb0e3ad7887508b46396707`. Aucun appareil Android ni émulateur n’était connecté à ADB : le parcours Auth/WhatsApp, les interactions tactiles et Logcat n’ont pas été testés sur appareil; le gel précédemment signalé n’est donc pas confirmé comme résolu en condition réelle. La migration SQL reste à appliquer/vérifier sur le projet Supabase réel.

## Organisation

- `app/src/main/java/mg/tenikolo/droit/MainActivity.java` : coquille Android/WebView.
- `app/src/main/assets/www/` : interface locale, modèle des données et configuration publique.
- `docs/MOBILE_FREEMIUM_AUTH.md` : parcours Auth, règles Freemium/Pro, WhatsApp, RLS et limites de validation.
- `supabase/schema.sql` et `supabase/seed_demo.sql` : schéma/graines historiques, laissés en place pour leurs consommateurs.
