import Image from "next/image";
import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { images } from "@/content/images";
import { closingCta } from "@/content/home";
import { telHref } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Airflow } from "@/components/ui/Accents";

/**
 * The single closing CTA used on most pages (never on /book or /thank-you):
 * a full-width navy band — the one deliberate dark section per page — with
 * photography on the right and a blue accent block.
 */
export function QuoteCTA({ title, lead }: { title?: string; lead?: string }) {
  const t = title ?? closingCta.default.title;
  const l = lead ?? closingCta.default.lead;
  const phoneOk = !site.phoneIsPlaceholder;
  return (
    <section aria-labelledby="h-cta" className="relative overflow-hidden bg-navy-900 text-white">
      <Airflow tone="dark" className="-left-[5%] bottom-0 h-[200px] w-[70%] lg:w-[55%]" animate={false} />
      <div className="container-site relative grid items-stretch lg:grid-cols-[1.1fr_1fr]">
        <Reveal className="relative py-[clamp(56px,8vw,104px)] lg:pr-[clamp(32px,5vw,72px)]">
          <Eyebrow tone="dark">Get started</Eyebrow>
          <h2 id="h-cta" className="display-2 mt-4 max-w-[18ch] text-white">
            {t}
          </h2>
          <p className="mt-4 max-w-[50ch] text-[16px] leading-[1.65] text-white/78">{l}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/book" size="lg" arrow>
              Request a Booking
            </Button>
            {phoneOk ? (
              <Button href={telHref(site.phone)} size="lg" variant="outline-light" icon={<Phone className="size-4" aria-hidden="true" />}>
                Call {site.phone}
              </Button>
            ) : (
              <Button href="/contact" size="lg" variant="outline-light">
                Ask a question
              </Button>
            )}
          </div>
        </Reveal>
        <div className="relative -mx-[clamp(16px,4vw,40px)] min-h-[260px] lg:mx-0 lg:min-h-0">
          <div className="absolute inset-0 lg:left-0 lg:right-[calc(-50vw+50%)]">
            <Parallax strength={0.08}>
              <Image src={images.cta.src} alt={images.cta.alt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" style={{ objectPosition: images.cta.focal }} />
            </Parallax>
            <span className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/20 to-transparent hidden lg:block" aria-hidden="true" />
            <span className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-navy-900 to-transparent lg:hidden" aria-hidden="true" />
          </div>
          <span className="absolute bottom-8 left-0 hidden h-1.5 w-24 bg-blue-600 lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
