export const PLANS = {
  free: {
    id: "free",
    name: "Free",
    description: "Ideal for hobbyists and test projects.",
    price: 0,
    priceId: null,
    features: [
      "Up to 3 Active Projects",
      "Standard Community Support",
      "Basic Analytics",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    description: "Unlimited power for high-growth SaaS applications.",
    price: 29,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_pro_monthly",
    features: [
      "Unlimited Projects & Datasets",
      "Automated Daily Backups",
      "Priority 24/7 Support",
      "Advanced Export & Bulk Actions",
      "Custom Domain Integration",
    ],
  },
} as const;

export type PlanTier = keyof typeof PLANS;
