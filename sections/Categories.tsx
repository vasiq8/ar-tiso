"use client";

import Image from "next/image";
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoriesProps {
  categories?: {
    categoryRef: string;
    name: {
      en: string;
      ar: string;
    };
    image: string;
  }[];
  activeCategory?: string;
  onCategorySelect?: (categoryRef: string) => void;
}

export default function Categories({ 
  categories = [], 
  activeCategory = '', 
  onCategorySelect = () => {} 
}: CategoriesProps) {
  const { language } = useLanguage();

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex gap-3 px-8 min-w-max">
        {categories.map((category) => (
          <div
            key={category.categoryRef}
            onClick={() => onCategorySelect(category.categoryRef)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-colors h-11
              ${activeCategory === category.categoryRef 
                ? 'bg-orange-600' 
                : 'bg-[rgb(35,36,42)] hover:bg-[#2A2B30]'}`}
          >
            <Image
              src={category.image || "/assets/placeholder.png"}
              alt={category.name.en}
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="text-sm font-bold text-white whitespace-nowrap">
              {category.name[language]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}