import { products } from "../data/mock";
import type { Product } from "../data/mock";
import ProductBadge from "./produto.badge";
import { motion } from "framer-motion";

interface Props {
  onSelect: (product: Product) => void;
} 

export default function FeaturedCarousel({ onSelect }: Props) {
  const featured = products.filter(p => p.featured);

  return (
    <div className="py-4">
      <div className="px-4 mb-3">
        <h2 className="text-lg font-display font-semibold text-foreground">✨ Destaques</h2>
      </div>
      <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide pb-2">
        {featured.map((product, i) => (
          <motion.button
            key={product.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            onClick={() => onSelect(product)}
            className="flex-shrink-0 w-44 sm:w-52 group text-left"
          >
            <div className="relative rounded-xl overflow-hidden h-36 sm:h-44 mb-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              {product.badges.length > 0 && (
                <div className="absolute top-2 left-2 rounded-md bg-background/95 backdrop-blur-sm shadow-sm">
                  <ProductBadge type={product.badges[0]} />
                </div>
              )}
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-sm font-semibold text-foreground line-clamp-1">{product.name}</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-sm font-bold text-primary">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[10px] text-muted-foreground line-through">
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
