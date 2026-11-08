# 02 — Design System

Proposed, reusable design system for a premium Australian air-conditioning cleaning and servicing website. It is *inspired by the structure* of the reference (seanmas.com.au) but is intentionally brand-neutral: every colour, radius and font below is a token you can re-skin later without touching components.

Legend used throughout the blueprint:

- **[Observed]** — measured on the live reference with computed styles or screenshots (desktop viewport 1294 px wide unless stated).
- **[Proposed]** — our recommendation for the new site. Not on the reference.
- **Not verified** — could not be inspected reliably.

Target stack: Next.js (App Router) + TypeScript + Tailwind CSS + Motion (Framer Motion) + Lucide + `next/image`.

---

## 1. Reference audit (what the tokens are derived from)

| Area | Observed on reference | Our verdict |
|---|---|---|
| Fonts | Poppins for everything (headings, body, nav, buttons); Outfit used on one "Why choose us" icon row; a script font declared but not seen in use; the logo is a serif wordmark image | Keep a single geometric sans for UI; add a second display face for headings to create hierarchy. |
| Primary colour | Magenta/berry `#A01E53` (nav band, primary buttons, eyebrows, card hover, footer band) | Keep the *idea* of one saturated brand colour. Value is a token. |
| Secondary colour | Navy `#1C385B` (secondary buttons, "Book Appointment" block, dark sections) and a royal blue `#023E8A` used for most H2s | Collapse to one navy family; stop using two unrelated blues for headings. |
| Accent/dark variants | Wine `#7F1945` (CTA bands), deep navy `#003E66` (process section), pink tints `#FFEEF5` and `rgba(160,30,83,.05)` (pricing/background) | Formalise as `primary-700`, `secondary-800`, `primary-50`. |
| Body text | `#403F4B` at 14–16 px, line-height 1.6–1.8 | Raise base to 16 px, line-height 1.6. |
| Neutral surfaces | White, `#F8F8F8`, `#E6E7E8`, dotted/patterned pink backgrounds | Keep a 3-step neutral surface scale; drop the busy patterns. |
| Radius | Mixed: 20 px (service cards), 16 px (pricing), 8 px (buttons), 6 px (inputs), 100 px (active nav pill), 50% (circular photos) | Normalise to a 4-step scale. |
| Shadows | `0 4px 10px rgba(0,0,0,.05)` rest, `0 8px 20px rgba(0,0,0,.1)` hover, dropdown `2px 2px 20px rgba(0,0,0,.1)` | Keep the soft, low-opacity approach; define 3 levels. |
| Container | 1220 px boxed container with 10 px side padding, sections full-bleed | Keep 1200–1280 max width; add proper gutters (16 / 24 / 32 px). |
| Section padding | Highly inconsistent: 0, 60/80, 80/68, 120/105, 82/82 px; many sections rely on inner element margins | Use a fixed section-spacing scale. |
| Buttons | 18 px / weight 400, padding 14×20, radius 8, 2 px white border, circle-arrow icon, hover swaps to the other brand colour (0.3 s linear) | Keep arrow-icon pill feel; raise weight to 600; remove white border except on dark backgrounds. |

---

## 2. Design tokens (CSS custom properties)

All values are editable. Use these in `globals.css` and map them into Tailwind via `theme.extend`.

```css
:root {
  /* ---------- Brand colours (replace with your own palette) ---------- */
  --color-primary-50:  #FBEEF3;   /* tinted backgrounds, pricing card fill */
  --color-primary-100: #F3D3DF;
  --color-primary-500: #A01E53;   /* main brand colour (reference value, replace) */
  --color-primary-600: #8C1A48;   /* hover */
  --color-primary-700: #7F1945;   /* CTA bands, pressed */
  --color-primary-contrast: #FFFFFF;

  --color-secondary-50:  #EEF2F7;
  --color-secondary-500: #1C385B; /* navy — headings, secondary buttons */
  --color-secondary-600: #162D4A;
  --color-secondary-800: #0F2238; /* dark sections, footer */
  --color-secondary-contrast: #FFFFFF;

  --color-accent-500: #0096C7;    /* link hover / informational highlight (reference link-hover colour) */
  --color-success-500: #1E9E5A;
  --color-warning-500: #E8A317;
  --color-danger-500:  #D63B3B;

  /* ---------- Neutrals ---------- */
  --color-bg:        #FFFFFF;
  --color-surface-1: #F8F8F8;     /* alternate section background */
  --color-surface-2: #EEF0F3;     /* cards on grey, input backgrounds */
  --color-border:    #E3E6EA;
  --color-border-strong: #CBCBCB;
  --color-text:      #1E2B4B;     /* headings — deep navy ink */
  --color-text-body: #403F4B;     /* body copy (reference value) */
  --color-text-muted:#6B6F7A;
  --color-text-on-dark: #FFFFFF;
  --color-text-on-dark-muted: rgba(255,255,255,0.78);

  /* ---------- Typography ---------- */
  --font-sans: "Poppins", ui-sans-serif, system-ui, sans-serif;      /* body + UI */
  --font-display: "Outfit", "Poppins", ui-sans-serif, sans-serif;    /* headings; swap for a brand face later */

  --text-xs:   0.75rem;   /* 12 */
  --text-sm:   0.875rem;  /* 14 */
  --text-base: 1rem;      /* 16 */
  --text-lg:   1.125rem;  /* 18 */
  --text-xl:   1.25rem;   /* 20 */
  --text-2xl:  1.5rem;    /* 24 */
  --text-3xl:  1.875rem;  /* 30 */
  --text-4xl:  2.25rem;   /* 36 */
  --text-5xl:  3rem;      /* 48 */
  --text-6xl:  3.5rem;    /* 56 */

  --leading-tight: 1.1;
  --leading-snug:  1.25;
  --leading-normal: 1.6;
  --leading-relaxed: 1.75;

  --tracking-eyebrow: 0.18em;
  --tracking-tight: -0.01em;

  /* ---------- Spacing (4 px base) ---------- */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px;
  --space-12: 48px; --space-16: 64px; --space-20: 80px; --space-24: 96px; --space-32: 128px;

  --section-y-sm: var(--space-16);   /* 64  — mobile section padding */
  --section-y-md: var(--space-20);   /* 80  — tablet */
  --section-y-lg: var(--space-24);   /* 96  — desktop */
  --section-y-xl: var(--space-32);   /* 128 — hero-adjacent / feature sections on ≥1440 */

  /* ---------- Layout ---------- */
  --container-max: 1240px;
  --container-narrow: 880px;        /* prose / FAQ / forms */
  --container-wide: 1440px;         /* full-bleed media bands */
  --gutter-sm: 16px;                /* 320–767 */
  --gutter-md: 24px;                /* 768–1023 */
  --gutter-lg: 32px;                /* ≥1024 */
  --header-h: 80px;
  --header-h-compact: 64px;         /* scrolled state */
  --topbar-h: 40px;

  /* ---------- Radius ---------- */
  --radius-sm: 6px;    /* inputs, chips */
  --radius-md: 12px;   /* buttons, small cards */
  --radius-lg: 20px;   /* service cards, pricing cards */
  --radius-xl: 28px;   /* hero media, large panels */
  --radius-full: 9999px;

  /* ---------- Shadows ---------- */
  --shadow-sm: 0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06);
  --shadow-md: 0 4px 10px rgba(16, 24, 40, 0.06);               /* card rest (reference-like) */
  --shadow-lg: 0 12px 28px rgba(16, 24, 40, 0.12);              /* card hover / dropdown */
  --shadow-primary: 0 10px 24px rgba(160, 30, 83, 0.25);        /* primary button hover glow (optional) */

  /* ---------- Motion ---------- */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast: 150ms;
  --dur-base: 250ms;
  --dur-slow: 450ms;
  --dur-reveal: 600ms;
}
```

### Tailwind mapping (excerpt)

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", md: "1.5rem", lg: "2rem" }, screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        primary: { 50: "var(--color-primary-50)", 100: "var(--color-primary-100)", 500: "var(--color-primary-500)", 600: "var(--color-primary-600)", 700: "var(--color-primary-700)" },
        secondary: { 50: "var(--color-secondary-50)", 500: "var(--color-secondary-500)", 600: "var(--color-secondary-600)", 800: "var(--color-secondary-800)" },
        accent: { 500: "var(--color-accent-500)" },
        surface: { 1: "var(--color-surface-1)", 2: "var(--color-surface-2)" },
        ink: { DEFAULT: "var(--color-text)", body: "var(--color-text-body)", muted: "var(--color-text-muted)" },
        line: { DEFAULT: "var(--color-border)", strong: "var(--color-border-strong)" },
      },
      fontFamily: { sans: ["var(--font-sans)"], display: ["var(--font-display)"] },
      borderRadius: { sm: "var(--radius-sm)", md: "var(--radius-md)", lg: "var(--radius-lg)", xl: "var(--radius-xl)" },
      boxShadow: { sm: "var(--shadow-sm)", md: "var(--shadow-md)", lg: "var(--shadow-lg)", primary: "var(--shadow-primary)" },
      transitionTimingFunction: { out: "var(--ease-out)", "in-out": "var(--ease-in-out)" },
      screens: { xs: "375px", sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px" },
    },
  },
} satisfies Config;
```

Load fonts with `next/font/google` (Poppins 400/500/600/700, Outfit 500/600/700) and expose them as `--font-sans` / `--font-display` on `<html>`.

---

## 3. Typography

### 3.1 Observed on reference

| Element | Size / line-height / weight | Colour | Notes |
|---|---|---|---|
| H1 (home hero) | 50 px / 60 px / 700 | white on video | Centred, manually broken onto two lines with `<br>`; stays 50 px on narrow screens (clips/wraps awkwardly at 320–375). |
| H1 (page banners) | ~50–56 px / 700 | white | Left-aligned on About/Contact, centred on Services. |
| H2 (section titles) | 40 px / 48 px / 700 (one section 600) | `#023E8A` or `#1C395B` — inconsistent | Centred in most sections, left in two-column sections. |
| H2 (small, e.g. stat) | 32–38 px / 600 | white | |
| H3 | 30–36 px / 400–600 | varies | Deep-clean comparison cards use 30 px / 400. |
| H4 (service card title) | 26 px / 31 px / 600 (stylesheet says 16 px, overridden) | `#1E2B4B` | 12 px on mobile — too small. |
| Eyebrow label | 14 px uppercase, ~0.3 em tracking | primary pink | Centred, with a 40 px × 2 px underline bar beneath. |
| Body | 14 px base (theme), 16 px in text widgets / 26–29 px line-height | `#403F4B` or `#000` | Mixed colours. |
| Nav links | 16 px / 500 / uppercase | white | Active item = white pill, red text. |
| Buttons | 18 px / 400 | white | |
| Form inputs | 14 px placeholder text | `#808080` | No visible labels. |
| Footer headings | ~18 px / 600 navy; links 14 px | | |

### 3.2 Proposed type scale

Fluid sizes use `clamp()` so headings scale smoothly between 375 px and 1440 px without breakpoint jumps.

| Token | Mobile → Desktop | Weight | Line-height | Tracking | Family | Use |
|---|---|---|---|---|---|---|
| `display` | `clamp(2.25rem, 1.6rem + 2.8vw, 3.75rem)` (36 → 60) | 700 | 1.08 | −0.015em | display | Home hero H1 only |
| `h1` | `clamp(2rem, 1.5rem + 2.2vw, 3.25rem)` (32 → 52) | 700 | 1.1 | −0.01em | display | Page banner H1 |
| `h2` | `clamp(1.75rem, 1.3rem + 1.8vw, 2.75rem)` (28 → 44) | 700 | 1.15 | −0.01em | display | Section titles |
| `h3` | `clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)` (22 → 28) | 600 | 1.25 | 0 | display | Card / sub-section titles |
| `h4` | 1.125rem → 1.25rem (18 → 20) | 600 | 1.3 | 0 | sans | Feature titles, pricing labels |
| `eyebrow` | 0.75rem → 0.8125rem (12 → 13) | 600 | 1 | 0.18em uppercase | sans | Section label above H2 |
| `lead` | 1.0625rem → 1.25rem (17 → 20) | 400 | 1.55 | 0 | sans | Hero/section intro paragraph |
| `body` | 1rem (16) | 400 | 1.6 | 0 | sans | Default copy |
| `body-sm` | 0.875rem (14) | 400 | 1.55 | 0 | sans | Captions, card descriptions, footer links |
| `caption` | 0.75rem (12) | 500 | 1.4 | 0.02em | sans | Fine print, badges |
| `nav` | 0.9375rem (15) | 500 | 1 | 0.01em | sans | Header links (sentence case, not uppercase) |
| `button` | 0.9375rem–1rem (15–16) | 600 | 1 | 0.01em | sans | All buttons |
| `stat` | `clamp(2rem, 1.5rem + 2vw, 3rem)` | 700 | 1 | −0.02em | display | Trust numbers |

Rules:

- Headings use `text-wrap: balance` so two-line titles break evenly instead of leaving orphans (the reference uses hard `<br>` tags, which break on mobile).
- Maximum measure for paragraphs: `max-width: 65ch` (hero lead: `48ch`).
- Body copy on dark backgrounds uses `--color-text-on-dark-muted` (78 % white), never pure grey.
- Never set H1 below 32 px or H2 below 28 px on any viewport; never exceed 60 px H1.

---

## 4. Layout system

| Token | Value | Notes |
|---|---|---|
| Max content width | 1240 px (`--container-max`) | Reference uses 1220 px; 1240 aligns to a 12-col grid with 24 px gutters (12 × 80 + 11 × 24 = 1224) + 16 px. |
| Narrow container | 880 px | FAQ, prose, standalone forms. |
| Wide/media container | 1440 px | Edge-to-edge image bands, full-bleed CTAs with inner content still capped at 1240. |
| Gutters | 16 px (<768), 24 px (768–1023), 32 px (≥1024) | The reference drops to 10 px / 0 px on some pages (About page text touches the viewport edge). |
| Grid | 12 columns, 24 px gap (16 px on mobile) | Use CSS grid, not floats. |
| Section vertical padding | 64 / 80 / 96 px (mobile / tablet / desktop); 128 px for the first section after hero on ≥1440 | Same top and bottom padding; no ad-hoc inner margins. |
| Section header stack | eyebrow → 12 px → H2 → 16 px → lead → 40 px (48 desktop) → content | Centre-aligned for symmetric grids, left-aligned for split layouts. |
| Column ratios | Split sections 6/6 or 5/7 (text/media), feature grids 4×3 (desktop) → 2×6 (tablet) → 1×12 (mobile) | Reference uses 512/767 px split in reviews (≈ 5/7). |
| Image aspect ratios | Hero media 16:9 (video) / 3:2 fallback; service illustrations 1:1; split-section photos 4:5 portrait on desktop, 16:10 on mobile; testimonial avatars 1:1 circle; process photos 1:1; page banners 21:9 (desktop) / 4:3 (mobile) | |

Breakpoints (Tailwind `screens` above): 375 (xs), 640 (sm), 768 (md), 1024 (lg), 1280 (xl), 1440 (2xl).

---

## 5. Components

Each component lists **anatomy**, **states**, and **token usage**. Implementation guidance (Framer Motion variants etc.) lives in `03-ANIMATIONS-AND-INTERACTIONS.md`.

### 5.1 Buttons

| Variant | Background | Text | Border | Hover | Use |
|---|---|---|---|---|---|
| Primary | `primary-500` | white | none | `primary-600`, translateY(−1px), `shadow-primary` | Book / Get quote |
| Secondary | `secondary-500` | white | none | `secondary-600` | Phone number, secondary CTA on light |
| Outline (on dark) | transparent | white | 1.5 px `rgba(255,255,255,.6)` | bg `rgba(255,255,255,.1)`, border white | Hero / dark CTA bands |
| Ghost | transparent | `ink` | none | bg `surface-2` | Tertiary links, "Read more" |
| Link-arrow | none | `primary-500` | none | arrow translates 4 px right | Inline "Explore services →" |

Shared: height 48 px (md), 44 px (sm), 56 px (lg hero); padding `0 24px` (md); radius `--radius-md` (12 px) — rounder than the reference's 8 px, but not fully pill; font `button` token; optional trailing Lucide icon (`ArrowRight`, `Phone`, `CalendarCheck`) at 18 px with 8 px gap. Focus-visible: 2 px `accent-500` outline, 2 px offset. Disabled: 50 % opacity, no pointer. On mobile below 480 px, CTA pairs stack full-width with 12 px gap.

```css
.btn { display:inline-flex; align-items:center; gap:8px; height:48px; padding:0 24px;
  border-radius:var(--radius-md); font:600 1rem/1 var(--font-sans);
  transition: background-color var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out); }
.btn-primary { background:var(--color-primary-500); color:#fff; }
.btn-primary:hover { background:var(--color-primary-600); transform:translateY(-1px); box-shadow:var(--shadow-primary); }
.btn:focus-visible { outline:2px solid var(--color-accent-500); outline-offset:2px; }
```

### 5.2 Navigation links (desktop header)

- Font `nav` token, colour `ink` on light header (white on dark/transparent hero header), 12 px horizontal padding, 40 px hit height.
- Hover: colour `primary-500` + 2 px underline that scales from 0 → 100 % (`transform-origin: left`, 200 ms). Active route: same underline persistent. (Reference uses a white pill with red text — replace with underline for a calmer look; the pill is optional via a `variant="pill"` prop.)
- Dropdown trigger shows `ChevronDown` 16 px that rotates 180° when open.
- Dropdown panel: white, radius `--radius-md`, `shadow-lg`, 12 px padding, min-width 240 px, items 44 px tall with 12 px radius hover `surface-1`.

### 5.3 Service card

Anatomy: illustration (1:1, 120–160 px) → title (h3 token at 20–22 px) → one-line description (body-sm, muted) → "Learn more" link-arrow. Entire card is a link.

- Surface white, radius `--radius-lg`, 1 px border `line`, `shadow-sm`, padding 28 px 24 px, text centred (desktop) or left (compact variant).
- Hover: translateY(−6px), `shadow-lg`, border `primary-100`, illustration scales 1.04. Keep text colours — don't flood the card with brand colour (the reference flips the whole card to magenta, which reads harsh and hurts legibility of the illustration).
- Compact variant (mobile ≤ 639 px): horizontal row, 56 px icon, title 16 px, min-height 72 px, full tap target.

### 5.4 Testimonial card

- White on `surface-1` section (or `surface-1` on white), radius `--radius-lg`, padding 28 px, `shadow-sm`.
- Anatomy: 5-star row (Lucide `Star`, filled `warning-500`, 16 px) → quote (body, 4-line clamp) → divider → avatar initials circle 40 px + name (h4 14 px) + location/date (caption muted) + Google "G" badge (optional).
- Carousel of 3 per view (desktop), 2 (tablet), 1.15 (mobile peek).

### 5.5 Input fields

- Height 48 px, padding 0 14 px, radius `--radius-sm`, 1 px `line-strong`, background white, text 16 px (prevents iOS zoom), placeholder `text-muted`.
- Always a visible label (13 px, 600, `ink`) 6 px above; required marked with `*` and `aria-required`.
- Focus: border `primary-500`, 3 px ring `rgba(160,30,83,.15)`.
- Error: border `danger-500`, helper text 13 px `danger-500` with `AlertCircle` icon; `aria-invalid` + `aria-describedby`.
- Success: subtle `CheckCircle2` in `success-500` at the right.
- Textarea min-height 120 px.

### 5.6 Dropdown / select

- Native `<select>` styled identically to inputs with a custom `ChevronDown` icon; use a Radix/Headless listbox only if grouped options are needed (service types grouped by unit type — the reference lists 19 ungrouped options which is hard to scan).
- Menu: white, radius `--radius-md`, `shadow-lg`, max-height 320 px scroll, option height 40 px, group headers in `eyebrow` style.

### 5.7 Accordion (FAQ)

- Item: 1 px bottom border `line`; no card chrome. Trigger 56 px min height, h4 token, `Plus` icon that rotates 45° to form an ×, colour `primary-500` when open.
- Panel: body copy, max-width 65ch, padding 0 0 20 px. Height animates 250 ms `ease-out` (see 03). Single-open by default (matches reference), `allowMultiple` prop optional.
- Semantics: `<button aria-expanded aria-controls>` inside `<h3>`; panel `role="region"`.

### 5.8 Trust badges / stat tiles

- Badge: inline-flex, 40 px tall, 8 px gap, 12 px radius, bg `surface-1` (or `rgba(255,255,255,.12)` on dark), icon 18 px + 14 px / 600 text. Example content types: Google rating, "Australian owned", "Fully insured", payment options.
- Stat tile: number (`stat` token, `primary-500` or white) + label (body-sm uppercase 0.08em). Animated count-up (proposed).

### 5.9 Image containers

- All images via `next/image` with explicit `sizes`; wrapper sets aspect ratio with `aspect-[4/5]` etc. and `overflow-hidden rounded-xl`.
- Decorative media gets a 1 px inner border `rgba(0,0,0,.06)` for crisp edges on white.
- Hover zoom (for linked images only): scale 1.04 over 600 ms `ease-out`.

### 5.10 Section heading block

```
<SectionHeading eyebrow="Our services" title="Cleaning for every type of system" lead="..." align="center|left" tone="light|dark" />
```
Eyebrow in `primary-500` (or `primary-100` on dark) with a 32 × 2 px bar *before* it when left-aligned, or centred beneath it when centred (keeps the reference's recognisable underline motif).

### 5.11 Footer links

- Column heading: h4 token, `ink` (or white on dark footer). Links 14 px, `text-muted` → `primary-500` on hover with 150 ms colour transition; 36 px tap height on mobile.

### 5.12 Price card

- Surface white, radius `--radius-lg`, 1 px `line`, padding 28 px; featured card uses `primary-500` background with white text, `shadow-lg`, and a "Most popular" pill (12 px, 600, `primary-50` bg / `primary-700` text) centred on the top edge.
- Anatomy: name (h4) → price (`stat` token) + unit caption → inclusions list with `Check` icons (16 px) → optional add-on note → full-width button.
- Equal heights via grid; on mobile cards stack with the featured card first.

### 5.13 Step / process card

- Numbered circle 40 px (`primary-500` bg, white number) → title (h4) → description (body-sm). On dark navy sections, card background `rgba(255,255,255,.06)` with 1 px `rgba(255,255,255,.12)` border instead of the reference's solid magenta cards.
- Horizontal connector line between steps on desktop (2 px `line` or 20 % white), hidden on mobile.

---

## 6. Colour usage rules

1. One saturated brand colour (`primary-500`) does the heavy lifting: CTAs, eyebrows, active states, icons. Use it on at most ~10 % of any viewport.
2. Navy (`secondary-500/800`) owns headings, dark sections and the footer.
3. Alternate section backgrounds white → `surface-1` → white → dark (`secondary-800` or `primary-700`) in a predictable rhythm; avoid patterned/dotted backgrounds behind text.
4. Text on `primary-500` and `secondary-500` must be white; verify WCAG AA (4.5:1) for every token pair when you swap the palette. Reference pairs that pass: white on `#A01E53` (7.3:1), white on `#1C385B` (11.8:1), `#403F4B` on white (10.3:1). Reference pair that fails: placeholder `#808080` on white at 14 px (3.9:1).
5. Dark-mode is optional; if implemented, invert surfaces and keep `primary-500` unchanged.

---

## 7. Iconography

Lucide icons at 16 / 18 / 20 / 24 px, stroke 1.75. Semantic set: `CalendarCheck` (book), `Phone`, `ArrowRight`, `ChevronDown`, `Star`, `ShieldCheck` (insured), `MapPin` (areas), `Wind` / `AirVent` (aircon), `Sparkles` (clean), `Droplets` (hydro wash), `SprayCan` (treatment), `Check`, `Plus`, `Menu`, `X`, `Search`, `ShoppingCart` (if a shop is ever added), `Clock`, `Mail`.

System-type illustrations (split, ducted, cassette, etc.) should be custom isometric SVGs in a consistent two-tone style (navy outline + primary tint) — the reference's mixed PNG illustrations are the right idea but inconsistent in size and perspective.

---

## 8. Responsive rules (summary — full detail in 04)

- Container padding: 16 / 24 / 32 px.
- Grids: 4 → 2 → 1 (services), 3 → 2 → 1 (features), 2 → 1 (split sections, media first on mobile unless it is purely decorative).
- Buttons: side-by-side ≥ 480 px, stacked full-width below.
- Header: full nav ≥ 1024 px; hamburger below. Sticky on *all* breakpoints (reference is not sticky on mobile).
- Type: use the fluid clamp scale; never leave hard `<br>` in headings.
- Forms: 2-column fields ≥ 640 px, single column below; selects become native pickers on touch.
