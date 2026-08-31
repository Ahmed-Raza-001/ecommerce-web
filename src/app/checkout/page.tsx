"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/api";
import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, Truck } from "lucide-react";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingFee = subtotal > 150 ? 0 : 15.0;
  const grandTotal = subtotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center space-y-6">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Order Placed Successfully!</h1>
        <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you for shopping with Shopkara. Your order confirmation and receipt have been sent to your email.
        </p>
        <div className="pt-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900">Checkout</h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete your customer order details below.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-sm font-bold text-slate-700">Your cart is empty.</p>
          <Link
            href="/products"
            className="inline-flex rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Customer Form */}
          <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Truck className="h-4 w-4 text-blue-600" /> Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    First Name
                  </label>
                  <input
                    required
                    type="text"
                    defaultValue="Alex"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Last Name
                  </label>
                  <input
                    required
                    type="text"
                    defaultValue="Morgan"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  defaultValue="alex.morgan@example.com"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Street Address
                </label>
                <input
                  required
                  type="text"
                  defaultValue="742 Evergreen Terrace"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-emerald-600" /> Payment Information
              </h2>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                <p className="text-xs text-slate-600">
                  Demo Mode: Order will be simulated instantly without real charge.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 py-3.5 text-xs font-extrabold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              {isSubmitting ? "Processing Order..." : `Complete Purchase (${formatCurrency(grandTotal)})`}
            </button>
          </form>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary ({cart.length} items)
            </h2>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      {product.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 line-clamp-1">{product.title}</p>
                      <p className="text-slate-500">Qty: {quantity}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900">
                    {formatCurrency(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-bold text-slate-900">
                  {shippingFee === 0 ? "FREE" : formatCurrency(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                <span>Total Amount</span>
                <span className="text-blue-600">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
