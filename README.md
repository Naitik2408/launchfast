# SaaS Boilerplate Platform — Architecture & Master Plan
> **Internal Project Roadmap & Engineering Blueprint**
> *Reference Conversation:* `f324abaf-066b-42c8-9893-da8a28aa781e` ("Building a Code Template SaaS")

---

## 1. Executive Summary & Philosophy
This repository serves as the central hub and monorepo engine for building, showcasing, and distributing production-ready code boilerplates for developers.

### Core Philosophy:
1. **Solve Boring Plumbing:** Developers love building their unique business logic but hate wiring authentication, payment webhooks, database RLS policies, email providers, and plan gating repeatedly.
2. **Speed & Complete Canvas:** Provide a fully functional, high-conversion landing page, authenticated dashboard shell, Stripe/Razorpay billing portal, and settings out-of-the-box.
3. **Monorepo for Us, Clean Standalone for Buyers:**
   - **Internally:** We manage templates and shared packages in this single monorepo (`packages/ui`, `packages/auth`, `packages/billing`, etc.) to minimize maintenance and fix bugs in one place.
   - **For Customers:** When a customer purchases a template, an automated exporter/packager strips out the monorepo clutter and delivers a clean, standalone repository (or ZIP) containing only that template and its pre-resolved dependencies.

---

## 2. Monorepo Architecture Blueprint

```
saas-boilerplate-platform/
├── package.json                   # Root workspace config (pnpm + Turborepo)
├── turbo.json                     # Pipeline orchestration (build, lint, dev)
├── pnpm-workspace.yaml            # Workspace package definitions
│
├── apps/
│   ├── web/                       # OUR PLATFORM / LANDING PAGE: Sells & showcases templates
│   ├── template-nextjs-stripe/    # Template #1: Next.js + Supabase + Stripe + Resend
│   ├── template-nextjs-razorpay/  # Template #2: Next.js + Supabase + Razorpay (India & Global)
│   └── template-free-starter/     # Free lead magnet template
│
└── packages/                      # SHARED CORE ENGINE
    ├── ui/                        # Reusable Tailwind & Lucide components
    ├── auth/                      # Universal Supabase auth handlers & session helpers
    ├── billing/                   # Universal Stripe/Razorpay webhooks & portal actions
    ├── email/                     # Transactional email templates (React Email / Resend)
    └── config/                    # Shared tsconfig, tailwind, eslint configs
```

---

## 3. Scope of Template #1 (Flagship Stack)
The primary high-demand template:
- **Framework:** Next.js (App Router, Server Actions, TypeScript)
- **Styling:** Tailwind CSS + Radix/Lucide icons
- **Database & Auth:** Supabase (PostgreSQL with RLS, magic link, email/password, Google OAuth)
- **Payments:** Stripe Subscription Checkout + Webhook listener + Customer Portal
- **Emails:** Resend (Welcome email, invoice confirmation)
- **Pre-Built Universal Features:**
  - **Landing Page:** Hero, Social proof, Features, Interactive pricing toggle, FAQ, Footer
  - **Authentication:** Login, Register, Forgot Password, Reset Password
  - **Protected Dashboard Shell:** Sidebar, topbar, user profile switcher, empty state canvas
  - **Settings & Profile:** Avatar upload, display name, email, password change, account deletion
  - **Billing Management:** View current tier, renew date, upgrade/downgrade, invoices, card update
  - **Plan Gating System:** Reusable client-side `<FeatureGate>` and server-side `requirePlan('pro')` guard

---

## 4. Platform Landing Page Architecture (Current Deliverable)
The platform landing page (`apps/web` or root starter) is our direct storefront:
- Dark cyber aesthetic with high contrast accents (inspired by the provided layout design).
- Header with direct navigation, social links, and Primary CTA button.
- Hero with badge, dynamic headline, punchy value prop, interactive counter cards / stats, and quick-purchase/demo widget.
- Feature Grid with custom cards, badges, and tech badges.
- Step-by-step Roadmap / How It Works section.
- About / Guarantee Bento Grid.
- Interactive Accordion FAQ.
- Sticky or sleek bottom footer.
