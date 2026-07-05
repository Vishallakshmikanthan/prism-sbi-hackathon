import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MoneyValue } from "./money-value";
import { formatPercent } from "@/lib/format";

export function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  icon: Icon,
  tone = "neutral",
  short = true,
}: {
  label: string;
  value: number;
  delta?: number;
  deltaLabel?: string;
  icon?: LucideIcon;
  tone?: "neutral" | "positive" | "negative";
  short?: boolean;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {Icon && (
          <span
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-xl",
              tone === "positive" && "bg-success/10 text-success",
              tone === "negative" && "bg-destructive/10 text-destructive",
              tone === "neutral" && "bg-primary/10 text-primary",
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <MoneyValue value={value} short={short} className="text-2xl text-foreground" />
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums",
              positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {formatPercent(delta)}
          </span>
        )}
      </div>
      {deltaLabel && (
        <p className="mt-1 text-[11px] text-muted-foreground">{deltaLabel}</p>
      )}
    </div>
  );
}