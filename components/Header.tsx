"use client";

import Image from "next/image";
import { useState } from "react";
import Settings from "./Settings";
import Categories from "@/sections/Categories";
import Search from "@/sections/Search";
import { Product, Category } from "@/types/api";
import { useTheme } from "@/contexts/ThemeContext";

interface HeaderProps {
  companyName: string;
  categories: Category[];
  onCategorySelect: (categoryRef: string) => void;
  onProductSelect: (productId: string) => void; // Add this
  allProducts: Product[];
  activeCategory: string; // Add this prop
}

export default function Header({
  companyName,
  categories,
  onCategorySelect,
  allProducts,
  activeCategory,
  onProductSelect, // Add here
}: HeaderProps) {
  const { theme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleCategorySelect = (categoryRef: string) => {
    onCategorySelect(categoryRef);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 border-b z-50 transition-colors duration-200 ${
          theme === "dark"
            ? "bg-background-dark border-gray-800"
            : "bg-background-light border-gray-200"
        }`}
      >
        <div className="h-28 flex items-center justify-between px-8">
          <div className="w-48 flex items-center">
            <Image
              src={
                theme === "dark"
                  ? "/assets/black background.png"
                  : "/assets/white background.png"
              }
              alt="Background"
              width={96}
              height={96}
              className="object-contain"
              priority
            />
          </div>
          <h1
            className={`text-2xl font-bold text-center truncate max-w-md ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {companyName}
          </h1>
          <div className="w-40 flex justify-end">
            <Image
              src="/assets/settings icon.png"
              alt="Settings"
              width={48}
              height={48}
              className="cursor-pointer hover:opacity-80"
              priority
              onClick={() => setIsSettingsOpen(true)}
            />
          </div>
        </div>
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
        />
        <Search
          onSearch={() => {}}
          products={allProducts}
          onProductSelect={onProductSelect} // Pass through
        />
      </header>
      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
