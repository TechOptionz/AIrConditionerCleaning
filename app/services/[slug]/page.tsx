import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Info, Phone } from "lucide-react";
import { services, getService, relatedServices, sharedServiceFaqs, detailSteps, safetyNote } from "@/content/services";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { closingCta } from "@/content/home";
import { pageMetadata, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { telHref } from "@/lib/utils";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Airflow, BlueBlock, FramedMedia, InfoPanel } from "@/components/ui/Accents";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { PackageCards } from "@/components/sections/Packages";
import { FaqSection } from "@/components/sections/FaqSection";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { BeforeAfterMedia } from "@/components/sections/BeforeAfter";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";

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
  const phoneOk = !site.phoneIsPlaceholder;

  return (
    <>
      <PageBanner
        variant="split"
        crumbs={[{ label: "Services", href: "/services" }, { label: svc.short }]}
        eyebrow="Cleaning by system type"
        lines={[svc.h1]}
        lead={svc.summary + " " + svc.intro.split(". ")[0] + "."}
        image={svc.images.hero}
        wide
        actions={
          <>
            <Button href="/book" size="lg" arrow>
              Request a Quote
            </Button>
            {phoneOk ? (
              <Button href={telHref(site.phone)} size="lg" variant="outline" icon={<Phone className="size-4 text-blue-600" aria-hidden="true" />}>
                Call {site.phone}
              </Button>
            ) : (
              <Button href="/contact" size="lg" variant="outline">
                Ask a question
              </Button>
            )}
          </>
        }
      />

      {/* Overview + scope */}
      <section className="pb-[clamp(56px,7vw,88px)] pt-[clamp(64px,9vw,112px)]">
        <div className="container-site grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <SectionHeading variant="numbered" number={1} eyebrow="Overview" title="What to know about this system" />
            <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.7] text-body">{svc.intro}</p>
            <div className="mt-8 border-t border-line pt-6">
              <h3 className="m-0 font-display text-[17px] font-bold leading-[1.3] text-ink">What a service may include</h3>
              <ul className="m-0 mt-4 grid list-none gap-x-6 gap-y-3 p-0 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {svc.scope.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[14.5px] leading-[1.55] text-body">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[13px] leading-[1.5] text-muted">Inclusions are confirmed for your specific unit and access before any work is agreed.</p>
            </div>
          </Reveal>

          <div className="relative pl-6 pt-6">
            <BlueBlock tone="sky" className="left-0 top-0 size-24" />
            <FramedMedia className="relative bg-white">
              <ClipReveal radius={2} className="absolute inset-0">
                <Image src={svc.images.detail.src} alt={svc.images.detail.alt} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" style={{ objectPosition: svc.images.detail.focal }} />
              </ClipReveal>
            </FramedMedia>
            <Reveal delay={0.2} className="relative -mt-8 ml-auto w-[min(88%,420px)] shadow-lift">
              <InfoPanel tone="white" label="Good to know" icon={<Info />}>
                {safetyNote}
              </InfoPanel>
            </Reveal>
          </div>
        </div>
      </section>

      {pair && (
        <section aria-labelledby="h-ba" className="pb-[clamp(56px,7vw,88px)]">
          <div className="container-site grid items-center gap-[clamp(28px,4vw,64px)] lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading id="h-ba" variant="numbered" number={2} eyebrow="Before and after" title={`What a ${svc.unit} clean can look like`} lead="The photographs show the type of work involved; every unit and level of build-up is different." maxWidth="max-w-[440px]" />
            <Reveal>
              <BeforeAfterMedia pair={pair} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Packages */}
      <section className="section-y border-y border-line bg-sky-50">
        <div className="container-site">
          <SectionHeading variant="split" number={3} eyebrow="Levels of care" title="Choose the level of attention your unit needs" lead="Every option is quoted after we understand the unit, its condition and access. We confirm the scope before any work is arranged." className="mb-[clamp(28px,4vw,44px)]" />
          <PackageCards />
        </div>
      </section>

      {/* Process */}
      <section className="section-y-lg relative overflow-hidden">
        <Airflow className="-left-[10%] top-[60%] h-[240px] w-[120%] -translate-y-1/2 opacity-70" />
        <div className="container-site relative">
          <SectionHeading variant="centered" eyebrow="Process" title="How the appointment works" className="mb-[clamp(36px,5vw,60px)]" />
          <ProcessTimeline steps={detailSteps} />
        </div>
      </section>

      <FaqSection items={faqItems} eyebrow="Questions" title="Questions about this service" lead="Unit-specific answers first, followed by the questions every service shares." id="h-svc-faq" link={{ label: "Visit the help centre", href: "/faq" }} />

      <section aria-labelledby="h-related" className="section-y">
        <div className="container-site">
          <SectionHeading id="h-related" eyebrow="Related" title="Related services" size="md" className="mb-7" />
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
