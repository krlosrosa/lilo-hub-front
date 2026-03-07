"use client";

import { motion } from 'framer-motion';
import { SpinWheel } from '../components/spinWhell';
import { PrizeModal } from '../components/prizzleModal';
import { SpinHistory } from '../components/spinHistory';
import { SpinCounter } from '../components/spinCounter';
import { useSpinGame } from '../hooks/spinGame';
import { Sparkles, Zap } from 'lucide-react';

const MAX_SPINS = 3;

const SpinGameView = () => {
  const {
    spin,
    isSpinning,
    rotation,
    winner,
    showModal,
    closeModal,
    spinsLeft,
    history,
  } = useSpinGame();

  return (
    <div className="min-h-dvh flex flex-col items-center px-4 py-6 relative overflow-hidden">
      {/* Background decorations */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, hsl(270 50% 80%), transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-10%] right-[-15%] w-[60%] h-[60%] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, hsl(35 100% 80%), transparent 70%)' }}
        />
        <div
          className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, hsl(330 80% 85%), transparent 70%)' }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 w-full max-w-sm"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <Sparkles size={18} className="text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Guia Comercial
          </span>
          <Sparkles size={18} className="text-primary" />
        </div>
        <h1 className="text-4xl shimmer-text leading-tight">
          Roleta de Prêmios
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gire e ganhe ofertas exclusivas dos nossos parceiros!
        </p>
      </motion.header>

      {/* Spin counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-5"
      >
        <SpinCounter spinsLeft={spinsLeft} maxSpins={MAX_SPINS} />
      </motion.div>

      {/* Wheel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 180, damping: 18 }}
        className="mb-8 float-anim"
        style={{ width: 340, maxWidth: '92vw' }}
      >
        <SpinWheel rotation={rotation} isSpinning={isSpinning} />
      </motion.div>

      {/* Spin Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mb-4"
      >
        <button
          onClick={spin}
          disabled={spinsLeft === 0 || isSpinning}
          className="spin-button px-10 py-4 rounded-2xl font-extrabold text-lg text-primary-foreground tracking-wide flex items-center gap-2"
        >
          {isSpinning ? (
            <>
              <span className="animate-spin inline-block">🌀</span>
              Girando…
            </>
          ) : spinsLeft === 0 ? (
            <>
              🔒 Sem giros hoje
            </>
          ) : (
            <>
              <Zap size={20} />
              Girar Agora!
            </>
          )}
        </button>
      </motion.div>

      {/* No spins message */}
      {spinsLeft === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground text-center mb-4"
        >
          Você usou todos os giros de hoje. Volte amanhã para mais prêmios! 🌙
        </motion.p>
      )}

      {/* Partners legend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-sm mb-2"
      >
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 text-center">
          Parceiros desta semana
        </p>
        <div className="grid grid-cols-2 gap-2">
          {/* Import partners from data */}
          <PartnersGrid />
        </div>
      </motion.div>

      {/* History */}
      <SpinHistory history={history} />

      {/* Prize Modal */}
      <PrizeModal partner={winner} open={showModal} onClose={closeModal} />
    </div>
  );
};

// Inline partners mini grid
function PartnersGrid() {
  const { partners } = useSpinGame();
  return (
    <>
      {partners.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.04 }}
          className="card-glass rounded-xl flex items-center gap-2 px-3 py-2"
        >
          <span className="text-base">{p.emoji}</span>
          <div className="min-w-0">
            <p className="text-xs font-bold truncate leading-tight">{p.name}</p>
            <p className="text-xs text-muted-foreground truncate leading-tight">{p.prize}</p>
          </div>
          <div
            className="w-1.5 h-1.5 rounded-full shrink-0 ml-auto"
            style={{ background: p.color }}
          />
        </motion.div>
      ))}
    </>
  );
}

export default SpinGameView;
