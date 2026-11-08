"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/useReducedMotionSafe";
import type { ElementType } from "react";
import { DUR, EASE_OUT, REVEAL_Y, STAGGER, VIEWPORT } from "@/lib/motion";

type Tag = "div" | "ul" | "ol" | "li" | "article";

const pick = (as: Tag) => (motion as unknown as Record<string, ElementType>)[as] as ElementType;

/** Parent that staggers its StaggerItem children once in view. */
export function Stagger({ as = "div", stagger = STAGGER, delay = 0, children, ...rest }: HTMLMotionProps<"div"> & { as?: Tag; stagger?: number; delay?: number }) {
  const reduce = useReducedMotion();
  const Tag = pick(as);
  if (reduce) {
    const Plain = as as ElementType;
    return (
      <Plain className={rest.className} style={rest.style as React.CSSProperties}>
        {children}
      </Plain>
    );
  }
  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ as = "div", children, ...rest }: HTMLMotionProps<"div"> & { as?: Tag }) {
  const reduce = useReducedMotion();
  const Tag = pick(as);
  if (reduce) {
    const Plain = as as ElementType;
    return (
      <Plain className={rest.className} style={rest.style as React.CSSProperties}>
        {children}
      </Plain>
    );
  }
  return (
    <Tag
      variants={{ hidden: { opacity: 0, y: REVEAL_Y }, show: { opacity: 1, y: 0, transition: { duration: DUR.reveal, ease: EASE_OUT } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
