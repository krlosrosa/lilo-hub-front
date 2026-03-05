import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/shared/components/ui/card";
import type { RankingPlayer } from "./bingo-cell";
import { cn } from "@/lib/utils";

interface Props {
  ranking: RankingPlayer[];
}

const medals = ["🥇", "🥈", "🥉"];

export function BingoRanking({ ranking }: Props) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Trophy className="h-5 w-5 text-accent" />
          Ranking
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-1.5">
        {ranking.slice(0, 5).map((p, i) => (
          <div
            key={p.name}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2 text-sm",
              p.name === "Você" ? "bg-primary/10 font-bold text-primary" : "bg-muted/50"
            )}
          >
            <span>
              {i < 3 ? medals[i] : `${i + 1}.`} {p.name}
            </span>
            <span className="font-semibold">{p.score} pts</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
