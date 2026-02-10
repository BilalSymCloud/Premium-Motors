"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { Trash2, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { cart, removeFromCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Your cart is empty.
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Add some cars from the home page to checkout.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Checkout
      </h1>
      <ul className="mt-8 space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={item.image}
                alt={`${item.brand} ${item.name}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                {item.brand} {item.name}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Qty: {item.quantity} × ${item.price.toLocaleString()}
              </p>
            </div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              ${(item.price * item.quantity).toLocaleString()}
            </p>
            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-red-600 dark:hover:bg-slate-700"
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/50">
        <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Total
        </span>
        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
          ${totalPrice.toLocaleString()}
        </span>
      </div>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue shopping
      </Link>
    </div>
  );
}
