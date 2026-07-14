import { describe, expect, it } from "vitest";
import { organizersContent } from "./organizers.content";

describe("organizersContent", () => {
  it("has exactly 8 workflow steps per locale, each with a unique id", () => {
    for (const locale of ["fr", "en"] as const) {
      const { steps } = organizersContent[locale].copy;
      expect(steps).toHaveLength(8);
      expect(new Set(steps.map((s) => s.id)).size).toBe(8);
    }
  });

  it("reuses the existing FR hero title from the audience config", () => {
    expect(organizersContent.fr.copy.title).toBe(
      "Créez votre événement. Elintys connecte tout le reste."
    );
  });

  it("reuses the existing EN hero title from the audience config", () => {
    expect(organizersContent.en.copy.title).toBe(
      "Create your event. Elintys connects everything else."
    );
  });

  it("gives every benefit a non-empty title and description in both locales", () => {
    for (const locale of ["fr", "en"] as const) {
      for (const benefit of organizersContent[locale].copy.benefits) {
        expect(benefit.title.length).toBeGreaterThan(0);
        expect(benefit.description.length).toBeGreaterThan(0);
      }
    }
  });

  it("has 6 benefits and 4 mockup items per locale, matching the source config counts", () => {
    for (const locale of ["fr", "en"] as const) {
      expect(organizersContent[locale].copy.benefits).toHaveLength(6);
      expect(organizersContent[locale].copy.mockupItems).toHaveLength(4);
    }
  });
});
