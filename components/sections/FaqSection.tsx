import Link from "next/link";
import type { Faq } from "@/content/faqs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "./FaqAccordion";
import { cn } from "@/lib/utils";

type Props = {
  items: Faq[];
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  size?: "lg" | "md";
  link?: { label: string; href: string };
  className?: string;
  id?: string;
  bg?: "cream" | "none";
};

export function FaqSection({ items, eyebrow, title, lead, align = "center", size = "lg", link, className, id = "h-faq", bg = "cream" }: Props) {
  return (
    <section aria-labelledby={id} className={cn(size === "lg" ? "section-y" : "pb-[clamp(64px,8vw,96px)]", bg === "cream" && "bg-cream-100", className)}>
      <div className="container-narrow">
        {size === "lg" ? (
          <SectionHeading id={id} eyebrow={eyebrow} title={title} lead={lead} align={align} className="mb-[clamp(28px,4vw,40px)]" />
        ) : (
          <Reveal>
            <h2 id={id} className="display-3 mb-5 text-ink">
              {title}
            </h2>
          </Reveal>
        )}
        <Reveal index={1}>
          <FaqAccordion items={items} />
        </Reveal>
        {link && (
          <p className="mt-7 text-center">
            <Link href={link.href} className="text-[15px] font-semibold leading-none text-teal-600 no-underline hover:underline">
              {link.label} →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
