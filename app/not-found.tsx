import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section-y-lg">
      <div className="container-narrow max-w-[720px]">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="display-2 mt-3.5 text-ink">We couldn&apos;t find that page.</h1>
        <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.65] text-body">The link may be out of date. Try one of the pages below, or head back to the homepage.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" variant="navy">
            Back to home
          </Button>
          <Button href="/services" variant="outline">
            View services
          </Button>
        </div>
        <ul className="m-0 mt-10 grid list-none gap-x-6 gap-y-2 border-t border-line p-0 pt-6 text-[14px] sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-2 text-blue-700 no-underline hover:underline">
                <span className="size-1.5 bg-blue-600" aria-hidden="true" />
                {s.short}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
