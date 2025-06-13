"use client";

import { Product } from "@/types/api";
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from "react";
import ARModal from "@/components/ARModal";
import { ProductCard } from "../components/ProductCard";
import { NoProducts } from "@/components/ui/NoProducts";

interface ProductGridProps {
  products: Product[];
  highlightedProductId?: string | null;
}

export default function ProductGrid({ products, highlightedProductId }: ProductGridProps) {
  const { language } = useLanguage();
  const [selectedAR, setSelectedAR] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [blinkedId, setBlinkedId] = useState<string | null>(null);

  useEffect(() => {
    if (highlightedProductId) {
      setBlinkedId(highlightedProductId);
      const el = document.getElementById(`product-${highlightedProductId}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      const t = setTimeout(() => setBlinkedId(null), 1200);
      return () => clearTimeout(t);
    }
  }, [highlightedProductId]);

  const handleARClick = (product: Product) => {
    if (product.glbFileUrl) {
      setSelectedAR(product.glbFileUrl);
      setSelectedProduct(product);
    }
  };

  if (!products || products.length === 0) {
    return <NoProducts />;
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.uniqueId || `${product._id}-${Math.random()}`}
            product={product}
            language={language}
            isBlinking={blinkedId === product._id}
            index={index}
            onARClick={() => handleARClick(product)}
          />
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