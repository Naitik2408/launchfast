import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { LayoutDashboard, Settings, CreditCard, LogOut } from "lucide-react";
import LogoutButton from "./logout-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionUser();

  if (!session?.user) {
    redirect("/login");
  }

  const profile = session.profile;
  const userPlan = profile?.plan || "free";

  return (
    <div className="min-h-screen flex bg-neutral-50 text-neutral-900">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-200 bg-white flex flex-col justify-between p-4 hidden md:flex">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center text-sm font-black">
              S
            </span>
            <span className="font-bold text-base tracking-tight">YourSaaS App</span>
          </div>

          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-neutral-100 text-neutral-700"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/dashboard/billing"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-neutral-100 text-neutral-700"
            >
              <CreditCard className="w-4 h-4" />
              <span>Billing & Plans</span>
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-neutral-100 text-neutral-700"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* User Card in Sidebar Bottom */}
        <div className="pt-4 border-t border-neutral-200 space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="truncate">
              <div className="text-xs font-semibold truncate">{profile?.full_name || session.user.email}</div>
              <div className="text-[11px] text-neutral-500 capitalize">{userPlan} Plan</div>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${userPlan === 'pro' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-700'}`}>
              {userPlan}
            </span>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b border-neutral-200 bg-white px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-600">
            <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/billing"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-50"
            >
              Plan: <span className="capitalize text-neutral-900 font-bold">{userPlan}</span>
            </Link>
          </div>
        </header>

        <main className="p-6 max-w-5xl w-full mx-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
