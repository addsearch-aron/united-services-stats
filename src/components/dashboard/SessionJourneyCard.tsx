import * as React from "react";
import { SessionJourney, JourneyStep } from "@/types/analytics";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Search, MousePointerClick, BrainCircuit, ThumbsUp, ThumbsDown,
  ArrowDownRight, MessageSquare, ExternalLink, ChevronRight,
} from "lucide-react";
import { format } from "date-fns";

const stepConfig: Record<JourneyStep["type"], { icon: React.ElementType; color: string }> = {
  search: { icon: Search, color: "text-primary" },
  click: { icon: MousePointerClick, color: "text-blue-500" },
  ai_answer: { icon: BrainCircuit, color: "text-violet-500" },
  sentiment: { icon: ThumbsUp, color: "text-emerald-500" },
  dive_deeper: { icon: ArrowDownRight, color: "text-orange-500" },
  conversation_message: { icon: MessageSquare, color: "text-sky-500" },
  conversation_click: { icon: ExternalLink, color: "text-rose-500" },
};

function StepNode({ step, depth = 0 }: { step: JourneyStep; depth?: number }) {
  const config = stepConfig[step.type];
  const Icon = config.icon;
  const SentimentIcon = step.detail?.includes("Negative") ? ThumbsDown : ThumbsUp;
  const ActualIcon = step.type === "sentiment" ? SentimentIcon : Icon;
  const hasChildren = step.children && step.children.length > 0;

  if (!hasChildren) {
    return (
      <div className="flex items-start gap-2 py-1" style={{ paddingLeft: depth * 20 }}>
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <ActualIcon className={`h-3.5 w-3.5 ${config.color}`} />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-sm text-foreground">{step.label}</span>
          {step.detail && (
            <span className="ml-1.5 text-xs text-muted-foreground">({step.detail})</span>
          )}
        </div>
        <span className="shrink-0 text-[10px] text-muted-foreground">
          {format(step.timestamp, "HH:mm:ss")}
        </span>
      </div>
    );
  }

  return (
    <Collapsible defaultOpen={depth < 2}>
      <div className="flex items-start gap-2 py-1" style={{ paddingLeft: depth * 20 }}>
        <CollapsibleTrigger className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded hover:bg-muted transition-colors group">
          <ChevronRight className="h-3 w-3 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
        </CollapsibleTrigger>
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <ActualIcon className={`h-3.5 w-3.5 shrink-0 ${config.color}`} />
          <span className="text-sm text-foreground">{step.label}</span>
          {step.detail && (
            <span className="text-xs text-muted-foreground">({step.detail})</span>
          )}
        </div>
        <span className="shrink-0 text-[10px] text-muted-foreground">
          {format(step.timestamp, "HH:mm:ss")}
        </span>
      </div>
      <CollapsibleContent>
        <div className="border-l border-border ml-2.5" style={{ marginLeft: depth * 20 + 10 }}>
          {step.children!.map((child, i) => (
            <StepNode key={i} step={child} depth={0} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

interface Props {
  journey: SessionJourney;
}

export function SessionJourneyCard({ journey }: Props) {
  return (
    <Card className="border-border/50">
      <CardContent className="pt-4 pb-3 px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px]">{journey.sessionId}</Badge>
            <span className="text-xs text-muted-foreground">
              {format(journey.startedAt, "MMM d, HH:mm")}
            </span>
          </div>
          <span className="text-xs font-medium text-foreground">
            "{journey.initialQuery}"
          </span>
        </div>
        <div className="mt-1">
          {journey.steps.map((step, i) => (
            <StepNode key={i} step={step} depth={0} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
