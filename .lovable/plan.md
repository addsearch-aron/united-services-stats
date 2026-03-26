

## Plan: Add Flag/Annotation Feature to Activity Log

### What We're Building
A flag button on each activity log row that opens a dialog for annotating/flagging queries. The dialog contains:
- **Status dropdown**: "To Fix", "Fixed", "Golden Set"
- **Expected Answer**: text input
- **Expected Sources**: one or more HTML/URL source inputs (with add/remove)
- **Comments thread**: comment input + display of existing comments (supporting replies from different users)

### Technical Details

**1. Create Flag Dialog Component** (`src/components/dashboard/FlagDialog.tsx`)
- Uses shadcn `Dialog`, `Select`, `Input`, `Textarea`, `Button`
- Props: `open`, `onOpenChange`, `sessionId`, `keyword`
- State for: status dropdown, expected answer text, array of expected sources (add/remove buttons), new comment text, list of comments (mock with author + timestamp)
- Comments displayed as a simple thread with author name and timestamp

**2. Create Flag Data Types** (`src/types/analytics.ts`)
- Add `FlagStatus = "to_fix" | "fixed" | "golden_set"`
- Add `FlagAnnotation` interface with status, expectedAnswer, expectedSources[], comments[]
- Add `FlagComment` interface with id, author, text, timestamp

**3. Update ActivityLogTab** (`src/components/dashboard/ActivityLogTab.tsx`)
- Add a `Flag` icon button in the group header row (new column or at end of row)
- Click opens the `FlagDialog`
- Store flag data in local state (Map keyed by sessionId)
- Show filled/colored flag icon if session has been flagged
- Stop click propagation so flag click doesn't toggle row expansion

**4. Files Changed**
- `src/types/analytics.ts` — add flag types
- `src/components/dashboard/FlagDialog.tsx` — new component
- `src/components/dashboard/ActivityLogTab.tsx` — add flag column + dialog integration

