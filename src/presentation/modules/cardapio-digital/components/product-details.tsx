import { useState, useEffect } from "react";
  import type { Product } from "../data/mock";
import { useCart } from "../hooks/contexto";
import ProductBadge from "./produto.badge";
import { Drawer, DrawerContent } from "@/presentation/shared/components/ui/drawer";
import { Minus, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function ProductDetailSheet({ product, open, onClose }: Props) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (open && product) {
      queueMicrotask(() => {
        setQuantity(1);
      });
      const defaults: Record<string, string[]> = {};
      queueMicrotask(() => {
        product.options?.forEach(opt => {
          if (opt.required && opt.items.length > 0) {
            defaults[opt.name] = [opt.items[0].id];
          }
        });
        setSelectedOptions(defaults);
      });
    }
  }, [open, product]);

  if (!product) return null;

  const handleOptionSelect = (optName: string, itemId: string, type: 'single' | 'multiple') => {
    setSelectedOptions(prev => {
      if (type === 'single') return { ...prev, [optName]: [itemId] };
      const current = prev[optName] || [];
      return {
        ...prev,
        [optName]: current.includes(itemId)
          ? current.filter(id => id !== itemId)
          : [...current, itemId],
      };
    });
  };

  const calculateTotal = () => {
    let base = product.price;
    if (product.options) {
      for (const opt of product.options) {
        const selected = selectedOptions[opt.name] || [];
        for (const sel of selected) {
          const item = opt.items.find(i => i.id === sel);
          if (item) base += item.price;
        }
      }
    }
    return base * quantity;
  };

  const handleAdd = () => {
    addItem(product, quantity, selectedOptions);
    onClose();
  };

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="bg-card border-border max-h-[90vh] focus:outline-none">
        <div className="overflow-y-auto max-h-[85vh]">
          {/* Image */}
          <div className="relative h-64 sm:h-80">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/60 backdrop-blur-md flex items-center justify-center border border-border/50"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
            {product.badges.length > 0 && (
              <div className="absolute top-4 left-4 flex gap-1.5">
                {product.badges.map(b => <ProductBadge key={b} type={b} />)}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-4 pb-4 -mt-8 relative z-10">
            <h2 className="text-2xl font-display font-bold text-foreground mb-1">{product.name}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {product.longDescription || product.description}
            </p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-2xl font-bold text-primary">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>

            {/* Options */}
            {product.options?.map(opt => (
              <div key={opt.name} className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-foreground">{opt.name}</h3>
                  {opt.required && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/15 text-primary font-semibold">
                      Obrigatório
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {opt.items.map(item => {
                    const isSelected = (selectedOptions[opt.name] || []).includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleOptionSelect(opt.name, item.id, opt.type)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-secondary/50 text-secondary-foreground"
                        }`}
                      >
                        <span>{item.name}</span>
                        {item.price > 0 && (
                          <span className="text-xs text-muted-foreground">
                            + R$ {item.price.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity + Add */}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3 bg-secondary rounded-full px-1 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-full bg-card flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Minus className="w-4 h-4 text-foreground" />
                </button>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={quantity}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="w-6 text-center font-semibold text-foreground"
                  >
                    {quantity}
                  </motion.span>
                </AnimatePresence>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-full bg-card flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Plus className="w-4 h-4 text-foreground" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 bg-gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl shadow-glow active:scale-[0.98] transition-transform text-sm"
              >
                Adicionar • R$ {calculateTotal().toFixed(2).replace('.', ',')}
              </button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
