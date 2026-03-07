import { motion } from 'framer-motion';
import { Flame, RotateCcw } from 'lucide-react';

interface SpinCounterProps {
  spinsLeft: number;
  maxSpins: number;
}

export function SpinCounter({ spinsLeft, maxSpins }: SpinCounterProps) {
  const isLow = spinsLeft <= 1;

  return (
    <motion.div
      className="flex items-center justify-center gap-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-2">
        {Array.from({ length: maxSpins }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              background:
                i < spinsLeft
                  ? 'linear-gradient(135deg, hsl(42 100% 54%), hsl(35 100% 46%))'
                  : 'hsl(240 15% 22%)',
              border: i < spinsLeft ? '2px solid hsl(42 100% 70%)' : '2px solid hsl(240 15% 30%)',
              boxShadow: i < spinsLeft ? '0 0 12px hsl(42 100% 54% / 0.5)' : 'none',
            }}
          >
            {i < spinsLeft ? (
              <Flame size={12} className="text-primary-foreground" />
            ) : (
              <RotateCcw size={11} className="text-muted-foreground" />
            )}
          </motion.div>
        ))}
      </div>

      <p className="text-sm font-bold">
        {spinsLeft > 0 ? (
          <span style={{ color: isLow ? 'hsl(330 100% 60%)' : 'hsl(42 100% 54%)' }}>
            {spinsLeft} giro{spinsLeft !== 1 ? 's' : ''} restante{spinsLeft !== 1 ? 's' : ''}
          </span>
        ) : (
          <span className="text-muted-foreground">Volte amanhã!</span>
        )}
      </p>
    </motion.div>
  );
}
