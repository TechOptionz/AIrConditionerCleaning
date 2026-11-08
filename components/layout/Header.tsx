"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { primaryNav } from "@/content/nav";
import { site } from "@/content/site";
import { cn, telHref } from "@/lib/utils";
import { Logo } from "./Logo";
import { ServicesMenu } from "./ServicesMenu";
import { MobileDrawer } from "./MobileDrawer";
import { StickyCTA } from "./StickyCTA";

/** Routes whose first section is a dark banner that sits under a transparent header. */
const SOLID_ROUTES = ["/thank-you"];

/**
 * Sticky header on every breakpoint. 80 px → 64 px after 24 px of scroll;
 * transparent (white text) over dark page banners until scrolled.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setScrollY((prev) => (Math.abs(prev - y) > 100 || y < 800 ? y : prev));
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => setDrawerOpen(false), [pathname]);

  const overlayRoute = site.header.variant === "overlay" && !SOLID_ROUTES.includes(pathname);
  const overlay = overlayRoute && !scrolled && !drawerOpen;
  const servicesActive = pathname === "/services" || pathname.startsWith("/services/");
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="sticky top-0 z-50">
        <div
          className={cn(
            "transition-[height,background-color,box-shadow,color,backdrop-filter] duration-250 ease-out",
            scrolled ? "h-16 bg-cream-50/92 shadow-[0_1px_2px_rgba(16,24,40,.04),0_4px_16px_rgba(16,24,40,.06)] backdrop-blur-[10px]" : "h-20",
            overlay ? "bg-transparent text-white" : "text-ink",
            !overlay && !scrolled && "bg-cream-50",
          )}
        >
          <div className="container-site flex h-full items-center justify-between gap-4">
            <Logo compact tone={overlay ? "light" : "dark"} />

            <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
              <ServicesMenu active={servicesActive} />
              {primaryNav.map((n) => {
                const active = isActive(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    className="relative inline-flex h-10 items-center whitespace-nowrap px-[11px] text-[14.5px] font-medium leading-none text-inherit no-underline transition-colors duration-200 hover:text-teal-600"
                  >
                    {n.label}
                    <span aria-hidden="true" className={cn("absolute bottom-1 left-[11px] right-[11px] h-0.5 origin-left bg-teal-600 transition-transform duration-200", active ? "scale-x-100" : "scale-x-0")} />
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2.5">
              <a
                href={telHref(site.phone)}
                className="hidden h-11 items-center gap-2 whitespace-nowrap rounded-md px-3.5 text-[14.5px] font-semibold leading-none text-inherit no-underline transition-colors duration-200 hover:bg-teal-600/10 xl:inline-flex"
              >
                <Phone className="size-4" aria-hidden="true" />
                {site.phone}
              </a>
              <Link
                href="/book"
                className="hidden h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-teal-600 px-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-[background-color,transform,box-shadow] duration-250 ease-out hover:-translate-y-px hover:bg-teal-700 hover:shadow-primary xs:inline-flex sm:px-[18px]"
              >
                <span className="sm:hidden">Book</span>
                <span className="hidden sm:inline">Request a Booking</span>
              </Link>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                onClick={() => setDrawerOpen(true)}
                className="grid size-11 cursor-pointer place-items-center rounded-md border border-current/25 bg-transparent text-inherit transition-colors hover:bg-teal-600/10 lg:hidden"
              >
                <Menu className="size-[22px]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} pathname={pathname} />
      <StickyCTA visible={scrollY > 700 && !drawerOpen && !["/book", "/thank-you"].includes(pathname)} />
    </>
  );
}
