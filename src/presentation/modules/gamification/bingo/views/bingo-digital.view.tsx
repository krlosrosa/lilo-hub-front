"use client";
import { BarraProgressaoBingo } from "../components/barra-progressao-bingo";
import { BingoCard } from "../components/bingo-card";
import { BingoRanking } from "../components/bingo-ranking";

export default function BingoDigitalView() {

  return (
    <div className="min-h-screen bg-background px-4 py-6 flex flex-col items-center gap-5 lg:flex-row lg:items-start lg:justify-center lg:gap-10 lg:py-10">
      {/* Left / Main */}
      <div className="flex flex-col items-center gap-5 w-full max-w-sm">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight text-center">
          🎯 Bingo Digital
        </h1>
        <BarraProgressaoBingo marked={10} total={16} />
        <BingoCard
          board={[
            { word: "Palavra 1", marked: true, index: 0 },
            { word: "Palavra 2", marked: false, index: 1 },
            { word: "Palavra 3", marked: true, index: 2 },
            { word: "Palavra 4", marked: false, index: 3 },
            { word: "Palavra 5", marked: true, index: 4 },
            { word: "Palavra 6", marked: true, index: 5 },
            { word: "Palavra 7", marked: false, index: 6 },
            { word: "Palavra 8", marked: false, index: 7 },
            { word: "Palavra 9", marked: true, index: 8 },
            { word: "Palavra 10", marked: true, index: 9 },
            { word: "Palavra 11", marked: true, index: 10 },
            { word: "Palavra 12", marked: false, index: 11 },
            { word: "Palavra 13", marked: false, index: 12 },
            { word: "Palavra 14", marked: false, index: 13 },
            { word: "Palavra 15", marked: false, index: 14 },
            { word: "Palavra 16", marked: false, index: 15 },
          ]}
          isReleased={() => false}
          markCell={() => ({ success: false, victoryType: null })}
        />
      </div>
    </div>
  )
}