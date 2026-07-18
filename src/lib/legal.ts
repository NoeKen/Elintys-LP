import { legalConfig, type RegistrationStatus } from "@/config/legal";
import type { SiteLocale } from "@/config/site";

const LOCALE_TAGS: Record<SiteLocale, string> = {
  fr: "fr-CA",
  en: "en-CA",
};

export function isBusinessRegistered(): boolean {
  return legalConfig.registration.status === "registered";
}

export function hasPublicBusinessAddress(): boolean {
  return Boolean(legalConfig.address.publicAddress);
}

export function hasPublicNeq(): boolean {
  return Boolean(legalConfig.registration.neq);
}

export function getPublicOperatorIdentity(): string {
  return legalConfig.registration.legalName ?? legalConfig.operatorName;
}

export function getPrivacyOfficerIdentity(): string {
  return legalConfig.privacyOfficerName;
}

export function formatPolicyLastUpdated(locale: SiteLocale): string {
  const [year, month, day] = legalConfig.policies.lastUpdated.split("-").map(Number);
  const stableUtcDate = new Date(Date.UTC(year, month - 1, day, 12));

  return new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(stableUtcDate);
}

export function getLegalMessageValues(locale: SiteLocale) {
  return {
    projectName: legalConfig.projectName,
    operatorName: getPublicOperatorIdentity(),
    contactEmail: legalConfig.contactEmail,
    privacyOfficerName: getPrivacyOfficerIdentity(),
    privacyOfficerEmail: legalConfig.privacyOfficerEmail,
    canonicalUrl: legalConfig.website.canonicalUrl,
    lastUpdated: formatPolicyLastUpdated(locale),
  };
}

export function getRegistrationStatusMessageKey(status: RegistrationStatus): string {
  switch (status) {
    case "unregistered":
      return "legal.registrationStatus.unregistered";
    case "registration-pending":
      return "legal.registrationStatus.pending";
    case "registered":
      return "legal.registrationStatus.registered";
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}
