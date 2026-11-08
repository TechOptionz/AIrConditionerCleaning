"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
import { telHref } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

/** Mobile-only bottom bar (Call + Request a Booking) once the hero has scrolled away. */
export function StickyCTA({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-line bg-cream-50/92 px-[clamp(16px,3vw,32px)] pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-[10px] lg:hidden"
        >
          <a href={telHref(site.phone)} className="inline-flex h-12 flex-1 items-center justify-center rounded-md bg-navy-700 text-[15px] font-semibold leading-none text-white no-underline">
            Call
          </a>
          <Link href="/book" className="inline-flex h-12 flex-[2] items-center justify-center rounded-md bg-teal-600 text-[15px] font-semibold leading-none text-white no-underline">
            Request a Booking
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
