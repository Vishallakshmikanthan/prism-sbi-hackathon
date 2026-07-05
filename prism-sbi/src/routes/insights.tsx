import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Lightbulb, AlertTriangle, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";
import { PageHeader, PageShell } from "@/components/prism/page-header";
import { insightFeed } from "@/lib/mock/data";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights · PRISM" },
      { name: "description", content: "Predictions, risks and opportunities — reasoned from your own data with confidence and sources." },
    ],
  }),
  component: Page,
});

const KIND_META = {
  prediction: { icon: TrendingUp, cls: "bg-primary/10 text-primary" },
  risk: { icon: AlertTriangle, cls: "bg-destructive/10 text-destructive" },
  opportunity: { icon: Sparkles, cls: "bg-success/10 text-success" },
  nudge: { icon: Lightbulb, cls: "bg-warning/10 text-warning" },
} as const;

const CATS = ["All", "Cashflow", "Investing", "Credit", "Tax", "Insurance", "Goals"];

function Page() {
  const [cat, setCat] = useState("All");
  const [done, setDone] = useState<Set<string>>(new Set());
  const list = useMemo(
    () => (cat === "All" ? insightFeed : insightFeed.filter((i) => i.category === cat)),
    [cat],
  );
  return (
    <PageShell>
      <PageHeader
        eyebrow="Explainable AI"
        title="Insights"
        icon={Lightbulb}
        description="Every insight is reasoned from your own accounts, with confidence and a suggested action."
      />

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={
              (cat === c ? "gradient-primary text-primary-foreground shadow-soft" : "border border-border bg-surface text-foreground hover:bg-muted") +
              " whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold"
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((i) => {
          const meta = KIND_META[i.kind];
          const isDone = done.has(i.id);
          return (
            <article
              key={i.id}
              className={
                "flex flex-col rounded-3xl border bg-surface p-5 shadow-soft transition-opacity " +
                (isDone ? "border-border/60 opacity-60" : "border-border")
              }
            >
              <div className="flex items-start justify-between">
                <span className={"inline-flex h-9 w-9 items-center justify-center rounded-xl " + meta.cls}>
                  <meta.icon className="h-4 w-4" />
                </span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {i.category}
                </span>
              </div>
              <h3 className="mt-3 font-display text-base font-semibold text-foreground">{i.title}</h3>
              <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{i.body}</p>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="text-[11px] text-muted-foreground">Confidence {(i.confidence * 100).toFixed(0)}%</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDone((d) => new Set(d).add(i.id))}
                    className="rounded-lg border border-border bg-surface-sunken px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Dismiss
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDone((d) => new Set(d).add(i.id));
                      alert(`Acting on: ${i.title}`);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg gradient-primary px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground shadow-soft"
                  >
                    {isDone ? <CheckCircle2 className="h-3 w-3" /> : null}
                    {isDone ? "Done" : "Act"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}