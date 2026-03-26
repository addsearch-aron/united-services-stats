import * as React from "react";
import { format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "@/types/analytics";

interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

const presets = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
];

export function DateRangePicker({ dateRange, onDateRangeChange }: DateRangePickerProps) {
  const [activePreset, setActivePreset] = React.useState<string>("30d");

  const handlePreset = (days: number, label: string) => {
    setActivePreset(label);
    onDateRangeChange({ from: subDays(new Date(), days), to: new Date() });
  };

  return (
    <div className="flex items-center gap-2">
      {presets.map((p) => (
        <Button
          key={p.label}
          variant={activePreset === p.label ? "default" : "outline"}
          size="sm"
          onClick={() => handlePreset(p.days, p.label)}
        >
          {p.label}
        </Button>
      ))}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={activePreset === "custom" ? "default" : "outline"}
            size="sm"
            className={cn("justify-start text-left font-normal", activePreset !== "custom" && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {activePreset === "custom"
              ? `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`
              : "Custom"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            selected={{ from: dateRange.from, to: dateRange.to }}
            onSelect={(range) => {
              if (range?.from && range?.to) {
                setActivePreset("custom");
                onDateRangeChange({ from: range.from, to: range.to });
              }
            }}
            numberOfMonths={2}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
