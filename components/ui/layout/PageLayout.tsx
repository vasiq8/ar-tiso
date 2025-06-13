"use client";
import { useTheme } from '@/contexts/ThemeContext';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-background-dark' : 'bg-background-light'
    }`}>
      {children}
    </div>
  );
}
