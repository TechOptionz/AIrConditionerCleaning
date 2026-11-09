import { MessageCircle, Wind, ListChecks, Home, Sparkles, ShieldCheck, AlertCircle, Layers, Droplets, Clock, ClipboardList, FileCheck, SprayCan, Lightbulb, type LucideIcon } from "lucide-react";

export const hero = {
  eyebrow: "Air conditioner cleaning & servicing",
  headlineLines: ["Cleaner air starts with", "a cleaner air conditioner."],
  lead: "Professional cleaning for split, ducted and ceiling systems in homes and workplaces. We confirm your unit and the scope before anything is booked.",
  primaryCta: { label: "Request a Booking", href: "/book" },
  secondaryCta: { label: "Explore Services", href: "/services" },
  trustLine: ["Cleaning & servicing only", "Residential & commercial", "Scope and quote confirmed first"],
};

export const quickForm = {
  title: "Start a booking request",
  lead: "Four quick details. We prefill the full form for you.",
  cta: "Continue",
  note: "Sending a request does not confirm an appointment.",
};

export const servicesSection = {
  eyebrow: "Our services",
  title: "Cleaning by system type",
  lead: "Different air conditioners need different approaches. These are the services most people ask about; the full directory covers every indoor and outdoor unit we clean.",
  cta: { label: "View all services", href: "/services" },
  /** Slugs featured on the homepage; the rest appear as compact links. */
  featured: ["split-system-cleaning", "split-system-deep-clean", "mould-odour-treatment", "ducted-system-cleaning"] as const,
};

export const aboutSplit = {
  eyebrow: "Why choose us",
  title: "Careful cleaning, clearly explained",
  lead: "Booking an air-conditioning service should feel easy. We focus on understanding your system, protecting your space and explaining the next step without the jargon.",
  points: ["Cleaning & servicing specialists", "Scope agreed before work begins", "Walls, floors and electrics protected", "Residential & commercial enquiries", "Plain-language advice", "Honest about what a clean can fix"],
  quote: "If something needs qualified diagnosis instead of cleaning, we say so.",
  cta: { label: "More about how we work", href: "/about" },
};

export const sectorsSection = {
  eyebrow: "Where we work",
  title: "For homes, workplaces and everything in between",
  helper: "Not sure what type of system you have? Tell us what you can see and we'll help identify the next step.",
  helperCta: { label: "Help me choose", href: "/book" },
};

export type ProcessStep = { icon: LucideIcon; title: string; body: string };

export const processSection = {
  eyebrow: "How it works",
  title: "A straightforward four-step process",
  lead: "No confusing back-and-forth. We confirm your system and the service before arranging the work.",
  steps: [
    { icon: ClipboardList, title: "Tell us about your system", body: "Choose your unit type, how many you have and anything you've noticed." },
    { icon: FileCheck, title: "Confirm scope and quote", body: "We explain what the service may involve and the applicable charges before anything is arranged." },
    { icon: SprayCan, title: "Service day", body: "The team completes the agreed work with the surrounding area protected and left tidy." },
    { icon: Lightbulb, title: "Care advice", body: "Practical upkeep tips and a sense of when the system may need attention again." },
  ] satisfies ProcessStep[],
};

export type Feature = { icon: LucideIcon; title: string; body: string };

export const whyUs = {
  eyebrow: "Why choose us",
  title: "Clear advice. Considered care. A simpler experience.",
  lead: "Booking an air-conditioning service should feel easy. We focus on understanding your system and explaining the next step without the jargon.",
  cta: { label: "Ask a Question", href: "/contact" },
  features: [
    { icon: MessageCircle, title: "Easy enquiries", body: "Tell us what you need in minutes." },
    { icon: Wind, title: "System-specific advice", body: "Help identifying the right service for your unit." },
    { icon: ListChecks, title: "Clear scope", body: "Understand proposed inclusions before proceeding." },
    { icon: Home, title: "Residential & commercial", body: "Practical options for different spaces." },
    { icon: Sparkles, title: "Care-focused service", body: "Attention to the unit, surrounding space and work area." },
    { icon: ShieldCheck, title: "After-service guidance", body: "Know what to watch for between visits." },
  ] satisfies Feature[],
};

export const gallerySection = {
  eyebrow: "Inside the clean",
  title: "A closer look at the work",
  lead: "Wash bags, coil cleaning and filter care: the indoor work our service is built around.",
};

export const beforeAfterSection = {
  eyebrow: "Before and after",
  title: "What a clean can look like",
  lead: "Dust, grime and moisture collect inside an indoor unit over time. A clean removes what has built up on the accessible parts.",
  before: {
    heading: "Before a clean",
    points: [
      { t: "Dust on filters and louvres", b: "Visible build-up on the parts you can see usually means more inside." },
      { t: "Musty smell on start-up", b: "Damp, dusty coils and drain trays are a common cause." },
      { t: "Reduced airflow", b: "Blocked filters can restrict how much air the unit moves." },
      { t: "Marks on the fan and louvres", b: "Dark spots often indicate moisture and grime inside the unit." },
    ],
  },
  after: {
    heading: "After a clean",
    points: [
      { t: "Filters and accessible surfaces cleaned", b: "Covers, filters and louvres removed and washed." },
      { t: "Coil and fan barrel rinsed", b: "On a deep clean, washed in place with a wash bag catching the run-off." },
      { t: "Drain path checked", b: "Tray and outlet flushed to reduce standing moisture." },
      { t: "Reassembled and test run", b: "The unit is put back together and run before we leave." },
    ],
  },
  note: "Photos show the type of work involved. Cleaning does not diagnose or guarantee resolution of mechanical, electrical or refrigerant faults.",
};

export const signsSection = {
  eyebrow: "When to book",
  title: "Is your air conditioner due for attention?",
  lead: "These are common reasons people ask about cleaning or servicing. Some symptoms can also indicate a fault that needs professional diagnosis.",
  cta: { label: "Discuss My Air Conditioner", href: "/book" },
  signs: [
    { icon: AlertCircle, title: "Musty or unusual odours", body: "An unpleasant smell may be a reason to arrange an assessment and discuss cleaning." },
    { icon: Layers, title: "Visible dust or build-up", body: "Dust around vents or accessible filters can suggest routine maintenance is due." },
    { icon: Wind, title: "Reduced airflow", body: "A restriction, maintenance issue or mechanical fault may need investigation." },
    { icon: Droplets, title: "Water dripping where it shouldn't", body: "Stop using the affected unit when appropriate and seek qualified advice; leaks may need more than cleaning." },
    { icon: Clock, title: "It's been a while", body: "If you can't remember the last service, check your manufacturer's care schedule and discuss next steps." },
  ] satisfies Feature[],
};

export const faqSection = {
  eyebrow: "FAQ",
  title: "Good questions, clear answers",
  lead: "The things people most often ask before they book. The full help centre covers services, pricing, booking and aftercare.",
  cta: { label: "See all questions", href: "/faq" },
};

export const closingCta = {
  default: {
    title: "Ready to give your air conditioner some attention?",
    lead: "Tell us what type of system you have and what you'd like help with. We'll guide you towards a suitable next step.",
  },
  services: {
    title: "Tell us about your system",
    lead: "Describe your air conditioner and any symptoms. We'll help you identify which option to enquire about.",
  },
  service: (unit: string) => ({
    title: `Let's find the right service for your ${unit}`,
    lead: "Tell us what type of system you have and what you'd like help with. We'll guide you towards a suitable next step.",
  }),
};
