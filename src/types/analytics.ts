export type ServiceType = "keyword_search" | "ai_answers" | "ai_conversations";

export interface DateRange {
  from: Date;
  to: Date;
}

export interface KpiData {
  label: string;
  value: string | number;
  change?: number; // percentage change
  changeLabel?: string;
}

// Unified event types
export interface SearchEvent {
  id: string;
  keyword: string;
  service: ServiceType;
  timestamp: Date;
  resultsCount: number;
  clicked: boolean;
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
  answerGenerated: boolean;
  sourceClicks: number;
  searchResultClicks: number;
  answerLinkClicks: number;
  timestamp: Date;
}

export interface ConversationEvent {
  id: string;
  conversationId: string;
  startedAt: Date;
  messageCount: number;
  searchesTriggered: number;
  interactions: number;
}

// Chart data
export interface TrendDataPoint {
  date: string;
  keywordSearch: number;
  aiAnswers: number;
  aiConversations: number;
}

export interface KeywordRow {
  keyword: string;
  searches: number;
  clicks: number;
  ctr: number;
  services: ServiceType[];
  trend: number; // position change
}

export interface AIAnswerRow {
  query: string;
  answerShown: boolean;
  sourceClicks: number;
  searchResultClicks: number;
  answerLinkClicks: number;
  timestamp: Date;
}

export interface ConversationRow {
  conversationId: string;
  startedAt: Date;
  messageCount: number;
  searchesTriggered: number;
  interactions: number;
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
