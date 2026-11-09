import { signsSection } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconRing } from "@/components/ui/Accents";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * "Signs your air conditioner needs cleaning": heading column on the left and
 * a numbered, hairline-divided list on the right — no cards.
 */
export function Signs() {
  return (
    <section aria-labelledby="h-signs" className="section-y">
      <div className="container-site grid gap-[clamp(32px,5vw,72px)] lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="h-signs" eyebrow={signsSection.eyebrow} title={signsSection.title} lead={signsSection.lead} maxWidth="max-w-[460px]" />
          <Reveal delay={0.15} className="mt-7">
            <Button href={signsSection.cta.href} arrow>
              {signsSection.cta.label}
            </Button>
          </Reveal>
        </div>
        <Stagger as="ol" className="m-0 list-none border-t border-line p-0">
          {signsSection.signs.map((s, i) => (
            <StaggerItem as="li" key={s.title} className="group grid grid-cols-[auto_1fr] items-start gap-x-5 border-b border-line py-5 transition-colors sm:grid-cols-[48px_auto_1fr] sm:gap-x-6">
              <span className="hidden pt-2 font-display text-[13px] font-bold tracking-[.1em] text-faint transition-colors group-hover:text-blue-700 sm:block">{String(i + 1).padStart(2, "0")}</span>
              <IconRing>
                <s.icon strokeWidth={1.9} aria-hidden="true" />
              </IconRing>
              <div className="pt-0.5">
                <h3 className="m-0 text-[17px] font-semibold leading-[1.3] text-ink">{s.title}</h3>
                <p className="mt-1.5 max-w-[56ch] text-[14.5px] leading-[1.6] text-body">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
