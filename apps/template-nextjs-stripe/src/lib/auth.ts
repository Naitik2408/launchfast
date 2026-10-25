import { cookies } from "next/headers";
import { createServerClient, type DatabaseProfile } from "@repo/auth";

export async function getSessionUser() {
  const cookieStore = await cookies();
  const demoPlanCookie = cookieStore.get("demo_plan")?.value as "free" | "pro" | undefined;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Demo Fallback Mode (Runs instantly without requiring external API keys):
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your-project.supabase.co") || supabaseUrl.includes("placeholder")) {
    const activePlan = demoPlanCookie || "free";
    return {
      user: {
        id: "demo-user-123",
        email: "rahul.builder@example.com",
      },
      profile: {
        id: "demo-user-123",
        email: "rahul.builder@example.com",
        full_name: "Rahul",
        avatar_url: null,
        plan: activePlan,
        stripe_customer_id: activePlan === "pro" ? "cus_demo_123" : null,
        stripe_subscription_id: activePlan === "pro" ? "sub_demo_123" : null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as DatabaseProfile,
    };
  }

  // Real Production Mode with Supabase:
  try {
    const supabase = createServerClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    const userPlan = (user.app_metadata?.plan as "free" | "pro") || (user.user_metadata?.plan as "free" | "pro") || (user.email === "admin@example.com" ? "pro" : "free");

    const fallbackProfile: DatabaseProfile = {
      id: user.id,
      email: user.email || null,
      full_name: (user.user_metadata?.full_name as string) || (user.email?.split("@")[0] ?? "User"),
      avatar_url: (user.user_metadata?.avatar_url as string) || null,
      plan: userPlan,
      stripe_customer_id: (user.app_metadata?.stripe_customer_id as string) || null,
      stripe_subscription_id: (user.app_metadata?.stripe_subscription_id as string) || null,
      created_at: user.created_at,
      updated_at: new Date().toISOString(),
    };

    return {
      user,
      profile: (profile as DatabaseProfile) || fallbackProfile,
    };
  } catch (err) {
    console.error("Supabase Session Error:", err);
    return null;
  }
}

export async function requirePlan(requiredPlan: "pro") {
  const session = await getSessionUser();
  if (!session?.user) {
    throw new Error("UNAUTHORIZED: You must be signed in.");
  }

  const currentPlan = session.profile?.plan || "free";
  if (currentPlan !== requiredPlan) {
    throw new Error(`PLAN_REQUIRED: You must be on the ${requiredPlan.toUpperCase()} plan.`);
  }

  return session;
}
