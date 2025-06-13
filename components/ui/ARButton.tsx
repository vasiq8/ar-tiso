"use client";

import Image from "next/image";

interface ARButtonProps {
  hasAR: boolean;
  onClick?: () => void;
  position?: 'left' | 'right';
}

export function ARButton({ hasAR, onClick, position = 'right' }: ARButtonProps) {
  return (
    <div className={`absolute bottom-2 mobile-440:bottom-4 md:bottom-4 ${position === 'left' ? 'left-4' : 'right-4'}`}>
      <Image
        src={hasAR ? "/assets/AR icon.png" : "/assets/AR unavailable.png"}
        alt="AR availability"
        width={32}
        height={32}
        className={`object-contain ${hasAR ? 'cursor-pointer' : ''}`}
        onClick={hasAR ? onClick : undefined}
      />
    </div>
  );
}
