import { useState, useRef, useEffect } from "react";
import { products } from "../data/mock";
import type { Product } from "../data/mock";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (product: Product) => void;
}

export default function SearchOverlay({ open, onClose, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    queueMicrotask(() => setQuery(""));
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, [open]);

  const filtered = query.length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
        >
          <div className="px-4 pt-4">
            <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-3 py-2">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar no cardápio..."
                className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
              />
              <button onClick={onClose} className="p-1">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="mt-4 space-y-2 max-h-[75vh] overflow-y-auto">
              {filtered.map(product => (
                <button
                  key={product.id}
                  onClick={() => { onSelect(product); onClose(); }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 text-left active:scale-[0.98] transition-transform"
                >
                  <img src={product.image} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground line-clamp-1">{product.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
                    <p className="text-sm font-bold text-primary mt-0.5">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </button>
              ))}
              {query.length > 1 && filtered.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-8">
                  Nenhum produto encontrado
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
