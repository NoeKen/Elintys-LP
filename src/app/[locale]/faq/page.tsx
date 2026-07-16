import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import FaqPageContent from "@/app/components/landing/FaqPageContent";
import { JsonLd, faqPageJsonLd } from "@/app/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "faqPage.metadata" });

  return buildPageMetadata(locale, t("title"), t("description"), t("description"), {
    routeKey: "faq",
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faqPage" });
  const items = t.raw("items") as [string, string][];
  const currentLocale = locale === "en" ? "en" : "fr";

  return (
    <>
      <JsonLd data={faqPageJsonLd(items, currentLocale)} />
      <FaqPageContent
        locale={currentLocale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        items={items}
      />
    </>
  );
}
