"use client";
import { Button } from "@/presentation/shared/components/ui/button";
import { BarraRiscoCampoMinado } from "../components/barra-de-risco-campo-minado";
import { CampoMinadoGameBoard } from "../components/game-board";
import { ScorePainelCampoMinado } from "../components/score-painel-campo-minado";

export default function CampoMinadoView() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-extrabold text-foreground mb-1 tracking-tight">
        💣 Campo Minado do Comércio
      </h1>
      <p className="text-sm text-muted-foreground mb-5">Abra blocos, acumule pontos e não exploda!</p>
      <ScorePainelCampoMinado 
        roundScore={10} 
        totalScore={100} 
        multiplier={1} blocksRemaining={10} 
      />
      <BarraRiscoCampoMinado riskPercent={10} />
      <CampoMinadoGameBoard blocks={[
        { id: 1, type: "bomb", value: 10, revealed: false },
        { id: 2, type: "points", value: 10, revealed: false },
        { id: 3, type: "bonus", value: 10, revealed: false },
        { id: 4, type: "bomb", value: 10, revealed: false },
        { id: 5, type: "points", value: 10, revealed: false },
        { id: 6, type: "bonus", value: 10, revealed: false },
        { id: 7, type: "bomb", value: 10, revealed: false },
        { id: 8, type: "points", value: 10, revealed: false },
        { id: 9, type: "bomb", value: 10, revealed: false },
        { id: 10, type: "points", value: 10, revealed: false },
        { id: 11, type: "bonus", value: 10, revealed: false },
        { id: 12, type: "bomb", value: 10, revealed: false },
        { id: 13, type: "points", value: 10, revealed: false },
        { id: 14, type: "bonus", value: 10, revealed: false },
        { id: 15, type: "bomb", value: 10, revealed: false },
        { id: 16, type: "points", value: 10, revealed: false },
        { id: 17, type: "bomb", value: 10, revealed: false },
        { id: 18, type: "points", value: 10, revealed: false },
        { id: 19, type: "bonus", value: 10, revealed: false },
        { id: 20, type: "bomb", value: 10, revealed: false },
      ]} onReveal={() => {}} disabled={false} />

      {/* Botões de ação */}
      <div className="flex gap-3 mt-5 w-full max-w-sm">
          <Button
            onClick={() => {}}
            size="lg"
            className="flex-1 text-base bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/90 text-[hsl(var(--success-foreground))]"
            disabled={false}
          >
            ✅ Parar e Garantir
          </Button>
      </div>
    </div>
  )
}