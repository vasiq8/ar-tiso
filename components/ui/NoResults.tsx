"use client";

interface NoResultsProps {
  language: 'en' | 'ar';
}

export function NoResults({ language }: NoResultsProps) {
  return (
    <div className="text-gray-400 text-center py-4">
      {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
    </div>
  );
}
