"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
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

  const [hovered, setHovered] = useState<string | null>(null);
  const featured = services.find((s) => s.slug === hovered) ?? services[1];
  const isDefault = !hovered || hovered === services[1].slug;

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
          "group relative inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-sm border-0 bg-transparent px-3 text-[14.5px] font-medium leading-none whitespace-nowrap transition-colors duration-200 hover:text-blue-700",
          open || active ? "text-blue-700" : "text-ink",
        )}
      >
        Services
        <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} aria-hidden="true" />
        <span
          aria-hidden="true"
          className={cn("absolute bottom-0.5 left-3 right-3 h-0.5 origin-left bg-blue-600 transition-transform duration-250 ease-out group-hover:scale-x-100", active ? "scale-x-100" : "scale-x-0")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            ref={panelRef}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="absolute left-1/2 top-[calc(100%+10px)] grid w-[min(760px,calc(100vw-48px))] -translate-x-1/2 grid-cols-[1.4fr_1fr] overflow-hidden rounded-lg border border-line bg-white text-ink shadow-lift"
            onAnimationComplete={() => { if (!open) setHovered(null); }}
          >
            <span className="absolute inset-x-0 top-0 h-0.5 bg-blue-600" aria-hidden="true" />
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 p-5 pt-6">
              <div className="col-span-2 mb-2 eyebrow text-blue-700">Cleaning by system type</div>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={handleNav}
                  onMouseEnter={() => setHovered(s.slug)}
                  onFocus={() => setHovered(s.slug)}
                  className="group/item flex h-11 items-center gap-2.5 rounded-md px-2.5 text-[14px] font-medium leading-tight text-ink no-underline transition-colors hover:bg-sky-50 hover:text-blue-700 focus-visible:bg-sky-50"
                >
                  <span className="size-1.5 shrink-0 bg-blue-200 transition-colors group-hover/item:bg-blue-600" aria-hidden="true" />
                  {s.short}
                </Link>
              ))}
              <Link href="/services" onClick={handleNav} className="group/all col-span-2 mt-3 inline-flex items-center gap-1.5 px-2.5 text-[14px] font-semibold text-blue-700 no-underline hover:text-blue-800">
                View all services
                <ArrowRight className="size-4 transition-transform group-hover/all:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
            <Link href={`/services/${featured.slug}`} onClick={handleNav} className="group/feat relative flex flex-col justify-end overflow-hidden bg-navy-900 p-5 text-white no-underline">
              <AnimatePresence initial={false}>
                <motion.span
                  key={featured.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <Image src={featured.images.card.src} alt="" fill sizes="300px" className="object-cover opacity-80" style={{ objectPosition: featured.images.card.focal }} />
                </motion.span>
              </AnimatePresence>
              <span className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent" aria-hidden="true" />
              <span className="absolute left-5 top-5 h-px w-8 bg-blue-300" aria-hidden="true" />
              <span className="relative eyebrow text-blue-300">{isDefault ? "Popular" : "Selected"}</span>
              <motion.span key={featured.slug + "-t"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: EASE_OUT }} className="relative block">
                <span className="mt-2 block font-display text-[17px] font-bold leading-tight">{featured.short}</span>
                <span className="mt-1 block text-[13px] leading-snug text-white/75">{featured.summary}</span>
              </motion.span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
