import React from 'react';

interface CuidadosMiauLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  withText?: boolean;
  textColor?: string;
}

export const CuidadosMiauLogo: React.FC<CuidadosMiauLogoProps> = ({
  className = '',
  size = 'md',
  withText = false,
  textColor = 'text-[#014A75]',
}) => {
  const sizeMap = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-36 h-36',
  };

  const dimension = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official Cuidados Miau Logo with White Circular Background & Proportionate Aspect Ratio */}
      <img
        src="/logo.svg"
        alt="Logo Oficial Cuidados Miau"
        className={`${dimension} aspect-square object-contain rounded-full shadow-xs shrink-0 select-none transition-transform hover:scale-105 border border-sky-100`}
      />

      {withText && (
        <div className="flex flex-col">
          <span className={`text-2xl font-black font-display tracking-tight leading-none ${textColor}`}>
            Cuidados <span className="text-[#F58220]">Miau</span>
          </span>
          <span className="text-[11px] font-bold text-[#006BA6] uppercase tracking-wider mt-0.5">
            Guardería & Paseos
          </span>
        </div>
      )}
    </div>
  );
};
