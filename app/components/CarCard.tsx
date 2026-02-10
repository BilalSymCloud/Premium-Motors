"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Car } from "@/app/types/car";

interface CarCardProps {
  car: Car;
  onAddToCart: (car: Car) => void;
}

export function CarCard({ car, onAddToCart }: CarCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          {car.brand}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {car.name}
        </h3>
        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{car.year}</p>
        <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">
          ${car.price.toLocaleString()}
        </p>
        <button
          type="button"
          onClick={() => onAddToCart(car)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-emerald-500 dark:hover:bg-emerald-600"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
