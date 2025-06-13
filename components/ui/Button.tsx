"use client";
import { useTheme } from '@/contexts/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  
  const baseStyles = "py-4 rounded-full transition-colors";
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-[#00A578]",
    secondary: theme === 'dark' 
      ? "bg-[rgb(35,36,42)] text-white hover:bg-[#2A2B30]"
      : "bg-gray-100 text-black hover:bg-gray-200"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
