import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Kalam, Caveat, Patrick_Hand, Permanent_Marker } from "next/font/google";
import "./globals.css";

// 1. Kalam - Clean, professional architect/designer handwritten font
const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
});

// 2. Caveat - Natural expressive cursive hand
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

export const viewport: Viewport = {
  themeColor: "#f5eedc",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://launchfast.naitik.work"),
  title: {
    default: "LaunchFast — Next.js 16 SaaS Boilerplate & Starter Kit",
    template: "%s | LaunchFast",
  },
  description:
    "Launch your next SaaS in hours, not weeks. Production-grade Next.js 16 boilerplate pre-configured with Supabase Auth, Stripe Subscriptions, and architectural hand-drawn UI.",
  keywords: [
    "nextjs 16 saas boilerplate",
    "saas starter kit",
    "next.js supabase stripe starter",
    "hand drawn ui saas template",
    "nextjs boilerplates 2026",
    "indie hacker boilerplate",
    "micro saas template",
    "turborepo saas starter",
    "launchfast",
  ],
  authors: [{ name: "Naitik Kumar", url: "https://naitik.work" }],
  creator: "Naitik Kumar",
  publisher: "LaunchFast",
  alternates: {
    canonical: "https://launchfast.naitik.work",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://launchfast.naitik.work",
    siteName: "LaunchFast",
    title: "LaunchFast — Next.js 16 SaaS Boilerplate & Starter Kit",
    description:
      "Production-ready Next.js 16 + Supabase Auth + Stripe Subscriptions boilerplate with architectural hand-drawn UI aesthetic. Ship your SaaS in 24 hours.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LaunchFast — Hand-Drawn Blueprint SaaS Starter Kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchFast — Next.js 16 SaaS Boilerplate & Starter Kit",
    description:
      "Production-ready Next.js 16 + Supabase Auth + Stripe Subscriptions boilerplate with architectural hand-drawn UI aesthetic.",
    creator: "@naitik_dev",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-C9H6CTR6F2";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "LaunchFast SaaS Starter Kit",
        operatingSystem: "Cross-platform",
        applicationCategory: "DeveloperApplication",
        offers: {
          "@type": "Offer",
          price: "49.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://launchfast.naitik.work/#pricing",
        },
        description:
          "Production-ready Next.js 16 boilerplate with Supabase Auth, Stripe Subscriptions, and architectural hand-drawn UI.",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "48",
        },
      },
      {
        "@type": "WebSite",
        url: "https://launchfast.naitik.work",
        name: "LaunchFast",
        description: "Production-ready Next.js 16 SaaS Boilerplate",
        publisher: {
          "@type": "Person",
          name: "Naitik Kumar",
          url: "https://naitik.work",
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data (Schema.org JSON-LD for rich Google snippets) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${kalam.variable} ${caveat.variable} ${patrickHand.variable} ${permanentMarker.variable} min-h-screen bg-[#f5eedc] text-[#1c1a17] antialiased selection:bg-[#2c2824] selection:text-[#fbf9f4]`}
      >
        {children}

        {/* Google Analytics (GA4) */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
