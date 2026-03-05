"use client";
import { GameProvider } from "@/presentation/modules/gamification/jogo-da-memoria/context/game-contexto";
import JogoMemoriaView from "@/presentation/modules/gamification/jogo-da-memoria/view/jogo-memoria.view";

export default function JogoMemoriaPage() {
  return (
    <GameProvider>
      <JogoMemoriaView />
    </GameProvider>
  )
}