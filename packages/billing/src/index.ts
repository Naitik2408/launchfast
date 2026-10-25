import Stripe from "stripe";

export function getStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is missing from environment variables.");
  }

  return new Stripe(secretKey, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
  });
}

export type CreateCheckoutParams = {
  priceId: string;
  userId: string;
  userEmail: string;
  customerId?: string | null;
  successUrl: string;
  cancelUrl: string;
};

/**
 * Creates a Stripe Checkout Session for recurring SaaS subscriptions.
 */
export async function createCheckoutSession({
  priceId,
  userId,
  userEmail,
  customerId,
  successUrl,
  cancelUrl,
}: CreateCheckoutParams) {
  const stripe = getStripeClient();

  // If customer doesn't exist yet, we attach user metadata so the webhook links them
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer: customerId || undefined,
    customer_email: customerId ? undefined : userEmail,
    client_reference_id: userId,
    metadata: {
      userId,
    },
    subscription_data: {
      metadata: {
        userId,
      },
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
}

/**
 * Creates a Stripe Customer Portal session so users can manage cards, invoices & cancellations.
 */
export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
) {
  const stripe = getStripeClient();

  const portal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return portal;
}

/**
 * Verifies and parses Stripe webhook event with signature security.
 */
export function constructWebhookEvent(
  rawBody: string | Buffer,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  const stripe = getStripeClient();
  return stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
}
