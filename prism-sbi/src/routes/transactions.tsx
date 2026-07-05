import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeftRight, Download, Search, SlidersHorizontal } from "lucide-react";
import { PageHeader, PageShell } from "@/components/prism/page-header";
import { TransactionRow } from "@/components/prism/transaction-row";
import { transactions } from "@/lib/mock/data";
import { formatINR } from "@/lib/format";

export const Route = createFileRoute("/transactions")({
  head: () => ({
    meta: [
      { title: "Transactions · PRISM" },
      { name: "description", content: "Unified feed across every SBI account, auto-tagged by PRISM." },
    ],
  }),
  component: Page,
});

const CATS = ["All", "Income", "Food & Dining", "Shopping", "Groceries", "Bills & Utilities", "Transport", "Investments", "EMI"];

function Page() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (cat !== "All" && t.category !== cat) return false;
      if (q && !`${t.merchant} ${t.aiTag ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, cat]);

  const totals = useMemo(() => {
    const inflow = filtered.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const outflow = filtered.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);
    return { inflow, outflow, net: inflow + outflow };
  }, [filtered]);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Money movement"
        title="Transactions"
        description="Auto-tagged across every account. Search naturally — 'zomato last week' works."
        icon={ArrowLeftRight}
        actions={
          <button
            type="button"
            onClick={() => alert(`Exporting ${filtered.length} transactions to CSV…`)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2 text-sm font-semibold text-foreground hover:bg-muted"
          >
            <Download className="h-4 w-4" /> Export
          </button>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatBlock label="Inflow" value={formatINR(totals.inflow)} tone="success" />
        <StatBlock label="Outflow" value={formatINR(Math.abs(totals.outflow))} tone="destructive" />
        <StatBlock label="Net" value={formatINR(totals.net)} tone="foreground" />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search merchants, tags, amounts…"
            className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </label>
        <button
          type="button"
          onClick={() => alert("Advanced filter panel — dates, accounts, method")}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={
              (cat === c
                ? "gradient-primary text-primary-foreground shadow-soft"
                : "border border-border bg-surface text-foreground hover:bg-muted") +
              " whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold"
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-surface p-2 shadow-soft">
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-muted-foreground">No transactions match.</div>
        ) : (
          filtered.map((t) => <TransactionRow key={t.id} t={t} />)
        )}
      </div>
    </PageShell>
  );
}

function StatBlock({ label, value, tone }: { label: string; value: string; tone: "success" | "destructive" | "foreground" }) {
  const cls = tone === "success" ? "text-success" : tone === "destructive" ? "text-destructive" : "text-foreground";
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 font-display text-2xl font-semibold tabular-nums ${cls}`}>{value}</div>
    </div>
  );
}