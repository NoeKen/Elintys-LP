import Link from "next/link";
import type { ReactNode } from "react";

interface LegalPageShellProps {
  locale: string;
  backLabel: string;
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalPageShell({
  locale,
  backLabel,
  title,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href={`/${locale}`}
          className="mb-8 inline-block text-sm text-brand-mid transition-colors hover:text-teal"
        >
          {backLabel}
        </Link>

        <h1 className="mb-2 text-3xl font-semibold text-ink">{title}</h1>
        <p className="mb-12 text-sm text-brand-soft">{lastUpdated}</p>

        <div className="space-y-10 leading-relaxed text-brand-mid">{children}</div>
      </div>
    </div>
  );
}

