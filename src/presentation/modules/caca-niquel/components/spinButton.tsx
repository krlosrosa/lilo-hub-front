import { motion } from "framer-motion";

interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const SpinButton = ({ onClick, disabled }: SpinButtonProps) => {
  return (
    <motion.button
      className="spin-button w-full py-4 text-xl font-display tracking-wide"
      onClick={onClick}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      whileHover={!disabled ? { scale: 1.02 } : {}}
    >
      {disabled ? "Girando..." : "🎰 Girar"}
    </motion.button>
  );
};

export default SpinButton;
