import { cn } from "@/lib/utils";
import type { Transaction } from "@/lib/mock/data";
import { MoneyValue } from "./money-value";
import { formatDateShort } from "@/lib/format";

export function TransactionRow({ t }: { t: Transaction }) {
  const initial = t.merchant.slice(0, 1).toUpperCase();
  const credit = t.amount > 0;
  return (
    <div className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-muted/60">
      <span
        className={cn(
          "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-semibold text-sm",
          t.merchantLogoBg,
        )}
      >
        {initial}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 truncate text-sm font-semibold text-foreground">
          {t.merchant}
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span>{t.category}</span>
          <span className="text-border">·</span>
          <span>{t.method}</span>
          {t.aiTag && (
            <>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                AI · {t.aiTag}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="text-right">
        <MoneyValue
          value={t.amount}
          short
          className={cn(
            "text-sm",
            credit ? "text-success" : "text-foreground",
          )}
        />
        <div className="mt-0.5 text-[11px] text-muted-foreground">
          {formatDateShort(t.date)}
        </div>
      </div>
    </div>
  );
}