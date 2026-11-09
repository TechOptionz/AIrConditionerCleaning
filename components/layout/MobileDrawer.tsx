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
import { Logo } from "./Logo";
import { LogoOptionList } from "./LogoSwitcher";

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
  const phoneOk = !site.phoneIsPlaceholder;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 cursor-pointer border-0 bg-navy-950/55"
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
            className="absolute bottom-0 right-0 top-0 flex w-[min(86vw,380px)] flex-col bg-white shadow-[-12px_0_40px_rgba(16,42,67,.18)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <div className="flex h-[68px] items-center justify-between border-b border-line pl-5 pr-3">
              <Logo compact />
              <button type="button" aria-label="Close menu" onClick={onClose} className="grid size-11 cursor-pointer place-items-center rounded-md border-0 bg-transparent text-ink hover:bg-sky-50">
                <X className="size-[22px]" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-3">
              {drawerNav.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.06 + i * 0.035 }}>
                  <Link
                    href={n.href}
                    onClick={onClose}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center justify-between rounded-md px-3.5 text-[16px] font-semibold leading-tight text-ink no-underline hover:bg-sky-50",
                      isActive(n.href) && "bg-blue-50 text-blue-800",
                    )}
                  >
                    {n.label}
                    <ChevronRight className={cn("size-4", isActive(n.href) ? "text-blue-600" : "text-faint")} aria-hidden="true" />
                  </Link>
                </motion.div>
              ))}
              <div className="mx-3.5 mb-2 mt-5 flex items-center gap-2.5 eyebrow text-blue-700">
                <span className="h-px w-5 bg-blue-600" aria-hidden="true" />
                Cleaning by system type
              </div>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={onClose}
                  aria-current={pathname === `/services/${s.slug}` ? "page" : undefined}
                  className={cn("flex min-h-11 items-center rounded-md px-3.5 text-[15px] font-medium leading-tight text-body no-underline hover:bg-sky-50 hover:text-blue-700", pathname === `/services/${s.slug}` && "bg-blue-50 text-blue-800")}
                >
                  {s.short}
                </Link>
              ))}
              <div className="mx-3.5 mb-2 mt-5 flex items-center gap-2.5 eyebrow text-blue-700 sm:hidden">
                <span className="h-px w-5 bg-blue-600" aria-hidden="true" />
                Logo preview
              </div>
              <LogoOptionList className="sm:hidden" />
            </nav>
            <div className="flex flex-col gap-2.5 border-t border-line p-4">
              <Link href="/book" onClick={onClose} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-action text-[15px] font-semibold leading-none text-white no-underline hover:bg-action-hover">
                Request a Booking
              </Link>
              {phoneOk ? (
                <a href={telHref(site.phone)} className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-line-strong bg-white text-[15px] font-semibold leading-none text-ink no-underline hover:border-blue-600">
                  Call {site.phone}
                </a>
              ) : (
                <Link href="/contact" onClick={onClose} className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-line-strong bg-white text-[15px] font-semibold leading-none text-ink no-underline hover:border-blue-600">
                  Contact us
                </Link>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
