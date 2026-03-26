import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ServiceType } from "@/types/analytics";
import { Search, BrainCircuit, Filter, ExternalLink, Flag } from "lucide-react";
import { toast } from "sonner";

interface ServiceBadgePopoverProps {
  service: ServiceType;
  keyword: string;
}

const serviceConfig: Record<ServiceType, {
  short: string;
  label: string;
  icon: React.ElementType;
  tooltip: string;
}> = {
  keyword_search: {
    short: "KW",
    label: "Keyword Search",
    icon: Search,
    tooltip: "Keyword Search — traditional ranked results (click to inspect)",
  },
  ai: {
    short: "AI",
    label: "AI Assistance",
    icon: BrainCircuit,
    tooltip: "AI Assistance — generated answers & conversations (click to inspect)",
  },
};

// Mock contribution data per service type
function getMockContribution(service: ServiceType, keyword: string) {
  if (service === "ai") {
    return {
      interactionPct: 62,
      sampleAnswer: `Based on our documentation, "${keyword}" can be configured through the settings panel. You'll find step-by-step instructions in the integration guide.`,
      confidence: 0.72,
      sourceCount: 3,
      sources: ["docs/setup-guide.html", "faq/common-questions.html", "api/reference.html"],
    };
  }
  return {
    interactionPct: 38,
    topPosition: 1.8,
    resultCount: 12,
    topResults: ["pricing-page.html", "plans-comparison.html", "enterprise-quote.html"],
  };
}

export function ServiceBadgePopover({ service, keyword }: ServiceBadgePopoverProps) {
  const [open, setOpen] = useState(false);
  const config = serviceConfig[service];
  const Icon = config.icon;
  const contribution = getMockContribution(service, keyword);

  return (
    <TooltipProvider delayDuration={200}>
      <Popover open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <button
                className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                aria-label={`Inspect ${config.label} for "${keyword}"`}
              >
                <Icon className="h-3 w-3" />
                {config.short}
              </button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            {config.tooltip}
          </TooltipContent>
        </Tooltip>

        <PopoverContent className="w-80 p-0" align="start">
          <div className="border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-sm">{config.label}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Contribution for "{keyword}"</p>
          </div>

          <div className="px-4 py-3 space-y-3">
            {"interactionPct" in contribution && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Interactions</span>
                <span className="font-medium">{contribution.interactionPct}%</span>
              </div>
            )}

            {service === "ai" && "sampleAnswer" in contribution && (
              <>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground">Sample Answer</span>
                  <p className="text-xs bg-muted/50 rounded-md p-2 leading-relaxed">
                    {contribution.sampleAnswer}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Confidence: <strong className="text-foreground">{contribution.confidence}</strong></span>
                    <span>Sources: <strong className="text-foreground">{contribution.sourceCount}</strong></span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground">Sources</span>
                  <ul className="text-xs space-y-0.5">
                    {contribution.sources.map((src) => (
                      <li key={src} className="text-muted-foreground truncate">• {src}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {service === "keyword_search" && "topPosition" in contribution && (
              <>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg Position</span>
                  <span className="font-medium">{contribution.topPosition}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Results Shown</span>
                  <span className="font-medium">{contribution.resultCount}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground">Top Results</span>
                  <ul className="text-xs space-y-0.5">
                    {contribution.topResults.map((r) => (
                      <li key={r} className="text-muted-foreground truncate">• {r}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          <div className="border-t px-4 py-2 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs h-7 gap-1"
              onClick={() => {
                toast.info(`Filtering by ${config.label}`);
                setOpen(false);
              }}
            >
              <Filter className="h-3 w-3" />
              Filter by {config.short}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 gap-1"
              onClick={() => {
                toast.info("Opening sessions…");
                setOpen(false);
              }}
            >
              <ExternalLink className="h-3 w-3" />
              Sessions
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 gap-1"
              onClick={() => {
                toast.info("Flagged for indexing review");
                setOpen(false);
              }}
            >
              <Flag className="h-3 w-3" />
              Flag
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
}
