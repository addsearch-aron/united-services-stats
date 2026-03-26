import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { KpiData } from "@/types/analytics";

interface KpiCardProps {
  data: KpiData;
}

export function KpiCard({ data }: KpiCardProps) {
  const isPositive = data.change !== undefined && data.change >= 0;

  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm font-medium text-muted-foreground">{data.label}</p>
        <p className="mt-1 text-2xl font-bold text-foreground">{data.value}</p>
        {data.change !== undefined && (
          <div className="mt-2 flex items-center gap-1 text-xs">
            {isPositive ? (
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-destructive" />
            )}
            <span className={isPositive ? "text-emerald-600" : "text-destructive"}>
              {isPositive ? "+" : ""}
              {data.change}%
            </span>
            {data.changeLabel && (
              <span className="text-muted-foreground">{data.changeLabel}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
