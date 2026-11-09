"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { quickForm } from "@/content/home";
import { quickUnitOptions } from "@/content/booking";
import { cn } from "@/lib/utils";

/**
 * Homepage 4-field mini form rendered as a white bar under the hero. Nothing
 * is submitted here: it hands the values to /book as query parameters so the
 * full, validated booking form is prefilled.
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

  const label = "flex flex-col gap-1.5 text-[12.5px] font-semibold leading-none text-ink";
  const field =
    "h-12 w-full rounded-md border border-line-strong bg-white px-3.5 text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-150 hover:border-blue-300 focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(0,102,204,.18)]";

  return (
    <form onSubmit={onSubmit} aria-labelledby="quick-h" className="relative overflow-hidden rounded-lg border border-line bg-white p-5 shadow-deep sm:p-6 lg:p-7">
      <span className="absolute inset-y-0 left-0 w-1 bg-blue-600" aria-hidden="true" />
      <div className="grid gap-5 lg:grid-cols-[minmax(200px,0.9fr)_2.4fr] lg:items-end lg:gap-8">
        <div>
          <h2 id="quick-h" className="font-display text-[clamp(1.125rem,1rem+.5vw,1.375rem)] font-bold leading-[1.2] tracking-[-.015em] text-ink">
            {quickForm.title}
          </h2>
          <p className="mt-1.5 text-[13.5px] leading-[1.5] text-muted">{quickForm.lead}</p>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1.2fr_auto]">
          <label className={label}>
            Name
            <input name="name" value={values.name} onChange={onChange} autoComplete="name" className={field} />
          </label>
          <label className={label}>
            Phone
            <input name="phone" type="tel" inputMode="tel" value={values.phone} onChange={onChange} autoComplete="tel" className={field} />
          </label>
          <label className={label}>
            Suburb or postcode
            <input name="suburb" value={values.suburb} onChange={onChange} autoComplete="postal-code" className={field} />
          </label>
          <label className={label}>
            Type of air conditioner
            <select name="unit" value={values.unit} onChange={onChange} className={cn(field, "field-select")}>
              <option value="">Select…</option>
              {quickUnitOptions.map((o) => (
                <option key={o.label} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            disabled={busy}
            aria-label={`${quickForm.cta} to the booking form`}
            className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 self-end rounded-md border-0 bg-action px-5 shadow-cta text-[15px] font-semibold leading-none text-white transition-[background-color,box-shadow] duration-200 ease-out hover:bg-action-hover hover:shadow-primary disabled:opacity-70 sm:col-span-2 xl:col-span-1"
          >
            {quickForm.cta}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="mt-3.5 text-[12.5px] leading-[1.5] text-muted">{quickForm.note}</p>
    </form>
  );
}
