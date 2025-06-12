"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Settings from "./Settings";
import Categories from "@/sections/Categories";
import Search from "@/sections/Search";
import { Product } from "@/types/api";

interface HeaderProps {
  companyName: string;
  categories: any[];
  onCategorySelect: (categoryRef: string) => void;
  allProducts: Product[];
  activeCategory: string; // Add this prop
}

export default function Header({ companyName, categories, onCategorySelect, allProducts, activeCategory }: HeaderProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleCategorySelect = (categoryRef: string) => {
    onCategorySelect(categoryRef);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-[rgb(23,25,29)] border-b border-gray-800 z-50">
        <div className="h-28 flex items-center justify-between px-8">
          <div className="w-48 flex items-center">
            <Image
              src="/assets/black background.png"
              alt="Background"
              width={96}
              height={96}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-center text-white truncate max-w-md">
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
        <Search onSearch={() => {}} products={allProducts} />
      </header>
      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
