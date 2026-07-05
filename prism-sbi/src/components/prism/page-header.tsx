import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, transitions } from "@/lib/motion";

export function PageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
}) {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={transitions.entrance}
      className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-elevated">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </motion.header>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {children}
    </div>
  );
}