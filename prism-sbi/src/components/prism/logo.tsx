import { cn } from "@/lib/utils";

export function PrismLogo({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-2xl gradient-primary shadow-elevated",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        viewBox="0 0 32 32"
        width={size * 0.6}
        height={size * 0.6}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 3L28 24H4L16 3Z"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
          opacity="0.95"
        />
        <path
          d="M16 3L20 24"
          stroke="white"
          strokeWidth="1.4"
          strokeLinejoin="round"
          opacity="0.7"
        />
        <path
          d="M16 3L12 24"
          stroke="white"
          strokeWidth="1.4"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

export function PrismWordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <PrismLogo size={34} />
      <div className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight text-foreground">
          PRISM
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          SBI · Intelligence
        </span>
      </div>
    </div>
  );
}