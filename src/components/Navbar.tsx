"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, Sparkles, Menu, X, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/store/useStore";

export function Navbar() {
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const wishlist = useStore((state) => state.wishlist);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      {/* Top Banner */}
      <div className="bg-slate-900 px-4 py-1.5 text-center text-xs font-medium text-slate-200 flex items-center justify-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
        <span>Free Worldwide Shipping on all orders over $150! Use code <strong>SHOPKARA10</strong></span>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-black shadow-md shadow-blue-500/20">
              S
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              SHOPKARA
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:text-blue-600 transition-colors">
              Catalog
            </Link>
            <Link href="/products?newArrivals=true" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <span>New Arrivals</span>
              <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">NEW</span>
            </Link>
            <Link href="/products?bestSellers=true" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <span>Best Sellers</span>
              <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">HOT</span>
            </Link>
          </nav>
        </div>

        {/* Search Bar & Actions */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="hidden sm:relative sm:block w-48 md:w-60">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
            />
          </form>

          {/* Wishlist Link */}
          <Link
            href="/wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all cursor-pointer"
            title="View Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-extrabold text-white ring-2 ring-white shadow-sm">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon Toggle */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-all cursor-pointer"
            title="Shopping Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-extrabold text-white ring-2 ring-white shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs"
            />
          </form>
          <div className="flex flex-col gap-2 pt-2 text-sm font-semibold text-slate-700">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">
              Home
            </Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">
              Catalog
            </Link>
            <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 flex items-center justify-between">
              <span>My Wishlist</span>
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-600">{wishlist.length}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
