"use client";
import { GameProvider } from "@/presentation/modules/gamification/jogo-da-memoria/context/game-contexto";
import PerguntaRelampagoView from "@/presentation/modules/gamification/perguntas-relampago/views/pergunta-relampago.view";

export default function PerguntaRelampagoPage() {
  return <GameProvider><PerguntaRelampagoView /></GameProvider>;
}
