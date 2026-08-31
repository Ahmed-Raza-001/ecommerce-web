import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProductById, fetchProducts, formatCurrency } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { ArrowLeft, ShieldCheck, Truck, RotateCcw, Package, Sparkles, Flame } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = await fetchProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  const allProducts = await fetchProducts();
  const related = allProducts
    .filter((p) => String(p.id) !== String(product.id) && (p.status ? p.status === "active" : true))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Back Button */}
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Image Display */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                <Package className="h-20 w-20" />
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.isNewArrival && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-extrabold text-white shadow-md">
                  <Sparkles className="h-3.5 w-3.5" /> NEW ARRIVAL
                </span>
              )}
              {product.isBestSeller && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-extrabold text-slate-950 shadow-md">
                  <Flame className="h-3.5 w-3.5 fill-slate-950" /> BESTSELLER
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Product Meta & Add to Cart */}
        <div className="space-y-6">
          <div className="space-y-2">
            {product.category && (
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 uppercase tracking-wider">
                {product.category.name}
              </span>
            )}
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
              {product.title}
            </h1>
            <p className="text-xs font-mono text-slate-400">SKU: {product.sku}</p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-3xl font-black text-slate-900">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-base text-slate-400 line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.status === "out_of_stock" || product.stock <= 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 border border-rose-200">
                Out of Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                In Stock ({product.stock} units available)
              </span>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-b border-slate-200 py-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Description
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Jewellery Specifications Grid */}
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
              Jewellery Specifications
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Jewellery Type</span>
                <span className="font-bold text-slate-800">{product.jewelleryType || "N/A"}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Material</span>
                <span className="font-bold text-slate-800">{product.material || "N/A"}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Colour</span>
                <span className="font-bold text-slate-800">{product.colour || "N/A"}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Size</span>
                <span className="font-bold text-slate-800">{product.size || "N/A"}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Weight</span>
                <span className="font-bold text-slate-800">{product.weight || "N/A"}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Tags</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {product.tags && product.tags.length > 0 ? (
                    product.tags.map((tag) => (
                      <span key={tag} className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="font-bold text-slate-800">N/A</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Add to Cart Client Action */}
          <AddToCartButton product={product} />

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center">
            <div className="flex flex-col items-center gap-1">
              <Truck className="h-5 w-5 text-blue-600" />
              <span className="text-[10px] font-bold text-slate-700">Free Express Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <span className="text-[10px] font-bold text-slate-700">Certified Authentic</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="h-5 w-5 text-amber-600" />
              <span className="text-[10px] font-bold text-slate-700">30-Day Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-slate-200">
          <h2 className="text-2xl font-extrabold text-slate-900">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
