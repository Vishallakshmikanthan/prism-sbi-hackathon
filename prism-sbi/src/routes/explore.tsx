import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Compass, ArrowUpRight, Search } from "lucide-react";
import { PageHeader, PageShell } from "@/components/prism/page-header";
import { exploreProducts } from "@/lib/mock/data";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore · PRISM" },
      { name: "description", content: "Every SBI product — loans, deposits, cards, insurance, investments — matched to your Twin." },
    ],
  }),
  component: Page,
});

const CATS = ["All", "Loans", "Deposits", "Cards", "Insurance", "Investing", "Payments"];

function Page() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = useMemo(
    () =>
      exploreProducts.filter((p) => {
        if (cat !== "All" && p.category !== cat) return false;
        if (q && !`${p.name} ${p.tagline}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [cat, q],
  );
  return (
    <PageShell>
      <PageHeader
        eyebrow="Catalog"
        title="Explore"
        icon={Compass}
        description="Every SBI product, ranked for you by your Digital Twin — with pre-checked eligibility."
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-3 text-sm focus:border-primary focus:outline-none" />
        </label>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {CATS.map((c) => (
          <button key={c} type="button" onClick={() => setCat(c)} className={(cat === c ? "gradient-primary text-primary-foreground shadow-soft" : "border border-border bg-surface text-foreground hover:bg-muted") + " whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold"}>{c}</button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <article key={p.id} className="group flex flex-col rounded-3xl border border-border bg-surface p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated">
            <div className="flex items-start justify-between">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">{p.category}</span>
              <span className={"rounded-full px-2.5 py-0.5 text-[10px] font-semibold " + (p.accent === "success" ? "bg-success/10 text-success" : p.accent === "warning" ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary")}>Recommended</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{p.name}</h3>
            <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{p.tagline}</p>
            <button
              type="button"
              onClick={() => alert(`${p.cta} — ${p.name}`)}
              className="mt-4 inline-flex items-center justify-center gap-1 rounded-xl gradient-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-soft"
            >
              {p.cta} <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </article>
        ))}
      </div>
    </PageShell>
  );
}