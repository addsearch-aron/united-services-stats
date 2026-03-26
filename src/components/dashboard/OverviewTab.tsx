import { KpiCard } from "./KpiCard";
import { SessionJourneyCard } from "./SessionJourneyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { overviewKpis, trendData, topKeywords, serviceBreakdown, sessionJourneys } from "@/data/mock-data";
import { ServiceType } from "@/types/analytics";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis, Legend, PieChart, Pie, Cell,
} from "recharts";

const serviceColors: Record<string, string> = {
  keywordSearch: "hsl(222, 47%, 30%)",
  ai: "hsl(200, 70%, 45%)",
};

const serviceLabel: Record<ServiceType, string> = {
  keyword_search: "KW",
  ai: "AI",
};

const qualityColor = (q: number | null) => {
  if (q === null) return "text-muted-foreground";
  if (q >= 2.5) return "text-emerald-600";
  if (q >= 1.5) return "text-amber-500";
  return "text-destructive";
};

interface Props {
  activeServices: ServiceType[];
}

const TOPIC_COLORS = [
  "hsl(222, 47%, 30%)",
  "hsl(200, 70%, 45%)",
  "hsl(150, 50%, 40%)",
  "hsl(35, 80%, 50%)",
  "hsl(0, 60%, 50%)",
  "hsl(270, 50%, 50%)",
  "hsl(180, 50%, 40%)",
  "hsl(310, 50%, 50%)",
];

function TopicDistribution() {
  // Aggregate searches by topic from topKeywords
  const topicMap = new Map<string, number>();
  topKeywords.forEach((row) => {
    topicMap.set(row.topic, (topicMap.get(row.topic) || 0) + row.searches);
  });
  const total = Array.from(topicMap.values()).reduce((a, b) => a + b, 0);
  const data = Array.from(topicMap.entries())
    .map(([name, value]) => ({ name, value, pct: ((value / total) * 100).toFixed(1) }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="flex items-center gap-6">
      <ResponsiveContainer width={180} height={180}>
        <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2}>
            {data.map((_, i) => (
              <Cell key={i} fill={TOPIC_COLORS[i % TOPIC_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => value.toLocaleString()} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-1.5 text-sm">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: TOPIC_COLORS[i % TOPIC_COLORS.length] }} />
            <span className="text-muted-foreground">{d.name}</span>
            <span className="font-medium">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OverviewTab({ activeServices }: Props) {
  const filteredTrend = trendData.slice(-30);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
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
                {activeServices.includes("ai") && (
                  <Area type="monotone" dataKey="ai" name="AI Answers" stroke={serviceColors.ai} fill={serviceColors.ai} fillOpacity={0.15} />
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
              <BarChart data={serviceBreakdown}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="service" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="searches" name="Searches" fill={serviceColors.keywordSearch} radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicks" name="Clicks" fill={serviceColors.ai} radius={[4, 4, 0, 0]} />
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
                <TableHead className="text-right">ACP</TableHead>
                <TableHead className="text-right">Answer Quality</TableHead>
                <TableHead>Topic</TableHead>
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
                  <TableCell className="text-right">{row.avgClickPosition.toFixed(1)}</TableCell>
                  <TableCell className={`text-right font-medium ${qualityColor(row.avgAnswerQuality)}`}>
                    {row.avgAnswerQuality !== null ? row.avgAnswerQuality.toFixed(1) : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] px-1.5">
                      {row.topic}
                    </Badge>
                  </TableCell>
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

      {/* Topic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Topic Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <TopicDistribution />
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent User Journeys</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessionJourneys.slice(0, 3).map((journey) => (
            <SessionJourneyCard key={journey.id} journey={journey} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
