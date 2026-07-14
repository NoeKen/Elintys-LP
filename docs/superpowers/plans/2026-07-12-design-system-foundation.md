# Design System Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the shared design-system foundation (color tokens, typography
scale, and reusable premium UI primitives with reduced-motion-aware
animation) that the Home, Organizers, Providers, and Venues page redesigns
will all consume.

**Architecture:** Design tokens live as CSS custom properties in
`globals.css` and are exposed to Tailwind via `tailwind.config.ts`. Animation
variants live in a single pure-logic module (`motion.ts`) that every
component imports — this is the only place `prefers-reduced-motion` logic is
implemented. Three presentational primitives (`Section`, `FloatingCard`,
`SectionDivider`) consume the tokens and variants and are the only building
blocks page-specific components are allowed to use for spacing, cards, and
section transitions.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS 3, Framer
Motion 12, Vitest (new, for pure-logic unit tests), Playwright (existing, for
rendered-component behavior).

## Global Constraints

- Content/copy is out of scope — do not add or edit strings in
  `src/messages/en.ts` or `src/messages/fr.ts` in this plan.
- All colors consumed by components must go through the semantic tokens
  (`--color-background`, `--color-surface`, `--color-text-primary`,
  `--color-text-secondary`, `--color-border`, `--color-success`), never the
  raw palette tokens directly.
- White must remain the dominant surface — semantic `background`/`surface`
  tokens default to the off-white/light-gray values, not a brand color.
- Every animation variant must degrade to a simple opacity fade with no
  translation/blur/loop when `prefers-reduced-motion: reduce` is set.
- Existing component patterns (e.g. `src/app/components/landing/Hero.tsx`)
  use `"use client"`, Framer Motion `containerVariants`/`itemVariants` with
  `ease: "easeOut" as const` — new primitives should follow the same
  conventions so they compose cleanly with existing sections.
- No new component may import raw hex values inline; every color must
  resolve through a Tailwind class backed by a CSS custom property.

---

### Task 1: Install and configure Vitest for pure-logic unit tests

There is currently no unit test runner in this repo (only Playwright
end-to-end tests). `motion.ts` in Task 3 is pure TypeScript logic (no DOM),
so it needs a fast unit-test runner rather than a full browser test.

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

**Interfaces:**
- Produces: `npm run test:unit` script that runs Vitest once
  (`vitest run`).

- [ ] **Step 1: Install Vitest**

Run: `npm install -D vitest`

- [ ] **Step 2: Create the Vitest config**

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- [ ] **Step 3: Add the `test:unit` script**

Edit `package.json`, inside `"scripts"`, add:

```json
    "test:unit": "vitest run",
```

- [ ] **Step 4: Verify the runner works with a throwaway test**

Create a temporary file `src/lib/__vitest-smoke.test.ts`:

```typescript
import { describe, expect, it } from "vitest";

describe("vitest smoke test", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run: `npm run test:unit`
Expected: `1 passed`

- [ ] **Step 5: Delete the smoke test and commit the runner setup**

Run: `rm src/lib/__vitest-smoke.test.ts`

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add vitest for pure-logic unit tests"
```

---

### Task 2: Design tokens — palette and semantic CSS custom properties

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`

**Interfaces:**
- Produces: Tailwind color utilities `bg-background`, `bg-surface`,
  `text-text-primary`, `text-text-secondary`, `border-border-default`,
  `text-success`, plus raw palette utilities `bg-accent-orange`,
  `bg-accent-gold`, `bg-sage`, `bg-teal-brand`, `bg-petrol-dark`. These are
  the only color utilities Tasks 4–6 (and later page-specific components)
  may use for new UI.

- [ ] **Step 1: Add raw and semantic CSS custom properties**

Edit `src/app/globals.css`, inside the existing `@layer base { ... }` block,
add a new rule right after the opening `@layer base {` (before the `body`
rule):

```css
@layer base {
  :root {
    /* Raw palette (spec section 6.1) */
    --palette-accent-orange: 22 74% 65%; /* #E8965A */
    --palette-accent-gold: 39 51% 51%; /* #C99A3E */
    --palette-sage: 89 14% 49%; /* #7C8F6E */
    --palette-teal: 182 45% 34%; /* #2F7A7E */
    --palette-petrol-dark: 191 51% 20%; /* #1A4550 */
    --palette-off-white: 60 20% 97%; /* #FAFAF7 */
    --palette-light-gray: 60 5% 95%; /* #F3F3F1 */

    /* Semantic tokens — components consume these, never the raw palette */
    --color-background: var(--palette-off-white);
    --color-surface: var(--palette-light-gray);
    --color-text-primary: 210 29% 8%; /* near-black, matches existing ink.DEFAULT */
    --color-text-secondary: 220 9% 46%; /* matches existing brand.mid */
    --color-border: 220 13% 91%; /* matches existing brand.border */
    --color-success: var(--palette-sage);
  }

  ...
```

Leave the rest of the existing `@layer base` block (the `body` rule,
scrollbar rules, `html { scroll-behavior: smooth; }`) untouched below it.

- [ ] **Step 2: Expose the tokens to Tailwind**

Edit `tailwind.config.ts`, inside `theme.extend.colors`, add a new top-level
entry after the existing `brand` entry (do not remove any existing color —
this is additive):

```typescript
        brand: {
          text: "#0D1117",
          mid: "#4B5563",
          soft: "#9CA3AF",
          border: "#E5E7EB",
          bg: "#F9FAFB",
        },
        // --- new design-system tokens (spec section 6.1) ---
        surface: "hsl(var(--color-surface) / <alpha-value>)",
        "text-primary": "hsl(var(--color-text-primary) / <alpha-value>)",
        "text-secondary": "hsl(var(--color-text-secondary) / <alpha-value>)",
        "border-default": "hsl(var(--color-border) / <alpha-value>)",
        success: "hsl(var(--color-success) / <alpha-value>)",
        "accent-orange": "hsl(var(--palette-accent-orange) / <alpha-value>)",
        "accent-gold": "hsl(var(--palette-accent-gold) / <alpha-value>)",
        sage: "hsl(var(--palette-sage) / <alpha-value>)",
        "teal-brand": "hsl(var(--palette-teal) / <alpha-value>)",
        "petrol-dark": "hsl(var(--palette-petrol-dark) / <alpha-value>)",
```

Note: `background` already exists in the config as
`"hsl(var(--background))"` (shadcn convention, different variable name). Do
not touch that existing entry — the new `--color-background` custom property
from Step 1 is intentionally unused by Tailwind directly; instead add one
more line mapping our spec's `background` semantic token to a *new* Tailwind
key so it doesn't collide with the existing shadcn `background` key:

```typescript
        "background-warm": "hsl(var(--color-background) / <alpha-value>)",
```

Add this line directly below the `success:` line added above.

- [ ] **Step 3: Verify Tailwind picks up the new classes**

Run: `npm run build`
Expected: build succeeds with no CSS/Tailwind errors (unused utility classes
don't cause failures, but a typo in the config would throw during the CSS
build step — watch for `Cannot apply unknown utility` or similar).

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css tailwind.config.ts
git commit -m "feat(design-system): add palette and semantic color tokens"
```

---

### Task 3: Typography scale tokens

**Files:**
- Modify: `tailwind.config.ts`

**Interfaces:**
- Produces: Tailwind font-size utilities `text-hero` (56px desktop, use
  with a responsive variant for mobile per Step 2), `text-h2`,
  `text-subtitle`, `text-body-lg`, matching spec section 6.2.

- [ ] **Step 1: Add the font-size scale**

Edit `tailwind.config.ts`, inside `theme.extend`, add a new `fontSize` key
alongside the existing `colors` key:

```typescript
      fontSize: {
        hero: ["72px", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "500" }],
        "hero-mobile": ["44px", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "500" }],
        h2: ["40px", { lineHeight: "1.15", fontWeight: "500" }],
        subtitle: ["22px", { lineHeight: "1.4", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
      },
```

These map to spec section 6.2: hero 56–72px desktop (using the 72px upper
bound as the token, consumers use `md:text-hero text-hero-mobile` for the
responsive pair), H2 36–44px (using 40px as the token), subtitle 22px, body
18px/1.6.

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat(design-system): add typography scale tokens"
```

---

### Task 4: Motion variants module with reduced-motion support

This is pure TypeScript logic (no DOM), so it's unit-tested with Vitest per
Task 1.

**Files:**
- Create: `src/app/components/ui/premium/motion.ts`
- Test: `src/app/components/ui/premium/motion.test.ts`

**Interfaces:**
- Produces:
  - `fadeUp: Variants` — full-motion variant (translate + fade)
  - `blurReveal: Variants` — full-motion variant (blur + fade)
  - `staggerContainer: Variants` — parent stagger container,
    `staggerChildren: 0.1`, `delayChildren: 0.05` (matches existing
    `Hero.tsx` convention)
  - `floatLoop: Variants` — slow continuous drift loop (no bounce)
  - `hoverLift: { rest: TargetAndTransition; hover: TargetAndTransition }`
    — object (not `Variants`, since it's driven by `whileHover`/`initial`,
    not `whileInView`)
  - `getMotionVariants(prefersReducedMotion: boolean, full: Variants):
    Variants` — pure function used by every component instead of importing
    `fadeUp`/`blurReveal`/etc. directly. When `prefersReducedMotion` is
    `true`, returns a reduced variant (`hidden: { opacity: 0 }, visible: {
    opacity: 1, transition: { duration: 0.3 } }`) regardless of which `full`
    variant was passed in. When `false`, returns `full` unchanged.

- [ ] **Step 1: Write the failing test**

```typescript
// src/app/components/ui/premium/motion.test.ts
import { describe, expect, it } from "vitest";
import { fadeUp, blurReveal, getMotionVariants } from "./motion";

describe("getMotionVariants", () => {
  it("returns the full variant unchanged when reduced motion is off", () => {
    const result = getMotionVariants(false, fadeUp);
    expect(result).toBe(fadeUp);
  });

  it("returns a simple opacity-only variant when reduced motion is on", () => {
    const result = getMotionVariants(true, blurReveal);
    expect(result.hidden).toEqual({ opacity: 0 });
    expect(result.visible).toMatchObject({ opacity: 1 });
    // must not carry over translation or blur from the full variant
    expect(result.visible).not.toHaveProperty("y");
    expect(result.visible).not.toHaveProperty("filter");
  });

  it("reduced variant is identical regardless of which full variant was passed", () => {
    const fromFadeUp = getMotionVariants(true, fadeUp);
    const fromBlurReveal = getMotionVariants(true, blurReveal);
    expect(fromFadeUp).toEqual(fromBlurReveal);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit`
Expected: FAIL — `motion.ts` does not exist yet, module resolution error.

- [ ] **Step 3: Write the implementation**

```typescript
// src/app/components/ui/premium/motion.ts
import type { TargetAndTransition, Variants } from "framer-motion";

const EASE_OUT = "easeOut" as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const floatLoop: Variants = {
  visible: {
    y: [0, -14, 0],
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

export const hoverLift: { rest: TargetAndTransition; hover: TargetAndTransition } = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(16, 24, 40, 0.06)" },
  hover: {
    y: -4,
    boxShadow: "0 12px 24px rgba(16, 24, 40, 0.12)",
    transition: { duration: 0.25, ease: EASE_OUT },
  },
};

const REDUCED_MOTION_VARIANT: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export function getMotionVariants(
  prefersReducedMotion: boolean,
  full: Variants
): Variants {
  return prefersReducedMotion ? REDUCED_MOTION_VARIANT : full;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:unit`
Expected: `3 passed`

- [ ] **Step 5: Commit**

```bash
git add src/app/components/ui/premium/motion.ts src/app/components/ui/premium/motion.test.ts
git commit -m "feat(design-system): add motion variants with reduced-motion support"
```

---

### Task 5: `Section` primitive

**Files:**
- Create: `src/app/components/ui/premium/Section.tsx`
- Test: `tests/design-system-section.spec.ts`

**Interfaces:**
- Consumes: `getMotionVariants`, `blurReveal` from `./motion` (Task 4).
- Produces:
  ```typescript
  export type SectionBackground = "white" | "tinted" | "dark";

  export interface SectionProps {
    background?: SectionBackground; // default "white"
    children: React.ReactNode;
    className?: string;
    id?: string;
  }

  export default function Section(props: SectionProps): JSX.Element;
  ```
  Renders a `<section>` with `data-background={background}` attribute (used
  by the Playwright test and by later page components to target it),
  vertical padding of at least 120px on desktop
  (`py-24 md:py-[120px]`), and a `blurReveal` entrance animation driven by
  `whileInView`.

- [ ] **Step 1: Write the failing Playwright test**

This test needs a page that renders `Section`. Create a minimal test host
page for the design-system primitives at
`src/app/[locale]/dev/design-system/page.tsx` (dev-only route, not linked
from navigation, used purely to exercise primitives in Tasks 5–7).

```typescript
// tests/design-system-section.spec.ts
import { expect, test } from "@playwright/test";

test.describe("Section primitive", () => {
  test("renders with the requested background variant and desktop padding", async ({
    page,
  }) => {
    await page.goto("/en/dev/design-system");
    const section = page.getByTestId("section-tinted");
    await expect(section).toHaveAttribute("data-background", "tinted");

    const paddingTop = await section.evaluate(
      (el) => getComputedStyle(el).paddingTop
    );
    // 120px desktop minimum per spec section 6.2
    expect(parseInt(paddingTop, 10)).toBeGreaterThanOrEqual(120);
  });

  test("respects prefers-reduced-motion by skipping translate/blur", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/dev/design-system");
    const section = page.getByTestId("section-white");
    await expect(section).toBeVisible();
    // With reduced motion, opacity must already be 1 without a translate/blur transition mid-flight
    const filter = await section.evaluate((el) => getComputedStyle(el).filter);
    expect(filter).toBe("none");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/design-system-section.spec.ts`
Expected: FAIL — route `/en/dev/design-system` returns 404 (page doesn't
exist yet).

- [ ] **Step 3: Implement the `Section` component**

```typescript
// src/app/components/ui/premium/Section.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { blurReveal, getMotionVariants } from "./motion";

export type SectionBackground = "white" | "tinted" | "dark";

export interface SectionProps {
  background?: SectionBackground;
  children: React.ReactNode;
  className?: string;
  id?: string;
  "data-testid"?: string;
}

const BACKGROUND_CLASSES: Record<SectionBackground, string> = {
  white: "bg-white",
  tinted: "bg-surface",
  dark: "bg-petrol-dark text-white",
};

export default function Section({
  background = "white",
  children,
  className,
  id,
  "data-testid": testId,
}: SectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = getMotionVariants(Boolean(prefersReducedMotion), blurReveal);

  return (
    <motion.section
      id={id}
      data-testid={testId}
      data-background={background}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      className={cn(
        "py-24 md:py-[120px] px-6",
        BACKGROUND_CLASSES[background],
        className
      )}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 4: Create the dev host page**

```typescript
// src/app/[locale]/dev/design-system/page.tsx
import Section from "@/app/components/ui/premium/Section";

export default function DesignSystemDevPage() {
  return (
    <main>
      <Section background="white" data-testid="section-white">
        <p>White section</p>
      </Section>
      <Section background="tinted" data-testid="section-tinted">
        <p>Tinted section</p>
      </Section>
      <Section background="dark" data-testid="section-dark">
        <p>Dark section</p>
      </Section>
    </main>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx playwright test tests/design-system-section.spec.ts`
Expected: `2 passed`

- [ ] **Step 6: Commit**

```bash
git add src/app/components/ui/premium/Section.tsx src/app/[locale]/dev/design-system/page.tsx tests/design-system-section.spec.ts
git commit -m "feat(design-system): add Section primitive with reduced-motion-aware reveal"
```

---

### Task 6: `FloatingCard` primitive

**Files:**
- Create: `src/app/components/ui/premium/FloatingCard.tsx`
- Modify: `src/app/[locale]/dev/design-system/page.tsx`
- Modify: `tests/design-system-section.spec.ts` → rename to
  `tests/design-system-primitives.spec.ts` (broadened scope)

**Interfaces:**
- Consumes: `hoverLift` from `./motion` (Task 4).
- Produces:
  ```typescript
  export interface FloatingCardProps {
    children: React.ReactNode;
    className?: string;
    glass?: boolean; // default false — enables light glassmorphism treatment
  }

  export default function FloatingCard(props: FloatingCardProps): JSX.Element;
  ```
  Renders a `<motion.div data-testid="floating-card">` with rounded corners
  (`rounded-2xl`, 16–24px per spec), a soft shadow at rest, and a lift +
  stronger shadow on hover via `hoverLift`.

- [ ] **Step 1: Rename the test file and add the failing test**

Run: `git mv tests/design-system-section.spec.ts tests/design-system-primitives.spec.ts`

Append to `tests/design-system-primitives.spec.ts`:

```typescript
test.describe("FloatingCard primitive", () => {
  test("lifts and strengthens its shadow on hover", async ({ page }) => {
    await page.goto("/en/dev/design-system");
    const card = page.getByTestId("floating-card");

    const restTransform = await card.evaluate(
      (el) => getComputedStyle(el).transform
    );

    await card.hover();
    // wait for the hover transition to settle
    await page.waitForTimeout(350);
    const hoverTransform = await card.evaluate(
      (el) => getComputedStyle(el).transform
    );

    expect(hoverTransform).not.toBe(restTransform);
  });

  test("has rounded corners", async ({ page }) => {
    await page.goto("/en/dev/design-system");
    const card = page.getByTestId("floating-card");
    const borderRadius = await card.evaluate(
      (el) => getComputedStyle(el).borderRadius
    );
    expect(parseInt(borderRadius, 10)).toBeGreaterThanOrEqual(16);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/design-system-primitives.spec.ts`
Expected: FAIL — `getByTestId("floating-card")` finds no element.

- [ ] **Step 3: Implement `FloatingCard`**

```typescript
// src/app/components/ui/premium/FloatingCard.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { hoverLift } from "./motion";

export interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export default function FloatingCard({
  children,
  className,
  glass = false,
}: FloatingCardProps) {
  return (
    <motion.div
      data-testid="floating-card"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={hoverLift}
      className={cn(
        "rounded-2xl border border-border-default bg-white p-6",
        glass && "bg-white/70 backdrop-blur-md",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Add the card to the dev host page**

Edit `src/app/[locale]/dev/design-system/page.tsx`, add the import and a
usage inside `<main>`:

```typescript
import FloatingCard from "@/app/components/ui/premium/FloatingCard";
```

```typescript
      <Section background="white" data-testid="section-card-host">
        <FloatingCard>
          <p>Floating card content</p>
        </FloatingCard>
      </Section>
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx playwright test tests/design-system-primitives.spec.ts`
Expected: `4 passed`

- [ ] **Step 6: Commit**

```bash
git add src/app/components/ui/premium/FloatingCard.tsx src/app/[locale]/dev/design-system/page.tsx tests/design-system-primitives.spec.ts
git commit -m "feat(design-system): add FloatingCard primitive"
```

---

### Task 7: `SectionDivider` primitive

**Files:**
- Create: `src/app/components/ui/premium/SectionDivider.tsx`
- Modify: `src/app/[locale]/dev/design-system/page.tsx`
- Modify: `tests/design-system-primitives.spec.ts`

**Interfaces:**
- Produces:
  ```typescript
  export type SectionDividerVariant = "curve" | "gradient-fade";

  export interface SectionDividerProps {
    variant?: SectionDividerVariant; // default "gradient-fade"
    className?: string;
  }

  export default function SectionDivider(props: SectionDividerProps): JSX.Element;
  ```
  A non-interactive, `aria-hidden` divider element between sections. The
  `gradient-fade` variant is a thin div with a `background-image` teal→
  transparent gradient; the `curve` variant is an inline SVG with a single
  smooth curve path, filled with `currentColor` so it can inherit the
  section's text color.

- [ ] **Step 1: Add the failing test**

Append to `tests/design-system-primitives.spec.ts`:

```typescript
test.describe("SectionDivider primitive", () => {
  test("is hidden from the accessibility tree", async ({ page }) => {
    await page.goto("/en/dev/design-system");
    const divider = page.getByTestId("section-divider");
    await expect(divider).toHaveAttribute("aria-hidden", "true");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/design-system-primitives.spec.ts`
Expected: FAIL — `getByTestId("section-divider")` finds no element.

- [ ] **Step 3: Implement `SectionDivider`**

```typescript
// src/app/components/ui/premium/SectionDivider.tsx
import { cn } from "@/lib/utils";

export type SectionDividerVariant = "curve" | "gradient-fade";

export interface SectionDividerProps {
  variant?: SectionDividerVariant;
  className?: string;
}

export default function SectionDivider({
  variant = "gradient-fade",
  className,
}: SectionDividerProps) {
  if (variant === "curve") {
    return (
      <svg
        aria-hidden="true"
        data-testid="section-divider"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={cn("h-20 w-full text-surface", className)}
      >
        <path d="M0,40 C480,90 960,-10 1440,40 L1440,80 L0,80 Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <div
      aria-hidden="true"
      data-testid="section-divider"
      className={cn(
        "h-24 w-full bg-gradient-to-b from-teal-brand/10 to-transparent",
        className
      )}
    />
  );
}
```

- [ ] **Step 4: Add the divider to the dev host page**

Edit `src/app/[locale]/dev/design-system/page.tsx`, add the import and
usage between two `Section`s:

```typescript
import SectionDivider from "@/app/components/ui/premium/SectionDivider";
```

```typescript
      <SectionDivider variant="curve" />
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx playwright test tests/design-system-primitives.spec.ts`
Expected: `5 passed`

- [ ] **Step 6: Commit**

```bash
git add src/app/components/ui/premium/SectionDivider.tsx src/app/[locale]/dev/design-system/page.tsx tests/design-system-primitives.spec.ts
git commit -m "feat(design-system): add SectionDivider primitive"
```

---

### Task 8: Remove the dev host route and final verification

The dev host page at `dev/design-system` was scaffolding to exercise the
primitives in isolation. Page-specific work (Home, Organizers, Providers,
Venues plans) will exercise them for real, so the dev route is no longer
needed. Its Playwright tests are kept (they're cheap, fast regression
coverage for the primitives) but repointed at a page that will still exist
long-term to avoid depending on scaffolding.

Since no real page consumes the primitives yet at the end of this plan (that
happens in the Home/Organizers/Providers/Venues plans), keep the dev route
for now — deleting it here would leave the primitives untested until the
next plan lands. Instead, mark it clearly as scaffolding so a future plan
knows to remove it once a real page uses the primitives.

**Files:**
- Modify: `src/app/[locale]/dev/design-system/page.tsx`

- [x] **Step 1: Add a scaffolding comment**

Edit `src/app/[locale]/dev/design-system/page.tsx`, add at the top:

```typescript
// Scaffolding route for design-system primitive tests
// (tests/design-system-primitives.spec.ts). Remove this route and repoint
// those tests at a real page once Home/Organizers/Providers/Venues consume
// Section/FloatingCard/SectionDivider directly.
```

- [x] **Step 2: Run the full verification suite**

Run: `npm run test:unit`
Expected: `3 passed` (Task 4's motion tests)

Run: `npx playwright test tests/design-system-primitives.spec.ts`
Expected: `5 passed`

Run: `npm run build`
Expected: build succeeds with no type errors.

- [x] **Step 3: Commit**

```bash
git add src/app/[locale]/dev/design-system/page.tsx
git commit -m "docs: mark design-system dev route as scaffolding pending page integration"
```
