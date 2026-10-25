import { NextResponse } from "next/server";
import { constructWebhookEvent } from "@repo/billing";
import { createAdminClient } from "@repo/auth";
import { sendEmail, getReceiptEmailHtml } from "@repo/email";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing signature or STRIPE_WEBHOOK_SECRET" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = constructWebhookEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabaseAdmin = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id || session.metadata?.userId;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      if (userId) {
        // 1. Upgrade user's tier to 'pro' in Supabase
        await supabaseAdmin
          .from("profiles")
          .update({
            plan: "pro",
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        // 2. Dispatch receipt email
        if (session.customer_details?.email) {
          try {
            await sendEmail({
              to: session.customer_details.email,
              subject: "Your Pro Subscription is Active! 🎉",
              html: getReceiptEmailHtml(
                session.customer_details.name || "Customer",
                "Pro Monthly",
                "$29.00"
              ),
            });
          } catch (emailErr) {
            console.error("Failed to send receipt email:", emailErr);
          }
        }
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      // Downgrade user back to free tier
      await supabaseAdmin
        .from("profiles")
        .update({
          plan: "free",
          stripe_subscription_id: null,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_customer_id", customerId);
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const status = subscription.status;

      // If subscription became inactive or past_due
      const plan = status === "active" ? "pro" : "free";

      await supabaseAdmin
        .from("profiles")
        .update({
          plan,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_customer_id", customerId);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
