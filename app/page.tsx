import type { Metadata } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { homeFaqs } from "@/content/faqs";
import { servicesSection, processSection, faqSection } from "@/content/home";
import { pageMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/Button";
import { Airflow } from "@/components/ui/Accents";
import { Reveal } from "@/components/motion/Reveal";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid, ServiceLinkRow } from "@/components/sections/ServiceGrid";
import { AboutSplit } from "@/components/sections/AboutSplit";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { BeforeAfterSection } from "@/components/sections/BeforeAfter";
import { Sectors } from "@/components/sections/Sectors";
import { Gallery } from "@/components/sections/Gallery";
import { Signs } from "@/components/sections/Signs";
import { FaqSection } from "@/components/sections/FaqSection";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = pageMetadata({
  title: `Air Conditioning Cleaning & Servicing | ${site.name}`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  const featured = servicesSection.featured.map((slug) => services.find((s) => s.slug === slug)!).filter(Boolean);
  const others = services.filter((s) => !(servicesSection.featured as readonly string[]).includes(s.slug));

  return (
    <>
      <Hero />

      {/* Services: four featured photo cards + compact links to the rest */}
      <section aria-labelledby="h-services" className="pb-[clamp(56px,7vw,88px)] pt-[clamp(56px,7vw,96px)]">
        <div className="container-site">
          <SectionHeading
            id="h-services"
            variant="split"
            eyebrow={servicesSection.eyebrow}
            title={servicesSection.title}
            lead={servicesSection.lead}
            action={<ArrowLink href={servicesSection.cta.href}>{servicesSection.cta.label}</ArrowLink>}
            className="mb-[clamp(28px,4vw,44px)]"
          />
          <ServiceGrid items={featured} />
          <Reveal className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
            <span className="text-[13.5px] font-semibold text-muted">Also:</span>
            <ServiceLinkRow items={others} />
          </Reveal>
        </div>
      </section>

      <AboutSplit />

      {/* Process */}
      <section aria-labelledby="h-process" className="section-y-lg relative overflow-hidden border-b border-line">
        <Airflow className="-left-[10%] top-1/2 h-[260px] w-[120%] -translate-y-1/2 opacity-70 lg:top-[62%]" />
        <div className="container-site relative">
          <SectionHeading id="h-process" variant="centered" eyebrow={processSection.eyebrow} title={processSection.title} lead={processSection.lead} className="mb-[clamp(36px,5vw,60px)]" />
          <ProcessTimeline steps={processSection.steps.map((st) => ({ title: st.title, body: st.body, icon: <st.icon strokeWidth={1.8} /> }))} />
        </div>
      </section>

      <BeforeAfterSection pair={images.beforeAfter[0]} />

      <Gallery />

      <Sectors />

      <Signs />

      <FaqSection items={homeFaqs} eyebrow={faqSection.eyebrow} title={faqSection.title} lead={faqSection.lead} link={faqSection.cta} />

      <QuoteCTA />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
