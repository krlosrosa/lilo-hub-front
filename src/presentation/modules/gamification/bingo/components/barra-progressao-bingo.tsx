import { Progress } from "@/presentation/shared/components/ui/progress";

interface Props {
  marked: number;
  total: number;
}

export function BarraProgressaoBingo({ marked, total }: Props) {
  const pct = Math.round((marked / total) * 100);
  return (
    <div className="w-full max-w-sm mx-auto space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{marked} de {total} marcados</span>
        <span>{pct}%</span>
      </div>
      <Progress value={pct} className="h-3" />
    </div>
  );
}
