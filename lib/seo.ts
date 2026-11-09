import type { Metadata } from "next";
import { site } from "@/content/site";
import { isPlaceholder } from "./utils";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

/** Builds consistent per-route metadata with canonical + Open Graph + Twitter. */
export function pageMetadata({ title, description, path, image, noIndex }: PageMeta): Metadata {
  const url = new URL(path, site.url).toString();
  // Default share image must be landscape: hero-3 is 2200×1467 (3:2).
  const ogImage = image ?? "/images/hero-3.jpg";
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_AU",
      type: "website",
      // Dimensions describe the default image only; omit them for custom images.
      images: [image ? { url: ogImage, alt: site.name } : { url: ogImage, width: 2200, height: 1467, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

/**
 * Organisation / LocalBusiness JSON-LD built only from verified fields.
 * Placeholder values (e.g. "[EMAIL]") are omitted so no fabricated data is published.
 */
export function organisationJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    description: site.description,
    image: `${site.url}/images/hero-3.jpg`,
    logo: `${site.url}/brand/logo-full.png`,
    areaServed: { "@type": "Country", name: "Australia" },
  };
  if (!site.phoneIsPlaceholder) data.telephone = site.phone;
  if (!isPlaceholder(site.email)) data.email = site.email;
  return data;
}

export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: "Air conditioning cleaning",
    url: new URL(input.path, site.url).toString(),
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "Country", name: "Australia" },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: new URL(it.path, site.url).toString(),
    })),
  };
}
