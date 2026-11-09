import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Phone } from "lucide-react";
import { bookingPage } from "@/content/booking";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { isPlaceholder, telHref } from "@/lib/utils";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { Placeholder } from "@/components/ui/Placeholder";
import { StepNumber } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BookingForm } from "@/components/forms/BookingForm";

export const metadata: Metadata = pageMetadata({
  title: "Request a Booking",
  description: bookingPage.metaDescription,
  path: "/book",
  image: images.banners.book.src,
});

export default function BookPage() {
  const phoneOk = !site.phoneIsPlaceholder;
  return (
    <>
      <PageBanner crumbs={[{ label: "Request a booking" }]} eyebrow={bookingPage.eyebrow} lines={bookingPage.h1Lines} lead={bookingPage.lead} />

      <section className="section-y">
        <div className="container-site grid grid-cols-1 items-start gap-[clamp(24px,4vw,48px)] lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
          <Reveal className="min-w-0">
            <Suspense fallback={<div className="min-h-[520px] rounded-lg border border-line bg-white" aria-busy="true" />}>
              <BookingForm />
            </Suspense>
          </Reveal>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-28">
            <Reveal index={1} className="rounded-lg border border-line bg-white p-6">
              <h2 className="m-0 flex items-center gap-2.5 eyebrow text-blue-700">
                <span className="h-px w-5 bg-blue-600" aria-hidden="true" />
                What happens next
              </h2>
              <ol className="m-0 mt-5 flex list-none flex-col gap-4 p-0">
                {bookingPage.whatNext.map((t, i) => (
                  <li key={t} className="flex items-start gap-3.5 text-[14.5px] leading-[1.55] text-body">
                    <StepNumber n={i + 1} className="size-9 text-[13px]" />
                    <span className="pt-2">{t}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal index={2} className="rounded-lg border border-line bg-sky-50 p-6">
              <strong className="flex items-center gap-2 text-[15px] text-ink">
                <Phone className="size-4 text-blue-600" aria-hidden="true" />
                Prefer to talk?
              </strong>
              {phoneOk ? (
                <a href={telHref(site.phone)} className="mt-2.5 inline-flex font-display text-[20px] font-bold leading-none text-blue-700 no-underline hover:underline">
                  {site.phone}
                </a>
              ) : (
                <p className="mt-2.5 text-[14px] text-body">
                  Phone: <Placeholder>{site.phone}</Placeholder>
                </p>
              )}
              <p className="mt-2 text-[13px] text-muted">{isPlaceholder(site.hours) ? <Placeholder>{site.hours}</Placeholder> : site.hours}</p>
            </Reveal>
            <Reveal index={3} className="relative hidden aspect-[4/3] overflow-hidden rounded-lg bg-sky-100 lg:block">
              <Image src={images.book.src} alt={images.book.alt} fill sizes="(max-width: 1024px) 100vw, 400px" className="object-cover" style={{ objectPosition: images.book.focal }} />
            </Reveal>
          </aside>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Request a booking", path: "/book" }])} />
    </>
  );
}
