import { Link } from "@tanstack/react-router";
import { Bell, Search, Sparkles } from "lucide-react";
import { PrismWordmark } from "@/components/prism/logo";
import { user } from "@/lib/mock/data";

export function AppTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-8">
        <div className="lg:hidden">
          <PrismWordmark />
        </div>

        <div className="ml-auto flex flex-1 items-center justify-end gap-2 lg:ml-0 lg:justify-between">
          <div className="hidden lg:flex flex-1 max-w-md">
            <label className="relative w-full">
              <span className="sr-only">Search accounts, insights, journeys</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Ask PRISM anything — accounts, journeys, insights…"
                className="w-full rounded-xl border border-border bg-surface-sunken pl-9 pr-16 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:bg-surface focus:ring-4 focus:ring-primary/10"
              />
              <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </label>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to="/assistant"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl gradient-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Ask PRISM
            </Link>

            <Link
              to="/notifications"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:bg-muted"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-destructive" />
            </Link>

            <Link
              to="/profile"
              className="ml-1 inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-2 py-1.5 text-left transition-colors hover:bg-muted"
              aria-label="Profile"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full gradient-aurora text-[11px] font-bold text-primary-foreground">
                {user.firstName[0]}
              </span>
              <span className="hidden sm:flex flex-col leading-tight">
                <span className="text-xs font-semibold text-foreground">
                  {user.firstName}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {user.customerId}
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}