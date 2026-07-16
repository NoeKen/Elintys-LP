import { absoluteUrl, siteConfig, type SiteLocale } from "@/config/site";

export const localizedRoutes = {
  home: { fr: "/fr", en: "/en" },
  organizers: { fr: "/fr/organisateurs", en: "/en/organizers" },
  providers: { fr: "/fr/prestataires", en: "/en/providers" },
  venues: { fr: "/fr/lieux", en: "/en/venues" },
  about: { fr: "/fr/a-propos", en: "/en/about" },
  faq: { fr: "/fr/faq", en: "/en/faq" },
  privacy: { fr: "/fr/confidentialite", en: "/en/confidentialite" },
  terms: { fr: "/fr/conditions", en: "/en/conditions" },
} as const;

export type LocalizedRouteKey = keyof typeof localizedRoutes;

export const indexableRouteKeys = Object.keys(localizedRoutes) as LocalizedRouteKey[];

export function getLocalizedPath(key: LocalizedRouteKey, locale: SiteLocale) {
  return localizedRoutes[key][locale];
}

export function findLocalizedRouteKey(pathname: string): LocalizedRouteKey | undefined {
  const cleanPathname = normalizePathname(pathname);

  return indexableRouteKeys.find((key) =>
    siteConfig.locales.some((locale) => localizedRoutes[key][locale] === cleanPathname)
  );
}

export function getLocalizedRouteAlternates(key: LocalizedRouteKey) {
  const route = localizedRoutes[key];

  return {
    canonicalByLocale: {
      fr: absoluteUrl(route.fr),
      en: absoluteUrl(route.en),
    },
    languages: {
      "fr-CA": absoluteUrl(route.fr),
      "en-CA": absoluteUrl(route.en),
      "x-default": absoluteUrl(route.fr),
    },
  };
}

export function resolveLocaleSwitchPath(pathname: string | null | undefined, targetLocale: SiteLocale) {
  if (!pathname) {
    return getLocalizedPath("home", targetLocale);
  }

  const key = findLocalizedRouteKey(pathname);

  if (key) {
    return getLocalizedPath(key, targetLocale);
  }

  return getLocalizedPath("home", targetLocale);
}

function normalizePathname(pathname: string) {
  const [pathWithoutQuery] = pathname.split(/[?#]/);
  if (!pathWithoutQuery || pathWithoutQuery === "/") {
    return "/";
  }

  return pathWithoutQuery.endsWith("/") && pathWithoutQuery.length > 1
    ? pathWithoutQuery.slice(0, -1)
    : pathWithoutQuery;
}
