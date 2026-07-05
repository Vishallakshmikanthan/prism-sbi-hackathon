import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, CheckCheck, ShieldAlert, Sparkles, ArrowUpRight, TrendingUp, Info } from "lucide-react";
import { PageHeader, PageShell } from "@/components/prism/page-header";
import { notifications as seed } from "@/lib/mock/data";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications · PRISM" },
      { name: "description", content: "Every important signal from your money — nudges, alerts and confirmations." },
    ],
  }),
  component: Page,
});

const ICONS: Record<string, typeof Bell> = {
  success: TrendingUp,
  warning: ShieldAlert,
  primary: Sparkles,
  muted: Info,
};

function Page() {
  const [items, setItems] = useState(seed);
  const unread = items.filter((i) => i.unread).length;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Signals"
        title="Notifications"
        icon={Bell}
        description={`${unread} unread. Every notification comes with a suggested action.`}
        actions={
          <button
            type="button"
            onClick={() => setItems((is) => is.map((i) => ({ ...i, unread: false })))}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
          >
            <CheckCheck className="h-4 w-4" /> Mark all read
          </button>
        }
      />

      <div className="mt-6 space-y-3">
        {items.map((n) => {
          const Icon = ICONS[n.tone] ?? Bell;
          const tone = n.tone === "success" ? "bg-success/10 text-success" : n.tone === "warning" ? "bg-warning/10 text-warning" : n.tone === "primary" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground";
          return (
            <article key={n.id} className={"flex items-start gap-3 rounded-2xl border p-4 shadow-soft " + (n.unread ? "border-primary/40 bg-primary/5" : "border-border bg-surface")}>
              <span className={"inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl " + tone}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="truncate text-sm font-semibold text-foreground">{n.title}</div>
                  <div className="shrink-0 text-[11px] text-muted-foreground">{n.ts}</div>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
              </div>
              <button
                type="button"
                onClick={() => setItems((is) => is.map((i) => (i.id === n.id ? { ...i, unread: false } : i)))}
                className="rounded-lg border border-border bg-surface p-2 text-muted-foreground hover:text-foreground"
                aria-label="Open"
              >
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}