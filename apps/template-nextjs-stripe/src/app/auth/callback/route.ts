import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@repo/auth";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/dashboard";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to login with an error query
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
