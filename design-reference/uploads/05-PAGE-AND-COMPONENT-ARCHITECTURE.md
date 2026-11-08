# 05 — Page & Component Architecture

Recommended information architecture, routing and component inventory for the new Australian AC cleaning and servicing website. Built for Next.js App Router + TypeScript + Tailwind + Motion + Lucide. Tokens and component styling rules are defined in `02-DESIGN-SYSTEM.md`; motion specs live in `03-ANIMATIONS-AND-INTERACTIONS.md`; breakpoint behaviour in `04-RESPONSIVE-BLUEPRINT.md`.

Legend: **[Observed]** = seen on the reference (seanmas.com.au); **[Proposed]** = our recommendation.

---

## 1. Reference IA vs proposed IA

### 1.1 Observed reference navigation

| Location | Items [Observed] |
|---|---|
| Top bar (desktop only) | Phone "get a quote" block · rating badge · Afterpay · Zip · NDIS badge · cart icon · search icon |
| Main nav | Home · About · Services · Shop ▾ (How to use) · NDIS · FAQ · Blog · Contact · **Book Appointment** (navy block) |
| Mobile drawer | Same list, right off-canvas, submenu toggle for Shop, no CTA button inside the drawer |
| Footer | Brand band (logo + mission) · states strip + ABN · Quick Links (About, Services, Spaces, Blog) · Support (FAQ, Contact, Book Appointment, Franchise) · Follow Us · Newsletter · legal bar (Cookies, Privacy, Terms, copyright, payment logos) |

Observed structural problems to avoid:

- The homepage contains **four separate "book now" CTA bands** (Why-choose buttons, wine CTA band, signs section buttons, areas buttons) plus an inline booking form — repetition dilutes conversion.
- Book Appointment and Contact pages render **two stacked page banners** (a template banner plus a page-level banner).
- About page content sits flush against the viewport edge (no container gutter).
- Franchise recruitment, retail shop and "best selling products" sections appear on *every* page, including service pages, pulling attention away from booking.
- Services are listed by unit type only; residential vs commercial is a separate circular-photo carousel ("Select your preferred service") with weak discoverability.

### 1.2 Proposed site map [Proposed]

```
/                                  Home
/services                          Services hub (all unit types + installation/repair)
/services/split-system-cleaning    Service detail (one per unit type)
/services/ducted-system-cleaning
/services/cassette-cleaning
/services/under-ceiling-cassette-cleaning
/services/bulkhead-system-cleaning
/services/window-box-unit-cleaning
/services/portable-aircon-cleaning
/services/external-condenser-cleaning
/services/aircon-installation
/services/aircon-repair
/sectors                           Who we serve (optional hub; can redirect to /services#sectors)
/sectors/residential
/sectors/commercial                (strata, offices, schools, gyms, aged care, hospitality as sub-sections or further slugs)
/pricing                           Optional: all packages in one comparison table
/about
/service-areas                     Hub with map + city list
/service-areas/brisbane            One per city/region
/faq
/contact
/book                              Booking / quote request (single page, no duplicate banner)
/blog, /blog/[slug]                Optional content marketing
/privacy, /terms                   Legal
/thank-you                         Post-booking confirmation (also used for analytics goals)
```

Explicitly **excluded** unless the client needs them: `/shop` (e-commerce), `/ndis`, `/franchise`, `/how-to-use`. If NDIS is a real offering, present it as a trust badge + FAQ entry + sector sub-section, not a top-level nav item.

### 1.3 Keep / merge / drop decisions

| Reference element | Decision | Rationale |
|---|---|---|
| Hero with background video + two CTAs + trust line | **Keep (refine)** | Strongest pattern on the reference; add real trust badges and a quieter overlay. |
| Stats + 4-step process strip under hero | **Keep (merge)** | Merge the stat tile and process steps into one `TrustBar` + a dedicated `ProcessSteps` section; fix the tablet overlap. |
| Inline booking form on homepage | **Keep (simplify)** | Shorten to 4 fields (name, phone, suburb, unit type) that hands off to `/book` with prefilled values. |
| Service cards by unit type | **Keep** | Core discovery pattern; use `ServiceGrid`. |
| Google reviews widget | **Keep (own component)** | Third-party embed failed to render during inspection; use a server-fetched review feed or static testimonials in `ReviewCard`s. |
| About blurb + "100% Australian" badge | **Merge** | Fold into `WhyUs` with badges; full story on `/about`. |
| Technician photo strip | **Keep (optional)** | Becomes `MediaStrip`, one instance only. |
| Why choose us (navy) | **Keep** | `WhyUs` section with icon features. |
| "Select your preferred service" carousel | **Merge** | Becomes `SectorGrid` (residential / commercial sectors) with proper links. |
| Wine CTA band with technician photo | **Keep (once per page)** | Single `QuoteCTA` before the footer. |
| Deep clean maintenance vs restoration explainer | **Keep (move)** | Lives on service pages and `/pricing` as `PackageCompare`; homepage gets a short teaser. |
| Best-selling products | **Drop** | Outside scope. |
| Franchise band | **Drop** | Outside scope. |
| Signs your aircon needs a clean | **Keep** | Good educational content; render as `SignsList` with a sidebar-free layout. |
| Sidebar promo poster + Messenger "Need help" | **Drop / replace** | Replace with a single floating `StickyCTA` on mobile and a chat/phone button if a live channel exists. |
| Areas we serve with map | **Keep** | `ServiceAreas` section + `/service-areas` pages. |
| Duplicate page banners | **Drop** | One `PageBanner` per page, rendered by the route layout. |
| Footer newsletter | **Optional** | Keep only if there is a real mailing programme; otherwise replace with contact details + hours. |

### 1.4 Proposed navigation [Proposed]

Header: Logo · Services ▾ (mega dropdown: unit types in two columns + installation/repair + "Not sure? Get a recommendation" link) · Residential · Commercial · Pricing · Service areas · About · More ▾ (FAQ, Blog, Contact) · **Call 1300 xxx xxx** (ghost, desktop ≥1280) · **Book online** (primary button).

Mobile drawer: same items as an accordion list, with **Book online** and **Call** buttons pinned at the bottom of the drawer [Proposed — reference drawer has no CTA].

Footer: Column 1 brand + short mission + trust badges; Column 2 Services (10 links); Column 3 Company (About, Service areas, Pricing, FAQ, Blog, Contact); Column 4 Contact (phone, email, hours, states served) + social icons. Legal bar: ABN, © year, Privacy, Terms, payment method icons (optional).

---

## 2. Project file tree

```
app/
  layout.tsx                      # fonts, <Header/>, <Footer/>, skip link, JSON-LD Organization
  page.tsx                        # Home
  globals.css                     # tokens from 02-DESIGN-SYSTEM.md
  not-found.tsx
  sitemap.ts · robots.ts
  (marketing)/
    services/page.tsx
    services/[slug]/page.tsx      # generateStaticParams from content/services.ts
    sectors/page.tsx
    sectors/[slug]/page.tsx
    pricing/page.tsx
    about/page.tsx
    service-areas/page.tsx
    service-areas/[city]/page.tsx
    faq/page.tsx
    contact/page.tsx
    blog/page.tsx · blog/[slug]/page.tsx
    privacy/page.tsx · terms/page.tsx
  book/
    page.tsx                      # booking form page
    actions.ts                    # server action: validate + email/CRM
    thank-you/page.tsx
  api/
    reviews/route.ts              # optional: cached Google reviews fetch
components/
  ui/                             # primitives, no business logic
    Button.tsx · IconButton.tsx · Badge.tsx · Card.tsx · Container.tsx
    Input.tsx · Select.tsx · Textarea.tsx · Checkbox.tsx · FormField.tsx
    Accordion.tsx · Tabs.tsx · Carousel.tsx · Dialog.tsx · Tooltip.tsx
    Skeleton.tsx · Breadcrumbs.tsx · StarRating.tsx
  layout/
    Header.tsx · TopBar.tsx · DesktopNav.tsx · MegaDropdown.tsx
    MobileDrawer.tsx · Footer.tsx · StickyCTA.tsx · SkipLink.tsx
  sections/                       # composed, page-agnostic blocks
    Hero.tsx · PageBanner.tsx · SectionHeading.tsx
    TrustBar.tsx · StatTile.tsx · ProcessSteps.tsx · StepCard.tsx
    ServiceGrid.tsx · ServiceCard.tsx · SectorGrid.tsx · SectorCard.tsx
    PackageCompare.tsx · PriceCard.tsx · PricingTable.tsx
    WhyUs.tsx · FeatureItem.tsx
    Reviews.tsx · ReviewCard.tsx · ReviewSummary.tsx
    SignsList.tsx · MediaStrip.tsx · VideoFeature.tsx · SplitContent.tsx
    ServiceAreas.tsx · AreaCard.tsx · MapIllustration.tsx
    FaqSection.tsx · QuoteCTA.tsx · RelatedServices.tsx
    BookingForm/ (index.tsx, StepContact.tsx, StepService.tsx, StepReview.tsx, schema.ts, useBookingForm.ts)
    QuickQuoteForm.tsx            # 4-field homepage variant
  motion/
    Reveal.tsx · Stagger.tsx · CountUp.tsx · variants.ts · useReducedMotion.ts
lib/
  seo.ts                          # metadata helpers, JSON-LD builders
  site.ts                         # phone, email, hours, ABN, social URLs, service states
  utils.ts · cn.ts
  validation/booking.ts           # zod schema shared by client + server action
content/
  services.ts · packages.ts · process.ts · sectors.ts · areas.ts
  faqs.ts · testimonials.ts · features.ts · nav.ts
public/
  illustrations/ (unit-type SVGs) · images/ · video/
```

Content is typed TypeScript data (not CMS) for v1; the interfaces in §7 make a later move to Sanity/Contentful straightforward.

---

## 3. Shared components

### 3.1 Layout

| Component | Spec |
|---|---|
| `Container` | `max-w-[var(--container-max)]`, gutters 16/24/32 px; `size="narrow"|"default"|"wide"` props. |
| `SkipLink` | "Skip to content" visible on focus, first element in `<body>`. |
| `TopBar` | 40 px, `surface-1` bg, hidden below 1024 px [Observed: reference top bar is 72 px and hidden on tablet/mobile]. Left: hours + phone; right: 2–3 compact trust badges (rating, Australian owned, insured). Scrolls away with the page. |
| `Header` | 80 px → 64 px on scroll, sticky on **all** breakpoints [Observed: reference nav becomes `position: fixed` on desktop via a `fixed` class, but is not sticky on mobile]. White bg + `shadow-sm` when scrolled; optional transparent variant over the hero (`variant="overlay"`). Contains Logo, `DesktopNav` (≥1024), phone ghost button (≥1280), `Button primary` "Book online", `IconButton Menu` (<1024). |
| `DesktopNav` | Items from `content/nav.ts`; hover underline (02 §5.2); dropdown on hover + focus/`Enter`, closes on `Esc`/outside click. |
| `MegaDropdown` | Services panel: two columns of unit types with 32 px illustrations, third column "Installation & repair" + a "Not sure which clean you need?" link to `/book`. Max width 720 px, anchored under the trigger. |
| `MobileDrawer` | Right off-canvas panel 85 % width (max 360 px), `Dialog` semantics, focus trapped, body scroll locked, `Esc` closes [Observed: reference uses a right panel with 0.25 s transform + overlay, close "X" top right]. Nested groups as accordion. Bottom-pinned CTA row (Book online, Call). |
| `Footer` | 4-column grid on ≥1024, 2-column on 768, stacked on mobile; dark `secondary-800` bg [Observed: reference uses a pink brand band + white columns]. Legal bar below a 1 px `rgba(255,255,255,.12)` divider. |
| `StickyCTA` | Mobile-only (<1024) bottom bar: "Call" (secondary) + "Book online" (primary), 56 px tall, appears after the hero scrolls out (see 03). Replaces the reference's sidebar promo posters. |
| `Breadcrumbs` | `nav aria-label="Breadcrumb"`, `ChevronRight` separators, on all inner pages below the `PageBanner` [Observed: reference prints breadcrumbs inside the services banner at low contrast]. |

### 3.2 UI primitives

| Component | Notes |
|---|---|
| `Button` | Variants `primary | secondary | outline | ghost | link`; sizes `sm | md | lg`; `icon` + `iconPosition`; renders `<a>` when `href` is set. |
| `Badge` | `tone="neutral | primary | success | onDark"`; optional icon. Used in `TrustBar`, pricing "Most popular", banners. |
| `Card` | Base surface with `padding`, `interactive` (adds hover lift) and `tone="light | dark | tint"` props; all card variants compose this. |
| `Input / Select / Textarea / Checkbox / FormField` | `FormField` wraps label, control, hint, error; ids wired for `aria-describedby`. `Select` supports `<optgroup>` for grouped unit types. |
| `Accordion` | Radix-style (`@radix-ui/react-accordion` or in-house); `type="single" collapsible` default. |
| `Tabs` | For FAQ categories and residential/commercial toggles. |
| `Carousel` | Embla-based; `slidesPerView` responsive; arrows + dots; swipe; pauses autoplay on hover/focus; respects reduced motion. |
| `Dialog` | For video lightbox ("Watch how we work") [Observed: reference opens YouTube in a new tab instead]. |
| `StarRating` | 5 Lucide stars, `value` 0–5 with half support, `aria-label="4.8 out of 5"`. |
| `Tooltip` | Inclusion explanations on price cards [Observed: reference shows "i" icons on package inclusions; behaviour not verified]. |

### 3.3 Section components (page-agnostic)

| Component | Anatomy | Data |
|---|---|---|
| `Hero` | Full-bleed media (video with poster, or image) + gradient scrim; eyebrow, H1 (display token), lead, CTA pair, trust line of 3 badges; optional `QuickQuoteForm` card on the right at ≥1280 | `site.ts`, `features.ts` |
| `PageBanner` | 21:9 (desktop) / 4:3 (mobile) image with navy-to-primary gradient scrim, H1 left-aligned, optional lead, breadcrumbs below | page props |
| `SectionHeading` | eyebrow + H2 + lead, `align`, `tone` (02 §5.10) | props |
| `TrustBar` | Row of 4 `StatTile`s or badges (units serviced, rating, years, insured) on `surface-1`; overlaps hero bottom by 40 px on desktop only | `features.ts` |
| `ProcessSteps` | 4–5 `StepCard`s with connector line; `tone="dark"` variant | `process.ts` |
| `ServiceGrid` | `SectionHeading` + 4-col grid of `ServiceCard`s; `compact` prop for mobile rows; optional second group (installation/repair) | `services.ts` |
| `SectorGrid` | 2 large `SectorCard`s (Residential / Commercial) with sub-sector chips (strata, offices, schools, gyms, aged care, hospitality) | `sectors.ts` |
| `PackageCompare` | 2–4 `PriceCard`s side by side + "Not sure? We recommend after inspection" note | `packages.ts` filtered by service |
| `PricingTable` | Matrix: packages × unit types, used on `/pricing` | `packages.ts` |
| `WhyUs` | Split: left heading + copy + CTA pair, right 2×3 `FeatureItem` grid (icon, title, 1 line) | `features.ts` |
| `Reviews` | `ReviewSummary` (big rating, star row, count, Google badge) + `Carousel` of `ReviewCard`s | `testimonials.ts` or `/api/reviews` |
| `SignsList` | Heading + 5 numbered rows (title / description) + disclaimer + single CTA | `content/signs.ts` |
| `MediaStrip` | 4–6 square photos edge-to-edge, optional captions | props |
| `VideoFeature` | Split: 16:9 video thumbnail with play button → `Dialog`; right copy + CTA | props |
| `SplitContent` | Generic text/media 6/6 or 5/7 with `mediaSide` | props |
| `ServiceAreas` | Split: `MapIllustration` (SVG states with highlighted regions and city pins) + `AreaCard` list | `areas.ts` |
| `FaqSection` | `SectionHeading` + `Accordion`; `category` filter; emits `FAQPage` JSON-LD | `faqs.ts` |
| `QuoteCTA` | Full-bleed `primary-700` or `secondary-800` band; photo left (4:5), heading + 2 bullets + CTA pair right | props |
| `RelatedServices` | 3 `ServiceCard`s excluding current | `services.ts` |
| `BookingForm` | See §6 | `validation/booking.ts` |
| `QuickQuoteForm` | 4 fields → redirects to `/book?name=&phone=&suburb=&unit=` | same schema subset |

---

## 4. Page compositions

### 4.1 Home (`/`)

1. `Header` (overlay variant) + `TopBar`
2. `Hero` — video background, H1, lead, CTA pair (Book online / Watch how we work), 3 trust badges
3. `TrustBar` — 4 stat tiles overlapping hero [Observed pattern, fixed overlap]
4. `ServiceGrid` — 8 unit types + 2 (installation, repair)
5. `SectorGrid` — Residential / Commercial
6. `ProcessSteps` — "How a deep clean works" (5 steps, dark tone)
7. `PackageCompare` teaser — Maintenance vs Restoration, 2 cards, link to `/pricing`
8. `WhyUs` — 6 features + badges
9. `Reviews` — summary + carousel
10. `SignsList` — when to book
11. `ServiceAreas` — map + cities
12. `FaqSection` — top 6 FAQs
13. `QuoteCTA` — single closing band
14. `Footer`

Homepage length target: 11–13 sections, ≈ 7,500–8,500 px on desktop (reference is 11,000+ px with 17 sections).

### 4.2 Services hub (`/services`)

`PageBanner` → `Breadcrumbs` → `ServiceGrid` (full) → `PackageCompare` (generic) → `ProcessSteps` → `VideoFeature` → `WhyUs` (compact) → `Reviews` → `FaqSection` (services category) → `QuoteCTA`.

### 4.3 Service detail template (`/services/[slug]`)

[Observed reference order: banner → stat + trust strip → intro split → 4 pricing cards → photo → process steps on navy → video band → why choose (icons) → reviews → service vs clean explainer → FAQ → franchise band.] Proposed:

1. `PageBanner` (service hero image, H1 from `service.title`, lead from `service.summary`)
2. `Breadcrumbs`
3. `TrustBar` (compact, 3 badges)
4. `SplitContent` — intro: what the service is, what it removes, who it suits; media 4:5 photo
5. `PackageCompare` — packages filtered to this unit type (2–4 `PriceCard`s), add-on notes, price disclaimer
6. `ProcessSteps` — service-specific steps (dark tone)
7. `VideoFeature` — optional, only if a real video exists
8. `WhyUs` (compact variant, 4 features)
9. `Reviews` — filtered by `service.slug` tag if available, else global
10. `FaqSection` — `faqs.filter(f => f.services.includes(slug))`
11. `RelatedServices` — 3 cards
12. `QuoteCTA` — prefilled `unitType` query param
13. JSON-LD `Service` + `FAQPage`

### 4.4 Sector template (`/sectors/[slug]`)

`PageBanner` → `Breadcrumbs` → `SplitContent` (sector needs, compliance notes e.g. commercial scheduling after-hours) → `ServiceGrid` (filtered to relevant unit types, e.g. ducted + cassette for commercial) → `ProcessSteps` (compact) → `Reviews` (filtered by sector tag) → `FaqSection` (sector category) → `QuoteCTA` (prefilled `premises`).

Sub-sectors (schools, gyms, aged care, hotels, offices, strata, vehicles) render as `SectorCard` chips inside `/sectors/commercial` rather than as separate routes until content justifies it.

### 4.5 Pricing (`/pricing`, optional)

`PageBanner` → `Tabs` (Split · Ducted · Cassette · Other) → `PricingTable` or per-tab `PackageCompare` → inclusions legend → add-ons list → `FaqSection` (pricing) → `QuoteCTA`.

### 4.6 About (`/about`)

`PageBanner` → `SplitContent` (story) → `TrustBar` → `ProcessSteps` ("Our standards") → `WhyUs` → `MediaStrip` (team/technicians) → `ServiceAreas` (compact) → `QuoteCTA`. [Observed: reference About page has a long numbered "chapters" story and layout gutter bugs; keep the story short and inside `Container size="narrow"`.]

### 4.7 Service areas (`/service-areas`, `/service-areas/[city]`)

Hub: `PageBanner` → `ServiceAreas` (full map) → grid of `AreaCard`s → `FaqSection` (areas) → `QuoteCTA`.
City: `PageBanner` → `Breadcrumbs` → `SplitContent` (climate note, suburbs served list) → `ServiceGrid` → `Reviews` (filtered by city) → `FaqSection` → `QuoteCTA`. JSON-LD `LocalBusiness` with `areaServed`.

### 4.8 FAQ (`/faq`)

`PageBanner` (short) → `Tabs` (Services · Pricing · Booking · Aftercare) → `Accordion` per tab inside `Container size="narrow"` → `QuoteCTA`. [Observed: reference has Services/Products tabs, 36 items and a promo sidebar; drop the sidebar.]

### 4.9 Contact (`/contact`)

`PageBanner` (single) → 3 `Card`s (Call · Email · Hours) → `SplitContent` (map illustration or embedded map + short contact form: name, email, phone, message) → `FaqSection` (booking) → `QuoteCTA` with phone only (no second form).

### 4.10 Book (`/book`)

`PageBanner` (short, "Book a clean") → two-column: `BookingForm` (7/12) + side panel (5/12: what happens next 3 steps, trust badges, phone fallback) → `Reviews` (compact 3 cards). No `QuoteCTA` (the page *is* the CTA). `/book/thank-you`: confirmation copy, booking summary, "add to calendar" optional, related reading.

---

## 5. Component reuse map

| Component | Home | Services | Service detail | Sector | Pricing | About | Areas | FAQ | Contact | Book |
|---|---|---|---|---|---|---|---|---|---|---|
| Header / Footer / StickyCTA | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| Hero | ● | | | | | | | | | |
| PageBanner + Breadcrumbs | | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| TrustBar | ● | | ● | | | ● | | | | ● (side) |
| ServiceGrid | ● | ● | | ● | | | ● | | | |
| SectorGrid | ● | | | | | | | | | |
| ProcessSteps | ● | ● | ● | ● | | ● | | | | |
| PackageCompare / PricingTable | ● | ● | ● | | ● | | | | | |
| WhyUs | ● | ● | ● | | | ● | | | | |
| Reviews | ● | ● | ● | ● | | | ● | | | ● |
| SignsList | ● | | | | | | | | | |
| VideoFeature | | ● | ● | | | | | | | |
| ServiceAreas / AreaCard | ● | | | | | ● | ● | | | |
| FaqSection | ● | ● | ● | ● | ● | | ● | ● | ● | |
| QuoteCTA | ● | ● | ● | ● | ● | ● | ● | ● | ● | |
| BookingForm / QuickQuoteForm | ● (quick) | | | | | | | | | ● |

Rule: at most **one** `QuoteCTA` and **one** form per page.

---

## 6. Booking / quote components

### 6.1 Observed reference form

[Observed] Contact Form 7 form with: Name, Mobile No, Address, Email, Type of Premises (select, 10 options), Type of Service (select, 19 ungrouped options with unit type in parentheses), Aircon Type (select, 8 options), Aircon Units, Important Note (textarea), submit. Only Name and Aircon Units are marked required. Placeholder-only labels; validation and confirmation state **not verified** (form not submitted). Appears as a 4-column card on the homepage, a narrow stacked card on About, and a 900 px centred form on `/book-appointment`.

### 6.2 Proposed `BookingForm` [Proposed]

Single page, three visual steps with a progress indicator; all steps exist in the DOM for progressive enhancement, but Motion animates between them. Fallback: plain stacked form if JS fails.

**Step 1 — Your unit**

| Field | Control | Rules |
|---|---|---|
| `premises` | Segmented control: Residential / Commercial / Other | required |
| `unitType` | Card radio group with illustrations (8 types) | required |
| `unitCount` | Number stepper 1–20 (text input for >20) | required, integer ≥1 |
| `package` | Radio: Maintenance / Restoration / Not sure (recommend on inspection) | required, default "Not sure" |
| `addOns` | Checkboxes (external condenser, sanitise-only, etc.) | optional |

Selecting a `unitType` filters available `package` options (replaces the reference's 19-option flat select).

**Step 2 — Where & when**

| Field | Control | Rules |
|---|---|---|
| `address` | Text with autocomplete (optional Google Places); separate `suburb`, `state`, `postcode` | required; postcode 4 digits; state in served list else show "call us" notice |
| `preferredDate` | Date input (min = tomorrow, max = +60 days) | optional |
| `preferredTime` | Radio: Morning / Afternoon / Any | optional |
| `notes` | Textarea, 500 chars | optional |

**Step 3 — Your details**

| Field | Control | Rules |
|---|---|---|
| `name` | Text | required, 2–80 chars |
| `phone` | Tel | required, AU mobile/landline regex `^(\+?61|0)[2-478]\d{8}$` after stripping spaces |
| `email` | Email | required, RFC-ish |
| `contactMethod` | Radio: Call / SMS / Email | optional |
| `consent` | Checkbox: privacy acknowledgement | required |

Review summary block (unit, package, suburb, date) sits above the submit button on step 3; "Edit" links jump back.

### 6.3 Validation & submission

- Shared `zod` schema in `lib/validation/booking.ts`; client validates on blur + submit; server action re-validates.
- Server action `app/book/actions.ts`: validate → spam checks (honeypot field, time-to-submit ≥ 3 s, optional Cloudflare Turnstile) → send email via Resend/SES and/or POST to CRM → return `{ ok, bookingRef }` → `redirect('/book/thank-you?ref=…')`.
- Error state: inline field errors + summary alert at top (`role="alert"`), focus moves to first invalid field.
- Pending state: submit button shows spinner, form fields `aria-busy`.
- Success state: `/book/thank-you` with reference number, what-happens-next steps, phone fallback. Also fire analytics event `booking_submitted`.
- `QuickQuoteForm` (home): name, phone, suburb, unitType → `router.push('/book?…')`; no server call.
- Prefill: `/book` reads `unit`, `premises`, `package` search params (from `QuoteCTA` and service pages).
- Optional calendar integration (phase 2): replace `preferredDate` with real availability slots from the dispatch system.

### 6.4 Accessibility

Visible labels on every field; `autocomplete` attributes (`name`, `tel`, `email`, `street-address`, `postal-code`); fieldsets with legends for radio groups; step changes announce via `aria-live="polite"`; no placeholder-only labels [Observed weakness].

---

## 7. Content models (TypeScript)

```ts
// content/types.ts
export type UnitType =
  | "split-system" | "ducted" | "cassette" | "under-ceiling-cassette"
  | "bulkhead" | "window-box" | "portable" | "external-condenser";

export interface Service {
  slug: string;                 // "split-system-cleaning"
  unitType?: UnitType;          // undefined for installation / repair
  kind: "cleaning" | "installation" | "repair";
  title: string;
  shortTitle: string;           // card label
  summary: string;              // ≤160 chars, also meta description
  intro: { heading: string; body: string[]; image: ImageRef };
  illustration: string;         // /illustrations/split.svg
  heroImage: ImageRef;
  packageIds: string[];
  processIds: string[];
  faqIds: string[];
  relatedSlugs: string[];
  video?: { provider: "youtube" | "file"; id: string; poster: ImageRef };
  seo?: { title?: string; description?: string };
}

export interface Package {
  id: string;                   // "split-maintenance"
  name: string;                 // "Deep Clean Maintenance"
  tier: "maintenance" | "restoration" | "full-service" | "treatment";
  unitTypes: UnitType[];
  priceFrom: number;            // AUD, GST inclusive
  priceNote?: string;           // "per unit", "from"
  featured?: boolean;
  bestFor: string[];
  inclusions: { label: string; detail?: string }[];
  addOns?: { label: string; price: number }[];
}

export interface ProcessStep {
  id: string;
  order: number;
  title: string;
  description: string;
  icon: string;                 // Lucide icon name
}

export interface Sector {
  slug: "residential" | "commercial";
  title: string;
  summary: string;
  heroImage: ImageRef;
  subSectors: { label: string; description: string; icon: string }[];
  unitTypes: UnitType[];
  faqIds: string[];
}

export interface Area {
  slug: string;                 // "brisbane"
  city: string;
  state: "QLD" | "NSW" | "VIC" | "ACT" | "SA" | "WA" | "TAS" | "NT";
  lat: number; lng: number;     // for map pins + LocalBusiness areaServed
  climateNote: string;          // one sentence, original copy
  suburbs: string[];
  active: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;               // markdown allowed
  category: "services" | "pricing" | "booking" | "aftercare" | "areas";
  services?: string[];          // service slugs
  sectors?: Sector["slug"][];
  featured?: boolean;           // shown on home
}

export interface Testimonial {
  id: string;
  author: string;
  location?: string;            // "Brisbane, QLD"
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  date: string;                 // ISO
  source: "google" | "facebook" | "direct";
  tags?: { service?: string; sector?: Sector["slug"]; city?: string };
}

export interface Feature { id: string; icon: string; title: string; description: string; }

export interface ImageRef { src: string; alt: string; width: number; height: number; }
```

`content/nav.ts` exports `NavItem[]` (`{ label, href, children?, cta? }`) consumed by `DesktopNav`, `MobileDrawer` and `Footer` so the three never drift apart.

---

## 8. SEO & structured data

- `generateMetadata` per route from content models; canonical URLs; Open Graph image per service (generated via `next/og`).
- `app/layout.tsx`: `Organization` + `LocalBusiness` (name, telephone, areaServed states, openingHoursSpecification, aggregateRating only if sourced from real reviews).
- Service pages: `Service` schema (`serviceType`, `provider`, `areaServed`, `offers` with `priceSpecification` from packages).
- City pages: `LocalBusiness` with `areaServed: City` + `geo`.
- Any page with `FaqSection`: `FAQPage` JSON-LD built from the same `faqs` array (keep questions identical to the visible text).
- `BreadcrumbList` on all inner pages from `Breadcrumbs` props.
- `sitemap.ts` enumerates static routes + `services`, `sectors`, `areas`, `blog` slugs; `robots.ts` allows all, points to sitemap.
- One `<h1>` per page (the reference's duplicated banners produce two).

---

## 9. Header and footer specifications

### 9.1 Header

| Property | Spec |
|---|---|
| Structure | `<header>` → optional `TopBar` (≥1024) → sticky nav bar. Only the nav bar is sticky; the top bar scrolls away [Observed pattern, retained]. |
| Heights | 80 px default, 64 px after 80 px scroll; logo scales 1 → 0.85; transition 250 ms (03 §sticky header). |
| Surfaces | Light: white bg, `ink` links, `shadow-sm` when scrolled. Overlay (home hero only): transparent bg, white links, becomes light on scroll. |
| Logo | SVG wordmark, max-height 36 px (desktop) / 28 px (mobile); links to `/`. |
| CTA placement | Rightmost: `Button primary md` "Book online" on all breakpoints (icon-only `CalendarCheck` button at <400 px). Phone shown as ghost button ≥1280 and inside the drawer below that. [Observed: reference uses a full-height navy block on the right and hides the CTA on mobile.] |
| Dropdown | Hover intent (100 ms delay) + click/focus; `aria-expanded`, `aria-controls`; arrow keys move between items; `Esc` closes and returns focus. |
| Mobile | `IconButton Menu` opens `MobileDrawer`; header stays sticky; height 64 px. |
| Active route | Underline + `aria-current="page"`. |

### 9.2 Footer

| Row | Content |
|---|---|
| Pre-footer (optional) | Full-width `QuoteCTA` lives *above* the footer as its own section, never inside it. |
| Main (dark `secondary-800`) | 4 columns on ≥1024: Brand (logo, 2-line mission, trust badges row) · Services (10 links) · Company (About, Sectors, Pricing, Service areas, FAQ, Blog, Contact) · Contact (phone, email, hours, "Servicing QLD · NSW · VIC · ACT · SA · WA", social icons). 2 columns on 768–1023 (Brand+Contact / Services+Company). Stacked on mobile with Services and Company as accordions. |
| Legal bar | 1 px top divider; left: ABN · © {year} {Business name}; right: Privacy · Terms · (optional payment icons as monochrome SVGs). 12–13 px, `text-on-dark-muted`. |
| Spacing | 64 px top / 32 px bottom padding; column gap 48 px. |

[Observed reference footer: pink brand band with centred logo and mission, letter-spaced states strip with ABN, four white columns (Quick Links, Support, Follow Us, Newsletter with email field + navy Subscribe + consent checkbox), bottom legal bar with Cookies/Privacy/Terms, copyright and payment logos.] The proposed footer keeps the states strip and ABN (good local trust signals) and drops the newsletter unless it is actively used.

---

## 10. Implementation notes for the coding assistant

1. Build `ui/` primitives first, then `layout/`, then `sections/`, then pages — every section must render from the typed content in `content/` with no hard-coded copy.
2. All sections accept `tone` and `className`; backgrounds are decided by the page composition, not inside the section, so the alternating rhythm (02 §6.3) stays under page control.
3. Motion wrappers (`Reveal`, `Stagger`, `CountUp`) are the only place Motion is imported in sections; follow `03-ANIMATIONS-AND-INTERACTIONS.md` and respect `prefers-reduced-motion`.
4. Images: every `ImageRef` passes through `next/image` with `sizes`; hero video uses `<video playsInline muted loop autoPlay preload="metadata" poster>` and is swapped for the poster on `prefers-reduced-motion` or save-data.
5. Use original illustrations, photography and copy — nothing from the reference is to be reused.
