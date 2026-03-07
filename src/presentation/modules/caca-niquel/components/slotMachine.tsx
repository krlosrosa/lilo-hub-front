import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { partners, Partner } from "../data/mock";
import SlotReel from "./slotReel";
import SpinButton from "./spinButton";
import ResultModal from "./resultModal";
import AttemptsCounter from "./attempsCounter";
import HistoryList from "./historyList";

const MAX_ATTEMPTS = 20;
const STORAGE_KEY = "gire-ganhe-data";

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.date !== getTodayKey()) return null;
    return data as { date: string; attempts: number; history: number[][] };
  } catch {
    return null;
  }
}

function saveState(attempts: number, history: number[][]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ date: getTodayKey(), attempts, history })
  );
}

function pickResult(): [Partner, Partner, Partner] {
  const rand = Math.random();
  const pick = () => partners[Math.floor(Math.random() * partners.length)];

  if (rand < 0.7) {
    // Win - 10%
    const winner = pick();
    return [winner, winner, winner];
  } else if (rand < 0.9) {
    // Near miss - 20%
    const base = pick();
    let diff = pick();
    while (diff.id === base.id) diff = pick();
    const pos = Math.floor(Math.random() * 3);
    const res = [base, base, base] as [Partner, Partner, Partner];
    res[pos] = diff;
    return res;
  } else {
    // Lose - 70%
    const a = pick();
    const b = pick();
    let c = pick();
    // Ensure not all same
    while (a.id === b.id && b.id === c.id) c = pick();
    return [a, b, c];
  }
}

const SlotMachine = () => {
  const saved = loadState();
  const [attempts, setAttempts] = useState(saved?.attempts ?? 0);
  const [history, setHistory] = useState<[Partner, Partner, Partner][]>(() => {
    if (saved?.history) {
      return saved.history.map(
        (ids) => ids.map((id) => partners.find((p) => p.id === id)!) as [Partner, Partner, Partner]
      );
    }
    return [];
  });

  const [spinning, setSpinning] = useState(false);
  const [results, setResults] = useState<[Partner, Partner, Partner] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState<Partner | null>(null);
  const [reelHighlights, setReelHighlights] = useState([false, false, false]);

  const canSpin = attempts < MAX_ATTEMPTS && !spinning;

  const handleSpin = useCallback(() => {
    if (!canSpin) return;

    // Vibrate on mobile
    if (navigator.vibrate) navigator.vibrate(50);

    setSpinning(true);
    setReelHighlights([false, false, false]);
    setShowModal(false);

    const result = pickResult();
    setResults(result);

    // After all reels stop
    setTimeout(() => {
      setSpinning(false);
      const newAttempts = attempts + 1;
      const newHistory = [result, ...history].slice(0, 10);
      setAttempts(newAttempts);
      setHistory(newHistory);
      saveState(newAttempts, newHistory.map((h) => h.map((p) => p.id)));

      const isWin = result[0].id === result[1].id && result[1].id === result[2].id;
      if (isWin) {
        setWinner(result[0]);
        setReelHighlights([true, true, true]);
      } else {
        setWinner(null);
      }

      setTimeout(() => setShowModal(true), 400);
    }, 2200);
  }, [canSpin, attempts, history]);

  const remaining = MAX_ATTEMPTS - attempts;

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm mx-auto">
      {/* Title */}
      <motion.div
        className="text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl font-display gold-text">🎰 Gire & Ganhe</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ofertas exclusivas dos nossos parceiros
        </p>
      </motion.div>

      {/* Attempts */}
      <AttemptsCounter used={attempts} max={MAX_ATTEMPTS} />

      {/* Slot Machine */}
      <motion.div
        className="casino-card p-4 w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-cols-3 gap-2">
          <SlotReel
            spinning={spinning}
            result={results?.[0] ?? null}
            stopDelay={1200}
            highlight={reelHighlights[0]}
          />
          <SlotReel
            spinning={spinning}
            result={results?.[1] ?? null}
            stopDelay={1600}
            highlight={reelHighlights[1]}
          />
          <SlotReel
            spinning={spinning}
            result={results?.[2] ?? null}
            stopDelay={2000}
            highlight={reelHighlights[2]}
          />
        </div>
      </motion.div>

      {/* Spin Button */}
      <div className="w-full">
        {remaining > 0 ? (
          <SpinButton onClick={handleSpin} disabled={!canSpin} />
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm font-display">
              Suas tentativas acabaram! 😴
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Volte amanhã para mais chances
            </p>
          </div>
        )}
      </div>

      {/* History */}
      <HistoryList history={history} />

      {/* Result Modal */}
      <ResultModal
        open={showModal}
        winner={winner}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default SlotMachine;
