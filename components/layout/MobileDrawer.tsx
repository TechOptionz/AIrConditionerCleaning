"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, X } from "lucide-react";
import { drawerNav } from "@/content/nav";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { cn, telHref } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

type Props = { open: boolean; onClose: () => void; pathname: string };

/** Right-hand off-canvas menu: slide-in 300 ms, backdrop fade, staggered items, focus trap, Esc closes. */
export function MobileDrawer({ open, onClose, pathname }: Props) {
  const panelRef = useRef<HTMLElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("button, a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
        if (!nodes.length) return;
        const firstEl = nodes[0];
        const lastEl = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      restoreRef.current?.focus?.();
    };
  }, [open, onClose]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 cursor-pointer border-0 bg-navy-900/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute bottom-0 right-0 top-0 flex w-[min(84vw,360px)] flex-col bg-white shadow-[-12px_0_40px_rgba(16,24,40,.2)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <div className="flex h-16 items-center justify-between border-b border-line pl-5 pr-3">
              <span className="font-display text-[18px] font-bold text-ink">Menu</span>
              <button type="button" aria-label="Close menu" onClick={onClose} className="grid size-11 cursor-pointer place-items-center rounded-md border-0 bg-transparent text-ink hover:bg-cream-100">
                <X className="size-[22px]" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-3">
              {drawerNav.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.08 + i * 0.04 }}>
                  <Link
                    href={n.href}
                    onClick={onClose}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center justify-between rounded-md px-3.5 text-[16px] font-semibold leading-tight text-ink no-underline hover:bg-cream-100",
                      isActive(n.href) && "bg-teal-50",
                    )}
                  >
                    {n.label}
                    <ChevronRight className="size-4 text-faint" aria-hidden="true" />
                  </Link>
                </motion.div>
              ))}
              <div className="mx-3.5 mb-2 mt-4 text-[11.5px] font-semibold uppercase leading-none tracking-[.16em] text-teal-600">Cleaning by system type</div>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={onClose}
                  aria-current={pathname === `/services/${s.slug}` ? "page" : undefined}
                  className={cn("flex min-h-11 items-center rounded-[10px] px-3.5 text-[15px] font-medium leading-tight text-body no-underline hover:bg-cream-100 hover:text-teal-600", pathname === `/services/${s.slug}` && "bg-teal-50 text-teal-700")}
                >
                  {s.short}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2.5 border-t border-line p-4">
              <Link href="/book" onClick={onClose} className="inline-flex h-[50px] items-center justify-center gap-2 rounded-md bg-teal-600 text-[15px] font-semibold leading-none text-white no-underline hover:bg-teal-700">
                Request a Booking
              </Link>
              <a href={telHref(site.phone)} className="inline-flex h-[50px] items-center justify-center gap-2 rounded-md bg-cream-100 text-[15px] font-semibold leading-none text-ink no-underline hover:bg-cream-200">
                Call {site.phone}
              </a>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
