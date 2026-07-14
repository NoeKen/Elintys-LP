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

  if (!hasLocale(routing.locales, locale) || locale !== "en") {
    return {};
  }

  return buildPageMetadata(
    locale,
    "List an event venue | Elintys",
    "Present your space, capacities, services, and receive better contextualized event requests.",
    "Present your space, capacities, services, and receive better contextualized event requests.",
    { canonicalPath: "/en/venues", languages: { fr: "/fr/lieux", en: "/en/venues" } }
  );
}

export default async function VenuesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "en") {
    notFound();
  }

  setRequestLocale(locale);

  return <VenuesShowcase locale="en" />;
}
