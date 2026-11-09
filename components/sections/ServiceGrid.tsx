import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Badge } from "@/components/ui/Accents";
import { cn } from "@/lib/utils";

/**
 * Photo cards used on the homepage (featured four) and the services directory.
 * Clean rectangular photography, hairline border, title + one-liner, arrow.
 * Below 640 px each card collapses to a compact row with a square thumbnail.
 */
export function ServiceGrid({ items, className, columns = 4 }: { items: Service[]; className?: string; columns?: 3 | 4 }) {
  return (
    <Stagger as="ul" className={cn("m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 sm:gap-5", columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3", className)}>
      {items.map((s) => (
        <StaggerItem as="li" key={s.slug} className="min-w-0">
          <Link
            href={`/services/${s.slug}`}
            className="group flex h-full items-center gap-4 rounded-lg border border-line bg-white p-3 pr-4 text-ink no-underline transition-[border-color,box-shadow,transform] duration-250 ease-out hover:-translate-y-1 hover:border-blue-200 hover:shadow-hover sm:flex-col sm:items-stretch sm:p-0"
          >
            <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-sky-50 sm:aspect-[4/3] sm:size-auto sm:w-full sm:rounded-none sm:rounded-t-lg">
              <Image
                src={s.images.card.src}
                alt=""
                fill
                sizes="(max-width: 640px) 64px, (max-width: 1024px) 50vw, 300px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                style={{ objectPosition: s.images.card.focal }}
              />
              <span className="absolute bottom-0 left-0 hidden h-1 w-10 bg-blue-600 sm:block" aria-hidden="true" />
              <Badge tone="solid" className="absolute left-3 top-3 hidden sm:inline-flex">
                {s.slug === "outdoor-condenser-cleaning" ? "Outdoor" : "Indoor"}
              </Badge>
            </div>
            <div className="min-w-0 flex-1 sm:flex sm:flex-col sm:p-5">
              <h3 className="m-0 text-[16px] font-semibold leading-[1.3] sm:font-display sm:text-[18px] sm:font-bold sm:leading-[1.25] sm:tracking-[-.01em]">{s.short}</h3>
              <p className="mt-1 text-[13.5px] leading-[1.45] text-muted sm:mt-2 sm:text-[14px] sm:leading-[1.55] sm:text-body">{s.summary}</p>
              <span className="mt-4 hidden items-center gap-1.5 text-[14px] font-semibold leading-none text-blue-700 sm:inline-flex">
                Learn more
                <ArrowRight className="size-4 transition-transform duration-250 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
            <ArrowUpRight className="size-[18px] shrink-0 text-blue-600 sm:hidden" aria-hidden="true" />
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Compact text links for the services not featured on the homepage. */
export function ServiceLinkRow({ items, className }: { items: Service[]; className?: string }) {
  return (
    <ul className={cn("m-0 flex list-none flex-wrap gap-x-2 gap-y-2 p-0", className)}>
      {items.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/services/${s.slug}`}
            className="group inline-flex h-10 items-center gap-2 rounded-md border border-line bg-white px-3.5 text-[14px] font-medium text-ink no-underline transition-colors hover:border-blue-300 hover:text-blue-700"
          >
            <span className="size-1.5 bg-blue-600" aria-hidden="true" />
            {s.short}
            <ArrowRight className="size-3.5 text-faint transition-[transform,color] group-hover:translate-x-0.5 group-hover:text-blue-600" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Photo cards used on sector pages (image on top, title, summary, "Learn more"). */
export function ServicePhotoGrid({ items }: { items: Service[] }) {
  return <ServiceGrid items={items} columns={items.length === 3 ? 3 : 4} />;
}
