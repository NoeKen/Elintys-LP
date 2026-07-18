import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import ProvidersShowcase from "@/app/components/providers/ProvidersShowcase";

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
    "Plateforme pour prestataires événementiels | Elintys",
    "Présentez vos services et soyez découvert par des organisateurs à la recherche de prestataires événementiels.",
    "Présentez vos services et soyez découvert par des organisateurs à la recherche de prestataires événementiels.",
    { routeKey: "providers" }
  );
}

export default async function PrestatairesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "fr") {
    notFound();
  }

  setRequestLocale(locale);

  return <ProvidersShowcase locale="fr" />;
}
