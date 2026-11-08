"use server";

import { contactSchema, type ActionResult } from "@/lib/schemas";
import { formatLines, sendMail } from "@/lib/mail";
import { site } from "@/content/site";

const MIN_SECONDS = Number(process.env.FORM_MIN_SECONDS ?? 4);

export async function submitContact(raw: unknown): Promise<ActionResult> {
  const input = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  if (typeof input.website === "string" && input.website.trim() !== "") return { ok: false, reason: "spam" };
  const started = Number(input.startedAt);
  if (Number.isFinite(started) && started > 0 && Date.now() - started < MIN_SECONDS * 1000) return { ok: false, reason: "spam" };

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) {
      const key = String(i.path[0] ?? "form");
      if (!errors[key]) errors[key] = i.message;
    }
    return { ok: false, reason: "validation", errors };
  }
  const c = parsed.data;
  const text = [
    `New enquiry — ${site.name}`,
    "",
    formatLines([
      ["Name", c.name],
      ["Email", c.email],
      ["Phone", c.phone],
      ["Suburb", c.suburb],
      ["Privacy acknowledged", c.consent],
    ]),
    "",
    "MESSAGE",
    c.message,
  ].join("\n");

  const res = await sendMail({ subject: `Enquiry from ${c.name}${c.suburb ? ` (${c.suburb})` : ""}`, text, replyTo: c.email });
  if (!res.configured) return { ok: false, reason: "not-configured" };
  if (!res.sent) {
    console.error("[contact] delivery failed:", res.error);
    return { ok: false, reason: "delivery-failed" };
  }
  return { ok: true };
}
