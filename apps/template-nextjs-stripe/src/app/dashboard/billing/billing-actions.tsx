"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";
import { CreditCard, Sparkles, RefreshCw } from "lucide-react";

interface BillingActionsProps {
  userPlan: string;
  hasCustomerId: boolean;
  proPriceId: string;
}

export default function BillingActions({
  userPlan,
  hasCustomerId,
  proPriceId,
}: BillingActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: proPriceId }),
      });
      const data = await res.json();

      // Case A: Real Stripe configured
      if (data.url && !data.mock) {
        window.location.href = data.url;
        return;
      }

      // Case B: Instant Demo Simulation Mode
      // When keys aren't added yet, simulate payment success directly!
      if (data.mock || data.simulated) {
        alert("🎉 Demo Simulation: Payment of $29 simulated successfully! Upgrading your session to PRO.");
        document.cookie = "demo_plan=pro; path=/; max-age=86400";
        router.push("/dashboard?payment=success");
        router.refresh();
        return;
      }

      // Fallback
      document.cookie = "demo_plan=pro; path=/; max-age=86400";
      router.push("/dashboard?payment=success");
      router.refresh();
    } catch {
      document.cookie = "demo_plan=pro; path=/; max-age=86400";
      router.push("/dashboard?payment=success");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPortal = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url && !data.mock) {
        window.location.href = data.url;
        return;
      }
      alert("Stripe Portal Demo: In production, this opens Stripe's hosted invoice & card management page.");
    } catch {
      alert("Stripe Portal Demo: In production, this opens Stripe's hosted invoice & card management page.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetToFree = () => {
    document.cookie = "demo_plan=free; path=/; max-age=86400";
    router.refresh();
  };

  if (userPlan === "pro") {
    return (
      <div className="pt-2 flex flex-wrap items-center gap-3">
        <Button onClick={handleOpenPortal} disabled={loading} variant="outline" className="gap-2">
          <CreditCard className="w-4 h-4" />
          <span>{loading ? "Redirecting..." : "Manage Card & Invoices (Stripe Portal)"}</span>
        </Button>
        <button
          onClick={handleResetToFree}
          className="text-xs text-neutral-500 hover:text-neutral-900 underline flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Demo to Free Plan</span>
        </button>
      </div>
    );
  }

  return (
    <div className="pt-2">
      <Button onClick={handleCheckout} disabled={loading} className="gap-2">
        <Sparkles className="w-4 h-4" />
        <span>{loading ? "Processing..." : "Upgrade to Pro ($29/mo) — Test Now"}</span>
      </Button>
    </div>
  );
}
