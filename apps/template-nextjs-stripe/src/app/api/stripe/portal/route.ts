import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createCustomerPortalSession } from "@repo/billing";

export async function POST() {
  try {
    const session = await getSessionUser();
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    // Instant Sandbox Simulation mode:
    if (!stripeKey || stripeKey.includes("sk_test_...")) {
      return NextResponse.json({
        mock: true,
        message: "Demo Mode: Portal simulated.",
      });
    }

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const customerId = session.profile?.stripe_customer_id;
    if (!customerId) {
      return NextResponse.json({ error: "No customer ID" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
    const portal = await createCustomerPortalSession(
      customerId,
      `${siteUrl}/dashboard/billing`
    );

    return NextResponse.json({ url: portal.url });
  } catch (err: any) {
    return NextResponse.json({ mock: true, error: err.message });
  }
}
