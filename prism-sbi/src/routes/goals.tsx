import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Target, Plus, X } from "lucide-react";
import { PageHeader, PageShell } from "@/components/prism/page-header";
import { goals as seedGoals } from "@/lib/mock/data";
import { formatINR, formatINRShort } from "@/lib/format";

type Goal = { id: string; title: string; target: number; saved: number; eta: string };

export const Route = createFileRoute("/goals")({
  head: () => ({
    meta: [
      { title: "Goals · PRISM" },
      { name: "description", content: "Save toward every intention — from a Bali trip to an emergency fund. Auto-funded by your Twin." },
    ],
  }),
  component: Page,
});

function Page() {
  const [goals, setGoals] = useState<Goal[]>(seedGoals);
  const [creating, setCreating] = useState(false);
  const [t, setT] = useState({ title: "", target: "", eta: "" });

  function addGoal() {
    const target = Number(t.target);
    if (!t.title || !target) return;
    setGoals((g) => [...g, { id: `g${Date.now()}`, title: t.title, target, saved: 0, eta: t.eta || "12 months" }]);
    setT({ title: "", target: "", eta: "" });
    setCreating(false);
  }

  function contribute(id: string, amt: number) {
    setGoals((gs) => gs.map((g) => (g.id === id ? { ...g, saved: Math.min(g.target, g.saved + amt) } : g)));
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Saving"
        title="Goals"
        icon={Target}
        description="Every intention becomes a funded track. Your Twin auto-parks the right amount every payday."
        actions={
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-soft"
          >
            <Plus className="h-4 w-4" /> New goal
          </button>
        }
      />

      {creating && (
        <div className="mt-6 rounded-3xl border border-primary bg-primary/5 p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-foreground">Create a new goal</div>
            <button type="button" onClick={() => setCreating(false)} className="rounded-lg p-1 text-muted-foreground hover:bg-muted"><X className="h-4 w-4" /></button>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <input value={t.title} onChange={(e) => setT({ ...t, title: e.target.value })} placeholder="Goal title" className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm" />
            <input value={t.target} onChange={(e) => setT({ ...t, target: e.target.value })} placeholder="Target ₹" type="number" className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm tabular-nums" />
            <input value={t.eta} onChange={(e) => setT({ ...t, eta: e.target.value })} placeholder="ETA (e.g. Dec 2027)" className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm" />
          </div>
          <button type="button" onClick={addGoal} className="mt-3 rounded-xl gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Create goal</button>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {goals.map((g) => {
          const pct = Math.round((g.saved / g.target) * 100);
          return (
            <article key={g.id} className="rounded-3xl border border-border bg-surface p-5 shadow-soft">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-semibold text-foreground">{g.title}</h3>
                <span className="text-[11px] text-muted-foreground">by {g.eta}</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-2xl font-semibold tabular-nums text-foreground">{formatINR(g.saved)}</span>
                <span className="text-xs text-muted-foreground">/ {formatINRShort(g.target)}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full gradient-aurora" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">{pct}% funded</div>
              <div className="mt-4 flex gap-2">
                {[1000, 5000, 10000].map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => contribute(g.id, a)}
                    className="rounded-lg border border-border bg-surface-sunken px-2.5 py-1.5 text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    + {formatINRShort(a)}
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}