"use client";

import { CloseIcon } from "./icons/CloseIcon";
import { useTheme } from '@/contexts/ThemeContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const { theme } = useTheme();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className={`rounded-2xl p-8 w-[380px] mx-4 ${
        theme === 'dark' ? 'bg-[#1E1F24]' : 'bg-white'
      }`}>
        <div className="flex justify-between items-center mb-8">
          {title && <h2 className={`text-2xl ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>{title}</h2>}
          <button onClick={onClose} className={`${
            theme === 'dark' ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
          }`}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
