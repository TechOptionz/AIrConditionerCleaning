import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/services";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="py-[clamp(64px,10vw,128px)]">
      <div className="container-narrow max-w-[720px] text-center">
        <p className="eyebrow text-teal-600">404</p>
        <h1 className="display-2 mt-3 text-ink">We couldn&apos;t find that page.</h1>
        <p className="lead mt-4 text-body">The link may be out of date. Try one of the pages below, or head back to the homepage.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="navy">
            Back to home
          </Button>
          <Button href="/services" variant="outline">
            View services
          </Button>
        </div>
        <ul className="mt-10 flex list-none flex-wrap justify-center gap-x-5 gap-y-2 p-0 text-[14px]">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="text-teal-600 no-underline hover:underline">
                {s.short}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
