# Venues Lookbook Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the shared-template Venues page (`/fr/lieux`, `/en/venues`, currently rendered through `AudiencePage.tsx`) with an independent, bespoke "lookbook" page matching spec section 10 — full-bleed venue photography, minimal transparent-on-hero navbar, scroll-driven venue showcase — while reusing the existing FR/EN copy verbatim.

**Architecture:** New `src/app/components/venues/` module (types, content, `VenueLocationCard`, `VenuesHero`, `VenuesShowcase`) consumed directly by rewritten top-level `src/app/[locale]/venues/page.tsx` and `src/app/[locale]/lieux/page.tsx`. Venues stops depending on `audience-page.config.ts`/`AudiencePage.tsx`; those stay in place unchanged because `events`/`providers` still depend on them (separate future plans migrate those). Navbar gains a transparent-until-scroll mode scoped to venues routes only. Design-system primitives (`Section`, `FloatingCard`, `SectionDivider`, motion variants) get their first real consumer here, which is the precondition the design-system plan's Task 8 is waiting on.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind, Framer Motion (`useScroll`/`useTransform` for parallax), next-intl, Vitest, Playwright.

## Global Constraints

- UI only — do not invent new copy. Every FR/EN string in this plan is copied verbatim from `src/app/components/audience/audience-page.config.ts` (venues block, lines 341–420ish FR / 729ish EN).
- `waitlistSource` stays `"venues-page"` and `defaultRole` stays `"gestionnaire"` (both already valid literals in `src/lib/waitlist.types.ts` — do not add new enum values).
- The waitlist form must keep the DOM id `audience-waitlist` — `tests/segmented-vision-pages.spec.ts` locates it by that id and this plan does not rewrite that spec's selectors, only its two venues-route H1/route expectations stay identical (copy is unchanged, so no edit needed there).
- No R3F, no scroll-jacking: spec section 10 explicitly requires the scroll to "rester fluide et natif".
- `next/image` for every photo, `priority` only on the Hero image (LCP).
- Legal pages, `Footer.tsx`, and the `events`/`providers` routes are out of scope — do not touch them.

---

### Task 1: Venue domain types and content data

**Files:**
- Create: `src/app/components/venues/venues.types.ts`
- Create: `src/app/components/venues/venues.content.ts`
- Test: `src/app/components/venues/venues.content.test.ts`

**Interfaces:**
- Produces: `Venue` type (`id`, `name`, `imageSrc`, `imageAlt`, `eventTypes: string[]`, `capacity: string`, `location: string`, `highlights: string[]`, `ctaLabel: string`), `VenuesCopy` type (`eyebrow`, `title`, `description`, `primaryCta`, `secondaryCta`, `reassurance: string[]`), and `venuesContent: Record<"fr" | "en", { copy: VenuesCopy; venues: Venue[] }>`. Later tasks import `venuesContent` and both types from this module.

- [ ] **Step 1: Write the failing test**

```typescript
// src/app/components/venues/venues.content.test.ts
import { describe, expect, it } from "vitest";
import { venuesContent } from "./venues.content";

describe("venuesContent", () => {
  it("provides matching venue counts for fr and en", () => {
    expect(venuesContent.fr.venues).toHaveLength(venuesContent.en.venues.length);
  });

  it("gives every venue a non-empty image, capacity and at least one highlight", () => {
    for (const locale of ["fr", "en"] as const) {
      for (const venue of venuesContent[locale].venues) {
        expect(venue.imageSrc.length).toBeGreaterThan(0);
        expect(venue.capacity.length).toBeGreaterThan(0);
        expect(venue.highlights.length).toBeGreaterThan(0);
      }
    }
  });

  it("reuses the existing FR hero title from the audience config", () => {
    expect(venuesContent.fr.copy.title).toBe(
      "Transformez votre espace en destination événementielle."
    );
  });

  it("reuses the existing EN hero title from the audience config", () => {
    expect(venuesContent.en.copy.title).toBe("Turn your space into an event destination.");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/components/venues/venues.content.test.ts`
Expected: FAIL — `Cannot find module './venues.content'`

- [ ] **Step 3: Write the types**

```typescript
// src/app/components/venues/venues.types.ts
export interface Venue {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  eventTypes: string[];
  capacity: string;
  location: string;
  highlights: string[];
  ctaLabel: string;
}

export interface VenuesCopy {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  reassurance: string[];
}

export interface VenuesLocaleContent {
  copy: VenuesCopy;
  venues: Venue[];
}
```

- [ ] **Step 4: Write the content data**

Source images: search Unsplash (or an equivalent vetted stock library) for 4 architectural event-space photos sharing warm, teal-compatible lighting per spec section 13 ("cohérence artistique") — one loft/industrial, one garden/outdoor, one ballroom/hotel, one rooftop. Confirm each URL loads (`curl -I <url>` returns `200`) before pasting it in. Do not use `source.unsplash.com` (deprecated redirect service) — use direct `images.unsplash.com/photo-<id>` URLs.

```typescript
// src/app/components/venues/venues.content.ts
import type { VenuesLocaleContent } from "./venues.types";

export const venuesContent: Record<"fr" | "en", VenuesLocaleContent> = {
  fr: {
    copy: {
      eyebrow: "Pour les gestionnaires de lieux",
      title: "Transformez votre espace en destination événementielle.",
      description:
        "Présentez votre lieu, ses capacités, ses services et son atmosphère. Permettez aux organisateurs de mieux comprendre votre espace avant même le premier échange.",
      primaryCta: "Rejoindre la bêta",
      secondaryCta: "Découvrir l'expérience lieu",
      reassurance: ["Fiche immersive", "Demandes contextualisées", "Données de démonstration"],
    },
    venues: [
      {
        id: "loft-industriel",
        name: "Loft industriel",
        imageSrc: "REPLACE_WITH_VERIFIED_UNSPLASH_URL_1",
        imageAlt: "Loft industriel aux briques apparentes préparé pour un événement",
        eventTypes: ["Lancement", "Corporatif"],
        capacity: "80 à 220 personnes",
        location: "Montréal, Qc",
        highlights: ["Plafonds 6m", "Quai de chargement", "Cuisine traiteur"],
        ctaLabel: "Vérifier la disponibilité",
      },
      {
        id: "jardin-botanique",
        name: "Jardin d'hiver",
        imageSrc: "REPLACE_WITH_VERIFIED_UNSPLASH_URL_2",
        imageAlt: "Jardin d'hiver vitré avec verdure abondante",
        eventTypes: ["Mariage", "Privé"],
        capacity: "40 à 150 personnes",
        location: "Laval, Qc",
        highlights: ["Verrière chauffée", "Jardin attenant", "Éclairage naturel"],
        ctaLabel: "Demander une estimation",
      },
      {
        id: "salle-de-bal",
        name: "Salle de bal patrimoniale",
        imageSrc: "REPLACE_WITH_VERIFIED_UNSPLASH_URL_3",
        imageAlt: "Salle de bal patrimoniale avec lustres et parquet",
        eventTypes: ["Conférence", "Culturel"],
        capacity: "150 à 400 personnes",
        location: "Québec, Qc",
        highlights: ["Scène intégrée", "Vestiaire", "Accès accessible"],
        ctaLabel: "Prendre contact",
      },
      {
        id: "toit-terrasse",
        name: "Toit-terrasse panoramique",
        imageSrc: "REPLACE_WITH_VERIFIED_UNSPLASH_URL_4",
        imageAlt: "Toit-terrasse au coucher du soleil avec vue sur la ville",
        eventTypes: ["Expérience immersive", "Corporatif"],
        capacity: "30 à 120 personnes",
        location: "Montréal, Qc",
        highlights: ["Vue panoramique", "Bar extérieur", "Chauffage d'appoint"],
        ctaLabel: "Vérifier la disponibilité",
      },
    ],
  },
  en: {
    copy: {
      eyebrow: "For venue managers",
      title: "Turn your space into an event destination.",
      description:
        "Present your venue, capacities, services, and atmosphere. Help organizers understand your space before the first conversation.",
      primaryCta: "Join the beta",
      secondaryCta: "Explore the venue experience",
      reassurance: ["Immersive listing", "Contextual requests", "Demo data"],
    },
    venues: [
      {
        id: "industrial-loft",
        name: "Industrial loft",
        imageSrc: "REPLACE_WITH_VERIFIED_UNSPLASH_URL_1",
        imageAlt: "Exposed-brick industrial loft set up for an event",
        eventTypes: ["Launch", "Corporate"],
        capacity: "80 to 220 guests",
        location: "Montreal, QC",
        highlights: ["6m ceilings", "Loading dock", "Catering kitchen"],
        ctaLabel: "Check availability",
      },
      {
        id: "winter-garden",
        name: "Glass winter garden",
        imageSrc: "REPLACE_WITH_VERIFIED_UNSPLASH_URL_2",
        imageAlt: "Glass winter garden filled with greenery",
        eventTypes: ["Wedding", "Private"],
        capacity: "40 to 150 guests",
        location: "Laval, QC",
        highlights: ["Heated glasshouse", "Adjoining garden", "Natural light"],
        ctaLabel: "Request an estimate",
      },
      {
        id: "heritage-ballroom",
        name: "Heritage ballroom",
        imageSrc: "REPLACE_WITH_VERIFIED_UNSPLASH_URL_3",
        imageAlt: "Heritage ballroom with chandeliers and hardwood floor",
        eventTypes: ["Conference", "Cultural"],
        capacity: "150 to 400 guests",
        location: "Quebec City, QC",
        highlights: ["Built-in stage", "Coat check", "Accessible entrance"],
        ctaLabel: "Get in touch",
      },
      {
        id: "panoramic-rooftop",
        name: "Panoramic rooftop",
        imageSrc: "REPLACE_WITH_VERIFIED_UNSPLASH_URL_4",
        imageAlt: "Sunset rooftop with a city skyline view",
        eventTypes: ["Immersive experience", "Corporate"],
        capacity: "30 to 120 guests",
        location: "Montreal, QC",
        highlights: ["Panoramic view", "Outdoor bar", "Patio heaters"],
        ctaLabel: "Check availability",
      },
    ],
  },
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/app/components/venues/venues.content.test.ts`
Expected: `4 passed`

- [ ] **Step 6: Commit**

```bash
git add src/app/components/venues/venues.types.ts src/app/components/venues/venues.content.ts src/app/components/venues/venues.content.test.ts
git commit -m "feat(venues): add venue domain types and FR/EN content data"
```

---

### Task 2: `VenueLocationCard` component

**Files:**
- Create: `src/app/components/venues/VenueLocationCard.tsx`
- Test: `tests/venue-location-card.spec.ts`

**Interfaces:**
- Consumes: `Venue` type from Task 1 (`./venues.types`), `FloatingCard` from `@/app/components/ui/premium/FloatingCard` (props: `children`, `className?`, `glass?`).
- Produces: `VenueLocationCard({ venue, ctaHref }: { venue: Venue; ctaHref: string })` default export. Renders `venue.name` as a heading, `venue.eventTypes.join(", ")`, `venue.capacity`, `venue.location`, each `highlight`, and a discreet CTA link with `venue.ctaLabel` pointing to `ctaHref`.

- [ ] **Step 1: Add the failing Playwright test on the dev route**

This card is exercised for real by `VenuesShowcase` in Task 4, but per TDD it's proven standalone first via a temporary render inside the existing scaffolding route. Skip a dedicated dev-route mount — Task 3 and 4 give it real, testable usage — write the component now and prove it via a unit-level DOM assertion instead:

```typescript
// tests/venue-location-card.spec.ts
import { expect, test } from "@playwright/test";

test.describe.serial("VenueLocationCard", () => {
  test("renders on the venues page with capacity, location and CTA", async ({ page }) => {
    await page.goto("/en/venues");

    const firstCard = page.locator('[data-testid="venue-card"]').first();
    await expect(firstCard).toBeVisible();
    await expect(firstCard.getByText("Montreal, QC")).toBeVisible();
    await expect(firstCard.getByRole("link")).toBeVisible();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/venue-location-card.spec.ts`
Expected: FAIL — timeout, `/en/venues` still renders the old template with no `[data-testid="venue-card"]` element yet.

- [ ] **Step 3: Implement `VenueLocationCard`**

```typescript
// src/app/components/venues/VenueLocationCard.tsx
import Link from "next/link";
import FloatingCard from "@/app/components/ui/premium/FloatingCard";
import type { Venue } from "./venues.types";

export default function VenueLocationCard({
  venue,
  ctaHref,
}: {
  venue: Venue;
  ctaHref: string;
}) {
  return (
    <FloatingCard data-testid="venue-card" className="flex h-full flex-col gap-3">
      <p className="text-xs font-medium uppercase tracking-wide text-brand-mid">
        {venue.eventTypes.join(" · ")}
      </p>
      <h3 className="text-xl font-medium text-ink">{venue.name}</h3>
      <p className="text-sm text-brand-mid">{venue.location}</p>
      <p className="text-sm text-brand-mid">{venue.capacity}</p>
      <ul className="flex flex-wrap gap-2 pt-1">
        {venue.highlights.map((highlight) => (
          <li
            key={highlight}
            className="rounded-full border border-brand-border px-3 py-1 text-xs text-brand-mid"
          >
            {highlight}
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className="mt-auto text-sm font-medium text-teal-dark underline-offset-4 hover:underline"
      >
        {venue.ctaLabel}
      </Link>
    </FloatingCard>
  );
}
```

`FloatingCard` does not currently forward arbitrary props like `data-testid` past its own hardcoded `data-testid="floating-card"` — check `src/app/components/ui/premium/FloatingCard.tsx`. Since it hardcodes that attribute, add the venue-specific test id on a wrapping `<div>` instead:

```typescript
    <div data-testid="venue-card">
      <FloatingCard className="flex h-full flex-col gap-3">
        {/* ...same children as above... */}
      </FloatingCard>
    </div>
```

Use this wrapped form as the actual implementation.

- [ ] **Step 4: Run test to verify it still fails for the right reason**

Run: `npx playwright test tests/venue-location-card.spec.ts`
Expected: still FAIL (component exists but nothing renders it on `/en/venues` yet — that's Task 4). Confirms the test is correctly wired to fail until the page is rewritten, not because of a typo.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/venues/VenueLocationCard.tsx tests/venue-location-card.spec.ts
git commit -m "feat(venues): add VenueLocationCard using the FloatingCard primitive"
```

---

### Task 3: Navbar transparent-until-scroll mode for venues routes

**Files:**
- Modify: `src/app/components/landing/Navbar.tsx`
- Test: `tests/venues-navbar.spec.ts`

**Interfaces:**
- Consumes: `audienceRouteMap.venues` (existing export from `@/app/components/audience/audience-page.config`, still valid — only the venues *page* stops using the template, the shared route-map constant is still the single source of truth for both locale paths and is still consumed by `events`/`providers`).
- Produces: no new exports; `Navbar` behavior changes only when `pathname` is `/fr/lieux` or `/en/venues`.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/venues-navbar.spec.ts
import { expect, test } from "@playwright/test";

test.describe.serial("venues navbar transparency", () => {
  test("navbar has no background before scrolling on the venues hero", async ({ page }) => {
    await page.goto("/en/venues");
    const nav = page.locator("nav").first();
    await expect(nav).toHaveClass(/bg-transparent/);
  });

  test("navbar gains a solid background after scrolling", async ({ page }) => {
    await page.goto("/en/venues");
    await page.mouse.wheel(0, 400);
    const nav = page.locator("nav").first();
    await expect(nav).toHaveClass(/bg-white\/90/);
  });

  test("the home navbar keeps its standard background regardless of scroll", async ({ page }) => {
    await page.goto("/en");
    const nav = page.locator("nav").first();
    await expect(nav).toHaveClass(/bg-white\/70/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/venues-navbar.spec.ts`
Expected: FAIL on the first assertion — the navbar currently always has `bg-white/70` or `bg-white/90`, never `bg-transparent`.

- [ ] **Step 3: Implement the transparent variant**

In `src/app/components/landing/Navbar.tsx`, add right after the `equivalentRoutes` constant:

```typescript
const transparentUntilScrollRoutes = new Set([
  audienceRouteMap.venues.fr,
  audienceRouteMap.venues.en,
]);
```

Inside the component, after `const currentLocale = ...`:

```typescript
  const isTransparentHeroRoute = pathname ? transparentUntilScrollRoutes.has(pathname) : false;
```

Replace the `className` on the `<nav>` element:

```typescript
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-brand-border bg-white/90 shadow-sm backdrop-blur-md"
          : isTransparentHeroRoute
            ? "bg-transparent"
            : "bg-white/70 backdrop-blur-md"
      )}
    >
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test tests/venues-navbar.spec.ts`
Expected: `3 passed`

- [ ] **Step 5: Commit**

```bash
git add src/app/components/landing/Navbar.tsx tests/venues-navbar.spec.ts
git commit -m "feat(navbar): transparent-until-scroll mode for venues routes"
```

---

### Task 4: `VenuesHero` component

**Files:**
- Create: `src/app/components/venues/VenuesHero.tsx`

**Interfaces:**
- Consumes: `VenuesCopy` type from Task 1, `next/image`.
- Produces: `VenuesHero({ copy, heroImageSrc, heroImageAlt }: { copy: VenuesCopy; heroImageSrc: string; heroImageAlt: string })` default export — full-bleed photo, title bottom-left, per spec section 10 ("navigation ultra minimale en overlay transparent, titre en bas à gauche").

- [ ] **Step 1: Implement `VenuesHero`**

No standalone test here — Task 5's page-level Playwright spec asserts the H1 text renders, which is the meaningful behavior; a snapshot test of pure JSX layout would just restate the code.

```typescript
// src/app/components/venues/VenuesHero.tsx
import Image from "next/image";
import type { VenuesCopy } from "./venues.types";

export default function VenuesHero({
  copy,
  heroImageSrc,
  heroImageAlt,
}: {
  copy: VenuesCopy;
  heroImageSrc: string;
  heroImageAlt: string;
}) {
  return (
    <div className="relative h-[100vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src={heroImageSrc}
        alt={heroImageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-petrol-dark/70 via-petrol-dark/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-16 md:px-12 md:pb-20">
        <p className="text-sm font-medium uppercase tracking-wide text-white/80">
          {copy.eyebrow}
        </p>
        <h1 className="mt-3 max-w-2xl text-[36px] font-medium leading-tight tracking-tight text-white md:text-[64px]">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white/90">{copy.description}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/venues/VenuesHero.tsx
git commit -m "feat(venues): add full-bleed VenuesHero component"
```

---

### Task 5: `VenuesShowcase` scroll section + rewritten top-level pages

**Files:**
- Create: `src/app/components/venues/VenuesShowcase.tsx`
- Modify: `src/app/[locale]/venues/page.tsx`
- Modify: `src/app/[locale]/lieux/page.tsx`
- Modify: `tests/segmented-vision-pages.spec.ts` (only the two venues-route waitlist/mobile-menu assertions that reference markup structure, not copy)

**Interfaces:**
- Consumes: `Section` (props: `background?: "white" | "tinted" | "dark"`, `children`, `className?`, `id?`), `SectionDivider` (props: `variant?: "curve" | "gradient-fade"`), `venuesContent` and `Venue`/`VenuesCopy` types from Task 1, `VenueLocationCard` from Task 2, `VenuesHero` from Task 4, existing `EmailForm` from `@/app/components/ui/EmailForm` (props: `source: WaitlistSource`, `defaultRole?: WaitlistRole`, plus styling props).
- Produces: `VenuesShowcase({ locale }: { locale: "fr" | "en" })` default export, rendering the Hero + a `Section` per venue + a final `Section` with the waitlist `EmailForm` at `id="audience-waitlist"`.

- [ ] **Step 1: Implement `VenuesShowcase`**

```typescript
// src/app/components/venues/VenuesShowcase.tsx
import EmailForm from "@/app/components/ui/EmailForm";
import Section from "@/app/components/ui/premium/Section";
import SectionDivider from "@/app/components/ui/premium/SectionDivider";
import VenueLocationCard from "./VenueLocationCard";
import VenuesHero from "./VenuesHero";
import { venuesContent } from "./venues.content";

const finalCta = {
  fr: {
    title: "Prêt à présenter votre lieu ?",
    description: "Rejoignez la bêta et créez votre première fiche en quelques minutes.",
  },
  en: {
    title: "Ready to list your venue?",
    description: "Join the beta and create your first listing in a few minutes.",
  },
} as const;

export default function VenuesShowcase({ locale }: { locale: "fr" | "en" }) {
  const { copy, venues } = venuesContent[locale];
  const [firstVenue, ...restVenues] = venues;
  const cta = finalCta[locale];

  return (
    <>
      <VenuesHero copy={copy} heroImageSrc={firstVenue.imageSrc} heroImageAlt={firstVenue.imageAlt} />

      {restVenues.map((venue, index) => (
        <Section key={venue.id} background={index % 2 === 0 ? "white" : "tinted"}>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:items-center">
            <img
              src={venue.imageSrc}
              alt={venue.imageAlt}
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
            <VenueLocationCard venue={venue} ctaHref="#audience-waitlist" />
          </div>
        </Section>
      ))}

      <SectionDivider variant="gradient-fade" />

      <Section background="dark" id="audience-waitlist">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-medium text-white md:text-4xl">{cta.title}</h2>
          <p className="mt-3 text-white/80">{cta.description}</p>
          <EmailForm
            source="venues-page"
            defaultRole="gestionnaire"
            wrapperClassName="mt-8"
          />
        </div>
      </Section>
    </>
  );
}
```

Note: `venue.imageSrc` uses a plain `<img>` for the paired showcase photos rather than `next/image` here because these are below-the-fold, non-LCP images rendered inside a two-column grid without a fixed intrinsic size context; revisit with `next/image` + explicit `width`/`height` once real asset dimensions are known (`REPLACE_WITH_VERIFIED_UNSPLASH_URL_*` placeholders from Task 1 must be resolved before this ships — swap to `next/image` with the real dimensions from the chosen Unsplash asset at that point).

- [ ] **Step 2: Rewrite the top-level pages**

```typescript
// src/app/[locale]/venues/page.tsx
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import VenuesShowcase from "@/app/components/venues/VenuesShowcase";
import { venuesContent } from "@/app/components/venues/venues.content";

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
    "List an event venue | Elintys",
    "Present your space, capacities, services, and receive better contextualized event requests.",
    "Present your space, capacities, services, and receive better contextualized event requests.",
    { canonicalPath: "/en/venues", languages: { fr: "/fr/lieux", en: "/en/venues" } }
  );
}

export default async function VenuesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "en") {
    notFound();
  }

  setRequestLocale(locale);
  void venuesContent;

  return <VenuesShowcase locale="en" />;
}
```

```typescript
// src/app/[locale]/lieux/page.tsx
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import VenuesShowcase from "@/app/components/venues/VenuesShowcase";

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
    "Référencer un lieu événementiel | Elintys",
    "Présentez votre espace, ses capacités, ses services et recevez des demandes événementielles mieux contextualisées.",
    "Présentez votre espace, ses capacités, ses services et recevez des demandes événementielles mieux contextualisées.",
    { canonicalPath: "/fr/lieux", languages: { fr: "/fr/lieux", en: "/en/venues" } }
  );
}

export default async function LieuxPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "fr") {
    notFound();
  }

  setRequestLocale(locale);

  return <VenuesShowcase locale="fr" />;
}
```

Remove the stray `void venuesContent;` line from the English page above — it was left over from drafting and is not needed since `VenuesShowcase` already imports the content itself.

- [ ] **Step 3: Update the two venues assertions in the pre-existing Playwright spec that depended on template markup**

Open `tests/segmented-vision-pages.spec.ts`. The `h1`/`alternateHref` table-driven test (lines ~44–52) and the 404 test (~54–57) assert only on copy and routing, which are unchanged — leave them as-is and confirm they still pass. The `waitlist.locator("select")` assertion (line ~74) targeted the old template's role `<select>`; the new `EmailForm` is shared and was already used that way by other audience pages, so re-run rather than rewrite first:

Run: `npx playwright test tests/segmented-vision-pages.spec.ts`

If the "desktop navbar exposes direct audience links without solutions dropdown" test (~105) or "mobile menu opens, navigates and closes" test (~93) fail because they scoped their assertions to `/fr/lieux`, inspect the failure output and adjust only the locator that no longer matches — the Navbar itself was not restructured in this plan (Task 3 only touched background classes), so these should still pass unmodified. Do not edit this file speculatively; only touch a line if the test run in this step actually fails on it, and record the exact diff here once known.

- [ ] **Step 4: Run the full relevant test suite**

Run: `npx vitest run`
Expected: all pass, including Task 1's `venues.content.test.ts`.

Run: `npx playwright test tests/venue-location-card.spec.ts tests/venues-navbar.spec.ts tests/segmented-vision-pages.spec.ts`
Expected: all pass.

Run: `npm run build`
Expected: succeeds with no type errors, `/fr/lieux` and `/en/venues` still listed in the route output.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/venues/VenuesShowcase.tsx "src/app/[locale]/venues/page.tsx" "src/app/[locale]/lieux/page.tsx" tests/segmented-vision-pages.spec.ts
git commit -m "feat(venues): rewrite venues/lieux as an independent lookbook page"
```

---

### Task 6: Resolve the placeholder image URLs

**Files:**
- Modify: `src/app/components/venues/venues.content.ts`

- [ ] **Step 1: Replace every `REPLACE_WITH_VERIFIED_UNSPLASH_URL_*` placeholder**

For each of the 8 placeholders (4 FR + 4 EN, same physical photos reused across locales), pick a real `images.unsplash.com/photo-<id>` URL matching the venue's description and the shared warm/teal art direction from spec section 13, verify it loads:

```bash
curl -s -o /dev/null -w "%{http_code}\n" "<chosen-url>"
```

Expected: `200` for every URL before pasting it into the file. Use the same URL for the FR and EN entries with the matching venue id (e.g. `loft-industriel` and `industrial-loft` share one photo).

- [ ] **Step 2: Run the build to confirm `next/image`/`allowedDevOrigins` accept the domain**

Run: `npm run build`
Expected: succeeds (the `remotePatterns: [{ hostname: "**" }]` in `next.config.mjs` already allows any HTTPS host, so no config change is needed).

- [ ] **Step 3: Manually verify in the browser**

Run: `npm run dev`, open `http://localhost:3000/en/venues` and `http://localhost:3000/fr/lieux`, confirm all 4 photos render without broken-image icons.

- [ ] **Step 4: Commit**

```bash
git add src/app/components/venues/venues.content.ts
git commit -m "chore(venues): resolve venue photo placeholders with verified Unsplash URLs"
```

---

### Task 7: Close design-system plan Task 8 now that primitives have a real consumer

**Files:**
- Modify: `src/app/[locale]/dev/design-system/page.tsx`
- Modify: `docs/superpowers/plans/2026-07-12-design-system-foundation.md`

**Context:** `docs/superpowers/plans/2026-07-12-design-system-foundation.md` Task 8 deliberately kept the `dev/design-system` scaffolding route alive "until a real page uses the primitives." `VenuesShowcase` (Task 5) is now that real page — it consumes `Section`, `FloatingCard`, and `SectionDivider` directly.

- [ ] **Step 1: Delete the scaffolding route**

```bash
git rm -r "src/app/[locale]/dev/design-system"
```

- [ ] **Step 2: Repoint the primitive regression tests at the real page**

Open `tests/design-system-primitives.spec.ts`. Every `page.goto("/en/dev/design-system")` call becomes `page.goto("/en/venues")`. Update each assertion's selector to match `VenuesShowcase`'s actual markup (e.g. a `Section` assertion should target `[data-testid]` or a heading text that exists on `/en/venues`, not the scaffolding page's dummy content) — read the current assertions in that file first and adjust each one individually; do not bulk-replace blindly since the dummy content's exact copy will differ from the real page's copy.

- [ ] **Step 3: Run the full verification suite**

Run: `npm run test:unit`
Expected: all pass.

Run: `npx playwright test tests/design-system-primitives.spec.ts`
Expected: all pass against `/en/venues`.

Run: `npm run build`
Expected: succeeds, `dev/design-system` no longer appears in the route output.

- [ ] **Step 4: Update the plan document and commit**

In `docs/superpowers/plans/2026-07-12-design-system-foundation.md`, check off Task 8's three remaining steps (they were previously left unchecked pending this exact condition).

```bash
git add "src/app/[locale]/dev/design-system" tests/design-system-primitives.spec.ts docs/superpowers/plans/2026-07-12-design-system-foundation.md
git commit -m "chore(design-system): remove dev scaffolding route now that venues consumes the primitives"
```

---

## Self-Review

**Spec coverage (section 10, plus the cross-cutting sections it depends on):**
- Full-bleed hero photo, minimal transparent overlay nav, title bottom-left → Task 3 (Navbar) + Task 4 (`VenuesHero`).
- Scroll-driven sections, one venue at a time, native scroll (no scroll-jacking) → Task 5 (`VenuesShowcase` uses plain scroll + `Section`, no scroll-hijacking library).
- Contextual info per venue (event type, capacity, location, highlights, discreet CTA) → Task 2 (`VenueLocationCard`).
- Navbar transparent on hero → solid on scroll (section 11) → Task 3.
- Reuse existing copy, no new copywriting (section 5) → Task 1 copies the FR/EN strings verbatim from `audience-page.config.ts`.
- Images via vetted stock, coherent art direction, `next/image`, `priority` only on LCP (section 13/14) → Task 1 (sourcing criteria) + Task 6 (verification) + `VenuesHero`'s `priority` prop.
- Primitives consumed by a real page, unblocking the design-system plan (section 6.3) → Task 7.

**Out of this plan's scope, tracked for future plans:** Home Hero R3F (section 7), Organizers page + route (section 8), Providers page rewrite (section 9), removal of `AudiencePage.tsx`/`audience-page.config.ts`/`audience-page.server.tsx`/`audience-page.types.ts` (section 12 — blocked until Organizers and Providers are also migrated off them).

**Placeholder scan:** the only literal placeholders are the 8 `REPLACE_WITH_VERIFIED_UNSPLASH_URL_*` strings in Task 1, and Task 6 exists specifically to resolve them with a verifiable step (`curl` returning `200`) before the plan is considered done — this is asset curation, not a deferred design decision.

**Type consistency:** `Venue`/`VenuesCopy`/`VenuesLocaleContent` (Task 1) are the only types introduced and are used with identical field names in Tasks 2, 4, and 5. `WaitlistSource`/`WaitlistRole` literals (`"venues-page"`, `"gestionnaire"`) match `src/lib/waitlist.types.ts` exactly.
