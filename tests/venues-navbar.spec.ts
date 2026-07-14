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
