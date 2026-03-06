import { restaurant } from "../data/mock";
import { Star, Clock, Search } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onSearchOpen?: () => void;
}

export default function RestaurantHeader({ onSearchOpen }: Props) {
  return (
    <div className="relative">
      {/* Banner - só a imagem, sem texto em cima */}
      <div className="relative h-44 sm:h-52 overflow-hidden">
        <img
          src={restaurant.banner}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        {/* Search button */}
        <button
          onClick={onSearchOpen}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/90 backdrop-blur-md flex items-center justify-center border border-border shadow-sm transition-colors active:bg-background"
        >
          <Search className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Restaurant info - abaixo do banner, fundo claro para leitura */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="px-4 pt-5 pb-4 bg-background"
      >
        <div className="flex items-end gap-3 mb-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary shadow-md flex-shrink-0 bg-card">
            <img src={restaurant.logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold font-display text-foreground leading-tight">
              {restaurant.name}
            </h1>
            <p className="text-sm text-muted-foreground truncate">{restaurant.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm flex-wrap gap-y-1">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="font-semibold text-foreground">{restaurant.rating}</span>
            <span className="text-muted-foreground">({restaurant.reviewCount})</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{restaurant.prepTime}</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <span className="text-muted-foreground text-xs truncate">{restaurant.cuisineType}</span>
        </div>
      </motion.div>
    </div>
  );
}
