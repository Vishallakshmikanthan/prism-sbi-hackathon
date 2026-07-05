import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, ArrowUpRight } from "lucide-react";
import { PageHeader, PageShell } from "@/components/prism/page-header";
import { HealthRing } from "@/components/prism/health-ring";
import { healthScore, healthHistory } from "@/lib/mock/data";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/health")({
  head: () => ({
    meta: [
      { title: "Financial Health · PRISM" },
      { name: "description", content: "Your composite health score — factors, history and exactly what improves it." },
    ],
  }),
  component: Page,
});

const TIPS = [
  { title: "Push savings rate above 55%", body: "Adds ~8 points over 6 months.", weight: "+8" },
  { title: "Complete 6-month emergency cover", body: "Currently at 4.2 months — one more ₹1.1L parked.", weight: "+6" },
  { title: "Raise term cover to 15× income", body: "Adds insurance depth score by 12 points.", weight: "+12" },
  { title: "Diversify small-cap exposure", body: "Trim ₹42k to Nifty BeES — reduces risk.", weight: "+4" },
];

function Page() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Score"
        title="Financial Health"
        icon={ShieldCheck}
        description="A composite view of the five factors that decide your future — with the shortest path to a higher score."
      />

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col items-center rounded-3xl border border-border bg-surface p-6 shadow-soft">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">Overall</div>
          <HealthRing score={healthScore.score} max={healthScore.max} label={`of ${healthScore.max}`} />
          <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
            <ArrowUpRight className="h-3 w-3" /> +{healthScore.delta} vs last month
          </div>
          <div className="mt-2 text-sm font-semibold text-foreground">{healthScore.band}</div>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft lg:col-span-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">12-month trend</div>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthHistory}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={[680, 800]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--surface)" }} />
                <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--primary)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">Factor breakdown</div>
          <ul className="mt-4 space-y-3.5">
            {healthScore.factors.map((f) => (
              <li key={f.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{f.label}</span>
                  <span className="font-semibold tabular-nums text-foreground">{f.weight}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full gradient-aurora" style={{ width: `${f.weight}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">Shortest path to a higher score</div>
          <ul className="mt-4 space-y-3">
            {TIPS.map((t) => (
              <li key={t.title} className="flex items-start gap-3 rounded-2xl border border-border bg-surface-sunken p-3.5">
                <span className="inline-flex h-9 w-12 shrink-0 items-center justify-center rounded-lg gradient-primary text-xs font-bold text-primary-foreground">{t.weight}</span>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}