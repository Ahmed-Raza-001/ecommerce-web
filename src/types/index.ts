export interface Category {
  id: number | string;
  name: string;
  slug?: string;
  description?: string;
  image?: string | null;
  status?: string;
  productCount?: number;
}

export interface Product {
  id: number | string;
  title: string;
  sku?: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  status?: "active" | "draft" | "out_of_stock";
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  weight?: string;
  material?: string;
  colour?: string;
  size?: string;
  jewelleryType?: string;
  category?: Category | null;
  categoryId?: number | string | null;
  image?: string | null;
  gallery?: string[];
  tags?: string[];
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
