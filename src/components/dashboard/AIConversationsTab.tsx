import { KpiCard } from "./KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { aiConversationsKpis, conversationRows, engagementFunnel } from "@/data/mock-data";
import { format } from "date-fns";
import { Info } from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, Funnel, FunnelChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis, Cell,
} from "recharts";

const funnelColors = [
  "hsl(222, 47%, 30%)",
  "hsl(200, 70%, 45%)",
  "hsl(160, 60%, 40%)",
  "hsl(140, 50%, 50%)",
];

export function AIConversationsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {aiConversationsKpis.map((kpi) => (
          <KpiCard key={kpi.label} data={kpi} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Engagement Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={engagementFunnel} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="stage" type="category" tick={{ fontSize: 11 }} width={140} />
                <Tooltip />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {engagementFunnel.map((_, i) => (
                    <Cell key={i} fill={funnelColors[i % funnelColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              Dive Deeper (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Track user journeys from AI Answers to AI Conversations. This feature will show how users transition between
              getting quick answers and starting deeper conversations, helping you understand content gaps and engagement patterns.
            </p>
            <div className="mt-4 rounded-md bg-muted p-4">
              <p className="text-xs text-muted-foreground font-medium">Planned metrics:</p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc pl-4">
                <li>Answer → Conversation conversion rate</li>
                <li>Topics that trigger deeper exploration</li>
                <li>Average time from answer to conversation</li>
                <li>Content satisfaction indicators</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Conversation ID</TableHead>
                <TableHead>Started</TableHead>
                <TableHead className="text-right">Messages</TableHead>
                <TableHead className="text-right">Searches</TableHead>
                <TableHead className="text-right">Interactions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversationRows.map((row) => (
                <TableRow key={row.conversationId}>
                  <TableCell className="font-mono text-sm">{row.conversationId}</TableCell>
                  <TableCell>{format(row.startedAt, "MMM d, HH:mm")}</TableCell>
                  <TableCell className="text-right">{row.messageCount}</TableCell>
                  <TableCell className="text-right">{row.searchesTriggered}</TableCell>
                  <TableCell className="text-right">{row.interactions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
