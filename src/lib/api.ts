import { Product, Category } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount || 0);
}

function mapSymfonyCategory(cat: any): Category {
  if (!cat) return { id: 0, name: "General", slug: "general" };
  return {
    id: cat.id,
    name: cat.name || "General",
    slug: cat.name ? cat.name.toLowerCase().replace(/\s+/g, "-") : "general",
    description: cat.description || "",
    image: cat.image || null,
    status: cat.status || "active",
  };
}

function mapSymfonyProduct(raw: any): Product {
  const image = raw.image || raw.image_url || raw.imageUrl || null;
  const categoryData = raw.category ? mapSymfonyCategory(raw.category) : null;
  
  return {
    id: raw.id,
    title: raw.name || raw.title || "Untitled Product",
    sku: raw.sku || `SKU-${raw.id}`,
    description: raw.description || "Premium quality e-commerce catalog item.",
    price: Number(raw.price) || 0,
    compareAtPrice: raw.compare_at_price ? Number(raw.compare_at_price) : undefined,
    stock: raw.stock !== undefined ? Number(raw.stock) : 10,
    status: raw.status || "active",
    isNewArrival: Boolean(raw.isNewArrival ?? raw.is_new_arrival),
    isBestSeller: Boolean(raw.isBestSeller ?? raw.is_best_seller),
    weight: raw.weight || undefined,
    material: raw.material || undefined,
    colour: raw.colour || raw.color || undefined,
    size: raw.size || undefined,
    jewelleryType: raw.jewelleryType || raw.jewellery_type || undefined,
    category: categoryData,
    categoryId: raw.category_id || categoryData?.id || null,
    image,
    gallery: raw.gallery || (image ? [image] : []),
    tags: raw.tags || ["Backend Product"],
    createdAt: raw.created_at || raw.createdAt || new Date().toISOString(),
  };
}

const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Luxury Gold Diamond Necklace",
    sku: "JWL-101",
    description: "Exquisite handcrafted 18k gold necklace with certified diamonds.",
    price: 499.99,
    compareAtPrice: 599.99,
    stock: 12,
    status: "active",
    category: { id: 1, name: "Jewelry", slug: "jewelry" },
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
    tags: ["Best Seller", "Jewelry"],
  },
  {
    id: 2,
    title: "Minimalist Leather Watch",
    sku: "WTC-202",
    description: "Sleek obsidian black watch face with genuine italian leather strap.",
    price: 189.50,
    compareAtPrice: 220.00,
    stock: 8,
    status: "active",
    category: { id: 2, name: "Accessories", slug: "accessories" },
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    tags: ["Accessories"],
  },
  {
    id: 3,
    title: "Premium Wireless Headphones",
    sku: "AUD-303",
    description: "Active noise-canceling over-ear headphones with 30-hour battery life.",
    price: 249.00,
    compareAtPrice: 299.00,
    stock: 15,
    status: "active",
    category: { id: 3, name: "Electronics", slug: "electronics" },
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    tags: ["Electronics"],
  },
  {
    id: 4,
    title: "Designer Sunglasses",
    sku: "ACC-404",
    description: "Polarized UV400 protection sunglasses with titanium gold frame.",
    price: 129.99,
    stock: 5,
    status: "active",
    category: { id: 2, name: "Accessories", slug: "accessories" },
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80",
    tags: ["Trending"],
  },
];

export async function fetchProducts(): Promise<Product[]> {
  const endpoints = [
    `${API_BASE_URL}/api/products`,
    "http://127.0.0.1:8000/api/products",
    "http://localhost:8000/api/products"
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : data["hydra:member"] || data.member || data.items || [];
        if (Array.isArray(list) && list.length > 0) {
          const mapped = list.map(mapSymfonyProduct);
          return mapped.filter((p: Product) => p.status === "active");
        }
      }
    } catch (err) {
      // try next endpoint
    }
  }

  return DUMMY_PRODUCTS.filter((p) => p.status === "active");
}

export async function fetchProductById(id: string | number): Promise<Product | null> {
  const endpoints = [
    `${API_BASE_URL}/api/products/${id}`,
    `http://127.0.0.1:8000/api/products/${id}`,
    `http://localhost:8000/api/products/${id}`
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        return mapSymfonyProduct(data);
      }
    } catch (err) {
      // try next endpoint
    }
  }

  const products = await fetchProducts();
  return products.find((p) => String(p.id) === String(id)) || null;
}

export async function fetchCategories(): Promise<Category[]> {
  const endpoints = [
    `${API_BASE_URL}/api/categories`,
    "http://127.0.0.1:8000/api/categories",
    "http://localhost:8000/api/categories"
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : data["hydra:member"] || data.member || data.items || [];
        if (Array.isArray(list) && list.length > 0) {
          return list.map(mapSymfonyCategory);
        }
      }
    } catch (err) {
      // try next endpoint
    }
  }

  return [
    { id: 1, name: "Jewelry", slug: "jewelry" },
    { id: 2, name: "Accessories", slug: "accessories" },
    { id: 3, name: "Electronics", slug: "electronics" },
  ];
}
