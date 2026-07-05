import { cn } from "@/lib/utils";
import { formatINR, formatINRShort } from "@/lib/format";

export function MoneyValue({
  value,
  short = false,
  className,
  currencyClassName,
}: {
  value: number;
  short?: boolean;
  className?: string;
  currencyClassName?: string;
}) {
  if (short) {
    return (
      <span className={cn("tabular-nums font-display font-semibold", className)}>
        {formatINRShort(value)}
      </span>
    );
  }
  const [sym, ...rest] = formatINR(value).split("");
  return (
    <span className={cn("tabular-nums font-display font-semibold", className)}>
      <span className={cn("mr-0.5 opacity-70", currencyClassName)}>{sym}</span>
      {rest.join("")}
    </span>
  );
}