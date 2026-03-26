import { KpiCard } from "./KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { overviewKpis, trendData, topKeywords, serviceBreakdown } from "@/data/mock-data";
import { ServiceType } from "@/types/analytics";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis, Legend,
} from "recharts";

const serviceColors: Record<string, string> = {
  keywordSearch: "hsl(222, 47%, 30%)",
  aiAnswers: "hsl(200, 70%, 45%)",
  aiConversations: "hsl(160, 60%, 40%)",
};

const serviceLabel: Record<ServiceType, string> = {
  keyword_search: "KW",
  ai_answers: "AI-A",
  ai_conversations: "AI-C",
};

interface Props {
  activeServices: ServiceType[];
}

export function OverviewTab({ activeServices }: Props) {
  const filteredTrend = trendData.slice(-30);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {overviewKpis.map((kpi) => (
          <KpiCard key={kpi.label} data={kpi} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Search Volume Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={filteredTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                {activeServices.includes("keyword_search") && (
                  <Area type="monotone" dataKey="keywordSearch" name="Keyword Search" stroke={serviceColors.keywordSearch} fill={serviceColors.keywordSearch} fillOpacity={0.15} />
                )}
                {activeServices.includes("ai_answers") && (
                  <Area type="monotone" dataKey="aiAnswers" name="AI Answers" stroke={serviceColors.aiAnswers} fill={serviceColors.aiAnswers} fillOpacity={0.15} />
                )}
                {activeServices.includes("ai_conversations") && (
                  <Area type="monotone" dataKey="aiConversations" name="AI Conversations" stroke={serviceColors.aiConversations} fill={serviceColors.aiConversations} fillOpacity={0.15} />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Service Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={serviceBreakdown.filter((s) =>
                activeServices.some((as) => s.service.toLowerCase().includes(as.split("_")[0]))
              )}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="service" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="searches" name="Searches" fill={serviceColors.keywordSearch} radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicks" name="Clicks" fill={serviceColors.aiAnswers} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead className="text-right">Searches</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead>Services</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topKeywords.map((row) => (
                <TableRow key={row.keyword}>
                  <TableCell className="font-medium">{row.keyword}</TableCell>
                  <TableCell className="text-right">{row.searches.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.ctr}%</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {row.services.map((s) => (
                        <Badge key={s} variant="secondary" className="text-[10px] px-1.5">
                          {serviceLabel[s]}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
