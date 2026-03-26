import { KpiCard } from "./KpiCard";
import { SessionJourneyCard } from "./SessionJourneyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { aiKpis, aiQueryRows, aiClickBreakdown, aiFunnel, sessionJourneys } from "@/data/mock-data";
import { ThumbsUp, ThumbsDown, Minus, ArrowDownRight } from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis, Funnel, FunnelChart, LabelList, Cell,
} from "recharts";

const funnelColors = ["hsl(222, 47%, 30%)", "hsl(200, 70%, 45%)", "hsl(30, 90%, 55%)", "hsl(160, 60%, 40%)", "hsl(340, 70%, 55%)"];

export function AITab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {aiKpis.map((kpi) => (
          <KpiCard key={kpi.label} data={kpi} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Dive Deeper Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Journey Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {aiFunnel.map((stage, i) => {
                const maxCount = aiFunnel[0].count;
                const widthPct = Math.max((stage.count / maxCount) * 100, 20);
                return (
                  <div key={stage.stage} className="flex items-center gap-3">
                    <div className="w-36 text-xs text-right text-muted-foreground shrink-0">
                      {stage.stage}
                    </div>
                    <div className="flex-1 h-8 relative">
                      <div
                        className="h-full rounded flex items-center px-3"
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: funnelColors[i],
                          transition: "width 0.5s ease",
                        }}
                      >
                        <span className="text-xs font-medium text-white">
                          {stage.count.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

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
      </div>

      {/* Query Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Query Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Query</TableHead>
                <TableHead className="text-center">Answer</TableHead>
                <TableHead className="text-right">Source Clicks</TableHead>
                <TableHead className="text-right">Result Clicks</TableHead>
                <TableHead className="text-center">Dive Deeper</TableHead>
                <TableHead className="text-right">Conv. Msgs</TableHead>
                <TableHead className="text-right">Conv. Clicks</TableHead>
                <TableHead className="text-center">Sentiment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aiQueryRows.map((row) => (
                <TableRow key={row.query}>
                  <TableCell className="font-medium max-w-[200px] truncate">{row.query}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={row.answerShown ? "default" : "secondary"} className="text-[10px]">
                      {row.answerShown ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{row.sourceClicks}</TableCell>
                  <TableCell className="text-right">{row.searchResultClicks}</TableCell>
                  <TableCell className="text-center">
                    {row.diveDeeper ? (
                      <ArrowDownRight className="h-4 w-4 text-orange-500 mx-auto" />
                    ) : (
                      <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">{row.conversationMessages || "—"}</TableCell>
                  <TableCell className="text-right">{row.conversationClicks || "—"}</TableCell>
                  <TableCell className="text-center">
                    {row.sentiment === "positive" && <ThumbsUp className="h-4 w-4 text-emerald-500 mx-auto" />}
                    {row.sentiment === "negative" && <ThumbsDown className="h-4 w-4 text-destructive mx-auto" />}
                    {!row.sentiment && <Minus className="h-4 w-4 text-muted-foreground mx-auto" />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Session Journeys with Dive Deeper */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">AI Journey Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessionJourneys
            .filter((j) => j.steps.some((s) => s.children?.some((c) => c.type === "ai_answer")))
            .slice(0, 3)
            .map((journey) => (
              <SessionJourneyCard key={journey.id} journey={journey} />
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
