"use client";

import Image from "next/image";
import { formatCalories } from "@/utils/formatting";
import { useTheme } from '@/contexts/ThemeContext';

interface ProductPriceProps {
  price: number;
  currency: string;
  calories?: number;
  language: 'en' | 'ar';
}

export function ProductPrice({ price, currency, calories, language }: ProductPriceProps) {
  const { theme } = useTheme();
  const symbol = currency === "₹" ? "₹" : "SAR";
  
  return (
    <div className={`flex flex-col gap-2 ${language === 'ar' ? 'items-end' : ''}`}>
      <div className={`font-semibold flex items-baseline gap-1 ${
        theme === 'dark' ? 'text-white' : 'text-black'
      }`}>
        <span className="text-[10px] sm:text-xs">{symbol}</span>
        <span className="text-sm sm:text-base">{price.toFixed(2)}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {formatCalories(calories)}
        </span>
        <Image
          src="/assets/icon.svg"
          alt="Product icon"
          width={12}
          height={12}
          className="object-contain"
        />
      </div>
    </div>
  );
}
