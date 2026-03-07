import { useState, useCallback, useEffect } from 'react';
import { partners, pickWeightedWinner, type Partner } from '../data/mock';

const STORAGE_KEY_SPINS = 'roulette_spins';
const STORAGE_KEY_HISTORY = 'roulette_history';
const MAX_SPINS = 10;
const SEGMENTS = partners.length;
const SEGMENT_ANGLE = 360 / SEGMENTS;

export interface HistoryEntry {
  partner: Partner;
  timestamp: number;
}

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function getSpinsUsed(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SPINS);
    if (!raw) return 0;
    const data = JSON.parse(raw);
    if (data.date !== getTodayKey()) return 0;
    return data.count || 0;
  } catch {
    return 0;
  }
}

function setSpinsUsed(count: number) {
  localStorage.setItem(
    STORAGE_KEY_SPINS,
    JSON.stringify({ date: getTodayKey(), count })
  );
}

function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addToHistory(entry: HistoryEntry) {
  const history = getHistory();
  const updated = [entry, ...history].slice(0, 10);
  localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
  return updated;
}

export function useSpinGame() {
  const [spinsUsed, setSpinsUsedState] = useState(getSpinsUsed);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [winner, setWinner] = useState<Partner | null>(null);
  const [showModal, setShowModal] = useState(false);

  const spinsLeft = MAX_SPINS - spinsUsed;
  const canSpin = spinsLeft > 0 && !isSpinning;

  const spin = useCallback(() => {
    if (!canSpin) return;

    const picked = pickWeightedWinner();
    const winnerIndex = partners.findIndex((p) => p.id === picked.id);

    // Queremos o ponteiro (topo) apontando para o centro do segmento vencedor.
    // Segmento 0 começa no topo; rotação CSS em graus = sentido horário.
    // Para o segmento "winnerIndex" ficar no topo: rotação final (mod 360) = 360 - segmentCenter.
    const segmentCenter = winnerIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const baseSpins = 5 + Math.floor(Math.random() * 3); // 5–7 voltas completas
    // Ajuste a partir da rotação atual para que (currentRotation + targetAngle) % 360 = 360 - segmentCenter
    const delta = (360 - segmentCenter - (currentRotation % 360) + 360) % 360;
    const targetAngle = baseSpins * 360 + delta;

    const newRotation = currentRotation + targetAngle;

    setIsSpinning(true);
    setWinner(null);
    setRotation(newRotation);

    // After animation ends (~5s), reveal winner
    setTimeout(() => {
      setCurrentRotation(newRotation % 360);
      setIsSpinning(false);
      setWinner(picked);
      setShowModal(true);

      const count = spinsUsed + 1;
      setSpinsUsed(count);
      setSpinsUsedState(count);

      const entry: HistoryEntry = { partner: picked, timestamp: Date.now() };
      const updated = addToHistory(entry);
      setHistory(updated);
    }, 5200);
  }, [canSpin, currentRotation, spinsUsed]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // Carrega spins usados do storage na montagem
  useEffect(() => {
    const stored = getSpinsUsed();
    queueMicrotask(() => setSpinsUsedState(stored));
  }, []);

  return {
    spin,
    isSpinning,
    rotation,
    winner,
    showModal,
    closeModal,
    spinsLeft,
    spinsUsed,
    history,
    partners,
  };
}
