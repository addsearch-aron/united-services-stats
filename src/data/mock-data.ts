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
  { label: "Total Queries", value: "24,521", change: 12.5, changeLabel: "vs last period" },
  { label: "Total Clicks", value: "8,432", change: 8.2, changeLabel: "vs last period" },
  { label: "Overall CTR", value: "34.4%", change: 2.1, changeLabel: "vs last period" },
  { label: "No Results", value: "6.8%", change: -1.4, changeLabel: "vs last period" },
  { label: "AI Usage Rate", value: "62.3%", change: 15.7, changeLabel: "vs last period" },
];

export const keywordSearchKpis: KpiData[] = [
  { label: "Searches", value: "12,843", change: 5.3 },
  { label: "Clicks", value: "4,126", change: 3.1 },
  { label: "CTR", value: "32.1%", change: -1.2 },
  { label: "Top Keyword", value: "pricing plans" },
];

export const aiKpis: KpiData[] = [
  { label: "Queries", value: "11,678", change: 22.4 },
  { label: "Answers Generated", value: "7,102", change: 18.1 },
  { label: "Dive Deeper Rate", value: "34.2%", change: 8.6 },
  { label: "Conversation Clicks", value: "1,876", change: 14.3 },
];

export const topKeywords: KeywordRow[] = [
  { keyword: "pricing plans", searches: 1842, clicks: 723, ctr: 39.3, services: ["keyword_search", "ai"], trend: 2, noResultRate: 1.2, avgAnswerQuality: 2.8, topic: "Pricing" },
  { keyword: "how to integrate", searches: 1523, clicks: 612, ctr: 40.2, services: ["keyword_search", "ai"], trend: 5, noResultRate: 3.1, avgAnswerQuality: 2.5, topic: "Integration" },
  { keyword: "api documentation", searches: 1201, clicks: 534, ctr: 44.5, services: ["keyword_search", "ai"], trend: -1, noResultRate: 0.8, avgAnswerQuality: 2.9, topic: "Documentation" },
  { keyword: "getting started", searches: 1087, clicks: 401, ctr: 36.9, services: ["keyword_search", "ai"], trend: 0, noResultRate: 2.0, avgAnswerQuality: 2.6, topic: "Onboarding" },
  { keyword: "troubleshooting errors", searches: 956, clicks: 287, ctr: 30.0, services: ["ai"], trend: 3, noResultRate: 12.4, avgAnswerQuality: 1.8, topic: "Support" },
  { keyword: "billing support", searches: 834, clicks: 312, ctr: 37.4, services: ["keyword_search"], trend: -2, noResultRate: 5.6, avgAnswerQuality: null, topic: "Billing" },
  { keyword: "feature comparison", searches: 762, clicks: 298, ctr: 39.1, services: ["keyword_search", "ai"], trend: 1, noResultRate: 2.3, avgAnswerQuality: 2.4, topic: "Features" },
  { keyword: "account settings", searches: 698, clicks: 245, ctr: 35.1, services: ["keyword_search"], trend: -3, noResultRate: 4.1, avgAnswerQuality: null, topic: "Account" },
  { keyword: "data export", searches: 621, clicks: 189, ctr: 30.4, services: ["keyword_search", "ai"], trend: 4, noResultRate: 8.7, avgAnswerQuality: 2.1, topic: "Features" },
  { keyword: "webhook setup", searches: 543, clicks: 201, ctr: 37.0, services: ["ai"], trend: 7, noResultRate: 3.5, avgAnswerQuality: 2.7, topic: "Integration" },
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
  { query: "How do I reset my password?", answerShown: true, sourceClicks: 45, searchResultClicks: 23, answerLinkClicks: 67, diveDeeper: false, conversationMessages: 0, conversationClicks: 0, sentiment: "positive", timestamp: new Date("2026-03-25") },
  { query: "What are the pricing tiers?", answerShown: true, sourceClicks: 89, searchResultClicks: 34, answerLinkClicks: 112, diveDeeper: true, conversationMessages: 4, conversationClicks: 2, sentiment: "positive", timestamp: new Date("2026-03-25") },
  { query: "How to set up webhooks?", answerShown: true, sourceClicks: 34, searchResultClicks: 56, answerLinkClicks: 28, diveDeeper: true, conversationMessages: 6, conversationClicks: 3, sentiment: null, timestamp: new Date("2026-03-24") },
  { query: "API rate limits explained", answerShown: true, sourceClicks: 67, searchResultClicks: 12, answerLinkClicks: 45, diveDeeper: false, conversationMessages: 0, conversationClicks: 0, sentiment: "positive", timestamp: new Date("2026-03-24") },
  { query: "How to export data as CSV?", answerShown: false, sourceClicks: 0, searchResultClicks: 78, answerLinkClicks: 0, diveDeeper: false, conversationMessages: 0, conversationClicks: 0, sentiment: null, timestamp: new Date("2026-03-23") },
  { query: "Team member permissions", answerShown: true, sourceClicks: 23, searchResultClicks: 45, answerLinkClicks: 31, diveDeeper: true, conversationMessages: 3, conversationClicks: 1, sentiment: "negative", timestamp: new Date("2026-03-23") },
  { query: "SSO integration guide", answerShown: true, sourceClicks: 56, searchResultClicks: 19, answerLinkClicks: 42, diveDeeper: true, conversationMessages: 8, conversationClicks: 4, sentiment: "positive", timestamp: new Date("2026-03-22") },
  { query: "Billing cycle questions", answerShown: false, sourceClicks: 0, searchResultClicks: 63, answerLinkClicks: 0, diveDeeper: false, conversationMessages: 0, conversationClicks: 0, sentiment: null, timestamp: new Date("2026-03-22") },
];

export const serviceBreakdown: ServiceBreakdown[] = [
  { service: "Keyword Search", searches: 12843, clicks: 4126, ctr: 32.1 },
  { service: "AI (Answers + Conversations)", searches: 11678, clicks: 6182, ctr: 52.9 },
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
  { id: "log-002", sessionId: "sess-a1b2c3", timestamp: new Date("2026-03-25T14:32:05"), eventType: "ai_answer", keyword: "show me your pricing", detail: "AI Answer generated" },
  { id: "log-003", sessionId: "sess-a1b2c3", timestamp: new Date("2026-03-25T14:32:15"), eventType: "click", keyword: "show me your pricing", detail: "Clicked result #1: pricing-page.html", url: "/pricing" },
  { id: "log-004", sessionId: "sess-a1b2c3", timestamp: new Date("2026-03-25T14:32:20"), eventType: "sentiment", keyword: "show me your pricing", detail: "Positive sentiment on AI Answer" },
  { id: "log-005", sessionId: "sess-a1b2c3", timestamp: new Date("2026-03-25T14:32:30"), eventType: "dive_deeper", keyword: "show me your pricing", detail: "Clicked Dive Deeper → conversation started" },
  { id: "log-006", sessionId: "sess-a1b2c3", timestamp: new Date("2026-03-25T14:32:35"), eventType: "ai_conversation", detail: 'User message: "tell me more about AI pricing"' },
  { id: "log-007", sessionId: "sess-a1b2c3", timestamp: new Date("2026-03-25T14:33:00"), eventType: "click", detail: 'Clicked "Book a meeting" in conversation', url: "/book-meeting" },
  { id: "log-008", sessionId: "sess-d4e5f6", timestamp: new Date("2026-03-25T11:15:00"), eventType: "search", keyword: "how to set up webhooks", detail: "Search performed — 8 results" },
  { id: "log-009", sessionId: "sess-d4e5f6", timestamp: new Date("2026-03-25T11:15:05"), eventType: "ai_answer", keyword: "how to set up webhooks", detail: "AI Answer generated" },
  { id: "log-010", sessionId: "sess-d4e5f6", timestamp: new Date("2026-03-25T11:15:20"), eventType: "click", keyword: "how to set up webhooks", detail: "Clicked source: docs/webhooks-guide.html", url: "/docs/webhooks" },
  { id: "log-011", sessionId: "sess-d4e5f6", timestamp: new Date("2026-03-25T11:16:00"), eventType: "dive_deeper", keyword: "how to set up webhooks", detail: "Clicked Dive Deeper → conversation started" },
  { id: "log-012", sessionId: "sess-d4e5f6", timestamp: new Date("2026-03-25T11:16:05"), eventType: "ai_conversation", detail: 'User: "what events can I listen to?"' },
  { id: "log-013", sessionId: "sess-d4e5f6", timestamp: new Date("2026-03-25T11:17:00"), eventType: "click", detail: "Clicked API reference link in conversation", url: "/api/webhooks" },
  { id: "log-014", sessionId: "sess-g7h8i9", timestamp: new Date("2026-03-24T09:20:00"), eventType: "search", keyword: "billing support", detail: "Search performed — 6 results" },
  { id: "log-015", sessionId: "sess-g7h8i9", timestamp: new Date("2026-03-24T09:20:10"), eventType: "click", keyword: "billing support", detail: "Clicked result #1: billing-faq.html", url: "/billing-faq" },
  { id: "log-016", sessionId: "sess-g7h8i9", timestamp: new Date("2026-03-24T09:20:45"), eventType: "click", keyword: "billing support", detail: "Clicked result #3: contact-support.html", url: "/contact" },
  { id: "log-017", sessionId: "sess-j0k1l2", timestamp: new Date("2026-03-24T16:45:00"), eventType: "search", keyword: "SSO integration", detail: "Search performed — 5 results" },
  { id: "log-018", sessionId: "sess-j0k1l2", timestamp: new Date("2026-03-24T16:45:05"), eventType: "ai_answer", keyword: "SSO integration", detail: "AI Answer generated" },
  { id: "log-019", sessionId: "sess-j0k1l2", timestamp: new Date("2026-03-24T16:45:30"), eventType: "sentiment", keyword: "SSO integration", detail: "Negative sentiment on AI Answer" },
  { id: "log-020", sessionId: "sess-j0k1l2", timestamp: new Date("2026-03-24T16:45:40"), eventType: "click", keyword: "SSO integration", detail: "Clicked result #2: sso-setup-guide.html", url: "/docs/sso" },
];
