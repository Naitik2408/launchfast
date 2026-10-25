"use client";

import { useRouter } from "next/navigation";
import { createBrowserClient } from "@repo/auth";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>Sign Out</span>
    </button>
  );
}
