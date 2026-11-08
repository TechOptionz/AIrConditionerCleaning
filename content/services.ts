import { images, type ServiceImageSet } from "./images";

/**
 * The eight cleaning services, weighted toward indoor units. Northline Air Care offers cleaning and related
 * servicing only — no installation, repair or refrigerant work anywhere on the site.
 */
export type ServiceSlug =
  | "split-system-cleaning"
  | "split-system-deep-clean"
  | "mould-odour-treatment"
  | "ducted-system-cleaning"
  | "cassette-cleaning"
  | "under-ceiling-cleaning"
  | "bulkhead-cleaning"
  | "outdoor-condenser-cleaning";

export type Service = {
  slug: ServiceSlug;
  /** Short card / menu title */
  short: string;
  /** One-line card summary */
  summary: string;
  /** Detail page H1 */
  h1: string;
  /** Unit noun used in sentences, e.g. "split system" */
  unit: string;
  intro: string;
  /** What a service may include (confirm inclusions per service before publishing). */
  scope: string[];
  /** Unit-specific FAQ pairs (the shared four are appended by the template). */
  faqs: { q: string; a: string }[];
  related: ServiceSlug[];
  /** Residential / commercial relevance for sector pages */
  sectors: ("residential" | "commercial")[];
  images: ServiceImageSet;
  /** Booking form select label */
  bookingLabel: string;
  metaDescription: string;
};

const SHARED_SCOPE = [
  "Initial unit and access discussion",
  "Accessible filter and component inspection",
  "Cleaning of agreed accessible areas",
  "Checking for obvious concerns",
  "Explaining any recommended follow-up",
];

export const services: Service[] = [
  {
    slug: "split-system-cleaning",
    short: "Split System Cleaning",
    summary: "Cleaning options for wall-mounted split systems.",
    h1: "Split System Air Conditioner Cleaning",
    unit: "split system",
    intro:
      "Wall-mounted split systems are used throughout Australian homes and workplaces. We can discuss cleaning for accessible filters, coils and other components based on the condition and design of your unit.",
    scope: [
      "Filter removal, inspection and cleaning",
      "Cover, louvre and fan barrel attention where accessible",
      "Accessible indoor coil surface cleaning as agreed",
      "Drain outlet check for obvious blockage",
      "Wipe-down and reassembly, work area left tidy",
    ],
    faqs: [
      { q: "How long does a split system clean usually take?", a: "It depends on the unit's condition, access and the agreed scope. We'll give you an indication when we confirm the booking rather than quoting a fixed time up front." },
      { q: "Do I need to do anything before the visit?", a: "Clear access to the indoor unit and, where relevant, the outdoor unit is the main thing. If the system has been switched off for a while, let us know in your request." },
    ],
    related: ["split-system-deep-clean", "mould-odour-treatment", "outdoor-condenser-cleaning"],
    sectors: ["residential", "commercial"],
    images: images.services["split-system-cleaning"],
    bookingLabel: "Split system (wall-mounted)",
    metaDescription: "Cleaning options for wall-mounted split system air conditioners. Filters, covers and accessible components, scope confirmed before work begins.",
  },
  {
    slug: "split-system-deep-clean",
    short: "Split System Deep Clean",
    summary: "Wash-bag deep clean of the indoor coil and fan barrel.",
    h1: "Split System Deep Clean (Indoor Unit Wash)",
    unit: "split system indoor unit",
    intro:
      "When a routine clean is not enough, the indoor unit can be washed in place. A purpose-made wash bag is fitted under the unit, electrical parts are protected, and the coil and fan barrel are cleaned and rinsed so dirty water drains into the bag rather than onto your walls or floor.",
    scope: [
      "Covers, filters and louvres removed and cleaned",
      "Electrical components and control board protected before washing",
      "Wash bag fitted to catch run-off, walls and floor covered",
      "Indoor coil and fan barrel cleaned and rinsed as agreed",
      "Drain tray and outlet flushed, unit reassembled and test run",
    ],
    faqs: [
      { q: "How is a deep clean different from a standard split clean?", a: "A standard clean focuses on filters, covers and accessible surfaces. A deep clean washes the coil and fan barrel inside the indoor unit, which is where built-up dust and grime usually sit. We'll recommend which suits your unit after hearing what you've noticed." },
      { q: "Will it make a mess inside my home?", a: "The wash bag channels run-off into a bucket, and we cover the wall and floor beneath the unit. The work area is wiped down before we leave." },
      { q: "How often does a unit need a deep clean?", a: "It depends on how much the unit runs and the environment. Units in kitchens, bedrooms that run overnight or dusty locations tend to need it sooner." },
    ],
    related: ["split-system-cleaning", "mould-odour-treatment", "cassette-cleaning"],
    sectors: ["residential", "commercial"],
    images: images.services["split-system-deep-clean"],
    bookingLabel: "Split system deep clean (indoor wash)",
    metaDescription: "Wash-bag deep clean for split system indoor units: coil and fan barrel washed in place with walls, floor and electrics protected.",
  },
  {
    slug: "mould-odour-treatment",
    short: "Mould & Odour Treatment",
    summary: "For indoor units with musty smells or visible mould.",
    h1: "Air Conditioner Mould & Odour Treatment",
    unit: "indoor unit",
    intro:
      "A musty smell when the air conditioner starts, or dark spots on the louvres and fan, usually means moisture and grime have built up inside the indoor unit. We clean the affected components and apply a treatment suited to the unit, then explain how to reduce the chance of it coming back.",
    scope: [
      "Inspection of louvres, fan barrel, coil and drain tray for build-up",
      "Deep clean of affected indoor components as agreed",
      "Anti-microbial coil treatment suitable for the unit",
      "Drain path check to reduce standing moisture",
      "Practical tips on run times and settings to limit regrowth",
    ],
    faqs: [
      { q: "Why does my air conditioner smell musty?", a: "Indoor units pull moisture out of the air. If the coil, drain tray or fan barrel stays damp and dusty, mould and bacteria can grow and the smell is pushed into the room when the unit starts." },
      { q: "Is the treatment safe for my family and pets?", a: "We use products intended for air-conditioning coils and follow the manufacturer's directions, including ventilation and drying time. Let us know about any sensitivities in your request." },
      { q: "Will the smell come back?", a: "Cleaning removes the build-up, but conditions that caused it can return. We'll suggest settings and a cleaning interval that suit how you use the unit." },
    ],
    related: ["split-system-deep-clean", "split-system-cleaning", "ducted-system-cleaning"],
    sectors: ["residential", "commercial"],
    images: images.services["mould-odour-treatment"],
    bookingLabel: "Mould or odour problem",
    metaDescription: "Mould and odour treatment for indoor air-conditioning units: affected components deep cleaned, coils treated and drain paths checked.",
  },
  {
    slug: "ducted-system-cleaning",
    short: "Ducted System Cleaning",
    summary: "Care for ducted systems and accessible components.",
    h1: "Ducted Air Conditioning Cleaning",
    unit: "ducted system",
    intro:
      "Ducted systems serve multiple rooms and need an approach suited to their layout. Tell us about your system so we can confirm whether return-air grilles, filters or other accessible parts are included.",
    scope: [
      "Return-air grille and filter inspection and cleaning",
      "Accessible supply outlet and diffuser attention",
      "Indoor unit access discussed in advance (roof or ceiling space)",
      "Checking for obvious dust build-up at accessible points",
      "Explaining what sits outside a cleaning visit",
    ],
    faqs: [
      { q: "Does this include cleaning inside the ducts?", a: "Not by default. A standard visit focuses on the return-air filter, grilles and accessible outlets. Tell us what you're noticing and we'll explain what is and isn't included." },
      { q: "Do you need roof access?", a: "Sometimes, depending on where the indoor unit sits. We'll confirm access requirements before the appointment so there are no surprises." },
    ],
    related: ["bulkhead-cleaning", "cassette-cleaning", "split-system-cleaning"],
    sectors: ["residential", "commercial"],
    images: images.services["ducted-system-cleaning"],
    bookingLabel: "Ducted",
    metaDescription: "Cleaning options for ducted air conditioning: return-air grilles, filters and accessible outlets, with access and scope confirmed first.",
  },
  {
    slug: "cassette-cleaning",
    short: "Cassette Unit Cleaning",
    summary: "Services for ceiling-mounted cassette units.",
    h1: "Ceiling Cassette Air Conditioner Cleaning",
    unit: "cassette unit",
    intro:
      "Cassette units are common in offices, shops and larger rooms. Their overhead position and internal design call for careful access and service planning.",
    scope: [
      "Grille panel and filter removal, inspection and cleaning",
      "Accessible coil and fan attention as agreed",
      "Drain pan check for obvious build-up",
      "Protection of the floor, furniture and fittings below",
      "Reassembly and a visual check of louvre operation",
    ],
    faqs: [
      { q: "Can you work around trading hours?", a: "Tell us your preferred window in the request. Availability outside standard hours needs to be confirmed by the business rather than assumed." },
      { q: "How many cassettes can be done in one visit?", a: "Include the number of units and the site layout in your request and we'll plan the visit accordingly." },
    ],
    related: ["under-ceiling-cleaning", "ducted-system-cleaning", "bulkhead-cleaning"],
    sectors: ["commercial"],
    images: images.services["cassette-cleaning"],
    bookingLabel: "Ceiling cassette",
    metaDescription: "Cleaning options for ceiling cassette air conditioners in offices, shops and larger rooms. Overhead access planned and scope confirmed first.",
  },
  {
    slug: "under-ceiling-cleaning",
    short: "Under-Ceiling Unit Cleaning",
    summary: "Cleaning enquiries for suspended indoor units.",
    h1: "Under-Ceiling Air Conditioner Cleaning",
    unit: "under-ceiling unit",
    intro:
      "Suspended air conditioners can be installed in commercial or open-plan spaces. We assess the unit type and access arrangements before discussing the cleaning scope.",
    scope: [
      "Front grille and filter inspection and cleaning",
      "Accessible fan and coil surface attention as agreed",
      "Drain outlet check for obvious blockage",
      "Safe working at height arrangements confirmed in advance",
      "Surrounding area protected and left tidy",
    ],
    faqs: [
      { q: "What access do you need?", a: "Clear floor space beneath the unit and a safe working height. If the unit is unusually high, mention it so we can plan appropriately." },
    ],
    related: ["cassette-cleaning", "bulkhead-cleaning", "ducted-system-cleaning"],
    sectors: ["commercial"],
    images: images.services["under-ceiling-cleaning"],
    bookingLabel: "Under-ceiling / suspended",
    metaDescription: "Cleaning options for suspended under-ceiling air conditioners in commercial and open-plan spaces, with access confirmed before quoting.",
  },
  {
    slug: "bulkhead-cleaning",
    short: "Bulkhead System Cleaning",
    summary: "Maintenance for concealed-style indoor units.",
    h1: "Bulkhead Air Conditioning Cleaning",
    unit: "bulkhead system",
    intro:
      "Bulkhead systems are designed to blend into the room. Their enclosed installation may require specific access, so we'll confirm the system configuration before quoting.",
    scope: [
      "Access panel and return-air filter inspection and cleaning",
      "Supply grille attention where accessible",
      "Accessible component cleaning as agreed",
      "Checking for obvious dust build-up or moisture",
      "Explaining anything that needs more than a clean",
    ],
    faqs: [
      { q: "How do I know if my unit is a bulkhead type?", a: "Bulkhead units are built into a ceiling or wall cavity with only grilles showing. A photo of the grilles and any access panel helps us confirm." },
    ],
    related: ["ducted-system-cleaning", "under-ceiling-cleaning", "cassette-cleaning"],
    sectors: ["residential", "commercial"],
    images: images.services["bulkhead-cleaning"],
    bookingLabel: "Bulkhead",
    metaDescription: "Cleaning options for concealed bulkhead air conditioning systems. Configuration and access confirmed before a quote is prepared.",
  },
  {
    slug: "outdoor-condenser-cleaning",
    short: "Outdoor Condenser Cleaning",
    summary: "Attention to accessible outdoor unit components.",
    h1: "Outdoor Condenser Unit Cleaning",
    unit: "outdoor condenser",
    intro:
      "Outdoor units are exposed to leaves, dirt and weather. Cleaning must be carried out safely, without damaging electrical parts or delicate coil fins.",
    scope: [
      "Removal of leaves and debris from around the unit",
      "Careful cleaning of accessible coil fin surfaces",
      "Fan guard and casing wipe-down",
      "Visual check for obvious damage or corrosion",
      "Clearance around the unit discussed",
    ],
    faqs: [
      { q: "Can you clean a unit on a roof or balcony?", a: "Possibly, depending on safe access. Describe where the unit sits and we'll confirm whether it can be included." },
    ],
    related: ["split-system-cleaning", "split-system-deep-clean", "ducted-system-cleaning"],
    sectors: ["residential", "commercial"],
    images: images.services["outdoor-condenser-cleaning"],
    bookingLabel: "Outdoor condenser only",
    metaDescription: "Careful cleaning of accessible outdoor condenser unit components — debris, coil fins and casing — carried out safely.",
  },
];

/** The four FAQ pairs shared by every service detail page. */
export const sharedServiceFaqs = (unit: string) => [
  { q: "How can I identify this type of unit?", a: `Describe where the unit sits, its shape and any model label, or include a photo with your enquiry. We will confirm whether it is a ${unit} before quoting.` },
  { q: "How many units can be included?", a: "Include the number of units in your request so the scope and quote can reflect them. Availability depends on confirmed service capability." },
  { q: "What affects the cost?", a: "Unit type, number of systems, access, condition and the work required. We discuss applicable charges before agreed work begins." },
  { q: "What if a fault is found?", a: "Electrical, refrigerant and mechanical faults need appropriately qualified assessment. If something is found, we explain the recommended next step rather than proceeding with cleaning alone." },
];

export const detailSteps = [
  { title: "Share system details", body: "Tell us the unit type, how many, and anything you have noticed." },
  { title: "Confirm the scope and quote", body: "We explain what is included and any applicable charges first." },
  { title: "Arrange a time", body: "Suggest a preferred window; we confirm availability before anything is locked in." },
  { title: "Carry out agreed work", body: "The team completes the agreed scope with care for the unit and the room." },
  { title: "Discuss follow-up care", body: "Practical upkeep tips and when to check in again." },
];

export const safetyNote =
  "Electrical, refrigerant and mechanical faults need appropriately qualified assessment. A cleaning visit does not guarantee these issues will be resolved.";

export const packages = [
  {
    id: "maintenance",
    name: "Maintenance clean",
    sub: "Routine upkeep",
    body: "For general upkeep where the system is operating normally and needs scheduled attention. Inclusions depend on unit type and inspection.",
    tone: "light" as const,
  },
  {
    id: "detailed",
    name: "Detailed clean",
    sub: "More thorough attention",
    body: "For systems that may need more thorough attention to accessible internal components. We'll explain the recommended scope before work begins.",
    tone: "dark" as const,
    featured: true,
  },
  {
    id: "unsure",
    name: "Not sure yet",
    sub: "Recommend after inspection",
    body: "Describe what you can see and any symptoms. We will recommend the appropriate level after discussing your unit.",
    tone: "tint" as const,
  },
];

export const SHARED_SCOPE_FALLBACK = SHARED_SCOPE;

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function relatedServices(service: Service): Service[] {
  return service.related.map((s) => getService(s)).filter((s): s is Service => Boolean(s));
}
