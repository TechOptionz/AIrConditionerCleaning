import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Brand lock-up built from the supplied Northline Air Care wave logo.
 *
 * The client's file is a stacked square lock-up (waves over a navy/teal
 * wordmark), which is too tall for a 64–80 px header, so the wave mark is cut
 * out as its own asset and paired with a text wordmark styled to match:
 *   /brand/logo-mark.png        navy + teal waves, for light backgrounds
 *   /brand/logo-mark-light.png  white + pale-teal waves, for dark backgrounds
 *   /brand/logo-full.png        the complete lock-up (print, social, light pages)
 */
const MARK = { src: "/brand/logo-mark.png", width: 480, height: 169 };
const MARK_LIGHT = { src: "/brand/logo-mark-light.png", width: 480, height: 169 };

export type LogoTone = "light" | "dark";

export function LogoMark({ tone = "dark", height = 30, className }: { tone?: LogoTone; height?: number; className?: string }) {
  const m = tone === "light" ? MARK_LIGHT : MARK;
  const width = Math.round((m.width / m.height) * height);
  return <Image src={m.src} alt="" width={width} height={height} priority className={cn("block h-auto shrink-0 select-none", className)} style={{ width, height }} draggable={false} />;
}

export function Logo({ tone = "dark", compact = false, className }: { tone?: LogoTone; compact?: boolean; className?: string }) {
  const light = tone === "light";
  return (
    <Link href="/" aria-label={`${site.name} — home`} className={cn("flex shrink-0 items-center gap-3 no-underline", light ? "text-white" : "text-navy-900", className)}>
      <LogoMark tone={tone} height={30} />
      <span className={cn("flex flex-col leading-none", compact && "max-[359px]:hidden")}>
        <span className="font-display text-[19px] font-extrabold tracking-[-.02em]">
          Northline <span className={cn("font-bold", light ? "text-teal-300" : "text-teal-600")}>Air Care</span>
        </span>
        <span className={cn("mt-1 text-[9.5px] font-semibold uppercase tracking-[.22em]", light ? "text-white/75" : "text-navy-900/75")}>{site.tagline}</span>
      </span>
    </Link>
  );
}

/** The complete supplied lock-up, for light surfaces with room for a square image. */
export function LogoFull({ className, width = 220 }: { className?: string; width?: number }) {
  return <Image src="/brand/logo-full.png" alt={`${site.name} — ${site.tagline}`} width={1086} height={831} className={cn("h-auto", className)} style={{ width }} />;
}
