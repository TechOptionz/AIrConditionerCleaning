/**
 * Business information. Everything in [SQUARE BRACKETS] is an unconfirmed
 * placeholder and is rendered in a visibly provisional style — replace with
 * verified details before launch. Used by header, footer, CTAs, metadata and JSON-LD.
 */
export const site = {
  name: "Northline Air Care",
  legalName: "[BUSINESS LEGAL NAME]",
  tagline: "Cleaning & servicing",
  description:
    "Explore professional air-conditioning cleaning and servicing options for homes and workplaces. Find the right service for your system and request a booking.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en-AU",
  /** Display phone. Placeholder until the business confirms. */
  phone: "1300 000 000",
  phoneIsPlaceholder: true,
  email: "[EMAIL]",
  hours: "[HOURS]",
  abn: "[ABN]",
  address: "[BUSINESS ADDRESS IF PUBLIC]",
  serviceRegion: "[VERIFIED SERVICE REGION]",
  announcement: "Helping homes and workplaces enjoy cleaner, better-maintained air conditioning.",
  footerStatement:
    "Practical air-conditioning care for Australian homes and businesses. From routine cleaning enquiries to more involved system servicing, we're here to help you find the right option.",
  disclaimer:
    "Service availability and inclusions depend on your system, its condition and your location. We'll confirm details before arranging any work.",
  /** Header configuration (mirrors the design's props). */
  header: {
    showTopBar: true,
    variant: "overlay" as "overlay" | "solid",
  },
  /** Global motion level: "full" | "subtle" | "off" (reduced-motion always wins). */
  motionLevel: "full" as "full" | "subtle" | "off",
  social: [] as { label: string; href: string }[],
};

export type Site = typeof site;
