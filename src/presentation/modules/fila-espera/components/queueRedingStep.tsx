import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

const QueueReadyState = () => {
  return (
    <motion.div
      className="flex flex-col items-center text-center py-8 px-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <motion.div
        className="w-20 h-20 rounded-full bg-success flex items-center justify-center mb-5"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <PartyPopper className="w-10 h-10 text-success-foreground" />
      </motion.div>

      <h2 className="text-2xl font-display font-bold text-foreground mb-2">
        Sua mesa está pronta!
      </h2>
      <p className="text-muted-foreground text-base max-w-xs">
        Dirija-se ao balcão de atendimento e apresente esta tela ao nosso atendente.
      </p>

      <motion.div
        className="mt-6 px-6 py-3 rounded-xl bg-success text-success-foreground font-semibold text-lg shadow-elevated"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Mesa nº 12
      </motion.div>
    </motion.div>
  );
};

export default QueueReadyState;
