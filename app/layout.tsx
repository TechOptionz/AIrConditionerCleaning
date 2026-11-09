import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/layout/JsonLd";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { organisationJsonLd } from "@/lib/seo";

const manrope = Manrope({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `Air Conditioning Cleaning & Servicing | ${site.name}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  icons: { icon: [{ url: "/icon.png", type: "image/png", sizes: "192x192" }], apple: "/apple-icon.png" },
  openGraph: { type: "website", siteName: site.name, locale: "en_AU" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${manrope.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#content"
          className="absolute left-[-999px] top-2 z-[100] rounded-sm bg-navy-900 px-3.5 py-2.5 font-semibold text-white no-underline focus:left-2"
        >
          Skip to content
        </a>
        <MotionProvider>
          <TopBar />
          <Header />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <JsonLd data={organisationJsonLd()} />
      </body>
    </html>
  );
}
