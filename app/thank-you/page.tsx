import type { Metadata } from "next";
import { Check } from "lucide-react";
import { thankYouPage } from "@/content/booking";
import { pageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { HeroUp } from "@/components/motion/HeroText";

export const metadata: Metadata = pageMetadata({
  title: "Request Sent",
  description: thankYouPage.metaDescription,
  path: "/thank-you",
  noIndex: true,
});

type Search = { sent?: string; unit?: string; level?: string; where?: string; when?: string };

/**
 * Shown only after a confirmed delivery (the form redirects here with ?sent=1).
 * A direct visit shows neutral copy rather than a fabricated confirmation.
 */
export default async function ThankYouPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const sent = sp.sent === "1";
  const rows = [
    ["Unit", sp.unit],
    ["Level", sp.level],
    ["Location", sp.where],
    ["Timing", sp.when ? `${sp.when} (to be confirmed)` : undefined],
  ].filter((r): r is [string, string] => Boolean(r[1]));

  return (
    <section className="py-[clamp(64px,10vw,128px)]">
      <div className="container-narrow max-w-[720px] text-center">
        <HeroUp className="inline-grid">
          <span className="grid size-[72px] place-items-center rounded-full bg-teal-50">
            <Check className="size-8 text-teal-600" strokeWidth={2.4} aria-hidden="true" />
          </span>
        </HeroUp>
        <HeroUp delay={0.1}>
          <h1 className="mt-6 font-display text-[clamp(2.125rem,1.5rem+2.6vw,3.75rem)] font-extrabold leading-[1.04] tracking-[-.03em] text-ink">
            {sent ? thankYouPage.title : "Request a booking"}
          </h1>
        </HeroUp>
        <HeroUp as="p" delay={0.2} className="lead mt-4 text-body">
          {sent ? thankYouPage.body : "This page confirms a booking request after it has been sent. To make a request, use the booking form — it takes about two minutes."}
        </HeroUp>
        {sent && rows.length > 0 && (
          <HeroUp delay={0.3}>
            <dl className="mx-auto mt-8 grid max-w-[460px] grid-cols-[auto_1fr] gap-x-5 gap-y-2 rounded-lg border border-line bg-white px-6 py-5 text-left text-[14.5px]">
              {rows.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-muted">{k}</dt>
                  <dd className="m-0 text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </HeroUp>
        )}
        <HeroUp delay={0.4} className="mt-8 flex flex-wrap justify-center gap-3">
          {sent ? (
            <>
              <Button href="/" variant="navy">
                Back to home
              </Button>
              <Button href="/faq" variant="outline">
                Read the FAQ
              </Button>
            </>
          ) : (
            <>
              <Button href="/book" arrow>
                Go to the booking form
              </Button>
              <Button href="/" variant="outline">
                Back to home
              </Button>
            </>
          )}
        </HeroUp>
      </div>
    </section>
  );
}
