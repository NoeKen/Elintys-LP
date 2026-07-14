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
