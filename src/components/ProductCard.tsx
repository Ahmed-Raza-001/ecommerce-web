"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/store/useStore";
import { ShoppingBag, Eye, Package, Heart, Sparkles, Flame } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);

  const isOutOfStock = product.stock <= 0 || product.status === "out_of_stock";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            <Package className="h-12 w-12" />
          </div>
        )}

        {/* Badges (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow-sm">
              <Sparkles className="h-3 w-3" /> NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-extrabold text-slate-950 shadow-sm">
              <Flame className="h-3 w-3 fill-slate-950" /> BESTSELLER
            </span>
          )}
          {product.category && !product.isNewArrival && !product.isBestSeller && (
            <span className="inline-block rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              {product.category.name}
            </span>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="inline-block rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-extrabold text-white">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
            isWishlisted
              ? "bg-rose-500 text-white"
              : "bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500"
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-900 shadow-md hover:bg-blue-600 hover:text-white transition-colors"
            title="Quick View"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <button
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 disabled:opacity-50 transition-colors cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
          <h3 className="font-bold text-slate-900 text-sm line-clamp-1 mb-1">{product.title}</h3>
        </Link>

        {/* Jewellery Specs Summary */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 mb-2">
          {product.jewelleryType && (
            <span className="font-semibold text-slate-700">{product.jewelleryType}</span>
          )}
          {product.material && (
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-600">{product.material}</span>
          )}
          {product.colour && (
            <span className="rounded bg-amber-50 px-1.5 py-0.5 text-amber-800 font-medium">{product.colour}</span>
          )}
          {product.weight && (
            <span className="text-slate-400">({product.weight})</span>
          )}
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Pricing & Cart Action */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-base font-extrabold text-slate-900">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 transition-all cursor-pointer"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>{isOutOfStock ? "Sold Out" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
