import { expect, test } from "@playwright/test";

const audienceRoutes = [
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
  {
    path: "/fr/prestataires",
    h1: "Votre prochain client vous cherche peut-être déjà.",
    alternateLabel: "Langue: EN",
    alternateHref: "/en/providers",
    // ProvidersShowcase (Task 5) uses #provider-waitlist, not the shared
    // AudiencePage template's #audience-waitlist.
    waitlistId: "#provider-waitlist",
  },
  {
    path: "/en/providers",
    h1: "Your next client may already be looking for you.",
    alternateLabel: "Language: FR",
    alternateHref: "/fr/prestataires",
    waitlistId: "#provider-waitlist",
  },
  {
    path: "/fr/lieux",
    h1: "Transformez votre espace en destination événementielle.",
    alternateLabel: "Langue: EN",
    alternateHref: "/en/venues",
    waitlistId: "#audience-waitlist",
  },
  {
    path: "/en/venues",
    h1: "Turn your space into an event destination.",
    alternateLabel: "Language: FR",
    alternateHref: "/fr/lieux",
    waitlistId: "#audience-waitlist",
  },
] as const;

// Serial: these routes are all first hit here, and concurrent cold
// compiles of distinct routes corrupt the Turbopack dev cache, producing
// spurious 500s under fullyParallel.
test.describe.serial("segmented public vision pages", () => {
  for (const route of audienceRoutes) {
    test(`${route.path} renders and preserves language equivalent`, async ({ page }) => {
      const response = await page.goto(route.path);

      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1, name: route.h1 })).toBeVisible();
      await expect(page.locator(route.waitlistId)).toBeVisible();
      await expect(page.getByLabel(route.alternateLabel)).toHaveAttribute("href", route.alternateHref);
    });
  }

  test("unsupported localized slug combinations return 404", async ({ page }) => {
    await expect((await page.goto("/en/organisateurs"))?.status()).toBe(404);
    await expect((await page.goto("/fr/organizers"))?.status()).toBe(404);
  });

  test("provider waitlist submits the expected source, role and consent state", async ({ page }) => {
    let capturedPayload: Record<string, unknown> | undefined;

    await page.route("**/api/waitlist", async (route) => {
      capturedPayload = JSON.parse(route.request().postData() ?? "{}");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, alreadyExists: false }),
      });
    });

    await page.goto("/fr/prestataires");

    const waitlist = page.locator("#provider-waitlist");
    await expect(waitlist.locator("select")).toHaveValue("prestataire");
    await expect(waitlist.locator('input[type="checkbox"]').nth(1)).not.toBeChecked();

    await waitlist.locator('input[type="text"]').fill("Camille");
    await waitlist.locator('input[type="email"]').fill("camille@example.com");
    await waitlist.locator('input[type="checkbox"]').first().check();
    await waitlist.getByRole("button", { name: "Rejoindre la bêta prestataire" }).click();

    await expect(waitlist.getByText("Bienvenue Camille")).toBeVisible();
    expect(capturedPayload).toMatchObject({
      firstName: "Camille",
      email: "camille@example.com",
      role: "prestataire",
      source: "providers-page",
      locale: "fr",
      consentMarketing: false,
    });
  });

  test("mobile menu opens, navigates and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/fr/lieux");

    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    await expect(page.locator("#mobile-public-menu")).toBeVisible();
    await page.locator("#mobile-public-menu").getByRole("link", { name: "Prestataires" }).click();

    await expect(page).toHaveURL(/\/fr\/prestataires$/);
    await expect(page.locator("#mobile-public-menu")).toBeHidden();
  });

  test("desktop navbar exposes direct audience links without solutions dropdown", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/fr");

    const nav = page.locator("nav").first();
    await expect(nav.getByRole("link", { name: "Accueil" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Organisateurs" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Organisateurs" })).toHaveAttribute(
      "href",
      "/fr/organisateurs"
    );
    await expect(nav.getByRole("link", { name: "Prestataires" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Lieux" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "À propos" })).toHaveAttribute(
      "href",
      "/fr/a-propos"
    );
    await expect(nav.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/fr/faq");
    await expect(nav.getByText("Solutions")).toHaveCount(0);
    await expect(nav.getByRole("link", { name: "Accès bêta" })).toHaveCount(0);
  });

  for (const width of [375, 768, 1440]) {
    test(`pages do not create horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });

      for (const route of audienceRoutes) {
        await page.goto(route.path);
        const hasHorizontalOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
        );

        expect(hasHorizontalOverflow, `${route.path} overflowed at ${width}px`).toBe(false);
      }
    });
  }
});
