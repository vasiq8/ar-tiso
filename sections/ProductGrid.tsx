"use client";

import Image from "next/image";
import { Product } from "@/types/api";
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from "react";
import ARModal from "@/components/ARModal";

interface ProductGridProps {
  products: Product[];
  highlightedProductId?: string | null;  // allow null
}

type FoodType = 'veg' | 'non-veg' | 'egg';

const FoodTypeIndicator = ({ type }: { type?: string }) => {
  const getFoodType = (inputType?: string): FoodType | null => {
    if (!inputType) return null;
    const validTypes: FoodType[] = ['veg', 'non-veg', 'egg'];
    return validTypes.includes(inputType as FoodType) ? (inputType as FoodType) : null;
  };

  const validType = getFoodType(type);
  if (!validType) return null;

  const colors = {
    'veg': 'border-green-500',
    'non-veg': 'border-red-500',
    'egg': 'border-yellow-500'
  };

  const dotColors = {
    'veg': 'bg-green-500',
    'non-veg': 'bg-red-500',
    'egg': 'bg-yellow-500'
  };

  return (
    <div className={`w-4 h-4 rounded border-2 ${colors[validType]} flex items-center justify-center`}>
      <div className={`w-2 h-2 rounded-full ${dotColors[validType]}`} />
    </div>
  );
};

const getProductPrice = (product: Product): number => {
  if (!product.variants || product.variants.length === 0) return 0;
  return product.variants[0].price || 0;
};

const formatPrice = (price: number, currency: string, calories?: number) => {
  const symbol = currency === "₹" ? "₹" : "SAR";
  return (
    <div className="flex flex-col gap-2">
      <div className="text-white font-semibold flex items-baseline gap-1">
        <span className="text-[10px] sm:text-sm">{symbol}</span>
        <span className="text-sm sm:text-lg">{price.toFixed(2)}</span>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src="/assets/icon.svg"
          alt="Product icon"
          width={12}
          height={12}
          className="object-contain"
        />
        <span className="text-sm text-gray-400">
          {calories ? `${calories} cal` : "--"}
        </span>
      </div>
    </div>
  );
};

export default function ProductGrid({
  products,
  highlightedProductId,
}: ProductGridProps) {
  const { language } = useLanguage();
  const [selectedAR, setSelectedAR] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [blinkedId, setBlinkedId] = useState<string | null>(null);

  useEffect(() => {
    if (highlightedProductId) {
      setBlinkedId(highlightedProductId);
      // scroll into view
      const el = document.getElementById(`product-${highlightedProductId}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      const t = setTimeout(() => setBlinkedId(null), 1200);
      return () => clearTimeout(t);
    }
  }, [highlightedProductId]);

  if (!products || products.length === 0) {
    return <div className="text-white/60 text-center py-8">No products found</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <div
            id={`product-${product._id}`}
            key={product.uniqueId || `${product._id}-${Math.random()}`}
            className={`group rounded-xl overflow-hidden transition-all duration-300 relative h-[190px] sm:h-[200px] md:h-[240px] ${
              blinkedId === product._id ? "animate-blink" : ""
            } ${index % 2 === 0 ? '-ml-4 mr-0.5' : '-mr-4 ml-0.5'} md:ml-0 md:mr-0`}
          >
            <div className="bg-[rgb(35,36,42)] absolute bottom-0 left-0 right-0 h-[70%] rounded-2xl" />
            <div className="relative z-10">
              <div className="p-2">
                <div className="relative w-[50%] sm:w-[45%] pt-[50%] sm:pt-[45%] overflow-hidden mx-auto">
                  <Image
                    src={product.image || "/assets/placeholder.png"}
                    alt={product.name.en}
                    fill
                    className="object-cover rounded-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="p-3 -mt-2 space-y-1 relative">
                {/* Text sizes */}
                <h3 className="text-sm sm:text-lg font-semibold text-white/90 truncate flex items-center gap-2">
                  <FoodTypeIndicator type={product.contains} />
                  {product.name[language]}
                </h3>
                {/* Price sizes */}
                {formatPrice(
                  getProductPrice(product),
                  product.currency,
                  product.nutritionalInformation?.calorieCount
                )}
                <div className="absolute bottom-2 mobile-440:bottom-4 md:bottom-4 right-4">
                  <Image
                    src={
                      product.glbFileUrl
                        ? "/assets/AR icon.png"
                        : "/assets/AR unavailable.png"
                    }
                    alt="AR availability"
                    width={32}
                    height={32}
                    className={`object-contain ${product.glbFileUrl ? 'cursor-pointer' : ''}`}
                    onClick={() => {
                      if (product.glbFileUrl) {
                        setSelectedAR(product.glbFileUrl);
                        setSelectedProduct(product);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ARModal
        isOpen={!!selectedAR}
        onClose={() => {
          setSelectedAR(null);
          setSelectedProduct(null);
        }}
        glbUrl={selectedAR || ''}
        productName={selectedProduct?.name[language]}
      />
    </>
  );
}