"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { quickForm } from "@/content/home";
import { quickUnitOptions } from "@/content/booking";
import { fieldClass } from "@/components/ui/FormField";
import { cn } from "@/lib/utils";

/**
 * Homepage 4-field mini form. Nothing is submitted here: it hands the values
 * to /book as query parameters so the full, validated booking form is prefilled.
 */
export function QuickQuoteForm() {
  const router = useRouter();
  const [values, setValues] = useState({ name: "", phone: "", suburb: "", unit: "" });
  const [busy, setBusy] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const p = new URLSearchParams();
    if (values.name) p.set("name", values.name);
    if (values.phone) p.set("phone", values.phone);
    if (values.suburb) {
      if (/^\d{4}$/.test(values.suburb.trim())) p.set("postcode", values.suburb.trim());
      else p.set("suburb", values.suburb.trim());
    }
    if (values.unit) p.set("unit", values.unit);
    router.push(`/book${p.toString() ? `?${p}` : ""}`);
  };

  const label = "flex flex-col gap-1.5 text-[13px] font-semibold leading-none";

  return (
    <form
      onSubmit={onSubmit}
      aria-labelledby="quick-h"
      className="w-full rounded-xl border border-white/60 bg-white/82 p-[clamp(22px,3vw,32px)] text-ink shadow-hero backdrop-blur-[18px] backdrop-saturate-[1.2]"
    >
      <h2 id="quick-h" className="font-display text-[clamp(1.375rem,1.2rem+.8vw,1.75rem)] font-extrabold leading-[1.2] tracking-[-.015em]">
        {quickForm.title}
      </h2>
      <p className="mt-2 text-[14.5px] leading-[1.5] text-muted">{quickForm.lead}</p>
      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
        <label className={label}>
          Name
          <input name="name" value={values.name} onChange={onChange} autoComplete="name" className={fieldClass} />
        </label>
        <label className={label}>
          Phone
          <input name="phone" type="tel" inputMode="tel" value={values.phone} onChange={onChange} autoComplete="tel" className={fieldClass} />
        </label>
        <label className={label}>
          Suburb or postcode
          <input name="suburb" value={values.suburb} onChange={onChange} autoComplete="postal-code" className={fieldClass} />
        </label>
        <label className={label}>
          Type of air conditioner
          <select name="unit" value={values.unit} onChange={onChange} className={cn(fieldClass, "field-select")}>
            <option value="">Select…</option>
            {quickUnitOptions.map((o) => (
              <option key={o.label} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        type="submit"
        disabled={busy}
        className="group mt-[18px] inline-flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-md border-0 bg-navy-700 text-[15.5px] font-semibold leading-none text-white transition-[background-color,transform,gap] duration-250 ease-out hover:-translate-y-px hover:gap-3.5 hover:bg-navy-800 disabled:opacity-70"
      >
        {quickForm.cta}
        <ArrowRight className="size-[18px]" aria-hidden="true" />
      </button>
      <p className="mt-3 text-[12.5px] leading-[1.5] text-muted">{quickForm.note}</p>
    </form>
  );
}
