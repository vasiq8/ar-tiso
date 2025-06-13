"use client";

import { useState } from "react";
import { Product } from "@/types/api";
import { useLanguage } from "@/contexts/LanguageContext";
import { SearchResult } from "@/components/SearchResult";
import { SearchInput } from "@/components/ui/SearchInput";
import { NoResults } from "@/components/ui/NoResults";

interface SearchProps {
  onSearch: (query: string) => void;
  onProductSelect: (productId: string) => void;
  products: Product[];
}

export default function Search({
  onSearch,
  onProductSelect,
  products = [],
}: SearchProps) {
  const { language } = useLanguage();
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
        product.name[language].toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className={`px-8 py-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <SearchInput
        value={searchQuery}
        onChange={handleSearch}
        onClear={handleClear}
        language={language}
      />
      {searchQuery && (
        <div className="mt-4 max-h-search-results overflow-y-auto bg-[#1A1B1F] rounded-xl shadow-xl border border-white/5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <SearchResult
                key={product.uniqueId || `${product._id}-${Math.random()}`}
                product={product}
                language={language}
                onSelect={(id) => {
                  onProductSelect(id);
                  setSearchQuery("");
                  onSearch("");
                }}
              />
            ))
          ) : (
            <NoResults language={language} />
          )}
        </div>
      )}
    </div>
  );
}
