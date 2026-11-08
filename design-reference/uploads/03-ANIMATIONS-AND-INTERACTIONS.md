# 03 — Animations and Interactions

This file separates three things strictly:

- **Part A — Observed**: motion and interaction behaviour measured on the live reference (seanmas.com.au) via computed styles, stylesheet rules and screenshots. Desktop viewport 1294 × 919 px; mobile/tablet checked in a same-origin 375 px and 768 px frame.
- **Part B — Recommended**: motion we propose for the new site. None of it exists on the reference unless stated.
- **Part C — Implementation guidance**: code-level patterns for Next.js + Motion (Framer Motion).

Tokens referenced (`--dur-*`, `--ease-*`, colours, radii) are defined in `02-DESIGN-SYSTEM.md`.

Reference stack context (observed): WordPress + Elementor 4.1 + "Housefix" theme, jQuery, Swiper, select2, Contact Form 7, WP Rocket lazy-load. The theme exposes a per-widget `wdt_animation_effect` setting; on the homepage **every widget has it set to `none`** except one image widget set to `scroll`, whose effect was not visible. Elementor's own `_animation` entrance settings were not present on any element. In other words, the reference is almost entirely **static** apart from hover, menu and accordion behaviour.

---

## Part A — Observed on the reference

### A.1 Interaction table

| # | Interaction | Trigger | Initial state | Final state | Direction | Duration | Easing | Desktop / Mobile | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Sticky header | Scroll past the 72 px top bar | Header template is `position: relative`; top bar (phone CTA, trust badges, cart, search) and 107 px nav band both in flow | `.wdt-header-tpl` receives class `fixed` → `position: fixed; top: 0; z-index: 9999`. Only the 107 px nav band stays; top bar scrolls away. Height, colours and logo size do **not** change. `transition: all` declared but no visible transition (class swap is instant). | None (snap) | ~0 ms (instant) | n/a | Desktop only. At 768 px and 375 px no fixed element exists after scrolling — header is **not** sticky on tablet/mobile. | Observed |
| 2 | Nav dropdown ("Shop") | Hover / focus on parent item | Submenu `display:none`-equivalent (opacity 0, visibility hidden, pointer-events none) | Panel visible: white at 96.5 % opacity, 180 px wide, padding 15 px 0, box-shadow `2px 2px 20px rgba(0,0,0,.1)`, radius 0, positioned directly below the parent | Fade in place (no translate observed) | 100 ms | ease-in | Desktop (≥1025 px) | Observed |
| 3 | Nav active item | Current route | Plain white uppercase 16 px link | White pill behind text (`border-radius: 100px`, padding 0 10 px), text colour red (`rgb(255,0,0)`) | n/a (static) | n/a | n/a | Desktop | Observed |
| 4 | Nav link hover | Hover | White text | Theme rule `… ul.wdt-primary-nav li > a:hover` sets an element to `opacity:1; width:100%` (an underline/indicator width animation) — visible effect subtle | Width grows | Not measured | Not measured | Desktop | Observed (rule), effect faint |
| 5 | Primary / secondary buttons (`.wdt-button`) | Hover | Pink `#A01E53` or navy `#1C385B` background, white text, 2 px white border, 8 px radius, 18 px / 400 text | Background swaps to the *other* brand colour (`background-color: var(--wdtSecondaryColor)` on hover; navy ↔ pink). No lift, no shadow, no icon movement | Colour cross-fade | 300 ms | linear | Both | Observed |
| 6 | Service "system" cards (`a.ac-type`) | Hover | White card, radius 20, shadow `0 4px 10px rgba(0,0,0,.05)`, navy title 26 px | `transform: translateY(-5px)`, shadow `0 8px 20px rgba(0,0,0,.1)`, background floods to `#A42252`, title + text turn white; `.active` class gives the same filled look persistently | Up 5 px + colour flood | 300 ms | default (ease) | Desktop hover; on touch the flood applies on tap/focus | Observed |
| 7 | "Preferred service" circular cards (`section#spaces`) | Hover on column | Circular photo 222 px + label; "Read More" overlay element present | Overlay element `.rea…` scales to `0.8` (`transform: scale(0.8); transition: .3s; cursor:pointer`) | Shrink | 300 ms | default | Desktop | Observed (rule); hover visual not screenshot-verified |
| 8 | "Preferred service" carousel | Page load (mobile) / arrows / dots | Desktop: 4-up + 3-up two-row grid; mobile: Swiper, one circular slide visible | Slides translate horizontally; pink circular prev/next arrows at the sides; dot pagination beneath (active dot pink) | Horizontal | Swiper default (~300 ms) | Swiper default (ease) | Mobile/tablet carousel; desktop static grid | Observed |
| 9 | Swiper arrows (Elementor) | Hover | Arrow buttons at rest | `prev: rotate(180deg) translateX(10px)`, `next: translateX(10px)` | Horizontal nudge 10 px | Not measured (theme default) | Not measured | Desktop | Observed (rule) |
| 10 | FAQ accordion (Elementor Accordion, Services page: 8 items; FAQ page: 36 items in two tabs) | Click on title | All panels `display:none`; `+` icon; 1 px borders `#EAC6D4`; title 18 px / 700, padding 15 px 20 px | Clicked panel `display:block` (height 97 px for the sample answer), title gets `elementor-active`, icon switches to `−`; previously open item closes (**single-open**) | Vertical expand (jQuery `slideDown`/`slideUp`) | ~300 ms (jQuery default) | swing | Both | Observed |
| 11 | FAQ page tabs ("Services" / "Products") | Click | Active tab navy with white text, inactive tab grey `#DBDFE5` | Switches which accordion list is shown | Swap (no transition observed) | ~0 ms | n/a | Both | Observed |
| 12 | Mobile off-canvas menu | Tap hamburger (`a.menu-trigger`, 18 px icon, top-right) | `.mobile-menu` off-screen right, `body` without `nav-is-visible` | `body.nav-is-visible`; white panel slides in from the **right** (~75 % viewport width, full height, `z-index` max), dark semi-transparent overlay over page, close "X" button (outlined square) at top-right of panel; list items 44 px rows with dividers, "Shop" parent has chevron + checkbox toggle for submenu; no CTA button inside the panel | Slide from right | 250 ms (transform) + 300 ms (visibility) | ease-in-out | Mobile / tablet (<1025 px) | Observed |
| 13 | Mobile menu close | Tap "X" or overlay | Panel open | Panel slides back out; close icon's `::before/::after` rotate ±45° on hover | Slide to right | 250 ms | ease-in-out | Mobile / tablet | Observed |
| 14 | Hero background video | Page load | Poster/fallback image (`wdt_bg_image` jpg) | `<video autoplay loop muted playsinline>` inside `.elementor-background-video-container`, 1279 px wide, playing; overlay element present but `opacity: 0` | n/a | Continuous | n/a | Desktop confirmed playing. Mobile: Elementor `background_play_on_mobile` setting present; not verified whether video or image renders | Observed (desktop) |
| 15 | Smooth anchor scrolling | Click on in-page anchor | — | `html { scroll-behavior: smooth }` is set | Vertical | Browser default | Browser default | Both | Observed (rule) |
| 16 | Booking-form dropdowns (select2) | Click on "Type of premises / service / aircon type" | Native `<select>` hidden (1×1 px); select2 container 43 px tall, no border, transparent bg, 16 px text with small ▾ | select2 drop panel with searchable list (11 / 20 / 9 options) | Drop down | select2 default (instant / ~ 0 ms) | n/a | Both (touch gets same custom widget) | Observed (widget present); open state not screenshot-verified |
| 17 | Footer links | Hover | Grey/navy 14 px text | Colour → `var(--wdtLinkHoverColor)` (`#0096C7` light blue) | Colour | Not measured | Not measured | Both | Observed (rule) |
| 18 | "Watch How We Work" button | Click | Button | Opens a YouTube URL in a **new tab** (`target` attribute present). No lightbox/modal. | n/a | n/a | n/a | Both | Observed |
| 19 | Top-bar search icon | Click | Icon | `#open-search-overlay` id suggests a search overlay | Not opened | Not verified | — | Desktop/mobile | Observed (element), behaviour not verified |
| 20 | Toast notification container | Add-to-cart (WooCommerce) | `#toast-notification.toast-hide`, fixed bottom, green, opacity 0 | `transition: opacity .4s, transform .4s` | Fade/translate | 400 ms | default | Both | Observed (element only; shop is out of scope) |
| 21 | Lazy-loaded images | Scroll into view | SVG placeholder (WP Rocket) | Real image swapped in; **no fade** — images pop in (this caused blank areas in screenshots mid-scroll) | n/a | 0 ms | n/a | Both | Observed |

### A.2 Not observed (explicitly absent on the reference)

- Scroll-triggered section reveals of any kind (no `elementor-invisible`, no `animated` classes, no IntersectionObserver-driven classes).
- Fade-in / translate entrance transitions on hero text, buttons or images.
- Staggered appearance of service cards, feature items or steps.
- Image reveal, zoom-on-hover or Ken Burns effects (gallery strip and split-section photos are static).
- Parallax or scroll-linked motion (the one widget with `wdt_animation_effect: "scroll"` showed no visible effect).
- Animated statistics / count-up on "Over 10,000+" tiles.
- Header shrink, colour change, logo resize or slide-down animation when becoming sticky (the class swap is instant).
- Hide-on-scroll-down / show-on-scroll-up header.
- Page preloader (site-loader script is enqueued but no loader element exists in the DOM).
- Back-to-top button (go-to-top script enqueued, no element rendered).
- Lightbox / modal for the hero video CTA (opens YouTube in a new tab).
- Button icon motion (arrow icons are static).
- Form field focus animations beyond browser defaults.
- Page transitions.
- Cursor effects, marquee/ticker, text-splitting or typewriter effects.

### A.3 Not verified

- Contact Form 7 validation and confirmation states (form was not submitted; only `Name` and `Aircon Units` carry `aria-required`; a `.wpcf7-response-output` container exists for messages).
- Tooltip behaviour on the small "i" icons inside pricing-card inclusion lists (no tooltip library attributes found on the elements inspected).
- Whether the "Professional Deep Clean" / "Need Help" sidebar promo cards (Signs section, FAQ page) are sticky — no sticky settings found; treated as static.
- Google reviews widget (Elfsight) interactions — the widget rendered **empty** (0 px tall) during inspection, so its carousel/filter behaviour could not be seen.
- Hover state of the nav "underline" indicator (rule exists, visual too subtle to confirm).
- Product-slider behaviour in the shop section (out of scope).
- Hero video on mobile (setting exists; rendering not confirmed).
- Open-state styling of select2 panels.

### A.4 Takeaways from the observed motion

1. The reference's motion vocabulary is small: colour swaps (300 ms linear), one card lift, a 100 ms dropdown, a 250 ms drawer and a jQuery accordion. Everything else is static.
2. The best observed ideas worth keeping conceptually: the **card lift + shadow** on service cards, the **sticky nav band**, the **single-open accordion**, and the **right-side drawer with overlay**.
3. The weakest observed behaviours: instant header snap, whole-card colour flood on hover (hurts illustration legibility), lazy images popping in with no fade, no sticky header on mobile, linear easing on buttons.

---

## Part B — Recommended Motion Enhancements

Design intent: calm, premium, service-business. Motion should confirm actions and guide attention, never decorate. Budget: no animation longer than 700 ms; at most one "hero moment" per page; everything respects `prefers-reduced-motion`.

Priority key — **P1** ship for launch · **P2** polish · **P3** optional.

### B.1 Header

| Item | Priority | Spec |
|---|---|---|
| Sticky on all breakpoints | P1 | `position: sticky; top: 0` on the header wrapper (not fixed → no layout jump). Mobile included (reference is not sticky on mobile). |
| Compact on scroll | P1 | After `scrollY > 24`: height `--header-h` (80) → `--header-h-compact` (64), background from transparent/brand to solid white (or brand) with `--shadow-sm`, logo scales 1 → 0.9. Animate `height`, `background-color`, `box-shadow`, `transform` over `--dur-base` (250 ms) `--ease-out`. |
| Top utility bar | P2 | 40 px bar (phone, rating badge) collapses with `height` → 0 + opacity over 200 ms when compact; on mobile it is replaced by a phone icon button in the header. |
| Hide on scroll down / reveal on scroll up | P3 | Only on mobile, only after 160 px scrolled, `translateY(-100%)` ↔ `0` over 250 ms `--ease-in-out`. Keep visible when the drawer is open or a form field is focused. |
| Nav underline | P1 | 2 px underline `scaleX(0 → 1)`, `transform-origin: left`, 200 ms `--ease-out`; active route keeps it at 1. |

### B.2 Hero entrance (home + page banners)

| Item | Priority | Spec |
|---|---|---|
| Headline line reveal | P1 | Split H1 into lines (not characters). Each line wrapped in an `overflow:hidden` mask; lines `translateY(100%) → 0` + opacity `0 → 1`, 600 ms `--ease-out`, stagger 90 ms. Starts 100 ms after mount. |
| Lead, trust row, CTAs | P1 | Fade-up 16 px, 500 ms, start 350 ms / 450 ms / 550 ms respectively (`StaggerGroup`). |
| Hero media | P1 | Background image/video container `opacity 0 → 1` + `scale 1.04 → 1` over 900 ms `--ease-out` from mount. Poster image shown instantly for LCP; video fades over it when `canplay`. |
| Trust/stat strip below hero | P2 | Slides up 24 px + fade, 500 ms, delay 600 ms; numbers run `CountUp` once visible. |
| Reduced motion | P1 | All of the above collapse to a single 200 ms opacity fade with no transforms. |

### B.3 Scroll reveal system (site-wide)

- **P1** `Reveal` wrapper: `opacity 0 → 1`, `translateY(24px) → 0`, 600 ms (`--dur-reveal`), `--ease-out`, trigger `once: true`, viewport margin `0px 0px -10% 0px` (fires when element is 10 % inside the bottom edge), `amount: 0.2`.
- **P1** `StaggerGroup`: children stagger 80 ms (max 8 children → cap total delay at ~560 ms; beyond that, group into rows).
- Apply to: section heading blocks (eyebrow → title → lead as one group), card grids (each card), split-section text columns and media, step cards, price cards, FAQ list (group, not per item), footer columns (single reveal).
- Do **not** apply to: header, hero (has its own choreography), forms (must be interactive immediately), content above the fold on internal pages other than the banner.
- Distance never exceeds 32 px; never animate `height`, `width`, `margin` on scroll.

### B.4 Cards

| Item | Priority | Spec |
|---|---|---|
| Service card hover | P1 | `translateY(-6px)`, shadow `--shadow-md → --shadow-lg`, border `line → primary-100`, illustration `scale(1.04)`. 250 ms `--ease-out`. **No background flood** (keeps illustration + text legible). Focus-visible mirrors hover. |
| Price card hover | P2 | Lift 4 px + `--shadow-lg`; featured card is already elevated and only gains 2 px. |
| Testimonial card | P3 | No hover motion; carousel handles interaction. |
| Area / city tile | P2 | Pin icon bounces 2 px once on hover (300 ms), background `surface-1`. |
| Active/pressed | P1 | `scale(0.98)` for 100 ms on `:active` for all cards that are links. |

### B.5 Images

- **P2** Image reveal on scroll: wrapper `clip-path: inset(0 0 100% 0) → inset(0)` over 700 ms `--ease-out` combined with inner image `scale(1.08 → 1)`. Use for split-section photos and the page-banner image. Fallback (reduced motion): opacity only.
- **P2** Linked image hover: inner `scale(1.04)` over 600 ms `--ease-out`.
- **P1** Lazy-loaded images fade in over 300 ms when `onLoad` fires (fixes the reference's pop-in); reserve space with explicit aspect ratios so there is no CLS.

### B.6 Stats

- **P2** `CountUp`: from 0 to target over 1200 ms with `--ease-out`, starts when 50 % visible, runs once; suffix ("+", "%", "★") rendered statically; uses `tabular-nums` to avoid width jitter. Reduced motion: render final number immediately.

### B.7 Accordion (FAQ)

- **P1** Height animation using Motion `animate={{ height: open ? "auto" : 0, opacity }}` (Motion interpolates `auto`), 250 ms `--ease-out` open, 200 ms close. Icon: `Plus` rotates 45° (→ ×) over 200 ms and tints `primary-500`. Single-open by default. Panel `overflow:hidden` during animation only.
- **P2** Opened item scrolls into view if its top is above the sticky header (`scrollIntoView({block:'nearest'})`).

### B.8 Mobile drawer

- **P1** Panel slides from the right: `x: 100% → 0`, 300 ms `--ease-out` open / 220 ms `--ease-in-out` close. Width `min(84vw, 360px)`. Backdrop `rgba(15,34,56,.55)` fades 200 ms. Body scroll locked. Items stagger-fade 40 ms each (max 8). A full-width primary "Book now" button and the phone number sit pinned at the bottom of the panel (reference lacks a CTA in its menu).
- **P1** Focus trap inside the panel; `Escape` closes; focus returns to the hamburger; hamburger icon morphs `Menu` → `X` with a 200 ms cross-fade (or a 3-line SVG morph, P3).
- Sub-menus inside the drawer expand with the accordion spec (B.7).

### B.9 Dropdown (desktop)

- **P1** `opacity 0 → 1`, `translateY(8px) → 0`, 180 ms `--ease-out` open; 120 ms close. Chevron rotates 180°. Open on hover **and** focus/click (keyboard reachable); 120 ms close-intent delay so diagonal mouse travel does not close it. Panel radius `--radius-md`, `--shadow-lg` (no transparency — the reference's 96.5 % white looks unintentional).

### B.10 Buttons

- **P1** Hover: background shade (`primary-500 → primary-600`), `translateY(-1px)`, optional `--shadow-primary`; 250 ms `--ease-out`. Trailing arrow icon `translateX(3px)` on hover.
- **P1** Active: `translateY(0) scale(0.98)`, 100 ms.
- **P2** Loading state for form submit: label fades to a 16 px spinner (`Loader2` rotating 1 s linear), button width locked to avoid jump.
- Focus-visible: 2 px `accent-500` ring, no animation needed.

### B.11 Carousels (testimonials, "where we work" photos, mobile service tiles if used)

- **P1** Embla or Keen-slider style: drag/swipe with snap, 1.15 slides visible on mobile (peek), arrows + dots on desktop, `aria-roledescription="carousel"`, no autoplay by default. If autoplay is enabled for logos: 5 s interval, pause on hover/focus/visibility change, visible pause control.
- Reduced motion: disable autoplay and snap without easing (`duration: 0`).

### B.12 Forms

- **P1** Field focus: border colour + 3 px ring, 150 ms (`--dur-fast`). Error message slides down 4 px + fades, 200 ms; shake is **not** recommended.
- **P1** Submit success: form fades to a success panel (check icon draws its stroke over 400 ms, text fades up 20 px), keeps the same height to avoid layout shift. Error toast slides up from the bottom-right (desktop) / bottom (mobile) and auto-dismisses after 6 s with a visible close control.

### B.13 Page transitions

- **P1** None by default (App Router streaming + instant navigation is the premium feel). Optionally (**P3**) a 150 ms opacity fade on `main` via a `template.tsx` — never slide/scale whole pages, never block navigation.

### B.14 Decorative motion (P3, optional)

- Soft "clean air" particle/gradient drift behind the hero (CSS keyframes, 20–30 s, opacity ≤ 0.15), disabled on reduced motion and on mobile.
- Marquee of brand/partner logos at 40 s linear loop, pause on hover.

---

## Part C — Implementation guidance

Stack: Next.js App Router, TypeScript, Tailwind, `motion` (Framer Motion v11+, import from `motion/react`), Lucide.

### C.1 Motion tokens in TypeScript

```ts
// lib/motion.ts
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};
export const dur = { fast: 0.15, base: 0.25, slow: 0.45, reveal: 0.6 };

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: dur.reveal, ease: ease.out } },
};
export const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};
export const stagger = (delayChildren = 0, staggerChildren = 0.08) => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});
```

### C.2 `Reveal`

```tsx
// components/motion/Reveal.tsx
"use client";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { fadeUp, fadeOnly } from "@/lib/motion";

type Props = HTMLMotionProps<"div"> & { delay?: number; as?: "div" | "section" | "li" };

export function Reveal({ delay = 0, as = "div", children, ...rest }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      variants={reduce ? fadeOnly : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
```

### C.3 `StaggerGroup`

```tsx
// components/motion/StaggerGroup.tsx
"use client";
import { motion, useReducedMotion } from "motion/react";
import { fadeUp, fadeOnly, stagger } from "@/lib/motion";

export function StaggerGroup({ children, className, step = 0.08 }: { children: React.ReactNode; className?: string; step?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={stagger(0, reduce ? 0 : step)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} variants={reduce ? fadeOnly : fadeUp}>{children}</motion.div>;
}
```

Usage: wrap a card grid in `StaggerGroup` and each card in `StaggerItem`. Cap children at ~8 per group; split long grids into rows.

### C.4 Hero line reveal

```tsx
// components/motion/SplitLines.tsx
"use client";
import { motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

export function SplitLines({ lines, className }: { lines: string[]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden" aria-hidden>
          <motion.span
            className="block"
            initial={reduce ? { opacity: 0 } : { y: "100%", opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
            transition={{ duration: reduce ? 0.2 : 0.6, ease: ease.out, delay: 0.1 + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
```

Author the hero headline as an array of lines in content config (not `<br>`); on small screens pass fewer, shorter lines or let `text-wrap: balance` handle wrapping inside a single line element.

### C.5 `CountUp`

```tsx
// components/motion/CountUp.tsx
"use client";
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export function CountUp({ to, suffix = "", duration = 1.2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!ref.current) return;
    if (!inView || reduce) { ref.current.textContent = to.toLocaleString("en-AU"); return; }
    const controls = animate(0, to, {
      duration, ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { ref.current!.textContent = Math.round(v).toLocaleString("en-AU"); },
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);
  return (<span className="tabular-nums"><span ref={ref}>0</span>{suffix}</span>);
}
```

### C.6 `AccordionItem`

```tsx
// components/ui/AccordionItem.tsx
"use client";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { useId } from "react";

export function AccordionItem({ q, a, open, onToggle }: { q: string; a: React.ReactNode; open: boolean; onToggle: () => void }) {
  const id = useId();
  const reduce = useReducedMotion();
  return (
    <div className="border-b border-line">
      <h3>
        <button
          id={`${id}-t`} aria-expanded={open} aria-controls={`${id}-p`} onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-4 text-left text-lg font-semibold text-ink min-h-[56px] focus-visible:outline-2 focus-visible:outline-accent-500"
        >
          {q}
          <motion.span animate={{ rotate: open ? 45 : 0, color: open ? "var(--color-primary-500)" : "var(--color-text-muted)" }} transition={{ duration: 0.2 }} aria-hidden>
            <Plus size={20} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-p`} role="region" aria-labelledby={`${id}-t`}
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: open ? 0.25 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-10 text-ink-body max-w-[65ch]">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

Parent keeps `openIndex` state for single-open behaviour.

### C.7 `MobileDrawer`

```tsx
// components/layout/MobileDrawer.tsx
"use client";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { FocusTrap } from "focus-trap-react"; // or implement manually

export function MobileDrawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeBtn.current?.focus();
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close menu" onClick={onClose}
            className="fixed inset-0 z-40 bg-secondary-800/55"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          />
          <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true, onDeactivate: onClose }}>
            <motion.aside
              role="dialog" aria-modal="true" aria-label="Site menu"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(84vw,360px)] flex-col bg-white shadow-lg"
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: open ? 0.3 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-16 items-center justify-between px-4">
                <span className="font-display font-bold">Menu</span>
                <button ref={closeBtn} onClick={onClose} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-md"><X /></button>
              </div>
              <motion.nav
                className="flex-1 overflow-y-auto px-2"
                initial="hidden" animate="visible"
                variants={{ visible: { transition: { staggerChildren: reduce ? 0 : 0.04, delayChildren: 0.1 } } }}
              >
                {children /* each item: motion.li with fadeUp variants, min-h-11 */}
              </motion.nav>
              <div className="border-t border-line p-4 flex flex-col gap-3">{/* Book now (primary), phone (secondary) */}</div>
            </motion.aside>
          </FocusTrap>
        </>
      )}
    </AnimatePresence>
  );
}
```

### C.8 Header scroll hook

```tsx
// hooks/useHeaderState.ts
"use client";
import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

export function useHeaderState(threshold = 24, hideAfter = 160) {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCompact(y > threshold);
    // optional hide-on-scroll-down (mobile only, P3)
    setHidden(y > hideAfter && y > prev);
  });
  return { compact, hidden };
}
```

```tsx
// components/layout/Header.tsx (excerpt)
<motion.header
  className="sticky top-0 z-30"
  animate={{ y: hidden && isMobile && !menuOpen ? "-100%" : 0 }}
  transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
>
  <motion.div
    className="transition-[background-color,box-shadow] duration-250 ease-out"
    animate={{ height: compact ? 64 : 80 }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    style={{ backgroundColor: compact ? "var(--color-bg)" : "transparent", boxShadow: compact ? "var(--shadow-sm)" : "none" }}
  >
    ...
  </motion.div>
</motion.header>
```

Use `sticky`, not `fixed`, so the page never jumps when the header changes height. Give the hero `padding-top` equal to `--header-h` only when the header is overlaid (transparent) on the hero.

### C.9 Dropdown

```tsx
<AnimatePresence>
  {open && (
    <motion.ul
      role="menu"
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 top-full mt-2 min-w-[240px] rounded-md bg-white p-3 shadow-lg"
    >…</motion.ul>
  )}
</AnimatePresence>
```

Open on `onMouseEnter` / `onFocus` within the item, close on `onMouseLeave` with a 120 ms timeout, on `Escape`, and on focus leaving the item (`onBlur` with `relatedTarget` check).

### C.10 Reduced motion (global)

```tsx
// app/providers.tsx
import { MotionConfig } from "motion/react";
<MotionConfig reducedMotion="user">{children}</MotionConfig>
```

Plus a CSS safety net for non-Motion transitions:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
```

### C.11 Performance rules

1. Animate only `transform` and `opacity` on scroll/hover. `height: auto` animation is reserved for accordions and the drawer sub-menus (user-initiated, small).
2. No `whileInView` on more than ~40 elements per page; group cards.
3. Avoid `will-change` except on the hero media and the drawer panel while open; remove it afterwards.
4. Hero video: `preload="none"`, `poster`, start playback after `requestIdleCallback`/`canplay`; serve ≤ 2.5 MB H.264 + WebM at 1280 px; do not load on `(max-width: 767px)` or when `navigator.connection.saveData` — show the poster instead.
5. Use `content-visibility: auto; contain-intrinsic-size: 1px 600px` on below-fold sections to cut render cost.
6. Images: `next/image` with explicit `sizes`, blur placeholder for hero/banner only, `loading="lazy"` default; fade-in on load (300 ms) via an `onLoad` state class.
7. Lucide icons are tree-shaken; do not animate SVG `d` paths on scroll.
8. Keep `motion` imports from `motion/react` and lazy-load heavy components (carousel) with `next/dynamic`.
9. Measure: LCP < 2.5 s on 4G for the hero poster; CLS < 0.05; no long tasks > 50 ms from motion.

### C.12 Accessibility rules

- Every animated entrance has a reduced-motion equivalent (opacity only, ≤ 200 ms) — `useReducedMotion` + `MotionConfig`.
- Content inside `Reveal` must be in the DOM and readable before animation (it is: only opacity/transform change). Never use `display:none` for unrevealed content.
- Accordion: `<h3><button aria-expanded aria-controls>` + `role="region"` panel; arrow keys optional, `Enter`/`Space` required.
- Drawer: `role="dialog" aria-modal`, focus trap, `Escape` closes, focus returns to the trigger, background inert (`inert` attribute on `main` when open, or `aria-hidden`).
- Dropdown: trigger is a `<button aria-haspopup="true" aria-expanded>`, items are links; closable with `Escape`; keyboard-openable.
- Carousel: `aria-roledescription="carousel"`, slides `role="group" aria-roledescription="slide" aria-label="n of N"`, visible prev/next buttons, no autoplay without a pause control; swipe gestures must have button equivalents.
- Count-up: final value is also present as `aria-label` on the stat so screen readers do not read intermediate numbers (set `aria-live="off"`).
- Hover-only effects must have focus-visible equivalents (`:focus-visible` mirrors `:hover` for cards, nav underline, buttons).
- No motion triggers on page load that flashes or exceeds 3 flashes/second; keep decorative loops ≤ 0.15 opacity.
- Sticky header must not cover focused elements: set `scroll-padding-top: var(--header-h)` on `html`.
