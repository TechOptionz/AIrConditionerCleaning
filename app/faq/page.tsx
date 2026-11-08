import type { Metadata } from "next";
import { faqs } from "@/content/faqs";
import { images } from "@/content/images";
import { pageMetadata, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { FaqTabs } from "@/components/sections/FaqTabs";
import { Reveal } from "@/components/motion/Reveal";
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
      <PageBanner crumbs={[{ label: "FAQ" }]} eyebrow="Help centre" lines={["Frequently asked", "questions"]} lead="Straight answers about cleaning, pricing, booking and aftercare. Still unsure? Send us a message." image={images.banners.faq} size="md" />
      <section className="py-[clamp(48px,6vw,80px)]">
        <div className="container-narrow">
          <Reveal>
            <FaqTabs />
          </Reveal>
        </div>
      </section>
      <QuoteCTA title="Still have a question?" lead="Describe your air conditioner and what you've noticed. We'll point you to the right next step." />
      <JsonLd data={[faqJsonLd(all), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])]} />
    </>
  );
}
