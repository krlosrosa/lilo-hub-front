"use client";

import { cn } from "@/presentation/shared/lib/utils";
import { Badge } from "@/presentation/shared/components/ui/badge";
import type { ResultadoRodada } from "../hooks/use-slot-machine";

interface ResultadoMensagemProps {
  resultado: ResultadoRodada | null;
  premio: number;
  isSpinning: boolean;
  className?: string;
}

const MENSAGENS: Record<ResultadoRodada, string> = {
  tres_iguais: "Três iguais! Grande premiação!",
  dois_iguais: "Dois iguais! Você ganhou!",
  nenhum: "Tente novamente!",
};

export function ResultadoMensagem({
  resultado,
  premio,
  isSpinning,
  className,
}: ResultadoMensagemProps) {
  if (isSpinning) {
    return (
      <p
        className={cn(
          "text-center text-sm font-medium text-amber-200/90",
          className
        )}
      >
        Girando...
      </p>
    );
  }

  if (resultado === null) {
    return (
      <p
        className={cn(
          "text-center text-sm font-medium text-amber-200/70",
          className
        )}
      >
        Clique em SPIN para jogar
      </p>
    );
  }

  const isWin = resultado !== "nenhum";

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <p
        className={cn(
          "text-center text-sm font-semibold",
          isWin ? "text-emerald-300" : "text-amber-200/90"
        )}
      >
        {MENSAGENS[resultado]}
      </p>
      {premio > 0 && (
        <Badge
          variant="secondary"
          className="bg-emerald-600/80 text-white hover:bg-emerald-600/80"
        >
          +{premio} créditos
        </Badge>
      )}
    </div>
  );
}
