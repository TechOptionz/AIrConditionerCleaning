"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { contactSchema, type ContactInput, type ContactValues } from "@/lib/schemas";
import { contactPage } from "@/content/booking";
import { site } from "@/content/site";
import { submitContact } from "@/app/actions/contact";
import { Input, Textarea, Checkbox } from "@/components/ui/FormField";
import { DevNotice } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { telHref } from "@/lib/utils";

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "sent" | "not-configured" | "failed" | "spam">("idle");
  const [startedAt, setStartedAt] = useState(0);
  useEffect(() => setStartedAt(Date.now()), []);

  const { register, handleSubmit, reset, setError, formState } = useForm<ContactInput, unknown, ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", suburb: "", message: "", consent: undefined as unknown as true, website: "", startedAt },
  });
  const { errors } = formState;

  const onSubmit = (data: ContactValues) => {
    setStatus("idle");
    startTransition(async () => {
      const res = await submitContact({ ...data, startedAt });
      if (res.ok) {
        setStatus("sent");
        reset();
        return;
      }
      if (res.reason === "validation") {
        for (const [k, msg] of Object.entries(res.errors)) setError(k as keyof ContactInput, { message: msg });
        return;
      }
      setStatus(res.reason === "not-configured" ? "not-configured" : res.reason === "spam" ? "spam" : "failed");
    });
  };

  if (status === "sent") {
    return (
      <motion.div role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-[420px] flex-col justify-center rounded-2xl border border-line bg-white p-[clamp(24px,3vw,36px)]">
        <span className="grid size-14 place-items-center rounded-full bg-teal-50">
          <Check className="size-6 text-teal-600" strokeWidth={2.4} aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-[clamp(1.5rem,1.3rem+1vw,2rem)] font-extrabold text-ink">{contactPage.successTitle}</h2>
        <p className="mt-2.5 leading-[1.6] text-body">{contactPage.successBody}</p>
        <Button type="button" variant="outline" className="mt-5 self-start" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-labelledby="ct-h" className="rounded-2xl border border-line bg-white p-[clamp(24px,3vw,36px)]">
      <h2 id="ct-h" className="font-display text-[clamp(1.5rem,1.3rem+1vw,2rem)] font-extrabold tracking-[-.015em] text-ink">
        {contactPage.formTitle}
      </h2>
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
        <Input label="Name" required autoComplete="name" error={errors.name?.message} {...register("name")} />
        <Input label="Email" required type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <Input label="Phone" required type="tel" inputMode="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
        <Input label="Suburb" autoComplete="address-level2" error={errors.suburb?.message} {...register("suburb")} />
        <Textarea label="Message" required rows={5} wrapClassName="col-span-full" error={errors.message?.message} {...register("message")} />
        <Checkbox
          wrapClassName="col-span-full"
          error={errors.consent?.message}
          label={
            <>
              I acknowledge the{" "}
              <Link href="/privacy" className="text-teal-600">
                privacy policy
              </Link>{" "}
              and consent to being contacted about this enquiry.
            </>
          }
          {...register("consent")}
        />
      </div>
      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      <input type="hidden" value={startedAt} {...register("startedAt")} />

      {status !== "idle" && (
        <div className="mt-5" aria-live="polite">
          {status === "not-configured" && (
            <DevNotice>
              Development mode: no email or CRM provider is configured, so this message was <strong>not delivered</strong>. Set RESEND_API_KEY, BOOKING_TO_EMAIL and BOOKING_FROM_EMAIL (see .env.example) to enable delivery.
            </DevNotice>
          )}
          {(status === "failed" || status === "spam") && (
            <p role="alert" className="rounded-[10px] border border-danger/30 bg-danger/5 px-3.5 py-3 text-[14px] leading-[1.5] text-danger">
              <strong>{contactPage.errorTitle}</strong> {contactPage.errorBody}{" "}
              <a href={telHref(site.phone)} className="font-semibold">
                {site.phone}
              </a>
            </p>
          )}
        </div>
      )}

      <Button type="submit" size="lg" disabled={pending} className="mt-6 !h-[52px] min-w-[170px]">
        {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {pending ? "Sending…" : contactPage.submitLabel}
      </Button>
    </form>
  );
}
