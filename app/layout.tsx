import type { Metadata } from "next";
import { Silkscreen, Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silkscreen",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

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
    <html
      lang="en"
      className={`dark ${silkscreen.variable} ${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased overflow-x-hidden bg-studio-bg text-studio-fg font-sans">
        {children}
      </body>
    </html>
  );
}
