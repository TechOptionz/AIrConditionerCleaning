import { Check } from "lucide-react";
import { sectors, type SectorSlug } from "@/content/sectors";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
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
        variant="split"
        crumbs={[{ label: s.label }]}
        eyebrow={s.eyebrow}
        lines={lines}
        lead={s.lead}
        image={images.banners[slug]}
        actions={
          <Button href="/book" size="lg" arrow>
            {s.cta}
          </Button>
        }
      />

      <section className="pb-[clamp(56px,7vw,88px)] pt-[clamp(64px,9vw,112px)]">
        <div className="container-site grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <SectionHeading eyebrow={s.label} title={s.h2a} lead={s.bodyA} />
          </Reveal>
          <Stagger as="ul" className="m-0 list-none border-t border-line p-0">
            {s.points.map((pt, i) => (
              <StaggerItem as="li" key={pt.t} className="flex items-start gap-4 border-b border-line py-4">
                <span className="font-display text-[13px] font-bold tracking-[.1em] text-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                <p className="m-0 text-[15px] leading-[1.5]">
                  <strong className="font-semibold text-ink">{pt.t}</strong> {pt.b && <span className="text-body">{pt.b}</span>}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y border-y border-line bg-sky-50">
        <div className="container-site">
          <Reveal className="mb-[clamp(28px,4vw,40px)] flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <SectionHeading eyebrow="Systems" title={s.h2b} maxWidth="max-w-[520px]" />
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {s.chips.map((c) => (
                <li key={c} className="inline-flex h-9 items-center gap-2 rounded-md border border-line bg-white px-3 text-[13.5px] font-medium text-ink">
                  <span className="size-1.5 bg-blue-600" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
          {s.note && <p className="mb-6 max-w-[760px] text-[13px] leading-[1.55] text-muted">{s.note}</p>}
          <ServiceGrid items={units} columns={4} />
        </div>
      </section>

      <FaqSection items={s.faqs} eyebrow="Questions" title="Common questions" id="h-sector-faq" bg="none" link={{ label: "Visit the help centre", href: "/faq" }} />
      <QuoteCTA />
      <JsonLd data={[faqJsonLd(s.faqs), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: s.label, path: `/${slug}` }])]} />
    </>
  );
}
