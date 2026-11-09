import Image from "next/image";
import { Check } from "lucide-react";
import { aboutSplit } from "@/content/home";
import { images } from "@/content/images";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { AccentRule, BlueBlock, CornerBrackets } from "@/components/ui/Accents";

/**
 * "Why choose us" split: large rectangular photograph with a small overlapping
 * detail shot and a blue accent block on the left; heading, intro, two-column
 * check list and a quoted commitment on the right.
 */
export function AboutSplit() {
  const a = aboutSplit;
  return (
    <section aria-labelledby="h-about" className="section-y-lg bg-sky-50">
      <div className="container-site grid items-center gap-[clamp(40px,6vw,88px)] lg:grid-cols-[1.05fr_1fr]">
        <div className="relative pb-10 pr-8 sm:pr-14 lg:pb-14">
          <div className="relative">
            <CornerBrackets corners={["tl"]} size={40} inset={-12} />
            <ClipReveal radius={6} className="aspect-[4/3] w-full bg-navy-900">
              <Image src={images.home.about.src} alt={images.home.about.alt} fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" style={{ objectPosition: images.home.about.focal }} />
            </ClipReveal>
          </div>
          {/* Overlapping detail photo */}
          <Reveal delay={0.25} className="absolute bottom-0 right-0 w-[44%] max-w-[260px] overflow-hidden rounded-md border-[6px] border-sky-50 bg-white shadow-lift">
            <div className="relative aspect-square">
              <Image src={images.home.aboutDetail.src} alt={images.home.aboutDetail.alt} fill sizes="260px" className="object-cover" style={{ objectPosition: images.home.aboutDetail.focal }} />
            </div>
          </Reveal>
          {/* Offset background shape behind the image group */}
          <BlueBlock tone="sky" className="-bottom-6 -left-6 -z-[1] hidden h-[55%] w-[45%] lg:block" />
        </div>

        <div>
          <Reveal>
            <Eyebrow>{a.eyebrow}</Eyebrow>
            <h2 id="h-about" className="display-2 mt-3.5 text-ink">
              {a.title}
            </h2>
            <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.7] text-body">{a.lead}</p>
          </Reveal>
          <Stagger as="ul" className="m-0 mt-7 grid list-none grid-cols-1 gap-x-8 gap-y-3 p-0 sm:grid-cols-2">
            {a.points.map((p) => (
              <StaggerItem as="li" key={p} className="flex items-start gap-3 text-[15px] font-medium leading-[1.45] text-ink">
                <span className="mt-px grid size-[22px] shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {p}
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="relative mt-8 pl-5">
            <AccentRule />
            <p className="m-0 font-display text-[17px] font-bold leading-[1.45] text-ink">&ldquo;{a.quote}&rdquo;</p>
          </Reveal>
          <Reveal delay={0.25} className="mt-7">
            <ArrowLink href={a.cta.href}>{a.cta.label}</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
