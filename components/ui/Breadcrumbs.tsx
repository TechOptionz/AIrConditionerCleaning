import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, className, tone = "light" }: { items: Crumb[]; className?: string; tone?: "dark" | "light" }) {
  const muted = tone === "dark" ? "text-white/70" : "text-muted";
  const current = tone === "dark" ? "text-white" : "text-ink";
  return (
    <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center text-[13px] font-medium", muted, className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="text-inherit no-underline transition-colors hover:text-blue-700">
            Home
          </Link>
        </li>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />
              {last || !c.href ? (
                <span className={current} aria-current={last ? "page" : undefined}>
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="text-inherit no-underline transition-colors hover:text-blue-700">
                  {c.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
