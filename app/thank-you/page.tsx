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
    <section className="relative overflow-hidden bg-sky-50 py-[clamp(64px,10vw,128px)]">
      <div className="dot-grid pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)]" aria-hidden="true" />
      <div className="container-narrow relative max-w-[720px]">
        <div className="rounded-lg border border-line bg-white p-[clamp(28px,4vw,48px)] shadow-card">
          <HeroUp className="inline-grid">
            <span className="grid size-14 place-items-center rounded-md bg-blue-600 text-white">
              <Check className="size-7" strokeWidth={2.6} aria-hidden="true" />
            </span>
          </HeroUp>
          <HeroUp delay={0.1}>
            <h1 className="display-2 mt-6 text-ink">{sent ? thankYouPage.title : "Request a booking"}</h1>
          </HeroUp>
          <HeroUp as="p" delay={0.2} className="mt-4 max-w-[56ch] text-[16px] leading-[1.65] text-body">
            {sent ? thankYouPage.body : "This page confirms a booking request after it has been sent. To make a request, use the booking form — it takes about two minutes."}
          </HeroUp>
          {sent && rows.length > 0 && (
            <HeroUp delay={0.3}>
              <dl className="mt-7 grid max-w-[480px] grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 border-t border-line pt-5 text-[14.5px]">
                {rows.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-muted">{k}</dt>
                    <dd className="m-0 font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </HeroUp>
          )}
          <HeroUp delay={0.4} className="mt-8 flex flex-wrap gap-3">
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
      </div>
    </section>
  );
}
