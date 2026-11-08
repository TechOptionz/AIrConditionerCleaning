import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a production verification build coexist with a running dev server.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1440, 1920, 2200],
    // Remote hosts are allowed so a stock image can be hot-swapped by URL in
    // content/images.ts without a redeploy of the /public folder.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  async redirects() {
    return [
      // Prototype used /book/thank-you; production uses /thank-you.
      { source: "/book/thank-you", destination: "/thank-you", permanent: true },
      { source: "/sectors/residential", destination: "/residential", permanent: true },
      { source: "/sectors/commercial", destination: "/commercial", permanent: true },
    ];
  },
};

export default nextConfig;
