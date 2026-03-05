'use client';
import { useCallback, useState } from "react";
import { ScratchCanvas } from "../components/scratch-canvas";
import { ScratchResult } from "../types/scratch.type";
import { useStrech } from "../hooks/useStrech.hook";
import { ResultModal } from "../components/resultado-modal";

export default function RaspadinhaView() {

  const { scratch } = useStrech();
  const [result, setResult] = useState<ScratchResult | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [scratched, setScratched] = useState(false);

  const handleComplete = useCallback(() => {
    if (scratched) return;
    setScratched(true);
    const res = scratch();
    if (res) {
      setResult(res);
      setModalOpen(true);
    }
  }, [scratch, scratched]);

  return (
    <div className="flex flex-col items-center justify-center h-screen m-8">
      <div className="relative mx-auto overflow-hidden rounded-2xl border-2 border-primary/30 shadow-lg"
        style={{ aspectRatio: '3/2', maxWidth: 420 }}>
        {/* Prize content behind the scratch layer */}
        <div className="absolute inset-0 flex items-center justify-center bg-card">
          {scratched && result ? (
            result.won ? (
              <div className="text-center space-y-2">
                <p className="text-4xl">🎉</p>
                <p className="text-lg font-bold text-foreground">{result.prizeName}</p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <p className="text-4xl">😢</p>
                <p className="text-lg font-bold text-muted-foreground">Tente novamente!</p>
              </div>
            )
          ) : (
            <div className="text-center space-y-2">
              <p className="text-4xl">🎁</p>
              <p className="text-sm text-muted-foreground">Raspe para descobrir!</p>
            </div>
          )}
        </div>
      </div>
      <ScratchCanvas
        width={420}
        height={280}
        onComplete={handleComplete}
      />
       <ResultModal result={result} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}