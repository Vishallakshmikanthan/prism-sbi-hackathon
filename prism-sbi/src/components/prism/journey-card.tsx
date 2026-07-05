import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export function JourneyCard({
  title,
  subtitle,
  progress,
  eta,
  nextStep,
  milestones,
  completed,
}: {
  title: string;
  subtitle: string;
  progress: number;
  eta: string;
  nextStep: string;
  milestones: number;
  completed: number;
}) {
  return (
    <Link
      to="/journeys"
      className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-[11px] font-medium">
            <span className="text-muted-foreground">Progress</span>
            <span className="tabular-nums text-foreground">{progress}%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full gradient-aurora transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-[11px]">
        <div>
          <div className="text-muted-foreground">Milestones</div>
          <div className="mt-0.5 flex items-center gap-1 font-semibold text-foreground">
            <CheckCircle2 className="h-3 w-3 text-success" />
            {completed} / {milestones}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground">ETA</div>
          <div className="mt-0.5 font-semibold text-foreground">{eta}</div>
        </div>
        <div className="col-span-3 mt-3 rounded-xl bg-muted/60 px-3 py-2">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            Next step
          </div>
          <div className="mt-0.5 text-xs font-medium text-foreground">
            {nextStep}
          </div>
        </div>
      </div>
    </Link>
  );
}