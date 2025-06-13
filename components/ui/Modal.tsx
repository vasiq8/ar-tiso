"use client";

import { CloseIcon } from "./icons/CloseIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#1E1F24] rounded-2xl p-8 w-[380px] mx-4">
        <div className="flex justify-between items-center mb-8">
          {title && <h2 className="text-2xl text-white">{title}</h2>}
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
