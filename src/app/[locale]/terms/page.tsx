import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  TermsContent,
  generateTermsPageMetadata,
} from "@/app/components/legal/LegalContentPages";

export async function generateMetadata(): Promise<Metadata> {
  return generateTermsPageMetadata("en");
}

export default async function TermsRoutePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== "en") {
    notFound();
  }

  return <TermsContent locale="en" />;
}
