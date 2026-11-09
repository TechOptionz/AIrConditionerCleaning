import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { isPlaceholder, telHref } from "@/lib/utils";

/**
 * 38 px utility strip, desktop only. Shows only verified business details:
 * anything still in [BRACKETS] (or a placeholder phone) is omitted rather than
 * displayed as fact. Scrolls away with the page.
 */
export function TopBar() {
  if (!site.header.showTopBar) return null;
  const items: { icon: typeof Clock; node: React.ReactNode; key: string }[] = [];
  if (!isPlaceholder(site.serviceRegion)) items.push({ key: "region", icon: MapPin, node: <span>{site.serviceRegion}</span> });
  if (!isPlaceholder(site.hours)) items.push({ key: "hours", icon: Clock, node: <span>{site.hours}</span> });
  if (!site.phoneIsPlaceholder)
    items.push({
      key: "phone",
      icon: Phone,
      node: (
        <a href={telHref(site.phone)} className="font-semibold text-ink no-underline hover:text-blue-700">
          {site.phone}
        </a>
      ),
    });
  if (!isPlaceholder(site.email))
    items.push({
      key: "email",
      icon: Mail,
      node: (
        <a href={`mailto:${site.email}`} className="text-ink no-underline hover:text-blue-700">
          {site.email}
        </a>
      ),
    });

  return (
    <div className="hidden h-[38px] border-b border-line bg-sky-50 text-[13px] text-body lg:block">
      <div className="container-site flex h-full items-center justify-between gap-6">
        <p className="m-0 flex items-center gap-2.5 truncate text-muted">
          <span className="size-1.5 shrink-0 bg-blue-600" aria-hidden="true" />
          {site.announcement}
        </p>
        {items.length > 0 && (
          <div className="flex items-center gap-6 whitespace-nowrap">
            {items.map((it) => (
              <span key={it.key} className="inline-flex items-center gap-2">
                <it.icon className="size-3.5 text-blue-600" aria-hidden="true" />
                {it.node}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
