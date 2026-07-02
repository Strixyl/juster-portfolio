import "./globals.css";

export const metadata = {
  title: "JUSTER | Independent Brand Studio",
  description: "Designer for brands that refuse to blend in.",
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