export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  { q: "How do I know what type of air conditioner I have?", a: "A wall-mounted indoor unit is commonly a split system; ceiling vents may be connected to ducted air conditioning. If you're not sure, describe the unit or include a photo with your enquiry." },
  { q: "Will cleaning fix every problem?", a: "Cleaning can help address certain maintenance issues, but unusual noises, leaks, electrical faults or poor operation may need qualified diagnosis instead. Tell us what's happening before you book." },
  { q: "Can I request service for multiple units?", a: "Yes. Include the number and type of units so we can discuss the scope of work." },
  { q: "Do you work in commercial buildings?", a: "Commercial enquiries are welcome, subject to confirmed service capability and location." },
  { q: "Can I choose a preferred appointment time?", a: "You can suggest a date or time in your request. We'll confirm availability before an appointment is scheduled." },
  { q: "Will I receive a quote first?", a: "We aim to explain the proposed scope and applicable charges before agreed work begins." },
];

export const faqCategories = ["Services", "Pricing", "Booking", "Aftercare"] as const;
export type FaqCategory = (typeof faqCategories)[number];

export const faqs: Record<FaqCategory, Faq[]> = {
  Services: [
    { q: "How often should an air conditioner be cleaned?", a: "Follow the manufacturer's instructions and consider usage, dust and operating conditions. If you're unsure, ask us about your system." },
    { q: "Can cleaning fix an air conditioner that isn't cooling?", a: "Sometimes restricted airflow is a factor, but a lack of cooling can also indicate faults that need diagnosis. Cleaning is not a guaranteed fix." },
    { q: "Do you clean ducted and cassette systems?", a: "We can discuss these service requests; availability depends on the equipment and confirmed business capability." },
    { q: "What if I don't know my unit type?", a: "Describe it and include photos if possible. We'll help identify the right service before quoting." },
    { q: "Do you offer installation or repairs?", a: "No. Northline Air Care focuses on cleaning and related servicing. If a fault is found during a visit, we'll explain the recommended next step rather than attempting repair work." },
  ],
  Pricing: [
    { q: "How much does a service cost?", a: "Pricing depends on unit type, number of systems, access, condition and work required. Request a quote for your situation." },
    { q: "Are there additional charges?", a: "Any applicable additional work or charges should be discussed before proceeding." },
    { q: "Can I book multiple units together?", a: "Yes, include all units in the enquiry so they can be considered in the quote." },
  ],
  Booking: [
    { q: "Does submitting the form confirm my booking?", a: "No. It sends a request; we confirm availability and details before scheduling." },
    { q: "Can I suggest a date and time?", a: "Yes. Preferred times are requests until confirmed." },
    { q: "What details should I provide?", a: "Your suburb, contact details, system type, number of units and a brief description of the issue or service needed." },
  ],
  Aftercare: [
    { q: "Can I use the system immediately afterwards?", a: "Follow the technician's advice and the manufacturer's instructions for your equipment and the work performed." },
    { q: "What maintenance can I do myself?", a: "Check your unit's manual for safe filter care and routine user maintenance; leave electrical, refrigerant and complex internal work to qualified professionals." },
    { q: "What if I notice a problem after service?", a: "Contact us with the unit details, date of service and symptoms so the team can advise on next steps." },
  ],
};

export const bookingFaqs = faqs.Booking;
