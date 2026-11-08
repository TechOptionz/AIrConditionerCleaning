import { MessageCircle, Wind, ListChecks, Home, Sparkles, ShieldCheck, AlertCircle, Layers, Droplets, Clock, type LucideIcon } from "lucide-react";

export const hero = {
  eyebrow: "Professional air conditioning care",
  headlineLines: ["A fresher clean", "for your air conditioning."],
  lead: "From split-system deep cleans to scheduled air-con maintenance, we make it straightforward to look after the systems that keep your space comfortable.",
  primaryCta: { label: "Book an AC Clean", href: "/book" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },
  trustLine: ["Clear service options", "Residential & commercial enquiries", "Straightforward booking requests"],
  slideIntervalMs: 3500,
};

export const quickForm = {
  title: "Tell us about your air conditioner",
  lead: "Share a few details and our team can help you choose the appropriate service.",
  cta: "Continue Booking",
  note: "Sending a request does not confirm an appointment. We'll be in touch to discuss availability.",
};

export const servicesSection = {
  eyebrow: "Our services",
  title: "Care for the systems you rely on",
  lead: "Different air conditioners need different approaches. Explore the options below or ask our team if you're unsure which one applies.",
  cta: { label: "View All Services", href: "/services" },
};

export const sectorsSection = {
  eyebrow: "Where we work",
  title: "For homes, workplaces and everything in between",
  helper: "Not sure what type of system you have? Tell us what you can see and we'll help identify the next step.",
  helperCta: { label: "Help me choose", href: "/book" },
};

export const processSection = {
  eyebrow: "How it works",
  title: "A straightforward way to get your AC looked after",
  lead: "No confusing process. We confirm your system and service needs before arranging the work.",
  steps: [
    { title: "Tell us about your system", body: "Choose your unit type or ask for guidance." },
    { title: "Discuss the right service", body: "We clarify what you're experiencing and what the service may involve." },
    { title: "Confirm the details", body: "We'll discuss access, availability and an applicable quote." },
    { title: "Service day", body: "The team carries out the agreed work, following appropriate safety procedures." },
    { title: "Care advice", body: "Ask about practical upkeep and when the system may need attention again." },
  ],
};

export const packagesSection = {
  eyebrow: "Choose your level of care",
  title: "Not every air conditioner needs the same clean",
  cards: [
    { title: "Routine Maintenance Clean", body: "For general upkeep where the system is operating normally and needs scheduled attention. Inclusions depend on unit type and inspection.", cta: "Ask About Maintenance", tone: "light" as const },
    { title: "Detailed Deep Clean", body: "For systems that may need more thorough attention to accessible internal components. We'll explain the recommended scope before work begins.", cta: "Ask About Deep Cleaning", tone: "dark" as const },
  ],
  note: "A clean is not a substitute for diagnosing mechanical faults, electrical issues or refrigerant problems.",
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
  lead: "Drag to compare a dusty filter with a clean one.",
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
