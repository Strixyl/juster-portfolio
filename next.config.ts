import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Forces Next.js to compile static HTML/CSS/JS files
  images: {
    unoptimized: true, // Prevents server-side image scaling bugs during export
  },
};

export default nextConfig;