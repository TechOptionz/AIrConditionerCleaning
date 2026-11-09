"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOGO_OPTIONS, useLogo } from "./LogoProvider";

/**
 * Logo preview controls. The header shows a compact dropdown from the `sm`
 * breakpoint; on phones the same options are listed inside the mobile drawer.
 * Changes apply instantly across header, drawer and footer and persist per browser.
 */

/** The three option rows (shared by the dropdown and the drawer). */
export function LogoOptionList({ onSelect, className }: { onSelect?: () => void; className?: string }) {
  const { logoId, setLogoId } = useLogo();
  return (
    <ul role="listbox" aria-label="Logo preview" className={cn("m-0 list-none p-0", className)}>
      {LOGO_OPTIONS.map((o) => {
        const on = o.id === logoId;
        const w = Math.round((o.mark.width / o.mark.height) * 28);
        return (
          <li key={o.id} role="option" aria-selected={on}>
            <button
              type="button"
              onClick={() => {
                setLogoId(o.id);
                onSelect?.();
              }}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-md border-0 px-2.5 py-2 text-left transition-colors",
                on ? "bg-blue-50" : "bg-transparent hover:bg-sky-50",
              )}
            >
              <span className="grid h-9 w-[72px] shrink-0 place-items-center rounded-sm border border-line bg-white">
                <Image src={o.mark.src} alt="" width={w} height={28} style={{ width: w, height: 28 }} className="block max-w-[64px] object-contain" draggable={false} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col leading-tight">
                <span className="text-[14px] font-semibold text-ink">{o.label}</span>
                <span className="text-[12px] text-muted">{o.note}</span>
              </span>
              <Check className={cn("size-4 shrink-0 text-blue-600", on ? "opacity-100" : "opacity-0")} aria-hidden="true" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Header dropdown: "Logo · Wave ▾". */
export function LogoSwitcher({ className }: { className?: string }) {
  const { logo } = useLogo();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Logo: ${logo.label}. Change logo preview`}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-8 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md border border-line bg-white px-2 text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-muted transition-colors hover:border-blue-400 hover:text-blue-700",
          open && "border-blue-600 text-blue-700",
        )}
      >
        <span>Logo</span>
        <span className="text-ink">{logo.label}</span>
        <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} aria-hidden="true" />
      </button>

      {open && (
        <div id={menuId} className="absolute right-0 top-[calc(100%+8px)] z-[60] w-[260px] rounded-lg border border-line bg-white p-1.5 shadow-lift md:left-0 md:right-auto">
          <LogoOptionList onSelect={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
