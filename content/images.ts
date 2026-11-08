/**
 * Image manifest. Every photo on the site resolves through here so a stock
 * image can be replaced with a real job photo by swapping one entry (or by
 * overwriting the file in /public/images with the same name).
 *
 * Photos are a mix of free-licence stock (Unsplash / Pexels, credits kept below)
 * and client-supplied files prefixed uc-. None are from Northline Air Care jobs,
 * and the site no longer captions them as illustrative (client decision), so
 * replace them with the business's own job photos before launch.
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
    // Full-screen slides must be at least ~1000 px wide (ideally 1600+) or they look blurry
    // when stretched across a desktop screen. The smaller uc- photos are used in cards,
    // detail frames and the gallery instead. Swap in larger cleaning photos here as they arrive.
    // Mix of six: four technicians cleaning, two clean units. The *-hero files are
    // sharpened high-quality enlargements of the smaller supplied photos.
    own("uc-filter-service", "Technician removing the filters from a wall-mounted split system", "45% 30%"),
    own("uc-wash-bag-rinse-hero", "Technician rinsing an indoor unit's coil into a wash bag", "50% 40%"),
    c("hero-3", "Clean wall-mounted split system with the louvre open", "karimov", "50% 50%"),
    own("uc-coil-rinse-hero", "Indoor coil rinsed with a wash bag fitted below", "55% 45%"),
    own("uc-bag-wand-rinse", "Technician spraying an indoor coil with a wash bag fitted around the unit", "55% 45%"),
    c("indoor-split", "Clean wall-mounted split system in a bright room", "neosiam", "55% 40%"),
  ],
  /**
   * Indoor services use indoor photography only. Several older files keep
   * misleading names (ducted-hero, ducted-detail, cassette-detail and
   * bulkhead-detail are all outdoor condensers), so they are no longer used here.
   */
  services: {
    "split-system-cleaning": {
      hero: own("uc-filter-service", "Technician removing the filters from a wall-mounted split system", "50% 35%"),
      detail: own("uc-tech-cap", "Technician opening the front panel of a split system", "45% 40%"),
      card: own("uc-filter-spray", "Gloved technician cleaning a split system filter", "50% 40%"),
    },
    "split-system-deep-clean": {
      hero: own("uc-wash-bag-rinse", "Technician rinsing an indoor unit's coil into a wash bag", "45% 35%"),
      detail: own("uc-blue-bag-spray", "Technician cleaning the indoor unit with a wash bag fitted", "40% 40%"),
      card: own("uc-bag-wand-rinse", "Indoor coil sprayed with a wash bag fitted", "50% 45%"),
    },
    "mould-odour-treatment": {
      hero: own("uc-coil-rinse", "Indoor coil being rinsed clean with a wash bag fitted", "55% 45%"),
      detail: own("uc-filter-dusty", "Dust-clogged filter being removed from a split system", "45% 45%"),
      card: own("uc-spray-coil", "Coil treatment on an indoor unit", "45% 45%"),
    },
    "ducted-system-cleaning": {
      hero: c("cassette-hero", "Removing a ceiling return-air grille to reach the filter", "birmingham", "50% 45%"),
      detail: c("indoor-living", "Open-plan living area served by air conditioning", "artbovich", "60% 40%"),
      card: own("uc-filter-dusty", "Dusty filter removed for cleaning", "45% 45%"),
    },
    "cassette-cleaning": {
      hero: c("cassette-hero", "Ceiling unit grille being lowered to reach the filter", "birmingham", "50% 45%"),
      detail: own("uc-filter-blue", "Gloved hands removing a filter for cleaning", "50% 45%"),
      card: c("cassette-hero", "Ceiling unit grille being lowered", "birmingham", "50% 45%"),
    },
    "under-ceiling-cleaning": {
      // Stopgap: no photo of a suspended under-ceiling unit is available yet. The overhead
      // grille shot is the closest match; replace with a real under-ceiling photo when supplied.
      hero: c("cassette-hero", "Technician working on an overhead air-conditioning unit", "birmingham", "50% 40%"),
      detail: c("cassette-hero", "Overhead unit grille lowered to reach the filter", "birmingham", "60% 50%"),
      card: own("uc-foam-wash", "Foam cleaner on an indoor unit coil", "60% 45%"),
    },
    "bulkhead-cleaning": {
      hero: c("cassette-hero", "Grille removed to reach a concealed unit's filter", "birmingham", "50% 45%"),
      detail: own("uc-filter-dusty", "Dust-clogged filter removed for cleaning", "45% 45%"),
      card: own("uc-tech-spray", "Technician cleaning an indoor unit", "50% 30%"),
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
    own("uc-blue-bag-spray", "Indoor unit cleaned with a wash bag fitted", "40% 40%"),
    c("hero-2", "Clean living room with a wall-mounted split system", "badran", "50% 35%"),
  ],
  sectors: {
    residential: c("hero-2", "Modern living room with a wall-mounted split system", "badran", "50% 35%"),
    commercial: own("uc-tech-spray", "Technician cleaning an indoor unit", "50% 35%"),
  },
  banners: {
    // Banners are very wide (about 3:1 on desktop), so every entry is a landscape
    // photo with a focal point that keeps the subject in the visible band.
    services: own("uc-wash-bag-rinse", "Technician rinsing an indoor unit's coil into a wash bag", "45% 35%"),
    about: own("uc-filter-service", "Technician servicing a wall-mounted split system", "50% 35%"),
    faq: c("hero-3", "Clean wall-mounted split system with the louvre open", "karimov", "50% 50%"),
    contact: own("uc-filter-service", "Technician at work on an indoor unit", "45% 35%"),
    book: own("uc-clear-bag-rinse", "Pressure rinse of an indoor coil with plastic protection", "55% 40%"),
    residential: own("uc-blue-bag-spray", "Technician cleaning a split system in a home", "40% 40%"),
    commercial: c("cassette-hero", "Ceiling unit grille being lowered in a commercial space", "birmingham", "50% 45%"),
  },
  about: {
    who: own("uc-tech-cap", "Technician at work on an indoor split system", "55% 45%"),
    approach: [
      own("uc-wash-bag-rinse", "Indoor unit coil rinsed into a wash bag", "45% 35%"),
      own("uc-filter-dusty", "Dusty filter removed from a split system", "45% 45%"),
      own("uc-tech-spray", "Technician cleaning a split system with spray and gloves", "50% 35%"),
    ],
  },
  contact: own("uc-tech-cap", "Technician working on a wall-mounted split system", "50% 40%"),
  book: own("uc-foam-coil", "Technician applying coil cleaner to an indoor unit", "40% 45%"),
  cta: own("uc-blue-bag-spray", "Technician cleaning an indoor unit with a wash bag fitted", "40% 40%"),
  /**
   * Before/after pairs. Shown without an "illustrative" caption (client decision).
   * Replace with real paired job photos (same unit, same angle) before launch.
   */
  beforeAfter: [
    {
      slug: "split-system-cleaning",
      title: "Indoor unit filter",
      before: own("uc-filter-dusty", "Dust-clogged split system filter", "45% 45%"),
      after: own("uc-filter-blue", "Clean split system filter", "50% 45%"),
      genuine: false,
    },
  ],
  /** Gallery. Replace with Northline job photos before launch. */
  gallery: [
    { image: own("uc-bag-wand-rinse", "Indoor coil sprayed with a wash bag fitted", "50% 45%"), caption: "Coil wash", genuine: false },
    { image: own("uc-wash-bag-rinse", "Coil rinsed into a wash bag", "55% 40%"), caption: "Indoor unit wash", genuine: false },
    { image: own("uc-blue-bag-spray", "Indoor unit cleaned with a wash bag fitted", "40% 40%"), caption: "Wash bag clean", genuine: false },
    { image: own("uc-brush-coil", "Coil brushed before rinsing", "45% 40%"), caption: "Coil brushing", genuine: false },
    { image: own("uc-wash-bag", "Wash bag fitted under an indoor unit"), caption: "Coil rinse", genuine: false },
    { image: own("uc-foam-coil", "Coil cleaner applied to an indoor unit", "40% 45%"), caption: "Coil cleaning", genuine: false },
    { image: own("uc-filter-blue", "Filter removed from a split system"), caption: "Filter removal", genuine: false },
    { image: own("uc-spray-coil", "Coil treatment on an indoor unit", "45% 45%"), caption: "Coil treatment", genuine: false },
    { image: own("uc-foam-wash", "Foam wash on a split system coil", "60% 45%"), caption: "Foam wash", genuine: false },
    { image: c("cassette-hero", "Ceiling grille being removed", "birmingham"), caption: "Ceiling grille and filter access", genuine: false },
  ],
};

export type BeforeAfterPair = (typeof images.beforeAfter)[number];
