import type { MetadataRoute } from "next";
import { audienceRouteMap } from "@/lib/audience-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://elintys.com";
  const now = new Date();

  const localizedRoutes = [
    { fr: "/fr", en: "/en" },
    audienceRouteMap.events,
    audienceRouteMap.providers,
    audienceRouteMap.venues,
    { fr: "/fr/confidentialite", en: "/en/confidentialite" },
    { fr: "/fr/conditions", en: "/en/conditions" },
  ];

  return localizedRoutes.flatMap((route) => [
    {
      url: new URL(route.fr, siteUrl).toString(),
      lastModified: now,
      alternates: {
        languages: {
          "fr-CA": new URL(route.fr, siteUrl).toString(),
          "en-CA": new URL(route.en, siteUrl).toString(),
        },
      },
    },
    {
      url: new URL(route.en, siteUrl).toString(),
      lastModified: now,
      alternates: {
        languages: {
          "fr-CA": new URL(route.fr, siteUrl).toString(),
          "en-CA": new URL(route.en, siteUrl).toString(),
        },
      },
    },
  ]);
}
