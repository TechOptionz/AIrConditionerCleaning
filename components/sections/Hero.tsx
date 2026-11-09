"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/useReducedMotionSafe";
import { hero } from "@/content/home";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { HeroMedia, HeroUp, LineUp } from "@/components/motion/HeroText";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { cn } from "@/lib/utils";

/**
 * Photography-led homepage hero: one large technician photograph under a
 * left-weighted scrim, masked headline, two CTAs and a compact booking bar
 * that overlaps the bottom edge.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const photo = images.home.hero;

  return (
    <>
      <section aria-label="Introduction" className="relative isolate flex min-h-[min(82vh,760px)] items-center overflow-hidden bg-navy-900 pb-[clamp(96px,14vw,150px)] pt-[clamp(56px,8vw,96px)] text-white">
        <HeroMedia>
          <div className={cn("absolute inset-0", !reduce && "animate-kenburns")} style={{ transformOrigin: "70% 40%" }}>
            <Image src={photo.src} alt="" fill priority sizes="100vw" quality={82} className="object-cover" style={{ objectPosition: photo.focal }} />
          </div>
        </HeroMedia>
        <div className="hero-scrim pointer-events-none absolute inset-0" aria-hidden="true" />

        {/* Airflow lines: a quiet nod to the wave mark, bottom-right only. */}
        <svg className="pointer-events-none absolute -right-10 bottom-16 hidden w-[46vw] max-w-[760px] text-blue-300/40 lg:block" viewBox="0 0 760 220" fill="none" aria-hidden="true">
          <path d="M0 160 C 140 80, 260 240, 400 150 S 640 60, 760 130" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 10" className="animate-airflow" />
          <path d="M0 200 C 160 120, 280 270, 420 185 S 660 100, 760 170" stroke="currentColor" strokeWidth="1" strokeOpacity=".6" />
        </svg>

        <div className="container-site relative">
          <div className="max-w-[640px]">
            <HeroUp delay={0.08} className="eyebrow flex items-center gap-2.5 text-blue-300">
              <span className="h-px w-7 bg-blue-300" aria-hidden="true" />
              {hero.eyebrow}
            </HeroUp>
            <h1 className="display-1 mt-5 text-white">
              <LineUp lines={hero.headlineLines} />
            </h1>
            <HeroUp as="p" delay={0.36} className="mt-6 max-w-[50ch] text-[clamp(1.0625rem,1rem+.35vw,1.1875rem)] leading-[1.6] text-white/82">
              {hero.lead}
            </HeroUp>
            <HeroUp delay={0.48} className="mt-8 flex flex-wrap gap-3">
              <Button href={hero.primaryCta.href} size="lg" arrow>
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} size="lg" variant="outline-light">
                {hero.secondaryCta.label}
              </Button>
            </HeroUp>
            <HeroUp delay={0.6} className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-[14px] text-white/80">
              {hero.trustLine.map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <span className="grid size-[18px] place-items-center rounded-full bg-blue-600/90">
                    <Check className="size-3 text-white" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {t}
                </span>
              ))}
            </HeroUp>
          </div>
        </div>
      </section>

      {/* Compact booking bar overlapping the hero's bottom edge. */}
      <div className="container-site relative z-10 -mt-[clamp(64px,9vw,96px)]">
        <HeroUp delay={0.55}>
          <QuickQuoteForm />
        </HeroUp>
      </div>
    </>
  );
}
