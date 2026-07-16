import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  getLocalizedRouteAlternates,
  indexableRouteKeys,
  localizedRoutes,
} from "@/lib/localized-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${siteConfig.contentLastModified}T00:00:00.000Z`);

  return indexableRouteKeys.flatMap((key) => {
    const route = localizedRoutes[key];
    const alternates = getLocalizedRouteAlternates(key);
    const priority = key === "home" ? 1 : key === "privacy" || key === "terms" ? 0.3 : 0.7;
    const changeFrequency = key === "home" ? "weekly" : "monthly";

    return siteConfig.locales.map((locale) => ({
      url: absoluteUrl(route[locale]),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: alternates.languages,
      },
    }));
  });
}
