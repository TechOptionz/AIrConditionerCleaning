"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/useReducedMotionSafe";
import { Plus } from "lucide-react";
import type { Faq } from "@/content/faqs";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Single-open accordion matching the design export: 60 px triggers inside
 * <h3>, plus icon rotates 45° to a cross, teal when open, height animates 250 ms.
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
          <div key={it.q} className="border-b border-line">
            <h3 className="m-0">
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-[60px] w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-0 py-[18px] text-left text-[17px] font-semibold leading-[1.35] text-ink transition-colors hover:text-teal-600"
              >
                <span>{it.q}</span>
                <span className={cn("grid size-[30px] shrink-0 place-items-center rounded-full border transition-[transform,color,border-color] duration-200", isOpen ? "rotate-45 border-teal-600 text-teal-600" : "border-line text-muted")}>
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
                  <p className="m-0 max-w-[65ch] pb-[22px] text-[16px] leading-[1.6] text-body">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
