import type { Metadata } from "next";
import Image from "next/image";
import { Check, User } from "lucide-react";
import { aboutPage } from "@/content/about";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ClipReveal } from "@/components/motion/ClipReveal";
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
        image={images.banners.about}
        actions={
          <Button href={a.cta.href} size="lg" className="!h-[52px]" arrow>
            {a.cta.label}
          </Button>
        }
      />

      {/* Who we are */}
      <section className="section-y-lg">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(32px,5vw,72px)]">
          <ClipReveal radius={28} className="aspect-[4/5] max-h-[600px] w-full bg-cream-100">
            <Image src={images.about.who.src} alt={images.about.who.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: images.about.who.focal }} />
          </ClipReveal>
          <div className="flex flex-col gap-7">
            <Reveal>
              <Eyebrow>{a.who.eyebrow}</Eyebrow>
              <h2 className="display-2 mt-[18px] text-ink">{a.who.title}</h2>
              <p className="mt-[18px] max-w-[56ch] text-[clamp(1.0625rem,1rem+.4vw,1.1875rem)] leading-[1.65] text-body">
                {a.who.bodyBefore}
                <Placeholder>{site.serviceRegion}</Placeholder>
                {a.who.bodyAfter}
              </p>
            </Reveal>
            <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
              {a.pillars.map((p) => (
                <StaggerItem key={p.title} className="flex flex-col gap-2.5 rounded-lg border border-line bg-white px-5 py-[18px] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-teal-600 hover:shadow-lift">
                  <div className="grid size-[38px] place-items-center rounded-[10px] bg-teal-50">
                    <p.icon className="size-[18px] text-teal-600" aria-hidden="true" />
                  </div>
                  <h3 className="m-0 text-[16px] font-semibold leading-[1.3] text-ink">{p.title}</h3>
                  <p className="m-0 text-[14px] leading-[1.5] text-body">{p.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* How we like to work */}
      <section className="dark-glow-left section-y-lg text-white">
        <div className="container-site">
          <Reveal className="max-w-[720px]">
            <Eyebrow tone="dark">{a.how.eyebrow}</Eyebrow>
            <h2 className="display-2 mt-[18px]">{a.how.title}</h2>
          </Reveal>
          <Stagger as="ol" className="m-0 mt-[clamp(32px,4vw,48px)] grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5 p-0">
            {a.how.principles.map((pr, i) => (
              <StaggerItem as="li" key={pr.title} className="flex flex-col gap-4 rounded-xl border border-white/12 bg-white/6 p-[clamp(22px,3vw,30px)] transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-teal-300/45 hover:bg-teal-600/22">
                <span className="font-display text-[clamp(2.25rem,2rem+1vw,3rem)] font-extrabold leading-[.9] tracking-[-.04em] text-teal-300">0{i + 1}</span>
                <h3 className="m-0 text-[19px] font-semibold leading-[1.3]">{pr.title}</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-white/78">{pr.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Approach */}
      <section className="section-y-lg bg-cream-100">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(32px,5vw,72px)]">
          <Reveal>
            <Eyebrow>{a.approach.eyebrow}</Eyebrow>
            <h2 className="display-2 mt-[18px] text-ink">{a.approach.title}</h2>
            <p className="mt-[18px] max-w-[56ch] text-[clamp(1.0625rem,1rem+.4vw,1.1875rem)] leading-[1.65] text-body">{a.approach.body}</p>
            <ul className="m-0 mt-6 flex list-none flex-col gap-3 p-0">
              {a.approach.commitments.map((c) => (
                <li key={c} className="flex items-start gap-3 font-medium leading-[1.5] text-ink">
                  <span className="mt-px grid size-6 shrink-0 place-items-center rounded-full bg-teal-600">
                    <Check className="size-3.5 text-white" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {images.about.approach.map((img, i) => (
              <Reveal key={`${img.src}-${i}`} index={i + 1} className={i === 0 ? "col-span-2 aspect-video overflow-hidden rounded-[22px] bg-teal-50" : "aspect-square overflow-hidden rounded-[22px] bg-teal-50"}>
                <div className="group relative h-full w-full">
                  <Image src={img.src} alt={img.alt} fill sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" style={{ objectPosition: img.focal }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team (placeholders) */}
      <section className="section-y-lg">
        <div className="container-site">
          <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div className="max-w-[620px]">
              <Eyebrow>{a.team.eyebrow}</Eyebrow>
              <h2 className="display-2 mt-[18px] text-ink">{a.team.title}</h2>
            </div>
            <p className="m-0 max-w-[44ch] leading-[1.6] text-body">{a.team.note}</p>
          </Reveal>
          <Stagger className="mt-[clamp(28px,4vw,40px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
            {a.team.members.map((m) => (
              <StaggerItem key={m.id} className="flex flex-col overflow-hidden rounded-[22px] border border-line bg-white transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-teal-600 hover:shadow-deep">
                <div className="grid aspect-[4/5] place-items-center bg-cream-100 text-faint" aria-hidden="true">
                  <User className="size-14" strokeWidth={1.2} />
                </div>
                <div className="flex flex-col gap-1.5 px-[22px] pb-6 pt-5">
                  <h3 className="m-0 font-display text-[18px] font-bold leading-[1.3] tracking-[-.01em] text-ink">
                    <Placeholder>{m.name}</Placeholder>
                  </h3>
                  <p className="m-0 text-[14px] leading-[1.5] text-muted">
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
