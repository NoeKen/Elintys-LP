export const WAITLIST_ROLES = [
  "organisateur",
  "prestataire",
  "gestionnaire",
  "visiteur",
] as const;

export const WAITLIST_SOURCES = ["hero", "cta"] as const;

export const WAITLIST_LOCALES = ["fr", "en"] as const;

export type WaitlistRole = (typeof WAITLIST_ROLES)[number];
export type WaitlistSource = (typeof WAITLIST_SOURCES)[number];
export type WaitlistLocale = (typeof WAITLIST_LOCALES)[number];

