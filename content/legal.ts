/**
 * Legal pages. These are structured placeholders — the business must supply
 * approved wording before launch. Placeholder text renders in a dashed box.
 */
export type LegalSection = { heading: string; body: string; placeholder: boolean };

export type LegalDoc = {
  slug: "privacy" | "terms";
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  metaDescription: string;
};

export const legal: Record<"privacy" | "terms", LegalDoc> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    lastUpdated: "[DATE]",
    intro: "This page explains how Northline Air Care handles the personal information you share with us when you make an enquiry or request a booking.",
    sections: [
      { heading: "What we collect", body: "[APPROVED PRIVACY POLICY — contact details and system information you submit through enquiry and booking forms.]", placeholder: true },
      { heading: "How we use it", body: "[APPROVED PRIVACY POLICY — to respond to your enquiry, prepare quotes and arrange agreed services.]", placeholder: true },
      { heading: "Storage and sharing", body: "[APPROVED PRIVACY POLICY — where data is stored, who processes it (email / CRM provider) and retention period.]", placeholder: true },
      { heading: "Your choices", body: "[APPROVED PRIVACY POLICY — how to access, correct or delete your information. Contact: [EMAIL].]", placeholder: true },
    ],
    metaDescription: "How Northline Air Care collects, uses and stores the information you provide through enquiry and booking forms.",
  },
  terms: {
    slug: "terms",
    title: "Terms of Service",
    lastUpdated: "[DATE]",
    intro: "These terms describe how booking requests, quotes and cleaning visits work with Northline Air Care.",
    sections: [
      { heading: "Service requests", body: "[APPROVED TERMS — booking requests are not confirmed appointments until accepted by the business.]", placeholder: true },
      { heading: "Quotes and charges", body: "[APPROVED TERMS — scope, quotes and any additional charges are discussed before work proceeds.]", placeholder: true },
      { heading: "Limitations", body: "[APPROVED TERMS — cleaning does not diagnose or guarantee resolution of electrical, refrigerant or mechanical faults.]", placeholder: true },
      { heading: "Contact", body: "[BUSINESS NAME] · [ABN] · [EMAIL] · [PHONE]", placeholder: true },
    ],
    metaDescription: "Terms covering booking requests, quotes and the scope of Northline Air Care cleaning visits.",
  },
};
