"use client";

import { cn } from "@/presentation/shared/lib/utils";
import type { SymbolId } from "../data/symbols";
import { SlotReel } from "./SlotReel";

interface SlotMachineProps {
  reels: [SymbolId, SymbolId, SymbolId];
  isSpinning: boolean;
  spinId: number;
  reelStopDelaysMs: [number, number, number];
  onReelStopped: (index: 0 | 1 | 2) => void;
  className?: string;
}

export function SlotMachine({
  reels,
  isSpinning,
  spinId,
  reelStopDelaysMs,
  onReelStopped,
  className,
}: SlotMachineProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-amber-950/90 to-amber-950 p-4 shadow-lg ring-2 ring-amber-500/30 sm:gap-4 sm:p-6",
        className
      )}
    >
      <SlotReel
        finalSymbolId={reels[0]}
        isSpinning={isSpinning}
        stopDelayMs={reelStopDelaysMs[0]}
        onStopped={() => onReelStopped(0)}
        spinId={spinId}
      />
      <SlotReel
        finalSymbolId={reels[1]}
        isSpinning={isSpinning}
        stopDelayMs={reelStopDelaysMs[1]}
        onStopped={() => onReelStopped(1)}
        spinId={spinId}
      />
      <SlotReel
        finalSymbolId={reels[2]}
        isSpinning={isSpinning}
        stopDelayMs={reelStopDelaysMs[2]}
        onStopped={() => onReelStopped(2)}
        spinId={spinId}
      />
    </div>
  );
}
