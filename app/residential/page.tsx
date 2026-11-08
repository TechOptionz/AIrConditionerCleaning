import type { Metadata } from "next";
import { sectors } from "@/content/sectors";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { SectorPage } from "@/components/templates/SectorPage";

export const metadata: Metadata = pageMetadata({
  title: "Residential Air Conditioning Cleaning",
  description: sectors.residential.metaDescription,
  path: "/residential",
  image: images.banners.residential.src,
});

export default function ResidentialPage() {
  return <SectorPage slug="residential" />;
}
