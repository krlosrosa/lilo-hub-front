import type { Product } from "../data/mock";
import ProductBadge from "./produto.badge";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  product: Product;
  onSelect: (product: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onSelect, index = 0 }: Props) {
  const hasPromo = product.originalPrice && product.originalPrice > product.price;

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onClick={() => onSelect(product)}
      className="w-full flex gap-3 p-3 rounded-xl bg-card border border-border/50 text-left transition-all duration-200 active:scale-[0.98] hover:border-primary/30 group"
    >
      {/* Image */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {product.badges.length > 0 && (
          <div className="absolute top-1 left-1 rounded-md bg-background/95 backdrop-blur-sm shadow-sm">
            <ProductBadge type={product.badges[0]} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <h3 className="font-semibold text-foreground text-sm leading-tight mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        <div className="flex items-end justify-between mt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-primary">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            {hasPromo && (
              <span className="text-xs text-muted-foreground line-through">
                R$ {product.originalPrice!.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow transition-transform active:scale-90">
            <Plus className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
