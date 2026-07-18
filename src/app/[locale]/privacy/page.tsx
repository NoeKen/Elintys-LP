import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PrivacyPolicyContent,
  generatePrivacyPageMetadata,
} from "@/app/components/legal/LegalContentPages";

export async function generateMetadata(): Promise<Metadata> {
  return generatePrivacyPageMetadata("en");
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== "en") {
    notFound();
  }

  return <PrivacyPolicyContent locale="en" />;
}
