"use client";
import { useState, useCallback } from "react";
import { BingoCell } from "./bingo-cell";
import type { BingoCell as BingoCellType, VictoryType } from "./bingo-cell";

interface Props {
  board: BingoCellType[];
  isReleased: (word: string) => boolean;
  markCell: (index: number) => { success: boolean; victoryType: VictoryType };
}

export function BingoCard({ board, isReleased, markCell }: Props) {
  const [justMarked, setJustMarked] = useState<number | null>(null);

  const handleMark = useCallback(
    (index: number) => {
      const cell = board[index];
      if (cell.marked) return;
      if (!isReleased(cell.word)) {
        return;
      }
      const result = markCell(index);
      if (result.success) {
        setJustMarked(index);
        setTimeout(() => setJustMarked(null), 500);
      }
    },
    [board, isReleased, markCell]
  );

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-sm mx-auto">
      {board.map((cell) => (
        <BingoCell
          key={cell.index}
          cell={cell}
          released={isReleased(cell.word)}
          onMark={handleMark}
          justMarked={justMarked === cell.index}
        />
      ))}
    </div>
  );
}
