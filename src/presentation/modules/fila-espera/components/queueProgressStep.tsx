import { motion } from "framer-motion";
import { Check, Clock, UtensilsCrossed, Sparkles } from "lucide-react";

interface Step {
  label: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  { label: "Você entrou na fila", icon: <Clock className="w-4 h-4" /> },
  { label: "Aguardando mesa", icon: <UtensilsCrossed className="w-4 h-4" /> },
  { label: "Preparando sua mesa", icon: <Sparkles className="w-4 h-4" /> },
  { label: "Mesa pronta!", icon: <Check className="w-4 h-4" /> },
];

interface QueueProgressStepperProps {
  currentStep: number; // 0-3
}

const QueueProgressStepper = ({ currentStep }: QueueProgressStepperProps) => {
  return (
    <div className="w-full px-2">
      <div className="flex items-start justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-4 left-[10%] right-[10%] h-0.5 bg-secondary" />
        <motion.div
          className="absolute top-4 left-[10%] h-0.5 bg-primary origin-left"
          initial={{ width: 0 }}
          animate={{
            width: `${Math.min(currentStep / (steps.length - 1), 1) * 80}%`,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div
              key={index}
              className="flex flex-col items-center relative z-10"
              style={{ width: `${100 / steps.length}%` }}
            >
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isActive
                    ? "bg-primary text-primary-foreground ring-4 ring-accent"
                    : "bg-secondary text-muted-foreground"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.icon
                )}
              </motion.div>
              <span
                className={`mt-2 text-xs text-center leading-tight ${
                  isActive
                    ? "text-primary font-semibold"
                    : isCompleted
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QueueProgressStepper;
