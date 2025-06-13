"use client";

import Image from "next/image";
import { Product } from "@/types/api";
import { FoodTypeIndicator } from "./FoodTypeIndicator";
import { ProductPrice } from "./ProductPrice";
import { ARButton } from "./ui/ARButton";
import { useTheme } from '@/contexts/ThemeContext';

interface ProductCardProps {
  product: Product;
  language: 'en' | 'ar';
  isBlinking: boolean;
  index: number;
  onARClick: () => void;
}

export function ProductCard({ product, language, isBlinking, index, onARClick }: ProductCardProps) {
  const { theme } = useTheme();

  const getProductPrice = (product: Product): number => {
    if (!product.variants || product.variants.length === 0) return 0;
    return product.variants[0].price || 0;
  };

  return (
    <div
      id={`product-${product._id}`}
      className={`group rounded-xl overflow-hidden transition-all duration-300 relative 
        ${theme === 'dark' ? 'text-white' : 'text-black'}
        h-[190px] sm:h-[200px] md:h-[240px] ${
        isBlinking ? "animate-blink" : ""
      } ${index % 2 === 0 ? '-ml-4 mr-0.5' : '-mr-4 ml-0.5'} md:ml-0 md:mr-0`}
    >
      <div className={`absolute bottom-0 left-0 right-0 h-[70%] rounded-2xl 
        ${theme === 'dark' ? 'bg-card-dark' : 'bg-card-light'}`} 
      />
      <div className="relative z-10">
        <div className="p-2">
          <div className="relative w-[50%] sm:w-[45%] pt-[50%] sm:pt-[45%] overflow-hidden mx-auto">
            <Image
              src={product.image || "/assets/placeholder.png"}
              alt={product.name[language]}
              fill
              className="object-cover rounded-full"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className={`p-3 -mt-2 space-y-1 relative ${language === 'ar' ? 'text-right rtl' : ''}`}>
          <h3 className={`text-sm sm:text-lg font-semibold truncate flex items-center ${
            theme === 'dark' ? 'text-white/90' : 'text-black'
          } ${
            language === 'ar' ? 'flex-row-reverse justify-start gap-2 w-full' : 'gap-2'
          }`}>
            <FoodTypeIndicator type={product.contains} />
            {product.name[language]}
          </h3>
          <ProductPrice 
            price={getProductPrice(product)}
            currency={product.currency}
            calories={product.nutritionalInformation?.calorieCount}
            language={language}
          />
          <ARButton 
            hasAR={!!product.glbFileUrl}
            onClick={onARClick}
            position={language === 'ar' ? 'left' : 'right'}
          />
        </div>
      </div>
    </div>
  );
}
