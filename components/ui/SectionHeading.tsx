import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

type Tone = "light" | "dark";

export function Eyebrow({ children, tone = "light", bar = true, className }: { children: ReactNode; tone?: Tone; bar?: boolean; className?: string }) {
  const color = tone === "dark" ? "text-teal-300" : "text-teal-600";
  const barColor = tone === "dark" ? "bg-teal-300" : "bg-teal-600";
  return (
    <div className={cn("eyebrow flex items-center gap-3", color, className)}>
      {bar && <span className={cn("h-0.5 w-8 shrink-0", barColor)} aria-hidden="true" />}
      {children}
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: Tone;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
  /** Right-aligned action rendered beside a left-aligned heading on wide screens. */
  action?: ReactNode;
  maxWidth?: string;
};

export function SectionHeading({ eyebrow, title, lead, align = "left", tone = "light", id, as: Tag = "h2", className, action, maxWidth }: SectionHeadingProps) {
  const centered = align === "center";
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const leadColor = tone === "dark" ? "text-white/80" : "text-body";
  return (
    <Reveal className={cn(centered ? "mx-auto text-center" : "flex flex-wrap items-end justify-between gap-x-10 gap-y-5", className)}>
      <div className={cn(centered ? "mx-auto max-w-[720px]" : maxWidth ?? "max-w-[680px]")}>
        {eyebrow && (
          <Eyebrow tone={tone} bar={!centered} className={cn(centered && "justify-center")}>
            {eyebrow}
          </Eyebrow>
        )}
        <Tag id={id} className={cn("display-2 mt-3", titleColor)}>
          {title}
        </Tag>
        {centered && <div className={cn("mx-auto mt-[18px] h-0.5 w-10", tone === "dark" ? "bg-teal-300" : "bg-teal-600")} aria-hidden="true" />}
        {lead && <p className={cn("lead mt-4 max-w-[62ch]", leadColor, centered && "mx-auto")}>{lead}</p>}
      </div>
      {action && !centered && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
