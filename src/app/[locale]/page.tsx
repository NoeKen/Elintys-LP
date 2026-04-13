import CTAFinal from "@/app/components/landing/CTAFinal";
import FAQ from "@/app/components/landing/FAQ";
import Hero from "@/app/components/landing/Hero";
import Marquee from "@/app/components/landing/Marquee";
import Problem from "@/app/components/landing/Problem";
import SocialProof from "@/app/components/landing/SocialProof";
import Solution from "@/app/components/landing/Solution";
import WhyNow from "@/app/components/landing/WhyNow";
import { buildPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return buildPageMetadata(locale, t("title"), t("description"), t("twitterDescription"));
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Marquee />
      <Problem />
      <Solution />
      <SocialProof />
      <WhyNow />
      <FAQ />
      <CTAFinal />
    </>
  );
}
