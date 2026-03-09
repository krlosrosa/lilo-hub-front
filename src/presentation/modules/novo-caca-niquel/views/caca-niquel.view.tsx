"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/presentation/shared/components/ui/card";
import { Button } from "@/presentation/shared/components/ui/button";
import { Badge } from "@/presentation/shared/components/ui/badge";
import { Separator } from "@/presentation/shared/components/ui/separator";
import { useSlotMachine } from "../hooks/use-slot-machine";
import { SlotMachine } from "../components/SlotMachine";
import { ResultadoMensagem } from "../components/ResultadoMensagem";

export default function CacaNiquelView() {
  const {
    creditos,
    isSpinning,
    reels,
    resultado,
    premio,
    podeGirar,
    spin,
    onReelStopped,
    spinId,
    reelStopDelaysMs,
    custoRodada,
  } = useSlotMachine();

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-amber-700/50 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl shadow-amber-950/30">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-center text-2xl font-bold text-amber-100">
            Caça-Níquel
          </CardTitle>
          <CardDescription className="text-center text-amber-200/80">
            Cada rodada custa {custoRodada} créditos. Boa sorte!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="border-amber-500/60 bg-amber-950/50 px-4 py-2 text-lg font-bold text-amber-200"
            >
              {creditos} créditos
            </Badge>
          </div>
          <Separator className="bg-amber-700/40" />
          <SlotMachine
            reels={reels}
            isSpinning={isSpinning}
            spinId={spinId}
            reelStopDelaysMs={reelStopDelaysMs}
            onReelStopped={onReelStopped}
          />
          <ResultadoMensagem
            resultado={resultado}
            premio={premio}
            isSpinning={isSpinning}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-2">
          <Button
            size="lg"
            onClick={spin}
            disabled={!podeGirar}
            className="w-full bg-amber-600 font-bold text-white hover:bg-amber-500 disabled:opacity-50"
          >
            SPIN
          </Button>
          {creditos < custoRodada && creditos > 0 && (
            <p className="text-center text-xs text-amber-200/70">
              Créditos insuficientes para mais uma rodada.
            </p>
          )}
          {creditos === 0 && (
            <p className="text-center text-sm text-amber-300">
              Fim dos créditos. Recarregue a página para jogar novamente.
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
