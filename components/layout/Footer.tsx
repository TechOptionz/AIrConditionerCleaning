import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { footerCompany, legalNav } from "@/content/nav";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { ccAttributions } from "@/content/images";
import { isPlaceholder, telHref } from "@/lib/utils";
import { Logo } from "./Logo";
import { Placeholder } from "@/components/ui/Placeholder";

const linkClass = "group inline-flex min-h-[32px] items-center gap-1.5 text-[14px] text-white/72 no-underline transition-colors duration-150 hover:text-white";
const headingClass = "mb-4 flex items-center gap-2.5 eyebrow text-blue-300";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-navy-950 pb-8 pt-[clamp(48px,6vw,80px)] text-white">
      <span className="absolute inset-x-0 top-0 h-0.5 bg-blue-600" aria-hidden="true" />
      <div className="container-site">
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-[36ch] text-[14.5px] leading-[1.65] text-white/70">{site.footerStatement}</p>
            <Link href="/book" className="group mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold text-blue-300 no-underline hover:text-white">
              Request a booking
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <nav aria-label="Footer services">
            <h2 className={headingClass}>
              <span className="h-px w-5 bg-blue-300" aria-hidden="true" />
              Services
            </h2>
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
            <h2 className={headingClass}>
              <span className="h-px w-5 bg-blue-300" aria-hidden="true" />
              Company
            </h2>
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
            <h2 className={headingClass}>
              <span className="h-px w-5 bg-blue-300" aria-hidden="true" />
              Get in touch
            </h2>
            <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 text-[14px] text-white/72">
              <dt className="text-white/50">Phone</dt>
              <dd className="m-0">
                {site.phoneIsPlaceholder ? (
                  <Placeholder tone="dark">{site.phone}</Placeholder>
                ) : (
                  <a href={telHref(site.phone)} className="font-semibold text-white no-underline hover:text-blue-300">
                    {site.phone}
                  </a>
                )}
              </dd>
              <dt className="text-white/50">Email</dt>
              <dd className="m-0">
                {isPlaceholder(site.email) ? (
                  <Placeholder tone="dark">{site.email}</Placeholder>
                ) : (
                  <a href={`mailto:${site.email}`} className="text-white no-underline hover:text-blue-300">
                    {site.email}
                  </a>
                )}
              </dd>
              <dt className="text-white/50">Hours</dt>
              <dd className="m-0">{isPlaceholder(site.hours) ? <Placeholder tone="dark">{site.hours}</Placeholder> : site.hours}</dd>
              <dt className="text-white/50">Area</dt>
              <dd className="m-0">{isPlaceholder(site.serviceRegion) ? <Placeholder tone="dark">{site.serviceRegion}</Placeholder> : site.serviceRegion}</dd>
            </dl>
          </div>
        </div>

        <p className="mt-12 max-w-[80ch] border-t border-white/10 pt-6 text-[13px] leading-[1.6] text-white/55">{site.disclaimer}</p>
        {ccAttributions.length > 0 && (
          <p className="mt-3 max-w-[90ch] text-[12px] leading-[1.6] text-white/45">
            Photo credits:{" "}
            {ccAttributions.map((a, i) => (
              <span key={a.href}>
                <a href={a.href} rel="license noopener" className="text-white/60 underline-offset-2 hover:text-white hover:underline">
                  {a.title}
                </a>{" "}
                by {a.author} ({a.licence}){i < ccAttributions.length - 1 ? " · " : "."}
              </span>
            ))}
          </p>
        )}

        <div className="mt-5 flex flex-wrap justify-between gap-x-6 gap-y-3 text-[12.5px] text-white/55">
          <span>
            © {year} {site.name} · ABN <Placeholder tone="dark">{site.abn}</Placeholder>
          </span>
          <span className="flex gap-5">
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
