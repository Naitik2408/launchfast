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
  // Modal state for collecting buyer GitHub username & email
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [githubUser, setGithubUser] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Post-purchase success state
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

  const handleStartPurchase = () => {
    setErrorMsg("");
    setCheckoutModalOpen(true);
  };

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!githubUser.trim()) {
      setErrorMsg("Please enter your GitHub username so we can invite you to the private repository.");
      return;
    }

    if (!customerEmail.trim()) {
      setErrorMsg("Please enter your email address for your order confirmation and receipt.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      // 1. Create Razorpay order on backend
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();

      if (!res.ok || !data.orderId) {
        throw new Error(data.error || "Could not initialize checkout order");
      }

      // Close details modal before opening Razorpay
      setCheckoutModalOpen(false);

      // 2. Open Razorpay Checkout modal
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "LaunchFast",
        description: "LaunchFast Next.js 16 + Supabase + Stripe Starter",
        order_id: data.orderId,
        prefill: {
          email: customerEmail,
        },
        theme: {
          color: "#231f1c",
        },
        handler: async function (response: any) {
          // 3. Verify payment signature & trigger automated GitHub invite
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
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (failResponse: any) {
        alert("Payment failed: " + failResponse.error.description);
        setLoading(false);
      });
      rzp.open();
    } catch (err: any) {
      setErrorMsg("Checkout error: " + err.message);
      setCheckoutModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="pt-12 sm:pt-16 pb-14 sm:pb-20 border-t border-[#231f1c]/15 relative">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Heading */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 px-2 space-y-2">
        <span className="font-hand-note text-sm sm:text-base font-semibold px-3 py-1 bg-[#231f1c]/10 text-[#231f1c] rounded-full inline-block">
          One-time payment • Lifetime repo access ✎
        </span>
        <h2 className="font-hand-marker text-2xl sm:text-4xl text-[#1c1a17] tracking-wide leading-tight">
          Invest once. Ship infinite projects.
        </h2>
        <p className="font-hand-draft text-sm sm:text-lg text-[#554e46]">
          Stop wasting 3 weeks re-writing authentication, Stripe logic, and email plumbing.
        </p>
      </div>

      {/* Single Clean Pricing Card (Option A) */}
      <div className="max-w-xl mx-auto w-full px-2 sm:px-0">
        <div className="sketch-border bg-[#231f1c] text-[#f5eedc] p-6 sm:p-10 shadow-[4px_4px_0px_#554e46] sm:shadow-[6px_6px_0px_#554e46] flex flex-col justify-between relative hover:translate-y-[-2px] transition-transform">
          <div className="absolute -top-3.5 right-4 sm:right-6 bg-[#f5eedc] text-[#1c1a17] border border-[#1c1a17] px-2.5 sm:px-3.5 py-0.5 text-[11px] sm:text-xs font-hand-note font-bold uppercase tracking-wider shadow-[2px_2px_0px_#554e46]">
            Full Template Access ★
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
              <span className="font-hand-marker text-2xl sm:text-3xl text-[#f5eedc]">LaunchFast Starter</span>
              <span className="font-hand-note text-xs sm:text-sm text-[#c7beaf]">Next.js 16 + Supabase + Stripe</span>
            </div>

            <div className="flex items-baseline gap-2 sm:gap-3">
              <span className="font-hand-marker text-4xl sm:text-5xl text-[#f5eedc]">$49</span>
              <span className="text-xs sm:text-sm text-[#a89f92] line-through">$99</span>
              <span className="font-hand-note text-[11px] sm:text-xs font-bold text-[#1c1a17] bg-[#f5eedc] px-2 sm:px-2.5 py-0.5 rounded">
                50% OFF • ONE-TIME
              </span>
            </div>

            <p className="font-hand-draft text-sm sm:text-base text-[#d5cebf]">
              Everything you need to launch a production SaaS this weekend with pre-configured Auth, Stripe subscriptions, and email.
            </p>

            <ul className="space-y-2.5 sm:space-y-3 font-hand-ui text-xs sm:text-base text-[#eae2cf] pt-4 border-t border-[#f5eedc]/20">
              <li className="flex items-start sm:items-center gap-2 sm:gap-2.5">
                <span className="text-[#f5eedc] font-bold text-base sm:text-lg shrink-0">✓</span> <span>Next.js 16 (App Router + Turbopack + Tailwind v4)</span>
              </li>
              <li className="flex items-start sm:items-center gap-2 sm:gap-2.5">
                <span className="text-[#f5eedc] font-bold text-base sm:text-lg shrink-0">✓</span> <span>Supabase Auth (Email/Password + Google OAuth pre-wired)</span>
              </li>
              <li className="flex items-start sm:items-center gap-2 sm:gap-2.5">
                <span className="text-[#f5eedc] font-bold text-base sm:text-lg shrink-0">✓</span> <span>Stripe Subscriptions, Customer Portal & Verified Webhooks</span>
              </li>
              <li className="flex items-start sm:items-center gap-2 sm:gap-2.5">
                <span className="text-[#f5eedc] font-bold text-base sm:text-lg shrink-0">✓</span> <span>Protected Dashboard Canvas & Plan-Gated Components</span>
              </li>
              <li className="flex items-start sm:items-center gap-2 sm:gap-2.5">
                <span className="text-[#f5eedc] font-bold text-base sm:text-lg shrink-0">✓</span> <span>Resend Transactional Welcome & Receipt Emails</span>
              </li>
              <li className="flex items-start sm:items-center gap-2 sm:gap-2.5">
                <span className="text-[#f5eedc] font-bold text-base sm:text-lg shrink-0">✓</span> <span>Instant Private GitHub Repository Invitation & Lifetime Code Updates</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 sm:pt-8">
            <button
              onClick={handleStartPurchase}
              className="sketch-btn w-full py-3.5 bg-[#f5eedc] text-[#1c1a17] font-hand-draft text-xl font-bold tracking-wide hover:bg-[#fffdf8] transition-all shadow-[4px_4px_0px_#554e46]"
            >
              Get LaunchFast ($49) →
            </button>
            <p className="text-center font-hand-note text-[11px] sm:text-xs text-[#a89f92] mt-2 sm:mt-2.5">
              Secure one-time payment via Razorpay (Cards, UPI, NetBanking, International)
            </p>
          </div>
        </div>
      </div>

      {/* Step Modal: Enter GitHub Username and Email */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#f5eedc] text-[#1c1a17] max-w-md w-full p-6 sm:p-7 sketch-border shadow-[6px_6px_0px_#231f1c] space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-hand-note text-xs font-semibold px-2.5 py-0.5 bg-[#231f1c]/10 rounded">
                  Instant Code Delivery
                </span>
                <h3 className="font-hand-marker text-2xl sm:text-3xl text-[#1c1a17] mt-1">
                  Where should we send your code?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                className="font-hand-marker text-xl p-1 text-[#554e46] hover:text-black"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 text-xs bg-red-100 border border-red-300 text-red-800 rounded font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="block font-hand-ui text-sm font-bold text-[#1c1a17]">
                  GitHub Username <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={githubUser}
                  onChange={(e) => setGithubUser(e.target.value)}
                  placeholder="e.g. rahul-dev"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#231f1c]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#231f1c]"
                />
                <p className="font-hand-note text-[11px] text-[#554e46]">
                  GitHub API will automatically add this username as a collaborator to the private codebase repo.
                </p>
              </div>

              <div className="space-y-1 text-left">
                <label className="block font-hand-ui text-sm font-bold text-[#1c1a17]">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#231f1c]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#231f1c]"
                />
                <p className="font-hand-note text-[11px] text-[#554e46]">
                  Your receipt and setup guide will be sent here.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="sketch-btn w-full py-3 bg-[#231f1c] text-[#f5eedc] font-hand-draft text-lg font-bold tracking-wide hover:bg-[#38322d] transition-all shadow-[3px_3px_0px_#554e46]"
                >
                  {loading ? "Opening Razorpay..." : "Proceed to Payment ($49) →"}
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutModalOpen(false)}
                  className="font-hand-draft text-xs text-[#554e46] hover:underline text-center py-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post-Purchase Success Modal */}
      {statusModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#f5eedc] text-[#1c1a17] max-w-md w-full p-6 sketch-border shadow-[6px_6px_0px_#231f1c] space-y-4">
            <h3 className="font-hand-marker text-2xl text-[#1c1a17]">{statusModal.title}</h3>
            <p className="font-hand-draft text-sm text-[#554e46]">{statusModal.message}</p>

            {statusModal.repo && (
              <div className="p-3 bg-white border border-[#231f1c]/30 rounded-lg text-xs font-mono space-y-2">
                <p className="text-neutral-500 font-sans font-semibold">1. Accept invitation on GitHub</p>
                <p className="text-neutral-500 font-sans font-semibold">2. Clone your private repository:</p>
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
