import type { Metadata } from "next";
import Image from "next/image";
import { Check, User } from "lucide-react";
import { aboutPage } from "@/content/about";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { Eyebrow, SectionHeading, IconTile, StepNumber } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { BlueBlock, CornerBrackets } from "@/components/ui/Accents";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: aboutPage.metaDescription,
  path: "/about",
  image: images.banners.about.src,
});

export default function AboutPage() {
  const a = aboutPage;
  return (
    <>
      <PageBanner
        crumbs={[{ label: "About" }]}
        eyebrow={a.eyebrow}
        lines={a.h1Lines}
        lead={a.lead}
        actions={
          <Button href={a.cta.href} size="lg" arrow>
            {a.cta.label}
          </Button>
        }
      />

      {/* Who we are: offset photo + pillars */}
      <section className="section-y-lg">
        <div className="container-site grid items-center gap-[clamp(36px,5vw,80px)] lg:grid-cols-[1fr_1.1fr]">
          <div className="relative pb-8 pl-6">
            <BlueBlock tone="sky" className="bottom-0 left-0 h-[70%] w-[60%]" />
            <BlueBlock className="left-0 top-10 h-24 w-1.5" />
            <div className="relative">
              <CornerBrackets corners={["br"]} size={36} inset={-10} />
              <ClipReveal radius={6} className="relative aspect-[5/4] w-full bg-sky-100">
                <Image src={images.about.who.src} alt={images.about.who.alt} fill sizes="(max-width: 1024px) 100vw, 540px" className="object-cover" style={{ objectPosition: images.about.who.focal }} />
              </ClipReveal>
            </div>
          </div>
          <div>
            <Reveal>
              <Eyebrow>{a.who.eyebrow}</Eyebrow>
              <h2 className="display-2 mt-3.5 text-ink">{a.who.title}</h2>
              <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.7] text-body">
                {a.who.bodyBefore}
                <Placeholder>{site.serviceRegion}</Placeholder>
                {a.who.bodyAfter}
              </p>
            </Reveal>
            <Stagger className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {a.pillars.map((p) => (
                <StaggerItem key={p.title} className="flex gap-4">
                  <IconTile size="md">
                    <p.icon strokeWidth={1.8} aria-hidden="true" />
                  </IconTile>
                  <div>
                    <h3 className="m-0 text-[16px] font-semibold leading-[1.3] text-ink">{p.title}</h3>
                    <p className="m-0 mt-1.5 text-[14px] leading-[1.55] text-body">{p.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* How we like to work: three numbered columns */}
      <section className="section-y border-y border-line bg-sky-50">
        <div className="container-site">
          <SectionHeading variant="split" eyebrow={a.how.eyebrow} title={a.how.title} lead="Three principles shape every enquiry, from the first message to the day of the visit." className="mb-[clamp(32px,4vw,48px)]" />
          <Stagger as="ol" className="m-0 grid list-none gap-x-8 gap-y-8 p-0 md:grid-cols-3">
            {a.how.principles.map((pr, i) => (
              <StaggerItem as="li" key={pr.title} className="relative border-t border-line-strong pt-6">
                <span className="absolute left-0 top-0 h-px w-12 bg-blue-600" aria-hidden="true" />
                <StepNumber n={i + 1} />
                <h3 className="m-0 mt-5 font-display text-[19px] font-bold leading-[1.3] tracking-[-.01em] text-ink">{pr.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.65] text-body">{pr.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Approach: text + three-photo collage */}
      <section className="section-y-lg">
        <div className="container-site grid items-center gap-[clamp(36px,5vw,80px)] lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <Eyebrow>{a.approach.eyebrow}</Eyebrow>
            <h2 className="display-2 mt-3.5 text-ink">{a.approach.title}</h2>
            <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.7] text-body">{a.approach.body}</p>
            <ul className="m-0 mt-7 flex list-none flex-col gap-3 p-0">
              {a.approach.commitments.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[15px] font-medium leading-[1.5] text-ink">
                  <span className="mt-px grid size-[22px] shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="grid grid-cols-2 gap-3">
            {images.about.approach.map((img, i) => (
              <Reveal key={`${img.src}-${i}`} index={i + 1} className={i === 0 ? "col-span-2 aspect-[16/9] overflow-hidden rounded-lg bg-sky-100" : "aspect-[4/3] overflow-hidden rounded-lg bg-sky-100"}>
                <div className="group relative h-full w-full">
                  <Image src={img.src} alt={img.alt} fill sizes={i === 0 ? "(max-width: 1024px) 100vw, 560px" : "(max-width: 1024px) 50vw, 280px"} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" style={{ objectPosition: img.focal }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team (placeholders) */}
      <section className="section-y border-t border-line">
        <div className="container-site">
          <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <SectionHeading eyebrow={a.team.eyebrow} title={a.team.title} maxWidth="max-w-[520px]" />
            <p className="m-0 max-w-[44ch] text-[14px] leading-[1.6] text-muted">{a.team.note}</p>
          </Reveal>
          <Stagger className="mt-[clamp(28px,4vw,40px)] grid grid-cols-1 gap-5 sm:grid-cols-3">
            {a.team.members.map((m) => (
              <StaggerItem key={m.id} className="flex items-center gap-4 rounded-lg border border-line bg-white p-4 sm:flex-col sm:items-stretch sm:p-0">
                <div className="grid size-16 shrink-0 place-items-center rounded-md bg-sky-50 text-faint sm:aspect-[4/3] sm:size-auto sm:w-full sm:rounded-none sm:rounded-t-lg" aria-hidden="true">
                  <User className="size-8 sm:size-12" strokeWidth={1.2} />
                </div>
                <div className="flex flex-col gap-1.5 sm:p-5">
                  <h3 className="m-0 text-[16px] font-semibold leading-[1.3] text-ink">
                    <Placeholder>{m.name}</Placeholder>
                  </h3>
                  <p className="m-0 text-[13.5px] leading-[1.5] text-muted">
                    <Placeholder>{m.role}</Placeholder>
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <QuoteCTA />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
    </>
  );
}
