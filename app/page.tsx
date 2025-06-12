"use client";

import { useEffect, useState } from "react";
import { menuApi } from "@/services/api";
import Header from "@/components/Header";
import ProductGrid from "@/sections/ProductGrid";
import { ProcessedMenuData } from "@/types/api";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [menuData, setMenuData] = useState<ProcessedMenuData | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await menuApi.getMenuData();
        const processed = menuApi.processMenuData(data);
        setMenuData(processed);

        // Auto-select the first category if available
        if (processed.categories && processed.categories.length > 0) {
          setSelectedCategory(processed.categories[0].categoryRef);
        }
      } catch (error) {
        console.error("Failed to load menu data:", error);
      }
    };
    fetchData();
  }, []);

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [selectedCategory]);

  const handleProductSelect = (productId: string) => {
    const prod = menuData?.allProducts.find((p) => p._id === productId);
    if (prod) {
      setSelectedCategory(prod.categoryRef);
      // after category switch, trigger highlight
      setTimeout(() => setSelectedProductId(productId), 200);
    }
  };

  if (!menuData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const products =
    selectedCategory && menuData.productsByCategory
      ? menuData.productsByCategory[selectedCategory] || []
      : [];

  return (
    <div className="min-h-screen bg-background">
      <Header
        companyName={menuData.companyName}
        categories={menuData.categories}
        onCategorySelect={setSelectedCategory}
        onProductSelect={handleProductSelect}
        allProducts={menuData.allProducts || []}
        activeCategory={selectedCategory}
      />
      <main className="container mx-auto p-8 pt-64">
        <ProductGrid
          products={products}
          highlightedProductId={selectedProductId}
        />
      </main>
    </div>
  );
}
