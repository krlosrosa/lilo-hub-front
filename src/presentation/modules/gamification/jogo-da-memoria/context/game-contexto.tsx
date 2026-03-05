import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { FAKE_PLAYERS } from "../data/constants";

interface RankedPlayer {
  name: string;
  score: number;
}

interface GameState {
  totalScore: number;
  memoryScore: number;
  quizScore: number;
  ranking: RankedPlayer[];
  addMemoryScore: (points: number) => void;
  addQuizScore: (points: number) => void;
  resetAll: () => void;
}

const GameContext = createContext<GameState | null>(null);

/** Gera ranking combinando jogadores fictícios + "Você" */
function buildRanking(playerScore: number): RankedPlayer[] {
  const players: RankedPlayer[] = FAKE_PLAYERS.map((p) => ({
    name: p.name,
    score: p.baseScore + Math.floor(Math.random() * 20),
  }));
  players.push({ name: "Você", score: playerScore });
  players.sort((a, b) => b.score - a.score);
  return players;
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [memoryScore, setMemoryScore] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [fakeScores] = useState(() =>
    FAKE_PLAYERS.map((p) => ({
      name: p.name,
      score: p.baseScore + Math.floor(Math.random() * 20),
    }))
  );

  const totalScore = memoryScore + quizScore;

  const ranking = [...fakeScores, { name: "Você", score: totalScore }].sort(
    (a, b) => b.score - a.score
  );

  const addMemoryScore = useCallback((points: number) => {
    setMemoryScore((prev) => prev + points);
  }, []);

  const addQuizScore = useCallback((points: number) => {
    setQuizScore((prev) => prev + points);
  }, []);

  const resetAll = useCallback(() => {
    setMemoryScore(0);
    setQuizScore(0);
  }, []);

  return (
    <GameContext.Provider
      value={{ totalScore, memoryScore, quizScore, ranking, addMemoryScore, addQuizScore, resetAll }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be inside GameProvider");
  return ctx;
}
