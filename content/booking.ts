import { services } from "./services";

export const premisesOptions = ["Residential", "Commercial", "Other"] as const;
export type Premises = (typeof premisesOptions)[number];

/** Unit types offered in the booking form. Cleaning categories only. */
export const unitTypeOptions = [
  ...services.map((s) => s.bookingLabel),
  "Not sure",
] as const;
export type UnitType = (typeof unitTypeOptions)[number];

export const packageOptions = [
  { label: "Maintenance clean", sub: "Routine upkeep" },
  { label: "Detailed clean", sub: "More thorough attention" },
  { label: "Not sure yet", sub: "Recommend after inspection" },
] as const;
export type PackageChoice = (typeof packageOptions)[number]["label"];

export const timeOptions = ["Morning", "Afternoon", "Any"] as const;
export type TimeChoice = (typeof timeOptions)[number];

export const contactMethodOptions = ["Call", "SMS", "Email"] as const;
export type ContactMethod = (typeof contactMethodOptions)[number];

/** Quick form (homepage) unit select → booking unitType mapping */
export const quickUnitOptions: { label: string; value: UnitType | "" }[] = [
  { label: "Split", value: "Split system (wall-mounted)" },
  { label: "Ducted", value: "Ducted" },
  { label: "Cassette", value: "Ceiling cassette" },
  { label: "Split deep clean", value: "Split system deep clean (indoor wash)" },
  { label: "Mould or odour", value: "Mould or odour problem" },
  { label: "Other or not sure", value: "Not sure" },
];

export const bookingPage = {
  eyebrow: "Request a booking",
  h1Lines: ["Request an air-", "conditioning service"],
  lead: "Tell us a little about your system, location and preferred timing. We'll review the details and confirm the next step.",
  steps: ["Your air conditioner", "Where and when", "Your details"],
  submitLabel: "Send Booking Request",
  reassurance: "Your preferred date is not confirmed until our team contacts you.",
  whatNext: [
    "We review your system details and location.",
    "We contact you to confirm the scope and an applicable quote.",
    "We agree a time that suits you.",
  ],
  metaDescription: "Request an air-conditioning cleaning appointment. Tell us about your system, location and preferred timing — we confirm availability before anything is booked.",
};

export const contactPage = {
  eyebrow: "Contact",
  h1Lines: ["Let's talk about", "your air conditioner"],
  lead: "Have a question about cleaning, servicing or what to book? Send us a message and we'll help you with the next step.",
  formTitle: "Send an enquiry",
  submitLabel: "Send Message",
  successTitle: "Thanks for getting in touch.",
  successBody: "Your enquiry has been received. We'll reply using the contact details you provided.",
  errorTitle: "We couldn't send your message.",
  errorBody: "Please try again or contact us by phone.",
  metaDescription: "Contact Northline Air Care with a question about air-conditioning cleaning or servicing, or send an enquiry and we'll help with the next step.",
};

export const thankYouPage = {
  title: "Your request has been sent.",
  body: "Thank you for contacting Northline Air Care. We'll review the information and contact you about the proposed service and availability.",
  metaDescription: "Your booking request has been sent to Northline Air Care.",
};
