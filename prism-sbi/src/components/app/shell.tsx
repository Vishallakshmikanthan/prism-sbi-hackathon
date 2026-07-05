import type { ReactNode } from "react";
import { AppSidebar } from "./sidebar";
import { AppTopbar } from "./topbar";
import { BottomNav } from "./bottom-nav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full bg-background text-foreground">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar />
        <main className="flex-1 pb-24 lg:pb-8">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}