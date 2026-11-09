"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { telHref } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

/** Mobile-only bottom bar once the hero has scrolled away. The call button only appears for a verified number. */
export function StickyCTA({ visible }: { visible: boolean }) {
  const phoneOk = !site.phoneIsPlaceholder;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-line bg-white/95 px-4 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-[10px] lg:hidden"
        >
          {phoneOk ? (
            <a href={telHref(site.phone)} className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md border border-line-strong bg-white text-[15px] font-semibold leading-none text-ink no-underline">
              <Phone className="size-4 text-blue-600" aria-hidden="true" />
              Call
            </a>
          ) : (
            <Link href="/contact" className="inline-flex h-12 flex-1 items-center justify-center rounded-md border border-line-strong bg-white text-[15px] font-semibold leading-none text-ink no-underline">
              Contact
            </Link>
          )}
          <Link href="/book" className="inline-flex h-12 flex-[2] items-center justify-center rounded-md bg-action text-[15px] font-semibold leading-none text-white no-underline">
            Request a Booking
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
