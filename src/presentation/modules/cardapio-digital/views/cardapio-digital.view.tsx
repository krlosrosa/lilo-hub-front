"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { categories, products } from "../data/mock";
import type { Product } from "../data/mock";
import RestaurantHeader from "../components/restaurante-header";
  import CategoryNav from "../components/categoria-nav";
import FeaturedCarousel from "../components/carrosel";
import ProductCard from "../components/produto-card";
import ProductDetailSheet from "../components/product-details";
import CartSheet from "../components/card-sheet";
import FloatingCartButton from "../components/floatting-card";
import SearchOverlay from "../components/serchoverlay";

export default function CardapioDigitalView() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productSheetOpen, setProductSheetOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isScrollingRef = useRef(false);

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
    setProductSheetOpen(true);
  }, []);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    isScrollingRef.current = true;
    const el = sectionRefs.current[categoryId];
    if (el) {
      const offset = 60; // sticky nav height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setTimeout(() => { isScrollingRef.current = false; }, 800);
    }
  }, []);

  // Update active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const offset = 100;
      for (const cat of [...categories].reverse()) {
        const el = sectionRefs.current[cat.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <RestaurantHeader onSearchOpen={() => setSearchOpen(true)} />
      <FeaturedCarousel onSelect={handleProductSelect} />
      <CategoryNav activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      {/* Product sections */}
      <div className="px-4 mt-4">
        {categories.map(cat => {
          const catProducts = products.filter(p => p.categoryId === cat.id);
          if (catProducts.length === 0) return null;
          return (
            <div
              key={cat.id}
              ref={el => { sectionRefs.current[cat.id] = el; }}
              className="mb-6"
            >
              <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <span>{cat.emoji}</span>
                {cat.name}
              </h2>
              <div className="flex flex-col gap-3">
                {catProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={handleProductSelect}
                    index={i}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <FloatingCartButton onClick={() => setCartOpen(true)} />
      <ProductDetailSheet
        product={selectedProduct}
        open={productSheetOpen}
        onClose={() => setProductSheetOpen(false)}
      />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleProductSelect}
      />
    </div>
  );
}
