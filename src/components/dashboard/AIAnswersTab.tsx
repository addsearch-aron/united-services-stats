import { KpiCard } from "./KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { aiAnswersKpis, aiAnswerRows, answerClickBreakdown, answerEngagementTrend } from "@/data/mock-data";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Legend,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export function AIAnswersTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {aiAnswersKpis.map((kpi) => (
          <KpiCard key={kpi.label} data={kpi} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Click Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={answerClickBreakdown}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="type" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="clicks" fill="hsl(200, 70%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Answer Engagement Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={answerEngagementTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="sourceClicks" name="Source Clicks" stroke="hsl(200, 70%, 45%)" fill="hsl(200, 70%, 45%)" fillOpacity={0.15} />
                <Area type="monotone" dataKey="answerLinkClicks" name="Answer Links" stroke="hsl(160, 60%, 40%)" fill="hsl(160, 60%, 40%)" fillOpacity={0.15} />
                <Area type="monotone" dataKey="searchResultClicks" name="Search Results" stroke="hsl(222, 47%, 30%)" fill="hsl(222, 47%, 30%)" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Query Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Query</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead className="text-right">Source Clicks</TableHead>
                <TableHead className="text-right">Answer Links</TableHead>
                <TableHead className="text-right">Search Results</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aiAnswerRows.map((row) => (
                <TableRow key={row.query}>
                  <TableCell className="font-medium max-w-[200px] truncate">{row.query}</TableCell>
                  <TableCell>
                    <Badge variant={row.answerShown ? "default" : "secondary"}>
                      {row.answerShown ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{row.sourceClicks}</TableCell>
                  <TableCell className="text-right">{row.answerLinkClicks}</TableCell>
                  <TableCell className="text-right">{row.searchResultClicks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
