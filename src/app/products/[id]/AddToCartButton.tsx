"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/store/useStore";
import { formatCurrency } from "@/lib/api";
import { ShoppingBag, Plus, Minus, MessageSquare, Heart } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = product.stock <= 0 || product.status === "out_of_stock";

  const handleWhatsAppOrderClick = () => {
    const targetPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917829841646";
    const totalPrice = formatCurrency(product.price * quantity);
    const productUrl = typeof window !== "undefined" ? window.location.href : "";

    const message = `🛍️ *NEW PRODUCT ORDER ENQUIRY*

📦 *Product:* ${product.title}
🆔 *SKU:* ${product.sku || "N/A"}
🏷️ *Category:* ${product.category?.name || "General"}
✨ *Material:* ${product.material || "N/A"}
🎨 *Colour:* ${product.colour || "N/A"}
📏 *Size:* ${product.size || "N/A"}
⚖️ *Weight:* ${product.weight || "N/A"}
💰 *Unit Price:* ${formatCurrency(product.price)}
🔢 *Quantity:* ${quantity}
💵 *Total Value:* ${totalPrice}
🔗 *Product Link:* ${productUrl}

Hi! I am interested in purchasing this product. Please share order confirmation and payment details!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${targetPhone.replace(/[^0-9]/g, "")}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        {/* Quantity Adjuster */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 w-32 shrink-0">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={isOutOfStock || quantity <= 1}
            className="text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-sm font-bold text-slate-900">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            disabled={isOutOfStock || quantity >= product.stock}
            className="text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Cart CTA */}
        <button
          type="button"
          onClick={() => addToCart(product, quantity)}
          disabled={isOutOfStock}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 px-6 text-sm font-bold text-white hover:bg-slate-800 disabled:bg-slate-300 transition-all cursor-pointer"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>{isOutOfStock ? "Out of Stock" : `Add to Cart`}</span>
        </button>

        {/* Wishlist Toggle Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all cursor-pointer ${
            isWishlisted
              ? "border-rose-300 bg-rose-50 text-rose-600"
              : "border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:text-rose-600"
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Direct WhatsApp Order CTA */}
      <button
        type="button"
        onClick={handleWhatsAppOrderClick}
        disabled={isOutOfStock}
        className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 py-3.5 px-6 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 disabled:bg-slate-300 transition-all cursor-pointer"
      >
        <MessageSquare className="h-4.5 w-4.5" />
        <span>Order via WhatsApp Direct (+91 7829841646)</span>
      </button>
    </div>
  );
}
