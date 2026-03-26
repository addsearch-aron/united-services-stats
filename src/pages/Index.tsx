import * as React from "react";
import { subDays } from "date-fns";
import { BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { ServiceFilter } from "@/components/dashboard/ServiceFilter";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { KeywordSearchTab } from "@/components/dashboard/KeywordSearchTab";
import { AIAnswersTab } from "@/components/dashboard/AIAnswersTab";
import { AIConversationsTab } from "@/components/dashboard/AIConversationsTab";
import { clientConfig } from "@/data/mock-data";
import { DateRange, ServiceType } from "@/types/analytics";

const Index = () => {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [activeServices, setActiveServices] = React.useState<ServiceType[]>(clientConfig.services);

  const toggleService = (service: ServiceType) => {
    setActiveServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Search Analytics</h1>
              <p className="text-xs text-muted-foreground">{clientConfig.name}</p>
            </div>
          </div>
          <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-6">
          <ServiceFilter
            available={clientConfig.services}
            active={activeServices}
            onToggle={toggleService}
          />
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {activeServices.includes("keyword_search") && (
              <TabsTrigger value="keyword_search">Keyword Search</TabsTrigger>
            )}
            {activeServices.includes("ai_answers") && (
              <TabsTrigger value="ai_answers">AI Answers</TabsTrigger>
            )}
            {activeServices.includes("ai_conversations") && (
              <TabsTrigger value="ai_conversations">AI Conversations</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab activeServices={activeServices} />
          </TabsContent>
          <TabsContent value="keyword_search">
            <KeywordSearchTab />
          </TabsContent>
          <TabsContent value="ai_answers">
            <AIAnswersTab />
          </TabsContent>
          <TabsContent value="ai_conversations">
            <AIConversationsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
