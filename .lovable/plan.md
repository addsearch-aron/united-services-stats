
## Unified Search & AI Statistics Dashboard

### Overview
A client-facing analytics dashboard with multi-tab navigation, showing unified statistics across three services: **Keyword Search**, **AI Answers**, and **AI Conversations**. Uses mock data, no auth. Custom date range picker for filtering.

---

### Page Structure

**1. Overview Tab (default)**
- **KPI cards row**: Total Searches, Total Clicks, Overall CTR, AI Usage Rate
- **Trend chart**: Line/area chart showing search volume over time, with toggleable lines per service
- **Service breakdown**: Bar chart comparing performance across active services
- **Top Keywords table**: Aggregated across all services, with clicks, CTR, and which service(s) they appeared in

**2. Keyword Search Tab**
- KPIs: Searches, Clicks, CTR, Top keyword
- Keyword ranking table with search volume, clicks, CTR, position trends
- Click distribution chart (which results get clicked)
- Zero-result searches list

**3. AI Answers Tab**
- KPIs: Queries, Answers generated, Source clicks, Search result clicks
- Query performance table: query text, answer shown (yes/no), source link clicks, search result clicks behind the answer
- Click breakdown: clicks on inline answer links/sources vs. clicks on accompanying search results
- Answer engagement chart over time

**4. AI Conversations Tab**
- KPIs: Conversations started, Avg messages per conversation, Search triggers, Interaction rate
- Conversations table: start time, message count, searches triggered, interactions
- Engagement funnel: conversations → follow-up questions → searches → clicks
- Placeholder section for future "Dive Deeper" (AI Answers → Conversations) tracking

---

### Shared Controls
- **Date range picker**: Presets (7d, 30d, 90d) + custom date range selector
- **Service filter**: Toggle which services to include (for clients with multiple services)
- Tabs: Overview | Keyword Search | AI Answers | AI Conversations (tabs only show for services the client has)

### Data Layer
- Mock data generator producing realistic data for all three services
- Shared TypeScript types for the unified event model:
  - `SearchEvent` (keyword, service, timestamp, results_count)
  - `ClickEvent` (target_type: "search_result" | "answer_source" | "answer_link", position, url)
  - `ConversationEvent` (conversation_id, message_count, searches_triggered, interactions)
- Data hooks per tab that filter by date range and service

### Design
- Clean, professional dashboard using shadcn cards, tables, and charts (Recharts)
- Responsive layout, sidebar navigation with service icons
- Light color palette matching the existing design system
