import type { Faq } from "./faqs";
import type { ServiceSlug } from "./services";
import { images } from "./images";

export type SectorSlug = "residential" | "commercial";

export type Sector = {
  slug: SectorSlug;
  label: string;
  eyebrow: string;
  h1: string;
  lead: string;
  cta: string;
  h2a: string;
  bodyA: string;
  points: { t: string; b: string }[];
  h2b: string;
  /** Provisional note shown in a visibly placeholder style; empty string hides it. */
  note: string;
  chips: string[];
  units: ServiceSlug[];
  faqs: Faq[];
  /** Homepage sticky-panel card copy */
  homeTitle: string;
  homeBody: string;
  homeCta: string;
  metaDescription: string;
};

export const sectors: Record<SectorSlug, Sector> = {
  residential: {
    slug: "residential",
    label: "Residential",
    eyebrow: "Residential air conditioning",
    h1: "Air conditioning care for the place you call home",
    lead: "From a bedroom split system to a whole-home ducted setup, good maintenance begins with understanding your unit and how it's used.",
    cta: "Request a Home AC Service",
    h2a: "Keep your home air conditioner on your care list",
    bodyA: "Household air conditioners can collect dust and require periodic attention. We help homeowners and tenants explore an appropriate cleaning or servicing option for their equipment.",
    points: [
      { t: "Clear guidance", b: "on cleaning options." },
      { t: "Convenient enquiries", b: "for one or multiple systems." },
      { t: "Practical care information", b: "after the appointment." },
    ],
    h2b: "Common household systems",
    note: "",
    chips: ["Split systems", "Ducted", "Window and portable units", "Outdoor condensers"],
    units: ["split-system-cleaning", "ducted-system-cleaning", "window-unit-cleaning", "portable-ac-cleaning"],
    faqs: [
      { q: "Can tenants request a clean?", a: "Check with your property manager or landlord where approval is required. We're happy to send a quote you can forward on." },
      { q: "Do you clean multiple indoor units?", a: "Yes. Include the number and model information in your enquiry so the quote reflects every unit." },
      { q: "Do I need to be home?", a: "Someone needs to provide access and be reachable during the visit. Tell us in the request if a different site contact will be there." },
    ],
    homeTitle: "Comfort starts at home.",
    homeBody: "Keep household systems maintained with cleaning options tailored to your unit and how often it's used.",
    homeCta: "Residential Services",
    metaDescription: "Air-conditioning cleaning options for Australian homes: split systems, ducted, window and portable units. Clear guidance and a simple booking request.",
  },
  commercial: {
    slug: "commercial",
    label: "Commercial",
    eyebrow: "Commercial air conditioning",
    h1: "Air conditioning support for busy workplaces",
    lead: "Explore practical cleaning and maintenance enquiries for offices, retail spaces and other commercial environments.",
    cta: "Discuss Commercial Requirements",
    h2a: "Planned around your premises",
    bodyA: "Commercial systems vary in size, location and access. Share your site details, unit types and preferred service window so we can discuss an appropriate approach.",
    points: [
      { t: "Site address and access details", b: "" },
      { t: "Equipment type and approximate unit count", b: "" },
      { t: "Any recent maintenance information", b: "" },
      { t: "Preferred dates and site contact", b: "" },
    ],
    h2b: "Sectors we can discuss",
    note: "Only where the business accepts these sites. After-hours service, safety documentation and compliance capabilities must be confirmed rather than assumed.",
    chips: ["Offices & shared workspaces", "Retail & hospitality", "Property management & strata", "Schools & community facilities"],
    units: ["cassette-cleaning", "ducted-system-cleaning", "under-ceiling-cleaning", "bulkhead-cleaning"],
    faqs: [
      { q: "What helps us prepare a quote?", a: "Site address and access details; equipment type and approximate unit count; any recent maintenance information; preferred dates and site contact." },
      { q: "Do you work in commercial buildings?", a: "Commercial enquiries are welcome, subject to confirmed service capability and location." },
      { q: "Can you provide documentation for our records?", a: "Tell us what your site requires in the enquiry. What can be provided needs to be confirmed by the business rather than assumed." },
    ],
    homeTitle: "Support for busy spaces.",
    homeBody: "Discuss planned cleaning and servicing for offices, shops and other commercial premises.",
    homeCta: "Commercial Services",
    metaDescription: "Air-conditioning cleaning enquiries for offices, retail and other commercial premises: cassette, ducted, under-ceiling and bulkhead systems.",
  },
};

export const sectorImages = images.sectors;
