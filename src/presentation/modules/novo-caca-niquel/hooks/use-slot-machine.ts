"use client";

import { useState, useCallback, useRef } from "react";
import { getRandomSymbol, type SymbolId } from "../data/symbols";

const CREDITOS_INICIAIS = 100;
const CUSTO_RODADA = 10;
const PREMIO_TRES_IGUAIS = 50;
const PREMIO_DOIS_IGUAIS = 20;

/** Tempos em ms em que cada rolo para (rolo 1, 2, 3). Cria suspense. */
export const REEL_STOP_DELAYS_MS: [number, number, number] = [1500, 2000, 2500];

export type ResultadoRodada = "tres_iguais" | "dois_iguais" | "nenhum";

export interface EstadoSlotMachine {
  creditos: number;
  isSpinning: boolean;
  reels: [SymbolId, SymbolId, SymbolId];
  resultado: ResultadoRodada | null;
  premio: number;
}

const REELS_INICIAIS: [SymbolId, SymbolId, SymbolId] = [
  "cherry",
  "lemon",
  "star",
];

function calcularResultado(
  a: SymbolId,
  b: SymbolId,
  c: SymbolId
): { resultado: ResultadoRodada; premio: number } {
  if (a === b && b === c) {
    return { resultado: "tres_iguais", premio: PREMIO_TRES_IGUAIS };
  }
  if (a === b || a === c || b === c) {
    return { resultado: "dois_iguais", premio: PREMIO_DOIS_IGUAIS };
  }
  return { resultado: "nenhum", premio: 0 };
}

export function useSlotMachine() {
  const [creditos, setCreditos] = useState(CREDITOS_INICIAIS);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState<[SymbolId, SymbolId, SymbolId]>(
    REELS_INICIAIS
  );
  const [resultado, setResultado] = useState<ResultadoRodada | null>(null);
  const [premio, setPremio] = useState(0);

  const [spinId, setSpinId] = useState(0);
  const reelsStoppedCount = useRef(0);
  const spinResultRef = useRef<{
    reels: [SymbolId, SymbolId, SymbolId];
  } | null>(null);

  const podeGirar = creditos >= CUSTO_RODADA && !isSpinning;

  const onReelStopped = useCallback((_index: 0 | 1 | 2) => {
    reelsStoppedCount.current += 1;
    if (reelsStoppedCount.current === 3 && spinResultRef.current) {
      const { reels: finalReels } = spinResultRef.current;
      const { resultado: res, premio: p } = calcularResultado(
        finalReels[0],
        finalReels[1],
        finalReels[2]
      );
      setResultado(res);
      setPremio(p);
      setCreditos((c) => c + p);
      setIsSpinning(false);
      spinResultRef.current = null;
      reelsStoppedCount.current = 0;
    }
  }, []);

  const spin = useCallback(() => {
    if (!podeGirar) return;

    setCreditos((c) => c - CUSTO_RODADA);
    setIsSpinning(true);
    setResultado(null);
    setPremio(0);
    setSpinId((id) => id + 1);
    reelsStoppedCount.current = 0;

    const novosReels: [SymbolId, SymbolId, SymbolId] = [
      getRandomSymbol().id,
      getRandomSymbol().id,
      getRandomSymbol().id,
    ];

    spinResultRef.current = { reels: novosReels };
    setReels(novosReels);
  }, [podeGirar, onReelStopped]);

  return {
    creditos,
    isSpinning,
    reels,
    resultado,
    premio,
    podeGirar,
    spin,
    onReelStopped,
    spinId,
    reelStopDelaysMs: REEL_STOP_DELAYS_MS,
    custoRodada: CUSTO_RODADA,
    creditosIniciais: CREDITOS_INICIAIS,
  };
}
