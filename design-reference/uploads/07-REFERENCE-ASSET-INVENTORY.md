# 07 — Reference Asset Inventory & Original Asset Requirements

Part A documents the media **observed** on the reference (described only — nothing is linked or redistributed; the reference's images, logo, badges and copy are its property and must not be reused). Part B specifies the **original** assets the new site needs, with sizes, ratios and formats tuned for `next/image`.

Legend: **[Observed]** measured on the reference · **[Proposed]** our specification · **Not verified** could not be inspected.

---

## Part A — Media observed on the reference

### A.1 Global / header / footer [Observed]

| Asset | Type | Rendered size | Intrinsic size | Placement & purpose | Reuse? |
|---|---|---|---|---|---|
| Serif wordmark logo (white on magenta) | PNG | 163 × 43 | 163 × 43 (1×, blurry on HiDPI) | Nav band left; footer brand band centred | **No** — brand asset |
| Utility-bar badge strip (4.8-star rating, Afterpay, Zip, NDIS) | PNG, single image | 530 × 46 | 1200 × 105 | Utility bar centre; trust/payment proof | **No** — third-party marks and the business's rating |
| Cart icon, search icon | SVG | 28 × 28 | 32 × 29 / 27 × 27 | Utility bar right; mobile header | Not needed |
| Phone icon in magenta roundel | SVG/PNG | ≈ 36 × 36 | — | Utility bar left | Replace with Lucide `Phone` |
| Payment logos (Afterpay, Apple Pay, Mastercard, Stripe, Visa) | PNG/SVG row | ≈ 30 × 18 each | — | Footer bottom-right | Only the official brand marks from each provider, if those methods are offered |
| Social icons (Facebook, Instagram, YouTube) | Font icons | 20 px | — | Footer "Follow us" | Lucide / Simple-icons |
| "Need help — talk to our live agent" Messenger promo | PNG (two crops: 4:3 card and wide banner) | 234 × 180 / 1220 × 100 | — | Signs sidebar, FAQ sidebar, Contact page | **No** |
| "Amazing deal — book appointment now" poster (two variants: badge with technician; tall 2:3 poster with CTA buttons baked in) | PNG | ≈ 180 × 120 / 230 × 500 | 500 × 500 declared for the badge | Hero (absolute, hidden desktop), CTA band, sidebars, service pages | **No** — baked-in text, inaccessible |

### A.2 Homepage sections [Observed]

| # | Section | Asset | Rendered | Intrinsic | Notes |
|---|---|---|---|---|---|
| 2 | Hero | Background video, H.264 MP4 "showcase" ≈ 720p, autoplay/muted/loop; technician cleaning a wall-mounted split unit | 1279 × 720 cover | 720p | Image fallback (a "home slider" JPG from the theme demo path) on mobile |
| 3 | Stat strip | None (text only) | — | — | — |
| 4 | Services grid | 8 isometric unit-type illustrations (split, ducted, cassette, under-ceiling, window/box, portable, external condenser, bulkhead) + 2 for installation/repair (unit + drill, unit + spanner/cog). Mixed PNG@2x and newer SVG versions coexist in the DOM | 160 × 160 each (40 × 40 mobile) | 182–405 px, non-uniform aspect | Light blue/navy two-tone, flat isometric. Sizes and vanishing points inconsistent across the set |
| 4 | Services grid bg | Repeating "shield" pattern tile on pale pink | full section | — | Decorative; drop |
| 5 | Reviews | Lifestyle photo: father lying on sofa holding a laughing child above him, bright living room | 512 × 720 cover | 828 × 856 | Flush-left; conveys "healthy indoor air" |
| 6 | About | "100 % Australian owned & operated" roundel with flag-filled Australia map | 273 × 131 | 273 × 131 | Reappears on About, Contact, Services |
| 6 | About bg | Faint dot pattern | — | — | Decorative |
| 7 | Photo strip | 10 square job photos (technician on ladder at a ceiling cassette, spraying a coil, two technicians at a wall unit, condenser wash, filter removal…) with descriptive alt text | 320 × 320 × 4 visible | 962 × 962 | Good alt text practice; gallery has 19 `<img>` incl. duplicates |
| 8 | Why choose us | Abstract navy "wave/swoosh" background overlay image | full section | 2560 px wide ("scaled") | Loads late → text flashes on grey |
| 9 | Preferred service | 7 circular photos: living room, office, classroom, gym, motorhome interior, hotel lobby, aged-care carer with resident | 222 × 222 circle | 566 × 566 | Stock-style; carousel on mobile |
| 9 | bg | Soft grey wave graphic | — | — | Decorative |
| 10 | CTA band | Technician (back view, branded polo) reaching up to a split unit | ≈ 500 × 465 cover | — | Left column, full height |
| 12 | Products | Composite photo of 5 spray bottles (cleaner, disinfectant, neutraliser…) + "Australian made" roundel | ≈ 560 × 400 / 120 × 120 | — | **Do not reuse** (product shots) |
| 13 | Franchise | Group photo of ~6 smiling technicians in navy polos, blurred office; circular "franchise partner" stamp | 650 × 626 cover / 150 × 150 | — | **Do not reuse** |
| 14 | Signs | None in table; sidebar promos (see A.1) | — | — | — |
| 15 | Areas | Australia map illustration: states in two pink tints, NT/SA/TAS grey, 7 labelled pins with leader lines | ≈ 560 × 420 | — | Static PNG; would be better as inline SVG |
| 16 | Footer | Logo (white), payment logos | see A.1 | — | — |

### A.3 Inner pages [Observed]

| Page | Asset | Rendered | Notes |
|---|---|---|---|
| Services / About / Contact / Book / FAQ | Page banner photo: technician in navy polo (back view) servicing a wall-mounted split unit, with a magenta→navy diagonal gradient overlay from the left | 1294 × 320–555 | Same photo family as the CTA band; duplicated twice on Contact and Book |
| Services | Video thumbnail with magenta play roundel (technician spraying a split unit, "reverse cycle split system" caption graphic baked in) | ≈ 610 × 345 (16:9) | Not clicked — lightbox Not verified |
| Services / service detail | 5 circular icon tiles (technician, arrow/speed, hand with dollar, stars, ribbon) white line icons on magenta circles | 120 × 120 | Line-icon style; Lucide equivalents exist |
| Service detail (split) | Hero-right technician photo; intro split photo of a technician spraying into an open split unit (4:5); a two-technician photo at a wall unit (portrait) after the pricing cards | 440 × 560; 315 × 420 | Real job photography |
| About | Full-width photo of two technicians working overhead (masks, caps) | 1294 × 600 | Strong authenticity shot |
| Contact | Headset-wearing customer-service woman photo in the banner; dotted-pattern Australia map; info-card icons (phone, mail, clock) | — | Stock-style |

### A.4 Assets that must **not** be reused (summary)

Logo and wordmark; rating/NDIS/payment badge strip; product bottle photography and "Australian made" roundel; franchise team photo and stamp; "Amazing deal" posters; Messenger "Need help" promos; the showcase video; all technician and lifestyle photography; the unit-type illustrations; the Australia map PNG; any text baked into images. Everything in Part B is to be produced fresh.

---

## Part B — Original asset requirements for the new site [Proposed]

### B.1 Global rules

- **Formats**: photos → AVIF with WebP fallback (Next.js `images.formats: ['image/avif','image/webp']`), source JPEG quality 85; illustrations/icons/badges/map → inline SVG or `.svg` files (optimised with SVGO); video → MP4 (H.264) + WebM (VP9/AV1), ≤ 6 MB, muted, with a poster JPEG/AVIF.
- **Sizes**: supply the *largest* rendered width × 2 (HiDPI). Table values are minimum source pixels at 2×.
- **Alt text**: describe the action and the unit type ("Technician applying foaming coil cleaner inside a wall-mounted split system"), never keyword lists; decorative images get `alt=""`.
- **Colour grading**: consistent warm-neutral whites, slight navy shadow tint; no heavy filters. Branded uniform colour should match `primary-500` / `secondary-500` where possible.
- **Faces & consent**: model releases for all technicians/customers; blur house numbers and number plates.
- **Naming**: `/public/images/{section}/{slug}-{w}.{ext}`; illustrations `/public/icons/units/{slug}.svg`.

### B.2 Asset requirements per section

| Section / component | Asset | Ratio | Min source px (2×) | Format | Alt-text guidance | Source |
|---|---|---|---|---|---|---|
| Header | Logo (horizontal + stacked + mark-only) | — | SVG | SVG | Business name | Brand designer |
| Header | Favicon / app icons | 1:1 | 512 | SVG + PNG | — | From logo mark |
| Hero | Background video loop: wide shot of technician cleaning a split unit, 8–12 s, slow movement, no audio | 16:9 | 1920 × 1080 (also 1080 × 1350 9:16 crop for mobile, optional) | MP4 + WebM | Decorative (`aria-hidden`), poster has alt | Own shoot |
| Hero | Poster/fallback still (same scene) | 16:9 / 3:2 mobile | 2880 × 1620 | AVIF/WebP | Decorative | Own shoot |
| Hero | Optional foreground cut-out of a technician for a 2-column hero | 4:5 | 1200 × 1500 | AVIF/WebP with alpha (PNG fallback) | "Technician holding coil cleaner" | Own shoot, background removed |
| Trust-stat row | 4 icons (units serviced, Google rating, years, insured) | 1:1 | 24 px grid | Lucide SVG | Decorative | Lucide |
| Trust-stat row | Google "G" mark (only if displaying real Google ratings) | 1:1 | 24 | SVG | "Google reviews rating" | Google brand resources, per their guidelines |
| Services grid | 8 unit-type isometric illustrations + 2 (install, repair) | 1:1 | 160 px viewBox, 320 rendered max | SVG, two-tone | "Split system air conditioner illustration" etc. | Custom illustrator (spec B.4) |
| Who we help | 4 photos: home living room with split unit, open-plan office with cassette unit, commercial/retail ceiling, aged-care or clinic room | 4:3 | 1600 × 1200 | AVIF/WebP | Describe room + unit | Own shoot preferred; licensed stock acceptable |
| About / why choose | Split-section photo: two technicians working at a ceiling or wall unit (candid) | 4:5 (desktop) + 16:10 crop (mobile) | 1600 × 2000 | AVIF/WebP | Describe action | Own shoot |
| Why choose | 6 feature icons | 1:1 | 24 | Lucide | Decorative | Lucide (`ShieldCheck`, `Sparkles`, `Clock`, `BadgeDollarSign`, `UserCheck`, `Star`) |
| Process (5 steps) | 5 small photos or icons per step (inspection, treatment, hydro wash, sanitise, fogging) | 1:1 | 800 × 800 (photos) / 32 (icons) | AVIF or SVG | Describe step | Own shoot |
| Before / after | 3–5 pairs: coil, barrel fan, drain tray, filter, louvres — identical framing, tripod | 4:3 each | 1600 × 1200 per side | AVIF/WebP | "Evaporator coil before cleaning — dust and mould build-up" / "…after cleaning" | Own shoot (shot list B.3) |
| Testimonials | Avatar initials (generated) or customer photos (only with consent) | 1:1 | 160 | SVG/AVIF | Customer first name | Generated |
| Service tiers / price cards | Check and info icons | 1:1 | 16–20 | Lucide | — | Lucide |
| Symptoms | 5 icons (smell, dark spots, dust, calendar, heavy use) | 1:1 | 32 | Custom or Lucide (`Wind`, `CircleAlert`, `CalendarClock`, `Flame`/`ThermometerSun`) | Decorative | Lucide / custom |
| Areas | Australia map with state outlines, service-region highlight and city pins | ≈ 4:3 | — | Inline SVG (≤ 40 KB) | "Map of Australia showing serviced cities" | Custom vector (from public-domain geodata, simplified) |
| CTA band | Photo: technician with van or at a front door, friendly, facing camera | 3:2 (desktop) / 4:5 (mobile) | 2400 × 1600 | AVIF/WebP | Describe | Own shoot |
| Page banners | 1 per template: Services (ducted/ceiling work), About (team), Contact (technician on phone/tablet), Booking (clean unit close-up), Locations (van on suburban street) | 21:9 desktop / 4:3 mobile | 2880 × 1234 + 1600 × 1200 | AVIF/WebP | Describe | Own shoot |
| Service detail pages (×8) | Hero photo of that unit type being cleaned; 1 detail photo (open unit); before/after pair | 4:5, 4:3 | 1600 × 2000, 1600 × 1200 | AVIF/WebP | Unit-specific | Own shoot |
| Video section | Poster frame + short 45–90 s process video (hosted on YouTube/Vimeo unlisted, embedded via facade) | 16:9 | 1920 × 1080 | AVIF poster | "Watch a split system deep clean" | Own production |
| Footer | Logo (reversed), payment marks if applicable, social icons | — | SVG | SVG | — | Brand / providers |
| Badges | "Australian owned & operated", "Fully insured", "Police-checked technicians", "Satisfaction guarantee" | 1:1 roundels | 96 px viewBox | SVG, brand two-tone | Text of badge | Custom (B.4) |
| OG / social | Open-graph image per template | 1.91:1 | 2400 × 1260 | PNG/JPEG | — | Designed from hero photo |

### B.3 Photography shot list (one half-day shoot)

Equipment: full-frame camera, 24–70 mm, tripod (mandatory for before/after), two LED panels, lens cloth. Talent: two technicians in clean branded uniforms, one "customer". Locations: a residential living room/bedroom with a wall split, a small office with a ceiling cassette, an exterior with condensers and the van.

| # | Shot | Framing | Use |
|---|---|---|---|
| 1 | Technician removing the front cover of a wall split, customer watching | Wide, 16:9 + 4:5 crop | Hero video/poster, About |
| 2 | Technician applying coil treatment inside the open unit (spray visible) | Medium, 4:5 | Split-system page, process step 2 |
| 3 | Hydro-pressure wash with catchment bag fitted | Medium, 4:3 | Process step 3, "how it works" |
| 4 | Fogging / sanitising the room | Medium, 4:3 | Process step 4–5 |
| 5 | Before: evaporator coil close-up with build-up (tripod, locked framing) | Macro, 4:3 | Before/after pair |
| 6 | After: same coil cleaned, identical framing | Macro, 4:3 | Before/after pair |
| 7 | Before/after: barrel fan; drain tray; filter (three more locked pairs) | Macro, 4:3 | Before/after component |
| 8 | Ceiling cassette: technician on step ladder removing the grille | Low angle, 4:5 | Cassette page, Services banner |
| 9 | Ducted return-air grille/filter removal | 4:3 | Ducted page |
| 10 | External condenser wash outside | 3:2 | Condenser page, Areas |
| 11 | Technician with tablet showing inspection photos to customer | 3:2 | Why choose (transparent reporting), Booking page |
| 12 | Technician at the front door / van in driveway, smiling | 3:2 + 4:5 | CTA band, Locations banner |
| 13 | Team of 2–4 in uniform, candid, in front of van | 3:2 | About |
| 14 | Clean unit running, vents open, soft light (hero still alternative) | 16:9 | Booking banner, OG image |
| 15 | Technician on phone/tablet (dispatch) | 3:2 | Contact banner |
| 16 | 10–15 s video clips of shots 1–4 and 10 (slow, tripod or gimbal) | 16:9 | Hero loop, process video |

Deliver RAW + edited JPEG (sRGB, 4000 px long edge). Keep a "clean" version of every frame without the brand logo visible in case of rebrand.

### B.4 Icon & illustration specification

| Set | Items | Style | Grid / viewBox | Colours (tokens) | Delivery |
|---|---|---|---|---|---|
| Unit-type isometric set | Split system (wall), ducted (ceiling vent + plenum), cassette (4-way ceiling), under-ceiling/suspended, bulkhead (slim concealed), window/box, portable (floor unit with hose), external condenser, installation (unit + tools), repair (unit + spanner) | Isometric 30°, consistent light direction (top-left), 2 px stroke at 160 px, flat fills, no gradients | 160 × 160, unit occupies 120 × 100 central box | Stroke `secondary-500`, fills `secondary-50` / white, accent `primary-500` on one element each (louvre, airflow arrows) | SVG, `currentColor` for stroke so hover can tint; also a 48 px simplified glyph per unit for the compact mobile row and menus |
| Feature/benefit icons | 6–8 | Lucide, stroke 1.75 | 24 | `currentColor` | Lucide package |
| Process step icons | 5 | Custom, match Lucide stroke | 32 | `primary-500` on `primary-50` roundel | SVG |
| Symptom icons | 5 | Custom, match Lucide stroke | 32 | as above | SVG |
| Badges / roundels | Australian owned, fully insured, police-checked, satisfaction guarantee, Google rating (if used), payment options chip | Circular 96 px, 2-colour, text on a curve (max 3 words), *no raster text* | 96 × 96 | `primary-500` / `secondary-500` / white | SVG with `<title>` for accessibility |
| Australia map | State outlines, highlighted service states, 7–10 pins | Simplified geometry (< 1 500 nodes), 1.5 px strokes | ≈ 800 × 600 | Base `surface-2`, highlight `primary-100`, pins `primary-500`, labels `ink` in `body-sm` | Inline SVG React component with `data-city` on each pin |
| Decorative | Soft radial gradient blobs or a subtle airflow line motif for section backgrounds (optional) | Very low contrast (≤ 6 %) | — | `primary-50`, `secondary-50` | CSS gradients preferred over images |

### B.5 Asset checklist by page

| Page | Photos | Illustrations/icons | Video | Other |
|---|---|---|---|---|
| Home | 1 hero still, 4 "who we help", 1 about split, 1 CTA, 3–5 before/after pairs, 1 areas photo (optional) | 10 unit icons, 6 feature icons, 5 process, 5 symptom, map, badges | Hero loop | OG image |
| Services hub | 1 banner | 10 unit icons, process icons | Process video poster | — |
| Service detail ×8 | 1 hero, 1 detail, 1 before/after pair each | Unit icon, process icons | Optional unit-specific clip | — |
| About | 1 banner, 1 team, 1 candid work | Badges, feature icons | — | Timeline graphics (CSS) |
| Locations hub + city pages | 1 banner, 1 per city (suburb/van) | Map | — | — |
| Pricing (optional) | — | Check icons | — | — |
| FAQ | 1 banner (optional, can reuse template banner) | — | — | — |
| Contact | 1 banner | Contact icons, map | — | — |
| Book | 1 banner (clean unit) | Step icons, check icons | — | — |

### B.6 Performance budget for media

- Above-the-fold on home: hero poster ≤ 120 KB (AVIF), video ≤ 4 MB, `preload="metadata"`, loaded only ≥ 768 px and when `prefers-reduced-motion` is not set; otherwise show the poster.
- Each section photo ≤ 150 KB at its largest `sizes` breakpoint; `priority` only on the hero poster and page-banner image.
- Icon set inlined as React components (tree-shaken), total ≤ 40 KB gzipped; map ≤ 40 KB.
- Total image weight on home ≤ 1.2 MB desktop, ≤ 700 KB mobile.
