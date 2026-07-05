import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Wallet, Plus, Copy, Eye, EyeOff } from "lucide-react";
import { PageHeader, PageShell } from "@/components/prism/page-header";
import { accounts } from "@/lib/mock/data";
import { formatINR, formatINRShort } from "@/lib/format";

export const Route = createFileRoute("/accounts")({
  head: () => ({
    meta: [
      { title: "Accounts & Cards · PRISM" },
      { name: "description", content: "Every account, card and deposit in one calm view." },
    ],
  }),
  component: Page,
});

function Page() {
  const [showBal, setShowBal] = useState(true);
  const totalAssets = accounts.filter((a) => a.balance > 0).reduce((s, a) => s + a.balance, 0);
  const totalDebts = accounts.filter((a) => a.balance < 0).reduce((s, a) => s + a.balance, 0);
  return (
    <PageShell>
      <PageHeader
        eyebrow="Money"
        title="Accounts & Cards"
        icon={Wallet}
        description="Everything linked to your PRISM Twin — SBI accounts, cards, loans, deposits and wallets."
        actions={
          <>
            <button
              type="button"
              onClick={() => setShowBal((s) => !s)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
            >
              {showBal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showBal ? "Hide balances" : "Show balances"}
            </button>
            <button
              type="button"
              onClick={() => alert("Link account flow…")}
              className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-soft"
            >
              <Plus className="h-4 w-4" /> Link account
            </button>
          </>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Total assets" value={showBal ? formatINR(totalAssets) : "•••••"} tone="success" />
        <SummaryCard label="Total debts" value={showBal ? formatINR(Math.abs(totalDebts)) : "•••••"} tone="destructive" />
        <SummaryCard label="Net position" value={showBal ? formatINR(totalAssets + totalDebts) : "•••••"} tone="foreground" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {accounts.map((a) => (
          <article key={a.id} className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated">
            <div className={`absolute inset-x-0 top-0 h-1 ${a.accent}`} />
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">{a.kind}</div>
                <h3 className="mt-1 font-display text-lg font-semibold text-foreground">{a.name}</h3>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="tabular-nums">{a.number}</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(a.number)}
                    className="rounded-md p-1 hover:bg-muted"
                    aria-label="Copy"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className={"font-display text-2xl font-semibold tabular-nums " + (a.balance < 0 ? "text-destructive" : "text-foreground")}>
                  {showBal ? formatINRShort(Math.abs(a.balance)) : "•••••"}
                </div>
                {a.limit && (
                  <div className="text-[11px] text-muted-foreground">Limit {formatINRShort(a.limit)}</div>
                )}
              </div>
            </div>
            {a.branch && (
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
                <span>{a.branch}</span>
                <span className="tabular-nums">{a.ifsc}</span>
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <ActionBtn label="Send" onClick={() => alert(`Send from ${a.name}`)} />
              <ActionBtn label="Statement" onClick={() => alert(`Statement · ${a.name}`)} />
              {a.kind === "Credit Card" && <ActionBtn label="Pay bill" onClick={() => alert("Pay credit card bill")} />}
              {a.kind === "Loan" && <ActionBtn label="Prepay" onClick={() => alert("Prepay EMI wizard")} />}
              {a.kind === "FD" && <ActionBtn label="Break FD" onClick={() => alert("Break FD confirmation")} />}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function SummaryCard({ label, value, tone }: { label: string; value: string; tone: "success" | "destructive" | "foreground" }) {
  const cls = tone === "success" ? "text-success" : tone === "destructive" ? "text-destructive" : "text-foreground";
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 font-display text-2xl font-semibold tabular-nums ${cls}`}>{value}</div>
    </div>
  );
}

function ActionBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-border bg-surface-sunken px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      {label}
    </button>
  );
}