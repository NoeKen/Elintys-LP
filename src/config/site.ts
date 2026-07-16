export const siteConfig = {
  name: "Elintys",
  domain: "www.elintys.com",
  url: "https://www.elintys.com",
  defaultLocale: "fr",
  locales: ["fr", "en"],
  email: "contact@elintys.com",
  logoPath: "/images/elintys-logo.png",
  ogImagePath: "/images/og-image.svg",
  contentLastModified: "2026-07-15",
} as const;

export type SiteLocale = (typeof siteConfig.locales)[number];

export function isSiteLocale(locale: string): locale is SiteLocale {
  return (siteConfig.locales as readonly string[]).includes(locale);
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
