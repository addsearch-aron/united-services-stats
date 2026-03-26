interface QuotaWidgetProps {
  label: string;
  used: number;
  total: number;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}k`;
  return n.toLocaleString();
}

export function QuotaWidget({ label, used, total }: QuotaWidgetProps) {
  const pct = Math.min((used / total) * 100, 100);
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative h-10 w-10">
        <svg viewBox="0 0 44 44" className="h-10 w-10 -rotate-90">
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="4"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold text-muted-foreground">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] text-muted-foreground leading-tight">{label}</span>
        <span className="text-sm font-semibold leading-tight">
          {formatNumber(used)}{" "}
          <span className="text-muted-foreground font-normal text-xs">/ {formatNumber(total)}</span>
        </span>
      </div>
    </div>
  );
}
