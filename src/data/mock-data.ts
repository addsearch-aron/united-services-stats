import {
  TrendDataPoint,
  KeywordRow,
  AIQueryRow,
  ServiceBreakdown,
  ClickDistribution,
  EngagementFunnel,
  ClientConfig,
  KpiData,
  SessionJourney,
  JourneyStep,
  ActivityLogEntry,
} from "@/types/analytics";

export const clientConfig: ClientConfig = {
  services: ["keyword_search", "ai"],
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
      ai: Math.round(base * 0.8 + Math.random() * 35),
    });
  }
  return data;
}

export const trendData = generateTrendData();

export const overviewKpis: KpiData[] = [
  { label: "Total Queries", value: "24,521", change: 12.5, changeLabel: "vs last period", tooltip: "Total number of search queries and AI questions submitted across all services." },
  { label: "Total Clicks", value: "8,432", change: 8.2, changeLabel: "vs last period", tooltip: "Total clicks on search results, AI answer sources, and answer links." },
  { label: "Overall CTR", value: "34.4%", change: 2.1, changeLabel: "vs last period", tooltip: "Click-Through Rate = (Total Clicks ÷ Total Queries) × 100. Measures how often a query leads to a click." },
  { label: "No Results", value: "6.8%", change: -1.4, changeLabel: "vs last period", tooltip: "Percentage of queries that returned zero results. Lower is better." },
  { label: "Sufficient Answers", value: "89.4%", change: 3.2, changeLabel: "vs last period", tooltip: "Percentage of AI-answered queries rated as sufficient (quality score ≥ 2 out of 3). Based on automated quality evaluation." },
  { label: "AI Usage Rate", value: "62.3%", change: 15.7, changeLabel: "vs last period", tooltip: "Percentage of total queries handled by the AI service (answers + conversations)." },
];

export const keywordSearchKpis: KpiData[] = [
  { label: "Searches", value: "12,843", change: 5.3, tooltip: "Total keyword search queries submitted." },
  { label: "Clicks", value: "4,126", change: 3.1, tooltip: "Total clicks on keyword search results." },
  { label: "CTR", value: "32.1%", change: -1.2, tooltip: "Click-Through Rate = (Clicks ÷ Searches) × 100 for keyword search." },
  { label: "No Results", value: "4.8%", change: -0.9, changeLabel: "vs last period", tooltip: "Percentage of keyword searches that returned zero results." },
];

export const aiKpis: KpiData[] = [
  { label: "Queries", value: "11,678", change: 22.4, tooltip: "Total AI queries including single-turn answers and conversation messages." },
  { label: "Conversations", value: "4,230", change: 14.8, tooltip: "Number of multi-turn AI conversations (2+ messages in a session)." },
  { label: "Questions/Conversation", value: "2.8", change: 5.1, tooltip: "Average number of user questions per conversation session." },
  { label: "Sufficient Answers", value: "89.4%", change: 3.2, tooltip: "Percentage of AI answers rated quality ≥ 2 out of 3. Based on automated evaluation." },
  { label: "Clicks", value: "3,245", change: 14.3, tooltip: "Total clicks on AI answer sources, links, and conversation links." },
  { label: "CTR", value: "27.8%", change: 2.4, tooltip: "Click-Through Rate = (AI Clicks ÷ AI Queries) × 100." },
];

export const topKeywords: KeywordRow[] = [
  { keyword: "pricing plans", searches: 1842, clicks: 723, ctr: 39.3, services: ["keyword_search", "ai"], trend: 2, avgClickPosition: 1.8, avgAnswerQuality: 2.8, topic: "Pricing" },
  { keyword: "how to integrate", searches: 1523, clicks: 612, ctr: 40.2, services: ["keyword_search", "ai"], trend: 5, avgClickPosition: 2.1, avgAnswerQuality: 2.5, topic: "Integration" },
  { keyword: "api documentation", searches: 1201, clicks: 534, ctr: 44.5, services: ["keyword_search", "ai"], trend: -1, avgClickPosition: 1.4, avgAnswerQuality: 2.9, topic: "Documentation" },
  { keyword: "getting started", searches: 1087, clicks: 401, ctr: 36.9, services: ["keyword_search", "ai"], trend: 0, avgClickPosition: 2.5, avgAnswerQuality: 2.6, topic: "Onboarding" },
  { keyword: "troubleshooting errors", searches: 956, clicks: 287, ctr: 30.0, services: ["ai"], trend: 3, avgClickPosition: 3.2, avgAnswerQuality: 1.8, topic: "Support" },
  { keyword: "billing support", searches: 834, clicks: 312, ctr: 37.4, services: ["keyword_search"], trend: -2, avgClickPosition: 2.8, avgAnswerQuality: null, topic: "Billing" },
  { keyword: "feature comparison", searches: 762, clicks: 298, ctr: 39.1, services: ["keyword_search", "ai"], trend: 1, avgClickPosition: 2.0, avgAnswerQuality: 2.4, topic: "Features" },
  { keyword: "account settings", searches: 698, clicks: 245, ctr: 35.1, services: ["keyword_search"], trend: -3, avgClickPosition: 3.1, avgAnswerQuality: null, topic: "Account" },
  { keyword: "data export", searches: 621, clicks: 189, ctr: 30.4, services: ["keyword_search", "ai"], trend: 4, avgClickPosition: 3.6, avgAnswerQuality: 2.1, topic: "Features" },
  { keyword: "webhook setup", searches: 543, clicks: 201, ctr: 37.0, services: ["ai"], trend: 7, avgClickPosition: 2.3, avgAnswerQuality: 2.7, topic: "Integration" },
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

export const aiQueryRows: AIQueryRow[] = [
  { query: "How do I reset my password?", topic: "Account", asked: 342, clicks: 156, ctr: 45.6, quality: "high", answerShown: true, sentiment: "positive", timestamp: new Date("2026-03-25") },
  { query: "What are the pricing tiers?", topic: "Pricing", asked: 289, clicks: 145, ctr: 50.2, quality: "high", answerShown: true, sentiment: "positive", timestamp: new Date("2026-03-25") },
  { query: "How to set up webhooks?", topic: "Integration", asked: 234, clicks: 90, ctr: 38.5, quality: "medium", answerShown: true, sentiment: null, timestamp: new Date("2026-03-24") },
  { query: "API rate limits explained", topic: "Documentation", asked: 198, clicks: 79, ctr: 39.9, quality: "high", answerShown: true, sentiment: "positive", timestamp: new Date("2026-03-24") },
  { query: "How to export data as CSV?", topic: "Features", asked: 176, clicks: 78, ctr: 44.3, quality: "low", answerShown: false, sentiment: null, timestamp: new Date("2026-03-23") },
  { query: "Team member permissions", topic: "Account", asked: 154, clicks: 68, ctr: 44.2, quality: "medium", answerShown: true, sentiment: "negative", timestamp: new Date("2026-03-23") },
  { query: "SSO integration guide", topic: "Integration", asked: 143, clicks: 61, ctr: 42.7, quality: "high", answerShown: true, sentiment: "positive", timestamp: new Date("2026-03-22") },
  { query: "Billing cycle questions", topic: "Billing", asked: 132, clicks: 63, ctr: 47.7, quality: "medium", answerShown: false, sentiment: null, timestamp: new Date("2026-03-22") },
  { query: "Custom domain setup", topic: "Features", asked: 98, clicks: 0, ctr: 0, quality: "low", answerShown: true, sentiment: "negative", timestamp: new Date("2026-03-21") },
  { query: "Mobile app availability", topic: "Features", asked: 87, clicks: 0, ctr: 0, quality: "low", answerShown: false, sentiment: null, timestamp: new Date("2026-03-21") },
];

export const serviceBreakdown: ServiceBreakdown[] = [
  { service: "Keyword Search", searches: 12843, clicks: 4126, ctr: 32.1 },
  { service: "AI Assistance", searches: 11678, clicks: 6182, ctr: 52.9 },
];

export const clickDistribution: ClickDistribution[] = [
  { position: "Position 1", clicks: 1845 },
  { position: "Position 2", clicks: 1102 },
  { position: "Position 3", clicks: 623 },
  { position: "Position 4", clicks: 312 },
  { position: "Position 5", clicks: 156 },
  { position: "Position 6+", clicks: 88 },
];

export const aiFunnel: EngagementFunnel[] = [
  { stage: "Queries", count: 11678 },
  { stage: "Answers Generated", count: 7102 },
  { stage: "Dive Deeper", count: 2430 },
  { stage: "Conversations", count: 2430 },
  { stage: "Conversation Clicks", count: 1876 },
];

export const aiClickBreakdown = [
  { type: "Source Links", clicks: 2847 },
  { type: "Answer Links", clicks: 1932 },
  { type: "Search Results", clicks: 1459 },
  { type: "Conversation Links", clicks: 1876 },
];

// Session Journeys — connected flows
export const sessionJourneys: SessionJourney[] = [
  {
    id: "j-001",
    sessionId: "sess-a1b2c3",
    startedAt: new Date("2026-03-25T14:32:00"),
    initialQuery: "show me your pricing",
    steps: [
      {
        type: "search",
        label: 'Search: "show me your pricing"',
        timestamp: new Date("2026-03-25T14:32:00"),
        children: [
          {
            type: "click",
            label: "Clicked keyword result #1",
            detail: "pricing-page.html",
            timestamp: new Date("2026-03-25T14:32:15"),
          },
          {
            type: "ai_answer",
            label: "AI Answer shown",
            timestamp: new Date("2026-03-25T14:32:05"),
            children: [
              {
                type: "sentiment",
                label: "Liked answer",
                detail: "Positive sentiment",
                timestamp: new Date("2026-03-25T14:32:20"),
              },
              {
                type: "dive_deeper",
                label: 'Clicked "Dive Deeper"',
                timestamp: new Date("2026-03-25T14:32:30"),
                children: [
                  {
                    type: "conversation_message",
                    label: "User: \"tell me more about AI pricing\"",
                    timestamp: new Date("2026-03-25T14:32:35"),
                  },
                  {
                    type: "conversation_message",
                    label: "AI: Provided pricing details with links",
                    timestamp: new Date("2026-03-25T14:32:37"),
                    children: [
                      {
                        type: "conversation_click",
                        label: 'Clicked: "Book a meeting"',
                        detail: "/book-meeting",
                        timestamp: new Date("2026-03-25T14:33:00"),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "j-002",
    sessionId: "sess-d4e5f6",
    startedAt: new Date("2026-03-25T11:15:00"),
    initialQuery: "how to set up webhooks",
    steps: [
      {
        type: "search",
        label: 'Search: "how to set up webhooks"',
        timestamp: new Date("2026-03-25T11:15:00"),
        children: [
          {
            type: "ai_answer",
            label: "AI Answer shown",
            timestamp: new Date("2026-03-25T11:15:05"),
            children: [
              {
                type: "click",
                label: "Clicked source link",
                detail: "docs/webhooks-guide.html",
                timestamp: new Date("2026-03-25T11:15:20"),
              },
              {
                type: "dive_deeper",
                label: 'Clicked "Dive Deeper"',
                timestamp: new Date("2026-03-25T11:16:00"),
                children: [
                  {
                    type: "conversation_message",
                    label: "User: \"what events can I listen to?\"",
                    timestamp: new Date("2026-03-25T11:16:05"),
                  },
                  {
                    type: "conversation_message",
                    label: "AI: Listed available webhook events",
                    timestamp: new Date("2026-03-25T11:16:07"),
                  },
                  {
                    type: "conversation_message",
                    label: "User: \"show me an example payload\"",
                    timestamp: new Date("2026-03-25T11:16:30"),
                  },
                  {
                    type: "conversation_message",
                    label: "AI: Provided JSON payload example",
                    timestamp: new Date("2026-03-25T11:16:32"),
                    children: [
                      {
                        type: "conversation_click",
                        label: "Clicked: API reference link",
                        detail: "/api/webhooks",
                        timestamp: new Date("2026-03-25T11:17:00"),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "j-003",
    sessionId: "sess-g7h8i9",
    startedAt: new Date("2026-03-24T09:20:00"),
    initialQuery: "billing support",
    steps: [
      {
        type: "search",
        label: 'Search: "billing support"',
        timestamp: new Date("2026-03-24T09:20:00"),
        children: [
          {
            type: "click",
            label: "Clicked keyword result #1",
            detail: "billing-faq.html",
            timestamp: new Date("2026-03-24T09:20:10"),
          },
          {
            type: "click",
            label: "Clicked keyword result #3",
            detail: "contact-support.html",
            timestamp: new Date("2026-03-24T09:20:45"),
          },
        ],
      },
    ],
  },
  {
    id: "j-004",
    sessionId: "sess-j0k1l2",
    startedAt: new Date("2026-03-24T16:45:00"),
    initialQuery: "SSO integration",
    steps: [
      {
        type: "search",
        label: 'Search: "SSO integration"',
        timestamp: new Date("2026-03-24T16:45:00"),
        children: [
          {
            type: "ai_answer",
            label: "AI Answer shown",
            timestamp: new Date("2026-03-24T16:45:05"),
            children: [
              {
                type: "sentiment",
                label: "Disliked answer",
                detail: "Negative sentiment",
                timestamp: new Date("2026-03-24T16:45:30"),
              },
              {
                type: "click",
                label: "Clicked search result #2",
                detail: "sso-setup-guide.html",
                timestamp: new Date("2026-03-24T16:45:40"),
              },
            ],
          },
        ],
      },
    ],
  },
];

// Activity Log
export const activityLog: ActivityLogEntry[] = [
  { id: "log-001", sessionId: "sess-a1b2c3", timestamp: new Date("2026-03-25T14:32:00"), eventType: "search", keyword: "show me your pricing", detail: "Search performed — 12 results" },
  { id: "log-002", sessionId: "sess-a1b2c3", timestamp: new Date("2026-03-25T14:32:05"), eventType: "ai_answer", keyword: "show me your pricing", detail: "AI Answer generated", answerQuality: "sufficient" },
  { id: "log-003", sessionId: "sess-a1b2c3", timestamp: new Date("2026-03-25T14:32:15"), eventType: "click", keyword: "show me your pricing", detail: "Clicked result #1: /pricing", url: "/pricing" },
  { id: "log-004", sessionId: "sess-a1b2c3", timestamp: new Date("2026-03-25T14:32:20"), eventType: "sentiment", keyword: "show me your pricing", detail: "Positive sentiment on AI Answer" },
  { id: "log-005", sessionId: "sess-a1b2c3", timestamp: new Date("2026-03-25T14:32:30"), eventType: "dive_deeper", keyword: "show me your pricing", detail: "Clicked Dive Deeper → conversation started", answerQuality: "sufficient" },
  { id: "log-006", sessionId: "sess-a1b2c3", timestamp: new Date("2026-03-25T14:32:35"), eventType: "ai_conversation", detail: 'User message: "tell me more about AI pricing"' },
  { id: "log-007", sessionId: "sess-a1b2c3", timestamp: new Date("2026-03-25T14:33:00"), eventType: "click", detail: 'Clicked "Book a meeting" in conversation', url: "/book-meeting" },
  { id: "log-008", sessionId: "sess-d4e5f6", timestamp: new Date("2026-03-25T11:15:00"), eventType: "search", keyword: "how to set up webhooks", detail: "Search performed — 8 results" },
  { id: "log-009", sessionId: "sess-d4e5f6", timestamp: new Date("2026-03-25T11:15:05"), eventType: "ai_answer", keyword: "how to set up webhooks", detail: "AI Answer generated", answerQuality: "sufficient" },
  { id: "log-010", sessionId: "sess-d4e5f6", timestamp: new Date("2026-03-25T11:15:20"), eventType: "click", keyword: "how to set up webhooks", detail: "Clicked source: /docs/webhooks", url: "/docs/webhooks" },
  { id: "log-011", sessionId: "sess-d4e5f6", timestamp: new Date("2026-03-25T11:16:00"), eventType: "dive_deeper", keyword: "how to set up webhooks", detail: "Clicked Dive Deeper → conversation started", answerQuality: "sufficient" },
  { id: "log-012", sessionId: "sess-d4e5f6", timestamp: new Date("2026-03-25T11:16:05"), eventType: "ai_conversation", detail: 'User: "what events can I listen to?"' },
  { id: "log-013", sessionId: "sess-d4e5f6", timestamp: new Date("2026-03-25T11:17:00"), eventType: "click", detail: "Clicked API reference link in conversation", url: "/api/webhooks" },
  { id: "log-014", sessionId: "sess-g7h8i9", timestamp: new Date("2026-03-24T09:20:00"), eventType: "search", keyword: "billing support", detail: "Search performed — 6 results" },
  { id: "log-015", sessionId: "sess-g7h8i9", timestamp: new Date("2026-03-24T09:20:10"), eventType: "click", keyword: "billing support", detail: "Clicked result #1: /billing-faq", url: "/billing-faq" },
  { id: "log-016", sessionId: "sess-g7h8i9", timestamp: new Date("2026-03-24T09:20:45"), eventType: "click", keyword: "billing support", detail: "Clicked result #3: /contact", url: "/contact" },
  { id: "log-017", sessionId: "sess-j0k1l2", timestamp: new Date("2026-03-24T16:45:00"), eventType: "search", keyword: "SSO integration", detail: "Search performed — 5 results" },
  { id: "log-018", sessionId: "sess-j0k1l2", timestamp: new Date("2026-03-24T16:45:05"), eventType: "ai_answer", keyword: "SSO integration", detail: "AI Answer generated", answerQuality: "no_answer" },
  { id: "log-019", sessionId: "sess-j0k1l2", timestamp: new Date("2026-03-24T16:45:30"), eventType: "sentiment", keyword: "SSO integration", detail: "Negative sentiment on AI Answer" },
  { id: "log-020", sessionId: "sess-j0k1l2", timestamp: new Date("2026-03-24T16:45:40"), eventType: "click", keyword: "SSO integration", detail: "Clicked result #2: /docs/sso", url: "/docs/sso" },
];
