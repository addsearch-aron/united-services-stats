import { KpiCard } from "./KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { keywordSearchKpis, keywordRankings, zeroResultSearches } from "@/data/mock-data";
import { TrendingUp, TrendingDown, Minus, Download } from "lucide-react";
import { toast } from "sonner";

function exportToCsv() {
  const headers = ["Keyword", "Searches", "Clicks", "CTR", "ACP", "Topic", "Trend"];
  const rows = keywordRankings.map((r) => [
    r.keyword,
    r.searches,
    r.clicks,
    `${r.ctr}%`,
    r.avgClickPosition != null ? r.avgClickPosition.toFixed(1) : "",
    r.topic ?? "",
    r.trend,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "keyword-rankings.csv";
  a.click();
  URL.revokeObjectURL(url);
  toast.success("Export downloaded");
}

const TOPIC_COLORS: Record<string, string> = {
  Pricing: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  Integration: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  Documentation: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  Onboarding: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  Support: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  Billing: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  Features: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
  Account: "bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-300",
};

export function KeywordSearchTab() {
  // Keywords with zero clicks
  const noClickKeywords = keywordRankings.filter((k) => k.clicks === 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {keywordSearchKpis.map((kpi) => (
          <KpiCard key={kpi.label} data={kpi} />
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Keyword Rankings</CardTitle>
          <Button variant="outline" size="sm" onClick={exportToCsv} className="gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead className="text-right">Searches</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">No Results %</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywordRankings.map((row) => (
                <TableRow key={row.keyword}>
                  <TableCell className="font-medium">{row.keyword}</TableCell>
                  <TableCell>
                    {row.topic && (
                      <Badge variant="secondary" className={`text-xs font-medium ${TOPIC_COLORS[row.topic] ?? ""}`}>
                        {row.topic}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">{row.searches.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.ctr}%</TableCell>
                  <TableCell className="text-right">{row.noResultRate != null ? `${row.noResultRate}%` : "—"}</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center gap-1">
                      {row.trend > 0 && <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />}
                      {row.trend < 0 && <TrendingDown className="h-3.5 w-3.5 text-destructive" />}
                      {row.trend === 0 && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
                      <span className="text-xs">{row.trend > 0 ? `+${row.trend}` : row.trend}</span>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Zero-Result Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Search Term</TableHead>
                  <TableHead className="text-right">Occurrences</TableHead>
                  <TableHead className="text-right">Last Seen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {zeroResultSearches.map((row) => (
                  <TableRow key={row.keyword}>
                    <TableCell className="font-medium">{row.keyword}</TableCell>
                    <TableCell className="text-right">{row.searches}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{row.lastSeen}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">No-Click Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            {noClickKeywords.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead className="text-right">Searches</TableHead>
                    <TableHead>Topic</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {noClickKeywords.map((row) => (
                    <TableRow key={row.keyword}>
                      <TableCell className="font-medium">{row.keyword}</TableCell>
                      <TableCell className="text-right">{row.searches.toLocaleString()}</TableCell>
                      <TableCell>
                        {row.topic && (
                          <Badge variant="secondary" className={`text-xs ${TOPIC_COLORS[row.topic] ?? ""}`}>
                            {row.topic}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">All keywords have at least one click — great job!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
