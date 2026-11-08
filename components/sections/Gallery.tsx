"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gallerySection } from "@/content/home";
import { images } from "@/content/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Work gallery: a scroll-snap carousel with arrow controls. No source or
 * "illustrative" captions are shown (client decision). Replace the photos
 * with Northline job photos in content/images.ts before launch.
 */
export function Gallery() {
  const track = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = () => {
    const el = track.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };
  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="h-gallery" className="section-y overflow-hidden">
      <div className="container-site">
        <SectionHeading
          id="h-gallery"
          eyebrow={gallerySection.eyebrow}
          title={gallerySection.title}
          lead={gallerySection.lead}
          action={
            <div className="flex gap-2">
              <button type="button" aria-label="Previous photos" onClick={() => scroll(-1)} disabled={!canPrev} className="grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-cream-100 disabled:cursor-default disabled:opacity-40">
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button type="button" aria-label="Next photos" onClick={() => scroll(1)} disabled={!canNext} className="grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-cream-100 disabled:cursor-default disabled:opacity-40">
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          }
          className="mb-[clamp(28px,4vw,40px)]"
        />
      </div>
      <Reveal>
        <ul
          ref={track}
          className="m-0 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[max(clamp(16px,3vw,32px),calc((100vw-1240px)/2+clamp(16px,3vw,32px)))] pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Work photos"
        >
          {images.gallery.map((g, i) => (
            <li key={`${g.image.src}-${i}`} className="group relative aspect-[4/3] w-[min(78vw,380px)] shrink-0 snap-start overflow-hidden rounded-xl bg-teal-50">
              <Image src={g.image.src} alt={g.image.alt} fill sizes="(max-width: 640px) 78vw, 380px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" style={{ objectPosition: g.image.focal }} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-navy-950/70 p-4 pt-10 text-white">
                <p className="m-0 text-[14.5px] font-semibold">{g.caption}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
