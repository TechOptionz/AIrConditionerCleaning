import "server-only";
import { Resend } from "resend";

/**
 * Email delivery. Configured through environment variables (see .env.example).
 * When RESEND_API_KEY / BOOKING_TO_EMAIL / BOOKING_FROM_EMAIL are not all set
 * the function reports `configured: false` and the forms stay in a clearly
 * labelled development state — no fake success is ever shown.
 */
export function mailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.BOOKING_TO_EMAIL && process.env.BOOKING_FROM_EMAIL);
}

export type MailPayload = {
  subject: string;
  /** Plain-text body. Kept intentionally simple for reliable deliverability. */
  text: string;
  replyTo?: string;
};

export async function sendMail(payload: MailPayload): Promise<{ sent: boolean; configured: boolean; error?: string }> {
  if (!mailConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[mail] Not configured — request logged, not delivered:\n" + payload.text);
    }
    return { sent: false, configured: false };
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.BOOKING_FROM_EMAIL!,
      to: process.env.BOOKING_TO_EMAIL!.split(",").map((s) => s.trim()),
      replyTo: payload.replyTo,
      subject: payload.subject,
      text: payload.text,
    });
    if (error) return { sent: false, configured: true, error: error.message };
    return { sent: true, configured: true };
  } catch (e) {
    return { sent: false, configured: true, error: e instanceof Error ? e.message : "Unknown error" };
  }
}

export function formatLines(entries: [string, string | number | boolean | undefined][]) {
  return entries
    .filter(([, v]) => v !== undefined && v !== "" && v !== false)
    .map(([k, v]) => `${k}: ${v === true ? "Yes" : v}`)
    .join("\n");
}
