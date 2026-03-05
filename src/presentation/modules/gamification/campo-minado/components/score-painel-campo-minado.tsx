interface ScorePanelProps {
  roundScore: number;
  totalScore: number;
  multiplier: number;
  blocksRemaining: number;
}

export function ScorePainelCampoMinado({ roundScore, totalScore, multiplier, blocksRemaining }: ScorePanelProps) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm mx-auto">
      {/* Pontos da rodada */}
      <div className="rounded-xl bg-card border p-3 text-center shadow-sm">
        <p className="text-xs text-muted-foreground font-medium">Rodada</p>
        <p className="text-2xl font-bold text-foreground">{roundScore}</p>
      </div>

      {/* Pontuação total */}
      <div className="rounded-xl bg-card border p-3 text-center shadow-sm">
        <p className="text-xs text-muted-foreground font-medium">Total</p>
        <p className="text-2xl font-bold text-primary">{totalScore}</p>
      </div>

      {/* Multiplicador */}
      {multiplier > 1 && (
        <div className="rounded-xl bg-accent border p-2 text-center shadow-sm animate-scale-in">
          <p className="text-xs text-muted-foreground font-medium">Multiplicador</p>
          <p className="text-xl font-bold text-accent-foreground">{multiplier}x</p>
        </div>
      )}

      {/* Blocos restantes */}
      <div className={`rounded-xl bg-card border p-2 text-center shadow-sm ${multiplier <= 1 ? "col-span-2" : ""}`}>
        <p className="text-xs text-muted-foreground font-medium">Blocos restantes</p>
        <p className="text-xl font-bold text-foreground">{blocksRemaining}</p>
      </div>
    </div>
  );
}
