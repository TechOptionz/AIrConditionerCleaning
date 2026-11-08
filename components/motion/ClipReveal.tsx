"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/useReducedMotionSafe";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Image reveal: clip-path wipe from the top plus a 1.1→1 inner scale,
 * matching the design's data-reveal-clip behaviour. Fires at zero threshold
 * so tall media near the fold still animates.
 */
export function ClipReveal({ children, className, radius = 24, delay = 0 }: { children: ReactNode; className?: string; radius?: number; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) {
    // Same two-level structure as the animated branch so hydration never mismatches.
    return (
      <div className={cn("relative overflow-hidden", className)} style={{ borderRadius: radius }}>
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      style={{ borderRadius: radius }}
      initial={{ clipPath: `inset(0 0 100% 0 round ${radius}px)` }}
      whileInView={{ clipPath: `inset(0 0 0% 0 round ${radius}px)` }}
      viewport={{ once: true, amount: 0, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0, margin: "0px 0px -6% 0px" }}
        transition={{ duration: 1.4, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
