"use client";

import { useEffect, useState } from "react";
import { menuApi } from "@/services/api";
import Header from "@/components/Header";
import ProductGrid from "@/sections/ProductGrid";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [menuData, setMenuData] = useState<any>(null);

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
        allProducts={menuData.allProducts || []}
        activeCategory={selectedCategory} // Pass this prop
      />
      <main className="container mx-auto p-8 pt-64">
        <ProductGrid products={products} />
      </main>
    </div>
  );
}
