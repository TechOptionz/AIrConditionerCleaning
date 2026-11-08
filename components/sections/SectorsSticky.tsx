"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useInView } from "motion/react";
import { ArrowRight, Building2, Home } from "lucide-react";
import { sectors, type SectorSlug } from "@/content/sectors";
import { images } from "@/content/images";
import { sectorsSection } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ORDER: SectorSlug[] = ["residential", "commercial"];
const ICONS = { residential: Home, commercial: Building2 };

function TrackedCard({ slug, index, active, onActive }: { slug: SectorSlug; index: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  const s = sectors[slug];
  const Icon = ICONS[slug];
  return (
    <Reveal as="div" index={index + 1}>
      <Link
        ref={ref}
        href={`/${slug}`}
        className={cn("group flex flex-col border-l-2 pl-[clamp(20px,3vw,32px)] text-ink no-underline transition-colors duration-500", active ? "border-teal-600" : "border-line")}
      >
        <div className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase leading-none tracking-[.14em] text-teal-600">
          <Icon className="size-4" aria-hidden="true" />
          {s.label}
        </div>
        <h3 className="display-3 mt-3">{s.homeTitle}</h3>
        <p className="mt-2.5 leading-[1.6] text-body">{s.homeBody}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold leading-none text-teal-600">
          {s.homeCta}
          <ArrowRight className="size-4 transition-transform duration-250 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </Link>
    </Reveal>
  );
}

/** "Where we work": a sticky 4:5 image panel that crossfades Residential ↔ Commercial as the text blocks pass. */
export function SectorsSticky() {
  const [active, setActive] = useState(0);
  return (
    <section aria-labelledby="h-sectors" className="section-y bg-cream-100">
      <div className="container-site">
        <SectionHeading id="h-sectors" eyebrow={sectorsSection.eyebrow} title={sectorsSection.title} align="center" className="mb-[clamp(32px,4vw,48px)]" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-[clamp(32px,5vw,72px)]">
          <div className="md:sticky md:top-[104px]">
            <ClipReveal radius={28} className="aspect-[4/5] max-h-[min(calc(100vh-140px),640px)] w-full bg-navy-900">
              {ORDER.map((slug, i) => (
                <div key={slug} className={cn("absolute inset-0 transition-[opacity,transform] duration-700 ease-out", active === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0")} aria-hidden={active !== i}>
                  <Image src={images.sectors[slug].src} alt={images.sectors[slug].alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: images.sectors[slug].focal }} />
                </div>
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-b from-transparent to-navy-950/75 p-6">
                <span className="rounded-full bg-teal-600/90 px-3 py-[9px] text-[12px] font-semibold uppercase leading-none tracking-[.14em] text-white">{sectors[ORDER[active]].label}</span>
                <span className="flex gap-1.5">
                  {ORDER.map((slug, i) => (
                    <span key={slug} className={cn("h-1 w-7 rounded-full transition-colors duration-300", active === i ? "bg-teal-300" : "bg-white/35")} />
                  ))}
                </span>
              </div>
            </ClipReveal>
          </div>

          <div className="flex flex-col gap-[clamp(40px,8vh,96px)] py-[clamp(0px,4vh,40px)]">
            {ORDER.map((slug, i) => (
              <TrackedCard key={slug} slug={slug} index={i} active={active === i} onActive={setActive} />
            ))}
            <Reveal index={1} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-xl border border-line bg-white px-6 py-[22px] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-teal-600 hover:shadow-lift">
              <p className="m-0 max-w-[40ch] leading-[1.55] text-body">{sectorsSection.helper}</p>
              <Button href={sectorsSection.helperCta.href} variant="tint" size="sm">
                {sectorsSection.helperCta.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
