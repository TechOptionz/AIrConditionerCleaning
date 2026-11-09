// Downloads the licensed stock photography referenced by the approved design
// into /public/images so next/image can optimise it locally.
// Re-run with `npm run images:download`. Replace any file in /public/images
// with a real job photo of the same name to swap it site-wide.
import { mkdir, writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const U = (id, w = 1920) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const P = (id, w = 1920) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const IMAGES = {
  // Hero slideshow
  "hero-1": P("32588555", 2200),
  "hero-2": U("photo-1761330440311-16e160cad236", 2200),
  "hero-3": U("photo-1762341123870-d706f257a12e", 2200),
  "hero-4": P("7347538", 2200),
  // Service photography
  "split-hero": U("photo-1702443418982-9aeb9e04b322"),
  "split-detail": U("photo-1757219525975-03b5984bc6e8"),
  "ducted-hero": U("photo-1665826254141-bfa10685e002"),
  "ducted-detail": U("photo-1745745593296-28fd43a6ebba"),
  "ducted-card": U("photo-1665826189237-19707ccb073b"),
  "cassette-hero": U("photo-1737012197886-7d5a52ded45b"),
  "cassette-detail": U("photo-1667983453881-4992fe86ab1b"),
  "cassette-card": U("photo-1785682118449-21da8825754d"),
  "under-ceiling-detail": U("photo-1681042803902-f79c240d8f03"),
  "bulkhead-detail": U("photo-1776860150250-757406c52438"),
  "window-hero": U("photo-1718203862467-c33159fdc504"),
  "window-detail": P("5698162"),
  "window-card": U("photo-1722131646940-b821a6cc6252"),
  "portable-hero": U("photo-1705444509014-fed54b6191bf"),
  "outdoor-hero": U("photo-1550998251-1e18917c975c"),
  "outdoor-detail": P("13061307"),
  "outdoor-card": U("photo-1679303777007-c6c4522beb02"),
  // Process / banners / misc
  "step-1": P("6471912"),
  "step-2": P("32497161"),
  "step-3": P("5463587"),
  "banner-services": P("5463575"),
  "about-who": P("6471911"),
  "about-approach-2": P("6471913"),
  "about-approach-3": P("2569874"),
  "contact-photo": P("27681472"),
  "banner-book": P("5463581"),
  "book-photo": P("5463583"),
  // Indoor photography (added for the indoor-service restructure)
  "indoor-split": P("38788452"),
  "indoor-living": P("6588599"),
  "indoor-remote": P("16695385"),
  // Service-specific units added in the redesign (resized to 1920 px on import)
  "cassette-unit": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Hitachi_cassette_air_conditioner.jpg", // CC BY-SA 4.0, Nameless245
  "cassette-unit-2": "https://upload.wikimedia.org/wikipedia/commons/9/92/Ceiling_air_conditioner.JPG", // CC BY-SA 4.0, Antonio Mette
  "suspended-unit": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Daikin_ceiling_suspended_air_conditioner.jpg", // CC BY-SA 4.0, Nameless245
  "ceiling-diffuser": P("36248286"),
  "return-grille": P("34578854"),
};

const outDir = join(process.cwd(), "public", "images");
await mkdir(outDir, { recursive: true });
let ok = 0, skipped = 0, failed = [];
for (const [key, url] of Object.entries(IMAGES)) {
  const file = join(outDir, `${key}.jpg`);
  try { await access(file); skipped++; continue; } catch {}
  try {
    const res = await fetch(url, { headers: { Accept: "image/jpeg,image/*" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 10000) throw new Error("suspiciously small response");
    await writeFile(file, buf);
    ok++;
    console.log(`✓ ${key} (${Math.round(buf.length / 1024)} KB)`);
  } catch (e) {
    failed.push(key);
    console.error(`✗ ${key}: ${e.message}`);
  }
}
console.log(`\nDownloaded ${ok}, skipped ${skipped} existing, failed ${failed.length}${failed.length ? ": " + failed.join(", ") : ""}`);
