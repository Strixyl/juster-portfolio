import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://juster-portfolio.vercel.app"),
  title: "JUSTER | Frontend Developer",
  description: "Designer for brands that refuse to blend in.",
  openGraph: {
    title: "JUSTER | Frontend Developer",
    description: "Designer for brands that refuse to blend in.",
    url: "https://juster-portfolio.vercel.app/",
    siteName: "Juster Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Juster Portfolio Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JUSTER | Frontend Developer",
    description: "Designer for brands that refuse to blend in.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased overflow-x-hidden bg-[#121316] text-[#e3e2e6]">
        {children}
      </body>
    </html>
  );
}