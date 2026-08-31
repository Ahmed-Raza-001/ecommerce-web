import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400">
      {/* Features Bar */}
      <div className="border-b border-slate-800 bg-slate-950/50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Fast Worldwide Shipping</h4>
                <p className="text-[11px] text-slate-400">Express delivery in 2-5 days</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">256-Bit SSL Encryption</h4>
                <p className="text-[11px] text-slate-400">Guaranteed 100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-600/10 text-amber-400">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">30-Day Money Back</h4>
                <p className="text-[11px] text-slate-400">Hassle-free return policy</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600/10 text-purple-400">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">24/7 Priority Support</h4>
                <p className="text-[11px] text-slate-400">Dedicated support team online</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white font-black">
                N
              </div>
              <span className="text-lg font-bold text-white">NEXUS STORE</span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Discover curated luxury collections, high-end electronics, and premium lifestyle accessories crafted for the discerning customer.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Shop Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/products?category=Jewelry" className="hover:text-white transition-colors">Jewelry & Gold</Link></li>
              <li><Link href="/products?category=Accessories" className="hover:text-white transition-colors">Accessories & Watches</Link></li>
              <li><Link href="/products?category=Electronics" className="hover:text-white transition-colors">Electronics & Audio</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Customer Care</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Information</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs & Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Stay Updated</h4>
            <p className="text-xs text-slate-400 mb-3">Subscribe for exclusive offers and new collection announcements.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="h-9 w-full rounded-xl bg-slate-800 px-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="h-9 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white hover:bg-blue-500 transition-colors shrink-0">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} NEXUS E-Commerce Storefront. Connected to Symfony API Backend.
        </div>
      </div>
    </footer>
  );
}
