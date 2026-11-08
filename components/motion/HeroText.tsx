"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/useReducedMotionSafe";
import type { ReactNode } from "react";
import { DUR, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Masked line-up headline: each line slides up from 110 % inside an overflow mask. */
export function LineUp({ lines, className, baseDelay = 0.18, step = 0.12 }: { lines: string[]; className?: string; baseDelay?: number; step?: number }) {
  const reduce = useReducedMotion();
  return (
    <>
      {lines.map((line, i) => (
        <span key={line} className={cn("block overflow-hidden pb-[.22em] -mb-[.22em]", className)}>
          <motion.span
            className="block"
            initial={reduce ? false : { y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: DUR.hero, ease: EASE_OUT, delay: baseDelay + i * step }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/** Fade-up entrance for hero children with a delay. */
export function HeroUp({ children, delay = 0, className, as = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "p" | "nav" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag className={className} initial={reduce ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_OUT, delay }}>
      {children}
    </Tag>
  );
}

/** Media fade + 1.04→1 scale used behind hero banners. */
export function HeroMedia({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={cn("absolute inset-0 overflow-hidden", className)} initial={reduce ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: DUR.media, ease: EASE_OUT }} aria-hidden="true">
      {children}
    </motion.div>
  );
}
