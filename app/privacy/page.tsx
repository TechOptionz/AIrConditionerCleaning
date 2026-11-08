import type { Metadata } from "next";
import { legal } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/templates/LegalPage";

export const metadata: Metadata = pageMetadata({ title: legal.privacy.title, description: legal.privacy.metaDescription, path: "/privacy" });

export default function PrivacyPage() {
  return <LegalPage doc={legal.privacy} />;
}
