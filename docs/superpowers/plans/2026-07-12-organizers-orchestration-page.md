# Organizers Orchestration Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the shared-template Events page (`/fr/evenements`, `/en/events`) with an independent, bespoke "orchestration tool" page at new routes `/fr/organisateurs` and `/en/organizers` (spec section 8), then — since this is the last of the three audience pages still on the shared template — cut `Navbar.tsx`/`sitemap.ts` off `audience-page.config.ts` and delete the entire shared-template system (spec section 12).

**Architecture:** New `src/app/components/organizers/` module (types, content, `OrganizersHero`, `WorkflowSection`/`StepCard`, `AnchorNav`, `ProofSection`, `OrganizersShowcase`) consumed by new top-level `src/app/[locale]/organizers/page.tsx` and `src/app/[locale]/organisateurs/page.tsx`. The old `src/app/[locale]/events/page.tsx` and `evenements/page.tsx` are deleted, along with the entire shared template (`AudiencePage.tsx`, `audience-page.config.ts`, `audience-page.server.tsx`, `audience-page.types.ts`) once nothing references them.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind, Framer Motion, next-intl, Vitest, Playwright.

## Global Constraints

- UI only — reuse `src/app/components/audience/audience-page.config.ts`'s `events` block (FR lines 56-209, EN lines 471-597) verbatim for every string that already exists there (hero, problem, workflow's 8 steps, categories, preview, benefits, earlyAccess, finalCta). No new marketing copy.
- `waitlistSource` stays `"events-page"`, `defaultRole` stays `"organisateur"`.
- Hero: a single floating product mockup framed as an orchestration tool, never framed as admin software. No KPI/stat grid in the first view (spec section 8). KPIs/numbers only appear in the proof section further down.
- Most-technical micro-interactions (the workflow step demos) live in the demo sections, not the Hero.
- Navigation: global `Navbar` unchanged in structure + a secondary in-page anchor nav specific to this page, linking to each workflow step's section id (spec section 8's "navigation d'ancrage secondaire").
- New routes are `/fr/organisateurs` and `/en/organizers` — this plan deletes `/fr/evenements` and `/en/events` in the same task that adds the replacements, so the site is never in a state with both old and new routes live simultaneously for longer than one task.
- `providers`/`prestataires` and `venues`/`lieux` pages, and their own component modules, are out of scope — do not touch them.
- Legal pages and `Footer.tsx` are out of scope.
- The shared-template deletion (Task 7) only happens after Task 6 confirms nothing outside the template still imports from it — do not delete speculatively.

---

### Task 1: Organizer domain types and content data

**Files:**
- Create: `src/app/components/organizers/organizers.types.ts`
- Create: `src/app/components/organizers/organizers.content.ts`
- Test: `src/app/components/organizers/organizers.content.test.ts`

**Interfaces:**
- Produces: `WorkflowStep` (`id`, `title`, `description`), `ProofBenefit` (`title`, `description`), `OrganizersCopy` (`eyebrow`, `title`, `description`, `primaryCta`, `secondaryCta`, `reassurance: string[]`, `mockupTitle`, `mockupLabel`, `mockupItems: Array<{ label; value }>`, `workflowTitle`, `workflowSubtitle`, `steps: WorkflowStep[]`, `benefitsTitle`, `benefits: ProofBenefit[]`, `earlyAccessTitle`, `earlyAccessDescription`, `earlyAccessItems: string[]`, `finalCtaTitle`, `finalCtaDescription`, `finalCtaButton`), `OrganizersLocaleContent` (`copy: OrganizersCopy`), and `organizersContent: Record<"fr" | "en", OrganizersLocaleContent>`.

- [ ] **Step 1: Write the failing test**

```typescript
// src/app/components/organizers/organizers.content.test.ts
import { describe, expect, it } from "vitest";
import { organizersContent } from "./organizers.content";

describe("organizersContent", () => {
  it("has exactly 8 workflow steps per locale, each with a unique id", () => {
    for (const locale of ["fr", "en"] as const) {
      const { steps } = organizersContent[locale].copy;
      expect(steps).toHaveLength(8);
      expect(new Set(steps.map((s) => s.id)).size).toBe(8);
    }
  });

  it("reuses the existing FR hero title from the audience config", () => {
    expect(organizersContent.fr.copy.title).toBe(
      "Créez votre événement. Elintys connecte tout le reste."
    );
  });

  it("reuses the existing EN hero title from the audience config", () => {
    expect(organizersContent.en.copy.title).toBe(
      "Create your event. Elintys connects everything else."
    );
  });

  it("gives every benefit a non-empty title and description in both locales", () => {
    for (const locale of ["fr", "en"] as const) {
      for (const benefit of organizersContent[locale].copy.benefits) {
        expect(benefit.title.length).toBeGreaterThan(0);
        expect(benefit.description.length).toBeGreaterThan(0);
      }
    }
  });

  it("has 6 benefits and 4 mockup items per locale, matching the source config counts", () => {
    for (const locale of ["fr", "en"] as const) {
      expect(organizersContent[locale].copy.benefits).toHaveLength(6);
      expect(organizersContent[locale].copy.mockupItems).toHaveLength(4);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/components/organizers/organizers.content.test.ts`
Expected: FAIL — `Cannot find module './organizers.content'`

- [ ] **Step 3: Write the types**

```typescript
// src/app/components/organizers/organizers.types.ts
export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
}

export interface ProofBenefit {
  title: string;
  description: string;
}

export interface OrganizersCopy {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  reassurance: string[];
  mockupTitle: string;
  mockupLabel: string;
  mockupItems: Array<{ label: string; value: string }>;
  workflowTitle: string;
  workflowSubtitle: string;
  steps: WorkflowStep[];
  benefitsTitle: string;
  benefits: ProofBenefit[];
  earlyAccessTitle: string;
  earlyAccessDescription: string;
  earlyAccessItems: string[];
  finalCtaTitle: string;
  finalCtaDescription: string;
  finalCtaButton: string;
}

export interface OrganizersLocaleContent {
  copy: OrganizersCopy;
}
```

- [ ] **Step 4: Write the content data**

Every string below is copied verbatim from `audience-page.config.ts`'s `events` block (FR lines 56-209, EN lines 471-597) — cross-check before committing. Each workflow step gets a new `id` slug (kebab-case of the English title) since the source config has no step ids; that's new scaffolding data, not new copy.

```typescript
// src/app/components/organizers/organizers.content.ts
import type { OrganizersLocaleContent } from "./organizers.types";

export const organizersContent: Record<"fr" | "en", OrganizersLocaleContent> = {
  fr: {
    copy: {
      eyebrow: "Pour les organisateurs",
      title: "Créez votre événement. Elintys connecte tout le reste.",
      description:
        "De la première idée à l'accueil des participants, Elintys réunit vos lieux, vos prestataires, votre billetterie, vos invités et vos outils de suivi dans un seul espace.",
      primaryCta: "Rejoindre la bêta",
      secondaryCta: "Découvrir le parcours organisateur",
      reassurance: ["Accès bêta gratuit", "Aucun engagement", "Votre feedback façonne le produit"],
      mockupTitle: "Tableau de bord organisateur",
      mockupLabel: "Aperçu du produit",
      mockupItems: [
        { label: "Invités", value: "Liste centralisée" },
        { label: "Billets", value: "Catégories prêtes" },
        { label: "Lieu", value: "Demande suivie" },
        { label: "Scan", value: "Préparation mobile" },
      ],
      workflowTitle: "Votre événement avance à votre rythme.",
      workflowSubtitle:
        "Chaque étape peut commencer simplement, puis s'enrichir au moment où votre projet devient plus concret.",
      steps: [
        { id: "create", title: "Créer", description: "Donnez vie à votre événement avec son titre, sa date, son visuel et ses informations essentielles." },
        { id: "define-needs", title: "Définir les besoins", description: "Clarifiez les services, capacités et contraintes nécessaires avant de chercher." },
        { id: "find-venue", title: "Trouver un lieu", description: "Comparez les espaces selon leur capacité, leur emplacement, leurs services et leur disponibilité." },
        { id: "find-providers", title: "Trouver des prestataires", description: "Identifiez les professionnels qui correspondent au format de votre événement." },
        { id: "publish", title: "Publier", description: "Préparez une page claire pour partager les informations utiles au bon moment." },
        { id: "sell-or-invite", title: "Vendre ou inviter", description: "Configurez vos billets, vos invitations et vos règles d'accès." },
        { id: "welcome", title: "Accueillir", description: "Préparez le scan et l'accueil depuis une interface mobile." },
        { id: "track", title: "Suivre", description: "Gardez l'avancement, les ventes et les confirmations dans un même espace." },
      ],
      benefitsTitle: "Plus de temps pour l'événement. Moins de temps à coordonner les outils.",
      benefits: [
        { title: "Tout centraliser", description: "Regrouper l'essentiel de votre événement dans un même fil de travail." },
        { title: "Réduire les erreurs", description: "Limiter les doubles saisies, oublis et versions contradictoires." },
        { title: "Mieux collaborer", description: "Connecter les partenaires autour d'informations plus claires." },
        { title: "Suivre l'avancement", description: "Comprendre rapidement ce qui est prêt et ce qui reste à faire." },
        { title: "Simplifier l'accueil", description: "Préparer les invités, billets et accès avant le jour J." },
        { title: "Améliorer l'expérience", description: "Donner aux participants un parcours plus fluide." },
      ],
      earlyAccessTitle: "Pourquoi rejoindre la bêta comme organisateur ?",
      earlyAccessDescription:
        "Les premiers organisateurs aideront à calibrer les workflows, les modules de billetterie, l'accueil et les priorités produit.",
      earlyAccessItems: ["Accès prioritaire", "Produit influencé par vos retours", "Échanges directs avec l'équipe"],
      finalCtaTitle: "Votre prochain événement mérite un meilleur point de départ.",
      finalCtaDescription:
        "Rejoignez les premiers organisateurs qui participeront à la bêta d'Elintys et contribueront à façonner la plateforme.",
      finalCtaButton: "Obtenir un accès prioritaire",
    },
  },
  en: {
    copy: {
      eyebrow: "For organizers",
      title: "Create your event. Elintys connects everything else.",
      description:
        "From the first idea to welcoming attendees, Elintys brings venues, providers, ticketing, guests, and tracking tools into one workspace.",
      primaryCta: "Join the beta",
      secondaryCta: "Explore the organizer journey",
      reassurance: ["Free beta access", "No commitment", "Your feedback shapes the product"],
      mockupTitle: "Organizer dashboard",
      mockupLabel: "Product preview",
      mockupItems: [
        { label: "Guests", value: "Centralized list" },
        { label: "Tickets", value: "Categories ready" },
        { label: "Venue", value: "Request tracked" },
        { label: "Check-in", value: "Mobile preparation" },
      ],
      workflowTitle: "Your event moves at your pace.",
      workflowSubtitle: "Each step can start simply, then grow as your event becomes more concrete.",
      steps: [
        { id: "create", title: "Create", description: "Add the title, date, visual, and essential event details." },
        { id: "define-needs", title: "Define needs", description: "Clarify services, capacity, and constraints before searching." },
        { id: "find-venue", title: "Find a venue", description: "Compare spaces by capacity, location, services, and availability." },
        { id: "find-providers", title: "Find providers", description: "Identify professionals that match your event format." },
        { id: "publish", title: "Publish", description: "Prepare a clear page to share useful information at the right time." },
        { id: "sell-or-invite", title: "Sell or invite", description: "Configure tickets, invitations, and access rules." },
        { id: "welcome", title: "Welcome", description: "Prepare scanning and guest check-in from a mobile interface." },
        { id: "track", title: "Track", description: "Keep progress, sales, and confirmations in the same workspace." },
      ],
      benefitsTitle: "More time for the event. Less time coordinating tools.",
      benefits: [
        { title: "Centralize everything", description: "Bring the essentials of your event into one workflow." },
        { title: "Reduce errors", description: "Limit duplicate entry, omissions, and conflicting versions." },
        { title: "Collaborate better", description: "Connect partners around clearer information." },
        { title: "Track progress", description: "See what is ready and what still needs attention." },
        { title: "Simplify check-in", description: "Prepare guests, tickets, and access before event day." },
        { title: "Improve the experience", description: "Give attendees a smoother journey." },
      ],
      earlyAccessTitle: "Why join the beta as an organizer?",
      earlyAccessDescription:
        "Early organizers will help shape workflows, ticketing modules, check-in, and product priorities.",
      earlyAccessItems: ["Priority access", "Product shaped by your feedback", "Direct conversations with the team"],
      finalCtaTitle: "Your next event deserves a better starting point.",
      finalCtaDescription:
        "Join the first organizers who will participate in the Elintys beta and help shape the platform.",
      finalCtaButton: "Get early access",
    },
  },
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/app/components/organizers/organizers.content.test.ts`
Expected: `5 passed`

- [ ] **Step 6: Commit**

```bash
git add src/app/components/organizers/organizers.types.ts src/app/components/organizers/organizers.content.ts src/app/components/organizers/organizers.content.test.ts
git commit -m "feat(organizers): add organizer domain types and FR/EN content data"
```

---

### Task 2: `OrganizersHero` — single mockup, no KPI grid

**Files:**
- Create: `src/app/components/organizers/OrganizersHero.tsx`

**Interfaces:**
- Consumes: `OrganizersCopy` from Task 1, `framer-motion`, `@/app/components/ui/premium/motion` (`fadeUp`, `staggerContainer`, `getMotionVariants`).
- Produces: `OrganizersHero({ copy, primaryCtaHref, secondaryCtaHref }: { copy: OrganizersCopy; primaryCtaHref: string; secondaryCtaHref: string })` default export — copy on one side (entrance-animated, mirroring the Venues/Providers Hero pattern already in this codebase), a single floating mockup card on the other (the 4 `mockupItems` as labeled rows inside one card — not a KPI/stat grid, no numbers implying real usage).

- [ ] **Step 1: Implement `OrganizersHero`**

No standalone test — verified at the page level in Task 6, same precedent as the Venues/Providers plans.

```typescript
// src/app/components/organizers/OrganizersHero.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { fadeUp, getMotionVariants, staggerContainer } from "@/app/components/ui/premium/motion";
import type { OrganizersCopy } from "./organizers.types";

export default function OrganizersHero({
  copy,
  primaryCtaHref,
  secondaryCtaHref,
}: {
  copy: OrganizersCopy;
  primaryCtaHref: string;
  secondaryCtaHref: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const itemVariants = getMotionVariants(Boolean(prefersReducedMotion), fadeUp);

  return (
    <div className="bg-surface px-6 py-24 md:py-[120px]">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center"
      >
        <div>
          <motion.p variants={itemVariants} className="text-sm font-medium uppercase tracking-wide text-brand-mid">
            {copy.eyebrow}
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="mt-3 text-[36px] font-medium leading-tight tracking-tight text-ink md:text-[56px]"
          >
            {copy.title}
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-4 max-w-lg text-lg text-brand-mid">
            {copy.description}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
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
          </motion.div>

          <motion.ul variants={itemVariants} className="mt-6 flex flex-wrap gap-3 text-xs text-brand-mid">
            {copy.reassurance.map((item) => (
              <li key={item} className="rounded-full border border-brand-border px-3 py-1">
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-brand-mid">{copy.mockupLabel}</p>
          <h2 className="mt-1 text-lg font-medium text-ink">{copy.mockupTitle}</h2>
          <div className="mt-5 divide-y divide-brand-border">
            {copy.mockupItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3 text-sm">
                <span className="text-brand-mid">{item.label}</span>
                <span className="font-medium text-ink">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
```

This mockup deliberately renders 4 labeled rows (`mockupItems`), not a chart, sparkline, or numeric KPI tile — satisfying spec section 8's "écran non saturé de widgets — un mockup principal, pas une grille de KPI".

- [ ] **Step 2: Commit**

```bash
git add src/app/components/organizers/OrganizersHero.tsx
git commit -m "feat(organizers): add OrganizersHero with single orchestration mockup"
```

---

### Task 3: `StepCard` + `WorkflowSection`

**Files:**
- Create: `src/app/components/organizers/StepCard.tsx`
- Create: `src/app/components/organizers/WorkflowSection.tsx`
- Test: `tests/organizers-workflow.spec.ts`

**Interfaces:**
- Consumes: `WorkflowStep` type from Task 1, `FloatingCard` from `@/app/components/ui/premium/FloatingCard`.
- Produces: `StepCard({ step, index }: { step: WorkflowStep; index: number })` default export — a numbered `FloatingCard` (hover-lift micro-interaction, per spec section 8 reserving the most technical animation for these demo sections). `WorkflowSection({ title, subtitle, steps }: { title: string; subtitle: string; steps: WorkflowStep[] })` default export — renders each step inside a `<div id={step.id}>` wrapper so `AnchorNav` (Task 4) has real scroll targets.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/organizers-workflow.spec.ts
import { expect, test } from "@playwright/test";

test.describe.serial("organizers workflow section", () => {
  test("each step renders as a numbered card with a real anchor id", async ({ page }) => {
    await page.goto("/en/organizers");

    const createStep = page.locator("#create");
    await expect(createStep).toBeVisible();
    await expect(createStep.getByText("Create")).toBeVisible();
    await expect(createStep.locator('[data-testid="floating-card"]')).toBeVisible();

    const trackStep = page.locator("#track");
    await expect(trackStep.getByText("Track")).toBeVisible();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/organizers-workflow.spec.ts`
Expected: FAIL — `/en/organizers` doesn't exist yet (404 or timeout).

- [ ] **Step 3: Implement `StepCard` and `WorkflowSection`**

```typescript
// src/app/components/organizers/StepCard.tsx
import FloatingCard from "@/app/components/ui/premium/FloatingCard";
import type { WorkflowStep } from "./organizers.types";

export default function StepCard({ step, index }: { step: WorkflowStep; index: number }) {
  return (
    <FloatingCard className="flex h-full flex-col gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal/10 text-sm font-medium text-teal-dark">
        {index + 1}
      </span>
      <h3 className="text-lg font-medium text-ink">{step.title}</h3>
      <p className="text-sm text-brand-mid">{step.description}</p>
    </FloatingCard>
  );
}
```

```typescript
// src/app/components/organizers/WorkflowSection.tsx
import StepCard from "./StepCard";
import type { WorkflowStep } from "./organizers.types";

export default function WorkflowSection({
  title,
  subtitle,
  steps,
}: {
  title: string;
  subtitle: string;
  steps: WorkflowStep[];
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-medium text-ink md:text-4xl">{title}</h2>
        <p className="mt-3 text-brand-mid">{subtitle}</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.id} id={step.id} className="scroll-mt-24">
            <StepCard step={step} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

`scroll-mt-24` on the anchor wrapper keeps the sticky Navbar from covering the target step when `AnchorNav` (Task 4) scrolls to it.

- [ ] **Step 4: Run test to verify it still fails for the right reason**

Run: `npx playwright test tests/organizers-workflow.spec.ts`
Expected: still FAIL (`/en/organizers` route doesn't exist until Task 6) — confirms the test is wired correctly, not passing by accident.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/organizers/StepCard.tsx src/app/components/organizers/WorkflowSection.tsx tests/organizers-workflow.spec.ts
git commit -m "feat(organizers): add StepCard and WorkflowSection with anchor targets"
```

---

### Task 4: `AnchorNav` (in-page secondary navigation)

**Files:**
- Create: `src/app/components/organizers/AnchorNav.tsx`

**Interfaces:**
- Consumes: `WorkflowStep` type from Task 1.
- Produces: `AnchorNav({ steps }: { steps: WorkflowStep[] })` default export — a horizontally-scrollable row of `<a href="#{step.id}">` links, sticky just below the global `Navbar`. This is the page's own component, not a `Navbar.tsx` change — satisfies spec section 8's "navigation d'ancrage secondaire propre à cette page" without touching the shared component.

- [ ] **Step 1: Implement `AnchorNav`**

No standalone test — its links are plain anchors to ids `WorkflowSection` already renders; Task 6's page-level test exercises the real click-and-scroll behavior.

```typescript
// src/app/components/organizers/AnchorNav.tsx
import type { WorkflowStep } from "./organizers.types";

export default function AnchorNav({ steps }: { steps: WorkflowStep[] }) {
  return (
    <nav
      aria-label="Workflow steps"
      className="sticky top-[57px] z-40 overflow-x-auto border-b border-brand-border bg-white/95 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-6xl gap-6 px-6 py-3 text-sm">
        {steps.map((step, index) => (
          <li key={step.id} className="shrink-0">
            <a href={`#${step.id}`} className="text-brand-mid hover:text-ink">
              {index + 1}. {step.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

The `top-[57px]` offset matches the global `Navbar`'s rendered height (`py-3.5` + logo height) so this secondary nav sits directly beneath it when both are sticky — verify against the real rendered Navbar height in Task 6's browser check and adjust the pixel value if it's off by more than a couple of pixels.

- [ ] **Step 2: Commit**

```bash
git add src/app/components/organizers/AnchorNav.tsx
git commit -m "feat(organizers): add in-page AnchorNav for workflow steps"
```

---

### Task 5: `ProofSection` (benefits + early access, the one place numbers appear)

**Files:**
- Create: `src/app/components/organizers/ProofSection.tsx`

**Interfaces:**
- Consumes: `OrganizersCopy` type from Task 1, `FloatingCard` from `@/app/components/ui/premium/FloatingCard`.
- Produces: `ProofSection({ copy }: { copy: OrganizersCopy })` default export — renders `benefitsTitle` + all 6 `benefits` as cards, then `earlyAccessTitle`/`earlyAccessDescription`/`earlyAccessItems`. This is the section spec section 8 reserves for any KPI-style content — here it's honest benefit statements, not invented usage numbers, consistent with the existing config's own "sans faux événements ni fausses statistiques" line in `categories.subtitle`.

- [ ] **Step 1: Implement `ProofSection`**

No standalone test — static content, verified at the page level in Task 6.

```typescript
// src/app/components/organizers/ProofSection.tsx
import FloatingCard from "@/app/components/ui/premium/FloatingCard";
import type { OrganizersCopy } from "./organizers.types";

export default function ProofSection({ copy }: { copy: OrganizersCopy }) {
  return (
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
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/organizers/ProofSection.tsx
git commit -m "feat(organizers): add ProofSection for benefits and early-access proof"
```

---

### Task 6: `OrganizersShowcase` composer + new routes + delete old events routes

**Files:**
- Create: `src/app/components/organizers/OrganizersShowcase.tsx`
- Create: `src/app/[locale]/organizers/page.tsx`
- Create: `src/app/[locale]/organisateurs/page.tsx`
- Delete: `src/app/[locale]/events/page.tsx`
- Delete: `src/app/[locale]/evenements/page.tsx`
- Modify: `tests/segmented-vision-pages.spec.ts` (only the events-route entries — update path/h1/waitlistId/alternateHref to the new organizers/organisateurs routes; do not touch the providers/venues entries)
- Delete: `tests/provider-portfolio-card.spec.ts`'s and `tests/venue-location-card.spec.ts`'s references are unaffected — do not touch those files.

**Interfaces:**
- Consumes: `Section`, `SectionDivider` from `@/app/components/ui/premium/`, `organizersContent` from Task 1, `OrganizersHero` from Task 2, `WorkflowSection` from Task 3, `AnchorNav` from Task 4, `ProofSection` from Task 5, `EmailForm` from `@/app/components/ui/EmailForm`.
- Produces: `OrganizersShowcase({ locale }: { locale: "fr" | "en" })` default export.

- [ ] **Step 1: Implement `OrganizersShowcase`**

```typescript
// src/app/components/organizers/OrganizersShowcase.tsx
import EmailForm from "@/app/components/ui/EmailForm";
import Section from "@/app/components/ui/premium/Section";
import SectionDivider from "@/app/components/ui/premium/SectionDivider";
import AnchorNav from "./AnchorNav";
import { organizersContent } from "./organizers.content";
import OrganizersHero from "./OrganizersHero";
import ProofSection from "./ProofSection";
import WorkflowSection from "./WorkflowSection";

export default function OrganizersShowcase({ locale }: { locale: "fr" | "en" }) {
  const { copy } = organizersContent[locale];

  return (
    <>
      <OrganizersHero
        copy={copy}
        primaryCtaHref="#organizer-waitlist"
        secondaryCtaHref={`#${copy.steps[0].id}`}
      />

      <AnchorNav steps={copy.steps} />

      <Section background="white">
        <WorkflowSection title={copy.workflowTitle} subtitle={copy.workflowSubtitle} steps={copy.steps} />
      </Section>

      <Section background="tinted">
        <ProofSection copy={copy} />
      </Section>

      <SectionDivider variant="gradient-fade" />

      <Section background="dark" id="organizer-waitlist">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-medium text-white md:text-4xl">{copy.finalCtaTitle}</h2>
          <p className="mt-3 text-white/80">{copy.finalCtaDescription}</p>
          <EmailForm
            source="events-page"
            defaultRole="organisateur"
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

- [ ] **Step 2: Create the new top-level pages**

```typescript
// src/app/[locale]/organizers/page.tsx
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import OrganizersShowcase from "@/app/components/organizers/OrganizersShowcase";

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
    "Plan an event with Elintys | Beta access",
    "See how Elintys brings venues, providers, ticketing, guests, and event-day check-in into one connected workspace.",
    "See how Elintys brings venues, providers, ticketing, guests, and event-day check-in into one connected workspace.",
    { canonicalPath: "/en/organizers", languages: { fr: "/fr/organisateurs", en: "/en/organizers" } }
  );
}

export default async function OrganizersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "en") {
    notFound();
  }

  setRequestLocale(locale);

  return <OrganizersShowcase locale="en" />;
}
```

```typescript
// src/app/[locale]/organisateurs/page.tsx
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import OrganizersShowcase from "@/app/components/organizers/OrganizersShowcase";

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
    "Organiser un événement avec Elintys | Accès bêta",
    "Découvrez comment Elintys centralise les lieux, les prestataires, la billetterie, les invités et l'accueil de vos événements.",
    "Découvrez comment Elintys centralise les lieux, les prestataires, la billetterie, les invités et l'accueil de vos événements.",
    { canonicalPath: "/fr/organisateurs", languages: { fr: "/fr/organisateurs", en: "/en/organizers" } }
  );
}

export default async function OrganisateursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "fr") {
    notFound();
  }

  setRequestLocale(locale);

  return <OrganizersShowcase locale="fr" />;
}
```

- [ ] **Step 3: Delete the old events/evenements routes**

```bash
git rm "src/app/[locale]/events/page.tsx" "src/app/[locale]/evenements/page.tsx"
```

- [ ] **Step 4: Update `tests/segmented-vision-pages.spec.ts`'s events entries**

Read the current `audienceRoutes` array first. Replace only the two events-route entries:

```typescript
  {
    path: "/fr/organisateurs",
    h1: "Créez votre événement. Elintys connecte tout le reste.",
    alternateLabel: "Langue: EN",
    alternateHref: "/en/organizers",
    waitlistId: "#organizer-waitlist",
  },
  {
    path: "/en/organizers",
    h1: "Create your event. Elintys connects everything else.",
    alternateLabel: "Language: FR",
    alternateHref: "/fr/organisateurs",
    waitlistId: "#organizer-waitlist",
  },
```

Also update the "unsupported localized slug combinations return 404" test's two events-mismatch assertions (`/en/evenements` and `/fr/events`) to the new slugs: `/en/organisateurs` and `/fr/organizers` should both 404. And update the "provider waitlist submits..." test's page reference if it happens to also assert an events-route waitlist elsewhere — read the file, don't guess; only providers-route assertions should reference `#provider-waitlist`, unrelated to this change.

Run: `npx playwright test tests/segmented-vision-pages.spec.ts`

If any assertion fails for a reason unrelated to the slug rename (a genuine regression), STOP and report it — do not paper over a real failure by loosening the assertion.

- [ ] **Step 5: Run the full relevant test suite**

Run: `npx vitest run`
Expected: all pass, including Task 1's `organizers.content.test.ts`.

Run: `npx playwright test tests/organizers-workflow.spec.ts tests/segmented-vision-pages.spec.ts`
Expected: all pass.

Run: `npm run build`
Expected: succeeds; `/fr/organisateurs` and `/en/organizers` appear in the route output; `/fr/evenements`, `/en/events` no longer appear.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/organizers/OrganizersShowcase.tsx "src/app/[locale]/organizers/page.tsx" "src/app/[locale]/organisateurs/page.tsx" tests/segmented-vision-pages.spec.ts
git add -u "src/app/[locale]/events" "src/app/[locale]/evenements"
git commit -m "feat(organizers): add organizers/organisateurs routes, remove old events/evenements"
```

---

### Task 7: Cut `Navbar.tsx`/`sitemap.ts` off the shared config, then delete the shared template

**Files:**
- Modify: `src/app/components/landing/Navbar.tsx`
- Modify: `src/app/sitemap.ts`
- Delete: `src/app/components/audience/AudiencePage.tsx`
- Delete: `src/app/components/audience/audience-page.config.ts`
- Delete: `src/app/components/audience/audience-page.server.tsx`
- Delete: `src/app/components/audience/audience-page.types.ts`

**Context:** After Task 6, nothing renders through the shared template anymore — `events`/`evenements` are gone, and `providers`/`prestataires`/`venues`/`lieux` were already migrated off it in the earlier Venues and Providers plans. The only remaining consumers of `audience-page.config.ts` are `Navbar.tsx` (route map + nav labels + the venues transparent-scroll route check) and `sitemap.ts` (route map for the XML sitemap). This task inlines that data directly into each file, then deletes the shared template per spec section 12.

- [ ] **Step 1: Verify nothing else imports the shared template**

Run: `grep -rn "audience-page\|components/audience/AudiencePage" src --include="*.ts" --include="*.tsx"`
Expected: only `Navbar.tsx` and `sitemap.ts` (and the files being deleted themselves) appear. If anything else appears, STOP — do not proceed with deletion until you understand what it is and whether it needs migrating too.

- [ ] **Step 2: Inline the route map into `Navbar.tsx`**

Replace the import block:

```typescript
import {
  audienceRouteMap,
  audienceSolutionLinks,
} from "@/app/components/audience/audience-page.config";
```

with a self-contained route map (same values, now owned by `Navbar.tsx` instead of the deleted config):

```typescript
const audienceRouteMap = {
  events: { fr: "/fr/organisateurs", en: "/en/organizers" },
  providers: { fr: "/fr/prestataires", en: "/en/providers" },
  venues: { fr: "/fr/lieux", en: "/en/venues" },
} as const;

const audienceSolutionLinks = {
  fr: [
    { label: "Organisateurs", href: audienceRouteMap.events.fr },
    { label: "Prestataires", href: audienceRouteMap.providers.fr },
    { label: "Lieux", href: audienceRouteMap.venues.fr },
  ],
  en: [
    { label: "Organizers", href: audienceRouteMap.events.en },
    { label: "Providers", href: audienceRouteMap.providers.en },
    { label: "Venues", href: audienceRouteMap.venues.en },
  ],
} as const;
```

Place this block where the old import was, immediately before the existing `equivalentRoutes`/`transparentUntilScrollRoutes` constants (which already reference `audienceRouteMap.*` and need no changes themselves — they'll now resolve against the local constant instead of the deleted import).

- [ ] **Step 3: Inline the route map into `sitemap.ts`**

Replace:

```typescript
import { audienceRouteMap } from "@/app/components/audience/audience-page.config";
```

with the same local constant (only the two fields `sitemap.ts` actually uses):

```typescript
const audienceRouteMap = {
  events: { fr: "/fr/organisateurs", en: "/en/organizers" },
  providers: { fr: "/fr/prestataires", en: "/en/providers" },
  venues: { fr: "/fr/lieux", en: "/en/venues" },
} as const;
```

- [ ] **Step 4: Run the full test suite before deleting anything**

Run: `npx vitest run`
Run: `npx playwright test`
Run: `npm run build`

All must pass with the inlined route maps before proceeding — this confirms the inlining is byte-for-byte equivalent before the source of truth is deleted.

- [ ] **Step 5: Delete the shared template**

```bash
git rm src/app/components/audience/AudiencePage.tsx
git rm src/app/components/audience/audience-page.config.ts
git rm src/app/components/audience/audience-page.server.tsx
git rm src/app/components/audience/audience-page.types.ts
```

- [ ] **Step 6: Run the full verification suite again**

Run: `npx vitest run`
Run: `npx playwright test`
Run: `npm run build`

Expected: all pass — this proves the deletion removed only dead code.

- [ ] **Step 7: Commit**

```bash
git add src/app/components/landing/Navbar.tsx src/app/sitemap.ts
git add -u src/app/components/audience
git commit -m "chore: inline audience route map into Navbar/sitemap, delete shared AudiencePage template"
```

---

## Self-Review

**Spec coverage (section 8, plus section 12's template removal):**
- Orchestration-tool framing, result-oriented headline, no KPI grid in the Hero → Task 2 (`OrganizersHero`).
- 8-step workflow (closest verbatim match to spec's illustrative 7-step narrative — the existing config's `workflow.steps` is the actual copy available, reused as-is per the no-new-copy constraint) → Task 3 (`WorkflowSection`/`StepCard`).
- Most-technical micro-interactions reserved for the demo sections → Task 3's `FloatingCard` hover-lift on step cards, not the Hero.
- Secondary in-page anchor navigation → Task 4 (`AnchorNav`), without modifying the shared `Navbar.tsx` structure.
- KPIs/proof numbers only after the Hero → Task 5 (`ProofSection`).
- New `organizers/page.tsx` replacing `evenements`/`events` → Task 6.
- Shared template retired once all 3 audience pages are migrated → Task 7, gated on Task 6 landing first and a verification grep before any deletion.

**Placeholder scan:** none — no images are introduced by this plan (the Organizers page's mockup is a text/data card, not a photo), so there's no asset-sourcing step to defer.

**Type consistency:** `WorkflowStep`/`ProofBenefit`/`OrganizersCopy`/`OrganizersLocaleContent` (Task 1) are used with identical field names across Tasks 2, 3, 4, 5, and 6. `WaitlistSource`/`WaitlistRole` literals (`"events-page"`, `"organisateur"`) match `src/lib/waitlist.types.ts` exactly — these are pre-existing valid literals, unchanged by this plan.
