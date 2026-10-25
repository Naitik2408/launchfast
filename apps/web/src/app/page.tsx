"use client";

import Image from "next/image";
import Link from "next/link";
import PricingSection from "../components/pricing-section";

export default function HomePage() {
  const demoUrl = process.env.NEXT_PUBLIC_DEMO_URL || (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:3001" : "https://demo.launchfast.naitik.work");

  const steps = [
    {
      step: "01",
      src: "/card-box1.png",
      alt: "Acquire the pre-built template box",
      headline: "1. Grab the template box",
      caption: "All the boring plumbing pre-wired.",
      note: "auth + database + stripe",
      arrowCurvature: "right",
    },
    {
      step: "02",
      src: "/card-box2.png",
      alt: "Wrap and customize with your brand",
      headline: "2. Wrap your idea",
      caption: "Add your UI & core product logic.",
      note: "full source ownership ✎",
      arrowCurvature: "straight",
    },
    {
      step: "03",
      src: "/card-box3.png",
      alt: "Launch your SaaS into production",
      headline: "3. Launch in 48 hours",
      caption: "Deploy and collect real customer payments.",
      note: "ready for liftoff 🚀",
      arrowCurvature: "left",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5eedc] text-[#1c1a17] paper-grid selection:bg-[#231f1c] selection:text-[#f5eedc] flex flex-col justify-between overflow-x-hidden">
      {/* Balanced layout container */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-8 md:px-10 py-4 sm:py-6 flex-1 flex flex-col">
        {/* ========================================================================= */}
        {/* HEADER (Logo, Pricing, Demo)                                              */}
        {/* ========================================================================= */}
        <header className="relative flex items-center justify-between pb-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 sm:gap-2.5">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 sketch-border flex items-center justify-center bg-transparent group-hover:rotate-[-2deg] transition-transform shrink-0">
              <svg
                width="20"
                height="20"
                className="sm:w-6 sm:h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="8" strokeDasharray="30" strokeDashoffset="2" />
                <path d="M12 7 L12 17" />
                <path d="M7 12 L17 12" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-hand-marker text-xl sm:text-2xl tracking-wide leading-none text-[#1c1a17]">
                Launch<span className="text-[#3a3530]">Fast</span>
              </span>
              <span className="font-hand-note text-xs sm:text-[13px] text-[#554e46] leading-none mt-0.5 tracking-tight">
                boilerplate v1.0 ✎
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-4 sm:gap-8">
            <a
              href="#pricing"
              className="relative font-hand-ui text-base sm:text-xl font-bold tracking-wide text-[#1c1a17] hover:text-black transition-colors group"
            >
              <span>Pricing</span>
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-2 text-[#231f1c] opacity-70 group-hover:opacity-100 transition-opacity"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <path d="M 2 8 C 25 3, 75 11, 98 6" />
              </svg>
            </a>

            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="sketch-btn px-3.5 sm:px-5 py-1 sm:py-1.5 bg-[#f5eedc] text-[#1c1a17] font-hand-draft text-sm sm:text-lg font-bold tracking-wide flex items-center gap-1.5 sm:gap-2 hover:bg-[#eae2cf] transition-colors"
            >
              <span>Live Demo</span>
              <span className="font-hand-note text-base sm:text-lg leading-none">↗</span>
            </a>
          </nav>

          {/* Hand-Drawn Divider */}
          <svg
            className="absolute bottom-0 inset-x-0 w-full h-[6px] text-[#231f1c] opacity-60"
            viewBox="0 0 1000 6"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          >
            <path d="M 0 3 Q 250 1, 500 3.5 T 1000 2.5" />
          </svg>
        </header>

        {/* ========================================================================= */}
        {/* HERO SECTION: MINIMALIST, VISUAL-FIRST STORYTELLING                       */}
        {/* ========================================================================= */}
        <section className="pt-8 sm:pt-14 md:pt-16 pb-8 sm:pb-12 flex-1 flex flex-col justify-center">
          {/* Subtle Hand-Drawn Headline */}
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 px-2 space-y-1 sm:space-y-1.5">
            <h1 className="font-hand-marker text-2xl sm:text-4xl text-[#1c1a17] tracking-wide leading-tight">
              Ship your SaaS this weekend.
            </h1>
            <p className="font-hand-draft text-sm sm:text-lg text-[#554e46]">
              A complete Next.js boilerplate that skips 3 weeks of repetitive plumbing.
            </p>
          </div>

          {/* 3 Story Cards with Hand-Sketched Connecting Arrows */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 items-start max-w-lg md:max-w-none mx-auto w-full">
            {/* Hand-drawn connecting pencil arrow 1 -> 2 */}
            <div className="hidden md:block absolute top-[28%] left-[30%] -translate-x-1/2 w-20 h-10 pointer-events-none z-10 text-[#3a3530]/70">
              <svg viewBox="0 0 80 40" fill="none" className="w-full h-full stroke-current" strokeWidth="1.6" strokeLinecap="round">
                <path d="M 8 26 Q 40 8 70 20" />
                <path d="M 60 14 L 72 20 L 62 27" />
              </svg>
            </div>

            {/* Hand-drawn connecting pencil arrow 2 -> 3 */}
            <div className="hidden md:block absolute top-[28%] left-[64%] -translate-x-1/2 w-20 h-10 pointer-events-none z-10 text-[#3a3530]/70">
              <svg viewBox="0 0 80 40" fill="none" className="w-full h-full stroke-current" strokeWidth="1.6" strokeLinecap="round">
                <path d="M 8 26 Q 40 8 70 20" />
                <path d="M 60 14 L 72 20 L 62 27" />
              </svg>
            </div>

            {steps.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group w-full">
                <div className="relative w-full aspect-[4/3] max-w-[280px] sm:max-w-[320px] md:max-w-none flex items-center justify-center hover:scale-[1.03] transition-all duration-200">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 360px"
                    className="object-contain filter drop-shadow-[4px_6px_1px_rgba(35,31,28,0.42)] hover:drop-shadow-[6px_9px_1px_rgba(35,31,28,0.28)] transition-all duration-200"
                    priority
                  />
                </div>

                <div className="mt-3 space-y-1 max-w-[260px]">
                  <h3 className="font-hand-ui text-lg sm:text-xl font-bold text-[#1c1a17]">
                    {item.headline}
                  </h3>
                  <p className="font-hand-draft text-xs sm:text-sm text-[#554e46] leading-snug">
                    {item.caption}
                  </p>
                  
                  <div className="pt-1.5 flex items-center justify-center gap-1.5 text-[#3a3530]">
                    <span className="font-hand-note text-sm sm:text-base font-semibold">
                      ({item.note})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Clean Bottom Action Bar */}
          <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center px-4">
            <a
              href="#pricing"
              className="sketch-btn w-full sm:w-auto px-7 py-2.5 bg-[#231f1c] text-[#f5eedc] font-hand-draft text-base sm:text-lg font-bold tracking-wide shadow-[3px_3px_0px_#554e46] hover:bg-[#38322d] transition-all"
            >
              Get The Template &rarr;
            </a>

            <div className="flex items-center gap-1.5 sm:gap-2 font-hand-note text-sm sm:text-lg text-[#554e46]">
              <span>✎</span>
              <span>Next.js 16 • Supabase • Stripe • Resend</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PRICING & RAZORPAY CODE DELIVERY (Option B GitHub Collaboration)          */}
        {/* ========================================================================= */}
        <PricingSection demoUrl={demoUrl} />

        {/* ========================================================================= */}
        {/* FOOTER: HAND-DRAWN PAPER ARTIST FOOTER                                    */}
        {/* ========================================================================= */}
        <footer className="relative pt-8 pb-4 mt-auto">
          {/* Top Wavy Pencil Line Divider */}
          <svg
            className="absolute top-0 inset-x-0 w-full h-[6px] text-[#231f1c] opacity-60"
            viewBox="0 0 1000 6"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          >
            <path d="M 0 3 Q 250 1.5, 500 3.8 T 1000 2.8" />
          </svg>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pt-2">
            {/* Left: Brand */}
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="font-hand-marker text-xl tracking-wide text-[#1c1a17]">
                LaunchFast
              </span>
              <span className="font-hand-note text-xs sm:text-sm text-[#554e46]">
                — drawn for builders ✎
              </span>
            </div>

            {/* Center / Right: Quick Navigation & Hand-sketched links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-hand-ui text-sm sm:text-base font-semibold text-[#3a3530]">
              <a
                href="#pricing"
                className="hover:text-black transition-colors relative group"
              >
                <span>Pricing</span>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-200 h-[1.5px] bg-[#231f1c]" />
              </a>

              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black transition-colors relative group"
              >
                <span>Live Demo</span>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-200 h-[1.5px] bg-[#231f1c]" />
              </a>

              <a
                href="https://github.com/Naitik2408/launchfast"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black transition-colors flex items-center gap-1.5"
              >
                <span>GitHub</span>
                <span className="font-hand-note text-xs">↗</span>
              </a>
            </div>
          </div>

          {/* Bottom Row: Copyright in its own line */}
          <div className="mt-4 pt-3 border-t border-[#231f1c]/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#716960] text-center sm:text-left">
            <p className="font-hand-draft">
              © 2026 LaunchFast Boilerplate Platform. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-hand-note">
              <span>Built on Next.js 16 + Supabase + Stripe + Tailwind</span>
              <span className="hidden sm:inline">•</span>
              <span>Hand-sketched blueprint edition ✎</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
