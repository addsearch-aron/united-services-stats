export type ServiceType = "keyword_search" | "ai";

export interface DateRange {
  from: Date;
  to: Date;
}

export interface KpiData {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
}

// Unified event types
export interface SearchEvent {
  id: string;
  keyword: string;
  service: ServiceType;
  timestamp: Date;
  resultsCount: number;
  hasResults: boolean;
  clicked: boolean;
  questionId: string;
  conversationId?: string;
  topic?: string;
}

export interface ClickEvent {
  id: string;
  searchEventId: string;
  targetType: "search_result" | "answer_source" | "answer_link" | "conversation_link";
  position: number;
  url: string;
  timestamp: Date;
}

export interface AIAnswerEvent {
  id: string;
  query: string;
  questionId: string;
  conversationId: string;
  answerGenerated: boolean;
  answerQuality: number; // 0-3
  sourceClicks: number;
  searchResultClicks: number;
  answerLinkClicks: number;
  diveDeeper: boolean;
  sentiment?: "positive" | "negative" | null;
  timestamp: Date;
  topic?: string;
}

export interface ConversationMessage {
  role: "user" | "ai";
  text: string;
  timestamp: Date;
  clickedLinks?: { label: string; url: string }[];
}

export interface ConversationEvent {
  id: string;
  conversationId: string;
  originQuery?: string;
  startedAt: Date;
  messageCount: number;
  searchesTriggered: number;
  interactions: number;
  messages: ConversationMessage[];
}

// Session journey — the connected flow
export interface JourneyStep {
  type: "search" | "click" | "ai_answer" | "sentiment" | "dive_deeper" | "conversation_message" | "conversation_click";
  label: string;
  detail?: string;
  timestamp: Date;
  children?: JourneyStep[];
}

export interface SessionJourney {
  id: string;
  sessionId: string;
  startedAt: Date;
  initialQuery: string;
  steps: JourneyStep[];
}

// Activity log
export type ActivityEventType = "search" | "click" | "ai_answer" | "ai_conversation" | "dive_deeper" | "sentiment";

export interface ActivityLogEntry {
  id: string;
  sessionId: string;
  timestamp: Date;
  eventType: ActivityEventType;
  keyword?: string;
  detail: string;
  url?: string;
  answerQuality?: "sufficient" | "no_answer" | null;
}

// Chart data
export interface TrendDataPoint {
  date: string;
  keywordSearch: number;
  ai: number;
}

export interface KeywordRow {
  keyword: string;
  searches: number;
  clicks: number;
  ctr: number;
  services: ServiceType[];
  trend: number;
  avgClickPosition: number;
  avgAnswerQuality: number | null;
  topic: string;
}

export interface AIQueryRow {
  query: string;
  topic: string;
  asked: number;
  clicks: number;
  ctr: number;
  quality: "high" | "medium" | "low";
  answerShown: boolean;
  sentiment?: "positive" | "negative" | null;
  timestamp: Date;
}

export interface ServiceBreakdown {
  service: string;
  searches: number;
  clicks: number;
  ctr: number;
}

export interface ClickDistribution {
  position: string;
  clicks: number;
}

export interface EngagementFunnel {
  stage: string;
  count: number;
}

export interface ClientConfig {
  services: ServiceType[];
  name: string;
}
