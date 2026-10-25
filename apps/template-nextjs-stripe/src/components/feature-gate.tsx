"use client";

import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@repo/ui";

interface FeatureGateProps {
  userPlan?: string | null;
  requiredPlan?: "pro";
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Client-Side Feature Gate component.
 * Displays content only if user's plan matches requirement; otherwise renders an upgrade notice.
 */
export function FeatureGate({
  userPlan = "free",
  requiredPlan = "pro",
  children,
  fallback,
}: FeatureGateProps) {
  const isUnlocked = userPlan === requiredPlan;

  if (isUnlocked) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50/70 p-6 text-center">
      <div className="mx-auto w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 mb-3">
        <Lock className="w-5 h-5" />
      </div>
      <h4 className="text-base font-semibold text-neutral-900">
        Unlock {requiredPlan.toUpperCase()} Feature
      </h4>
      <p className="text-sm text-neutral-500 max-w-sm mx-auto mt-1 mb-4">
        This feature is exclusively available on the {requiredPlan.toUpperCase()} plan. Upgrade now to get instant access.
      </p>
      <Link href="/dashboard/billing">
        <Button variant="primary" size="sm">
          Upgrade to {requiredPlan.toUpperCase()}
        </Button>
      </Link>
    </div>
  );
}
