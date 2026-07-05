import { createFileRoute } from "@tanstack/react-router";
import { Network, Activity, Cpu, RadioTower } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader, PageShell } from "@/components/prism/page-header";
import { twinScore, twinMemory, twinSignals, wealthProjection } from "@/lib/mock/data";
import { formatINRShort } from "@/lib/format";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/twin")({
  head: () => ({
    meta: [
      { title: "Digital Twin · PRISM" },
      { name: "description", content: "Your privacy-preserving financial model — memory, signals, predictions and confidence." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Intelligence"
        title="Digital Twin"
        icon={Network}
        description="A living model of your finances. Watches income, spend, holdings and goals — and predicts what happens next."
      />

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl border border-border gradient-wealth p-6 text-primary-foreground shadow-elevated lg:col-span-2">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">Twin Score</div>
            <div className="mt-1 flex items-end gap-3">
              <div className="font-display text-6xl font-bold tabular-nums">{twinScore.score}</div>
              <div className="mb-2 text-sm opacity-80">/ 100 · confidence {(twinScore.confidence * 100).toFixed(0)}%</div>
            </div>
            <p className="mt-2 max-w-lg text-sm opacity-90">
              Your Twin is fully synced. Last update {twinScore.lastSyncMinutes} minutes ago. Tracking {twinScore.signalsTracked} live signals across {twinScore.memoryPoints.toLocaleString("en-IN")} memory points.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <MiniStat icon={Activity} label="Signals" value={String(twinScore.signalsTracked)} />
              <MiniStat icon={Cpu} label="Memory" value={twinScore.memoryPoints.toLocaleString("en-IN")} />
              <MiniStat icon={RadioTower} label="Sync" value={`${twinScore.lastSyncMinutes}m ago`} />
            </div>
          </div>
        </motion.div>

        <div className="rounded-3xl border border-border bg-surface p-5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">Signals</div>
          <ul className="mt-3 space-y-3">
            {twinSignals.map((s) => (
              <li key={s.id}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-semibold tabular-nums text-foreground">{s.value}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={
                      "h-full rounded-full " +
                      (s.tone === "success" ? "bg-success" : s.tone === "warning" ? "bg-warning" : "gradient-aurora")
                    }
                    style={{ width: `${s.value}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-surface p-6 lg:col-span-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">Wealth prediction</div>
          <h3 className="mt-1 font-display text-xl font-semibold text-foreground">Where your Twin sees you in 2030</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wealthProjection}>
                <defs>
                  <linearGradient id="tw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1_00_00_000).toFixed(1)}Cr`} />
                <Tooltip formatter={(v: number) => formatINRShort(v)} contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--surface)" }} />
                <Area type="monotone" dataKey="value" stroke="var(--accent-cyan)" strokeWidth={2.5} fill="url(#tw)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">Memory timeline</div>
          <ol className="mt-3 space-y-3 border-l border-border pl-4">
            {twinMemory.map((m) => (
              <li key={m.id} className="relative">
                <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary shadow-glow" />
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{m.when}</div>
                <div className="mt-0.5 text-sm text-foreground">{m.label}</div>
                <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full gradient-aurora" style={{ width: `${m.weight * 100}%` }} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </PageShell>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: typeof Activity; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/10 p-3">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider opacity-80">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-1 font-display text-lg font-semibold tabular-nums">{value}</div>
    </div>
  );
}