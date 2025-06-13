"use client";

import Image from "next/image";
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (containerRef.current && isFirstRender.current) {
      if (language === 'ar') {
        containerRef.current.scrollLeft = containerRef.current.scrollWidth;
      } else {
        containerRef.current.scrollLeft = 0;
      }
      isFirstRender.current = false;
    }
  }, [language]);

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto no-scrollbar" ref={containerRef}>
      <div className={`flex gap-3 min-w-max ${
        language === 'ar' 
          ? 'flex-row-reverse pr-8 pl-0' 
          : 'flex-row pl-8 pr-0'
      }`}>
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