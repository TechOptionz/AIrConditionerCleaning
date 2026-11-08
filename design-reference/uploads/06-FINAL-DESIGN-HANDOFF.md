# 06 — Final Design Handoff

This is the one-page brief for whoever builds the site. Everything here is backed by the detailed files:

| File | Use it for |
|---|---|
| `01-DESIGN-REFERENCE-ANALYSIS.md` | What the reference does, section by section, and what is worth keeping |
| `02-DESIGN-SYSTEM.md` | Tokens, type scale, component rules (source of truth for names) |
| `03-ANIMATIONS-AND-INTERACTIONS.md` | Observed motion vs. the motion we want, with code |
| `04-RESPONSIVE-BLUEPRINT.md` | Per-breakpoint layout specs and QA checklist |
| `05-PAGE-AND-COMPONENT-ARCHITECTURE.md` | Routes, file tree, components, content models, booking flow |
| `07-REFERENCE-ASSET-INVENTORY.md` | What media to produce, at what sizes |

Legend: **[Observed]** = measured on seanmas.com.au; **[Proposed]** = our recommendation.

---

## 1. Design direction in one paragraph

A calm, confident, *service-business* site: generous white space, one saturated brand colour used sparingly for action, deep navy for authority, large legible headings in a geometric display face, real photography of technicians at work, and a booking path that is always one tap away. Motion is restrained and purposeful (reveal on scroll, lift on hover, smooth drawers), never decorative. It should feel like a well-run Australian trade company with a modern front door — not a SaaS dashboard, and not a template.

Tone words: **clean · trustworthy · local · effortless to book**.

---

## 2. The ten decisions that matter most

1. **Single-scroll conversion spine.** Hero → trust bar → services → how it works → packages/pricing teaser → why us → reviews → service areas → FAQ → one closing CTA. The reference repeats "book now" bands four times plus an inline form; we keep *one* inline mini-form (hero or just below) and *one* closing `QuoteCTA`. [Proposed]
2. **Sticky header everywhere, compact on scroll.** The reference pins only the nav band on desktop (via a `.fixed` class) and is *not* sticky on mobile [Observed]. We make the header sticky on all breakpoints, shrink from 80 → 64 px after 80 px of scroll, and keep the primary CTA visible at every width. [Proposed]
3. **Hero = video or photo with a quiet overlay, left- or centre-aligned, fluid headline.** Keep the reference's strongest pattern (muted autoplay loop, two CTAs, trust line) [Observed] but add a 35–45 % navy gradient overlay for legibility, drop hard `<br>` line breaks, and use `clamp()` sizing so it never clips at 320 px. [Proposed]
4. **Service discovery by unit type, with a "not sure?" escape hatch.** The 8-card unit-type grid is the reference's best UX idea [Observed]. We keep it, add one-line descriptions and prices-from, and add a "Not sure which system you have?" helper that opens a visual picker. [Proposed]
5. **Residential vs commercial becomes real navigation**, not a circular-photo carousel. Sector pages (`/sectors/residential`, `/sectors/commercial`) with their own FAQs and photography. [Proposed]
6. **Packages are explained once, well.** The maintenance-vs-restoration comparison and the 4-tier price cards [Observed on service pages] are consolidated into a `PackageCompare` + `PriceCard` pattern used on every service page and on `/pricing`. [Proposed]
7. **One colour does the work.** Primary for CTAs, eyebrows, active states and icons only; navy for headings/dark sections; neutral surfaces alternate in a predictable rhythm. No patterned or dotted backgrounds behind text. [Proposed]
8. **Forms are accessible by default.** Visible labels, grouped select options, inline validation, a confirmation screen, and a 4-field homepage mini-form that hands off to `/book` with values prefilled. The reference relies on placeholder-only labels and 19 ungrouped service options [Observed]. [Proposed]
9. **Reviews are first-party rendered.** The reference's third-party reviews widget did not render during inspection [Observed]. We render `ReviewCard`s from fetched or static data so the section never goes blank. [Proposed]
10. **Out-of-scope content is removed from the conversion path.** Shop, franchise recruitment, product promos and sidebar posters appear on every reference page [Observed]; none belong on the new site's core pages. [Proposed]

---

## 3. Preserve conceptually vs. redesign

### Preserve (the reference got these right)

- Two-tier header idea: utility strip (phone, hours/badges) + main nav with a dominant **Book** CTA. [Observed]
- Full-bleed hero with motion media and a trust line under the CTAs. [Observed]
- A stat / process strip immediately under the hero (how booking works in 4 steps). [Observed]
- Unit-type service grid with illustrations, hover lift. [Observed]
- Eyebrow + underline + large centred H2 as the section-heading signature. [Observed]
- Dark "why choose us" section with a feature list. [Observed]
- Numbered process-step cards on a dark band on service pages. [Observed]
- Service-areas section with a map illustration and city list. [Observed]
- FAQ accordion on service pages (single-open, plus/minus). [Observed]
- Footer with brand band → states/ABN strip → link columns → legal bar. [Observed]

### Redesign (where the reference is weak)

| Weakness [Observed] | Our fix [Proposed] |
|---|---|
| Inconsistent section padding (0 → 120 px), inner margins doing the spacing | Fixed `--section-y-*` scale; headings via `SectionHeading` |
| Two different blues for headings, magenta flooding on card hover | One navy family; card hover = lift + border tint only |
| Mobile service tiles 126 × 63 px, 12 px titles, 40 px icons | Compact row cards ≥ 72 px tall, 16 px titles, 56 px icons |
| Stats block overlapping hero CTAs at 768 px | Trust bar is in normal flow; overlap only via negative margin ≥ 1024 px with safe padding |
| Duplicate page banners on Book/Contact; About page with 0 px gutters | One `PageBanner` rendered by the layout; `Container` gutters everywhere |
| Four CTA bands + sidebar promos + Messenger poster | One closing `QuoteCTA`, one mobile `StickyCTA` |
| Placeholder-only labels, unlabeled required fields | Full `FormField` primitive with label, hint, error |
| Uppercase 16 px nav with white active pill | 15 px sentence-case nav with animated underline (pill optional) |
| Reviews embed blank; photo strip of 19 unlabeled images | First-party review cards; one curated `MediaStrip` |
| No scroll reveals, no reduced-motion handling | Restrained reveal system with `prefers-reduced-motion` fallback |

---

## 4. Animation priorities (detail and code in 03)

| Priority | Interaction | Spec summary |
|---|---|---|
| P1 | Header sticky + compact | height 80 → 64 px, background/shadow fade, 250 ms `--ease-out`; hide-on-scroll-down optional |
| P1 | Scroll reveal | opacity 0 → 1, translateY 24 → 0, 600 ms `--ease-out`, once, 10 % viewport margin, children staggered 80 ms |
| P1 | Button / card hover | 250 ms; card translateY −6 px + `shadow-lg`; button darken + translateY −1 px |
| P1 | Mobile drawer | slide from right 300 ms `--ease-in-out`, backdrop fade 200 ms, items stagger 40 ms, focus trap, Esc closes |
| P1 | Accordion | height auto animation 250 ms, icon rotate 45° |
| P2 | Hero entrance | headline words stagger 50 ms, lead + CTAs follow, media fade/scale 1.04 → 1 over 1.2 s |
| P2 | Count-up stats | 1.2 s ease-out when in view, once |
| P2 | Dropdown | opacity + translateY 8 px, 180 ms |
| P2 | Image reveal | scale 1.06 → 1 or clip-path wipe, 800 ms |
| P3 | Review carousel | drag/snap, 400 ms slides, pause on hover/focus, no autoplay by default |
| P3 | Link-arrow micro-move | arrow translateX 4 px on hover |

Hard rules: transform/opacity only; nothing animates layout on scroll; everything collapses to instant/opacity-only under `prefers-reduced-motion`; no autoplaying carousels without a pause control; the hero video is muted, lazy, and replaced by a poster image on mobile or when `prefers-reduced-motion` is set.

---

## 5. Suggested implementation architecture

- **Framework:** Next.js App Router, TypeScript strict, Server Components by default; client components only for Header (scroll state), MobileDrawer, Accordion, Carousel, BookingForm, Reveal wrappers.
- **Styling:** Tailwind with tokens from `02` mapped in `tailwind.config.ts`; `globals.css` holds the `:root` custom properties so re-branding is a one-file change.
- **Motion:** `motion` (Framer Motion) — `Reveal`, `StaggerGroup`, `CountUp`, `AccordionItem`, `MobileDrawer`, `useHeaderScroll` as in `03 Part C`.
- **Icons:** `lucide-react`; unit-type illustrations as inline SVG components in `components/icons/systems/`.
- **Images:** `next/image` with `sizes` on every instance; AVIF/WebP; hero poster preloaded; everything below the fold lazy.
- **Content:** typed data files in `content/` (`services.ts`, `areas.ts`, `faqs.ts`, `testimonials.ts`, `sectors.ts`) using the interfaces in `05 §7`; swap to a CMS later without touching components.
- **Forms:** `react-hook-form` + `zod`; Server Action posts to email/CRM; honeypot + time-to-submit check; `/thank-you` confirmation route.
- **SEO:** `generateMetadata` per route, `LocalBusiness` + `Service` + `FAQPage` JSON-LD, `sitemap.ts`, `robots.ts`, canonical URLs, per-city area pages.
- **Performance targets:** LCP ≤ 2.5 s on 4G (hero poster ≤ 120 KB), CLS < 0.05, total JS on home ≤ 180 KB gz, Lighthouse a11y ≥ 95.

Recommended build order: tokens + layout primitives → Header/Footer → Home sections top-to-bottom → Service template → Sector template → Areas → FAQ/Contact/Book → motion pass → QA pass (`04` checklist).

---

## 6. Instructions for the coding assistant

Paste this block as the opening brief when implementation starts.

> Build an original, premium, fully responsive website for an Australian air-conditioner cleaning, servicing, repair and installation company using Next.js (App Router), TypeScript, Tailwind CSS, `motion` (Framer Motion), `lucide-react` and `next/image`.
>
> Read `02-DESIGN-SYSTEM.md` first and implement its tokens verbatim in `app/globals.css` and `tailwind.config.ts`. Then follow `05-PAGE-AND-COMPONENT-ARCHITECTURE.md` for routes, file tree, components and content models, `04-RESPONSIVE-BLUEPRINT.md` for breakpoint behaviour, and `03-ANIMATIONS-AND-INTERACTIONS.md` Part B/C for motion. `01` and `07` are context only.
>
> Rules:
> 1. Write **original** copy, placeholders and brand assets. Do not reuse any text, logo, imagery, product, badge, or code from the reference site. Use a neutral placeholder brand name (e.g. "Northline Aircon Care") and `1300 000 000`-style placeholder contact details until the client supplies real ones.
> 2. Every section is a reusable component in `components/sections/` that takes typed props from `content/`; no hard-coded copy inside components.
> 3. Use `SectionHeading`, `Container` and the `--section-y-*` spacing for every section; never set ad-hoc paddings.
> 4. Headings use the fluid `clamp()` scale and `text-wrap: balance`; never use `<br>` inside headings.
> 5. All interactive elements: ≥ 44 px tap targets, visible focus ring, correct ARIA (accordion, menu, dialog), keyboard operable.
> 6. Forms: visible labels, zod validation, inline errors, confirmation state, honeypot. Never submit to a third party without an env-configured endpoint.
> 7. Motion: transform/opacity only; honour `prefers-reduced-motion`; no autoplay carousels without pause; hero video muted + lazy + poster fallback.
> 8. Images: `next/image` with `sizes`, aspect-ratio wrappers from `02 §4`, AVIF/WebP; generate placeholder SVGs for the eight unit-type illustrations if real ones are not provided yet.
> 9. Keep shop, franchise, NDIS and product promotion out of the build unless explicitly requested.
> 10. Deliver pages in this order: Home, Services hub, Service detail template (all unit types from data), Sector pages, Service areas, About, FAQ, Contact, Book, Thank-you, legal. Run the QA checklist in `04` before handing over.

---

## 7. Elements that must remain configurable

| Element | Where it lives | Why |
|---|---|---|
| Brand colours (`--color-primary-*`, `--color-secondary-*`, accent) | `globals.css` `:root` | Final palette not yet chosen; the reference's magenta/navy is a placeholder |
| Font families (`--font-sans`, `--font-display`) | `app/layout.tsx` + tokens | Brand typeface may change |
| Logo (light / dark variants, mark-only for compact header) | `components/layout/Logo.tsx` + `/public/brand` | Client asset pending |
| Company details (name, phone, email, ABN, hours, states served, social links) | `content/site.ts` | Used by header, footer, JSON-LD, CTAs |
| Service list, packages, prices-from, inclusions | `content/services.ts` | Prices and inclusions change |
| Service areas and per-city copy | `content/areas.ts` | Expansion over time |
| FAQs (global + per service/sector) | `content/faqs.ts` | Marketing-managed |
| Testimonials / review source | `content/testimonials.ts` or review API | May move to a live feed |
| Trust badges (rating, insured, Australian-owned, payment options) | `content/site.ts` → `TrustBar` | Claims must be verified by the client |
| Hero media (video URL / poster / fallback image) and headline variants | `content/home.ts` | Likely to be A/B tested |
| Motion intensity (`--dur-*`, reveal distance, stagger) and a global `motionLevel: "full" | "subtle" | "off"` flag | `lib/motion.ts` | Client taste and performance tuning |
| Section order on Home | `app/page.tsx` composition | Conversion experiments |
| Header variant (`transparent-over-hero` vs `solid`) and whether the top utility bar shows | `content/site.ts` | Depends on final hero media |
| Booking flow mode (`single-step` vs `multi-step`) and destination (email / CRM / calendar) | `content/booking.ts` + env | Integration not yet decided |
| Optional modules: Blog, Pricing page, Sector hub, newsletter, live chat button | Feature flags in `content/site.ts` | Scope decisions pending |

---

## 8. What could not be inspected (carry forward as assumptions)

- Reviews widget content and interactions (blank during inspection).
- Form validation and confirmation states (form not submitted).
- Tooltip behaviour on pricing "info" icons, stickiness of sidebar promos.
- True mobile rendering (emulated with a 375 / 768 px same-origin frame, not a device or resized window).
- Shop, NDIS, Blog and How-to-use pages (out of scope).
- Hero video behaviour on mobile (image fallback assumed, not verified).

None of these gaps affect the blueprint: every behaviour we could not verify is specified as a proposal, not an observation.
