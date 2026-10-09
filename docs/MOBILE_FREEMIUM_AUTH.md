# Authentification, accès Freemium/Pro et WhatsApp — MBL mobile

## Client Android

L’APK est une interface HTML/CSS/JavaScript classique embarquée dans une Android WebView, pas une application React Native. Elle appelle Supabase Auth et PostgREST par `fetch`, stocke la session dans `localStorage` persistant de la WebView (`setDomStorageEnabled(true)`) et utilise le jeton d’accès utilisateur pour les requêtes REST. Aucun SDK React Native, `Linking` ou AsyncStorage n’est utilisé.

Sans session sauvegardée, l’écran d’authentification masque le catalogue. La connexion utilise `POST /auth/v1/token?grant_type=password`; la création de compte utilise `POST /auth/v1/signup`. Les jetons sont rafraîchis avec le `refresh_token`. À chaque démarrage connecté, l’app vérifie la session et lit `profiles(id,email,status,expires_at)` depuis Supabase. La règle Pro échoue en mode fermé : `status` doit être `active` et `expires_at` une date valide strictement supérieure à l’heure locale courante.

Supabase peut exiger une confirmation d’e-mail. Dans ce cas, `signUp` ne renvoie pas forcément de session : l’app affiche tout de même l’écran de bienvenue, l’accès Freemium est temporaire sur cette instance, puis l’utilisateur devra confirmer son adresse et se connecter pour garder une session persistante.

## Gating des contenus et RLS

- `catalog` reste lisible pour tous afin d’afficher tous les titres. L’app n’expose que les métadonnées présentes dans cette table aux comptes gratuits.
- `text_contents` est filtrée par RLS, pas seulement par une modale JavaScript. Les comptes anonymes/non-Pro ne peuvent lire que cinq contenus marqués `is_free=true` (au plus cinq, ordre UUID croissant). Si aucune entrée n’est marquée gratuite, les cinq premiers UUID sont retenus. Un Pro valide peut lire tous les contenus.
- Une ouverture depuis une carte, un favori, l’historique ou un renvoi passe par le contrôle d’accès. Les aperçus des textes payants sont également bloqués.
- Le Lexique (`lexicons`) reste lisible publiquement et gratuit. Les écritures admin des textes, statuts, expirations et configuration restent protégées par les politiques Manette/RLS.
- Quand un statut non-Pro est confirmé, l’app retire les articles payants du cache local; si elle est hors ligne, elle ne peut appliquer que le dernier profil mémorisé jusqu’à son `expires_at`. Un contenu Pro déjà téléchargé peut avoir été consulté hors ligne avant que le serveur soit joignable pour confirmer une révocation.

Manette Admin affiche l’accès Pro actif uniquement si le statut est `active` et si une expiration future valide existe. Le bouton admin continue à écrire uniquement `status` et `expires_at`; le client ne peut pas modifier son profil.

## Profil créé à l’inscription

La migration installe `public.profiles` avec `status DEFAULT 'pending'` et le trigger `mbl_sync_profile_from_auth_user()` sur `auth.users`. Le trigger crée/met à jour l’e-mail sans écraser un statut ou une date définis par Manette. Les policies gardent les lectures/écritures admin; l’utilisateur authentifié peut uniquement lire sa propre ligne. Une fonction `mbl_is_current_user_pro()` retourne seulement un booléen pour `auth.uid()` et sert à l’évaluation RLS de `text_contents`.

## WhatsApp

Le numéro est lu via `app_config` et la clé canonique `whatsapp_support_number`. La clé historique `whatsapp_number` reste synchronisée pour Manette et les clients plus anciens. Valeur par défaut : `261340517635`. Le numéro est réduit aux chiffres puis le client construit `https://wa.me/<numéro>?text=<message-encodé>`.

Dans cette WebView, l’équivalent Android du `Linking.openURL` React Native est `window.location.assign()` sur le lien universel WhatsApp. `MainActivity` intercepte la navigation HTTPS et déclenche Android `Intent.ACTION_VIEW`; le système ouvre WhatsApp si installé, sinon une application/web handler compatible. Le texte est prérempli, jamais envoyé automatiquement.

Les messages utilisent l’e-mail Supabase de l’utilisateur. Pour une demande générale : `Bonjour, je souhaite souscrire à l'offre Pro de Mada Base Légale pour mon compte : <email>`. Pour un texte verrouillé, le titre est inséré dans : `Bonjour, je souhaite souscrire à l'offre Pro pour débloquer le texte : <titre> (Compte : <email>)`.

## Migration et limites de validation

Pour un nouvel environnement : exécuter dans Supabase SQL Editor `manette-admin/sql/admin_access.sql`, `manette-admin/sql/admin_modules.sql`, puis `manette-admin/sql/mobile_freemium_auth.sql`. Sur une base déjà équipée, exécuter la dernière migration. Elle retire les policies non reconnues sur les tables concernées, recrée les règles Admin/public attendues et vérifie ainsi qu’une ancienne règle permissive ne contourne ni le paywall, ni le statut pending, ni la restriction de lecture `app_config`. Elle ne supprime aucune table ni ligne de données.

L’agent ne détient pas d’accès au projet Supabase réel : migration non appliquée en ligne et policies distantes non introspectées. Les vérifications effectuées sont statiques sur les migrations locales et par tests. Un appareil/émulateur n’est pas connecté à ADB; le flux e-mail, le lancement WhatsApp et les interactions tactiles doivent encore être testés sur un appareil avec le bon projet Supabase.
