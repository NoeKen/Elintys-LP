export const locales = ["fr", "en"] as const;

export type SiteLocale = (typeof locales)[number];

export const defaultLocale: SiteLocale = "fr";

export type Dictionary =
  | typeof import("@/messages/fr").default
  | typeof import("@/messages/en").default;

export function isValidLocale(value: string): value is SiteLocale {
  return locales.includes(value as SiteLocale);
}

export function getOpenGraphLocale(locale: SiteLocale) {
  return locale === "fr" ? "fr_CA" : "en_CA";
}

export async function getDictionary(locale: SiteLocale): Promise<Dictionary> {
  switch (locale) {
    case "en":
      return (await import("@/messages/en")).default;
    case "fr":
    default:
      return (await import("@/messages/fr")).default;
  }
}

export function replaceToken(template: string, token: string, value: string | number) {
  return template.replace(`{${token}}`, String(value));
}
