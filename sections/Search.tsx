"use client";

import { useState } from "react";
import { Product } from "@/types/api";
import Image from "next/image";

interface SearchProps {
  onSearch: (query: string) => void;
  products: Product[];
}

export default function Search({ onSearch, products = [] }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.name.en.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="px-8 py-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for dishes"
          value={searchQuery}
          className="w-full bg-background-secondary text-white/90 px-12 py-3 rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/50 placeholder:text-white/40"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-gray-400"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
        )}
      </div>
      {searchQuery && (
        <div className="mt-4 max-h-search-results overflow-y-auto bg-[#1A1B1F] rounded-xl shadow-xl border border-white/5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.uniqueId || `${product._id}-${Math.random()}`}
                className="flex items-center gap-4 p-4 hover:bg-[#2A2B30] cursor-pointer"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={product.image || "/assets/placeholder.png"}
                    alt={product.name.en}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-white font-medium">{product.name.en}</h3>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center py-4">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
