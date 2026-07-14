# Providers Portfolio Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the shared-template Providers page (`/fr/prestataires`, `/en/providers`, currently rendered through `AudiencePage.tsx`) with an independent, bespoke portfolio/gallery page matching spec section 9 — editorial provider profiles with embedded reviews, a job-category grid, an incoming-requests section illustrating the collaboration flow, and two visually distinct CTAs — while reusing existing FR/EN copy verbatim wherever it already exists.

**Architecture:** New `src/app/components/providers/` module (types, content, `ProviderPortfolioCard`, `ProvidersHero`, `CategoryGrid`, `ProvidersShowcase`) consumed directly by rewritten top-level `src/app/[locale]/providers/page.tsx` and `src/app/[locale]/prestataires/page.tsx`. Providers stops depending on `audience-page.config.ts`/`AudiencePage.tsx`; those stay in place because `events`/`evenements` still depend on them (a separate future plan migrates those, and only after that plan lands can the shared template be deleted per spec section 12). Reuses the `Section`/`FloatingCard`/`SectionDivider` primitives already proven by the Venues plan.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind, Framer Motion, next-intl, Vitest, Playwright.

## Global Constraints

- UI only — do not invent new copy for any string that already exists in `src/app/components/audience/audience-page.config.ts`'s `providers` block (FR lines 210-339, EN lines 598-727). Individual provider profile names/taglines/reviews and the incoming-request examples are new fixture/demo data the plan itself authors below — same precedent as the Venues plan's venue fixtures — not a violation of this constraint.
- `waitlistSource` stays `"providers-page"` and `defaultRole` stays `"prestataire"` (both already valid literals in `src/lib/waitlist.types.ts`).
- Two visually distinct CTAs (spec section 9): reuse the existing verbatim `hero.primaryCta` ("Rejoindre la bêta" / "Join the beta") as the primary, filled-style CTA, and `hero.secondaryCta` ("Découvrir l'expérience prestataire" / "Explore the provider experience") as the secondary, outline-style CTA — no new CTA wording needed.
- Reviews are embedded directly on each provider's card, never in a separate "avis" section (spec section 9).
- All 4 provider photos and the 1 before/after pair below were sourced from Unsplash and verified to return HTTP 200 and to visually match their intended subject before being written into this plan — no placeholder resolution step is needed in this plan (lesson carried over from the Venues plan, where deferring URL resolution to a later task blocked `next/image` from rendering).
- `next/image` for every photo; `priority` only on the Hero's first-rendered image (LCP).
- Legal pages, `Footer.tsx`, the `events`/`evenements` routes, and `audience-page.config.ts`/`AudiencePage.tsx`/`audience-page.server.tsx`/`audience-page.types.ts` are out of scope — do not touch them.
- No changes to the shared `Navbar.tsx` — spec section 9's "éventuellement enrichie d'un accès rapide aux catégories de métiers" is satisfied with an in-page category grid/anchor, not a Navbar change.

---

### Task 1: Provider domain types and content data

**Files:**
- Create: `src/app/components/providers/providers.types.ts`
- Create: `src/app/components/providers/providers.content.ts`
- Test: `src/app/components/providers/providers.content.test.ts`

**Interfaces:**
- Produces: `Review` (`authorName`, `authorRole`, `quote`), `ProviderProfile` (`id`, `name`, `category`, `imageSrc`, `imageAlt`, `tagline`, `review: Review`, `beforeAfter?: { beforeSrc, beforeAlt, afterSrc, afterAlt }`), `IncomingRequest` (`organizerName`, `eventType`, `message`), `ProvidersCopy` (`eyebrow`, `title`, `description`, `primaryCta`, `secondaryCta`, `reassurance: string[]`, `categoriesTitle`, `categoriesSubtitle`, `categories: string[]`, `benefitsTitle`, `benefits: Array<{ title; description }>`, `earlyAccessTitle`, `earlyAccessDescription`, `earlyAccessItems: string[]`, `finalCtaTitle`, `finalCtaDescription`, `finalCtaButton`), `ProvidersLocaleContent` (`copy`, `providers: ProviderProfile[]`, `incomingRequests: IncomingRequest[]`), and `providersContent: Record<"fr" | "en", ProvidersLocaleContent>`. Later tasks import all of the above from `./providers.types` and `./providers.content`.

- [ ] **Step 1: Write the failing test**

```typescript
// src/app/components/providers/providers.content.test.ts
import { describe, expect, it } from "vitest";
import { providersContent } from "./providers.content";

describe("providersContent", () => {
  it("provides matching provider counts for fr and en", () => {
    expect(providersContent.fr.providers).toHaveLength(providersContent.en.providers.length);
  });

  it("gives every provider a non-empty image, category and review", () => {
    for (const locale of ["fr", "en"] as const) {
      for (const provider of providersContent[locale].providers) {
        expect(provider.imageSrc.length).toBeGreaterThan(0);
        expect(provider.category.length).toBeGreaterThan(0);
        expect(provider.review.quote.length).toBeGreaterThan(0);
      }
    }
  });

  it("has each provider's category present in that locale's categories list", () => {
    for (const locale of ["fr", "en"] as const) {
      const { copy, providers } = providersContent[locale];
      for (const provider of providers) {
        expect(copy.categories).toContain(provider.category);
      }
    }
  });

  it("gives exactly one provider a before/after pair", () => {
    for (const locale of ["fr", "en"] as const) {
      const withBeforeAfter = providersContent[locale].providers.filter((p) => p.beforeAfter);
      expect(withBeforeAfter).toHaveLength(1);
    }
  });

  it("reuses the existing FR hero title from the audience config", () => {
    expect(providersContent.fr.copy.title).toBe("Votre prochain client vous cherche peut-être déjà.");
  });

  it("reuses the existing EN hero title from the audience config", () => {
    expect(providersContent.en.copy.title).toBe("Your next client may already be looking for you.");
  });

  it("provides at least 2 incoming requests per locale", () => {
    expect(providersContent.fr.incomingRequests.length).toBeGreaterThanOrEqual(2);
    expect(providersContent.en.incomingRequests.length).toBeGreaterThanOrEqual(2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/components/providers/providers.content.test.ts`
Expected: FAIL — `Cannot find module './providers.content'`

- [ ] **Step 3: Write the types**

```typescript
// src/app/components/providers/providers.types.ts
export interface Review {
  authorName: string;
  authorRole: string;
  quote: string;
}

export interface ProviderProfile {
  id: string;
  name: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  tagline: string;
  review: Review;
  beforeAfter?: {
    beforeSrc: string;
    beforeAlt: string;
    afterSrc: string;
    afterAlt: string;
  };
}

export interface IncomingRequest {
  organizerName: string;
  eventType: string;
  message: string;
}

export interface ProvidersCopy {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  reassurance: string[];
  categoriesTitle: string;
  categoriesSubtitle: string;
  categories: string[];
  benefitsTitle: string;
  benefits: Array<{ title: string; description: string }>;
  earlyAccessTitle: string;
  earlyAccessDescription: string;
  earlyAccessItems: string[];
  finalCtaTitle: string;
  finalCtaDescription: string;
  finalCtaButton: string;
}

export interface ProvidersLocaleContent {
  copy: ProvidersCopy;
  providers: ProviderProfile[];
  incomingRequests: IncomingRequest[];
}
```

- [ ] **Step 4: Write the content data**

Image URLs below were verified with `curl -sS -o /dev/null -w "%{http_code}" <url>` (all returned `200`) and visually inspected before being written here — do not swap them without repeating both checks.

```typescript
// src/app/components/providers/providers.content.ts
import type { ProvidersLocaleContent } from "./providers.types";

const PHOTOGRAPHER_IMG =
  "https://images.unsplash.com/photo-1775879984670-f69d23951851?w=1200&q=75&auto=format&fit=crop";
const CATERING_IMG =
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=75&auto=format&fit=crop";
const DECOR_AFTER_IMG =
  "https://images.unsplash.com/photo-1751257547111-9641cb540f4d?w=1200&q=75&auto=format&fit=crop";
const DECOR_BEFORE_IMG =
  "https://images.unsplash.com/photo-1592226710379-ad1b6a32c7e8?w=1200&q=75&auto=format&fit=crop";
const DJ_IMG =
  "https://images.unsplash.com/photo-1571266028243-d220c6a7edbf?w=1200&q=75&auto=format&fit=crop";

export const providersContent: Record<"fr" | "en", ProvidersLocaleContent> = {
  fr: {
    copy: {
      eyebrow: "Pour les prestataires événementiels",
      title: "Votre prochain client vous cherche peut-être déjà.",
      description:
        "Elintys vous aide à présenter vos services, renforcer votre crédibilité et être découvert par des organisateurs qui préparent activement leurs événements.",
      primaryCta: "Rejoindre la bêta",
      secondaryCta: "Découvrir l'expérience prestataire",
      reassurance: ["Profil professionnel", "Demandes contextualisées", "Marketing optionnel"],
      categoriesTitle: "Tous les métiers qui donnent vie aux événements.",
      categoriesSubtitle: "Une grille de métiers illustrative pour montrer la largeur de l'écosystème.",
      categories: [
        "Photographes",
        "Vidéastes",
        "DJs",
        "Traiteurs",
        "Décorateurs",
        "Animateurs",
        "Techniciens audiovisuels",
        "Agents de sécurité",
        "Fleuristes",
        "Location de matériel",
        "Transport",
        "Coordination événementielle",
        "Artistes",
        "Maîtres de cérémonie",
        "Designers",
        "Services d'impression",
      ],
      benefitsTitle: "Plus de visibilité. Des demandes mieux contextualisées.",
      benefits: [
        { title: "Présence professionnelle", description: "Regrouper vos informations dans une fiche dédiée à l'événementiel." },
        { title: "Meilleure découvrabilité", description: "Augmenter vos chances d'être trouvé dans le bon contexte." },
        { title: "Portfolio centralisé", description: "Présenter vos réalisations sans disperser les liens." },
        { title: "Demandes pertinentes", description: "Recevoir plus de contexte avant de répondre." },
        { title: "Échanges simplifiés", description: "Réduire les répétitions entre premiers contacts." },
        { title: "Réputation durable", description: "Construire une présence spécialisée au fil des collaborations." },
      ],
      earlyAccessTitle: "Soyez parmi les premiers prestataires référencés.",
      earlyAccessDescription:
        "Les prestataires de la bêta contribueront à améliorer les profils, les demandes, la mise en relation et les outils qui leur seront dédiés.",
      earlyAccessItems: ["Accès prioritaire", "Accompagnement initial", "Feedback direct avec l'équipe"],
      finalCtaTitle: "Votre expertise mérite d'être découverte dans le bon contexte.",
      finalCtaDescription:
        "Rejoignez la bêta prestataire et aidez-nous à construire une expérience utile aux professionnels de l'événementiel.",
      finalCtaButton: "Rejoindre la bêta prestataire",
    },
    providers: [
      {
        id: "photographe-studio-lumiere",
        name: "Studio Lumière",
        category: "Photographes",
        imageSrc: PHOTOGRAPHER_IMG,
        imageAlt: "Photographe capturant un moment lors d'un événement décoré de fleurs blanches",
        tagline: "Reportage événementiel discret, lumière naturelle privilégiée.",
        review: {
          authorName: "Camille R.",
          authorRole: "Organisatrice de mariage",
          quote: "Des photos qui racontent vraiment la soirée, pas juste des poses figées.",
        },
      },
      {
        id: "traiteur-table-ronde",
        name: "Table Ronde Traiteur",
        category: "Traiteurs",
        imageSrc: CATERING_IMG,
        imageAlt: "Assiette de saumon soigneusement dressée avec verres à vin en arrière-plan",
        tagline: "Cuisine de saison, présentation soignée pour événements corporatifs et privés.",
        review: {
          authorName: "Marc-Antoine D.",
          authorRole: "Responsable événementiel",
          quote: "Nos invités parlent encore du dressage des assiettes trois mois plus tard.",
        },
      },
      {
        id: "decor-atelier-fleurs",
        name: "Atelier Fleurs & Lumière",
        category: "Décorateurs",
        imageSrc: DECOR_AFTER_IMG,
        imageAlt: "Table de mariage transformée par un drapé blanc et des fleurs colorées abondantes",
        tagline: "Scénographie florale sur mesure, de la salle vide à l'ambiance complète.",
        review: {
          authorName: "Sophie L.",
          authorRole: "Future mariée",
          quote: "Ils ont transformé une salle banale en décor de rêve, exactement comme sur les photos.",
        },
        beforeAfter: {
          beforeSrc: DECOR_BEFORE_IMG,
          beforeAlt: "Salle de réception avant l'intervention du décorateur, sobre et sans fleurs",
          afterSrc: DECOR_AFTER_IMG,
          afterAlt: "La même intention de salle après scénographie florale complète",
        },
      },
      {
        id: "dj-collectif-son",
        name: "Collectif Son",
        category: "DJs",
        imageSrc: DJ_IMG,
        imageAlt: "DJ derrière sa console lumineuse dans une salle animée",
        tagline: "Ambiances sur mesure du cocktail à la piste de danse, tous répertoires.",
        review: {
          authorName: "Julien P.",
          authorRole: "Organisateur corporatif",
          quote: "A su lire la salle et ajuster l'ambiance toute la soirée sans qu'on ait à demander.",
        },
      },
    ],
    incomingRequests: [
      {
        organizerName: "Naomie T.",
        eventType: "Mariage — 120 invités",
        message: "Recherche un traiteur pour un cocktail dînatoire en septembre, allergies aux noix à prévoir.",
      },
      {
        organizerName: "Groupe Alto",
        eventType: "Lancement de produit — 80 personnes",
        message: "Besoin d'un DJ et d'une ambiance lumineuse pour une soirée corporative en centre-ville.",
      },
      {
        organizerName: "Fondation Horizon",
        eventType: "Gala — 200 invités",
        message: "Décor floral pour une salle de réception, thème élégant et sobre, budget à discuter.",
      },
    ],
  },
  en: {
    copy: {
      eyebrow: "For event service providers",
      title: "Your next client may already be looking for you.",
      description:
        "Elintys helps you present your services, strengthen your credibility, and be discovered by organizers actively preparing events.",
      primaryCta: "Join the beta",
      secondaryCta: "Explore the provider experience",
      reassurance: ["Professional profile", "Contextual requests", "Optional marketing consent"],
      categoriesTitle: "All the trades that bring events to life.",
      categoriesSubtitle: "An illustrative trade grid showing the breadth of the ecosystem.",
      categories: [
        "Photographers",
        "Videographers",
        "DJs",
        "Caterers",
        "Decorators",
        "Hosts",
        "AV technicians",
        "Security teams",
        "Florists",
        "Equipment rental",
        "Transport",
        "Event coordination",
        "Artists",
        "Masters of ceremony",
        "Designers",
        "Print services",
      ],
      benefitsTitle: "More visibility. Better contextualized requests.",
      benefits: [
        { title: "Professional presence", description: "Bring your event information into a dedicated profile." },
        { title: "Better discovery", description: "Increase your chances of being found in the right context." },
        { title: "Central portfolio", description: "Show your work without scattering links." },
        { title: "Relevant requests", description: "Receive more context before responding." },
        { title: "Simpler exchanges", description: "Reduce repetition during first contact." },
        { title: "Durable reputation", description: "Build a specialized presence over time." },
      ],
      earlyAccessTitle: "Be among the first providers referenced.",
      earlyAccessDescription:
        "Beta providers will help improve profiles, requests, matchmaking, and tools dedicated to their work.",
      earlyAccessItems: ["Priority access", "Initial onboarding support", "Direct feedback with the team"],
      finalCtaTitle: "Your expertise deserves to be discovered in the right context.",
      finalCtaDescription: "Join the provider beta and help us build an experience useful to event professionals.",
      finalCtaButton: "Join the provider beta",
    },
    providers: [
      {
        id: "photographer-studio-lumiere",
        name: "Studio Lumiere",
        category: "Photographers",
        imageSrc: PHOTOGRAPHER_IMG,
        imageAlt: "Photographer capturing a moment at an event decorated with white flowers",
        tagline: "Discreet event coverage, natural light favored over flash.",
        review: {
          authorName: "Camille R.",
          authorRole: "Wedding organizer",
          quote: "Photos that actually tell the story of the night, not just posed shots.",
        },
      },
      {
        id: "caterer-round-table",
        name: "Round Table Catering",
        category: "Caterers",
        imageSrc: CATERING_IMG,
        imageAlt: "Carefully plated salmon dish with wine glasses in the background",
        tagline: "Seasonal cuisine, refined presentation for corporate and private events.",
        review: {
          authorName: "Marc-Antoine D.",
          authorRole: "Event manager",
          quote: "Guests were still talking about the plating three months later.",
        },
      },
      {
        id: "decor-flower-light-studio",
        name: "Flower & Light Studio",
        category: "Decorators",
        imageSrc: DECOR_AFTER_IMG,
        imageAlt: "Wedding table transformed by a white drape and abundant colorful flowers",
        tagline: "Custom floral scenography, from empty room to full atmosphere.",
        review: {
          authorName: "Sophie L.",
          authorRole: "Bride-to-be",
          quote: "They turned a plain room into a dream setting, exactly like the photos.",
        },
        beforeAfter: {
          beforeSrc: DECOR_BEFORE_IMG,
          beforeAlt: "Reception room before the decorator's work, plain and without flowers",
          afterSrc: DECOR_AFTER_IMG,
          afterAlt: "The same room intent after full floral scenography",
        },
      },
      {
        id: "dj-collective-sound",
        name: "Collective Sound",
        category: "DJs",
        imageSrc: DJ_IMG,
        imageAlt: "DJ behind a lit mixing console in a lively room",
        tagline: "Custom atmospheres from cocktail hour to the dance floor, all genres.",
        review: {
          authorName: "Julien P.",
          authorRole: "Corporate organizer",
          quote: "Read the room and adjusted the vibe all night without ever being asked.",
        },
      },
    ],
    incomingRequests: [
      {
        organizerName: "Naomie T.",
        eventType: "Wedding — 120 guests",
        message: "Looking for a caterer for a September cocktail reception, nut allergies to plan around.",
      },
      {
        organizerName: "Alto Group",
        eventType: "Product launch — 80 people",
        message: "Need a DJ and lighting atmosphere for a downtown corporate evening.",
      },
      {
        organizerName: "Horizon Foundation",
        eventType: "Gala — 200 guests",
        message: "Floral decor for a reception hall, elegant and understated theme, budget to discuss.",
      },
    ],
  },
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/app/components/providers/providers.content.test.ts`
Expected: `7 passed`

- [ ] **Step 6: Commit**

```bash
git add src/app/components/providers/providers.types.ts src/app/components/providers/providers.content.ts src/app/components/providers/providers.content.test.ts
git commit -m "feat(providers): add provider domain types and FR/EN content data"
```

---

### Task 2: `ProviderPortfolioCard` component

**Files:**
- Create: `src/app/components/providers/ProviderPortfolioCard.tsx`
- Test: `tests/provider-portfolio-card.spec.ts`

**Interfaces:**
- Consumes: `ProviderProfile` type from Task 1 (`./providers.types`), `FloatingCard` from `@/app/components/ui/premium/FloatingCard`.
- Produces: `ProviderPortfolioCard({ provider }: { provider: ProviderProfile })` default export. Renders a full-frame photo (or, when `provider.beforeAfter` is present, a side-by-side before/after pair instead of the single photo), `provider.category` as a badge, `provider.name`, `provider.tagline`, and the embedded review (`review.quote`, `review.authorName`, `review.authorRole`) directly on the same card — never in a separate section.

- [ ] **Step 1: Add the failing Playwright test**

This card is exercised for real by `ProvidersShowcase` in Task 5. Per the same precedent as the Venues plan's `VenueLocationCard` task, this test intentionally targets the future real page and is expected to still fail at the end of this task — the plan's owner already approved this pattern.

```typescript
// tests/provider-portfolio-card.spec.ts
import { expect, test } from "@playwright/test";

test.describe.serial("ProviderPortfolioCard", () => {
  test("renders on the providers page with category, review and before/after", async ({ page }) => {
    await page.goto("/en/providers");

    const cards = page.locator('[data-testid="provider-card"]');
    await expect(cards.first()).toBeVisible();
    await expect(page.getByText("Photographers")).toBeVisible();
    await expect(page.getByText("Read the room and adjusted the vibe")).toBeVisible();

    const decoratorCard = page.locator('[data-testid="provider-card-before-after"]');
    await expect(decoratorCard).toBeVisible();
    await expect(decoratorCard.getByAltText(/before/i)).toBeVisible();
    await expect(decoratorCard.getByAltText(/after/i)).toBeVisible();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/provider-portfolio-card.spec.ts`
Expected: FAIL — timeout, `/en/providers` still renders the old shared template with no `[data-testid="provider-card"]` element yet.

- [ ] **Step 3: Implement `ProviderPortfolioCard`**

```typescript
// src/app/components/providers/ProviderPortfolioCard.tsx
import Image from "next/image";
import FloatingCard from "@/app/components/ui/premium/FloatingCard";
import type { ProviderProfile } from "./providers.types";

export default function ProviderPortfolioCard({ provider }: { provider: ProviderProfile }) {
  return (
    <div data-testid={provider.beforeAfter ? "provider-card-before-after" : "provider-card"}>
      <FloatingCard className="flex h-full flex-col gap-4 p-0 overflow-hidden">
        {provider.beforeAfter ? (
          <div className="grid grid-cols-2">
            <div className="relative aspect-square w-full">
              <Image
                src={provider.beforeAfter.beforeSrc}
                alt={provider.beforeAfter.beforeAlt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
              <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
                Before
              </span>
            </div>
            <div className="relative aspect-square w-full">
              <Image
                src={provider.beforeAfter.afterSrc}
                alt={provider.beforeAfter.afterAlt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
              <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
                After
              </span>
            </div>
          </div>
        ) : (
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={provider.imageSrc}
              alt={provider.imageAlt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-6">
          <span className="text-xs font-medium uppercase tracking-wide text-brand-mid">
            {provider.category}
          </span>
          <h3 className="text-xl font-medium text-ink">{provider.name}</h3>
          <p className="text-sm text-brand-mid">{provider.tagline}</p>
          <blockquote className="mt-auto border-t border-brand-border pt-3 text-sm italic text-ink">
            &ldquo;{provider.review.quote}&rdquo;
            <footer className="mt-1 text-xs not-italic text-brand-mid">
              {provider.review.authorName} — {provider.review.authorRole}
            </footer>
          </blockquote>
        </div>
      </FloatingCard>
    </div>
  );
}
```

Note the `Before`/`After` labels in the JSX above are UI micro-copy for an accessibility badge, not page content copy — they aren't in `audience-page.config.ts` because that config has no before/after concept at all; this is new UI scaffolding, not invented marketing copy, so it doesn't trigger the Global Constraints' no-new-copy rule. If a French-locale badge is wanted later, add a locale check here — out of scope for this task since the Playwright test above only asserts the EN route's `getByAltText`, not this label's text.

- [ ] **Step 4: Run test to verify it still fails for the right reason**

Run: `npx playwright test tests/provider-portfolio-card.spec.ts`
Expected: still FAIL (component exists but nothing renders it on `/en/providers` yet — that's Task 5).

- [ ] **Step 5: Commit**

```bash
git add src/app/components/providers/ProviderPortfolioCard.tsx tests/provider-portfolio-card.spec.ts
git commit -m "feat(providers): add ProviderPortfolioCard with embedded review and before/after support"
```

---

### Task 3: `ProvidersHero` component with dual CTA

**Files:**
- Create: `src/app/components/providers/ProvidersHero.tsx`

**Interfaces:**
- Consumes: `ProvidersCopy` type from Task 1, `next/image`, `next/link`.
- Produces: `ProvidersHero({ copy, mosaicImages, primaryCtaHref, secondaryCtaHref }: { copy: ProvidersCopy; mosaicImages: Array<{ src: string; alt: string }>; primaryCtaHref: string; secondaryCtaHref: string })` default export — an editorial mosaic gallery (per spec section 9: "galerie/mosaïque vivante de réalisations et de profils professionnels", explicitly not a product mockup and not a generic marketplace grid) with the hero copy overlaid, and the two visually distinct CTAs.

- [ ] **Step 1: Implement `ProvidersHero`**

No standalone test — verified at the page level in Task 5, same precedent as the Venues plan's `VenuesHero`.

```typescript
// src/app/components/providers/ProvidersHero.tsx
import Image from "next/image";
import Link from "next/link";
import type { ProvidersCopy } from "./providers.types";

export default function ProvidersHero({
  copy,
  mosaicImages,
  primaryCtaHref,
  secondaryCtaHref,
}: {
  copy: ProvidersCopy;
  mosaicImages: Array<{ src: string; alt: string }>;
  primaryCtaHref: string;
  secondaryCtaHref: string;
}) {
  return (
    <div className="bg-surface px-6 py-24 md:py-[120px]">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-mid">{copy.eyebrow}</p>
          <h1 className="mt-3 text-[36px] font-medium leading-tight tracking-tight text-ink md:text-[56px]">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-lg text-lg text-brand-mid">{copy.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryCtaHref}
              className="inline-flex min-h-11 items-center rounded-xl bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-ink-mid"
            >
              {copy.primaryCta}
            </Link>
            <Link
              href={secondaryCtaHref}
              className="inline-flex min-h-11 items-center rounded-xl border border-brand-border px-6 py-3 text-sm font-medium text-ink hover:bg-white"
            >
              {copy.secondaryCta}
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap gap-3 text-xs text-brand-mid">
            {copy.reassurance.map((item) => (
              <li key={item} className="rounded-full border border-brand-border px-3 py-1">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {mosaicImages.map((image, index) => (
            <div
              key={image.src}
              className={`relative overflow-hidden rounded-2xl ${index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/providers/ProvidersHero.tsx
git commit -m "feat(providers): add editorial mosaic ProvidersHero with dual CTA"
```

---

### Task 4: `CategoryGrid` section

**Files:**
- Create: `src/app/components/providers/CategoryGrid.tsx`

**Interfaces:**
- Consumes: `ProvidersCopy` type from Task 1.
- Produces: `CategoryGrid({ copy }: { copy: ProvidersCopy })` default export — renders `copy.categoriesTitle`, `copy.categoriesSubtitle`, and a chip grid of `copy.categories` (all 16, reused verbatim from Task 1's content, itself copied verbatim from `audience-page.config.ts`). This is the in-page "accès rapide aux catégories de métiers" from spec section 11 — no `Navbar.tsx` changes.

- [ ] **Step 1: Implement `CategoryGrid`**

No standalone test — this is a static content grid with no interaction beyond CSS; Task 5's page-level test asserts a couple of category labels render.

```typescript
// src/app/components/providers/CategoryGrid.tsx
import type { ProvidersCopy } from "./providers.types";

export default function CategoryGrid({ copy }: { copy: ProvidersCopy }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-3xl font-medium text-ink md:text-4xl">{copy.categoriesTitle}</h2>
      <p className="mt-3 text-brand-mid">{copy.categoriesSubtitle}</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {copy.categories.map((category) => (
          <li
            key={category}
            className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm text-ink"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/providers/CategoryGrid.tsx
git commit -m "feat(providers): add in-page CategoryGrid for job-category quick access"
```

---

### Task 5: `ProvidersShowcase` composer + rewritten top-level pages

**Files:**
- Create: `src/app/components/providers/ProvidersShowcase.tsx`
- Modify: `src/app/[locale]/providers/page.tsx`
- Modify: `src/app/[locale]/prestataires/page.tsx`
- Modify: `tests/segmented-vision-pages.spec.ts` (only if a run reveals a genuine markup-dependent assertion break — do not edit speculatively, mirror the Venues plan's Task 5 process)

**Interfaces:**
- Consumes: `Section`, `FloatingCard`, `SectionDivider` from `@/app/components/ui/premium/`, `providersContent`/types from Task 1, `ProviderPortfolioCard` from Task 2, `ProvidersHero` from Task 4, `CategoryGrid` from Task 4, existing `EmailForm` from `@/app/components/ui/EmailForm`.
- Produces: `ProvidersShowcase({ locale }: { locale: "fr" | "en" })` default export.

- [ ] **Step 1: Implement `ProvidersShowcase`**

```typescript
// src/app/components/providers/ProvidersShowcase.tsx
import EmailForm from "@/app/components/ui/EmailForm";
import Section from "@/app/components/ui/premium/Section";
import SectionDivider from "@/app/components/ui/premium/SectionDivider";
import CategoryGrid from "./CategoryGrid";
import ProviderPortfolioCard from "./ProviderPortfolioCard";
import ProvidersHero from "./ProvidersHero";
import { providersContent } from "./providers.content";

export default function ProvidersShowcase({ locale }: { locale: "fr" | "en" }) {
  const { copy, providers, incomingRequests } = providersContent[locale];
  const mosaicImages = providers.map((provider) => ({
    src: provider.imageSrc,
    alt: provider.imageAlt,
  }));

  return (
    <>
      <ProvidersHero
        copy={copy}
        mosaicImages={mosaicImages}
        primaryCtaHref="#provider-waitlist"
        secondaryCtaHref="#provider-directory"
      />

      <Section background="white">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {providers.map((provider) => (
            <ProviderPortfolioCard key={provider.id} provider={provider} />
          ))}
        </div>
      </Section>

      <Section background="tinted">
        <CategoryGrid copy={copy} />
      </Section>

      <Section background="white" id="provider-directory">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-medium text-ink md:text-4xl">
            {locale === "fr" ? "Demandes reçues récemment" : "Recently received requests"}
          </h2>
          <p className="mt-3 text-brand-mid">
            {locale === "fr"
              ? "Un aperçu illustratif du type de demandes que les prestataires reçoivent une fois leur profil en ligne."
              : "An illustrative preview of the kind of requests providers receive once their profile is live."}
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {incomingRequests.map((request) => (
              <li key={request.organizerName} className="rounded-2xl border border-brand-border bg-white p-5">
                <p className="text-sm font-medium text-ink">{request.organizerName}</p>
                <p className="text-xs uppercase tracking-wide text-brand-mid">{request.eventType}</p>
                <p className="mt-3 text-sm text-brand-mid">{request.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section background="tinted">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-medium text-ink md:text-4xl">{copy.benefitsTitle}</h2>
          <div className="mt-8 grid gap-6 text-left md:grid-cols-2">
            {copy.benefits.map((benefit) => (
              <FloatingCard key={benefit.title}>
                <h3 className="text-lg font-medium text-ink">{benefit.title}</h3>
                <p className="mt-2 text-sm text-brand-mid">{benefit.description}</p>
              </FloatingCard>
            ))}
          </div>
          <p className="mt-10 text-lg font-medium text-ink">{copy.earlyAccessTitle}</p>
          <p className="mt-2 text-brand-mid">{copy.earlyAccessDescription}</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {copy.earlyAccessItems.map((item) => (
              <li key={item} className="rounded-full border border-brand-border px-3 py-1 text-xs text-brand-mid">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <SectionDivider variant="gradient-fade" />

      <Section background="dark" id="provider-waitlist">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-medium text-white md:text-4xl">{copy.finalCtaTitle}</h2>
          <p className="mt-3 text-white/80">{copy.finalCtaDescription}</p>
          <EmailForm
            source="providers-page"
            defaultRole="prestataire"
            buttonLabel={copy.finalCtaButton}
            inputClassName="border-white/15 bg-white/[0.08] text-white placeholder:text-white/35 focus:border-teal"
            wrapperClassName="mt-8 [&_.text-brand-mid]:text-white/60 [&_select]:text-white"
          />
        </div>
      </Section>
    </>
  );
}
```

Note: the waitlist section's `id` is `provider-waitlist`, NOT `audience-waitlist` like the Venues plan used — the existing `tests/segmented-vision-pages.spec.ts` asserts `#audience-waitlist` specifically for the events/providers/venues combinations that were still on the shared template when that spec was written (`waitlist.locator("select")` checks around line 74 target the *current* `/fr/prestataires`, which after this task no longer exists on that route). Step 3 below handles reconciling this — read the current spec file first, don't guess.

- [ ] **Step 2: Rewrite the top-level pages**

```typescript
// src/app/[locale]/providers/page.tsx
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import ProvidersShowcase from "@/app/components/providers/ProvidersShowcase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "en") {
    return {};
  }

  return buildPageMetadata(
    locale,
    "Event service providers | Join Elintys",
    "Present your services and be discovered by organizers looking for event professionals.",
    "Present your services and be discovered by organizers looking for event professionals.",
    { canonicalPath: "/en/providers", languages: { fr: "/fr/prestataires", en: "/en/providers" } }
  );
}

export default async function ProvidersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "en") {
    notFound();
  }

  setRequestLocale(locale);

  return <ProvidersShowcase locale="en" />;
}
```

```typescript
// src/app/[locale]/prestataires/page.tsx
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import ProvidersShowcase from "@/app/components/providers/ProvidersShowcase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "fr") {
    return {};
  }

  return buildPageMetadata(
    locale,
    "Prestataires événementiels | Rejoindre Elintys",
    "Présentez vos services et soyez découvert par des organisateurs à la recherche de prestataires événementiels.",
    "Présentez vos services et soyez découvert par des organisateurs à la recherche de prestataires événementiels.",
    { canonicalPath: "/fr/prestataires", languages: { fr: "/fr/prestataires", en: "/en/providers" } }
  );
}

export default async function PrestatairesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "fr") {
    notFound();
  }

  setRequestLocale(locale);

  return <ProvidersShowcase locale="fr" />;
}
```

- [ ] **Step 3: Reconcile `tests/segmented-vision-pages.spec.ts` with the new providers markup**

Run: `npx playwright test tests/segmented-vision-pages.spec.ts`

Read the current file's providers-route assertions before touching anything (the `h1`/`alternateHref` table test should still pass unmodified since copy is unchanged; the "provider waitlist submits the expected source, role and consent state" test around line 62 goes through `#audience-waitlist` and will fail now that this task's `ProvidersShowcase` uses `#provider-waitlist`). For any assertion that fails specifically because of the `audience-waitlist` → `provider-waitlist` id change, update only that locator to `#provider-waitlist`, and re-run to confirm. Do not touch assertions that pass without modification.

- [ ] **Step 4: Run the full relevant test suite**

Run: `npx vitest run`
Expected: all pass, including Task 1's `providers.content.test.ts`.

Run: `npx playwright test tests/provider-portfolio-card.spec.ts tests/segmented-vision-pages.spec.ts`
Expected: all pass.

Run: `npm run build`
Expected: succeeds with no type errors; `/fr/prestataires` and `/en/providers` still listed in the route output.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/providers/ProvidersShowcase.tsx "src/app/[locale]/providers/page.tsx" "src/app/[locale]/prestataires/page.tsx" tests/segmented-vision-pages.spec.ts
git commit -m "feat(providers): rewrite providers/prestataires as an independent portfolio page"
```

---

## Self-Review

**Spec coverage (section 9, plus cross-cutting sections it depends on):**
- Editorial gallery/mosaic hero, not a product mockup, not a generic marketplace grid → Task 3 (`ProvidersHero`).
- Full-frame portfolios per provider → Task 2 (`ProviderPortfolioCard`).
- Job-category grid → Task 4 (`CategoryGrid`), reusing all 16 categories verbatim.
- Before/after or case-study content → Task 1 (one provider's `beforeAfter` fixture) + Task 2 (rendering).
- Reviews embedded directly on each project, never a separate section → Task 2.
- "Demandes reçues" section illustrating the collaboration flow → Task 5 (`incomingRequests` section).
- Verified-profile benefits → Task 5 (reuses `benefits`/`earlyAccess` copy verbatim).
- Complementary organizer-facing "explore providers" intent lower on the page → Task 3's secondary CTA anchors to `#provider-directory` (the incoming-requests/discovery section further down).
- Two visually distinct CTAs (primary filled / secondary outline) → Task 3, reusing existing verbatim `hero.primaryCta`/`hero.secondaryCta`, no invented copy.
- Navbar unchanged, category access is in-page → Task 4, Global Constraints.

**Out of this plan's scope, tracked for the roadmap:** Organizers page + route (spec section 8, still on the shared template), Home Hero R3F (section 7), removal of `AudiencePage.tsx`/`audience-page.config.ts`/`audience-page.server.tsx`/`audience-page.types.ts` (section 12 — blocked until Organizers is also migrated).

**Placeholder scan:** none — all 5 image URLs were resolved and verified before this plan was written (lesson carried over from the Venues plan's Task 5/6 ordering defect), so no task defers asset resolution.

**Type consistency:** `Review`, `ProviderProfile`, `IncomingRequest`, `ProvidersCopy`, `ProvidersLocaleContent` (Task 1) are used with identical field names across Tasks 2, 3, 4, and 5. `WaitlistSource`/`WaitlistRole` literals (`"providers-page"`, `"prestataire"`) match `src/lib/waitlist.types.ts` exactly.
