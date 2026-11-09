"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/useReducedMotionSafe";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Decorative library — White · Ocean Blue · Navy.
   Every element here is CSS/SVG only, low contrast, and enters with its
   parent section. Use one or two per composition, never all of them.
   --------------------------------------------------------------------------- */

type Tone = "light" | "dark";

/** Short horizontal accent line that extends from the left when it enters the viewport. */
export function AccentLine({ tone = "light", width = 28, className, delay = 0 }: { tone?: Tone; width?: number; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={cn("block h-px shrink-0 origin-left", tone === "dark" ? "bg-blue-300" : "bg-blue-600", className)}
      style={{ width }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    />
  );
}

/** Thin vertical rule that grows downward; used beside quotes and highlighted copy. */
export function AccentRule({ tone = "light", className, delay = 0 }: { tone?: Tone; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={cn("absolute inset-y-0 left-0 w-[3px] origin-top", tone === "dark" ? "bg-blue-300" : "bg-blue-600", className)}
      initial={reduce ? false : { scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    />
  );
}

/** Small solid blue block (square or bar). Positioned by the caller. */
export function BlueBlock({ className, tone = "blue" }: { className?: string; tone?: "blue" | "sky" | "navy" }) {
  const reduce = useReducedMotion();
  const bg = tone === "sky" ? "bg-sky-100" : tone === "navy" ? "bg-navy-900" : "bg-blue-600";
  return (
    <motion.span
      aria-hidden="true"
      className={cn("pointer-events-none absolute block", bg, className)}
      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
    />
  );
}

/**
 * L-shaped corner brackets around a photograph. Wrap the media in a relative
 * container and drop this in; `inset` controls how far outside the image they sit.
 */
export function CornerBrackets({ tone = "light", size = 28, inset = -10, className, corners = ["tl", "br"] }: { tone?: Tone; size?: number; inset?: number; className?: string; corners?: ("tl" | "tr" | "bl" | "br")[] }) {
  const reduce = useReducedMotion();
  const color = tone === "dark" ? "border-blue-300" : "border-blue-600";
  const pos: Record<string, string> = {
    tl: "border-l-2 border-t-2",
    tr: "border-r-2 border-t-2",
    bl: "border-b-2 border-l-2",
    br: "border-b-2 border-r-2",
  };
  return (
    <>
      {corners.map((c, i) => (
        <motion.span
          key={c}
          aria-hidden="true"
          className={cn("pointer-events-none absolute block", color, pos[c], className)}
          style={{
            width: size,
            height: size,
            top: c.startsWith("t") ? inset : undefined,
            bottom: c.startsWith("b") ? inset : undefined,
            left: c.endsWith("l") ? inset : undefined,
            right: c.endsWith("r") ? inset : undefined,
          }}
          initial={reduce ? false : { opacity: 0, x: c.endsWith("l") ? 8 : -8, y: c.startsWith("t") ? 8 : -8 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 + i * 0.08 }}
        />
      ))}
    </>
  );
}

/** Rectangular photo frame with a thin blue border and a small inset white gap. */
export function FramedMedia({ children, className, ratio = "aspect-[4/3]" }: { children: ReactNode; className?: string; ratio?: string }) {
  return (
    <div className={cn("relative rounded-md border border-blue-600 p-2", className)}>
      <div className={cn("relative overflow-hidden rounded-sm bg-sky-100", ratio)}>{children}</div>
    </div>
  );
}

/**
 * Minimal airflow curves inspired by the wave mark. Three strokes, very low
 * contrast; the dashed stroke drifts slowly unless reduced motion is set.
 */
export function Airflow({ className, tone = "light", animate = true }: { className?: string; tone?: Tone; animate?: boolean }) {
  return (
    <svg className={cn("pointer-events-none absolute", tone === "dark" ? "text-blue-300" : "text-blue-600", className)} viewBox="0 0 800 240" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 150 C 150 70, 270 250, 420 150 S 680 60, 800 130" stroke="currentColor" strokeOpacity=".28" strokeWidth="1.25" strokeDasharray="5 11" className={cn(animate && "animate-airflow")} />
      <path d="M0 190 C 170 110, 290 280, 440 185 S 700 100, 800 170" stroke="currentColor" strokeOpacity=".16" strokeWidth="1" />
      <path d="M0 110 C 140 40, 240 200, 400 115 S 640 30, 800 90" stroke="currentColor" strokeOpacity=".1" strokeWidth="1" />
    </svg>
  );
}

/** Fine divider with an optional short blue segment at the start. */
export function Divider({ className, accent = true, tone = "light" }: { className?: string; accent?: boolean; tone?: Tone }) {
  return (
    <div className={cn("relative h-px w-full", tone === "dark" ? "bg-white/12" : "bg-line", className)} aria-hidden="true">
      {accent && <span className={cn("absolute left-0 top-0 h-px w-12", tone === "dark" ? "bg-blue-300" : "bg-blue-600")} />}
    </div>
  );
}

/** Distinctive numbered label: "01" in display type with a hairline tail. */
export function NumberLabel({ n, tone = "light", className }: { n: number; tone?: Tone; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3 font-display text-[13px] font-bold tracking-[.12em]", tone === "dark" ? "text-blue-300" : "text-blue-700", className)}>
      {String(n).padStart(2, "0")}
      <span className={cn("h-px w-8", tone === "dark" ? "bg-blue-300/60" : "bg-blue-200")} aria-hidden="true" />
    </span>
  );
}

/** Icon inside a thin circular ring with a solid inner dot of colour. */
export function IconRing({ children, tone = "light", size = "md", className }: { children: ReactNode; tone?: Tone; size?: "md" | "lg"; className?: string }) {
  const outer = size === "lg" ? "size-16" : "size-12";
  const inner = size === "lg" ? "size-12 [&>svg]:size-5" : "size-9 [&>svg]:size-4";
  return (
    <span className={cn("grid shrink-0 place-items-center rounded-full border", outer, tone === "dark" ? "border-blue-300/40" : "border-blue-200", className)} aria-hidden="true">
      <span className={cn("grid place-items-center rounded-full", inner, tone === "dark" ? "bg-white/10 text-blue-300" : "bg-blue-600 text-white")}>{children}</span>
    </span>
  );
}

/* ---------- Compact trust / benefit micro-components ---------- */

/** Blue tick row. */
export function CheckRow({ children, tone = "light", size = "md", className }: { children: ReactNode; tone?: Tone; size?: "sm" | "md"; className?: string }) {
  return (
    <li className={cn("flex items-start gap-3 leading-[1.5]", size === "sm" ? "text-[14px]" : "text-[15px] font-medium", tone === "dark" ? "text-white/90" : "text-ink", className)}>
      <span className={cn("mt-px grid shrink-0 place-items-center rounded-full", size === "sm" ? "size-5" : "size-[22px]", tone === "dark" ? "bg-blue-300 text-navy-900" : "bg-blue-600 text-white")}>
        <Check className={size === "sm" ? "size-3" : "size-3.5"} strokeWidth={3} aria-hidden="true" />
      </span>
      <span>{children}</span>
    </li>
  );
}

export function CheckList({ items, columns = 1, tone = "light", size = "md", className }: { items: ReactNode[]; columns?: 1 | 2; tone?: Tone; size?: "sm" | "md"; className?: string }) {
  return (
    <ul className={cn("m-0 grid list-none gap-x-8 gap-y-3 p-0", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((it, i) => (
        <CheckRow key={i} tone={tone} size={size}>
          {it}
        </CheckRow>
      ))}
    </ul>
  );
}

/** Highlighted information panel with a vertical accent rule. */
export function InfoPanel({ label, children, icon, tone = "sky", className }: { label?: string; children: ReactNode; icon?: ReactNode; tone?: "sky" | "white" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <div className={cn("relative overflow-hidden rounded-md border py-4 pl-6 pr-5", dark ? "border-white/12 bg-white/6 text-white/85" : tone === "sky" ? "border-line bg-sky-50 text-body" : "border-line bg-white text-body", className)}>
      <AccentRule tone={dark ? "dark" : "light"} />
      {label && <span className={cn("eyebrow block", dark ? "text-blue-300" : "text-blue-700")}>{label}</span>}
      <div className={cn("flex items-start gap-2.5 text-[14px] leading-[1.6]", label && "mt-2")}>
        {icon && (
          <span className={cn("mt-0.5 shrink-0 [&>svg]:size-4", dark ? "text-blue-300" : "text-blue-600")} aria-hidden="true">
            {icon}
          </span>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}

/** Small square-cornered category badge. */
export function Badge({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "solid" | "dark"; className?: string }) {
  const style = tone === "solid" ? "bg-action text-white" : tone === "dark" ? "bg-white/10 text-blue-300" : "bg-blue-50 text-blue-800";
  return <span className={cn("inline-flex h-6 items-center rounded-sm px-2 text-[11px] font-semibold uppercase leading-none tracking-[.1em]", style, className)}>{children}</span>;
}
