import type { NextConfig } from "next";

/** cPanel / shared hosting: single Next.js process, no Flask proxy */
const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  serverExternalPackages: ["@prisma/client"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "stephenasatsa.com" },
      { protocol: "https", hostname: "www.stephenasatsa.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
    unoptimized: process.env.CPANEL_IMAGE_UNOPTIMIZED === "true",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
