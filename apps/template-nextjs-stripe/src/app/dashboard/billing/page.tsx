import { getSessionUser } from "@/lib/auth";
import { PLANS } from "@/lib/plans";
import { Card, Button, Badge } from "@repo/ui";
import { CreditCard, CheckCircle2 } from "lucide-react";
import BillingActions from "./billing-actions";

export default async function BillingPage() {
  const session = await getSessionUser();
  const profile = session?.profile;
  const userPlan = profile?.plan || "free";
  const hasCustomerId = Boolean(profile?.stripe_customer_id);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-sm text-neutral-500">Manage your subscription, invoices, and payment methods.</p>
      </div>

      {/* Current Plan Overview */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <div>
            <div className="text-xs font-semibold text-neutral-500 uppercase">Current Tier</div>
            <div className="text-2xl font-extrabold capitalize text-neutral-900 mt-0.5">{userPlan} Plan</div>
          </div>
          <Badge variant={userPlan === "pro" ? "success" : "default"}>
            {userPlan === "pro" ? "Active Subscription" : "Free Tier"}
          </Badge>
        </div>

        <p className="text-sm text-neutral-600">
          {userPlan === "pro"
            ? "Your account currently has unlimited access to all features."
            : "You are currently using the limited free version. Upgrade to Pro for unlimited exports and priority support."}
        </p>

        {/* Client-side action handlers (Checkout vs Customer Portal) */}
        <BillingActions
          userPlan={userPlan}
          hasCustomerId={hasCustomerId}
          proPriceId={PLANS.pro.priceId}
        />
      </Card>
    </div>
  );
}
