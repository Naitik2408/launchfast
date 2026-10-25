import { getSessionUser } from "@/lib/auth";
import { FeatureGate } from "@/components/feature-gate";
import { Card, Button } from "@repo/ui";
import { Sparkles, Download, Layers } from "lucide-react";

export default async function DashboardPage() {
  const session = await getSessionUser();
  const userPlan = session?.profile?.plan || "free";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-sm text-neutral-500">Welcome to your SaaS application canvas.</p>
      </div>

      {/* Free Canvas Widget */}
      <Card className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold">Standard Feature Area</h3>
            <p className="text-xs text-neutral-500">Available to all signed-in users (Free & Pro).</p>
          </div>
        </div>
        <p className="text-sm text-neutral-600">
          This is where you place your primary business tool, analytics charts, or form inputs.
        </p>
      </Card>

      {/* Plan-Gated Pro Feature Demo */}
      <FeatureGate userPlan={userPlan} requiredPlan="pro">
        <Card className="border-emerald-200 bg-emerald-50/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">Pro Power Tools</h3>
                <p className="text-xs text-emerald-700 font-semibold">Unlocked via Pro Subscription</p>
              </div>
            </div>
            <Button size="sm" className="gap-2 bg-emerald-700 hover:bg-emerald-800">
              <Download className="w-3.5 h-3.5" />
              <span>Export High-Res PDF</span>
            </Button>
          </div>
          <p className="text-sm text-neutral-700 leading-relaxed">
            Congratulations! Because your account is on the Pro plan, you can trigger bulk AI processing, download unlimited PDF reports, and use automated integrations.
          </p>
        </Card>
      </FeatureGate>
    </div>
  );
}
