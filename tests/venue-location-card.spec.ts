import { expect, test } from "@playwright/test";

test.describe.serial("VenueLocationCard", () => {
  test("renders on the venues page with capacity, location and CTA", async ({ page }) => {
    await page.goto("/en/venues");

    // VenuesShowcase renders venues[0] (industrial loft, Montreal) as the
    // full-bleed Hero, not a card — the first VenueLocationCard is
    // venues[1] (winter garden, Laval).
    const firstCard = page.locator('[data-testid="venue-card"]').first();
    await expect(firstCard).toBeVisible();
    await expect(firstCard.getByText("Laval, QC")).toBeVisible();
    await expect(firstCard.getByRole("link")).toBeVisible();
  });
});
