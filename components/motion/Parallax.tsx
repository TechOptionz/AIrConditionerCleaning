"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/utils";

/**
 * Subtle background parallax for banner / CTA media. The child is oversized
 * (inset -12%) and translated by `strength` × scroll progress. Disabled under
 * reduced motion and on narrow screens via the `md:` class gate (CSS keeps the
 * media static; the transform is tiny enough not to matter if applied).
 */
export function Parallax({ children, className, strength = 0.12 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range = strength * 600;
  const y = useTransform(scrollYProgress, [0, 1], [-range / 2, range / 2]);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <motion.div className="absolute inset-x-0 -inset-y-[12%] will-change-transform" style={reduce ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}
