import { cn } from "@/lib/utils";

/**
 * Renders unconfirmed business details (e.g. "[HOURS]") in a visibly
 * provisional monospace style so they are never mistaken for real facts.
 */
export function Placeholder({ children, className, tone = "light" }: { children: string; className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "rounded-[6px] px-1.5 py-0.5 font-mono text-[0.85em]",
        tone === "light" ? "bg-cream-100 text-muted" : "bg-white/10 text-white/70",
        className,
      )}
      title="Placeholder — to be confirmed by the business"
    >
      {children}
    </span>
  );
}

/** Amber development notice used by forms when no delivery provider is configured. */
export function DevNotice({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("rounded-[10px] border border-warn-line bg-warn-bg px-3.5 py-3 font-mono text-[12px] leading-[1.5] text-warn-ink", className)} role="status">
      {children}
    </p>
  );
}
