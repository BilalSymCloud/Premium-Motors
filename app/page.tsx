"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CartProvider, useCart } from "@/app/context/CartContext";
import { SearchBar } from "@/app/components/SearchBar";
import { CarCard } from "@/app/components/CarCard";
import { CARS } from "@/app/data/cars";
import { ShoppingBag } from "lucide-react";

function HomeContent() {
  const { addToCart, cart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Missing functionality: filtering logic not implemented — candidate should implement.
  // When search is used, this currently returns no results.
  const filteredCars = useMemo(() => {
    if (!searchQuery.trim()) return CARS;
    // TODO: Implement search/filter logic (e.g. by name, brand)
    return [];
  }, [searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Our Fleet
          </h1>
          {cartCount > 0 && (
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200"
            >
              <ShoppingBag className="h-4 w-4" />
              Cart: {cartCount} {cartCount === 1 ? "item" : "items"}
            </Link>
          )}
        </div>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {filteredCars.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center text-slate-600 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
          {searchQuery.trim()
            ? "No cars match your search. Try a different query."
            : "No cars available."}
        </p>
      ) : (
        <>
          {/* Desktop: 4-column grid. Mobile: no responsive breakpoints — grid stays 4 cols and overflows/overlaps. */}
          <div className="grid w-full min-w-[1200px] grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <div key={car.id} className="min-w-[260px]">
                <CarCard car={car} onAddToCart={addToCart} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  );
}
