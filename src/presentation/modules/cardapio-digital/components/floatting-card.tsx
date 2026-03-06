import { useCart } from "../hooks/contexto";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onClick: () => void;
}

export default function FloatingCartButton({ onClick }: Props) {
  const { totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-50 max-w-lg mx-auto"
        >
          <button
            onClick={onClick}
            className="w-full flex items-center justify-between bg-gradient-primary text-primary-foreground px-5 py-4 rounded-2xl shadow-glow active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-background text-primary text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              </div>
              <span className="font-semibold text-sm">Ver carrinho</span>
            </div>
            <span className="font-bold text-sm">
              R$ {totalPrice.toFixed(2).replace('.', ',')}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
