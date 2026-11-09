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
import { Button, ArrowLink } from "@/components/ui/Button";
import { SectionHeading, IconTile } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = pageMetadata({
  title: "Air Conditioning Cleaning Services",
  description: "Explore air-conditioning cleaning options for Australian homes and businesses. Find your system type and request an appointment.",
  path: "/services",
  image: images.banners.services.src,
});

const helpers = [
  { icon: HelpCircle, title: "Not sure which clean you need?", body: "Describe your air conditioner, any symptoms and how long it has been since its last service. We can help you identify which option to enquire about.", cta: { label: "Help me choose", href: "/book" } },
  { icon: ListChecks, title: "What happens during a service?", body: "The work varies by equipment and agreed scope. Our process starts with identifying your system, discussing access and clarifying the service before it begins.", cta: { label: "How we work", href: "/about" } },
  { icon: AlertTriangle, title: "Need more than cleaning?", body: "If your air conditioner is not operating correctly, cleaning alone may not resolve the issue. Describe the symptoms and we'll explain what a cleaning visit can and can't address.", cta: { label: "Read the FAQ", href: "/faq" } },
];

export default function ServicesPage() {
  const indoor = services.filter((s) => s.slug !== "outdoor-condenser-cleaning");
  const outdoor = services.filter((s) => s.slug === "outdoor-condenser-cleaning");
  return (
    <>
      <PageBanner
        variant="split"
        crumbs={[{ label: "Services" }]}
        eyebrow="Our air conditioning services"
        lines={["The right care for", "your system"]}
        lead="Explore cleaning and maintenance options by unit type. If you're unsure which option applies, describe your system in your enquiry and we'll help direct the request."
        image={images.banners.services}
        actions={
          <>
            <Button href="/book" size="lg" arrow>
              Request a Quote
            </Button>
            <Button href="/faq" size="lg" variant="outline">
              Read the FAQ
            </Button>
          </>
        }
      />

      <section aria-labelledby="h-find" className="pb-[clamp(56px,7vw,88px)] pt-[clamp(64px,9vw,112px)]">
        <div className="container-site">
          <SectionHeading id="h-find" eyebrow="Indoor units" title="Find your system" lead="Wall-mounted, ducted and ceiling units each need a different approach. Choose the one that matches what you can see." className="mb-[clamp(28px,4vw,44px)]" />
          <ServiceGrid items={indoor} columns={4} />

          <div className="mt-[clamp(40px,5vw,64px)] grid items-center gap-6 border-t border-line pt-[clamp(32px,4vw,48px)] lg:grid-cols-[1fr_2fr]">
            <SectionHeading eyebrow="Outdoor unit" title="The other half of the system" lead="Condensers collect leaves, dirt and weather. Cleaning must be done safely around electrical parts and delicate fins." size="md" />
            <ServiceGrid items={outdoor} columns={3} className="lg:grid-cols-2" />
          </div>
        </div>
      </section>

      <section aria-label="Helpful information" className="section-y border-y border-line bg-sky-50">
        <div className="container-site">
          <Stagger className="grid gap-x-10 gap-y-8 md:grid-cols-3">
            {helpers.map((h) => (
              <StaggerItem key={h.title} className="relative flex flex-col border-t-2 border-blue-600 pt-6">
                <IconTile size="md">
                  <h.icon strokeWidth={1.8} aria-hidden="true" />
                </IconTile>
                <h2 className="mt-5 font-display text-[18px] font-bold leading-[1.3] tracking-[-.01em] text-ink">{h.title}</h2>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.65] text-body">{h.body}</p>
                <ArrowLink href={h.cta.href} className="mt-5">
                  {h.cta.label}
                </ArrowLink>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <QuoteCTA title={closingCta.services.title} lead={closingCta.services.lead} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
    </>
  );
}
