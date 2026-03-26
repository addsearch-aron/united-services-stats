import { ServiceType } from "@/types/analytics";
import { Badge } from "@/components/ui/badge";
import { Search, BrainCircuit, MessageSquare } from "lucide-react";

interface ServiceFilterProps {
  available: ServiceType[];
  active: ServiceType[];
  onToggle: (service: ServiceType) => void;
}

const serviceLabels: Record<ServiceType, { label: string; icon: React.ElementType }> = {
  keyword_search: { label: "Keyword Search", icon: Search },
  ai_answers: { label: "AI Answers", icon: BrainCircuit },
  ai_conversations: { label: "AI Conversations", icon: MessageSquare },
};

export function ServiceFilter({ available, active, onToggle }: ServiceFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Services:</span>
      {available.map((service) => {
        const { label, icon: Icon } = serviceLabels[service];
        const isActive = active.includes(service);
        return (
          <Badge
            key={service}
            variant={isActive ? "default" : "outline"}
            className="cursor-pointer gap-1 select-none"
            onClick={() => onToggle(service)}
          >
            <Icon className="h-3 w-3" />
            {label}
          </Badge>
        );
      })}
    </div>
  );
}
