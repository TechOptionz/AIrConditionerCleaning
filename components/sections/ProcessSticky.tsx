"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { processSection } from "@/content/home";
import { images } from "@/content/images";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

function Step({ index, active, done, isLast, onActive, title, body }: { index: number; active: boolean; done: boolean; isLast: boolean; onActive: (i: number) => void; title: string; body: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  return (
    <Reveal as="li" index={index} className="relative grid grid-cols-[48px_1fr] gap-5 pb-7 md:min-h-[26vh]">
      <div ref={ref} className="flex flex-col items-center gap-2">
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full border-[1.5px] font-display text-[16px] font-bold leading-none transition-[background-color,color,border-color,transform] duration-400",
            active ? "scale-[1.08] border-teal-600 bg-teal-600 text-white" : done ? "border-navy-700 bg-navy-700 text-white" : "border-line-strong bg-white text-muted",
          )}
        >
          {index + 1}
        </span>
        {!isLast && <span className={cn("w-0.5 flex-1 transition-colors duration-400", done ? "bg-teal-600" : "bg-line")} aria-hidden="true" />}
      </div>
      <div className={cn("pt-2 transition-opacity duration-400", active ? "opacity-100" : "opacity-100 md:opacity-45")}>
        <h3 className="m-0 font-display text-[clamp(20px,1.2rem+.4vw,24px)] font-bold leading-[1.25] tracking-[-.015em] text-ink">{title}</h3>
        <p className="mt-2 max-w-[48ch] text-[16.5px] leading-[1.6] text-body">{body}</p>
      </div>
    </Reveal>
  );
}

/** "How it works": sticky visual that changes photo, number and progress as each step scrolls into focus. */
export function ProcessSticky() {
  const [active, setActive] = useState(0);
  const steps = processSection.steps;
  const pct = Math.round(((active + 1) / steps.length) * 100);

  return (
    <section aria-labelledby="h-process" className="section-y">
      <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-[clamp(32px,5vw,72px)]">
        <Reveal className="md:sticky md:top-[104px]">
          <Eyebrow>{processSection.eyebrow}</Eyebrow>
          <h2 id="h-process" className="display-2 mt-3 text-ink">
            {processSection.title}
          </h2>
          <p className="lead mt-4 max-w-[48ch] text-body">{processSection.lead}</p>
          <ClipReveal radius={24} className="mt-8 aspect-[4/3] max-h-[min(50vh,440px)] w-full max-w-[560px] bg-navy-900">
            {images.steps.map((img, i) => (
              <div key={`${img.src}-${i}`} className={cn("absolute inset-0 transition-[opacity,transform] duration-700 ease-out", active === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0")} aria-hidden={active !== i}>
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover" style={{ objectPosition: img.focal }} />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-40% to-navy-950/82" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-[clamp(18px,3vw,28px)] text-white">
              <div className="flex items-end gap-3.5">
                <span className="font-display text-[clamp(2.5rem,2rem+2vw,4rem)] font-extrabold leading-[.9] tracking-[-.04em] text-teal-300 transition-all duration-400">0{active + 1}</span>
                <span className="pb-1.5 text-[clamp(16px,1.5vw,20px)] font-semibold leading-[1.25]">{steps[active].title}</span>
              </div>
              <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-white/20">
                <div className="h-full bg-teal-300 transition-[width] duration-600 ease-out" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </ClipReveal>
        </Reveal>

        <ol className="m-0 flex list-none flex-col p-0 py-[clamp(0px,4vh,32px)]">
          {steps.map((st, i) => (
            <Step key={st.title} index={i} active={active === i} done={active > i} isLast={i === steps.length - 1} onActive={setActive} title={st.title} body={st.body} />
          ))}
        </ol>
      </div>
    </section>
  );
}
