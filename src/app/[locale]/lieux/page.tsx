import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import VenuesShowcase from "@/app/components/venues/VenuesShowcase";

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
    "Plateforme pour lieux et espaces événementiels | Elintys",
    "Présentez votre espace, ses capacités, ses services et recevez des demandes événementielles mieux contextualisées.",
    "Présentez votre espace, ses capacités, ses services et recevez des demandes événementielles mieux contextualisées.",
    { routeKey: "venues" }
  );
}

export default async function LieuxPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "fr") {
    notFound();
  }

  setRequestLocale(locale);

  return <VenuesShowcase locale="fr" />;
}
