import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { cn } from "@/lib/utils";

export function CollapsibleSection({
  icon: Icon,
  title,
  children,
  defaultOpen = true,
  iconColor = "text-foreground",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  iconColor?: string;
}) {
  return (
    <Collapsible defaultOpen={defaultOpen} className="group">
      <div className="rounded-2xl bg-card shadow-sm overflow-hidden">
        <CollapsibleTrigger className="flex w-full items-center justify-between p-4 md:p-5 text-left hover:bg-muted/30 transition-colors">
          <div className="flex items-center gap-2">
            <Icon className={cn("h-4 w-4 md:h-5 md:w-5", iconColor)} />
            <h2 className="font-display text-sm md:text-base font-bold text-foreground">
              {title}
            </h2>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 md:px-5 pb-4 md:pb-5 space-y-3">{children}</div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}