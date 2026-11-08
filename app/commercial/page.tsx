import type { Metadata } from "next";
import { sectors } from "@/content/sectors";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { SectorPage } from "@/components/templates/SectorPage";

export const metadata: Metadata = pageMetadata({
  title: "Commercial Air Conditioning Cleaning",
  description: sectors.commercial.metaDescription,
  path: "/commercial",
  image: images.banners.commercial.src,
});

export default function CommercialPage() {
  return <SectorPage slug="commercial" />;
}
