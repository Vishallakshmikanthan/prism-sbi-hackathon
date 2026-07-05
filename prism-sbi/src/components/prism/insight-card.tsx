import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

type Accent = "primary" | "warning" | "success" | "destructive";

const accentMap: Record<Accent, { chip: string; stroke: string; fill: string }> = {
  primary: { chip: "bg-primary/10 text-primary", stroke: "var(--primary)", fill: "var(--primary)" },
  warning: { chip: "bg-warning/10 text-warning", stroke: "var(--warning)", fill: "var(--warning)" },
  success: { chip: "bg-success/10 text-success", stroke: "var(--success)", fill: "var(--success)" },
  destructive: { chip: "bg-destructive/10 text-destructive", stroke: "var(--destructive)", fill: "var(--destructive)" },
};

export function InsightCard({
  kind,
  title,
  body,
  confidence,
  action,
  trend,
  accent = "primary",
}: {
  kind: "prediction" | "risk" | "opportunity";
  title: string;
  body: string;
  confidence: number;
  action: string;
  trend: number[];
  accent?: Accent;
}) {
  const a = accentMap[accent];
  const data = trend.map((v, i) => ({ i, v }));
  const id = `spark-${accent}-${title.length}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="flex items-center justify-between gap-2">
        <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", a.chip)}>
          <Sparkles className="h-3 w-3" />
          {kind}
        </span>
        <span className="text-[11px] font-medium tabular-nums text-muted-foreground">
          {Math.round(confidence * 100)}% confidence
        </span>
      </div>

      <h3 className="mt-3 font-display text-base font-semibold leading-snug text-foreground">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>

      <div className="mt-3 h-14 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={a.fill} stopOpacity={0.35} />
                <stop offset="100%" stopColor={a.fill} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={a.stroke}
              strokeWidth={2}
              fill={`url(#${id})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <button
        type="button"
        className={cn(
          "mt-3 inline-flex items-center justify-between rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted",
        )}
      >
        {action}
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </button>
    </article>
  );
}