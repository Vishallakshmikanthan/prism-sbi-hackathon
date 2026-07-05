import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Settings as SettingsIcon, Moon, Sun, Bell, Shield, Zap, Lock } from "lucide-react";
import { PageHeader, PageShell } from "@/components/prism/page-header";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · PRISM" },
      { name: "description", content: "Automation, privacy, notifications and appearance — all under your control." },
    ],
  }),
  component: Page,
});

type TogglesState = {
  autopark: boolean;
  rebalance: boolean;
  billpay: boolean;
  push: boolean;
  emailWeekly: boolean;
  biometrics: boolean;
  shareInsights: boolean;
  dark: boolean;
};

function Page() {
  const [t, setT] = useState<TogglesState>({
    autopark: true,
    rebalance: true,
    billpay: true,
    push: true,
    emailWeekly: false,
    biometrics: true,
    shareInsights: false,
    dark: false,
  });
  function toggle(k: keyof TogglesState) {
    setT((s) => {
      const next = { ...s, [k]: !s[k] };
      if (k === "dark") {
        document.documentElement.classList.toggle("dark", next.dark);
      }
      return next;
    });
  }

  return (
    <PageShell>
      <PageHeader eyebrow="Preferences" title="Settings" icon={SettingsIcon} description="Every automation is optional. Every consent is revocable." />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Section title="Automation" icon={Zap}>
          <Row label="Auto-park excess balance" desc="Sweep monthly excess above buffer into SBI MOD." on={t.autopark} onClick={() => toggle("autopark")} />
          <Row label="Auto-rebalance portfolio" desc="Keep asset allocation within 5% of target." on={t.rebalance} onClick={() => toggle("rebalance")} />
          <Row label="Auto-pay recurring bills" desc="Utilities, EMI, insurance premiums." on={t.billpay} onClick={() => toggle("billpay")} />
        </Section>

        <Section title="Notifications" icon={Bell}>
          <Row label="Push notifications" desc="Every important signal, on device." on={t.push} onClick={() => toggle("push")} />
          <Row label="Weekly email summary" desc="A one-page email every Monday." on={t.emailWeekly} onClick={() => toggle("emailWeekly")} />
        </Section>

        <Section title="Privacy & Security" icon={Shield}>
          <Row label="Biometric approval" desc="Required for every money movement." on={t.biometrics} onClick={() => toggle("biometrics")} />
          <Row label="Share anonymised insights" desc="Helps improve PRISM for everyone." on={t.shareInsights} onClick={() => toggle("shareInsights")} />
          <button type="button" onClick={() => alert("2FA setup wizard…")} className="mt-1 inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface-sunken px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted">
            <Lock className="h-4 w-4" /> Manage 2FA
          </button>
        </Section>

        <Section title="Appearance" icon={t.dark ? Moon : Sun}>
          <Row label="Dark mode" desc="Reduce eye strain in low light." on={t.dark} onClick={() => toggle("dark")} />
        </Section>
      </div>
    </PageShell>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: typeof SettingsIcon; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function Row({ label, desc, on, onClick }: { label: string; desc: string; on: boolean; onClick: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-sunken p-3.5">
      <div className="pr-4">
        <div className="text-sm font-semibold text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={onClick}
        className={"relative h-6 w-11 shrink-0 rounded-full transition-colors " + (on ? "gradient-primary" : "bg-muted")}
      >
        <span className={"absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform " + (on ? "translate-x-5" : "translate-x-0.5")} />
      </button>
    </div>
  );
}