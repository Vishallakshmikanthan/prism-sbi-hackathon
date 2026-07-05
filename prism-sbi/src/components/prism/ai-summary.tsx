import { Sparkles, ArrowRight } from "lucide-react";
import { aiSummary } from "@/lib/mock/data";

export function AISummaryCard() {
  return (
    <section
      aria-label="AI daily summary"
      className="relative overflow-hidden rounded-2xl border border-primary/20 gradient-wealth p-6 text-primary-foreground shadow-premium"
    >
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden />
      <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" aria-hidden />

      <div className="relative flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur">
          <Sparkles className="h-3 w-3" />
          PRISM · Daily brief
        </span>
        <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-medium tabular-nums backdrop-blur">
          {Math.round(aiSummary.confidence * 100)}% confidence
        </span>
      </div>

      <h2 className="relative mt-4 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-[26px]">
        {aiSummary.headline}
      </h2>
      <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">
        {aiSummary.body}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {aiSummary.actions.map((a, i) => (
          <button
            key={a}
            type="button"
            className={
              i === 0
                ? "inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-primary shadow-soft transition-transform hover:-translate-y-0.5"
                : "inline-flex items-center gap-1.5 rounded-xl border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-semibold text-primary-foreground backdrop-blur transition-colors hover:bg-white/20"
            }
          >
            {a}
            {i === 0 && <ArrowRight className="h-3.5 w-3.5" />}
          </button>
        ))}
      </div>
    </section>
  );
}