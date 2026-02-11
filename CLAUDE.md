# Groupe V2A — Site Web Vitrine

## Projet
Site vitrine premium pour le Groupe V2A (SAS), société de conseil et d'intermédiation en investissements stratégiques. Le site doit établir la crédibilité du groupe auprès d'investisseurs institutionnels et privés, présenter ses expertises et offrir un point de contact professionnel.

Référence complète : `CDC_Site_Web_V2A.docx.pdf` à la racine du projet.

## Contrainte obligatoire — Skill Frontend Design
- **Toujours utiliser le skill `/frontend-design` pour créer ou modifier des composants, pages et éléments d'interface.**
- Ce skill génère du code frontend production-grade avec un haut niveau de design, adapté au positionnement haut de gamme du projet.
- Ne jamais créer de composant UI sans passer par ce skill.

## Stack technique
- **Framework** : Next.js (App Router, SSG prioritaire)
- **Styling** : Tailwind CSS v4
- **Langage** : TypeScript strict
- **i18n** : next-intl (structure `/fr/` et `/en/`, lancement FR uniquement, EN préparé)
- **Formulaire** : React Hook Form + Zod pour la validation
- **Images** : next/image, format WebP avec fallback JPEG
- **Icônes** : Lucide React (line icons, trait fin)
- **Animations** : CSS natif ou Tailwind (fade-in au scroll, hover subtils — aucune animation agressive)
- **SEO** : next/metadata, sitemap.xml, robots.txt, Schema.org (Organization), Open Graph
- **Linting** : ESLint + Prettier

## REGLE ABSOLUE — CONFIDENTIALITE
**AUCUNE mention d'un "club", "réseau de membres", "programme d'affiliation" ou mécanisme similaire ne doit figurer dans le code source, le contenu, les métadonnées ou tout fichier accessible publiquement.**
Le site présente UNIQUEMENT le Groupe V2A en tant qu'entité opérationnelle de conseil et d'intermédiation.

---

## Charte graphique

### Palette de couleurs
| Token Tailwind       | Hex       | Usage                                                       |
|----------------------|-----------|-------------------------------------------------------------|
| `noir`               | `#000000` | Titres, texte principal, header, footer, éléments structurants |
| `or` (or-signature)  | `#C5A572` | Accents, CTA, liens hover, icônes, filets décoratifs, éléments premium |
| `creme`              | `#FAF9F6` | Fond principal du site, sections alternées, cartes          |
| `blanc`              | `#FFFFFF` | Fond de sections de contraste, cartes, espaces de respiration |
| `texte`              | `#333333` | Corps de texte                                              |

### Typographie
| Rôle             | Police                      | Usage                                         |
|------------------|-----------------------------|-----------------------------------------------|
| Principale       | Arial Bold / Helvetica Bold | H1, H2, navigation, boutons CTA               |
| Corps de texte   | Arial Regular               | Texte, H3, descriptions, formulaire           |
| Accent           | Georgia Italic              | Slogan, citations, éléments d'accentuation    |

### Hiérarchie typographique
- **H1** : Arial Bold, 40-48px, `#000000`
- **H2** : Arial Bold, 28-32px, `#000000`
- **H3** : Arial Regular, 22-24px, `#C5A572` ou `#000000` selon contexte
- **Corps** : Arial Regular, 16px min, `#333333`, interlignage 1.6 min
- **Slogan/citations** : Georgia Italic, taille variable, `#C5A572`

### Slogan officiel
> **Vision to Action**
> *Connecting Capital, Creating Impact*

### Éléments graphiques
- Icônes : line icons (trait fin), monochromatique, or `#C5A572` ou noir `#000000`
- Pas de stock photos génériques — visuels épurés : architecture, skylines, paysages stratégiques, textures nobles
- Animations CSS légères : fade-in au scroll, hover discrets. Aucune animation agressive
- Logo V2A : 3 versions (noir sur crème, or/blanc sur noir, favicon). Fourni par le client en SVG + PNG

---

## Arborescence du site

| Page                         | Route                           | Priorité    |
|------------------------------|----------------------------------|-------------|
| Accueil                      | `/`                              | Haute       |
| À propos                     | `/a-propos`                      | Haute       |
| Services (Expertises)        | `/services`                      | Haute       |
| Galerie (Réalisations)       | `/galerie`                       | Moyenne     |
| Contact                      | `/contact`                       | Haute       |
| Mentions légales             | `/mentions-legales`              | Obligatoire |
| Politique de confidentialité | `/politique-de-confidentialite`  | Obligatoire |

### Page Accueil (`/`)
1. **Hero** : visuel immersif plein écran (image/vidéo, tonalité sombre), logo, H1 "Vision to Action", sous-titre Georgia Italic "Connecting Capital, Creating Impact", CTA (fond or, texte noir)
2. **Proposition de valeur** : 3-4 blocs (50+ ans d'expérience, 5 continents, conception à livraison, accompagnement sur mesure)
3. **Secteurs d'expertise (aperçu)** : 5 cartes visuelles renvoyant vers `/services` (Hôtellerie, Immobilier, Énergies, Levée de Fonds, Actifs Diversifiés)
4. **Chiffres clés** (optionnel) : compteurs animés au scroll
5. **CTA final** : bandeau sobre + bouton "Contactez-nous"

### Page À propos (`/a-propos`)
1. **Vision & Mission** : positionnement dans la chaîne de valeur transactionnelle
2. **Équipe dirigeante** : 3 cofondateurs (Valère Duchenne, Andrew Duchenne, Angelo Rapazzini) avec photos, titres et expertises
3. **Valeurs** : sélectivité, transparence, alignement des intérêts, confidentialité

### Page Services (`/services`)
5 secteurs + section transversale :
1. Hôtellerie & Hébergements Touristiques — Conception et réalisation
2. Promotion Immobilière — Conception et réalisation
3. Énergies Renouvelables — Recherche et accompagnement
4. Levée de Fonds — Recherche et accompagnement
5. Actifs Diversifiés — Recherche et accompagnement
6. **Accompagnement Intégral** : timeline 6 étapes (Identification > Qualification > Structuration > Mise en relation > Négociation > Livraison)

### Page Galerie (`/galerie`)
- Grille responsive : 3 col desktop, 2 col tablette, 1 col mobile
- Lightbox au clic avec légende
- Filtres : Équipe / Immobilier & Hôtellerie / Énergie / Levée de Fonds / Actifs Diversifiés
- Lazy loading, format WebP + fallback JPEG

### Page Contact (`/contact`)
Formulaire intelligent :
| Champ               | Type           | Obligatoire | Validation                  |
|---------------------|----------------|-------------|-----------------------------|
| Nom complet         | Texte          | Oui         | Min. 2 caractères           |
| Adresse email       | Email          | Oui         | Format email valide         |
| Téléphone           | Téléphone      | Non         | Format international        |
| Société/Organisation| Texte          | Non         | —                           |
| Objet de la demande | Sélecteur      | Oui         | Liste prédéfinie (8 options)|
| Message             | Zone de texte  | Oui         | Min. 20 caractères          |
| Consentement RGPD   | Checkbox       | Oui         | Doit être cochée            |

Options objet : Investissement immobilier ou hôtelier / Projet énergétique / Levée de fonds / Matières premières et actifs stratégiques / Accompagnement de projet / Partenariat stratégique / Presse & Médias / Autre demande

**Coordonnées** : 8, Ruelle Boulot | +32 475 29 23 38 | contact@v2agroup.com
Carte Google Maps intégrée.

### Pages légales
- **Mentions légales** (`/mentions-legales`) : conforme LCEN
- **Politique de confidentialité** (`/politique-de-confidentialite`) : conforme RGPD

---

## Navigation & UX

### Header (sticky)
- Logo V2A à gauche
- Liens de navigation centrés ou à droite
- Bouton CTA "Contact" (fond or `#C5A572`, texte noir)
- Effet shrink subtil au scroll
- Mobile : hamburger menu avec animation fluide

### Footer
- Fond noir `#000000`
- Logo V2A version or/blanc
- Slogan en or `#C5A572`
- Liens : toutes les pages
- Coordonnées + copyright "© 2026 Groupe V2A SAS — Tous droits réservés"
- Liens réseaux sociaux (à confirmer)

### Bandeau cookies (RGPD)
3 options équivalentes obligatoires :
- **Tout accepter** : bouton plein, fond or `#C5A572`, texte noir
- **Tout refuser** : bouton contour noir, même taille
- **Paramétrer** : lien texte ou bouton secondaire

### Breakpoints responsive
| Breakpoint     | Largeur      | Adaptations                                    |
|----------------|--------------|------------------------------------------------|
| Desktop large  | >= 1200px    | Layout complet, navigation horizontale         |
| Desktop        | 992-1199px   | Layout complet, ajustements mineurs            |
| Tablette       | 768-991px    | 2 colonnes, navigation hamburger               |
| Mobile         | < 768px      | 1 colonne, navigation hamburger, CTA pleine largeur |

---

## Exigences techniques

### SEO
- Balises `<title>` uniques par page, meta descriptions
- HTML5 sémantique (header, nav, main, section, article, footer)
- URLs propres, sitemap XML, robots.txt
- Open Graph + Schema.org (Organization)
- Soumission Google Search Console

### Performance
- Minification CSS/JS (géré par Next.js)
- Compression WebP via next/image
- Lazy loading natif
- Cache navigateur
- Temps de chargement < 3s sur 4G
- **Score Lighthouse >= 90** (Performance, Accessibility, Best Practices, SEO)

### Sécurité
- HTTPS obligatoire (SSL/TLS)
- En-têtes de sécurité HTTP : CSP, X-Frame-Options, HSTS
- Protection formulaire : anti-injection + anti-spam (honeypot ou rate limiting)
- Validation côté serveur (Zod) en plus du client

### Accessibilité
- Contrastes WCAG 2.1 AA
- Navigation au clavier complète
- Attributs ARIA appropriés
- Tailles de police suffisantes (16px min corps)

### Internationalisation
- Structure next-intl avec préfixes `/fr/` et `/en/`
- Lancement en français uniquement
- Sélecteur de langue dans le header (masqué au lancement, prêt à activer)

---

## Conventions de développement

### Structure des fichiers
```
src/
  app/
    [locale]/
      page.tsx              # Accueil
      a-propos/page.tsx
      services/page.tsx
      galerie/page.tsx
      contact/page.tsx
      mentions-legales/page.tsx
      politique-de-confidentialite/page.tsx
      layout.tsx
  components/
    layout/               # Header, Footer, CookieBanner
    ui/                   # Boutons, cartes, icônes
    sections/             # Sections réutilisables (Hero, CTA, etc.)
  lib/                    # Utilitaires, validations, types
  messages/               # Fichiers de traduction (fr.json, en.json)
  assets/                 # Images, logo, favicon
public/
  images/
  favicon.ico
```

### Règles de code
- Composants en PascalCase, fichiers en kebab-case
- Un composant par fichier
- Props typées avec interfaces TypeScript
- Tailwind CSS pour tout le styling — pas de CSS custom sauf cas exceptionnel
- Mobile-first pour le responsive
- Pas de `any` en TypeScript
- Commits en français

### Contenu en attente du client
- Logo (SVG + PNG)
- Photos équipe et projets (JPEG/PNG haute résolution)
- Biographies complètes des cofondateurs
- Informations mentions légales (RCS, capital social, TVA)
- Chiffres clés définitifs
- Liens réseaux sociaux
- Favicon
