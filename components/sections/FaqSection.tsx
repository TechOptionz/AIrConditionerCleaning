import type { Faq } from "@/content/faqs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "./FaqAccordion";
import { cn } from "@/lib/utils";

type Props = {
  items: Faq[];
  eyebrow?: string;
  title: string;
  lead?: string;
  size?: "lg" | "md";
  link?: { label: string; href: string };
  className?: string;
  id?: string;
  bg?: "sky" | "none";
};

/**
 * FAQ block. Large size is a two-column layout (heading + link on the left,
 * accordion on the right); medium is a single narrow column for inner pages.
 */
export function FaqSection({ items, eyebrow, title, lead, size = "lg", link, className, id = "h-faq", bg = "sky" }: Props) {
  if (size === "md") {
    return (
      <section aria-labelledby={id} className={cn("section-y", bg === "sky" && "bg-sky-50", className)}>
        <div className="container-narrow">
          <Reveal>
            <h2 id={id} className="display-3 mb-5 text-ink">
              {title}
            </h2>
          </Reveal>
          <Reveal index={1}>
            <FaqAccordion items={items} />
          </Reveal>
          {link && (
            <div className="mt-6">
              <ArrowLink href={link.href}>{link.label}</ArrowLink>
            </div>
          )}
        </div>
      </section>
    );
  }
  return (
    <section aria-labelledby={id} className={cn("section-y-lg", bg === "sky" && "bg-sky-50", className)}>
      <div className="container-site grid gap-[clamp(28px,4vw,64px)] lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id={id} eyebrow={eyebrow} title={title} lead={lead} maxWidth="max-w-[440px]" />
          {link && (
            <Reveal delay={0.15} className="mt-6">
              <ArrowLink href={link.href}>{link.label}</ArrowLink>
            </Reveal>
          )}
        </div>
        <Reveal index={1}>
          <FaqAccordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
