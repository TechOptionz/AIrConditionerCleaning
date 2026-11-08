import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, Phone } from "lucide-react";
import { contactPage } from "@/content/booking";
import { bookingFaqs } from "@/content/faqs";
import { images, frameAspect } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { isPlaceholder, telHref } from "@/lib/utils";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ContactForm } from "@/components/forms/ContactForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: contactPage.metaDescription,
  path: "/contact",
  image: images.banners.contact.src,
});

const card = "flex items-center gap-4 rounded-[18px] border border-line bg-white p-6 text-ink no-underline transition-shadow duration-250 hover:shadow-hover";
const iconWrap = "grid size-12 shrink-0 place-items-center rounded-md bg-teal-50";

export default function ContactPage() {
  const emailOk = !isPlaceholder(site.email);
  return (
    <>
      <PageBanner crumbs={[{ label: "Contact" }]} eyebrow={contactPage.eyebrow} lines={contactPage.h1Lines} lead={contactPage.lead} image={images.banners.contact} size="md" />

      <section className="py-[clamp(48px,6vw,80px)]">
        <div className="container-site">
          <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
            <StaggerItem>
              <a href={telHref(site.phone)} className={card}>
                <span className={iconWrap}>
                  <Phone className="size-[22px] text-teal-600" aria-hidden="true" />
                </span>
                <span>
                  <strong className="block text-[17px]">Call us</strong>
                  <span className="text-[14px] text-muted">
                    {site.phone} {site.phoneIsPlaceholder && <Placeholder>[PHONE]</Placeholder>}
                  </span>
                </span>
              </a>
            </StaggerItem>
            <StaggerItem>
              {emailOk ? (
                <a href={`mailto:${site.email}`} className={card}>
                  <span className={iconWrap}>
                    <Mail className="size-[22px] text-teal-600" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block text-[17px]">Email us</strong>
                    <span className="text-[14px] text-muted">{site.email}</span>
                  </span>
                </a>
              ) : (
                <div className={card}>
                  <span className={iconWrap}>
                    <Mail className="size-[22px] text-teal-600" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block text-[17px]">Email us</strong>
                    <span className="text-[14px] text-muted">
                      <Placeholder>{site.email}</Placeholder>
                    </span>
                  </span>
                </div>
              )}
            </StaggerItem>
            <StaggerItem>
              <div className={card}>
                <span className={iconWrap}>
                  <Clock className="size-[22px] text-teal-600" aria-hidden="true" />
                </span>
                <span>
                  <strong className="block text-[17px]">Business hours</strong>
                  <span className="text-[14px] text-muted">
                    <Placeholder>{site.hours}</Placeholder>
                  </span>
                </span>
              </div>
            </StaggerItem>
          </Stagger>

          <div className="mt-[clamp(40px,5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-[clamp(32px,5vw,64px)]">
            <Reveal className={`relative ${frameAspect(images.contact)} max-h-[620px] w-full overflow-hidden rounded-2xl bg-cream-100`}>
              <Image src={images.contact.src} alt={images.contact.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: images.contact.focal }} />
            </Reveal>
            <Reveal index={1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <FaqSection items={bookingFaqs} title="Booking questions" size="md" bg="none" id="h-booking-faq" />
      <QuoteCTA />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </>
  );
}
