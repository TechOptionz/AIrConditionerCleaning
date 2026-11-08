"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

/**
 * Desktop "Services" dropdown. Opens on hover (120 ms leave grace) and on
 * click/Enter; Esc and outside clicks close it; arrow keys move between items.
 */
export function ServicesMenu({ active, onNavigate }: { active: boolean; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  };
  const enter = () => {
    clearTimer();
    setOpen(true);
  };
  const leave = () => {
    clearTimer();
    leaveTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        (wrapRef.current?.querySelector("button") as HTMLButtonElement | null)?.focus();
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const items = Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
        if (!items.length) return;
        const i = items.indexOf(document.activeElement as HTMLAnchorElement);
        e.preventDefault();
        const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
        items[next]?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, close]);

  useEffect(() => () => clearTimer(), []);

  const handleNav = () => {
    close();
    onNavigate?.();
  };

  return (
    <div ref={wrapRef} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => panelRef.current?.querySelector("a")?.focus());
          }
        }}
        className={cn(
          "relative inline-flex h-10 cursor-pointer items-center gap-[5px] rounded-sm border-0 bg-transparent px-[11px] text-[14.5px] font-medium leading-none text-inherit whitespace-nowrap transition-colors duration-200 hover:text-teal-600",
          open && "text-teal-600",
        )}
      >
        Services
        <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} aria-hidden="true" />
        <span
          aria-hidden="true"
          className={cn("absolute bottom-1 left-[11px] right-[11px] h-0.5 origin-left bg-teal-600 transition-transform duration-200", active ? "scale-x-100" : "scale-x-0")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            ref={panelRef}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="absolute left-0 top-[calc(100%+8px)] grid w-[min(720px,calc(100vw-48px))] grid-cols-3 gap-4 rounded-lg border border-line bg-white p-5 text-ink shadow-hover"
          >
            <div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="col-span-2 mb-2 mt-1 text-[11.5px] font-semibold uppercase leading-none tracking-[.16em] text-teal-600">Cleaning by system type</div>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={handleNav}
                  className="flex h-11 items-center gap-2.5 rounded-[10px] px-2.5 text-[14px] font-medium leading-tight text-ink no-underline transition-colors hover:bg-cream-100 hover:text-teal-600 focus-visible:bg-cream-100"
                >
                  <span className="size-2 shrink-0 rounded-full bg-teal-100" aria-hidden="true" />
                  {s.short}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 rounded-md bg-cream-100 p-4">
              <div className="my-1 text-[11.5px] font-semibold uppercase leading-none tracking-[.16em] text-teal-600">Not sure?</div>
              <p className="m-0 text-[13.5px] leading-[1.5] text-body">Tell us what you can see and we&apos;ll help identify the next step.</p>
              <Link href="/book" onClick={handleNav} className="mt-auto pt-2 text-[13.5px] font-semibold leading-snug text-teal-600 no-underline hover:underline">
                Help me choose →
              </Link>
              <Link href="/services" onClick={handleNav} className="text-[13.5px] font-semibold leading-snug text-ink no-underline hover:underline">
                View all services →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
