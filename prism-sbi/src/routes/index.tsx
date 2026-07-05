import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Wallet,
  ArrowDownRight,
  ArrowUpRight,
  PiggyBank,
  TrendingUp,
  Sparkles,
  Plus,
  Target,
  Receipt,
  ShieldCheck,
  BellRing,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  user,
  healthScore,
  netWorth,
  monthly,
  insights,
  journeys,
  transactions,
  upcomingTasks,
  goals,
  marketPulse,
} from "@/lib/mock/data";
import { greeting, formatINRShort, formatPercent } from "@/lib/format";
import { HealthRing } from "@/components/prism/health-ring";
import { StatCard } from "@/components/prism/stat-card";
import { MoneyValue } from "@/components/prism/money-value";
import { InsightCard } from "@/components/prism/insight-card";
import { JourneyCard } from "@/components/prism/journey-card";
import { TransactionRow } from "@/components/prism/transaction-row";
import { AISummaryCard } from "@/components/prism/ai-summary";
import { SectionHeader } from "@/components/prism/section-header";
import { CashflowChart } from "@/components/prism/cashflow-chart";
import { fadeUp, transitions } from "@/lib/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home · PRISM — AI Banking Intelligence" },
      {
        name: "description",
        content:
          "Your Financial Digital Twin — health score, predictions, journeys, insights and spending in one calm dashboard.",
      },
    ],
  }),
  component: Home,
});

const QUICK_ACTIONS = [
  { label: "Send Money", icon: ArrowUpRight, to: "/transactions" },
  { label: "New SIP", icon: TrendingUp, to: "/portfolio" },
  { label: "Pay Bill", icon: Receipt, to: "/transactions" },
  { label: "New Goal", icon: Target, to: "/goals" },
  { label: "Explore", icon: Plus, to: "/explore" },
];

function Home() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    setNow(
      `${greeting()} · ${new Date().toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long" })}`,
    );
  }, []);
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* Hero */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={transitions.entrance}
        className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary"
            suppressHydrationWarning
          >
            {now ?? "Welcome"}
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Welcome back, {user.firstName}.
          </h1>
          <p className="mt-1.5 max-w-xl text-sm text-muted-foreground sm:text-base">
            Your Digital Twin has been active all week. Here's the calm view of your money — and what PRISM is planning next.
          </p>
        </div>

        {/* Market pulse strip */}
        <div className="flex flex-wrap items-center gap-2">
          {marketPulse.map((m) => (
            <div
              key={m.symbol}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 shadow-xs"
            >
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {m.symbol}
                </div>
                <div className="text-xs font-semibold tabular-nums text-foreground">
                  {m.value}
                </div>
              </div>
              <span
                className={
                  m.change >= 0
                    ? "inline-flex items-center rounded-md bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold text-success tabular-nums"
                    : "inline-flex items-center rounded-md bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold text-destructive tabular-nums"
                }
              >
                {formatPercent(m.change, 2)}
              </span>
            </div>
          ))}
        </div>
      </motion.header>

      {/* Health + Net worth row */}
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Health score card */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                Financial Health
              </div>
              <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                {healthScore.band}
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
              <ArrowUpRight className="h-3 w-3" />+{healthScore.delta}
            </span>
          </div>

          <div className="mt-4 flex flex-col items-center">
            <HealthRing
              score={healthScore.score}
              max={healthScore.max}
              label={`of ${healthScore.max}`}
            />
          </div>

          <ul className="mt-5 space-y-2">
            {healthScore.factors.map((f) => (
              <li key={f.label} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-[11px] font-medium text-muted-foreground">
                  {f.label}
                </span>
                <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full gradient-aurora"
                    style={{ width: `${f.weight}%` }}
                  />
                </span>
                <span className="w-8 text-right text-[11px] font-semibold tabular-nums text-foreground">
                  {f.weight}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Net worth + cashflow */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                Net Worth
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <MoneyValue
                  value={netWorth.total}
                  short
                  className="font-display text-4xl text-foreground sm:text-[40px]"
                />
                <span className="inline-flex items-center gap-0.5 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                  <ArrowUpRight className="h-3 w-3" />
                  {formatPercent(netWorth.deltaPct)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                +{formatINRShort(netWorth.delta)} this month · across 5 asset classes
              </p>
            </div>
            <div className="flex gap-1 rounded-xl border border-border bg-surface-sunken p-1 text-[11px] font-semibold">
              {["1M", "3M", "1Y", "5Y", "All"].map((t, i) => (
                <button
                  key={t}
                  type="button"
                  className={
                    i === 2
                      ? "rounded-lg bg-surface px-3 py-1.5 text-foreground shadow-xs"
                      : "rounded-lg px-3 py-1.5 text-muted-foreground hover:text-foreground"
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <CashflowChart />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {netWorth.breakdown.map((b) => (
              <div key={b.label} className="rounded-xl border border-border bg-background/40 px-3 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: `var(--${b.color})` }}
                  />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {b.label}
                  </span>
                </div>
                <div className="mt-1 text-sm font-semibold tabular-nums text-foreground">
                  {formatINRShort(b.value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Income · Jun" value={monthly.income} icon={Wallet} tone="positive" />
        <StatCard label="Expenses · Jun" value={monthly.expenses} icon={ArrowDownRight} tone="negative" />
        <StatCard label="Saved · Jun" value={monthly.savings} icon={PiggyBank} tone="positive" delta={monthly.savingsRate} deltaLabel="Savings rate" />
        <StatCard label="Invested YTD" value={4_20_000} icon={TrendingUp} tone="neutral" delta={12.4} deltaLabel="vs last year" />
      </div>

      {/* Quick actions */}
      <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
        {QUICK_ACTIONS.map((a) => (
          <Link
            key={a.label}
            to={a.to}
            className="group flex min-w-[120px] flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <a.icon className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-foreground">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* AI summary */}
      <div className="mt-8">
        <AISummaryCard />
      </div>

      {/* Insights */}
      <section className="mt-10">
        <SectionHeader
          eyebrow="Smart insights"
          title="What PRISM is thinking about your money"
          action="See all"
          actionTo="/insights"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {insights.map((i) => (
            <InsightCard key={i.id} {...i} />
          ))}
        </div>
      </section>

      {/* Journeys + right column */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <SectionHeader
            eyebrow="Life journeys"
            title="Plans in motion"
            action="Plan a journey"
            actionTo="/journeys"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {journeys.slice(0, 4).map((j) => (
              <JourneyCard key={j.id} {...j} />
            ))}
          </div>
        </section>

        {/* Upcoming */}
        <section>
          <SectionHeader eyebrow="Next 30 days" title="Upcoming" />
          <div className="space-y-3">
            {upcomingTasks.map((t) => {
              const tone =
                t.kind === "bill"
                  ? "bg-destructive/10 text-destructive"
                  : t.kind === "opportunity"
                    ? "bg-success/10 text-success"
                    : "bg-primary/10 text-primary";
              const Icon = t.kind === "bill" ? BellRing : t.kind === "opportunity" ? Sparkles : ShieldCheck;
              return (
                <div
                  key={t.id}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3.5"
                >
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-foreground">{t.title}</div>
                    <div className="text-[11px] text-muted-foreground">{t.due}</div>
                  </div>
                  <MoneyValue value={t.amount} short className="text-sm text-foreground" />
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <SectionHeader eyebrow="Goals" title="Saving toward" action="All goals" actionTo="/goals" />
            <div className="space-y-3">
              {goals.map((g) => {
                const pct = Math.round((g.saved / g.target) * 100);
                return (
                  <div key={g.id} className="rounded-2xl border border-border bg-surface p-4">
                    <div className="flex items-baseline justify-between">
                      <div className="text-sm font-semibold text-foreground">{g.title}</div>
                      <div className="text-[11px] text-muted-foreground">by {g.eta}</div>
                    </div>
                    <div className="mt-1.5 flex items-baseline gap-1.5">
                      <MoneyValue value={g.saved} short className="text-base text-foreground" />
                      <span className="text-xs text-muted-foreground">
                        / {formatINRShort(g.target)}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full gradient-aurora"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Transactions */}
      <section className="mt-10">
        <SectionHeader
          eyebrow="Money movement"
          title="Recent transactions"
          action="See all"
          actionTo="/transactions"
        />
        <div className="rounded-2xl border border-border bg-surface p-2 shadow-soft">
          {transactions.slice(0, 6).map((t) => (
            <TransactionRow key={t.id} t={t} />
          ))}
        </div>
      </section>

      <p className="mt-10 text-center text-[11px] text-muted-foreground">
        PRISM is your Financial Digital Twin. Predictions are estimates — not guarantees. State Bank of India · SBI-Regulated ·
        <Link to="/settings" className="ml-1 underline underline-offset-2 hover:text-foreground">Manage preferences</Link>
      </p>
    </div>
  );
}
