import type { Metadata } from "next";
import { legal } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/templates/LegalPage";

export const metadata: Metadata = pageMetadata({ title: legal.terms.title, description: legal.terms.metaDescription, path: "/terms" });

export default function TermsPage() {
  return <LegalPage doc={legal.terms} />;
}
