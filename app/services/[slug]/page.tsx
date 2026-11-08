import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Info, Phone } from "lucide-react";
import { services, getService, relatedServices, sharedServiceFaqs, detailSteps, safetyNote } from "@/content/services";
import { images, frameAspect } from "@/content/images";
import { site } from "@/content/site";
import { closingCta } from "@/content/home";
import { pageMetadata, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { telHref } from "@/lib/utils";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { PackageCards } from "@/components/sections/Packages";
import { FaqSection } from "@/components/sections/FaqSection";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { CompareSlider } from "@/components/sections/BeforeAfter";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) return {};
  return pageMetadata({ title: svc.h1, description: svc.metaDescription, path: `/services/${svc.slug}`, image: svc.images.hero.src });
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) notFound();

  const faqItems = [...svc.faqs, ...sharedServiceFaqs(svc.unit)];
  const related = relatedServices(svc);
  const pair = images.beforeAfter.find((p) => p.slug === svc.slug);
  const cta = closingCta.service(svc.unit);

  return (
    <>
      <PageBanner
        crumbs={[{ label: "Services", href: "/services" }, { label: svc.short }]}
        eyebrow="Cleaning by system type"
        lines={[svc.h1]}
        lead={svc.summary + " " + svc.intro.split(". ")[0] + "."}
        image={svc.images.hero}
        wide
        actions={
          <>
            <Button href="/book" size="lg" className="!h-[52px]" arrow>
              Request a Quote
            </Button>
            <Button href={telHref(site.phone)} size="lg" variant="outline-light" className="!h-[52px]" icon={<Phone className="size-4" aria-hidden="true" />}>
              Call {site.phone}
            </Button>
          </>
        }
      />

      {/* Overview + scope */}
      <section className="section-y">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(32px,5vw,72px)]">
          <ClipReveal radius={24} className={`${frameAspect(svc.images.detail)} max-h-[560px] w-full bg-cream-100`}>
            <Image src={svc.images.detail.src} alt={svc.images.detail.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: svc.images.detail.focal }} />
          </ClipReveal>
          <Reveal index={1}>
            <Eyebrow>Overview</Eyebrow>
            <h2 className="display-2 mt-3 text-ink">What to know about this system</h2>
            <p className="lead mt-4 max-w-[56ch] text-body">{svc.intro}</p>
            <h3 className="mt-8 text-[17px] font-semibold leading-[1.3] text-ink">What a service may include</h3>
            <ul className="m-0 mt-3.5 flex list-none flex-col gap-2.5 p-0">
              {svc.scope.map((s) => (
                <li key={s} className="flex items-start gap-3 leading-[1.5] text-body">
                  <span className="mt-px grid size-[22px] shrink-0 place-items-center rounded-full bg-teal-50">
                    <Check className="size-3.5 text-teal-600" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-[18px] text-[13px] leading-[1.5] text-muted">Inclusions are confirmed for your specific unit and access before any work is agreed.</p>
          </Reveal>
        </div>
      </section>

      {pair && (
        <section aria-labelledby="h-ba" className="pb-[clamp(64px,8vw,96px)]">
          <div className="container-site">
            <SectionHeading id="h-ba" eyebrow="Before and after" title={`What a ${svc.unit} clean can look like`} lead="Drag to compare. Illustrative until real job photos for this unit type are supplied." className="mb-[clamp(28px,4vw,40px)]" />
            <Reveal>
              <CompareSlider pair={pair} className="mx-auto max-w-[980px]" />
            </Reveal>
          </div>
        </section>
      )}

      {/* Packages */}
      <section className="section-y bg-cream-100">
        <div className="container-site">
          <SectionHeading eyebrow="Packages" title="Choose the level of attention your unit needs" align="center" className="mb-[clamp(32px,4vw,48px)]" />
          <PackageCards />
        </div>
      </section>

      {/* Process */}
      <section className="dark-glow-right section-y text-white">
        <div className="container-site">
          <Reveal className="mb-[clamp(32px,4vw,48px)] max-w-[720px]">
            <Eyebrow tone="dark">Process</Eyebrow>
            <h2 className="display-2 mt-3">How the appointment works</h2>
          </Reveal>
          <Stagger as="ol" className="relative m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4 p-0">
            {detailSteps.map((st, i) => (
              <StaggerItem as="li" key={st.title} className="relative flex min-h-[200px] flex-col gap-4 rounded-[18px] border border-white/12 bg-white/6 p-6 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-teal-300/45 hover:bg-teal-600/22">
                <div className="flex items-center gap-3">
                  <span className="grid size-[42px] shrink-0 place-items-center rounded-full bg-teal-600 font-display text-[15px] font-bold leading-none shadow-[0_0_0_6px_rgba(19,124,139,.18)]">{i + 1}</span>
                  <span className="h-px flex-1 bg-teal-300/30" aria-hidden="true" />
                </div>
                <h3 className="m-0 text-[17px] font-semibold leading-[1.3]">{st.title}</h3>
                <p className="m-0 mt-auto text-[14px] leading-[1.55] text-white/72">{st.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal as="p" className="mt-8 flex max-w-[880px] items-start gap-3 rounded-md border border-white/12 bg-white/6 px-[18px] py-4 text-[14px] leading-[1.55] text-white/80">
            <Info className="mt-px size-5 shrink-0 text-teal-300" aria-hidden="true" />
            {safetyNote}
          </Reveal>
        </div>
      </section>

      <FaqSection items={faqItems} title="Questions about this service" size="lg" bg="none" id="h-svc-faq" />

      <section aria-labelledby="h-related" className="pb-[clamp(64px,8vw,96px)]">
        <div className="container-site">
          <Reveal>
            <h2 id="h-related" className="display-3 mb-6 text-ink">
              Related services
            </h2>
          </Reveal>
          <ServiceGrid items={related} columns={3} />
        </div>
      </section>

      <QuoteCTA title={cta.title} lead={cta.lead} />

      <JsonLd
        data={[
          serviceJsonLd({ name: svc.h1, description: svc.metaDescription, path: `/services/${svc.slug}` }),
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: svc.short, path: `/services/${svc.slug}` },
          ]),
        ]}
      />
    </>
  );
}
