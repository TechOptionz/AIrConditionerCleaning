import type { Metadata } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { homeFaqs } from "@/content/faqs";
import { servicesSection, beforeAfterSection, faqSection } from "@/content/home";
import { pageMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { SectorsSticky } from "@/components/sections/SectorsSticky";
import { ProcessSticky } from "@/components/sections/ProcessSticky";
import { PackagesTeaser } from "@/components/sections/Packages";
import { WhyUs } from "@/components/sections/WhyUs";
import { Gallery } from "@/components/sections/Gallery";
import { BeforeAfterGrid } from "@/components/sections/BeforeAfter";
import { Signs } from "@/components/sections/Signs";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { FaqSection } from "@/components/sections/FaqSection";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = pageMetadata({
  title: `Air Conditioning Cleaning & Servicing | ${site.name}`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />

      <section aria-labelledby="h-services" className="section-y-lg">
        <div className="container-site">
          <SectionHeading
            id="h-services"
            eyebrow={servicesSection.eyebrow}
            title={servicesSection.title}
            lead={servicesSection.lead}
            action={
              <Button href={servicesSection.cta.href} variant="outline" arrow>
                {servicesSection.cta.label}
              </Button>
            }
            className="mb-[clamp(32px,4vw,48px)]"
          />
          <ServiceGrid items={services} />
        </div>
      </section>

      <SectorsSticky />
      <ProcessSticky />
      <PackagesTeaser />
      <WhyUs />
      <Gallery />

      <section aria-labelledby="h-before-after" className="section-y bg-cream-100">
        <div className="container-site">
          <SectionHeading id="h-before-after" eyebrow={beforeAfterSection.eyebrow} title={beforeAfterSection.title} lead={beforeAfterSection.lead} className="mb-[clamp(28px,4vw,40px)]" />
          <BeforeAfterGrid pairs={images.beforeAfter} />
        </div>
      </section>

      <Signs />
      <ServiceAreas />

      <FaqSection items={homeFaqs} eyebrow={faqSection.eyebrow} title={faqSection.title} link={faqSection.cta} />

      <Reveal>
        <div className="h-0" />
      </Reveal>
      <QuoteCTA />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
