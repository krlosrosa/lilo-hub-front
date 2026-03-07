import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trophy } from 'lucide-react';
import type { HistoryEntry } from '../hooks/spinGame';

interface SpinHistoryProps {
  history: HistoryEntry[];
}

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'agora mesmo';
  if (mins < 60) return `há ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `há ${hours}h`;
  return `há ${Math.floor(hours / 24)}d`;
}

export function SpinHistory({ history }: SpinHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-sm mx-auto mt-6 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Trophy size={16} className="text-primary" />
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Histórico de Prêmios
        </h3>
      </div>

      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {history.slice(0, 5).map((entry, i) => (
            <motion.div
              key={entry.timestamp}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-glass rounded-2xl flex items-center gap-3 px-4 py-3"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                style={{ background: `${entry.partner.color}25`, border: `1px solid ${entry.partner.color}50` }}
              >
                {entry.partner.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{entry.partner.name}</p>
                <p className="text-xs text-muted-foreground truncate">{entry.partner.prize}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                <Clock size={10} />
                <span>{timeAgo(entry.timestamp)}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
