"use client";

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
  const baseStyles = "py-4 rounded-full transition-colors";
  const variantStyles = {
    primary: "bg-[#00BA88] text-white hover:bg-[#00A578]",
    secondary: "bg-[rgb(35,36,42)] text-white hover:bg-[#2A2B30]"
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
