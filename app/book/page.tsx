import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { bookingPage } from "@/content/booking";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { telHref } from "@/lib/utils";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageBanner } from "@/components/sections/PageBanner";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/motion/Reveal";
import { BookingForm } from "@/components/forms/BookingForm";

export const metadata: Metadata = pageMetadata({
  title: "Request a Booking",
  description: bookingPage.metaDescription,
  path: "/book",
  image: images.banners.book.src,
});

export default function BookPage() {
  return (
    <>
      <PageBanner crumbs={[{ label: "Request a booking" }]} eyebrow={bookingPage.eyebrow} lines={bookingPage.h1Lines} lead={bookingPage.lead} image={images.banners.book} size="sm" />

      <section className="py-[clamp(40px,6vw,80px)]">
        <div className="container-site grid grid-cols-1 items-start gap-[clamp(24px,4vw,48px)] lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
          <Reveal className="min-w-0">
            <Suspense fallback={<div className="min-h-[520px] rounded-2xl border border-line bg-white" aria-busy="true" />}>
              <BookingForm />
            </Suspense>
          </Reveal>

          <aside className="flex flex-col gap-4">
            <Reveal index={1} className="rounded-xl bg-navy-900 p-7 text-white">
              <h2 className="m-0 font-display text-[20px] font-semibold">What happens next</h2>
              <ol className="m-0 mt-[18px] flex list-none flex-col gap-3.5 p-0">
                {bookingPage.whatNext.map((t, i) => (
                  <li key={t} className="flex items-start gap-3 text-[14.5px] leading-[1.5] text-white/85">
                    <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-teal-600 font-display text-[12px] font-bold leading-none">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal index={2} className="rounded-xl border border-line bg-white p-6">
              <strong className="block text-ink">Prefer to talk?</strong>
              <a href={telHref(site.phone)} className="mt-2.5 inline-flex items-center gap-2 font-display text-[18px] font-bold leading-none text-teal-600 no-underline hover:underline">
                {site.phone}
              </a>
              <p className="mt-2 text-[13px] text-muted">
                <Placeholder>{site.hours}</Placeholder>
              </p>
            </Reveal>
            <Reveal index={3} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-cream-100">
              <Image src={images.book.src} alt={images.book.alt} fill sizes="(max-width: 1024px) 100vw, 400px" className="object-cover" style={{ objectPosition: images.book.focal }} />
            </Reveal>
          </aside>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Request a booking", path: "/book" }])} />
    </>
  );
}
