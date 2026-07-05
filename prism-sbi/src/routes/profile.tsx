import { createFileRoute } from "@tanstack/react-router";
import { User, Mail, Phone, MapPin, IdCard, Shield } from "lucide-react";
import { PageHeader, PageShell } from "@/components/prism/page-header";
import { user } from "@/lib/mock/data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile · PRISM" },
      { name: "description", content: "Your identity, KYC, contact details and consent trail." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHeader eyebrow="You" title="Profile" icon={User} description="Identity, KYC, contact and consent — all in one place." />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-surface p-6 text-center shadow-soft">
          <div className="mx-auto inline-flex h-24 w-24 items-center justify-center rounded-full gradient-wealth font-display text-3xl font-semibold text-primary-foreground shadow-elevated">
            {user.firstName[0]}
          </div>
          <h2 className="mt-4 font-display text-xl font-semibold text-foreground">{user.name}</h2>
          <div className="mt-1 text-sm text-muted-foreground">Member since {user.memberSince}</div>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
            <Shield className="h-3 w-3" /> Full KYC · Video-verified
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft lg:col-span-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">Contact & identity</div>
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field icon={Mail} label="Email" value="vishal@sbi.example.com" />
            <Field icon={Phone} label="Phone" value={user.phone} />
            <Field icon={IdCard} label="Customer ID" value={user.customerId} />
            <Field icon={IdCard} label="CIF" value={user.cif} />
            <Field icon={MapPin} label="Home branch" value={user.branch} />
            <Field icon={Shield} label="Twin consent" value="Full · granted 12 Jun 2024" />
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" onClick={() => alert("Edit contact details")} className="rounded-xl border border-border bg-surface px-3.5 py-2 text-sm font-semibold text-foreground hover:bg-muted">Edit details</button>
            <button type="button" onClick={() => alert("Manage consent trail")} className="rounded-xl border border-border bg-surface px-3.5 py-2 text-sm font-semibold text-foreground hover:bg-muted">Consent history</button>
            <button type="button" onClick={() => alert("Download my data")} className="rounded-xl gradient-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-soft">Download my data</button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Field({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-sunken p-4">
      <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}