import { describe, expect, it } from "vitest";
import {
  findLocalizedRouteKey,
  getLocalizedRouteAlternates,
  localizedRoutes,
  redirectedRoutes,
  resolveLocaleSwitchPath,
} from "./localized-routes";

describe("localizedRoutes", () => {
  it("maps public French and English routes reciprocally", () => {
    expect(localizedRoutes.organizers).toEqual({
      fr: "/fr/organisateurs",
      en: "/en/organizers",
    });
    expect(localizedRoutes.providers).toEqual({
      fr: "/fr/prestataires",
      en: "/en/providers",
    });
    expect(localizedRoutes.venues).toEqual({
      fr: "/fr/lieux",
      en: "/en/venues",
    });
    expect(localizedRoutes.about).toEqual({
      fr: "/fr/a-propos",
      en: "/en/about",
    });
    expect(localizedRoutes.faq).toEqual({
      fr: "/fr/faq",
      en: "/en/faq",
    });
    expect(localizedRoutes.privacy).toEqual({
      fr: "/fr/confidentialite",
      en: "/en/privacy",
    });
    expect(localizedRoutes.terms).toEqual({
      fr: "/fr/conditions",
      en: "/en/terms",
    });
  });

  it("resolves the language switch with slug translation", () => {
    expect(resolveLocaleSwitchPath("/fr/organisateurs", "en")).toBe("/en/organizers");
    expect(resolveLocaleSwitchPath("/en/providers", "fr")).toBe("/fr/prestataires");
    expect(resolveLocaleSwitchPath("/fr/a-propos", "en")).toBe("/en/about");
    expect(resolveLocaleSwitchPath("/en/faq", "fr")).toBe("/fr/faq");
    expect(resolveLocaleSwitchPath("/fr/confidentialite", "en")).toBe("/en/privacy");
    expect(resolveLocaleSwitchPath("/en/terms", "fr")).toBe("/fr/conditions");
  });

  it("falls back to the target localized home for unknown routes", () => {
    expect(resolveLocaleSwitchPath("/fr/route-inconnue", "en")).toBe("/en");
    expect(resolveLocaleSwitchPath(null, "fr")).toBe("/fr");
  });

  it("generates canonical hreflang alternates on the www domain", () => {
    const alternates = getLocalizedRouteAlternates("organizers");

    expect(alternates.languages).toEqual({
      "fr-CA": "https://www.elintys.com/fr/organisateurs",
      "en-CA": "https://www.elintys.com/en/organizers",
      "x-default": "https://www.elintys.com/fr/organisateurs",
    });
    expect(findLocalizedRouteKey("/en/organizers")).toBe("organizers");
  });

  it("keeps permanent redirects for legacy English legal slugs", () => {
    expect(redirectedRoutes).toEqual({
      "/en/confidentialite": "/en/privacy",
      "/en/conditions": "/en/terms",
    });
    expect(findLocalizedRouteKey("/en/confidentialite")).toBeUndefined();
    expect(findLocalizedRouteKey("/en/conditions")).toBeUndefined();
  });
});
