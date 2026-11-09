import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/content/images";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { HeroMedia, HeroUp, LineUp } from "@/components/motion/HeroText";
import { Airflow, BlueBlock, CornerBrackets } from "@/components/ui/Accents";
import { cn } from "@/lib/utils";

type Props = {
  crumbs: Crumb[];
  eyebrow: string;
  /** Headline lines; each animates up in its own mask. */
  lines: string[];
  lead?: string;
  actions?: ReactNode;
  image?: SiteImage;
  /**
   * "split"   — light banner with a rectangular photograph on the right (services, sectors, about)
   * "compact" — light banner, text only (FAQ, contact, booking, legal)
   */
  variant?: "split" | "compact";
  /** Removes the 16ch max-width for long single-line titles. */
  wide?: boolean;
  /** Extra content under the lead (e.g. a note). */
  children?: ReactNode;
};

/**
 * Inner-page banner on a light surface: breadcrumb, eyebrow, masked H1, lead
 * and CTAs. The split variant adds a photograph that overlaps the section
 * below by a few rem, with a blue accent block tucked under its corner.
 */
export function PageBanner({ crumbs, eyebrow, lines, lead, actions, image, variant = "compact", wide, children }: Props) {
  const split = variant === "split" && image;
  return (
    <section className={cn("relative overflow-hidden border-b border-line bg-sky-50", split ? "pb-0 pt-[clamp(28px,4vw,48px)]" : "py-[clamp(28px,4vw,48px)]")}>
      <div className="dot-grid pointer-events-none absolute right-0 top-0 h-full w-[38%] opacity-50 [mask-image:linear-gradient(to_left,black,transparent)]" aria-hidden="true" />
      {!split && (
        <>
          {/* Compact banners: quiet airflow curves and a small block composition on the right. */}
          <Airflow className="right-0 top-1/2 hidden h-[180px] w-[55%] -translate-y-1/2 lg:block" animate={false} />
          <span className="pointer-events-none absolute right-[8%] top-1/2 hidden -translate-y-1/2 lg:block" aria-hidden="true">
            <span className="block size-16 border border-blue-200" />
            <span className="absolute -bottom-3 -right-3 block size-8 bg-blue-600" />
            <span className="absolute -left-3 -top-3 block size-5 bg-sky-100" />
          </span>
        </>
      )}
      <div className={cn("container-site relative", split && "grid items-end gap-x-[clamp(32px,5vw,72px)] gap-y-8 lg:grid-cols-[1.1fr_1fr]")}>
        <div className={cn(split && "pb-[clamp(32px,5vw,64px)]")}>
          <HeroUp as="nav" delay={0}>
            <Breadcrumbs items={crumbs} />
          </HeroUp>
          <HeroUp delay={0.08} className="eyebrow mt-6 flex items-center gap-2.5 text-blue-700">
            <span className="h-px w-7 bg-blue-600" aria-hidden="true" />
            {eyebrow}
          </HeroUp>
          <h1 className={cn("display-1 mt-4 text-ink", !wide && "max-w-[16ch]", split && "text-[clamp(2.125rem,1.4rem+2.6vw,3.5rem)]")}>
            <LineUp lines={lines} baseDelay={0.14} />
          </h1>
          {lead && (
            <HeroUp as="p" delay={0.4} className="mt-5 max-w-[56ch] text-[clamp(1rem,.95rem+.3vw,1.125rem)] leading-[1.65] text-body">
              {lead}
            </HeroUp>
          )}
          {children}
          {actions && (
            <HeroUp delay={0.52} className="mt-7 flex flex-wrap gap-3">
              {actions}
            </HeroUp>
          )}
        </div>
        {split && (
          <div className="relative lg:-mb-12">
            <BlueBlock className="-left-3 bottom-8 hidden h-20 w-3 lg:block" />
            <CornerBrackets corners={["tr"]} size={36} inset={-10} />
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-white bg-navy-900 shadow-lift lg:aspect-[5/4]">
              <HeroMedia>
                <Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 1024px) 100vw, 560px" quality={75} className="object-cover" style={{ objectPosition: image.focal }} />
              </HeroMedia>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
