import type { LegalDoc } from "@/content/legal";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { HeroUp, LineUp } from "@/components/motion/HeroText";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <section className="dark-glow-right relative -mt-20 pb-[clamp(40px,5vw,64px)] pt-[calc(80px+clamp(40px,6vw,72px))] text-white">
        <div className="container-narrow">
          <HeroUp as="nav">
            <Breadcrumbs items={[{ label: doc.title }]} />
          </HeroUp>
          <HeroUp delay={0.1} className="eyebrow mt-7 flex items-center gap-3 text-teal-300">
            <span className="h-0.5 w-8 bg-teal-300" aria-hidden="true" />
            Legal
          </HeroUp>
          <h1 className="display-1 mt-[18px]">
            <LineUp lines={[doc.title]} />
          </h1>
          <HeroUp as="p" delay={0.45} className="mt-4 text-[14px] text-white/65">
            Last updated: <Placeholder tone="dark">{doc.lastUpdated}</Placeholder>
          </HeroUp>
        </div>
      </section>
      <section className="py-[clamp(48px,6vw,80px)]">
        <div className="container-narrow flex flex-col gap-7">
          <Reveal as="p" className="lead text-body">
            {doc.intro}
          </Reveal>
          {doc.sections.map((s, i) => (
            <Reveal key={s.heading} index={Math.min(i, 3)}>
              <h2 className="m-0 font-display text-[clamp(1.25rem,1.1rem+.6vw,1.5rem)] font-bold text-ink">{s.heading}</h2>
              <p className={cn("mt-2.5 leading-[1.65] text-body", s.placeholder && "rounded-md border border-dashed border-line-strong bg-white px-4 py-3.5 font-mono text-[13.5px]")}>{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: doc.title, path: `/${doc.slug}` }])} />
    </>
  );
}
