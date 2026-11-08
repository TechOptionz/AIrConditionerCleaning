import { signsSection } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

/** "Signs your air conditioner needs cleaning" — five symptom cards and one CTA. */
export function Signs() {
  return (
    <section aria-labelledby="h-signs" className="section-y bg-cream-100">
      <div className="container-site">
        <SectionHeading id="h-signs" eyebrow={signsSection.eyebrow} title={signsSection.title} lead={signsSection.lead} className="mb-[clamp(32px,4vw,48px)]" />
        <Stagger as="ol" className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:max-lg:[&>li:last-child]:col-span-2 lg:grid-cols-3 xl:grid-cols-5">
          {signsSection.signs.map((s, i) => (
            <StaggerItem as="li" key={s.title} className="group flex flex-col gap-3.5 rounded-xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-teal-600 hover:shadow-lift">
              <div className="flex items-center justify-between">
                <div className="grid size-11 place-items-center rounded-md bg-teal-50">
                  <s.icon className="size-5 text-teal-600" strokeWidth={1.9} aria-hidden="true" />
                </div>
                <span className="font-display text-[14px] font-bold tracking-[.08em] text-faint">0{i + 1}</span>
              </div>
              <h3 className="m-0 text-[17px] font-semibold leading-[1.3] text-ink">{s.title}</h3>
              <p className="m-0 text-[14.5px] leading-[1.55] text-body">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal index={2} className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="m-0 max-w-[60ch] text-[14px] leading-[1.55] text-muted">Noticing one of these doesn&apos;t guarantee a clean is the answer. Describe the symptom and we&apos;ll recommend the appropriate next step.</p>
          <Button href={signsSection.cta.href} arrow>
            {signsSection.cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
