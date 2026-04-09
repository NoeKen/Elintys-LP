import { notFound } from "next/navigation";
import { I18nProvider } from "@/contexts/I18nContext";
import { getDictionary, isValidLocale, locales, type SiteLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getDictionary(locale as SiteLocale);

  return (
    <I18nProvider locale={locale as SiteLocale} messages={messages}>
      {children}
    </I18nProvider>
  );
}
