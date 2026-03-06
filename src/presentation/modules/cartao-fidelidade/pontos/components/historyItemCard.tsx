import type { HistoryItem as HistoryItemType } from "../data/mock";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";

const typeConfig = {
  earned: { icon: ArrowUpRight, colorClass: "text-accent bg-accent/10", sign: "+" },
  redeemed: { icon: ArrowDownRight, colorClass: "text-destructive bg-destructive/10", sign: "" },
  bonus: { icon: Sparkles, colorClass: "text-gold bg-gold-light", sign: "+" },
};

interface HistoryItemProps {
  item: HistoryItemType;
}

const HistoryItemCard = ({ item }: HistoryItemProps) => {
  const config = typeConfig[item.type];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-card animate-slide-up">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.colorClass}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{item.description}</p>
        <p className="text-xs text-muted-foreground">
          {format(parseISO(item.date), "dd MMM yyyy", { locale: ptBR })}
        </p>
      </div>
      <span className={`text-sm font-bold ${item.points > 0 ? "text-accent" : "text-destructive"}`}>
        {config.sign}{Math.abs(item.points)} pts
      </span>
    </div>
  );
};

export default HistoryItemCard;
