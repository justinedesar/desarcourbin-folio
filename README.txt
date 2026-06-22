
========================================
  DESARCOURBIN-FOLIO — GUIDE DU PROJET
========================================


HIERARCHIE DU PROJET
---------------------

desarcourbin-folio/
│
├── src/
│   ├── routes/          ← LES PAGES DU SITE
│   ├── components/      ← LES BLOCS REUTILISABLES
│   ├── i18n/            ← TOUT LE TEXTE DU SITE (3 langues)
│   ├── assets/          ← IMAGES & LOGO
│   ├── styles.css       ← COULEURS & POLICES
│   └── hooks/lib/...    ← Technique (ne pas toucher)
│
├── public/              ← Fichiers statiques (PDF du CV)
├── .env                 ← Clés Supabase (ne pas toucher)
└── package.json         ← Liste des librairies


QUI REMPLACE LE HTML ?
----------------------

src/routes/__root.tsx — c'est lui le "squelette HTML".
Il génère dynamiquement le <html>, <head>, <body>, le <title>,
la meta description, etc.


CARTE DES FICHIERS — QUI GERE QUOI
------------------------------------

MODIFIER LE TEXTE (titres, descriptions, FAQ, boutons...)
  Un seul endroit a retenir : les fichiers de traduction

  Français  → src/i18n/locales/fr.ts
  Anglais   → src/i18n/locales/en.ts
  Espagnol  → src/i18n/locales/es.ts

  Ces fichiers contiennent TOUT : hero, services, expérience, FAQ,
  formulaire, footer... Tu modifies le texte là, ça se reflète
  partout sur le site.


MODIFIER LES PAGES

  Page d'accueil (toutes les sections) → src/routes/index.tsx
  Page À propos                        → src/routes/about.tsx
  Page Projets                         → src/routes/projects.tsx
  Page Mentions légales                → src/routes/legal.tsx
  Structure commune (head, balises)    → src/routes/__root.tsx


MODIFIER LE HEADER ET LE FOOTER

  Header (logo, navigation, langue, bouton Calendly)
    → src/components/site/Header.tsx

  Footer (logo, liens, contact, copyright)
    → src/components/site/Footer.tsx


CHANGER LE LOGO

  Le logo SVG est dans src/assets/logo_desar_courbin.svg
  Pour le remplacer, mettre un nouveau fichier SVG au même endroit
  avec le même nom.


CHANGER LES COULEURS ET LES POLICES

  Tout est centralisé dans src/styles.css :

    :root {
      --bg: #F5F7F4;         ← fond général
      --accent: #2E6B4F;     ← couleur verte principale
      --accent-light: #7DBFA0;
      --text: #1A1A18;       ← texte principal
      --text-muted: #4A4A42;
    }

  Les polices sont :
    - Playfair Display (titres)
    - DM Sans (texte courant)
  Chargées depuis Google Fonts dans ce même fichier.
    - changer le 20/05 par font Marcellus 

CHANGER LES IMAGES

  Photo hero (Barcelone)      → src/assets/barcelona_hero.jpg
  Portrait de Justine         → src/assets/justine_portrait.jpg
  CV (PDF téléchargeable)     → public/CV_Justine_Desardurats_June_2026.pdf


LANCER LE PROJET
----------------

  Installer les dépendances :
    bun install

  Lancer le serveur de développement :
    bun dev

  Le site est accessible sur : http://localhost:8080
appeler le terminal :
ctrl +Ñ ou dans varre de commande ... terminal--> new terminal
commande pour lancer le serveurdepuis le terminal : bun dev