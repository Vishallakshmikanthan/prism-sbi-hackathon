import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { NAV, type NavItem } from "@/lib/nav";
import { PrismWordmark } from "@/components/prism/logo";
import { twinScore } from "@/lib/mock/data";
import { Sparkles } from "lucide-react";

const GROUPS: { key: NavItem["group"]; label: string }[] = [
  { key: "core", label: "Overview" },
  { key: "intelligence", label: "Intelligence" },
  { key: "money", label: "Money" },
  { key: "account", label: "Account" },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className="hidden lg:flex sticky top-0 h-dvh w-[264px] shrink-0 flex-col border-r border-border bg-sidebar"
      aria-label="Primary navigation"
    >
      <div className="px-6 py-6">
        <PrismWordmark />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {GROUPS.map((group) => {
          const items = NAV.filter((n) => n.group === group.key);
          return (
            <div key={group.key} className="mb-6">
              <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {group.label}
              </div>
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const active =
                    item.to === "/"
                      ? pathname === "/"
                      : pathname === item.to || pathname.startsWith(item.to + "/");
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                        )}
                      >
                        {active && (
                          <span
                            className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-primary"
                            aria-hidden
                          />
                        )}
                        <Icon
                          className={cn(
                            "h-4 w-4 transition-colors",
                            active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                          )}
                        />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      <div className="m-3 rounded-2xl border border-border bg-gradient-to-br from-surface to-muted p-4 shadow-soft">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Twin Score
        </div>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="font-display text-3xl font-bold tabular-nums text-foreground">
            {twinScore.score}
          </span>
          <span className="text-sm text-muted-foreground">/100</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {Math.round(twinScore.confidence * 100)}% confidence · synced {twinScore.lastSyncMinutes}m ago
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full gradient-aurora"
            style={{ width: `${twinScore.score}%` }}
          />
        </div>
      </div>
    </aside>
  );
}