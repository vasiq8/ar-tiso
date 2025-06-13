"use client";

import Image from "next/image";
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useRef } from "react";
import { useTheme } from '@/contexts/ThemeContext';

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
  const { theme } = useTheme();
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
            className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all h-11 relative
              ${theme === 'dark'
                ? 'bg-category-dark hover:bg-[#2A2B30]'
                : 'bg-category-light hover:bg-gray-200'
              }
              ${activeCategory === category.categoryRef && 'overflow-hidden'}
            `}
          >
            <Image
              src={category.image || "/assets/placeholder.png"}
              alt={category.name.en}
              width={20}
              height={20}
              className="object-contain relative z-10"
            />
            <span className={`text-sm font-bold whitespace-nowrap relative z-10 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              {category.name[language]}
            </span>
            {activeCategory === category.categoryRef && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-[12%] bg-[#FF4201]"
                style={{
                  clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 85% 50%, 15% 50%, 0 0)'
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}