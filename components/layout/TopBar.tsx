import { Clock, Phone } from "lucide-react";
import { site } from "@/content/site";
import { telHref } from "@/lib/utils";
import { Placeholder } from "@/components/ui/Placeholder";

/** 40 px utility strip, desktop only. Scrolls away with the page. */
export function TopBar() {
  if (!site.header.showTopBar) return null;
  return (
    <div className="hidden h-10 border-b border-line bg-cream-100 text-[13px] text-body lg:block">
      <div className="container-site flex h-full items-center justify-between gap-6">
        <div className="flex items-center gap-5 whitespace-nowrap">
          <span className="inline-flex items-center gap-[7px]">
            <Clock className="size-3.5 text-teal-600" aria-hidden="true" />
            <Placeholder>{site.hours}</Placeholder>
          </span>
          <a href={telHref(site.phone)} className="inline-flex items-center gap-[7px] font-semibold text-ink no-underline hover:text-teal-600">
            <Phone className="size-3.5 text-teal-600" aria-hidden="true" />
            {site.phone}
          </a>
        </div>
        <p className="m-0 truncate text-muted">{site.announcement}</p>
      </div>
    </div>
  );
}
