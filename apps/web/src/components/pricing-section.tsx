"use client";

import { useState } from "react";
import Script from "next/script";

interface PricingProps {
  demoUrl: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PricingSection({ demoUrl }: PricingProps) {
  const [githubUser, setGithubUser] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [statusModal, setStatusModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    success: boolean;
    repo?: string;
  }>({
    open: false,
    title: "",
    message: "",
    success: false,
  });

  const handleCheckout = async (planId: "starter" | "complete") => {
    if (!githubUser.trim()) {
      alert("Please enter your GitHub username first so we can grant you repo access!");
      return;
    }

    setLoadingPlan(planId);

    try {
      // 1. Create order on backend
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();

      if (!res.ok || !data.orderId) {
        throw new Error(data.error || "Could not initialize checkout order");
      }

      // 2. Open Razorpay Checkout modal
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "LaunchFast",
        description: `${planId === "complete" ? "Complete" : "Starter"} Next.js 16 Boilerplate`,
        order_id: data.orderId,
        prefill: {
          email: customerEmail || "rahul@example.com",
        },
        theme: {
          color: "#231f1c",
        },
        handler: async function (response: any) {
          // 3. Verify payment & send GitHub invite
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                github_username: githubUser,
                customer_email: customerEmail,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              setStatusModal({
                open: true,
                title: "Welcome to LaunchFast! 🚀",
                message: verifyData.message,
                success: true,
                repo: verifyData.repo,
              });
            } else {
              setStatusModal({
                open: true,
                title: "Payment Received",
                message: verifyData.message || "Invitation is being processed.",
                success: false,
              });
            }
          } catch (err: any) {
            alert("Verification error: " + err.message);
          }
        },
        modal: {
          ondismiss: function () {
            setLoadingPlan(null);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (failResponse: any) {
        alert("Payment failed: " + failResponse.error.description);
        setLoadingPlan(null);
      });
      rzp.open();
    } catch (err: any) {
      alert("Checkout error: " + err.message);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="pt-16 pb-20 border-t border-[#231f1c]/15 relative">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Heading */}
      <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
        <span className="font-hand-note text-base font-semibold px-3 py-1 bg-[#231f1c]/10 text-[#231f1c] rounded-full inline-block">
          One-time payment • Lifetime updates ✎
        </span>
        <h2 className="font-hand-marker text-3xl sm:text-4xl text-[#1c1a17] tracking-wide">
          Invest once. Ship infinite projects.
        </h2>
        <p className="font-hand-draft text-base sm:text-lg text-[#554e46]">
          Stop wasting 3 weeks re-writing authentication, Stripe logic, and email plumbing.
        </p>
      </div>

      {/* GitHub Username Input Step (Crucial for Option B code delivery) */}
      <div className="max-w-md mx-auto mb-12 p-5 bg-[#fcf9f2] sketch-border shadow-[3px_3px_0px_#231f1c] text-center space-y-3">
        <label className="block font-hand-ui text-base font-bold text-[#1c1a17]">
          Step 1: Enter your GitHub Username for Repo Invitation
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            required
            value={githubUser}
            onChange={(e) => setGithubUser(e.target.value)}
            placeholder="e.g. rahul-dev"
            className="flex-1 px-3.5 py-2 text-sm bg-white border border-[#231f1c]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#231f1c]"
          />
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="your-email@gmail.com"
            className="flex-1 px-3.5 py-2 text-sm bg-white border border-[#231f1c]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#231f1c]"
          />
        </div>
        <p className="font-hand-note text-xs text-[#716960]">
          Upon payment, GitHub API instantly adds this user as a collaborator to the private codebase repository!
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Tier 1: Starter */}
        <div className="sketch-border bg-[#faf6ec] p-8 shadow-[4px_4px_0px_#231f1c] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-hand-marker text-2xl text-[#1c1a17]">Starter</span>
              <span className="font-hand-note text-sm text-[#554e46]">Standard Boilerplate</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-hand-marker text-4xl text-[#1c1a17]">₹3,999</span>
              <span className="text-xs text-[#716960] line-through">₹7,999</span>
              <span className="font-hand-note text-xs font-bold text-[#231f1c] bg-[#231f1c]/10 px-2 py-0.5 rounded">
                50% OFF
              </span>
            </div>

            <p className="font-hand-draft text-sm text-[#554e46]">
              Everything you need to launch a modern SaaS with Supabase, Next.js 16, and Stripe.
            </p>

            <ul className="space-y-2.5 font-hand-ui text-sm text-[#231f1c] pt-4 border-t border-[#231f1c]/10">
              <li className="flex items-center gap-2">
                <span className="text-green-700 font-bold">✓</span> Next.js 16 (Turbopack + App Router)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-700 font-bold">✓</span> Supabase Auth (Email + Google OAuth)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-700 font-bold">✓</span> Stripe Subscriptions & Customer Portal
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-700 font-bold">✓</span> Protected Dashboard Shell & Feature Gating
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-700 font-bold">✓</span> Instant Private GitHub Invitation
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={() => handleCheckout("starter")}
              disabled={loadingPlan === "starter"}
              className="sketch-btn w-full py-3 bg-[#f5eedc] text-[#1c1a17] font-hand-draft text-lg font-bold tracking-wide hover:bg-[#eae2cf] transition-all"
            >
              {loadingPlan === "starter" ? "Opening Razorpay..." : "Buy Starter (₹3,999) →"}
            </button>
          </div>
        </div>

        {/* Tier 2: Complete (Recommended) */}
        <div className="sketch-border bg-[#231f1c] text-[#f5eedc] p-8 shadow-[6px_6px_0px_#554e46] flex flex-col justify-between relative hover:translate-y-[-2px] transition-transform">
          <div className="absolute -top-3.5 right-6 bg-[#f5eedc] text-[#1c1a17] border border-[#1c1a17] px-3 py-0.5 text-xs font-hand-note font-bold uppercase tracking-wider shadow-[2px_2px_0px_#554e46]">
            Most Popular ★
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-hand-marker text-2xl text-[#f5eedc]">Complete</span>
              <span className="font-hand-note text-sm text-[#c7beaf]">Full Monorepo Access</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-hand-marker text-4xl text-[#f5eedc]">₹6,999</span>
              <span className="text-xs text-[#a89f92] line-through">₹12,999</span>
              <span className="font-hand-note text-xs font-bold text-[#1c1a17] bg-[#f5eedc] px-2 py-0.5 rounded">
                BEST VALUE
              </span>
            </div>

            <p className="font-hand-draft text-sm text-[#d5cebf]">
              For serial builders who want the full monorepo, email automation, and priority updates.
            </p>

            <ul className="space-y-2.5 font-hand-ui text-sm text-[#eae2cf] pt-4 border-t border-[#f5eedc]/20">
              <li className="flex items-center gap-2">
                <span className="text-[#f5eedc] font-bold">✓</span> Everything in Starter
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#f5eedc] font-bold">✓</span> Automated Resend Email Templates
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#f5eedc] font-bold">✓</span> Full Monorepo Architecture (Turborepo)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#f5eedc] font-bold">✓</span> Hand-Drawn Component UI Kit
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#f5eedc] font-bold">✓</span> Lifetime GitHub Updates & Releases
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={() => handleCheckout("complete")}
              disabled={loadingPlan === "complete"}
              className="sketch-btn w-full py-3 bg-[#f5eedc] text-[#1c1a17] font-hand-draft text-lg font-bold tracking-wide hover:bg-[#fffdf8] transition-all shadow-[3px_3px_0px_#554e46]"
            >
              {loadingPlan === "complete" ? "Opening Razorpay..." : "Buy Complete (₹6,999) →"}
            </button>
          </div>
        </div>
      </div>

      {/* Post-Purchase Success Modal */}
      {statusModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#f5eedc] text-[#1c1a17] max-w-md w-full p-6 sketch-border shadow-[6px_6px_0px_#231f1c] space-y-4">
            <h3 className="font-hand-marker text-2xl text-[#1c1a17]">{statusModal.title}</h3>
            <p className="font-hand-draft text-sm text-[#554e46]">{statusModal.message}</p>

            {statusModal.repo && (
              <div className="p-3 bg-white border border-[#231f1c]/30 rounded-lg text-xs font-mono space-y-2">
                <p className="text-neutral-500 font-sans font-semibold">Clone your private repository:</p>
                <code className="text-black block bg-neutral-100 p-2 rounded select-all">
                  git clone https://github.com/{statusModal.repo}.git my-new-saas
                </code>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setStatusModal({ ...statusModal, open: false })}
                className="sketch-btn px-5 py-2 bg-[#231f1c] text-[#f5eedc] font-hand-draft text-sm font-bold"
              >
                Close & Start Building
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
