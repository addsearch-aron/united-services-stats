

# Revised Dashboard: Connected Search & AI Analytics

## What Changes and Why

The current dashboard treats AI Answers and AI Conversations as isolated tabs with no connection between them. In reality, AddSearch's AI Answers already returns a `conversation_id`, and "Dive Deeper" is the bridge from an answer into a conversation. The data model needs to reflect this connected flow.

## Key Design Decisions

### 1. Merge AI Answers + Conversations into "AI" Tab
Instead of two separate tabs, create a single **AI** tab that shows the full journey: query → answer → optional dive deeper → conversation. Keep Keyword Search as a separate tab since pure keyword searches are a distinct flow.

**Tab structure becomes:**
- Overview (aggregated)
- Keyword Search (pure search events)
- AI (answers, dive deeper, conversations — all connected)
- Activity Log (individual event logs)

### 2. User Journey Visualization
Add a "Session Journeys" section showing connected user flows. Example from the brief:

```text
Search: "show me your pricing"
  ├─ Clicked keyword result #1 (pricing-page.html)
  ├─ AI Answer shown
  │   ├─ Liked answer (positive sentiment)
  │   └─ Clicked "Dive Deeper"
  │       └─ Conversation started
  │           ├─ User: "tell me more about AI pricing"
  │           ├─ AI: [response with links]
  │           └─ Clicked: "Book a meeting" link
```

This is rendered as a visual timeline/tree component showing the actual chain of events within a session.

### 3. Individual Activity Log Tab
A new tab showing raw event logs — every search, click, AI answer, conversation message — in chronological order with filtering by event type, date, and keyword.

---

## Technical Plan

### Data Model Changes (`src/types/analytics.ts`)
- Add `SessionJourney` type linking a search session to its chain of events (search → clicks → AI answer → dive deeper → conversation → clicks)
- Add `ActivityLogEntry` union type for the raw log view
- Update `AIAnswerEvent` to include `conversationId` (matching AddSearch's real API where AI answers return `conversation_id`)
- Add `sentimentValue` field (positive/negative) matching `putSentimentClick`
- Add `diveDeeper` boolean to track answer-to-conversation transitions
- Rename `ServiceType` to include `"ai"` instead of separate `"ai_answers"` and `"ai_conversations"`

### Mock Data Updates (`src/data/mock-data.ts`)
- Generate connected session journeys (a search that leads to an AI answer that leads to dive deeper)
- Generate activity log entries with realistic event chains
- Keep existing KPI data but adjust to new structure

### New/Modified Components

**Merge AI Answers + Conversations → `AITab.tsx`**
- KPIs: Queries, Answers Generated, Dive Deeper Rate, Conversation Clicks
- Query table showing: query, answer shown, source clicks, search result clicks, dive deeper triggered, conversation messages, conversation clicks
- Click breakdown chart (source links vs answer links vs search results vs conversation links)
- Dive deeper funnel: Queries → Answers → Dive Deeper → Conversations → Clicks

**New: `SessionJourneyCard.tsx`**
- Visual timeline/tree showing a user's connected flow
- Expandable rows: search → what happened next
- Added to Overview tab and also accessible from AI tab

**New: `ActivityLogTab.tsx`**
- Chronological table of all raw events
- Columns: timestamp, event type, details (keyword/query/click target), session ID
- Filters: event type checkboxes, keyword search, date range
- Expandable rows for full event detail

**Update: `Index.tsx`**
- Replace ai_answers + ai_conversations tabs with single "AI" tab
- Add "Activity Log" tab
- Update service filter accordingly

### Files to Create
- `src/components/dashboard/AITab.tsx` (replaces AIAnswersTab + AIConversationsTab)
- `src/components/dashboard/SessionJourneyCard.tsx`
- `src/components/dashboard/ActivityLogTab.tsx`

### Files to Modify
- `src/types/analytics.ts` — new types for journeys and activity log
- `src/data/mock-data.ts` — connected session data and log entries
- `src/pages/Index.tsx` — new tab structure
- `src/components/dashboard/OverviewTab.tsx` — add journey preview section

### Files to Delete
- `src/components/dashboard/AIAnswersTab.tsx`
- `src/components/dashboard/AIConversationsTab.tsx`

