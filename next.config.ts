import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // The Vercel image optimizer returned 402 (quota exhausted), which broke
    // every image on the site. Serving originals instead: local files come
    // from /public, and Sanity images are already requested at a fixed width
    // and quality via urlFor(), so they arrive pre-sized.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
