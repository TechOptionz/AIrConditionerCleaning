import { z } from "zod";
import { premisesOptions, unitTypeOptions, packageOptions, timeOptions, contactMethodOptions } from "@/content/booking";

/** Australian landline/mobile, with or without +61, spaces, brackets or dashes. */
const AU_PHONE = /^(\+?61|0)[2-478]\d{8}$/;
export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Please enter your phone number.")
  .refine((v) => AU_PHONE.test(v.replace(/[\s()-]/g, "")), "Enter a valid Australian phone number.");

export const emailSchema = z.string().trim().min(1, "Please enter your email address.").email("Enter a valid email address.");
export const nameSchema = z.string().trim().min(2, "Please enter your name.").max(80);
export const postcodeSchema = z.string().trim().regex(/^\d{4}$/, "Enter a 4-digit Australian postcode.");

const packageLabels = packageOptions.map((p) => p.label) as [string, ...string[]];

/** Anti-spam fields present on every form. */
const antiSpam = {
  /** Honeypot: must stay empty. */
  website: z.string().max(0, "Spam check failed.").optional().or(z.literal("")),
  /** Epoch ms when the form was rendered; server checks minimum fill time. */
  startedAt: z.coerce.number().int().nonnegative().optional(),
};

export const bookingStep1 = z.object({
  premises: z.enum(premisesOptions),
  unitType: z.enum(unitTypeOptions, { message: "Please choose a unit type." }),
  unitCount: z.coerce.number({ message: "Enter at least 1 unit." }).int().min(1, "Enter at least 1 unit.").max(99, "For more than 99 units please call us."),
  pkg: z.enum(packageLabels),
  notes: z.string().trim().max(500, "Please keep notes under 500 characters.").optional().or(z.literal("")),
});

export const bookingStep2 = z.object({
  address: z.string().trim().max(160).optional().or(z.literal("")),
  suburb: z.string().trim().min(2, "Please enter your suburb.").max(80),
  postcode: postcodeSchema,
  date: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v), "Enter a valid date."),
  time: z.enum(timeOptions),
  access: z.string().trim().max(500).optional().or(z.literal("")),
});

export const bookingStep3 = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  contact: z.enum(contactMethodOptions),
  consent: z.literal(true, { message: "Please acknowledge the privacy policy to continue." }),
});

export const bookingSchema = bookingStep1.extend(bookingStep2.shape).extend(bookingStep3.shape).extend(antiSpam);
export type BookingInput = z.input<typeof bookingSchema>;
export type BookingValues = z.output<typeof bookingSchema>;

export const contactSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    suburb: z.string().trim().max(80).optional().or(z.literal("")),
    message: z.string().trim().min(10, "Please tell us a little more (10+ characters).").max(2000),
    consent: z.literal(true, { message: "Please acknowledge the privacy policy." }),
  })
  .extend(antiSpam);
export type ContactInput = z.input<typeof contactSchema>;
export type ContactValues = z.output<typeof contactSchema>;

export const quickSchema = z.object({
  name: z.string().trim().max(80).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  suburb: z.string().trim().max(80).optional().or(z.literal("")),
  unit: z.string().optional().or(z.literal("")),
});
export type QuickValues = z.infer<typeof quickSchema>;

/** Result shape returned by every server action. */
export type ActionResult =
  | { ok: true }
  | { ok: false; reason: "validation"; errors: Record<string, string> }
  | { ok: false; reason: "not-configured" }
  | { ok: false; reason: "delivery-failed" }
  | { ok: false; reason: "spam" };
