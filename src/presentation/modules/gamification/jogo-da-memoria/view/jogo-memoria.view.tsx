"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "../context/game-contexto";
import { COMPANIES } from "../data/constants";
import { Progress } from "@/presentation/shared/components/ui/progress";
import { Button } from "@/presentation/shared/components/ui/button";
import { ArrowLeft, Clock, MousePointerClick, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/presentation/shared/components/ui/dialog";

interface Card {
  id: number;
  company: string;
  flipped: boolean;
  matched: boolean;
}

/** Cria e embaralha as cartas */
function createDeck(): Card[] {
  const pairs = COMPANIES.flatMap((c, i) => [
    { id: i * 2, company: c, flipped: false, matched: false },
    { id: i * 2 + 1, company: c, flipped: false, matched: false },
  ]);
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}

/** Emoji para cada empresa */
const EMOJI: Record<string, string> = {
  "Auto Peças Silva": "🚗",
  "Padaria Estrela": "🍰",
  "Farmácia Saúde+": "💊",
  "Pet Shop Amigo": "🐶",
  "Ótica Visão": "👓",
  "Loja TechNow": "📱",
  "Barbearia Classic": "✂️",
  "Açaí da Praça": "🍇",
};

const MemoryGame = () => {
  const router = useRouter();
  const { addMemoryScore } = useGame();

  const [cards, setCards] = useState<Card[]>(createDeck);
  const [selected, setSelected] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lockRef = useRef(false);

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleFlip = useCallback(
    (index: number) => {
      if (lockRef.current || gameOver) return;
      const card = cards[index];
      if (card.flipped || card.matched) return;

      const newCards = [...cards];
      newCards[index] = { ...card, flipped: true };
      const newSelected = [...selected, index];
      setCards(newCards);
      setSelected(newSelected);

      if (newSelected.length === 2) {
        lockRef.current = true;
        setAttempts((a) => a + 1);
        const [first, second] = newSelected;
        if (newCards[first].company === newCards[second].company) {
          // Match!
          setTimeout(() => {
            setCards((prev) => {
              const updated = [...prev];
              updated[first] = { ...updated[first], matched: true };
              updated[second] = { ...updated[second], matched: true };
              return updated;
            });
            setMatchedPairs((p) => p + 1);
            setSelected([]);
            lockRef.current = false;
          }, 400);
        } else {
          // No match
          setTimeout(() => {
            setCards((prev) => {
              const updated = [...prev];
              updated[first] = { ...updated[first], flipped: false };
              updated[second] = { ...updated[second], flipped: false };
              return updated;
            });
            setSelected([]);
            lockRef.current = false;
          }, 1000);
        }
      }
    },
    [cards, selected, gameOver]
  );

  // Check win
  useEffect(() => {
    if (matchedPairs === 8 && !gameOver) {
      if (timerRef.current) clearInterval(timerRef.current);
      const baseScore = 8 * 10; // 80
      const timeBonus = Math.max(0, 60 - time) * 2; // bônus por velocidade
      const finalScore = baseScore + timeBonus;
      setTimeout(() => {
        setScore(finalScore);
      }, 100);
      addMemoryScore(finalScore);
      setTimeout(() => {
        setGameOver(true);
      }, 100);
    }
  }, [matchedPairs, gameOver, time, addMemoryScore]);

  const restart = () => {
    setCards(createDeck());
    setSelected([]);
    setAttempts(0);
    setMatchedPairs(0);
    setTime(0);
    setGameOver(false);
    setScore(0);
    lockRef.current = false;
    timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-background px-4 py-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => router.back()} className="p-2 hover-scale">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Jogo da Memória</h1>
        <button onClick={restart} className="p-2 hover-scale">
          <RotateCcw className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center mb-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" /> {formatTime(time)}
        </span>
        <span className="flex items-center gap-1">
          <MousePointerClick className="w-4 h-4" /> {attempts} tentativas
        </span>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <Progress value={(matchedPairs / 8) * 100} className="h-2" />
        <p className="text-xs text-muted-foreground mt-1 text-center">{matchedPairs}/8 pares</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-2 flex-1 max-w-sm mx-auto w-full">
        {cards.map((card, i) => {
          const isFlipped = card.flipped || card.matched;
          return (
            <button
              key={card.id}
              onClick={() => handleFlip(i)}
              className={`card-flip aspect-square rounded-xl transition-all duration-200 ${
                card.matched
                  ? "ring-2 ring-success bg-success/10"
                  : "active:scale-95"
              }`}
            >
              <div className={`card-flip-inner w-full h-full ${isFlipped ? "flipped" : ""}`}>
                {/* Front (unrevealed) */}
                <div className="card-face w-full h-full rounded-xl bg-primary flex items-center justify-center shadow-md">
                  <span className="text-2xl text-primary-foreground font-bold">?</span>
                </div>
                {/* Back (revealed) */}
                <div className="card-face card-back w-full h-full rounded-xl bg-card border border-border flex flex-col items-center justify-center p-1 shadow-md">
                  <span className="text-2xl mb-1">{EMOJI[card.company] || "🏪"}</span>
                  <span className="text-[9px] font-semibold text-foreground leading-tight text-center">
                    {card.company}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Win modal */}
      <Dialog open={gameOver} onOpenChange={() => {}}>
        <DialogContent className="max-w-xs mx-auto rounded-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl">🎉 Parabéns!</DialogTitle>
            <DialogDescription>Você completou o Jogo da Memória!</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-center py-2">
            <div className="flex justify-between px-4 text-sm">
              <span className="text-muted-foreground">Tempo</span>
              <span className="font-bold text-foreground">{formatTime(time)}</span>
            </div>
            <div className="flex justify-between px-4 text-sm">
              <span className="text-muted-foreground">Tentativas</span>
              <span className="font-bold text-foreground">{attempts}</span>
            </div>
            <div className="flex justify-between px-4 text-sm">
              <span className="text-muted-foreground">Pontuação</span>
              <span className="font-bold text-primary text-lg">{score}</span>
            </div>
          </div>
          <Button onClick={restart} className="w-full h-12 text-base">
            Jogar Novamente
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemoryGame;
