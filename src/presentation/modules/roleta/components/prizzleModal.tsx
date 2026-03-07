import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { Partner } from '../data/mock';
import { TIER_LABELS, TIER_COLORS } from '../data/mock';
import { X, Gift } from 'lucide-react';

interface PrizeModalProps {
  partner: Partner | null;
  open: boolean;
  onClose: () => void;
}

export function PrizeModal({ partner, open, onClose }: PrizeModalProps) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (open && partner && !firedRef.current) {
      firedRef.current = true;
      const isEpic = partner.tier === 'epic';

      // Confetti burst
      const burst = () => {
        confetti({
          particleCount: isEpic ? 180 : 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FF6B35', '#9B59B6', '#4ECDC4', '#FF69B4'],
          scalar: isEpic ? 1.3 : 1,
        });
        if (isEpic) {
          setTimeout(() => {
            confetti({
              particleCount: 80,
              angle: 60,
              spread: 55,
              origin: { x: 0, y: 0.7 },
              colors: ['#FFD700', '#FF6B35'],
            });
            confetti({
              particleCount: 80,
              angle: 120,
              spread: 55,
              origin: { x: 1, y: 0.7 },
              colors: ['#9B59B6', '#4ECDC4'],
            });
          }, 250);
        }
      };
      burst();
    }
    if (!open) firedRef.current = false;
  }, [open, partner]);

  return (
    <AnimatePresence>
      {open && partner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.7, y: 80, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 60, opacity: 0 }}
            transition={{ type: 'spring', damping: 18, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-sm overflow-hidden border border-border shadow-elevated"
          >
            {/* Header */}
            <div
              className="relative flex flex-col items-center pt-8 pb-6 px-6"
              style={{
                background: `linear-gradient(135deg, ${partner.color}15, ${partner.color}30)`,
                borderBottom: `2px solid ${partner.color}40`,
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>

              {/* Tier badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                className="mb-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  background: `${TIER_COLORS[partner.tier]}22`,
                  border: `1px solid ${TIER_COLORS[partner.tier]}`,
                  color: TIER_COLORS[partner.tier],
                }}
              >
                {TIER_LABELS[partner.tier]}
              </motion.div>

              {/* Emoji */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 250 }}
                className="text-6xl mb-3 prize-badge"
              >
                {partner.emoji}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-center text-foreground"
              >
                Parabéns! 🎉
              </motion.h2>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-4 bg-white">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-muted-foreground text-sm">Você ganhou uma oferta de</p>
                <h3 className="text-xl font-extrabold mt-0.5 text-foreground" style={{ color: partner.color }}>
                  {partner.name}
                </h3>
                <span className="text-xs text-muted-foreground">{partner.category}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="rounded-2xl p-4 text-center"
                style={{
                  background: `${partner.color}18`,
                  border: `2px solid ${partner.color}55`,
                }}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Gift size={16} style={{ color: partner.color }} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Seu Prêmio
                  </span>
                </div>
                <p className="text-lg font-extrabold text-foreground" style={{ color: partner.color }}>
                  {partner.prize}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{partner.description}</p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="text-xs text-center text-muted-foreground"
              >
                Apresente este cupom no estabelecimento para resgatar.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={onClose}
                className="spin-button w-full py-3.5 rounded-2xl font-extrabold text-primary-foreground text-base tracking-wide"
              >
                Resgatar Prêmio 🎁
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
