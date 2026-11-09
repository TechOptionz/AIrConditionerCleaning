import type { LegalDoc } from "@/content/legal";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { HeroUp } from "@/components/motion/HeroText";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageBanner crumbs={[{ label: doc.title }]} eyebrow="Legal" lines={[doc.title]} lead={doc.intro} wide>
        <HeroUp as="p" delay={0.45} className="mt-4 text-[13.5px] text-muted">
          Last updated: <Placeholder>{doc.lastUpdated}</Placeholder>
        </HeroUp>
      </PageBanner>
      <section className="section-y">
        <div className="container-narrow grid gap-10 lg:grid-cols-[200px_1fr]">
          <nav aria-label="On this page" className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow block text-blue-700">Contents</span>
            <ol className="m-0 mt-4 flex list-none flex-col gap-2 border-l border-line p-0">
              {doc.sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${slug(s.heading)}`} className="-ml-px block border-l-2 border-transparent py-0.5 pl-4 text-[13.5px] text-body no-underline hover:border-blue-600 hover:text-blue-700">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="flex flex-col gap-8">
            {doc.sections.map((s, i) => (
              <Reveal key={s.heading} index={Math.min(i, 3)} id={slug(s.heading)} className="scroll-mt-28">
                <h2 className="m-0 font-display text-[clamp(1.125rem,1rem+.5vw,1.375rem)] font-bold text-ink">{s.heading}</h2>
                <p className={cn("mt-3 leading-[1.7] text-body", s.placeholder && "rounded-md border border-dashed border-line-strong bg-sky-50 px-4 py-3.5 font-mono text-[13.5px]")}>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: doc.title, path: `/${doc.slug}` }])} />
    </>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
