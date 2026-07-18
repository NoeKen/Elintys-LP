import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound, permanentRedirect } from "next/navigation";
import {
  PrivacyPolicyContent,
  generatePrivacyPageMetadata,
} from "@/app/components/legal/LegalContentPages";
import { routing } from "@/i18n/routing";
import { localizedRoutes } from "@/lib/localized-routes";
import type { SiteLocale } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  return generatePrivacyPageMetadata(locale as SiteLocale);
}

export default async function ConfidentialitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  if (locale === "en") {
    permanentRedirect(localizedRoutes.privacy.en);
  }

  return <PrivacyPolicyContent locale="fr" />;
}
