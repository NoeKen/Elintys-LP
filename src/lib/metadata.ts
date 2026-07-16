import type { Metadata } from "next";
import { absoluteUrl, siteConfig, type SiteLocale } from "@/config/site";
import {
  getLocalizedRouteAlternates,
  type LocalizedRouteKey,
} from "@/lib/localized-routes";

export function getOpenGraphLocale(locale: string) {
  return locale === "fr" ? "fr_CA" : "en_CA";
}

interface PageMetadataOptions {
  routeKey?: LocalizedRouteKey;
  canonicalPath?: string;
  languages?: Record<string, string>;
  imageAlt?: string;
}

export function buildPageMetadata(
  locale: SiteLocale,
  title: string,
  description: string,
  twitterDescription = description,
  options: PageMetadataOptions = {}
): Metadata {
  const routeAlternates = options.routeKey ? getLocalizedRouteAlternates(options.routeKey) : null;
  const canonical = options.routeKey
    ? routeAlternates?.canonicalByLocale[locale]
    : options.canonicalPath
      ? absoluteUrl(options.canonicalPath)
      : undefined;
  const languages = options.routeKey
    ? routeAlternates?.languages
    : options.languages
      ? Object.fromEntries(
          Object.entries(options.languages).map(([language, path]) => [language, absoluteUrl(path)])
        )
      : undefined;
  const imageUrl = absoluteUrl(siteConfig.ogImagePath);
  const imageAlt = options.imageAlt ?? `${siteConfig.name} social sharing image`;

  return {
    title,
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "event technology",
    robots: { index: true, follow: true },
    alternates: canonical
      ? {
          canonical,
          languages,
        }
      : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      locale: getOpenGraphLocale(locale),
      alternateLocale: locale === "fr" ? "en_CA" : "fr_CA",
      siteName: siteConfig.name,
      url: canonical,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: twitterDescription,
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
  };
}
