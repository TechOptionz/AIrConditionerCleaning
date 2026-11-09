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

/**
 * White sticky header on every breakpoint. 76 px → 64 px after 24 px of scroll,
 * with a hairline border that becomes a soft shadow once the page moves.
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

  const servicesActive = pathname === "/services" || pathname.startsWith("/services/");
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const phoneOk = !site.phoneIsPlaceholder;

  return (
    <>
      <header className="sticky top-0 z-50">
        <div
          className={cn(
            "border-b bg-white/95 text-ink backdrop-blur-[8px] transition-[height,box-shadow,border-color] duration-200 ease-out",
            scrolled ? "h-16 border-transparent shadow-[0_1px_0_rgba(16,42,67,.04),0_6px_20px_rgba(16,42,67,.07)]" : "h-[76px] border-line",
          )}
        >
          <div className="container-site flex h-full items-center justify-between gap-4">
            <Logo compact />

            <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-1 lg:flex">
              <ServicesMenu active={servicesActive} />
              {primaryNav.map((n) => {
                const active = isActive(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex h-10 items-center whitespace-nowrap px-3 text-[14.5px] font-medium leading-none no-underline transition-colors duration-200 hover:text-blue-700",
                      active ? "text-blue-700" : "text-ink",
                    )}
                  >
                    {n.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute bottom-0.5 left-3 right-3 h-0.5 origin-left bg-blue-600 transition-transform duration-250 ease-out group-hover:scale-x-100",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              {phoneOk && (
                <a
                  href={telHref(site.phone)}
                  className="hidden h-11 items-center gap-2 whitespace-nowrap rounded-md px-3.5 text-[14.5px] font-semibold leading-none text-ink no-underline transition-colors duration-200 hover:bg-sky-50 hover:text-blue-700 xl:inline-flex"
                >
                  <Phone className="size-4 text-blue-600" aria-hidden="true" />
                  {site.phone}
                </a>
              )}
              <Link
                href="/book"
                className="hidden h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-action px-4 shadow-cta text-[14.5px] font-semibold leading-none text-white no-underline transition-[background-color,box-shadow] duration-200 ease-out hover:bg-action-hover hover:shadow-primary xs:inline-flex sm:px-5"
              >
                <span className="sm:hidden">Book</span>
                <span className="hidden sm:inline">Request a Booking</span>
              </Link>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                onClick={() => setDrawerOpen(true)}
                className="grid size-11 cursor-pointer place-items-center rounded-md border border-line bg-white text-ink transition-colors hover:border-blue-300 hover:bg-sky-50 lg:hidden"
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
