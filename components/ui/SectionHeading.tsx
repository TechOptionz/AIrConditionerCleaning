import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { AccentLine, NumberLabel } from "@/components/ui/Accents";

type Tone = "light" | "dark";

/** Small uppercase label with a thin blue accent line that extends into view. */
export function Eyebrow({ children, tone = "light", bar = true, className }: { children: ReactNode; tone?: Tone; bar?: boolean; className?: string }) {
  const color = tone === "dark" ? "text-blue-300" : "text-blue-700";
  return (
    <div className={cn("eyebrow flex items-center gap-2.5", color, className)}>
      {bar && <AccentLine tone={tone} />}
      {children}
    </div>
  );
}

type Variant = "editorial" | "centered" | "split" | "numbered";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  /**
   * editorial — accent line + label, left-aligned heading, lead below (default)
   * centered  — compact eyebrow, heading, short accent divider, lead
   * split     — heading left; lead and action on the right
   * numbered  — "01 ——" label, heading, lead
   */
  variant?: Variant;
  /** @deprecated use variant="centered" */
  align?: "left" | "center";
  number?: number;
  tone?: Tone;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
  /** Action rendered beside the heading (editorial) or under the lead (split). */
  action?: ReactNode;
  maxWidth?: string;
  size?: "lg" | "md";
};

export function SectionHeading({ eyebrow, title, lead, variant, align, number, tone = "light", id, as: Tag = "h2", className, action, maxWidth, size = "lg" }: SectionHeadingProps) {
  const v: Variant = variant ?? (align === "center" ? "centered" : "editorial");
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const leadColor = tone === "dark" ? "text-white/78" : "text-body";
  const titleClass = cn(size === "lg" ? "display-2" : "display-3", titleColor);
  const leadClass = cn("max-w-[60ch] text-[16px] leading-[1.65]", leadColor);

  if (v === "centered") {
    return (
      <Reveal className={cn("mx-auto max-w-[680px] text-center", className)}>
        {eyebrow && <Eyebrow tone={tone} bar={false} className="justify-center">{eyebrow}</Eyebrow>}
        <Tag id={id} className={cn(titleClass, "mt-3.5")}>
          {title}
        </Tag>
        <span className={cn("mx-auto mt-5 block h-0.5 w-10", tone === "dark" ? "bg-blue-300" : "bg-blue-600")} aria-hidden="true" />
        {lead && <p className={cn(leadClass, "mx-auto mt-4")}>{lead}</p>}
        {action && <div className="mt-6 flex justify-center">{action}</div>}
      </Reveal>
    );
  }

  if (v === "split") {
    return (
      <Reveal className={cn("grid items-end gap-x-12 gap-y-5 lg:grid-cols-[1.1fr_1fr]", className)}>
        <div className={maxWidth ?? "max-w-[560px]"}>
          {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
          <Tag id={id} className={cn(titleClass, "mt-3.5")}>
            {title}
          </Tag>
        </div>
        <div className={cn("lg:border-l lg:pl-10", tone === "dark" ? "lg:border-white/12" : "lg:border-line")}>
          {lead && <p className={cn(leadClass, "max-w-[46ch]")}>{lead}</p>}
          {action && <div className={cn(lead && "mt-4")}>{action}</div>}
        </div>
      </Reveal>
    );
  }

  if (v === "numbered") {
    return (
      <Reveal className={cn(maxWidth ?? "max-w-[640px]", className)}>
        <NumberLabel n={number ?? 1} tone={tone} />
        {eyebrow && <span className={cn("eyebrow mt-3 block", tone === "dark" ? "text-blue-300" : "text-blue-700")}>{eyebrow}</span>}
        <Tag id={id} className={cn(titleClass, "mt-3")}>
          {title}
        </Tag>
        {lead && <p className={cn(leadClass, "mt-4")}>{lead}</p>}
        {action && <div className="mt-6">{action}</div>}
      </Reveal>
    );
  }

  return (
    <Reveal className={cn("flex flex-wrap items-end justify-between gap-x-10 gap-y-5", className)}>
      <div className={maxWidth ?? "max-w-[640px]"}>
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <Tag id={id} className={cn(titleClass, "mt-3.5")}>
          {title}
        </Tag>
        {lead && <p className={cn(leadClass, "mt-4")}>{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}

/** Numbered marker (01, 02…) used in processes and lists. */
export function StepNumber({ n, tone = "light", className }: { n: number; tone?: Tone | "solid"; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-md font-display text-[15px] font-bold leading-none",
        tone === "solid" ? "bg-action text-white" : tone === "dark" ? "bg-white/10 text-blue-300" : "bg-blue-50 text-blue-700",
        className,
      )}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

/** Small blue square icon tile. */
export function IconTile({ children, size = "md", tone = "light", className }: { children: ReactNode; size?: "sm" | "md" | "lg"; tone?: Tone | "solid"; className?: string }) {
  const sz = size === "sm" ? "size-9 [&>svg]:size-4" : size === "lg" ? "size-14 [&>svg]:size-6" : "size-11 [&>svg]:size-5";
  const bg = tone === "solid" ? "bg-action text-white" : tone === "dark" ? "bg-white/10 text-blue-300" : "bg-blue-50 text-blue-700";
  return <span className={cn("grid shrink-0 place-items-center rounded-md", sz, bg, className)}>{children}</span>;
}
