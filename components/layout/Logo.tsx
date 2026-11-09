"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { useLogo } from "./LogoProvider";

/**
 * Brand lock-up: a cut-out mark paired with a text wordmark styled to match.
 *
 * The approved file is the Northline Air Care wave logo, a stacked square
 * lock-up too tall for a 64–80 px header, so its mark is used on its own:
 *   /brand/logo-mark.png        navy + teal waves, for light backgrounds
 *   /brand/logo-mark-light.png  white + pale-teal waves, for dark backgrounds
 *   /brand/logo-full.png        the complete lock-up (print, social, light pages)
 *
 * Two candidate marks (/brand/option-a-*, /brand/option-b-*) can be previewed
 * site-wide through the header's logo dropdown — see LogoProvider.
 */
export type LogoTone = "light" | "dark";

export function LogoMark({ tone = "dark", height, className }: { tone?: LogoTone; height?: number; className?: string }) {
  const { logo } = useLogo();
  const m = tone === "light" ? logo.markLight : logo.mark;
  const h = height ?? logo.headerHeight;
  const width = Math.round((m.width / m.height) * h);
  return <Image src={m.src} alt="" width={width} height={h} priority className={cn("block h-auto shrink-0 select-none", className)} style={{ width, height: h }} draggable={false} />;
}

export function Logo({ tone = "dark", compact = false, className }: { tone?: LogoTone; compact?: boolean; className?: string }) {
  const light = tone === "light";
  return (
    <Link href="/" aria-label={`${site.name} — home`} className={cn("flex shrink-0 items-center gap-3 no-underline", light ? "text-white" : "text-navy-900", className)}>
      <LogoMark tone={tone} />
      <span className={cn("flex flex-col leading-none", compact && "max-[359px]:hidden")}>
        <span className="font-display text-[18px] font-extrabold tracking-[-.02em]">
          Northline <span className={cn("font-bold", light ? "text-blue-300" : "text-blue-700")}>Air Care</span>
        </span>
        <span className={cn("mt-1 text-[9px] font-semibold uppercase tracking-[.22em]", light ? "text-white/70" : "text-navy-900/65")}>{site.tagline}</span>
      </span>
    </Link>
  );
}

/** The complete supplied wave lock-up, for light surfaces with room for a square image. */
export function LogoFull({ className, width = 220 }: { className?: string; width?: number }) {
  return <Image src="/brand/logo-full.png" alt={`${site.name} — ${site.tagline}`} width={1086} height={831} className={cn("h-auto", className)} style={{ width }} />;
}
