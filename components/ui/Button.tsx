import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "navy" | "outline" | "outline-light" | "ghost" | "tint" | "white" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold leading-none transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out cursor-pointer select-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-action text-white shadow-cta hover:bg-action-hover active:bg-action-active hover:shadow-primary",
  navy: "bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-950",
  outline: "border border-line-strong bg-white text-ink hover:border-blue-600 hover:text-blue-700",
  "outline-light": "border border-white/55 text-white hover:border-white hover:bg-white/10",
  ghost: "text-ink hover:bg-sky-50",
  tint: "bg-blue-50 text-blue-800 hover:bg-blue-100 hover:text-blue-900",
  white: "bg-white text-ink shadow-card hover:bg-sky-50",
  link: "h-auto rounded-none px-0 text-blue-700 hover:text-blue-800",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[14px]",
  md: "h-12 px-5 text-[15px]",
  lg: "h-[52px] px-6 text-[15.5px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", arrow, icon, className, children, ...rest } = props;
  const classes = cn(base, variants[variant], variant === "link" ? "" : sizes[size], className);
  const content = (
    <>
      {icon}
      {children}
      {arrow && <ArrowRight className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />}
    </>
  );
  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    const external = /^(https?:|tel:|mailto:)/.test(href);
    if (external) {
      return (
        <a href={href} className={classes} {...(linkRest as ComponentPropsWithoutRef<"a">)}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }
  const { type = "button", ...buttonRest } = rest as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}

/** Inline text link with an animated arrow — used for "View all" style actions. */
export function ArrowLink({ href, children, className, tone = "blue" }: { href: string; children: ReactNode; className?: string; tone?: "blue" | "ink" | "light" }) {
  const color = tone === "light" ? "text-white hover:text-blue-300" : tone === "ink" ? "text-ink hover:text-blue-700" : "text-blue-700 hover:text-blue-800";
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-1.5 text-[14.5px] font-semibold leading-none no-underline transition-colors", color, className)}>
      {children}
      <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}
