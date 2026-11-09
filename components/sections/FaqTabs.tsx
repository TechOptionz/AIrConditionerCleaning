"use client";

import { useId, useState } from "react";
import { faqCategories, faqs, type FaqCategory } from "@/content/faqs";
import { FaqAccordion } from "./FaqAccordion";
import { cn } from "@/lib/utils";

/** FAQ page: pill tablist (keyboard arrows move between tabs) + accordion per category. */
export function FaqTabs() {
  const [tab, setTab] = useState<FaqCategory>("Services");
  const id = useId();

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? (i + 1) % faqCategories.length : (i - 1 + faqCategories.length) % faqCategories.length;
    setTab(faqCategories[next]);
    (document.getElementById(`${id}-tab-${next}`) as HTMLButtonElement | null)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="FAQ categories" className="mb-7 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {faqCategories.map((c, i) => {
          const on = tab === c;
          return (
            <button
              key={c}
              id={`${id}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setTab(c)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "h-10 shrink-0 cursor-pointer rounded-md border px-4 text-[14px] font-semibold leading-none transition-colors duration-200",
                on ? "border-action bg-action text-white" : "border-line-strong bg-white text-ink hover:border-blue-400 hover:text-blue-700",
              )}
            >
              {c}
            </button>
          );
        })}
      </div>
      {faqCategories.map((c, i) => (
        <div key={c} id={`${id}-panel-${i}`} role="tabpanel" aria-labelledby={`${id}-tab-${i}`} hidden={tab !== c}>
          {tab === c && <FaqAccordion items={faqs[c]} />}
        </div>
      ))}
    </div>
  );
}
