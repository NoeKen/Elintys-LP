import { describe, expect, it } from "vitest";
import { venuesContent } from "./venues.content";

describe("venuesContent", () => {
  it("provides matching venue counts for fr and en", () => {
    expect(venuesContent.fr.venues).toHaveLength(venuesContent.en.venues.length);
  });

  it("gives every venue a non-empty image, capacity and at least one highlight", () => {
    for (const locale of ["fr", "en"] as const) {
      for (const venue of venuesContent[locale].venues) {
        expect(venue.imageSrc.length).toBeGreaterThan(0);
        expect(venue.capacity.length).toBeGreaterThan(0);
        expect(venue.highlights.length).toBeGreaterThan(0);
      }
    }
  });

  it("reuses the existing FR hero title from the audience config", () => {
    expect(venuesContent.fr.copy.title).toBe(
      "Transformez votre espace en destination événementielle."
    );
  });

  it("reuses the existing EN hero title from the audience config", () => {
    expect(venuesContent.en.copy.title).toBe("Turn your space into an event destination.");
  });
});
