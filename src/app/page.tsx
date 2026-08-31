import Link from "next/link";
import { fetchProducts, fetchCategories } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Sparkles, ShieldCheck, Award, Zap } from "lucide-react";

export default async function HomePage() {
  const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      {/* Dynamic Hero Banner */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-400">
            <Sparkles className="h-4 w-4" />
            <span>Summer 2026 Collection Released</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-tight">
            Crafted for <span className="text-blue-500">Excellence</span>, Designed for You.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light">
            Discover luxury jewelry, obsidian timepieces, and flagship electronics. Curated items backed by direct Symfony API live catalog sync.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/products"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all"
            >
              <span>Explore Collection</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products?category=Jewelry"
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-all"
            >
              <span>View Jewelry</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Shortcut Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Shop by Category</h2>
            <p className="text-xs text-slate-500 mt-1">Browse our top department categories</p>
          </div>
          <Link href="/products" className="text-xs font-bold text-blue-600 hover:underline">
            View All Categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative flex h-48 overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm hover:shadow-xl transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
              {cat.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70"
                />
              )}
              <div className="relative z-20 mt-auto">
                <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">
                  Department
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{cat.name}</h3>
                <span className="mt-2 inline-flex items-center text-xs font-semibold text-slate-300 group-hover:text-white">
                  Shop Now &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Trending New Arrivals</h2>
            <p className="text-xs text-slate-500 mt-1">Live catalog synced with Symfony API</p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">100% Authentic Guarantee</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every product in our store undergoes strict quality control and verification.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Encrypted Secure Checkout</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bank-level SSL encryption ensures your personal & payment info is safe.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Direct API Integration</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant live inventory synchronization with your Symfony database.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
