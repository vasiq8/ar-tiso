"use client";

import Image from "next/image";
import { Product } from "@/types/api";
import { useTheme } from '@/contexts/ThemeContext';

interface SearchResultProps {
  product: Product;
  language: 'en' | 'ar';
  onSelect: (id: string) => void;
}

export function SearchResult({ product, language, onSelect }: SearchResultProps) {
  const { theme } = useTheme();
  
  return (
    <div
      className={`flex items-center gap-4 p-4 cursor-pointer transition-colors
        ${theme === 'dark' ? 
          'hover:bg-[#2A2B30] text-white' : 
          'hover:bg-gray-100 text-black'}`}
      onClick={() => onSelect(product._id)}
    >
      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
        <Image
          src={product.image || "/assets/placeholder.png"}
          alt={product.name[language]}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-medium">{product.name[language]}</h3>
    </div>
  );
}
