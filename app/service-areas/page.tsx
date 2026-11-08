import type { Metadata } from "next";
import { MapPin, MessageSquare } from "lucide-react";
import { areasPage, verifiedAreas } from "@/content/areas";
import { images } from "@/content/images";
import { services } from "@/content/services";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { AreaCheckForm } from "@/components/forms/AreaCheckForm";
import { HeroUp } from "@/components/motion/HeroText";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = pageMetadata({
  title: "Service Areas",
  description: areasPage.metaDescription,
  path: "/service-areas",
  image: images.banners.areas.src,
});

export default function ServiceAreasPage() {
  const verified = verifiedAreas();
  return (
    <>
      <PageBanner crumbs={[{ label: "Service areas" }]} eyebrow={areasPage.eyebrow} lines={["Find air-conditioning", "service near you"]} lead={areasPage.lead} image={images.banners.areas} size="md">
        <HeroUp delay={0.55} className="mt-8 max-w-[560px]">
          <AreaCheckForm tone="dark" />
        </HeroUp>
      </PageBanner>

      <section aria-labelledby="h-where" className="section-y">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-[clamp(32px,5vw,72px)]">
          <Reveal>
            <h2 id="h-where" className="display-2 text-ink">
              {areasPage.h2}
            </h2>
            {verified.length ? (
              <p className="lead mt-4 max-w-[56ch] text-body">We currently work across the regions listed. Availability can vary by service type, so include your suburb in any request.</p>
            ) : (
              <>
                <p className="lead mt-4 max-w-[56ch] text-body">{areasPage.pendingBody}</p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-cream-100 px-3.5 py-2.5 font-mono text-[12.5px] text-muted">
                  <MapPin className="size-4 text-teal-600" aria-hidden="true" />
                  [VERIFIED CITIES AND SUBURBS ONLY]
                </p>
              </>
            )}
          </Reveal>
          <div>
            {verified.length ? (
              <Stagger as="ul" className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4 p-0">
                {verified.map((a) => (
                  <StaggerItem as="li" key={a.name} className="rounded-xl border border-line bg-white p-6">
                    <h3 className="m-0 flex items-center gap-2 text-[17px] font-semibold text-ink">
                      <MapPin className="size-4 text-teal-600" aria-hidden="true" />
                      {a.name}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-[1.6] text-body">{a.places.join(" · ")}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <Reveal index={1} className="rounded-xl border border-line bg-white p-7">
                <div className="grid size-12 place-items-center rounded-md bg-teal-50">
                  <MessageSquare className="size-[22px] text-teal-600" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-[20px] font-bold leading-[1.25] tracking-[-.01em] text-ink">{areasPage.emptyTitle}</h3>
                <p className="mt-3 leading-[1.6] text-body">{areasPage.emptyBody}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button href="/book" arrow>
                    Send a request
                  </Button>
                  <Button href="/contact" variant="outline">
                    Ask a question
                  </Button>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="h-area-services" className="section-y bg-cream-100">
        <div className="container-site">
          <Reveal>
            <h2 id="h-area-services" className="display-2 mb-[clamp(28px,4vw,40px)] text-ink">
              Services available by request
            </h2>
          </Reveal>
          <ServiceGrid items={services} />
        </div>
      </section>

      <div className="pt-[clamp(64px,8vw,96px)]">
        <QuoteCTA />
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Service areas", path: "/service-areas" }])} />
    </>
  );
}
