export interface LocalizedText {
  en: string;
  ar: string;
}

export interface Category {
  categoryRef: string;
  name: LocalizedText;
  sortOrder: number;
  image: string;
}

export interface ProductVariant {
  price: number;
  prices: {
    locationRef: string;
    price: number;
    location: {
      name: string;
    };
  }[];
}

export interface Product {
  _id: string;
  uniqueId?: string;
  name: LocalizedText;
  image: string;
  categoryRef: string;
  currency: string;
  glbFileUrl?: string;
  variants: ProductVariant[];
  nutritionalInformation?: {
    calorieCount: number;
  };
  contains?: 'veg' | 'non-veg' | 'egg';
}

export interface MenuData {
  results: {
    company?: {
      name: string;
    };
    categories: Category[];
    products?: Product[];
  } | null;
}

export interface ProcessedMenuData {
  companyName: string;
  categories: Category[];
  productsByCategory: Record<string, Product[]>;
  allProducts: Product[];
  locationRef: string | null;
}
