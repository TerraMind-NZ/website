import type { Metadata } from "next";
import { Fraunces, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const DESCRIPTION =
  "TerraMind converts weather and agronomic predictions into block-level, dollar-denominated recommendations for New Zealand growers — calibrated probabilities, not dashboard noise.";

export const metadata: Metadata = {
  metadataBase: new URL("https://terramind.co.nz"),
  title: "TerraMind",
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "TerraMind",
    title: "TerraMind",
    description: DESCRIPTION,
    url: "/",
    images: [{ url: "/logo.png", width: 2000, height: 2000 }],
  },
  twitter: {
    card: "summary",
    title: "TerraMind",
    description: DESCRIPTION,
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${manrope.variable} ${spaceMono.variable}`}
    >
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
