import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  action,
  actionTo,
  right,
}: {
  eyebrow?: string;
  title: string;
  action?: string;
  actionTo?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
            {eyebrow}
          </div>
        )}
        <h2 className="mt-1 font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {title}
        </h2>
      </div>
      {right ??
        (action && actionTo && (
          <Link
            to={actionTo}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            {action}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ))}
    </div>
  );
}