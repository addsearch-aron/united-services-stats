

# AI Tab KPI Revisions

## Changes

### 1. Update KPI list and order (`src/data/mock-data.ts`)
Remove "Dive Deeper Rate" from `aiKpis`. Reorder to:
1. Queries
2. Conversations
3. Questions/Conversation
4. Sufficient Answers
5. Clicks
6. CTR

### 2. Fix "Questions/Conversation" label layout (`src/components/dashboard/KpiCard.tsx`)
The label text wraps awkwardly in narrow cards. Add `whitespace-nowrap` or use `min-w-0` with truncation on the label `<p>` to keep it on one line.

### 3. Update AI tab grid (`src/components/dashboard/AITab.tsx`)
- Change grid from `lg:grid-cols-7` to `lg:grid-cols-6` (6 KPIs now)
- Remove the "Dive Deeper" column from the Query Performance table
- Remove the Dive Deeper funnel card ("AI Journey Funnel")
- Remove `aiFunnel` import and related `funnelColors`

### Files modified
| File | Change |
|------|--------|
| `src/data/mock-data.ts` | Remove Dive Deeper Rate KPI, reorder remaining 6 |
| `src/components/dashboard/KpiCard.tsx` | Add `whitespace-nowrap` to label for cleaner layout |
| `src/components/dashboard/AITab.tsx` | Grid to 6 cols, remove funnel card, remove Dive Deeper table column |

