import { motion, AnimatePresence } from "framer-motion";
import { Partner } from "../data/mock";
import { useEffect, useState } from "react";

interface ResultModalProps {
  open: boolean;
  winner: Partner | null;
  onClose: () => void;
}

const PIECES = 30;
const colors = ["#f59e0b", "#ec4899", "#8b5cf6", "#10b981", "#3b82f6"];

/** Valores aleatórios gerados uma vez no carregamento do módulo (fora do render). */
const CONFETTI_SEEDS = Array.from({ length: PIECES }, () => ({
  left: Math.random() * 100,
  yEnd: 500 + Math.random() * 200,
  xEnd: (Math.random() - 0.5) * 200,
  rotateEnd: Math.random() * 720,
  duration: 2 + Math.random(),
  delay: Math.random() * 0.5,
}));

const Confetti = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {CONFETTI_SEEDS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: colors[i % colors.length],
            left: `${s.left}%`,
            top: -10,
          }}
          animate={{
            y: [0, s.yEnd],
            x: [0, s.xEnd],
            rotate: [0, s.rotateEnd],
            opacity: [1, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

const ResultModal = ({ open, winner, onClose }: ResultModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open && winner) {
      queueMicrotask(() => setShowConfetti(true));
      if (navigator.vibrate) navigator.vibrate([100, 50, 200]);
    } else {
      queueMicrotask(() => setShowConfetti(false));
    }
  }, [open, winner]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
          {showConfetti && <Confetti />}
          <motion.div
            className="casino-card relative z-10 p-6 max-w-sm w-full text-center"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {winner ? (
              <>
                <motion.div
                  className="text-5xl mb-3"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  🎉
                </motion.div>
                <h2 className="text-2xl font-display gold-text mb-2">Parabéns!</h2>
                <p className="text-foreground/80 mb-4">
                  Você ganhou uma oferta da
                </p>
                <div className="casino-card p-4 mb-4 border-primary/30">
                  <span className="text-4xl">{winner.icon}</span>
                  <p className="font-display text-lg text-foreground mt-1">{winner.name}</p>
                </div>
                <div className="bg-muted rounded-xl p-3 mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Cupom:</p>
                  <p className="font-semibold text-primary text-sm">{winner.prize}</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-4xl mb-3">😅</div>
                <h2 className="text-xl font-display text-foreground mb-2">Quase!</h2>
                <p className="text-foreground/70 text-sm">
                  Tente novamente para ganhar ofertas dos nossos parceiros.
                </p>
              </>
            )}
            <button
              className="spin-button w-full py-3 mt-2 text-base font-display"
              onClick={onClose}
            >
              {winner ? "Coletar Oferta" : "Tentar Novamente"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;
