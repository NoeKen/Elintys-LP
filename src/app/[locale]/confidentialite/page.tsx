import type { Metadata } from "next";
import LegalPageShell from "@/app/components/legal/LegalPageShell";
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

  const t = await getTranslations({ locale, namespace: "legal.privacyPolicy.metadata" });

  return buildPageMetadata(locale, t("title"), t("description"));
}

export default async function ConfidentialitePage({
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
  const t = await getTranslations({ locale, namespace: "legal.privacyPolicy" });
  const collectedHeaders = t.raw("sections.collectedData.headers") as string[];
  const collectedRows = t.raw("sections.collectedData.rows") as string[][];
  const processorHeaders = t.raw("sections.processors.headers") as string[];
  const processorRows = t.raw("sections.processors.rows") as string[][];
  const retentionItems = t.raw("sections.retention.items") as string[];
  const rightsHeaders = t.raw("sections.rights.headers") as string[];
  const rightsRows = t.raw("sections.rights.rows") as string[][];
  const securityItems = t.raw("sections.security.items") as string[];

  return (
    <LegalPageShell
      locale={locale}
      backLabel={legalT("backToHome")}
      title={t("title")}
      lastUpdated={t("lastUpdated")}
    >
          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">{t("sections.identity.title")}</h2>
            <p>
              {t("sections.identity.body")}
              <a
                href="mailto:contact@elintys.com"
                className="underline transition-colors hover:text-teal"
              >
                contact@elintys.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">
              {t("sections.collectedData.title")}
            </h2>
            <div className="mb-4 overflow-hidden rounded-lg border border-brand-border text-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-ink text-white">
                    {collectedHeaders.map((header) => (
                      <th key={header} className="px-4 py-3 text-left font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {collectedRows.map((row, index) => (
                    <tr key={row[0]} className={index % 2 === 0 ? "bg-white" : "bg-brand-bg"}>
                      <td className="px-4 py-3 font-medium">{row[0]}</td>
                      <td className="px-4 py-3">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>{t("sections.collectedData.footnote")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">{t("sections.purposes.title")}</h2>
            <ul className="mb-3 list-disc space-y-1 pl-5">
              {(t.raw("sections.purposes.items") as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{t("sections.purposes.body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">{t("sections.legalBasis.title")}</h2>
            <p>{t("sections.legalBasis.body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">{t("sections.processors.title")}</h2>
            <div className="mb-4 overflow-hidden rounded-lg border border-brand-border text-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-ink text-white">
                    {processorHeaders.map((header) => (
                      <th key={header} className="px-4 py-3 text-left font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {processorRows.map((row, index) => (
                    <tr key={row[0]} className={index % 2 === 0 ? "bg-white" : "bg-brand-bg"}>
                      <td className="px-4 py-3 font-medium">{row[0]}</td>
                      <td className="px-4 py-3">
                        {row[1]}{" "}
                        <a
                          href={row[2]}
                          className="underline transition-colors hover:text-teal"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {row[3]}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>{t("sections.processors.body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">{t("sections.retention.title")}</h2>
            <p className="mb-2">{t("sections.retention.intro")}</p>
            <ul className="list-disc space-y-1 pl-5">
              {retentionItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">{t("sections.rights.title")}</h2>
            <div className="mb-4 overflow-hidden rounded-lg border border-brand-border text-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-ink text-white">
                    {rightsHeaders.map((header) => (
                      <th key={header} className="px-4 py-3 text-left font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rightsRows.map((row, index) => (
                    <tr key={row[0]} className={index % 2 === 0 ? "bg-white" : "bg-brand-bg"}>
                      <td className="px-4 py-3 font-medium">{row[0]}</td>
                      <td className="px-4 py-3">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              {t("sections.rights.beforeEmail")}
              <a
                href="mailto:contact@elintys.com"
                className="underline transition-colors hover:text-teal"
              >
                contact@elintys.com
              </a>
              {t("sections.rights.afterEmail")}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">{t("sections.security.title")}</h2>
            <ul className="list-disc space-y-1 pl-5">
              {securityItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">{t("sections.cookies.title")}</h2>
            <p>{t("sections.cookies.body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">{t("sections.changes.title")}</h2>
            <p>{t("sections.changes.body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-teal">{t("sections.contact.title")}</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                {t("sections.contact.emailLabel")}
                <a
                  href="mailto:contact@elintys.com"
                  className="underline transition-colors hover:text-teal"
                >
                  contact@elintys.com
                </a>
              </li>
              <li>
                {t("sections.contact.complaintPrefix")}
                <a
                  href={t("sections.contact.complaintLinkHref")}
                  className="underline transition-colors hover:text-teal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("sections.contact.complaintLinkLabel")}
                </a>
              </li>
            </ul>
          </section>
    </LegalPageShell>
  );
}
