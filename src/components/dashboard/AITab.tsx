import { KpiCard } from "./KpiCard";
import { SessionJourneyCard } from "./SessionJourneyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { aiKpis, aiQueryRows, aiClickBreakdown, sessionJourneys } from "@/data/mock-data";
import { ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";

export function AITab() {
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

      {/* Session Journeys */}
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
