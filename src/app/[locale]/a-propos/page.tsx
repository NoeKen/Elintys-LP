import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import AboutPageContent from "@/app/components/landing/AboutPageContent";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return [{ locale: "fr" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "fr") {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "aboutPage.metadata" });

  return buildPageMetadata(locale, t("title"), t("description"), t("description"), {
    routeKey: "about",
  });
}

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale) || locale !== "fr") {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return (
    <AboutPageContent
      eyebrow={t("eyebrow")}
      title={t("title")}
      intro={t("intro")}
      sections={t.raw("sections") as { title: string; body: string }[]}
      ctaTitle={t("ctaTitle")}
      ctaBody={t("ctaBody")}
    />
  );
}
