import React from 'react';

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'dark' | 'light';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  subtitle,
  title,
  description,
  align = 'center',
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';
  const alignment =
    align === 'center'
      ? 'text-center items-center mx-auto'
      : align === 'right'
      ? 'text-right items-end ml-auto'
      : 'text-left items-start mr-auto';

  return (
    <div className={`flex flex-col max-w-3xl ${alignment} ${className}`}>
      {subtitle && (
        <div className="flex items-center gap-2 mb-3">
          <span className="h-px w-6 bg-[#C5A880]" />
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C5A880]">
            {subtitle}
          </span>
          <span className="h-px w-6 bg-[#C5A880]" />
        </div>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal tracking-tight leading-[1.15] ${
          isDark ? 'text-white' : 'text-[#0D0F12]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg font-light leading-relaxed max-w-2xl ${
            isDark ? 'text-[#A0A3A8]' : 'text-[#5A5E66]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
