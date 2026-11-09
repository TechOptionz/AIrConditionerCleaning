import { packages } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Service-detail packages: three quote-only columns divided by hairlines; the
 * recommended option is marked with a blue top rule instead of a dark card.
 */
export function PackageCards() {
  return (
    <div className="grid overflow-hidden rounded-lg border border-line bg-white md:grid-cols-3">
      {packages.map((p, i) => {
        const featured = Boolean(p.featured);
        return (
          <Reveal
            key={p.id}
            index={i}
            className={cn(
              "relative flex flex-col p-7 transition-colors duration-300 hover:bg-sky-50 md:border-l md:border-line md:first:border-l-0",
              "border-t border-line first:border-t-0 md:border-t-0",
              featured && "bg-sky-50/60",
            )}
          >
            <span className={cn("absolute inset-x-0 top-0 h-[3px]", featured ? "bg-blue-600" : "bg-transparent")} aria-hidden="true" />
            <span className="eyebrow text-blue-700">{p.sub}</span>
            <h3 className="m-0 mt-3 font-display text-[20px] font-bold leading-[1.25] tracking-[-.01em] text-ink">{p.name}</h3>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-[clamp(1.75rem,1.4rem+1vw,2.25rem)] font-extrabold leading-none tracking-[-.02em] text-ink">Quote</span>
              <span className="text-[13px] text-muted">on request</span>
            </div>
            <p className="mt-1.5 text-[13px] leading-[1.5] text-muted">Pricing confirmed once your unit and access are known</p>
            <p className="mt-5 flex-1 text-[14.5px] leading-[1.6] text-body">{p.body}</p>
            {featured && <span className="mt-5 inline-flex w-fit items-center rounded-sm bg-action px-2.5 py-1.5 text-[11px] font-semibold uppercase leading-none tracking-[.1em] text-white">Recommended after inspection</span>}
            <Button href="/book" variant={featured ? "primary" : "outline"} className={cn("w-full", featured ? "mt-4" : "mt-6")}>
              Request a quote
            </Button>
          </Reveal>
        );
      })}
    </div>
  );
}
