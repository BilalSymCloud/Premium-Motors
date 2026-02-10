"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Car } from "@/app/types/car";
import { CartItem } from "@/app/types/car";

interface CartContextType {
  cart: CartItem[];
  addToCart: (car: Car) => void;
  removeFromCart: (id: string) => void;
  totalPrice: number;
}

const defaultContext: CartContextType = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  totalPrice: 0,
};

const CartContext = createContext<CartContextType>(defaultContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((car: Car) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === car.id);
      if (existing) {
        const next = [...prev];
        const idx = next.findIndex((i) => i.id === car.id);
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { ...car, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context ?? defaultContext;
}
