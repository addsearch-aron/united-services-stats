

# AI Tab Revision + Rename "Answer Quality" → "Sufficient Answers"

## 1. Rename "Answer Quality" to "Sufficient Answers" everywhere

**Files:** `src/data/mock-data.ts`, `src/components/dashboard/OverviewTab.tsx`
- KPI label in `overviewKpis`: "Answer Quality" → "Sufficient Answers"
- Table column header in OverviewTab: "Answer Quality" → "Sufficient Answers"

## 2. Update AI Tab KPI cards (6 cards)

**File:** `src/data/mock-data.ts` — replace `aiKpis` array:
1. **Queries** — total AI queries (keep existing ~11,678)
2. **Conversations** — unique conversations (~4,230)
3. **Sufficient Answers** — % of answers rated 2-3 out of 0-3 (~89.4%)
4. **Questions/Conversation** — avg questions per conversation (~2.8)
5. **Dive Deeper Rate** — % of queries that triggered dive deeper (~34.2%, keep)
6. **Clicks** — total clicks on AI answers/sources (~3,245)

Also add a 7th-style or incorporate **CTR** — clicks / queries as a percentage. Since user listed "Clicks and CTR" I'll add CTR as a 7th KPI, making it a 7-card grid, or combine into 6 by pairing. I'll use 7 KPIs in a responsive grid.

**File:** `src/components/dashboard/AITab.tsx`:
- Update grid to support 7 cards (`lg:grid-cols-7` or a wrapping layout)
- Keep the funnel, click breakdown, query table, and journey sections as-is

## 3. Files modified

| File | Change |
|------|--------|
| `src/data/mock-data.ts` | Update `aiKpis` to 7 KPIs; rename "Answer Quality" → "Sufficient Answers" in `overviewKpis` |
| `src/components/dashboard/AITab.tsx` | Update KPI grid layout for 7 cards |
| `src/components/dashboard/OverviewTab.tsx` | Rename "Answer Quality" column header to "Sufficient Answers" |

