import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type VictoryType = "row" | "column" | "diagonal" | "full" | null;

export interface BingoCell {
  word: string;
  marked: boolean;
  index: number;
}

export interface RankingPlayer {
  name: string;
  score: number;
}


interface Props {
  cell: BingoCell;
  released: boolean;
  onMark: (index: number) => void;
  justMarked: boolean;
}

export function BingoCell({ cell, released, onMark, justMarked }: Props) {
  return (
    <button
      onClick={() => onMark(cell.index)}
      className={cn(
        "relative flex items-center justify-center rounded-2xl p-2 text-xs font-bold shadow-md transition-all duration-200 active:scale-95 select-none aspect-square",
        "border-2 min-h-[72px] sm:min-h-[80px]",
        cell.marked
          ? "bg-primary text-primary-foreground border-primary shadow-lg"
          : released
          ? "bg-[hsl(var(--bingo-released))] border-[hsl(var(--success))] text-foreground hover:scale-105"
          : "bg-card border-border text-foreground hover:border-muted-foreground",
        justMarked && "bingo-cell-pop"
      )}
    >
      {cell.marked && (
        <Check className="absolute top-1 right-1 h-4 w-4 text-primary-foreground opacity-80" />
      )}
      <span className="leading-tight text-center wrap-break-word text-[11px] sm:text-xs">{cell.word}</span>
    </button>
  );
}
