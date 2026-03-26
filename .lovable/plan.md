

# Overview Tab Revision

## Tracking Model Update (types + mock data)

Refine the data model to match the described hierarchy:
- **Session** → contains multiple queries
- **Query** (question_id) → triggers keyword search AND/OR AI answer
- **Conversation** (conversation_id) → groups the initial AI answer query + all dive deeper follow-ups
- Each query has: `questionId`, `conversationId` (if AI), `sessionId`
- Track: `hasResults` (boolean) for searches, `answerGenerated` for AI, `answerQuality` (0-3)

### New/updated types in `analytics.ts`:
- Add `questionId` and `conversationId` fields to `SearchEvent`
- Add `answerQuality: number` (0-3) to `AIAnswerEvent`
- Add `hasResults: boolean` to `SearchEvent` (rename/clarify `resultsCount`)
- Add `topic: string` to both `SearchEvent` and `AIAnswerEvent`
- Update `KeywordRow` to include `noResultRate`, `avgAnswerQuality`, `topic`
- Update `TrendDataPoint` to separate keyword search count vs AI answer count

## Overview Page Changes

### KPI Cards (top row, 5 cards):
1. **Total Queries** — searches + AI questions combined
2. **Total Clicks** — all click actions
3. **Overall CTR%** — clicks / queries
4. **No Results %** — queries returning 0 results or no answer
5. **AI Usage Rate** — AI queries / total queries

### Chart:
- Keep the area chart but ensure two clear lines: **Keyword Searches** and **AI Answers** (total answer count, not query count)

### Top Keywords Table — add columns:
- Existing: Keyword, Searches, Clicks, CTR, Services
- **New: No Results %** — percentage of times this keyword returned no results
- **New: Avg Answer Quality** — average quality score (0-3) for AI answers on this keyword
- **New: Topic** — auto-assigned topic category (e.g., "Pricing", "Features", "Support", "Integration")

### Session Journeys:
- Keep as-is (already working)

## Files Modified

1. **`src/types/analytics.ts`** — add `questionId`, `conversationId`, `answerQuality`, `topic`, `hasResults` fields; update `KeywordRow`
2. **`src/data/mock-data.ts`** — update mock data generator to produce topic labels, answer quality scores, no-result flags; update KPI values to match new definitions
3. **`src/components/dashboard/OverviewTab.tsx`** — 5 KPI cards, add No Results %, Answer Quality, and Topic columns to table
4. **`src/components/dashboard/KpiCard.tsx`** — minor: support 5-card grid layout

