"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { areasPage } from "@/content/areas";
import { fieldClass } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Suburb / postcode check. There is no verified coverage list yet, so the
 * honest behaviour is to carry the location into the booking request where
 * the business confirms coverage in its reply. Stated plainly below the field.
 */
export function AreaCheckForm({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = value.trim();
    if (v.length < 2) {
      setError("Enter your suburb or 4-digit postcode.");
      return;
    }
    const p = new URLSearchParams();
    if (/^\d{4}$/.test(v)) p.set("postcode", v);
    else p.set("suburb", v);
    router.push(`/book?${p}`);
  };

  return (
    <form onSubmit={submit} className={cn("w-full", className)} noValidate>
      <label htmlFor="area-check" className={cn("mb-1.5 block text-[13px] font-semibold leading-none", tone === "dark" ? "text-white" : "text-ink")}>
        {areasPage.checkLabel}
      </label>
      <div className="flex flex-wrap gap-2.5">
        <input
          id="area-check"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          autoComplete="postal-code"
          aria-invalid={error ? true : undefined}
          aria-describedby="area-check-note"
          className={cn(fieldClass, "h-14 flex-[1_1_220px] text-[16px]")}
          placeholder="e.g. 2000"
        />
        <Button type="submit" size="lg" className="flex-[0_0_auto]">
          {areasPage.checkCta}
        </Button>
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-[13px] font-medium text-danger">
          {error}
        </p>
      )}
      <p id="area-check-note" className={cn("mt-2.5 text-[12.5px] leading-[1.5]", tone === "dark" ? "text-white/65" : "text-muted")}>
        {areasPage.checkNote}
      </p>
    </form>
  );
}
