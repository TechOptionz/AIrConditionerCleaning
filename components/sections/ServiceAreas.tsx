import { MapPin } from "lucide-react";
import { areasSection } from "@/content/home";
import { areasPage, verifiedAreas } from "@/content/areas";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { AreaCheckForm } from "@/components/forms/AreaCheckForm";

/** Homepage "Areas we serve". Lists only verified regions; otherwise an honest pending state. */
export function ServiceAreas() {
  const verified = verifiedAreas();
  return (
    <section aria-labelledby="h-areas" className="section-y">
      <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(32px,5vw,72px)]">
        <Reveal>
          <Eyebrow>{areasSection.eyebrow}</Eyebrow>
          <h2 id="h-areas" className="display-2 mt-3 text-ink">
            {areasSection.title}
          </h2>
          <p className="lead mt-4 max-w-[52ch] text-body">{areasSection.lead}</p>
          <div className="mt-7">
            <AreaCheckForm />
          </div>
        </Reveal>
        <Reveal index={1} className="rounded-[28px] bg-navy-900 p-[clamp(24px,3vw,40px)] text-white dark-glow-right">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-md bg-teal-300/15">
              <MapPin className="size-5 text-teal-300" aria-hidden="true" />
            </span>
            <h3 className="m-0 text-[18px] font-semibold">{areasPage.h2}</h3>
          </div>
          {verified.length ? (
            <ul className="mt-6 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-x-6 gap-y-4 p-0">
              {verified.map((a) => (
                <li key={a.name}>
                  <p className="m-0 font-semibold text-teal-300">{a.name}</p>
                  <p className="m-0 mt-1 text-[14px] leading-[1.6] text-white/75">{a.places.join(" · ")}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-5">
              <p className="m-0 font-semibold text-teal-300">{areasPage.pendingTitle}</p>
              <p className="m-0 mt-2 text-[15px] leading-[1.6] text-white/78">{areasPage.pendingBody}</p>
            </div>
          )}
          <Button href={areasSection.cta.href} variant="outline-light" className="mt-7" arrow>
            {areasSection.cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
