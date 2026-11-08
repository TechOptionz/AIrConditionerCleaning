"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { bookingSchema, type BookingInput, type BookingValues } from "@/lib/schemas";
import { bookingPage, contactMethodOptions, packageOptions, premisesOptions, timeOptions, unitTypeOptions } from "@/content/booking";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { submitBooking } from "@/app/actions/booking";
import { Input, Select, Textarea, Checkbox, ChipGroup } from "@/components/ui/FormField";
import { DevNotice } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { cn, telHref } from "@/lib/utils";
import Link from "next/link";

const STEP_FIELDS: (keyof BookingInput)[][] = [
  ["premises", "unitType", "unitCount", "pkg", "notes"],
  ["address", "suburb", "postcode", "date", "time", "access"],
  ["name", "phone", "email", "contact", "consent"],
];

export function BookingForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "not-configured" | "failed" | "spam">("idle");
  const [startedAt, setStartedAt] = useState(0);
  useEffect(() => setStartedAt(Date.now()), []);

  const tomorrow = useMemo(() => new Date(Date.now() + 864e5).toISOString().slice(0, 10), []);

  const prefillUnit = params.get("unit");
  const unitValid = prefillUnit && (unitTypeOptions as readonly string[]).includes(prefillUnit) ? (prefillUnit as BookingInput["unitType"]) : undefined;

  const form = useForm<BookingInput, unknown, BookingValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      premises: "Residential",
      unitType: unitValid,
      unitCount: 1,
      pkg: "Not sure yet",
      notes: "",
      address: "",
      suburb: params.get("suburb") ?? "",
      postcode: params.get("postcode") ?? "",
      date: "",
      time: "Any",
      access: "",
      name: params.get("name") ?? "",
      phone: params.get("phone") ?? "",
      email: "",
      contact: "Call",
      consent: undefined as unknown as true,
      website: "",
      startedAt,
    },
  });
  const { register, handleSubmit, trigger, watch, setValue, setError, formState } = form;
  const { errors } = formState;
  const values = watch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const next = async () => {
    const ok = await trigger(STEP_FIELDS[step], { shouldFocus: true });
    if (ok) setStep((s) => Math.min(s + 1, 2));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data: BookingValues) => {
    setStatus("idle");
    startTransition(async () => {
      const res = await submitBooking({ ...data, website: values.website ?? "", startedAt });
      if (res.ok) {
        const q = new URLSearchParams({
          sent: "1",
          unit: `${data.unitType} × ${data.unitCount}`,
          level: data.pkg,
          where: `${data.suburb} ${data.postcode}`,
          when: `${data.date ? data.date + " · " : ""}${data.time}`,
        });
        router.push(`/thank-you?${q}`);
        return;
      }
      if (res.reason === "validation") {
        for (const [k, msg] of Object.entries(res.errors)) setError(k as keyof BookingInput, { message: msg });
        const stepWithError = STEP_FIELDS.findIndex((fields) => fields.some((f) => res.errors[f]));
        if (stepWithError >= 0) setStep(stepWithError);
        return;
      }
      setStatus(res.reason === "not-configured" ? "not-configured" : res.reason === "spam" ? "spam" : "failed");
    });
  };

  const summary = {
    unit: `${values.unitType || "Not specified"} × ${values.unitCount || 1}`,
    where: [values.suburb, values.postcode].filter(Boolean).join(" ") || "Not specified",
    when: `${values.date ? values.date + " · " : ""}${values.time || "Any"} (to be confirmed)`,
  };

  const panel = "animate-in";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="min-w-0 rounded-2xl border border-line bg-white p-[clamp(20px,3vw,40px)]">
      {/* Progress */}
      <ol aria-label="Progress" className="m-0 mb-7 grid list-none grid-cols-3 gap-2 p-0">
        {bookingPage.steps.map((label, i) => {
          const done = i < step;
          const cur = i === step;
          const bar = done ? "bg-navy-700" : cur ? "bg-teal-600" : "bg-line";
          return (
            <li key={label} aria-current={cur ? "step" : undefined} className="flex min-w-0 flex-col gap-2.5">
              <span className={cn("h-1 rounded-full", bar)} />
              <span className={cn("flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-semibold leading-tight", cur || done ? "text-ink" : "text-faint")}>
                <span className={cn("grid size-[22px] shrink-0 place-items-center rounded-full text-[11px] text-white", bar, !cur && !done && "text-muted")}>{i + 1}</span>
                <span className="truncate">{label}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait" initial={false}>
        {step === 0 && (
          <motion.div key="s1" className={panel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <h2 className="display-3 text-ink">{bookingPage.steps[0]}</h2>
            <ChipGroup legend="Premises" required options={premisesOptions} value={values.premises} onChange={(v) => setValue("premises", v, { shouldValidate: true })} className="mt-6" />
            <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
              <Select label="Unit type" required error={errors.unitType?.message} {...register("unitType")}>
                <option value="">Select unit type…</option>
                <optgroup label="Cleaning by system type">
                  {services.map((s) => (
                    <option key={s.slug} value={s.bookingLabel}>
                      {s.bookingLabel}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Other">
                  <option value="Not sure">Not sure</option>
                </optgroup>
              </Select>
              <Input label="Number of units" required type="number" min={1} max={99} inputMode="numeric" error={errors.unitCount?.message} {...register("unitCount")} />
            </div>
            <ChipGroup legend="Preferred cleaning level" variant="card" options={packageOptions} value={values.pkg} onChange={(v) => setValue("pkg", v, { shouldValidate: true })} className="mt-5" />
            <Textarea label="Notes (symptoms, model, anything useful)" rows={3} maxLength={500} wrapClassName="mt-5" error={errors.notes?.message} {...register("notes")} />
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s2" className={panel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <h2 className="display-3 text-ink">{bookingPage.steps[1]}</h2>
            <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
              <Input label="Street address" autoComplete="street-address" wrapClassName="col-span-full" error={errors.address?.message} {...register("address")} />
              <Input label="Suburb" required autoComplete="address-level2" error={errors.suburb?.message} {...register("suburb")} />
              <Input label="Postcode" required inputMode="numeric" maxLength={4} autoComplete="postal-code" error={errors.postcode?.message} {...register("postcode")} />
              <Input label="Preferred date (optional)" type="date" min={tomorrow} error={errors.date?.message} {...register("date")} />
              <ChipGroup legend="Preferred time" options={timeOptions} value={values.time} onChange={(v) => setValue("time", v, { shouldValidate: true })} />
              <Textarea label="Access notes (parking, stairs, pets, site contact)" rows={3} wrapClassName="col-span-full" error={errors.access?.message} {...register("access")} />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s3" className={panel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <h2 className="display-3 text-ink">{bookingPage.steps[2]}</h2>
            <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
              <Input label="Name" required autoComplete="name" error={errors.name?.message} {...register("name")} />
              <Input label="Phone" required type="tel" inputMode="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
              <Input label="Email" required type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
              <ChipGroup legend="Preferred contact method" options={contactMethodOptions} value={values.contact} onChange={(v) => setValue("contact", v, { shouldValidate: true })} />
            </div>

            <div className="mt-6 rounded-lg bg-cream-100 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <strong className="text-[15px] text-ink">Review your request</strong>
                <button type="button" onClick={() => setStep(0)} className="cursor-pointer border-0 bg-transparent py-1.5 text-[14px] font-semibold leading-none text-teal-600 hover:underline">
                  Edit
                </button>
              </div>
              <dl className="mt-3.5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-[14.5px]">
                <dt className="text-muted">Premises</dt>
                <dd className="m-0 text-ink">{values.premises}</dd>
                <dt className="text-muted">Unit</dt>
                <dd className="m-0 text-ink">{summary.unit}</dd>
                <dt className="text-muted">Level</dt>
                <dd className="m-0 text-ink">{values.pkg}</dd>
                <dt className="text-muted">Location</dt>
                <dd className="m-0 text-ink">{summary.where}</dd>
                <dt className="text-muted">Timing</dt>
                <dd className="m-0 text-ink">{summary.when}</dd>
              </dl>
            </div>

            <Checkbox
              wrapClassName="mt-5"
              error={errors.consent?.message}
              label={
                <>
                  I acknowledge the{" "}
                  <Link href="/privacy" className="text-teal-600">
                    privacy policy
                  </Link>{" "}
                  and understand this is a booking request, not a confirmed appointment.
                </>
              }
              {...register("consent")}
            />

            {/* Honeypot — hidden from people, tempting to bots */}
            <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label>
                Website
                <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
              </label>
            </div>
            <input type="hidden" value={startedAt} {...register("startedAt")} />
          </motion.div>
        )}
      </AnimatePresence>

      {status !== "idle" && (
        <div className="mt-6" aria-live="polite">
          {status === "not-configured" && (
            <DevNotice>
              Development mode: no email or CRM provider is configured, so this request was <strong>not delivered</strong>. Set RESEND_API_KEY, BOOKING_TO_EMAIL and BOOKING_FROM_EMAIL (see .env.example) to enable delivery.
            </DevNotice>
          )}
          {status === "failed" && (
            <p role="alert" className="rounded-[10px] border border-danger/30 bg-danger/5 px-3.5 py-3 text-[14px] leading-[1.5] text-danger">
              <strong>Your request wasn&apos;t sent.</strong> Please try again or call{" "}
              <a href={telHref(site.phone)} className="font-semibold">
                {site.phone}
              </a>
              .
            </p>
          )}
          {status === "spam" && (
            <p role="alert" className="rounded-[10px] border border-danger/30 bg-danger/5 px-3.5 py-3 text-[14px] leading-[1.5] text-danger">
              The request looked automated and was not sent. Please wait a moment and try again, or call us.
            </p>
          )}
        </div>
      )}

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={back} icon={<ArrowLeft className="size-4" aria-hidden="true" />}>
            Back
          </Button>
        ) : (
          <span className="text-[13px] text-muted">Step 1 of 3</span>
        )}
        {step < 2 ? (
          <Button type="button" onClick={next} size="lg" className="!h-[52px]">
            Continue <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button type="submit" size="lg" disabled={pending} className="!h-[52px] min-w-[210px]">
            {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            {pending ? "Sending…" : bookingPage.submitLabel}
          </Button>
        )}
      </div>
      <p className="mt-4 text-[13px] leading-[1.5] text-muted">
        <strong className="text-ink">{bookingPage.reassurance}</strong>
      </p>
    </form>
  );
}
