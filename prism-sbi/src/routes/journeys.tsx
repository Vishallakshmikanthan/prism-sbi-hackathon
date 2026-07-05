import { createFileRoute } from "@tanstack/react-router";
import { Route as RouteIcon, Plus, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { PageHeader, PageShell } from "@/components/prism/page-header";
import { journeys, journeySteps } from "@/lib/mock/data";
import { formatPercent } from "@/lib/format";

export const Route = createFileRoute("/journeys")({
  head: () => ({
    meta: [
      { title: "Life Journeys · PRISM" },
      { name: "description", content: "Plan every life goal — home, retirement, tax, baby — as an executable journey your Twin can drive." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Life"
        title="Journeys"
        icon={RouteIcon}
        description="Every plan broken into milestones. PRISM books the next step for you when you approve."
        actions={
          <button
            type="button"
            onClick={() => alert("Journey composer opens…")}
            className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-soft"
          >
            <Plus className="h-4 w-4" /> New journey
          </button>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          {journeys.map((j, i) => (
            <article key={j.id} className={"rounded-3xl border p-5 shadow-soft transition " + (i === 0 ? "border-primary bg-primary/5" : "border-border bg-surface")}>
              <div className="flex items-baseline justify-between">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">{j.subtitle}</div>
                <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">ETA {j.eta}</span>
              </div>
              <h3 className="mt-1 font-display text-lg font-semibold text-foreground">{j.title}</h3>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-display text-2xl font-semibold tabular-nums text-foreground">{formatPercent(j.progress, 0)}</span>
                <span className="text-[11px] text-muted-foreground">{j.completed}/{j.milestones} steps</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full gradient-aurora" style={{ width: `${j.progress}%` }} />
              </div>
              <div className="mt-3 text-xs text-muted-foreground">Next: <span className="font-semibold text-foreground">{j.nextStep}</span></div>
            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 lg:col-span-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">Buy your first home</div>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">SBI Home Loan · ₹1.2 Cr target · Q3 2027</h2>
          <p className="mt-2 text-sm text-muted-foreground">Your Twin has confirmed affordability at 92% confidence. Pre-approval is your next step — PRISM can submit it now.</p>

          <ol className="mt-6 space-y-3">
            {journeySteps.map((s, i) => (
              <li key={s.id} className={"flex items-start gap-3 rounded-2xl border p-3.5 " + (s.next ? "border-primary bg-primary/5" : "border-border bg-surface-sunken")}>
                <span className="mt-0.5">
                  {s.done ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : s.next ? (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-primary-foreground">{i + 1}</span>
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </span>
                <div className="flex-1">
                  <div className={"text-sm font-semibold " + (s.done ? "text-muted-foreground line-through" : "text-foreground")}>{s.label}</div>
                  {s.next && <div className="mt-0.5 text-[11px] text-muted-foreground">Estimated 2 minutes · docs auto-attached from Vault</div>}
                </div>
                {s.next && (
                  <button
                    type="button"
                    onClick={() => alert("Submitting SBI Home Loan pre-approval…")}
                    className="inline-flex items-center gap-1 rounded-lg gradient-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft"
                  >
                    Do it <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </PageShell>
  );
}