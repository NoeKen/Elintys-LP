import { expect, test } from "@playwright/test";

const localizedLangRoutes = [
  ["/fr", "fr-CA"],
  ["/en", "en-CA"],
  ["/fr/organisateurs", "fr-CA"],
  ["/en/organizers", "en-CA"],
  ["/fr/faq", "fr-CA"],
  ["/en/faq", "en-CA"],
] as const;

test.describe.serial("SEO and GEO follow-up checks", () => {
  for (const [path, lang] of localizedLangRoutes) {
    test(`${path} renders the final html lang`, async ({ page }) => {
      await page.goto(path);

      await expect.poll(() => page.locator("html").getAttribute("lang")).toBe(lang);
    });
  }

  test("root redirects to the default French route", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL(/\/fr$/);
  });

  test("localized pages include the correct lang in initial server HTML", async ({ request }) => {
    const fr = await request.get("/fr");
    const en = await request.get("/en");

    expect(await fr.text()).toContain('<html lang="fr-CA">');
    expect(await en.text()).toContain('<html lang="en-CA">');
  });

  test("legal routes use French slugs in French and English slugs in English", async ({ page }) => {
    await expect((await page.goto("/fr/confidentialite"))?.status()).toBe(200);
    await expect(page).toHaveURL(/\/fr\/confidentialite$/);

    await expect((await page.goto("/en/privacy"))?.status()).toBe(200);
    await expect(page).toHaveURL(/\/en\/privacy$/);

    await expect((await page.goto("/fr/conditions"))?.status()).toBe(200);
    await expect(page).toHaveURL(/\/fr\/conditions$/);

    await expect((await page.goto("/en/terms"))?.status()).toBe(200);
    await expect(page).toHaveURL(/\/en\/terms$/);
  });

  test("legal pages render centralized current legal facts without absent fields", async ({ page }) => {
    const routes = [
      {
        path: "/fr/confidentialite",
        status: "Elintys n'est pas encore immatriculé à titre d'entreprise.",
        date: "Dernière mise à jour : 18 juillet 2026",
        foreign: "not yet registered as a business",
      },
      {
        path: "/fr/conditions",
        status: "Elintys n'est pas encore immatriculé à titre d'entreprise.",
        date: "Dernière mise à jour : 18 juillet 2026",
        foreign: "Last updated",
      },
      {
        path: "/en/privacy",
        status: "Elintys is not yet registered as a business.",
        date: "Last updated: July 18, 2026",
        foreign: "n'est pas encore immatriculé",
      },
      {
        path: "/en/terms",
        status: "Elintys is not yet registered as a business.",
        date: "Last updated: July 18, 2026",
        foreign: "Dernière mise à jour",
      },
    ] as const;

    for (const route of routes) {
      await page.goto(route.path);
      const body = page.locator("body");
      await expect(body).toContainText("Aurel Noe Kenfack");
      await expect(body).toContainText("contact@elintys.com");
      await expect(body).toContainText(route.status);
      await expect(body).toContainText(route.date);
      await expect(body).not.toContainText(/\bNEQ\b/);
      await expect(body).not.toContainText(/null|undefined|N\/A|À venir|\[Adresse\]/);
      await expect(body).not.toContainText(route.foreign);
    }
  });

  test("legacy English legal slugs redirect permanently to canonical English slugs", async ({
    request,
  }) => {
    const privacy = await request.get("/en/confidentialite", { maxRedirects: 0 });
    expect(privacy.status()).toBe(308);
    expect(privacy.headers().location).toBe("/en/privacy");

    const terms = await request.get("/en/conditions", { maxRedirects: 0 });
    expect(terms.status()).toBe(308);
    expect(terms.headers().location).toBe("/en/terms");
  });

  test("llms.txt and the Open Graph PNG are served as public assets", async ({ request }) => {
    const llms = await request.get("/llms.txt");
    expect(llms.status()).toBe(200);
    expect(llms.headers()["content-type"]).toContain("text/plain");
    const content = await llms.text();
    expect(content).toContain("# Elintys");
    expect(content).toMatch(/\[[^\]]+\]\(https:\/\/www\.elintys\.com\/en\/privacy\)/);

    const og = await request.get("/images/og/elintys-og.png");
    expect(og.status()).toBe(200);
    expect(og.headers()["content-type"]).toContain("image/png");
  });
});
