import { Check } from "lucide-react";
import { sectors, type SectorSlug } from "@/content/sectors";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ServicePhotoGrid } from "@/components/sections/ServiceGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

/** Shared template for /residential and /commercial. */
export function SectorPage({ slug }: { slug: SectorSlug }) {
  const s = sectors[slug];
  const units = s.units.map((u) => services.find((x) => x.slug === u)!).filter(Boolean);
  const h1Words = s.h1.split(" ");
  const mid = Math.ceil(h1Words.length / 2);
  const lines = [h1Words.slice(0, mid).join(" "), h1Words.slice(mid).join(" ")];

  return (
    <>
      <PageBanner
        crumbs={[{ label: s.label }]}
        eyebrow={s.eyebrow}
        lines={lines}
        lead={s.lead}
        image={images.banners[slug]}
        actions={
          <Button href="/book" size="lg" className="!h-[52px]" arrow>
            {s.cta}
          </Button>
        }
      />

      <section className="section-y">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-[clamp(32px,5vw,72px)]">
          <Reveal>
            <h2 className="display-2 text-ink">{s.h2a}</h2>
            <p className="lead mt-4 max-w-[56ch] text-body">{s.bodyA}</p>
          </Reveal>
          <Stagger className="flex flex-col gap-3">
            {s.points.map((pt) => (
              <StaggerItem key={pt.t} className="flex items-start gap-3.5 rounded-lg border border-line bg-white px-5 py-[18px] transition-[transform,border-color,box-shadow] duration-300 hover:translate-x-1.5 hover:border-teal-600 hover:shadow-[0_12px_30px_rgba(16,24,40,.08)]">
                <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-teal-50">
                  <Check className="size-3.5 text-teal-600" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <p className="m-0 leading-[1.5]">
                  <strong className="text-ink">{pt.t}</strong> {pt.b && <span className="text-body">{pt.b}</span>}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y bg-cream-100">
        <div className="container-site">
          <Reveal>
            <h2 className="display-2 mb-3 text-ink">{s.h2b}</h2>
            {s.note && <p className="mb-4 max-w-[720px] text-[13px] leading-[1.5] text-muted">{s.note}</p>}
            <ul className="m-0 mb-7 flex list-none flex-wrap gap-2.5 p-0">
              {s.chips.map((c) => (
                <li key={c} className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2.5 text-[15px] font-medium text-ink">
                  <span className="size-2 rounded-full bg-teal-600" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
          <ServicePhotoGrid items={units} />
        </div>
      </section>

      <div className="pt-[clamp(64px,8vw,96px)]">
        <FaqSection items={s.faqs} title="Common questions" size="md" bg="none" id="h-sector-faq" />
      </div>
      <QuoteCTA />
      <JsonLd data={[faqJsonLd(s.faqs), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: s.label, path: `/${slug}` }])]} />
    </>
  );
}
