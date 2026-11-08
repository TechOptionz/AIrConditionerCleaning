"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import type { BeforeAfterPair } from "@/content/images";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * Draggable before/after comparison. The whole frame is a transparent range
 * input, so it works with mouse, touch and keyboard (arrow keys) and is
 * announced as a slider. Pairs flagged `genuine: false` carry an
 * "illustrative" caption so stock photos are never passed off as real jobs.
 */
export function CompareSlider({ pair, className, priority = false }: { pair: BeforeAfterPair; className?: string; priority?: boolean }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <figure className={cn("m-0", className)}>
      <div className="relative aspect-[3/2] select-none overflow-hidden rounded-xl bg-navy-900 shadow-card">
        <Image src={pair.after.src} alt={pair.after.alt} fill sizes="(max-width: 1024px) 100vw, 600px" priority={priority} className="object-cover" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={pair.before.src} alt={pair.before.alt} fill sizes="(max-width: 1024px) 100vw, 600px" priority={priority} className="object-cover grayscale-[.35]" draggable={false} />
        </div>
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-navy-900/80 px-3 py-2 text-[12px] font-semibold uppercase leading-none tracking-[.14em] text-white backdrop-blur">Before</span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-teal-600/90 px-3 py-2 text-[12px] font-semibold uppercase leading-none tracking-[.14em] text-white">After</span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.15)]" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-navy-900/85 text-white shadow-hover backdrop-blur">
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
          className="absolute inset-0 m-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-300"
          style={{ touchAction: "pan-y" }}
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[14px] text-body">
        <span className="font-semibold text-ink">{pair.title}</span>
        {!pair.genuine && <span className="text-[13px] text-muted">Illustrative stock photography — not a Northline Air Care job</span>}
      </figcaption>
    </figure>
  );
}

export function BeforeAfterGrid({ pairs }: { pairs: BeforeAfterPair[] }) {
  return (
    <div className={cn("grid gap-6", pairs.length > 1 && "lg:grid-cols-2")}>
      {pairs.map((p, i) => (
        <Reveal key={p.slug + p.title} index={i}>
          <CompareSlider pair={p} />
        </Reveal>
      ))}
    </div>
  );
}
