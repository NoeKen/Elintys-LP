import { describe, expect, it } from "vitest";
import { providersContent } from "./providers.content";

describe("providersContent", () => {
  it("provides matching provider counts for fr and en", () => {
    expect(providersContent.fr.providers).toHaveLength(providersContent.en.providers.length);
  });

  it("gives every provider a non-empty image, category and review", () => {
    for (const locale of ["fr", "en"] as const) {
      for (const provider of providersContent[locale].providers) {
        expect(provider.imageSrc.length).toBeGreaterThan(0);
        expect(provider.category.length).toBeGreaterThan(0);
        expect(provider.review.quote.length).toBeGreaterThan(0);
      }
    }
  });

  it("has each provider's category present in that locale's categories list", () => {
    for (const locale of ["fr", "en"] as const) {
      const { copy, providers } = providersContent[locale];
      for (const provider of providers) {
        expect(copy.categories).toContain(provider.category);
      }
    }
  });

  it("gives exactly one provider a before/after pair", () => {
    for (const locale of ["fr", "en"] as const) {
      const withBeforeAfter = providersContent[locale].providers.filter((p) => p.beforeAfter);
      expect(withBeforeAfter).toHaveLength(1);
    }
  });

  it("reuses the existing FR hero title from the audience config", () => {
    expect(providersContent.fr.copy.title).toBe("Votre prochain client vous cherche peut-être déjà.");
  });

  it("reuses the existing EN hero title from the audience config", () => {
    expect(providersContent.en.copy.title).toBe("Your next client may already be looking for you.");
  });

  it("provides at least 2 incoming requests per locale", () => {
    expect(providersContent.fr.incomingRequests.length).toBeGreaterThanOrEqual(2);
    expect(providersContent.en.incomingRequests.length).toBeGreaterThanOrEqual(2);
  });
});
