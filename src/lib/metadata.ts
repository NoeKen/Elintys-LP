import type { Metadata } from "next";

export function getOpenGraphLocale(locale: string) {
  return locale === "fr" ? "fr_CA" : "en_CA";
}

export function buildPageMetadata(
  locale: string,
  title: string,
  description: string,
  twitterDescription = description
): Metadata {
  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      locale: getOpenGraphLocale(locale),
      siteName: "Elintys",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: twitterDescription,
    },
  };
}

