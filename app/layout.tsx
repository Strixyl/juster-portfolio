import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juster - Portfolio",
  description: "Web & Mobile Design Expert",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}