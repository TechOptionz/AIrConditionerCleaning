"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { quickForm } from "@/content/home";
import { quickUnitOptions } from "@/content/booking";
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

  const label = "flex flex-col gap-1.5 text-[13px] font-semibold leading-none text-white/90";
  // Frosted fields that sit on the glass card: translucent fill, white text, crisp focus ring.
  const glassField =
    "h-12 w-full rounded-sm border border-white/30 bg-white/12 px-3.5 text-[16px] text-white placeholder:text-white/55 outline-none backdrop-blur-[6px] transition-[border-color,background-color,box-shadow] duration-150 hover:bg-white/16 focus:border-teal-300 focus:bg-white/18 focus:shadow-[0_0_0_3px_rgba(142,209,218,.28)] aria-[invalid=true]:border-danger";

  return (
    <form
      onSubmit={onSubmit}
      aria-labelledby="quick-h"
      className="liquid-glass relative w-full overflow-hidden rounded-xl p-[clamp(22px,3vw,32px)] text-white"
    >
      <h2 id="quick-h" className="relative font-display text-[clamp(1.375rem,1.2rem+.8vw,1.75rem)] font-extrabold leading-[1.2] tracking-[-.015em]">
        {quickForm.title}
      </h2>
      <p className="relative mt-2 text-[14.5px] leading-[1.5] text-white/80">{quickForm.lead}</p>
      <div className="relative mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
        <label className={label}>
          Name
          <input name="name" value={values.name} onChange={onChange} autoComplete="name" className={glassField} />
        </label>
        <label className={label}>
          Phone
          <input name="phone" type="tel" inputMode="tel" value={values.phone} onChange={onChange} autoComplete="tel" className={glassField} />
        </label>
        <label className={label}>
          Suburb or postcode
          <input name="suburb" value={values.suburb} onChange={onChange} autoComplete="postal-code" className={glassField} />
        </label>
        <label className={label}>
          Type of air conditioner
          <select name="unit" value={values.unit} onChange={onChange} className={cn(glassField, "field-select field-select-light")}>
            <option value="" className="text-ink">Select…</option>
            {quickUnitOptions.map((o) => (
              <option key={o.label} value={o.value} className="text-ink">
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        type="submit"
        disabled={busy}
        className="group relative mt-[18px] inline-flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-md border-0 bg-teal-600 text-[15.5px] font-semibold leading-none text-white shadow-[0_10px_24px_rgba(19,124,139,.35)] transition-[background-color,transform,gap] duration-250 ease-out hover:-translate-y-px hover:gap-3.5 hover:bg-teal-700 disabled:opacity-70"
      >
        {quickForm.cta}
        <ArrowRight className="size-[18px]" aria-hidden="true" />
      </button>
      <p className="relative mt-3 text-[12.5px] leading-[1.5] text-white/70">{quickForm.note}</p>
    </form>
  );
}
