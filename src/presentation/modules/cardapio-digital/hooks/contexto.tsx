"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "@/presentation/modules/cardapio-digital/data/mock";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions: Record<string, string[]>;
  totalPrice: number;
  id: string; // unique cart item id
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, selectedOptions: Record<string, string[]>) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateItemPrice(product: Product, quantity: number, selectedOptions: Record<string, string[]>): number {
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
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, quantity: number, selectedOptions: Record<string, string[]>) => {
    const cartItemId = `${product.id}-${Date.now()}`;
    const totalPrice = calculateItemPrice(product, quantity, selectedOptions);
    setItems(prev => [...prev, { product, quantity, selectedOptions, totalPrice, id: cartItemId }]);
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems(prev => prev.filter(i => i.id !== cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.id !== cartItemId));
      return;
    }
    setItems(prev =>
      prev.map(i =>
        i.id === cartItemId
          ? { ...i, quantity, totalPrice: calculateItemPrice(i.product, quantity, i.selectedOptions) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce((acc, i) => acc + i.totalPrice, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
