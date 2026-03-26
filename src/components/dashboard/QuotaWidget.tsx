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
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative h-11 w-11">
        <svg viewBox="0 0 48 48" className="h-11 w-11 -rotate-90">
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="3.5"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3.5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-foreground">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-foreground leading-tight">{label}</span>
        <span className="text-sm font-bold leading-tight text-foreground">
          {formatNumber(used)}{" "}
          <span className="text-muted-foreground font-normal text-xs">/ {formatNumber(total)}</span>
        </span>
      </div>
    </div>
  );
}
