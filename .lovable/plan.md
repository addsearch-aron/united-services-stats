

# Activity Log Collapsed View Improvements

## What changes

### 1. Replace "URL" column with "Resolved?" and "Answer Quality" in collapsed view

**Collapsed row columns** become:
| Expand | Timestamp | Type Icons | Session | Keyword | Events | Resolved? | Quality |

- **Resolved?** — A badge: `Yes` (green), `No` (red), or `n/a` (gray). Derived per session group:
  - `Yes` if the session has clicks OR a positive sentiment
  - `No` if no clicks AND (no AI answer OR negative sentiment)
  - `n/a` if it's a pure search-only session with no AI and no clicks (edge case)

- **Quality** — Shown only when the session includes `ai_answer` or `ai_conversation` events. Displays a badge like `Sufficient`, `No Answer`, or `—`. Derived from mock data (we'll add an `answerQuality` field to the AI-related activity log entries).

### 2. Update data model (`src/types/analytics.ts`)

Add optional fields to `ActivityLogEntry`:
- `answerQuality?: "sufficient" | "no_answer" | null` — for `ai_answer` events
- `resolved?: boolean` — can be computed, but we'll derive it in the component

### 3. Update mock data (`src/data/mock-data.ts`)

Add `answerQuality` to `ai_answer` entries:
- `log-002` (pricing): `answerQuality: "sufficient"`
- `log-009` (webhooks): `answerQuality: "sufficient"`
- `log-018` (SSO): `answerQuality: "no_answer"` (has negative sentiment)

### 4. Update Activity Log component (`src/components/dashboard/ActivityLogTab.tsx`)

- Extend `SessionGroup` with computed `resolved` and `answerQuality` fields
- In `groupBySession`, derive:
  - `resolved`: check for clicks or positive sentiment → Yes; negative sentiment + no clicks → No; else n/a
  - `answerQuality`: pull from the `ai_answer` entry if present
- Replace the URL column header/cells in the **collapsed row** with Resolved? badge and Quality badge
- Keep URL visible in the **expanded child rows** (where it's contextually useful)

### Files modified
| File | Change |
|------|--------|
| `src/types/analytics.ts` | Add `answerQuality` optional field to `ActivityLogEntry` |
| `src/data/mock-data.ts` | Add `answerQuality` to AI answer log entries |
| `src/components/dashboard/ActivityLogTab.tsx` | Replace URL with Resolved? + Quality columns in collapsed view |

