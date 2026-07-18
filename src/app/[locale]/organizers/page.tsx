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

  if (!hasLocale(routing.locales, locale) || locale !== "en") {
    return {};
  }

  return buildPageMetadata(
    locale,
    "Event organizer platform | Elintys",
    "See how Elintys brings venues, providers, ticketing, guests, and event-day check-in into one connected workspace.",
    "See how Elintys brings venues, providers, ticketing, guests, and event-day check-in into one connected workspace.",
    { routeKey: "organizers" }
  );
}

export default async function OrganizersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "en") {
    notFound();
  }

  setRequestLocale(locale);

  return <OrganizersShowcase locale="en" />;
}
