import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { faqs } from "@/content/faqs";
import { images } from "@/content/images";
import { pageMetadata, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { FaqTabs } from "@/components/sections/FaqTabs";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description: "Straight answers about air-conditioning cleaning, pricing, booking requests and aftercare from Northline Air Care.",
  path: "/faq",
  image: images.banners.faq.src,
});

export default function FaqPage() {
  const all = Object.values(faqs).flat();
  return (
    <>
      <PageBanner crumbs={[{ label: "FAQ" }]} eyebrow="Help centre" lines={["Frequently asked", "questions"]} lead="Straight answers about cleaning, pricing, booking and aftercare. Still unsure? Send us a message." />
      <section className="section-y">
        <div className="container-site grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal>
            <FaqTabs />
          </Reveal>
          <Reveal index={1} className="rounded-lg border border-line bg-sky-50 p-6 lg:sticky lg:top-28">
            <IconTile size="md">
              <MessageCircle strokeWidth={1.8} aria-hidden="true" />
            </IconTile>
            <h2 className="m-0 mt-4 font-display text-[19px] font-bold leading-[1.3] text-ink">Didn&apos;t find your answer?</h2>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-body">Describe your air conditioner and what you&apos;ve noticed. We&apos;ll point you to the right next step.</p>
            <Button href="/contact" size="sm" className="mt-5" arrow>
              Ask a question
            </Button>
          </Reveal>
        </div>
      </section>
      <QuoteCTA title="Still have a question?" lead="Describe your air conditioner and what you've noticed. We'll point you to the right next step." />
      <JsonLd data={[faqJsonLd(all), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])]} />
    </>
  );
}
