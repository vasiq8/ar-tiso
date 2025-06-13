"use client";

import { useTheme } from '@/contexts/ThemeContext';

interface NoResultsProps {
  language: 'en' | 'ar';
}

export function NoResults({ language }: NoResultsProps) {
  const { theme } = useTheme();
  
  return (
    <div className={`text-center py-4 ${
      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
    }`}>
      {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
    </div>
  );
}
