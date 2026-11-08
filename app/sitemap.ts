import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (p: string) => new URL(p, site.url).toString();
  const statics: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/residential", priority: 0.8, freq: "monthly" },
    { path: "/commercial", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "yearly" },
    { path: "/faq", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "yearly" },
    { path: "/book", priority: 0.9, freq: "yearly" },
    { path: "/privacy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
  ];
  return [
    ...statics.map((s) => ({ url: url(s.path), lastModified: now, changeFrequency: s.freq, priority: s.priority })),
    ...services.map((s) => ({ url: url(`/services/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
