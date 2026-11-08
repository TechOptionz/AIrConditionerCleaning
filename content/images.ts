/**
 * Image manifest. Every photo on the site resolves through here so a stock
 * image can be replaced with a real job photo by swapping one entry (or by
 * overwriting the file in /public/images with the same name).
 *
 * All current photos are free-licence stock (Unsplash / Pexels) chosen in the
 * approved design. Credits are kept for attribution. None of them depict
 * Northline Air Care's own work and they are captioned as illustrative.
 */
export type SiteImage = {
  src: string;
  alt: string;
  credit?: string;
  creditHref?: string;
  orientation?: "landscape" | "portrait";
  /** CSS object-position used when the frame shape differs from the photo. */
  focal?: string;
};

/** Tailwind aspect class matching the photo's native shape, for frames that adapt. */
export const frameAspect = (i: SiteImage) => (i.orientation === "portrait" ? "aspect-[4/5]" : "aspect-[4/3]");

const img = (
  file: string,
  alt: string,
  credit?: string,
  creditHref?: string,
  orientation: SiteImage["orientation"] = "landscape",
  focal?: string,
): SiteImage => ({ src: `/images/${file}.jpg`, alt, credit, creditHref, orientation, focal });

/** Files that are taller than wide (2:3). Everything else is landscape. */
const PORTRAIT = new Set(["hero-1", "hero-2", "step-1", "about-who", "about-approach-2", "book-photo", "outdoor-detail", "under-ceiling-detail"]);

const CREDIT = {
  bulat: ["Photo by bulat843 on Pexels", "https://www.pexels.com/@bulat843-1243575272/"],
  badran: ["Photo by Caroline Badran on Unsplash", "https://unsplash.com/@___atmos"],
  karimov: ["Photo by Zulfugar Karimov on Unsplash", "https://unsplash.com/@zulfugarkarimov"],
  lowhong: ["Photo by Richard Low Hong on Pexels", "https://www.pexels.com/@richard-low-hong-33206323/"],
  christiaan: ["Photo by Christiaan on Unsplash", "https://unsplash.com/@christiaan98_"],
  andrianto: ["Photo by Andrianto Cahyono Putro on Unsplash", "https://unsplash.com/@andrianspace"],
  prasopchok: ["Photo by Prasopchok on Unsplash", "https://unsplash.com/@gotburied"],
  fursenko: ["Photo by Nikita Fursenko on Unsplash", "https://unsplash.com/@fursenko"],
  birmingham: ["Photo by Birmingham Airduct Cleaning Services on Unsplash", "https://unsplash.com/@hadleycummings"],
  kien: ["Photo by Kien Nguyen on Unsplash", "https://unsplash.com/@kienday"],
  lacoste: ["Photo by Valentin Lacoste on Unsplash", "https://unsplash.com/@valentinlacoste"],
  aboodi: ["Photo by aboodi vesakaran on Unsplash", "https://unsplash.com/@aboodi_vm"],
  alpha: ["Photo by alpha innotec on Unsplash", "https://unsplash.com/@alpha_innotec"],
  pachmann: ["Photo by Everett Pachmann on Unsplash", "https://unsplash.com/@everettp"],
  tima: ["Photo by Tima Miroshnichenko on Pexels", "https://www.pexels.com/@tima-miroshnichenko/"],
  clow: ["Photo by Jonny Clow on Unsplash", "https://unsplash.com/@jonnyclow"],
  illia: ["Photo by Illia Horokhovsky on Unsplash", "https://unsplash.com/@fili_ja"],
  nikonov: ["Photo by Vladislav Nikonov on Unsplash", "https://unsplash.com/@memtor"],
  alzate: ["Photo by Diego Alzate on Pexels", "https://www.pexels.com/@diego-alzate-267678777/"],
  kao: ["Photo by Ticka Kao on Unsplash", "https://unsplash.com/@tin1023565"],
  cortes: ["Photo by José Andrés Pacheco Cortes on Pexels", "https://www.pexels.com/@jose-andres-pacheco-cortes-3641213/"],
  kuhn: ["Photo by Kathleen Austin Kuhn on Pexels", "https://www.pexels.com/@kathleen-austin-kuhn-2152973960/"],
  ehlers: ["Photo by Magda Ehlers on Pexels", "https://www.pexels.com/@magda-ehlers-pexels/"],
  rangga: ["Photo by Putra Rangga on Pexels", "https://www.pexels.com/@putra-rangga-1032291993/"],
} as const;

type CreditKey = keyof typeof CREDIT;
const c = (file: string, alt: string, key: CreditKey, focal?: string) =>
  img(file, alt, CREDIT[key][0], CREDIT[key][1], PORTRAIT.has(file) ? "portrait" : "landscape", focal);

export type ServiceImageSet = { hero: SiteImage; detail: SiteImage; card: SiteImage };

export const images = {
  hero: [
    c("hero-1", "Technician checking an air-conditioning system on site", "bulat", "60% 45%"),
    c("hero-2", "Living room with a wall-mounted split system air conditioner", "badran", "50% 35%"),
    c("hero-3", "Close-up of a clean wall-mounted split system with the louvre open", "karimov"),
    c("hero-4", "Technician working on an outdoor air-conditioning unit", "lowhong"),
  ],
  services: {
    "split-system-cleaning": {
      hero: c("split-hero", "Wall-mounted split system air conditioner in a bright room", "christiaan"),
      detail: c("split-detail", "Split system outdoor unit mounted under a carport roof", "andrianto"),
      card: c("split-detail", "Split system outdoor unit mounted under a carport roof", "andrianto"),
    },
    "ducted-system-cleaning": {
      hero: c("ducted-hero", "Ceiling air vent of a ducted air-conditioning system", "prasopchok"),
      detail: c("ducted-detail", "Linear ceiling diffuser for ducted air conditioning", "fursenko"),
      card: c("ducted-card", "Return-air grille in a plaster ceiling", "prasopchok"),
    },
    "cassette-cleaning": {
      hero: c("cassette-hero", "Technician servicing a ceiling-mounted air-conditioning unit", "birmingham"),
      detail: c("cassette-detail", "Ceiling cassette air conditioner in an office", "kien"),
      card: c("cassette-card", "Ceiling cassette units in a commercial space", "lacoste"),
    },
    "under-ceiling-cleaning": {
      hero: c("cassette-card", "Suspended ceiling air-conditioning units in a commercial space", "lacoste"),
      detail: c("under-ceiling-detail", "Under-ceiling air-conditioning unit", "aboodi", "50% 48%"),
      card: c("cassette-hero", "Technician servicing a ceiling-mounted unit", "birmingham"),
    },
    "bulkhead-cleaning": {
      hero: c("ducted-card", "Concealed air-conditioning grille in a ceiling", "prasopchok"),
      detail: c("bulkhead-detail", "Concealed indoor air-conditioning unit", "alpha"),
      card: c("under-ceiling-detail", "Concealed-style indoor unit", "aboodi", "50% 48%"),
    },
    "window-unit-cleaning": {
      hero: c("window-hero", "Window air conditioner installed in a building facade", "pachmann"),
      detail: c("window-detail", "Technician working on an air-conditioning unit", "tima"),
      card: c("window-card", "Clean outdoor air-conditioning unit on a painted brick wall", "clow"),
    },
    "portable-ac-cleaning": {
      hero: c("portable-hero", "Rows of air-conditioning units showing dust build-up", "illia"),
      detail: c("hero-2", "Living room with a wall-mounted split system", "badran", "50% 35%"),
      card: c("ducted-hero", "Air vent in a ceiling", "prasopchok"),
    },
    "outdoor-condenser-cleaning": {
      hero: c("outdoor-hero", "Weathered outdoor condenser unit on a brick wall", "nikonov"),
      detail: c("outdoor-detail", "Outdoor condenser unit", "alzate", "50% 55%"),
      card: c("outdoor-card", "Outdoor condenser unit in afternoon light", "kao"),
    },
  } satisfies Record<string, ServiceImageSet>,
  steps: [
    c("step-1", "Technician reviewing an air-conditioning system", "cortes", "50% 42%"),
    c("step-2", "Technician discussing a service", "kuhn"),
    c("step-3", "Technician preparing equipment", "cortes"),
    c("cassette-hero", "Technician servicing a ceiling-mounted unit", "birmingham"),
    c("hero-2", "Clean living room with a wall-mounted split system", "badran"),
  ],
  sectors: {
    residential: c("hero-2", "Modern living room with a wall-mounted split system", "badran", "50% 35%"),
    commercial: c("hero-1", "Technician servicing a commercial air-conditioning unit", "bulat", "60% 45%"),
  },
  banners: {
    // Banners are very wide (about 3:1 on desktop), so every entry is a landscape
    // photo with a focal point that keeps the subject in the visible band.
    services: c("banner-services", "Technician at work on a rooftop air-conditioning unit", "cortes", "50% 45%"),
    about: c("hero-4", "Technician working on an outdoor unit", "lowhong", "50% 45%"),
    faq: c("hero-3", "Clean wall-mounted split system with the louvre open", "karimov", "50% 50%"),
    contact: c("step-3", "Technician checking gauges on an outdoor unit", "cortes", "50% 55%"),
    book: c("banner-book", "Technician servicing a rooftop unit", "cortes", "50% 55%"),
    areas: c("window-detail", "Technician checking gauges on an outdoor unit", "tima", "50% 50%"),
    residential: c("step-2", "Technician inspecting a home air-conditioning unit", "kuhn", "50% 40%"),
    commercial: c("cassette-card", "Technician working at ceiling height in a commercial space", "lacoste", "50% 60%"),
  },
  about: {
    who: c("about-who", "Technician at work on an indoor unit", "cortes"),
    approach: [
      c("banner-services", "Technician at work on a rooftop air-conditioning unit", "cortes", "50% 45%"),
      c("about-approach-2", "Technician reading gauges on an outdoor unit", "cortes", "50% 40%"),
      c("hero-2", "Clean living room with a wall split", "badran", "50% 35%"),
    ],
  },
  contact: c("contact-photo", "Technicians cleaning outdoor units on a building facade", "rangga"),
  book: c("window-detail", "Technician checking gauges on an outdoor unit", "tima"),
  cta: c("hero-4", "Technician working on an outdoor unit", "lowhong"),
  /**
   * Before/after pairs. Illustrative stock only — captioned as such on the page.
   * Set `genuine: true` only when replacing with real paired job photos
   * (same unit, same angle) supplied by the business.
   */
  beforeAfter: [
    {
      slug: "outdoor-condenser-cleaning",
      title: "Outdoor condenser",
      before: c("outdoor-hero", "Weathered outdoor condenser with grime build-up (illustrative)", "nikonov"),
      after: c("window-card", "Clean outdoor condenser unit (illustrative)", "clow"),
      genuine: false,
    },
  ],
  /** Gallery. Illustrative stock until real job photos are supplied. */
  gallery: [
    { image: c("cassette-hero", "Ceiling unit being serviced", "birmingham"), caption: "Ceiling unit service", genuine: false },
    { image: c("hero-3", "Clean split system close-up", "karimov"), caption: "Split system, louvre open", genuine: false },
    { image: c("outdoor-detail", "Outdoor condenser unit", "alzate", "50% 55%"), caption: "Outdoor condenser", genuine: false },
    { image: c("about-approach-2", "Technician reading gauges", "cortes", "50% 40%"), caption: "Pressure check on site", genuine: false },
    { image: c("window-detail", "Technician at work", "tima"), caption: "Filter and cover inspection", genuine: false },
    { image: c("ducted-detail", "Linear ceiling diffuser", "fursenko"), caption: "Ducted diffuser", genuine: false },
  ],
};

export type BeforeAfterPair = (typeof images.beforeAfter)[number];
