import type { Metadata } from "next";
import LegalPageShell from "@/app/components/legal/LegalPageShell";
import Link from "next/link";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
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

  const t = await getTranslations({ locale, namespace: "legal.terms.metadata" });

  return buildPageMetadata(locale, t("title"), t("description"));
}

export default async function ConditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const legalT = await getTranslations({ locale, namespace: "legal" });
  const t = await getTranslations({ locale, namespace: "legal.terms" });
  const commitmentItems = t.raw("sections.commitments.items") as string[];
  const elintysCommitments = t.raw("sections.elintysCommitments.items") as string[];

  return (
    <LegalPageShell
      locale={locale}
      backLabel={legalT("backToHome")}
      title={t("title")}
      lastUpdated={t("lastUpdated")}
    >
          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">{t("sections.purpose.title")}</h2>
            <p>{t("sections.purpose.body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">
              {t("sections.serviceNature.title")}
            </h2>
            <p>{t("sections.serviceNature.body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">
              {t("sections.commitments.title")}
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              {commitmentItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">
              {t("sections.elintysCommitments.title")}
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                {elintysCommitments[0]}{" "}
                <Link
                  href={`/${locale}/confidentialite`}
                  className="underline transition-colors hover:text-teal"
                >
                  {t("sections.elintysCommitments.privacyLinkLabel")}
                </Link>
              </li>
              {elintysCommitments.slice(1).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">
              {t("sections.intellectualProperty.title")}
            </h2>
            <p>{t("sections.intellectualProperty.body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">{t("sections.liability.title")}</h2>
            <p>{t("sections.liability.body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">
              {t("sections.governingLaw.title")}
            </h2>
            <p>{t("sections.governingLaw.body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">{t("sections.changes.title")}</h2>
            <p>{t("sections.changes.body")}</p>
          </section>
    </LegalPageShell>
  );
}
