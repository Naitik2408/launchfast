"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PricingSection from "../components/pricing-section";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
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
        {/* HEADER (Logo, Hamburger, Desktop Nav)                                     */}
        {/* ========================================================================= */}
        <header className="relative pb-4">
          <div className="flex items-center justify-between">
            {/* Logo: Clean LaunchFast brand name without icon */}
            <Link href="/" className="group flex flex-col">
              <span className="font-hand-marker text-2xl sm:text-3xl tracking-wide leading-none text-[#1c1a17]">
                Launch<span className="text-[#3a3530]">Fast</span>
              </span>
              <span className="font-hand-note text-xs sm:text-[13px] text-[#554e46] leading-none mt-1 tracking-tight">
                boilerplate v1.0 ✎
              </span>
            </Link>

            {/* Desktop Navigation Links (hidden on mobile, visible on sm and up) */}
            <nav className="hidden sm:flex items-center gap-6 sm:gap-8">
              <a
                href="#pricing"
                className="relative font-hand-ui text-lg sm:text-xl font-bold tracking-wide text-[#1c1a17] hover:text-black transition-colors group px-1"
              >
                <span>Pricing</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full h-1.5 text-[#231f1c] opacity-70 group-hover:opacity-100 transition-opacity"
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
                className="sketch-btn px-4 sm:px-5 py-1.5 bg-[#f5eedc] text-[#1c1a17] font-hand-draft text-base sm:text-lg font-bold tracking-wide flex items-center gap-2 hover:bg-[#eae2cf] transition-colors whitespace-nowrap"
              >
                <span>Live Demo</span>
                <span className="font-hand-note text-base sm:text-lg leading-none">↗</span>
              </a>
            </nav>

            {/* Mobile Hamburger Button (visible on mobile only) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="sm:hidden sketch-border p-2 bg-[#f5eedc] text-[#1c1a17] flex items-center justify-center hover:bg-[#eae2cf] transition-colors"
            >
              {mobileMenuOpen ? (
                // Hand-drawn close cross icon
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                // Hand-drawn hamburger icon
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Dropdown Menu Drawer */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-3 p-4 bg-[#fcf9f2] sketch-border shadow-[4px_4px_0px_#231f1c] flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-150">
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="font-hand-ui text-lg font-bold text-[#1c1a17] hover:text-black py-1.5 border-b border-[#231f1c]/15 flex items-center justify-between"
              >
                <span>Pricing</span>
                <span className="font-hand-note text-sm text-[#554e46]">View plans ✎</span>
              </a>

              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="sketch-btn px-4 py-2 bg-[#231f1c] text-[#f5eedc] font-hand-draft text-base font-bold tracking-wide flex items-center justify-center gap-2"
              >
                <span>Explore Live Demo</span>
                <span className="font-hand-note text-lg leading-none">↗</span>
              </a>
            </div>
          )}

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

          {/* ========================================================================= */}
          {/* 1. DESKTOP VIEW: 3 Story Cards with Connecting Arrows (md and up)         */}
          {/* ========================================================================= */}
          <div className="hidden md:grid relative grid-cols-3 gap-10 lg:gap-12 items-start w-full">
            {/* Hand-drawn connecting pencil arrow 1 -> 2 */}
            <div className="absolute top-[28%] left-[30%] -translate-x-1/2 w-20 h-10 pointer-events-none z-10 text-[#3a3530]/70">
              <svg viewBox="0 0 80 40" fill="none" className="w-full h-full stroke-current" strokeWidth="1.6" strokeLinecap="round">
                <path d="M 8 26 Q 40 8 70 20" />
                <path d="M 60 14 L 72 20 L 62 27" />
              </svg>
            </div>

            {/* Hand-drawn connecting pencil arrow 2 -> 3 */}
            <div className="absolute top-[28%] left-[64%] -translate-x-1/2 w-20 h-10 pointer-events-none z-10 text-[#3a3530]/70">
              <svg viewBox="0 0 80 40" fill="none" className="w-full h-full stroke-current" strokeWidth="1.6" strokeLinecap="round">
                <path d="M 8 26 Q 40 8 70 20" />
                <path d="M 60 14 L 72 20 L 62 27" />
              </svg>
            </div>

            {steps.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group w-full">
                <div className="relative w-full aspect-[4/3] flex items-center justify-center hover:scale-[1.03] transition-all duration-200">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1200px) 33vw, 360px"
                    className="object-contain filter drop-shadow-[4px_6px_1px_rgba(35,31,28,0.42)] hover:drop-shadow-[6px_9px_1px_rgba(35,31,28,0.28)] transition-all duration-200"
                    priority
                  />
                </div>

                <div className="mt-3 space-y-1 max-w-[260px]">
                  <h3 className="font-hand-ui text-xl font-bold text-[#1c1a17]">
                    {item.headline}
                  </h3>
                  <p className="font-hand-draft text-sm text-[#554e46] leading-snug">
                    {item.caption}
                  </p>
                  
                  <div className="pt-1.5 flex items-center justify-center gap-1.5 text-[#3a3530]">
                    <span className="font-hand-note text-base font-semibold">
                      ({item.note})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* 2. MOBILE VIEW: Interactive Carousel with Touch Navigation (below md)     */}
          {/* ========================================================================= */}
          <div className="md:hidden flex flex-col items-center w-full max-w-sm mx-auto">
            {/* Active Card Card Display */}
            <div className="relative w-full aspect-[4/3] max-w-[300px] flex items-center justify-center">
              <Image
                src={steps[activeSlide].src}
                alt={steps[activeSlide].alt}
                fill
                sizes="300px"
                className="object-contain filter drop-shadow-[4px_6px_1px_rgba(35,31,28,0.42)] transition-all duration-300"
                priority
              />
            </div>

            {/* Active Card Text */}
            <div className="mt-3 space-y-1 text-center max-w-[280px]">
              <h3 className="font-hand-ui text-xl font-bold text-[#1c1a17]">
                {steps[activeSlide].headline}
              </h3>
              <p className="font-hand-draft text-sm text-[#554e46] leading-snug">
                {steps[activeSlide].caption}
              </p>
              <div className="pt-1 text-[#3a3530]">
                <span className="font-hand-note text-sm font-semibold">
                  ({steps[activeSlide].note})
                </span>
              </div>
            </div>

            {/* Carousel Controls (Prev, Indicators, Next) */}
            <div className="flex items-center gap-4 mt-5">
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev === 0 ? steps.length - 1 : prev - 1))}
                className="sketch-btn w-9 h-9 bg-[#f5eedc] text-[#1c1a17] font-hand-marker text-lg flex items-center justify-center hover:bg-[#eae2cf] transition-colors"
                aria-label="Previous step"
              >
                ‹
              </button>

              {/* Step indicator pills */}
              <div className="flex items-center gap-2">
                {steps.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setActiveSlide(dotIdx)}
                    className={`h-2.5 rounded-full transition-all duration-200 ${
                      activeSlide === dotIdx
                        ? "w-7 bg-[#231f1c]"
                        : "w-2.5 bg-[#231f1c]/30 hover:bg-[#231f1c]/50"
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev === steps.length - 1 ? 0 : prev + 1))}
                className="sketch-btn w-9 h-9 bg-[#f5eedc] text-[#1c1a17] font-hand-marker text-lg flex items-center justify-center hover:bg-[#eae2cf] transition-colors"
                aria-label="Next step"
              >
                ›
              </button>
            </div>

            <span className="font-hand-note text-xs text-[#716960] mt-2">
              Step {activeSlide + 1} of 3 ✎
            </span>
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
