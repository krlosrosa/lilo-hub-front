"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/presentation/shared/lib/utils";
import {
  getSymbolById,
  getRandomSymbol,
  type SymbolId,
} from "../data/symbols";

const CELL_HEIGHT_PX = 80;
const STRIP_LENGTH = 100;
const STOP_INDEX = 80;
const OVERSHOOT_SYMBOLS = 18;
const SETTLE_DURATION_S = 0.25;

interface SlotReelProps {
  /** Símbolo final (só revelado quando o rolo parar). */
  finalSymbolId: SymbolId;
  isSpinning: boolean;
  /** Atraso em ms até este rolo parar. */
  stopDelayMs: number;
  /** Chamado quando a animação deste rolo termina. */
  onStopped: () => void;
  /** Id da rodada; usado para construir a tira uma vez por spin. */
  spinId: number;
  className?: string;
}

function buildStrip(finalSymbolId: SymbolId): SymbolId[] {
  const strip: SymbolId[] = [];
  for (let i = 0; i < STRIP_LENGTH; i++) {
    strip.push(i === STOP_INDEX ? finalSymbolId : getRandomSymbol().id);
  }
  return strip;
}

export function SlotReel({
  finalSymbolId,
  isSpinning,
  stopDelayMs,
  onStopped,
  spinId,
  className,
}: SlotReelProps) {
  const strip = useMemo(
    () => (isSpinning ? buildStrip(finalSymbolId) : []),
    [spinId, finalSymbolId, isSpinning]
  );

  useEffect(() => {
    if (!isSpinning) return;
    const t = setTimeout(onStopped, stopDelayMs);
    return () => clearTimeout(t);
  }, [isSpinning, stopDelayMs, onStopped]);

  const durationTotalS = stopDelayMs / 1000;
  const phase1End = (durationTotalS - SETTLE_DURATION_S) / durationTotalS;

  const keyframes = useMemo(() => {
    const overshootY = -(STOP_INDEX + OVERSHOOT_SYMBOLS) * CELL_HEIGHT_PX;
    const finalY = -STOP_INDEX * CELL_HEIGHT_PX;
    return [0, overshootY, finalY];
  }, []);

  const transition = useMemo(
    () => ({
      duration: durationTotalS,
      times: [0, phase1End, 1] as const,
      ease: ["linear", "linear", "easeOut"] as const,
    }),
    [durationTotalS, phase1End]
  );

  if (!isSpinning) {
    const symbol = getSymbolById(finalSymbolId);
    return (
      <div
        className={cn(
          "relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-amber-600/60 bg-gradient-to-b from-amber-900/80 to-amber-950 shadow-inner sm:h-24 sm:w-24",
          className
        )}
      >
        <span className="text-4xl sm:text-5xl">{symbol.emoji}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 border-amber-600/60 bg-gradient-to-b from-amber-900/80 to-amber-950 shadow-inner sm:h-24 sm:w-24",
        className
      )}
    >
      <motion.div
        className="flex flex-col"
        style={{ height: STRIP_LENGTH * CELL_HEIGHT_PX }}
        initial={{ translateY: 0 }}
        animate={{ translateY: keyframes }}
        transition={transition}
      >
        {strip.map((id, i) => {
          const sym = getSymbolById(id);
          return (
            <div
              key={`${i}-${id}`}
              className="flex h-20 w-20 flex-shrink-0 items-center justify-center sm:h-24 sm:w-24"
              style={{ height: CELL_HEIGHT_PX, minHeight: CELL_HEIGHT_PX }}
            >
              <span className="text-4xl sm:text-5xl">{sym.emoji}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
