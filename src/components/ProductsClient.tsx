"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { Search, SlidersHorizontal, Package, Sparkles, Flame, RotateCcw, Filter } from "lucide-react";

interface ProductsClientProps {
  initialSearch?: string;
  initialCategory?: string;
  initialNewArrivals?: boolean;
  initialBestSellers?: boolean;
}

export function ProductsClient({
  initialSearch = "",
  initialCategory = "",
  initialNewArrivals = false,
  initialBestSellers = false,
}: ProductsClientProps) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedJewelleryType, setSelectedJewelleryType] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [selectedColour, setSelectedColour] = useState("all");
  const [onlyNewArrivals, setOnlyNewArrivals] = useState(initialNewArrivals);
  const [onlyBestSellers, setOnlyBestSellers] = useState(initialBestSellers);
  const [sort, setSort] = useState<"newest" | "price-low" | "price-high">("newest");

  // TanStack React Query for Api fetching
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  // Extract unique filter options from active products
  const jewelleryTypes = useMemo(() => {
    const types = new Set<string>();
    products.forEach((p) => {
      if (p.jewelleryType) types.add(p.jewelleryType);
    });
    return Array.from(types);
  }, [products]);

  const materials = useMemo(() => {
    const mats = new Set<string>();
    products.forEach((p) => {
      if (p.material) mats.add(p.material);
    });
    return Array.from(mats);
  }, [products]);

  const colours = useMemo(() => {
    const cols = new Set<string>();
    products.forEach((p) => {
      if (p.colour) cols.add(p.colour);
    });
    return Array.from(cols);
  }, [products]);

  // Filtering Logic: Only Active products are displayed on storefront!
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => (p.status ? p.status === "active" : true));

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
          (p.jewelleryType && p.jewelleryType.toLowerCase().includes(q)) ||
          (p.material && p.material.toLowerCase().includes(q)) ||
          (p.colour && p.colour.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (p) =>
          p.category?.name.toLowerCase() === selectedCategory.toLowerCase() ||
          String(p.categoryId) === String(selectedCategory)
      );
    }

    if (selectedJewelleryType !== "all") {
      result = result.filter((p) => p.jewelleryType === selectedJewelleryType);
    }

    if (selectedMaterial !== "all") {
      result = result.filter((p) => p.material === selectedMaterial);
    }

    if (selectedColour !== "all") {
      result = result.filter((p) => p.colour === selectedColour);
    }

    if (onlyNewArrivals) {
      result = result.filter((p) => p.isNewArrival);
    }

    if (onlyBestSellers) {
      result = result.filter((p) => p.isBestSeller);
    }

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    products,
    search,
    selectedCategory,
    selectedJewelleryType,
    selectedMaterial,
    selectedColour,
    onlyNewArrivals,
    onlyBestSellers,
    sort,
  ]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedJewelleryType("all");
    setSelectedMaterial("all");
    setSelectedColour("all");
    setOnlyNewArrivals(false);
    setOnlyBestSellers(false);
    setSort("newest");
  };

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(selectedCategory) ||
    selectedJewelleryType !== "all" ||
    selectedMaterial !== "all" ||
    selectedColour !== "all" ||
    onlyNewArrivals ||
    onlyBestSellers;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2.5">
            <Package className="h-8 w-8 text-blue-600" />
            <span>Store Catalog</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse active handcrafted imitation jewellery synced live with our Symfony backend API.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="h-4 w-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-700">Sort By:</span>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setSort("newest")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                sort === "newest"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setSort("price-low")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                sort === "price-low"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Price: Low to High
            </button>
            <button
              onClick={() => setSort("price-high")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                sort === "price-high"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Price: High to Low
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filter Toolbar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4 shadow-xs">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, SKU, tags, material, or colour..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs font-medium focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
            />
          </div>

          {/* Quick Highlight Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlyNewArrivals(!onlyNewArrivals)}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                onlyNewArrivals
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>New Arrivals</span>
            </button>

            <button
              onClick={() => setOnlyBestSellers(!onlyBestSellers)}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                onlyBestSellers
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              <span>Best Sellers</span>
            </button>
          </div>
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Jewellery Type Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Jewellery Type</label>
            <select
              value={selectedJewelleryType}
              onChange={(e) => setSelectedJewelleryType(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
            >
              <option value="all">All Jewellery Types</option>
              {jewelleryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Material Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Material</label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
            >
              <option value="all">All Materials</option>
              {materials.map((mat) => (
                <option key={mat} value={mat}>
                  {mat}
                </option>
              ))}
            </select>
          </div>

          {/* Colour Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Colour</label>
            <select
              value={selectedColour}
              onChange={(e) => setSelectedColour(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
            >
              <option value="all">All Colours</option>
              {colours.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">
              Showing <strong>{filteredProducts.length}</strong> matching products
            </span>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 font-bold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Loading Skeleton & Products Grid */}
      {isLoadingProducts ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="h-80 rounded-2xl bg-slate-200 animate-pulse border border-slate-200"
            />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 rounded-3xl border border-dashed border-slate-200 bg-white">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Filter className="h-8 w-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No matching products found</h3>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
            We couldn't find any active products matching your selected search criteria and filters.
          </p>
          <button
            onClick={resetFilters}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
