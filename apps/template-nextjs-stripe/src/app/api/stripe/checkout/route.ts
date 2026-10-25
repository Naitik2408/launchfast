import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createCheckoutSession } from "@repo/billing";

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    // Instant Sandbox Simulation when real Stripe keys are not yet provided:
    if (!stripeKey || stripeKey.includes("sk_test_...")) {
      return NextResponse.json({
        mock: true,
        simulated: true,
        message: "Demo Mode: Payment simulated successfully.",
      });
    }

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId } = await req.json();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

    const checkoutSession = await createCheckoutSession({
      priceId,
      userId: session.user.id,
      userEmail: session.user.email || "",
      customerId: session.profile?.stripe_customer_id,
      successUrl: `${siteUrl}/dashboard?payment=success`,
      cancelUrl: `${siteUrl}/dashboard/billing?payment=cancelled`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err: any) {
    return NextResponse.json({
      mock: true,
      simulated: true,
      error: err.message,
    });
  }
}
