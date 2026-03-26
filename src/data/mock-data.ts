import {
  TrendDataPoint,
  KeywordRow,
  AIAnswerRow,
  ConversationRow,
  ServiceBreakdown,
  ClickDistribution,
  EngagementFunnel,
  ClientConfig,
  KpiData,
} from "@/types/analytics";

export const clientConfig: ClientConfig = {
  services: ["keyword_search", "ai_answers", "ai_conversations"],
  name: "Acme Corp",
};

// Generate 90 days of trend data
export function generateTrendData(days: number = 90): TrendDataPoint[] {
  const data: TrendDataPoint[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const base = 120 + Math.sin(i / 7) * 30;
    data.push({
      date: date.toISOString().split("T")[0],
      keywordSearch: Math.round(base + Math.random() * 40),
      aiAnswers: Math.round(base * 0.6 + Math.random() * 25),
      aiConversations: Math.round(base * 0.3 + Math.random() * 15),
    });
  }
  return data;
}

export const trendData = generateTrendData();

export const overviewKpis: KpiData[] = [
  { label: "Total Searches", value: "24,521", change: 12.5, changeLabel: "vs last period" },
  { label: "Total Clicks", value: "8,432", change: 8.2, changeLabel: "vs last period" },
  { label: "Overall CTR", value: "34.4%", change: 2.1, changeLabel: "vs last period" },
  { label: "AI Usage Rate", value: "62.3%", change: 15.7, changeLabel: "vs last period" },
];

export const keywordSearchKpis: KpiData[] = [
  { label: "Searches", value: "12,843", change: 5.3 },
  { label: "Clicks", value: "4,126", change: 3.1 },
  { label: "CTR", value: "32.1%", change: -1.2 },
  { label: "Top Keyword", value: "pricing plans" },
];

export const aiAnswersKpis: KpiData[] = [
  { label: "Queries", value: "8,234", change: 18.4 },
  { label: "Answers Generated", value: "7,102", change: 22.1 },
  { label: "Source Clicks", value: "2,847", change: 14.6 },
  { label: "Search Result Clicks", value: "1,459", change: 7.8 },
];

export const aiConversationsKpis: KpiData[] = [
  { label: "Conversations", value: "3,444", change: 28.3 },
  { label: "Avg Messages", value: "4.2", change: 12.1 },
  { label: "Search Triggers", value: "1,876", change: 19.5 },
  { label: "Interaction Rate", value: "78.4%", change: 5.2 },
];

export const topKeywords: KeywordRow[] = [
  { keyword: "pricing plans", searches: 1842, clicks: 723, ctr: 39.3, services: ["keyword_search", "ai_answers"], trend: 2 },
  { keyword: "how to integrate", searches: 1523, clicks: 612, ctr: 40.2, services: ["keyword_search", "ai_answers", "ai_conversations"], trend: 5 },
  { keyword: "api documentation", searches: 1201, clicks: 534, ctr: 44.5, services: ["keyword_search", "ai_answers"], trend: -1 },
  { keyword: "getting started", searches: 1087, clicks: 401, ctr: 36.9, services: ["keyword_search", "ai_conversations"], trend: 0 },
  { keyword: "troubleshooting errors", searches: 956, clicks: 287, ctr: 30.0, services: ["ai_answers", "ai_conversations"], trend: 3 },
  { keyword: "billing support", searches: 834, clicks: 312, ctr: 37.4, services: ["keyword_search"], trend: -2 },
  { keyword: "feature comparison", searches: 762, clicks: 298, ctr: 39.1, services: ["keyword_search", "ai_answers"], trend: 1 },
  { keyword: "account settings", searches: 698, clicks: 245, ctr: 35.1, services: ["keyword_search"], trend: -3 },
  { keyword: "data export", searches: 621, clicks: 189, ctr: 30.4, services: ["keyword_search", "ai_answers"], trend: 4 },
  { keyword: "webhook setup", searches: 543, clicks: 201, ctr: 37.0, services: ["ai_answers", "ai_conversations"], trend: 7 },
];

export const keywordRankings: KeywordRow[] = [
  ...topKeywords.filter((k) => k.services.includes("keyword_search")),
];

export const zeroResultSearches = [
  { keyword: "refund policy 2025", searches: 87, lastSeen: "2026-03-25" },
  { keyword: "enterprise sso setup", searches: 64, lastSeen: "2026-03-24" },
  { keyword: "graphql endpoint", searches: 52, lastSeen: "2026-03-25" },
  { keyword: "mobile app download", searches: 41, lastSeen: "2026-03-23" },
  { keyword: "custom domain ssl", searches: 38, lastSeen: "2026-03-22" },
];

export const aiAnswerRows: AIAnswerRow[] = [
  { query: "How do I reset my password?", answerShown: true, sourceClicks: 45, searchResultClicks: 23, answerLinkClicks: 67, timestamp: new Date("2026-03-25") },
  { query: "What are the pricing tiers?", answerShown: true, sourceClicks: 89, searchResultClicks: 34, answerLinkClicks: 112, timestamp: new Date("2026-03-25") },
  { query: "How to set up webhooks?", answerShown: true, sourceClicks: 34, searchResultClicks: 56, answerLinkClicks: 28, timestamp: new Date("2026-03-24") },
  { query: "API rate limits explained", answerShown: true, sourceClicks: 67, searchResultClicks: 12, answerLinkClicks: 45, timestamp: new Date("2026-03-24") },
  { query: "How to export data as CSV?", answerShown: false, sourceClicks: 0, searchResultClicks: 78, answerLinkClicks: 0, timestamp: new Date("2026-03-23") },
  { query: "Team member permissions", answerShown: true, sourceClicks: 23, searchResultClicks: 45, answerLinkClicks: 31, timestamp: new Date("2026-03-23") },
  { query: "SSO integration guide", answerShown: true, sourceClicks: 56, searchResultClicks: 19, answerLinkClicks: 42, timestamp: new Date("2026-03-22") },
  { query: "Billing cycle questions", answerShown: false, sourceClicks: 0, searchResultClicks: 63, answerLinkClicks: 0, timestamp: new Date("2026-03-22") },
];

export const conversationRows: ConversationRow[] = [
  { conversationId: "conv-001", startedAt: new Date("2026-03-25T14:32:00"), messageCount: 6, searchesTriggered: 3, interactions: 8 },
  { conversationId: "conv-002", startedAt: new Date("2026-03-25T11:15:00"), messageCount: 4, searchesTriggered: 2, interactions: 5 },
  { conversationId: "conv-003", startedAt: new Date("2026-03-25T09:45:00"), messageCount: 8, searchesTriggered: 4, interactions: 12 },
  { conversationId: "conv-004", startedAt: new Date("2026-03-24T16:20:00"), messageCount: 3, searchesTriggered: 1, interactions: 3 },
  { conversationId: "conv-005", startedAt: new Date("2026-03-24T13:50:00"), messageCount: 5, searchesTriggered: 2, interactions: 7 },
  { conversationId: "conv-006", startedAt: new Date("2026-03-24T10:10:00"), messageCount: 12, searchesTriggered: 6, interactions: 18 },
  { conversationId: "conv-007", startedAt: new Date("2026-03-23T15:30:00"), messageCount: 2, searchesTriggered: 1, interactions: 2 },
  { conversationId: "conv-008", startedAt: new Date("2026-03-23T08:45:00"), messageCount: 7, searchesTriggered: 3, interactions: 10 },
];

export const serviceBreakdown: ServiceBreakdown[] = [
  { service: "Keyword Search", searches: 12843, clicks: 4126, ctr: 32.1 },
  { service: "AI Answers", searches: 8234, clicks: 4306, ctr: 52.3 },
  { service: "AI Conversations", searches: 3444, clicks: 1876, ctr: 54.5 },
];

export const clickDistribution: ClickDistribution[] = [
  { position: "Position 1", clicks: 1845 },
  { position: "Position 2", clicks: 1102 },
  { position: "Position 3", clicks: 623 },
  { position: "Position 4", clicks: 312 },
  { position: "Position 5", clicks: 156 },
  { position: "Position 6+", clicks: 88 },
];

export const engagementFunnel: EngagementFunnel[] = [
  { stage: "Conversations Started", count: 3444 },
  { stage: "Follow-up Questions", count: 2680 },
  { stage: "Searches Triggered", count: 1876 },
  { stage: "Results Clicked", count: 1243 },
];

export const answerClickBreakdown = [
  { type: "Source Links", clicks: 2847 },
  { type: "Answer Links", clicks: 1932 },
  { type: "Search Results", clicks: 1459 },
];

// Answer engagement over time (last 30 days)
export const answerEngagementTrend = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split("T")[0],
    sourceClicks: Math.round(80 + Math.random() * 40),
    answerLinkClicks: Math.round(55 + Math.random() * 30),
    searchResultClicks: Math.round(40 + Math.random() * 25),
  };
});
