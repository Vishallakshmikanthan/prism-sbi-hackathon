import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TrendingUp, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader, PageShell } from "@/components/prism/page-header";
import { holdings, netWorth, wealthProjection } from "@/lib/mock/data";
import { formatINR, formatINRShort, formatPercent } from "@/lib/format";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio · PRISM" },
      { name: "description", content: "Holdings, allocation, day P&L and long-range wealth projection — one calm view." },
    ],
  }),
  component: Page,
});

const KINDS = ["All", "Mutual Fund", "Equity", "ETF", "Bond", "Gold"] as const;

function Page() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("All");
  const filtered = useMemo(
    () => (kind === "All" ? holdings : holdings.filter((h) => h.kind === kind)),
    [kind],
  );
  const totals = useMemo(() => {
    const invested = filtered.reduce((s, h) => s + h.invested, 0);
    const current = filtered.reduce((s, h) => s + h.current, 0);
    return { invested, current, pnl: current - invested, pnlPct: ((current - invested) / invested) * 100 };
  }, [filtered]);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Wealth"
        title="Portfolio"
        description="Every investment across mutual funds, equities, ETFs, gold and bonds — reconciled daily."
        icon={TrendingUp}
        actions={
          <button
            type="button"
            onClick={() => alert("New SIP wizard would open here.")}
            className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-soft"
          >
            <Plus className="h-4 w-4" /> New investment
          </button>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-surface p-6 lg:col-span-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">Wealth projection</div>
              <div className="mt-1 font-display text-4xl font-semibold tabular-nums">{formatINRShort(netWorth.total)}</div>
              <div className="text-xs text-muted-foreground">Projected ₹1.78 Cr by 2030 · at current savings rate</div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
              <ArrowUpRight className="h-3 w-3" /> {formatPercent(netWorth.deltaPct)}
            </span>
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wealthProjection}>
                <defs>
                  <linearGradient id="wealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1_00_00_000).toFixed(1)}Cr`} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--surface)" }}
                  formatter={(v: number) => formatINRShort(v)}
                />
                <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2.5} fill="url(#wealth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">Allocation</div>
          <div className="mt-2 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={netWorth.breakdown} dataKey="value" innerRadius={44} outerRadius={72} paddingAngle={2}>
                  {netWorth.breakdown.map((b) => (
                    <Cell key={b.label} fill={`var(--${b.color})`} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => formatINRShort(v)} contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--surface)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 space-y-1.5">
            {netWorth.breakdown.map((b) => (
              <li key={b.label} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: `var(--${b.color})` }} />
                  {b.label}
                </span>
                <span className="font-semibold tabular-nums text-foreground">{formatINRShort(b.value)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Kpi label="Invested" value={formatINRShort(totals.invested)} />
        <Kpi label="Current" value={formatINRShort(totals.current)} />
        <Kpi label="Unrealised P&L" value={formatINR(totals.pnl)} tone={totals.pnl >= 0 ? "success" : "destructive"} />
        <Kpi label="Return" value={formatPercent(totals.pnlPct)} tone={totals.pnl >= 0 ? "success" : "destructive"} />
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {KINDS.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={
              (kind === k ? "gradient-primary text-primary-foreground shadow-soft" : "border border-border bg-surface text-foreground hover:bg-muted") +
              " whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold"
            }
          >
            {k}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-surface-sunken text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Holding</th>
              <th className="px-4 py-3 text-right font-semibold">Units</th>
              <th className="px-4 py-3 text-right font-semibold">Avg</th>
              <th className="px-4 py-3 text-right font-semibold">LTP</th>
              <th className="px-4 py-3 text-right font-semibold">Current</th>
              <th className="px-4 py-3 text-right font-semibold">Day</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((h) => (
              <tr key={h.id} className="border-t border-border hover:bg-muted/40">
                <td className="px-4 py-3">
                  <div className="font-semibold text-foreground">{h.name}</div>
                  <div className="text-[11px] text-muted-foreground">{h.symbol} · {h.kind}</div>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{h.units.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-right tabular-nums">{formatINR(h.avg)}</td>
                <td className="px-4 py-3 text-right tabular-nums">{formatINR(h.ltp)}</td>
                <td className="px-4 py-3 text-right tabular-nums font-semibold text-foreground">{formatINRShort(h.current)}</td>
                <td className={"px-4 py-3 text-right tabular-nums font-semibold " + (h.dayChange >= 0 ? "text-success" : "text-destructive")}>
                  <span className="inline-flex items-center gap-0.5">
                    {h.dayChange >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {formatPercent(h.dayChange, 2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}

function Kpi({ label, value, tone = "foreground" }: { label: string; value: string; tone?: "success" | "destructive" | "foreground" }) {
  const cls = tone === "success" ? "text-success" : tone === "destructive" ? "text-destructive" : "text-foreground";
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 font-display text-xl font-semibold tabular-nums ${cls}`}>{value}</div>
    </div>
  );
}