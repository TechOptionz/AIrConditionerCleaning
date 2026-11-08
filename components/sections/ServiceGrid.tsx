import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { Service } from "@/content/services";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";

/**
 * Service cards. Below 640 px each card collapses to a compact row (56 px
 * thumbnail, 16 px title); from 640 px it is the full illustrated card.
 * Hover: lift, shadow, border tint and a gentle image zoom.
 */
export function ServiceGrid({ items, className, columns = 4 }: { items: Service[]; className?: string; columns?: 3 | 4 }) {
  return (
    <Stagger as="ul" className={cn("m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 sm:gap-6", columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3", className)}>
      {items.map((s) => (
        <StaggerItem as="li" key={s.slug} className="min-w-0">
          <Link
            href={`/services/${s.slug}`}
            className="group flex h-full min-h-20 items-center gap-4 rounded-lg border border-line bg-white p-3 pr-4 text-ink no-underline shadow-card transition-[transform,box-shadow,border-color] duration-250 ease-out hover:-translate-y-1 hover:border-teal-100 hover:shadow-hover active:scale-[.985] sm:flex-col sm:items-start sm:rounded-xl sm:p-6 sm:pb-[26px] sm:hover:-translate-y-1.5"
          >
            <div className="relative size-14 shrink-0 overflow-hidden rounded-[12px] bg-teal-50 sm:mb-5 sm:aspect-[4/3] sm:size-auto sm:w-full sm:rounded-[14px]">
              <Image
                src={s.images.card.src}
                alt=""
                fill
                sizes="(max-width: 640px) 56px, (max-width: 1024px) 50vw, 300px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                style={{ objectPosition: s.images.card.focal }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="m-0 text-[16px] font-semibold leading-[1.3] sm:font-display sm:text-[20px] sm:leading-[1.25] sm:tracking-[-.01em]">{s.short}</h3>
              <p className="mt-0.5 text-[13.5px] leading-[1.45] text-muted sm:mt-2 sm:text-[14.5px] sm:leading-[1.5]">{s.summary}</p>
              <span className="mt-[18px] hidden items-center gap-1.5 text-[14px] font-semibold leading-none text-teal-600 sm:inline-flex">
                Explore this service
                <ArrowRight className="size-4 transition-transform duration-250 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
            <ChevronRight className="size-[18px] shrink-0 text-teal-600 sm:hidden" aria-hidden="true" />
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Photo cards used on sector pages (image on top, title, summary, "Learn more"). */
export function ServicePhotoGrid({ items }: { items: Service[] }) {
  return (
    <Stagger as="ul" className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5 p-0">
      {items.map((c) => (
        <StaggerItem as="li" key={c.slug}>
          <Link href={`/services/${c.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white text-ink no-underline transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-deep">
            <div className="relative aspect-[4/3] overflow-hidden bg-teal-50">
              <Image src={c.images.card.src} alt={c.images.card.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" style={{ objectPosition: c.images.card.focal }} />
            </div>
            <div className="flex flex-1 flex-col gap-2 px-[22px] pb-[22px] pt-5">
              <h3 className="m-0 font-display text-[18px] font-bold leading-[1.3] tracking-[-.01em]">{c.short}</h3>
              <p className="m-0 text-[14.5px] leading-[1.55] text-body">{c.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[14.5px] font-semibold leading-none text-teal-600">
                Learn more <ArrowRight className="size-4 transition-transform duration-250 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
