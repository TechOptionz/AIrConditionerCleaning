# 01 — Design Reference Analysis

Reference inspected: `seanmas.com.au` (Australian aircon cleaning / deep-clean company).
Inspection date: 7 November 2026. Desktop viewport 1294 × 919 px (DPR 1). Mobile/tablet behaviour inspected through a same-origin 375 px and 768 px iframe (see §8 for limits).

Legend (shared with every file in this blueprint):

- **[Observed]** — measured on the live site via computed styles, DOM inspection or screenshots.
- **[Proposed]** — our recommendation for the new site.
- **Not observed** — looked for it, it is not there.
- **Not verified** — could not be inspected reliably.

Token names (`primary-500`, `surface-1`, `--radius-lg`, `h2`, `eyebrow` …) refer to `02-DESIGN-SYSTEM.md`.

---

## 1. Overall design review

### 1.1 Technical profile [Observed]

| Item | Finding |
|---|---|
| Platform | WordPress 7.0 + Elementor 4.1.4 + a commercial "home services" theme (Housefix) with its own addon plugins |
| Performance layer | WP Rocket (lazy-loading with SVG placeholders, CDN) |
| Forms | Contact Form 7 with Select2-styled dropdowns; jQuery Validate loaded |
| Third-party | Elfsight Google Reviews embed (did not render during inspection), YouTube (external link, no lightbox), Facebook Messenger promo graphics, Google Tag Manager |
| Sliders | Swiper (one instance on home: the "preferred service" circles) |
| Fonts | Poppins everywhere; Outfit on one icon row (Services page); a script font declared but unused; logo is a serif wordmark PNG |
| Motion | `scroll-behavior: smooth`; CSS hover transitions only; **no** scroll-reveal / entrance animation system is active (233 widgets carry an `animation_effect` setting and all but one are `none`; the exception is a decorative image set to `scroll`, whose effect was not visually detectable) |
| Document height | Home ≈ 10 240 px desktop, ≈ 15 600 px mobile |

### 1.2 Visual character [Observed]

- A two-colour scheme: a saturated magenta/berry (`#A01E53`) and navy (`#1C385B`), with a second royal blue (`#023E8A`) used on most H2s. White and `#F8F8F8` surfaces, several pale-pink tinted or patterned backgrounds.
- Rounded, soft, "friendly service company" feel: 20 px card radius, 8 px buttons, circular photos, soft 5–10 % black shadows.
- Heavy use of full-bleed colour bands (magenta nav, navy "why choose us", wine CTA, navy franchise, magenta footer band).
- Photography: real technicians in branded navy polos, lifestyle shot (father + child on sofa), isometric product-style illustrations for unit types.
- Strong, repetitive CTA presence: "Book Appointment" + phone number pair appears in the header, hero, and at least five section footers.

### 1.3 Verdict in one paragraph

The reference nails *content strategy* for this industry — unit-type service discovery, a visible booking form near the top, process explanation, pricing clarity on service pages, trust signals, service-area coverage, FAQ — and it uses a bold brand colour confidently. Execution is weaker: spacing is inconsistent (0 px to 120 px section padding), two unrelated blues compete for headings, several sections depend on third-party embeds that can fail, the mobile layout is a squeezed desktop (tiny 12 px service tiles, a non-sticky header, no in-menu CTA, a 768 px overlap bug), page banners are duplicated on two pages, and the About page loses its container padding. The new site should keep the information architecture and the "one bold colour + navy" idea, and rebuild the layout, typography, motion and responsive system from scratch.

---

## 2. Homepage section order

### 2.1 Desktop order [Observed] (top offset / height in px at 1294 wide)

| # | Section (identifying heading) | Top | Height | Background |
|---|---|---|---|---|
| 0 | Top utility bar (phone CTA, rating/payment/NDIS badges, cart, search) | 0 | 72 | white |
| 1 | Main nav band (logo, links, "Book appointment" block) | 72 | 107 | transparent band holding a magenta rounded container |
| 2 | Hero (video background) | −23 (overlaps nav) | 720 | mp4 video, image fallback |
| 3 | Stat + 4-step strip (overlaps hero bottom) | 599 | 156 | magenta box + dark grey strip |
| 4 | Booking form card + "Our services" grid (one Elementor section) | 985 | 1628 | pale pink pattern |
| 5 | Customer reviews (photo + embed) | 2613 | 720 | white |
| 6 | About / "Air conditioner cleaning & servicing experts" | 3333 | 740 | white with faint dot pattern |
| 7 | Technician photo strip | 4073 | 320 | photos edge to edge |
| 8 | Why choose us | 4393 | 798 | navy with abstract wave overlay image |
| 9 | "Select your preferred service" (premises types) | 5191 | 982 | white + soft wave graphic |
| 10 | CTA band "Book a professional deep clean" | 6173 | 465 | wine `#7F1945` |
| 11 | What is a deep clean (two comparison cards) | 6678 | 588 | white |
| 12 | Best-selling products (shop promo) | 7266 | 569 | white |
| 13 | Franchise recruitment | 7803 | 626 | navy `#1C385B` |
| 14 | Signs your aircon needs a clean (table + promo sidebar) | 8429 | 925 | white |
| 15 | Areas we serve (map + city list) | 9354 | 861 | off-white `#FFFCFD` |
| 16 | Footer: brand band, states strip, 4 link columns, bottom bar | 10241 | ≈ 640 | magenta band → white |

### 2.2 Mobile order differences [Observed at 375 px]

The mobile page is partly a *different* template (Elementor hide/show per device), not just a reflow:

1. Top utility bar is **hidden**; a single magenta header bar shows logo, cart, search, hamburger.
2. Hero shows a static image (video `background_play_on_mobile` setting present but a static image was displayed).
3. The stat box changes copy ("Over 100,000+") and the 4 steps stack vertically with chevron-down separators.
4. Booking form appears **before** services, full width.
5. "Why choose us" is followed directly by a **CTA block with an H1** ("Professional deep clean by our technician") that does not exist on desktop at that position.
6. The "preferred service" section becomes a 1-up Swiper carousel with arrows and dots.
7. Franchise block appears **immediately after** the preferred-service carousel (desktop: after products).
8. Products ("This is what the professionals use") → Deep-clean explainer → Signs → Areas → Footer.
9. The desktop CTA band (#10) and the photo strip (#7) are reduced/hidden (photo strip renders as a 160 px band).

[Proposed] One section order for all breakpoints; vary layout, never the content inventory, per device.

---

## 3. Section-by-section analysis (homepage)

Each block: Purpose → Layout → Styling → Media → CTAs → Mobile → Motion → Improvements → Verdict.

### 3.0 Top utility bar [Observed]

- **Purpose**: phone-first conversion and trust badges.
- **Layout**: 72 px tall, white, 10 px vertical padding; three zones — left: phone icon + "Get a quote" micro-label (20 px / 700 navy) over the 1300 number (≈ 24 px / 700 magenta); centre: a single 530 × 46 px image strip containing a 4.8-star badge, Afterpay, Zip and NDIS logos; right: cart (28 px) and search (28 px) icons.
- **Behaviour**: scrolls away; not part of the sticky header. Hidden ≤ 1024 px.
- **Improvements** [Proposed]: keep a slim 40 px top bar (phone, hours, service-area note) **or** fold the phone into the main header; render badges as individual SVG/components, not one image; drop cart/search unless a shop exists.
- **Verdict**: optional (merge into header).

### 3.1 Main navigation band [Observed]

- **Layout**: 107 px band; inside it a 1220 px wide magenta container with rounded corners that sits over the hero (hero starts at −23 px so the band visually floats on the video). Logo PNG 163 × 43 px left (30 px inset). Links centred: Poppins 16 px / 500 / uppercase, white, `0 10px` padding. Active page = white pill (`radius 100px`) with **red** `#FF0000` text (an unstyled default — mismatch with brand). Right: a full-height navy block (`#1C385B`) with "BOOK APPOINTMENT" + circle-arrow icon.
- **Dropdown**: "Shop" has a hover dropdown — 180 px, white at 96.5 % opacity, `padding 15px 0`, shadow `2px 2px 20px rgba(0,0,0,.1)`, square corners, transition `0.1s ease-in` (opacity/visibility). One child item.
- **Sticky**: on scroll the wrapper (`.wdt-header-tpl`) receives a `fixed` class → `position: fixed; top: 0; z-index 9999`. Height stays 107 px; no shrink, no shadow, no observed transition despite `transition: all`. The utility bar scrolls away. Not sticky ≤ 1024 px.
- **Mobile** (≤ 1024): magenta bar 76 px with logo, cart, search, hamburger; hamburger opens an **off-canvas right panel** (white, ≈ 72 % viewport width, dark overlay on the remainder), items 44 px with 1 px dividers, "Shop" has a checkbox-style sub-menu toggle, a bordered "X" close button top-right. Transition `transform 0.25s ease-in-out, visibility 0.3s`. **No CTA or phone inside the panel.**
- **Improvements** [Proposed]: 80 px header that compacts to 64 px with a shadow on scroll; underline-style active state in brand colour; sticky on all breakpoints; mobile sheet with primary CTA + phone pinned at the bottom; `aria-expanded`, focus trap, Escape to close.
- **Verdict**: essential — improve.

### 3.2 Hero [Observed]

- **Purpose**: positioning statement + two CTAs + two trust lines.
- **Layout**: 720 px tall, `padding-top 100px`, content centred in a ≈ 894 px column. Order: H1 (50 / 60 px, 700, white, two lines forced by `<br>`) → 20 px gap → one-line subhead (16 px white, truncated mid-word in the source) → inline icon list with two trust items (14–16 px) → button pair.
- **Media**: full-bleed autoplay/muted/loop MP4 with image fallback (`background-size: cover`). Overlay element exists but is at opacity 0 — the text relies on the video's own darkness for contrast (risky).
- **Buttons**: both 50 px tall, 18 px / 400, `padding 14px 20px`, `radius 8px`, **2 px white border**, trailing icon. Primary magenta ("Watch how we work" → opens YouTube in a new tab, no lightbox), secondary navy ("Book appointment"). Hover: background swaps to the other brand colour over 0.3 s linear.
- **Decoration**: an absolutely positioned "deal" badge image on the right (500 × 500 declared) — rendered 0 × 0 on desktop, visible on inner pages.
- **Mobile**: static image; H1 wraps to four lines; buttons stack full-width (≈ 300 px) with 24 px gap; trust list stacks.
- **Motion**: Not observed (no entrance animation).
- **Improvements** [Proposed]: `display` type scale with `text-wrap: balance`; a real gradient scrim (`secondary-800` 60 % → 0 %); hero in a 2-column layout on ≥ 1024 (copy left, inline booking/quote mini-form right) to shorten the path to conversion; replace the YouTube link with an in-page video dialog; staggered text reveal (see 03).
- **Verdict**: essential — improve.

### 3.3 Stat + step strip [Observed]

- **Layout**: overlaps the hero's bottom edge (top 599 px, 156 px tall). Left: magenta box with "Over 10,000+" (38 px / 600, white) above "AIRCON UNITS SERVICED" (22 px / 700). Right: dark grey strip listing four booking steps separated by chevron icons (16 px white text).
- **Mobile**: stacked — magenta box, then grey block with steps vertical and chevron-down icons (≈ 1 060 px tall together with the form).
- **Tablet 768**: the strip **overlaps the hero buttons** (layout bug).
- **Motion**: Not observed (number is static; a count-up would be natural).
- **Improvements** [Proposed]: a 3–4 tile trust row (units serviced, Google rating, years, insured) with count-up on scroll; booking steps belong in the booking section, not here.
- **Verdict**: optional — rework as a trust-stat row.

### 3.4 Booking form card [Observed]

- **Layout**: white card, radius ≈ 12 px, soft shadow, 1160 px form; title "Book your service" (32 / 38 px, 700, navy) + one-line helper. Row 1: four text inputs (Name, Mobile, Address, Email) 222 × 39 px. Row 2: three Select2 dropdowns (premises: 10 options; service: 19 ungrouped options; unit type: 8) + "Aircon units" input. Row 3: textarea 923 × 60. Submit: navy block ≈ 189 × 100 px, right-aligned, spanning rows.
- **Inputs**: 1 px `rgba(2,62,138,.15)` border, radius 6 px, padding 8 px, 14 px text, placeholder-only (no visible labels), `#808080` placeholder. Only *Name* and *Aircon units* are `aria-required`.
- **Validation/confirmation**: Not verified (form not submitted).
- **Mobile**: single column, every field full width, 44 px tall; submit becomes a 90 px tall navy block.
- **Improvements** [Proposed]: visible labels, logical required set (name, mobile, suburb/postcode, unit type, service), grouped service options by unit type, inline validation, success state with next-step copy, stepper on mobile, and keep the form within ~1 scroll of the hero.
- **Verdict**: essential — improve.

### 3.5 Services grid [Observed]

- **Layout**: eyebrow ("OUR SERVICES", 14 px uppercase, ~0.3 em tracking, magenta, 40 × 2 px underline) → H2 40 / 48 px 700 → 14 px lead → custom flex grid (`gap 24px`, cards `calc(25% − 18px)` ≈ 285 × 338 px). 8 unit-type cards, then a second H2 ("Aircon installation & maintenance") with 2 centred cards.
- **Card**: white, `radius 20px`, shadow `0 4px 10px rgba(0,0,0,.05)`, `padding 30px 20px`, centred; 160 × 160 px isometric PNG illustration (intrinsic ≈ 250–400 px, mixed aspect) with 24 px bottom margin; H4 26 / 31 px 600 `#1E2B4B`. Whole card is a link to the unit-type page.
- **Hover**: `translateY(-5px)`, shadow `0 8px 20px rgba(0,0,0,.1)`, background `#A42252`, title white, 0.3 s.
- **Background**: pale pink with a repeating "shield" pattern; the section ends in a downward triangular notch into the next section.
- **Mobile**: 2-column, cards become horizontal rows 126 × 63 px, 8 px padding, 40 px icon, **12 px title** — far below comfortable tap/read size. Tablet: 2-column rows 292 px wide.
- **Motion**: no staggered entrance (Not observed).
- **Improvements** [Proposed]: 4 → 2 → 1 grid with the compact-row variant at ≥ 56 px icon / 16 px title; lift + shadow hover without the full colour flood; consistent SVG icon set; include a one-line benefit per card and "From $X" price hint.
- **Verdict**: essential — improve.

### 3.6 Customer reviews [Observed]

- **Layout**: two columns 512 / 767 px. Left: lifestyle photo 828 × 856 px intrinsic, rendered 512 × 720 `object-fit: cover`, flush to the viewport's left edge. Right: eyebrow + H2 (two lines, 40 px) + lead + Elfsight Google Reviews embed.
- **Embed**: container rendered at 0 px height with no children during two visits — Not verified; the right column was blank.
- **Mobile**: photo first (full width, ≈ 4:5), then centred text.
- **Improvements** [Proposed]: self-hosted testimonial carousel (02 §5.4) fed by a JSON/CMS source with an aggregate-rating badge; never depend on a third-party widget for a primary trust section.
- **Verdict**: essential — rebuild.

### 3.7 About / expertise [Observed]

- **Layout**: centred, `padding 80px/68px`. Eyebrow → two-tone H2 (brand name in magenta, descriptor in navy; 40 px) → three bullet paragraphs (16 px / 29 px, black) in an ≈ 720 px column → "100 % Australian owned" badge PNG 273 × 131 px.
- **Background**: white with faint dot pattern.
- **Mobile**: same stack, `padding-top 189px` (an odd offset caused by hidden elements).
- **Improvements** [Proposed]: split layout (photo 5 / copy 7) with 3 proof points as icon rows; move the badge into the trust row.
- **Verdict**: optional — merge with "Why choose us".

### 3.8 Technician photo strip [Observed]

- **Layout**: 4 square photos 320 × 320 (intrinsic 962 × 962), edge to edge, no gap, no caption. 19 `<img>` present (a gallery/slider with lazy placeholders), 4 visible — Not verified whether it auto-scrolls (no movement seen in ~5 s).
- **Mobile**: 160 px tall band.
- **Improvements** [Proposed]: a 5–6 image marquee of real job photos with a slow continuous scroll (pauses on hover / reduced-motion), or a before/after comparison component.
- **Verdict**: optional — improve (before/after is stronger).

### 3.9 Why choose us [Observed]

- **Layout**: navy section (base `#F8F8F8` with a navy wave image overlay, `padding 120px/105px`), single 1220 px container split roughly 45 / 55: left eyebrow + H2 (40 px / 600, white) + paragraph; right five features as bold title (≈ 22 px) + 14 px description, no icons; buttons: navy "Book appointment" + magenta phone button (both with white 2 px borders).
- **Mobile**: all centred, long single column (≈ 1 370 px).
- **Services-page variant**: five circular icon tiles in a row on navy using the Outfit font.
- **Motion**: Not observed; the overlay image loads late, creating a momentary white-on-grey flash.
- **Improvements** [Proposed]: 2 × 3 or 3 × 2 feature grid with Lucide icons, solid `secondary-800` background (no image overlay), staggered reveal.
- **Verdict**: essential — improve.

### 3.10 Preferred service / premises types [Observed]

- **Layout**: centred H2 (40 px, `text-transform: capitalize`) → Swiper with 7 slides: circular photo 222 px (intrinsic 566 × 566) + label (24 px / 600 navy). Desktop shows 4 per row then 3 centred (two rows). A "Read more" overlay element scales to 0.8 on column hover.
- **Mobile**: 1-up carousel, magenta prev/next arrows, 7 dots; lazy placeholders mean off-screen slides are blank until reached.
- **Improvements** [Proposed]: a static 3–4 column "Who we help" grid (Residential / Commercial / Strata & real estate / Aged care & NDIS) with 4:3 photos and a short line each; no carousel on desktop.
- **Verdict**: optional — simplify.

### 3.11 CTA band [Observed]

- **Layout**: wine `#7F1945`, 465 px, two columns: technician photo left (full height, cover), copy right (H2 ≈ 32 px white, two paragraphs, bold 16 px line, navy "Book" + outlined phone button), "Amazing deal" badge image top-right.
- **Mobile**: replaced by a different CTA block earlier in the page.
- **Improvements** [Proposed]: one reusable `CtaBand` (photo | copy) used mid-page and pre-footer; tone `primary-700` or `secondary-800`.
- **Verdict**: essential — keep concept.

### 3.12 Deep-clean explainer [Observed]

- **Layout**: centred eyebrow + H2 (40 px) + 2-line lead (14 px) → two equal cards (≈ 530 px): navy and magenta, square corners, `padding ≈ 24px`, H3 30 px / 400 white, chevron-icon list 14 px.
- **Mobile**: stacked full-width.
- **Improvements** [Proposed]: comparison with "Best for / Includes / From $" rows (as the Services page already does) using the price-card component; radius `--radius-lg`, white cards on `surface-1`.
- **Verdict**: essential (service tiers) — improve.

### 3.13 Best-selling products [Observed]

- Product bottle photo left, eyebrow + H3 36 px + navy "Shop now" + "Australian made" roundel. Purely e-commerce.
- **Verdict**: redundant for the new site (unless a shop is planned).

### 3.14 Franchise recruitment [Observed]

- Navy band, 626 px: left copy (H2 ≈ 38 px with brand name in magenta), outlined "Join now" button; right team photo with a circular "Franchise partner" stamp overlapping the seam. Appears on *every* page inspected.
- **Verdict**: redundant for a single-operator site; if needed, a single small footer link.

### 3.15 Signs your aircon needs a clean [Observed]

- **Layout**: ≈ 9 / 3 split. Left: eyebrow + H2 (40 px) + lead + a 5-row two-cell table (navy label cell 30 % / magenta description cell 70 %, 12 px row gap, square corners, white 14–16 px text) + a 24 px sub-heading + fine print + button pair. Right rail: two promo images (deal poster 8:12, Messenger "Need help" card 4:3).
- **Mobile**: table rows stack as full-width cells; promos drop below.
- **Improvements** [Proposed]: 5 symptom cards with icons (3 + 2 or horizontal scroll on mobile), link to a "mould in aircon" guide; drop the promo rail.
- **Verdict**: essential — improve (great educational content).

### 3.16 Areas we serve [Observed]

- **Layout**: split 5 / 7. Left: eyebrow + H2 (two lines) + lead + Australia map illustration (pink states, pin labels for 7 cities). Right: 7 cities as `MapPin` icon + city name (16 px navy) + one-line climate rationale (14 px), a note on ACT/SA, button pair.
- **Mobile**: text → map → list, centred.
- **Improvements** [Proposed]: keep; make each city a link to a location page; postcode checker input; map as inline SVG with hover highlight.
- **Verdict**: essential — keep/improve.

### 3.17 Footer [Observed]

- **Layout**: magenta brand band (centred logo + one-line vision statement, 24 px padding) → white strip listing states with wide letter-spacing and ABN → 4 columns (Quick links, Support, Follow us [3 social icons], Newsletter: label + email input + navy "Subscribe" + consent checkbox) → bottom bar (Cookies / Privacy / Terms left, copyright centre, payment logos right).
- **Mobile**: 2 + 2 columns then stacked newsletter.
- **Improvements** [Proposed]: dark `secondary-800` footer with a pre-footer CTA band; columns: Services (unit types), Company, Service areas, Contact (phone, hours, email); NAP + ABN; licence/insurance line; keep legal bar.
- **Verdict**: essential — rebuild.

---

## 4. Page-level findings

### 4.1 Shared components across pages [Observed]

| Component | Home | Services | Service detail | About | FAQ | Contact | Book |
|---|---|---|---|---|---|---|---|
| Utility bar + nav band | ● | ● | ● | ● | ● | ● | ● |
| Page banner (gradient magenta→navy over photo, H1) | — | ● centred, 555 px | ● 167 px band + stat strip | ● left, ≈ 320 px | ● | ● **duplicated** | ● **duplicated** |
| Sticky "deal" poster + Messenger promo rail | ● (signs) | — | — | — | ● | — | — |
| Reviews (photo + embed) | ● | ● | ● | — | — | — | — |
| "Why choose us" | ● list | ● icon row | ● icon row | ● icon list | — | — | — |
| FAQ accordion | — | ● 8 | ● | — | ● 36 (tabbed) | — | — |
| CTA band (wine) | ● | ● | ● | — | — | — | — |
| Booking form | ● card | — | — | ● (right column) | ● | ● | ● |
| Franchise band | ● | ● | ● | ● | ● | ● | — |
| Footer | ● | ● | ● | ● | ● | ● | ● |

### 4.2 Services hub page [Observed]

- Order: banner (H1 ≈ 40 px, two CTAs, three trust lines) → same 8 + 2 service grid as home → "Which one does your aircon need?" two tier cards (white outlined vs navy filled, radius ≈ 16 px, *Best for* / *Includes* check-lists, "from $" line, centred magenta button, fine print) → "What happens during a deep clean" five numbered step cards on deep navy `#003E66` (magenta cards, white 2 px border, radius ≈ 12 px, number roundel) → "See our 10-step deep clean in action" (checklist line + video thumbnail with play button | wine copy block with CTAs) → "Why choose" icon row → reviews → FAQ accordion (8 items) → bottom CTA → franchise → footer.
- Accordion: Elementor native; items 1 px `#EAC6D4` borders, square, title 18 px / 700, `padding 15px 20px`, "+" icon left; opening uses jQuery slide (≈ 300 ms), **single-open** (opening one closes the previous). Observed open/close works.
- Verdict: strong page; adopt its *content model* for the new Services hub.

### 4.3 Service detail page (split system) [Observed]

- Order: short banner (H1 ≈ 44 px white, one-line sub) → stat box + 4 trust chips strip (navy) → intro split (photo 4:5 left, eyebrow + H2 + long copy right) → "Packages and prices" → **4 pricing cards** (pink tint `#FFEEF5`, radius 16, padding 18, 292 px; titles uppercase ≈ 18 px; price 42 px / 700 navy; inclusion list with "i" info icons; add-on note; navy button; the featured card is solid magenta, taller, with a "Most popular" white label) → photo → "How it works" 5 step cards → video section → why choose → reviews → "Service or clean?" explainer → FAQ → franchise.
- Tooltips on "i" icons: Not verified (no tooltip attribute found).
- Verdict: the best-structured page on the site; it becomes the template for all unit-type pages.

### 4.4 About page [Observed]

- Banner (H1 left) → H1-sized heading + badge → large photo (full width) → "Who we are" copy with brand name highlighted → tier explainer → features list with circular icon tiles → "Where we work" + map → story timeline ("Chapter one … four", small numbered labels, 36 px headings) → sign-off → franchise → booking form.
- **Bug**: from the "Who we are" section downward, content has **0 px side padding** and runs to the viewport edge on desktop.
- Verdict: good narrative content; layout needs a complete rebuild.

### 4.5 FAQ page [Observed]

- Banner → 2-column: left H2 (≈ 40 px) + intro + **tabs** (Services = navy filled, Products = light grey) + accordion (36 items, right-aligned "+", 1 px dividers, ≈ 52 px rows); right rail with the deal poster + Messenger card (sticky: Not verified).
- Verdict: keep tabs or category pills; drop the promo rail; add a search field and FAQPage schema.

### 4.6 Contact page [Observed]

- **Duplicated banner** (two stacked hero banners with the same H1). Then badge → centred H2 with brand name highlighted → three info cards (Call / Email / Hours; white, 1 px border, radius ≈ 8 px, 140 px tall) → full-width Messenger "Need help" banner (blue) → grey section (`#E6E7E8`): dotted-map illustration left, form right (labels present here, required asterisks, white inputs) → booking CTA block → franchise.
- Verdict: keep info cards + form split; remove duplicate banner and third-party banner.

### 4.7 Book appointment page [Observed]

- **Duplicated banner**, then "Booking form" heading and the same CF7 form (897 px wide, two-column inputs, navy full-width submit), nothing else. No reassurance content, no steps, no summary.
- Verdict: rebuild as a guided 3-step booking flow with a sticky summary and "what happens next".

---

## 5. Key strengths (worth adapting)

1. **Unit-type-first service discovery** — eight recognisable system types as cards, linking to dedicated pages.
2. **Booking form above the fold line** on the homepage, and repeated CTA pairs (book + call) at section ends.
3. **Two clear service tiers** (maintenance vs restoration) with "best for / includes / from $" — reduces phone enquiries.
4. **Numbered process** ("what happens during a clean") and the **symptoms list** — educational trust content.
5. **Service-area section with climate rationale** per city — good local-SEO pattern.
6. **Eyebrow + underline + H2 + lead** heading motif — simple, consistent, recognisable.
7. **Card hover lift** and soft shadows — modern enough to keep.
8. **Pricing cards with a featured tier** on service pages.
9. **One bold brand colour + navy** — confident, memorable.
10. **Real technician photography** in uniform — authenticity.

## 6. Key weaknesses (to fix)

1. Inconsistent section padding (0–120 px) and heading colours (two blues, black and navy body text).
2. Mobile is a squeezed desktop: 12 px card titles, non-sticky header, no CTA in the menu, hero H1 fixed at 50 px, 768 px overlap bug.
3. Reliance on third-party embeds for the reviews section (blank when it fails).
4. Duplicate page banners (Contact, Book), About page with no side padding, unstyled red active nav colour.
5. Placeholder-only form labels, inconsistent required fields, 19-option ungrouped select.
6. Repetitive off-topic blocks (shop, franchise, deal posters, Messenger promo) on every page.
7. Busy backgrounds (patterns, wave overlays) behind text; overlay images that load late.
8. No motion system: no reveals, no stagger, no counters; only CSS hover.
9. Card hover floods the whole card with brand colour (illustration contrast suffers).
10. Mixed illustration sizes/perspectives; PNG icons instead of SVG.
11. Links open YouTube externally instead of an in-page player.
12. Hard `<br>` line breaks in headings.

---

## 7. What to carry forward (summary table)

| Reference pattern | Decision |
|---|---|
| Header: logo / links / navy CTA block | Keep concept; compact sticky header with underline active state |
| Video hero + trust lines + CTA pair | Keep; add scrim, 2-col with quick-quote form on desktop |
| Stat strip | Convert to trust-stat row with count-up |
| Booking form card | Keep; labels, grouping, validation, success state |
| 8 + 2 service cards | Keep; SVG icons, price hint, better mobile rows |
| Reviews | Rebuild self-hosted carousel |
| About + why choose | Merge into one split section + feature grid |
| Photo strip | Before/after or marquee |
| Premises carousel | Static "who we help" grid |
| CTA band | Keep as reusable `CtaBand` |
| Tier explainer | Keep as comparison/price cards |
| Products, franchise, promo rails | Remove |
| Symptoms table | Symptom cards |
| Areas + map | Keep; location pages |
| Footer | Rebuild dark footer with pre-footer CTA |

---

## 8. What could not be inspected

- **Google reviews embed** (Elfsight) rendered empty on two visits — its card design, slider behaviour and count are **Not verified**.
- **Form validation, error styling, confirmation state and the post-submit flow** — the form was not submitted (would send data to the business); **Not verified**.
- **Video section / "Watch how we work"** — external YouTube link; the in-page video block on Services/service pages (thumbnail + play button) was not clicked; whether it opens a lightbox is **Not verified**.
- **Shop, How-to-use, NDIS, Blog, premises-type pages** — not opened (out of scope or e-commerce).
- **Tooltips** on pricing "i" icons — no tooltip markup found; **Not verified**.
- **Sticky behaviour of the FAQ/Signs promo rail** — Not verified.
- **Photo-strip auto-scroll** — no movement seen; Not verified.
- **True device rendering**: the browser window could not be resized, so 375 px and 768 px layouts were emulated with a same-origin iframe. Touch behaviours (swipe, tap highlight, iOS zoom on 14 px inputs) are **Not verified**; CSS breakpoints are reliable.
- **Entrance animations**: none detected on desktop; a single image widget has a `scroll` animation setting whose effect was not visible — treated as **Not observed**.
- **Page loader / back-to-top button**: scripts are loaded but neither element was found in the DOM — **Not observed**.
