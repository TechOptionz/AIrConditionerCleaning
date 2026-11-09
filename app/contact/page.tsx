import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contactPage } from "@/content/booking";
import { bookingFaqs } from "@/content/faqs";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { isPlaceholder, telHref } from "@/lib/utils";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { Placeholder } from "@/components/ui/Placeholder";
import { IconTile } from "@/components/ui/SectionHeading";
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

export default function ContactPage() {
  const emailOk = !isPlaceholder(site.email);
  const phoneOk = !site.phoneIsPlaceholder;
  const rows = [
    {
      icon: Phone,
      label: "Call us",
      value: phoneOk ? (
        <a href={telHref(site.phone)} className="font-semibold text-ink no-underline hover:text-blue-700">
          {site.phone}
        </a>
      ) : (
        <Placeholder>[PHONE]</Placeholder>
      ),
    },
    {
      icon: Mail,
      label: "Email us",
      value: emailOk ? (
        <a href={`mailto:${site.email}`} className="font-semibold text-ink no-underline hover:text-blue-700">
          {site.email}
        </a>
      ) : (
        <Placeholder>{site.email}</Placeholder>
      ),
    },
    { icon: Clock, label: "Business hours", value: isPlaceholder(site.hours) ? <Placeholder>{site.hours}</Placeholder> : <span className="text-ink">{site.hours}</span> },
    { icon: MapPin, label: "Service area", value: isPlaceholder(site.serviceRegion) ? <Placeholder>{site.serviceRegion}</Placeholder> : <span className="text-ink">{site.serviceRegion}</span> },
  ];

  return (
    <>
      <PageBanner crumbs={[{ label: "Contact" }]} eyebrow={contactPage.eyebrow} lines={contactPage.h1Lines} lead={contactPage.lead} />

      <section className="section-y">
        <div className="container-site grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-8">
            <Stagger as="ul" className="m-0 list-none border-t border-line p-0">
              {rows.map((r) => (
                <StaggerItem as="li" key={r.label} className="flex items-center gap-4 border-b border-line py-4">
                  <IconTile size="md">
                    <r.icon strokeWidth={1.8} aria-hidden="true" />
                  </IconTile>
                  <div className="min-w-0">
                    <span className="block text-[12.5px] font-semibold uppercase tracking-[.1em] text-muted">{r.label}</span>
                    <span className="mt-0.5 block truncate text-[15px]">{r.value}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="relative hidden lg:block">
              <span className="absolute -left-3 top-8 h-20 w-1.5 bg-blue-600" aria-hidden="true" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sky-100">
                <Image src={images.contact.src} alt={images.contact.alt} fill sizes="(max-width: 1024px) 100vw, 460px" className="object-cover" style={{ objectPosition: images.contact.focal }} />
              </div>
            </Reveal>
          </div>
          <Reveal index={1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <FaqSection items={bookingFaqs} title="Booking questions" size="md" id="h-booking-faq" link={{ label: "See all questions", href: "/faq" }} />
      <QuoteCTA />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </>
  );
}
