"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/ProductCard";
import { Heart, ArrowLeft, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useStore();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 mb-2 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Catalog
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Heart className="h-7 w-7 text-rose-500 fill-rose-500" />
            <span>My Wishlist</span>
            <span className="text-sm font-semibold text-slate-500 bg-slate-100 rounded-full px-3 py-1">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
            </span>
          </h1>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="h-4 w-4" /> Clear All Wishlist
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-xs my-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 mb-4">
            <Heart className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">Your wishlist is empty</h3>
          <p className="max-w-md text-sm text-slate-500 mb-6 leading-relaxed">
            Explore our handcrafted imitation jewellery collections and click the heart icon on any piece to save it to your wishlist.
          </p>
          <Link
            href="/products"
            className="rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-blue-600 transition-all shadow-md"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
