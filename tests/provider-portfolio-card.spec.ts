import { expect, test } from "@playwright/test";

test.describe.serial("ProviderPortfolioCard", () => {
  test("renders on the providers page with category, review and before/after", async ({ page }) => {
    await page.goto("/en/providers");

    const cards = page.locator('[data-testid="provider-card"]');
    await expect(cards.first()).toBeVisible();
    await expect(cards.first().getByText("Photographers")).toBeVisible();
    await expect(page.getByText("Read the room and adjusted the vibe")).toBeVisible();

    const decoratorCard = page.locator('[data-testid="provider-card-before-after"]');
    await expect(decoratorCard).toBeVisible();
    await expect(decoratorCard.getByAltText(/before/i)).toBeVisible();
    await expect(decoratorCard.getByAltText(/after/i)).toBeVisible();
  });
});
