import { motion } from "framer-motion";
import { Professional, professionals } from "@/presentation/modules/agendamento/data/mock";
import { Star, Shuffle } from "lucide-react";

interface ProfessionalPickerProps {
  onSelect: (professional: Professional | null) => void;
}

export default function ProfessionalPicker({ onSelect }: ProfessionalPickerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-3"
    >
      {/* Any professional option */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => onSelect(null)}
        className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border-2 border-primary/20 hover:border-primary hover:shadow-md transition-all text-left group active:scale-[0.98]"
      >
        <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Shuffle className="w-5 h-5 text-primary" />
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            Qualquer profissional
          </h4>
          <p className="text-sm text-muted-foreground">
            Atribuído automaticamente
          </p>
        </div>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.button>

      {/* Individual professionals */}
      {professionals.map((pro, i) => (
        <motion.button
          key={pro.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (i + 1) * 0.05 }}
          onClick={() => onSelect(pro)}
          className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all text-left group active:scale-[0.98]"
        >
          <img
            src={pro.avatar}
            alt={pro.name}
            className="w-12 h-12 rounded-full bg-secondary flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {pro.name}
            </h4>
            <p className="text-sm text-muted-foreground">{pro.specialty}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 fill-warning text-warning" />
              <span className="text-xs font-medium">{pro.rating}</span>
              <span className="text-xs text-muted-foreground">({pro.reviewCount})</span>
            </div>
          </div>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
