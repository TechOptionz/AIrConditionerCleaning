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
