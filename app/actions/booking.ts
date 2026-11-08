"use server";

import { bookingSchema, type ActionResult } from "@/lib/schemas";
import { formatLines, sendMail } from "@/lib/mail";
import { site } from "@/content/site";

const MIN_SECONDS = Number(process.env.FORM_MIN_SECONDS ?? 4);

function issuesToErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const errors: Record<string, string> = {};
  for (const i of issues) {
    const key = String(i.path[0] ?? "form");
    if (!errors[key]) errors[key] = i.message;
  }
  return errors;
}

function looksLikeSpam(input: Record<string, unknown>) {
  if (typeof input.website === "string" && input.website.trim() !== "") return true;
  const started = Number(input.startedAt);
  if (Number.isFinite(started) && started > 0 && Date.now() - started < MIN_SECONDS * 1000) return true;
  return false;
}

/** Validates and forwards a booking request. Never reports success unless the email was actually delivered. */
export async function submitBooking(raw: unknown): Promise<ActionResult> {
  const input = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  if (looksLikeSpam(input)) return { ok: false, reason: "spam" };

  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "validation", errors: issuesToErrors(parsed.error.issues) };
  const b = parsed.data;

  const text = [
    `New booking request — ${site.name}`,
    "",
    "REQUEST (not a confirmed appointment)",
    formatLines([
      ["Premises", b.premises],
      ["Unit type", b.unitType],
      ["Number of units", b.unitCount],
      ["Preferred cleaning level", b.pkg],
      ["Notes", b.notes],
    ]),
    "",
    "WHERE & WHEN",
    formatLines([
      ["Street address", b.address],
      ["Suburb", b.suburb],
      ["Postcode", b.postcode],
      ["Preferred date", b.date],
      ["Preferred time", b.time],
      ["Access notes", b.access],
    ]),
    "",
    "CONTACT",
    formatLines([
      ["Name", b.name],
      ["Phone", b.phone],
      ["Email", b.email],
      ["Preferred contact method", b.contact],
      ["Privacy acknowledged", b.consent],
    ]),
  ].join("\n");

  const res = await sendMail({ subject: `Booking request: ${b.unitType} × ${b.unitCount} — ${b.suburb} ${b.postcode}`, text, replyTo: b.email });
  if (!res.configured) return { ok: false, reason: "not-configured" };
  if (!res.sent) {
    console.error("[booking] delivery failed:", res.error);
    return { ok: false, reason: "delivery-failed" };
  }
  return { ok: true };
}
