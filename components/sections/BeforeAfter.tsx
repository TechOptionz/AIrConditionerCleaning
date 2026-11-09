"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { Check, ChevronsLeftRight, X } from "lucide-react";
import type { BeforeAfterPair } from "@/content/images";
import { beforeAfterSection } from "@/content/home";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BlueBlock, CornerBrackets } from "@/components/ui/Accents";
import { cn } from "@/lib/utils";

/**
 * Draggable before/after comparison. The whole frame is a transparent range
 * input, so it works with mouse, touch and keyboard (arrow keys) and is
 * announced as a slider. Only used when a pair is marked `genuine` (same unit,
 * same angle) — otherwise the two photos are shown side by side, labelled.
 */
export function CompareSlider({ pair, className, priority = false, wide = false }: { pair: BeforeAfterPair; className?: string; priority?: boolean; wide?: boolean }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <figure className={cn("m-0", className)}>
      <div className={cn("relative select-none overflow-hidden rounded-lg bg-navy-900 shadow-card", wide ? "aspect-[16/9] max-h-[min(70vh,640px)] w-full" : "aspect-[3/2]")}>
        <Image src={pair.after.src} alt={pair.after.alt} fill sizes={wide ? "(max-width: 1280px) 100vw, 1200px" : "(max-width: 1024px) 100vw, 600px"} priority={priority} className="object-cover" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={pair.before.src} alt={pair.before.alt} fill sizes={wide ? "(max-width: 1280px) 100vw, 1200px" : "(max-width: 1024px) 100vw, 600px"} priority={priority} className="object-cover" draggable={false} />
        </div>
        <Tag className="left-4 top-4 bg-navy-950/80">Before</Tag>
        <Tag className="right-4 top-4 bg-action">After</Tag>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.15)]" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy-900 shadow-hover">
            <ChevronsLeftRight className="size-5" />
          </span>
        </div>
        <label htmlFor={id} className="sr-only">
          Compare before and after: {pair.title}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-valuetext={`${pos}% before`}
          className="absolute inset-0 m-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-blue-300"
          style={{ touchAction: "pan-y" }}
        />
      </div>
      <figcaption className="mt-3 text-[14px] text-body">
        <span className="font-semibold text-ink">{pair.title}</span> · drag to compare
      </figcaption>
    </figure>
  );
}

function Tag({ children, className }: { children: string; className?: string }) {
  return <span className={cn("pointer-events-none absolute rounded-sm px-2.5 py-1.5 text-[11.5px] font-semibold uppercase leading-none tracking-[.14em] text-white", className)}>{children}</span>;
}

/** Stacked, labelled pair for photos that show the type of work rather than the same unit. */
export function BeforeAfterStack({ pair, className }: { pair: BeforeAfterPair; className?: string }) {
  return (
    <div className={cn("grid gap-3", className)}>
      {(["before", "after"] as const).map((k) => {
        const img = pair[k];
        return (
          <figure key={k} className="group relative m-0 aspect-[16/9] overflow-hidden rounded-lg bg-sky-100">
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" style={{ objectPosition: img.focal }} />
            <Tag className={cn("left-4 top-4", k === "before" ? "bg-navy-950/80" : "bg-action")}>{k}</Tag>
          </figure>
        );
      })}
    </div>
  );
}

/** Which treatment a pair gets. */
export function BeforeAfterMedia({ pair, className }: { pair: BeforeAfterPair; className?: string }) {
  return pair.genuine ? <CompareSlider pair={pair} className={className} /> : <BeforeAfterStack pair={pair} className={className} />;
}

export function BeforeAfterGrid({ pairs }: { pairs: BeforeAfterPair[] }) {
  return (
    <div className={cn("grid gap-6", pairs.length > 1 && "lg:grid-cols-2")}>
      {pairs.map((p, i) => (
        <Reveal key={p.slug + p.title} index={i}>
          <BeforeAfterMedia pair={p} />
        </Reveal>
      ))}
    </div>
  );
}

/**
 * Homepage editorial section: text column with "before" (✕) and "after" (✓)
 * lists beside the labelled photography. Inspired by the reference site's
 * impact section, rebuilt with the new type system.
 */
export function BeforeAfterSection({ pair }: { pair: BeforeAfterPair }) {
  const s = beforeAfterSection;
  return (
    <section aria-labelledby="h-before-after" className="section-y-lg">
      <div className="container-site grid items-start gap-[clamp(36px,5vw,72px)] lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Reveal>
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 id="h-before-after" className="display-2 mt-3.5 text-ink">
              {s.title}
            </h2>
            <p className="mt-4 max-w-[54ch] text-[16px] leading-[1.65] text-body">{s.lead}</p>
          </Reveal>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:gap-7">
            <PointList heading={s.before.heading} points={s.before.points} kind="before" />
            <PointList heading={s.after.heading} points={s.after.points} kind="after" />
          </div>
          <Reveal as="p" className="mt-7 border-t border-line pt-4 text-[13px] leading-[1.55] text-muted">
            {s.note}
          </Reveal>
        </div>

        <Reveal className="relative lg:sticky lg:top-28">
          <BlueBlock tone="sky" className="-left-5 -top-5 hidden size-20 lg:block" />
          <CornerBrackets corners={["br"]} size={40} inset={-12} />
          <BeforeAfterMedia pair={pair} className="relative" />
        </Reveal>
      </div>
    </section>
  );
}

function PointList({ heading, points, kind }: { heading: string; points: { t: string; b: string }[]; kind: "before" | "after" }) {
  const after = kind === "after";
  return (
    <div>
      <h3 className={cn("m-0 flex items-center gap-2.5 font-display text-[17px] font-bold", after ? "text-blue-700" : "text-ink")}>
        <span className={cn("h-px w-5", after ? "bg-blue-600" : "bg-navy-900")} aria-hidden="true" />
        {heading}
      </h3>
      <Stagger as="ul" className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
        {points.map((p) => (
          <StaggerItem as="li" key={p.t} className="flex items-start gap-3">
            <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", after ? "bg-blue-600 text-white" : "bg-sky-100 text-danger")}>
              {after ? <Check className="size-3" strokeWidth={3} aria-hidden="true" /> : <X className="size-3" strokeWidth={3} aria-hidden="true" />}
            </span>
            <p className="m-0 text-[14.5px] leading-[1.55] text-body">
              <strong className="font-semibold text-ink">{p.t}.</strong> {p.b}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
