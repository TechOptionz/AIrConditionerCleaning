"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/useReducedMotionSafe";
import { hero } from "@/content/home";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { HeroMedia, HeroUp, LineUp } from "@/components/motion/HeroText";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { cn } from "@/lib/utils";

const ORIGINS = ["70% 50%", "60% 40%", "50% 50%", "50% 40%"];

/** Cinematic homepage hero: indoor-cleaning Ken Burns crossfade, masked headline, glass quick form. */
export function Hero() {
  const [slide, setSlide] = useState(0);
  const reduce = useReducedMotion();
  const slides = images.hero;

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      if (!document.hidden) setSlide((s) => (s + 1) % slides.length);
    }, hero.slideIntervalMs);
    return () => clearInterval(t);
  }, [reduce, slides.length]);

  return (
    <section
      aria-label="Hero"
      className="relative -mt-20 flex min-h-[min(92vh,860px)] items-center overflow-hidden bg-navy-900 pb-[clamp(56px,7vw,88px)] pt-[calc(80px+clamp(56px,8vw,96px))] text-white"
    >
      <HeroMedia>
        <div className="absolute inset-0">
          {slides.map((s, i) => {
            const on = i === slide;
            return (
              <div key={s.src} className={cn("absolute inset-0 transition-opacity duration-[900ms] ease-out", on ? "opacity-100" : "opacity-0")} aria-hidden={!on}>
                <div className={cn("absolute inset-0", !reduce && "animate-kenburns")} style={{ transformOrigin: ORIGINS[i % ORIGINS.length], animationPlayState: on ? "running" : "paused" }}>
                  <Image src={s.src} alt="" fill priority={i === 0} loading={i === 0 ? "eager" : "lazy"} sizes="100vw" quality={82} className="object-cover" style={{ objectPosition: s.focal ?? ORIGINS[i % ORIGINS.length] }} />
                </div>
              </div>
            );
          })}
        </div>
      </HeroMedia>
      <div className="hero-scrim pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="animate-drift pointer-events-none absolute -inset-[20%] mix-blend-screen" style={{ background: "radial-gradient(closest-side at 70% 55%, rgba(19,124,139,.38), transparent 70%)" }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-b from-transparent to-navy-950/60" aria-hidden="true" />

      <div className="container-site relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(40px,5vw,72px)]">
        <div className="max-w-[620px]">
          <HeroUp delay={0.1} className="eyebrow flex items-center gap-3 text-teal-300">
            <span className="h-0.5 w-8 bg-teal-300" aria-hidden="true" />
            {hero.eyebrow}
          </HeroUp>
          <h1 className="display-1 mt-5">
            <LineUp lines={hero.headlineLines} />
          </h1>
          <HeroUp as="p" delay={0.38} className="mt-[22px] max-w-[48ch] text-[clamp(1.0625rem,1rem+.45vw,1.25rem)] leading-[1.55] text-white/82">
            {hero.lead}
          </HeroUp>
          <HeroUp delay={0.5} className="mt-8 flex flex-wrap gap-3">
            <Button href={hero.primaryCta.href} size="lg" arrow className="flex-[1_1_200px]">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} size="lg" variant="outline-light" className="flex-[1_1_200px]">
              {hero.secondaryCta.label}
            </Button>
          </HeroUp>
          <HeroUp delay={0.62} className="mt-[30px] flex flex-wrap gap-x-[22px] gap-y-2.5 text-[14px] text-white/78">
            {hero.trustLine.map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <Check className="size-4 text-teal-300" strokeWidth={2.2} aria-hidden="true" />
                {t}
              </span>
            ))}
          </HeroUp>
        </div>

        <HeroUp delay={0.45} className="w-full max-w-[520px] justify-self-end">
          <QuickQuoteForm />
        </HeroUp>
      </div>

      <div className="absolute bottom-6 right-[clamp(16px,3vw,32px)] z-[2] flex gap-2" role="group" aria-label="Hero slides">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            aria-pressed={i === slide}
            onClick={() => setSlide(i)}
            className={cn("h-1.5 cursor-pointer rounded-full border-0 p-0 transition-[width,background-color] duration-[400ms] ease-out", i === slide ? "w-7 bg-teal-300" : "w-2 bg-white/40 hover:bg-white/70")}
          />
        ))}
      </div>
    </section>
  );
}
