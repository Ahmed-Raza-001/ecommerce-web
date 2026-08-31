import React from "react";
import { ProductsClient } from "@/components/ProductsClient";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    newArrivals?: string;
    bestSellers?: string;
  }>;
}) {
  const resolvedParams = await searchParams;

  return (
    <ProductsClient
      initialSearch={resolvedParams.search || ""}
      initialCategory={resolvedParams.category || ""}
      initialNewArrivals={resolvedParams.newArrivals === "true"}
      initialBestSellers={resolvedParams.bestSellers === "true"}
    />
  );
}
