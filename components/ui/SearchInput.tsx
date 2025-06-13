"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  language: 'en' | 'ar';
}

export function SearchInput({ value, onChange, onClear, language }: SearchInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={language === 'ar' ? "ابحث عن الأطباق" : "Search for dishes"}
        value={value}
        className={`w-full bg-background-secondary text-white/90 py-3 rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/50 placeholder:text-white/40 ${
          language === 'ar' ? 'pl-12 pr-12 text-right' : 'pl-12 pr-12 text-left'
        }`}
        onChange={(e) => onChange(e.target.value)}
      />
      {/* Search Icon */}
      <div className={`absolute top-1/2 -translate-y-1/2 ${language === 'ar' ? 'right-4' : 'left-4'}`}>
        <svg
          width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          className="text-gray-400" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </div>
      {/* Clear Button */}
      {value && (
        <button
          onClick={onClear}
          className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-white ${
            language === 'ar' ? 'left-4' : 'right-4'
          }`}
        >
          {language === 'ar' ? 'إلغاء' : 'Cancel'}
        </button>
      )}
    </div>
  );
}
