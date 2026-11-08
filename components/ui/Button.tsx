import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "navy" | "outline-light" | "outline" | "ghost" | "tint" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold leading-none transition-[background-color,color,border-color,transform,box-shadow,gap] duration-250 ease-out cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary: "bg-teal-600 text-white hover:bg-teal-700 hover:-translate-y-px hover:shadow-primary active:translate-y-0",
  navy: "bg-navy-700 text-white hover:bg-navy-800 hover:-translate-y-px active:translate-y-0",
  "outline-light": "border-[1.5px] border-white/55 text-white hover:bg-white/10 hover:border-white",
  outline: "border-[1.5px] border-line text-ink bg-transparent hover:bg-cream-100",
  ghost: "text-ink hover:bg-cream-100",
  tint: "bg-teal-50 text-teal-700 hover:bg-teal-100",
  white: "bg-white text-ink border border-line hover:bg-cream-100",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-4 text-[14px]",
  md: "h-12 px-5 text-[15px]",
  lg: "h-14 px-[26px] text-[16px]",
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
  const classes = cn(base, variants[variant], sizes[size], arrow && "hover:gap-3.5", className);
  const content = (
    <>
      {icon}
      {children}
      {arrow && <ArrowRight className="size-4 shrink-0 transition-transform duration-250 ease-out group-hover:translate-x-0.5" aria-hidden="true" />}
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
