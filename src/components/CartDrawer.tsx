"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/api";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal } =
    useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
              <h2 className="text-base font-extrabold text-slate-900">Your Shopping Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <p className="text-sm font-bold text-slate-700">Your cart is currently empty</p>
                <p className="text-xs text-slate-400">Explore our catalog and add luxury products to get started.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
                >
                  Browse Store Catalog
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-2xl border border-slate-100 bg-slate-50/50"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-200 border border-slate-200">
                    {product.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <p className="text-xs font-extrabold text-blue-600">
                      {formatCurrency(product.price)}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center rounded-lg border border-slate-200 bg-white">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-600">Subtotal</span>
                <span className="font-extrabold text-slate-900">{formatCurrency(subtotal)}</span>
              </div>
              <p className="text-[11px] text-slate-400">Taxes and shipping calculated at checkout.</p>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
