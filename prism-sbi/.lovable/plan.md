# PRISM — AI Banking Platform Frontend

You've specified a huge surface (50+ screens, full design system, charts, AI assistant, journeys, digital twin, etc.). To ship this at the quality bar you've set — enterprise-grade, handcrafted, every route wired — I need to break it into phases rather than one-shot everything. A single-turn attempt at 50 screens produces exactly the "AI-generated template" feel you're explicitly rejecting.

Note on stack: your prompt asks for **Next.js 15 / App Router**. This Lovable project runs on **TanStack Start (React 19 + Vite + TanStack Router)**, which is architecturally equivalent (file-based routing, SSR, server functions) but not Next.js. I'll build on TanStack Start unless you want to move to a different environment. All other stack choices (Tailwind, shadcn, Framer Motion, Lucide, TanStack Query, Zustand, Recharts, RHF+Zod, Sonner) are supported and will be used as specified.

## Phase 1 — Foundation & Design System (this turn)

1. **Design tokens** in `src/styles.css` using SBI palette in `oklch`:
   - `--primary` (SBI Blue #0B5CAB), `--primary-deep` (#003366), `--accent` (Cyan #00B5E2)
   - Semantic: success/warning/error, surface, muted, border
   - Full dark mode (not inverted — proper dark surfaces)
   - Radius scale (24px default), soft-shadow tokens, premium gradient tokens (used sparingly)
   - Inter font loaded via `<link>` in `__root.tsx`

2. **Core primitives** (custom variants on shadcn, no ad-hoc color classes):
   - Button (primary, secondary, ghost, premium-gradient, destructive)
   - Card (default, elevated, glass, insight, prediction, financial)
   - Badge, Tag, Progress, Skeleton (shimmer), Timeline, Stat, MoneyValue (INR formatter)
   - AI-specific: `ThinkingIndicator`, `ConfidenceBar`, `ExplainabilityPanel`
   - Motion primitives via Framer Motion (fade-up, stagger, elevate-on-hover)

3. **App shell**:
   - Responsive sidebar (desktop) + bottom nav (mobile) with SBI PRISM mark
   - Top bar: search, notifications, twin-score chip, profile
   - `__root.tsx` head metadata (title/description/OG for PRISM)
   - Route architecture under `src/routes/` — every screen its own file

4. **Home Dashboard** — fully built, production-quality:
   - Greeting + Financial Health Score ring
   - Net worth / income / expenses / savings stat grid
   - AI Daily Summary card
   - Smart Insights carousel (3 insight cards with charts)
   - Recommended Journeys strip
   - Recent transactions list w/ merchant chips + AI category
   - Upcoming goals + timeline preview

5. **Mock data layer** in `src/lib/mock/` — realistic INR data, SBI product names, believable transactions, journeys, insights, predictions. Typed with Zod. Everything else in later phases reads from this.

**Deliverable:** design system + shell + Home render at flagship quality; route stubs exist for every screen so nav has no dead ends (stubs use a shared "Coming next" premium empty state, not lorem).

## Phase 2 — Intelligence surfaces
Digital Twin (interactive viz), AI Assistant (chat + voice + document upload UI), Insights index + detail, Explainable AI, Prediction History.

## Phase 3 — Money surfaces
Transactions (filters/search/export), Portfolio, Investments, Budget, Expenses, Income, Goals, Emergency Fund, Cards, Savings.

## Phase 4 — Journeys & Products
Journey Planner, Journey Details w/ timeline, Simulation Engine, Strategy Comparison, Execution Center, Explore marketplace (Loans, Insurance, Cards, Deposits, MF, Gov Schemes), Product Recommendation, Approvals.

## Phase 5 — Life & Account
Life Events, Consent Dashboard, Privacy, Documents, AI Reports, Profile, Settings, Security, Biometric, Devices, Notifications, Support, Help, Feedback, Auth + OTP + Splash.

Each subsequent phase = one turn, same quality bar as Phase 1.
