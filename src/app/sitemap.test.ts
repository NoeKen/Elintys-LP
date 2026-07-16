import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("contains only public canonical localized routes", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://www.elintys.com/fr");
    expect(urls).toContain("https://www.elintys.com/en");
    expect(urls).toContain("https://www.elintys.com/fr/organisateurs");
    expect(urls).toContain("https://www.elintys.com/en/organizers");
    expect(urls).toContain("https://www.elintys.com/fr/a-propos");
    expect(urls).toContain("https://www.elintys.com/en/about");
    expect(urls).toContain("https://www.elintys.com/fr/faq");
    expect(urls).toContain("https://www.elintys.com/en/faq");

    expect(urls.some((url) => url.includes("/api/"))).toBe(false);
    expect(urls.some((url) => url.includes("vercel.app"))).toBe(false);
    expect(urls.some((url) => url.includes("elintys.ca"))).toBe(false);
  });

  it("uses stable lastModified values and reciprocal alternates", () => {
    const entries = sitemap();
    const organizerFr = entries.find(
      (entry) => entry.url === "https://www.elintys.com/fr/organisateurs"
    );

    expect(new Date(organizerFr?.lastModified ?? "").toISOString()).toBe(
      "2026-07-15T00:00:00.000Z"
    );
    expect(organizerFr?.alternates?.languages).toMatchObject({
      "fr-CA": "https://www.elintys.com/fr/organisateurs",
      "en-CA": "https://www.elintys.com/en/organizers",
      "x-default": "https://www.elintys.com/fr/organisateurs",
    });
  });
});
