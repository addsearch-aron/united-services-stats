import { KpiCard } from "./KpiCard";
import { SessionJourneyCard } from "./SessionJourneyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { InfoTooltip } from "./InfoTooltip";
import { aiKpis, aiQueryRows, aiClickBreakdown, sessionJourneys } from "@/data/mock-data";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";

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

const QUALITY_BADGE: Record<string, string> = {
  high: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  low: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
};

export function AITab() {
  const topQueries = [...aiQueryRows].sort((a, b) => b.asked - a.asked);
  const noAnswerQueries = aiQueryRows.filter((r) => !r.answerShown);
  const noClickQueries = aiQueryRows.filter((r) => r.clicks === 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {aiKpis.map((kpi) => (
          <KpiCard key={kpi.label} data={kpi} />
        ))}
      </div>

      {/* Click Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Click Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={aiClickBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="type" type="category" tick={{ fontSize: 11 }} width={120} />
              <Tooltip />
              <Bar dataKey="clicks" fill="hsl(200, 70%, 45%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Queries Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Query</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead className="text-right">Asked</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">CTR%<InfoTooltip text="Click-Through Rate = (Clicks ÷ Asked) × 100 for AI queries." /></TableHead>
                <TableHead className="text-center">Quality<InfoTooltip text="AI answer quality: High (score ≥ 2.5), Medium (≥ 1.5), Low (< 1.5). Based on automated relevance evaluation." /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topQueries.map((row) => (
                <TableRow key={row.query}>
                  <TableCell className="font-medium max-w-[200px] truncate">{row.query}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-xs font-medium ${TOPIC_COLORS[row.topic] ?? ""}`}>
                      {row.topic}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{row.asked.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.ctr}%</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className={`text-xs font-medium capitalize ${QUALITY_BADGE[row.quality]}`}>
                      {row.quality}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* No Answer & No Click Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">No Answer Queries</CardTitle>
          </CardHeader>
          <CardContent>
            {noAnswerQueries.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Query</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead className="text-right">Asked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {noAnswerQueries.map((row) => (
                    <TableRow key={row.query}>
                      <TableCell className="font-medium">{row.query}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-xs font-medium ${TOPIC_COLORS[row.topic] ?? ""}`}>
                          {row.topic}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{row.asked.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">All queries received an answer!</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">No Click Queries</CardTitle>
          </CardHeader>
          <CardContent>
            {noClickQueries.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Query</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead className="text-right">Asked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {noClickQueries.map((row) => (
                    <TableRow key={row.query}>
                      <TableCell className="font-medium">{row.query}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-xs font-medium ${TOPIC_COLORS[row.topic] ?? ""}`}>
                          {row.topic}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{row.asked.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">All queries have clicks!</p>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
