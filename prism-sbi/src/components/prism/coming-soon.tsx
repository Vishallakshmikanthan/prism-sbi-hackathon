import { Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function ComingSoon({
  title,
  description,
  icon: Icon = Sparkles,
  bullets,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  bullets?: string[];
}) {
  return (
    <div className="mx-auto flex min-h-[72dvh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="relative mb-6">
        <span className="absolute inset-0 rounded-3xl gradient-aurora opacity-30 blur-2xl" aria-hidden />
        <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-3xl gradient-primary text-primary-foreground shadow-premium">
          <Icon className="h-7 w-7" />
        </span>
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
        Shipping next
      </div>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </p>
      {bullets && bullets.length > 0 && (
        <ul className="mt-6 grid w-full max-w-md grid-cols-1 gap-2 text-left text-sm text-muted-foreground sm:grid-cols-2">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 rounded-xl border border-border bg-surface px-3 py-2"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {b}
            </li>
          ))}
        </ul>
      )}
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}