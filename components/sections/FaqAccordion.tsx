"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/useReducedMotionSafe";
import { Plus } from "lucide-react";
import type { Faq } from "@/content/faqs";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Single-open accordion: hairline-divided rows, plus icon rotates 45° to a
 * cross and turns blue when open, height animates 250 ms. The open row gains
 * a thin blue rule on its left edge.
 */
export function FaqAccordion({ items, defaultOpen = 0, className }: { items: Faq[]; defaultOpen?: number | null; className?: string }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  const reduce = useReducedMotion();

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const panelId = `${base}-p-${i}`;
        const btnId = `${base}-b-${i}`;
        return (
          <div key={it.q} className={cn("relative border-b border-line transition-colors", isOpen && "bg-white")}>
            <span className={cn("absolute inset-y-0 left-0 w-0.5 bg-blue-600 transition-opacity duration-200", isOpen ? "opacity-100" : "opacity-0")} aria-hidden="true" />
            <h3 className="m-0">
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-[60px] w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent py-[18px] pl-5 pr-2 text-left text-[16.5px] font-semibold leading-[1.35] text-ink transition-colors hover:text-blue-700"
              >
                <span>{it.q}</span>
                <span className={cn("grid size-8 shrink-0 place-items-center rounded-md border transition-[transform,color,border-color,background-color] duration-200", isOpen ? "rotate-45 border-blue-600 bg-blue-600 text-white" : "border-line-strong text-muted")}>
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className="m-0 max-w-[65ch] pb-[22px] pl-5 pr-12 text-[15.5px] leading-[1.65] text-body">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
