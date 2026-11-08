import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/content/images";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { HeroMedia, HeroUp, LineUp } from "@/components/motion/HeroText";
import { Parallax } from "@/components/motion/Parallax";
import { cn } from "@/lib/utils";

type Props = {
  crumbs: Crumb[];
  eyebrow: string;
  /** Headline lines; each animates up in its own mask. */
  lines: string[];
  lead?: string;
  actions?: ReactNode;
  image?: SiteImage;
  size?: "lg" | "md" | "sm";
  /** Removes the 14ch max-width for long single-line titles. */
  wide?: boolean;
  /** Extra content under the lead (e.g. a note). */
  children?: ReactNode;
};

const MIN_H = { lg: "min-h-[min(70vh,620px)]", md: "min-h-[min(56vh,520px)]", sm: "min-h-[min(50vh,460px)]" };

/**
 * Inner-page hero: full-bleed photo under a navy gradient, breadcrumb,
 * eyebrow, masked two-line H1, lead and CTAs with staggered entrance.
 * Sits under the transparent header via -mt-20.
 */
export function PageBanner({ crumbs, eyebrow, lines, lead, actions, image, size = "lg", wide, children }: Props) {
  return (
    <section className={cn("relative -mt-20 flex items-end overflow-hidden bg-navy-900 pb-[clamp(48px,6vw,80px)] pt-[calc(80px+clamp(48px,7vw,88px))] text-white", MIN_H[size], !image && "dark-glow-right")}>
      {image && (
        <HeroMedia>
          <Parallax strength={0.12}>
            <Image src={image.src} alt="" fill priority sizes="100vw" quality={70} className="object-cover" style={{ objectPosition: image.focal }} />
          </Parallax>
        </HeroMedia>
      )}
      {image && <div className="banner-scrim pointer-events-none absolute inset-0" aria-hidden="true" />}
      {image && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy-950/70" aria-hidden="true" />}
      <div className="container-site relative">
        <HeroUp as="nav" delay={0}>
          <Breadcrumbs items={crumbs} />
        </HeroUp>
        <HeroUp delay={0.1} className="eyebrow mt-7 flex items-center gap-3 text-teal-300">
          <span className="h-0.5 w-8 bg-teal-300" aria-hidden="true" />
          {eyebrow}
        </HeroUp>
        <h1 className={cn("display-1 mt-[18px]", !wide && "max-w-[14ch]")}>
          <LineUp lines={lines} />
        </h1>
        {lead && (
          <HeroUp as="p" delay={0.45} className="mt-[22px] max-w-[52ch] text-[clamp(1.0625rem,1rem+.45vw,1.3125rem)] leading-[1.55] text-white/82">
            {lead}
          </HeroUp>
        )}
        {children}
        {actions && (
          <HeroUp delay={0.6} className="mt-8 flex flex-wrap gap-3">
            {actions}
          </HeroUp>
        )}
      </div>
    </section>
  );
}
