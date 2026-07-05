import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, Mic, Paperclip, ArrowUpRight } from "lucide-react";
import { PageHeader, PageShell } from "@/components/prism/page-header";
import { chatSeed } from "@/lib/mock/data";

type Msg = { id: string; role: "user" | "assistant"; text: string; sources?: string[] };

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant · PRISM" },
      { name: "description", content: "Ask PRISM anything — statement analysis, loan eligibility, retirement plans. Voice, chat and document input with explainable answers." },
    ],
  }),
  component: Page,
});

const SUGGESTIONS = [
  "How is my spending vs last month?",
  "Can I afford ₹1.2Cr home loan in 18 mo?",
  "Best way to save ₹42k more tax before Mar?",
  "Rebalance my portfolio",
  "Predict my July cashflow",
];

function Page() {
  const [messages, setMessages] = useState<Msg[]>(chatSeed);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  function send(text: string) {
    const t = text.trim();
    if (!t) return;
    const uid = `u${Date.now()}`;
    setMessages((m) => [...m, { id: uid, role: "user", text: t }]);
    setInput("");
    setThinking(true);
    window.setTimeout(() => {
      setThinking(false);
      setMessages((m) => [
        ...m,
        {
          id: `a${Date.now()}`,
          role: "assistant",
          text:
            "Here's what your Digital Twin sees: cashflow is 14% ahead of plan, discretionary spend is warm, and one opportunity worth ₹23,120 is open. I can act on your approval — reply 'proceed' to auto-park the excess.",
          sources: ["Cashflow · last 90d", "SBI MOD · 6.8%", "Twin confidence 0.92"],
        },
      ]);
    }, 900);
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Reasoning"
        title="AI Assistant"
        icon={Sparkles}
        description="Every answer is explainable and sourced from your own accounts. Nothing leaves the vault."
      />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex min-h-[60dvh] flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((m) => (
              <Bubble key={m.id} m={m} />
            ))}
            {thinking && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:300ms]" />
                </span>
                PRISM is reasoning…
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t border-border bg-surface-sunken p-3"
          >
            <button type="button" onClick={() => alert("Attach a statement / PDF")} className="rounded-xl border border-border bg-surface p-2.5 text-muted-foreground hover:text-foreground" aria-label="Attach">
              <Paperclip className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => alert("Voice input started…")} className="rounded-xl border border-border bg-surface p-2.5 text-muted-foreground hover:text-foreground" aria-label="Voice">
              <Mic className="h-4 w-4" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              placeholder="Ask PRISM — 'how much can I safely invest this month?'"
              className="max-h-28 flex-1 resize-none rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <button type="submit" className="inline-flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-soft" aria-label="Send">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">Try asking</div>
            <div className="mt-3 flex flex-col gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="group flex items-center justify-between rounded-xl border border-border bg-surface-sunken px-3 py-2.5 text-left text-sm text-foreground hover:border-primary/40 hover:bg-primary/5"
                >
                  <span>{s}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">Reasoning trace</div>
            <ul className="mt-3 space-y-2.5 text-xs">
              {["Retrieve last 90d cashflow", "Fit seasonal ARIMA · confidence 0.92", "Cross-reference SBI products", "Explainable summary"].map((s, i) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">{i + 1}</span>
                  <span className="text-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

function Bubble({ m }: { m: Msg }) {
  if (m.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl gradient-primary px-4 py-2.5 text-sm text-primary-foreground shadow-soft">
          {m.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-aurora text-primary-foreground">
        <Sparkles className="h-4 w-4" />
      </span>
      <div className="max-w-[80%] rounded-2xl border border-border bg-surface-sunken px-4 py-3 text-sm leading-relaxed text-foreground">
        <div className="whitespace-pre-line">{m.text}</div>
        {m.sources && (
          <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border pt-2.5">
            {m.sources.map((s) => (
              <span key={s} className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}