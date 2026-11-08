/**
 * Service areas. The business has not yet confirmed its coverage, so nothing
 * here is presented as a served location. Add regions with `verified: true`
 * once confirmed and they will render as real coverage on /service-areas.
 */
export type Area = {
  name: string;
  /** Suburbs or districts within the region */
  places: string[];
  verified: boolean;
};

export const areas: Area[] = [
  // Example of the shape to fill in once confirmed:
  // { name: "Northern Suburbs", places: ["Suburb A", "Suburb B", "Suburb C"], verified: true },
];

export const areasPage = {
  eyebrow: "Service areas",
  h1: "Find air-conditioning service near you",
  lead: "Enter your suburb or postcode to ask whether we can assist in your area.",
  h2: "Where we currently work",
  pendingTitle: "Coverage details are being confirmed",
  pendingBody:
    "We only list suburbs we genuinely service. Verified coverage will appear here once confirmed by the business. In the meantime, send your suburb or postcode with an enquiry and we'll let you know whether service is available.",
  emptyTitle: "Don't see your suburb?",
  emptyBody: "Send us an enquiry and we'll let you know whether service is available.",
  checkLabel: "Suburb or postcode",
  checkCta: "Check My Area",
  checkNote: "This takes you to the booking request with your location prefilled. We confirm coverage when we reply — the check does not look up a live list.",
  metaDescription: "Ask whether Northline Air Care can service your suburb. Verified coverage is listed as it is confirmed; send your postcode to check availability.",
};

export const verifiedAreas = () => areas.filter((a) => a.verified);
