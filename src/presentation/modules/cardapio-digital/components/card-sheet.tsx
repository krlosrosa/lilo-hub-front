import { useCart } from "@/presentation/modules/cardapio-digital/hooks/contexto";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/presentation/shared/components/ui/drawer";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartSheet({ open, onClose }: Props) {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();

  const handleCheckout = () => {;
    clearCart();
    onClose();
  };

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="bg-card border-border max-h-[85vh] focus:outline-none">
        <DrawerHeader className="border-b border-border pb-3">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-foreground font-display text-xl flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              Seu Pedido
            </DrawerTitle>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-destructive font-medium px-2 py-1 rounded-md active:bg-destructive/10 transition-colors"
              >
                Limpar
              </button>
            )}
          </div>
        </DrawerHeader>

        <div className="overflow-y-auto flex-1 px-4 py-3 max-h-[50vh]">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Seu carrinho está vazio</p>
              <p className="text-muted-foreground/60 text-xs mt-1">Adicione itens do cardápio</p>
            </div>
          ) : (
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="flex gap-3 py-3 border-b border-border/50 last:border-0"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground line-clamp-1">{item.product.name}</h4>
                    <p className="text-xs text-primary font-semibold mt-0.5">
                      R$ {item.totalPrice.toFixed(2).replace('.', ',')}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform"
                      >
                        <Minus className="w-3 h-3 text-foreground" />
                      </button>
                      <span className="text-sm font-medium text-foreground w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform"
                      >
                        <Plus className="w-3 h-3 text-foreground" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto w-7 h-7 rounded-full flex items-center justify-center text-destructive active:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-4 pb-6 pt-3 border-t border-border space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="text-lg font-bold text-foreground">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-primary text-primary-foreground font-semibold py-4 rounded-xl shadow-glow active:scale-[0.98] transition-transform text-base"
            >
              Finalizar Pedido
            </button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
