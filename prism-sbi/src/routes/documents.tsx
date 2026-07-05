import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText, Upload, Search, Download } from "lucide-react";
import { PageHeader, PageShell } from "@/components/prism/page-header";
import { documents } from "@/lib/mock/data";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Vault · PRISM" },
      { name: "description", content: "Every statement, KYC, policy and receipt — parsed and searchable by your Twin." },
    ],
  }),
  component: Page,
});

const KINDS = ["All", "Tax", "Statement", "Loan", "Insurance", "KYC", "Property"];

function Page() {
  const [kind, setKind] = useState("All");
  const [q, setQ] = useState("");
  const list = useMemo(
    () =>
      documents.filter((d) => {
        if (kind !== "All" && d.kind !== kind) return false;
        if (q && !`${d.name} ${d.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [kind, q],
  );
  return (
    <PageShell>
      <PageHeader
        eyebrow="Vault"
        title="Documents"
        icon={FileText}
        description="Encrypted at rest. Auto-parsed. Your Twin references the right document at the right moment."
        actions={
          <button
            type="button"
            onClick={() => alert("Open file picker — PDF, image, statement")}
            className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-soft"
          >
            <Upload className="h-4 w-4" /> Upload
          </button>
        }
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents…" className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-3 text-sm" />
        </label>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {KINDS.map((k) => (
          <button key={k} type="button" onClick={() => setKind(k)} className={(kind === k ? "gradient-primary text-primary-foreground shadow-soft" : "border border-border bg-surface text-foreground hover:bg-muted") + " whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold"}>{k}</button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((d) => (
          <article key={d.id} className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">{d.name}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{d.kind} · {d.size} · Updated {d.updated}</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {d.tags.map((t) => (
                    <span key={t} className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">{t}</span>
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => alert(`Downloading ${d.name}`)} className="rounded-lg border border-border bg-surface-sunken p-1.5 text-muted-foreground hover:text-foreground" aria-label="Download">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}