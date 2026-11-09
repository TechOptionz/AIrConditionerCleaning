"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/useReducedMotionSafe";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";

/** Icons are passed as rendered elements so server components can supply them. */
export type TimelineStep = { title: string; body: string; icon?: ReactNode };

/**
 * Numbered process. Desktop: horizontal row of icon tiles joined by a fine
 * line that fills with blue as the section scrolls into view. Mobile: a
 * vertical timeline with the same fill behaviour. No sticky panels, no empty
 * scroll distance — the scroll drives the line, nothing else.
 */
export function ProcessTimeline({ steps, tone = "light", className }: { steps: TimelineStep[]; tone?: "light" | "dark"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const scale = useTransform(smooth, [0, 1], [0, 1]);

  const dark = tone === "dark";
  const cols = steps.length >= 5 ? "lg:grid-cols-5" : steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <div ref={ref} className={className}>
    <Stagger as="ol" stagger={0.12} className={cn("relative m-0 grid list-none gap-y-9 p-0 lg:gap-x-6 lg:gap-y-0", cols)}>
      {/* Desktop connecting line sits at tile mid-height (tile 56 px → 28 px). */}
      <div className={cn("pointer-events-none absolute left-[calc(12.5%)] right-[calc(12.5%)] top-7 hidden h-0 border-t border-dashed lg:block", dark ? "border-white/20" : "border-line-strong")} aria-hidden="true">
        <motion.div className="-mt-px h-0.5 origin-left bg-blue-600" style={{ scaleX: reduce ? 1 : scale }} />
      </div>
      {/* Mobile connecting line */}
      <div className={cn("pointer-events-none absolute bottom-7 left-7 top-7 w-0 border-l border-dashed lg:hidden", dark ? "border-white/20" : "border-line-strong")} aria-hidden="true">
        <motion.div className="-ml-px h-full w-0.5 origin-top bg-blue-600" style={{ scaleY: reduce ? 1 : scale }} />
      </div>

      {steps.map((st, i) => {
        return (
          <StaggerItem as="li" key={st.title} className="relative grid grid-cols-[56px_1fr] gap-5 lg:block lg:text-center">
            <div className="relative z-[1] flex lg:justify-center">
              <span className={cn("grid size-14 place-items-center rounded-md border-[3px]", dark ? "border-navy-900 bg-action text-white" : "border-white bg-action text-white shadow-[0_0_0_1px_var(--color-blue-100)]")}>
                {st.icon ? <span className="[&>svg]:size-6" aria-hidden="true">{st.icon}</span> : <span className="font-display text-[18px] font-bold">{i + 1}</span>}
              </span>
            </div>
            <div className="pt-1 lg:mt-5 lg:px-2">
              <span className={cn("inline-flex items-center gap-2 font-display text-[12.5px] font-bold tracking-[.14em]", dark ? "text-blue-300" : "text-blue-700")}>
                <span className={cn("hidden h-px w-5 lg:block", dark ? "bg-blue-300/60" : "bg-blue-200")} aria-hidden="true" />
                {String(i + 1).padStart(2, "0")}
                <span className={cn("hidden h-px w-5 lg:block", dark ? "bg-blue-300/60" : "bg-blue-200")} aria-hidden="true" />
              </span>
              <h3 className={cn("m-0 mt-2 font-display text-[18px] font-bold leading-[1.3] tracking-[-.01em]", dark ? "text-white" : "text-ink")}>{st.title}</h3>
              <p className={cn("mt-2 text-[14.5px] leading-[1.6] lg:mx-auto lg:max-w-[28ch]", dark ? "text-white/72" : "text-body")}>{st.body}</p>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
    </div>
  );
}
