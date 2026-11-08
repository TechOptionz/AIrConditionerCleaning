import type { Metadata } from "next";
import { HelpCircle, ListChecks, AlertTriangle } from "lucide-react";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { closingCta } from "@/content/home";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = pageMetadata({
  title: "Air Conditioning Cleaning Services",
  description: "Explore air-conditioning cleaning options for Australian homes and businesses. Find your system type and request an appointment.",
  path: "/services",
  image: images.banners.services.src,
});

const helpers = [
  { icon: HelpCircle, title: "Not sure which clean you need?", body: "Describe your air conditioner, any symptoms and how long it has been since its last service. We can help you identify which option to enquire about.", cta: { label: "Help Me Choose", href: "/book" } },
  { icon: ListChecks, title: "What happens during a service?", body: "The work varies by equipment and agreed scope. Our process starts with identifying your system, discussing access and clarifying the service before it begins." },
  { icon: AlertTriangle, title: "Need more than cleaning?", body: "If your air conditioner is not operating correctly, cleaning alone may not resolve the issue. Describe the symptoms and we'll explain what a cleaning visit can and can't address." },
];

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        crumbs={[{ label: "Services" }]}
        eyebrow="Our air conditioning services"
        lines={["The right care for your", "air-conditioning system"]}
        lead="Explore cleaning and maintenance options by unit type. If you're unsure which option applies, describe your system in your enquiry and we'll help direct the request."
        image={images.banners.services}
        actions={
          <>
            <Button href="/book" size="lg" className="!h-[52px]" arrow>
              Request a Quote
            </Button>
            <Button href="/faq" size="lg" variant="outline-light" className="!h-[52px]">
              Read the FAQ
            </Button>
          </>
        }
      />

      <section aria-labelledby="h-find" className="section-y">
        <div className="container-site">
          <Reveal>
            <h2 id="h-find" className="display-2 mb-[clamp(28px,4vw,40px)] text-ink">
              Find your system
            </h2>
          </Reveal>
          <ServiceGrid items={services} />
        </div>
      </section>

      <section aria-label="Helpful information" className="section-y bg-cream-100">
        <div className="container-site">
          <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
            {helpers.map((h) => (
              <StaggerItem key={h.title} className="flex flex-col rounded-xl border border-line bg-white p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-teal-600 hover:shadow-lift">
                <div className="grid size-12 place-items-center rounded-md bg-teal-50">
                  <h.icon className="size-[22px] text-teal-600" aria-hidden="true" />
                </div>
                <h2 className="mt-5 font-display text-[20px] font-bold leading-[1.25] tracking-[-.01em] text-ink">{h.title}</h2>
                <p className="mt-3 flex-1 leading-[1.6] text-body">{h.body}</p>
                {h.cta && (
                  <Button href={h.cta.href} variant="tint" size="sm" className="mt-5 self-start">
                    {h.cta.label}
                  </Button>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <div className="pt-[clamp(64px,8vw,96px)]">
        <QuoteCTA title={closingCta.services.title} lead={closingCta.services.lead} />
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
    </>
  );
}
