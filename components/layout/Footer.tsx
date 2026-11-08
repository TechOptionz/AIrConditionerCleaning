import Link from "next/link";
import { footerCompany, legalNav } from "@/content/nav";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { telHref } from "@/lib/utils";
import { Logo } from "./Logo";
import { Placeholder } from "@/components/ui/Placeholder";

const linkClass = "inline-flex min-h-[34px] items-center text-[14px] text-white/78 no-underline transition-colors duration-150 hover:text-teal-300";
const headingClass = "mb-3.5 text-[14px] font-semibold uppercase leading-none tracking-[.08em] text-teal-300";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 pb-8 pt-[clamp(48px,6vw,72px)] text-white">
      <div className="container-site">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-8 gap-y-10">
          <div>
            <Logo tone="light" />
            <p className="mt-[18px] max-w-[34ch] text-[14.5px] leading-[1.6] text-white/75">{site.footerStatement}</p>
          </div>

          <nav aria-label="Footer services">
            <h2 className={headingClass}>Services</h2>
            <ul className="m-0 flex list-none flex-col p-0">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkClass}>
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer company">
            <h2 className={headingClass}>Company</h2>
            <ul className="m-0 flex list-none flex-col p-0">
              {footerCompany.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={linkClass}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>Get in touch</h2>
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[14px] text-white/78">
              <li>
                <a href={telHref(site.phone)} className="inline-flex min-h-[34px] items-center font-semibold text-white no-underline hover:text-teal-300">
                  {site.phone}
                </a>
              </li>
              <li>
                <Placeholder tone="dark">{site.email}</Placeholder>
              </li>
              <li>
                <Placeholder tone="dark">{site.hours}</Placeholder>
              </li>
              <li className="pt-2">
                <Link href="/service-areas" className={linkClass}>
                  Check service areas →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 max-w-[80ch] text-[13px] leading-[1.55] text-white/60">{site.disclaimer}</p>

        <div className="mt-6 flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-white/12 pt-5 text-[12.5px] text-white/60">
          <span>
            © {year} {site.name} · ABN <Placeholder tone="dark">{site.abn}</Placeholder>
          </span>
          <span className="flex gap-[18px]">
            {legalNav.map((n) => (
              <Link key={n.href} href={n.href} className="text-inherit no-underline hover:text-white">
                {n.label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
