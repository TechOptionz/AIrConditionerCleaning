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
const PORTRAIT = new Set(["uc-tech-spray", "hero-1", "hero-2", "step-1", "about-who", "about-approach-2", "book-photo", "outdoor-detail", "under-ceiling-detail"]);

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
  neosiam: ["Photo by NEOSiAM 18+ on Pexels", "https://www.pexels.com/@neosiam/"],
  artbovich: ["Photo by Max Vakhtbovych on Pexels", "https://www.pexels.com/@artbovich/"],
  zerdzicki: ["Photo by Jakub Zerdzicki on Pexels", "https://www.pexels.com/@jakubzerdzicki/"],
} as const;

type CreditKey = keyof typeof CREDIT;
const c = (file: string, alt: string, key: CreditKey, focal?: string) =>
  img(file, alt, CREDIT[key][0], CREDIT[key][1], PORTRAIT.has(file) ? "portrait" : "landscape", focal);

/** Photos supplied by the client (files prefixed uc-). No stock credit is shown. */
const own = (file: string, alt: string, focal?: string) => img(file, alt, undefined, undefined, PORTRAIT.has(file) ? "portrait" : "landscape", focal);

export type ServiceImageSet = { hero: SiteImage; detail: SiteImage; card: SiteImage };

export const images = {
  hero: [
    c("hero-1", "Technician checking an indoor air-conditioning unit", "bulat", "60% 45%"),
    c("hero-2", "Living room with a wall-mounted split system air conditioner", "badran", "50% 35%"),
    c("hero-3", "Close-up of a clean wall-mounted split system with the louvre open", "karimov"),
    c("indoor-living", "Modern living area with a wall-mounted split system", "artbovich", "50% 40%"),
  ],
  /**
   * Indoor services use indoor photography only. Several older files keep
   * misleading names (ducted-hero, ducted-detail, cassette-detail and
   * bulkhead-detail are all outdoor condensers), so they are no longer used here.
   */
  services: {
    "split-system-cleaning": {
      hero: own("uc-pressure-wash", "Technician rinsing the coil of a wall-mounted split system", "45% 40%"),
      detail: own("uc-tech-cap", "Technician opening the front panel of a split system", "45% 40%"),
      card: own("uc-filter-blue", "Gloved hands removing a split system filter", "50% 45%"),
    },
    "split-system-deep-clean": {
      hero: own("uc-wash-bag", "Coil being washed with a wash bag fitted under the indoor unit", "50% 45%"),
      detail: own("uc-foam-coil", "Technician applying coil cleaner with plastic sheeting protecting the wall", "40% 45%"),
      card: own("uc-wash-bag", "Indoor unit wash with a wash bag fitted", "50% 45%"),
    },
    "mould-odour-treatment": {
      hero: own("uc-spray-coil", "Technician spraying treatment onto an indoor unit's coil", "45% 45%"),
      detail: own("uc-filter-dusty", "Dust-clogged filter being removed from a split system", "45% 45%"),
      card: own("uc-spray-coil", "Coil treatment on an indoor unit", "45% 45%"),
    },
    "ducted-system-cleaning": {
      hero: c("cassette-hero", "Removing a ceiling return-air grille to reach the filter", "birmingham", "50% 45%"),
      detail: c("indoor-living", "Open-plan living area served by air conditioning", "artbovich", "60% 40%"),
      card: c("cassette-hero", "Ceiling return-air grille being removed", "birmingham", "50% 45%"),
    },
    "cassette-cleaning": {
      hero: c("cassette-card", "Technician working at ceiling height in a commercial space", "lacoste", "45% 50%"),
      detail: c("hero-1", "Technician checking an indoor unit", "bulat", "60% 45%"),
      card: c("cassette-card", "Technician working at ceiling height", "lacoste", "45% 50%"),
    },
    "under-ceiling-cleaning": {
      hero: c("cassette-hero", "Overhead air-conditioning grille being removed", "birmingham", "50% 40%"),
      detail: c("cassette-card", "Technician on an elevated platform in a commercial space", "lacoste", "45% 50%"),
      card: c("hero-1", "Technician checking an indoor unit", "bulat", "60% 40%"),
    },
    "bulkhead-cleaning": {
      hero: c("indoor-living", "Living area with discreet indoor air conditioning", "artbovich", "50% 40%"),
      detail: c("cassette-hero", "Ceiling grille removed to access the filter", "birmingham", "50% 45%"),
      card: c("indoor-living", "Living area with discreet indoor air conditioning", "artbovich", "40% 40%"),
    },
    "outdoor-condenser-cleaning": {
      hero: c("outdoor-hero", "Weathered outdoor condenser unit on a brick wall", "nikonov"),
      detail: c("outdoor-detail", "Outdoor condenser units on wall brackets", "alzate", "50% 55%"),
      card: c("outdoor-card", "Outdoor condenser unit in afternoon light", "kao"),
    },
  } satisfies Record<string, ServiceImageSet>,
  steps: [
    c("indoor-remote", "Checking how the air conditioner is running", "zerdzicki", "60% 50%"),
    own("uc-tech-cap", "Technician inspecting a split system", "45% 40%"),
    own("uc-filter-blue", "Filter removed for cleaning", "50% 45%"),
    own("uc-wash-bag", "Indoor unit washed with a wash bag fitted", "50% 45%"),
    c("hero-2", "Clean living room with a wall-mounted split system", "badran", "50% 35%"),
  ],
  sectors: {
    residential: c("hero-2", "Modern living room with a wall-mounted split system", "badran", "50% 35%"),
    commercial: c("hero-1", "Technician servicing a commercial indoor unit", "bulat", "60% 45%"),
  },
  banners: {
    // Banners are very wide (about 3:1 on desktop), so every entry is a landscape
    // photo with a focal point that keeps the subject in the visible band.
    services: own("uc-foam-coil", "Technician cleaning the coil of an indoor split system", "50% 40%"),
    about: c("indoor-living", "Modern living area with a wall-mounted split system", "artbovich", "40% 30%"),
    faq: c("hero-3", "Clean wall-mounted split system with the louvre open", "karimov", "50% 50%"),
    contact: c("indoor-remote", "Hand holding an air-conditioner remote", "zerdzicki", "60% 50%"),
    book: own("uc-wash-bag", "Indoor unit wash with a wash bag fitted", "50% 45%"),
    areas: c("hero-4", "Technician working on an outdoor unit", "lowhong", "50% 45%"),
    residential: own("uc-pressure-wash", "Technician cleaning a split system in a home", "45% 40%"),
    commercial: c("cassette-card", "Technician working at ceiling height in a commercial space", "lacoste", "50% 60%"),
  },
  about: {
    who: own("uc-tech-cap", "Technician at work on an indoor split system", "55% 45%"),
    approach: [
      own("uc-wash-bag", "Indoor unit washed with a wash bag fitted", "50% 45%"),
      own("uc-filter-dusty", "Dusty filter removed from a split system", "45% 45%"),
      own("uc-tech-spray", "Technician cleaning a split system with spray and gloves", "50% 35%"),
    ],
  },
  contact: own("uc-tech-cap", "Technician working on a wall-mounted split system", "50% 40%"),
  book: own("uc-foam-coil", "Technician applying coil cleaner to an indoor unit", "40% 45%"),
  cta: own("uc-pressure-wash", "Technician rinsing an indoor split system", "40% 40%"),
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
    { image: own("uc-wash-bag", "Wash bag fitted under an indoor unit"), caption: "Indoor unit wash", genuine: false },
    { image: own("uc-foam-coil", "Coil cleaner applied to an indoor unit", "40% 45%"), caption: "Coil cleaning", genuine: false },
    { image: own("uc-filter-blue", "Filter removed from a split system"), caption: "Filter removal", genuine: false },
    { image: own("uc-spray-coil", "Coil treatment on an indoor unit", "45% 45%"), caption: "Coil treatment", genuine: false },
    { image: own("uc-foam-wash", "Foam wash on a split system coil", "60% 45%"), caption: "Foam wash", genuine: false },
    { image: c("cassette-hero", "Ceiling grille being removed", "birmingham"), caption: "Ceiling grille and filter access", genuine: false },
  ],
};

export type BeforeAfterPair = (typeof images.beforeAfter)[number];
