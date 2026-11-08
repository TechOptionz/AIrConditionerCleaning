# 04 — Responsive Blueprint

Layout specifications for the new site across five viewport ranges, grounded in what was observed on the reference (seanmas.com.au) and corrected where the reference breaks.

Legend: **[Observed]** measured on the reference · **[Proposed]** our specification · **Not verified** could not be inspected.

Reference measurements were taken at a 1294 px desktop viewport, and in same-origin 768 px and 375 px frames. Type sizes below use the fluid scale from `02-DESIGN-SYSTEM.md` §3.2; tokens (`--gutter-*`, `--section-y-*`, `--container-*`) are from the same file.

---

## 1. What the reference does at each width (observed)

### 1.1 Desktop — 1294 px (observed)

- Boxed container 1220 px with 10 px side padding; sections stretch full-bleed.
- Header = 72 px white utility bar (phone CTA, four trust/payment badges, cart, search) + 107 px nav band whose inner 1220 px container is a rounded magenta bar with logo left, centred uppercase links, and a navy "Book appointment" block filling the right end. Nav band becomes fixed after the utility bar scrolls away.
- Hero 720 px tall with background video; two-line H1 at 50/60 px (hard `<br>`), one-line lead, two inline trust items, two side-by-side buttons; an absolutely positioned promo image floats at the right edge.
- A stats tile + 4-step strip overlaps the hero bottom edge and sits above a white booking-form card (4 inputs in a row, 3 selects + 1 input in a second row, textarea, navy submit block on the right — 1160 px wide).
- Service grid: flex-wrap, four 285 px cards per row, 24 px gap, two rows of four + a separate two-card row for installation/repair.
- Reviews: 512 px photo column (portrait, `object-fit: cover`, 720 px tall) + 767 px text column.
- About: centred text block, ~900 px wide, dotted pattern background.
- Photo strip: four 320 px square photos edge-to-edge.
- "Why choose us": navy section, two columns (text 50 % / features 50 %).
- "Preferred service": two rows of circular photos (4 + 3), 222 px circles.
- CTA band: 2-col, photo left (≈ 37 %), text + buttons right, on wine background.
- Deep-clean explainer: centred intro + two equal cards (navy / magenta).
- Signs: 2-col — table-like 5 rows (label cell / description cell) + 230 px promo sidebar.
- Areas: 2-col — text + map illustration | 7 city entries + buttons.
- Footer: magenta brand band → states/ABN strip → 4 equal columns → legal bar.
- Internal pages: 555 px (Services) or ~320 px (About, Contact, Book) banner; pricing 4-up; process 5-up; FAQ accordion 2/3 + 1/3 sidebar.

### 1.2 Tablet — 768 px (observed)

- Utility bar hidden; nav collapses to a magenta bar with logo, cart, search and hamburger (`.menu-trigger`) — hamburger visible, desktop nav hidden (breakpoint ≤ 1024 px).
- Header is **not** sticky.
- Hero H1 ~30 px, two lines; lead wraps to two lines; trust items remain inline.
- **Bug:** the stats tile + 4-step strip (now stacked and full-width) **overlaps the hero buttons** — the buttons are half hidden behind the strip.
- Service grid becomes 2 columns of horizontal (row-direction) cards, 292 px wide, icon left + title right.
- Container width 705 px with 10 px padding; `scrollWidth` 753 < 768 → no horizontal overflow.

### 1.3 Mobile — 375 px (observed)

- Header: magenta bar 76 px tall (12 px padding) with logo, cart, search, hamburger. Not sticky.
- Off-canvas menu slides from the right, ~75 % width, white, dark overlay, "X" close top-right, 44 px rows with dividers, chevron + checkbox toggle for sub-menu, **no CTA inside the menu**.
- Hero: stacked; H1 four lines; lead; trust lines; two **full-width stacked** buttons; hero image (video status Not verified on mobile).
- Stats tile + 4-step list stack vertically on a dark grey strip (chevrons pointing down).
- Booking form: single column, full-width inputs, selects, textarea, full-width navy submit (≈ 72 px tall).
- Services: 2-column grid of tiny tiles — **126 × 63 px, 8 px padding, 40 px icon, 12 px title** — well below comfortable tap size; "Installation & maintenance" sub-section repeats the tiles.
- Section gap after the service grid: large empty pink area with a decorative notch, then the reviews photo full-width (≈ 320 px tall), then centred review text.
- About/Why choose: single column; the navy "Why choose us" block has ~190 px of top padding before content (over-tall).
- Preferred service: Swiper **1-up carousel** with pink circular arrows and dot pagination.
- Section order differs from desktop (mobile-specific template): …Why choose → CTA → Preferred service → Franchise → Products → Deep clean → Signs → Areas → Footer.
- Footer: all columns stacked; Quick links / Support side-by-side in two narrow columns; newsletter input + full-width navy Subscribe.
- `scrollWidth` 360 < 375 → no horizontal overflow at 375.
- H1 declared at 50/60 px in the desktop rule; the visible mobile H1 is smaller (≈ 30 px) — exact mobile size Not verified.

### 1.4 Other observed responsive weaknesses

- About page content touches the viewport edge on desktop (0 px gutters on several blocks).
- Book-appointment and Contact pages render **two stacked page banners** (duplicate template section).
- Hard `<br>` inside the hero H1 and several H2s.
- Inconsistent section padding (0 → 120 px) produces uneven rhythm on mobile.
- Lazy images pop in without placeholders (layout can shift until loaded).
- Reviews widget rendered empty, leaving a blank half-section at every width.
- Sidebar promo cards (Signs, FAQ) stack below content on mobile and push the real CTA far down.

---

## 2. Global rules by viewport range (proposed)

| Range | Name | Container | Gutter | Grid gap | Section padding (Y) | Header | Base type |
|---|---|---|---|---|---|---|---|
| ≥ 1440 | `2xl` large desktop | 1240 px content; media bands up to 1440 px | 32 px | 24 px | 96 px (128 px for hero-adjacent) | Full nav, 80 px → 64 px compact, utility bar 40 px | 16 px |
| 1024–1439 | `lg/xl` laptop | 100 % − 64 px (max 1240) | 32 px | 24 px | 96 px | Full nav, same | 16 px |
| 768–1023 | `md` tablet | 100 % − 48 px | 24 px | 20 px | 80 px | Compact bar 72 px: logo, phone icon-button, "Book" button, hamburger; sticky | 16 px |
| 375–767 | `sm/xs` mobile | 100 % − 32 px | 16 px | 16 px | 64 px | Bar 64 px: logo, phone icon, hamburger; sticky | 16 px |
| 320–374 | small mobile | 100 % − 32 px | 16 px | 12 px | 56 px | Bar 60 px: logo (max 120 px wide), hamburger; phone moves into drawer | 16 px (never below) |

Non-negotiables at every width: no horizontal scroll (`overflow-x: clip` on `body` as a safety net, but fix the cause), tap targets ≥ 44 × 44 px, headings wrap with `text-wrap: balance`, no element wider than its container (`max-width: 100%` on media, `min-width: 0` on grid children).

---

## 3. Section-by-section specifications

### 3.1 Header & navigation

| Range | Layout | Notes |
|---|---|---|
| ≥ 1440 / 1024–1439 | Row: logo (160 × 40) · nav links (centred or left of CTA, 12 px padding each, dropdown for Services) · phone link with icon · primary "Book online" button (48 px). Utility bar above (40 px: rating badge, "Australian owned", opening hours) collapses when compact. | Full nav fits comfortably from 1024 px with 7 items at 15 px; if more items are needed, move secondary items (NDIS, Blog) into a "More" dropdown below 1180 px. |
| 768–1023 | Logo · phone icon-button (44 px) · "Book" primary button (44 px, label only ≥ 900 px else icon) · hamburger (44 px). Sticky. | Reference hides everything but logo/cart/search/burger and is not sticky; we keep the conversion actions visible. |
| 375–767 | Logo (max 140 px) · phone icon-button · hamburger. Sticky, 64 px. Drawer from right `min(84vw, 360px)` with staggered links, nested Services accordion, and a pinned bottom block: full-width "Book online" + phone number. | |
| 320–374 | Logo (max 120 px) · hamburger only; phone lives in the drawer bottom block. | Keeps 16 px gutters without crowding. |

Overflow risk: long nav labels at 1024–1100 px — set `white-space: nowrap` and test; use a "More" overflow item rather than letting links wrap to two lines.

### 3.2 Hero (home)

| Range | Spec |
|---|---|
| ≥ 1440 | Height `min(88vh, 820px)`, `min-height 640px`. Content left-aligned in a 7/12 column (max 640 px): eyebrow (optional), H1 `display` scale (60 px, max 2–3 lines), lead 20 px (48ch), trust row (3 inline badges), CTA pair (primary 56 px + outline). Media: background video 16:9 with poster, gradient scrim left→right (`secondary-800` 70 % → 0 %) for legibility, or a right-column 5/12 portrait image (4:5) if video is not used. |
| 1024–1439 | Same composition; height `min(84vh, 760px)`; H1 ≈ 52 px. |
| 768–1023 | Height auto with 96 px top / 80 px bottom padding; content column 10/12 centred-left; H1 ≈ 44 px; trust row wraps to 2 rows; CTAs side-by-side (each ≥ 160 px). Background: poster image only (no video), scrim darkened to 80 % → 20 %. |
| 375–767 | Padding 80 px top / 64 px bottom; H1 36–40 px (3–4 lines), lead 17 px, trust badges 2 per row (chips), CTAs stacked full-width (12 px gap). Background image cropped to 4:5 focus-point right; scrim bottom-up. |
| 320–374 | H1 32–34 px; drop the eyebrow; trust badges 1 per row or a single "4.8★ · Australian owned" line; buttons 44 px tall. |

Rules: author the H1 as text (no `<br>`), limit to ~45 characters; never overlap anything on the hero's bottom edge below 1024 px (the reference's stats strip collides with the buttons at 768 px).

### 3.3 Stats / trust bar (below hero)

| Range | Spec |
|---|---|
| ≥ 1024 | Card (white, `--radius-xl`, `--shadow-md`) pulled up −48 px over the hero edge, 4 equal tiles separated by 1 px dividers: stat number (`stat` scale) + label; or 4 process steps with arrows. Height ≈ 112 px. |
| 768–1023 | Same card, 2 × 2 grid, no overlap (margin-top 0, placed in normal flow with 40 px top padding). |
| 375–767 | 2 × 2 grid of tiles, 16 px gap, numbers 28 px; or a horizontally scrollable snap row (`overflow-x: auto; scroll-snap-type: x mandatory`, each tile 70 % width) if 4 items don't fit cleanly. |
| 320–374 | Single column list, 12 px gap, numbers 26 px. |

### 3.4 Booking / quote form

| Range | Spec |
|---|---|
| ≥ 1024 | Card (max 1040 px, white, `--radius-lg`, 40 px padding) with a 2-column field grid (24 px gap): Name / Phone · Email / Suburb+Postcode · Premises type / System type · Service type (full width, grouped select) · Units (number stepper) / Preferred date · Notes (full width) · consent line · submit (primary, 56 px, right-aligned or full width in the last row). Visible labels above fields. Optionally present as a 3-step stepper: contact → system → schedule. |
| 768–1023 | Same 2-column grid, 20 px gap, card padding 32 px. |
| 375–767 | Single column, 16 px gap, card padding 24 px, inputs 48 px, submit full width (52 px), sticky bottom "Book now" bar optional on service pages. Selects use native pickers (`<select>`), inputs `font-size: 16px` to prevent iOS zoom, `inputmode="tel"/"email"/"numeric"`. |
| 320–374 | Same as mobile; card padding 16 px; label text 13 px. |

Observed reference form: placeholder-only labels, 39 px inputs, 14 px text, 1 × 4 then 1 × 4 then textarea; on mobile it stacks correctly but the submit is a 72 px tall navy slab. Validation/confirmation states Not verified.

### 3.5 Services grid

| Range | Columns | Card | Notes |
|---|---|---|---|
| ≥ 1440 | 4 | Vertical: illustration 140 px, title 22 px, 1-line description, link-arrow; padding 28/24; min-height equalised by grid | 8 system cards = 2 rows; "Installation & repair" rendered as a 2-up wide-card row below (or as a tabbed/segmented list "Cleaning | Installation | Repair"). |
| 1024–1439 | 4 | Illustration 120 px, title 20 px | Gap 24 px. |
| 768–1023 | 3 (or 2 if descriptions are kept) | Illustration 104 px, title 18 px | 20 px gap; last row centres leftover cards via `justify-items`. |
| 375–767 | 2 (compact variant) | Horizontal row card: 56 px icon left, title 16 px, chevron right; min-height 72 px; padding 12/16 | Tap target ≥ 44 px (reference tiles are 63 px tall but visually cramped at 126 px wide with 12 px text). Alternatively 1 column with description visible if copy matters more than density. |
| 320–374 | 1 | Same compact row, full width | Avoids 2-column squeeze at 144 px per card. |

Overflow risks: long titles ("Under-ceiling cassette cleaning") wrap to 3 lines at 2-col mobile — allow 2 lines with `line-clamp-2` and move the full name to the detail page; illustrations must have `width:100%; height:auto`.

### 3.6 Split sections (reviews, about, CTA band, areas)

| Range | Spec |
|---|---|
| ≥ 1024 | 12-col grid: media 5/12 (4:5 portrait, `--radius-xl`, `object-fit: cover`, focus point set) · text 6/12 with 1 column gutter. Alternate media side section to section. Min-height follows content, not a fixed 720 px (reference photo column is fixed 720 px tall, leaving dead space when the widget fails). |
| 768–1023 | Still 2-col at 6/6 with media 3:4; headings `h2` scale ≈ 36 px; or stack if the text column has > 3 paragraphs. |
| 375–767 | Stack: text first for content sections (about/areas), **media first** for the reviews/CTA band (image sets the mood, 16:10 crop, max-height 280 px). Full-bleed media (negative gutters) allowed for the CTA band only. |
| 320–374 | Same stack; media 4:3, max-height 240 px; buttons stacked. |

Reviews specifically: replace the fixed photo + third-party widget with testimonial cards: 3-up (≥ 1280), 2-up (768–1279), 1.15-up peek carousel (< 768). Reserve the section height (`min-height`) so a slow-loading reviews API never collapses the layout.

### 3.7 Features ("Why choose us")

| Range | Spec |
|---|---|
| ≥ 1024 | Dark `secondary-800` section; 5/12 intro column (eyebrow, H2, lead, CTA pair) + 7/12 feature grid 2 × 3 (icon 40 px in tinted circle, title 18 px, 2-line description), 24 px gap. |
| 768–1023 | Intro full width (centred) → feature grid 2 × 3 (20 px gap). |
| 375–767 | Intro → feature list 1 column; each feature as an icon-left row (icon 40 px, text right) with 20 px spacing; CTA pair stacked full width at the end. Section top padding 64 px (reference has ~190 px of dead space here on mobile). |
| 320–374 | Same; icon 36 px. |

### 3.8 Process steps

| Range | Spec |
|---|---|
| ≥ 1024 | 5 step cards in one row (grid `repeat(5, 1fr)`, 20 px gap), numbered circle, title, 2–3 line description; connector line behind numbers. |
| 768–1023 | 3 + 2 (grid `repeat(3,1fr)`, last row centred) or horizontal snap-scroll row with 240 px cards. |
| 375–767 | Vertical timeline: 40 px number circle left with vertical connector, content right; or 1-column cards 16 px gap. |
| 320–374 | Vertical timeline, number 32 px. |

### 3.9 Pricing cards (service detail pages)

| Range | Spec |
|---|---|
| ≥ 1280 | 4 cards in a row (`repeat(4, minmax(0,1fr))`, 24 px gap), equal heights, featured card elevated (`translateY(-12px)`, `shadow-lg`), price 48 px, inclusion lists 14 px, CTA pinned to card bottom (`margin-top: auto`). |
| 1024–1279 | 4 cards, 20 px gap, price 40 px, padding 24 px; or 2 × 2 if copy is long. |
| 768–1023 | 2 × 2 grid, featured card first in reading order via CSS `order`. |
| 375–767 | 1 column, featured first, 16 px gap; or a horizontal snap carousel with 85 % width cards and dots. Price 40 px. |
| 320–374 | 1 column; inclusion list 13 px; CTA full width 48 px. |

Overflow risk: long inclusion labels + info icons — use `display:flex; gap: 8px; align-items:flex-start` and allow wrapping; info icons become `title` + accessible tooltip on hover/focus (reference icons have no tooltip markup — Not verified).

### 3.10 FAQ

| Range | Spec |
|---|---|
| ≥ 1024 | Narrow container 880 px (centred) for the accordion; optional 4/12 sticky sidebar (`position: sticky; top: calc(var(--header-h) + 24px)`) with a compact booking CTA when combined with long content (replaces the reference's static promo poster). Category tabs as a segmented control above. |
| 768–1023 | Accordion full width; sidebar CTA becomes a banner below the list. |
| 375–767 | Accordion full width; trigger 56 px min-height, text 16 px, icon 20 px right; category tabs become a horizontally scrollable chip row with snap. |
| 320–374 | Same; trigger text 15 px, right padding 40 px reserved for the icon. |

### 3.11 Service areas

| Range | Spec |
|---|---|
| ≥ 1024 | 5/12 column: eyebrow, H2, lead, map illustration (SVG, max 420 px) · 7/12 column: city grid 2 × 4 (city name + 1-line note + "Book in {city}" link), CTA pair below. |
| 768–1023 | Intro + map centred (map max 360 px) → city grid 2 columns. |
| 375–767 | Intro → map (max 280 px, optional, can be hidden on `xs` to save height) → city list 1 column with `MapPin` icon rows (44 px tall) → stacked CTAs. |
| 320–374 | Hide map; city list only. |

### 3.12 CTA band (closing / mid-page)

| Range | Spec |
|---|---|
| ≥ 1024 | Full-bleed `primary-700` (or `secondary-800`) band; inner container 2-col: text + CTA pair (7/12) · image/illustration (5/12, 4:3, may bleed to the band edge). Padding 96 px. |
| 768–1023 | Same 2-col at 7/5; padding 80 px; image 1:1 max 320 px. |
| 375–767 | Stack: text centred, CTAs full width, image hidden or shown above text at 16:9, max 220 px tall. Padding 64 px. |
| 320–374 | Text centred; one primary CTA + phone link as text link. |

### 3.13 Footer

| Range | Spec |
|---|---|
| ≥ 1024 | Dark `secondary-800`: top row brand column (logo, 2-line mission, trust badges) 4/12 + link columns (Services 3/12, Company 2/12, Contact & hours 3/12); second row newsletter (optional) ; bottom bar: © · legal links · payment icons · states served. Padding 80 px / 40 px. |
| 768–1023 | Brand column full width → 3 link columns → bottom bar wraps to 2 lines. |
| 375–767 | Brand → link groups as 2 columns (Services / Company) → Contact block → newsletter (input + full-width button) → bottom bar stacked and centred; link rows 36 px tall. |
| 320–374 | All single column; payment icons wrap; states list as one wrapped line. |

### 3.14 Page banners (internal pages)

| Range | Spec |
|---|---|
| ≥ 1024 | Height 360–420 px (21:9 crop), H1 left in container, breadcrumb above (14 px), optional lead; dark scrim 60 %. Services landing may use the taller home-style hero (≈ 560 px). |
| 768–1023 | Height 300 px (16:9), H1 ≈ 44 px. |
| 375–767 | Height auto, padding 56 px, H1 32–36 px, breadcrumb hidden or truncated; image as background at 4:3 focus point. |
| 320–374 | Padding 48 px, H1 30 px. |

Exactly one banner per page (reference renders two on Book/Contact).

---

## 4. Responsive component behaviour table

| Component | ≥ 1440 | 1024–1439 | 768–1023 | 375–767 | 320–374 |
|---|---|---|---|---|---|
| Header | Full nav + utility bar, sticky/compact | Same | Compact bar + burger + Book, sticky | Bar + burger + phone, sticky | Bar + burger, sticky |
| Mobile drawer | — | — | 360 px from right | `min(84vw,360px)` | 100 % width |
| Dropdown | Hover/focus panel | Same | Inside drawer as accordion | Same | Same |
| Buttons | Inline pairs, 48–56 px | Same | Inline pairs, 48 px | Stacked full width, 48 px | Stacked, 44 px |
| Section heading | Eyebrow / H2 44 px / lead 20 px | H2 40 px | H2 36 px | H2 30 px | H2 28 px |
| Service card | Vertical, 4-col | Vertical, 4-col | Vertical, 3-col | Compact row, 2-col | Compact row, 1-col |
| Price card | 4-col | 4-col | 2-col | 1-col / carousel | 1-col |
| Step card | 5-col row | 5-col | 3+2 or scroll | Vertical timeline | Vertical timeline |
| Testimonial | 3-up | 3-up (2-up < 1280) | 2-up | 1.15-up peek | 1-up |
| Accordion | 880 px + sidebar | 880 px | Full width | Full width | Full width |
| Inputs | 2-col grid, 48 px | 2-col | 2-col | 1-col, 48 px, 16 px text | 1-col |
| Select | Custom listbox | Custom | Native | Native | Native |
| Stat tile | 4 inline | 4 inline | 2 × 2 | 2 × 2 | 1-col |
| Image (split) | 4:5, 5/12 col | 4:5 | 3:4, 6/12 | 16:10 full width | 4:3 |
| Page banner | 21:9, 400 px | 21:9, 380 px | 16:9, 300 px | auto, 56 px pad | auto, 48 px pad |
| Footer | 4-col | 4-col | 1 + 3 | 2-col links | 1-col |
| Sticky mobile CTA (optional) | — | — | — | Bottom bar 56 px: "Book" + "Call" | Same |

---

## 5. Tailwind breakpoint usage guide

Breakpoints (from `02`): `xs 375 · sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1440`. Mobile-first: base styles target 320 px, then override upward.

```tsx
// Container
<div className="mx-auto w-full max-w-[1240px] px-4 md:px-6 lg:px-8">…</div>

// Section
<section className="py-14 xs:py-16 md:py-20 lg:py-24 2xl:py-32">…</section>

// Service grid
<ul className="grid grid-cols-1 gap-3 xs:grid-cols-2 xs:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">…</ul>

// Split section (media first on mobile for CTA/reviews)
<div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
  <div className="order-1 lg:order-2 lg:col-span-5"><Image … className="aspect-[16/10] lg:aspect-[4/5] object-cover rounded-xl" /></div>
  <div className="order-2 lg:order-1 lg:col-span-6 lg:col-start-1">…</div>
</div>

// Button pair
<div className="flex flex-col gap-3 xs:flex-row xs:gap-4 [&>*]:w-full xs:[&>*]:w-auto">…</div>

// Fluid heading (defined once in globals.css, used as a utility)
.h2 { font-size: clamp(1.75rem, 1.3rem + 1.8vw, 2.75rem); line-height: 1.15; text-wrap: balance; }

// Form grid
<form className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 [&_.full]:sm:col-span-2">…</form>

// Hide decorative map on small screens
<MapIllustration className="hidden xs:block max-w-[280px] md:max-w-[360px] lg:max-w-[420px]" />
```

Conventions:

- Use `xs:` (375) only for the 320→375 adjustments (2-column grids, button rows); everything else keys off `sm/md/lg`.
- Never use `sm:` for the desktop nav switch — nav switches at `lg` (1024), matching the observed hamburger breakpoint.
- Prefer `clamp()` for type and `gap`/`padding` tokens over per-breakpoint font classes; keep breakpoint classes for structure (columns, order, visibility).
- `next/image` `sizes` must mirror the grid: e.g. service illustration `sizes="(min-width:1024px) 140px, (min-width:375px) 56px, 56px"`; split image `sizes="(min-width:1024px) 42vw, 100vw"`.
- Use `min-w-0` on grid/flex children that contain long text; `break-words` on user-generated content.

---

## 6. Accessibility considerations

- **Tap targets**: every interactive element ≥ 44 × 44 px (buttons 44–56 px, nav rows 44 px, footer links 36 px row height with 44 px hit area via padding, accordion triggers 56 px). The reference's mobile service tiles (126 × 63 px with 12 px text) and 18 px hamburger icon fail this.
- **Skip link**: first focusable element "Skip to content" → `<main id="content">`, visible on focus.
- **Landmarks**: one `<header>`, `<nav aria-label="Primary">`, `<main>`, `<footer>`, `<nav aria-label="Footer">`; sections with `aria-labelledby` pointing at their H2.
- **Focus order**: DOM order equals visual order; when CSS `order` reorders media/text on mobile, keep the text (with the heading) before the image in DOM when the image is decorative, and vice-versa only if the image carries the heading.
- **Sticky header**: `scroll-padding-top` on `html` equal to header height so anchor targets and focused fields are not hidden.
- **Reduced motion**: all motion falls back to ≤ 200 ms opacity (see 03); carousels stop autoplay.
- **Colour contrast**: body `#403F4B` on white 10.3:1; white on `primary-500` 7.3:1; white on `secondary-500` 11.8:1; muted text `#6B6F7A` on white 5.0:1 (AA at 16 px). Avoid the reference's `#808080` placeholders (3.9:1) and eyebrow pink at 12 px on pink tints — verify any re-skinned palette with the same pairs.
- **Forms**: visible `<label for>` on every field; required marked in text and `aria-required`; errors tied with `aria-describedby`; `autocomplete` attributes (`name`, `tel`, `email`, `postal-code`); `inputmode` set; error summary with focus moved to it on submit failure.
- **Zoom**: layout must work at 200 % browser zoom (≈ 640 px effective width at 1280) and 400 % (≈ 320 px) — the mobile layouts above cover this; no fixed heights on text containers; no `user-scalable=no`.
- **Images**: meaningful `alt` for photos that convey trust (technicians, before/after), empty `alt` for decorative illustrations; icons `aria-hidden` with adjacent text.
- **Carousel & drawer**: see 03 §C.12.
- **Language**: `lang="en-AU"`; phone links as `tel:` with spaced display text.

---

## 7. QA checklist (run at 320, 375, 414, 640, 768, 834, 1024, 1280, 1440, 1920)

**Layout**
- [ ] No horizontal scrollbar at 320 px (`document.documentElement.scrollWidth === innerWidth`).
- [ ] No heading clipped, overlapped or broken mid-word; no `<br>` in headings.
- [ ] Hero bottom edge: nothing overlaps the CTAs at 768–1023 px (reference bug).
- [ ] Exactly one page banner per internal page.
- [ ] All content respects gutters — nothing touches the viewport edge except intentional full-bleed media.
- [ ] Section rhythm consistent (64/80/96 px); no dead space > 120 px between sections.

**Components**
- [ ] Buttons stack full-width < 480 px and never truncate labels; pairs stay side-by-side ≥ 480 px.
- [ ] Service tiles ≥ 44 px tall with ≥ 16 px titles on mobile; whole tile is the link.
- [ ] Price cards equal height per row; CTA aligned to the bottom; featured card first on mobile.
- [ ] Accordion panels animate without jumping; only one open by default; keyboard operable.
- [ ] Drawer: opens/closes with trap, `Escape`, overlay tap; body scroll locked; CTA visible at the bottom on a 568 px tall viewport (iPhone SE landscape not required).
- [ ] Header sticky at every width, compact state has no layout jump (use `sticky`, not `fixed`).

**Media**
- [ ] Images never stretched (`object-fit: cover`) and never upscaled beyond intrinsic width; `sizes` matches layout (check Network panel for over-fetching).
- [ ] Aspect-ratio boxes reserve space → CLS < 0.05 on every page (Lighthouse).
- [ ] Hero video not loaded < 768 px or on `saveData`; poster shows instantly.
- [ ] Lazy images fade in; no blank regions during scroll.

**Forms**
- [ ] Single column < 640 px; inputs 48 px; `font-size ≥ 16px` on iOS (no zoom on focus).
- [ ] Native select on touch; custom listbox on desktop keyboard-operable.
- [ ] Validation errors visible without hover; success state keeps layout height.

**Typography & a11y**
- [ ] Fonts loaded with `next/font` (`display: swap`, size-adjust) → no FOUT jump, no CLS.
- [ ] Contrast AA for every token pair after branding is applied.
- [ ] 200 % zoom usable; 400 % zoom readable in one column.
- [ ] `prefers-reduced-motion` honoured (Chrome DevTools → Rendering → emulate).
- [ ] Tab through the whole page: visible focus everywhere, order logical, skip link first.
