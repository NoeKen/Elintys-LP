# Elintys — Refonte UI de la landing page et des pages audience

Date : 2026-07-12
Statut : validé par l'utilisateur, prêt pour plan d'implémentation

## 1. Objectif de la refonte

Cette refonte vise à :
- repositionner la landing page d'Elintys comme une expérience immersive
  plutôt qu'une simple vitrine SaaS ;
- communiquer la vision du produit avant ses fonctionnalités ;
- renforcer la perception premium de la marque ;
- différencier clairement les univers Home, Organizers, Providers et
  Venues ;
- améliorer la conversion sans augmenter la charge cognitive ;
- construire une identité visuelle mémorable.

## 2. Critères de réussite

La refonte sera considérée comme réussie si :
- les quatre pages possèdent une identité immédiatement reconnaissable ;
- aucune page ne ressemble à une simple déclinaison d'une autre ;
- le Hero de la Home transmet d'abord une vision avant de montrer le
  produit ;
- les interfaces produit n'apparaissent qu'après la présentation de
  l'écosystème sur la Home ;
- les animations restent discrètes, élégantes et n'impactent pas les
  performances ;
- la navigation reste cohérente malgré la différenciation des pages.

## 3. Validation avant implémentation

Avant de considérer une section terminée, vérifier systématiquement :
- respecte-t-elle la narration définie ?
- apporte-t-elle une réelle valeur visuelle ?
- améliore-t-elle la compréhension ?
- est-elle suffisamment différente des autres pages ?
- reste-t-elle cohérente avec le Design System ?
- sert-elle réellement l'objectif de la page ?

Cette checklist guide les décisions pendant toute l'implémentation, section
par section.

## 4. Vision & direction artistique

Elintys ne vend pas un logiciel de gestion d'événements. Elintys donne vie aux
événements. Le design doit transmettre une émotion avant de démontrer une
fonctionnalité : créativité, inspiration, rencontres, excitation avant
l'événement, la magie du moment où un projet devient réalité.

**Principe directeur** : avant toute décision de design, se demander *quelle
émotion cette section doit provoquer*, puis seulement *quelle interface
transmet cette émotion*. L'émotion guide l'interface, jamais l'inverse.

**Principe cinématographique** : le scroll de chaque page est pensé comme un
film. Chaque section est une scène, chaque transition raconte quelque chose.
Aucune page ne doit ressembler à une succession de blocs identiques ni à de
la documentation. Le rythme alterne constamment : plein écran, contenu
éditorial, grandes photographies, respirations, cartes, chiffres,
illustrations, mockups, citations. Aucune répétition de structure au sein
d'une même page, et aucune des 4 pages ne doit être reconnaissable comme un
"template" appliqué aux 3 autres — Hero, transitions, mises en page et
interactions doivent différer visiblement d'une page à l'autre.

**Ambiance par page** :
- **Home** : inspirante, émotionnelle, visionnaire, cinématographique
- **Organizers** : précision, maîtrise, productivité, technologie, fluidité
- **Providers** : créativité, artisanat, portfolio, valorisation, talent
- **Venues** : architecture, design, lumière, voyage, immersion

## 5. Contrainte de périmètre : UI uniquement

Ce travail porte exclusivement sur l'interface (structure visuelle, design
system, animations, mise en page). Le contenu textuel existant
(`src/messages/en.ts`, `src/messages/fr.ts`) n'est pas réécrit — les sections
réutilisent les textes déjà présents (Problem, Solution, SocialProof, etc.).
Réordonner/restyler des blocs de contenu existants est dans le périmètre ;
inventer de nouvelles copies ne l'est pas.

Pages concernées : accueil (`[locale]/page.tsx`) + 3 pages audience
(organizers, providers, venues). Les pages légales (`conditions`,
`confidentialite`) restent inchangées.

## 6. Design System

### 6.1 Palette (extraite de la référence visuelle fournie)

Tokens bruts :
- `--color-accent-orange`: #E8965A (soft orange)
- `--color-accent-gold`: #C99A3E (warm sand / mustard)
- `--color-sage`: #7C8F6E (sage green)
- `--color-teal`: #2F7A7E (petrol blue / teal — couleur de marque principale)
- `--color-petrol-dark`: #1A4550 (deep teal)
- Fond dominant : blanc cassé `#FAFAF7` et gris très clair `#F3F3F1`. Le blanc
  doit couvrir ~70% de la surface de chaque page. Dégradés uniquement en
  transition entre sections (teal → transparent), jamais multicolores.

Tokens sémantiques (à consommer par les composants — jamais les couleurs
brutes directement) :
- `--color-background`, `--color-surface`, `--color-text-primary`,
  `--color-text-secondary`, `--color-border`, `--color-success`

### 6.2 Typographie

Sans-serif géométrique moderne (type Geist ou General Sans — à trancher lors
de l'implémentation selon licence disponible).

- H1 Hero : 56–72px desktop / 36–44px mobile, poids medium, tracking
  légèrement négatif
- H2 section : 36–44px
- Sous-titre : 22px, gris moyen
- Corps : 18px, line-height 1.6
- Espacement vertical minimum entre sections : 120px desktop

### 6.3 Primitives partagées

Nouveau dossier `src/app/components/ui/premium/` :
- `Section.tsx` — wrapper de section avec padding vertical standardisé,
  variante `background` (white / tinted / dark), transition d'entrée
  reveal+blur
- `FloatingCard.tsx` — carte avec ombre douce, coins arrondis (16–24px),
  hover premium (lift + shadow), glassmorphism léger optionnel
- `motion.ts` — variants Framer Motion réutilisables :
  - `fadeUp` (translation Y 24px + opacity) pour les blocs de texte
  - `blurReveal` (blur 8px→0 + opacity) pour les titres de section
  - `staggerContainer` (délai enfant 80–120ms) pour listes/cartes
  - `floatLoop` — dérive lente et continue (pas de rebond), réservée aux
    plans du Hero home et aux visuels décoratifs
  - `hoverLift` (translateY -4px + shadow renforcée) pour cartes/CTA
  - Toutes les variants respectent `prefers-reduced-motion` via le hook
    `useReducedMotion` de Framer Motion : si actif, retombent sur un simple
    fade sans translation/blur/boucle
- `SectionDivider.tsx` — séparateurs courbes/dégradés entre sections

## 7. Home — Hero cinématographique & flux narratif

### 7.1 Hero

Aucun dashboard, aucune statistique, aucun calendrier, aucune carte KPI dans
la première vue. Le Hero est émotionnel, immersif, cinématographique.

- Composition en plans de profondeur (React Three Fiber +
  `@react-three/drei`), chaque plan étant une **photographie/image
  immersive** (lieu, scénographie, coulisses/préparation, équipe en action,
  interaction humaine) — jamais une carte produit
- Diversité des types d'événements représentés : corporatif, culturel,
  privé, conférence, lancement, mariage, expérience immersive. Éviter la
  foule anonyme comme seul langage visuel ; montrer aussi la préparation,
  les coulisses, les lieux vides en transformation, la coordination entre
  acteurs
- Mouvement : dérive très lente et continue (`floatLoop`), parallaxe léger
  au scroll/mouvement de souris entre 3 plans (avant-plan flou léger, sujet
  net, arrière-plan lumière/bokeh) — jamais de rebond ni de boucle rapide
- Voile de dégradé teal/petrol très subtil en bas de viewport pour la
  lisibilité du texte, jamais un bandeau opaque
- Titre + sous-titre en HTML natif par-dessus le canvas (c'est l'élément
  LCP), accroche orientée vision/transformation (exemples validés : "De la
  première idée au dernier invité, tout l'écosystème événementiel réuni." —
  le choix final du wording relève de la copy, hors scope de ce spec UI)
- Mobile/tablette : pas de canvas R3F. Fallback sur une image immersive
  statique (recadrage portrait) avec parallaxe 2D Framer Motion au scroll
- **Perf** : le canvas R3F est chargé via `dynamic import` avec
  `ssr: false` et un fallback statique (image), pour ne jamais bloquer le
  LCP. Code-splitté par route : chargé uniquement sur `/`, jamais sur les
  pages audience

### 7.2 Flux narratif de la page (ordre des sections)

1. Hero immersif (vision)
2. Problème actuel (fragmentation — réutilise `Problem.tsx`)
3. Écosystème Elintys (comment ça relie organisateurs / prestataires /
   lieux / participants — vue conceptuelle, pas encore d'interface produit —
   réutilise `Solution.tsx`)
4. Expérience par type d'acteur (teaser visuel vers les 3 pages audience)
5. Produit & fonctionnalités (c'est ici, et seulement ici sur la home, que
   les interfaces/mockups produit apparaissent)
6. Preuves & bénéfices (réutilise `SocialProof.tsx`, `Comparison.tsx`)
7. Conversion (CTA final — réutilise `CTAFinal.tsx`)

Chaque transition entre sections doit être motivée narrativement (inspiration
→ problème → découverte → solution → projection → action), pas une simple
succession de composants.

## 8. Organizers — univers productivité, maîtrise, fluidité

Fichier top-level : `src/app/[locale]/organizers/page.tsx` (remplace les
routes actuelles `evenements`/`events`).

- Hero : mockup produit flottant présenté comme **outil d'orchestration**,
  pas comme logiciel administratif. Accroche orientée résultat ("transformer
  une idée en événement maîtrisé"), pas fonctionnalités. Écran non saturé de
  widgets — un mockup principal, pas une grille de KPI
- KPI et chiffres réservés aux sections de preuve, jamais à la première vue
- Animations les plus techniques (micro-interactions produit) réservées aux
  sections de démonstration produit, pas au Hero
- Parcours narratif :
  1. Transformer une idée en événement maîtrisé
  2. Planifier et centraliser
  3. Collaborer avec l'équipe
  4. Trouver lieux et prestataires
  5. Automatiser avec l'IA
  6. Piloter le jour J
  7. Mesurer et améliorer
- Navigation : Navbar globale + navigation d'ancrage secondaire propre à
  cette page (liens vers les sous-sections du parcours)

## 9. Providers — page double-face, orientée prestataires en priorité

Fichier top-level : `src/app/[locale]/providers/page.tsx`.

La page traite deux intentions complémentaires mais s'adresse **en
priorité** aux prestataires (pas aux organisateurs cherchant un prestataire
— ce cas est traité plus bas, en section complémentaire).

- Hero : galerie/mosaïque vivante de réalisations et de profils
  professionnels (pas un mockup produit, pas une simple grille façon
  marketplace générique). Doit transmettre la preuve sociale et le
  sentiment d'appartenance à un réseau de qualité. Accroche orientée
  valorisation du savoir-faire (ex. "Votre savoir-faire mérite plus que de
  simples publications.")
- Identité éditoriale, professionnelle et créative — s'inspirer de la
  lisibilité et des interactions d'une marketplace type Airbnb sans en
  copier la composition visuelle
- Contenu à prévoir :
  - portfolios plein cadre par prestataire
  - catégories de métiers (traiteur, déco, technique, photographe, etc.)
  - avant/après ou études de réalisation
  - avis intégrés directement aux projets (pas une section avis séparée)
  - section "demandes reçues" illustrant le flux de collaboration
  - bénéfices d'un profil vérifié
  - section complémentaire plus bas : recherche/découverte de prestataires
    (intention organisateur)
- Deux CTA distincts et visuellement différenciés : « Rejoindre comme
  prestataire » (primaire) et « Explorer les prestataires » (secondaire)
- Navigation : Navbar standard, éventuellement enrichie d'un accès rapide
  aux catégories de métiers

## 10. Venues — lookbook architectural avec valeur métier

Fichier top-level : `src/app/[locale]/venues/page.tsx`.

- Hero : photo plein cadre d'un lieu spectaculaire, navigation ultra
  minimale en overlay transparent, titre en bas à gauche (référence visuelle
  fournie par l'utilisateur)
- Structure : sections plein écran avec parallax, grandes photographies,
  peu de texte par section, transitions type scroll cinématographique entre
  lieux — le scroll doit rester fluide et natif, **éviter tout
  scroll-jacking agressif** qui bloquerait la navigation
- Chaque lieu présenté doit inclure, en plus du visuel, des informations
  contextuelles utiles et concises : type d'événement adapté, capacité,
  localisation, caractéristiques principales, CTA discret (demander une
  estimation / prendre contact / vérifier disponibilité)
- La page ne doit pas être uniquement une galerie esthétique : elle doit
  faire comprendre la valeur métier (trouver un lieu adapté, visualiser ses
  capacités, comprendre ses usages)
- Navigation : Navbar transparente sur le Hero, devient solide au scroll

## 11. Navigation — cohérence de marque

La Navbar globale (structure, liens principaux, terminologie) reste
identique sur les 4 pages — seul le **style** varie par page :
- Venues : transparente sur le Hero → solide au scroll
- Organizers : Navbar globale + navigation d'ancrage secondaire
- Providers : Navbar standard + accès rapide aux catégories
- Home : Navbar standard

Le Footer reste un composant partagé unique, sans variante par page.

## 12. Architecture de code

Pages top-level indépendantes (pas de template/config partagée qui force un
squelette commun), mais primitives et composants réellement génériques
partagés.

```
src/app/components/
├── ui/premium/       # tokens, Section, FloatingCard, motion.ts, SectionDivider — partagé
├── navigation/        # Navbar (variantes de style par page), Footer — partagé
├── landing/           # sections home existantes (Problem, Solution, SocialProof, etc.) restylées
├── organizers/        # composants métier propres à Organizers
├── providers/         # composants métier propres à Providers
└── venues/            # composants métier propres à Venues
```

Règle de partage :
- **Partagé** : tokens, primitives UI, variants d'animation, Navbar, Footer,
  composants réellement génériques (bouton, badge, etc.)
- **Propre à chaque page** : composition, ordre des sections, storytelling,
  composants métier spécifiques (ex. `VenueCard` n'a pas de sens hors de
  `venues/`)

`AudiencePage.tsx`, `audience-page.config.ts`, `audience-page.server.tsx`,
`audience-page.types.ts` (le système de template actuel) sont retirés une
fois les 3 pages migrées vers leurs fichiers top-level indépendants.

## 13. Images

Source : banques d'images premium (Unsplash ou équivalent, licence
vérifiée) — pas de génération IA, pas d'attente d'assets fournis par
l'utilisateur.

- Home Hero : 3–4 photos couvrant différents types d'événements (corporatif,
  culturel, mariage, conférence) + au moins une photo de coulisses/
  préparation
- Organizers : captures d'écran produit réelles (mockups du dashboard
  existant), pas de stock
- Providers : photos de réalisations par catégorie de métier, variées,
  qualité éditoriale
- Venues : grandes photos architecturales, une série par lieu si les
  données mock le permettent

Toutes les images passent par `next/image` avec `sizes` corrects ;
`priority` réservé à l'image LCP de chaque page.

**Cohérence artistique** : les images sélectionnées doivent partager une
direction artistique cohérente (palette, lumière, composition, traitement
colorimétrique, ambiance), afin de donner l'impression d'un univers unique
et non d'une juxtaposition de photographies provenant de banques d'images
différentes. L'identité visuelle doit être homogène sur l'ensemble du site,
même si chaque page a son propre univers (section 4).

## 14. Performance & responsive

- Canvas R3F : chargé uniquement sur `/`, jamais sur les pages audience ;
  `dynamic import` `ssr:false` + fallback statique ; désactivé sur
  mobile/tablette au profit d'un fallback 2D
- Lazy loading de toute image sous le fold
- Conception desktop-first, mais chaque primitive (`Section`,
  `FloatingCard`) définit ses breakpoints Tailwind dès sa création — pas de
  retrofit mobile après coup
- Budget : ne pas dégrader LCP/CLS par rapport à l'état actuel malgré
  l'ajout de R3F (garanti par le chargement différé + fallback statique)

## 15. Hors scope

- Réécriture du contenu textuel (copywriting) des sections existantes
- Pages légales (`conditions`, `confidentialite`)
- Choix final du wording des accroches Hero (options données à titre
  d'exemple, décision finale hors scope UI)
- Choix final de la police exacte (Geist vs General Sans vs alternative) —
  à trancher en phase d'implémentation selon licence
