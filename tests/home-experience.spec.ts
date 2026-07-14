import { expect, test } from "@playwright/test";

test.describe.serial("home cinematic experience", () => {
  test("renders the immersive hero and audience bridge on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 960 });
    await page.goto("/en");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Events deserve better than tools that don't talk to each other.",
      })
    ).toBeVisible();
    await expect(page.getByTestId("home-hero-r3f")).toBeVisible();

    await page.locator("#solution").scrollIntoViewIfNeeded();
    await expect(page.getByTestId("solution-carousel")).toBeVisible();
    await expect(page.locator('[data-testid="solution-carousel"] article h3')).toHaveText(
      "Create and find a venue"
    );
    await page.getByTestId("solution-next").click();
    await expect(page.locator('[data-testid="solution-carousel"] article h3')).toHaveText("Equip");
    await page.getByTestId("solution-step-4").click();
    await expect(page.locator('[data-testid="solution-carousel"] article h3')).toHaveText("Sell");

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Three worlds, one connected event experience.",
      })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Create your event/ })).toHaveAttribute(
      "href",
      "/en/organizers"
    );
    await expect(page.getByRole("link", { name: /Your next client/ })).toHaveAttribute(
      "href",
      "/en/providers"
    );
    await expect(page.getByRole("link", { name: /Turn your space/ })).toHaveAttribute(
      "href",
      "/en/venues"
    );
  });

  test("uses the static visual fallback on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/fr");

    await expect(page.getByTestId("home-hero-r3f")).toHaveCount(0);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "L'événementiel mérite mieux que des outils qui ne se parlent pas.",
      })
    ).toBeVisible();
  });
});
