// Imports client-supplied photos into /public/images as optimised JPEGs.
//
//   npm run images:import -- "C:/Users/me/Downloads/new-photos"     (a folder)
//   npm run images:import -- photo-a.jpg photo-b.png                (or files)
//
// Each file becomes public/images/uc-<slug>.jpg (metadata stripped, never upscaled,
// longest side capped at 2400 px). Existing files are not overwritten unless --force.
// Then reference the new name in content/images.ts with own("uc-<slug>", "alt text", "focal").
import { readdir, stat, access } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const force = args.includes("--force");
const inputs = args.filter((a) => a !== "--force");
if (!inputs.length) {
  console.error('Usage: npm run images:import -- <folder|file> [...] [--force]');
  process.exit(1);
}

const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const files = [];
for (const p of inputs) {
  const st = await stat(p);
  if (st.isDirectory()) for (const f of await readdir(p)) { if (EXT.has(extname(f).toLowerCase())) files.push(join(p, f)); }
  else files.push(p);
}

const slug = (f) => "uc-" + basename(f, extname(f)).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
const outDir = join(process.cwd(), "public", "images");

for (const f of files) {
  const name = slug(f);
  const out = join(outDir, name + ".jpg");
  if (!force) { try { await access(out); console.log(`- ${name} exists, skipped (use --force)`); continue; } catch {} }
  const meta = await sharp(f).metadata();
  await sharp(f)
    .rotate()
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(out);
  const orient = meta.height > meta.width ? "portrait" : "landscape";
  const warn = Math.max(meta.width, meta.height) < 1200 ? "  (small: fine for cards and galleries, soft in full-width banners)" : "";
  console.log(`✓ ${name}.jpg  ${meta.width}x${meta.height} ${orient}${warn}`);
}
