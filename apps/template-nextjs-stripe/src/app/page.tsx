import Link from "next/link";
import { PLANS } from "@/lib/plans";
import { Button, Card, Badge } from "@repo/ui";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center text-sm font-black">
              S
            </span>
            <span>YourSaaS</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
              Sign In
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Your Dream Product in 48 Hours</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-950 leading-tight">
          Supercharge your workflow with <br className="hidden sm:inline" />
          modern SaaS automation.
        </h1>

        <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          The all-in-one software solution that eliminates repetitive plumping so you can focus on shipping products that customers love.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/register">
            <Button size="lg" className="gap-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href="#pricing">
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-neutral-50/80 border-y border-neutral-200">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Everything you need to scale</h2>
            <p className="text-neutral-600 text-sm">Industrial-grade reliability built directly into every layer.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Instant Performance",
                desc: "Sub-second database queries and zero-latency caching powered by Edge infrastructure.",
              },
              {
                icon: ShieldCheck,
                title: "Enterprise Security",
                desc: "PostgreSQL Row-Level Security ensures your customer data remains isolated and encrypted.",
              },
              {
                icon: Sparkles,
                title: "Automated Billing",
                desc: "Seamless Stripe recurring payments, automated tax calculation, and self-serve billing portal.",
              },
            ].map((f, i) => (
              <Card key={i} className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section id="pricing" className="py-20 px-6 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Simple, transparent pricing</h2>
          <p className="text-neutral-600 text-sm">No hidden setup fees. Cancel anytime with a single click.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Free Tier */}
          <Card className="flex flex-col justify-between">
            <div className="space-y-4">
              <Badge>{PLANS.free.name}</Badge>
              <div className="text-3xl font-extrabold">$0 <span className="text-sm font-normal text-neutral-500">/ month</span></div>
              <p className="text-sm text-neutral-600">{PLANS.free.description}</p>
              <ul className="space-y-2 text-sm text-neutral-700 pt-4">
                {PLANS.free.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/register" className="pt-8">
              <Button variant="outline" className="w-full">Get Started Free</Button>
            </Link>
          </Card>

          {/* Pro Tier */}
          <Card className="flex flex-col justify-between border-neutral-900 shadow-md relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="success">MOST POPULAR</Badge>
                <span className="text-xs font-semibold text-emerald-700 uppercase">Recommended</span>
              </div>
              <div className="text-3xl font-extrabold">${PLANS.pro.price} <span className="text-sm font-normal text-neutral-500">/ month</span></div>
              <p className="text-sm text-neutral-600">{PLANS.pro.description}</p>
              <ul className="space-y-2 text-sm text-neutral-700 pt-4">
                {PLANS.pro.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/register" className="pt-8">
              <Button className="w-full">Subscribe to Pro</Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-200 text-center text-sm text-neutral-500">
        <p>© 2026 YourSaaS Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
