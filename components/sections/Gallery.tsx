"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gallerySection } from "@/content/home";
import { images } from "@/content/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Work gallery: a scroll-snap carousel with arrow controls. Captions describe
 * the technique shown. Replace the photos with Northline job photos in
 * content/images.ts before launch.
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

  const btn = "grid size-11 cursor-pointer place-items-center rounded-md border border-line bg-white text-ink transition-colors hover:border-blue-300 hover:text-blue-700 disabled:cursor-default disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink";

  return (
    <section aria-labelledby="h-gallery" className="section-y overflow-hidden bg-sky-50">
      <div className="container-site">
        <SectionHeading
          id="h-gallery"
          eyebrow={gallerySection.eyebrow}
          title={gallerySection.title}
          lead={gallerySection.lead}
          action={
            <div className="flex gap-2">
              <button type="button" aria-label="Previous photos" onClick={() => scroll(-1)} disabled={!canPrev} className={btn}>
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button type="button" aria-label="Next photos" onClick={() => scroll(1)} disabled={!canNext} className={btn}>
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
          className="m-0 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[max(clamp(16px,4vw,40px),calc((100vw-1200px)/2+clamp(16px,4vw,40px)))] pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Work photos"
        >
          {images.gallery.map((g, i) => (
            <li key={`${g.image.src}-${i}`} className="group w-[min(74vw,340px)] shrink-0 snap-start">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-white">
                <Image src={g.image.src} alt={g.image.alt} fill sizes="(max-width: 640px) 74vw, 340px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" style={{ objectPosition: g.image.focal }} />
              </div>
              <p className="m-0 mt-3 flex items-center gap-2.5 text-[14px] font-semibold text-ink">
                <span className="font-display text-[12px] font-bold tracking-[.08em] text-blue-700">{String(i + 1).padStart(2, "0")}</span>
                <span className="h-px w-4 bg-line-strong" aria-hidden="true" />
                {g.caption}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
