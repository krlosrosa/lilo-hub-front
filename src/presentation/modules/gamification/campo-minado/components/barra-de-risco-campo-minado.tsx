import { Progress } from "@/presentation/shared/components/ui/progress";

interface RiskBarProps {
  riskPercent: number;
}

export function BarraRiscoCampoMinado({ riskPercent }: RiskBarProps) {
  return (
    <div className="w-full max-w-sm mx-auto space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground font-medium">
        <span>Risco</span>
        <span>{riskPercent}%</span>
      </div>
      <Progress value={riskPercent} className="h-3" />
    </div>
  );
}
