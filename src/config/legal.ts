import { siteConfig } from "./site";

export type RegistrationStatus = "unregistered" | "registration-pending" | "registered";

export const legalConfig = {
  projectName: siteConfig.name,
  operatorName: "Aurel Noe Kenfack",
  contactEmail: siteConfig.email,
  privacyOfficerName: "Aurel Noe Kenfack",
  privacyOfficerEmail: siteConfig.email,

  registration: {
    status: "unregistered" as RegistrationStatus,
    legalName: null,
    legalForm: null,
    neq: null,
    registrationDate: null,
  },

  jurisdiction: {
    province: "Québec",
    country: "Canada",
    countryCode: "CA",
  },

  address: {
    publicAddress: null,
  },

  website: {
    canonicalUrl: siteConfig.url,
  },

  policies: {
    lastUpdated: "2026-07-18",
  },
} as const;

export type LegalConfig = typeof legalConfig;
