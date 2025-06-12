import type { MenuData } from '@/types/api';

const API_CONFIG = {
  menuUrl: 'https://qa-k8s.tisostudio.com/menu-management/menu/?_q=&orderType=pickup&locationRef=67a396bc0e2b3511b0396447&companyRef=67a395910e2b3511b0396281'
};

const apiRequest = async <T>(url: string, options: { headers?: Record<string, string> } = {}): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const menuApi = {
  getMenuData: async () => {
    return apiRequest<MenuData>(API_CONFIG.menuUrl);
  },

  processMenuData: (data: MenuData, language = 'en') => {
    if (!data?.results) {
      return {
        companyName: 'Company Name Not Available',
        categories: [],
        productsByCategory: {},
        allProducts: [],  // Add this line
        locationRef: null
      };
    }

    const products = data.results.products || [];
    const productsByCategory = products.reduce((acc, product) => {
      // Create a unique identifier combining product ID and its index
      const uniqueProductId = `${product._id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      if (!acc[product.categoryRef]) {
        acc[product.categoryRef] = [];
      }
      acc[product.categoryRef].push({
        ...product,
        uniqueId: uniqueProductId // Add a unique identifier to each product
      });
      return acc;
    }, {} as Record<string, any[]>);

    return {
      companyName: data.results.company?.name || "Company Name Not Available",
      categories: data.results.categories || [],
      productsByCategory,
      allProducts: products,  // Add this line
      locationRef: new URL(API_CONFIG.menuUrl).searchParams.get('locationRef')
    };
  }
};

export default menuApi;
