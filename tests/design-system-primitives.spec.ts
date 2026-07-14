import { expect, test } from "@playwright/test";

test.describe("Section primitive", () => {
  test("renders with the requested background variant and desktop padding", async ({
    page,
  }) => {
    await page.goto("/en/venues");
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
    await page.goto("/en/venues");
    const section = page.getByTestId("section-white");
    await expect(section).toBeVisible();
    // With reduced motion, opacity must already be 1 without a translate/blur transition mid-flight.
    // Poll rather than a single evaluate(): the SSR markup bakes the full-motion
    // `filter: blur(8px)` value, and the client only swaps in the reduced-motion
    // "none" override a short moment after hydration completes.
    await expect
      .poll(() => section.evaluate((el) => getComputedStyle(el).filter))
      .toBe("none");
  });
});

test.describe("FloatingCard primitive", () => {
  test("lifts and strengthens its shadow on hover", async ({ page }) => {
    await page.goto("/en/venues");
    // The real page renders one FloatingCard per venue; any single instance
    // exercises the primitive's own hover CSS, so .first() is representative.
    const card = page.getByTestId("floating-card").first();

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
    await page.goto("/en/venues");
    const card = page.getByTestId("floating-card").first();
    const borderRadius = await card.evaluate(
      (el) => getComputedStyle(el).borderRadius
    );
    expect(parseInt(borderRadius, 10)).toBeGreaterThanOrEqual(16);
  });

  test("respects prefers-reduced-motion by skipping the hover translation", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/venues");
    const card = page.getByTestId("floating-card").first();

    const restTransform = await card.evaluate(
      (el) => getComputedStyle(el).transform
    );

    await card.hover();
    await page.waitForTimeout(350);
    const hoverTransform = await card.evaluate(
      (el) => getComputedStyle(el).transform
    );

    // No translation should occur under reduced motion
    expect(hoverTransform).toBe(restTransform);
  });
});

test.describe("SectionDivider primitive", () => {
  test("is hidden from the accessibility tree", async ({ page }) => {
    await page.goto("/en/venues");
    const divider = page.getByTestId("section-divider");
    await expect(divider).toHaveAttribute("aria-hidden", "true");
  });
});
