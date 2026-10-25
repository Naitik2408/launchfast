import type { Metadata } from "next";
import { Kalam, Caveat, Patrick_Hand, Permanent_Marker } from "next/font/google";
import "./globals.css";

// 1. Kalam - Clean, professional architect/designer handwritten font (perfect for UI labels & buttons)
const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
});

// 2. Caveat - Natural expressive cursive hand (for annotations, notes, and flourishes)
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

// 3. Patrick Hand - Neatly printed architectural drafting font
const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-draft",
});

// 4. Permanent Marker - Bold hand-inked brand mark / headers
const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
});

export const metadata: Metadata = {
  title: "SaaSCraft | Hand-Drawn Blueprint SaaS Starter",
  description: "Architectural hand-drawn UI for developers building production SaaS platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kalam.variable} ${caveat.variable} ${patrickHand.variable} ${permanentMarker.variable} min-h-screen bg-[#f5eedc] text-[#1c1a17] antialiased selection:bg-[#2c2824] selection:text-[#fbf9f4]`}
      >
        {children}
      </body>
    </html>
  );
}
