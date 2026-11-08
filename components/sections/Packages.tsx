import { CalendarCheck, Sparkles } from "lucide-react";
import { packagesSection } from "@/content/home";
import { packages } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Homepage teaser: two cards, no prices (quotes only). */
export function PackagesTeaser() {
  const icons = [CalendarCheck, Sparkles];
  return (
    <section aria-labelledby="h-packages" className="section-y bg-cream-100">
      <div className="container-site">
        <SectionHeading id="h-packages" eyebrow={packagesSection.eyebrow} title={packagesSection.title} align="center" className="mb-[clamp(32px,4vw,48px)]" />
        <div className="mx-auto grid max-w-[960px] grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-6">
          {packagesSection.cards.map((c, i) => {
            const Icon = icons[i];
            const dark = c.tone === "dark";
            return (
              <Reveal
                key={c.title}
                index={i + 1}
                className={cn(
                  "flex flex-col rounded-xl p-[clamp(24px,3vw,36px)] transition-[transform,box-shadow,border-color] duration-300",
                  dark ? "bg-navy-900 text-white" : "border border-line bg-white hover:-translate-y-1 hover:border-teal-600 hover:shadow-lift",
                )}
              >
                <div className={cn("grid size-12 place-items-center rounded-md", dark ? "bg-white/10" : "bg-teal-50")}>
                  <Icon className={cn("size-[22px]", dark ? "text-teal-300" : "text-teal-600")} aria-hidden="true" />
                </div>
                <h3 className={cn("display-3 mt-5", dark ? "text-white" : "text-ink")}>{c.title}</h3>
                <p className={cn("mt-3 flex-1 leading-[1.6]", dark ? "text-white/80" : "text-body")}>{c.body}</p>
                <Button href="/book" variant={dark ? "primary" : "navy"} className="mt-6 self-start">
                  {c.cta}
                </Button>
              </Reveal>
            );
          })}
        </div>
        <Reveal as="p" index={3} className="mx-auto mt-7 max-w-[720px] text-center text-[14px] leading-[1.55] text-muted">
          {packagesSection.note}
        </Reveal>
      </div>
    </section>
  );
}

/** Service-detail packages: three quote-only cards. */
export function PackageCards() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
      {packages.map((p, i) => {
        const dark = p.tone === "dark";
        return (
          <Reveal
            key={p.id}
            index={i}
            className={cn(
              "relative flex flex-col rounded-xl border p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-deep",
              dark ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white text-ink",
            )}
          >
            {p.featured && (
              <span className="absolute -top-3 left-7 rounded-full bg-teal-600 px-3 py-[7px] text-[11.5px] font-semibold uppercase leading-none tracking-[.08em] text-white">Recommended after inspection</span>
            )}
            <h3 className="m-0 text-[18px] font-semibold leading-[1.3]">{p.name}</h3>
            <div className="mt-3.5 font-display text-[clamp(1.75rem,1.4rem+1vw,2.25rem)] font-extrabold leading-none tracking-[-.02em]">Quote</div>
            <div className="mt-1.5 text-[13px] opacity-75">Pricing confirmed once your unit and access are known</div>
            <p className="mt-[18px] flex-1 text-[14.5px] leading-[1.55] opacity-90">{p.body}</p>
            <Button href="/book" variant={dark ? "primary" : p.tone === "tint" ? "tint" : "navy"} className="mt-6 w-full">
              Request a quote
            </Button>
          </Reveal>
        );
      })}
    </div>
  );
}
