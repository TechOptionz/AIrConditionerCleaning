"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/useReducedMotionSafe";
import type { ElementType } from "react";
import { DUR, EASE_OUT, REVEAL_Y, STAGGER, VIEWPORT } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Stagger index: delay = index × 80 ms (capped at 7). */
  index?: number;
  /** Extra delay in seconds */
  delay?: number;
  as?: "div" | "li" | "article" | "section" | "p" | "span" | "h2" | "ol" | "ul";
};

/**
 * Fade-up on scroll, once. Mirrors the design's data-reveal behaviour:
 * opacity 0→1, translateY 24→0, 600 ms ease-out, 12 % threshold.
 */
export function Reveal({ index = 0, delay = 0, as = "div", children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = (motion as unknown as Record<string, ElementType>)[as] as ElementType;
  if (reduce) {
    const Plain = as as ElementType;
    const { className, style, id } = rest;
    return (
      <Plain className={className} style={style as React.CSSProperties} id={id}>
        {children}
      </Plain>
    );
  }
  return (
    <Tag
      initial={{ opacity: 0, y: REVEAL_Y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.reveal, ease: EASE_OUT, delay: Math.min(index, 7) * STAGGER + delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
