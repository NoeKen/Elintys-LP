import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import OrganizersShowcase from "@/app/components/organizers/OrganizersShowcase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "fr") {
    return {};
  }

  return buildPageMetadata(
    locale,
    "Organiser un événement avec Elintys | Accès bêta",
    "Découvrez comment Elintys centralise les lieux, les prestataires, la billetterie, les invités et l'accueil de vos événements.",
    "Découvrez comment Elintys centralise les lieux, les prestataires, la billetterie, les invités et l'accueil de vos événements.",
    { canonicalPath: "/fr/organisateurs", languages: { fr: "/fr/organisateurs", en: "/en/organizers" } }
  );
}

export default async function OrganisateursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "fr") {
    notFound();
  }

  setRequestLocale(locale);

  return <OrganizersShowcase locale="fr" />;
}
