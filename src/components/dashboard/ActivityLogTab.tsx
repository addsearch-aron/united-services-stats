import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { activityLog } from "@/data/mock-data";
import { ActivityEventType, ActivityLogEntry, FlagAnnotation } from "@/types/analytics";
import { format } from "date-fns";
import { Search, MousePointerClick, BrainCircuit, MessageSquare, ArrowDownRight, ThumbsUp, ChevronDown, ChevronRight, Flag } from "lucide-react";
import { FlagDialog } from "./FlagDialog";
const eventConfig: Record<ActivityEventType, { label: string; icon: React.ElementType; color: string }> = {
  search: { label: "Search", icon: Search, color: "bg-primary/10 text-primary" },
  click: { label: "Click", icon: MousePointerClick, color: "bg-blue-500/10 text-blue-600" },
  ai_answer: { label: "AI Answer", icon: BrainCircuit, color: "bg-violet-500/10 text-violet-600" },
  ai_conversation: { label: "Conversation", icon: MessageSquare, color: "bg-sky-500/10 text-sky-600" },
  dive_deeper: { label: "Dive Deeper", icon: ArrowDownRight, color: "bg-orange-500/10 text-orange-600" },
  sentiment: { label: "Sentiment", icon: ThumbsUp, color: "bg-emerald-500/10 text-emerald-600" },
};

const allTypes: ActivityEventType[] = ["search", "click", "ai_answer", "ai_conversation", "dive_deeper", "sentiment"];

interface SessionGroup {
  sessionId: string;
  keyword: string;
  startedAt: Date;
  eventCount: number;
  eventTypes: ActivityEventType[];
  entries: ActivityLogEntry[];
  resolved: "yes" | "no" | "na";
  answerQuality: "sufficient" | "no_answer" | null;
}

function groupBySession(entries: ActivityLogEntry[]): SessionGroup[] {
  const map = new Map<string, ActivityLogEntry[]>();
  for (const entry of entries) {
    const list = map.get(entry.sessionId) || [];
    list.push(entry);
    map.set(entry.sessionId, list);
  }

  const groups: SessionGroup[] = [];
  for (const [sessionId, items] of map) {
    const sorted = items.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    const firstSearch = sorted.find((e) => e.eventType === "search");

    const hasClicks = sorted.some((e) => e.eventType === "click");
    const hasPositiveSentiment = sorted.some((e) => e.eventType === "sentiment" && e.detail.toLowerCase().includes("positive"));
    const hasNegativeSentiment = sorted.some((e) => e.eventType === "sentiment" && e.detail.toLowerCase().includes("negative"));
    const hasAI = sorted.some((e) => e.eventType === "ai_answer" || e.eventType === "ai_conversation");

    let resolved: "yes" | "no" | "na";
    if (hasClicks || hasPositiveSentiment) {
      resolved = "yes";
    } else if (hasNegativeSentiment || (hasAI && !hasClicks)) {
      resolved = "no";
    } else {
      resolved = "na";
    }

    const qualityEntry = sorted.find((e) => (e.eventType === "ai_answer" || e.eventType === "dive_deeper") && e.answerQuality);
    const answerQuality = qualityEntry?.answerQuality ?? null;

    groups.push({
      sessionId,
      keyword: firstSearch?.keyword || sorted[0]?.keyword || "—",
      startedAt: sorted[0].timestamp,
      eventCount: sorted.length,
      eventTypes: [...new Set(sorted.map((e) => e.eventType))],
      entries: sorted,
      resolved,
      answerQuality,
    });
  }

  return groups.sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
}

const resolvedConfig = {
  yes: { label: "Yes", className: "bg-emerald-500/10 text-emerald-700 border-emerald-200" },
  no: { label: "No", className: "bg-red-500/10 text-red-700 border-red-200" },
  na: { label: "n/a", className: "bg-muted text-muted-foreground" },
};

const qualityConfig = {
  sufficient: { label: "Sufficient", className: "bg-emerald-500/10 text-emerald-700 border-emerald-200" },
  no_answer: { label: "No Answer", className: "bg-red-500/10 text-red-700 border-red-200" },
};

export function ActivityLogTab() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTypes, setActiveTypes] = React.useState<ActivityEventType[]>(allTypes);
  const [expandedSessions, setExpandedSessions] = React.useState<Set<string>>(new Set());
  const [flags, setFlags] = React.useState<Map<string, FlagAnnotation>>(new Map());
  const [flagDialogOpen, setFlagDialogOpen] = React.useState(false);
  const [flagTarget, setFlagTarget] = React.useState<{ sessionId: string; keyword: string } | null>(null);

  const openFlagDialog = (sessionId: string, keyword: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlagTarget({ sessionId, keyword });
    setFlagDialogOpen(true);
  };

  const handleSaveFlag = (annotation: FlagAnnotation) => {
    if (!flagTarget) return;
    setFlags((prev) => new Map(prev).set(flagTarget.sessionId, annotation));
  };

  const handleRemoveFlag = () => {
    if (!flagTarget) return;
    setFlags((prev) => {
      const next = new Map(prev);
      next.delete(flagTarget.sessionId);
      return next;
    });
  };

  const toggleType = (type: ActivityEventType) => {
    setActiveTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleSession = (sessionId: string) => {
    setExpandedSessions((prev) => {
      const next = new Set(prev);
      if (next.has(sessionId)) next.delete(sessionId);
      else next.add(sessionId);
      return next;
    });
  };

  const filtered = activityLog.filter((entry) => {
    if (!activeTypes.includes(entry.eventType)) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        entry.detail.toLowerCase().includes(q) ||
        (entry.keyword?.toLowerCase().includes(q) ?? false) ||
        entry.sessionId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const groups = groupBySession(filtered);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by keyword, detail, or session..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {allTypes.map((type) => {
                const config = eventConfig[type];
                return (
                  <label key={type} className="flex items-center gap-1.5 cursor-pointer text-sm">
                    <Checkbox
                      checked={activeTypes.includes(type)}
                      onCheckedChange={() => toggleType(type)}
                    />
                    {config.label}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Grouped Log Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead className="w-[140px]">Timestamp</TableHead>
                <TableHead className="w-[120px]">Type</TableHead>
                <TableHead className="w-[120px]">Session</TableHead>
                <TableHead>Keyword</TableHead>
                <TableHead>Events</TableHead>
                <TableHead className="w-[90px]">Resolved?</TableHead>
                <TableHead className="w-[100px]">Quality</TableHead>
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => {
                const isExpanded = expandedSessions.has(group.sessionId);
                const rc = resolvedConfig[group.resolved];

                return (
                  <React.Fragment key={group.sessionId}>
                    {/* Group header row */}
                    <TableRow
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleSession(group.sessionId)}
                    >
                      <TableCell className="px-2">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground font-mono">
                        {format(group.startedAt, "MMM d HH:mm:ss")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {group.eventTypes.slice(0, 4).map((type) => {
                            const cfg = eventConfig[type];
                            const TypeIcon = cfg.icon;
                            return (
                              <span key={type} className={`inline-flex items-center justify-center h-5 w-5 rounded ${cfg.color}`}>
                                <TypeIcon className="h-3 w-3" />
                              </span>
                            );
                          })}
                          {group.eventTypes.length > 4 && (
                            <span className="text-[10px] text-muted-foreground">+{group.eventTypes.length - 4}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-mono text-muted-foreground">
                          {group.sessionId.slice(-6)}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm font-medium">{group.keyword}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {group.eventCount} event{group.eventCount !== 1 ? "s" : ""}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] ${rc.className}`}>
                          {rc.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {group.answerQuality ? (
                          <Badge variant="outline" className={`text-[10px] ${qualityConfig[group.answerQuality].className}`}>
                            {qualityConfig[group.answerQuality].label}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="px-2">
                        <button
                          onClick={(e) => openFlagDialog(group.sessionId, group.keyword, e)}
                          className="inline-flex items-center justify-center h-6 w-6 rounded hover:bg-muted transition-colors"
                          title="Flag this session"
                        >
                          <Flag
                            className={`h-3.5 w-3.5 ${
                              flags.has(group.sessionId)
                                ? "text-orange-500 fill-orange-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      </TableCell>
                    </TableRow>

                    {/* Expanded child rows */}
                    {isExpanded &&
                      group.entries.map((entry) => {
                        const config = eventConfig[entry.eventType];
                        const Icon = config.icon;
                        return (
                          <TableRow key={entry.id} className="bg-muted/30">
                            <TableCell></TableCell>
                            <TableCell className="text-xs text-muted-foreground font-mono">
                              {format(entry.timestamp, "MMM d HH:mm:ss")}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={`gap-1 text-[10px] ${config.color}`}>
                                <Icon className="h-3 w-3" />
                                {config.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-xs font-mono text-muted-foreground">
                                {entry.sessionId.slice(-6)}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm">{entry.keyword ?? "—"}</TableCell>
                            <TableCell className="text-sm max-w-[300px] truncate">{entry.detail}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{entry.url ?? "—"}</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        );
                      })}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>

          {groups.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">No events match your filters.</p>
          )}
        </CardContent>
      </Card>

      {flagTarget && (
        <FlagDialog
          open={flagDialogOpen}
          onOpenChange={setFlagDialogOpen}
          sessionId={flagTarget.sessionId}
          keyword={flagTarget.keyword}
          annotation={flags.get(flagTarget.sessionId) ?? null}
          onSave={handleSaveFlag}
          onRemove={handleRemoveFlag}
        />
      )}
    </div>
  );
}
