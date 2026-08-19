import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'obsidian' | 'sand' | 'outline' | 'emerald';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className = '',
}) => {
  const variantStyles = {
    gold: 'bg-[#C5A880] text-black font-semibold tracking-wider text-[11px] uppercase shadow-sm',
    obsidian: 'bg-[#0D0F12] text-white border border-[#C5A880]/30 text-[11px] uppercase tracking-wider',
    sand: 'bg-[#EAE6DF] text-[#2C2D30] text-[11px] uppercase tracking-wider font-medium',
    outline: 'border border-[#C5A880] text-[#8C6D45] text-[11px] uppercase tracking-wider font-semibold',
    emerald: 'bg-emerald-900/80 text-emerald-100 border border-emerald-500/30 text-[11px] uppercase tracking-wider'
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
