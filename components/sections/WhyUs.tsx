import { whyUs } from "@/content/home";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";

export function WhyUs() {
  return (
    <section aria-labelledby="h-why" className="dark-glow-left section-y-lg text-white">
      <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(40px,5vw,80px)]">
        <Reveal>
          <Eyebrow tone="dark">{whyUs.eyebrow}</Eyebrow>
          <h2 id="h-why" className="display-2 mt-3">
            {whyUs.title}
          </h2>
          <p className="lead mt-4 max-w-[48ch] text-white/80">{whyUs.lead}</p>
          <Button href={whyUs.cta.href} variant="outline-light" size="lg" arrow className="mt-7 !h-[52px]">
            {whyUs.cta.label}
          </Button>
        </Reveal>
        <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
          {whyUs.features.map((f) => (
            <StaggerItem key={f.title} className="group relative overflow-hidden rounded-[18px] border border-white/12 bg-white/6 p-6 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-teal-300/45 hover:bg-teal-600/22">
              <div className="grid size-11 place-items-center rounded-md bg-teal-300/15 transition-[background-color,transform] duration-300 group-hover:scale-105">
                <f.icon className="size-5 text-teal-300" strokeWidth={1.9} aria-hidden="true" />
              </div>
              <h3 className="mt-3.5 text-[17px] font-semibold leading-[1.3]">{f.title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-[1.55] text-white/75">{f.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
