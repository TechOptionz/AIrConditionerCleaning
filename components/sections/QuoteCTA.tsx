import Image from "next/image";
import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { images } from "@/content/images";
import { closingCta } from "@/content/home";
import { telHref } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Button } from "@/components/ui/Button";

/** The single closing CTA band used on most pages (never on /book or /thank-you). */
export function QuoteCTA({ title, lead }: { title?: string; lead?: string }) {
  const t = title ?? closingCta.default.title;
  const l = lead ?? closingCta.default.lead;
  return (
    <section aria-labelledby="h-cta" className="pb-[clamp(64px,8vw,96px)]">
      <div className="container-site">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-stretch overflow-hidden rounded-[28px] bg-teal-600 text-white">
          <div className="flex flex-col justify-center p-[clamp(32px,5vw,64px)]">
            <h2 id="h-cta" className="display-2 max-w-[18ch]">
              {t}
            </h2>
            <p className="lead mt-4 max-w-[48ch] text-white/85">{l}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/book" variant="navy" className="!h-[52px] !bg-navy-900 hover:!bg-navy-800" arrow>
                Request a Booking
              </Button>
              <Button href={telHref(site.phone)} variant="outline-light" className="!h-[52px]" icon={<Phone className="size-4" aria-hidden="true" />}>
                Call {site.phone}
              </Button>
            </div>
          </div>
          <div className="relative min-h-[300px] bg-white/8">
            <Parallax strength={0.1}>
              <Image src={images.cta.src} alt={images.cta.alt} fill sizes="(max-width: 1024px) 100vw, 620px" className="object-cover" style={{ objectPosition: images.cta.focal }} />
            </Parallax>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
