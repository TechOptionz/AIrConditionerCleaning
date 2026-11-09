import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Home } from "lucide-react";
import { sectors, type SectorSlug } from "@/content/sectors";
import { images } from "@/content/images";
import { sectorsSection } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";

const ORDER: SectorSlug[] = ["residential", "commercial"];
const ICONS = { residential: Home, commercial: Building2 };

/** "Where we work": two tall photographic tiles with a quiet helper row underneath. */
export function Sectors() {
  return (
    <section aria-labelledby="h-sectors" className="section-y">
      <div className="container-site">
        <SectionHeading id="h-sectors" variant="split" eyebrow={sectorsSection.eyebrow} title={sectorsSection.title} lead="Household split systems, ducted set-ups and commercial ceiling units are each approached differently. Choose where the work is." className="mb-[clamp(28px,4vw,44px)]" />
        <Stagger className="grid gap-5 md:grid-cols-2">
          {ORDER.map((slug) => {
            const s = sectors[slug];
            const img = images.sectors[slug];
            const Icon = ICONS[slug];
            return (
              <StaggerItem key={slug}>
                <Link href={`/${slug}`} className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-lg bg-navy-900 p-[clamp(22px,3vw,36px)] text-white no-underline sm:aspect-[16/10]">
                  <Image src={img.src} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" style={{ objectPosition: img.focal }} />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-950/92 via-navy-950/45 to-navy-950/10" aria-hidden="true" />
                  <span className="absolute left-0 top-0 h-full w-1 bg-blue-600 transition-[width] duration-300 group-hover:w-1.5" aria-hidden="true" />
                  <span className="relative inline-flex items-center gap-2 eyebrow text-blue-300">
                    <Icon className="size-4" aria-hidden="true" />
                    {s.label}
                  </span>
                  <h3 className="relative mt-3 font-display text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] font-extrabold leading-[1.1] tracking-[-.02em] text-white">{s.homeTitle}</h3>
                  <p className="relative mt-2 max-w-[42ch] text-[14.5px] leading-[1.55] text-white/80">{s.homeBody}</p>
                  <span className="relative mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-white">
                    {s.homeCta}
                    <ArrowRight className="size-4 transition-transform duration-250 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-lg border border-line bg-sky-50 px-6 py-4">
          <p className="m-0 max-w-[60ch] text-[14.5px] leading-[1.55] text-body">{sectorsSection.helper}</p>
          <Button href={sectorsSection.helperCta.href} variant="outline" size="sm" arrow>
            {sectorsSection.helperCta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
