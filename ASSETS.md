# Asset replacement guide

## Logo

The supplied **Northline Air Care Wave Logo.png** (stacked square lock-up) is the source for every
brand asset. It was cleaned (background-removal fringing snapped to the two brand colours,
navy `#001c3f` and teal `#0192a5`) and split, because the stacked lock-up is too tall for the header
and its navy wordmark is invisible on dark surfaces.

| File | Use |
|---|---|
| `public/brand/logo-mark.png` | Wave mark, navy + teal — header on light backgrounds |
| `public/brand/logo-mark-light.png` | Wave mark, white + pale teal — footer and the transparent header over dark banners |
| `public/brand/logo-full.png` | Complete lock-up (waves + wordmark + tagline) for light surfaces, social, print |
| `app/icon.png` | Favicon (192 px): wave mark on a white rounded square |
| `app/apple-icon.png` | Apple touch icon (180 px) |
| `public/brand/logo-mark*.svg` | Legacy placeholder marks, no longer referenced |

`components/layout/Logo.tsx` exports `LogoMark` (image), `Logo` (mark + text wordmark styled to
match the lock-up, with `tone="light" | "dark"`) and `LogoFull` (the whole lock-up).
To regenerate from a new source file, rerun the sharp script used during build-out or replace the
PNGs above keeping the same names and aspect ratios (mark is 2.845:1).

## Photography

All photos are free-licence stock from Unsplash / Pexels (credits kept in `content/images.ts`).
None show Northline Air Care's own work, and the gallery and before/after sections say so on the
page until you flip them.

**Fastest swap:** overwrite the file in `public/images/` with the same name (e.g. `hero-1.jpg`).
Landscape 3:2 at ~1920 px wide works everywhere; hero slides look best at 2200 px.

**Per-slot swap:** edit the entry in `content/images.ts` — change `src`, `alt` and remove the credit.
A remote `https://` URL also works (Unsplash and Pexels hosts are allowed in `next.config.ts`).

| Manifest key | Used on |
|---|---|
| `hero[0..3]` | Homepage slideshow |
| `services[slug].hero / .detail / .card` | Service banner, overview photo, grid card |
| `steps[0..4]` | Sticky "How it works" panel |
| `sectors.residential / .commercial` | Sticky "Where we work" panel |
| `banners.*` | Inner-page banners |
| `about.who`, `about.approach[]` | About page |
| `contact`, `book`, `cta` | Contact photo, booking sidebar, closing CTA band |
| `beforeAfter[]` | Comparison sliders — set `genuine: true` once real paired photos replace the stock pair |
| `gallery[]` | Recent work carousel — set `genuine: true` per item to drop the "Illustrative" caption |

Team photos: add `photo: SiteImage` to each member in `content/about.ts` and render it in
`app/about/page.tsx` in place of the `User` icon placeholder.

## Re-downloading stock

`npm run images:download` fetches any missing file listed in `scripts/download-images.mjs`.

## Replacement checklist (redesign, Nov 2026)

Slots that still use stock or illustrative photography and should be replaced with Northline job photos
before launch. Swap the file in `public/images/` (same name) or edit the entry in `content/images.ts`.

| Slot (`content/images.ts`) | Current file | What to supply |
|---|---|---|
| `home.hero` | `uc-filter-service.jpg` (1536 px) | Landscape technician photo ≥ 1920 px wide, subject in the right two-thirds |
| `home.about` / `home.aboutDetail` | `uc-wash-bag-rinse-hero.jpg` / `uc-tech-cap.jpg` | 4:3 wash-bag photo + a square close-up |
| `beforeAfter[0]` | `uc-filter-dusty.jpg` + `uc-filter-blue.jpg` | Same unit, same angle, before and after. Set `genuine: true` to switch the stacked pair to the interactive slider |
| `gallery[]` | `uc-*.jpg` technique photos | Real job photos; captions describe the technique shown |
| `services.cassette-cleaning.*` | `cassette-unit.jpg`, `cassette-unit-2.jpg` (Wikimedia Commons, CC BY-SA 4.0) | Own cassette photos; removing these also removes the footer credit |
| `services.under-ceiling-cleaning.hero/card` | `suspended-unit.jpg` (Wikimedia Commons, CC BY-SA 4.0) | Own photo of a suspended under-ceiling unit |
| `services.ducted-system-cleaning.detail` | `ceiling-diffuser.jpg` (Pexels) | Own ducted outlet / return grille photo |
| `services.bulkhead-cleaning.hero` | `return-grille.jpg` (Pexels) | Own bulkhead grille photo |
| `services.outdoor-condenser-cleaning.*` | stock condensers | Own outdoor-unit photos |
| `about.who` | `uc-blue-bag-spray.jpg` | Team / technician photo, 5:4 |
| `sectors.residential` | `hero-2.jpg` (stock interior) | Home interior with a visible unit |
| `banners.*` | mixed | 5:4 photos for the split page banners |

`about-who.jpg`, `hero-1.jpg` and the `*-detail.jpg` condenser files show refrigerant gauges or outdoor units
and are no longer referenced; they can be deleted once confirmed unused.

## Decorative library

Geometric accents (accent lines, corner brackets, blue blocks, airflow curves, numbered labels,
check rows, info panels, badges) live in `components/ui/Accents.tsx`. Section heading variants
(editorial / centered / split / numbered) live in `components/ui/SectionHeading.tsx`.

## Licences

- Pexels and Unsplash photos need no attribution.
- Client-supplied `uc-*.jpg` photos are used with permission.
- Three Wikimedia Commons photos (`cassette-unit.jpg`, `cassette-unit-2.jpg`, `suspended-unit.jpg`) are CC BY-SA 4.0 and
  **must stay attributed**: the footer renders `ccAttributions` from `content/images.ts`. Remove the entry when the photo is replaced.
