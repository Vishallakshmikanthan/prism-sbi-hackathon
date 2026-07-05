import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HelpCircle, Phone, MessageCircle, Mail, ChevronDown } from "lucide-react";
import { PageHeader, PageShell } from "@/components/prism/page-header";
import { supportTopics } from "@/lib/mock/data";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support · PRISM" },
      { name: "description", content: "Reach a human, ask PRISM, or browse trusted answers." },
    ],
  }),
  component: Page,
});

function Page() {
  const [open, setOpen] = useState<string | null>(supportTopics[0]?.id ?? null);
  return (
    <PageShell>
      <PageHeader eyebrow="Help" title="Support" icon={HelpCircle} description="A calm answer, always. 24×7 in 12 Indian languages." />

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <ContactCard icon={MessageCircle} title="Chat with PRISM" body="Instant answers, backed by your Twin." cta="Open assistant" onClick={() => (window.location.href = "/assistant")} />
        <ContactCard icon={Phone} title="Call SBI 24×7" body="1800-1234 · toll-free, all networks." cta="Call now" onClick={() => alert("Dialling 1800-1234…")} />
        <ContactCard icon={Mail} title="Email support" body="prism-care@sbi.example · reply in 6 hours." cta="Compose" onClick={() => (window.location.href = "mailto:prism-care@sbi.example")} />
      </div>

      <div className="mt-8">
        <h2 className="font-display text-xl font-semibold text-foreground">Frequently asked</h2>
        <div className="mt-4 space-y-3">
          {supportTopics.map((t) => (
            <div key={t.id} className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
              <button
                type="button"
                onClick={() => setOpen((o) => (o === t.id ? null : t.id))}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-foreground">{t.q}</span>
                <ChevronDown className={"h-4 w-4 text-muted-foreground transition-transform " + (open === t.id ? "rotate-180" : "")} />
              </button>
              {open === t.id && (
                <div className="border-t border-border bg-surface-sunken px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                  {t.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function ContactCard({ icon: Icon, title, body, cta, onClick }: { icon: typeof HelpCircle; title: string; body: string; cta: string; onClick: () => void }) {
  return (
    <div className="flex flex-col rounded-3xl border border-border bg-surface p-5 shadow-soft">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <h3 className="mt-3 font-display text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted-foreground">{body}</p>
      <button type="button" onClick={onClick} className="mt-4 rounded-xl border border-border bg-surface-sunken px-3.5 py-2 text-sm font-semibold text-foreground hover:bg-primary hover:text-primary-foreground">
        {cta}
      </button>
    </div>
  );
}